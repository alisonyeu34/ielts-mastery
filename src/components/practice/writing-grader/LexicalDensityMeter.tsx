"use client";

import React from "react";
import {
  Sparkles,
  BarChart2,
  BookOpen,
  Activity,
  Layers,
} from "lucide-react";
import { calculateLexicalDensity } from "@/lib/writingEvaluationParser";
import { cn } from "@/lib/utils";

interface LexicalDensityMeterProps {
  essayText: string;
  className?: string;
}

export function LexicalDensityMeter({
  essayText,
  className,
}: LexicalDensityMeterProps) {
  const stats = calculateLexicalDensity(essayText);

  const isGoodDensity = stats.lexicalDensityPercentage >= 52;
  const isGoodAwl = stats.awlPercentage >= 8;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 select-none",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-foreground">
              Mật Độ Từ Vựng Học Thuật (Lexical Density)
            </h4>
            <span className="text-[10px] font-mono text-muted-foreground">
              Tỷ lệ Content Words & Academic Word List (AWL)
            </span>
          </div>
        </div>

        <span
          className={cn(
            "text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border",
            isGoodDensity
              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
              : "bg-amber-500/10 text-amber-600 border-amber-500/30"
          )}
        >
          {isGoodDensity ? "Chuẩn C1 (>52%)" : "Cần Nâng Cấp (<52%)"}
        </span>
      </div>

      {/* Progress Bars */}
      <div className="space-y-3 text-xs">
        {/* 1. Lexical Density */}
        <div className="space-y-1">
          <div className="flex items-center justify-between font-mono text-[11px]">
            <span className="text-muted-foreground">Mật độ từ mang nghĩa (Content Words):</span>
            <span className="font-bold text-foreground">
              {stats.lexicalDensityPercentage}% ({stats.contentWordsCount}/{stats.totalWords} từ)
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
            <div
              style={{ width: `${Math.min(100, stats.lexicalDensityPercentage)}%` }}
              className={cn(
                "h-full rounded-full transition-all duration-300",
                isGoodDensity ? "bg-emerald-500" : "bg-amber-500"
              )}
            />
          </div>
        </div>

        {/* 2. AWL Academic Ratio */}
        <div className="space-y-1">
          <div className="flex items-center justify-between font-mono text-[11px]">
            <span className="text-muted-foreground">Tỷ lệ từ vựng học thuật AWL:</span>
            <span className="font-bold text-primary">
              {stats.awlPercentage}% ({stats.awlWordsCount} từ AWL)
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
            <div
              style={{ width: `${Math.min(100, stats.awlPercentage * 5)}%` }}
              className="h-full rounded-full bg-primary transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* 3 Metric Pills */}
      <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-center pt-1 border-t border-border/60">
        <div className="p-2 rounded-xl bg-secondary/30 border border-border">
          <span className="text-muted-foreground block">Tổng số từ</span>
          <strong className="text-foreground text-xs">{stats.totalWords}</strong>
        </div>

        <div className="p-2 rounded-xl bg-secondary/30 border border-border">
          <span className="text-muted-foreground block">Từ không trùng lặp</span>
          <strong className="text-foreground text-xs">{stats.uniqueWords}</strong>
        </div>

        <div className="p-2 rounded-xl bg-secondary/30 border border-border">
          <span className="text-muted-foreground block">Tỷ lệ đa dạng từ</span>
          <strong className="text-foreground text-xs">
            {Math.round((stats.uniqueWords / stats.totalWords) * 100)}%
          </strong>
        </div>
      </div>
    </div>
  );
}
