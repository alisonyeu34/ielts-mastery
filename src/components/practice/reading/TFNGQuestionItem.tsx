"use client";

import React from "react";
import {
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Pin,
  Sparkles,
  Eye,
  BookOpen,
} from "lucide-react";
import { TFNGQuestion, TFNGAnswer } from "@/data/mockTFNGPassages";
import { cn } from "@/lib/utils";

interface TFNGQuestionItemProps {
  question: TFNGQuestion;
  index: number;
  userAnswer?: TFNGAnswer;
  isSubmitted: boolean;
  onSelectAnswer: (answer: TFNGAnswer) => void;
  onHighlightEvidence: (quote: string, paragraphId: string) => void;
  className?: string;
}

export function TFNGQuestionItem({
  question,
  index,
  userAnswer,
  isSubmitted,
  onSelectAnswer,
  onHighlightEvidence,
  className,
}: TFNGQuestionItemProps) {
  const isCorrect = isSubmitted && userAnswer === question.correctAnswer;
  const isWrong = isSubmitted && userAnswer !== question.correctAnswer;

  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-5 sm:p-6 space-y-4 shadow-sm transition-all",
        !isSubmitted && "border-border",
        isSubmitted && isCorrect && "border-emerald-500/40 bg-emerald-500/[0.02]",
        isSubmitted && isWrong && "border-rose-500/40 bg-rose-500/[0.02]",
        className
      )}
    >
      {/* Header & Statement */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
            Câu {index + 1}
          </span>

          <button
            type="button"
            onClick={() =>
              onHighlightEvidence(
                question.evidenceQuote,
                question.evidenceParagraphId
              )
            }
            className="text-[11px] font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary/50 border border-border/60 hover:bg-secondary transition-colors cursor-pointer"
            title="Bấm để rọi sáng câu dẫn chứng trong bài đọc"
          >
            <Eye className="h-3 w-3 text-indigo-500" />
            <span>Xem đoạn {question.evidenceParagraphId}</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm font-semibold text-foreground leading-relaxed">
          "{question.statement}"
        </p>
      </div>

      {/* 3 Radio Options: TRUE / FALSE / NOT GIVEN */}
      <div className="grid grid-cols-3 gap-2">
        {/* TRUE Option */}
        <button
          type="button"
          onClick={() => onSelectAnswer("TRUE")}
          disabled={isSubmitted}
          className={cn(
            "py-2.5 px-3 rounded-xl font-bold text-xs transition-all border text-center select-none cursor-pointer flex items-center justify-center gap-1.5",
            userAnswer === "TRUE"
              ? "bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/20"
              : "bg-secondary/40 border-border text-foreground hover:bg-secondary"
          )}
        >
          <span>TRUE</span>
        </button>

        {/* FALSE Option */}
        <button
          type="button"
          onClick={() => onSelectAnswer("FALSE")}
          disabled={isSubmitted}
          className={cn(
            "py-2.5 px-3 rounded-xl font-bold text-xs transition-all border text-center select-none cursor-pointer flex items-center justify-center gap-1.5",
            userAnswer === "FALSE"
              ? "bg-rose-600 text-white border-rose-600 shadow-sm shadow-rose-600/20"
              : "bg-secondary/40 border-border text-foreground hover:bg-secondary"
          )}
        >
          <span>FALSE</span>
        </button>

        {/* NOT GIVEN Option */}
        <button
          type="button"
          onClick={() => onSelectAnswer("NOT_GIVEN")}
          disabled={isSubmitted}
          className={cn(
            "py-2.5 px-3 rounded-xl font-bold text-xs transition-all border text-center select-none cursor-pointer flex items-center justify-center gap-1.5",
            userAnswer === "NOT_GIVEN"
              ? "bg-amber-600 text-white border-amber-600 shadow-sm shadow-amber-600/20"
              : "bg-secondary/40 border-border text-foreground hover:bg-secondary"
          )}
        >
          <span>NOT GIVEN</span>
        </button>
      </div>

      {/* Submission Feedback */}
      {isSubmitted && (
        <div className="space-y-3 pt-2 border-t border-border/60 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Chính xác! Đáp án đúng là {question.correctAnswer}
                </span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0" />
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                  Chưa chính xác! Bạn chọn {userAnswer || "(chưa chọn)"} ➔ Đáp án đúng là {question.correctAnswer}
                </span>
              </>
            )}
          </div>

          {/* Trap badge & explanation */}
          <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/80 space-y-1.5 text-xs">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 block text-[11px]">
              🎯 {question.trapTitleVi}
            </span>
            <p className="text-muted-foreground leading-relaxed text-[11px]">
              {question.explanationMarkdown}
            </p>

            <div className="pt-1 text-[11px] text-muted-foreground font-serif italic border-t border-border/40">
              📌 <strong>Dẫn chứng đoạn {question.evidenceParagraphId}:</strong> "{question.evidenceQuote}"
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
