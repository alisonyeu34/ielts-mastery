"use client";

import React from "react";
import {
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Send,
  RotateCcw,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { TheoryQuizItem } from "@/data/mockTheoryLessons";
import { cn } from "@/lib/utils";

interface ComprehensionQuizGateProps {
  quizItems: TheoryQuizItem[];
  quizAnswers: Record<string, number>;
  isSubmitted: boolean;
  isPassed: boolean;
  scorePercent: number;
  onSelectAnswer: (qId: string, optIdx: number) => void;
  onSubmit: () => void;
  onRetry: () => void;
  className?: string;
}

export function ComprehensionQuizGate({
  quizItems,
  quizAnswers,
  isSubmitted,
  isPassed,
  scorePercent,
  onSelectAnswer,
  onSubmit,
  onRetry,
  className,
}: ComprehensionQuizGateProps) {
  const answeredCount = Object.keys(quizAnswers).length;

  return (
    <div
      id="theory-comprehension-quiz"
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
              <HelpCircle className="h-4 w-4" />
            </span>
            <span className="text-xs font-black text-primary uppercase tracking-wider">
              Khóa Cổng Tiên Quyết (Comprehension Gatekeeper)
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-foreground">
            Kiểm Tra Độ Hiểu Sâu Lý Thuyết Trước Khi Thực Hành
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Trả lời chính xác tối thiểu 75% số câu hỏi tình huống để mở khóa bài tập vi mô tương ứng.
          </p>
        </div>

        {isSubmitted && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span
              className={cn(
                "text-xs font-mono font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1.5",
                isPassed
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
              )}
            >
              <span>{scorePercent}% / 75% Chuẩn</span>
              {isPassed ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
            </span>
          </div>
        )}
      </div>

      {/* Quiz Questions List */}
      <div className="space-y-5">
        {quizItems.map((q, qIdx) => {
          const userChoice = quizAnswers[q.id];
          const isCorrect = userChoice === q.correctIndex;

          return (
            <div
              key={q.id}
              className="p-4 sm:p-5 rounded-2xl bg-secondary/20 border border-border space-y-3 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[11px] px-2.5 py-0.5 rounded-lg bg-secondary text-foreground border border-border">
                  Câu hỏi {qIdx + 1}/{quizItems.length}
                </span>

                {isSubmitted && (
                  <span
                    className={cn(
                      "font-bold text-[11px] flex items-center gap-1",
                      isCorrect ? "text-emerald-600" : "text-rose-600"
                    )}
                  >
                    {isCorrect ? "✓ Đúng" : "✗ Sai (Đã gom vào Error Bank)"}
                  </span>
                )}
              </div>

              <p className="font-serif font-bold text-foreground text-xs sm:text-sm leading-relaxed">
                {q.question}
              </p>

              {/* Options */}
              <div className="space-y-1.5 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userChoice === optIdx;
                  const isCorrectOpt = optIdx === q.correctIndex;

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => onSelectAnswer(q.id, optIdx)}
                      disabled={isSubmitted}
                      className={cn(
                        "w-full p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2 cursor-pointer",
                        isSubmitted
                          ? isCorrectOpt
                            ? "bg-emerald-500/20 border-emerald-500 font-bold text-emerald-800 dark:text-emerald-300"
                            : isSelected
                            ? "bg-rose-500/20 border-rose-500 font-bold text-rose-800 dark:text-rose-300"
                            : "bg-card border-border/60 text-muted-foreground opacity-60"
                          : isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-xs font-bold"
                          : "bg-card border-border hover:border-primary/50 text-foreground"
                      )}
                    >
                      <span className="leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Post-submit Explanation */}
              {isSubmitted && (
                <div className="p-3 rounded-xl bg-card border border-border text-[11px] text-muted-foreground leading-relaxed">
                  💡 <strong>Giải thích chuyên sâu:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-border/80 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {isSubmitted
            ? isPassed
              ? "🎉 Bạn đã mở khóa thành công Bài tập Luyện tập Vi mô!"
              : "⚠️ Chưa đạt 75%. Hãy rà soát lại các câu sai và thử lại."
            : `Đã trả lời ${answeredCount}/${quizItems.length} câu`}
        </span>

        {!isSubmitted ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={answeredCount < quizItems.length}
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground font-bold text-xs shadow-md shadow-primary/20 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Nộp bài & Kiểm tra độ hiểu</span>
          </button>
        ) : !isPassed ? (
          <button
            type="button"
            onClick={onRetry}
            className="px-5 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Làm lại Quiz</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
