"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Volume2,
  VolumeX,
  BookmarkPlus,
  CheckCircle2,
  Layers,
  Award,
} from "lucide-react";
import { SpeakingCollocation } from "@/data/mockSpeakingFeedbackData";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";

interface SpeakingModelAnswerCardProps {
  modelAnswer: string;
  modelCollocations: SpeakingCollocation[];
  className?: string;
}

export function SpeakingModelAnswerCard({
  modelAnswer,
  modelCollocations,
  className,
}: SpeakingModelAnswerCardProps) {
  const [isPlayingTTS, setIsPlayingTTS] = useState<boolean>(false);
  const [savedCollocationPhrases, setSavedCollocationPhrases] = useState<string[]>([]);

  const handleToggleTTS = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPlayingTTS) {
      window.speechSynthesis.cancel();
      setIsPlayingTTS(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(modelAnswer);
      utterance.lang = "en-GB";
      utterance.rate = 0.92;
      utterance.onend = () => setIsPlayingTTS(false);
      utterance.onerror = () => setIsPlayingTTS(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingTTS(true);
    }
  };

  const handleSaveCollocation = async (item: SpeakingCollocation) => {
    try {
      await db.vocab_matrix.put({
        id: `vocab_spk_${Date.now()}_${item.phrase.substring(0, 8)}`,
        word: item.phrase,
        ipa: item.ipa,
        meaning: item.meaningVi,
        collocations: [item.phrase],
        originalContext: item.contextSentence,
        category: "c1_academic",
        status: "new",
        stepInterval: 1,
        repetitionCount: 0,
        lapsesCount: 0,
        stability: 1.0,
        difficulty: 5.0,
        nextReviewDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });
      setSavedCollocationPhrases((prev) => [...prev, item.phrase]);
    } catch (e) {
      console.error("Save speaking collocation failed:", e);
    }
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6 select-none animate-in fade-in duration-200",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
            <Award className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-foreground">
              Bài Nói Mẫu Chuẩn Khảo Thí (Band 8.5+ Model Response)
            </h4>
            <span className="text-[10px] font-mono text-muted-foreground">
              Ứng dụng cấu trúc rào đón (Hedging) & Cụm từ C1 tự nhiên
            </span>
          </div>
        </div>

        {/* TTS Play Button */}
        <button
          type="button"
          onClick={handleToggleTTS}
          className={cn(
            "px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs self-start sm:self-auto",
            isPlayingTTS
              ? "bg-rose-600 text-white animate-pulse"
              : "bg-primary hover:bg-primary/90 text-primary-foreground"
          )}
        >
          {isPlayingTTS ? (
            <>
              <VolumeX className="h-3.5 w-3.5" />
              <span>Dừng Phát Âm</span>
            </>
          ) : (
            <>
              <Volume2 className="h-3.5 w-3.5" />
              <span>Nghe Bài Mẫu (TTS)</span>
            </>
          )}
        </button>
      </div>

      {/* Model Answer Body */}
      <div className="p-5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 font-serif text-sm sm:text-base leading-loose text-foreground">
        "{modelAnswer}"
      </div>

      {/* 4 High-Band Collocations */}
      <div className="space-y-3 text-xs">
        <span className="font-mono font-bold text-[10px] text-muted-foreground uppercase block">
          4 Cụm Collocations C1 Học Thuật Nên Bỏ Túi:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {modelCollocations.map((col, idx) => {
            const isSaved = savedCollocationPhrases.includes(col.phrase);

            return (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-secondary/30 border border-border/80 flex flex-col justify-between space-y-2"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-foreground text-xs sm:text-sm">
                      {col.phrase}
                    </span>
                    <span className="font-mono text-[10px] text-primary">
                      {col.ipa}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {col.meaningVi}
                  </p>
                </div>

                <div className="pt-2 border-t border-border/50 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleSaveCollocation(col)}
                    disabled={isSaved}
                    className={cn(
                      "px-3 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1.5 transition-all cursor-pointer",
                      isSaved
                        ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                        : "bg-card hover:bg-secondary text-foreground border border-border"
                    )}
                  >
                    {isSaved ? (
                      <>
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        <span>Đã Lưu FSRS</span>
                      </>
                    ) : (
                      <>
                        <BookmarkPlus className="h-3 w-3 text-primary" />
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
    </div>
  );
}
