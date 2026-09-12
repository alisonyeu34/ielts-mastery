"use client";

import React from "react";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  Sparkles,
  ArrowRight,
  RotateCcw,
  ShieldAlert,
} from "lucide-react";
import { WordDiffResult } from "@/lib/textDiffEngine";
import { cn } from "@/lib/utils";

interface DictationDiffViewerProps {
  diffResult: WordDiffResult;
  targetTranscript: string;
  onRetry: () => void;
  onNext: () => void;
  className?: string;
}

export function DictationDiffViewer({
  diffResult,
  targetTranscript,
  onRetry,
  onNext,
  className,
}: DictationDiffViewerProps) {
  const isPerfect = diffResult.accuracyPercentage === 100;
  const isGood = diffResult.accuracyPercentage >= 75 && !isPerfect;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6 select-none animate-in zoom-in-95 duration-200",
        className
      )}
    >
      {/* Top Header & Accuracy Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider",
                isPerfect
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                  : isGood
                  ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30"
                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
              )}
            >
              {isPerfect ? "Hoàn Hảo 100% • Tai Nghe C1" : isGood ? "Khá Tốt • Band 6.0-6.5" : "Cần Luyện Lại Nối Âm"}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-foreground">
            Bản Mổ Xẻ So Khớp Chuỗi Ký Tự Âm Học
          </h3>
        </div>

        {/* Score Box */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div
            className={cn(
              "px-5 py-2 rounded-2xl border-2 flex items-center gap-2.5 shadow-sm",
              isPerfect
                ? "bg-emerald-500/10 border-emerald-500/60 text-emerald-600"
                : "bg-primary/10 border-primary/60 text-primary"
            )}
          >
            <Award className="h-5 w-5" />
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider block leading-none">
                ĐỘ CHÍNH XÁC
              </span>
              <span className="text-xl sm:text-2xl font-black font-mono">
                {diffResult.accuracyPercentage}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Visual Word-by-Word Diff Box */}
      <div className="space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
          So Khớp Trực Quan Từng Từ:
        </span>

        <div className="p-5 sm:p-6 rounded-2xl bg-secondary/20 border border-border flex flex-wrap items-center gap-2 min-h-[90px]">
          {diffResult.tokens.map((token, idx) => {
            if (token.status === "correct") {
              return (
                <span
                  key={idx}
                  className="px-2.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-800 dark:text-emerald-200 font-serif font-bold text-sm shadow-2xs flex items-center gap-1"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>{token.targetWord}</span>
                </span>
              );
            }

            if (token.status === "incorrect") {
              return (
                <span
                  key={idx}
                  className="px-2.5 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-800 dark:text-rose-200 font-serif text-sm shadow-2xs space-y-0.5 inline-block"
                >
                  <span className="line-through text-rose-500 block text-xs">
                    {token.userWord}
                  </span>
                  <span className="font-bold block text-foreground">
                    ✓ {token.targetWord}
                  </span>
                </span>
              );
            }

            if (token.status === "missing") {
              return (
                <span
                  key={idx}
                  className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/40 border-dashed text-amber-800 dark:text-amber-200 font-serif font-bold text-sm shadow-2xs"
                  title={token.phonemicWarning || "Bỏ sót từ"}
                >
                  + {token.targetWord} (bỏ sót)
                </span>
              );
            }

            return (
              <span
                key={idx}
                className="px-2.5 py-1.5 rounded-xl bg-muted/60 border border-border text-muted-foreground font-serif text-xs line-through"
              >
                {token.userWord} (thừa)
              </span>
            );
          })}
        </div>
      </div>

      {/* 2. Detected Errors Breakdown List */}
      {diffResult.detectedErrors.length > 0 && (
        <div className="p-4 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 text-xs space-y-2">
          <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1 text-[11px] uppercase tracking-wider">
            <ShieldAlert className="h-3.5 w-3.5" /> Điểm Lỗi Âm Học Được Hệ Thống Ghi Nhận:
          </span>

          <ul className="space-y-1.5 text-muted-foreground font-mono text-[11px]">
            {diffResult.detectedErrors.map((err, idx) => (
              <li key={idx} className="p-2 rounded-xl bg-card border border-border flex items-start gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-white font-bold text-[9px] shrink-0 mt-0.5">
                  !
                </span>
                <span>{err.message}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Full Transcript Box */}
      <div className="p-3.5 rounded-xl bg-secondary/30 border border-border text-xs space-y-1">
        <span className="text-[10px] font-bold text-muted-foreground uppercase block">
          Transcript Chuẩn Khảo Thí:
        </span>
        <p className="font-serif italic font-bold text-foreground text-sm">
          "{targetTranscript}"
        </p>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-border/80 flex items-center justify-between">
        <button
          type="button"
          onClick={onRetry}
          className="px-4 py-2 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Gõ Lại Câu Này</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs shadow-md shadow-primary/20 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
        >
          <span>Sang Câu Tiếp Theo</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
