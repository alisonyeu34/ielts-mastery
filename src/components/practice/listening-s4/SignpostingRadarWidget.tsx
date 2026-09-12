"use client";

import React, { useState } from "react";
import {
  SignpostingCueCategory,
} from "@/data/mockSection4LectureData";
import {
  Radio,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Info,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SignpostingRadarWidgetProps {
  categories: SignpostingCueCategory[];
  className?: string;
}

export function SignpostingRadarWidget({
  categories,
  className,
}: SignpostingRadarWidgetProps) {
  const [expandedCat, setExpandedCat] = useState<string | null>(
    categories[0].category
  );

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-sm space-y-3 select-none",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border/60 pb-2">
        <div className="flex items-center gap-2">
          <Radio className="h-4 w-4 text-primary animate-pulse" />
          <span className="font-bold text-xs text-foreground">
            Radar Tín Hiệu Dẫn Đường Học Thuật (Signposting Cues)
          </span>
        </div>

        <span className="text-[10px] font-mono text-muted-foreground">
          4 Nhóm từ tín hiệu
        </span>
      </div>

      {/* Accordion Categories */}
      <div className="space-y-2">
        {categories.map((cat) => {
          const isExpanded = expandedCat === cat.category;

          return (
            <div
              key={cat.category}
              className="rounded-2xl border border-border/70 bg-secondary/15 overflow-hidden transition-colors"
            >
              {/* Category Header */}
              <button
                type="button"
                onClick={() =>
                  setExpandedCat(isExpanded ? null : cat.category)
                }
                className="w-full p-3 flex items-center justify-between text-left cursor-pointer hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border uppercase",
                      cat.badgeBg
                    )}
                  >
                    {cat.titleVi}
                  </span>
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {cat.descriptionVi}
                  </span>
                </div>

                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {/* Expanded Cues List */}
              {isExpanded && (
                <div className="p-3 pt-0 border-t border-border/50 space-y-2 text-xs animate-in fade-in">
                  {cat.cues.map((cue, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-card border border-border/60 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-foreground text-xs">
                          "{cue.phrase}"
                        </span>
                        <span className="text-[10px] font-mono text-primary font-bold">
                          {cue.functionVi}
                        </span>
                      </div>
                      <p className="text-[11px] font-serif italic text-muted-foreground">
                        💡 "{cue.exampleInLecture}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
