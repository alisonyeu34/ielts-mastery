"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  XCircle,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DeepExplanationAccordionProps {
  userWrongAnswer: string;
  correctAnswer: string;
  deepExplanation: string;
  initiallyOpen?: boolean;
  className?: string;
}

export function DeepExplanationAccordion({
  userWrongAnswer,
  correctAnswer,
  deepExplanation,
  initiallyOpen = false,
  className,
}: DeepExplanationAccordionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(initiallyOpen);

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card overflow-hidden transition-all select-none",
        className
      )}
    >
      {/* Header Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        className="w-full p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors text-left cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          <span className="font-bold text-xs sm:text-sm text-foreground">
            Mổ Xẻ Nguyên Nhân Tư Duy & Bẫy Khảo Thí Cambridge
          </span>
        </div>

        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isOpen ? "rotate-180" : ""
          )}
        />
      </button>

      {/* Expanded Dissection Body */}
      {isOpen && (
        <div className="p-4 sm:p-5 border-t border-border/80 bg-secondary/[0.15] space-y-4 text-xs animate-in fade-in duration-200">
          {/* Comparison Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Wrong Answer */}
            <div className="p-3.5 rounded-xl bg-rose-500/[0.06] border border-rose-500/20 space-y-1">
              <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold text-[11px]">
                <XCircle className="h-3.5 w-3.5 shrink-0" />
                <span>Đáp án sai của bạn:</span>
              </div>
              <p className="font-serif font-bold text-foreground text-xs line-through opacity-80 pl-5">
                "{userWrongAnswer}"
              </p>
            </div>

            {/* Correct Answer */}
            <div className="p-3.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                <span>Đáp án chuẩn Cambridge:</span>
              </div>
              <p className="font-serif font-black text-emerald-700 dark:text-emerald-300 text-xs pl-5">
                "{correctAnswer}"
              </p>
            </div>
          </div>

          {/* Deep Explanation */}
          <div className="p-4 rounded-xl bg-card border border-border space-y-2">
            <span className="font-mono font-bold text-[10px] text-primary uppercase tracking-wider block">
              💡 Phân Tích Cơ Chế Bẫy & Điểm Mù:
            </span>
            <p className="text-muted-foreground leading-relaxed text-xs font-serif">
              {deepExplanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
