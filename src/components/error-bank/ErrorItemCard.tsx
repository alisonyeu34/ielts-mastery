"use client";

import React from "react";
import {
  RotateCcw,
  CheckCircle2,
  Trash2,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { ErrorItem } from "@/types/database";
import { ERROR_CATEGORY_METADATA } from "@/lib/errorBankHelpers";
import { MasteryBadgeIndicator } from "./MasteryBadgeIndicator";
import { DeepExplanationAccordion } from "./DeepExplanationAccordion";
import { cn } from "@/lib/utils";

interface ErrorItemCardProps {
  error: ErrorItem;
  onQuickDrill: (error: ErrorItem) => void;
  onMarkMastered: (errorId: string) => void;
  onDelete: (errorId: string) => void;
  className?: string;
}

export function ErrorItemCard({
  error,
  onQuickDrill,
  onMarkMastered,
  onDelete,
  className,
}: ErrorItemCardProps) {
  const categoryMeta =
    ERROR_CATEGORY_METADATA[error.errorType] || ERROR_CATEGORY_METADATA.grammar;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 hover:border-primary/40 transition-colors select-none",
        className
      )}
    >
      {/* Top Meta Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={cn(
              "text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider",
              categoryMeta.badgeColor
            )}
          >
            {categoryMeta.label}
          </span>

          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border uppercase">
            {error.sourceModule.toUpperCase()}
          </span>

          <span className="text-[10px] font-mono text-muted-foreground">
            Lần sai: {error.retryCount}
          </span>
        </div>

        <MasteryBadgeIndicator
          mastered={error.mastered}
          consecutiveSuccesses={error.consecutiveSuccesses}
          fsrsStage={error.fsrsStage}
          nextReviewDate={error.nextReviewDate}
        />
      </div>

      {/* Question Context Snippet */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
          Bối Cảnh & Câu Hỏi:
        </span>
        <p className="text-xs sm:text-sm font-serif leading-relaxed text-foreground/90 bg-secondary/30 p-3.5 rounded-2xl border border-border/80">
          "{error.questionContext}"
        </p>
      </div>

      {/* Deep Explanation Accordion */}
      <DeepExplanationAccordion
        userWrongAnswer={error.userWrongAnswer}
        correctAnswer={error.correctAnswer}
        deepExplanation={error.deepExplanation}
      />

      {/* Action Footer */}
      <div className="pt-2 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          {!error.mastered && (
            <button
              type="button"
              onClick={() => onMarkMastered(error.id)}
              className="px-3 py-1.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Đánh dấu Đã Thuần Thục</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onDelete(error.id)}
            className="p-1.5 rounded-xl border border-border bg-card hover:bg-rose-500/10 hover:border-rose-500/30 text-muted-foreground hover:text-rose-600 transition-colors cursor-pointer"
            title="Xóa lỗi này khỏi ngân hàng"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => onQuickDrill(error)}
          className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Luyện Lại Câu Này</span>
        </button>
      </div>
    </div>
  );
}
