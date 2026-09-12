"use client";

import React, { useEffect } from "react";
import {
  Volume2,
  Sparkles,
  Award,
  ArrowRight,
  RotateCcw,
  Zap,
} from "lucide-react";
import { MinimalPairItem } from "@/data/mockIPAData";
import { cn } from "@/lib/utils";

interface MinimalPairDrillProps {
  currentPair: MinimalPairItem;
  currentIndex: number;
  totalCount: number;
  currentTargetWord: string;
  earScore: number;
  onAnswer: (selectedWord: string) => void;
  onSpeakWord: (word: string) => void;
  className?: string;
}

export function MinimalPairDrill({
  currentPair,
  currentIndex,
  totalCount,
  currentTargetWord,
  earScore,
  onAnswer,
  onSpeakWord,
  className,
}: MinimalPairDrillProps) {
  // Auto-play audio when pair changes
  useEffect(() => {
    if (currentTargetWord) {
      onSpeakWord(currentTargetWord);
    }
  }, [currentTargetWord, currentIndex, onSpeakWord]);

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/70 pb-4">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-primary text-primary-foreground">
            Câu {currentIndex + 1} / {totalCount}
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            Điểm Hiện Tại: <strong className="text-emerald-600">{earScore}</strong>
          </span>
        </div>

        <button
          type="button"
          onClick={() => onSpeakWord(currentTargetWord)}
          className="px-3.5 py-1.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <Volume2 className="h-4 w-4 text-primary" />
          <span>Nghe Lại Từ Mục Tiêu</span>
        </button>
      </div>

      {/* Center Question Prompt */}
      <div className="text-center space-y-2 py-4">
        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/30 uppercase tracking-wider">
          Phân Biệt Cặp Âm /{currentPair.phonemeA}/ vs /{currentPair.phonemeB}/
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-foreground">
          Bạn Vừa Nghe Được Từ Nào Dưới Đây?
        </h3>
        <p className="text-xs text-muted-foreground">
          Click vào thẻ từ tương ứng để kiểm tra phản xạ thính giác của bạn
        </p>
      </div>

      {/* 2 Big Word Choice Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Choice A */}
        <button
          type="button"
          onClick={() => onAnswer(currentPair.wordA)}
          className="p-6 rounded-3xl border border-border bg-secondary/20 hover:bg-primary/10 hover:border-primary/50 transition-all text-center space-y-2 group cursor-pointer shadow-sm hover:scale-105"
        >
          <span className="text-2xl sm:text-3xl font-black font-sans text-foreground group-hover:text-primary transition-colors block">
            {currentPair.wordA}
          </span>
          <span className="font-mono text-sm text-primary font-bold block">
            {currentPair.ipaA}
          </span>
          <span className="text-xs text-muted-foreground block">
            {currentPair.meaningViA}
          </span>
        </button>

        {/* Choice B */}
        <button
          type="button"
          onClick={() => onAnswer(currentPair.wordB)}
          className="p-6 rounded-3xl border border-border bg-secondary/20 hover:bg-primary/10 hover:border-primary/50 transition-all text-center space-y-2 group cursor-pointer shadow-sm hover:scale-105"
        >
          <span className="text-2xl sm:text-3xl font-black font-sans text-foreground group-hover:text-primary transition-colors block">
            {currentPair.wordB}
          </span>
          <span className="font-mono text-sm text-primary font-bold block">
            {currentPair.ipaB}
          </span>
          <span className="text-xs text-muted-foreground block">
            {currentPair.meaningViB}
          </span>
        </button>
      </div>

      {/* Pedagogical Hint */}
      <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border text-[11px] text-muted-foreground flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary shrink-0" />
        <span>
          💡 <strong>Điểm khác biệt cấu âm:</strong> {currentPair.articulatoryDifference}
        </span>
      </div>
    </div>
  );
}
