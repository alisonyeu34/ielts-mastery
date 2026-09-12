"use client";

import React, { useEffect } from "react";
import { RotateCcw, ThumbsUp, Sparkles, Zap } from "lucide-react";
import { FSRSRating } from "@/lib/fsrsScheduler";
import { cn } from "@/lib/utils";

interface FSRSActionButtonsProps {
  onRate: (rating: FSRSRating) => void;
  disabled?: boolean;
}

export function FSRSActionButtons({ onRate, disabled = false }: FSRSActionButtonsProps) {
  // Global Keyboard Shortcuts: 1, 2, 3, 4
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      if (e.key === "1") onRate(1);
      else if (e.key === "2") onRate(2);
      else if (e.key === "3") onRate(3);
      else if (e.key === "4") onRate(4);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onRate, disabled]);

  return (
    <div className="w-full max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 select-none">
      {/* 1 - Again */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onRate(1)}
        className="p-3.5 rounded-2xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all hover:scale-102 cursor-pointer disabled:opacity-50 group shadow-sm"
      >
        <div className="flex items-center gap-1.5">
          <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-[10px] font-mono font-black">
            1
          </span>
          <span className="text-sm font-black">Again</span>
        </div>
        <span className="text-[10px] text-muted-foreground font-medium">
          Quên (&lt; 10 phút)
        </span>
      </button>

      {/* 2 - Hard */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onRate(2)}
        className="p-3.5 rounded-2xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all hover:scale-102 cursor-pointer disabled:opacity-50 group shadow-sm"
      >
        <div className="flex items-center gap-1.5">
          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-[10px] font-mono font-black">
            2
          </span>
          <span className="text-sm font-black">Hard</span>
        </div>
        <span className="text-[10px] text-muted-foreground font-medium">
          Nhớ khó (1-2 ngày)
        </span>
      </button>

      {/* 3 - Good */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onRate(3)}
        className="p-3.5 rounded-2xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all hover:scale-102 cursor-pointer disabled:opacity-50 group shadow-sm"
      >
        <div className="flex items-center gap-1.5">
          <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-[10px] font-mono font-black">
            3
          </span>
          <span className="text-sm font-black">Good</span>
        </div>
        <span className="text-[10px] text-muted-foreground font-medium">
          Đúng chuẩn (3-4 ngày)
        </span>
      </button>

      {/* 4 - Easy */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onRate(4)}
        className="p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all hover:scale-102 cursor-pointer disabled:opacity-50 group shadow-sm"
      >
        <div className="flex items-center gap-1.5">
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[10px] font-mono font-black">
            4
          </span>
          <span className="text-sm font-black">Easy</span>
        </div>
        <span className="text-[10px] text-muted-foreground font-medium">
          Khắc sâu (7-10 ngày)
        </span>
      </button>
    </div>
  );
}
