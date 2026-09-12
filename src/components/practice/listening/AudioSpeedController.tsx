"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  FastForward,
  Rewind,
  Volume2,
  Sparkles,
  User,
  Radio,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIeltsAudioEngine } from "@/hooks/useIeltsAudioEngine";

interface AudioSpeedControllerProps {
  transcript: string;
  durationSeconds: number;
  title: string;
  onTimeUpdate?: (currentTime: number) => void;
  className?: string;
}

export function AudioSpeedController({
  transcript,
  durationSeconds,
  title,
  onTimeUpdate,
  className,
}: AudioSpeedControllerProps) {
  const {
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    activeSegment,
    activeSpeaker,
    togglePlay,
    seekTo,
    rewind,
    forward,
    setPlaybackRate,
  } = useIeltsAudioEngine({
    transcript,
    durationSeconds,
    onTimeUpdate,
  });

  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPercent, setHoverPercent] = useState<number>(0);
  const scrubberRef = useRef<HTMLDivElement | null>(null);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrubberRef.current || duration <= 0) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetSec = ratio * duration;
    seekTo(targetSec);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrubberRef.current || duration <= 0) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const moveX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, moveX / rect.width));
    setHoverPercent(ratio * 100);
    setHoverTime(ratio * duration);
  };

  // Keyboard shortcut listeners (Space, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "ArrowLeft" && e.altKey) {
        e.preventDefault();
        rewind(5);
      } else if (e.code === "ArrowRight" && e.altKey) {
        e.preventDefault();
        forward(5);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay, rewind, forward]);

  return (
    <div
      className={cn(
        "rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-card via-indigo-500/[0.04] to-card p-4 sm:p-5 shadow-sm space-y-3 select-none transition-all",
        className
      )}
    >
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "flex h-2.5 w-2.5 rounded-full",
              isPlaying ? "bg-emerald-500 animate-ping" : "bg-muted-foreground"
            )}
          />
          <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
            <Radio className="h-3.5 w-3.5 text-indigo-500" />
            <span>{title} (Academic Accent • en-GB)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-extrabold text-foreground">
            {formatTime(currentTime)}
          </span>
          <span className="text-xs font-mono text-muted-foreground">/</span>
          <span className="text-xs font-mono font-medium text-muted-foreground">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Interactive Progress Bar / Scrubber */}
      <div className="space-y-1">
        <div
          ref={scrubberRef}
          onClick={handleScrubberClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverTime(null)}
          className="w-full bg-secondary/80 hover:bg-secondary rounded-full h-3 relative cursor-pointer group transition-all flex items-center"
          title="Bấm hoặc kéo để tua bài nghe"
        >
          {/* Progress fill */}
          <div
            style={{ width: `${progressPercent}%` }}
            className="bg-indigo-600 h-2 group-hover:h-2.5 rounded-full transition-all duration-100 relative"
          >
            {/* Scrubber Thumb Knob */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-indigo-600 rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform" />
          </div>

          {/* Hover Time Tooltip */}
          {hoverTime !== null && (
            <div
              style={{ left: `${hoverPercent}%` }}
              className="absolute -top-7 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow border border-border pointer-events-none z-20 whitespace-nowrap"
            >
              {formatTime(hoverTime)}
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => rewind(5)}
            className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground transition-all cursor-pointer active:scale-95 shadow-2xs"
            title="Tua lại 5 giây (Alt + ←)"
          >
            <Rewind className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className={cn(
              "px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer active:scale-95",
              isPlaying
                ? "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:scale-105"
            )}
            title="Phát / Tạm dừng (Phím Space)"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                <span>Tạm dừng</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-white" />
                <span>{currentTime > 0 && currentTime < duration ? "Nghe tiếp" : "Phát bài nghe"}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => forward(5)}
            className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground transition-all cursor-pointer active:scale-95 shadow-2xs"
            title="Tua tới 5 giây (Alt + →)"
          >
            <FastForward className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="text-[11px] font-medium">Tốc độ:</span>
          {[0.75, 1.0, 1.25, 1.5].map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => setPlaybackRate(rate)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border",
                playbackRate === rate
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-secondary text-muted-foreground border-border hover:bg-secondary/80"
              )}
            >
              {rate === 1.0 ? "1x" : `${rate}x`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
