"use client";

import React from "react";
import { FallacyDetectionResult } from "@/lib/toulminLogicChecker";
import { ShieldAlert, AlertTriangle, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogicalFallacyAlertProps {
  fallacies: FallacyDetectionResult;
  className?: string;
}

export function LogicalFallacyAlert({
  fallacies,
  className,
}: LogicalFallacyAlertProps) {
  const hasAnyFallacy =
    fallacies.hasHastyGeneralization ||
    fallacies.hasSlipperySlope ||
    fallacies.hasFalseDilemma;

  if (!hasAnyFallacy) return null;

  return (
    <div
      className={cn(
        "rounded-2xl border border-rose-500/40 bg-rose-500/[0.06] p-4 sm:p-5 space-y-3 animate-in fade-in select-none",
        className
      )}
    >
      <div className="flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400 text-xs sm:text-sm">
        <ShieldAlert className="h-4 w-4 shrink-0 animate-bounce" />
        <span>Radar Cảnh Báo Ngụy Biện Logic (Academic Fallacy Hunter):</span>
      </div>

      <div className="space-y-2 text-xs">
        {fallacies.detectedPhrases.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-muted-foreground text-[11px]">Từ ngữ bị cảnh báo:</span>
            {fallacies.detectedPhrases.map((phrase, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-rose-500/15 border border-rose-500/30 text-rose-700 dark:text-rose-300 font-mono font-bold text-[10px]"
              >
                "{phrase}"
              </span>
            ))}
          </div>
        )}

        <div className="space-y-1 pl-1">
          {fallacies.fallacyExplanationsVi.map((exp, idx) => (
            <p
              key={idx}
              className="text-[11px] text-rose-700 dark:text-rose-300 leading-relaxed font-sans"
            >
              ⚠️ {exp}
            </p>
          ))}
        </div>
      </div>

      <div className="pt-1 text-[10px] text-muted-foreground font-mono">
        💡 <em>Mẹo Band 8.0+: Hãy thay thế bằng kỹ thuật Hedging học thuật: "tends to", "in a substantial number of cases", "is likely to precipitate".</em>
      </div>
    </div>
  );
}
