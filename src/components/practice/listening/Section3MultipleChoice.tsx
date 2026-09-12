"use client";

import React from "react";
import {
  HelpCircle,
  Sparkles,
  CheckCircle2,
  XCircle,
  Scissors,
  Check,
} from "lucide-react";
import { Section3Task, S3Question } from "@/data/mockListeningS3S4Data";
import { S3QuestionEvaluation } from "@/hooks/useLectureTracker";
import { ConsensusTimelineViewer } from "@/components/practice/listening/ConsensusTimelineViewer";
import { cn } from "@/lib/utils";

interface Section3MultipleChoiceProps {
  task: Section3Task;
  selections: Record<string, string>; // questionId -> optionId
  eliminations: Record<string, string[]>; // questionId -> array of optionIds
  evaluations?: S3QuestionEvaluation[];
  isSubmitted: boolean;
  onSelectOption: (questionId: string, optionId: string) => void;
  onToggleEliminate: (questionId: string, optionId: string) => void;
  className?: string;
}

export function Section3MultipleChoice({
  task,
  selections,
  eliminations,
  evaluations,
  isSubmitted,
  onSelectOption,
  onToggleEliminate,
  className,
}: Section3MultipleChoiceProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="space-y-1.5 border-b border-border/80 pb-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            Listening Section 3: Group Discussion
          </span>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
            Multiple Choice (3 Options)
          </span>
        </div>

        <h3 className="text-base font-extrabold text-foreground">
          {task.title}
        </h3>
        <p className="text-xs text-muted-foreground">
          {task.scenario}
        </p>
      </div>

      {/* Questions list */}
      <div className="space-y-6">
        {task.questions.map((q) => {
          const selectedOptionId = selections[q.id];
          const eliminatedList = eliminations[q.id] || [];
          const evalItem = evaluations?.find((e) => e.questionId === q.id);

          return (
            <div
              key={q.id}
              className={cn(
                "p-5 sm:p-6 rounded-3xl border bg-card shadow-sm space-y-4 transition-all duration-200",
                !isSubmitted && "border-border/80 hover:border-border",
                isSubmitted && evalItem?.isCorrect && "border-emerald-500/40 bg-emerald-500/[0.02]",
                isSubmitted && evalItem && !evalItem.isCorrect && "border-rose-500/40 bg-rose-500/[0.02]"
              )}
            >
              {/* Question Title */}
              <div className="flex items-start gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold mt-0.5">
                  {q.questionNumber}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-foreground leading-snug">
                  {q.prompt}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2.5 pl-0 sm:pl-8">
                {q.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  const isEliminated = eliminatedList.includes(opt.id);
                  const isCorrect = opt.id === q.correctOptionId;

                  return (
                    <div
                      key={opt.id}
                      className={cn(
                        "relative p-3.5 rounded-2xl border transition-all duration-150 flex items-center justify-between gap-3 select-none",
                        // Normal unselected
                        !isSelected && !isEliminated && !isSubmitted && "border-border/70 bg-secondary/20 hover:border-indigo-500/50 hover:bg-secondary/40 cursor-pointer",
                        // Selected
                        isSelected && !isSubmitted && "border-indigo-600 bg-indigo-500/10 ring-2 ring-indigo-500/30 cursor-pointer font-semibold",
                        // Eliminated
                        isEliminated && !isSubmitted && "opacity-40 line-through bg-secondary/10 border-dashed border-border cursor-pointer",
                        // Post-submit correct
                        isSubmitted && isCorrect && "border-emerald-500 bg-emerald-500/15 text-emerald-950 dark:text-emerald-200 font-bold",
                        // Post-submit wrong selection
                        isSubmitted && isSelected && !isCorrect && "border-rose-500 bg-rose-500/15 text-rose-950 dark:text-rose-200 font-bold",
                        // Post-submit unselected incorrect
                        isSubmitted && !isSelected && !isCorrect && "opacity-50 border-border/50"
                      )}
                      onClick={() => !isSubmitted && onSelectOption(q.id, opt.id)}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold border transition-colors",
                            isSelected && !isSubmitted && "bg-indigo-600 text-white border-indigo-600 shadow-sm",
                            !isSelected && !isSubmitted && "bg-secondary text-foreground border-border",
                            isSubmitted && isCorrect && "bg-emerald-600 text-white border-emerald-600",
                            isSubmitted && isSelected && !isCorrect && "bg-rose-600 text-white border-rose-600"
                          )}
                        >
                          {opt.letter}
                        </span>

                        <span className="text-xs sm:text-sm text-foreground">
                          {opt.text}
                        </span>
                      </div>

                      {/* Strikethrough elimination button */}
                      {!isSubmitted && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleEliminate(q.id, opt.id);
                          }}
                          className={cn(
                            "p-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 shrink-0 cursor-pointer border",
                            isEliminated
                              ? "bg-rose-500/20 text-rose-600 border-rose-500/30 font-bold"
                              : "bg-secondary/60 text-muted-foreground border-border/60 hover:text-rose-500 hover:bg-rose-500/10"
                          )}
                          title="Gạch bỏ phương án nhiễu"
                        >
                          <Scissors className="h-3.5 w-3.5" />
                          <span className="text-[10px] hidden sm:inline">
                            {isEliminated ? "Bỏ gạch" : "Gạch nhiễu"}
                          </span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Post-submission Consensus Flow Timeline */}
              {isSubmitted && (
                <div className="pt-2">
                  <ConsensusTimelineViewer
                    question={q}
                    userSelectedOptionId={selectedOptionId}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
