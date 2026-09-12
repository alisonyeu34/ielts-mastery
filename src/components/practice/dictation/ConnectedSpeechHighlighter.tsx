"use client";

import React, { useState } from "react";
import {
  Volume2,
  Sparkles,
  Zap,
  BookmarkPlus,
  CheckCircle2,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import { PhonemicDetail } from "@/data/mockDictationSentences";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";

interface ConnectedSpeechHighlighterProps {
  phonemicDetails: PhonemicDetail[];
  onOpenGuide: () => void;
  className?: string;
}

export function ConnectedSpeechHighlighter({
  phonemicDetails,
  onOpenGuide,
  className,
}: ConnectedSpeechHighlighterProps) {
  const [savedPhrases, setSavedPhrases] = useState<string[]>([]);

  const handleSaveToVocab = async (detail: PhonemicDetail) => {
    try {
      await db.vocab_matrix.put({
        id: `vocab_cs_${Date.now()}_${detail.id}`,
        word: detail.phrase,
        ipa: detail.ipa,
        meaning: `Hiện tượng âm học: ${detail.typeLabel} - ${detail.explanation}`,
        collocations: [detail.phrase],
        originalContext: detail.acousticTip,
        category: "c1_academic",
        status: "learning",
        stepInterval: 1,
        repetitionCount: 1,
        lapsesCount: 0,
        stability: 1.0,
        difficulty: 5.0,
        nextReviewDate: new Date(Date.now() + 86400000).toISOString(),
        createdAt: new Date().toISOString(),
      });
      setSavedPhrases((prev) => [...prev, detail.id]);
    } catch (e) {
      console.error("Save vocab error:", e);
    }
  };

  const getTypeBadgeStyle = (type: PhonemicDetail["type"]) => {
    switch (type) {
      case "linking":
        return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20";
      case "elision":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "assimilation":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      case "weak_form":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "flap_t":
        return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20";
    }
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-5 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
              Tầng 3 • Soi Âm Vị Học
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-foreground">
            Giải Mã Hiện Tượng Biến Đổi Âm Liên Tục (Connected Speech)
          </h3>
        </div>

        <button
          type="button"
          onClick={onOpenGuide}
          className="px-3.5 py-1.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <BookOpen className="h-3.5 w-3.5 text-primary" />
          <span>Cẩm Nang 4 Hiện Tượng</span>
        </button>
      </div>

      {/* Phonemic Details Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {phonemicDetails.map((detail) => {
          const isSaved = savedPhrases.includes(detail.id);

          return (
            <div
              key={detail.id}
              className="p-5 rounded-2xl bg-secondary/20 border border-border/80 space-y-3 flex flex-col justify-between hover:border-primary/50 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={cn("text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border", getTypeBadgeStyle(detail.type))}>
                    {detail.typeLabel}
                  </span>
                  <span className="font-mono text-xs font-bold text-primary">
                    {detail.ipa}
                  </span>
                </div>

                <h4 className="font-serif font-black text-foreground text-sm">
                  "{detail.phrase}"
                </h4>

                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {detail.explanation}
                </p>

                <p className="text-[10px] text-amber-600 dark:text-amber-400 font-serif italic pt-1 border-t border-border/50">
                  👂 <strong>Mẹo nghe tai:</strong> {detail.acousticTip}
                </p>
              </div>

              {/* Action Save to Vocab FSRS */}
              <div className="pt-2 border-t border-border/60 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleSaveToVocab(detail)}
                  disabled={isSaved}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer",
                    isSaved
                      ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                      : "bg-card hover:bg-secondary border border-border text-foreground shadow-2xs"
                  )}
                >
                  {isSaved ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Đã Lưu FSRS</span>
                    </>
                  ) : (
                    <>
                      <BookmarkPlus className="h-3.5 w-3.5 text-primary" />
                      <span>Lưu Sổ FSRS</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
