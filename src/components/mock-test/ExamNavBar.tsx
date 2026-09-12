"use client";

import React, { useState } from "react";
import {
  Flag,
  CheckCircle2,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Send,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ExamNavBarProps {
  totalQuestions: number; // 40
  userAnswers: Record<string, string>;
  flaggedQuestionIds: Set<string>;
  activeQuestionIndex: number;
  questionIdPrefix: string; // e.g. "lis_q_" or "read_q_"
  onSelectQuestion: (index: number) => void;
  onToggleFlag: (qId: string) => void;
  onSubmitSection: () => void;
  className?: string;
}

export function ExamNavBar({
  totalQuestions,
  userAnswers,
  flaggedQuestionIds,
  activeQuestionIndex,
  questionIdPrefix,
  onSelectQuestion,
  onToggleFlag,
  onSubmitSection,
  className,
}: ExamNavBarProps) {
  const currentQId = `${questionIdPrefix}${activeQuestionIndex + 1}`;
  const isCurrentFlagged = flaggedQuestionIds.has(currentQId);

  const answeredCount = Object.keys(userAnswers).filter(
    (k) => userAnswers[k]?.trim().length > 0
  ).length;

  return (
    <nav
      aria-label="Exam Question Navigation"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-md p-3 sm:p-4 shadow-xl select-none",
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left Side: Question Grid (Scrollable) */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none max-w-full md:max-w-3xl">
          {Array.from({ length: totalQuestions }).map((_, idx) => {
            const qNum = idx + 1;
            const qId = `${questionIdPrefix}${qNum}`;
            const isAnswered = (userAnswers[qId] || "").trim().length > 0;
            const isFlagged = flaggedQuestionIds.has(qId);
            const isActive = activeQuestionIndex === idx;

            return (
              <button
                key={qNum}
                type="button"
                onClick={() => onSelectQuestion(idx)}
                className={cn(
                  "relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer",
                  isActive
                    ? "ring-2 ring-primary border-primary font-black shadow-xs"
                    : "",
                  isFlagged
                    ? "bg-amber-500/20 border-amber-500 text-amber-700 dark:text-amber-300"
                    : isAnswered
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary/40 text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
                )}
                title={`Câu ${qNum}: ${isFlagged ? "Đã gắn cờ" : isAnswered ? "Đã trả lời" : "Chưa làm"}`}
              >
                <span>{qNum}</span>
                {isFlagged && (
                  <Flag className="absolute -top-1 -right-1 h-3 w-3 fill-amber-500 text-amber-600" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Side: Tools & Submit */}
        <div className="flex items-center justify-between md:justify-end gap-2.5 pt-1 md:pt-0 border-t md:border-t-0 border-border/70">
          {/* Flag Toggle Button */}
          <button
            type="button"
            onClick={() => onToggleFlag(currentQId)}
            className={cn(
              "px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
              isCurrentFlagged
                ? "bg-amber-500 text-white border-amber-500 shadow-xs"
                : "bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground border-border"
            )}
          >
            <Flag className="h-3.5 w-3.5" />
            <span>{isCurrentFlagged ? "Bỏ gắn cờ" : "Gắn cờ xem lại"}</span>
          </button>

          {/* Progress Indicator */}
          <span className="text-[11px] font-mono text-muted-foreground font-bold hidden sm:inline-block">
            {answeredCount}/{totalQuestions} đã làm
          </span>

          {/* Next / Submit Section Button */}
          <button
            type="button"
            onClick={onSubmitSection}
            className="px-5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-md shadow-primary/20 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Nộp phần thi này</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
