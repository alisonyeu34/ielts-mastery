"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, Layers, Award } from "lucide-react";
import { SyntaxExerciseItem } from "@/data/mockSyntaxData";
import { ExerciseEvaluation } from "@/hooks/useSyntaxTransformer";
import { cn } from "@/lib/utils";

interface SyntaxProgressStatsProps {
  exercises: SyntaxExerciseItem[];
  currentIndex: number;
  evaluations: Record<string, ExerciseEvaluation>;
  accuracyRate: number;
  onSelectIndex: (idx: number) => void;
  className?: string;
}

export function SyntaxProgressStats({
  exercises,
  currentIndex,
  evaluations,
  accuracyRate,
  onSelectIndex,
  className,
}: SyntaxProgressStatsProps) {
  const completedCount = exercises.filter((ex) => evaluations[ex.id]?.isSubmitted).length;
  const progressPercent = Math.round((completedCount / exercises.length) * 100);

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-sm space-y-3.5 select-none",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-indigo-500" />
          <span className="text-xs font-bold text-foreground">
            Tiến độ luyện tập chuyên đề ({completedCount}/{exercises.length} câu)
          </span>
        </div>

        <span className="text-xs font-mono font-bold text-muted-foreground">
          Độ chính xác: <strong className="text-indigo-600 dark:text-indigo-400">{accuracyRate}%</strong>
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
        <div
          style={{ width: `${progressPercent}%` }}
          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
        />
      </div>

      {/* Exercise Navigator Buttons */}
      <div className="flex items-center gap-2 pt-0.5">
        {exercises.map((ex, idx) => {
          const evalState = evaluations[ex.id];
          const isCurrent = currentIndex === idx;

          return (
            <button
              key={ex.id}
              type="button"
              onClick={() => onSelectIndex(idx)}
              className={cn(
                "flex-1 py-2 rounded-xl text-xs font-mono font-bold border transition-all flex items-center justify-center gap-1 cursor-pointer",
                isCurrent
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/30"
                  : evalState?.isSubmitted
                  ? evalState.isCorrect
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                    : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
                  : "bg-secondary/40 text-muted-foreground border-border hover:bg-secondary"
              )}
            >
              <span>Câu {idx + 1}</span>
              {evalState?.isSubmitted && (
                <span className="text-[10px]">
                  {evalState.isCorrect ? "✓" : "✗"}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
