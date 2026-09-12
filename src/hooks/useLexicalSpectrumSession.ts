"use client";

import { useState, useMemo, useCallback } from "react";
import {
  MOCK_LEXICAL_CLUSTERS,
  MOCK_COLLOCATION_QUIZ_ARENA
} from "@/data/mockLexicalSpectrumData";
import {
  LexicalConceptCluster,
  LexicalWordNuance,
  CollocationMatchItem,
  auditThesaurusPitfalls
} from "@/lib/lexicalSemanticsEngine";
import { db } from "@/lib/db";

export function useLexicalSpectrumSession(initialClusterId?: string) {
  const [selectedClusterId, setSelectedClusterId] = useState<string>(
    initialClusterId || MOCK_LEXICAL_CLUSTERS[0].id
  );

  const currentCluster: LexicalConceptCluster = useMemo(() => {
    return (
      MOCK_LEXICAL_CLUSTERS.find((c) => c.id === selectedClusterId) ||
      MOCK_LEXICAL_CLUSTERS[0]
    );
  }, [selectedClusterId]);

  // Active Connotation Word selected on the slider
  const [selectedWordScore, setSelectedWordScore] = useState<-2 | -1 | 0 | 1 | 2>(0);

  const activeWordNuance: LexicalWordNuance = useMemo(() => {
    return (
      currentCluster.wordsSpectrum.find((w) => w.connotationScore === selectedWordScore) ||
      currentCluster.wordsSpectrum[0]
    );
  }, [currentCluster, selectedWordScore]);

  // Anti-Thesaurus Draft inspection
  const [userDraft, setUserDraft] = useState<string>("");

  const thesaurusAudit = useMemo(() => {
    return auditThesaurusPitfalls(userDraft, currentCluster.thesaurusPitfalls);
  }, [userDraft, currentCluster]);

  // Collocation Quiz Arena state
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [userQuizAnswerIndex, setUserQuizAnswerIndex] = useState<number | null>(null);
  const [isQuizAnswered, setIsQuizAnswered] = useState<boolean>(false);
  const [quizScoreStats, setQuizScoreStats] = useState<{ correct: number; total: number }>({
    correct: 0,
    total: 0
  });

  const currentQuizItem: CollocationMatchItem = useMemo(() => {
    return MOCK_COLLOCATION_QUIZ_ARENA[currentQuizIndex] || MOCK_COLLOCATION_QUIZ_ARENA[0];
  }, [currentQuizIndex]);

  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSelectCluster = (clusterId: string) => {
    setSelectedClusterId(clusterId);
    setSelectedWordScore(0);
    setUserDraft("");
    setIsSaved(false);
  };

  const handleSelectSpectrumScore = (score: -2 | -1 | 0 | 1 | 2) => {
    setSelectedWordScore(score);
  };

  const handleAnswerQuiz = (index: number) => {
    if (isQuizAnswered) return;
    setUserQuizAnswerIndex(index);
    setIsQuizAnswered(true);

    const isCorrect = index === currentQuizItem.correctIndex;
    setQuizScoreStats((prev) => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1
    }));
  };

  const handleNextQuiz = () => {
    setUserQuizAnswerIndex(null);
    setIsQuizAnswered(false);
    setCurrentQuizIndex((prev) => (prev + 1) % MOCK_COLLOCATION_QUIZ_ARENA.length);
  };

  const saveResultsToDatabase = useCallback(async () => {
    try {
      // 1. Save Practice Log
      await db.practice_logs.put({
        id: `lexical_log_${Date.now()}`,
        type: "lexical_spectrum",
        title: `Lexical Connotation & Collocations: ${currentCluster.conceptName}`,
        score: activeWordNuance.bandLevel,
        totalQuestions: quizScoreStats.total > 0 ? quizScoreStats.total : 1,
        accuracyPercentage: quizScoreStats.total > 0
          ? Math.round((quizScoreStats.correct / quizScoreStats.total) * 100)
          : thesaurusAudit.lexicalAccuracyScore,
        timeSpentSeconds: 90,
        details: {
          conceptId: currentCluster.id,
          activeWord: activeWordNuance.word,
          connotationScore: activeWordNuance.connotationScore,
          registerScore: activeWordNuance.registerScore,
          pitfallsDetected: thesaurusAudit.detectedPitfalls.length
        },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      });

      // 2. Log Collocation Trap to Error Bank if user picked wrong distractor
      if (isQuizAnswered && userQuizAnswerIndex !== null && userQuizAnswerIndex !== currentQuizItem.correctIndex) {
        const pickedOpt = currentQuizItem.options[userQuizAnswerIndex];
        const correctOpt = currentQuizItem.options[currentQuizItem.correctIndex];

        await db.error_bank.put({
          id: `err_colloc_${currentQuizItem.id}_${Date.now()}`,
          sourceModule: "vocab",
          errorType: "paraphrase_trap",
          questionContext: `Collocation Trap: ${currentQuizItem.targetNounOrKeyword}`,
          userWrongAnswer: pickedOpt.verbOrModifier,
          correctAnswer: correctOpt.verbOrModifier,
          deepExplanation: pickedOpt.feedback,
          mastered: false,
          retryCount: 1,
          createdAt: new Date().toISOString()
        });
      }

      setIsSaved(true);
    } catch (err) {
      console.error("Failed to save lexical spectrum session:", err);
    }
  }, [
    currentCluster,
    activeWordNuance,
    quizScoreStats,
    thesaurusAudit,
    isQuizAnswered,
    userQuizAnswerIndex,
    currentQuizItem
  ]);

  return {
    currentCluster,
    allClusters: MOCK_LEXICAL_CLUSTERS,
    selectedClusterId,
    handleSelectCluster,
    selectedWordScore,
    handleSelectSpectrumScore,
    activeWordNuance,
    userDraft,
    setUserDraft,
    thesaurusAudit,
    currentQuizItem,
    currentQuizIndex,
    totalQuizzes: MOCK_COLLOCATION_QUIZ_ARENA.length,
    userQuizAnswerIndex,
    isQuizAnswered,
    handleAnswerQuiz,
    handleNextQuiz,
    quizScoreStats,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isSaved,
    saveResultsToDatabase
  };
}
