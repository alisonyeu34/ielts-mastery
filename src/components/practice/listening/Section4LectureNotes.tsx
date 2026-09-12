"use client";

import React from "react";
import {
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Clock,
} from "lucide-react";
import { Section4Task, S4NoteItem, S4NoteSection } from "@/data/mockListeningS3S4Data";
import { S4QuestionEvaluation } from "@/hooks/useLectureTracker";
import { WordLimitBadge } from "@/components/practice/reading/WordLimitBadge";
import { cn } from "@/lib/utils";

interface Section4LectureNotesProps {
  task: Section4Task;
  inputs: Record<string, string>;
  evaluations?: S4QuestionEvaluation[];
  isSubmitted: boolean;
  onInputChange: (questionId: string, value: string) => void;
  className?: string;
}

export function Section4LectureNotes({
  task,
  inputs,
  evaluations,
  isSubmitted,
  onInputChange,
  className,
}: Section4LectureNotesProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="space-y-1.5 border-b border-border/80 pb-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            Listening Section 4: Academic Lecture Notes
          </span>
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
            {task.wordLimitInstruction}
          </span>
        </div>

        <h3 className="text-base font-extrabold text-foreground">
          {task.title}
        </h3>
        <p className="text-xs text-muted-foreground">
          {task.scenario}
        </p>
      </div>

      {/* Hierarchical Lecture Notes Card */}
      <div className="p-5 sm:p-7 rounded-3xl border border-border bg-card shadow-sm space-y-6">
        <div className="border-b border-border/60 pb-3 flex items-center justify-between">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            <span>Lecture Notes: Ancient Mediterranean Hydraulic Networks</span>
          </h4>
          <span className="text-[11px] text-muted-foreground font-semibold">
            {task.questions.length} ô trống
          </span>
        </div>

        {/* Note Sections */}
        <div className="space-y-6">
          {task.noteSections.map((sec, secIdx) => (
            <div key={secIdx} className="space-y-3">
              {/* Section Sub-heading with Signpost header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-border/40 pb-1.5">
                <h5 className="text-xs sm:text-sm font-bold text-foreground">
                  {sec.sectionTitle}
                </h5>
                <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                  {sec.signpostHeader}
                </span>
              </div>

              {/* Bullets & Items */}
              <ul className="space-y-3 pl-4 sm:pl-6 border-l-2 border-indigo-500/20">
                {sec.bulletItems.map((item, itemIdx) => {
                  if (item.type === "text") {
                    return (
                      <li
                        key={itemIdx}
                        className="text-xs text-muted-foreground list-disc list-outside leading-relaxed"
                      >
                        {item.text}
                      </li>
                    );
                  }

                  const q = item.questionData;
                  if (!q) return null;

                  const value = inputs[q.id] || "";
                  const evalItem = evaluations?.find((e) => e.questionId === q.id);

                  return (
                    <li
                      key={q.id}
                      className="text-xs sm:text-sm text-foreground list-disc list-outside leading-loose"
                    >
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-1.5 leading-loose">
                          <span>{q.contextTextBefore}</span>

                          <span className="inline-flex items-center gap-1">
                            <input
                              type="text"
                              value={value}
                              onChange={(e) => onInputChange(q.id, e.target.value)}
                              disabled={isSubmitted}
                              placeholder={`[${q.questionNumber}] ...`}
                              className={cn(
                                "w-32 sm:w-40 px-2.5 py-1 rounded-lg border text-xs sm:text-sm font-sans font-bold text-foreground transition-all duration-150 focus:outline-none focus:ring-2",
                                !isSubmitted && "border-border bg-secondary/40 hover:border-indigo-400/50 focus:border-indigo-600 focus:ring-indigo-500/30",
                                isSubmitted && evalItem?.isCorrect && "border-emerald-500 bg-emerald-500/15 text-emerald-950 dark:text-emerald-200 font-bold",
                                isSubmitted && evalItem && !evalItem.isCorrect && "border-rose-500 bg-rose-500/15 text-rose-950 dark:text-rose-200 font-bold"
                              )}
                            />
                            <WordLimitBadge input={value} maxWords={q.maxWords} />
                          </span>

                          <span>{q.contextTextAfter}</span>
                        </div>

                        {/* Post-submit feedback */}
                        {isSubmitted && evalItem && (
                          <div className="p-3 rounded-xl bg-secondary/30 border border-border/80 text-xs space-y-1 animate-in fade-in duration-150">
                            {evalItem.isCorrect ? (
                              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                <span>Chính xác! Đáp án: "{evalItem.expectedAnswers.join(" / ")}"</span>
                              </div>
                            ) : (
                              <div className="space-y-1 text-rose-600 dark:text-rose-400">
                                <div className="flex items-center gap-1.5 font-bold">
                                  <AlertTriangle className="h-3.5 w-3.5" />
                                  <span>
                                    Chưa chính xác! Bạn điền: "{evalItem.userInput || "(để trống)"}" ➔ Đáp án đúng: "{evalItem.expectedAnswers.join(" / ")}"
                                  </span>
                                </div>
                                <p className="text-[11px] text-muted-foreground">
                                  {evalItem.explanationDetail}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
