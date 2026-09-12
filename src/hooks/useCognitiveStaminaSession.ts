'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { db } from '@/lib/db';
import {
  CognitiveTelemetryMetrics,
  CognitiveCurvePoint,
  calculateBrainFogFactor,
  evaluateFatigueZone,
  generateBaselineCurveData,
  EXAM_TIMELINE_STAGES
} from '@/lib/keystrokeDynamicsEngine';
import { MOCK_THREE_HOUR_EXAM_PACKAGE, ThreeHourExamPackage } from '@/data/mockThreeHourExamPackage';

export function useCognitiveStaminaSession() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [simulationSpeedMultiplier, setSimulationSpeedMultiplier] = useState<number>(1); // 1x or accelerated for demonstration
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [activeSectionId, setActiveSectionId] = useState<'listening' | 'reading' | 'writing_task1' | 'writing_task2'>('listening');
  
  // Keystroke Telemetry States
  const [candidateEssayText, setCandidateEssayText] = useState<string>('');
  const [totalKeystrokes, setTotalKeystrokes] = useState<number>(0);
  const [backspaceCount, setBackspaceCount] = useState<number>(0);
  const [meanFlightTimeMs, setMeanFlightTimeMs] = useState<number>(140);
  const [baselineFlightTimeMs] = useState<number>(140);
  const [prolongedPauseCount, setProlongedPauseCount] = useState<number>(0);
  const [currentWpm, setCurrentWpm] = useState<number>(45);

  // Micro-Reset Modal
  const [isMicroResetOpen, setIsMicroResetOpen] = useState<boolean>(false);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);

  const lastKeyUpTimestampRef = useRef<number>(Date.now());
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const keystrokeHistoryRef = useRef<number[]>([]); // Recent flight times

  const examPackage: ThreeHourExamPackage = MOCK_THREE_HOUR_EXAM_PACKAGE;

  const elapsedMinutes = Math.floor(elapsedSeconds / 60);

  // Sync active section with elapsed minutes
  useEffect(() => {
    if (elapsedMinutes < 40) {
      setActiveSectionId('listening');
    } else if (elapsedMinutes < 100) {
      setActiveSectionId('reading');
    } else if (elapsedMinutes < 120) {
      setActiveSectionId('writing_task1');
    } else {
      setActiveSectionId('writing_task2');
    }
  }, [elapsedMinutes]);

  // Main Timer Loop
  useEffect(() => {
    if (isRunning) {
      timerIntervalRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          const next = prev + simulationSpeedMultiplier;
          if (next >= 180 * 60) {
            setIsRunning(false);
            setShowSummaryModal(true);
            return 180 * 60;
          }
          return next;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isRunning, simulationSpeedMultiplier]);

  // Handle Keystroke Telemetry on typing
  const handleEssayKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const now = Date.now();
    const flightTime = now - lastKeyUpTimestampRef.current;

    // Detect pauses > 3.0s
    if (flightTime > 3000) {
      setProlongedPauseCount((prev) => prev + 1);
    }

    // Filter reasonable flight time range (20ms - 1500ms)
    if (flightTime >= 20 && flightTime <= 2000) {
      keystrokeHistoryRef.current.push(flightTime);
      if (keystrokeHistoryRef.current.length > 50) {
        keystrokeHistoryRef.current.shift();
      }

      const sum = keystrokeHistoryRef.current.reduce((a, b) => a + b, 0);
      const avg = Math.round(sum / keystrokeHistoryRef.current.length);
      setMeanFlightTimeMs(avg);
    }

    setTotalKeystrokes((prev) => prev + 1);

    if (e.key === 'Backspace' || e.key === 'Delete') {
      setBackspaceCount((prev) => prev + 1);
    }
  }, []);

  const handleEssayKeyUp = useCallback(() => {
    lastKeyUpTimestampRef.current = Date.now();
  }, []);

  // Update WPM based on word count & elapsed time in writing section
  const handleEssayChange = useCallback((text: string) => {
    setCandidateEssayText(text);
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const writingMinutes = Math.max(1, (elapsedSeconds - 100 * 60) / 60);
    if (writingMinutes > 0) {
      setCurrentWpm(Math.round(words / writingMinutes));
    }
  }, [elapsedSeconds]);

  // Brain Fog Factor calculation
  const bff = useMemo(() => {
    // Base simulation increase as minutes advance past 100
    let simulatedFatigueBonus = 0;
    if (elapsedMinutes > 100) {
      simulatedFatigueBonus = (elapsedMinutes - 100) * 0.4;
    }
    const calculated = calculateBrainFogFactor(
      meanFlightTimeMs,
      baselineFlightTimeMs,
      backspaceCount,
      totalKeystrokes,
      prolongedPauseCount
    );
    return Math.min(100, Math.round(calculated + simulatedFatigueBonus));
  }, [meanFlightTimeMs, baselineFlightTimeMs, backspaceCount, totalKeystrokes, prolongedPauseCount, elapsedMinutes]);

  const fatigueEvaluation = useMemo(() => {
    return evaluateFatigueZone(bff);
  }, [bff]);

  // Jump to specific minute (for fast testing / simulation)
  const jumpToMinute = useCallback((min: number) => {
    setElapsedSeconds(min * 60);
  }, []);

  const startSimulation = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pauseSimulation = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetSimulation = useCallback(() => {
    setIsRunning(false);
    setElapsedSeconds(0);
    setCandidateEssayText('');
    setTotalKeystrokes(0);
    setBackspaceCount(0);
    setMeanFlightTimeMs(140);
    setProlongedPauseCount(0);
    setShowSummaryModal(false);
  }, []);

  const triggerMicroReset = useCallback(() => {
    setIsMicroResetOpen(true);
  }, []);

  const completeMicroReset = useCallback(() => {
    setIsMicroResetOpen(false);
    // Micro-reset relieves flight time latency and reduces fatigue index
    setMeanFlightTimeMs((prev) => Math.max(130, prev - 30));
  }, []);

  const completeExam = useCallback(async () => {
    setIsRunning(false);
    setShowSummaryModal(true);

    try {
      await db.practice_logs.add({
        id: `cst-${Date.now()}`,
        type: 'cognitive_stamina_full_run',
        title: `3-Hour Cognitive Stamina Run (${examPackage.packageName})`,
        score: Math.max(60, 100 - Math.round(bff * 0.4)),
        totalQuestions: 82, // 40 L + 40 R + 2 W
        durationSeconds: Math.max(60, elapsedSeconds),
        timeSpentSeconds: Math.max(60, elapsedSeconds),
        accuracyPercentage: Math.max(60, 100 - Math.round(bff * 0.4)),
        phase: 3,
        details: {
          finalBff: bff,
          fatigueZone: fatigueEvaluation.zone,
          totalKeystrokes,
          backspaceCount,
          meanFlightTimeMs,
          essayWordCount: candidateEssayText.trim().split(/\s+/).filter(Boolean).length
        },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      });

      // If high BFF, log working memory fatigue failure into error bank
      if (bff > 65) {
        await db.error_bank.add({
          id: `err-cst-${Date.now()}`,
          sourceModule: 'writing',
          errorType: 'careless_reading',
          questionContext: `3-Hour Stamina Run - Task 2 at Minute ${elapsedMinutes}: "Technological Resiliency"`,
          userWrongAnswer: `Brain Fog Syntax Decay: High backspace ratio (${backspaceCount}/${totalKeystrokes}) and flight latency (${meanFlightTimeMs}ms).`,
          correctAnswer: 'Syntactically stable academic prose maintained under exhaustion',
          deepExplanation: `Lỗi này xuất hiện ở phút thứ ${elapsedMinutes} của bài thi khi chỉ số Brain Fog Factor của bạn vọt lên ${bff}%. Bạn đã suy kiệt bộ nhớ làm việc (Working Memory Depletion). Hãy áp dụng Giao thức Micro-Reset 30s trước khi viết Body 2.`,
          mastered: false,
          retryCount: 0,
          createdAt: new Date().toISOString()
        });
      }
    } catch (e) {
      console.error('Dexie logging error for cognitive stamina:', e);
    }
  }, [
    bff,
    fatigueEvaluation.zone,
    elapsedSeconds,
    elapsedMinutes,
    examPackage.packageName,
    totalKeystrokes,
    backspaceCount,
    meanFlightTimeMs,
    candidateEssayText
  ]);

  const cognitiveCurvePoints: CognitiveCurvePoint[] = useMemo(() => {
    return generateBaselineCurveData(bff, elapsedMinutes);
  }, [bff, elapsedMinutes]);

  const telemetryMetrics: CognitiveTelemetryMetrics = {
    elapsedSeconds,
    elapsedMinutes,
    currentWpm,
    totalKeystrokes,
    backspaceCount,
    meanFlightTimeMs,
    baselineFlightTimeMs,
    prolongedPauseCount,
    brainFogFactor: bff,
    fatigueZone: fatigueEvaluation.zone,
    fatigueLabelVi: fatigueEvaluation.labelVi,
    isMicroResetRecommended: fatigueEvaluation.recommendReset,
    activeExamSection: activeSectionId
  };

  return {
    examPackage,
    isRunning,
    startSimulation,
    pauseSimulation,
    resetSimulation,
    completeExam,
    jumpToMinute,
    simulationSpeedMultiplier,
    setSimulationSpeedMultiplier,
    telemetryMetrics,
    cognitiveCurvePoints,
    candidateEssayText,
    handleEssayChange,
    handleEssayKeyDown,
    handleEssayKeyUp,
    isMicroResetOpen,
    triggerMicroReset,
    completeMicroReset,
    showSummaryModal,
    setShowSummaryModal,
    activeSection: examPackage.sections.find((s) => s.sectionId === activeSectionId) || examPackage.sections[0]
  };
}
