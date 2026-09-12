"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { db } from "@/lib/db";
import {
  MOCK_FLUENCY_PROMPTS,
  SpeakingFluencyPrompt,
} from "@/data/mockFluencyPromptsData";
import {
  calculateVolumeRMS,
  spotFillerWords,
  analyzeAcousticPauses,
  calculateFluencyMetrics,
  playAntiFillerAudioCue,
  FillerWordEvent,
  AcousticPauseInterval,
  FluencyMetrics,
} from "@/lib/acousticFluencyAnalyzer";

export function useSpeakingFluencySession() {
  const [selectedPrompt, setSelectedPrompt] = useState<SpeakingFluencyPrompt>(
    MOCK_FLUENCY_PROMPTS[0]
  );
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [isAudioCueEnabled, setIsAudioCueEnabled] = useState<boolean>(true);

  // Transcript and Live Speech state
  const [liveTranscript, setLiveTranscript] = useState<string>("");
  const [detectedFillers, setDetectedFillers] = useState<FillerWordEvent[]>([]);
  const [isFillerWarningActive, setIsFillerWarningActive] = useState<boolean>(false);

  // Acoustic Pauses & Timeline state
  const [volumeTimeline, setVolumeTimeline] = useState<
    Array<{ timeSec: number; volume: number }>
  >([]);
  const [acousticPauses, setAcousticPauses] = useState<AcousticPauseInterval[]>([]);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const speechRecognitionRef = useRef<unknown>(null);
  const timelineBufferRef = useRef<Array<{ timeSec: number; volume: number }>>([]);

  // Calculate Fluency Metrics
  const fluencyMetrics: FluencyMetrics = useMemo(() => {
    return calculateFluencyMetrics(
      recordingSeconds,
      liveTranscript || "Sample candidate discourse for baseline evaluation",
      detectedFillers,
      acousticPauses
    );
  }, [recordingSeconds, liveTranscript, detectedFillers, acousticPauses]);

  // Start Recording Session
  const startRecording = useCallback(async () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    setLiveTranscript("");
    setDetectedFillers([]);
    setVolumeTimeline([]);
    setAcousticPauses([]);
    timelineBufferRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtxClass();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      let elapsedSec = 0;

      // Real-time audio sampler ticker
      recordingTimerRef.current = setInterval(() => {
        elapsedSec += 0.1;
        setRecordingSeconds(parseFloat(elapsedSec.toFixed(1)));

        analyser.getByteTimeDomainData(dataArray);
        const rms = calculateVolumeRMS(dataArray);
        timelineBufferRef.current.push({
          timeSec: parseFloat(elapsedSec.toFixed(1)),
          volume: rms,
        });

        if (timelineBufferRef.current.length % 5 === 0) {
          setVolumeTimeline([...timelineBufferRef.current]);
        }
      }, 100);

      // Web Speech Recognition for Real-time Transcription & Filler Spotting
      const SpeechRecognitionClass =
        (window as unknown as { SpeechRecognition: unknown }).SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition: unknown }).webkitSpeechRecognition;

      if (SpeechRecognitionClass) {
        const recognition = new (SpeechRecognitionClass as new () => {
          continuous: boolean;
          interimResults: boolean;
          lang: string;
          onresult: (e: {
            resultIndex: number;
            results: Array<{ 0: { transcript: string } }>;
          }) => void;
          start: () => void;
          stop: () => void;
        })();

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
          let currentFull = "";
          for (let i = 0; i < event.results.length; i++) {
            currentFull += event.results[i][0].transcript + " ";
          }
          setLiveTranscript(currentFull.trim());

          const fillers = spotFillerWords(currentFull, elapsedSec);
          if (fillers.length > detectedFillers.length) {
            setDetectedFillers(fillers);
            setIsFillerWarningActive(true);
            if (isAudioCueEnabled) playAntiFillerAudioCue();
            setTimeout(() => setIsFillerWarningActive(false), 800);
          }
        };

        recognition.start();
        speechRecognitionRef.current = recognition;
      }
    } catch {
      // Fallback: Simulated biofeedback timeline for testing in non-mic environments
      let elapsedSec = 0;
      recordingTimerRef.current = setInterval(() => {
        elapsedSec += 0.1;
        setRecordingSeconds(parseFloat(elapsedSec.toFixed(1)));

        // Alternate speech bursts and silence pauses
        const isPause = (elapsedSec % 4.0) > 2.8;
        const simVol = isPause ? 0.02 : 0.25 + Math.random() * 0.2;

        timelineBufferRef.current.push({
          timeSec: parseFloat(elapsedSec.toFixed(1)),
          volume: simVol,
        });

        if (timelineBufferRef.current.length % 5 === 0) {
          setVolumeTimeline([...timelineBufferRef.current]);
        }
      }, 100);
    }
  }, [isAudioCueEnabled, detectedFillers.length]);

  // Stop Recording Session & Compute Acoustic Diagnostics
  const stopRecordingAndEvaluate = useCallback(async () => {
    setIsRecording(false);
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
    }
    if (speechRecognitionRef.current) {
      try {
        (speechRecognitionRef.current as { stop: () => void }).stop();
      } catch {
        // Recognition already ended
      }
    }

    // Process Acoustic Pauses from timeline
    const pauses = analyzeAcousticPauses(timelineBufferRef.current, 0.045, 0.4);
    setAcousticPauses(pauses);
    setVolumeTimeline([...timelineBufferRef.current]);
    setIsSummaryModalOpen(true);

    const metrics = calculateFluencyMetrics(
      recordingSeconds || 15,
      liveTranscript || selectedPrompt.band8ModelAnswer,
      detectedFillers,
      pauses
    );

    // Save to practice logs
    try {
      await db.practice_logs.put({
        id: `log_fluency_${Date.now()}`,
        type: "speaking_fluency_drill",
        materialId: selectedPrompt.id,
        title: `Fluency Biofeedback: ${selectedPrompt.topicTitle}`,
        score: metrics.fluencyScore,
        totalQuestions: 1,
        accuracyPercentage: metrics.fluencyScore,
        timeSpentSeconds: recordingSeconds || 30,
        details: {
          wpm: metrics.currentWpm,
          fillerCount: metrics.fillerCount,
          fillerRatePerMinute: metrics.fillerRatePerMinute,
          hesitationRatio: metrics.hesitationRatio,
          bandEstimate: metrics.fluencyBandEstimate,
        },
        createdAt: new Date().toISOString(),
      });

      // Auto-save to Error Bank if excessive fillers or high hesitation ratio
      if (metrics.fillerRatePerMinute > 2.5 || metrics.hesitationRatio > 18) {
        await db.error_bank.add({
          id: `err_fluency_${Date.now()}`,
          sourceModule: "speaking",
          errorType: "pronunciation",
          questionContext: `Fluency Biofeedback (${selectedPrompt.part}): ${selectedPrompt.promptQuestion}`,
          userWrongAnswer: `Tần suất từ đệm: ${metrics.fillerRatePerMinute}/phút, Tỷ lệ ngập ngừng tìm từ: ${metrics.hesitationRatio}%`,
          correctAnswer: "Sustained academic speech flow (< 1 filler/min, hesitation < 8%)",
          deepExplanation:
            "Bài nói của bạn bị ngắt quãng nhiều lần do phản xạ chêm từ đệm 'um, uh, like' khi tìm từ vựng. Hãy luyện tập kỹ thuật Silent Pause (chấp nhận 0.5s im lặng tự nhiên) để não bộ kịp sắp xếp ngữ pháp.",
          mastered: false,
          retryCount: 0,
          createdAt: new Date().toISOString(),
        });
      }
    } catch (e) {
      console.error("Failed to save fluency log:", e);
    }
  }, [recordingSeconds, liveTranscript, selectedPrompt, detectedFillers]);

  return {
    selectedPrompt,
    setSelectedPrompt,
    isRecording,
    recordingSeconds,
    liveTranscript,
    setLiveTranscript,
    detectedFillers,
    isFillerWarningActive,
    isAudioCueEnabled,
    setIsAudioCueEnabled,
    volumeTimeline,
    acousticPauses,
    fluencyMetrics,
    startRecording,
    stopRecordingAndEvaluate,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
  };
}
