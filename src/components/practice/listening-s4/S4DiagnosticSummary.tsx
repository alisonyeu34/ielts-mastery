"use client";

import React, { useState } from "react";
import {
  FileText,
  Sparkles,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Volume2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Section4DenseData, Section4BlankItem } from "@/data/mockSection4DenseData";
import { cn } from "@/lib/utils";

interface S4DiagnosticSummaryProps {
  data: Section4DenseData;
  userInputs: Record<number, string>;
  itemResults: Record<number, boolean>;
  onSeekTo: (seconds: number) => void;
  className?: string;
}

export function S4DiagnosticSummary({
  data,
  userInputs,
  itemResults,
  onSeekTo,
  className,
}: S4DiagnosticSummaryProps) {
  const [isTranscriptOpen, setIsTranscriptOpen] = useState<boolean>(false);

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            Diagnostic Analysis
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-foreground mt-1">
            Bảng Mổ Xẻ Chi Tiết 10 Câu Hỏi & Transcript
          </h3>
        </div>
      </div>

      {/* 10 Blanks Breakdown Table */}
      <div className="space-y-3">
        {data.blanks.map((b) => {
          const isCorrect = itemResults[b.questionNumber];
          const userAns = userInputs[b.questionNumber] || "(Bỏ trống)";

          return (
            <div
              key={b.questionNumber}
              className={cn(
                "p-3.5 rounded-2xl border transition-all text-xs space-y-2",
                isCorrect
                  ? "border-emerald-500/30 bg-emerald-500/[0.02]"
                  : "border-rose-500/30 bg-rose-500/[0.02]"
              )}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-lg font-mono text-xs font-bold text-white shadow-xs",
                      isCorrect ? "bg-emerald-600" : "bg-rose-600"
                    )}
                  >
                    {b.questionNumber}
                  </span>
                  <span className="font-bold text-foreground">
                    Đáp án: <code className="text-emerald-600 dark:text-emerald-400 font-extrabold font-mono">{b.targetAnswer}</code>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px]">
                  <span className="text-muted-foreground">
                    Bạn trả lời:{" "}
                    <strong className={isCorrect ? "text-emerald-600" : "text-rose-600 font-mono"}>
                      {userAns}
                    </strong>
                  </span>

                  <button
                    type="button"
                    onClick={() => onSeekTo(b.timestampSeconds)}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5 font-mono cursor-pointer"
                  >
                    <Volume2 className="h-3 w-3" />
                    <span>{Math.floor(b.timestampSeconds / 60)}:{(b.timestampSeconds % 60).toString().padStart(2, "0")}</span>
                  </button>
                </div>
              </div>

              {/* Signpost Signal Quote */}
              <div className="p-2 rounded-xl bg-secondary/40 border border-border/70 text-[11px] text-muted-foreground font-serif italic">
                🎙️ <strong>Từ tín hiệu chuyển đoạn:</strong> "{b.signpostSignal}"
              </div>

              {/* Deep Explanation */}
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                💡 {b.explanation}
              </p>
            </div>
          );
        })}
      </div>

      {/* Transcript Accordion */}
      <div className="border border-border/80 rounded-2xl overflow-hidden">
        <button
          type="button"
          onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-secondary/40 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-indigo-500" />
            <span className="text-xs font-bold text-foreground">
              Toàn văn Transcript Bài Giảng (Kèm Highlights)
            </span>
          </div>

          {isTranscriptOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>

        {isTranscriptOpen && (
          <div className="p-4 sm:p-5 pt-1 space-y-4 border-t border-border text-xs leading-relaxed font-serif text-foreground/90 animate-in fade-in duration-150">
            {data.transcriptParagraphs.map((tp) => (
              <div key={tp.id} className="space-y-1">
                <span className="font-mono text-[10px] font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded inline-block">
                  {tp.timestampLabel}
                </span>
                <p className="pt-0.5">{tp.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
