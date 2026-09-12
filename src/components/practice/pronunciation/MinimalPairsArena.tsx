"use client";

import React, { useEffect } from "react";
import {
  Volume2,
  Zap,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Flame,
  Award,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { MinimalPairQuestion } from "@/hooks/useIPAInteractiveSession";
import { playNativeAudio } from "@/lib/phoneticAcousticAnalyzer";

interface MinimalPairsArenaProps {
  questions: MinimalPairQuestion[];
  currentIndex: number;
  selectedOption: string | null;
  isAnswered: boolean;
  score: { correct: number; total: number };
  streak: number;
  onAnswer: (word: string) => void;
  onNext: () => void;
  onClose: () => void;
}

export function MinimalPairsArena({
  questions,
  currentIndex,
  selectedOption,
  isAnswered,
  score,
  streak,
  onAnswer,
  onNext,
  onClose,
}: MinimalPairsArenaProps) {
  const currentQ = questions[currentIndex];

  // Keyboard shortcut listener: Left Arrow for Option A, Right Arrow for Option B, Space/Enter for Next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentQ) return;
      if (!isAnswered) {
        if (e.key === "ArrowLeft") {
          onAnswer(currentQ.wordItem.wordA);
        } else if (e.key === "ArrowRight") {
          onAnswer(currentQ.wordItem.wordB);
        }
      } else {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onNext();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentQ, isAnswered, onAnswer, onNext]);

  if (!currentQ) return null;

  const { pairSet, wordItem, targetWord } = currentQ;
  const isTargetCorrect = selectedOption === targetWord;

  return (
    <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-background p-6 sm:p-8 shadow-xl space-y-6 max-w-2xl mx-auto">
      {/* 1. Header: Progress, Streak & Sound Contrast */}
      <div className="flex items-center justify-between border-b border-border/80 pb-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              Rapid-Fire Arena
            </span>
            <h3 className="text-sm font-black text-foreground">
              {pairSet.contrastName}
            </h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Phím tắt: Bấm <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border text-[10px] font-mono">←</kbd> cho Từ Trái • <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border text-[10px] font-mono">→</kbd> cho Từ Phải
          </p>
        </div>

        {/* Streak & Score */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {streak > 1 && (
            <span className="px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-black flex items-center gap-1 animate-pulse">
              <Flame className="h-3.5 w-3.5 fill-amber-500" /> {streak} Streak
            </span>
          )}
          <span className="px-3 py-1 rounded-xl bg-secondary border border-border font-black text-foreground">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
      </div>

      {/* 2. Audio Replay Button */}
      <div className="text-center space-y-3 py-2">
        <button
          type="button"
          onClick={() => playNativeAudio(targetWord)}
          className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/25 ring-8 ring-primary/10 transition-transform hover:scale-110 active:scale-95 cursor-pointer"
        >
          <Volume2 className="h-10 w-10 animate-bounce" />
        </button>

        <p className="text-xs font-bold text-foreground">
          Bấm để nghe lại từ phát âm (RP British)
        </p>
      </div>

      {/* 3. The 2 Choice Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {/* Option A */}
        <button
          type="button"
          disabled={isAnswered}
          onClick={() => onAnswer(wordItem.wordA)}
          className={`p-5 rounded-3xl border text-center space-y-1.5 transition-all cursor-pointer ${
            !isAnswered
              ? "bg-card hover:bg-secondary/60 hover:border-primary/50 hover:scale-[1.02] border-border shadow-sm"
              : wordItem.wordA === targetWord
              ? "bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-md scale-102"
              : selectedOption === wordItem.wordA
              ? "bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 opacity-80"
              : "opacity-40 border-border bg-card"
          }`}
        >
          <span className="text-[10px] font-mono text-muted-foreground uppercase block font-bold">
            [Phím ← Trái] • /{pairSet.soundA}/
          </span>
          <h4 className="text-xl sm:text-2xl font-black text-foreground font-serif">
            {wordItem.wordA}
          </h4>
          <p className="font-mono text-xs text-muted-foreground">{wordItem.ipaA}</p>
          <p className="text-[11px] text-muted-foreground">{wordItem.meaningA}</p>
        </button>

        {/* Option B */}
        <button
          type="button"
          disabled={isAnswered}
          onClick={() => onAnswer(wordItem.wordB)}
          className={`p-5 rounded-3xl border text-center space-y-1.5 transition-all cursor-pointer ${
            !isAnswered
              ? "bg-card hover:bg-secondary/60 hover:border-primary/50 hover:scale-[1.02] border-border shadow-sm"
              : wordItem.wordB === targetWord
              ? "bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-md scale-102"
              : selectedOption === wordItem.wordB
              ? "bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 opacity-80"
              : "opacity-40 border-border bg-card"
          }`}
        >
          <span className="text-[10px] font-mono text-muted-foreground uppercase block font-bold">
            [Phím → Phải] • /{pairSet.soundB}/
          </span>
          <h4 className="text-xl sm:text-2xl font-black text-foreground font-serif">
            {wordItem.wordB}
          </h4>
          <p className="font-mono text-xs text-muted-foreground">{wordItem.ipaB}</p>
          <p className="text-[11px] text-muted-foreground">{wordItem.meaningB}</p>
        </button>
      </div>

      {/* 4. Feedback & Articulatory Tip Drawer (Appears upon answering) */}
      {isAnswered && (
        <div className="space-y-4 pt-2 animate-in zoom-in-95 duration-200">
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
              isTargetCorrect
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                : "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isTargetCorrect ? (
                <CheckCircle2 className="h-5 w-5 shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 shrink-0" />
              )}
              <span className="text-xs sm:text-sm font-black">
                {isTargetCorrect
                  ? "Chính Xác! Tai nghe âm vị cực nhạy."
                  : `Chưa đúng! Từ vừa phát âm là "${targetWord}". Đã tự động lưu vào Ngân Hàng Lỗi Sai.`}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border/80 text-xs space-y-1">
            <span className="font-bold text-primary text-[10px] font-mono uppercase">
              Mẹo Phân Biệt Khẩu Hình:
            </span>
            <p className="text-muted-foreground leading-relaxed">
              {pairSet.anatomyTip}
            </p>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={onNext}
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs flex items-center gap-2 shadow-md transition-transform hover:scale-105 cursor-pointer"
            >
              <span>{currentIndex + 1 < questions.length ? "Câu Tiếp Theo (Phím Enter)" : "Xem Tổng Kết"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
