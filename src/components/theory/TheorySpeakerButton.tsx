"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX, Square, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Global singleton to coordinate speech across all buttons
let currentActiveId: string | null = null;
let activeUtteranceQueue: string[] = [];
let currentQueueIndex = 0;
let isSpeakingGlobal = false;
const subscribers = new Set<(id: string | null) => void>();

function notifySubscribers() {
  subscribers.forEach((cb) => cb(currentActiveId));
}

function stopGlobalSpeech() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  currentActiveId = null;
  activeUtteranceQueue = [];
  currentQueueIndex = 0;
  isSpeakingGlobal = false;
  notifySubscribers();
}

/**
 * Finds the best GUARANTEED female voice for Vietnamese and general reading
 */
function selectFemaleVoice(synth: SpeechSynthesis): { voice: SpeechSynthesisVoice | null; pitch: number } {
  const voices = synth.getVoices();
  if (!voices || voices.length === 0) {
    return { voice: null, pitch: 1.35 };
  }

  const viVoices = voices.filter((v) => v.lang.toLowerCase().startsWith("vi"));

  // 1. Highest Priority: Explicit female Vietnamese voices (Edge Hoài My, Mai, Linh, Chi, Lan, Female, Nữ)
  const explicitViFemale = viVoices.find(
    (v) =>
      !/\b(an|nam|namminh|male|david|george|mark)\b/i.test(v.name) &&
      /hoaimy|mai|linh|chi|lan|female|nữ|nu/i.test(v.name)
  );
  if (explicitViFemale) {
    return { voice: explicitViFemale, pitch: 1.12 };
  }

  // 2. Google Tiếng Việt (Chrome default Vietnamese voice, which is female)
  const googleVi = viVoices.find((v) => /google/i.test(v.name));
  if (googleVi) {
    return { voice: googleVi, pitch: 1.1 };
  }

  // 3. Any Vietnamese voice that is NOT explicitly named male
  const nonMaleVi = viVoices.find(
    (v) => !/\b(an|nam|namminh|male)\b/i.test(v.name)
  );
  if (nonMaleVi) {
    return { voice: nonMaleVi, pitch: 1.15 };
  }

  // 4. Fallback if only 'Microsoft An' or a male Vietnamese voice exists on this Windows PC:
  // Set pitch to 1.40! This elevates the pitch into a clear female vocal register.
  if (viVoices.length > 0) {
    return { voice: viVoices[0], pitch: 1.38 };
  }

  // 5. If no Vietnamese voice is installed in Windows/browser, pick a female English/General voice
  // and elevate pitch so it NEVER sounds like a deep male voice (David)
  const femaleAny = voices.find(
    (v) =>
      /zira|female|hazel|susan|jenny|samantha|aria|sonia|libby/i.test(v.name) &&
      !/\b(david|george|mark|male)\b/i.test(v.name)
  );
  if (femaleAny) {
    return { voice: femaleAny, pitch: 1.15 };
  }

  // Default fallback
  return { voice: voices[0] || null, pitch: 1.35 };
}

export interface TheorySpeakerButtonProps {
  text: string;
  title?: string;
  label?: string;
  size?: "sm" | "md" | "icon-only";
  className?: string;
}

export function TheorySpeakerButton({
  text,
  title = "Nghe đọc mục này",
  label,
  size = "sm",
  className,
}: TheorySpeakerButtonProps) {
  const [isPlayingThis, setIsPlayingThis] = useState(false);
  const buttonIdRef = useRef<string>("");

  if (!buttonIdRef.current) {
    buttonIdRef.current = "speaker_" + Math.random().toString(36).substring(2, 9);
  }

  useEffect(() => {
    const handleActiveChange = (activeId: string | null) => {
      setIsPlayingThis(activeId === buttonIdRef.current);
    };

    subscribers.add(handleActiveChange);
    return () => {
      subscribers.delete(handleActiveChange);
      if (currentActiveId === buttonIdRef.current) {
        stopGlobalSpeech();
      }
    };
  }, []);

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        alert("Trình duyệt của bạn không hỗ trợ tính năng đọc âm thanh (Web Speech API).");
        return;
      }

      const synth = window.speechSynthesis;

      // If already playing this item, stop it
      if (currentActiveId === buttonIdRef.current) {
        stopGlobalSpeech();
        return;
      }

      // Stop any other active speech
      stopGlobalSpeech();

      // Clean raw text
      const clean = text
        .replace(/[*_#`]/g, "")
        .replace(/\s+/g, " ")
        .trim();

      if (!clean) return;

      // Split into sentences to avoid Chrome ~15s timeout
      const sentences = clean
        .split(/(?<=[.!?])\s+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      if (sentences.length === 0) return;

      currentActiveId = buttonIdRef.current;
      activeUtteranceQueue = sentences;
      currentQueueIndex = 0;
      isSpeakingGlobal = true;
      notifySubscribers();

      const playNextSentence = () => {
        if (currentActiveId !== buttonIdRef.current) return;

        if (currentQueueIndex >= activeUtteranceQueue.length) {
          stopGlobalSpeech();
          return;
        }

        const sentenceText = activeUtteranceQueue[currentQueueIndex];
        const utterance = new SpeechSynthesisUtterance(sentenceText);

        const { voice, pitch } = selectFemaleVoice(synth);
        if (voice) {
          utterance.voice = voice;
        }
        utterance.pitch = pitch;
        utterance.rate = 0.95; // Gentle, articulate pedagogical speed

        utterance.onend = () => {
          if (currentActiveId === buttonIdRef.current) {
            currentQueueIndex++;
            // Micro pause between sentences
            setTimeout(playNextSentence, 80);
          }
        };

        utterance.onerror = (err) => {
          if (err.error === "canceled" || err.error === "interrupted") return;
          console.warn("SpeechSynthesis error:", err);
          if (currentActiveId === buttonIdRef.current) {
            currentQueueIndex++;
            playNextSentence();
          }
        };

        synth.speak(utterance);
      };

      playNextSentence();
    },
    [text]
  );

  return (
    <button
      type="button"
      onClick={handleToggle}
      title={isPlayingThis ? "Dừng đọc" : title}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xl font-bold transition-all cursor-pointer select-none shrink-0",
        isPlayingThis
          ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 hover:bg-rose-500/25 shadow-2xs"
          : "bg-secondary/70 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/80 shadow-2xs",
        size === "icon-only" && "p-1.5",
        size === "sm" && "px-2 py-1 text-[10px]",
        size === "md" && "px-3 py-1.5 text-xs",
        className
      )}
    >
      {isPlayingThis ? (
        <>
          {/* Animated playing sound wave */}
          <span className="flex items-end gap-0.5 h-3">
            <span className="w-0.5 bg-rose-500 rounded-full animate-bounce [animation-delay:0ms] h-2" />
            <span className="w-0.5 bg-rose-500 rounded-full animate-bounce [animation-delay:150ms] h-3" />
            <span className="w-0.5 bg-rose-500 rounded-full animate-bounce [animation-delay:300ms] h-2.5" />
          </span>
          <Square className="h-2.5 w-2.5 fill-current" />
          {label && <span>Dừng</span>}
        </>
      ) : (
        <>
          <Volume2 className="h-3.5 w-3.5 text-amber-500 hover:text-amber-600 transition-colors" />
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  );
}
