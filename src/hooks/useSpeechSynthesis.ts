"use client";

import { useState, useCallback, useEffect } from "react";

export interface UseSpeechSynthesisReturn {
  speakText: (text: string, rate?: number) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  supported: boolean;
}

export function useSpeechSynthesis(): UseSpeechSynthesisReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSupported(true);
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speakText = useCallback(
    (text: string, rate = 0.95) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-GB"; // Standard British accent for Cambridge Examiner
      utterance.rate = rate;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const examinerVoice =
        voices.find(
          (v) => (v.lang === "en-GB" || v.lang === "en-US") && !v.name.includes("Google")
        ) || voices.find((v) => v.lang.startsWith("en"));

      if (examinerVoice) {
        utterance.voice = examinerVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    []
  );

  return {
    speakText,
    stopSpeaking,
    isSpeaking,
    supported,
  };
}
