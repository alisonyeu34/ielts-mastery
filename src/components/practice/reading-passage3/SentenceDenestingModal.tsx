"use client";

import React from "react";
import { DenestingSentence } from "@/data/mockPassage3Data";
import { Scissors, X, Sparkles, Layers, BookOpen, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SentenceDenestingModalProps {
  sentence: DenestingSentence | null;
  onClose: () => void;
  className?: string;
}

export function SentenceDenestingModal({
  sentence,
  onClose,
  className,
}: SentenceDenestingModalProps) {
  if (!sentence) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-3xl rounded-3xl border border-primary/40 bg-card p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-secondary transition-colors cursor-pointer text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border/70 pb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-md shadow-cyan-600/20">
            <Scissors className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 uppercase">
                Sentence De-nesting Engine • Đoạn {sentence.paragraphLetter}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-foreground">
              Giải Phẫu Cú Pháp Câu Phức Lồng Tầng
            </h3>
          </div>
        </div>

        {/* Raw Sentence Box */}
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-1.5 text-xs">
          <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold tracking-wider block">
            Câu Phức Gốc Trong Đoạn {sentence.paragraphLetter}:
          </span>
          <p className="font-serif italic text-foreground text-xs sm:text-sm leading-relaxed">
            "{sentence.rawSentence}"
          </p>
        </div>

        {/* 3 Cascading Syntactic Layers */}
        <div className="space-y-3 text-xs">
          <span className="font-bold text-foreground block">
            Bóc tách 3 tầng cú pháp cốt lõi:
          </span>

          {/* Layer 1: Core S-V-O Backbone */}
          <div className="p-4 rounded-2xl border border-cyan-500/40 bg-cyan-500/[0.04] space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 font-bold text-cyan-700 dark:text-cyan-300">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-cyan-600 text-white font-mono text-[10px] font-black">
                1
              </span>
              <span>Lớp Lõi Nòng Cốt (Core S-V-O Backbone):</span>
            </div>
            <p className="font-serif font-black text-foreground text-xs sm:text-sm pl-7 leading-relaxed">
              "{sentence.backbone}"
            </p>
            <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 pl-7 block">
              💡 Nắm bắt ý niệm then chốt này trong 5 giây mà không bị chi phối bởi các mệnh đề phụ.
            </span>
          </div>

          {/* Layer 2: Primary Modifiers */}
          {sentence.primaryModifiers.length > 0 && (
            <div className="p-4 rounded-2xl border border-purple-500/30 bg-purple-500/[0.04] space-y-1.5 pl-6 sm:pl-8">
              <div className="flex items-center gap-2 font-bold text-purple-700 dark:text-purple-300">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-purple-600 text-white font-mono text-[10px] font-black">
                  2
                </span>
                <span>Lớp Bổ Nghĩa Tầng 1 (Primary Modifiers & Clauses):</span>
              </div>
              <ul className="space-y-1 pl-7 list-disc list-inside text-foreground/90 font-serif text-xs">
                {sentence.primaryModifiers.map((mod, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {mod}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Layer 3: Qualifications & Parentheticals */}
          {sentence.qualifications.length > 0 && (
            <div className="p-4 rounded-2xl border border-dashed border-amber-500/40 bg-amber-500/[0.03] space-y-1.5 pl-8 sm:pl-12">
              <div className="flex items-center gap-2 font-bold text-amber-700 dark:text-amber-400">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-500 text-white font-mono text-[10px] font-black">
                  3
                </span>
                <span>Lớp Rào Đón & Nhượng Bộ (Qualifications & Parentheticals):</span>
              </div>
              <ul className="space-y-1 pl-7 list-disc list-inside text-foreground/80 font-serif text-[11px]">
                {sentence.qualifications.map((q, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Vietnamese Translation & Breakdown */}
        <div className="p-4 rounded-2xl bg-secondary/20 border border-border space-y-2 text-xs">
          <span className="font-bold text-primary block">
            Bản dịch học thuật tiếng Việt:
          </span>
          <p className="font-serif text-foreground/90 leading-relaxed text-xs sm:text-sm">
            "{sentence.vietnameseMeaning}"
          </p>
          <div className="pt-1 text-[11px] text-muted-foreground border-t border-border/60">
            📘 <strong>Ghi chú cú pháp:</strong> {sentence.syntacticBreakdownVi}
          </div>
        </div>

        {/* Close Action */}
        <div className="pt-2 border-t border-border/70 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs shadow-md transition-all cursor-pointer"
          >
            Đã Hiểu Cấu Trúc Câu
          </button>
        </div>
      </div>
    </div>
  );
}
