"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Search,
  Bug,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { SentenceClinicExercise } from "@/data/mockSentenceClinicData";
import { cn } from "@/lib/utils";

interface BugHunterSentenceViewerProps {
  exercise: SentenceClinicExercise;
  selectedTokenIndices: number[];
  isBugLocated: boolean;
  wrongAttempts: number;
  onTokenClick: (tokenIndex: number) => void;
  onOpenCheatSheet: () => void;
  className?: string;
}

export function BugHunterSentenceViewer({
  exercise,
  selectedTokenIndices,
  isBugLocated,
  wrongAttempts,
  onTokenClick,
  onOpenCheatSheet,
  className,
}: BugHunterSentenceViewerProps) {
  const [shakingTokenIndex, setShakingTokenIndex] = useState<number | null>(null);

  const handleTokenClick = (idx: number) => {
    if (isBugLocated) return;

    if (!exercise.bugTokenIndices.includes(idx)) {
      setShakingTokenIndex(idx);
      setTimeout(() => setShakingTokenIndex(null), 600);
    }
    onTokenClick(idx);
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
              {exercise.contextType} • {exercise.topic}
            </span>
            <span className="text-xs font-bold text-muted-foreground">
              Bước 1: Săn Bọ Cú Pháp
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-foreground">
            {isBugLocated ? "🎯 Đã Bắt Được Bọ Ngữ Pháp!" : "🔍 Click Trực Tiếp Vào Từ/Vùng Chứa Lỗi Sai"}
          </h3>
        </div>

        {/* Cheat Sheet & Attempts Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {wrongAttempts > 0 && !isBugLocated && (
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-rose-500/10 text-rose-600 border border-rose-500/20 font-mono flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              <span>{wrongAttempts} lần click sai</span>
            </span>
          )}

          <button
            type="button"
            onClick={onOpenCheatSheet}
            className="px-3.5 py-1.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            <span>Xem Cẩm Nang 5 Lỗi</span>
          </button>
        </div>
      </div>

      {/* Main Clickable Sentence Tokens Container */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Câu văn học thuật chứa lỗi sai tiềm ẩn:</span>
          {isBugLocated && (
            <span className="text-amber-600 font-bold flex items-center gap-1">
              <Bug className="h-3.5 w-3.5" />
              <span>Bug Highlighted</span>
            </span>
          )}
        </div>

        <div className="p-6 rounded-2xl bg-secondary/20 border border-border text-base sm:text-lg font-serif leading-relaxed text-foreground flex flex-wrap items-center gap-1.5 min-h-[110px]">
          {exercise.tokens.map((token, idx) => {
            const isSelected = selectedTokenIndices.includes(idx);
            const isShaking = shakingTokenIndex === idx;
            const isActualBug = exercise.bugTokenIndices.includes(idx);

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleTokenClick(idx)}
                disabled={isBugLocated}
                className={cn(
                  "inline-block rounded-xl px-2 py-1 transition-all border font-serif cursor-pointer",
                  isBugLocated && isActualBug
                    ? "bg-amber-500/25 border-amber-500 text-amber-900 dark:text-amber-200 font-black ring-2 ring-amber-500/30 shadow-xs"
                    : isSelected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border/60 hover:border-primary hover:bg-secondary/40 text-foreground",
                  isShaking ? "animate-bounce bg-rose-500/20 border-rose-500 text-rose-600" : ""
                )}
              >
                <span>{token}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hint Alert if failed attempt */}
      {wrongAttempts >= 1 && !isBugLocated && (
        <div className="p-3.5 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 text-xs text-muted-foreground space-y-1 animate-in fade-in duration-200">
          <div className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Gợi Ý Chẩn Đoán:</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            {exercise.hint}
          </p>
        </div>
      )}
    </div>
  );
}
