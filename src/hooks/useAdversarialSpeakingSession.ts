'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { db } from '@/lib/db';
import {
  InterruptionStage,
  SpeechMetrics,
  InterruptionEvaluation,
  evaluateFluencyRecovery,
  playExaminerVoice
} from '@/lib/speechInterruptionEngine';
import { MOCK_ADVERSARIAL_SCENARIOS, AdversarialScenario } from '@/data/mockAdversarialSpeakingData';

export function useAdversarialSpeakingSession(initialScenarioId?: string) {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    initialScenarioId || MOCK_ADVERSARIAL_SCENARIOS[0].id
  );
  const [stage, setStage] = useState<InterruptionStage>('idle');
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [recoveryTimerMs, setRecoveryTimerMs] = useState<number>(0);
  const [measuredLatencyMs, setMeasuredLatencyMs] = useState<number | null>(null);
  const [isMicActive, setIsMicActive] = useState<boolean>(false);
  const [micVolume, setMicVolume] = useState<number>(0);
  const [selectedPivotStrategy, setSelectedPivotStrategy] = useState<string>('counter_concession');
  const [candidateNotes, setCandidateNotes] = useState<string>('');
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [audioFrequencyData, setAudioFrequencyData] = useState<Uint8Array>(new Uint8Array(64));

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const recoveryIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const recoveryStartTimestampRef = useRef<number | null>(null);

  const currentScenario = useMemo<AdversarialScenario>(() => {
    return (
      MOCK_ADVERSARIAL_SCENARIOS.find((s) => s.id === selectedScenarioId) ||
      MOCK_ADVERSARIAL_SCENARIOS[0]
    );
  }, [selectedScenarioId]);

  const selectScenario = useCallback((scenarioId: string) => {
    setSelectedScenarioId(scenarioId);
    setStage('idle');
    setElapsedSeconds(0);
    setRecoveryTimerMs(0);
    setMeasuredLatencyMs(null);
    setShowSummaryModal(false);
  }, []);

  // Cleanup audio & timers
  const cleanup = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (recoveryIntervalRef.current) clearInterval(recoveryIntervalRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setIsMicActive(false);
  }, []);

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  // Audio stream analyzer loop
  const setupAudioAnalysis = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      analyserRef.current = analyser;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);
      setIsMicActive(true);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateAcousticTelemetry = () => {
        analyser.getByteFrequencyData(dataArray);
        setAudioFrequencyData(new Uint8Array(dataArray));

        // Calculate average volume
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = Math.round(sum / bufferLength);
        setMicVolume(avg);

        // VAD Trigger for Recovery: If in awaiting_recovery stage and user speaks with volume > 25
        if (stage === 'awaiting_recovery' && avg > 25 && recoveryStartTimestampRef.current) {
          const latency = Date.now() - recoveryStartTimestampRef.current;
          if (latency > 300) { // filter out momentary noise
            setMeasuredLatencyMs(latency);
            setStage('recovered');
            if (recoveryIntervalRef.current) clearInterval(recoveryIntervalRef.current);
          }
        }

        animationFrameRef.current = requestAnimationFrame(updateAcousticTelemetry);
      };

      updateAcousticTelemetry();
    } catch (err) {
      console.warn('Microphone permission not granted or Web Audio unavailable:', err);
      setIsMicActive(false);
    }
  }, [stage]);

  // Start Candidate Speaking
  const startSpeakingSession = useCallback(async () => {
    cleanup();
    setStage('listening_to_candidate');
    setElapsedSeconds(0);
    setRecoveryTimerMs(0);
    setMeasuredLatencyMs(null);

    await setupAudioAnalysis();

    // Elapsed timer
    const targetTrigger = currentScenario.interruptionPlan.triggerSecondMin + 2;
    timerIntervalRef.current = setInterval(() => {
      setElapsedSeconds((prev) => {
        const next = prev + 1;
        // Trigger Interruption condition
        if (next >= targetTrigger) {
          triggerExaminerInterruption();
        }
        return next;
      });
    }, 1000);
  }, [cleanup, setupAudioAnalysis, currentScenario]);

  // Trigger Tactical Interruption
  const triggerExaminerInterruption = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setStage('examiner_interrupting');

    playExaminerVoice(
      currentScenario.interruptionPlan.interruptionPrompt,
      () => {
        // Interruption voice started
      },
      () => {
        // Interruption voice ended -> enter awaiting_recovery
        setStage('awaiting_recovery');
        recoveryStartTimestampRef.current = Date.now();

        recoveryIntervalRef.current = setInterval(() => {
          if (recoveryStartTimestampRef.current) {
            setRecoveryTimerMs(Date.now() - recoveryStartTimestampRef.current);
          }
        }, 50);
      }
    );
  }, [currentScenario]);

  // Manual Pivot Resume (for click or keyboard trigger)
  const manualResumeSpeech = useCallback(() => {
    if (stage === 'awaiting_recovery' && recoveryStartTimestampRef.current) {
      const latency = Date.now() - recoveryStartTimestampRef.current;
      setMeasuredLatencyMs(latency);
      setStage('recovered');
      if (recoveryIntervalRef.current) clearInterval(recoveryIntervalRef.current);
    }
  }, [stage]);

  // Complete session & save to Dexie
  const completeSession = useCallback(async () => {
    cleanup();
    setStage('completed');
    setShowSummaryModal(true);

    const latency = measuredLatencyMs || 1850;
    const evaluation = evaluateFluencyRecovery(latency);

    try {
      await db.practice_logs.add({
        id: `adv-${Date.now()}`,
        type: 'adversarial_speaking',
        title: `Oral Combat: ${currentScenario.topicTitle} vs ${currentScenario.examiner.name}`,
        score: latency < 1500 ? 90 : latency < 2500 ? 80 : 65,
        totalQuestions: 1,
        durationSeconds: Math.max(30, elapsedSeconds),
        timeSpentSeconds: Math.max(30, elapsedSeconds),
        accuracyPercentage: latency < 1500 ? 90 : latency < 2500 ? 80 : 65,
        phase: 3,
        details: {
          scenarioId: currentScenario.id,
          examiner: currentScenario.examiner.name,
          paradoxType: currentScenario.interruptionPlan.paradoxType,
          fluencyRecoveryLatencyMs: latency,
          latencyBand: evaluation.latencyBand,
          selectedPivotStrategy,
          candidateNotes
        },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      });

      if (evaluation.latencyBand === 'band_6_5' || evaluation.latencyBand === 'band_5_5_below') {
        await db.error_bank.add({
          id: `err-adv-${Date.now()}`,
          sourceModule: 'speaking',
          errorType: 'paraphrase_trap',
          questionContext: `[Adversarial Interruption] ${currentScenario.interruptionPlan.interruptionPrompt.slice(0, 80)}...`,
          userWrongAnswer: `Độ trễ phản hồi quá cao (${(latency / 1000).toFixed(2)}s) - Gián đoạn trôi chảy`,
          correctAnswer: `Sử dụng Pivot Frame 3s: "${currentScenario.interruptionPlan.modelBand85PivotResponse.slice(0, 70)}..."`,
          deepExplanation: evaluation.feedbackVi,
          mastered: false,
          retryCount: 0,
          createdAt: new Date().toISOString()
        });
      }
    } catch (e) {
      console.error('Dexie logging error for adversarial speaking:', e);
    }
  }, [
    cleanup,
    measuredLatencyMs,
    elapsedSeconds,
    currentScenario,
    selectedPivotStrategy,
    candidateNotes
  ]);

  const evaluationResult = useMemo<InterruptionEvaluation | null>(() => {
    if (measuredLatencyMs === null) return null;
    return evaluateFluencyRecovery(measuredLatencyMs);
  }, [measuredLatencyMs]);

  return {
    scenarios: MOCK_ADVERSARIAL_SCENARIOS,
    currentScenario,
    selectedScenarioId,
    selectScenario,
    stage,
    elapsedSeconds,
    recoveryTimerMs,
    measuredLatencyMs,
    isMicActive,
    micVolume,
    audioFrequencyData,
    selectedPivotStrategy,
    setSelectedPivotStrategy,
    candidateNotes,
    setCandidateNotes,
    startSpeakingSession,
    triggerExaminerInterruption,
    manualResumeSpeech,
    completeSession,
    cleanup,
    evaluationResult,
    showSummaryModal,
    setShowSummaryModal
  };
}
