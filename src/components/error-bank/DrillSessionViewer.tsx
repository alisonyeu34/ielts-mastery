"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  Award,
  ArrowRight,
  RotateCcw,
  ShieldAlert,
  Send,
  HelpCircle,
  BookOpen,
  ArrowLeft,
  Flame,
} from "lucide-react";
import { ErrorItem } from "@/types/database";
import { ERROR_CATEGORY_CONFIG } from "@/components/error-bank/ErrorCategoryBreakdown";
import { db } from "@/lib/db";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cleanWord } from "@/lib/diffEngine";
import { cn } from "@/lib/utils";

interface DrillSessionViewerProps {
  unresolvedErrors: ErrorItem[];
  onSessionComplete?: () => void;
  className?: string;
}

export function DrillSessionViewer({
  unresolvedErrors,
  onSessionComplete,
  className,
}: DrillSessionViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [fixedErrorsCount, setFixedErrorsCount] = useState(0);
  const [isSessionFinished, setIsSessionFinished] = useState(false);

  const totalQuestions = unresolvedErrors.length;
  const currentError = unresolvedErrors[currentIndex];

  const config = currentError
    ? ERROR_CATEGORY_CONFIG[currentError.errorType] || ERROR_CATEGORY_CONFIG.grammar
    : null;

  // Handle checking the user's revision
  const handleCheckAnswer = async () => {
    if (!userAnswer.trim() || !currentError) return;

    const uClean = cleanWord(userAnswer);
    const cClean = cleanWord(currentError.correctAnswer);

    // Matching logic: either exact match or contains the core correct phrase
    const matches = uClean === cClean || (cClean.length > 5 && uClean.includes(cClean)) || (uClean.length > 5 && cClean.includes(uClean));

    setIsSubmitted(true);
    setIsCorrect(matches);

    if (matches) {
      setFixedErrorsCount((prev) => prev + 1);
      // Mark as mastered in Dexie DB
      try {
        await db.error_bank.update(currentError.id, {
          mastered: true,
          retryCount: (currentError.retryCount || 0) + 1,
          updatedAt: new Date().toISOString(),
        });
      } catch (err) {
        console.error("Failed to update error bank:", err);
      }
    } else {
      // Just increment retry count
      try {
        await db.error_bank.update(currentError.id, {
          retryCount: (currentError.retryCount || 0) + 1,
          updatedAt: new Date().toISOString(),
        });
      } catch (err) {
        console.error("Failed to update retry count:", err);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserAnswer("");
      setIsSubmitted(false);
      setIsCorrect(false);
    } else {
      setIsSessionFinished(true);
      if (onSessionComplete) onSessionComplete();
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setUserAnswer("");
    setIsSubmitted(false);
    setIsCorrect(false);
    setFixedErrorsCount(0);
    setIsSessionFinished(false);
  };

  // If no errors to drill
  if (totalQuestions === 0) {
    return (
      <div className="max-w-xl mx-auto rounded-3xl border border-emerald-500/30 bg-card p-8 text-center space-y-5 shadow-sm">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Award className="h-8 w-8" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
            Tuyệt vời! Không còn lỗi sai nào chưa khắc phục
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Toàn bộ các lỗi sai trong Ngân Hàng Lỗi Sai đã được bạn sửa chữa và làm chủ hoàn toàn.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/error-bank"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 inline-flex items-center gap-2 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Về Dashboard Ngân Hàng Lỗi</span>
          </Link>
        </div>
      </div>
    );
  }

  // If finished session
  if (isSessionFinished) {
    return (
      <div className="max-w-xl mx-auto rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-card to-emerald-500/[0.03] p-8 text-center space-y-6 shadow-md animate-in fade-in zoom-in-95">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Award className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-foreground">
            Hoàn Thành Phiên Triệt Tiêu Lỗ Hổng Kiến Thức!
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Bạn đã sửa đúng thành công <strong>{fixedErrorsCount} / {totalQuestions} câu sai</strong> trong phiên luyện tập này.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Luyện lại phiên này</span>
          </button>

          <Link
            href="/error-bank"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all"
          >
            <span>Về Ngân Hàng Lỗi Sai</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6 max-w-3xl mx-auto", className)}>
      {/* Session Progress Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-card border border-border shadow-sm">
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-rose-500" />
          <span className="text-xs font-bold text-foreground uppercase tracking-wider">
            Luyện Câu Sai: Câu {currentIndex + 1} / {totalQuestions}
          </span>
        </div>

        <div className="w-full sm:w-64">
          <ProgressBar
            value={((currentIndex + 1) / totalQuestions) * 100}
            size="sm"
            variant="rose"
          />
        </div>
      </div>

      {/* Main Drill Card */}
      <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 space-y-6 shadow-md">
        {/* Category badge */}
        <div className="flex items-center justify-between border-b border-border/80 pb-3.5">
          {config && (
            <span
              className={cn(
                "text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider",
                config.color,
                config.bg,
                config.border
              )}
            >
              {config.label}
            </span>
          )}
          <span className="text-xs text-muted-foreground">
            Lần làm lại thứ <strong>{currentError.retryCount + 1}</strong>
          </span>
        </div>

        {/* Question context */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Ngữ Cảnh Câu Hỏi:
          </span>
          <div className="p-4 rounded-2xl bg-secondary/40 border border-border/60 text-sm sm:text-base font-semibold text-foreground leading-relaxed">
            {currentError.questionContext}
          </div>
        </div>

        {/* Previous wrong reminder */}
        <div className="p-3.5 rounded-xl bg-rose-500/[0.06] border border-rose-500/20 text-xs text-rose-700 dark:text-rose-300">
          ⚠️ <strong>Lỗi sai bạn từng mắc:</strong> <span className="line-through italic">"{currentError.userWrongAnswer}"</span>
        </div>

        {/* Input for user revision */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-foreground block">
            Gõ lại câu hoặc từ chuẩn xác để sửa lỗi:
          </label>
          <div className="relative">
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={isSubmitted}
              placeholder="Gõ đáp án chính xác của bạn vào đây..."
              rows={2}
              className="w-full rounded-2xl border border-border bg-secondary/20 p-3.5 text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 leading-relaxed font-medium resize-none"
            />
          </div>
        </div>

        {/* Action button */}
        {!isSubmitted ? (
          <div className="flex justify-end">
            <button
              type="button"
              disabled={!userAnswer.trim()}
              onClick={handleCheckAnswer}
              className={cn(
                "px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer",
                userAnswer.trim()
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:scale-105"
                  : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
              )}
            >
              <span>Kiểm tra đáp án</span>
              <Send className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Immediate Result Card */}
            <div
              className={cn(
                "p-4 sm:p-5 rounded-2xl border space-y-2",
                isCorrect
                  ? "bg-emerald-500/[0.06] border-emerald-500/30 text-emerald-950 dark:text-emerald-200"
                  : "bg-rose-500/[0.06] border-rose-500/30 text-rose-950 dark:text-rose-200"
              )}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">
                      Chính xác! Bạn đã triệt tiêu hoàn toàn lỗ hổng kiến thức này.
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-rose-500" />
                    <span className="text-rose-600 dark:text-rose-400">
                      Chưa chính xác. Hãy xem phân tích mổ xẻ dưới đây.
                    </span>
                  </>
                )}
              </div>

              <div>
                <span className="text-xs text-muted-foreground">Đáp án chuẩn xác Band 7.5+:</span>
                <p className="text-sm font-bold text-foreground mt-0.5">
                  "{currentError.correctAnswer}"
                </p>
              </div>
            </div>

            {/* Deep Explanation */}
            <div className="p-4 sm:p-5 rounded-2xl bg-indigo-500/[0.04] border border-indigo-500/20 text-xs sm:text-sm space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" /> Mổ xẻ nguyên nhân & cách khắc phục:
              </span>
              <p className="text-foreground/90 leading-relaxed">
                {currentError.deepExplanation}
              </p>
            </div>

            {/* Next Question CTA */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <span>Câu tiếp theo</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
