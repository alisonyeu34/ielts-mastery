"use client";

import React from "react";
import {
  S3MultipleChoiceQuestion,
  S3MatchingQuestion,
} from "@/data/mockSection3ConsensusData";
import {
  CheckCircle2,
  XCircle,
  Volume2,
  Sparkles,
  Send,
  HelpCircle,
  ShieldAlert,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface S3QuestionInteractionPaneProps {
  mcQuestions: S3MultipleChoiceQuestion[];
  matchingQuestions: S3MatchingQuestion[];
  answers: Record<number, string>;
  eliminatedOptions: Record<number, string[]>;
  selectedQuestionId: number;
  isSubmitted: boolean;
  isForensicActive: boolean;
  onSelectQuestion: (id: number) => void;
  onSelectAnswer: (questionId: number, option: string) => void;
  onToggleEliminate: (questionId: number, option: string) => void;
  onJumpToEvidence: (questionId: number) => void;
  onOpenDrillModal: () => void;
  onSubmitTest: () => void;
  className?: string;
}

export function S3QuestionInteractionPane({
  mcQuestions,
  matchingQuestions,
  answers,
  eliminatedOptions,
  selectedQuestionId,
  isSubmitted,
  isForensicActive,
  onSelectQuestion,
  onSelectAnswer,
  onToggleEliminate,
  onJumpToEvidence,
  onOpenDrillModal,
  onSubmitTest,
  className,
}: S3QuestionInteractionPaneProps) {
  const totalQuestions = mcQuestions.length + matchingQuestions.length;
  const answeredCount = Object.keys(answers).filter((k) => answers[Number(k)]).length;
  const isAllAnswered = answeredCount === totalQuestions;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Top Header & Disagreement Drill Trigger */}
      <div className="flex items-center justify-between border-b border-border/70 pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
            Questions 21 - 30 • Group Consensus
          </span>
          <h3 className="text-sm sm:text-base font-black text-foreground pt-1">
            Quyết Định Nhóm & Phân Công Nhiệm Vụ
          </h3>
        </div>

        <button
          type="button"
          onClick={onOpenDrillModal}
          className="px-3 py-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <Zap className="h-3.5 w-3.5" />
          <span>Tín Hiệu Lật Kèo</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* PART A: MULTIPLE CHOICE QUESTIONS (Q21 - Q25) */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Phần 1: Multiple Choice (Quyết định chung của nhóm)
        </div>

        {mcQuestions.map((q) => {
          const isSelected = selectedQuestionId === q.id;
          const userAns = answers[q.id] || "";
          const isCorrect = userAns.toUpperCase() === q.correctOption.toUpperCase();
          const eliminatedList = eliminatedOptions[q.id] || [];

          return (
            <div
              key={q.id}
              onClick={() => onSelectQuestion(q.id)}
              className={cn(
                "p-4 rounded-2xl border transition-all duration-200 cursor-pointer space-y-3",
                isSelected
                  ? "border-primary bg-primary/[0.03] ring-1 ring-primary/40 shadow-xs"
                  : "border-border bg-secondary/15 hover:bg-secondary/30",
                isSubmitted &&
                  (isCorrect
                    ? "border-emerald-500/40 bg-emerald-500/[0.02]"
                    : "border-rose-500/40 bg-rose-500/[0.02]")
              )}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-secondary font-mono font-black text-xs text-foreground border border-border mt-0.5">
                    {q.id}
                  </span>
                  <p className="font-bold text-xs sm:text-sm text-foreground leading-snug">
                    {q.prompt}
                  </p>
                </div>

                {isSubmitted && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onJumpToEvidence(q.id);
                    }}
                    title="Nghe lại đoạn này"
                    className="p-1 rounded-lg border border-border bg-card hover:bg-primary/10 text-primary transition-colors cursor-pointer shrink-0"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Options List */}
              <div className="space-y-1.5 pl-8">
                {q.options.map((opt) => {
                  const isPicked = userAns === opt.letter;
                  const isEliminated = eliminatedList.includes(opt.letter);

                  return (
                    <div
                      key={opt.letter}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectAnswer(q.id, opt.letter);
                      }}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        onToggleEliminate(q.id, opt.letter);
                      }}
                      className={cn(
                        "p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 transition-all",
                        isPicked
                          ? "bg-primary text-primary-foreground border-primary font-bold shadow-2xs"
                          : "bg-card hover:bg-secondary/60 text-foreground border-border",
                        isEliminated && "opacity-40 line-through text-muted-foreground",
                        isSubmitted && opt.isCorrect && "ring-2 ring-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold border-emerald-500/40"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black">{opt.letter}.</span>
                        <span>{opt.text}</span>
                      </div>

                      {/* Trap reason badge during review */}
                      {isSubmitted && opt.trapSpeaker && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400 shrink-0">
                          Bẫy của {opt.trapSpeaker}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Forensic Explanation */}
              {isSubmitted && isForensicActive && (
                <div className="pt-2 border-t border-border/60 text-xs space-y-1.5 pl-8 animate-in fade-in">
                  <p className="text-muted-foreground leading-relaxed">
                    💡 <strong>Giải thích sư phạm:</strong> {q.explanationVi}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* PART B: MATCHING CLASSIFICATION QUESTIONS (Q26 - Q30) */}
      {/* ========================================================================= */}
      <div className="space-y-4 pt-3 border-t border-border/70">
        <div className="space-y-1">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Phần 2: Matching Classification (Phân công nhiệm vụ)
          </div>
          <div className="p-3 rounded-2xl bg-secondary/30 border border-border text-[11px] font-mono space-y-0.5">
            <div><strong>A.</strong> Liam only</div>
            <div><strong>B.</strong> Olivia only</div>
            <div><strong>C.</strong> Both Liam & Olivia</div>
          </div>
        </div>

        {matchingQuestions.map((q) => {
          const isSelected = selectedQuestionId === q.id;
          const userAns = answers[q.id] || "";
          const isCorrect = userAns.toUpperCase() === q.correctOption.toUpperCase();

          return (
            <div
              key={q.id}
              onClick={() => onSelectQuestion(q.id)}
              className={cn(
                "p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer space-y-2.5",
                isSelected
                  ? "border-primary bg-primary/[0.03] ring-1 ring-primary/40 shadow-xs"
                  : "border-border bg-secondary/15 hover:bg-secondary/30",
                isSubmitted &&
                  (isCorrect
                    ? "border-emerald-500/40 bg-emerald-500/[0.02]"
                    : "border-rose-500/40 bg-rose-500/[0.02]")
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-secondary font-mono font-black text-xs text-foreground border border-border">
                    {q.id}
                  </span>
                  <span className="font-bold text-xs sm:text-sm text-foreground">
                    {q.taskTitle}
                  </span>
                </div>

                {isSubmitted && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onJumpToEvidence(q.id);
                    }}
                    title="Nghe lại đoạn này"
                    className="p-1 rounded-lg border border-border bg-card hover:bg-primary/10 text-primary transition-colors cursor-pointer shrink-0"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Selector Buttons */}
              <div className="flex items-center gap-1.5 pl-8">
                {(["A", "B", "C"] as const).map((opt) => {
                  const isPicked = userAns === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectAnswer(q.id, opt);
                      }}
                      className={cn(
                        "flex-1 py-1 rounded-xl font-mono font-bold text-xs border transition-all cursor-pointer",
                        isPicked
                          ? "bg-primary text-primary-foreground border-primary shadow-xs scale-105"
                          : "bg-card hover:bg-secondary text-foreground border-border",
                        isSubmitted && opt === q.correctOption && "ring-2 ring-emerald-500 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-black"
                      )}
                    >
                      {opt} {opt === "A" ? "(Liam)" : opt === "B" ? "(Olivia)" : "(Both)"}
                    </button>
                  );
                })}
              </div>

              {/* Forensic Summary */}
              {isSubmitted && isForensicActive && (
                <div className="pt-2 border-t border-border/60 text-xs pl-8 text-muted-foreground animate-in fade-in">
                  💡 {q.debateSummaryVi}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!isSubmitted && (
        <button
          type="button"
          onClick={onSubmitTest}
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
              ? "Nộp Bài & Mở Sơ Đồ Đồng Thuận"
              : `Nộp Bài (Đã làm ${answeredCount}/${totalQuestions} câu)`}
          </span>
        </button>
      )}
    </div>
  );
}
