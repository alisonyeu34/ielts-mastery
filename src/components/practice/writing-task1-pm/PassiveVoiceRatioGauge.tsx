"use client";

import React from "react";
import { PassiveAnalysisResult } from "@/lib/processMapValidator";
import { PMExerciseType } from "@/data/mockProcessMapData";
import {
  CheckCircle2,
  AlertTriangle,
  Flame,
  Layers,
  Sparkles,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PassiveVoiceRatioGaugeProps {
  passiveAnalysis: PassiveAnalysisResult;
  diagramType: PMExerciseType;
  className?: string;
}

export function PassiveVoiceRatioGauge({
  passiveAnalysis,
  diagramType,
  className,
}: PassiveVoiceRatioGaugeProps) {
  const isManMade = diagramType === "process_manmade";
  const isNatural = diagramType === "process_natural";
  const isMap = diagramType.startsWith("map");

  const ratio = passiveAnalysis.passiveRatioPercentage;

  const getTargetGuidance = () => {
    if (isManMade) return "Mục tiêu tối ưu: ≥ 50% câu bị động (Passive Voice)";
    if (isNatural) return "Mục tiêu tối ưu: ≤ 40% câu bị động (Ưu tiên Active Voice)";
    return "Mục tiêu tối ưu: 40% - 75% câu bị động cân bằng";
  };

  return (
    <div
      className={cn(
        "p-4 rounded-2xl border bg-card/60 backdrop-blur-sm shadow-sm space-y-3",
        passiveAnalysis.isOptimal
          ? "border-emerald-500/30 bg-emerald-500/[0.02]"
          : "border-border",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-xl",
              passiveAnalysis.isOptimal
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
            )}
          >
            <Layers className="h-3.5 w-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <span>Thước Đo Thể Bị Động (Passive Voice Ratio)</span>
              {passiveAnalysis.isOptimal && (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              )}
            </h4>
            <span className="text-[10px] text-muted-foreground">{getTargetGuidance()}</span>
          </div>
        </div>

        <div className="text-right">
          <span
            className={cn(
              "text-base font-extrabold font-mono",
              passiveAnalysis.isOptimal
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-foreground"
            )}
          >
            {ratio}%
          </span>
          <span className="text-[10px] text-muted-foreground block font-mono">
            {passiveAnalysis.passiveSentenceCount}/{passiveAnalysis.totalSentenceCount} câu
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="h-2 w-full rounded-full bg-secondary overflow-hidden relative">
        <div
          className={cn(
            "h-full transition-all duration-500 rounded-full",
            passiveAnalysis.isOptimal
              ? "bg-gradient-to-r from-emerald-500 to-teal-500"
              : ratio > 0
              ? "bg-gradient-to-r from-indigo-500 to-purple-500"
              : "bg-muted"
          )}
          style={{ width: `${Math.min(100, Math.max(0, ratio))}%` }}
        />
      </div>

      {/* Pedagogical Assessment Note */}
      <div className="p-2.5 rounded-xl bg-secondary/50 border border-border/60 text-[11px] leading-relaxed flex items-start gap-2">
        <Info className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
        <span className="text-muted-foreground">{passiveAnalysis.assessmentVi}</span>
      </div>

      {/* Detected tags */}
      {passiveAnalysis.detectedPassives.length > 0 && (
        <div className="space-y-1 pt-1 border-t border-border/40">
          <span className="text-[10px] font-bold text-muted-foreground block">
            Cấu trúc bị động đã phát hiện ({passiveAnalysis.detectedPassives.length}):
          </span>
          <div className="flex flex-wrap gap-1">
            {passiveAnalysis.detectedPassives.map((p, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-semibold"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
