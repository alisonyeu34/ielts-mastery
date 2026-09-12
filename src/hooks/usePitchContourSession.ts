"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  MOCK_PITCH_EXERCISES,
  SpeakingPart3PitchExercise
} from "@/data/mockPitchCadenceData";
import {
  PitchDataPoint,
  extractPitchAutocorrelation,
  detectUptalkAnomaly,
  calculatePitchAlignment,
  UptalkDetectionResult,
  ShadowingAlignmentResult
} from "@/lib/pitchTrackerEngine";
import { db } from "@/lib/db";

export function usePitchContourSession(initialExerciseId?: string) {
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>(
    initialExerciseId || MOCK_PITCH_EXERCISES[0].id
  );

  const currentExercise: SpeakingPart3PitchExercise = useMemo(() => {
    return (
      MOCK_PITCH_EXERCISES.find((e) => e.id === selectedExerciseId) ||
      MOCK_PITCH_EXERCISES[0]
    );
  }, [selectedExerciseId]);

  // Audio recording state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPlayingNativeModel, setIsPlayingNativeModel] = useState<boolean>(false);
  const [isSimulatingUptalk, setIsSimulatingUptalk] = useState<boolean>(false);
  const [userPitchTimeline, setUserPitchTimeline] = useState<PitchDataPoint[]>([]);

  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Audio nodes refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Live Uptalk Detection
  const uptalkDetection: UptalkDetectionResult = useMemo(() => {
    return detectUptalkAnomaly(userPitchTimeline, true);
  }, [userPitchTimeline]);

  // Shadowing Alignment
  const alignmentResult: ShadowingAlignmentResult = useMemo(() => {
    return calculatePitchAlignment(
      userPitchTimeline,
      currentExercise.nativePitchTimeline
    );
  }, [userPitchTimeline, currentExercise]);

  const handleSelectExercise = (id: string) => {
    setSelectedExerciseId(id);
    stopRecording();
    setUserPitchTimeline([]);
    setIsPlayingNativeModel(false);
    setIsSimulatingUptalk(false);
    setIsSaved(false);
  };

  // Start Web Audio Recording
  const startRecording = async () => {
    try {
      setUserPitchTimeline([]);
      setIsSaved(false);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);
      analyserRef.current = analyser;

      setIsRecording(true);
      startTimeRef.current = Date.now();

      const buffer = new Float32Array(analyser.fftSize);

      const processPitchLoop = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getFloatTimeDomainData(buffer);

        const currentTimeSec = (Date.now() - startTimeRef.current) / 1000;
        const { pitchHz, confidence } = extractPitchAutocorrelation(
          buffer,
          audioCtx.sampleRate
        );

        if (currentTimeSec <= currentExercise.durationSec + 1.0) {
          setUserPitchTimeline((prev) => [
            ...prev,
            { timeSec: Number(currentTimeSec.toFixed(2)), pitchHz, confidence }
          ]);
          animationFrameRef.current = requestAnimationFrame(processPitchLoop);
        } else {
          stopRecording();
        }
      };

      animationFrameRef.current = requestAnimationFrame(processPitchLoop);
    } catch (err) {
      console.warn("Microphone access denied or unavailable. Fallback to simulation.", err);
      simulateNativePlayback();
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  // Simulate Native Playback
  const simulateNativePlayback = () => {
    stopRecording();
    setIsPlayingNativeModel(true);
    setIsSimulatingUptalk(false);

    let idx = 0;
    const timeline = currentExercise.nativePitchTimeline;
    setUserPitchTimeline([]);

    const interval = setInterval(() => {
      if (idx < timeline.length) {
        setUserPitchTimeline((prev) => [...prev, timeline[idx]]);
        idx++;
      } else {
        clearInterval(interval);
        setIsPlayingNativeModel(false);
      }
    }, 300);
  };

  // Simulate Faulty Uptalk Playback
  const simulateUptalkPlayback = () => {
    stopRecording();
    setIsSimulatingUptalk(true);
    setIsPlayingNativeModel(false);

    let idx = 0;
    const timeline = currentExercise.faultyUptalkPitchTimeline;
    setUserPitchTimeline([]);

    const interval = setInterval(() => {
      if (idx < timeline.length) {
        setUserPitchTimeline((prev) => [...prev, timeline[idx]]);
        idx++;
      } else {
        clearInterval(interval);
        setIsSimulatingUptalk(false);
      }
    }, 300);
  };

  const saveResultsToDatabase = useCallback(async () => {
    try {
      // 1. Save Practice Log
      await db.practice_logs.put({
        id: `pitch_log_${Date.now()}`,
        type: "pitch_contour",
        title: `Bio-Acoustic Cadence: ${currentExercise.topic}`,
        score: alignmentResult.alignmentScore >= 80 && !uptalkDetection.isUptalkDetected ? 8.5 : 6.5,
        totalQuestions: 1,
        accuracyPercentage: alignmentResult.alignmentScore,
        timeSpentSeconds: 60,
        details: {
          alignmentScore: alignmentResult.alignmentScore,
          isUptalkDetected: uptalkDetection.isUptalkDetected,
          terminalPitchRiseHz: uptalkDetection.terminalPitchRiseHz,
          isAuthoritativeFallingCadence: uptalkDetection.isAuthoritativeFallingCadence
        },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      });

      // 2. Log Uptalk Anomaly to Error Bank
      if (uptalkDetection.isUptalkDetected) {
        await db.error_bank.put({
          id: `err_pitch_${currentExercise.id}_${Date.now()}`,
          sourceModule: "speaking",
          errorType: "pronunciation",
          questionContext: `Speaking Part 3 Pitch Cadence: "${currentExercise.question}"`,
          userWrongAnswer: `Uptalk anomaly detected at terminal syllable (+${uptalkDetection.terminalPitchRiseHz}Hz inflection)`,
          correctAnswer: "Decisive Falling Pitch Contour (Terminal descent >= 30Hz)",
          deepExplanation: uptalkDetection.feedback,
          mastered: false,
          retryCount: 1,
          createdAt: new Date().toISOString()
        });
      }

      setIsSaved(true);
    } catch (err) {
      console.error("Failed to save pitch contour log:", err);
    }
  }, [alignmentResult, uptalkDetection, currentExercise]);

  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  return {
    currentExercise,
    allExercises: MOCK_PITCH_EXERCISES,
    selectedExerciseId,
    handleSelectExercise,
    isRecording,
    startRecording,
    stopRecording,
    simulateNativePlayback,
    simulateUptalkPlayback,
    isPlayingNativeModel,
    isSimulatingUptalk,
    userPitchTimeline,
    uptalkDetection,
    alignmentResult,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isSaved,
    saveResultsToDatabase
  };
}
