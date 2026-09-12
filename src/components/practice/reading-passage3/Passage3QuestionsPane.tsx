"use client";

import React, { useState } from "react";
import {
  Passage3Question,
  Passage3ExerciseData,
  SummaryBoxOption,
} from "@/data/mockPassage3Data";
import { SummaryBoxOptionSelector } from "./SummaryBoxOptionSelector";
import {
  Send,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Layers,
  FileQuestion,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Passage3QuestionsPaneProps {
  data: Passage3ExerciseData;
  answers: Record<number, string>;
  eliminatedOptions: string[];
  isSubmitted: boolean;
  scoreResult: {
    correctCount: number;
    totalCount: number;
    accuracy: number;
    estimatedBand: number;
    details: Array<{
      question: Passage3Question;
      userAnswer: string;
      isCorrect: boolean;
    }>;
  };
  onSetAnswer: (qNum: number, value: string) => void;
  onToggleEliminateOption: (letter: string) => void;
  onSubmit: () => void;
  onHighlightParagraph: (letter: string) => void;
  className?: string;
}

export function Passage3QuestionsPane({
  data,
  answers,
  eliminatedOptions,
  isSubmitted,
  scoreResult,
  onSetAnswer,
  onToggleEliminateOption,
  onSubmit,
  onHighlightParagraph,
  className,
}: Passage3QuestionsPaneProps) {
  // Group questions by section
  const headingQuestions = data.questions.filter(
    (q) => q.type === "matching_headings"
  );
  const yesNoQuestions = data.questions.filter(
    (q) => q.type === "yes_no_not_given"
  );
  const summaryQuestions = data.questions.filter(
    (q) => q.type === "summary_box"
  );

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-8 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/80 pb-4">
        <div className="flex items-center gap-2">
          <FileQuestion className="h-5 w-5 text-primary" />
          <h3 className="font-black text-base text-foreground">
            Bộ Câu Hỏi Passage 3 (Q27 - Q40)
          </h3>
        </div>
        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-secondary border border-border">
          {Object.keys(answers).length} / 14 Đã Trả Lời
        </span>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: Matching Headings (Q27 - Q32) */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 uppercase">
            Questions 27 - 32
          </span>
          <h4 className="font-bold text-sm text-foreground">
            Reading Passage 3 has seven paragraphs, A–G. Choose the correct heading for Paragraphs A–F.
          </h4>
        </div>

        {/* List of Headings Reference Box */}
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-2 text-xs">
          <span className="font-bold text-foreground block">
            Danh sách tiêu đề (List of Headings):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-serif text-[11px]">
            {data.headingList.map((h) => (
              <div key={h.id} className="p-1.5 rounded-lg bg-card border border-border/60">
                <strong className="font-mono text-primary mr-1.5">
                  {h.romanNumeral}.
                </strong>
                <span>{h.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Heading Questions List */}
        <div className="space-y-3 text-xs">
          {headingQuestions.map((q) => {
            const userVal = answers[q.number] || "";
            const isCorrect =
              isSubmitted && userVal.toLowerCase() === q.correctAnswer.toLowerCase();
            const isWrong = isSubmitted && !isCorrect;

            return (
              <div
                key={q.number}
                className={cn(
                  "p-3.5 rounded-2xl border transition-all space-y-2",
                  isCorrect
                    ? "border-emerald-500/40 bg-emerald-500/[0.04]"
                    : isWrong
                    ? "border-rose-500/40 bg-rose-500/[0.04]"
                    : "border-border bg-card"
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-secondary font-mono text-[10px] font-bold">
                      {q.number}
                    </span>
                    <button
                      type="button"
                      onClick={() => q.paragraphTarget && onHighlightParagraph(q.paragraphTarget)}
                      className="font-bold text-primary hover:underline cursor-pointer"
                    >
                      Paragraph {q.paragraphTarget} ➔
                    </button>
                  </div>

                  {/* Options Selector */}
                  <div className="flex items-center gap-1.5">
                    {data.headingList.map((h) => (
                      <button
                        key={h.id}
                        type="button"
                        onClick={() => !isSubmitted && onSetAnswer(q.number, h.romanNumeral)}
                        disabled={isSubmitted}
                        className={cn(
                          "px-2 py-1 rounded-lg font-mono font-bold text-[11px] border transition-all cursor-pointer",
                          userVal.toLowerCase() === h.romanNumeral.toLowerCase()
                            ? "bg-primary text-primary-foreground border-primary shadow-xs"
                            : "bg-secondary/40 border-border text-foreground hover:bg-secondary"
                        )}
                      >
                        {h.romanNumeral}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Explanation */}
                {isSubmitted && (
                  <div className="text-[11px] pt-1.5 border-t border-border/60 text-muted-foreground space-y-1">
                    <div>
                      {isCorrect ? (
                        <span className="text-emerald-600 font-bold">
                          ✅ Chính xác!
                        </span>
                      ) : (
                        <span className="text-rose-600 font-bold">
                          ❌ Đáp án đúng: [{q.correctAnswer}]
                        </span>
                      )}
                    </div>
                    <p>{q.distractorExplanationVi}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: Yes / No / Not Given (Q33 - Q36) */}
      {/* ========================================================================= */}
      <div className="space-y-4 pt-4 border-t border-border/80">
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 uppercase">
            Questions 33 - 36
          </span>
          <h4 className="font-bold text-sm text-foreground">
            Do the following statements agree with the claims/views of the writer in Reading Passage 3?
          </h4>
          <p className="text-[11px] font-mono text-muted-foreground">
            YES (Trùng khớp) • NO (Trái ngược) • NOT GIVEN (Không đủ thông tin)
          </p>
        </div>

        <div className="space-y-3 text-xs">
          {yesNoQuestions.map((q) => {
            const userVal = answers[q.number] || "";
            const isCorrect =
              isSubmitted && userVal.toUpperCase() === q.correctAnswer.toUpperCase();
            const isWrong = isSubmitted && !isCorrect;

            return (
              <div
                key={q.number}
                className={cn(
                  "p-3.5 rounded-2xl border transition-all space-y-2.5",
                  isCorrect
                    ? "border-emerald-500/40 bg-emerald-500/[0.04]"
                    : isWrong
                    ? "border-rose-500/40 bg-rose-500/[0.04]"
                    : "border-border bg-card"
                )}
              >
                <div className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-secondary font-mono text-[10px] font-bold mt-0.5">
                    {q.number}
                  </span>
                  <p className="font-serif text-foreground leading-relaxed">
                    {q.prompt}
                  </p>
                </div>

                {/* Yes No Not Given Buttons */}
                <div className="flex items-center gap-2 pl-7">
                  {["YES", "NO", "NOT GIVEN"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => !isSubmitted && onSetAnswer(q.number, opt)}
                      disabled={isSubmitted}
                      className={cn(
                        "px-3 py-1.5 rounded-xl font-mono font-bold text-xs border transition-all cursor-pointer",
                        userVal.toUpperCase() === opt
                          ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                          : "bg-secondary/40 border-border text-foreground hover:bg-secondary"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {/* Stance Explanation */}
                {isSubmitted && (
                  <div className="text-[11px] pl-7 pt-1 border-t border-border/60 space-y-1">
                    <div>
                      {isCorrect ? (
                        <span className="text-emerald-600 font-bold">
                          ✅ Chính xác!
                        </span>
                      ) : (
                        <span className="text-rose-600 font-bold">
                          ❌ Đáp án đúng: [{q.correctAnswer}]
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground">{q.stanceExplanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: Summary Completion with Box of Options (Q37 - Q40) */}
      {/* ========================================================================= */}
      <div className="space-y-4 pt-4 border-t border-border/80">
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 uppercase">
            Questions 37 - 40
          </span>
          <h4 className="font-bold text-sm text-foreground">
            Complete the summary below using the list of words, A–H.
          </h4>
        </div>

        {/* Box of Options Selector */}
        <SummaryBoxOptionSelector
          options={data.summaryBoxOptions}
          selectedLetter=""
          eliminatedOptions={eliminatedOptions}
          isSubmitted={isSubmitted}
          onSelectOption={() => {}}
          onToggleEliminate={onToggleEliminateOption}
        />

        {/* 4 Summary Prompts */}
        <div className="space-y-3 text-xs">
          {summaryQuestions.map((q) => {
            const userVal = answers[q.number] || "";
            const isCorrect =
              isSubmitted && userVal.toUpperCase() === q.correctAnswer.toUpperCase();
            const isWrong = isSubmitted && !isCorrect;

            return (
              <div
                key={q.number}
                className={cn(
                  "p-3.5 rounded-2xl border transition-all space-y-2.5",
                  isCorrect
                    ? "border-emerald-500/40 bg-emerald-500/[0.04]"
                    : isWrong
                    ? "border-rose-500/40 bg-rose-500/[0.04]"
                    : "border-border bg-card"
                )}
              >
                <div className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-secondary font-mono text-[10px] font-bold mt-0.5">
                    {q.number}
                  </span>
                  <p className="font-serif text-foreground leading-relaxed">
                    {q.prompt}
                  </p>
                </div>

                {/* Option Letter Chips */}
                <div className="flex flex-wrap gap-1.5 pl-7">
                  {data.summaryBoxOptions.map((opt) => (
                    <button
                      key={opt.letter}
                      type="button"
                      onClick={() => !isSubmitted && onSetAnswer(q.number, opt.letter)}
                      disabled={isSubmitted}
                      className={cn(
                        "px-2.5 py-1 rounded-lg font-mono font-bold text-xs border transition-all cursor-pointer",
                        userVal.toUpperCase() === opt.letter.toUpperCase()
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                          : "bg-secondary/40 border-border text-foreground hover:bg-secondary"
                      )}
                    >
                      {opt.letter}: {opt.word}
                    </button>
                  ))}
                </div>

                {/* Explanation */}
                {isSubmitted && (
                  <div className="text-[11px] pl-7 pt-1 border-t border-border/60 space-y-1">
                    <div>
                      {isCorrect ? (
                        <span className="text-emerald-600 font-bold">
                          ✅ Chính xác!
                        </span>
                      ) : (
                        <span className="text-rose-600 font-bold">
                          ❌ Đáp án đúng: [{q.correctAnswer}]
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground">{q.distractorExplanationVi}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Submit Action */}
      {!isSubmitted && (
        <div className="pt-4 border-t border-border/80">
          <button
            type="button"
            onClick={onSubmit}
            className="w-full py-4 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="h-4 w-4" />
            <span>Nộp Bài & Chấm Điểm Passage 3</span>
          </button>
        </div>
      )}
    </div>
  );
}
