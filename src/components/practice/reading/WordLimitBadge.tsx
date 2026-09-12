"use client";

import React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { countWords } from "@/hooks/useCompletionValidator";
import { cn } from "@/lib/utils";

interface WordLimitBadgeProps {
  input: string;
  maxWords: number;
  className?: string;
}

export function WordLimitBadge({
  input,
  maxWords,
  className,
}: WordLimitBadgeProps) {
  const words = countWords(input);
  const isExceeded = words > maxWords;
  const isFilled = words > 0;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border transition-all duration-200 select-none",
        isExceeded
          ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/40 animate-pulse"
          : isFilled
          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
          : "bg-secondary text-muted-foreground border-border",
        className
      )}
    >
      {isExceeded ? (
        <>
          <AlertCircle className="h-3 w-3 text-rose-500 shrink-0" />
          <span>{words}/{maxWords} từ (Vượt giới hạn!)</span>
        </>
      ) : (
        <>
          <span>{words}/{maxWords} từ</span>
        </>
      )}
    </div>
  );
}
