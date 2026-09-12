"use client";

import React, { useState } from "react";
import {
  ACADEMIC_REBUTTAL_PHRASES,
  AcademicRebuttalPhraseItem,
} from "@/data/mockToulminData";
import {
  Sparkles,
  Layers,
  PlusCircle,
  BookmarkPlus,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AcademicRebuttalPaletteProps {
  onInsertPhrase: (phrase: string) => void;
  onSaveToFSRS: () => void;
  className?: string;
}

export function AcademicRebuttalPalette({
  onInsertPhrase,
  onSaveToFSRS,
  className,
}: AcademicRebuttalPaletteProps) {
  const [activeCategory, setActiveCategory] = useState<
    "all" | "concession" | "rebuttal_pivot" | "flaw_exposure" | "final_affirmation"
  >("all");
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const filteredPhrases =
    activeCategory === "all"
      ? ACADEMIC_REBUTTAL_PHRASES
      : ACADEMIC_REBUTTAL_PHRASES.filter((item) => item.category === activeCategory);

  const handleSave = () => {
    onSaveToFSRS();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

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
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="font-bold text-xs text-foreground">
            Bảng Tra Cứu Cụm Từ Nhượng Bộ & Bác Bỏ C1/C2
          </span>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors cursor-pointer flex items-center gap-1"
        >
          {isSaved ? <CheckCircle2 className="h-3 w-3" /> : <BookmarkPlus className="h-3 w-3" />}
          <span>{isSaved ? "Đã Lưu FSRS" : "Lưu FSRS"}</span>
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-1 bg-secondary/40 p-1 rounded-xl border border-border text-[10px] font-bold">
        {[
          { key: "all", label: "Tất Cả" },
          { key: "concession", label: "1. Nhượng Bộ" },
          { key: "rebuttal_pivot", label: "2. Lật Kèo" },
          { key: "flaw_exposure", label: "3. Vạch Lỗ Hổng" },
          { key: "final_affirmation", label: "4. Chốt Hạ" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveCategory(tab.key as any)}
            className={cn(
              "px-2 py-0.5 rounded-lg transition-all cursor-pointer",
              activeCategory === tab.key
                ? "bg-card text-foreground shadow-2xs border border-border font-bold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Phrases List */}
      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {filteredPhrases.map((item, idx) => (
          <div
            key={idx}
            className="p-2.5 rounded-xl border border-border bg-secondary/15 hover:bg-secondary/30 transition-colors flex items-center justify-between gap-2 text-xs"
          >
            <div className="min-w-0 space-y-0.5">
              <div className="font-mono font-bold text-foreground text-xs truncate">
                "{item.phrase}"
              </div>
              <p className="text-[11px] text-muted-foreground truncate">
                {item.meaningVi}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onInsertPhrase(item.phrase)}
              title="Chèn cụm từ này vào ô đang chọn"
              className="px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-mono text-[10px] font-bold shrink-0 transition-colors cursor-pointer flex items-center gap-1"
            >
              <PlusCircle className="h-3 w-3" />
              <span>Chèn</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
