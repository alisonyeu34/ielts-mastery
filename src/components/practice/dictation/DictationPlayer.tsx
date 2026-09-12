"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Gauge,
  Sparkles,
  Headphones,
  Keyboard,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DictationPlayerProps {
  textToSpeak: string;
  audioUrl?: string;
  onPlayStart?: () => void;
  onPlayEnd?: () => void;
  className?: string;
}

export function DictationPlayer({
  textToSpeak,
  audioUrl,
  onPlayStart,
  onPlayEnd,
  className,
}: DictationPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [playCount, setPlayCount] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play audio using HTML5 Audio if url available, or browser Web Speech Synthesis
  const playAudio = (rate = playbackRate) => {
    if (typeof window === "undefined") return;

    if (audioUrl && audioRef.current) {
      audioRef.current.playbackRate = rate;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Fallback to speech synth if audio URL fails
        speakWithSynthesis(textToSpeak, rate);
      });
      setIsPlaying(true);
      setPlayCount((prev) => prev + 1);
      if (onPlayStart) onPlayStart();
      return;
    }

    speakWithSynthesis(textToSpeak, rate);
  };

  const speakWithSynthesis = (text: string, rate: number) => {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = 1.0;
    utterance.lang = "en-GB"; // Standard British accent for IELTS

    // Attempt to pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (v) => (v.lang === "en-GB" || v.lang === "en-US") && !v.name.includes("Google")
    ) || voices.find((v) => v.lang.startsWith("en"));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setPlayCount((prev) => prev + 1);
      if (onPlayStart) onPlayStart();
    };

    utterance.onend = () => {
      setIsPlaying(false);
      if (onPlayEnd) onPlayEnd();
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      if (onPlayEnd) onPlayEnd();
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  // Keyboard shortcut listener for Ctrl+Space (Replay) and Shift+Space (Slow 0.8x)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.altKey) && e.code === "Space") {
        e.preventDefault();
        playAudio(playbackRate);
      } else if (e.shiftKey && e.code === "Space") {
        e.preventDefault();
        setPlaybackRate(0.8);
        playAudio(0.8);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      stopAudio();
    };
  }, [textToSpeak, playbackRate]);

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-sm space-y-4",
        className
      )}
    >
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => {
            setIsPlaying(false);
            if (onPlayEnd) onPlayEnd();
          }}
        />
      )}

      {/* Main player controls bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Play / Replay button with sound wave animation */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => (isPlaying ? stopAudio() : playAudio(playbackRate))}
            className={cn(
              "relative flex h-14 w-14 items-center justify-center rounded-2xl font-bold text-white shadow-lg transition-all cursor-pointer",
              isPlaying
                ? "bg-rose-600 shadow-rose-600/30 scale-105"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30 hover:scale-105"
            )}
            title={isPlaying ? "Dừng phát" : "Nghe câu này (Ctrl + Space)"}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 fill-white" />
            ) : (
              <Play className="h-6 w-6 fill-white ml-0.5" />
            )}
            {isPlaying && (
              <span className="absolute -inset-1 rounded-2xl bg-indigo-500/20 animate-ping pointer-events-none" />
            )}
          </button>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground">
                {isPlaying ? "Đang phát âm thanh..." : "Bấm để nghe câu"}
              </span>
              <span className="text-[10px] font-semibold text-muted-foreground bg-secondary px-2 py-0.5 rounded-full border border-border">
                Đã nghe: {playCount} lần
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              Chuẩn giọng phát âm Anh - Anh (UK Academic)
            </span>
          </div>
        </div>

        {/* Speed Controls: 0.8x, 0.9x, 1.0x */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
          <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 hidden md:flex mr-1">
            <Gauge className="h-3.5 w-3.5 text-indigo-500" /> Tốc độ:
          </span>
          {[0.8, 0.9, 1.0].map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => {
                setPlaybackRate(rate);
                if (isPlaying) {
                  playAudio(rate);
                }
              }}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer",
                playbackRate === rate
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/20"
                  : "bg-secondary/60 text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
              )}
            >
              {rate.toFixed(1)}x {rate === 0.8 && "(Chậm)"}
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard shortcuts helper bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/60 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <Keyboard className="h-3.5 w-3.5 text-indigo-500" />
          <span>Phím tắt:</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span>
            <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border font-mono text-[10px] text-foreground">
              Ctrl+Space
            </kbd>{" "}
            Nghe lại
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border font-mono text-[10px] text-foreground">
              Shift+Space
            </kbd>{" "}
            Nghe chậm 0.8x
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border font-mono text-[10px] text-foreground">
              Ctrl+Enter
            </kbd>{" "}
            Nộp bài
          </span>
        </div>
      </div>
    </div>
  );
}
