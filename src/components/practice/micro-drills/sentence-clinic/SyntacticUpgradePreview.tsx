"use client";

import React, { useState } from "react";
import { SentenceClinicalSolution } from "@/data/mockSentenceClinicData";
import {
  Sparkles,
  Award,
  CheckCircle2,
  Layers,
  ChevronDown,
  ChevronUp,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SyntacticUpgradePreviewProps {
  solutions: SentenceClinicalSolution[];
  className?: string;
}

export function SyntacticUpgradePreview({
  solutions,
  className,
}: SyntacticUpgradePreviewProps) {
  const [selectedBand, setSelectedBand] = useState<6.5 | 7.5 | 8.5>(8.5);

  const getBandBadge = (band: number) => {
    switch (band) {
      case 6.5:
        return "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20";
      case 7.5:
        return "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20";
      case 8.5:
        return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20";
      default:
        return "bg-secondary text-foreground";
    }
  };

  return (
    <div
      className={cn(
        "p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-6 select-none animate-in fade-in duration-200",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold shadow-xs">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block">
              KHUNG ĐỐI CHIẾU SAU PHẪU THUẬT (POST-OP DIFFERENTIAL)
            </span>
            <h4 className="text-sm font-extrabold text-foreground">
              3 Phương Án Nâng Cấp Cú Pháp Chuẩn Band 6.5 - 7.5 - 8.5+
            </h4>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-secondary/70 border border-border text-xs font-mono">
          {[6.5, 7.5, 8.5].map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setSelectedBand(b as 6.5 | 7.5 | 8.5)}
              className={cn(
                "px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer",
                selectedBand === b
                  ? "bg-card text-foreground shadow-xs border border-border"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Band {b}+
            </button>
          ))}
        </div>
      </div>

      {/* Solutions Cards Grid */}
      <div className="space-y-4">
        {solutions.map((sol) => {
          const isHighlighted = sol.band === selectedBand;

          return (
            <div
              key={sol.band}
              className={cn(
                "p-5 rounded-3xl border transition-all space-y-3",
                isHighlighted
                  ? "bg-secondary/40 border-indigo-500/40 ring-2 ring-indigo-500/20 shadow-sm"
                  : "bg-card border-border/70 hover:border-border"
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full font-mono text-xs font-bold uppercase border",
                      getBandBadge(sol.band)
                    )}
                  >
                    Band {sol.band}
                  </span>
                  <h5 className="font-extrabold text-xs sm:text-sm text-foreground">
                    {sol.titleVi}
                  </h5>
                </div>

                <span className="text-[10px] font-mono text-muted-foreground font-bold px-2 py-0.5 rounded bg-card border border-border">
                  {sol.stylisticFeatureVi}
                </span>
              </div>

              {/* Solution Sentence */}
              <p className="font-serif text-sm sm:text-base font-bold text-foreground leading-relaxed p-4 rounded-2xl bg-card border border-border/80 shadow-inner">
                &ldquo;{sol.text}&rdquo;
              </p>

              {/* Rationale */}
              <div className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                <Lightbulb className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-foreground">Giải thích sư phạm: </strong>
                  {sol.rationaleVi}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
