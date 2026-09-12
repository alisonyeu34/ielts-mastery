"use client";

import React, { useState } from "react";
import {
  X,
  Zap,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  HelpCircle,
  Award,
} from "lucide-react";
import { ErrorItem } from "@/types/database";
import { ERROR_CATEGORY_DETAILS } from "@/lib/errorBankAnalytics";

interface SingleErrorRetryModalProps {
  error: ErrorItem | null;
  onClose: () => void;
  onSubmitAttempt: (
    errorId: string,
    isCorrect: boolean
  ) => Promise<{ isMastered: boolean; consecutiveSuccesses: number; retryCount: number }>;
}

export function SingleErrorRetryModal({
  error,
  onClose,
  onSubmitAttempt,
}: SingleErrorRetryModalProps) {
  const [userDraft, setUserDraft] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrectAttempt, setIsCorrectAttempt] = useState<boolean | null>(null);
  const [streakResult, setStreakResult] = useState<{
    isMastered: boolean;
    consecutiveSuccesses: number;
    retryCount: number;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!error) return null;

  const meta = ERROR_CATEGORY_DETAILS[error.errorType] || ERROR_CATEGORY_DETAILS.grammar;

  const handleEvaluate = async (isCorrect: boolean) => {
    setIsSubmitting(true);
    try {
      const res = await onSubmitAttempt(error.id, isCorrect);
      setIsCorrectAttempt(isCorrect);
      setStreakResult(res);
      setIsSubmitted(true);
    } catch (e) {
      console.error("Failed to submit attempt:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetModal = () => {
    setUserDraft("");
    setIsSubmitted(false);
    setIsCorrectAttempt(null);
    setStreakResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Zap className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-black text-base text-foreground">
                Luyện Lại Câu Sai Tức Thì
              </h3>
              <p className="text-xs text-muted-foreground">
                Khắc phục theo quy tắc 2 lần liên tiếp • Danh mục: {meta.label}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Question Context & Prompt */}
        <div className="p-4 rounded-2xl bg-secondary/40 border border-border/80 space-y-2">
          <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">
            Ngữ Cảnh Câu Hỏi / Bài Thi:
          </span>
          <p className="text-sm font-semibold text-foreground leading-relaxed">
            {error.questionContext}
          </p>
        </div>

        {/* Previously Recorded Mistake */}
        <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20 text-xs flex items-center gap-2">
          <XCircle className="h-4 w-4 text-rose-500 shrink-0" />
          <div>
            <span className="font-bold text-rose-600 dark:text-rose-400">Lỗi sai trước đó: </span>
            <span className="font-mono text-muted-foreground line-through">
              {error.userWrongAnswer}
            </span>
          </div>
        </div>

        {/* Step 1: Input or Draft Area */}
        {!isSubmitted ? (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">
                Nhập phương án sửa chuẩn học thuật của bạn:
              </label>
              <textarea
                rows={3}
                placeholder="Gõ lại câu hoàn chỉnh hoặc cụm từ chính xác..."
                value={userDraft}
                onChange={(e) => setUserDraft(e.target.value)}
                className="w-full p-3 text-xs sm:text-sm rounded-xl bg-secondary/40 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-mono leading-relaxed"
              />
            </div>

            {/* Self-Check Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-border/60">
              <p className="text-xs text-muted-foreground">
                Đối chiếu với phản xạ chuẩn hoặc bấm bên dưới để kiểm tra:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleEvaluate(true)}
                  className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Tôi Đã Làm Đúng (+1 Streak)</span>
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleEvaluate(false)}
                  className="py-2.5 px-4 rounded-xl bg-secondary hover:bg-secondary/80 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center justify-center gap-2 border border-border transition-colors cursor-pointer"
                >
                  <XCircle className="h-4 w-4" />
                  <span>Vẫn Sai (Reset Streak)</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Step 2: Feedback & Streak Result Screen */
          <div className="space-y-4 animate-in zoom-in-95 duration-200">
            {/* Streak Status Banner */}
            <div
              className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                isCorrectAttempt
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
              }`}
            >
              <div className="flex items-center gap-3">
                {isCorrectAttempt ? (
                  <CheckCircle2 className="h-6 w-6 shrink-0" />
                ) : (
                  <XCircle className="h-6 w-6 shrink-0" />
                )}
                <div>
                  <h4 className="font-black text-sm">
                    {isCorrectAttempt ? "Chính Xác! Tiến Độ Tốt" : "Chưa Chính Xác! Cần Rèn Thêm"}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {streakResult?.isMastered
                      ? "🎉 Xuất sắc! Bạn đã vượt qua trọn vẹn cả 3 vòng FSRS (3 ngày, 7 ngày, 21 ngày) -> ĐÃ HÌNH THÀNH PHẢN XẠ TIỀM THỨC!"
                      : isCorrectAttempt
                      ? "Chính xác! Lỗi đã được đưa vào chu kỳ lặp ngắt quãng FSRS (sẽ kiểm tra lại sau 3, 7 và 21 ngày để khắc phục triệt để thói quen tiếng mẹ đẻ)."
                      : "Chưa chính xác! Chu kỳ FSRS đã được đặt lại (sẽ kích hoạt lại vào ngày mai)."}
                  </p>
                </div>
              </div>

              {streakResult?.isMastered && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600 text-white font-black text-xs font-mono shrink-0 shadow-sm animate-bounce">
                  <Award className="h-4 w-4" /> MASTERED
                </div>
              )}
            </div>

            {/* Answer & Explanation Reveal */}
            <div className="space-y-3 p-4 rounded-2xl bg-secondary/30 border border-border">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                  Đáp Án Chuẩn Xác:
                </span>
                <p className="text-xs sm:text-sm font-mono font-bold text-foreground">
                  {error.correctAnswer}
                </p>
              </div>

              <div className="pt-2 border-t border-border/60">
                <span className="text-[10px] font-mono font-bold text-primary uppercase">
                  Phân Tích Sâu / Bản Chất Bẫy:
                </span>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {error.deepExplanation}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleResetModal}
                className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Thử Lại Lần Nữa
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs shadow-xs transition-transform hover:scale-105 cursor-pointer"
              >
                Hoàn Tất & Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
