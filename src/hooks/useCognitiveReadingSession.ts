"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { db } from "@/lib/db";
import {
  MOCK_COGNITIVE_PASSAGES,
  CognitiveReadingPassage,
  CognitiveCheckpointQuestion,
} from "@/data/mockCognitivePassagesData";
import {
  prepareVanishingWords,
  prepareRSVPChunks,
  evaluateERR,
  calculateWordIntervalMs,
  VanishingWordItem,
  RSVPChunk,
  ERREvaluation,
} from "@/lib/antiSubvocalizationEngine";

export type CognitiveReadingMode = "vanishing" | "rsvp";

export function useCognitiveReadingSession() {
  const [selectedPassage, setSelectedPassage] = useState<CognitiveReadingPassage>(
    MOCK_COGNITIVE_PASSAGES[0]
  );
  const [mode, setMode] = useState<CognitiveReadingMode>("vanishing");
  const [wpm, setWpm] = useState<number>(260);

  // --- 1. Vanishing Stream State ---
  const [isReadingActive, setIsReadingActive] = useState<boolean>(false);
  const [activeWordGlobalIndex, setActiveWordGlobalIndex] = useState<number>(0);
  const [fadedWordIndices, setFadedWordIndices] = useState<Set<number>>(new Set());

  // --- 2. Multi-Word RSVP State ---
  const [isRSVPActive, setIsRSVPActive] = useState<boolean>(false);
  const [activeRSVPIndex, setActiveRSVPIndex] = useState<number>(0);

  // --- 3. Checkpoints & Comprehension State ---
  const [activeCheckpoint, setActiveCheckpoint] = useState<CognitiveCheckpointQuestion | null>(null);
  const [isCheckpointModalOpen, setIsCheckpointModalOpen] = useState<boolean>(false);
  const [checkpointAnswers, setCheckpointAnswers] = useState<Record<number, number>>({});
  const [checkpointResults, setCheckpointResults] = useState<Record<number, boolean>>({});
  const [checkpointSecondsLeft, setCheckpointSecondsLeft] = useState<number>(15);

  // --- 4. Summary & Stats State ---
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);

  const readingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const rsvpTimerRef = useRef<NodeJS.Timeout | null>(null);
  const checkpointTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Prepare Word and RSVP items
  const { words: vanishingWords } = useMemo(() => {
    return prepareVanishingWords(selectedPassage.paragraphs, wpm);
  }, [selectedPassage, wpm]);

  const { chunks: rsvpChunks } = useMemo(() => {
    return prepareRSVPChunks(selectedPassage.paragraphs, wpm, 3);
  }, [selectedPassage, wpm]);

  // Calculate ERR Metric
  const totalCheckpoints = selectedPassage.checkpoints.length;
  const correctCheckpoints = Object.values(checkpointResults).filter(Boolean).length;
  const comprehensionPercentage =
    totalCheckpoints > 0 ? Math.round((correctCheckpoints / totalCheckpoints) * 100) : 0;

  const errEvaluation: ERREvaluation = useMemo(() => {
    return evaluateERR(wpm, comprehensionPercentage);
  }, [wpm, comprehensionPercentage]);

  // Vanishing Stream Ticker
  useEffect(() => {
    if (isReadingActive && mode === "vanishing") {
      const intervalMs = calculateWordIntervalMs(wpm);

      readingTimerRef.current = setInterval(() => {
        setActiveWordGlobalIndex((prev) => {
          const next = prev + 1;
          // Words 4 steps behind fade away permanently
          if (prev >= 4) {
            setFadedWordIndices((oldSet) => new Set(oldSet).add(prev - 4));
          }

          // Check if triggered a checkpoint (e.g. at end of paragraph 1)
          const currentWord = vanishingWords[prev];
          if (currentWord) {
            const hitCheckpoint = selectedPassage.checkpoints.find(
              (cp) =>
                cp.triggerParagraphIndex === currentWord.paragraphIndex &&
                currentWord.wordIndexInParagraph === 0 &&
                currentWord.paragraphIndex > 0 &&
                checkpointResults[cp.checkpointIndex] === undefined
            );

            if (hitCheckpoint) {
              setIsReadingActive(false);
              setActiveCheckpoint(hitCheckpoint);
              setIsCheckpointModalOpen(true);
              setCheckpointSecondsLeft(15);
            }
          }

          if (next >= vanishingWords.length) {
            setIsReadingActive(false);
            setIsSummaryModalOpen(true);
            return prev;
          }
          return next;
        });
      }, intervalMs);
    } else {
      if (readingTimerRef.current) clearInterval(readingTimerRef.current);
    }

    return () => {
      if (readingTimerRef.current) clearInterval(readingTimerRef.current);
    };
  }, [isReadingActive, mode, wpm, vanishingWords, selectedPassage.checkpoints, checkpointResults]);

  // RSVP Ticker
  useEffect(() => {
    if (isRSVPActive && mode === "rsvp") {
      const currentChunk = rsvpChunks[activeRSVPIndex];
      const intervalMs = currentChunk ? currentChunk.displayIntervalMs : 650;

      rsvpTimerRef.current = setTimeout(() => {
        setActiveRSVPIndex((prev) => {
          const next = prev + 1;
          if (next >= rsvpChunks.length) {
            setIsRSVPActive(false);
            setIsSummaryModalOpen(true);
            return prev;
          }
          return next;
        });
      }, intervalMs);
    }

    return () => {
      if (rsvpTimerRef.current) clearTimeout(rsvpTimerRef.current);
    };
  }, [isRSVPActive, mode, activeRSVPIndex, rsvpChunks]);

  // Checkpoint 15s Countdown Timer
  useEffect(() => {
    if (isCheckpointModalOpen && checkpointSecondsLeft > 0) {
      checkpointTimerRef.current = setInterval(() => {
        setCheckpointSecondsLeft((prev) => {
          if (prev <= 1) {
            // Auto timeout submit
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (checkpointTimerRef.current) clearInterval(checkpointTimerRef.current);
    }

    return () => {
      if (checkpointTimerRef.current) clearInterval(checkpointTimerRef.current);
    };
  }, [isCheckpointModalOpen, checkpointSecondsLeft]);

  // Actions for Vanishing Mode
  const toggleReading = useCallback(() => {
    setIsReadingActive((prev) => !prev);
  }, []);

  const resetReading = useCallback(() => {
    setIsReadingActive(false);
    setActiveWordGlobalIndex(0);
    setFadedWordIndices(new Set());
  }, []);

  // Actions for RSVP Mode
  const toggleRSVP = useCallback(() => {
    setIsRSVPActive((prev) => !prev);
  }, []);

  const resetRSVP = useCallback(() => {
    setIsRSVPActive(false);
    setActiveRSVPIndex(0);
  }, []);

  // Submit Checkpoint MCQ Answer
  const submitCheckpointAnswer = useCallback(
    async (optionIndex: number) => {
      if (!activeCheckpoint) return;

      const isCorrect = optionIndex === activeCheckpoint.correctIndex;
      const cpIndex = activeCheckpoint.checkpointIndex;

      setCheckpointAnswers((prev) => ({ ...prev, [cpIndex]: optionIndex }));
      setCheckpointResults((prev) => ({ ...prev, [cpIndex]: isCorrect }));
      setIsCheckpointModalOpen(false);

      if (!isCorrect) {
        // Auto-save failed cognitive check to Error Bank
        try {
          await db.error_bank.add({
            id: `err_cog_read_${Date.now()}`,
            sourceModule: "reading",
            errorType: "careless_reading",
            questionContext: `Cognitive Checkpoint (${wpm} WPM): ${activeCheckpoint.question}`,
            userWrongAnswer: activeCheckpoint.options[optionIndex] || "Timed out / Incorrect",
            correctAnswer: activeCheckpoint.options[activeCheckpoint.correctIndex],
            deepExplanation: `Bạn đọc nhanh ở tốc độ ${wpm} WPM nhưng bị mất khả năng tiếp thu ý niệm cốt lõi. Hãy cân bằng giữa việc chống đọc thầm và ghi nhận cấu trúc logic.`,
            mastered: false,
            retryCount: 0,
            createdAt: new Date().toISOString(),
          });
        } catch (e) {
          console.error("Failed to add cognitive reading error to Error Bank:", e);
        }
      }

      // Resume reading stream
      setIsReadingActive(true);
    },
    [activeCheckpoint, wpm]
  );

  // Save Final Evaluation to Dexie DB
  const saveFinalEvaluationLog = useCallback(async () => {
    setIsSummaryModalOpen(true);
    try {
      await db.practice_logs.put({
        id: `log_cog_reading_${Date.now()}`,
        type: "cognitive_reading_drill",
        materialId: selectedPassage.id,
        title: `Cognitive Anti-Regression: ${selectedPassage.title}`,
        score: errEvaluation.effectiveReadingRate,
        totalQuestions: totalCheckpoints,
        accuracyPercentage: comprehensionPercentage,
        timeSpentSeconds: 150,
        details: {
          wpm,
          effectiveReadingRate: errEvaluation.effectiveReadingRate,
          mode,
          bandEstimate: errEvaluation.bandEstimate,
        },
        createdAt: new Date().toISOString(),
      });
    } catch (e) {
      console.error("Failed to save cognitive reading log:", e);
    }
  }, [selectedPassage, errEvaluation, totalCheckpoints, comprehensionPercentage, wpm, mode]);

  return {
    selectedPassage,
    setSelectedPassage,
    mode,
    setMode,
    wpm,
    setWpm,
    vanishingWords,
    activeWordGlobalIndex,
    fadedWordIndices,
    isReadingActive,
    toggleReading,
    resetReading,
    rsvpChunks,
    activeRSVPIndex,
    isRSVPActive,
    toggleRSVP,
    resetRSVP,
    activeCheckpoint,
    isCheckpointModalOpen,
    checkpointAnswers,
    checkpointResults,
    checkpointSecondsLeft,
    submitCheckpointAnswer,
    errEvaluation,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    saveFinalEvaluationLog,
  };
}
