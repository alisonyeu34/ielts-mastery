"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  SpeechSegment,
  parseTranscriptIntoSegments,
  findSegmentIndexAtTime,
} from "@/lib/listeningSpeechEngine";

export interface UseIeltsAudioEngineOptions {
  transcript: string;
  durationSeconds: number;
  onTimeUpdate?: (timeSec: number) => void;
  onEnded?: () => void;
}

export interface UseIeltsAudioEngineReturn {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  activeSegment: SpeechSegment | null;
  activeSpeaker: string;
  segments: SpeechSegment[];
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  seekTo: (targetSec: number) => void;
  rewind: (seconds?: number) => void;
  forward: (seconds?: number) => void;
  setPlaybackRate: (rate: number) => void;
  reset: () => void;
}

export function useIeltsAudioEngine({
  transcript,
  durationSeconds,
  onTimeUpdate,
  onEnded,
}: UseIeltsAudioEngineOptions): UseIeltsAudioEngineReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRateState] = useState(1.0);
  const [activeSegment, setActiveSegment] = useState<SpeechSegment | null>(null);

  // Pre-parse segments
  const segments = useMemo(() => {
    return parseTranscriptIntoSegments(transcript, durationSeconds);
  }, [transcript, durationSeconds]);

  // Keep mutable references to avoid closure capture issues
  const isPlayingRef = useRef(false);
  const currentTimeRef = useRef(0);
  const playbackRateRef = useRef(1.0);
  const generationRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const watchdogRef = useRef<NodeJS.Timeout | null>(null);

  isPlayingRef.current = isPlaying;
  currentTimeRef.current = currentTime;
  playbackRateRef.current = playbackRate;

  // Cleanup on unmount or transcript change
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) clearInterval(timerRef.current);
      if (watchdogRef.current) clearInterval(watchdogRef.current);
    };
  }, []);

  // Chrome Anti-freeze Watchdog: keeps SpeechSynthesis alive during long tests
  useEffect(() => {
    if (isPlaying) {
      watchdogRef.current = setInterval(() => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
        }
      }, 3000);
    } else {
      if (watchdogRef.current) clearInterval(watchdogRef.current);
    }
    return () => {
      if (watchdogRef.current) clearInterval(watchdogRef.current);
    };
  }, [isPlaying]);

  // High precision time progression timer while playing
  useEffect(() => {
    if (isPlaying) {
      const TICK_MS = 200;
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const delta = (TICK_MS / 1000) * playbackRateRef.current;
          const next = prev + delta;
          if (next >= durationSeconds) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsPlaying(false);
            if (typeof window !== "undefined" && "speechSynthesis" in window) {
              window.speechSynthesis.cancel();
            }
            if (onEnded) onEnded();
            return durationSeconds;
          }
          if (onTimeUpdate) onTimeUpdate(Math.round(next * 10) / 10);
          return next;
        });
      }, TICK_MS);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, durationSeconds, onTimeUpdate, onEnded]);

  // Core function to speak segments in order
  const speakSegment = useCallback(
    (segIndex: number) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

      if (segIndex < 0 || segIndex >= segments.length) {
        // Finished all segments
        setIsPlaying(false);
        setCurrentTime(durationSeconds);
        setActiveSegment(null);
        if (onEnded) onEnded();
        return;
      }

      // Invalidate previous speak calls
      const currentGen = ++generationRef.current;
      window.speechSynthesis.cancel();

      const seg = segments[segIndex];
      setActiveSegment(seg);

      const utterance = new SpeechSynthesisUtterance(seg.text);
      utterance.lang = "en-GB";
      utterance.rate = playbackRateRef.current;
      utterance.pitch = seg.pitch;

      // Select authentic British voice if available
      const voices = window.speechSynthesis.getVoices();
      const britishVoice =
        voices.find(
          (v) =>
            v.lang.includes("en-GB") ||
            v.name.includes("UK") ||
            v.name.includes("British") ||
            v.name.includes("George") ||
            v.name.includes("Hazel")
        ) || voices.find((v) => v.lang.startsWith("en"));

      if (britishVoice) {
        utterance.voice = britishVoice;
      }

      utterance.onend = () => {
        // Ignore if user clicked seek/pause while speaking
        if (generationRef.current !== currentGen) return;
        if (!isPlayingRef.current) return;

        // Immediately proceed to next segment
        speakSegment(segIndex + 1);
      };

      utterance.onerror = (e) => {
        // "interrupted" / "canceled" happens naturally on seek/rewind/pause - ignore
        if (e.error === "interrupted" || e.error === "canceled") return;
        if (generationRef.current !== currentGen) return;
        if (!isPlayingRef.current) return;

        speakSegment(segIndex + 1);
      };

      window.speechSynthesis.speak(utterance);
    },
    [segments, durationSeconds, onEnded]
  );

  // Play / Resume
  const play = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    let targetTime = currentTimeRef.current;
    if (targetTime >= durationSeconds - 0.5) {
      targetTime = 0;
      setCurrentTime(0);
    }

    const segIdx = findSegmentIndexAtTime(segments, targetTime);
    setIsPlaying(true);
    speakSegment(segIdx);
  }, [durationSeconds, segments, speakSegment]);

  // Pause
  const pause = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      generationRef.current++;
      window.speechSynthesis.cancel();
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlayingRef.current) {
      pause();
    } else {
      play();
    }
  }, [pause, play]);

  // Seek to specific second: CANCELS previous speech immediately and restarts from targetSec
  const seekTo = useCallback(
    (targetSec: number) => {
      const clamped = Math.max(0, Math.min(durationSeconds, targetSec));
      setCurrentTime(clamped);
      currentTimeRef.current = clamped;
      if (onTimeUpdate) onTimeUpdate(clamped);

      // Cancel current utterance immediately!
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        generationRef.current++;
        window.speechSynthesis.cancel();
      }

      const segIdx = findSegmentIndexAtTime(segments, clamped);
      const seg = segments[segIdx] || null;
      setActiveSegment(seg);

      // If currently playing, immediately start voice from the target segment
      if (isPlayingRef.current) {
        speakSegment(segIdx);
      }
    },
    [durationSeconds, onTimeUpdate, segments, speakSegment]
  );

  // Rewind: stops speech immediately and jumps backwards
  const rewind = useCallback(
    (seconds = 5) => {
      seekTo(currentTimeRef.current - seconds);
    },
    [seekTo]
  );

  // Fast forward: jumps forward
  const forward = useCallback(
    (seconds = 5) => {
      seekTo(currentTimeRef.current + seconds);
    },
    [seekTo]
  );

  // Playback rate change
  const setPlaybackRate = useCallback(
    (rate: number) => {
      setPlaybackRateState(rate);
      playbackRateRef.current = rate;
      if (isPlayingRef.current) {
        // Re-speak current segment at new rate
        const segIdx = findSegmentIndexAtTime(segments, currentTimeRef.current);
        speakSegment(segIdx);
      }
    },
    [segments, speakSegment]
  );

  // Reset audio
  const reset = useCallback(() => {
    pause();
    setCurrentTime(0);
    currentTimeRef.current = 0;
    setActiveSegment(null);
    if (onTimeUpdate) onTimeUpdate(0);
  }, [pause, onTimeUpdate]);

  return {
    isPlaying,
    currentTime,
    duration: durationSeconds,
    playbackRate,
    activeSegment,
    activeSpeaker: activeSegment?.speaker || "Guide",
    segments,
    play,
    pause,
    togglePlay,
    seekTo,
    rewind,
    forward,
    setPlaybackRate,
    reset,
  };
}
