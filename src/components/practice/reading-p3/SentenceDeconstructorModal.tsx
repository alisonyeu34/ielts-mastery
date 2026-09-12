"use client";

import React from "react";
import {
  X,
  Layers,
  Sparkles,
  ArrowRight,
  BookOpen,
  Search,
  CheckCircle2,
} from "lucide-react";
import { ComplexSentence } from "@/data/mockPassage3Data";
import { cn } from "@/lib/utils";

interface SentenceDeconstructorModalProps {
  isOpen: boolean;
  sentence: ComplexSentence | null;
  onClose: () => void;
}

export function SentenceDeconstructorModal({
  isOpen,
  sentence,
  onClose,
}: SentenceDeconstructorModalProps) {
  if (!isOpen || !sentence) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
              <Search className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-foreground">
                Mổ Xẻ Cú Pháp Câu Phức (Sentence Clause Deconstructor)
              </h3>
              <span className="text-[11px] text-muted-foreground">
                Phân rã câu văn dài thành 3 tầng cấu trúc trong 5 giây
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

        {/* Original Complex Sentence */}
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-1">
          <span className="font-bold text-muted-foreground uppercase text-[10px] block">
            Câu phức gốc trong bài đọc:
          </span>
          <p className="font-serif italic text-foreground text-xs sm:text-sm leading-relaxed">
            "{sentence.fullText}"
          </p>
        </div>

        {/* 3-Layer Structural Decomposition */}
        <div className="space-y-3 text-xs">
          {/* Layer 1: Core Clause */}
          <div className="p-4 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase text-[10px] flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Tầng 1: Mệnh Đề Nòng Cốt (Core Clause S-V-O)</span>
              </span>
              <span className="text-[10px] text-muted-foreground">Xương sống ý nghĩa</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
              <div className="p-2 rounded-xl bg-card border border-emerald-500/20">
                <span className="text-[9px] text-muted-foreground block font-mono">CHỦ NGỮ (SUBJECT)</span>
                <strong className="text-foreground">{sentence.coreSubject}</strong>
              </div>

              <div className="p-2 rounded-xl bg-card border border-emerald-500/20">
                <span className="text-[9px] text-muted-foreground block font-mono">ĐỘNG TỪ (VERB)</span>
                <strong className="text-indigo-600 dark:text-indigo-400">{sentence.coreVerb}</strong>
              </div>

              <div className="p-2 rounded-xl bg-card border border-emerald-500/20">
                <span className="text-[9px] text-muted-foreground block font-mono">TÂN NGỮ (OBJECT)</span>
                <strong className="text-foreground">{sentence.coreObject}</strong>
              </div>
            </div>
          </div>

          {/* Layer 2: Subordinate Clauses */}
          {sentence.subordinateClauses.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-amber-500/[0.05] border border-amber-500/30 space-y-1.5">
              <span className="font-bold text-amber-600 dark:text-amber-400 uppercase text-[10px] block">
                Tầng 2: Mệnh Đề Phụ Trợ (Subordinate / Relative Clauses)
              </span>
              <ul className="space-y-1 list-disc pl-5 text-[11px] text-foreground/90 font-serif">
                {sentence.subordinateClauses.map((clause, cIdx) => (
                  <li key={cIdx}>{clause}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Layer 3: Modifiers & Parentheticals */}
          {sentence.modifiersAndParentheticals.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border/80 space-y-1.5">
              <span className="font-bold text-muted-foreground uppercase text-[10px] block">
                Tầng 3: Thành Phần Chêm Xen & Bổ Ngữ (Parentheticals & Modifiers)
              </span>
              <ul className="space-y-1 list-disc pl-5 text-[11px] text-muted-foreground font-serif">
                {sentence.modifiersAndParentheticals.map((mod, mIdx) => (
                  <li key={mIdx}>{mod}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Simplified 5-Second Meaning */}
        <div className="p-4 rounded-2xl bg-indigo-500/[0.05] border border-indigo-500/20 space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Nghĩa cốt lõi trong 5 giây:</span>
          </div>
          <p className="font-serif text-foreground/90 text-xs sm:text-sm">
            🇬🇧 <strong>En:</strong> {sentence.simplifiedMeaningEn}
          </p>
          <p className="text-[11px] text-muted-foreground pt-1 border-t border-border/40">
            🇻🇳 <strong>Vi:</strong> {sentence.simplifiedMeaningVi}
          </p>
        </div>

        {/* Close Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md cursor-pointer"
          >
            Đã hiểu cấu trúc
          </button>
        </div>
      </div>
    </div>
  );
}
