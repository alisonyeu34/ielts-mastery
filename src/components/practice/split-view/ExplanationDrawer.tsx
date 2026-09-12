"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  BookOpen,
  ArrowUpRight,
  ShieldAlert,
  Info,
} from "lucide-react";
import { ReadingQuestion } from "@/data/mockReadingPassage";
import { cn } from "@/lib/utils";

interface ExplanationDrawerProps {
  question: ReadingQuestion;
  isOpen: boolean;
  onToggle: () => void;
  onScrollToEvidence?: (paragraphId: string) => void;
  className?: string;
}

export function ExplanationDrawer({
  question,
  isOpen,
  onToggle,
  onScrollToEvidence,
  className,
}: ExplanationDrawerProps) {
  return (
    <div className={cn("rounded-2xl border border-border/80 bg-card overflow-hidden shadow-sm transition-all", className)}>
      {/* Drawer Toggle Bar */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 sm:p-3.5 bg-secondary/30 hover:bg-secondary/60 text-xs font-bold text-foreground transition-colors text-left cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <span>Mổ Xẻ Đáp Án & Dẫn Chứng Khảo Thí (Câu {question.order})</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground text-[11px]">
          <span>{isOpen ? "Thu gọn" : "Xem chi tiết"}</span>
          {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </div>
      </button>

      {/* Expanded Content */}
      {isOpen && (
        <div className="p-4 sm:p-5 space-y-4 border-t border-border/80 text-xs bg-card animate-in slide-in-from-top-2 duration-200">
          {/* Correct answer & Trap badge */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span className="font-bold text-foreground">
                Đáp án chuẩn: <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold">{question.correctAnswer}</strong>
              </span>
            </div>

            {question.trapType && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                Bẫy: {question.trapType}
              </span>
            )}
          </div>

          {/* Evidence quote in passage with Jump Button */}
          <div className="p-3.5 rounded-xl bg-indigo-500/[0.05] border border-indigo-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                <BookOpen className="h-3 w-3" /> Dẫn Chứng Đoạn Văn:
              </span>

              {onScrollToEvidence && (
                <button
                  type="button"
                  onClick={() => onScrollToEvidence(question.evidenceParagraphId)}
                  className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Cuộn tới câu dẫn chứng</span>
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              )}
            </div>

            <p className="text-foreground/90 font-medium italic leading-relaxed">
              "{question.evidenceQuote}"
            </p>
          </div>

          {/* Deep explanation */}
          <div className="space-y-1 text-muted-foreground leading-relaxed">
            <span className="font-bold text-foreground block">
              💡 Phân tích kỹ thuật làm bài:
            </span>
            <p>{question.deepExplanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
