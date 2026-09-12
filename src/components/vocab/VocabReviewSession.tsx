"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Brain,
  CheckCircle2,
  Award,
  Sparkles,
  RotateCcw,
  Layers,
  ArrowRight,
  TrendingUp,
  Clock,
  PlusCircle,
} from "lucide-react";
import { VocabCard } from "@/types/database";
import { FlashcardViewer } from "@/components/vocab/FlashcardViewer";
import { calculateNextReview, FSRSRating } from "@/lib/spacedRepetition";
import { db } from "@/lib/db";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

interface VocabReviewSessionProps {
  dueCards: VocabCard[];
  onSessionComplete?: () => void;
  onOpenAddModal?: () => void;
  className?: string;
}

export function VocabReviewSession({
  dueCards,
  onSessionComplete,
  onOpenAddModal,
  className,
}: VocabReviewSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionRatings, setSessionRatings] = useState<Record<FSRSRating, number>>({
    again: 0,
    hard: 0,
    good: 0,
    easy: 0,
  });
  const [isSessionFinished, setIsSessionFinished] = useState(false);

  const totalCards = dueCards.length;
  const currentCard = dueCards[currentIndex];

  const handleRate = async (rating: FSRSRating) => {
    if (!currentCard) return;

    const calc = calculateNextReview(currentCard, rating);

    try {
      await db.vocab_matrix.update(currentCard.id, {
        status: calc.status,
        stepInterval: calc.nextStep,
        nextReviewDate: calc.nextReviewDate,
        repetitionCount: calc.repetitionCount,
        lapsesCount: calc.lapsesCount,
        stability: calc.stability,
        difficulty: calc.difficulty,
        lastReviewedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Failed to update card spaced repetition:", err);
    }

    setSessionRatings((prev) => ({ ...prev, [rating]: prev[rating] + 1 }));
    setIsFlipped(false);

    if (currentIndex < totalCards - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsSessionFinished(true);
      if (onSessionComplete) onSessionComplete();
    }
  };

  const handleResetSession = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionFinished(false);
    setSessionRatings({ again: 0, hard: 0, good: 0, easy: 0 });
  };

  // If no due cards
  if (totalCards === 0) {
    return (
      <div className="max-w-xl mx-auto rounded-3xl border border-emerald-500/30 bg-card p-8 text-center space-y-5 shadow-sm">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Award className="h-8 w-8" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
            Tuyệt vời! Không còn từ vựng nào cần ôn hôm nay
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Bộ nhớ của bạn đang ở trạng thái tối ưu theo thuật toán FSRS. Các từ vựng sẽ tự động xuất hiện lại vào đúng điểm rơi trí nhớ tiếp theo.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {onOpenAddModal && (
            <button
              type="button"
              onClick={onOpenAddModal}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Thêm từ vựng mới</span>
            </button>
          )}

          <Link
            href="/practice/dictation"
            className="px-4 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs flex items-center gap-2 transition-colors"
          >
            <span>Luyện Chép chính tả ➔</span>
          </Link>
        </div>
      </div>
    );
  }

  // If finished session
  if (isSessionFinished) {
    const totalReviewed =
      sessionRatings.again + sessionRatings.hard + sessionRatings.good + sessionRatings.easy;

    return (
      <div className="max-w-xl mx-auto rounded-3xl border border-purple-500/30 bg-gradient-to-b from-card to-purple-500/[0.03] p-8 text-center space-y-6 shadow-md animate-in fade-in zoom-in-95">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
          <Award className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-foreground">
            Hoàn Thành Phiên Ôn Tập FSRS!
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Bạn vừa củng cố thành công <strong>{totalReviewed} từ vựng học thuật</strong>.
          </p>
        </div>

        {/* Breakdown of Ratings */}
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center">
            <span className="text-[10px] uppercase font-bold text-rose-500">Again</span>
            <div className="text-lg font-extrabold text-rose-600 dark:text-rose-400 mt-0.5">
              {sessionRatings.again}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
            <span className="text-[10px] uppercase font-bold text-amber-500">Hard</span>
            <div className="text-lg font-extrabold text-amber-600 dark:text-amber-400 mt-0.5">
              {sessionRatings.hard}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
            <span className="text-[10px] uppercase font-bold text-blue-500">Good</span>
            <div className="text-lg font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">
              {sessionRatings.good}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-500">Easy</span>
            <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {sessionRatings.easy}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleResetSession}
            className="px-4 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Ôn tập lại phiên này</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Session Header & Stepper */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-card border border-border shadow-sm">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-purple-500" />
          <span className="text-xs font-bold text-foreground uppercase tracking-wider">
            Phiên Ôn Tập: Thẻ {currentIndex + 1} / {totalCards}
          </span>
        </div>

        <div className="w-full sm:w-64">
          <ProgressBar
            value={((currentIndex + 1) / totalCards) * 100}
            size="sm"
            variant="primary"
          />
        </div>
      </div>

      {/* 3D Flashcard Viewer */}
      {currentCard && (
        <FlashcardViewer
          card={currentCard}
          isFlipped={isFlipped}
          onToggleFlip={() => setIsFlipped(!isFlipped)}
          onRate={handleRate}
        />
      )}
    </div>
  );
}
