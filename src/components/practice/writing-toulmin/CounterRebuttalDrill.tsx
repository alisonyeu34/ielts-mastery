"use client";

import React, { useState } from "react";
import {
  Zap,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
} from "lucide-react";
import {
  ToulminPromptData,
  RebuttalTacticKey,
} from "@/data/mockToulminPrompts";
import { cn } from "@/lib/utils";

interface CounterRebuttalDrillProps {
  prompt: ToulminPromptData;
  onApplyRebuttal: (counter: string, rebuttal: string) => void;
  className?: string;
}

export function CounterRebuttalDrill({
  prompt,
  onApplyRebuttal,
  className,
}: CounterRebuttalDrillProps) {
  const currentCounter = prompt.sampleCounterArguments[0];
  const [selectedTactic, setSelectedTactic] = useState<RebuttalTacticKey>("feasibility");

  const activeTactic = currentCounter.tactics[selectedTactic];

  const handleApplyToCanvas = () => {
    onApplyRebuttal(
      `Admittedly, opponents legitimately point out that ${currentCounter.counterStatement.toLowerCase()}`,
      activeTactic.sampleRebuttal
    );
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 select-none",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-3">
        <div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 uppercase tracking-wider">
            Rebuttal Strategy Drill
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-foreground mt-1">
            Luyện Kỹ Thuật Phản Đòn (Counter-Argument & Rebuttal)
          </h3>
        </div>
      </div>

      {/* Counter Statement Box */}
      <div className="p-3.5 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
          1. Luận điểm đối lập thường gặp (Steel-manned Counter):
        </span>
        <p className="text-xs font-serif text-foreground/90 italic">
          "{currentCounter.counterStatement}"
        </p>
      </div>

      {/* 4 Tactics Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
          <Target className="h-3.5 w-3.5 text-indigo-500" />
          <span>2. Chọn chiến thuật bẻ gãy luận điểm:</span>
        </label>

        <div className="grid grid-cols-2 gap-2">
          {(
            Object.keys(currentCounter.tactics) as RebuttalTacticKey[]
          ).map((tacticKey) => {
            const tact = currentCounter.tactics[tacticKey];
            const isSelected = selectedTactic === tacticKey;

            return (
              <button
                key={tacticKey}
                type="button"
                onClick={() => setSelectedTactic(tacticKey)}
                className={cn(
                  "p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer space-y-0.5",
                  isSelected
                    ? "border-rose-500 bg-rose-500/10 ring-2 ring-rose-500/20 font-bold text-foreground"
                    : "border-border bg-secondary/20 hover:bg-secondary/40 text-muted-foreground"
                )}
              >
                <span className="block truncate">{tact.tacticNameVi}</span>
                <span className="text-[10px] text-muted-foreground block font-mono">
                  {tact.tacticNameEn}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tactic Strategy & Sample Rebuttal */}
      <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-2.5 text-xs animate-in fade-in duration-150">
        <div className="flex items-center justify-between">
          <span className="font-bold text-foreground flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-rose-500" />
            <span>Phản đòn mẫu chuẩn Band 8.5+:</span>
          </span>
          <span className="text-[10px] text-muted-foreground italic">
            💡 {activeTactic.rationale}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-card border border-border/70 font-serif italic text-foreground/90 text-xs sm:text-sm leading-relaxed">
          "{activeTactic.sampleRebuttal}"
        </div>

        <div className="pt-1 flex justify-end">
          <button
            type="button"
            onClick={handleApplyToCanvas}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Nạp cặp Counter-Rebuttal này vào Canvas</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
