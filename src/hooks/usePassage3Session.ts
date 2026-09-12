"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import {
  MOCK_PASSAGE3_DATA,
  Passage3ExerciseData,
  DenestingSentence,
  Passage3Question,
} from "@/data/mockPassage3Data";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem, VocabCard } from "@/types/database";

export function usePassage3Session() {
  const data = MOCK_PASSAGE3_DATA;

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [activeDenestingSentence, setActiveDenestingSentence] =
    useState<DenestingSentence | null>(null);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [selectedParagraphLetter, setSelectedParagraphLetter] = useState<
    string | null
  >(null);

  // Modals & Drawers
  const [showDiagnosticModal, setShowDiagnosticModal] = useState<boolean>(false);
  const [showStanceDrawer, setShowStanceDrawer] = useState<boolean>(false);
  const [showVocabModal, setShowVocabModal] = useState<boolean>(false);

  // Timer
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isSubmitted) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSubmitted]);

  // Set answer
  const setAnswer = useCallback((qNum: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [qNum]: value,
    }));
  }, []);

  // Strike-through option in Summary Box
  const toggleEliminateOption = useCallback((optionLetter: string) => {
    setEliminatedOptions((prev) =>
      prev.includes(optionLetter)
        ? prev.filter((o) => o !== optionLetter)
        : [...prev, optionLetter]
    );
  }, []);

  // Open / Close De-nesting
  const openDenesting = useCallback(
    (sentenceId: string) => {
      const found = data.denestingSentences[sentenceId];
      if (found) {
        setActiveDenestingSentence(found);
      }
    },
    [data.denestingSentences]
  );

  const closeDenesting = useCallback(() => {
    setActiveDenestingSentence(null);
  }, []);

  // Results calculation
  const scoreResult = useMemo(() => {
    let correctCount = 0;
    const details = data.questions.map((q) => {
      const userAns = (answers[q.number] || "").trim().toUpperCase();
      const isCorrect = userAns === q.correctAnswer.toUpperCase();
      if (isCorrect) correctCount++;

      return {
        question: q,
        userAnswer: answers[q.number] || "",
        isCorrect,
      };
    });

    const totalCount = data.questions.length;
    const accuracy = Math.round((correctCount / totalCount) * 100);

    // Reading Band Score Scale for 14 questions in Passage 3:
    let estimatedBand = 6.0;
    if (correctCount >= 13) estimatedBand = 9.0;
    else if (correctCount >= 12) estimatedBand = 8.5;
    else if (correctCount >= 10) estimatedBand = 8.0;
    else if (correctCount >= 8) estimatedBand = 7.5;
    else if (correctCount >= 6) estimatedBand = 7.0;
    else if (correctCount >= 4) estimatedBand = 6.5;

    return {
      correctCount,
      totalCount,
      accuracy,
      estimatedBand,
      details,
    };
  }, [answers, data.questions]);

  // Submit and Save to Dexie DB
  const submitPassage3 = useCallback(async () => {
    setIsSubmitted(true);
    setShowDiagnosticModal(true);

    try {
      const log: PracticeLog = {
        id: `log_p3_${Date.now()}`,
        type: "reading_passage3_abstract",
        materialId: data.id,
        score: scoreResult.correctCount,
        accuracyPercentage: scoreResult.accuracy,
        timeSpentSeconds: elapsedSeconds,
        createdAt: new Date().toISOString(),
      };
      await db.practice_logs.put(log);
    } catch (e) {
      console.error("Error saving Passage 3 practice log:", e);
    }

    // Save incorrect questions into Error Bank
    for (const item of scoreResult.details) {
      if (!item.isCorrect) {
        try {
          await db.error_bank.put({
            id: `err_p3_q${item.question.number}_${Date.now()}`,
            sourceModule: "reading",
            errorType:
              item.question.type === "yes_no_not_given"
                ? "careless_reading"
                : "paraphrase_trap",
            questionContext: `Reading Passage 3 (Q${item.question.number}): ${item.question.prompt}`,
            userWrongAnswer: item.userAnswer ? `Đã chọn [${item.userAnswer}]` : "Để trống",
            correctAnswer: `Đáp án đúng: [${item.question.correctAnswer}]`,
            deepExplanation: `${item.question.distractorExplanationVi} Dẫn chứng đoạn ${item.question.evidenceParagraphLetter}: "${item.question.evidenceSentence}"`,
            mastered: false,
            retryCount: 0,
            consecutiveSuccesses: 0,
            createdAt: new Date().toISOString(),
          });
        } catch (e) {
          console.error("Error saving Passage 3 error:", e);
        }
      }
    }
  }, [data, scoreResult, elapsedSeconds]);

  // Save Abstract AWL Vocabulary to FSRS
  const saveAbstractVocabToFSRS = useCallback(async () => {
    for (const item of data.abstractVocabAWL) {
      const card: VocabCard = {
        id: `vocab_p3_${item.word.toLowerCase()}`,
        word: item.word,
        ipa: item.ipa,
        meaning: item.meaningVi,
        collocations: [item.word, "Passage 3 Philosophy & Epistemology"],
        originalContext: item.context,
        category: "c1_academic",
        status: "new",
        stepInterval: 1,
        nextReviewDate: new Date(Date.now() + 86400000).toISOString(),
        repetitionCount: 0,
        lapsesCount: 0,
        stability: 1.0,
        difficulty: 5.0,
        sourceModule: "reading",
        createdAt: new Date().toISOString(),
      };
      try {
        await db.vocab_matrix.put(card);
      } catch (e) {
        console.error("Error saving Passage 3 abstract vocab to FSRS:", e);
      }
    }
  }, [data.abstractVocabAWL]);

  const resetSession = useCallback(() => {
    setAnswers({});
    setEliminatedOptions([]);
    setIsSubmitted(false);
    setActiveDenestingSentence(null);
    setSelectedParagraphLetter(null);
    setShowDiagnosticModal(false);
    setShowStanceDrawer(false);
    setShowVocabModal(false);
    setElapsedSeconds(0);
  }, []);

  return {
    data,
    answers,
    activeDenestingSentence,
    eliminatedOptions,
    isSubmitted,
    selectedParagraphLetter,
    showDiagnosticModal,
    showStanceDrawer,
    showVocabModal,
    elapsedSeconds,
    scoreResult,
    setAnswer,
    toggleEliminateOption,
    openDenesting,
    closeDenesting,
    setSelectedParagraphLetter,
    submitPassage3,
    saveAbstractVocabToFSRS,
    resetSession,
    setShowDiagnosticModal,
    setShowStanceDrawer,
    setShowVocabModal,
  };
}
