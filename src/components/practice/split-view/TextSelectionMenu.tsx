"use client";

import React from "react";
import {
  Highlighter,
  BookOpen,
  Plus,
  Trash2,
  Sparkles,
  Volume2,
} from "lucide-react";
import { SelectionPosition } from "@/hooks/useTextSelection";
import { cn } from "@/lib/utils";

export type HighlightColor = "yellow" | "green" | "blue" | "pink";

interface TextSelectionMenuProps {
  position: SelectionPosition | null;
  selectedText: string;
  onHighlight: (color: HighlightColor) => void;
  onRemoveHighlight: () => void;
  onLookupDictionary: () => void;
  onSaveToVocab: () => void;
  className?: string;
}

export const HIGHLIGHT_COLORS: Record<
  HighlightColor,
  { bg: string; border: string; label: string; dot: string }
> = {
  yellow: {
    bg: "bg-amber-200/80 dark:bg-amber-500/30",
    border: "border-amber-400",
    label: "Vàng",
    dot: "bg-amber-400",
  },
  green: {
    bg: "bg-emerald-200/80 dark:bg-emerald-500/30",
    border: "border-emerald-400",
    label: "Xanh lá",
    dot: "bg-emerald-400",
  },
  blue: {
    bg: "bg-sky-200/80 dark:bg-sky-500/30",
    border: "border-sky-400",
    label: "Xanh dương",
    dot: "bg-sky-400",
  },
  pink: {
    bg: "bg-rose-200/80 dark:bg-rose-500/30",
    border: "border-rose-400",
    label: "Hồng",
    dot: "bg-rose-400",
  },
};

export function TextSelectionMenu({
  position,
  selectedText,
  onHighlight,
  onRemoveHighlight,
  onLookupDictionary,
  onSaveToVocab,
  className,
}: TextSelectionMenuProps) {
  if (!position || !selectedText) return null;

  return (
    <div
      className={cn(
        "absolute z-40 flex items-center gap-1.5 p-1.5 rounded-2xl border border-border/90 bg-card/95 backdrop-blur-md shadow-2xl transition-all animate-in fade-in zoom-in-95 select-none -translate-x-1/2 -translate-y-full mb-3",
        className
      )}
      style={{
        top: `${Math.max(10, position.top - 8)}px`,
        left: `${position.left}px`,
      }}
      onMouseDown={(e) => {
        // Prevent clearing selection on toolbar click
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {/* 4 Highlight Color Swatches */}
      <div className="flex items-center gap-1 pr-1.5 border-r border-border/80">
        {(["yellow", "green", "blue", "pink"] as HighlightColor[]).map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onHighlight(color)}
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-lg hover:scale-110 transition-transform cursor-pointer",
              HIGHLIGHT_COLORS[color].dot
            )}
            title={`Highlight màu ${HIGHLIGHT_COLORS[color].label}`}
          />
        ))}

        <button
          type="button"
          onClick={onRemoveHighlight}
          className="flex h-6 w-6 items-center justify-center rounded-lg text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
          title="Xóa Highlight"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Quick Dictionary Button */}
      <button
        type="button"
        onClick={onLookupDictionary}
        className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold text-foreground hover:bg-secondary transition-colors cursor-pointer"
        title="Tra từ điển & phát âm"
      >
        <BookOpen className="h-3.5 w-3.5 text-indigo-500" />
        <span>Tra từ</span>
      </button>

      {/* Save to Vocab Matrix Button */}
      <button
        type="button"
        onClick={onSaveToVocab}
        className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm shadow-purple-600/30 transition-all cursor-pointer"
        title="Lưu từ vựng kèm ngữ cảnh gốc vào Sổ FSRS"
      >
        <Plus className="h-3.5 w-3.5" />
        <span>Lưu FSRS</span>
      </button>
    </div>
  );
}
