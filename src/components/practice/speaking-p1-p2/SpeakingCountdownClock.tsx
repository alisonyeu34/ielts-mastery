"use client";

import React from "react";
import {
  Clock,
  Mic,
  Square,
  FastForward,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { SpeakingPhase } from "@/hooks/useSpeakingSession";
import { cn } from "@/lib/utils";

interface SpeakingCountdownClockProps {
  phase: SpeakingPhase;
  prepTimeRemaining: number; // 60 -> 0
  speakingTimeElapsed: number; // 0 -> 120
  onSkipPrep: () => void;
  onFinishSpeaking: () => void;
  className?: string;
}

export function SpeakingCountdownClock({
  phase,
  prepTimeRemaining,
  speakingTimeElapsed,
  onSkipPrep,
  onFinishSpeaking,
  className,
}: SpeakingCountdownClockProps) {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const isPrep = phase === "preparing";
  const isSpeaking = phase === "speaking";

  if (phase === "idle" || phase === "completed") return null;

  return (
    <div
      className={cn(
        "rounded-3xl border p-4 sm:p-5 shadow-sm transition-all select-none space-y-3",
        isPrep
          ? "border-amber-500/40 bg-amber-500/[0.04]"
          : "border-indigo-500/40 bg-indigo-500/[0.04]",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Status Indicator */}
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-2xl text-white shadow-md font-bold",
              isPrep ? "bg-amber-600 shadow-amber-600/30" : "bg-rose-600 shadow-rose-600/30 animate-pulse"
            )}
          >
            {isPrep ? <Clock className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </div>

          <div>
            <span className="text-xs sm:text-sm font-extrabold text-foreground block">
              {isPrep ? "Thời Gian Chuẩn Bị Dàn Ý (60 Giây)" : "Thời Gian Độc Thoại Part 2 (Mục Tiêu 2 Phút)"}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {isPrep
                ? "Ghi chú nhanh các từ khóa 5 giác quan / lâu đài trí nhớ"
                : speakingTimeElapsed < 90
                ? "Tiếp tục nói... (Cần nói tối thiểu 1 phút 30 giây)"
                : speakingTimeElapsed <= 120
                ? "✓ Đã đạt vùng an toàn của giám khảo (1:45 - 2:00)"
                : "⚠️ Đã chạm mốc 2 phút tối đa!"}
            </span>
          </div>
        </div>

        {/* Timer Digits & Actions */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="text-center font-mono">
            <span
              className={cn(
                "text-2xl sm:text-3xl font-black tracking-tight",
                isPrep
                  ? prepTimeRemaining <= 10
                    ? "text-rose-600 animate-pulse"
                    : "text-amber-600 dark:text-amber-400"
                  : speakingTimeElapsed >= 105
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-indigo-600 dark:text-indigo-400"
              )}
            >
              {isPrep ? formatTime(prepTimeRemaining) : formatTime(speakingTimeElapsed)}
            </span>
            <span className="text-[10px] text-muted-foreground block font-sans">
              {isPrep ? "Còn lại" : "Đã nói"}
            </span>
          </div>

          {isPrep && (
            <button
              type="button"
              onClick={onSkipPrep}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Bắt đầu nói ngay</span>
              <FastForward className="h-3.5 w-3.5" />
            </button>
          )}

          {isSpeaking && (
            <button
              type="button"
              onClick={onFinishSpeaking}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/30 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Square className="h-3.5 w-3.5 fill-white" />
              <span>Dừng & Nộp bài nói</span>
            </button>
          )}
        </div>
      </div>

      {/* Speaking Phase Milestone Progress Bar */}
      {isSpeaking && (
        <div className="space-y-1 pt-1">
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden relative">
            <div
              style={{ width: `${Math.min(100, (speakingTimeElapsed / 120) * 100)}%` }}
              className={cn(
                "h-full rounded-full transition-all duration-300",
                speakingTimeElapsed < 90
                  ? "bg-amber-500"
                  : speakingTimeElapsed <= 120
                  ? "bg-emerald-500"
                  : "bg-rose-500"
              )}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground px-1">
            <span>0:00</span>
            <span className={cn(speakingTimeElapsed >= 90 && "text-emerald-600 font-bold")}>
              1:30 (Tối thiểu)
            </span>
            <span className={cn(speakingTimeElapsed >= 105 && "text-emerald-600 font-bold")}>
              1:45 (Lý tưởng)
            </span>
            <span>2:00 (Tối đa)</span>
          </div>
        </div>
      )}
    </div>
  );
}
