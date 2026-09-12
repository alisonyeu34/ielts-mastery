"use client";

import React from "react";
import {
  PassageParagraph,
  DenestingSentence,
  Passage3ExerciseData,
} from "@/data/mockPassage3Data";
import { Scissors, Sparkles, BookOpen, Layers, BookmarkPlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AbstractPassagePaneProps {
  data: Passage3ExerciseData;
  selectedParagraph: string | null;
  onOpenDenesting: (sentenceId: string) => void;
  onSaveVocab: () => void;
  className?: string;
}

export function AbstractPassagePane({
  data,
  selectedParagraph,
  onOpenDenesting,
  onSaveVocab,
  className,
}: AbstractPassagePaneProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6 select-text",
        className
      )}
    >
      {/* Title & Meta */}
      <div className="border-b border-border/80 pb-4 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase">
            READING PASSAGE 3 • {data.wordCount} WORDS
          </span>

          <button
            type="button"
            onClick={onSaveVocab}
            className="text-[11px] font-mono font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
          >
            <BookmarkPlus className="h-3.5 w-3.5" /> Lưu Từ Vựng AWL (FSRS)
          </button>
        </div>

        <h2 className="text-xl sm:text-2xl font-serif font-black text-foreground leading-tight">
          {data.title}
        </h2>

        <p className="text-xs sm:text-sm font-serif italic text-muted-foreground">
          {data.subtitleEn}
        </p>
      </div>

      {/* 7 Paragraphs A - G */}
      <div className="space-y-6 text-sm leading-relaxed font-serif text-foreground/90">
        {data.paragraphs.map((p) => {
          const isSelected = selectedParagraph === p.letter;

          return (
            <div
              key={p.letter}
              id={`para-${p.letter}`}
              className={cn(
                "p-4 sm:p-5 rounded-2xl transition-all duration-300 relative space-y-2 border",
                isSelected
                  ? "border-indigo-500 bg-indigo-500/[0.04] ring-2 ring-indigo-500/20"
                  : "border-transparent hover:border-border/60 hover:bg-secondary/20"
              )}
            >
              {/* Paragraph Letter & De-nesting Triggers */}
              <div className="flex items-center justify-between font-sans">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-foreground text-background font-mono text-xs font-black">
                    {p.letter}
                  </span>
                  <span className="text-[11px] font-bold text-muted-foreground">
                    {p.titleHeadingVi}
                  </span>
                </div>

                {/* Scissors De-nesting Button */}
                {p.denestingSentenceIds.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    {p.denestingSentenceIds.map((senId) => (
                      <button
                        key={senId}
                        type="button"
                        onClick={() => onOpenDenesting(senId)}
                        className="px-2.5 py-1 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-mono font-bold text-[11px] flex items-center gap-1.5 border border-cyan-500/30 transition-all cursor-pointer shadow-2xs"
                      >
                        <Scissors className="h-3 w-3" />
                        <span>Mổ Xẻ Câu Phức</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Text */}
              <p className="indent-4 text-justify leading-relaxed text-xs sm:text-sm text-foreground/90">
                {p.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
