"use client";

import React, { useState } from "react";
import {
  ACADEMIC_CONNECTORS,
  AcademicConnectorItem,
} from "@/data/mockTask2PEELData";
import {
  Sparkles,
  Layers,
  PlusCircle,
  BookmarkPlus,
  CheckCircle2,
  X,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AcademicConnectorPaletteProps {
  onInsertConnector: (phrase: string) => void;
  onSaveToFSRS: () => void;
  className?: string;
}

export function AcademicConnectorPalette({
  onInsertConnector,
  onSaveToFSRS,
  className,
}: AcademicConnectorPaletteProps) {
  const [activeCategory, setActiveCategory] = useState<
    "all" | "cause" | "consequence" | "example" | "link"
  >("all");
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const filteredConnectors =
    activeCategory === "all"
      ? ACADEMIC_CONNECTORS
      : ACADEMIC_CONNECTORS.filter((item) => item.category === activeCategory);

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
            Bảng Tra Cứu Liên Từ Logic C1 (Academic Connector Palette)
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

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-1 bg-secondary/40 p-1 rounded-xl border border-border text-[11px] font-bold">
        {[
          { key: "all", label: "Tất Cả" },
          { key: "cause", label: "1. Nguyên Nhân" },
          { key: "consequence", label: "2. Hệ Quả Logic" },
          { key: "example", label: "3. Dẫn Chứng" },
          { key: "link", label: "4. Câu Neo" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveCategory(tab.key as any)}
            className={cn(
              "px-2.5 py-1 rounded-lg transition-all cursor-pointer",
              activeCategory === tab.key
                ? "bg-card text-foreground shadow-2xs border border-border font-bold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Connectors List */}
      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {filteredConnectors.map((item, idx) => (
          <div
            key={idx}
            className="p-2.5 rounded-xl border border-border bg-secondary/15 hover:bg-secondary/30 transition-colors flex items-center justify-between gap-2 text-xs"
          >
            <div className="min-w-0 space-y-0.5">
              <div className="font-mono font-bold text-foreground text-xs truncate">
                "{item.connector}"
              </div>
              <p className="text-[11px] text-muted-foreground truncate">
                {item.meaningVi}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onInsertConnector(item.connector)}
              title="Chèn cụm từ này vào phần Explain"
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
