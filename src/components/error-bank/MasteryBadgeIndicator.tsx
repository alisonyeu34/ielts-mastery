"use client";

import React from "react";
import { CheckCircle2, ShieldAlert, Sparkles, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface MasteryBadgeIndicatorProps {
  mastered: boolean;
  consecutiveSuccesses?: number;
  fsrsStage?: number;
  nextReviewDate?: string;
  className?: string;
}

export function MasteryBadgeIndicator({
  mastered,
  consecutiveSuccesses = 0,
  fsrsStage = 0,
  nextReviewDate,
  className,
}: MasteryBadgeIndicatorProps) {
  if (mastered || fsrsStage >= 4) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold select-none",
          className
        )}
      >
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
        <span>PHẢN XẠ TIỀM THỨC (FSRS PASS)</span>
      </div>
    );
  }

  if (fsrsStage === 3) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-400 font-mono text-[10px] font-bold select-none",
          className
        )}
      >
        <Sparkles className="h-3.5 w-3.5 text-sky-500" />
        <span>FSRS VÒNG 3 (HẸN 21 NGÀY)</span>
      </div>
    );
  }

  if (fsrsStage === 2) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-mono text-[10px] font-bold select-none",
          className
        )}
      >
        <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
        <span>FSRS VÒNG 2 (HẸN 7 NGÀY)</span>
      </div>
    );
  }

  if (fsrsStage === 1 || consecutiveSuccesses === 1) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono text-[10px] font-bold select-none",
          className
        )}
      >
        <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
        <span>FSRS VÒNG 1 (HẸN 3 NGÀY)</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 font-mono text-[10px] font-bold select-none",
        className
      )}
    >
      <ShieldAlert className="h-3.5 w-3.5 text-rose-600" />
      <span>CHƯA LÀM CHỦ (0/3 VÒNG)</span>
    </div>
  );
}
