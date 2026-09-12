"use client";

import React from "react";
import {
  Eye,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Layers,
  HelpCircle,
} from "lucide-react";
import { StanceFilterMode } from "@/hooks/usePassage3Tracker";
import { cn } from "@/lib/utils";

interface StanceHighlighterToolbarProps {
  activeFilter: StanceFilterMode;
  onSelectFilter: (filter: StanceFilterMode) => void;
  onOpenToneDrawer: () => void;
  className?: string;
}

const FILTER_BUTTONS: Array<{
  id: StanceFilterMode;
  labelVi: string;
  colorActive: string;
  dotColor: string;
}> = [
  {
    id: "all",
    labelVi: "Tất cả sắc thái",
    colorActive: "bg-indigo-600 text-white border-indigo-600 shadow-sm",
    dotColor: "bg-indigo-400",
  },
  {
    id: "positive",
    labelVi: "Tán thành (Positive)",
    colorActive: "bg-blue-600 text-white border-blue-600 shadow-sm",
    dotColor: "bg-blue-400",
  },
  {
    id: "critical",
    labelVi: "Nghi ngờ (Critical)",
    colorActive: "bg-rose-600 text-white border-rose-600 shadow-sm",
    dotColor: "bg-rose-400",
  },
  {
    id: "concession",
    labelVi: "Nhượng bộ (Concession)",
    colorActive: "bg-purple-600 text-white border-purple-600 shadow-sm",
    dotColor: "bg-purple-400",
  },
  {
    id: "none",
    labelVi: "Tắt lớp phủ",
    colorActive: "bg-secondary text-foreground border-border",
    dotColor: "bg-muted-foreground",
  },
];

export function StanceHighlighterToolbar({
  activeFilter,
  onSelectFilter,
  onOpenToneDrawer,
  className,
}: StanceHighlighterToolbarProps) {
  return (
    <div
      className={cn(
        "p-3 rounded-2xl bg-card border border-border flex flex-wrap items-center justify-between gap-3 shadow-xs select-none",
        className
      )}
    >
      {/* Left: Filter Buttons */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-bold text-muted-foreground mr-1 flex items-center gap-1">
          <Eye className="h-3.5 w-3.5 text-indigo-500" />
          <span>Lớp phủ sắc thái tác giả:</span>
        </span>

        {FILTER_BUTTONS.map((btn) => {
          const isActive = activeFilter === btn.id;

          return (
            <button
              key={btn.id}
              type="button"
              onClick={() => onSelectFilter(btn.id)}
              className={cn(
                "px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer",
                isActive
                  ? btn.colorActive
                  : "bg-secondary/40 text-muted-foreground border-border/80 hover:bg-secondary hover:text-foreground"
              )}
            >
              <span className={cn("h-2 w-2 rounded-full", btn.dotColor)} />
              <span>{btn.labelVi}</span>
            </button>
          );
        })}
      </div>

      {/* Right: Open Tone Lexicon Drawer */}
      <button
        type="button"
        onClick={onOpenToneDrawer}
        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-xl border border-indigo-500/20 flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <BookOpen className="h-3.5 w-3.5" />
        <span>Tra cứu Từ chỉ Thái độ C1</span>
      </button>
    </div>
  );
}
