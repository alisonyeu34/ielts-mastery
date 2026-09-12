"use client";

import { useState, useMemo, useCallback } from "react";
import {
  MOCK_PRAGMATICS_EXCERPTS,
  PragmaticExcerptItem
} from "@/data/mockPragmaticsDecoderData";
import {
  analyzePragmaticSubtext,
  PragmaticAnalysisResult
} from "@/lib/pragmaticsSubtextEngine";
import { db } from "@/lib/db";

export function useImplicitPragmaticsSession(initialExcerptId?: string) {
  const [selectedExcerptId, setSelectedExcerptId] = useState<string>(
    initialExcerptId || MOCK_PRAGMATICS_EXCERPTS[0].id
  );

  const currentExcerpt: PragmaticExcerptItem = useMemo(() => {
    return (
      MOCK_PRAGMATICS_EXCERPTS.find((e) => e.id === selectedExcerptId) ||
      MOCK_PRAGMATICS_EXCERPTS[0]
    );
  }, [selectedExcerptId]);

  // Fluoroscope state
  const [highlightedText, setHighlightedText] = useState<string>(
    currentExcerpt.ironicMarker
  );

  // Rapid Fire Drill state
  const [userSelectedOption, setUserSelectedOption] = useState<number | null>(null);
  const [isDrillSubmitted, setIsDrillSubmitted] = useState<boolean>(false);
  const [drillHistory, setDrillHistory] = useState<Record<string, { selectedIndex: number; isCorrect: boolean; isLiteralTrap: boolean }>>({});

  // Audio simulation
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Real-time Pragmatic Fluoroscope Analysis
  const fluoroscopeAnalysis: PragmaticAnalysisResult = useMemo(() => {
    return analyzePragmaticSubtext(highlightedText || currentExcerpt.excerpt);
  }, [highlightedText, currentExcerpt]);

  const handleSelectExcerpt = (excerptId: string) => {
    setSelectedExcerptId(excerptId);
    const excerpt = MOCK_PRAGMATICS_EXCERPTS.find((e) => e.id === excerptId) || MOCK_PRAGMATICS_EXCERPTS[0];
    setHighlightedText(excerpt.ironicMarker);
    setUserSelectedOption(null);
    setIsDrillSubmitted(false);
    setIsPlayingAudio(false);
    setIsSaved(false);
  };

  const handleSelectFluoroscopeText = (text: string) => {
    setHighlightedText(text);
  };

  const handleSubmitDrillAnswer = (optionIndex: number) => {
    setUserSelectedOption(optionIndex);
    setIsDrillSubmitted(true);

    const isCorrect = optionIndex === currentExcerpt.drillQuestion.correctIndex;
    const isLiteralTrap = optionIndex === currentExcerpt.drillQuestion.literalTrapIndex;

    setDrillHistory((prev) => ({
      ...prev,
      [currentExcerpt.id]: {
        selectedIndex: optionIndex,
        isCorrect,
        isLiteralTrap
      }
    }));
  };

  // Cumulative score stats
  const totalAttempted = Object.keys(drillHistory).length;
  const totalCorrect = Object.values(drillHistory).filter((h) => h.isCorrect).length;
  const totalLiteralTraps = Object.values(drillHistory).filter((h) => h.isLiteralTrap).length;

  const saveResultsToDatabase = useCallback(async () => {
    try {
      const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 100;
      const estimatedBand = Number(((accuracy / 100) * 4.5 + 4.5).toFixed(1));

      // 1. Save Practice Log
      await db.practice_logs.put({
        id: `pragmatics_log_${Date.now()}`,
        type: "implicit_pragmatics",
        title: `Academic Pragmatics: ${currentExcerpt.title}`,
        score: estimatedBand,
        totalQuestions: totalAttempted || 1,
        accuracyPercentage: accuracy,
        timeSpentSeconds: 180,
        details: {
          totalAttempted,
          totalCorrect,
          totalLiteralTraps,
          lastTrapType: currentExcerpt.trapType
        },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      });

      // 2. Log Literal Trap to Error Bank if user fell for faint praise / literal meaning
      if (userSelectedOption === currentExcerpt.drillQuestion.literalTrapIndex) {
        await db.error_bank.put({
          id: `err_prag_${currentExcerpt.id}_${Date.now()}`,
          sourceModule: currentExcerpt.sourceType === "reading_passage3" ? "reading" : "listening",
          errorType: "paraphrase_trap",
          questionContext: currentExcerpt.excerpt.slice(0, 200),
          userWrongAnswer: currentExcerpt.drillQuestion.options[currentExcerpt.drillQuestion.literalTrapIndex],
          correctAnswer: currentExcerpt.drillQuestion.options[currentExcerpt.drillQuestion.correctIndex],
          deepExplanation: `Bạn đã mắc bẫy ${currentExcerpt.toneClassification}. ${currentExcerpt.cambridgeExamTrapAnalysis}`,
          mastered: false,
          retryCount: 1,
          createdAt: new Date().toISOString()
        });
      }

      setIsSaved(true);
    } catch (err) {
      console.error("Failed to save pragmatics session:", err);
    }
  }, [totalAttempted, totalCorrect, totalLiteralTraps, currentExcerpt, userSelectedOption]);

  return {
    currentExcerpt,
    allExcerpts: MOCK_PRAGMATICS_EXCERPTS,
    selectedExcerptId,
    handleSelectExcerpt,
    highlightedText,
    handleSelectFluoroscopeText,
    fluoroscopeAnalysis,
    userSelectedOption,
    isDrillSubmitted,
    handleSubmitDrillAnswer,
    drillHistory,
    totalAttempted,
    totalCorrect,
    totalLiteralTraps,
    isPlayingAudio,
    setIsPlayingAudio,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isSaved,
    saveResultsToDatabase
  };
}
