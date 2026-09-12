"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Layers,
} from "lucide-react";
import { SpeakingCriteriaEvaluation } from "@/data/mockSpeakingFeedbackData";
import { cn } from "@/lib/utils";

interface SpeakingCriteriaDetailProps {
  criteria: {
    fc: SpeakingCriteriaEvaluation;
    lr: SpeakingCriteriaEvaluation;
    gra: SpeakingCriteriaEvaluation;
    pr: SpeakingCriteriaEvaluation;
  };
  className?: string;
}

export function SpeakingCriteriaDetail({
  criteria,
  className,
}: SpeakingCriteriaDetailProps) {
  const [activeTab, setActiveTab] = useState<"fc" | "lr" | "gra" | "pr">("fc");

  const tabOptions = [
    { key: "fc", label: "Fluency & Coherence (FC)", score: criteria.fc.score },
    { key: "lr", label: "Lexical Resource (LR)", score: criteria.lr.score },
    { key: "gra", label: "Grammar & Accuracy (GRA)", score: criteria.gra.score },
    { key: "pr", label: "Pronunciation (PR)", score: criteria.pr.score },
  ] as const;

  const currentEval = criteria[activeTab];

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5 select-none",
        className
      )}
    >
      {/* Tab Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-border/70">
        {tabOptions.map((tab) => {
          const isSelected = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "px-3.5 py-2 rounded-2xl border text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer",
                isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-secondary/30 border-border hover:bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              <span>{tab.label}</span>
              <span
                className={cn(
                  "font-mono text-[10px] px-1.5 py-0.2 rounded-full",
                  isSelected ? "bg-white/20 text-white" : "bg-card text-muted-foreground"
                )}
              >
                {tab.score.toFixed(1)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Evaluation Details */}
      <div className="space-y-4 text-xs animate-in fade-in duration-200">
        {/* Band Label Banner */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-secondary/30 border border-border">
          <span className="font-bold text-foreground text-xs sm:text-sm">
            {currentEval.bandLabel}
          </span>
          <span className="font-mono font-bold text-xs text-primary px-2.5 py-0.5 rounded-lg bg-primary/10 border border-primary/20">
            Điểm: {currentEval.score.toFixed(1)} / 9.0
          </span>
        </div>

        {/* Strengths */}
        <div className="p-4 rounded-2xl bg-emerald-500/[0.05] border border-emerald-500/20 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400 text-[11px] uppercase font-mono">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Thế Mạnh Đã Thể Hiện:</span>
          </div>
          <ul className="space-y-1.5 pl-4 list-disc text-muted-foreground leading-relaxed">
            {currentEval.strengths.map((str, idx) => (
              <li key={idx}>{str}</li>
            ))}
          </ul>
        </div>

        {/* Key Weaknesses */}
        <div className="p-4 rounded-2xl bg-rose-500/[0.05] border border-rose-500/20 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-rose-700 dark:text-rose-400 text-[11px] uppercase font-mono">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Điểm Yếu Cốt Tử Cần Khắc Phục:</span>
          </div>
          <ul className="space-y-1.5 pl-4 list-disc text-muted-foreground leading-relaxed">
            {currentEval.weaknesses.map((w, idx) => (
              <li key={idx}>{w}</li>
            ))}
          </ul>
        </div>

        {/* Examiner Advice */}
        <div className="p-4 rounded-2xl bg-amber-500/[0.06] border border-amber-500/25 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400 text-[11px] uppercase font-mono">
            <Lightbulb className="h-3.5 w-3.5" />
            <span>Lời Khuyên Của Giám Khảo Khảo Thí:</span>
          </div>
          <p className="text-muted-foreground font-serif leading-relaxed italic">
            "{currentEval.examinerAdvice}"
          </p>
        </div>
      </div>
    </div>
  );
}
