"use client";

import React, { useMemo } from "react";
import {
  ArrowUpDown,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Send,
  ShieldAlert,
} from "lucide-react";
import { SyntaxExerciseItem } from "@/data/mockSyntaxData";
import { ExerciseEvaluation } from "@/hooks/useSyntaxTransformer";
import { cn } from "@/lib/utils";

interface InversionDrillProps {
  exercise: SyntaxExerciseItem;
  userInput: string;
  evaluation?: ExerciseEvaluation;
  onInputChange: (val: string) => void;
  onSubmit: (exercise: SyntaxExerciseItem) => void;
  className?: string;
}

export function InversionDrill({
  exercise,
  userInput,
  evaluation,
  onInputChange,
  onSubmit,
  className,
}: InversionDrillProps) {
  const isSubmitted = !!evaluation?.isSubmitted;

  // Real-time word order mistake check
  const liveError = useMemo(() => {
    if (!exercise.commonMistakeRegex || userInput.length < 15) return null;
    const regex = new RegExp(exercise.commonMistakeRegex, "i");
    if (regex.test(userInput)) {
      return exercise.commonMistakeExplanation;
    }
    return null;
  }, [userInput, exercise]);

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 uppercase tracking-wider">
            Inversion Word-Order Engine
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-foreground mt-1">
            {exercise.title}
          </h3>
        </div>
      </div>

      {/* Original Sentence */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-foreground block">
          1. Câu thông thường cần đảo ngữ (Band 5.5):
        </label>
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border font-serif text-xs sm:text-sm leading-relaxed text-foreground/90">
          "{exercise.level5Sentence}"
        </div>
      </div>

      {/* Color-Coded Word Order Diagram */}
      <div className="p-4 rounded-2xl bg-purple-500/[0.04] border border-purple-500/20 space-y-2 text-xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block">
          Trật Tự Từ Đảo Ngữ Bắt Buộc:
        </span>

        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
          <span className="px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold border border-rose-500/30">
            [Trạng từ phủ định / Were / Had]
          </span>
          <span className="text-muted-foreground">+</span>
          <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-700 dark:text-purple-300 font-bold border border-purple-500/30">
            [Trợ động từ / Modal (did/should/were)]
          </span>
          <span className="text-muted-foreground">+</span>
          <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-700 dark:text-blue-300 font-bold border border-blue-500/30">
            [Chủ ngữ (Subject)]
          </span>
          <span className="text-muted-foreground">+</span>
          <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/30">
            [Động từ chính (V-inf/V3)]
          </span>
        </div>
      </div>

      {/* Live Warning if Word Order is wrong */}
      {liveError && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2 animate-pulse">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <span className="leading-snug">{liveError}</span>
        </div>
      )}

      {/* Transformed Input */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-foreground block">
          2. Soạn thảo câu đảo ngữ chuẩn Band 8.0+:
        </label>

        <textarea
          rows={3}
          value={userInput}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Nhập câu đảo ngữ (ví dụ: Not only did the new carbon tax policy fail to reduce emissions, but it also imposed severe financial burdens...)"
          className={cn(
            "w-full rounded-2xl border p-3.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 font-serif leading-relaxed transition-colors",
            liveError
              ? "border-rose-500/60 bg-rose-500/[0.03] focus:ring-rose-500/30"
              : isSubmitted
              ? evaluation?.isCorrect
                ? "border-emerald-500/60 bg-emerald-500/[0.03] focus:ring-emerald-500/30"
                : "border-rose-500/60 bg-rose-500/[0.03] focus:ring-rose-500/30"
              : "border-border bg-secondary/20 focus:ring-primary/40"
          )}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-1">
        <button
          type="button"
          onClick={() => onSubmit(exercise)}
          disabled={userInput.trim().length < 15}
          className={cn(
            "px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer",
            userInput.trim().length >= 15
              ? "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/30 hover:scale-105"
              : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
          )}
        >
          <Send className="h-3.5 w-3.5" />
          <span>Kiểm tra biến đổi Đảo ngữ</span>
        </button>
      </div>
    </div>
  );
}
