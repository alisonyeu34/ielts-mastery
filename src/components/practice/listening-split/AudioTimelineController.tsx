"use client";

import React, { useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Gauge,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Radio,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioTimelineControllerProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  playbackRate: number;
  blindMode: boolean;
  onTogglePlay: () => void;
  onSeek: (timeSec: number) => void;
  onChangeRate: (rate: number) => void;
  onToggleBlindMode: () => void;
  className?: string;
}

export function AudioTimelineController({
  currentTime,
  duration,
  isPlaying,
  playbackRate,
  blindMode,
  onTogglePlay,
  onSeek,
  onChangeRate,
  onToggleBlindMode,
  className,
}: AudioTimelineControllerProps) {
  // Format MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, "0")}:${rem.toString().padStart(2, "0")}`;
  };

  // Global Keyboard Shortcuts (Space, Alt+Left, Alt+Right, [, ])
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        onTogglePlay();
      } else if (e.altKey && e.code === "ArrowLeft") {
        e.preventDefault();
        onSeek(Math.max(0, currentTime - 5));
      } else if (e.altKey && e.code === "ArrowRight") {
        e.preventDefault();
        onSeek(Math.min(duration, currentTime + 5));
      } else if (e.key === "[") {
        e.preventDefault();
        onChangeRate(0.8);
      } else if (e.key === "]") {
        e.preventDefault();
        onChangeRate(1.2);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentTime, duration, onTogglePlay, onSeek, onChangeRate]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-sm space-y-3.5 select-none",
        className
      )}
    >
      {/* Top Row: Playback Controls & Speed & Blind Mode */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Play/Pause & Step Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSeek(Math.max(0, currentTime - 5))}
            className="p-2 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-all cursor-pointer"
            title="Lùi 5 giây (Alt + ←)"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onTogglePlay}
            className="h-11 w-11 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-md flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
            title="Phát / Dừng (Space)"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={() => onSeek(Math.min(duration, currentTime + 5))}
            className="p-2 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-all cursor-pointer"
            title="Tiến 5 giây (Alt + →)"
          >
            <RotateCw className="h-4 w-4" />
          </button>

          {/* Time text */}
          <span className="font-mono text-xs font-bold text-foreground ml-2">
            {formatTime(currentTime)} <span className="text-muted-foreground font-normal">/ {formatTime(duration)}</span>
          </span>
        </div>

        {/* Speed Toggles & Blind Mode Button */}
        <div className="flex items-center gap-2">
          {/* Speed 0.75x, 1x, 1.5x */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary/40 border border-border text-[11px] font-mono font-bold">
            {([0.75, 1.0, 1.5] as const).map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => onChangeRate(rate)}
                className={cn(
                  "px-2 py-0.5 rounded-lg transition-all cursor-pointer",
                  playbackRate === rate
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {rate === 1.0 ? "1x" : `${rate}x`}
              </button>
            ))}
          </div>

          {/* Blind Mode Toggle */}
          <button
            type="button"
            onClick={onToggleBlindMode}
            className={cn(
              "px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs",
              blindMode
                ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
                : "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
            )}
            title="Khóa/Mở transcript"
          >
            {blindMode ? (
              <>
                <Lock className="h-3.5 w-3.5 text-amber-500" />
                <span>Chế Độ Phòng Thi (Ẩn Chữ)</span>
              </>
            ) : (
              <>
                <Unlock className="h-3.5 w-3.5 text-emerald-500" />
                <span>Mở Khóa Transcript</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Scrubber Progress Slider with Waveform */}
      <div className="relative group cursor-pointer">
        <input
          type="range"
          min={0}
          max={duration}
          step={0.5}
          value={currentTime}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="w-full h-2 rounded-full bg-secondary appearance-none cursor-pointer accent-primary"
        />
      </div>
    </div>
  );
}
