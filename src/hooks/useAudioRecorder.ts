"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export interface PauseStats {
  pauseCount: number;
  totalSilenceSeconds: number;
  totalDurationSeconds: number;
  silenceRatioPercentage: number;
}

export interface UseAudioRecorderReturn {
  isRecording: boolean;
  isPaused: boolean;
  recordingTimeSeconds: number;
  audioBlob: Blob | null;
  audioUrl: string | null;
  frequencyData: Uint8Array;
  pauseStats: PauseStats;
  permissionError: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  resetRecording: () => void;
}

export function useAudioRecorder(): UseAudioRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTimeSeconds, setRecordingTimeSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [frequencyData, setFrequencyData] = useState<Uint8Array>(new Uint8Array(64));
  const [pauseStats, setPauseStats] = useState<PauseStats>({
    pauseCount: 0,
    totalSilenceSeconds: 0,
    totalDurationSeconds: 0,
    silenceRatioPercentage: 0,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Silence detection refs
  const silenceStartRef = useRef<number | null>(null);
  const silenceAccumulatorRef = useRef<number>(0);
  const pauseCountRef = useRef<number>(0);

  // Clean up resources on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const updateWaveformAndSilence = useCallback(() => {
    if (!analyserRef.current || !isRecording || isPaused) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    setFrequencyData(dataArray);

    // Calculate volume root-mean-square / average
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }
    const averageVolume = sum / bufferLength;

    // Silence detection (Threshold ~12 in 0-255 range)
    const now = Date.now();
    const isSilent = averageVolume < 12;

    if (isSilent) {
      if (silenceStartRef.current === null) {
        silenceStartRef.current = now;
      } else {
        const silentDuration = (now - silenceStartRef.current) / 1000;
        // Count as an unnatural hesitation if pause exceeds 1.5 seconds
        if (silentDuration >= 1.5) {
          pauseCountRef.current += 1;
          silenceAccumulatorRef.current += silentDuration;
          silenceStartRef.current = now; // reset to avoid duplicate counting
        }
      }
    } else {
      if (silenceStartRef.current !== null) {
        const silentDuration = (now - silenceStartRef.current) / 1000;
        silenceAccumulatorRef.current += silentDuration;
        silenceStartRef.current = null;
      }
    }

    animationFrameRef.current = requestAnimationFrame(updateWaveformAndSilence);
  }, [isRecording, isPaused]);

  useEffect(() => {
    if (isRecording && !isPaused) {
      animationFrameRef.current = requestAnimationFrame(updateWaveformAndSilence);
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isRecording, isPaused, updateWaveformAndSilence]);

  const startRecording = async () => {
    setPermissionError(null);
    chunksRef.current = [];
    silenceStartRef.current = null;
    silenceAccumulatorRef.current = 0;
    pauseCountRef.current = 0;
    setRecordingTimeSeconds(0);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      streamRef.current = stream;

      // Web Audio API AudioContext setup
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      sourceRef.current = source;

      // MediaRecorder setup
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "audio/webm";

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);

        // Finalize pause and silence stats
        const totalDuration = Math.max(1, recordingTimeSeconds);
        const totalSilence = Math.min(totalDuration, Number(silenceAccumulatorRef.current.toFixed(1)));
        const ratio = Math.min(100, Math.round((totalSilence / totalDuration) * 100));

        setPauseStats({
          pauseCount: pauseCountRef.current,
          totalSilenceSeconds: totalSilence,
          totalDurationSeconds: totalDuration,
          silenceRatioPercentage: ratio,
        });
      };

      mediaRecorder.start(250); // Collect slice every 250ms
      setIsRecording(true);
      setIsPaused(false);

      // Start timer
      timerIntervalRef.current = setInterval(() => {
        setRecordingTimeSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.error("Microphone access error:", err);
      setPermissionError(
        "Không thể truy cập Microphone. Vui lòng cấp quyền Microphone trong trình duyệt để luyện nói."
      );
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().catch(() => {});
    }
    setIsRecording(false);
    setIsPaused(false);
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.pause();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
      mediaRecorderRef.current.resume();
      timerIntervalRef.current = setInterval(() => {
        setRecordingTimeSeconds((prev) => prev + 1);
      }, 1000);
      setIsPaused(false);
    }
  };

  const resetRecording = () => {
    stopRecording();
    setAudioBlob(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setRecordingTimeSeconds(0);
    setFrequencyData(new Uint8Array(64));
    setPauseStats({
      pauseCount: 0,
      totalSilenceSeconds: 0,
      totalDurationSeconds: 0,
      silenceRatioPercentage: 0,
    });
  };

  return {
    isRecording,
    isPaused,
    recordingTimeSeconds,
    audioBlob,
    audioUrl,
    frequencyData,
    pauseStats,
    permissionError,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetRecording,
  };
}
