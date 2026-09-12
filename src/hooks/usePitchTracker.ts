"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export interface PitchDataPoint {
  time: number; // Seconds since recording start
  pitch: number; // Fundamental frequency F0 in Hz
  isUptalk: boolean;
}

// Autocorrelation algorithm to detect fundamental frequency (F0)
function autoCorrelate(buffer: Float32Array, sampleRate: number): number {
  const SIZE = buffer.length;
  let rms = 0;

  for (let i = 0; i < SIZE; i++) {
    const val = buffer[i];
    rms += val * val;
  }
  rms = Math.sqrt(rms / SIZE);

  // If signal is too quiet (silence/background noise), return -1
  if (rms < 0.015) return -1;

  // Trim silence boundaries
  let r1 = 0;
  let r2 = SIZE - 1;
  const thres = 0.2;
  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buffer[i]) < thres) {
      r1 = i;
      break;
    }
  }
  for (let i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buffer[SIZE - i]) < thres) {
      r2 = SIZE - i;
      break;
    }
  }

  const trimmed = buffer.slice(r1, r2);
  const c = new Float32Array(trimmed.length);

  for (let i = 0; i < trimmed.length; i++) {
    for (let j = 0; j < trimmed.length - i; j++) {
      c[i] = c[i] + trimmed[j] * trimmed[j + i];
    }
  }

  let d = 0;
  while (c[d] > c[d + 1]) d++;
  let maxval = -1;
  let maxpos = -1;
  for (let i = d; i < trimmed.length; i++) {
    if (c[i] > maxval) {
      maxval = c[i];
      maxpos = i;
    }
  }

  let T0 = maxpos;

  // Parabolic interpolation for fine tuning
  const x1 = c[T0 - 1];
  const x2 = c[T0];
  const x3 = c[T0 + 1];
  const a = (x1 + x3 - 2 * x2) / 2;
  const b = (x3 - x1) / 2;
  if (a) T0 = T0 - b / (2 * a);

  const freq = sampleRate / T0;

  // Human speech pitch range filter (80 Hz - 400 Hz)
  if (freq >= 80 && freq <= 400) {
    return Math.round(freq);
  }

  return -1;
}

export function usePitchTracker() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [currentPitch, setCurrentPitch] = useState<number>(0);
  const [pitchHistory, setPitchHistory] = useState<PitchDataPoint[]>([]);
  const [isUptalkDetected, setIsUptalkDetected] = useState<boolean>(false);
  const [uptalkCount, setUptalkCount] = useState<number>(0);
  const [fallingCadenceCount, setFallingCadenceCount] = useState<number>(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const recordingStartTimeRef = useRef<number>(0);
  const recentPitchesRef = useRef<Array<{ time: number; pitch: number }>>([]);
  const lastUptalkTimestampRef = useRef<number>(0);

  const startPitchTracking = useCallback(async () => {
    try {
      if (typeof window === "undefined" || !navigator.mediaDevices) return;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      mediaStreamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsRecording(true);
      setPitchHistory([]);
      setIsUptalkDetected(false);
      setUptalkCount(0);
      setFallingCadenceCount(0);
      recentPitchesRef.current = [];
      recordingStartTimeRef.current = Date.now();

      const buffer = new Float32Array(analyser.fftSize);

      const trackLoop = () => {
        if (!analyserRef.current) return;

        analyserRef.current.getFloatTimeDomainData(buffer);
        const pitch = autoCorrelate(buffer, audioCtx.sampleRate);
        const now = Date.now();
        const elapsedSecs = (now - recordingStartTimeRef.current) / 1000;

        if (pitch > 0) {
          setCurrentPitch(pitch);
          recentPitchesRef.current.push({ time: elapsedSecs, pitch });

          // Keep only last 2 seconds in recent buffer
          recentPitchesRef.current = recentPitchesRef.current.filter(
            (p) => elapsedSecs - p.time <= 2.0
          );

          // Check slope over the last 0.5s of voiced speech
          const recentHalfSec = recentPitchesRef.current.filter(
            (p) => elapsedSecs - p.time <= 0.5
          );

          let detectedUptalk = false;
          if (recentHalfSec.length >= 8) {
            const firstPitch = recentHalfSec[0].pitch;
            const lastPitch = recentHalfSec[recentHalfSec.length - 1].pitch;
            const delta = lastPitch - firstPitch;

            // If pitch rises significantly at utterance ending (> 25 Hz rise in 0.5s)
            if (delta > 25 && now - lastUptalkTimestampRef.current > 2000) {
              detectedUptalk = true;
              setIsUptalkDetected(true);
              setUptalkCount((c) => c + 1);
              lastUptalkTimestampRef.current = now;

              setTimeout(() => {
                setIsUptalkDetected(false);
              }, 3000);
            } else if (delta < -15) {
              setFallingCadenceCount((c) => c + 1);
            }
          }

          setPitchHistory((prev) => [
            ...prev.slice(-150), // keep last 150 data points for canvas rendering
            { time: elapsedSecs, pitch, isUptalk: detectedUptalk },
          ]);
        }

        animationFrameRef.current = requestAnimationFrame(trackLoop);
      };

      trackLoop();
    } catch (err) {
      console.warn("Unable to initialize microphone for pitch tracking:", err);
    }
  }, []);

  const stopPitchTracking = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    setIsRecording(false);
    setCurrentPitch(0);
  }, []);

  useEffect(() => {
    return () => {
      stopPitchTracking();
    };
  }, [stopPitchTracking]);

  return {
    isRecording,
    currentPitch,
    pitchHistory,
    isUptalkDetected,
    uptalkCount,
    fallingCadenceCount,
    startPitchTracking,
    stopPitchTracking,
  };
}
