"use client";

import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import {
  MOCK_SPEAKING_P3_TOPICS,
  SpeakingP3Topic,
  SocialPerspectiveKey,
} from "@/data/mockSpeakingP3Data";
import {
  autoCorrelate,
  detectTerminalIntonation,
  PitchAnalysisResult,
} from "@/lib/pitchDetectionEngine";
import {
  evaluateHedgingDensity,
  HedgingAnalysisResult,
} from "@/lib/hedgingValidator";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem } from "@/types/database";

export function useSpeakingP3Session() {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    MOCK_SPEAKING_P3_TOPICS[0].id
  );
  const [selectedLensKeys, setSelectedLensKeys] = useState<SocialPerspectiveKey[]>([
    "corporate",
    "government",
  ]);

  const [hedgingUserInput, setHedgingUserInput] = useState<string>("");
  const [speechTranscript, setSpeechTranscript] = useState<string>("");

  // Recording & DSP States
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordDuration, setRecordDuration] = useState<number>(0);
  const [pitchSamples, setPitchSamples] = useState<number[]>([]);
  const [currentPitch, setCurrentPitch] = useState<number>(0);
  const [terminalPitchResult, setTerminalPitchResult] = useState<PitchAnalysisResult | null>(null);

  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);

  // Audio refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const activeTopic = useMemo(() => {
    return (
      MOCK_SPEAKING_P3_TOPICS.find((t) => t.id === selectedTopicId) ||
      MOCK_SPEAKING_P3_TOPICS[0]
    );
  }, [selectedTopicId]);

  // Real-time Hedging Analysis
  const hedgingAnalysis = useMemo<HedgingAnalysisResult>(() => {
    const textToAnalyze = speechTranscript || hedgingUserInput;
    return evaluateHedgingDensity(textToAnalyze);
  }, [speechTranscript, hedgingUserInput]);

  // Toggle Societal Lens
  const toggleLens = useCallback((key: SocialPerspectiveKey) => {
    setSelectedLensKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }, []);

  // Pre-fill model answers
  const loadSampleHedging = useCallback(() => {
    setHedgingUserInput(activeTopic.hedgingDrill.modelHedgedBand85);
  }, [activeTopic]);

  const loadModelFullResponse = useCallback(() => {
    setSpeechTranscript(activeTopic.modelResponseBand85.fullCombined);
  }, [activeTopic]);

  // Insert a hedging phrase into current text area
  const insertHedgingPhrase = useCallback((phrase: string) => {
    setHedgingUserInput((prev) => `${prev} ${phrase}`.trim());
  }, []);

  // Web Audio DSP Pitch Tracking
  const startRecording = useCallback(async () => {
    setIsRecording(true);
    setRecordDuration(0);
    setPitchSamples([]);
    setCurrentPitch(0);
    setTerminalPitchResult(null);

    // Duration timer
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      setRecordDuration((prev) => prev + 1);
    }, 1000);

    try {
      if (typeof window !== "undefined" && navigator.mediaDevices) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;

        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = audioCtx;

        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048;
        source.connect(analyser);
        analyserRef.current = analyser;

        const buffer = new Float32Array(analyser.fftSize);

        const updatePitch = () => {
          if (!analyserRef.current) return;
          analyserRef.current.getFloatTimeDomainData(buffer);
          const pitch = autoCorrelate(buffer, audioCtx.sampleRate);

          if (pitch > 70 && pitch < 450) {
            setCurrentPitch(pitch);
            setPitchSamples((prev) => [...prev.slice(-150), pitch]);
          } else {
            setCurrentPitch(0);
          }

          animationFrameRef.current = requestAnimationFrame(updatePitch);
        };

        updatePitch();
      }
    } catch (err) {
      console.warn("Microphone access unavailable, using pitch simulation:", err);
      // Fallback Pitch Simulation for environments without mic permissions
      const simInterval = setInterval(() => {
        const basePitch = 150 - Math.random() * 40;
        setCurrentPitch(Math.round(basePitch));
        setPitchSamples((prev) => [...prev.slice(-150), Math.round(basePitch)]);
      }, 150);

      timerIntervalRef.current = setInterval(() => {
        setRecordDuration((prev) => {
          if (prev >= 45) {
            clearInterval(simInterval);
          }
          return prev + 1;
        });
      }, 1000);
    }
  }, []);

  // Stop Recording and Compute Cadence Analysis
  const stopRecording = useCallback(() => {
    setIsRecording(false);

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().catch(() => {});
    }

    // Analyze terminal cadence
    const result = detectTerminalIntonation(pitchSamples);
    setTerminalPitchResult(result);
    setShowSummaryModal(true);
  }, [pitchSamples]);

  // Submit and Save to Dexie DB
  const submitAttempt = useCallback(async () => {
    setShowSummaryModal(true);

    const isCadenceGood = terminalPitchResult?.isAuthoritative || false;
    const isHedgingGood = hedgingAnalysis.isNuanced;

    // If Uptalk detected, log to Error Bank
    if (terminalPitchResult?.isUptalk) {
      db.error_bank.put({
        id: `err_uptalk_${Date.now()}`,
        sourceModule: "speaking",
        errorType: "pronunciation",
        questionContext: `Speaking Part 3 Terminal Intonation: ${activeTopic.question}`,
        userWrongAnswer: `Uptalk (+${terminalPitchResult.deltaHz}Hz rising at phrase boundary)`,
        correctAnswer: "Terminal Falling Pitch Cadence (180Hz -> 110Hz)",
        deepExplanation: "Bạn bị lỗi ngữ điệu Uptalk (vểnh cao giọng ở cuối câu khẳng định). Trong Speaking Part 3, điều này làm bạn nghe như đang nghi vấn hoặc do dự. Hãy chủ động hạ giọng dứt khoát ở 2-3 âm tiết cuối cùng.",
        mastered: false,
        retryCount: 0,
        consecutiveSuccesses: 0,
        createdAt: new Date().toISOString(),
      }).catch((e) => console.error("Error saving uptalk error:", e));
    }

    // If overgeneralization flaws found
    if (hedgingAnalysis.overgeneralizationFlaws.length > 0) {
      db.error_bank.put({
        id: `err_hedge_${Date.now()}`,
        sourceModule: "speaking",
        errorType: "careless_reading",
        questionContext: `Speaking Part 3 Overgeneralization: ${activeTopic.question}`,
        userWrongAnswer: hedgingAnalysis.overgeneralizationFlaws.join(", "),
        correctAnswer: "Nuanced Academic Hedging (tend to, arguably, a considerable proportion)",
        deepExplanation: hedgingAnalysis.feedbackVi,
        mastered: false,
        retryCount: 0,
        consecutiveSuccesses: 0,
        createdAt: new Date().toISOString(),
      }).catch((e) => console.error("Error saving hedging error:", e));
    }

    // Save Practice Log
    try {
      const estimatedScore =
        selectedLensKeys.length >= 2 && isHedgingGood && isCadenceGood
          ? 8.0
          : selectedLensKeys.length >= 2
          ? 7.0
          : 6.0;

      const log: PracticeLog = {
        id: `log_p3_${Date.now()}`,
        type: "speaking_p3_lenses",
        materialId: activeTopic.id,
        score: estimatedScore,
        timeSpentSeconds: recordDuration || 60,
        accuracyPercentage: Math.round(hedgingAnalysis.score),
        createdAt: new Date().toISOString(),
      };
      await db.practice_logs.put(log);
    } catch (e) {
      console.error("Error saving speaking P3 practice log:", e);
    }
  }, [
    activeTopic,
    selectedLensKeys,
    hedgingAnalysis,
    terminalPitchResult,
    recordDuration,
  ]);

  const resetSession = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    setIsRecording(false);
    setRecordDuration(0);
    setPitchSamples([]);
    setCurrentPitch(0);
    setTerminalPitchResult(null);
    setHedgingUserInput("");
    setSpeechTranscript("");
    setShowSummaryModal(false);
  }, []);

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return {
    selectedTopicId,
    activeTopic,
    selectedLensKeys,
    hedgingUserInput,
    speechTranscript,
    hedgingAnalysis,
    isRecording,
    recordDuration,
    pitchSamples,
    currentPitch,
    terminalPitchResult,
    showSummaryModal,
    setSelectedTopicId,
    toggleLens,
    setHedgingUserInput,
    setSpeechTranscript,
    loadSampleHedging,
    loadModelFullResponse,
    insertHedgingPhrase,
    startRecording,
    stopRecording,
    submitAttempt,
    resetSession,
    setShowSummaryModal,
  };
}
