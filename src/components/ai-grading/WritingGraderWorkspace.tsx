"use client";

import React from "react";
import {
  PenTool,
  Clock,
  Sparkles,
  Zap,
  RotateCcw,
  Play,
  Pause,
  Layers,
  FileText,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { WritingTaskConfig, DEFAULT_WRITING_PROMPTS } from "@/hooks/useAIGradingSession";

interface WritingGraderWorkspaceProps {
  selectedPrompt: WritingTaskConfig;
  onSelectPrompt: (config: WritingTaskConfig) => void;
  essayText: string;
  onChangeEssay: (text: string) => void;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  secondsRemaining: number;
  isAnalyzing: boolean;
  onSubmit: () => void;
}

export function WritingGraderWorkspace({
  selectedPrompt,
  onSelectPrompt,
  essayText,
  onChangeEssay,
  isTimerRunning,
  onToggleTimer,
  secondsRemaining,
  isAnalyzing,
  onSubmit,
}: WritingGraderWorkspaceProps) {
  const words = essayText.trim() ? essayText.trim().split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  const targetWords = selectedPrompt.targetWords;
  const isWordCountMet = wordCount >= targetWords;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const paragraphs = essayText.split(/\n\s*\n/).filter((p) => p.trim().length > 0);

  return (
    <div className="space-y-5">
      {/* 1. Prompt Selector & Controls Bar */}
      <div className="rounded-3xl border border-border bg-card p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <PenTool className="h-4 w-4" />
            </span>
            <h3 className="font-black text-sm text-foreground">
              Phòng Chấm Bài Writing Chuẩn Barem Cambridge
            </h3>
          </div>

          {/* Prompt Toggle Tabs */}
          <div className="flex items-center p-0.5 rounded-xl bg-secondary border border-border text-xs font-bold">
            {DEFAULT_WRITING_PROMPTS.map((prompt) => (
              <button
                key={prompt.taskType}
                type="button"
                onClick={() => onSelectPrompt(prompt)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedPrompt.taskType === prompt.taskType
                    ? "bg-card text-foreground shadow-xs font-black"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {prompt.taskType === "task1" ? "Writing Task 1 (150+ từ)" : "Writing Task 2 (250+ từ)"}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Prompt Content */}
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-primary">{selectedPrompt.title}</span>
            <span className="font-mono text-muted-foreground">
              Hạn mức: {selectedPrompt.timeLimitMinutes} phút • Mục tiêu: {selectedPrompt.targetWords} từ
            </span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-foreground leading-relaxed">
            {selectedPrompt.prompt}
          </p>
        </div>

        {/* Real-time Countdown Timer & Word Stats Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Timer controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleTimer}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isTimerRunning
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
                  : "bg-secondary border-border hover:bg-secondary/80 text-foreground"
              }`}
            >
              {isTimerRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              <span>{isTimerRunning ? "Tạm Dừng" : "Bắt Đầu Tính Giờ"}</span>
            </button>

            <span className="font-mono font-black text-sm text-foreground px-3 py-1 rounded-xl bg-secondary/60 border border-border">
              <Clock className="inline h-3.5 w-3.5 mr-1 text-primary" />
              {formattedTime}
            </span>
          </div>

          {/* Word Count Indicator */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span
              className={`px-3 py-1 rounded-xl border font-black flex items-center gap-1.5 ${
                isWordCountMet
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
              }`}
            >
              {isWordCountMet ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : (
                <AlertCircle className="h-3.5 w-3.5" />
              )}
              <span>
                {wordCount} / {targetWords} từ
              </span>
            </span>

            <span className="px-2.5 py-1 rounded-xl bg-secondary text-muted-foreground border border-border">
              {paragraphs.length} đoạn văn
            </span>
          </div>
        </div>
      </div>

      {/* 2. Text Editor Workspace */}
      <div className="rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-sm space-y-4">
        <textarea
          rows={14}
          placeholder={`Nhập bài viết của bạn tại đây... Hãy chú ý bố cục các đoạn văn (Intro, Overview/Body 1, Body 2, Conclusion) và sử dụng đa dạng cấu trúc phức Band 7.0+.`}
          value={essayText}
          onChange={(e) => onChangeEssay(e.target.value)}
          className="w-full p-4 text-xs sm:text-sm rounded-2xl bg-secondary/20 border border-border/80 focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground font-mono leading-relaxed resize-y"
        />

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-border/60">
          <p className="text-[11px] text-muted-foreground">
            💡 AI Examiner sẽ tự động chấm điểm 4 tiêu chí TR, CC, LR, GRA và quét các câu cần nâng cấp C1.
          </p>

          <button
            type="button"
            disabled={isAnalyzing || !essayText.trim()}
            onClick={onSubmit}
            className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-transform cursor-pointer ${
              isAnalyzing || !essayText.trim()
                ? "bg-secondary text-muted-foreground border border-border cursor-not-allowed opacity-60"
                : "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20 hover:scale-105"
            }`}
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="h-4 w-4 animate-spin" />
                <span>AI Examiner Đang Chấm 4 Tiêu Chí...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Gửi Bài Chấm Điểm AI Ngay</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
