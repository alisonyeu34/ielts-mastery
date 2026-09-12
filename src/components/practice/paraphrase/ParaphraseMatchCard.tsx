"use client";

import React from "react";
import { Check, Sparkles, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ParaphraseMatchCardProps {
  id: string;
  text: string;
  side: "left" | "right";
  isSelected: boolean;
  isMatched: boolean;
  isMismatch: boolean;
  matchedTechniqueLabel?: string;
  onClick: () => void;
  className?: string;
}

export function ParaphraseMatchCard({
  id,
  text,
  side,
  isSelected,
  isMatched,
  isMismatch,
  matchedTechniqueLabel,
  onClick,
  className,
}: ParaphraseMatchCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isMatched}
      className={cn(
        "relative w-full p-4 rounded-2xl border-2 text-left transition-all duration-200 select-none cursor-pointer flex flex-col justify-between min-h-[85px] shadow-sm",
        // Default
        !isSelected && !isMatched && !isMismatch && "bg-card border-border hover:border-indigo-500/50 hover:bg-secondary/30",
        // Selected
        isSelected && !isMatched && "border-indigo-600 bg-indigo-500/10 shadow-md shadow-indigo-600/20 scale-[1.02]",
        // Matched
        isMatched && "border-emerald-500/40 bg-emerald-500/10 cursor-default opacity-90",
        // Mismatch Shake
        isMismatch && "border-rose-500 bg-rose-500/10 animate-bounce scale-95",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
          {side === "left" ? "Câu hỏi (Question)" : "Bài đọc (Passage)"}
        </span>

        {isMatched && (
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
            <Check className="h-3 w-3" /> Đã Khớp
          </span>
        )}
      </div>

      <p className="text-xs sm:text-sm font-bold text-foreground leading-snug py-1">
        "{text}"
      </p>

      {isMatched && matchedTechniqueLabel && (
        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 block pt-1 border-t border-emerald-500/20">
          🎯 {matchedTechniqueLabel}
        </span>
      )}
    </button>
  );
}
