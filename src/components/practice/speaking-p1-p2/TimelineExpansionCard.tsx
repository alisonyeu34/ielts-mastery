"use client";

import React from "react";
import {
  Clock,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Copy,
  Send,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { SpeakingPart1Item } from "@/data/mockSpeakingP1P2Data";
import { cn } from "@/lib/utils";

interface TimelineExpansionCardProps {
  topic: SpeakingPart1Item;
  presentInput: string;
  pastInput: string;
  futureInput: string;
  onChangeField: (field: "present" | "past" | "future", value: string) => void;
  onSubmit: (topicId: string) => void;
  className?: string;
}

export function TimelineExpansionCard({
  topic,
  presentInput,
  pastInput,
  futureInput,
  onChangeField,
  onSubmit,
  className,
}: TimelineExpansionCardProps) {
  const combinedText = `${presentInput} ${pastInput} ${futureInput}`.trim();
  const wordCount = combinedText.split(/\s+/).filter(Boolean).length;
  const isSufficient = wordCount >= 35 && Boolean(presentInput && pastInput && futureInput);

  const loadModel = () => {
    onChangeField("present", topic.modelAnswerBand85.present);
    onChangeField("past", topic.modelAnswerBand85.past);
    onChangeField("future", topic.modelAnswerBand85.future);
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Header & Question */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase">
              Chủ đề: {topic.topic}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-foreground">
            "{topic.question}"
          </h3>
        </div>

        <button
          type="button"
          onClick={loadModel}
          className="px-3.5 py-1.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs self-start sm:self-auto"
        >
          <BookOpen className="h-3.5 w-3.5 text-primary" />
          <span>Nạp Mẫu Band 8.5+</span>
        </button>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Triệt tiêu câu trả lời cộc lốc bằng <strong>Khung 3 Mốc Thời Gian</strong>: Trả lời trực tiếp ở Hiện tại $\rightarrow$ Tương phản với Quá khứ $\rightarrow$ Mở rộng sang Tương lai.
      </p>

      {/* 3 Interactive Timeline Blocks */}
      <div className="space-y-5 text-xs">
        {/* BLOCK 1: PRESENT */}
        <div className="p-4 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px]">
                1
              </span>
              <span>Hiện Tại (Direct Answer + Present Habit)</span>
            </span>
            <span className="text-[10px] text-muted-foreground">{topic.presentPrompt}</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {topic.signpostingPhrases.present.map((ph, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onChangeField("present", `${ph} `)}
                className="px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-secondary text-[10px] font-mono font-medium text-foreground transition-colors cursor-pointer"
              >
                + {ph}
              </button>
            ))}
          </div>

          <textarea
            rows={2}
            value={presentInput}
            onChange={(e) => onChangeField("present", e.target.value)}
            placeholder="To be perfectly honest, I consider myself an avid reader..."
            className="w-full p-3 rounded-xl border border-border bg-card text-xs text-foreground font-sans focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>

        {/* BLOCK 2: PAST */}
        <div className="p-4 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white text-[10px]">
                2
              </span>
              <span>Tương Phản Quá Khứ (Past Contrast)</span>
            </span>
            <span className="text-[10px] text-muted-foreground">{topic.pastPrompt}</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {topic.signpostingPhrases.past.map((ph, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onChangeField("past", `${ph} `)}
                className="px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-secondary text-[10px] font-mono font-medium text-foreground transition-colors cursor-pointer"
              >
                + {ph}
              </button>
            ))}
          </div>

          <textarea
            rows={2}
            value={pastInput}
            onChange={(e) => onChangeField("past", e.target.value)}
            placeholder="However, back in my teenage years, I was virtually averse to reading..."
            className="w-full p-3 rounded-xl border border-border bg-card text-xs text-foreground font-sans focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </div>

        {/* BLOCK 3: FUTURE */}
        <div className="p-4 rounded-2xl bg-blue-500/[0.04] border border-blue-500/20 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white text-[10px]">
                3
              </span>
              <span>Dự Phóng Tương Lai (Future Projection)</span>
            </span>
            <span className="text-[10px] text-muted-foreground">{topic.futurePrompt}</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {topic.signpostingPhrases.future.map((ph, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onChangeField("future", `${ph} `)}
                className="px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-secondary text-[10px] font-mono font-medium text-foreground transition-colors cursor-pointer"
              >
                + {ph}
              </button>
            ))}
          </div>

          <textarea
            rows={2}
            value={futureInput}
            onChange={(e) => onChangeField("future", e.target.value)}
            placeholder="Looking ahead, provided that my schedule permits, I'm firmly resolved to..."
            className="w-full p-3 rounded-xl border border-border bg-card text-xs text-foreground font-sans focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      </div>

      {/* Combined Response Preview & Word Count */}
      <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-foreground font-mono text-xs flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Xem Trước Câu Trả Lời Hoàn Chỉnh (30 - 45s):</span>
          </span>
          <span
            className={cn(
              "font-mono font-bold text-xs px-2.5 py-0.5 rounded-md",
              isSufficient
                ? "bg-emerald-500/10 text-emerald-600"
                : "bg-amber-500/10 text-amber-600"
            )}
          >
            {wordCount} / 35+ từ mục tiêu
          </span>
        </div>

        <p className="font-serif italic text-foreground leading-relaxed text-xs sm:text-sm">
          "{combinedText || "Vui lòng hoàn thành 3 khối mốc thời gian ở trên để xem bài ghép hoàn chỉnh..."}"
        </p>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => onSubmit(topic.id)}
          disabled={!combinedText}
          className={cn(
            "w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer",
            combinedText
              ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.01]"
              : "bg-secondary text-muted-foreground border border-border cursor-not-allowed"
          )}
        >
          <Send className="h-4 w-4" />
          <span>Lưu & Đánh Giá Khung Câu Trả Lời Part 1</span>
        </button>
      </div>
    </div>
  );
}
