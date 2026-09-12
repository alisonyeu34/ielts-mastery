"use client";

import React from "react";
import { PhoneticDetail } from "@/data/mockDictationDrillsData";
import { Sparkles, BookOpen, Volume2, ShieldAlert, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface AcousticAnatomyCardProps {
  phoneticNotes: PhoneticDetail;
  ieltsContextVi: string;
  targetSentence: string;
  className?: string;
}

export function AcousticAnatomyCard({
  phoneticNotes,
  ieltsContextVi,
  targetSentence,
  className,
}: AcousticAnatomyCardProps) {
  return (
    <div
      className={cn(
        "p-5 sm:p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4 select-none animate-in fade-in duration-200",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border/80 pb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold shadow-xs">
          <Lightbulb className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
            GIẢI PHẪU ÂM HỌC (ACOUSTIC ANATOMY INSIGHT)
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-foreground mt-0.5">
            Bản Chất Hiện Tượng Biến Âm Khảo Thí
          </h3>
        </div>
      </div>

      {/* Target Sentence Display */}
      <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border text-xs sm:text-sm font-serif text-foreground/90 leading-relaxed font-bold">
        &ldquo;{targetSentence}&rdquo;
      </div>

      {/* Acoustic Rules & Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 space-y-1.5">
          <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold font-mono">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Quy Tắc Biến Âm Bản Xứ:</span>
          </div>
          <p className="text-foreground/80 leading-relaxed">
            {phoneticNotes.ruleVi}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 space-y-1.5">
          <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-bold font-mono">
            <Volume2 className="h-3.5 w-3.5" />
            <span>Hiện Tượng Thính Giác (Acoustic Cue):</span>
          </div>
          <p className="text-foreground/80 leading-relaxed">
            {phoneticNotes.acousticExplanationVi}
          </p>
        </div>
      </div>

      {/* IELTS Exam Context */}
      <div className="p-3.5 rounded-2xl bg-muted/60 border border-border text-xs text-muted-foreground flex items-center gap-2">
        <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0" />
        <div>
          <strong className="text-foreground">Ngữ Cảnh Bài Thi: </strong>
          {ieltsContextVi}
        </div>
      </div>
    </div>
  );
}
