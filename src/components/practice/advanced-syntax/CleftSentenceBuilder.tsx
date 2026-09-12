"use client";

import React from "react";
import { SyntaxExerciseItem } from "@/data/mockAdvancedSyntaxData";
import { SyntaxValidationResult } from "@/lib/syntaxTransformerValidator";
import {
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  Send,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CleftSentenceBuilderProps {
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

export function CleftSentenceBuilder({
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
}: CleftSentenceBuilderProps) {
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
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase">
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

      {/* Original Sentence */}
      <div className="p-4 sm:p-5 rounded-2xl bg-secondary/30 border border-border space-y-2">
        <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold tracking-wider block">
          Câu Gốc (Chưa Có Điểm Nhấn Tiêu Điểm):
        </span>
        <p className="text-sm sm:text-base font-serif italic text-foreground leading-relaxed">
          "{exercise.originalSentence}"
        </p>
      </div>

      {/* Trigger Phrase Helper */}
      {exercise.triggerPhrase && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              Cụm từ mở đầu câu chẻ:
            </span>
            <span className="font-mono font-black text-foreground px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
              "{exercise.triggerPhrase}"
            </span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground hidden sm:inline">
            Tạo trọng âm thông tin (Information Focus)
          </span>
        </div>
      )}

      {/* Drag & Quick-Add Token Chips */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-foreground block">
          Các mảnh ghép câu chẻ gợi ý:
        </span>
        <div className="flex flex-wrap gap-2">
          {exercise.dragTokens.map((tok, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAddToken(tok)}
              className="px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-secondary/80 text-foreground font-serif text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <PlusCircle className="h-3.5 w-3.5 text-emerald-600" />
              <span>{tok}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-foreground flex items-center justify-between">
          <span>Viết lại câu bằng cấu trúc Câu chẻ nhấn mạnh:</span>
          <span className="text-[10px] font-mono text-muted-foreground">
            It-cleft (that/who) hoặc Wh-cleft (is/was)
          </span>
        </label>
        <textarea
          rows={3}
          value={userAnswer}
          onChange={(e) => onUpdateAnswer(e.target.value)}
          placeholder={`Bắt đầu bằng "${exercise.triggerPhrase || 'It is precisely'}..."`}
          className="w-full text-xs sm:text-sm p-3.5 rounded-2xl bg-card border border-border text-foreground font-serif placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {/* Cleft Bug Alert */}
      {result?.hasCleftBug && (
        <div className="p-3.5 rounded-2xl bg-rose-500/[0.08] border border-rose-500/30 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-2 animate-in fade-in">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <span className="leading-snug">{result.feedbackVi}</span>
        </div>
      )}

      {/* Result Alert */}
      {result && !result.hasCleftBug && (
        <div
          className={cn(
            "p-4 rounded-2xl border text-xs space-y-1 animate-in fade-in",
            result.isCorrect
              ? "bg-emerald-500/[0.06] border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
              : "bg-amber-500/[0.06] border-amber-500/30 text-amber-700 dark:text-amber-300"
          )}
        >
          <div className="flex items-center gap-2 font-bold">
            {result.isCorrect ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : (
              <XCircle className="h-4 w-4 text-amber-600" />
            )}
            <span>{result.isCorrect ? "Câu Chẻ Hoàn Hảo!" : "Cần Hoàn Thiện Thêm:"}</span>
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
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
        >
          <Send className="h-4 w-4" />
          <span>Kiểm Tra Câu Chẻ</span>
        </button>
      </div>
    </div>
  );
}
