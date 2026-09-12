"use client";

import React, { useRef } from "react";
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Send,
  RotateCcw,
  Sparkles,
  Volume2,
} from "lucide-react";
import { Section4DenseData, Section4BlankItem } from "@/data/mockSection4DenseData";
import { cn } from "@/lib/utils";

interface DenseLectureNotesPaneProps {
  data: Section4DenseData;
  userInputs: Record<number, string>;
  isSubmitted: boolean;
  scoreReport: {
    correctCount: number;
    total: number;
    accuracy: number;
    itemResults: Record<number, boolean>;
  };
  onInputChange: (qNum: number, val: string) => void;
  onSeekTo: (seconds: number) => void;
  onSubmit: () => void;
  onReset: () => void;
  className?: string;
}

export function DenseLectureNotesPane({
  data,
  userInputs,
  isSubmitted,
  scoreReport,
  onInputChange,
  onSeekTo,
  onSubmit,
  onReset,
  className,
}: DenseLectureNotesPaneProps) {
  const inputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, currentQNum: number) => {
    if (e.key === "Enter" || e.key === "Tab") {
      if (currentQNum < 40) {
        e.preventDefault();
        inputRefs.current[currentQNum + 1]?.focus();
      }
    }
  };

  const renderTemplateWithInput = (template: string, questionNums: number[]) => {
    // Splits template text by {31}, {32} etc.
    const parts = template.split(/(\{\d+\})/g);

    return (
      <span className="leading-relaxed">
        {parts.map((part, idx) => {
          const match = part.match(/\{(\d+)\}/);
          if (match) {
            const qNum = parseInt(match[1], 10);
            const blank = data.blanks.find((b) => b.questionNumber === qNum);
            const userVal = userInputs[qNum] || "";
            const isCorrect = scoreReport.itemResults[qNum];

            return (
              <span key={idx} className="inline-flex items-center mx-1 align-middle">
                <span className="relative inline-block">
                  <input
                    ref={(el) => {
                      inputRefs.current[qNum] = el;
                    }}
                    type="text"
                    value={userVal}
                    onChange={(e) => onInputChange(qNum, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, qNum)}
                    disabled={isSubmitted}
                    placeholder={`[${qNum}]`}
                    className={cn(
                      "w-28 sm:w-32 px-2.5 py-1 text-xs font-mono font-bold rounded-lg border text-center transition-all focus:outline-none focus:ring-2",
                      isSubmitted
                        ? isCorrect
                          ? "bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500/30"
                          : "bg-rose-500/15 border-rose-500 text-rose-800 dark:text-rose-300 ring-1 ring-rose-500/30"
                        : "bg-card border-border/80 focus:border-indigo-500 focus:ring-indigo-500/20 text-foreground"
                    )}
                  />

                  {isSubmitted && !isCorrect && blank && (
                    <span
                      onClick={() => onSeekTo(blank.timestampSeconds)}
                      className="absolute -top-6 left-0 right-0 text-[10px] font-mono font-extrabold text-emerald-600 dark:text-emerald-400 bg-card px-1 rounded shadow-xs border border-emerald-500/40 truncate cursor-pointer"
                      title="Bấm để tua audio về mốc phát câu này"
                    >
                      ✓ {blank.targetAnswer}
                    </span>
                  )}
                </span>
              </span>
            );
          }
          return <span key={idx}>{part}</span>;
        })}
      </span>
    );
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4">
        <div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            Questions 31 - 40
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-foreground mt-1">
            {data.notesTitle}
          </h3>
          <p className="text-xs text-muted-foreground italic font-serif">
            Complete the notes below. Write <strong>ONE WORD ONLY</strong> for each answer.
          </p>
        </div>

        {isSubmitted && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span
              className={cn(
                "text-xs font-mono font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1.5",
                scoreReport.accuracy >= 70
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
              )}
            >
              <span>
                Đúng: {scoreReport.correctCount}/{scoreReport.total} ({scoreReport.accuracy}%)
              </span>
              {scoreReport.accuracy >= 70 && <CheckCircle2 className="h-3.5 w-3.5" />}
            </span>
          </div>
        )}
      </div>

      {/* Bulleted Subsections */}
      <div className="space-y-6 text-xs sm:text-sm font-serif">
        {data.subsections.map((sub, sIdx) => (
          <div key={sIdx} className="space-y-2.5">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-border/60 pb-1">
              {sub.heading}
            </h4>

            <ul className="space-y-2.5 list-disc pl-5 text-foreground/90 leading-relaxed">
              {sub.items.map((item, iIdx) => (
                <li key={iIdx}>
                  {renderTemplateWithInput(item.textTemplate, item.questionNumbers)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/80">
        <span className="text-xs text-muted-foreground">
          {isSubmitted ? "Đã chấm điểm & đối chiếu đáp án" : "Dùng phím Tab hoặc Enter để nhảy nhanh giữa các ô"}
        </span>

        {!isSubmitted ? (
          <button
            type="button"
            onClick={onSubmit}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Nộp bài & Phân tích điểm rơi</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onReset}
            className="px-5 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Làm lại Section 4</span>
          </button>
        )}
      </div>
    </div>
  );
}
