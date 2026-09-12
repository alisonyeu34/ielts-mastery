"use client";

import React from "react";
import { Clock, Play, SkipForward, AlertCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface OneMinutePrepTimerProps {
  secondsLeft: number;
  isPrepping: boolean;
  isPrepLocked: boolean;
  onStartPrep: () => void;
  onSkipToRecording: () => void;
  className?: string;
}

export function OneMinutePrepTimer({
  secondsLeft,
  isPrepping,
  isPrepLocked,
  onStartPrep,
  onSkipToRecording,
  className,
}: OneMinutePrepTimerProps) {
  const percentage = Math.round((secondsLeft / 60) * 100);
  const isUrgent = isPrepping && secondsLeft <= 10;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 select-none",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-foreground">
              Đồng Hồ 1 Phút Chuẩn Bị (1-Minute Prep Arena)
            </h4>
            <span className="text-[10px] font-mono text-muted-foreground">
              Áp lực chuẩn phòng thi • Tự động khóa ghi chú khi hết giờ
            </span>
          </div>
        </div>

        {/* Timer Digital Display */}
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "font-mono text-2xl sm:text-3xl font-black px-4 py-1 rounded-2xl border",
              isUrgent
                ? "bg-rose-500/15 text-rose-600 border-rose-500/40 animate-pulse"
                : isPrepping
                ? "bg-purple-500/10 text-purple-600 border-purple-500/30"
                : "bg-secondary text-foreground border-border"
            )}
          >
            00:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
          <div
            style={{ width: `${percentage}%` }}
            className={cn(
              "h-full rounded-full transition-all duration-300",
              isUrgent
                ? "bg-rose-500"
                : "bg-gradient-to-r from-purple-500 to-primary"
            )}
          />
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3 pt-1">
        {!isPrepping && !isPrepLocked && (
          <button
            type="button"
            onClick={onStartPrep}
            className="flex-1 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01] cursor-pointer"
          >
            <Play className="h-4 w-4" />
            <span>Bắt Đầu 1 Phút Chuẩn Bị</span>
          </button>
        )}

        {isPrepping && (
          <button
            type="button"
            onClick={onSkipToRecording}
            className="flex-1 py-3 rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-border"
          >
            <SkipForward className="h-4 w-4 text-primary" />
            <span>Đã Xong Dàn Ý ➔ Bắt Đầu Nói Ngay</span>
          </button>
        )}

        {isPrepLocked && (
          <div className="w-full p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center text-xs font-bold text-amber-700 dark:text-amber-300">
            🔒 Đã hết 1 phút chuẩn bị! Bảng ghi chú đã được khóa.
          </div>
        )}
      </div>
    </div>
  );
}
