"use client";

import React from "react";
import { GitBranch, ArrowRight, CheckCircle2, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConceptualThreadVisualizerProps {
  threads: Array<{
    paragraphLetter: string;
    stageTitleVi: string;
    coreArgumentVi: string;
  }>;
  selectedParagraph: string | null;
  onSelectParagraph: (letter: string) => void;
  className?: string;
}

export function ConceptualThreadVisualizer({
  threads,
  selectedParagraph,
  onSelectParagraph,
  className,
}: ConceptualThreadVisualizerProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 shadow-sm space-y-4 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-indigo-600" />
          <span className="font-bold text-xs text-foreground">
            Sơ Đồ Mạch Ý Niệm Triết Học (Conceptual Thread A ➔ G)
          </span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">
          Bấm để định vị đoạn
        </span>
      </div>

      {/* Horizontal / Grid Nodes */}
      <div className="space-y-2 text-xs">
        {threads.map((item, idx) => {
          const isSelected = selectedParagraph === item.paragraphLetter;

          return (
            <div
              key={item.paragraphLetter}
              onClick={() => onSelectParagraph(item.paragraphLetter)}
              className={cn(
                "p-3 rounded-2xl border transition-all duration-200 cursor-pointer space-y-1",
                isSelected
                  ? "border-indigo-500 bg-indigo-500/10 text-foreground ring-2 ring-indigo-500/30"
                  : "border-border bg-secondary/20 hover:bg-secondary/50 text-foreground/90"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-600 text-white font-mono text-[10px] font-black">
                    {item.paragraphLetter}
                  </span>
                  <span className="font-bold text-foreground text-xs">
                    {item.stageTitleVi}
                  </span>
                </div>
                <ArrowRight className="h-3 w-3 text-muted-foreground opacity-60" />
              </div>

              <p className="text-[11px] text-muted-foreground pl-7 leading-relaxed font-serif">
                {item.coreArgumentVi}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
