"use client";

import { useState, useCallback, useMemo } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { VocabCard, VocabCategory } from "@/types/database";
import { MOCK_AWL_570_ENTRIES, AWLWordEntry } from "@/data/mockAWL570Data";
import { calculateNextFSRSState, FSRSRating } from "@/lib/fsrsScheduler";

export function useVocabMatrixSession() {
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);
  const [activeQueueIndices, setActiveQueueIndices] = useState<number[]>([]);
  const [currentQueueIndex, setCurrentQueueIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const [selectedSublist, setSelectedSublist] = useState<number | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState<VocabCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const [selectedCardForDetails, setSelectedCardForDetails] = useState<VocabCard | null>(null);
  const [isHarvestDrawerOpen, setIsHarvestDrawerOpen] = useState<boolean>(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);

  const [sessionRatings, setSessionRatings] = useState<FSRSRating[]>([]);
  const [errorBankLoggedCount, setErrorBankLoggedCount] = useState<number>(0);
  const [isSessionFinished, setIsSessionFinished] = useState<boolean>(false);

  const allCards = useLiveQuery(async () => {
    try {
      const count = await db.vocab_matrix.count();
      if (count === 0) {
        const initialCards: VocabCard[] = MOCK_AWL_570_ENTRIES.map((entry) => ({
          id: entry.id,
          word: entry.term,
          ipa: entry.phonetic,
          meaning: entry.vietnameseMeaning,
          definitionEn: entry.definitionEn,
          collocations: entry.collocations,
          originalContext: entry.contextSentence.replace(/<[^>]+>/g, ""),
          category: "awl_570",
          status: "new",
          stepInterval: 1,
          nextReviewDate: "",
          repetitionCount: 0,
          lapsesCount: 0,
          stability: 0,
          difficulty: entry.difficultyInitial,
          createdAt: new Date().toISOString(),
        }));
        await db.vocab_matrix.bulkPut(initialCards);
        return initialCards;
      }
      return await db.vocab_matrix.toArray();
    } catch {
      return [];
    }
  }, []) || [];

  const todayIso = new Date().toISOString().split("T")[0];

  const dueCards = useMemo(() => {
    return allCards.filter((c) => c.status !== "new" && Boolean(c.nextReviewDate) && c.nextReviewDate <= todayIso);
  }, [allCards, todayIso]);

  const newCards = useMemo(() => {
    return allCards.filter((c) => c.repetitionCount === 0 || c.status === "new");
  }, [allCards]);

  const learningCards = useMemo(() => {
    return allCards.filter((c) => c.repetitionCount > 0 && c.status === "learning");
  }, [allCards]);

  const masteredCards = useMemo(() => {
    return allCards.filter((c) => (c.stability && c.stability >= 21) || c.status === "mastered");
  }, [allCards]);

  const filteredCards = useMemo(() => {
    return allCards.filter((c) => {
      const matchCat = selectedCategory === "all" || c.category === selectedCategory;
      const matchQuery =
        !searchQuery ||
        c.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.meaning.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [allCards, selectedCategory, searchQuery]);

  const activeReviewCard: VocabCard | undefined =
    activeQueueIndices.length > 0 && allCards[activeQueueIndices[currentQueueIndex]]
      ? allCards[activeQueueIndices[currentQueueIndex]]
      : dueCards[0] || allCards[0];

  const handleStartSession = useCallback((mode: "due" | "new" | "all" = "due") => {
    let targetCards: VocabCard[] = [];
    if (mode === "due") targetCards = dueCards.length > 0 ? dueCards : newCards.length > 0 ? newCards : allCards;
    else if (mode === "new") targetCards = newCards.length > 0 ? newCards : allCards;
    else targetCards = allCards;

    const indices = targetCards
      .map((c) => allCards.findIndex((card) => card.id === c.id))
      .filter((i) => i >= 0);

    setActiveQueueIndices(indices);
    setCurrentQueueIndex(0);
    setIsFlipped(false);
    setSessionRatings([]);
    setErrorBankLoggedCount(0);
    setIsSessionFinished(false);
    setIsSessionActive(true);
  }, [dueCards, newCards, allCards]);

  const handleRateCard = useCallback(async (rating: FSRSRating) => {
    if (!activeReviewCard) return;

    setSessionRatings((prev) => [...prev, rating]);

    const fsrsOutput = calculateNextFSRSState(
      {
        stability: activeReviewCard.stability,
        difficulty: activeReviewCard.difficulty,
        reps: activeReviewCard.repetitionCount,
        lapses: activeReviewCard.lapsesCount,
        state: activeReviewCard.status === "mastered" ? "review" : (activeReviewCard.status as any),
        lastReview: activeReviewCard.lastReviewedAt,
      },
      rating,
      new Date()
    );

    const newLapses = rating === 1 ? (activeReviewCard.lapsesCount || 0) + 1 : (activeReviewCard.lapsesCount || 0);

    const updatedCard: VocabCard = {
      ...activeReviewCard,
      stepInterval: fsrsOutput.scheduledDays,
      stability: fsrsOutput.newStability,
      difficulty: fsrsOutput.newDifficulty,
      status: fsrsOutput.newState === "review" && fsrsOutput.newStability >= 21 ? "mastered" : (fsrsOutput.newState as any),
      repetitionCount: (activeReviewCard.repetitionCount || 0) + 1,
      lapsesCount: newLapses,
      nextReviewDate: fsrsOutput.nextDue,
      lastReviewedAt: new Date().toISOString(),
    };

    await db.vocab_matrix.put(updatedCard);

    if (newLapses >= 3 && rating === 1) {
      setErrorBankLoggedCount((p) => p + 1);
      await db.error_bank.put({
        id: "err_vocab_lapse_" + Date.now() + "_" + updatedCard.id,
        sourceModule: "vocab",
        errorType: "paraphrase_trap",
        questionContext: "[FSRS Vocab Matrix] Từ vựng hay quên (Lapses: " + newLapses + "): \"" + updatedCard.word + "\" (" + updatedCard.ipa + ")",
        userWrongAnswer: "Đánh giá Again (Quên nghĩa)",
        correctAnswer: updatedCard.word + ": " + updatedCard.meaning,
        deepExplanation: "Câu ngữ cảnh gốc: \"" + updatedCard.originalContext + "\". Collocations: " + updatedCard.collocations.join(", "),
        mastered: false,
        retryCount: 0,
        createdAt: new Date().toISOString(),
      });
    }

    setIsFlipped(false);
    if (currentQueueIndex < activeQueueIndices.length - 1) {
      setCurrentQueueIndex((p) => p + 1);
    } else {
      setIsSessionFinished(true);
    }
  }, [activeReviewCard, currentQueueIndex, activeQueueIndices.length]);

  const handleEnqueueSublist = useCallback(async (sublist: number) => {
    const today = new Date().toISOString().split("T")[0];
    const sublistWords = MOCK_AWL_570_ENTRIES.filter((w) => w.sublist === sublist);

    for (const entry of sublistWords) {
      const existing = allCards.find((c) => c.word.toLowerCase() === entry.term.toLowerCase());
      if (existing) {
        await db.vocab_matrix.put({
          ...existing,
          nextReviewDate: today,
        });
      } else {
        await db.vocab_matrix.put({
          id: entry.id,
          word: entry.term,
          ipa: entry.phonetic,
          meaning: entry.vietnameseMeaning,
          definitionEn: entry.definitionEn,
          collocations: entry.collocations,
          originalContext: entry.contextSentence.replace(/<[^>]+>/g, ""),
          category: "awl_570",
          status: "new",
          stepInterval: 1,
          nextReviewDate: today,
          repetitionCount: 0,
          lapsesCount: 0,
          stability: entry.stabilityInitial,
          difficulty: entry.difficultyInitial,
          createdAt: new Date().toISOString(),
        });
      }
    }
  }, [allCards]);

  const handleHarvestWord = useCallback(async (wordData: {
    term: string;
    ipa: string;
    meaning: string;
    collocations: string[];
    contextSentence: string;
    sourceModule: string;
    category?: VocabCategory;
  }) => {
    const today = new Date().toISOString().split("T")[0];
    const newCard: VocabCard = {
      id: "vocab_custom_" + Date.now() + "_" + wordData.term.toLowerCase().replace(/\s+/g, "_"),
      word: wordData.term,
      ipa: wordData.ipa || "/ˈtɜːm/",
      meaning: wordData.meaning,
      collocations: wordData.collocations || [],
      originalContext: wordData.contextSentence,
      category: wordData.category || "c1_academic",
      status: "new",
      stepInterval: 1,
      nextReviewDate: today,
      repetitionCount: 0,
      lapsesCount: 0,
      stability: 1.5,
      difficulty: 5.0,
      sourceModule: wordData.sourceModule,
      createdAt: new Date().toISOString(),
    };

    await db.vocab_matrix.put(newCard);
  }, []);

  const handleSpeakWord = useCallback((word: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-GB";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  return {
    allCards,
    dueCards,
    newCards,
    learningCards,
    masteredCards,
    filteredCards,
    activeReviewCard,
    currentQueueIndex,
    totalQueueCount: activeQueueIndices.length,
    isSessionActive,
    setIsSessionActive,
    isFlipped,
    setIsFlipped,
    isSessionFinished,
    sessionRatings,
    errorBankLoggedCount,
    selectedSublist,
    setSelectedSublist,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    selectedCardForDetails,
    setSelectedCardForDetails,
    isHarvestDrawerOpen,
    setIsHarvestDrawerOpen,
    isDetailsModalOpen,
    setIsDetailsModalOpen,
    handleStartSession,
    handleRateCard,
    handleEnqueueSublist,
    handleHarvestWord,
    handleSpeakWord,
  };
}
