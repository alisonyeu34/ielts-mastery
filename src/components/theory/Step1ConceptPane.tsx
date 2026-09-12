"use client";

import React from "react";
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight,
} from "lucide-react";
import { InteractiveTheoryLesson } from "@/data/mockTheoryLessons";
import { cn } from "@/lib/utils";

interface Step1ConceptPaneProps {
  lesson: InteractiveTheoryLesson;
  onNextStep: () => void;
  className?: string;
}

export function Step1ConceptPane({
  lesson,
  onNextStep,
  className,
}: Step1ConceptPaneProps) {
  const { step1 } = lesson;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-7 select-none animate-in fade-in duration-200",
        className
      )}
    >
      {/* Header */}
      <div className="border-b border-border/70 pb-4 space-y-1">
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 uppercase tracking-wider">
          Bước 1 / 3 • Bản Chất & Khái Niệm Cốt Lõi
        </span>
        <h3 className="text-lg sm:text-xl font-black text-foreground">
          Bản Chất Ngôn Ngữ & Tiêu Chí Chấm Cambridge
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Hiểu sâu nguyên lý gốc rễ để không học vẹt công thức và áp dụng linh hoạt trong phòng thi.
        </p>
      </div>

      {/* Core Concept Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-blue-500/[0.04] border border-blue-500/20 space-y-2">
        <div className="flex items-center gap-2 font-bold text-xs text-blue-600 dark:text-blue-400">
          <BookOpen className="h-4 w-4" />
          <span>Tóm Tắt Khái Niệm Cốt Lõi:</span>
        </div>
        <p className="text-xs sm:text-sm text-foreground/90 font-serif leading-relaxed">
          {step1.coreConceptSummary}
        </p>
      </div>

      {/* First Principle Explanation */}
      <div className="space-y-2 text-xs sm:text-sm">
        <h4 className="font-bold text-foreground flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          <Layers className="h-3.5 w-3.5" /> Giải Mã Nguyên Lý Đầu Tiên (First Principles)
        </h4>
        <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm bg-secondary/30 p-4 rounded-2xl border border-border">
          {step1.firstPrincipleExplanation}
        </p>
      </div>

      {/* Comparison Table: Band 5.5 vs Band 8.5 */}
      <div className="space-y-3">
        <h4 className="font-bold text-foreground flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          <span>Đối Chiếu Tư Duy: Band 5.5 vs Band 8.5+</span>
        </h4>

        <div className="rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-secondary/60 border-b border-border text-[11px] font-bold">
                <th className="p-3 w-1/4">Khía cạnh</th>
                <th className="p-3 w-3/8 text-rose-600 dark:text-rose-400">Tư duy Band 5.0 - 5.5</th>
                <th className="p-3 w-3/8 text-emerald-600 dark:text-emerald-400">Tư duy Chuẩn Band 8.0+</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {step1.comparisonTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-secondary/20 transition-colors">
                  <td className="p-3 font-semibold text-foreground text-[11px]">{row.aspect}</td>
                  <td className="p-3 text-muted-foreground bg-rose-500/[0.02]">{row.band55Approach}</td>
                  <td className="p-3 text-foreground font-medium bg-emerald-500/[0.02]">{row.band85Approach}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3 Golden Rules */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 space-y-2 text-xs">
        <span className="font-bold text-amber-600 dark:text-amber-400 block">
          💡 3 Nguyên Tắc Vàng Cần Khắc Cốt Ghi Tâm:
        </span>
        <ul className="space-y-1.5 list-disc pl-5 text-muted-foreground leading-relaxed">
          {step1.goldenRules.map((rule, idx) => (
            <li key={idx}>
              <strong className="text-foreground">{rule}</strong>
            </li>
          ))}
        </ul>
      </div>

      {/* Next Step Trigger */}
      <div className="pt-2 border-t border-border/80 flex justify-end">
        <button
          type="button"
          onClick={onNextStep}
          className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md shadow-primary/20 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
        >
          <span>Tiếp tục: Bước 2 - Vạch Trần Bẫy Khảo Thí</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
