"use client";

import React from "react";
import {
  HelpCircle,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Send,
  RotateCcw,
  BookOpen,
  ShieldAlert,
} from "lucide-react";
import { Passage3Question } from "@/data/mockPassage3Data";
import { cn } from "@/lib/utils";

interface Passage3QuestionPaneProps {
  questions: Passage3Question[];
  userAnswers: Record<string, string>;
  isSubmitted: boolean;
  scoreReport: {
    correctCount: number;
    totalQuestions: number;
    accuracy: number;
  };
  onSelectAnswer: (questionId: string, answer: string) => void;
  onSubmit: () => void;
  onReset: () => void;
  className?: string;
}

export function Passage3QuestionPane({
  questions,
  userAnswers,
  isSubmitted,
  scoreReport,
  onSelectAnswer,
  onSubmit,
  onReset,
  className,
}: Passage3QuestionPaneProps) {
  const isAllAnswered = questions.every((q) => !!userAnswers[q.id]);

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-4">
        <div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            Questions 1 - 6
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-foreground mt-1">
            Bóc Tách Quan Điểm & Thái Độ Tác Giả
          </h3>
        </div>

        {isSubmitted && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span
              className={cn(
                "text-xs font-mono font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1.5",
                scoreReport.accuracy >= 70
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
              )}
            >
              <span>
                Đúng: {scoreReport.correctCount}/{scoreReport.totalQuestions} ({scoreReport.accuracy}%)
              </span>
              {scoreReport.accuracy >= 70 && <CheckCircle2 className="h-3.5 w-3.5" />}
            </span>
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q) => {
          const selectedAns = userAnswers[q.id];
          const isCorrect = selectedAns === q.correctAnswer;

          return (
            <div
              key={q.id}
              className={cn(
                "p-4 sm:p-5 rounded-2xl border transition-all space-y-3 text-xs",
                isSubmitted
                  ? isCorrect
                    ? "border-emerald-500/40 bg-emerald-500/[0.02]"
                    : "border-rose-500/40 bg-rose-500/[0.02]"
                  : "border-border bg-secondary/20"
              )}
            >
              {/* Question Number & Text */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
                    Câu {q.questionNumber} • {q.type === "yes_no_not_given" ? "YES / NO / NOT GIVEN" : "TRẮC NGHIỆM"}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Tham chiếu: {q.paragraphReference}
                  </span>
                </div>

                <p className="font-serif font-bold text-foreground text-xs sm:text-sm leading-relaxed">
                  {q.questionText}
                </p>
              </div>

              {/* Options for YES / NO / NOT GIVEN */}
              {q.type === "yes_no_not_given" && (
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {["YES", "NO", "NOT GIVEN"].map((opt) => {
                    const isSelected = selectedAns === opt;
                    const isActualTarget = q.correctAnswer === opt;

                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => !isSubmitted && onSelectAnswer(q.id, opt)}
                        disabled={isSubmitted}
                        className={cn(
                          "py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1",
                          isSelected
                            ? isSubmitted
                              ? isCorrect
                                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                                : "bg-rose-600 text-white border-rose-600 shadow-sm"
                              : "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                            : isSubmitted && isActualTarget
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold"
                            : "bg-card border-border text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Options for Multiple Choice */}
              {q.type === "multiple_choice" && q.options && (
                <div className="space-y-1.5 pt-1">
                  {q.options.map((opt) => {
                    const isSelected = selectedAns === opt.id;
                    const isActualTarget = q.correctAnswer === opt.id;

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => !isSubmitted && onSelectAnswer(q.id, opt.id)}
                        disabled={isSubmitted}
                        className={cn(
                          "w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-start gap-2 cursor-pointer",
                          isSelected
                            ? isSubmitted
                              ? isCorrect
                                ? "bg-emerald-500/20 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold"
                                : "bg-rose-500/20 border-rose-500 text-rose-900 dark:text-rose-200 font-bold"
                              : "bg-indigo-500/10 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-bold"
                            : isSubmitted && isActualTarget
                            ? "bg-emerald-500/15 border-emerald-500/80 text-foreground font-bold"
                            : "bg-card border-border text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <span className="font-mono font-bold">{opt.id}.</span>
                        <span className="leading-snug">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Detailed Examiner Explanation */}
              {isSubmitted && (
                <div className="p-3.5 rounded-xl bg-card border border-border/80 space-y-1 text-[11px] leading-relaxed animate-in fade-in duration-150">
                  {q.trapType === "attribution_confusion" && (
                    <div className="flex items-center gap-1.5 text-rose-600 font-bold pb-0.5">
                      <ShieldAlert className="h-3.5 w-3.5" />
                      <span>Cảnh báo Bẫy Nhầm Lẫn Quan Điểm Trích Dẫn!</span>
                    </div>
                  )}
                  <p className="text-muted-foreground">
                    💡 <strong>Giải thích của giám khảo:</strong> {q.examinerExplanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/80">
        <div className="text-xs text-muted-foreground">
          {!isSubmitted ? "Hãy trả lời đủ 6 câu hỏi để xem phân tích chi tiết" : "Đã hoàn thành kiểm tra Passage 3"}
        </div>

        {!isSubmitted ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={!isAllAnswered}
            className={cn(
              "px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer",
              isAllAnswered
                ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:scale-105"
                : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
            )}
          >
            <Send className="h-3.5 w-3.5" />
            <span>Nộp bài & Phân tích đáp án</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onReset}
            className="px-5 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Làm lại bài này</span>
          </button>
        )}
      </div>
    </div>
  );
}
