"use client";

import React from "react";
import {
  Volume2,
  CheckCircle2,
  Sparkles,
  Info,
  HelpCircle,
} from "lucide-react";
import {
  IPA_MONOPHTHONGS,
  IPA_DIPHTHONGS,
  IPA_CONSONANTS,
  IPAPhoneme,
} from "@/data/mockIPAData";
import { cn } from "@/lib/utils";

interface IPABoardProps {
  masteredPhonemes: Set<string>;
  onSelectPhoneme: (phoneme: IPAPhoneme) => void;
  onSpeakPhoneme: (symbol: string, exampleWord: string) => void;
  className?: string;
}

export function IPABoard({
  masteredPhonemes,
  onSelectPhoneme,
  onSpeakPhoneme,
  className,
}: IPABoardProps) {
  const renderPhonemeTile = (p: IPAPhoneme) => {
    const isMastered = masteredPhonemes.has(p.symbol);

    return (
      <div
        key={p.symbol}
        onClick={() => onSelectPhoneme(p)}
        className={cn(
          "group relative p-3 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between items-center text-center select-none shadow-2xs hover:scale-105 hover:shadow-md",
          isMastered
            ? "border-emerald-500/40 bg-emerald-500/[0.04] hover:bg-emerald-500/[0.08]"
            : "border-border bg-card hover:border-primary/50 hover:bg-secondary/20"
        )}
      >
        {/* Top Status & Voicing dot */}
        <div className="w-full flex items-center justify-between text-[10px]">
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              p.isVoiced ? "bg-amber-500" : "bg-blue-500"
            )}
            title={p.isVoiced ? "Âm hữu thanh (rung cổ)" : "Âm vô thanh (bật hơi)"}
          />

          {isMastered && (
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          )}
        </div>

        {/* Big IPA Symbol */}
        <div className="py-2">
          <span className="text-xl sm:text-2xl font-serif font-black text-foreground group-hover:text-primary transition-colors">
            /{p.symbol}/
          </span>
        </div>

        {/* Example Word & Audio Button */}
        <div className="w-full flex items-center justify-between pt-1 border-t border-border/40 text-[11px]">
          <span className="text-muted-foreground font-sans font-medium">
            {p.exampleWord}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSpeakPhoneme(p.symbol, p.exampleWord);
            }}
            className="p-1 rounded-lg hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            title="Nghe phát âm chuẩn"
          >
            <Volume2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={cn("space-y-6 select-none", className)}>
      {/* 1. Monophthongs Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 uppercase">
              12 Nguyên Âm Đơn (Monophthongs)
            </span>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">
            Nguyên âm ngắn vs dài
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {IPA_MONOPHTHONGS.map(renderPhonemeTile)}
        </div>
      </div>

      {/* 2. Diphthongs Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 uppercase">
              8 Nguyên Âm Đôi (Diphthongs)
            </span>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">
            Lướt âm (Glide movement)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {IPA_DIPHTHONGS.map(renderPhonemeTile)}
        </div>
      </div>

      {/* 3. Consonants Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase">
              24 Phụ Âm (Consonants)
            </span>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">
            Cặp Vô Thanh 🔵 vs Hữu Thanh 🟠
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {IPA_CONSONANTS.map(renderPhonemeTile)}
        </div>
      </div>
    </div>
  );
}
