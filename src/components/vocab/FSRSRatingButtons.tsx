"use client";

import React, { useEffect } from "react";
import {
  RotateCcw,
  Zap,
  CheckCircle2,
  Sparkles,
  Flame,
} from "lucide-react";
import { FSRSRating, getEstimatedIntervalLabels } from "@/lib/fsrsEngine";
import { cn } from "@/lib/utils";

interface FSRSRatingButtonsProps {
  card: {
    stability?: number;
    stepInterval: number;
  };
  onRate: (rating: FSRSRating) => void;
  disabled?: boolean;
  className?: string;
}

export function FSRSRatingButtons({
  card,
  onRate,
  disabled = false,
  className,
}: FSRSRatingButtonsProps) {
  const intervals = getEstimatedIntervalLabels(card);

  // Keyboard Shortcuts (1, 2, 3, 4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      if (e.key === "1") onRate("again");
      else if (e.key === "2") onRate("hard");
      else if (e.key === "3") onRate("good");
      else if (e.key === "4") onRate("easy");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [disabled, onRate]);

  return (
    <div className={cn("space-y-3 select-none", className)}>
      <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
        <span>Đánh giá mức độ ghi nhớ (Phím 1 - 2 - 3 - 4):</span>
        <span>Thuật toán FSRS v4</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* 1. Again */}
        <button
          type="button"
          onClick={() => onRate("again")}
          disabled={disabled}
          className="p-3.5 rounded-2xl border border-rose-500/30 bg-rose-500/[0.06] hover:bg-rose-500/15 text-left transition-all hover:scale-102 cursor-pointer group space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-[10px] px-1.5 py-0.5 rounded bg-rose-500 text-white">
              Phím 1
            </span>
            <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 font-mono">
              {intervals.again}
            </span>
          </div>
          <span className="font-black text-rose-700 dark:text-rose-300 text-xs sm:text-sm block">
            Again (Quên)
          </span>
          <p className="text-[10px] text-muted-foreground leading-tight">
            Không nhớ hoặc sai nghĩa
          </p>
        </button>

        {/* 2. Hard */}
        <button
          type="button"
          onClick={() => onRate("hard")}
          disabled={disabled}
          className="p-3.5 rounded-2xl border border-amber-500/30 bg-amber-500/[0.06] hover:bg-amber-500/15 text-left transition-all hover:scale-102 cursor-pointer group space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-[10px] px-1.5 py-0.5 rounded bg-amber-500 text-white">
              Phím 2
            </span>
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 font-mono">
              {intervals.hard}
            </span>
          </div>
          <span className="font-black text-amber-700 dark:text-amber-300 text-xs sm:text-sm block">
            Hard (Khó)
          </span>
          <p className="text-[10px] text-muted-foreground leading-tight">
            Nhớ nhưng mất nhiều thời gian
          </p>
        </button>

        {/* 3. Good */}
        <button
          type="button"
          onClick={() => onRate("good")}
          disabled={disabled}
          className="p-3.5 rounded-2xl border border-blue-500/30 bg-blue-500/[0.06] hover:bg-blue-500/15 text-left transition-all hover:scale-102 cursor-pointer group space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-[10px] px-1.5 py-0.5 rounded bg-blue-500 text-white">
              Phím 3
            </span>
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 font-mono">
              {intervals.good}
            </span>
          </div>
          <span className="font-black text-blue-700 dark:text-blue-300 text-xs sm:text-sm block">
            Good (Nhớ)
          </span>
          <p className="text-[10px] text-muted-foreground leading-tight">
            Nhớ chuẩn sau vài giây
          </p>
        </button>

        {/* 4. Easy */}
        <button
          type="button"
          onClick={() => onRate("easy")}
          disabled={disabled}
          className="p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] hover:bg-emerald-500/15 text-left transition-all hover:scale-102 cursor-pointer group space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-[10px] px-1.5 py-0.5 rounded bg-emerald-500 text-white">
              Phím 4
            </span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              {intervals.easy}
            </span>
          </div>
          <span className="font-black text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm block">
            Easy (Dễ)
          </span>
          <p className="text-[10px] text-muted-foreground leading-tight">
            Phản xạ tức thì không do dự
          </p>
        </button>
      </div>
    </div>
  );
}
