"use client";

import React from "react";
import {
  CheckCircle2,
  XCircle,
  Pin,
  Sparkles,
  HelpCircle,
  TableProperties,
  ArrowRight,
  Clock,
} from "lucide-react";
import { ReadingQuestion } from "@/data/mockReadingPassageData";
import { cn } from "@/lib/utils";

interface QuestionInteractionPaneProps {
  questions: ReadingQuestion[];
  answers: Record<string, string>;
  isSubmitted: boolean;
  timeSpentSeconds: number;
  completedCount: number;
  onSetAnswer: (questionId: string, value: string) => void;
  onPinpointEvidence: (sentenceId: string) => void;
  onSubmit: () => void;
  onOpenParaphraseDrawer: () => void;
  className?: string;
}

export function QuestionInteractionPane({
  questions,
  answers,
  isSubmitted,
  timeSpentSeconds,
  completedCount,
  onSetAnswer,
  onPinpointEvidence,
  onSubmit,
  onOpenParaphraseDrawer,
  className,
}: QuestionInteractionPaneProps) {
  // Format MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`;
  };

  // Group questions by type for neat headers
  const tfngQuestions = questions.filter((q) => q.type === "tfng");
  const matchingQuestions = questions.filter((q) => q.type === "matching_info");
  const summaryQuestions = questions.filter((q) => q.type === "summary_completion");

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-card rounded-3xl border border-border shadow-xs overflow-hidden select-none",
        className
      )}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/80 bg-secondary/20 shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-primary text-primary-foreground">
            {completedCount}/{questions.length} Đã Làm
          </span>
          <span className="font-mono text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-amber-500" />
            {formatTime(timeSpentSeconds)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isSubmitted ? (
            <button
              type="button"
              onClick={onOpenParaphraseDrawer}
              className="px-3.5 py-1.5 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <TableProperties className="h-3.5 w-3.5 text-primary" />
              <span>Ma Trận Paraphrase</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
              className="px-5 py-1.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs shadow-xs transition-all hover:scale-105 cursor-pointer"
            >
              Nộp Bài
            </button>
          )}
        </div>
      </div>

      {/* Questions Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-8">
        {/* ========================================================================= */}
        {/* PART 1: TRUE / FALSE / NOT GIVEN */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary uppercase">
              Questions 1 - 5 • True / False / Not Given
            </span>
            <p className="text-xs text-muted-foreground leading-normal">
              Do the following statements agree with the information given in the text?
            </p>
          </div>

          <div className="space-y-4">
            {tfngQuestions.map((q) => {
              const currentAns = answers[q.id] || "";
              const isCorrect = isSubmitted && currentAns.toUpperCase() === q.correctAnswer;
              const isWrong = isSubmitted && currentAns.length > 0 && !isCorrect;

              return (
                <div
                  key={q.id}
                  className={cn(
                    "p-4 rounded-2xl border transition-colors space-y-3",
                    currentAns ? "border-primary/40 bg-card" : "border-border bg-secondary/[0.08]",
                    isSubmitted && isCorrect ? "border-emerald-500/50 bg-emerald-500/[0.04]" : "",
                    isSubmitted && isWrong ? "border-rose-500/50 bg-rose-500/[0.04]" : ""
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground font-mono font-bold text-xs">
                        {q.number}
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-foreground leading-relaxed">
                        {q.prompt}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onPinpointEvidence(q.evidenceSentenceId)}
                      className="p-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
                      title="Soi câu dẫn chứng trong bài đọc"
                    >
                      <Pin className="h-3.5 w-3.5 text-amber-500" />
                    </button>
                  </div>

                  {/* 3 Radio Pills */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {(["TRUE", "FALSE", "NOT GIVEN"] as const).map((opt) => {
                      const isSelected = currentAns === opt;

                      return (
                        <button
                          key={opt}
                          type="button"
                          disabled={isSubmitted}
                          onClick={() => onSetAnswer(q.id, opt)}
                          className={cn(
                            "py-2 px-1 rounded-xl border text-[11px] font-bold font-mono transition-all cursor-pointer text-center",
                            isSelected
                              ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                              : "bg-secondary/30 border-border hover:bg-secondary text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Post-submission Review */}
                  {isSubmitted && (
                    <div className="pt-2 border-t border-border/60 text-xs space-y-1">
                      <div className="flex items-center gap-1.5">
                        {isCorrect ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        ) : (
                          <XCircle className="h-3.5 w-3.5 text-rose-600" />
                        )}
                        <span className="font-bold font-mono">
                          Đáp án: <strong>{q.correctAnswer}</strong>
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PART 2: MATCHING INFORMATION */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary uppercase">
              Questions 6 - 9 • Matching Information
            </span>
            <p className="text-xs text-muted-foreground leading-normal">
              Which paragraph contains the following information? Choose the correct letter, A-F.
            </p>
          </div>

          <div className="space-y-4">
            {matchingQuestions.map((q) => {
              const currentAns = answers[q.id] || "";
              const isCorrect = isSubmitted && currentAns.toUpperCase() === q.correctAnswer;
              const isWrong = isSubmitted && currentAns.length > 0 && !isCorrect;

              return (
                <div
                  key={q.id}
                  className={cn(
                    "p-4 rounded-2xl border transition-colors space-y-3",
                    currentAns ? "border-primary/40 bg-card" : "border-border bg-secondary/[0.08]",
                    isSubmitted && isCorrect ? "border-emerald-500/50 bg-emerald-500/[0.04]" : "",
                    isSubmitted && isWrong ? "border-rose-500/50 bg-rose-500/[0.04]" : ""
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground font-mono font-bold text-xs">
                        {q.number}
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-foreground leading-relaxed">
                        {q.prompt}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onPinpointEvidence(q.evidenceSentenceId)}
                      className="p-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
                      title="Soi câu dẫn chứng trong bài đọc"
                    >
                      <Pin className="h-3.5 w-3.5 text-amber-500" />
                    </button>
                  </div>

                  {/* Paragraph A-F Selector Buttons */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {(["A", "B", "C", "D", "E", "F"] as const).map((pId) => {
                      const isSelected = currentAns === pId;

                      return (
                        <button
                          key={pId}
                          type="button"
                          disabled={isSubmitted}
                          onClick={() => onSetAnswer(q.id, pId)}
                          className={cn(
                            "h-9 w-9 rounded-xl border text-xs font-bold font-mono transition-all cursor-pointer",
                            isSelected
                              ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                              : "bg-secondary/30 border-border hover:bg-secondary text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {pId}
                        </button>
                      );
                    })}
                  </div>

                  {/* Post-submission Review */}
                  {isSubmitted && (
                    <div className="pt-2 border-t border-border/60 text-xs space-y-1">
                      <div className="flex items-center gap-1.5">
                        {isCorrect ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        ) : (
                          <XCircle className="h-3.5 w-3.5 text-rose-600" />
                        )}
                        <span className="font-bold font-mono">
                          Đoạn đúng: <strong>Paragraph {q.correctAnswer}</strong>
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PART 3: SUMMARY COMPLETION */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary uppercase">
              Questions 10 - 13 • Summary Completion
            </span>
            <p className="text-xs text-muted-foreground leading-normal">
              Complete the summary below. Choose <strong>NO MORE THAN TWO WORDS</strong> from the text for each answer.
            </p>
          </div>

          <div className="space-y-4">
            {summaryQuestions.map((q) => {
              const currentAns = answers[q.id] || "";
              const isCorrect =
                isSubmitted &&
                (currentAns.trim().toLowerCase() === q.correctAnswer.toLowerCase() ||
                  currentAns.trim().toLowerCase().includes(q.correctAnswer.toLowerCase()));
              const isWrong = isSubmitted && currentAns.length > 0 && !isCorrect;

              return (
                <div
                  key={q.id}
                  className={cn(
                    "p-4 rounded-2xl border transition-colors space-y-3",
                    currentAns ? "border-primary/40 bg-card" : "border-border bg-secondary/[0.08]",
                    isSubmitted && isCorrect ? "border-emerald-500/50 bg-emerald-500/[0.04]" : "",
                    isSubmitted && isWrong ? "border-rose-500/50 bg-rose-500/[0.04]" : ""
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground font-mono font-bold text-xs">
                        {q.number}
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-foreground leading-relaxed">
                        {q.prompt}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onPinpointEvidence(q.evidenceSentenceId)}
                      className="p-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
                      title="Soi câu dẫn chứng trong bài đọc"
                    >
                      <Pin className="h-3.5 w-3.5 text-amber-500" />
                    </button>
                  </div>

                  {/* Text Input */}
                  <div className="pt-1">
                    <input
                      type="text"
                      disabled={isSubmitted}
                      value={currentAns}
                      onChange={(e) => onSetAnswer(q.id, e.target.value)}
                      placeholder="Gõ từ khóa vào đây (Tối đa 2 từ)..."
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-card text-xs text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Post-submission Review */}
                  {isSubmitted && (
                    <div className="pt-2 border-t border-border/60 text-xs space-y-1">
                      <div className="flex items-center gap-1.5">
                        {isCorrect ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        ) : (
                          <XCircle className="h-3.5 w-3.5 text-rose-600" />
                        )}
                        <span className="font-bold font-mono">
                          Đáp án: <strong>{q.correctAnswer}</strong>
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
