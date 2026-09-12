"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Pin,
  Sparkles,
  HelpCircle,
  TableProperties,
  ArrowRight,
  Strikethrough,
} from "lucide-react";
import { ListeningQuestion } from "@/data/mockListeningSplitData";
import { AudioEvidencePinpointer } from "./AudioEvidencePinpointer";
import { cn } from "@/lib/utils";

interface ListeningQuestionsPaneProps {
  questions: ListeningQuestion[];
  answers: Record<string, string>;
  isSubmitted: boolean;
  completedCount: number;
  activeEvidenceQuestionId: string | null;
  onSetAnswer: (questionId: string, value: string) => void;
  onJumpToEvidence: (startTimeSec: number, durationSec?: number, questionId?: string) => void;
  onSubmit: () => void;
  onOpenDistractorDrawer: () => void;
  className?: string;
}

export function ListeningQuestionsPane({
  questions,
  answers,
  isSubmitted,
  completedCount,
  activeEvidenceQuestionId,
  onSetAnswer,
  onJumpToEvidence,
  onSubmit,
  onOpenDistractorDrawer,
  className,
}: ListeningQuestionsPaneProps) {
  // Struck-through options map for eliminating choices: key is `${questionId}_${optionKey}`
  const [struckOptions, setStruckOptions] = useState<Record<string, boolean>>({});

  const toggleStrike = (questionId: string, optionKey: string) => {
    const key = `${questionId}_${optionKey}`;
    setStruckOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const formQuestions = questions.filter((q) => q.type === "form_completion");
  const mcQuestions = questions.filter((q) => q.type === "multiple_choice");

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
          <span className="font-mono text-xs text-muted-foreground">
            IELTS Section 3
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isSubmitted ? (
            <button
              type="button"
              onClick={onOpenDistractorDrawer}
              className="px-3.5 py-1.5 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <TableProperties className="h-3.5 w-3.5 text-primary" />
              <span>Ma Trận Bẫy Khảo Thí</span>
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

      {/* Questions List */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-8">
        {/* ========================================================================= */}
        {/* PART 1: FORM / NOTE COMPLETION (Questions 1 - 5) */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary uppercase">
              Questions 1 - 5 • Note Completion
            </span>
            <p className="text-xs text-muted-foreground leading-normal">
              Complete the notes below. Write <strong>NO MORE THAN TWO WORDS AND/OR A NUMBER</strong> for each answer.
            </p>
          </div>

          <div className="space-y-4">
            {formQuestions.map((q) => {
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

                    <AudioEvidencePinpointer
                      startTimeSec={q.evidenceStartTimeSec}
                      questionNumber={q.number}
                      isActive={activeEvidenceQuestionId === q.id}
                      onJumpToEvidence={(sec) => onJumpToEvidence(sec, 8, q.id)}
                    />
                  </div>

                  {/* Input form */}
                  <div className="pt-1">
                    <input
                      type="text"
                      disabled={isSubmitted}
                      value={currentAns}
                      onChange={(e) => onSetAnswer(q.id, e.target.value)}
                      placeholder="Gõ đáp án vào đây..."
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
                          Đáp án đúng: <strong>{q.correctAnswer}</strong>
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {q.trapExplanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PART 2: MULTIPLE CHOICE (Questions 6 - 10) */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary uppercase">
              Questions 6 - 10 • Multiple Choice
            </span>
            <p className="text-xs text-muted-foreground leading-normal">
              Choose the correct letter, <strong>A, B, or C</strong>.
            </p>
          </div>

          <div className="space-y-4">
            {mcQuestions.map((q) => {
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

                    <AudioEvidencePinpointer
                      startTimeSec={q.evidenceStartTimeSec}
                      questionNumber={q.number}
                      isActive={activeEvidenceQuestionId === q.id}
                      onJumpToEvidence={(sec) => onJumpToEvidence(sec, 8, q.id)}
                    />
                  </div>

                  {/* Multiple Choice Options */}
                  <div className="space-y-2 pt-1">
                    {q.options?.map((opt) => {
                      const isSelected = currentAns === opt.key;
                      const isStruck = struckOptions[`${q.id}_${opt.key}`];

                      return (
                        <div
                          key={opt.key}
                          className="flex items-center gap-1.5"
                        >
                          <button
                            type="button"
                            disabled={isSubmitted}
                            onClick={() => onSetAnswer(q.id, opt.key)}
                            className={cn(
                              "flex-1 p-2.5 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-2 cursor-pointer",
                              isSelected
                                ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                                : "bg-secondary/30 border-border hover:bg-secondary text-foreground",
                              isStruck ? "opacity-40 line-through" : ""
                            )}
                          >
                            <span className="font-mono font-bold">{opt.key}.</span>
                            <span className="leading-snug">{opt.text}</span>
                          </button>

                          {/* Strike button */}
                          {!isSubmitted && (
                            <button
                              type="button"
                              onClick={() => toggleStrike(q.id, opt.key)}
                              className={cn(
                                "p-2 rounded-xl border border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
                                isStruck ? "bg-rose-500/15 text-rose-600 border-rose-500/30" : "bg-card"
                              )}
                              title="Gạch bỏ phương án nhiễu"
                            >
                              <Strikethrough className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
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
                        {q.trapExplanation}
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
