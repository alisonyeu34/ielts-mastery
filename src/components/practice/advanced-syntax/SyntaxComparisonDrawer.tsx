"use client";

import React, { useState } from "react";
import { SyntaxExerciseItem } from "@/data/mockAdvancedSyntaxData";
import {
  FileText,
  Sparkles,
  X,
  BookmarkPlus,
  CheckCircle2,
  Layers,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SyntaxComparisonDrawerProps {
  isOpen: boolean;
  exercise: SyntaxExerciseItem;
  onSaveWordFamilies: () => void;
  onClose: () => void;
  className?: string;
}

export function SyntaxComparisonDrawer({
  isOpen,
  exercise,
  onSaveWordFamilies,
  onClose,
  className,
}: SyntaxComparisonDrawerProps) {
  const [isSaved, setIsSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveWordFamilies();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

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
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase">
              Giải Phẫu Cú Pháp Song Song (Syntax Inspector)
            </span>
            <h3 className="text-lg sm:text-xl font-black text-foreground">
              So Sánh Đối Chiếu: Band 6.0 vs Band 8.5+
            </h3>
          </div>
        </div>

        {/* Side-by-side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Band 6.0 Loose Style */}
          <div className="p-4 rounded-2xl border border-rose-500/30 bg-rose-500/[0.03] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400 uppercase">
                Band 5.5 - 6.0 (Loose Style)
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">
                Mật độ: ~45%
              </span>
            </div>
            <p className="font-serif italic text-foreground/90 text-xs sm:text-sm leading-relaxed">
              "{exercise.originalSentence}"
            </p>
            <p className="text-[11px] text-muted-foreground leading-snug pt-1 border-t border-border/60">
              ⚠️ {exercise.comparisonBreakdown.band6AnalysisVi}
            </p>
          </div>

          {/* Band 8.5+ Compact Academic */}
          <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.03] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 uppercase">
                Band 8.0 - 8.5+ (Compact Academic)
              </span>
              <span className="text-[10px] font-mono text-emerald-600 font-bold">
                Mật độ: {exercise.academicDensityScore}%
              </span>
            </div>
            <p className="font-serif font-bold text-foreground text-xs sm:text-sm leading-relaxed">
              "{exercise.modelSolutions[0]}"
            </p>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-300 leading-snug pt-1 border-t border-border/60">
              ✨ {exercise.comparisonBreakdown.band8AnalysisVi}
            </p>
          </div>
        </div>

        {/* Key Mechanism Box */}
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-1 text-xs">
          <span className="font-bold text-foreground block">
            Cơ chế chuyển dịch cú pháp then chốt:
          </span>
          <p className="font-mono text-primary leading-relaxed text-[11px]">
            {exercise.comparisonBreakdown.keyMechanismVi}
          </p>
        </div>

        {/* Alternative Solutions */}
        {exercise.modelSolutions.length > 1 && (
          <div className="space-y-1.5 text-xs">
            <span className="font-bold text-muted-foreground block">
              Biến thể câu mẫu khác:
            </span>
            {exercise.modelSolutions.slice(1).map((sol, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-card border border-border font-serif text-[11px] text-foreground/80 italic"
              >
                "{sol}"
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border/70">
          <button
            type="button"
            onClick={handleSave}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Đã lưu họ từ vào Sổ Từ Vựng FSRS!</span>
              </>
            ) : (
              <>
                <BookmarkPlus className="h-4 w-4" />
                <span>Lưu Họ Từ Vựng AWL (FSRS)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs border border-border transition-colors cursor-pointer"
          >
            Đóng Giải Phẫu
          </button>
        </div>
      </div>
    </div>
  );
}
