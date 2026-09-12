"use client";

import React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  PieChart,
} from "lucide-react";
import { analyzeFillerWords } from "@/lib/speakingEvaluationParser";
import { cn } from "@/lib/utils";

interface FillerWordMeterProps {
  transcript: string;
  className?: string;
}

export function FillerWordMeter({
  transcript,
  className,
}: FillerWordMeterProps) {
  const analysis = analyzeFillerWords(transcript);
  const isHighFiller = analysis.fillerPercentage > 3.0;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
            <PieChart className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-foreground">
              Mật Độ Từ Đệm Vô Nghĩa (Filler Words)
            </h4>
            <span className="text-[10px] font-mono text-muted-foreground">
              Tần suất lạm dụng um, uh, like, you know
            </span>
          </div>
        </div>

        <span
          className={cn(
            "text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border",
            isHighFiller
              ? "bg-rose-500/10 text-rose-600 border-rose-500/30"
              : "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
          )}
        >
          {isHighFiller ? `Cảnh Báo (${analysis.fillerPercentage}%)` : `Tốt (< 3%)`}
        </span>
      </div>

      {/* Progress Track */}
      <div className="space-y-1.5 text-xs">
        <div className="flex items-center justify-between font-mono text-[11px]">
          <span className="text-muted-foreground">Tỷ lệ từ đệm trên tổng bài nói:</span>
          <span className="font-bold text-foreground">
            {analysis.fillerPercentage}% ({analysis.totalFillers}/{analysis.totalWords} từ)
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
          <div
            style={{ width: `${Math.min(100, analysis.fillerPercentage * 8)}%` }}
            className={cn(
              "h-full rounded-full transition-all duration-300",
              isHighFiller ? "bg-rose-500" : "bg-emerald-500"
            )}
          />
        </div>
      </div>

      {/* Breakdown Pills */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs font-mono pt-1">
        {Object.entries(analysis.counts).map(([word, count]) => (
          <div
            key={word}
            className="p-2 rounded-xl bg-secondary/30 border border-border space-y-0.5"
          >
            <span className="text-[10px] text-muted-foreground block truncate">
              "{word}"
            </span>
            <strong className={cn("text-xs font-black", count > 0 ? "text-rose-600" : "text-foreground")}>
              {count} lần
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}
