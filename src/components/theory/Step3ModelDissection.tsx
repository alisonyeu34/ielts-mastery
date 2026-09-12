"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Award,
  Layers,
  CheckCircle2,
  ArrowLeft,
  ArrowDown,
  Info,
} from "lucide-react";
import {
  InteractiveTheoryLesson,
  TheoryAnnotation,
} from "@/data/mockTheoryLessons";
import { cn } from "@/lib/utils";

interface Step3ModelDissectionProps {
  lesson: InteractiveTheoryLesson;
  selectedAnnotation: TheoryAnnotation | null;
  onSelectAnnotation: (ann: TheoryAnnotation) => void;
  onPrevStep: () => void;
  onScrollToQuiz: () => void;
  className?: string;
}

export function Step3ModelDissection({
  lesson,
  selectedAnnotation,
  onSelectAnnotation,
  onPrevStep,
  onScrollToQuiz,
  className,
}: Step3ModelDissectionProps) {
  const { step3 } = lesson;

  const getCriteriaColor = (criteria: TheoryAnnotation["criteria"]) => {
    switch (criteria) {
      case "TR":
        return "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30";
      case "CC":
        return "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30";
      case "LR":
        return "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30";
      case "GRA":
        return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
      default:
        return "bg-secondary text-foreground border-border";
    }
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-7 select-none animate-in fade-in duration-200",
        className
      )}
    >
      {/* Header */}
      <div className="border-b border-border/70 pb-4 space-y-1">
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
          Bước 3 / 3 • Mổ Xẻ Bài Mẫu Band 8.5+
        </span>
        <h3 className="text-lg sm:text-xl font-black text-foreground">
          Giải Phẫu Văn Bản Mẫu & Chú Thích Tương Tác
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Bấm vào các đoạn văn bản được highlight để xem phân tích chi tiết tiêu chí chấm thi Cambridge (TR, CC, LR, GRA).
        </p>
      </div>

      {/* Model Prompt */}
      <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border text-xs space-y-1">
        <span className="font-bold text-muted-foreground uppercase tracking-wider text-[10px] block">
          Đề Bài Khảo Thí (Prompt):
        </span>
        <p className="font-serif italic text-foreground font-semibold">
          "{step3.modelPrompt}"
        </p>
      </div>

      {/* Model Text Container */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Award className="h-4 w-4 text-emerald-600" />
            <span>{step3.modelBand}</span>
          </span>
          <span className="text-[10px] text-muted-foreground font-mono">
            Bấm từng câu để xem chú thích
          </span>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-secondary/20 border border-border text-xs sm:text-sm font-serif leading-relaxed text-foreground/90 space-y-4">
          <p>{step3.modelParagraph}</p>
        </div>
      </div>

      {/* Interactive Annotations Breakdown Grid */}
      <div className="space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
          Các Thành Tố Kỹ Thuật Đạt Chuẩn Band 8.5+:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {step3.annotations.map((ann) => {
            const isSelected = selectedAnnotation?.id === ann.id;

            return (
              <div
                key={ann.id}
                onClick={() => onSelectAnnotation(ann)}
                className={cn(
                  "p-4 rounded-2xl border transition-all cursor-pointer space-y-2",
                  isSelected
                    ? "bg-card border-primary ring-2 ring-primary/20 shadow-sm"
                    : "bg-secondary/20 border-border/70 hover:border-border hover:bg-secondary/40"
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border",
                      getCriteriaColor(ann.criteria)
                    )}
                  >
                    {ann.criteria}: {ann.criteriaLabel}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold">
                    {ann.bandImpact}
                  </span>
                </div>

                <p className="font-serif italic text-[11px] text-foreground/80 line-clamp-2">
                  "{ann.phrase}"
                </p>

                <p className="text-[11px] text-muted-foreground leading-snug">
                  {ann.explanation}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="pt-2 border-t border-border/80 flex items-center justify-between">
        <button
          type="button"
          onClick={onPrevStep}
          className="px-4 py-2 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Về Bước 2</span>
        </button>

        <button
          type="button"
          onClick={onScrollToQuiz}
          className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
        >
          <span>Làm Trắc Nghiệm Mở Khóa Thực Hành</span>
          <ArrowDown className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
