"use client";

import React from "react";
import {
  Layers,
  Sparkles,
  ArrowRight,
  Lightbulb,
  Send,
  HelpCircle,
} from "lucide-react";
import { SyntaxExerciseItem } from "@/data/mockSyntaxData";
import { ExerciseEvaluation } from "@/hooks/useSyntaxTransformer";
import { cn } from "@/lib/utils";

interface NominalizationDrillProps {
  exercise: SyntaxExerciseItem;
  userInput: string;
  evaluation?: ExerciseEvaluation;
  onInputChange: (val: string) => void;
  onSubmit: (exercise: SyntaxExerciseItem) => void;
  className?: string;
}

export function NominalizationDrill({
  exercise,
  userInput,
  evaluation,
  onInputChange,
  onSubmit,
  className,
}: NominalizationDrillProps) {
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
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 uppercase tracking-wider">
            Nominalization Transformer
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-foreground mt-1">
            {exercise.title}
          </h3>
        </div>
      </div>

      {/* Original Sentence with Weak Parts */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-foreground block">
          1. Câu gốc văn nói cần chuyển đổi (Band 5.5):
        </label>
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border font-serif text-xs sm:text-sm leading-relaxed text-foreground/90">
          "{exercise.level5Sentence}"
        </div>
      </div>

      {/* Suggested Academic Pivot Verbs */}
      {exercise.suggestedPivotVerbs && (
        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-blue-500" />
            <span>2. Động từ liên kết học thuật gợi ý (Academic Pivot Verbs):</span>
          </label>

          <div className="flex flex-wrap gap-1.5">
            {exercise.suggestedPivotVerbs.map((verb, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onInputChange(userInput ? `${userInput} ${verb} ` : `${verb} `)}
                className="px-2.5 py-1 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-mono font-bold hover:bg-blue-500/20 transition-colors cursor-pointer"
                title="Bấm để chèn động từ này vào ô soạn thảo"
              >
                + {verb}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Transformed Input */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-foreground block">
          3. Soạn thảo câu danh từ hóa chuẩn Band 8.0+:
        </label>

        <textarea
          rows={3}
          value={userInput}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Nhập câu viết lại (ví dụ: Rapid rural-to-urban migration precipitates severe traffic congestion in urban centres...)"
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

      {/* C1 Lexical Upgrades Table */}
      <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border/70 space-y-2 text-xs">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
          Nâng cấp từ vựng C1 tương ứng:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {exercise.c1LexicalUpgrades.map((item, idx) => (
            <div key={idx} className="p-2 rounded-xl bg-card border border-border/60 space-x-1.5">
              <span className="text-rose-500 line-through text-[11px]">{item.original}</span>
              <span className="text-muted-foreground">➔</span>
              <strong className="text-emerald-600 dark:text-emerald-400 text-[11px]">
                {item.upgraded}
              </strong>
            </div>
          ))}
        </div>
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
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30 hover:scale-105"
              : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
          )}
        >
          <Send className="h-3.5 w-3.5" />
          <span>Kiểm tra biến đổi Danh từ hóa</span>
        </button>
      </div>
    </div>
  );
}
