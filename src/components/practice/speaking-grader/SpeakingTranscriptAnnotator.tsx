"use client";

import React from "react";
import {
  FileText,
  AlertCircle,
  Sparkles,
  HelpCircle,
  Volume2,
} from "lucide-react";
import { AnnotatedToken } from "@/data/mockSpeakingFeedbackData";
import { cn } from "@/lib/utils";

interface SpeakingTranscriptAnnotatorProps {
  annotatedTokens: AnnotatedToken[];
  className?: string;
}

export function SpeakingTranscriptAnnotator({
  annotatedTokens,
  className,
}: SpeakingTranscriptAnnotatorProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-5 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-3">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
            Bản Mổ Xẻ Lời Nói (Transcript Anatomy)
          </span>
          <h4 className="font-bold text-sm text-foreground">
            Bản Ghi Âm Lời Nói & Điểm Trừ Điểm Barem
          </h4>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-[10px] font-mono flex-wrap">
          <span className="flex items-center gap-1 text-rose-600">
            <span className="h-2 w-2 rounded-full bg-rose-500" /> Ngữ Pháp (GRA)
          </span>
          <span className="flex items-center gap-1 text-amber-600">
            <span className="h-2 w-2 rounded-full bg-amber-500" /> Từ Vựng Yếu (LR)
          </span>
          <span className="flex items-center gap-1 text-purple-600">
            <span className="h-2 w-2 rounded-full bg-purple-500" /> Từ Đệm (FC)
          </span>
        </div>
      </div>

      {/* Transcript Body */}
      <div className="p-5 rounded-2xl bg-secondary/20 border border-border font-serif text-sm sm:text-base leading-loose text-foreground/90">
        {annotatedTokens.map((token, idx) => {
          if (!token.type) {
            return <span key={idx}>{token.text}</span>;
          }

          if (token.type === "filler") {
            return (
              <span
                key={idx}
                className="px-1.5 py-0.5 rounded-md bg-purple-500/15 text-purple-700 dark:text-purple-300 font-mono text-xs font-bold mx-0.5 border border-purple-500/30"
                title={token.explanation}
              >
                {token.text.trim()}
              </span>
            );
          }

          if (token.type === "gra") {
            return (
              <span
                key={idx}
                className="px-1.5 py-0.5 rounded-md bg-rose-500/15 text-rose-700 dark:text-rose-300 underline decoration-rose-500 decoration-wavy decoration-2 mx-0.5"
                title={`Sửa: ${token.correction} (${token.explanation})`}
              >
                {token.text}
              </span>
            );
          }

          if (token.type === "lr") {
            return (
              <span
                key={idx}
                className="px-1.5 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300 underline decoration-amber-500 decoration-wavy decoration-2 mx-0.5"
                title={`Nâng cấp: ${token.correction} (${token.explanation})`}
              >
                {token.text}
              </span>
            );
          }

          return <span key={idx}>{token.text}</span>;
        })}
      </div>

      {/* Actionable Note */}
      <div className="p-3.5 rounded-xl bg-secondary/30 border border-border text-[11px] text-muted-foreground flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary shrink-0" />
        <span>
          Các từ tô tím là từ đệm vô nghĩa. Hãy thay thế bằng khoảng lặng chủ động ngắn (&lt; 0.5s) hoặc các cụm liên kết tự nhiên.
        </span>
      </div>
    </div>
  );
}
