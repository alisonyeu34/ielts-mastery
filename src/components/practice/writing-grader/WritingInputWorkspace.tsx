"use client";

import React, { useState, useEffect } from "react";
import {
  PenTool,
  Clock,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  FileText,
  RotateCcw,
  Zap,
} from "lucide-react";
import { MOCK_BAND55_ESSAY } from "@/data/mockWritingFeedbackData";
import { cn } from "@/lib/utils";

interface WritingInputWorkspaceProps {
  taskType: "task1" | "task2";
  onTaskTypeChange: (type: "task1" | "task2") => void;
  prompt: string;
  onPromptChange: (prompt: string) => void;
  essayContent: string;
  onEssayContentChange: (content: string) => void;
  onGrade: () => void;
  isGrading: boolean;
  className?: string;
}

export function WritingInputWorkspace({
  taskType,
  onTaskTypeChange,
  prompt,
  onPromptChange,
  essayContent,
  onEssayContentChange,
  onGrade,
  isGrading,
  className,
}: WritingInputWorkspaceProps) {
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSecondsElapsed((p) => p + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`;
  };

  // Word count & Paragraph calculations
  const words = essayContent
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const wordCount = words.length;
  const paragraphCount = essayContent.split(/\n\s*\n/).filter(Boolean).length;

  const minWordLimit = taskType === "task1" ? 150 : 250;
  const isWordCountSufficient = wordCount >= minWordLimit;
  const isParagraphsSufficient = paragraphCount >= 3;

  const handleLoadSampleEssay = () => {
    onPromptChange(
      "Some people believe that unpaid community service should be a compulsory part of high school programmes. To what extent do you agree or disagree?"
    );
    onEssayContentChange(MOCK_BAND55_ESSAY);
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Top Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-4">
        <div className="flex items-center gap-2">
          {/* Task Type Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-secondary/40 border border-border">
            <button
              type="button"
              onClick={() => onTaskTypeChange("task1")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer",
                taskType === "task1"
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Task 1 (150 từ)
            </button>

            <button
              type="button"
              onClick={() => onTaskTypeChange("task2")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer",
                taskType === "task2"
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Task 2 (250 từ)
            </button>
          </div>

          <span className="font-mono text-xs text-muted-foreground flex items-center gap-1 ml-2">
            <Clock className="h-3.5 w-3.5 text-amber-500" />
            {formatTime(secondsElapsed)}
          </span>
        </div>

        {/* Load Sample Button */}
        <button
          type="button"
          onClick={handleLoadSampleEssay}
          className="px-3.5 py-1.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shadow-2xs"
        >
          <Zap className="h-3.5 w-3.5 text-amber-500" />
          <span>Nạp Bài Mẫu Band 5.5 Thử Nghiệm</span>
        </button>
      </div>

      {/* Prompt Textarea */}
      <div className="space-y-1.5">
        <label className="font-bold text-xs text-foreground uppercase tracking-wider font-mono flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5 text-primary" />
          Đề Bài {taskType.toUpperCase()}:
        </label>
        <textarea
          rows={2}
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="Nhập đề bài Writing của bạn vào đây..."
          className="w-full p-4 rounded-2xl border border-border bg-secondary/20 text-foreground text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed"
        />
      </div>

      {/* Essay Content Editor */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="font-bold text-foreground uppercase tracking-wider font-mono flex items-center gap-1.5">
            <PenTool className="h-3.5 w-3.5 text-primary" />
            Nội Dung Bài Viết Của Bạn:
          </label>

          <span
            className={cn(
              "font-mono font-bold px-2 py-0.5 rounded-md border text-[11px]",
              isWordCountSufficient
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                : "bg-rose-500/10 text-rose-600 border-rose-500/20"
            )}
          >
            {wordCount} / {minWordLimit} từ • {paragraphCount} đoạn
          </span>
        </div>

        <textarea
          rows={12}
          value={essayContent}
          onChange={(e) => onEssayContentChange(e.target.value)}
          placeholder="Soạn thảo bài viết của bạn tại đây hoặc dán bài viết vào..."
          className="w-full p-5 rounded-2xl border border-border bg-card text-foreground font-serif text-sm sm:text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Pre-flight Quality Check Banner */}
      <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-2 text-xs">
        <span className="font-mono font-bold text-[10px] text-muted-foreground uppercase block">
          Pre-flight Quality Guard (Kiểm tra trước khi chấm):
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
          <div className="flex items-center gap-2">
            {isWordCountSufficient ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
            )}
            <span className={isWordCountSufficient ? "text-foreground" : "text-rose-600 font-bold"}>
              Đạt số từ tối thiểu ({minWordLimit} từ)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isParagraphsSufficient ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
            )}
            <span className={isParagraphsSufficient ? "text-foreground" : "text-amber-600 font-bold"}>
              Đủ tối thiểu 3 đoạn văn ({paragraphCount}/3 đoạn)
            </span>
          </div>
        </div>
      </div>

      {/* Submit Action */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={onGrade}
          disabled={isGrading || !essayContent.trim()}
          className="px-8 py-3.5 rounded-2xl bg-primary hover:bg-primary/90 disabled:opacity-40 text-primary-foreground font-black text-xs sm:text-sm shadow-md shadow-primary/25 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
        >
          <Sparkles className="h-4 w-4" />
          <span>{isGrading ? "AI Đang Thẩm Định..." : "Thẩm Định Bằng AI Examiner"}</span>
        </button>
      </div>
    </div>
  );
}
