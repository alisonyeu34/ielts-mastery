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
  Award,
  Flame,
  Layers,
  Clock,
  BookOpen,
} from "lucide-react";
import { ErrorItem } from "@/types/database";
import { ArenaSessionState } from "@/hooks/useErrorBankSession";
import { ERROR_CATEGORY_DETAILS } from "@/lib/errorBankAnalytics";

interface RemediationArenaModalProps {
  arenaState: ArenaSessionState;
  onClose: () => void;
  onSubmitAnswer: (isCorrect: boolean) => Promise<void>;
  onRestart: () => void;
}

export function RemediationArenaModal({
  arenaState,
  onClose,
  onSubmitAnswer,
  onRestart,
}: RemediationArenaModalProps) {
  const { isOpen, queue, currentIndex, results, isFinished, category } = arenaState;

  const [revealedCurrent, setRevealedCurrent] = useState<boolean>(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const totalQuestions = queue.length;
  const currentItem = queue[currentIndex];
  const progressPct =
    totalQuestions > 0 ? Math.round((currentIndex / totalQuestions) * 100) : 100;

  const meta =
    category !== "all"
      ? ERROR_CATEGORY_DETAILS[category]
      : {
          label: "Đấu Trường Triệt Tiêu Lỗ Hổng Tổng Hợp",
          shortLabel: "Remediation Arena",
          accentHex: "#f43f5e",
          description: "Luyện ngẫu nhiên các câu sai ưu tiên",
        };

  const handleSelectEval = async (isCorrect: boolean) => {
    setSelectedEvaluation(isCorrect);
    setRevealedCurrent(true);
    setIsSubmitting(true);
    try {
      await onSubmitAnswer(isCorrect);
    } catch (e) {
      console.error("Failed to submit arena answer:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    setRevealedCurrent(false);
    setSelectedEvaluation(null);
  };

  // Count newly mastered items from results
  const totalMasteredInSession = results.filter((r) => r.newlyMastered).length;
  const totalCorrectInSession = results.filter((r) => r.isCorrect).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-background/85 backdrop-blur-lg animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-3xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Arena Top Navigation & Progress */}
        <div className="p-4 sm:p-5 border-b border-border/80 bg-secondary/30 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-600 text-white shadow-sm">
              <ShieldAlert className="h-4 w-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-black uppercase px-2 py-0.2 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  Targeted Arena
                </span>
                <h3 className="text-xs sm:text-sm font-black text-foreground truncate">
                  {meta.label}
                </h3>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isFinished && (
              <span className="text-xs font-mono font-bold text-muted-foreground">
                Câu <strong className="text-foreground">{currentIndex + 1}</strong> / {totalQuestions}
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {!isFinished && (
          <div className="h-1.5 w-full bg-secondary shrink-0">
            <div
              className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          {!isFinished && currentItem ? (
            /* Active Question Screen */
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Question Context */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">
                    Đề bài & Ngữ cảnh gốc:
                  </span>
                  <span className="text-[11px] font-mono text-primary font-bold">
                    Nguồn: {currentItem.sourceModule.toUpperCase()}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-secondary/40 border border-border/80 text-sm font-semibold text-foreground leading-relaxed">
                  {currentItem.questionContext}
                </div>
              </div>

              {/* Mistake Reminder */}
              <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20 text-xs flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-rose-500 shrink-0" />
                  <span className="text-muted-foreground font-mono">
                    Lỗi sai trước đây:{" "}
                    <strong className="text-rose-600 dark:text-rose-400 line-through">
                      {currentItem.userWrongAnswer}
                    </strong>
                  </span>
                </div>

                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                  Streak hiện tại: {currentItem.consecutiveSuccesses || 0}/2
                </span>
              </div>

              {/* Step 1: Decision Evaluation */}
              {!revealedCurrent ? (
                <div className="space-y-3 pt-3 border-t border-border/60">
                  <p className="text-xs font-bold text-foreground">
                    Hãy tự giải hoặc nhẩm câu trả lời đúng trong đầu, sau đó đối chiếu:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => handleSelectEval(true)}
                      className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-transform hover:scale-[1.02] cursor-pointer"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Tôi Đã Trả Lời Đúng (+1 Streak)</span>
                    </button>

                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => handleSelectEval(false)}
                      className="py-3 px-4 rounded-xl bg-secondary hover:bg-secondary/80 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center justify-center gap-2 border border-border transition-colors cursor-pointer"
                    >
                      <XCircle className="h-4 w-4" />
                      <span>Tôi Vẫn Chọn Sai (Reset Streak)</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Step 2: Answer & Breakdown Screen */
                <div className="space-y-4 animate-in zoom-in-95 duration-200">
                  <div
                    className={`p-4 rounded-2xl border flex items-center gap-3 ${
                      selectedEvaluation
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                        : "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {selectedEvaluation ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 shrink-0" />
                    )}
                    <div>
                      <p className="font-black text-sm">
                        {selectedEvaluation
                          ? "Ghi nhận 1 lần làm đúng!"
                          : "Đã reset chuỗi liên tiếp về 0 để củng cố lại."}
                      </p>
                    </div>
                  </div>

                  {/* Correct Answer and Explanation */}
                  <div className="space-y-3 p-4 rounded-2xl bg-secondary/30 border border-border">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                        Đáp Án Chuẩn Xác:
                      </span>
                      <p className="text-sm font-mono font-bold text-foreground mt-0.5">
                        {currentItem.correctAnswer}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border/60">
                      <span className="text-[10px] font-mono font-bold text-primary uppercase">
                        Phân Tích Bẫy & Bản Chất Ngữ Pháp:
                      </span>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {currentItem.deepExplanation}
                      </p>
                    </div>
                  </div>

                  {/* Next Question Button */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs flex items-center gap-2 shadow-sm transition-transform hover:scale-105 cursor-pointer"
                    >
                      <span>
                        {currentIndex + 1 < totalQuestions ? "Câu Tiếp Theo" : "Xem Tổng Kết Phiên"}
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Completion Summary Screen */
            <div className="text-center space-y-6 py-4 animate-in zoom-in-95 duration-200 max-w-xl mx-auto">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-white shadow-xl shadow-primary/30 animate-bounce">
                  <Award className="h-8 w-8" />
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                  Hoàn Tất Phiên Luyện Tập Arena
                </span>
                <h3 className="text-2xl font-black text-foreground">
                  Đã Triệt Tiêu Thêm Lỗ Hổng Kiến Thức
                </h3>
                <p className="text-xs text-muted-foreground">
                  Toàn bộ kết quả thử thách và điểm tiến độ đã được cập nhật tự động vào hệ thống.
                </p>
              </div>

              {/* Stats Ribbon */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-secondary/40 border border-border text-center">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    Tổng số câu
                  </span>
                  <p className="text-xl font-black font-mono text-foreground">{results.length}</p>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase">
                    Số câu đúng
                  </span>
                  <p className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                    {totalCorrectInSession}
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-center">
                  <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 uppercase">
                    Mới Mastered
                  </span>
                  <p className="text-xl font-black font-mono text-rose-600 dark:text-rose-400">
                    +{totalMasteredInSession}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={onRestart}
                  className="px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-1.5 border border-border transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Luyện Đợt Khác
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs shadow-xs transition-transform hover:scale-105 cursor-pointer"
                >
                  Về Bảng Điều Khiển
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
