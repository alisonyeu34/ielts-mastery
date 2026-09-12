"use client";

import React from "react";
import {
  Volume2,
  Play,
  Square,
  RotateCcw,
  Gauge,
  Sparkles,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DictationAudioPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReplay: () => void;
  playbackSpeed: 0.8 | 1.0;
  onSpeedChange: (speed: 0.8 | 1.0) => void;
  playCount: number;
  recommendedLimit: number;
  speakerAccent: string;
  className?: string;
}

export function DictationAudioPlayer({
  isPlaying,
  onTogglePlay,
  onReplay,
  playbackSpeed,
  onSpeedChange,
  playCount,
  recommendedLimit,
  speakerAccent,
  className,
}: DictationAudioPlayerProps) {
  const isOverLimit = playCount > recommendedLimit;

  return (
    <div
      className={cn(
        "p-5 sm:p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4 select-none",
        isPlaying && "ring-2 ring-indigo-500/30 border-indigo-500/40",
        className
      )}
    >
      {/* Top Meta Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-3">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-xl transition-all shadow-xs",
              isPlaying
                ? "bg-indigo-600 text-white animate-pulse"
                : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
            )}
          >
            <Volume2 className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
              Giọng Đọc Chuẩn: {speakerAccent}
            </span>
            <h4 className="text-xs sm:text-sm font-extrabold text-foreground">
              Bộ Thu Phát Tín Hiệu Âm Học IELTS
            </h4>
          </div>
        </div>

        {/* Play Count Tracker */}
        <div
          className={cn(
            "px-3 py-1.5 rounded-2xl font-mono text-xs font-bold border flex items-center gap-1.5",
            isOverLimit
              ? "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300"
              : "bg-secondary border-border text-foreground"
          )}
        >
          {isOverLimit && <AlertCircle className="h-3.5 w-3.5 text-amber-500" />}
          <span>
            Đã nghe: {playCount}/{recommendedLimit} lần
          </span>
          {isOverLimit && (
            <span className="text-[10px] text-amber-600 dark:text-amber-400">
              (Khuyến nghị ≤ {recommendedLimit})
            </span>
          )}
        </div>
      </div>

      {/* Waveform Visualization Animation */}
      <div className="flex items-center justify-center gap-1 h-12 px-4 rounded-2xl bg-secondary/40 border border-border/60 overflow-hidden">
        {Array.from({ length: 32 }).map((_, i) => {
          const heightFactor = isPlaying
            ? Math.sin(i * 0.5 + Date.now() * 0.005) * 40 + 50
            : 20;

          return (
            <div
              key={i}
              className={cn(
                "w-1 rounded-full transition-all duration-150",
                isPlaying
                  ? "bg-gradient-to-t from-indigo-500 to-purple-500"
                  : "bg-muted-foreground/30"
              )}
              style={{
                height: `${Math.max(15, Math.min(100, heightFactor))}%`,
              }}
            />
          );
        })}
      </div>

      {/* Main Playback & Speed Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        {/* Play & Replay Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={onTogglePlay}
            className={cn(
              "flex-1 sm:flex-none px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer",
              isPlaying
                ? "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25"
            )}
          >
            {isPlaying ? (
              <>
                <Square className="h-4 w-4" />
                <span>Tạm Dừng (Space)</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-white" />
                <span>Phát Âm Thanh (Space)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onReplay}
            className="p-3 rounded-2xl border border-border hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title="Phát lại từ đầu (Ctrl + Space)"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        {/* Speed Toggles */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-secondary/60 border border-border text-xs font-mono w-full sm:w-auto justify-center">
          <span className="text-[10px] text-muted-foreground px-2 font-bold uppercase flex items-center gap-1">
            <Gauge className="h-3 w-3" /> Tốc độ:
          </span>
          <button
            type="button"
            onClick={() => onSpeedChange(0.8)}
            className={cn(
              "px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer",
              playbackSpeed === 0.8
                ? "bg-card text-foreground shadow-xs border border-border"
                : "text-muted-foreground hover:text-foreground"
            )}
            title="Tốc độ chậm 0.8x để nghe rõ nối/nuốt âm (Ctrl + ↓)"
          >
            0.8x (Chậm)
          </button>
          <button
            type="button"
            onClick={() => onSpeedChange(1.0)}
            className={cn(
              "px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer",
              playbackSpeed === 1.0
                ? "bg-card text-foreground shadow-xs border border-border"
                : "text-muted-foreground hover:text-foreground"
            )}
            title="Tốc độ chuẩn 1.0x như kỳ thi thật (Ctrl + ↑)"
          >
            1.0x (Chuẩn)
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Helper Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/60 text-[10px] font-mono text-muted-foreground">
        <span>Phím tắt:</span>
        <div className="flex flex-wrap gap-2">
          <span className="px-1.5 py-0.5 rounded bg-secondary border border-border/80 text-foreground">
            Space: Phát / Dừng
          </span>
          <span className="px-1.5 py-0.5 rounded bg-secondary border border-border/80 text-foreground">
            Ctrl + Space: Nghe Lại
          </span>
          <span className="px-1.5 py-0.5 rounded bg-secondary border border-border/80 text-foreground">
            Ctrl + ↓ / ↑: 0.8x / 1.0x
          </span>
        </div>
      </div>
    </div>
  );
}
