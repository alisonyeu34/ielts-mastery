"use client";

import React from "react";
import {
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  RotateCcw,
} from "lucide-react";
import { Section1FormTask, Section1FormField } from "@/data/mockListeningS1S2Data";
import { S1FieldEvaluation } from "@/hooks/useMapNavigation";
import { cn } from "@/lib/utils";

interface Section1FormFillProps {
  task: Section1FormTask;
  inputs: Record<string, string>;
  evaluations?: S1FieldEvaluation[];
  isSubmitted: boolean;
  onInputChange: (fieldId: string, value: string) => void;
  className?: string;
}

export function Section1FormFill({
  task,
  inputs,
  evaluations,
  isSubmitted,
  onInputChange,
  className,
}: Section1FormFillProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Header & Instructions */}
      <div className="space-y-1.5 border-b border-border/80 pb-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            Listening Section 1: Form Completion
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

      {/* Registration Form Card */}
      <div className="p-5 sm:p-7 rounded-3xl border border-border bg-card shadow-sm space-y-5">
        <div className="border-b border-border/60 pb-3 flex items-center justify-between">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            📋 Form: Riverdale Health Club Membership Application
          </h4>
          <span className="text-[11px] text-muted-foreground font-semibold">
            {task.fields.length} mục cần điền
          </span>
        </div>

        <div className="space-y-4">
          {task.fields.map((field) => {
            const value = inputs[field.id] || "";
            const evalItem = evaluations?.find((e) => e.fieldId === field.id);

            return (
              <div
                key={field.id}
                className={cn(
                  "p-4 rounded-2xl border transition-all duration-200 space-y-2.5",
                  !isSubmitted && "border-border/80 bg-secondary/20 hover:border-border",
                  isSubmitted && evalItem?.isCorrect && "border-emerald-500/40 bg-emerald-500/[0.02]",
                  isSubmitted && evalItem && !evalItem.isCorrect && "border-rose-500/40 bg-rose-500/[0.02]"
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-[11px]">
                      {field.fieldNumber}
                    </span>
                    <span>{field.label}:</span>
                  </label>

                  <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Xuất hiện lúc ~{field.audioTimestamp}
                  </span>
                </div>

                <input
                  type="text"
                  value={value}
                  onChange={(e) => onInputChange(field.id, e.target.value)}
                  disabled={isSubmitted}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs sm:text-sm text-foreground font-semibold placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />

                {/* Post-submission Detailed Feedback */}
                {isSubmitted && evalItem && (
                  <div className="pt-2 border-t border-border/60 text-xs space-y-1.5 animate-in fade-in duration-150">
                    {evalItem.isCorrect ? (
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Chính xác! Đáp án: "{evalItem.expectedAnswers.join(" / ")}"</span>
                      </div>
                    ) : (
                      <div className="space-y-1.5 text-rose-600 dark:text-rose-400">
                        <div className="flex items-center gap-1.5 font-bold">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          <span>
                            Chưa chính xác! Bạn điền: "{evalItem.userInput || "(để trống)"}" ➔ Đáp án đúng: "{evalItem.expectedAnswers.join(" / ")}"
                          </span>
                        </div>

                        {/* Trap explanation */}
                        <div className="p-2.5 rounded-xl bg-card border border-border/80 text-[11px] text-muted-foreground space-y-1">
                          <span className="font-bold text-indigo-600 dark:text-indigo-400 block">
                            🎯 {evalItem.trapTitleVi}
                          </span>
                          <p>{evalItem.trapExplanation}</p>

                          <div className="p-2 rounded-lg bg-secondary/50 font-serif text-[11px] text-foreground/90 mt-1">
                            <p><strong>Speaker 1:</strong> "{evalItem.dialogueSnippet.speaker1}"</p>
                            <p><strong>Speaker 2:</strong> "{evalItem.dialogueSnippet.speaker2}"</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
