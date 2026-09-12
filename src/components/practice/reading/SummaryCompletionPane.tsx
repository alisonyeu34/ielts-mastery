"use client";

import React from "react";
import {
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Eye,
} from "lucide-react";
import { SummaryCompletionTask, CompletionQuestion } from "@/data/mockCompletionPassages";
import { WordLimitBadge } from "@/components/practice/reading/WordLimitBadge";
import { QuestionEvaluation } from "@/hooks/useCompletionValidator";
import { cn } from "@/lib/utils";

interface SummaryCompletionPaneProps {
  task: SummaryCompletionTask;
  inputs: Record<string, string>;
  activeQuestionId: string | null;
  evaluations?: QuestionEvaluation[];
  isSubmitted: boolean;
  onInputChange: (questionId: string, value: string) => void;
  onSelectQuestion: (questionId: string) => void;
  onHighlightEvidence: (quote: string, paragraphId: string) => void;
  className?: string;
}

export function SummaryCompletionPane({
  task,
  inputs,
  activeQuestionId,
  evaluations,
  isSubmitted,
  onInputChange,
  onSelectQuestion,
  onHighlightEvidence,
  className,
}: SummaryCompletionPaneProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Header & Word Limit Instructions */}
      <div className="space-y-1.5 border-b border-border/80 pb-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            Summary Completion
          </span>
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
            {task.wordLimitInstruction}
          </span>
        </div>

        <h3 className="text-base font-extrabold text-foreground">
          {task.summaryTitle}
        </h3>
        <p className="text-xs text-muted-foreground">
          Đọc kỹ đoạn tóm tắt bên dưới và điền từ thích hợp vào từng ô trống từ 1 đến {task.questions.length}.
        </p>
      </div>

      {/* Summary Text Card with Embedded Inputs */}
      <div className="p-5 sm:p-7 rounded-3xl border border-border bg-card shadow-sm space-y-6 leading-loose text-xs sm:text-sm font-serif">
        <p className="text-foreground/90 leading-loose sm:leading-loose">
          Modern photovoltaic modules convert solar photons into electricity utilizing high-purity{" "}
          <span className="inline-block align-middle my-1">
            <InlineBlankInput
              question={task.questions[0]}
              value={inputs[task.questions[0].id] || ""}
              evaluation={evaluations?.find((e) => e.questionId === task.questions[0].id)}
              isActive={activeQuestionId === task.questions[0].id}
              isSubmitted={isSubmitted}
              onChange={(val) => onInputChange(task.questions[0].id, val)}
              onFocus={() => onSelectQuestion(task.questions[0].id)}
            />
          </span>
          . During the manufacturing process, molten silicon is sliced into micro-thin{" "}
          <span className="inline-block align-middle my-1">
            <InlineBlankInput
              question={task.questions[1]}
              value={inputs[task.questions[1].id] || ""}
              evaluation={evaluations?.find((e) => e.questionId === task.questions[1].id)}
              isActive={activeQuestionId === task.questions[1].id}
              isSubmitted={isSubmitted}
              onChange={(val) => onInputChange(task.questions[1].id, val)}
              onFocus={() => onSelectQuestion(task.questions[1].id)}
            />
          </span>{" "}
          which receive an anti-reflective coating to maximize photon capture. When incident sunlight penetrates the cell matrix, it excites subatomic particles within the{" "}
          <span className="inline-block align-middle my-1">
            <InlineBlankInput
              question={task.questions[2]}
              value={inputs[task.questions[2].id] || ""}
              evaluation={evaluations?.find((e) => e.questionId === task.questions[2].id)}
              isActive={activeQuestionId === task.questions[2].id}
              isSubmitted={isSubmitted}
              onChange={(val) => onInputChange(task.questions[2].id, val)}
              onFocus={() => onSelectQuestion(task.questions[2].id)}
            />
          </span>
          , thereby generating a continuous direct current. However, atmospheric{" "}
          <span className="inline-block align-middle my-1">
            <InlineBlankInput
              question={task.questions[3]}
              value={inputs[task.questions[3].id] || ""}
              evaluation={evaluations?.find((e) => e.questionId === task.questions[3].id)}
              isActive={activeQuestionId === task.questions[3].id}
              isSubmitted={isSubmitted}
              onChange={(val) => onInputChange(task.questions[3].id, val)}
              onFocus={() => onSelectQuestion(task.questions[3].id)}
            />
          </span>{" "}
          can accumulate on the protective glass exterior, significantly degrading overall operational efficiency. Consequently, engineers are deploying automated{" "}
          <span className="inline-block align-middle my-1">
            <InlineBlankInput
              question={task.questions[4]}
              value={inputs[task.questions[4].id] || ""}
              evaluation={evaluations?.find((e) => e.questionId === task.questions[4].id)}
              isActive={activeQuestionId === task.questions[4].id}
              isSubmitted={isSubmitted}
              onChange={(val) => onInputChange(task.questions[4].id, val)}
              onFocus={() => onSelectQuestion(task.questions[4].id)}
            />
          </span>{" "}
          to preserve optimal energy output throughout long-term field deployment.
        </p>
      </div>

      {/* Questions Detailed List & Evidence Anchors */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5 text-indigo-500" />
          Danh sách ô trống & Gợi ý từ loại:
        </h4>

        <div className="space-y-3">
          {task.questions.map((q) => {
            const evalItem = evaluations?.find((e) => e.questionId === q.id);
            const value = inputs[q.id] || "";

            return (
              <div
                key={q.id}
                className={cn(
                  "p-4 rounded-2xl border bg-card transition-all duration-200 space-y-2",
                  activeQuestionId === q.id && !isSubmitted && "border-indigo-600 ring-2 ring-indigo-500/20",
                  !isSubmitted && activeQuestionId !== q.id && "border-border/80",
                  isSubmitted && evalItem?.isCorrect && "border-emerald-500/40 bg-emerald-500/[0.02]",
                  isSubmitted && evalItem && !evalItem.isCorrect && "border-rose-500/40 bg-rose-500/[0.02]"
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                      Ô trống [{q.questionNumber}]
                    </span>
                    <span className="text-[11px] font-semibold text-muted-foreground">
                      Gợi ý: {q.posHintVi}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <WordLimitBadge input={value} maxWords={q.maxWords} />
                    <button
                      type="button"
                      onClick={() => onHighlightEvidence(q.evidenceQuote, q.evidenceParagraphId)}
                      className="text-[11px] font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary/50 border border-border/60 hover:bg-secondary cursor-pointer"
                    >
                      <Eye className="h-3 w-3 text-indigo-500" />
                      <span>Xem đoạn {q.evidenceParagraphId}</span>
                    </button>
                  </div>
                </div>

                {/* Post-submit detailed explanation */}
                {isSubmitted && evalItem && (
                  <div className="pt-2 border-t border-border/60 text-xs space-y-1.5 animate-in fade-in duration-150">
                    {evalItem.isCorrect ? (
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span>Chính xác! Đáp án đúng: "{evalItem.expectedAnswers.join(" / ")}"</span>
                      </div>
                    ) : (
                      <div className="space-y-1.5 text-rose-600 dark:text-rose-400">
                        <div className="flex items-center gap-1.5 font-bold">
                          <AlertTriangle className="h-4 w-4 shrink-0" />
                          <span>
                            Chưa chính xác! Bạn điền: "{evalItem.userInput || "(để trống)"}" ➔ Đáp án đúng: "{evalItem.expectedAnswers.join(" / ")}"
                          </span>
                        </div>

                        {evalItem.isWordLimitExceeded && (
                          <div className="p-2 rounded-lg bg-rose-500/10 text-[11px] font-bold">
                            ⚠️ Vi phạm giới hạn từ: Đề bài yêu cầu tối đa {evalItem.maxWordsAllowed} từ nhưng bạn đã điền {evalItem.wordCount} từ.
                          </div>
                        )}

                        {evalItem.isSingularPluralMismatch && (
                          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[11px] font-bold">
                            ⚠️ Bẫy số ít / số nhiều: {q.singularPluralNote || "Sai đuôi -s/-es của danh từ."}
                          </div>
                        )}

                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          💡 {evalItem.explanationDetail}
                        </p>
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

interface InlineBlankInputProps {
  question: CompletionQuestion;
  value: string;
  evaluation?: QuestionEvaluation;
  isActive: boolean;
  isSubmitted: boolean;
  onChange: (val: string) => void;
  onFocus: () => void;
}

function InlineBlankInput({
  question,
  value,
  evaluation,
  isActive,
  isSubmitted,
  onChange,
  onFocus,
}: InlineBlankInputProps) {
  return (
    <span className="relative inline-flex items-center mx-1">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        disabled={isSubmitted}
        placeholder={`[${question.questionNumber}] ...`}
        className={cn(
          "w-36 sm:w-44 px-2.5 py-1 rounded-lg border text-xs sm:text-sm font-sans font-bold text-foreground transition-all duration-150 focus:outline-none focus:ring-2",
          !isSubmitted && isActive && "border-indigo-600 ring-2 ring-indigo-500/30 bg-card",
          !isSubmitted && !isActive && "border-border bg-secondary/50 hover:border-indigo-400/50",
          isSubmitted && evaluation?.isCorrect && "border-emerald-500 bg-emerald-500/15 text-emerald-950 dark:text-emerald-200 font-bold",
          isSubmitted && evaluation && !evaluation.isCorrect && "border-rose-500 bg-rose-500/15 text-rose-950 dark:text-rose-200 font-bold"
        )}
      />
    </span>
  );
}
