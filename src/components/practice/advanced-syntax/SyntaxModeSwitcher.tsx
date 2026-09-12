"use client";

import React from "react";
import { SyntaxModeType } from "@/data/mockAdvancedSyntaxData";
import { Sparkles, Layers, Wand2, Compass, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface SyntaxModeSwitcherProps {
  activeMode: SyntaxModeType;
  onChangeMode: (mode: SyntaxModeType) => void;
  className?: string;
}

export function SyntaxModeSwitcher({
  activeMode,
  onChangeMode,
  className,
}: SyntaxModeSwitcherProps) {
  const modes: Array<{
    type: SyntaxModeType;
    titleVi: string;
    subtitleVi: string;
    icon: any;
    colorActive: string;
    badgeText: string;
  }> = [
    {
      type: "nominalization",
      titleVi: "1. Danh Từ Hóa (Nominalization)",
      subtitleVi: "Nén thông tin • Biến Verb ➔ Noun",
      icon: Wand2,
      colorActive: "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/30",
      badgeText: "Syntactic Compression",
    },
    {
      type: "inversion",
      titleVi: "2. Đảo Ngữ Học Thuật (Inversion)",
      subtitleVi: "Trạng từ phủ định & Câu điều kiện",
      icon: Compass,
      colorActive: "border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400 ring-2 ring-purple-500/30",
      badgeText: "Rhetorical Inversion",
    },
    {
      type: "cleft",
      titleVi: "3. Câu Chẻ Nhấn Mạnh (Clefts)",
      subtitleVi: "It-cleft & Wh-cleft tiêu điểm",
      icon: Zap,
      colorActive: "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-500/30",
      badgeText: "Information Focus",
    },
  ];

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-3 select-none", className)}>
      {modes.map((m) => {
        const isActive = activeMode === m.type;
        const Icon = m.icon;

        return (
          <button
            key={m.type}
            type="button"
            onClick={() => onChangeMode(m.type)}
            className={cn(
              "p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer space-y-1 relative overflow-hidden",
              isActive
                ? m.colorActive
                : "border-border bg-card text-muted-foreground hover:text-foreground hover:bg-secondary/30"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-secondary/80 text-foreground border border-border uppercase">
                {m.badgeText}
              </span>
              <Icon className="h-4 w-4 shrink-0 opacity-80" />
            </div>

            <h4 className="font-bold text-xs sm:text-sm text-foreground pt-0.5">
              {m.titleVi}
            </h4>

            <p className="text-[11px] text-muted-foreground leading-tight">
              {m.subtitleVi}
            </p>
          </button>
        );
      })}
    </div>
  );
}
