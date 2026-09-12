"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { db } from "@/lib/db";
import {
  IPA_44_PHONEMES,
  IPAPhonemeData,
  IPACategory,
} from "@/data/mockIPA44Data";
import {
  MOCK_MINIMAL_PAIRS,
  MinimalPairSet,
  MinimalPairWordItem,
} from "@/data/mockMinimalPairsData";
import { playNativeAudio } from "@/lib/phoneticAcousticAnalyzer";

export interface MinimalPairQuestion {
  pairSet: MinimalPairSet;
  wordItem: MinimalPairWordItem;
  targetWord: string; // the correct word played in audio
  isTargetA: boolean;
}

export function useIPAInteractiveSession() {
  // --- 1. IPA Soundboard & Sagittal Anatomy State ---
  const [selectedCategory, setSelectedCategory] = useState<IPACategory | "all">("all");
  const [selectedPhoneme, setSelectedPhoneme] = useState<IPAPhonemeData>(IPA_44_PHONEMES[0]);
  const [isAnatomyDrawerOpen, setIsAnatomyDrawerOpen] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isAirflowAnimating, setIsAirflowAnimating] = useState<boolean>(false);

  // --- 2. Minimal Pairs Rapid-Fire Arena State ---
  const [isArenaActive, setIsArenaActive] = useState<boolean>(false);
  const [arenaQuestions, setArenaQuestions] = useState<MinimalPairQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState<boolean>(false);
  const [arenaScore, setArenaScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [arenaStreak, setArenaStreak] = useState<number>(0);
  const [arenaErrors, setArenaErrors] = useState<Array<{ question: MinimalPairQuestion; wrongWord: string }>>([]);
  const [timeRemainingSec, setTimeRemainingSec] = useState<number>(3.0);
  const [isArenaFinished, setIsArenaFinished] = useState<boolean>(false);
  const arenaTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Filtered phonemes list
  const filteredPhonemes = selectedCategory === "all"
    ? IPA_44_PHONEMES
    : IPA_44_PHONEMES.filter((p) => p.category === selectedCategory);

  // Play audio for selected phoneme or word
  const playSound = useCallback(async (text: string) => {
    setIsPlayingAudio(true);
    setIsAirflowAnimating(true);
    try {
      await playNativeAudio(text);
    } catch (e) {
      console.error("Audio playback error:", e);
    } finally {
      setIsPlayingAudio(false);
      setTimeout(() => setIsAirflowAnimating(false), 800);
    }
  }, []);

  const handleSelectPhoneme = useCallback(
    (phoneme: IPAPhonemeData) => {
      setSelectedPhoneme(phoneme);
      // Play sound of the first example word
      if (phoneme.exampleWords.length > 0) {
        playSound(phoneme.exampleWords[0].word);
      }
    },
    [playSound]
  );

  // --- Start Minimal Pairs Arena ---
  const startMinimalPairsArena = useCallback(() => {
    // Generate 10 randomized minimal pair questions
    const generated: MinimalPairQuestion[] = [];
    const shuffledPairs = [...MOCK_MINIMAL_PAIRS].sort(() => Math.random() - 0.5);

    shuffledPairs.slice(0, 10).forEach((pair) => {
      const randomWordIdx = Math.floor(Math.random() * pair.words.length);
      const wordItem = pair.words[randomWordIdx];
      const isTargetA = Math.random() > 0.5;
      const targetWord = isTargetA ? wordItem.wordA : wordItem.wordB;

      generated.push({
        pairSet: pair,
        wordItem,
        targetWord,
        isTargetA,
      });
    });

    setArenaQuestions(generated);
    setCurrentQuestionIndex(0);
    setArenaScore({ correct: 0, total: 0 });
    setArenaStreak(0);
    setArenaErrors([]);
    setIsArenaActive(true);
    setIsArenaFinished(false);
    setIsQuestionAnswered(false);
    setSelectedOption(null);
    setTimeRemainingSec(3.0);

    // Play first question audio
    if (generated.length > 0) {
      setTimeout(() => playNativeAudio(generated[0].targetWord), 300);
    }
  }, []);

  // Answer Minimal Pair Question
  const handleAnswerQuestion = useCallback(
    async (chosenWord: string) => {
      if (isQuestionAnswered || !arenaQuestions[currentQuestionIndex]) return;

      const currentQ = arenaQuestions[currentQuestionIndex];
      const isCorrect = chosenWord === currentQ.targetWord;

      setSelectedOption(chosenWord);
      setIsQuestionAnswered(true);

      if (isCorrect) {
        setArenaScore((prev) => ({ correct: prev.correct + 1, total: prev.total + 1 }));
        setArenaStreak((prev) => prev + 1);
      } else {
        setArenaScore((prev) => ({ ...prev, total: prev.total + 1 }));
        setArenaStreak(0);
        setArenaErrors((prev) => [...prev, { question: currentQ, wrongWord: chosenWord }]);

        // Auto Sync error to Dexie error_bank
        try {
          await db.error_bank.put({
            id: `err_pron_${Date.now()}_${currentQ.pairSet.id}`,
            sourceModule: "pronunciation",
            errorType: "pronunciation",
            questionContext: `Phân biệt cặp âm: /${currentQ.pairSet.soundA}/ vs /${currentQ.pairSet.soundB}/`,
            userWrongAnswer: `Đã nghe nhầm thành "${chosenWord}"`,
            correctAnswer: currentQ.targetWord,
            deepExplanation: `Bạn nhầm giữa /${currentQ.pairSet.soundA}/ và /${currentQ.pairSet.soundB}/. ${currentQ.pairSet.anatomyTip}`,
            mastered: false,
            retryCount: 1,
            consecutiveSuccesses: 0,
            createdAt: new Date().toISOString(),
          });
        } catch (dbErr) {
          console.error("Failed to sync pronunciation error:", dbErr);
        }
      }
    },
    [isQuestionAnswered, arenaQuestions, currentQuestionIndex]
  );

  // Next Minimal Pair Question
  const handleNextQuestion = useCallback(() => {
    const nextIdx = currentQuestionIndex + 1;
    if (nextIdx < arenaQuestions.length) {
      setCurrentQuestionIndex(nextIdx);
      setIsQuestionAnswered(false);
      setSelectedOption(null);
      setTimeRemainingSec(3.0);
      playNativeAudio(arenaQuestions[nextIdx].targetWord);
    } else {
      setIsArenaFinished(true);
      // Log Practice Activity
      try {
        db.practice_logs.put({
          id: `log_ipa_arena_${Date.now()}`,
          type: "pronunciation",
          title: "Minimal Pairs Rapid Discrimination",
          score: arenaScore.correct,
          totalQuestions: arenaQuestions.length,
          accuracyPercentage: Math.round((arenaScore.correct / arenaQuestions.length) * 100),
          timeSpentSeconds: 60,
          createdAt: new Date().toISOString(),
        });
      } catch (e) {
        console.error("Failed to log minimal pair practice:", e);
      }
    }
  }, [currentQuestionIndex, arenaQuestions, arenaScore.correct]);

  const closeArena = useCallback(() => {
    setIsArenaActive(false);
    setIsArenaFinished(false);
  }, []);

  return {
    selectedCategory,
    setSelectedCategory,
    selectedPhoneme,
    setSelectedPhoneme,
    filteredPhonemes,
    isAnatomyDrawerOpen,
    setIsAnatomyDrawerOpen,
    isPlayingAudio,
    isAirflowAnimating,
    playSound,
    handleSelectPhoneme,
    // Minimal Pairs Arena
    isArenaActive,
    arenaQuestions,
    currentQuestionIndex,
    selectedOption,
    isQuestionAnswered,
    arenaScore,
    arenaStreak,
    arenaErrors,
    isArenaFinished,
    startMinimalPairsArena,
    handleAnswerQuestion,
    handleNextQuestion,
    closeArena,
  };
}
