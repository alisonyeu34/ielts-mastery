"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { db } from "@/lib/db";
import {
  MOCK_SPEED_READING_PASSAGES,
  SpeedReadingPassage,
  ScanningKeywordTarget,
  ParaphrasePair,
  FSRSVocabPayload,
} from "@/data/mockSpeedReadingData";
import {
  chunkTextIntoSaccades,
  calculateChunkIntervalMs,
  calculateEffectiveWPM,
  getSpeedReadingBandRating,
  SaccadeChunk,
  StructuredParagraph,
} from "@/lib/saccadesEngine";

export type SpeedReadingMode = "pacer" | "skim" | "scan" | "paraphrase";

export interface ConnectedBezierLine {
  id: string;
  questionId: string;
  passageId: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isCorrect: boolean;
  pairData: ParaphrasePair;
}

export function useSpeedReadingSession() {
  const [selectedPassage, setSelectedPassage] = useState<SpeedReadingPassage>(
    MOCK_SPEED_READING_PASSAGES[0]
  );
  const [mode, setMode] = useState<SpeedReadingMode>("pacer");
  const [wpm, setWpm] = useState<number>(260);

  // --- 1. Saccades Pacing State ---
  const [isPacingActive, setIsPacingActive] = useState<boolean>(false);
  const [currentChunkIndex, setCurrentChunkIndex] = useState<number>(0);
  const pacingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --- 2. 90-Second Skim Mode State ---
  const [isSkimmingActive, setIsSkimmingActive] = useState<boolean>(false);
  const [skimSecondsRemaining, setSkimSecondsRemaining] = useState<number>(90);
  const skimTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --- 3. Scanning Radar State ---
  const [activeScanTargetIndex, setActiveScanTargetIndex] = useState<number>(0);
  const [scanStopwatchMs, setScanStopwatchMs] = useState<number>(0);
  const [isScanRunning, setIsScanRunning] = useState<boolean>(false);
  const [scanResultFeedback, setScanResultFeedback] = useState<{
    success: boolean;
    elapsedSeconds: number;
    message: string;
  } | null>(null);
  const scanTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --- 4. 2-Way Paraphrase Matrix State ---
  const [selectedQuestionPhraseId, setSelectedQuestionPhraseId] = useState<string | null>(null);
  const [selectedPassagePhraseId, setSelectedPassagePhraseId] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<ParaphrasePair[]>([]);
  const [activeParaphraseModalPair, setActiveParaphraseModalPair] = useState<ParaphrasePair | null>(null);
  const [paraphraseErrorShake, setParaphraseErrorShake] = useState<boolean>(false);
  const [connectedLines, setConnectedLines] = useState<ConnectedBezierLine[]>([]);

  // --- 5. Comprehension Quiz & Stats State ---
  const [isQuizModalOpen, setIsQuizModalOpen] = useState<boolean>(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [comprehensionRate, setComprehensionRate] = useState<number>(0);

  // Chunking and Paragraph Analysis
  const { chunks, paragraphs }: { chunks: SaccadeChunk[]; paragraphs: StructuredParagraph[] } =
    useMemo(() => {
      return chunkTextIntoSaccades(selectedPassage.paragraphs, 3);
    }, [selectedPassage]);

  // --- Saccades Pacing Interval Handler ---
  useEffect(() => {
    if (isPacingActive) {
      const intervalMs = calculateChunkIntervalMs(wpm, 3.2);

      pacingTimerRef.current = setInterval(() => {
        setCurrentChunkIndex((prev) => {
          if (prev >= chunks.length - 1) {
            // Reached the end of passage
            setIsPacingActive(false);
            setIsQuizModalOpen(true);
            return prev;
          }
          return prev + 1;
        });
      }, intervalMs);
    } else {
      if (pacingTimerRef.current) clearInterval(pacingTimerRef.current);
    }

    return () => {
      if (pacingTimerRef.current) clearInterval(pacingTimerRef.current);
    };
  }, [isPacingActive, wpm, chunks.length]);

  // --- 90s Skimming Countdown Handler ---
  useEffect(() => {
    if (isSkimmingActive && skimSecondsRemaining > 0) {
      skimTimerRef.current = setInterval(() => {
        setSkimSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsSkimmingActive(false);
            setIsQuizModalOpen(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (skimTimerRef.current) clearInterval(skimTimerRef.current);
    }

    return () => {
      if (skimTimerRef.current) clearInterval(skimTimerRef.current);
    };
  }, [isSkimmingActive, skimSecondsRemaining]);

  // --- Scanning Radar Stopwatch Handler ---
  useEffect(() => {
    if (isScanRunning) {
      const startTime = Date.now() - scanStopwatchMs;
      scanTimerRef.current = setInterval(() => {
        setScanStopwatchMs(Date.now() - startTime);
      }, 50);
    } else {
      if (scanTimerRef.current) clearInterval(scanTimerRef.current);
    }

    return () => {
      if (scanTimerRef.current) clearInterval(scanTimerRef.current);
    };
  }, [isScanRunning, scanStopwatchMs]);

  // Actions for Pacer
  const togglePacing = useCallback(() => {
    setIsPacingActive((prev) => !prev);
  }, []);

  const resetPacing = useCallback(() => {
    setIsPacingActive(false);
    setCurrentChunkIndex(0);
  }, []);

  // Actions for Skim
  const startSkimming = useCallback(() => {
    setSkimSecondsRemaining(90);
    setIsSkimmingActive(true);
  }, []);

  const stopSkimming = useCallback(() => {
    setIsSkimmingActive(false);
  }, []);

  // Actions for Scan Radar
  const startScanningTarget = useCallback((targetIndex = 0) => {
    setActiveScanTargetIndex(targetIndex);
    setScanStopwatchMs(0);
    setIsScanRunning(true);
    setScanResultFeedback(null);
  }, []);

  const handleScanChunkClick = useCallback(
    async (chunk: SaccadeChunk) => {
      if (!isScanRunning) return;

      const target: ScanningKeywordTarget | undefined =
        selectedPassage.scanningTargets[activeScanTargetIndex];
      if (!target) return;

      const cleanTarget = target.keyword.toLowerCase();
      const chunkText = chunk.text.toLowerCase();
      const isMatch = chunkText.includes(cleanTarget);
      const elapsedSec = parseFloat((scanStopwatchMs / 1000).toFixed(2));

      setIsScanRunning(false);

      if (isMatch) {
        setScanResultFeedback({
          success: true,
          elapsedSeconds: elapsedSec,
          message: `🎯 Tuyệt vời! Bạn định vị từ khóa "${target.keyword}" chỉ trong ${elapsedSec}s. Đạt phản xạ Scanning Band 8.0!`,
        });
      } else {
        setScanResultFeedback({
          success: false,
          elapsedSeconds: elapsedSec,
          message: `⚠️ Chưa chính xác. Vị trí bạn chọn không chứa từ khóa "${target.keyword}". Hãy quan sát kỹ hơn các chữ số và danh từ riêng!`,
        });

        // Add to Error Bank
        try {
          await db.error_bank.add({
            id: `err_scan_${Date.now()}`,
            sourceModule: "reading",
            errorType: "careless_reading",
            questionContext: `Scanning Radar: Tìm từ khóa '${target.keyword}' trong ${selectedPassage.title}`,
            userWrongAnswer: chunk.text,
            correctAnswer: target.keyword,
            deepExplanation: `Thí sinh quét nhầm vị trí hoặc bị phân tâm bởi các từ vựng gây nhiễu. Thời gian quét: ${elapsedSec}s (Giới hạn: ${target.maxTargetTimeSeconds}s).`,
            mastered: false,
            retryCount: 0,
            createdAt: new Date().toISOString(),
          });
        } catch (e) {
          console.error("Failed to add scanning error to Error Bank:", e);
        }
      }
    },
    [isScanRunning, selectedPassage, activeScanTargetIndex, scanStopwatchMs]
  );

  // Paraphrase Linking Actions
  const handleSelectQuestionPhrase = useCallback((id: string) => {
    setSelectedQuestionPhraseId(id);
  }, []);

  const handleSelectPassagePhrase = useCallback(
    async (pairId: string) => {
      setSelectedPassagePhraseId(pairId);

      if (!selectedQuestionPhraseId) return;

      // Verify matching pair
      if (selectedQuestionPhraseId === pairId) {
        const matched = selectedPassage.paraphrasePairs.find((p) => p.id === pairId);
        if (matched && !matchedPairs.some((p) => p.id === pairId)) {
          setMatchedPairs((prev) => [...prev, matched]);
          setActiveParaphraseModalPair(matched);
        }
        setSelectedQuestionPhraseId(null);
        setSelectedPassagePhraseId(null);
      } else {
        // Wrong pair match
        setParaphraseErrorShake(true);
        setTimeout(() => setParaphraseErrorShake(false), 800);
        setSelectedQuestionPhraseId(null);
        setSelectedPassagePhraseId(null);
      }
    },
    [selectedQuestionPhraseId, selectedPassage.paraphrasePairs, matchedPairs]
  );

  // Sync Paraphrase into Vocab Matrix (FSRS)
  const addParaphraseToVocabMatrix = useCallback(async (entry: FSRSVocabPayload) => {
    try {
      const today = new Date().toISOString().split("T")[0];
      await db.vocab_matrix.put({
        id: `vocab_para_${Date.now()}`,
        word: entry.word,
        ipa: entry.ipa,
        meaning: entry.meaning,
        collocations: entry.collocations,
        originalContext: entry.originalContext,
        category: entry.category,
        status: "learning",
        stepInterval: 1,
        nextReviewDate: today,
        repetitionCount: 0,
        lapsesCount: 0,
        stability: 2.0,
        difficulty: 5.0,
        createdAt: new Date().toISOString(),
      });
      return true;
    } catch (err) {
      console.error("Failed to add paraphrase vocab to FSRS matrix:", err);
      return false;
    }
  }, []);

  // Submit Quiz & Evaluate
  const submitComprehensionQuiz = useCallback(
    async (answers: Record<string, number>) => {
      setQuizAnswers(answers);
      let correct = 0;
      const total = selectedPassage.comprehensionQuestions.length;

      selectedPassage.comprehensionQuestions.forEach((q) => {
        if (answers[q.id] === q.correctIndex) {
          correct++;
        }
      });

      const rate = total > 0 ? Math.round((correct / total) * 100) : 0;
      setQuizScore(correct);
      setComprehensionRate(rate);
      setIsQuizModalOpen(false);
      setIsStatsModalOpen(true);

      // Save to practice logs
      try {
        await db.practice_logs.put({
          id: `log_speed_reading_${Date.now()}`,
          type: "speed_reading",
          materialId: selectedPassage.id,
          title: `Speed Reading: ${selectedPassage.title}`,
          score: correct,
          totalQuestions: total,
          accuracyPercentage: rate,
          timeSpentSeconds: mode === "skim" ? 90 - skimSecondsRemaining : 180,
          details: {
            rawWpm: wpm,
            effectiveWpm: calculateEffectiveWPM(wpm, rate),
            mode,
            matchedParaphrasesCount: matchedPairs.length,
          },
          createdAt: new Date().toISOString(),
        });
      } catch (e) {
        console.error("Failed to log speed reading practice:", e);
      }
    },
    [selectedPassage, mode, skimSecondsRemaining, wpm, matchedPairs.length]
  );

  return {
    selectedPassage,
    setSelectedPassage,
    mode,
    setMode,
    wpm,
    setWpm,
    chunks,
    paragraphs,
    // Pacer
    isPacingActive,
    currentChunkIndex,
    setCurrentChunkIndex,
    togglePacing,
    resetPacing,
    // Skim
    isSkimmingActive,
    skimSecondsRemaining,
    startSkimming,
    stopSkimming,
    // Scan Radar
    activeScanTargetIndex,
    setActiveScanTargetIndex,
    scanStopwatchMs,
    isScanRunning,
    scanResultFeedback,
    startScanningTarget,
    handleScanChunkClick,
    // Paraphrase
    selectedQuestionPhraseId,
    selectedPassagePhraseId,
    matchedPairs,
    activeParaphraseModalPair,
    setActiveParaphraseModalPair,
    paraphraseErrorShake,
    connectedLines,
    setConnectedLines,
    handleSelectQuestionPhrase,
    handleSelectPassagePhrase,
    addParaphraseToVocabMatrix,
    // Quiz & Stats
    isQuizModalOpen,
    setIsQuizModalOpen,
    isStatsModalOpen,
    setIsStatsModalOpen,
    quizAnswers,
    quizScore,
    comprehensionRate,
    submitComprehensionQuiz,
    effectiveWpm: calculateEffectiveWPM(wpm, comprehensionRate),
    bandRating: getSpeedReadingBandRating(wpm, comprehensionRate),
  };
}
