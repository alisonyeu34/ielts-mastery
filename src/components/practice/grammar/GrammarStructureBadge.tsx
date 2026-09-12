"use client";

import React from "react";
import { Sparkles, Layers, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GrammarStructureBadgeProps {
  formula: string;
  syntaxBreakdown?: {
    part: string;
    role: string;
  }[];
  className?: string;
}

export function GrammarStructureBadge({
  formula,
  syntaxBreakdown,
  className,
}: GrammarStructureBadgeProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-indigo-500/25 bg-gradient-to-r from-indigo-500/[0.04] via-card to-purple-500/[0.04] p-4 sm:p-5 space-y-3 shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider flex items-center gap-1">
          <Layers className="h-3 w-3" /> Cấu Trúc Cú Pháp Chuẩn (Syntax Pattern)
        </span>
      </div>

      {/* Formula Box */}
      <div className="p-3 rounded-xl bg-secondary/50 border border-border/80 font-mono text-xs sm:text-sm text-foreground font-bold leading-relaxed text-center sm:text-left">
        {formula}
      </div>

      {/* Syntax breakdown list if provided */}
      {syntaxBreakdown && syntaxBreakdown.length > 0 && (
        <div className="space-y-2 pt-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
            Mổ xẻ vai trò thành phần câu:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {syntaxBreakdown.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-card border border-border/70 space-y-0.5"
              >
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block text-[11px]">
                  📌 {item.role}
                </span>
                <p className="text-muted-foreground font-mono text-[11px] leading-relaxed">
                  "{item.part}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
