"use client";

import React, { useEffect } from "react";
import { Clock, AlertTriangle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExamTimerClockProps {
  timeLeftSeconds: number;
  totalDurationSeconds: number;
  sectionTitle: string;
  onTick: () => void;
  onTimeUp: () => void;
  className?: string;
}

function formatExamTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function ExamTimerClock({
  timeLeftSeconds,
  totalDurationSeconds,
  sectionTitle,
  onTick,
  onTimeUp,
  className,
}: ExamTimerClockProps) {
  useEffect(() => {
    if (timeLeftSeconds <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      onTick();
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeftSeconds, onTick, onTimeUp]);

  const isLowTime = timeLeftSeconds <= 300 && timeLeftSeconds > 0; // <= 5 mins
  const progressPercent =
    totalDurationSeconds > 0 ? (timeLeftSeconds / totalDurationSeconds) * 100 : 0;

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-2xl border transition-all select-none",
        isLowTime
          ? "bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400 ring-2 ring-rose-500/30 animate-pulse shadow-md shadow-rose-500/10"
          : "bg-card border-border/80 text-foreground shadow-xs",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Clock
          className={cn(
            "h-4 w-4",
            isLowTime ? "text-rose-600 animate-spin" : "text-primary"
          )}
        />
        <div className="hidden sm:block text-left">
          <span className="text-[10px] uppercase font-bold text-muted-foreground block leading-none">
            {sectionTitle}
          </span>
          <span className="text-[11px] font-semibold text-muted-foreground">
            {isLowTime ? "Cảnh báo: Sắp hết giờ!" : "Thời gian còn lại"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={cn(
            "font-mono text-base sm:text-lg font-black tracking-tight",
            isLowTime ? "text-rose-600 dark:text-rose-400 font-extrabold" : "text-foreground"
          )}
        >
          {formatExamTime(timeLeftSeconds)}
        </span>
      </div>
    </div>
  );
}
