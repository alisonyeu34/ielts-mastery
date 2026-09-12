import React from "react";
import { AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrapComparisonCardProps {
  title?: string;
  trapMindset: string;
  trapExample?: string;
  masterMindset: string;
  masterExample?: string;
  expertTip?: string;
  className?: string;
}

export function TrapComparisonCard({
  title = "So Sánh Tư Duy Bẫy Khảo Thí vs Chiến Lược Band 7.5+",
  trapMindset,
  trapExample,
  masterMindset,
  masterExample,
  expertTip,
  className,
}: TrapComparisonCardProps) {
  return (
    <div className={cn("rounded-2xl border border-border/80 bg-card overflow-hidden shadow-sm space-y-0", className)}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-secondary/40 border-b border-border/60">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-amber-500" />
          <h4 className="text-xs sm:text-sm font-bold text-foreground">
            {title}
          </h4>
        </div>
        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
          Vạch Trần Bẫy Đề
        </span>
      </div>

      {/* 2-Column Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        {/* Left: Band 5.0 Trap */}
        <div className="p-4 sm:p-5 space-y-3 bg-rose-500/[0.02]">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            <AlertTriangle className="h-4 w-4 shrink-0 text-rose-500" />
            <span>Tư duy Bẫy Thường Gặp (Band 5.0)</span>
          </div>
          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-medium">
            {trapMindset}
          </p>
          {trapExample && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-700 dark:text-rose-300 font-mono">
              ❌ {trapExample}
            </div>
          )}
        </div>

        {/* Right: Band 7.5+ Strategy */}
        <div className="p-4 sm:p-5 space-y-3 bg-emerald-500/[0.02]">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
            <span>Tư Duy Xử Lý Chuẩn (Band 7.5+)</span>
          </div>
          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-medium">
            {masterMindset}
          </p>
          {masterExample && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 font-mono">
              ✅ {masterExample}
            </div>
          )}
        </div>
      </div>

      {/* Expert tip footer */}
      {expertTip && (
        <div className="p-3.5 sm:p-4 bg-indigo-500/5 border-t border-indigo-500/10 flex items-start gap-2.5 text-xs text-indigo-700 dark:text-indigo-300">
          <Lightbulb className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Mẹo Giám Khảo:</strong> {expertTip}
          </div>
        </div>
      )}
    </div>
  );
}
