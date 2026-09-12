"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  MOCK_HIGH_RATE_LECTURES
} from "@/data/mockHighRateLecturesData";
import {
  LectureScenario,
  PlaybackRateTier,
  SignpostMarker,
  LectureQuestionItem
} from "@/lib/timeStretchingDSP";
import { db } from "@/lib/db";

export function useHighRateLectureSession(initialScenarioId?: string) {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    initialScenarioId || MOCK_HIGH_RATE_LECTURES[0].id
  );

  const currentScenario: LectureScenario = useMemo(() => {
    return (
      MOCK_HIGH_RATE_LECTURES.find((s) => s.id === selectedScenarioId) ||
      MOCK_HIGH_RATE_LECTURES[0]
    );
  }, [selectedScenarioId]);

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<PlaybackRateTier>(1.0);

  // User input answers
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Audio timer ticker with playbackRate multiplier
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeSec((prev) => {
          const step = 0.5 * playbackRate;
          const next = prev + step;
          if (next >= currentScenario.durationSec) {
            setIsPlaying(false);
            return currentScenario.durationSec;
          }
          return next;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackRate, currentScenario.durationSec]);

  // Active Signpost Marker
  const activeSignpost: SignpostMarker | null = useMemo(() => {
    const active = currentScenario.signpostMarkers
      .filter((m) => currentTimeSec >= m.timestampSec && currentTimeSec <= m.timestampSec + 12)
      .pop();
    return active || null;
  }, [currentTimeSec, currentScenario]);

  // Approaching Question (Alert if within 10s of target question)
  const approachingQuestion: LectureQuestionItem | null = useMemo(() => {
    return (
      currentScenario.questions.find(
        (q) => currentTimeSec < q.timestampSec && q.timestampSec - currentTimeSec <= 10
      ) || null
    );
  }, [currentTimeSec, currentScenario]);

  const handleSelectScenario = (scenarioId: string) => {
    setSelectedScenarioId(scenarioId);
    setIsPlaying(false);
    setCurrentTimeSec(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setIsSaved(false);
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Score statistics
  const scoreStats = useMemo(() => {
    let correctCount = 0;
    const detailsList: {
      questionNumber: number;
      userAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
      isPluralTrap: boolean;
    }[] = [];

    currentScenario.questions.forEach((q) => {
      const uAnswer = (userAnswers[q.id] || "").trim().toLowerCase();
      const cAnswer = q.targetWord.trim().toLowerCase();
      const isCorrect = uAnswer === cAnswer;

      if (isCorrect) correctCount++;

      const isPluralTrap =
        q.grammarConstraint === "plural_noun" &&
        uAnswer.length > 0 &&
        !uAnswer.endsWith("s") &&
        !uAnswer.endsWith("es") &&
        cAnswer.endsWith("s");

      detailsList.push({
        questionNumber: q.questionNumber,
        userAnswer: userAnswers[q.id] || "",
        correctAnswer: q.targetWord,
        isCorrect,
        isPluralTrap
      });
    });

    const total = currentScenario.questions.length;
    const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const estimatedBand = Number(((correctCount / total) * 3.5 + 5.5).toFixed(1));

    return {
      correctCount,
      total,
      accuracy,
      estimatedBand,
      detailsList
    };
  }, [currentScenario, userAnswers]);

  const saveResultsToDatabase = useCallback(async () => {
    try {
      // 1. Save Practice Log
      await db.practice_logs.put({
        id: `high_rate_log_${Date.now()}`,
        type: "high_rate_lecture",
        title: `High-Rate Lecture (${playbackRate}x): ${currentScenario.title}`,
        score: scoreStats.estimatedBand,
        totalQuestions: scoreStats.total,
        accuracyPercentage: scoreStats.accuracy,
        timeSpentSeconds: Math.round(currentTimeSec),
        details: {
          scenarioId: currentScenario.id,
          playbackRate,
          correctCount: scoreStats.correctCount,
          total: scoreStats.total
        },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      });

      // 2. Log Errors to Error Bank
      for (const item of scoreStats.detailsList) {
        if (!item.isCorrect) {
          const q = currentScenario.questions.find((x) => x.questionNumber === item.questionNumber);
          if (q) {
            await db.error_bank.put({
              id: `err_lecture_${q.id}_${Date.now()}`,
              sourceModule: "listening",
              errorType: item.isPluralTrap ? "singular_plural" : "careless_reading",
              questionContext: `Section 4 Q${q.questionNumber}: "${q.sentenceContext}" (${playbackRate}x speed)`,
              userWrongAnswer: item.userAnswer || "(Blank / Missed in Audio Stream)",
              correctAnswer: q.targetWord,
              deepExplanation: q.acousticTrapExplanation,
              mastered: false,
              retryCount: 1,
              createdAt: new Date().toISOString()
            });
          }
        }
      }

      setIsSaved(true);
    } catch (err) {
      console.error("Failed to save high rate lecture session:", err);
    }
  }, [scoreStats, currentScenario, playbackRate, currentTimeSec]);

  return {
    currentScenario,
    allScenarios: MOCK_HIGH_RATE_LECTURES,
    selectedScenarioId,
    handleSelectScenario,
    isPlaying,
    setIsPlaying,
    currentTimeSec,
    setCurrentTimeSec,
    playbackRate,
    setPlaybackRate,
    activeSignpost,
    approachingQuestion,
    userAnswers,
    handleAnswerChange,
    isSubmitted,
    setIsSubmitted,
    scoreStats,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isSaved,
    saveResultsToDatabase
  };
}
