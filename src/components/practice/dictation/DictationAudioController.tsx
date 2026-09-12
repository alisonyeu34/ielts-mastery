"use client";

import React, { useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Repeat,
  Volume2,
  Sparkles,
  Zap,
  Command,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DictationAudioControllerProps {
  isPlaying: boolean;
  isLooping: boolean;
  playbackSpeed: number; // 0.8, 0.9, 1.0
  onTogglePlay: () => void;
  onToggleLoop: () => void;
  onChangeSpeed: (speed: number) => void;
  onReplay: () => void;
  className?: string;
}

export function DictationAudioController({
  isPlaying,
  isLooping,
  playbackSpeed,
  onTogglePlay,
  onToggleLoop,
  onChangeSpeed,
  onReplay,
  className,
}: DictationAudioControllerProps) {
  // Global Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Space or Cmd + Space -> Play/Pause
      if ((e.ctrlKey || e.metaKey) && e.code === "Space") {
        e.preventDefault();
        onTogglePlay();
      }
      // Tab -> Toggle Loop
      else if (e.key === "Tab" && !e.shiftKey && !e.ctrlKey) {
        // Only if not focused on input
        const target = e.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          e.preventDefault();
          onToggleLoop();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onTogglePlay, onToggleLoop]);

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 select-none",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Play / Pause & Sound Indicator */}
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={onTogglePlay}
            className={cn(
              "flex h-13 w-13 items-center justify-center rounded-2xl text-white shadow-lg transition-all hover:scale-105 cursor-pointer",
              isPlaying
                ? "bg-amber-600 shadow-amber-600/30 ring-4 ring-amber-500/20"
                : "bg-primary shadow-primary/30"
            )}
            title="Phát / Dừng (Ctrl + Space)"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 fill-white ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={onReplay}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors cursor-pointer"
            title="Nghe lại từ đầu"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <div className="space-y-0.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
              Audio Chép Chính Tả (IELTS Section 1 & 2)
            </span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm text-foreground">
                {isPlaying ? "Đang phát câu nói..." : "Sẵn sàng phát âm thanh"}
              </span>

              {/* Animated wave bars */}
              {isPlaying && (
                <div className="flex items-center gap-0.5 h-3">
                  <span className="w-1 bg-primary h-full animate-pulse rounded-full" />
                  <span className="w-1 bg-primary h-2/3 animate-pulse rounded-full delay-75" />
                  <span className="w-1 bg-primary h-full animate-pulse rounded-full delay-150" />
                  <span className="w-1 bg-primary h-1/2 animate-pulse rounded-full delay-100" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Speed Controls & Loop Toggle */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* Smart Loop Toggle */}
          <button
            type="button"
            onClick={onToggleLoop}
            className={cn(
              "px-3.5 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
              isLooping
                ? "bg-primary text-primary-foreground border-primary shadow-xs"
                : "bg-secondary/40 text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
            )}
            title="Lặp lại câu vô tận (Tab)"
          >
            <Repeat className="h-3.5 w-3.5" />
            <span>Lặp Vô Tận</span>
          </button>

          {/* Speed Selector Buttons */}
          <div className="flex items-center p-1 rounded-xl bg-secondary/40 border border-border">
            {[0.8, 0.9, 1.0].map((speed) => (
              <button
                key={speed}
                type="button"
                onClick={() => onChangeSpeed(speed)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer",
                  playbackSpeed === speed
                    ? "bg-card text-foreground shadow-xs border border-border"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Helper Line */}
      <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono pt-2 border-t border-border/60">
        <span>Phím tắt: <strong>Ctrl + Space</strong> (Phát/Dừng) • <strong>Tab</strong> (Bật lặp câu)</span>
        <span>Tốc độ hiện tại: {playbackSpeed}x</span>
      </div>
    </div>
  );
}
