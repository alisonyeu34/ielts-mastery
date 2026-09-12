"use client";

import React from "react";
import { SummaryBoxOption } from "@/data/mockPassage3Data";
import { Layers, Strikethrough, Check, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryBoxOptionSelectorProps {
  options: SummaryBoxOption[];
  selectedLetter: string;
  eliminatedOptions: string[];
  isSubmitted: boolean;
  correctLetter?: string;
  onSelectOption: (letter: string) => void;
  onToggleEliminate: (letter: string) => void;
  className?: string;
}

export function SummaryBoxOptionSelector({
  options,
  selectedLetter,
  eliminatedOptions,
  isSubmitted,
  correctLetter,
  onSelectOption,
  onToggleEliminate,
  className,
}: SummaryBoxOptionSelectorProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-secondary/20 p-4 space-y-3 select-none",
        className
      )}
    >
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-foreground flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5 text-primary" />
          <span>Danh sách từ gợi ý (Box of Options):</span>
        </span>
        <span className="text-[10px] font-mono text-muted-foreground">
          Bấm để chọn • Giữ chuột/bấm gạch để loại trừ
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {options.map((opt) => {
          const isSelected = selectedLetter.toUpperCase() === opt.letter.toUpperCase();
          const isEliminated = eliminatedOptions.includes(opt.letter);
          const isCorrectAnswer =
            isSubmitted && correctLetter?.toUpperCase() === opt.letter.toUpperCase();
          const isWrongSelected =
            isSubmitted && isSelected && !isCorrectAnswer;

          return (
            <div
              key={opt.letter}
              className={cn(
                "group relative p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between gap-1.5",
                isCorrectAnswer
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold ring-2 ring-emerald-500/30"
                  : isWrongSelected
                  ? "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300 ring-2 ring-rose-500/30"
                  : isSelected
                  ? "border-primary bg-primary text-primary-foreground font-bold shadow-xs scale-[1.02]"
                  : isEliminated
                  ? "border-border/40 bg-secondary/20 text-muted-foreground/40 line-through"
                  : "border-border bg-card hover:bg-secondary/60 text-foreground"
              )}
            >
              <button
                type="button"
                onClick={() => !isSubmitted && onSelectOption(opt.letter)}
                disabled={isSubmitted}
                className="flex items-center gap-1.5 min-w-0 text-left cursor-pointer flex-1"
              >
                <span className="font-mono font-bold text-[11px] opacity-80">
                  {opt.letter}.
                </span>
                <span className="font-serif truncate">{opt.word}</span>
              </button>

              {!isSubmitted && (
                <button
                  type="button"
                  title="Gạch bỏ phương án nhiễu"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleEliminate(opt.letter);
                  }}
                  className="p-1 rounded hover:bg-secondary/80 text-muted-foreground hover:text-foreground opacity-60 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Strikethrough className="h-3 w-3" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
