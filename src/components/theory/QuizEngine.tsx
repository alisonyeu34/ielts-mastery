"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  RotateCcw,
  ShieldAlert,
  ArrowRight,
  Award,
} from "lucide-react";
import { QuizQuestion, SkillType, ErrorClassification, ErrorSourceModule } from "@/types/database";
import { useAddError } from "@/hooks/useIeltsDB";
import { cn } from "@/lib/utils";

interface QuizEngineProps {
  lessonId: string;
  lessonTitle: string;
  lessonSkill: SkillType;
  questions: QuizQuestion[];
  onQuizComplete?: (score: number, total: number, passed: boolean) => void;
  className?: string;
}

const OPTION_LETTERS = ["A", "B", "C", "D", "E"];

export function QuizEngine({
  lessonId,
  lessonTitle,
  lessonSkill,
  questions,
  onQuizComplete,
  className,
}: QuizEngineProps) {
  const { addError } = useAddError();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [syncedErrors, setSyncedErrors] = useState<Record<string, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Map skill to ErrorSourceModule & ErrorClassification
  const mapSkillToErrorDetails = (skill: SkillType): { source: ErrorSourceModule; type: ErrorClassification } => {
    switch (skill) {
      case "grammar":
        return { source: "writing", type: "grammar" };
      case "pronunciation":
        return { source: "speaking", type: "pronunciation" };
      case "reading":
        return { source: "reading", type: "paraphrase_trap" };
      case "listening":
        return { source: "listening", type: "careless_reading" };
      case "writing_task1":
      case "writing_task2":
        return { source: "writing", type: "grammar" };
      case "speaking":
        return { source: "speaking", type: "pronunciation" };
      default:
        return { source: "reading", type: "grammar" };
    }
  };

  const handleSelectOption = async (question: QuizQuestion, optionIndex: number) => {
    // If already answered this question, do not allow re-selection
    if (selectedAnswers[question.id] !== undefined) return;

    const newSelected = { ...selectedAnswers, [question.id]: optionIndex };
    setSelectedAnswers(newSelected);

    // Check if wrong
    const isCorrect = optionIndex === question.correctIndex;
    if (!isCorrect && !syncedErrors[question.id]) {
      const { source, type } = mapSkillToErrorDetails(lessonSkill);
      try {
        await addError({
          sourceModule: source,
          errorType: type,
          questionContext: `[Quiz ${lessonTitle}] - ${question.question}`,
          userWrongAnswer: question.options[optionIndex],
          correctAnswer: question.options[question.correctIndex],
          deepExplanation: question.explanation,
        });
        setSyncedErrors((prev) => ({ ...prev, [question.id]: true }));
      } catch (err) {
        console.error("Failed to sync error to error_bank:", err);
      }
    }

    // Check if all questions have been answered
    const answeredCount = Object.keys(newSelected).length;
    if (answeredCount === questions.length) {
      setIsCompleted(true);
      let correctCount = 0;
      questions.forEach((q) => {
        if (newSelected[q.id] === q.correctIndex) {
          correctCount++;
        }
      });
      const passed = correctCount >= Math.ceil(questions.length * 0.6); // 60%+ is pass
      if (onQuizComplete) {
        onQuizComplete(correctCount, questions.length, passed);
      }
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsCompleted(false);
  };

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = questions.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Quiz Header & Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-secondary/30 border border-border">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-500" />
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Quiz Kiểm Tra Độ Hiểu & Bóc Tách Bẫy
            </h3>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Trả lời đúng để củng cố kiến thức. Mọi câu làm sai sẽ tự động được gom vào Ngân Hàng Lỗi Sai.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-foreground">
            Đã làm: {answeredCount}/{totalQuestions} câu
          </span>
          {isCompleted && (
            <button
              type="button"
              onClick={handleResetQuiz}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium hover:bg-secondary transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" /> Làm lại
            </button>
          )}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((question, qIdx) => {
          const userAnswer = selectedAnswers[question.id];
          const isAnswered = userAnswer !== undefined;
          const isUserCorrect = isAnswered && userAnswer === question.correctIndex;
          const isWrong = isAnswered && !isUserCorrect;

          return (
            <div
              key={question.id}
              className={cn(
                "rounded-2xl border p-5 sm:p-6 space-y-4 transition-all",
                isAnswered
                  ? isUserCorrect
                    ? "border-emerald-500/40 bg-emerald-500/[0.02]"
                    : "border-rose-500/40 bg-rose-500/[0.02]"
                  : "border-border bg-card"
              )}
            >
              {/* Question title */}
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-secondary font-bold text-xs text-foreground shrink-0 border border-border">
                  Q{qIdx + 1}
                </span>
                <p className="text-sm font-bold text-foreground leading-relaxed pt-0.5">
                  {question.question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2.5 pt-1">
                {question.options.map((option, optIdx) => {
                  const isSelected = userAnswer === optIdx;
                  const isCorrectOption = optIdx === question.correctIndex;

                  let optionStyle = "border-border/80 bg-secondary/20 hover:bg-secondary/60 text-foreground";
                  let badgeStyle = "bg-secondary text-muted-foreground";

                  if (isAnswered) {
                    if (isCorrectOption) {
                      optionStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500/30";
                      badgeStyle = "bg-emerald-600 text-white";
                    } else if (isSelected && !isCorrectOption) {
                      optionStyle = "border-rose-500 bg-rose-500/10 text-rose-950 dark:text-rose-200 font-semibold ring-1 ring-rose-500/30";
                      badgeStyle = "bg-rose-600 text-white";
                    } else {
                      optionStyle = "opacity-50 border-border bg-secondary/10 text-muted-foreground";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(question, optIdx)}
                      className={cn(
                        "w-full text-left flex items-start gap-3 p-3.5 rounded-xl border transition-all text-xs sm:text-sm select-none",
                        optionStyle,
                        !isAnswered && "cursor-pointer hover:border-primary/50"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold shrink-0 mt-0.5",
                          badgeStyle
                        )}
                      >
                        {OPTION_LETTERS[optIdx]}
                      </span>
                      <span className="flex-1 leading-relaxed">{option}</span>

                      {isAnswered && isCorrectOption && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      )}
                      {isAnswered && isSelected && !isCorrectOption && (
                        <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Detailed Explanation Box on answer */}
              {isAnswered && (
                <div className="space-y-2 pt-2 animate-in fade-in duration-200">
                  <div
                    className={cn(
                      "p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2",
                      isUserCorrect
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-900 dark:text-emerald-300"
                        : "bg-rose-500/10 border-rose-500/20 text-rose-900 dark:text-rose-300"
                    )}
                  >
                    <div className="flex items-center gap-2 font-bold">
                      {isUserCorrect ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          <span>Chính xác! Giải thích chuyên sâu:</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-rose-500" />
                          <span>Chưa chính xác! Vạch trần bẫy đề:</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-foreground/90 font-medium">
                      {question.explanation}
                    </p>
                  </div>

                  {/* Auto error-bank sync badge */}
                  {isWrong && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300">
                      <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                      <span>
                        🛡️ Đã tự động ghi nhận câu sai này vào <strong>Ngân Hàng Lỗi Sai (Error Bank)</strong> để phân tích bẫy và lên lịch khắc phục.
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quiz Completion Summary Card */}
      {isCompleted && (
        <div className="p-6 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/5 via-card to-background text-center space-y-3 shadow-md animate-in fade-in zoom-in-95">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Award className="h-6 w-6" />
          </div>
          <h4 className="text-lg font-bold text-foreground">
            Kết quả Quiz: {correctCount} / {totalQuestions} Câu đúng ({Math.round((correctCount / totalQuestions) * 100)}%)
          </h4>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            {correctCount === totalQuestions
              ? "Xuất sắc! Bạn đã nắm vững 100% bản chất và không rơi vào bất kỳ bẫy khảo thí nào."
              : "Bạn đã hoàn thành bài kiểm tra. Các câu sai đã được lưu vào Error Bank để bạn luyện tập xóa lỗi."}
          </p>
        </div>
      )}
    </div>
  );
}
