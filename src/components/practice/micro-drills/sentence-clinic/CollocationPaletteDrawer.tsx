"use client";

import React from "react";
import { CollocationItem } from "@/data/mockSentenceClinicData";
import {
  Palette,
  Sparkles,
  Plus,
  BookmarkPlus,
  CheckCircle2,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CollocationPaletteDrawerProps {
  paletteList: CollocationItem[];
  onInsertCollocation: (phrase: string) => void;
  onSyncVocabMatrix: () => void;
  isSyncing: boolean;
  syncSuccessMessage: string | null;
  className?: string;
}

export function CollocationPaletteDrawer({
  paletteList,
  onInsertCollocation,
  onSyncVocabMatrix,
  isSyncing,
  syncSuccessMessage,
  className,
}: CollocationPaletteDrawerProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4 select-none",
        className
      )}
    >
      {/* Header & FSRS Sync Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs">
            <Palette className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
              BẢNG MÀU COLLOCATIONS HỌC THUẬT (PALETTE)
            </span>
            <h4 className="text-sm font-extrabold text-foreground">
              Kho Cụm Từ C1/C2 Thay Thế Chuẩn Ngữ Cảnh
            </h4>
          </div>
        </div>

        <button
          type="button"
          onClick={onSyncVocabMatrix}
          disabled={isSyncing}
          className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer"
          title="Lưu toàn bộ cụm C1 Collocations vào sổ từ vựng FSRS"
        >
          <BookmarkPlus className="h-4 w-4" />
          <span>{isSyncing ? "Đang Lưu..." : "Lưu vào FSRS Vocab"}</span>
        </button>
      </div>

      {/* Sync Success Feedback */}
      {syncSuccessMessage && (
        <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs font-mono font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
          <span>{syncSuccessMessage}</span>
        </div>
      )}

      {/* Palette Items Grid */}
      <div className="space-y-3">
        {paletteList.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-secondary/40 border border-border space-y-2 text-xs"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-muted-foreground line-through">
                "{item.originalWord}"
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">
                {item.usageContextVi}
              </span>
            </div>

            {/* Alternatives Buttons */}
            <div className="flex flex-wrap gap-2 pt-1">
              {item.c1Alternatives.map((alt, aIdx) => (
                <button
                  key={aIdx}
                  type="button"
                  onClick={() => onInsertCollocation(alt)}
                  className="px-3 py-1.5 rounded-xl bg-card border border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 font-mono font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer group"
                  title="Bấm để chèn cụm này vào ô phẫu thuật câu"
                >
                  <Plus className="h-3 w-3 text-emerald-600 group-hover:scale-125 transition-transform" />
                  <span>{alt}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
