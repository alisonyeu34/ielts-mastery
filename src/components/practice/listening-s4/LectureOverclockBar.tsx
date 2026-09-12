"use client";

import React, { useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Zap,
  Volume2,
  Gauge,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LectureOverclockBarProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onChangeRate: (rate: number) => void;
  className?: string;
}

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function LectureOverclockBar({
  isPlaying,
  currentTime,
  duration,
  playbackRate,
  onTogglePlay,
  onSeek,
  onChangeRate,
  className,
}: LectureOverclockBarProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simulated audio time advance
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        onSeek(Math.min(duration, currentTime + 1 * playbackRate));
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, currentTime, duration, playbackRate, onSeek]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-sm space-y-3.5 select-none",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Volume2 className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground">
              Bài Giảng Liên Tục Không Quãng Nghỉ (Non-stop Stream)
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Không có 30s nghỉ giữa bài • 10 câu hỏi liên hoàn
            </p>
          </div>
        </div>

        {/* Speed Overclock Selector */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-secondary/60 p-1 rounded-xl border border-border/80 text-xs">
          <span className="text-[10px] font-bold text-muted-foreground px-1.5 flex items-center gap-1">
            <Gauge className="h-3 w-3 text-amber-500" />
            <span>Tốc độ:</span>
          </span>

          {[
            { rate: 1.0, label: "1.0x (Thi thật)" },
            { rate: 1.1, label: "1.1x (Phản xạ)" },
            { rate: 1.25, label: "1.25x (Cực hạn)" },
          ].map((item) => (
            <button
              key={item.rate}
              type="button"
              onClick={() => onChangeRate(item.rate)}
              className={cn(
                "px-2.5 py-1 rounded-lg font-mono font-bold transition-all cursor-pointer text-[11px]",
                playbackRate === item.rate
                  ? "bg-card text-foreground shadow-xs border border-border/80 font-extrabold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Play Controls & Seek Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono font-bold text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span className="text-[10px] font-sans font-normal text-muted-foreground">
            {isPlaying ? "🔴 Đang phát âm thanh bài giảng..." : "Tạm dừng"}
          </span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Seek Bar */}
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            onSeek(clickPos * duration);
          }}
          className="relative w-full bg-secondary h-2.5 rounded-full overflow-hidden cursor-pointer group"
        >
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-indigo-600 rounded-full transition-all duration-150 group-hover:bg-indigo-500"
          />
        </div>
      </div>

      {/* Main Trigger Button */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={onTogglePlay}
          className={cn(
            "px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer",
            isPlaying
              ? "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/30"
              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:scale-105"
          )}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
          <span>{isPlaying ? "Tạm dừng bài giảng" : "Bắt đầu nghe bài giảng Section 4"}</span>
        </button>

        <button
          type="button"
          onClick={() => onSeek(0)}
          className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground border border-border text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Tua về đầu bài giảng"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Về đầu</span>
        </button>
      </div>
    </div>
  );
}
