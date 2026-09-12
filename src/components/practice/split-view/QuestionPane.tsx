"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Sparkles,
  Send,
  RotateCcw,
  Clock,
  Award,
  BookOpen,
} from "lucide-react";
import { ReadingQuestion } from "@/data/mockReadingPassage";
import { ExplanationDrawer } from "@/components/practice/split-view/ExplanationDrawer";
import { usePracticeLogs, useAddError } from "@/hooks/useIeltsDB";
import { cleanWord } from "@/lib/diffEngine";
import { cn } from "@/lib/utils";

interface QuestionPaneProps {
  questions: ReadingQuestion[];
  materialId: string;
  onScrollToEvidence: (paragraphId: string) => void;
  className?: string;
}

export function QuestionPane({
  questions,
  materialId,
  onScrollToEvidence,
  className,
}: QuestionPaneProps) {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);

  const { addPracticeLog } = usePracticeLogs();
  const { addError } = useAddError();

  const handleSelectOption = (questionId: string, answer: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      const u = cleanWord(userAnswers[q.id] || "");
      const c = cleanWord(q.correctAnswer);
      if (u === c || (c.length > 5 && u.includes(c)) || (u.length > 5 && c.includes(u))) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmit = async () => {
    if (Object.keys(userAnswers).length === 0) return;

    const correctCount = calculateScore();
    const accuracy = Math.round((correctCount / questions.length) * 100);

    setIsSubmitted(true);
    // Open first question's explanation drawer
    if (questions.length > 0) {
      setOpenDrawerId(questions[0].id);
    }

    // 1. Record practice log
    try {
      await addPracticeLog({
        type: "split_reading",
        materialId,
        score: correctCount,
        timeSpentSeconds: 120,
        accuracyPercentage: accuracy,
      });
    } catch (e) {
      console.error("Failed to save practice log:", e);
    }

    // 2. Automatically record mistakes into error_bank
    for (const q of questions) {
      const u = cleanWord(userAnswers[q.id] || "");
      const c = cleanWord(q.correctAnswer);
      const isCorrect = u === c || (c.length > 5 && u.includes(c)) || (u.length > 5 && c.includes(u));

      if (!isCorrect) {
        try {
          await addError({
            sourceModule: "reading",
            errorType: q.type === "true_false_not_given" ? "paraphrase_trap" : "careless_reading",
            questionContext: `[Reading Split-view] - ${q.questionText}`,
            userWrongAnswer: userAnswers[q.id] || "(Chưa điền đáp án)",
            correctAnswer: q.correctAnswer,
            deepExplanation: q.deepExplanation,
          });
        } catch (err) {
          console.error("Failed to save error into bank:", err);
        }
      }
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setOpenDrawerId(null);
  };

  const correctScore = isSubmitted ? calculateScore() : 0;

  return (
    <div className={cn("h-full overflow-y-auto p-5 sm:p-7 space-y-6 bg-card", className)}>
      {/* Question Pane Header */}
      <div className="flex items-center justify-between border-b border-border/80 pb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-indigo-500" />
            Câu Hỏi Luyện Tập ({questions.length} câu)
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Đọc bài bên trái, chọn đáp án và xem mổ xẻ dẫn chứng chi tiết.
          </p>
        </div>

        {isSubmitted && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Đúng {correctScore} / {questions.length} câu
            </span>
          </div>
        )}
      </div>

      {/* Question List */}
      <div className="space-y-6">
        {questions.map((q) => {
          const selectedAns = userAnswers[q.id] || "";
          const isQCorrect =
            cleanWord(selectedAns) === cleanWord(q.correctAnswer) ||
            cleanWord(selectedAns).includes(cleanWord(q.correctAnswer));

          return (
            <div
              key={q.id}
              className={cn(
                "p-5 rounded-2xl border space-y-4 transition-all",
                isSubmitted
                  ? isQCorrect
                    ? "border-emerald-500/40 bg-emerald-500/[0.02]"
                    : "border-rose-500/40 bg-rose-500/[0.02]"
                  : "border-border/80 bg-secondary/10"
              )}
            >
              {/* Question title */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Câu {q.order} • {q.type.replace(/_/g, " ").toUpperCase()}
                  </span>
                  {isSubmitted && (
                    <span className="text-xs font-bold flex items-center gap-1">
                      {isQCorrect ? (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" /> Đúng
                        </span>
                      ) : (
                        <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                          <XCircle className="h-4 w-4" /> Sai
                        </span>
                      )}
                    </span>
                  )}
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-foreground leading-snug">
                  {q.questionText}
                </h4>
              </div>

              {/* Options */}
              {q.options && q.options.length > 0 && (
                <div className="space-y-2">
                  {q.options.map((opt, idx) => {
                    const isSelected = selectedAns === opt;
                    const isCorrectOpt = isSubmitted && cleanWord(opt) === cleanWord(q.correctAnswer);

                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(q.id, opt)}
                        className={cn(
                          "w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 cursor-pointer",
                          isSelected && !isSubmitted
                            ? "border-indigo-600 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-bold"
                            : isCorrectOpt
                            ? "border-emerald-500 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 font-bold ring-1 ring-emerald-500"
                            : isSelected && isSubmitted && !isQCorrect
                            ? "border-rose-500 bg-rose-500/15 text-rose-800 dark:text-rose-200 line-through"
                            : "border-border/70 bg-card hover:bg-secondary text-foreground"
                        )}
                      >
                        <span>{opt}</span>
                        {isCorrectOpt && <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Sentence Completion Input */}
              {q.type === "sentence_completion" && (
                <div className="space-y-2">
                  <input
                    type="text"
                    disabled={isSubmitted}
                    value={selectedAns}
                    onChange={(e) => handleSelectOption(q.id, e.target.value)}
                    placeholder="Gõ từ cần điền (VD: overloads)..."
                    className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
                  />
                </div>
              )}

              {/* Explanation Drawer if submitted */}
              {isSubmitted && (
                <ExplanationDrawer
                  question={q}
                  isOpen={openDrawerId === q.id}
                  onToggle={() =>
                    setOpenDrawerId(openDrawerId === q.id ? null : q.id)
                  }
                  onScrollToEvidence={onScrollToEvidence}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Submit & Reset Actions */}
      <div className="pt-4 border-t border-border/80 flex items-center justify-between gap-3">
        {isSubmitted ? (
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-xs font-bold text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Làm lại bài này</span>
          </button>
        ) : (
          <div />
        )}

        {!isSubmitted && (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={Object.keys(userAnswers).length === 0}
            className={cn(
              "px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md transition-all flex items-center gap-2 cursor-pointer",
              Object.keys(userAnswers).length > 0
                ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30 hover:scale-105"
                : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
            )}
          >
            <span>Nộp bài & Chấm điểm</span>
            <Send className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
