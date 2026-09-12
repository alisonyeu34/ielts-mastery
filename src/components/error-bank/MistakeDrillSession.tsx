"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Award,
} from "lucide-react";
import { ErrorItem } from "@/types/database";
import { ERROR_CATEGORY_METADATA } from "@/lib/errorBankHelpers";
import { DeepExplanationAccordion } from "./DeepExplanationAccordion";
import { MasteryBadgeIndicator } from "./MasteryBadgeIndicator";
import { cn } from "@/lib/utils";

interface MistakeDrillSessionProps {
  queue: ErrorItem[];
  onAttempt: (errorId: string, isCorrect: boolean) => Promise<void>;
  onFinishDrill: () => void;
  className?: string;
}

export function MistakeDrillSession({
  queue,
  onAttempt,
  onFinishDrill,
  className,
}: MistakeDrillSessionProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAttemptText, setUserAttemptText] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [justMastered, setJustMastered] = useState<boolean>(false);

  // Session Results
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [newlyMasteredCount, setNewlyMasteredCount] = useState<number>(0);

  if (queue.length === 0) {
    return (
      <div className="p-8 sm:p-12 text-center rounded-3xl border border-border bg-card max-w-xl mx-auto space-y-5 select-none">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-600 mx-auto">
          <ShieldCheck className="h-8 w-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            Tuyệt Vời! Không Còn Câu Lỗi Nào Tồn Đọng
          </h3>
          <p className="text-xs text-muted-foreground">
            Bạn đã hoàn thành triệt tiêu toàn bộ các lỗ hổng kiến thức trong hàng đợi.
          </p>
        </div>
        <Link
          href="/error-bank"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-xs shadow-xs"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Về Ngân Hàng Lỗi Sai</span>
        </Link>
      </div>
    );
  }

  const currentItem = queue[currentIndex];
  const isLastQuestion = currentIndex === queue.length - 1;
  const categoryMeta =
    ERROR_CATEGORY_METADATA[currentItem.errorType] || ERROR_CATEGORY_METADATA.grammar;

  const handleCheckAnswer = async (manualIsCorrect?: boolean) => {
    if (!userAttemptText.trim() && manualIsCorrect === undefined) return;

    // Determine correctness (either by manual click or exact substring matching)
    const passed =
      manualIsCorrect !== undefined
        ? manualIsCorrect
        : userAttemptText.trim().toLowerCase() === currentItem.correctAnswer.trim().toLowerCase() ||
          currentItem.correctAnswer.toLowerCase().includes(userAttemptText.trim().toLowerCase());

    setIsCorrect(passed);
    setIsChecked(true);

    const willMaster = passed && ((currentItem.fsrsStage || 0) + 1 >= 4);
    if (willMaster) {
      setJustMastered(true);
      setNewlyMasteredCount((p) => p + 1);
    }

    if (passed) {
      setCorrectCount((p) => p + 1);
    } else {
      setWrongCount((p) => p + 1);
    }

    await onAttempt(currentItem.id, passed);
  };

  const handleNextQuestion = () => {
    setUserAttemptText("");
    setIsChecked(false);
    setIsCorrect(null);
    setJustMastered(false);

    if (!isLastQuestion) {
      setCurrentIndex((p) => p + 1);
    } else {
      onFinishDrill();
    }
  };

  return (
    <div className={cn("max-w-3xl mx-auto space-y-6 select-none", className)}>
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-muted-foreground">
            Câu {currentIndex + 1} / {queue.length}
          </span>
          <span
            className={cn(
              "px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider border",
              categoryMeta.badgeColor
            )}
          >
            {categoryMeta.label}
          </span>
        </div>

        <MasteryBadgeIndicator
          mastered={currentItem.mastered}
          consecutiveSuccesses={currentItem.consecutiveSuccesses}
          fsrsStage={currentItem.fsrsStage}
          nextReviewDate={currentItem.nextReviewDate}
        />
      </div>

      {/* Main Question Arena */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
            Bối Cảnh & Câu Hỏi Gốc (Distraction-free):
          </span>
          <div className="p-4 sm:p-5 rounded-2xl bg-secondary/30 border border-border/80 font-serif leading-relaxed text-sm sm:text-base text-foreground font-medium">
            "{currentItem.questionContext}"
          </div>
        </div>

        {/* Answer Input Canvas */}
        {!isChecked ? (
          <div className="space-y-3">
            <label className="font-bold text-xs text-foreground block">
              Nhập phương án sửa chuẩn xác của bạn:
            </label>
            <textarea
              rows={3}
              value={userAttemptText}
              onChange={(e) => setUserAttemptText(e.target.value)}
              placeholder="Gõ lại câu trả lời đúng hoặc phương án sửa..."
              className="w-full p-4 rounded-2xl border border-border bg-secondary/20 text-foreground font-serif text-sm focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed"
            />

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-muted-foreground italic">
                * Không nhìn lại đáp án sai để đảm bảo độ chính xác
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCheckAnswer(false)}
                  className="px-3.5 py-2 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs cursor-pointer"
                >
                  Tôi Chưa Nhớ (Sai)
                </button>

                <button
                  type="button"
                  onClick={() => handleCheckAnswer(true)}
                  disabled={!userAttemptText.trim()}
                  className="px-6 py-2 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-40 text-primary-foreground font-black text-xs shadow-xs transition-all hover:scale-105 cursor-pointer"
                >
                  Kiểm Tra Đáp Án
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Result & Contrast Review */
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Feedback Banner */}
            <div
              className={cn(
                "p-4 sm:p-5 rounded-2xl border text-center space-y-1",
                isCorrect
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300"
              )}
            >
              <div className="flex justify-center">
                {isCorrect ? (
                  <CheckCircle2 className="h-8 w-8 text-emerald-600 animate-bounce" />
                ) : (
                  <XCircle className="h-8 w-8 text-rose-600 animate-shake" />
                )}
              </div>
              <h4 className="font-black text-base sm:text-lg">
                {isCorrect
                  ? justMastered
                    ? "🎉 Xuất Sắc! Bạn Đã Triệt Tiêu Hoàn Toàn Lỗ Hổng Này (2/2)!"
                    : "✓ Chính Xác! Tiến độ tăng lên 1/2 thành công liên tiếp."
                  : "✗ Vẫn Chưa Chuẩn Xác! Tiến độ làm chủ bị reset về 0/2."}
              </h4>
            </div>

            {/* Deep Explanation Accordion */}
            <DeepExplanationAccordion
              userWrongAnswer={currentItem.userWrongAnswer}
              correctAnswer={currentItem.correctAnswer}
              deepExplanation={currentItem.deepExplanation}
              initiallyOpen={true}
            />

            {/* Next Action */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <span>{isLastQuestion ? "Hoàn Tất Phiên Drill" : "Câu Tiếp Theo"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
