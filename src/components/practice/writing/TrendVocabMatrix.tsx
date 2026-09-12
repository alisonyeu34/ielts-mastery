"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  BookmarkPlus,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { TREND_VOCAB_COLLECTION, TrendVocabItem } from "@/data/mockTask1Datasets";
import { db } from "@/lib/db";
import { VocabCard } from "@/types/database";
import { cn } from "@/lib/utils";

export function TrendVocabMatrix({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [savedVocabIds, setSavedVocabIds] = useState<Record<string, boolean>>({});

  const handleSaveToVocabMatrix = async (item: TrendVocabItem) => {
    try {
      const vocabCard: VocabCard = {
        id: `vocab_trend_${item.id}`,
        word: item.verbAdverb,
        ipa: "/.../",
        meaning: item.vietnameseMeaning,
        collocations: [item.adjNoun],
        originalContext: item.exampleSentence,
        category: "c1_academic",
        status: "learning",
        stepInterval: 1,
        nextReviewDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        repetitionCount: 1,
        lapsesCount: 0,
        stability: 2.5,
        difficulty: 3.0,
        createdAt: new Date().toISOString(),
      };

      await db.vocab_matrix.put(vocabCard);
      setSavedVocabIds((prev) => ({ ...prev, [item.id]: true }));
    } catch (err) {
      console.error("Failed to save trend vocab to DB:", err);
    }
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card overflow-hidden shadow-sm transition-all select-none",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-secondary/30 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-2">
              <span>Bảng Cấu Trúc & Từ Vựng Xu Hướng (Trend & Comparison Matrix)</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                Band 7.5+ Lexicon
              </span>
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Biến đổi linh hoạt giữa cấu trúc Động từ + Trạng từ vs Tính từ + Danh từ
            </p>
          </div>
        </div>

        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 sm:p-6 pt-1 space-y-4 border-t border-border/70 text-xs animate-in fade-in duration-150">
          {/* Grammar Formula Comparison Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-indigo-500/[0.04] border border-indigo-500/20 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                Cấu Trúc 1: Động Từ + Trạng Từ (Verb + Adverb)
              </span>
              <p className="font-mono text-xs font-bold text-foreground">
                [Subject] + [Verb] + [Adverb] + from X to Y
              </p>
              <p className="text-[11px] text-muted-foreground italic">
                Ví dụ: Electricity usage increased dramatically from 320 to 490 TWh.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-500/[0.04] border border-purple-500/20 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block">
                Cấu Trúc 2: Tính Từ + Danh Từ (Adj + Noun)
              </span>
              <p className="font-mono text-xs font-bold text-foreground">
                There was a/an + [Adjective] + [Noun] in [Subject] + of X
              </p>
              <p className="text-[11px] text-muted-foreground italic">
                Ví dụ: There was a dramatic increase in electricity usage of 170 TWh.
              </p>
            </div>
          </div>

          {/* Vocab Items Grid */}
          <div className="space-y-2.5">
            {TREND_VOCAB_COLLECTION.map((item) => {
              const isSaved = !!savedVocabIds[item.id];

              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-secondary/30 border border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 text-xs">
                        {item.verbAdverb}
                      </span>
                      <span className="text-muted-foreground">⇄</span>
                      <span className="font-bold text-purple-600 dark:text-purple-400 text-xs">
                        {item.adjNoun}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-semibold">
                        ({item.vietnameseMeaning})
                      </span>
                    </div>

                    <p className="text-[11px] text-foreground/80 italic font-serif">
                      "{item.exampleSentence}"
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSaveToVocabMatrix(item)}
                    disabled={isSaved}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer border shadow-sm",
                      isSaved
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 cursor-default"
                        : "bg-card hover:bg-secondary text-foreground border-border hover:border-indigo-500"
                    )}
                  >
                    {isSaved ? (
                      <>
                        <Check className="h-3 w-3" />
                        <span>Đã lưu vào FSRS</span>
                      </>
                    ) : (
                      <>
                        <BookmarkPlus className="h-3 w-3 text-indigo-500" />
                        <span>Lưu vào FSRS</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
