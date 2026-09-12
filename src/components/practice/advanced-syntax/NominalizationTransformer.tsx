"use client";

import React from "react";
import { SyntaxExerciseItem } from "@/data/mockAdvancedSyntaxData";
import { SyntaxValidationResult } from "@/lib/syntaxTransformerValidator";
import {
  Wand2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Send,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NominalizationTransformerProps {
  exercise: SyntaxExerciseItem;
  exerciseIndex: number;
  totalExercises: number;
  userAnswer: string;
  result: SyntaxValidationResult | null;
  onUpdateAnswer: (text: string) => void;
  onCheckAnswer: () => void;
  onFillModel: () => void;
  onNext: () => void;
  onPrev: () => void;
  className?: string;
}

export function NominalizationTransformer({
  exercise,
  exerciseIndex,
  totalExercises,
  userAnswer,
  result,
  onUpdateAnswer,
  onCheckAnswer,
  onFillModel,
  onNext,
  onPrev,
  className,
}: NominalizationTransformerProps) {
  const handleAddToken = (tok: string) => {
    onUpdateAnswer(userAnswer ? `${userAnswer} ${tok}` : tok);
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 uppercase">
            Bài {exerciseIndex + 1} / {totalExercises} • {exercise.subTypeLabelVi}
          </span>
          <h3 className="text-sm sm:text-base font-black text-foreground pt-1">
            {exercise.topicTitleVi}
          </h3>
        </div>

        <button
          type="button"
          onClick={onFillModel}
          className="text-[11px] font-mono text-primary hover:underline font-bold flex items-center gap-1 cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="h-3.5 w-3.5" /> Điền câu mẫu Band 8.5+
        </button>
      </div>

      {/* Original Loose Sentence */}
      <div className="p-4 sm:p-5 rounded-2xl bg-secondary/30 border border-border space-y-2">
        <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold tracking-wider block">
          Câu Gốc (Loose / Spoken Style - Band 5.5 - 6.0):
        </span>
        <p className="text-sm sm:text-base font-serif italic text-foreground leading-relaxed">
          "{exercise.originalSentence}"
        </p>
      </div>

      {/* Target Word Family Helper Pill */}
      {exercise.targetWordFamily && (
        <div className="p-3.5 rounded-2xl bg-blue-500/[0.04] border border-blue-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">
              Họ từ học thuật (Word Family):
            </span>
            <span className="font-mono text-foreground">
              Verb: <strong>{exercise.targetWordFamily.verb}</strong> ➔ Noun:{" "}
              <strong className="text-primary">{exercise.targetWordFamily.noun}</strong>
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground">
            ({exercise.targetWordFamily.meaningVi})
          </span>
        </div>
      )}

      {/* Drag & Quick-Add Token Chips */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-foreground block">
          Các cụm từ danh từ hóa gợi ý (Bấm để chèn nhanh):
        </span>
        <div className="flex flex-wrap gap-2">
          {exercise.dragTokens.map((tok, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAddToken(tok)}
              className="px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-secondary/80 text-foreground font-serif text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <PlusCircle className="h-3.5 w-3.5 text-primary" />
              <span>{tok}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Free-form Input Area */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-foreground flex items-center justify-between">
          <span>Viết lại câu bằng kỹ thuật Danh từ hóa (Syntactic Compression):</span>
          <span className="text-[10px] font-mono text-muted-foreground">
            Mục tiêu: Đạt 85%+ Mật độ cú pháp
          </span>
        </label>
        <textarea
          rows={3}
          value={userAnswer}
          onChange={(e) => onUpdateAnswer(e.target.value)}
          placeholder="Nhập câu nâng cấp của bạn tại đây..."
          className="w-full text-xs sm:text-sm p-3.5 rounded-2xl bg-card border border-border text-foreground font-serif placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Result & Feedback Alert */}
      {result && (
        <div
          className={cn(
            "p-4 rounded-2xl border text-xs space-y-1 animate-in fade-in",
            result.isCorrect
              ? "bg-emerald-500/[0.06] border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
              : "bg-rose-500/[0.06] border-rose-500/30 text-rose-700 dark:text-rose-300"
          )}
        >
          <div className="flex items-center gap-2 font-bold">
            {result.isCorrect ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : (
              <XCircle className="h-4 w-4 text-rose-600" />
            )}
            <span>{result.isCorrect ? "Chính Xác!" : "Chưa Đạt Chuẩn C1/C2:"}</span>
          </div>
          <p className="leading-relaxed pl-6">{result.feedbackVi}</p>
        </div>
      )}

      {/* Actions */}
      <div className="pt-2 border-t border-border/70 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            disabled={exerciseIndex === 0}
            className="px-3.5 py-2 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            Câu Trước
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={exerciseIndex === totalExercises - 1}
            className="px-3.5 py-2 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            Câu Tiếp
          </button>
        </div>

        <button
          type="button"
          onClick={onCheckAnswer}
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
        >
          <Send className="h-4 w-4" />
          <span>Kiểm Tra Cú Pháp</span>
        </button>
      </div>
    </div>
  );
}
