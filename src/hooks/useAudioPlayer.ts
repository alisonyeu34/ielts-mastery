"use client";

import { useState, useCallback, useRef, useEffect } from "react";

export interface UseAudioPlayerReturn {
  playSound: (id: string, textOrUrl: string, isUrl?: boolean) => void;
  stopSound: () => void;
  isPlaying: boolean;
  currentlyPlayingId: string | null;
}

export function useAudioPlayer(): UseAudioPlayerReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stopSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setCurrentlyPlayingId(null);
  }, []);

  const playSound = useCallback(
    (id: string, textOrUrl: string, isUrl = false) => {
      stopSound();

      setCurrentlyPlayingId(id);
      setIsPlaying(true);

      if (isUrl && textOrUrl.startsWith("http")) {
        const audio = new Audio(textOrUrl);
        audioRef.current = audio;

        audio.onended = () => {
          setIsPlaying(false);
          setCurrentlyPlayingId(null);
        };

        audio.onerror = () => {
          // Fallback to Web Speech API if audio url fails
          playViaSpeechSynthesis(id, textOrUrl);
        };

        audio.play().catch(() => {
          playViaSpeechSynthesis(id, textOrUrl);
        });
      } else {
        playViaSpeechSynthesis(id, textOrUrl);
      }
    },
    [stopSound]
  );

  const playViaSpeechSynthesis = (id: string, text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsPlaying(false);
      setCurrentlyPlayingId(null);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB"; // Standard British English pronunciation
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const britishVoice =
      voices.find((v) => v.lang === "en-GB" && !v.name.includes("Google")) ||
      voices.find((v) => v.lang.startsWith("en"));

    if (britishVoice) {
      utterance.voice = britishVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentlyPlayingId(null);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setCurrentlyPlayingId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  return {
    playSound,
    stopSound,
    isPlaying,
    currentlyPlayingId,
  };
}
