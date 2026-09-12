"use client";

import React from "react";
import { Layers, ArrowUpDown, Sparkles, CheckCircle2 } from "lucide-react";
import { SyntaxCategory } from "@/data/mockSyntaxData";
import { cn } from "@/lib/utils";

interface SyntaxCategoryTabsProps {
  activeCategory: SyntaxCategory;
  onSelectCategory: (category: SyntaxCategory) => void;
  className?: string;
}

const CATEGORIES: Array<{
  id: SyntaxCategory;
  titleVi: string;
  subtitleEn: string;
  icon: typeof Layers;
  colorActive: string;
  badgeColor: string;
}> = [
  {
    id: "nominalization",
    titleVi: "Danh Từ Hóa",
    subtitleEn: "Nominalization (Lexical Density)",
    icon: Layers,
    colorActive: "border-blue-600 bg-blue-500/10 ring-2 ring-blue-500/20 text-blue-600 dark:text-blue-400",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  {
    id: "inversion",
    titleVi: "Đảo Ngữ Học Thuật",
    subtitleEn: "Negative & Conditional Inversion",
    icon: ArrowUpDown,
    colorActive: "border-purple-600 bg-purple-500/10 ring-2 ring-purple-500/20 text-purple-600 dark:text-purple-400",
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
  {
    id: "cleft",
    titleVi: "Câu Chẻ Nhấn Mạnh",
    subtitleEn: "It-cleft & Wh-cleft Focus",
    icon: Sparkles,
    colorActive: "border-emerald-600 bg-emerald-500/10 ring-2 ring-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
];

export function SyntaxCategoryTabs({
  activeCategory,
  onSelectCategory,
  className,
}: SyntaxCategoryTabsProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-2.5 select-none", className)}>
      {CATEGORIES.map((cat) => {
        const IconComp = cat.icon;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={cn(
              "p-3.5 rounded-2xl border text-left transition-all cursor-pointer space-y-1",
              isActive
                ? cat.colorActive
                : "border-border/80 bg-card hover:bg-secondary/40 text-muted-foreground hover:text-foreground"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconComp className="h-4 w-4 shrink-0" />
                <span className="font-extrabold text-xs sm:text-sm text-foreground">
                  {cat.titleVi}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-secondary/60">
                5 Bài
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground truncate">{cat.subtitleEn}</p>
          </button>
        );
      })}
    </div>
  );
}
