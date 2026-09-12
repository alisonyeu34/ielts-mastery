"use client";

import React from "react";
import { GatewayQuizQuestion } from "@/data/mockGrammarTheoryData";
import { GatewayEvaluationResult } from "@/lib/theoryGateChecker";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Send,
  Sparkles,
  Lock,
  Unlock,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface GatewayQuizEngineProps {
  questions: GatewayQuizQuestion[];
  userAnswers: Record<number, number>;
  onSelectOption: (questionIndex: number, optionIndex: number) => void;
  isSubmitted: boolean;
  evaluation: GatewayEvaluationResult | null;
  onSubmit: () => void;
  onRetake: () => void;
  onOpenUnlockModal: () => void;
  className?: string;
}

export function GatewayQuizEngine({
  questions,
  userAnswers,
  onSelectOption,
  isSubmitted,
  evaluation,
  onSubmit,
  onRetake,
  onOpenUnlockModal,
  className,
}: GatewayQuizEngineProps) {
  const isPassed = evaluation?.isPassed || false;
  const answeredCount = Object.keys(userAnswers).length;
  const isAllAnswered = answeredCount === questions.length;

  return (
    <div
      id="theory-comprehension-quiz"
      className={cn(
        "p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold shadow-sm">
            <HelpCircle className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400">
              CỔNG KIỂM TRA ĐỘ HIỂU (GATEWAY MASTERY CHECK)
            </span>
            <h2 className="text-lg sm:text-xl font-black text-foreground mt-0.5">
              Đạt Tối Thiểu 80% Để Mở Khóa Bài Tập Thực Hành
            </h2>
          </div>
        </div>

        {/* Score Pill if Submitted */}
        {isSubmitted && evaluation && (
          <div
            className={cn(
              "px-4 py-2 rounded-2xl font-mono text-xs font-black border flex items-center gap-2 self-start sm:self-auto",
              isPassed
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                : "bg-rose-500/10 text-rose-600 border-rose-500/30"
            )}
          >
            {isPassed ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
            <span>
              Điểm: {evaluation.correctCount}/{evaluation.totalQuestions} ({evaluation.scorePercentage}%)
            </span>
          </div>
        )}
      </div>

      {/* Submission Feedback Banner */}
      {isSubmitted && evaluation && (
        <div
          className={cn(
            "p-5 rounded-2xl border space-y-3 text-xs",
            isPassed
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200"
              : "bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-200"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold font-mono text-sm">
              {isPassed ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span>XUẤT SẮC! BẠN ĐÃ VƯỢT QUA CỔNG LÝ THUYẾT (≥80%)</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-5 w-5 text-rose-500" />
                  <span>CHƯA ĐẠT CHỈ TIÊU 80% • CÁC CÂU SAI ĐÃ ĐƯỢC LƯU VÀO ERROR BANK</span>
                </>
              )}
            </div>

            {isPassed ? (
              <button
                type="button"
                onClick={onOpenUnlockModal}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-sm"
              >
                Xem Module Đã Mở Khóa ➔
              </button>
            ) : (
              <button
                type="button"
                onClick={onRetake}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 shadow-sm flex items-center gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Làm Lại Quiz</span>
              </button>
            )}
          </div>

          <p className="leading-relaxed">
            {isPassed
              ? "Bạn đã hoàn toàn nắm vững bản chất ngôn ngữ và cách né tránh bẫy khảo thí. Quyền truy cập vào bài tập thực hành tương ứng ở Module 2 đã được kích hoạt!"
              : "Hệ thống đã tự động gom các câu bạn làm sai vào Sổ Tay Lỗi Sai (Error Bank) kèm giải thích chuyên sâu. Hãy đọc lại phân tích bẫy bên dưới và làm lại để mở khóa thực hành nhé."}
          </p>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const userSelectedOption = userAnswers[qIdx];
          const isCorrect = userSelectedOption === q.correctIndex;

          return (
            <div
              key={q.id}
              className={cn(
                "p-5 rounded-3xl border transition-all space-y-3.5 text-xs",
                isSubmitted
                  ? isCorrect
                    ? "bg-emerald-500/[0.02] border-emerald-500/30"
                    : "bg-rose-500/[0.02] border-rose-500/30"
                  : "bg-card border-border"
              )}
            >
              {/* Question Title */}
              <div className="flex items-start gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-800 text-white font-mono text-xs font-bold shrink-0">
                  {qIdx + 1}
                </span>
                <p className="font-bold text-foreground text-xs sm:text-sm leading-snug">
                  {q.question}
                </p>
              </div>

              {/* Options Grid */}
              <div className="space-y-2 pl-8">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userSelectedOption === optIdx;
                  const isThisCorrectOption = optIdx === q.correctIndex;

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => onSelectOption(qIdx, optIdx)}
                      className={cn(
                        "w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between cursor-pointer",
                        isSubmitted
                          ? isThisCorrectOption
                            ? "bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 border-emerald-500 font-bold"
                            : isSelected
                            ? "bg-rose-500/20 text-rose-800 dark:text-rose-200 border-rose-500 font-bold"
                            : "bg-secondary/30 border-border/60 text-muted-foreground opacity-60"
                          : isSelected
                          ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                          : "bg-card border-border hover:bg-secondary text-foreground"
                      )}
                    >
                      <span>{opt}</span>
                      {isSubmitted && isThisCorrectOption && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      )}
                      {isSubmitted && isSelected && !isThisCorrectOption && (
                        <XCircle className="h-4 w-4 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Trap Explanation on Submission */}
              {isSubmitted && (
                <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border/80 text-[11px] leading-relaxed pl-8 space-y-1">
                  <span className="font-bold text-foreground font-mono uppercase text-[10px] block">
                    💡 Giải mã bẫy khảo thí:
                  </span>
                  <p className="text-muted-foreground">{q.trapExplanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Submit Action */}
      {!isSubmitted && (
        <div className="pt-3 border-t border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="text-muted-foreground font-mono">
            Đã làm: <strong>{answeredCount}</strong>/{questions.length} câu
          </span>

          <button
            type="button"
            onClick={onSubmit}
            disabled={!isAllAnswered}
            className={cn(
              "px-7 py-3 rounded-2xl text-xs font-extrabold text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all",
              isAllAnswered
                ? "bg-purple-600 hover:bg-purple-700 shadow-purple-600/30"
                : "bg-secondary text-muted-foreground cursor-not-allowed opacity-50"
            )}
          >
            <Send className="h-4 w-4" />
            <span>Nộp Bài & Xác Thực Mở Khóa Thực Hành</span>
          </button>
        </div>
      )}
    </div>
  );
}
