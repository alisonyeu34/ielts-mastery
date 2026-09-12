"use client";

import React, { useRef } from "react";
import {
  Section4LectureExerciseData,
  S4QuestionItem,
  LectureSectionBlock,
} from "@/data/mockSection4LectureData";
import {
  CheckCircle2,
  XCircle,
  Volume2,
  Send,
  Sparkles,
  HelpCircle,
  FileText,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HierarchicalNoteCanvasProps {
  data: Section4LectureExerciseData;
  answers: Record<number, string>;
  activeSectionIndex: number;
  stage: "predicting" | "listening" | "reviewing";
  selectedQuestionNumber: number;
  onSelectQuestion: (qNum: number) => void;
  onSetAnswer: (qNum: number, word: string) => void;
  onJumpToEvidence: (qNum: number) => void;
  onSubmitAnswers: () => void;
  className?: string;
}

export function HierarchicalNoteCanvas({
  data,
  answers,
  activeSectionIndex,
  stage,
  selectedQuestionNumber,
  onSelectQuestion,
  onSetAnswer,
  onJumpToEvidence,
  onSubmitAnswers,
  className,
}: HierarchicalNoteCanvasProps) {
  const isReviewing = stage === "reviewing";
  const inputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const answeredCount = Object.keys(answers).filter(
    (k) => (answers[Number(k)] || "").trim().length > 0
  ).length;
  const isAllAnswered = answeredCount === data.questions.length;

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    currentQNum: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextQNum = currentQNum + 1;
      if (inputRefs.current[nextQNum]) {
        inputRefs.current[nextQNum]?.focus();
      }
    }
  };

  const getQuestion = (qNum: number): S4QuestionItem => {
    return (
      data.questions.find((q) => q.number === qNum) || data.questions[0]
    );
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Note Header & Instruction */}
      <div className="space-y-2 border-b border-border/70 pb-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
            Questions 31 - 40 • Note Completion
          </span>

          <span className="text-[10px] font-mono font-black text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/20 uppercase">
            {data.wordLimitRule}
          </span>
        </div>

        <h2 className="text-base sm:text-lg font-black text-foreground uppercase tracking-wide">
          {data.topicTitle}
        </h2>
      </div>

      {/* Hierarchical Note Outline Content */}
      <div className="space-y-6">
        {data.sections.map((sec, sIdx) => {
          const isActiveSection = activeSectionIndex === sIdx;

          return (
            <div
              key={sec.sectionIndex}
              className={cn(
                "p-4 sm:p-5 rounded-2xl border transition-all duration-200 space-y-3",
                isActiveSection
                  ? "border-primary/50 bg-primary/[0.02] ring-1 ring-primary/20"
                  : "border-border/60 bg-secondary/10"
              )}
            >
              {/* Section Roman Numeral Heading */}
              <div className="flex items-center justify-between border-b border-border/50 pb-2">
                <h3 className="font-mono font-black text-xs sm:text-sm text-primary flex items-center gap-2">
                  <span>Part {sec.romanNumeral}.</span>
                  <span className="text-foreground">{sec.titleEn}</span>
                </h3>

                <span className="text-[10px] font-mono text-muted-foreground hidden sm:inline">
                  {sec.titleVi}
                </span>
              </div>

              {/* Bullet Points with Fill-in-the-Blank Inputs */}
              <ul className="space-y-3 text-xs sm:text-sm text-foreground/90 pl-2">
                {sec.bullets.map((bullet, bIdx) => {
                  const qNum = bullet.questionNumber;
                  const question = qNum ? getQuestion(qNum) : null;
                  const userAns = qNum ? answers[qNum] || "" : "";

                  const isCorrect =
                    question &&
                    ((userAns.trim().toLowerCase() === question.correctWord.toLowerCase()) ||
                      (question.acceptedAlternates || []).map(a => a.toLowerCase()).includes(userAns.trim().toLowerCase()));

                  return (
                    <li key={bIdx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />

                      <div className="flex-1 flex flex-wrap items-center gap-1.5">
                        <span>{bullet.textPrefix}</span>

                        {qNum && question && (
                          <span className="inline-flex items-center gap-1 my-0.5">
                            <span className="relative inline-flex items-center">
                              <input
                                ref={(el) => {
                                  inputRefs.current[qNum] = el;
                                }}
                                type="text"
                                maxLength={20}
                                disabled={isReviewing}
                                value={userAns}
                                placeholder={`(${qNum})`}
                                onFocus={() => onSelectQuestion(qNum)}
                                onChange={(e) => onSetAnswer(qNum, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, qNum)}
                                className={cn(
                                  "w-28 sm:w-36 px-2.5 py-1 text-xs font-mono font-bold rounded-lg border text-center transition-all focus:outline-none",
                                  userAns
                                    ? "bg-primary/10 border-primary text-foreground"
                                    : "bg-card border-border text-foreground placeholder:text-muted-foreground/60",
                                  isReviewing &&
                                    (isCorrect
                                      ? "bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/30"
                                      : "bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-300 ring-2 ring-rose-500/30")
                                )}
                              />
                            </span>

                            {/* Review Mode Answer Feedback */}
                            {isReviewing && (
                              <div className="inline-flex items-center gap-1 text-[11px] font-mono">
                                {isCorrect ? (
                                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                ) : (
                                  <>
                                    <XCircle className="h-4 w-4 text-rose-600" />
                                    <span className="text-emerald-600 font-bold">
                                      [{question.correctWord}]
                                    </span>
                                  </>
                                )}

                                <button
                                  type="button"
                                  onClick={() => onJumpToEvidence(qNum)}
                                  title="Nghe lại đoạn này"
                                  className="p-1 rounded-md border border-border bg-card hover:bg-primary/10 text-primary transition-colors cursor-pointer"
                                >
                                  <Volume2 className="h-3 w-3" />
                                </button>
                              </div>
                            )}
                          </span>
                        )}

                        {bullet.textSuffix && <span>{bullet.textSuffix}</span>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Submit Action Button */}
      {!isReviewing && (
        <button
          type="button"
          onClick={onSubmitAnswers}
          className={cn(
            "w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer",
            isAllAnswered
              ? "bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-[1.01]"
              : "bg-secondary text-muted-foreground border border-border"
          )}
        >
          <Send className="h-4 w-4" />
          <span>
            {isAllAnswered
              ? "Nộp Bài Ghi Chú Section 4"
              : `Nộp Bài (Đã điền ${answeredCount}/${data.questions.length} từ)`}
          </span>
        </button>
      )}
    </div>
  );
}
