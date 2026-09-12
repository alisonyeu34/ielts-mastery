"use client";

import React from "react";
import {
  Award,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import {
  SentenceClinicExercise,
  ModelSolution,
} from "@/data/mockSentenceClinicData";
import { cn } from "@/lib/utils";

interface ModelSentenceComparisonProps {
  exercise: SentenceClinicExercise;
  userSentence: string;
  onNextExercise: () => void;
  isLastExercise: boolean;
  className?: string;
}

export function ModelSentenceComparison({
  exercise,
  userSentence,
  onNextExercise,
  isLastExercise,
  className,
}: ModelSentenceComparisonProps) {
  const getBandBadgeStyle = (band: ModelSolution["band"]) => {
    switch (band) {
      case "Band 8.5+":
        return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
      case "Band 7.5":
        return "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30";
      default:
        return "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30";
    }
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6 select-none animate-in zoom-in-95 duration-200",
        className
      )}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
              Kết Quả Đối Chiếu
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-foreground">
            Đối Chiếu Câu Viết Với Bài Mẫu Khảo Thí Cambridge
          </h3>
        </div>

        <span className="text-[11px] font-mono text-emerald-600 font-bold flex items-center gap-1 self-start sm:self-auto">
          <CheckCircle2 className="h-4 w-4" />
          <span>Đã ghi nhận điểm vào Dexie DB</span>
        </span>
      </div>

      {/* User Submitted Sentence Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-secondary/30 border border-border space-y-2 text-xs">
        <span className="font-bold text-muted-foreground uppercase text-[10px] block">
          Câu Văn Của Bạn Vừa Sửa:
        </span>
        <p className="font-serif italic text-foreground text-sm font-semibold">
          "{userSentence}"
        </p>
      </div>

      {/* Model Solutions List */}
      <div className="space-y-3.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
          Các Phương Án Viết Lại Chuẩn Mực Từ Giám Khảo:
        </span>

        <div className="space-y-3 text-xs">
          {exercise.modelSolutions.map((sol, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-card border border-border/80 space-y-2 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className={cn("text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border", getBandBadgeStyle(sol.band))}>
                  {sol.band} Solution
                </span>
              </div>

              <p className="font-serif font-bold text-foreground text-sm leading-relaxed">
                "{sol.sentence}"
              </p>

              <p className="text-[11px] text-muted-foreground leading-snug">
                💡 {sol.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-border/80 flex justify-end">
        <button
          type="button"
          onClick={onNextExercise}
          className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-md shadow-primary/20 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
        >
          <span>{isLastExercise ? "Xem Tổng Kết Phiên Bắt Bọ" : "Sang Câu Tiếp Theo"}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
