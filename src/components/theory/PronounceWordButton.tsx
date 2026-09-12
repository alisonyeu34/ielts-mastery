"use client";

import React, { useState } from "react";
import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PronounceWordButtonProps {
  word: string;
  rate?: number;
  className?: string;
  iconClassName?: string;
  title?: string;
  size?: "xs" | "sm" | "md";
}

export function playWordPronunciation(word: string, rate = 0.9) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const cleanWord = word.replace(/^[^\w]+|[^\w]+$/g, "").trim();
    const utterance = new SpeechSynthesisUtterance(cleanWord || word);
    utterance.lang = "en-GB";
    utterance.rate = rate;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const examinerVoice =
      voices.find((v) => (v.lang === "en-GB" || v.lang === "en-US") && !v.name.includes("Google")) ||
      voices.find((v) => v.lang.startsWith("en"));
    if (examinerVoice) {
      utterance.voice = examinerVoice;
    }
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn("Speech synthesis error:", err);
  }
}

export function PronounceWordButton({
  word,
  rate = 0.9,
  className,
  iconClassName,
  title = "Nghe phát âm từ này",
  size = "xs",
}: PronounceWordButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePronounce = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    try {
      window.speechSynthesis.cancel();
      const cleanWord = word.replace(/^[^\w]+|[^\w]+$/g, "").trim();
      const utterance = new SpeechSynthesisUtterance(cleanWord || word);
      utterance.lang = "en-GB";
      utterance.rate = rate;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const examinerVoice =
        voices.find((v) => (v.lang === "en-GB" || v.lang === "en-US") && !v.name.includes("Google")) ||
        voices.find((v) => v.lang.startsWith("en"));
      if (examinerVoice) {
        utterance.voice = examinerVoice;
      }

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
      setTimeout(() => setIsPlaying(false), 2000);
    } catch {
      setIsPlaying(false);
    }
  };

  const sizeClasses = {
    xs: "p-1 rounded-md",
    sm: "p-1.5 rounded-lg",
    md: "p-2 rounded-xl",
  };

  const iconSizes = {
    xs: "h-3 w-3",
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
  };

  return (
    <button
      type="button"
      onClick={handlePronounce}
      className={cn(
        "cursor-pointer transition-all shrink-0 inline-flex items-center justify-center",
        isPlaying
          ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/30 scale-105"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary/70",
        sizeClasses[size],
        className
      )}
      title={title}
      aria-label={`Phát âm từ ${word}`}
    >
      <Volume2
        className={cn(
          iconSizes[size],
          isPlaying && "animate-pulse text-amber-600 dark:text-amber-400",
          iconClassName
        )}
      />
    </button>
  );
}
