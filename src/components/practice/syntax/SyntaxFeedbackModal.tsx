"use client";

import React from "react";
import {
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { SyntaxExerciseItem } from "@/data/mockSyntaxData";
import { ExerciseEvaluation } from "@/hooks/useSyntaxTransformer";
import { cn } from "@/lib/utils";

interface SyntaxFeedbackModalProps {
  isOpen: boolean;
  exercise: SyntaxExerciseItem | null;
  evaluation?: ExerciseEvaluation;
  userText: string;
  onClose: () => void;
  onNext: () => void;
  hasNext: boolean;
}

export function SyntaxFeedbackModal({
  isOpen,
  exercise,
  evaluation,
  userText,
  onClose,
  onNext,
  hasNext,
}: SyntaxFeedbackModalProps) {
  if (!isOpen || !exercise || !evaluation) return null;

  const isCorrect = evaluation.isCorrect;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-3">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-2xl text-white shadow-md font-bold",
                isCorrect ? "bg-emerald-600 shadow-emerald-600/30" : "bg-amber-600 shadow-amber-600/30"
              )}
            >
              {isCorrect ? <CheckCircle2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-foreground">
                {isCorrect ? "Biến Đổi Cú Pháp Thành Công!" : "Phân Tích Cú Pháp Chi Tiết"}
              </h3>
              <span className="text-[11px] text-muted-foreground">
                {exercise.categoryTitleVi} • Điểm: {evaluation.score.toFixed(1)}/9.0
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Feedback message */}
        <div
          className={cn(
            "p-3.5 rounded-2xl border text-xs leading-relaxed",
            isCorrect
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
              : "bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-300"
          )}
        >
          {evaluation.feedbackText}
        </div>

        {/* User text vs Model Band 8+ Targets */}
        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="font-bold text-muted-foreground uppercase text-[10px] block">
              Câu của bạn:
            </span>
            <p className="font-serif italic text-foreground text-xs sm:text-sm">
              "{userText}"
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/30 space-y-2">
            <span className="font-bold text-emerald-600 uppercase text-[10px] block">
              Các phương án biến đổi Band 8.5+ chuẩn khảo thí:
            </span>
            <ul className="space-y-1.5 list-disc pl-5 text-foreground/90 font-serif text-xs leading-relaxed">
              {exercise.targetBand8Sentences.map((target, idx) => (
                <li key={idx}>"{target}"</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Grammar and Stylistics Explanation */}
        <div className="p-4 rounded-2xl bg-secondary/20 border border-border/70 space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            <BookOpen className="h-3.5 w-3.5 text-indigo-500" />
            <span>Mổ xẻ cơ chế ngữ pháp & văn phong:</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {exercise.explanation}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs transition-colors cursor-pointer"
          >
            Đóng & Chỉnh sửa lại
          </button>

          {hasNext && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onNext();
              }}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Chuyển sang câu tiếp theo</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
