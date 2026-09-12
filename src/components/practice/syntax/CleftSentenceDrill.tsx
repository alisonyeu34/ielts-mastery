"use client";

import React from "react";
import {
  Sparkles,
  ArrowRight,
  Send,
  HelpCircle,
  Lightbulb,
} from "lucide-react";
import { SyntaxExerciseItem } from "@/data/mockSyntaxData";
import { ExerciseEvaluation } from "@/hooks/useSyntaxTransformer";
import { cn } from "@/lib/utils";

interface CleftSentenceDrillProps {
  exercise: SyntaxExerciseItem;
  userInput: string;
  evaluation?: ExerciseEvaluation;
  onInputChange: (val: string) => void;
  onSubmit: (exercise: SyntaxExerciseItem) => void;
  className?: string;
}

export function CleftSentenceDrill({
  exercise,
  userInput,
  evaluation,
  onInputChange,
  onSubmit,
  className,
}: CleftSentenceDrillProps) {
  const isSubmitted = !!evaluation?.isSubmitted;

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
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
            Cleft Sentence Builder
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-foreground mt-1">
            {exercise.title}
          </h3>
        </div>
      </div>

      {/* Original Sentence */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-foreground block">
          1. Câu thông thường cần chẻ để nhấn mạnh (Band 5.5):
        </label>
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border font-serif text-xs sm:text-sm leading-relaxed text-foreground/90">
          "{exercise.level5Sentence}"
        </div>
      </div>

      {/* Cleft Formula Box */}
      <div className="p-4 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-1.5 text-xs">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
          Cấu Trúc Câu Chẻ Áp Dụng:
        </span>
        <p className="font-mono text-xs text-foreground font-semibold">
          <code>{exercise.grammarRule}</code>
        </p>
      </div>

      {/* Transformed Input */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-foreground block">
          2. Soạn thảo câu chẻ chuẩn Band 8.0+:
        </label>

        <textarea
          rows={3}
          value={userInput}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Nhập câu chẻ (ví dụ: It is excessive industrial wastewater discharge that causes irreparable damage to local river ecosystems...)"
          className={cn(
            "w-full rounded-2xl border p-3.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 font-serif leading-relaxed transition-colors",
            isSubmitted
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
              ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30 hover:scale-105"
              : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
          )}
        >
          <Send className="h-3.5 w-3.5" />
          <span>Kiểm tra biến đổi Câu Chẻ</span>
        </button>
      </div>
    </div>
  );
}
