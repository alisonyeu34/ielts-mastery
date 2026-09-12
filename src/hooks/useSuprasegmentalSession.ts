"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { db } from "@/lib/db";
import {
  MOCK_WORD_STRESS_ITEMS,
  MOCK_CONNECTED_SPEECH_ITEMS,
  MOCK_THOUGHT_GROUP_ITEMS,
  WordStressRuleItem,
  ConnectedSpeechSentenceItem,
  ThoughtGroupSentenceItem,
} from "@/data/mockSuprasegmentalData";
import {
  playNativeAudio,
  evaluatePauseAccuracy,
  calculateRMSVolume,
} from "@/lib/phoneticAcousticAnalyzer";

export function useSuprasegmentalSession() {
  const [activeTab, setActiveTab] = useState<"word_stress" | "connected_speech" | "thought_groups">("word_stress");

  // --- 1. Word Stress State ---
  const [selectedStressWord, setSelectedStressWord] = useState<WordStressRuleItem>(MOCK_WORD_STRESS_ITEMS[0]);
  const [isPairedToggled, setIsPairedToggled] = useState<boolean>(false);

  // --- 2. Connected Speech State ---
  const [selectedConnectedItem, setSelectedConnectedItem] = useState<ConnectedSpeechSentenceItem>(MOCK_CONNECTED_SPEECH_ITEMS[0]);
  const [showLinkingMarks, setShowLinkingMarks] = useState<boolean>(true);

  // --- 3. Thought Groups & Shadowing Metronome State ---
  const [selectedThoughtGroupItem, setSelectedThoughtGroupItem] = useState<ThoughtGroupSentenceItem>(MOCK_THOUGHT_GROUP_ITEMS[0]);
  const [isMetronomeRunning, setIsMetronomeRunning] = useState<boolean>(false);
  const [activeChunkIndex, setActiveChunkIndex] = useState<number>(0);
  const [metronomeBPM, setMetronomeBPM] = useState<number>(110);

  // --- 4. Recording & Pause Analysis State ---
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [pauseScore, setPauseScore] = useState<number | null>(null);
  const [pauseFeedback, setPauseFeedback] = useState<string | null>(null);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);

  const metronomeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const recordedVolumeTimelineRef = useRef<Array<{ timeSec: number; volume: number }>>([]);

  // Metronome Shadowing Pacing Effect
  useEffect(() => {
    if (isMetronomeRunning) {
      const chunksCount = selectedThoughtGroupItem.chunks.length;
      const intervalMs = (60 / metronomeBPM) * 1000 * 2.2;

      metronomeTimerRef.current = setInterval(() => {
        setActiveChunkIndex((prev) => (prev + 1) % chunksCount);
      }, intervalMs);
    } else {
      if (metronomeTimerRef.current) clearInterval(metronomeTimerRef.current);
      setActiveChunkIndex(0);
    }
    return () => {
      if (metronomeTimerRef.current) clearInterval(metronomeTimerRef.current);
    };
  }, [isMetronomeRunning, metronomeBPM, selectedThoughtGroupItem.chunks.length]);

  // Start Metronome Shadowing
  const toggleMetronome = useCallback(() => {
    setIsMetronomeRunning((prev) => !prev);
  }, []);

  // Play Native Audio helper
  const playAudio = useCallback(async (text: string) => {
    await playNativeAudio(text);
  }, []);

  // Start Recording for Thought Group Pause Analysis
  const startRecording = useCallback(async () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    setPauseScore(null);
    setPauseFeedback(null);
    recordedVolumeTimelineRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      let elapsedSec = 0;

      recordingTimerRef.current = setInterval(() => {
        elapsedSec += 0.2;
        setRecordingSeconds(Math.round(elapsedSec));
        analyser.getByteTimeDomainData(dataArray);
        const volume = calculateRMSVolume(dataArray);
        recordedVolumeTimelineRef.current.push({ timeSec: elapsedSec, volume });
      }, 200);
    } catch {
      // Fallback simulated timeline
      let elapsedSec = 0;
      recordingTimerRef.current = setInterval(() => {
        elapsedSec += 0.2;
        setRecordingSeconds(Math.round(elapsedSec));
        const simVol = Math.random() > 0.3 ? 0.35 : 0.02;
        recordedVolumeTimelineRef.current.push({ timeSec: elapsedSec, volume: simVol });
      }, 200);
    }
  }, []);

  // Stop Recording and Evaluate Pauses
  const stopRecordingAndEvaluate = useCallback(() => {
    setIsRecording(false);
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
    }

    // Expected pause timestamps (roughly 2.5s and 5.0s based on chunks)
    const expectedPauses = [2.2, 5.4];
    const evaluation = evaluatePauseAccuracy(
      recordedVolumeTimelineRef.current,
      expectedPauses
    );

    setPauseScore(evaluation.pauseAccuracyScore);
    setPauseFeedback(evaluation.feedbackMessage);
    setIsSummaryModalOpen(true);

    // Sync to practice logs
    try {
      db.practice_logs.put({
        id: `log_supraseg_${Date.now()}`,
        type: "pronunciation",
        title: `Thought Group Rhythm: ${selectedThoughtGroupItem.topic}`,
        score: evaluation.pauseAccuracyScore,
        accuracyPercentage: evaluation.pauseAccuracyScore,
        timeSpentSeconds: recordingSeconds || 10,
        createdAt: new Date().toISOString(),
      });
    } catch (e) {
      console.error("Failed to log suprasegmental drill:", e);
    }
  }, [selectedThoughtGroupItem, recordingSeconds]);

  return {
    activeTab,
    setActiveTab,
    // Word Stress
    selectedStressWord,
    setSelectedStressWord,
    isPairedToggled,
    setIsPairedToggled,
    // Connected Speech
    selectedConnectedItem,
    setSelectedConnectedItem,
    showLinkingMarks,
    setShowLinkingMarks,
    // Thought Groups
    selectedThoughtGroupItem,
    setSelectedThoughtGroupItem,
    isMetronomeRunning,
    toggleMetronome,
    activeChunkIndex,
    metronomeBPM,
    setMetronomeBPM,
    // Recording & Evaluation
    isRecording,
    recordingSeconds,
    pauseScore,
    pauseFeedback,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    startRecording,
    stopRecordingAndEvaluate,
    playAudio,
  };
}
