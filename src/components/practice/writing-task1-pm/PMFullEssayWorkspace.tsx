"use client";

import React, { useState } from "react";
import { EssaySections } from "@/hooks/useProcessMapBuilder";
import {
  Task1PMExercise,
  PMExerciseType,
} from "@/data/mockProcessMapData";
import {
  PassiveAnalysisResult,
  OverviewValidationResult,
} from "@/lib/processMapValidator";
import {
  PenTool,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  BookOpen,
  Send,
  Trash2,
  FileText,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PMFullEssayWorkspaceProps {
  exercise: Task1PMExercise;
  essaySections: EssaySections;
  onSetEssaySection: (section: keyof EssaySections, text: string) => void;
  totalWordCount: number;
  timerSeconds: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  passiveAnalysis: PassiveAnalysisResult;
  overviewValidation: OverviewValidationResult;
  onOpenLexiconDrawer: () => void;
  onLoadModelEssay: () => void;
  onResetWorkspace: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  className?: string;
}

export function PMFullEssayWorkspace({
  exercise,
  essaySections,
  onSetEssaySection,
  totalWordCount,
  timerSeconds,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
  passiveAnalysis,
  overviewValidation,
  onOpenLexiconDrawer,
  onLoadModelEssay,
  onResetWorkspace,
  onSubmit,
  isSubmitting,
  className,
}: PMFullEssayWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<"all" | "intro" | "overview" | "body1" | "body2">("all");

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`;
  };

  const getWordCountStatus = () => {
    if (totalWordCount >= 150) {
      return {
        label: "Đạt chuẩn (≥150 từ)",
        color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      };
    } else if (totalWordCount >= 120) {
      return {
        label: `Thiếu ${150 - totalWordCount} từ`,
        color: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
      };
    } else {
      return {
        label: `Thiếu ${150 - totalWordCount} từ (quá ngắn)`,
        color: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
      };
    }
  };

  const wordStatus = getWordCountStatus();

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5 flex flex-col select-none",
        className
      )}
    >
      {/* Top Header: Timer & Word Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
            <PenTool className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-foreground">
              Không Gian Soạn Thảo 4 Đoạn Chuẩn Task 1
            </h3>
            <span className="text-[11px] text-muted-foreground">
              Introduction • Overview • Body 1 • Body 2
            </span>
          </div>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-3">
          {/* Timer */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary/80 border border-border">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-mono text-xs font-bold text-foreground">
              {formatTime(timerSeconds)}
            </span>
            <button
              type="button"
              onClick={onToggleTimer}
              className="p-1 text-muted-foreground hover:text-foreground cursor-pointer"
              title={isTimerRunning ? "Tạm dừng" : "Tiếp tục"}
            >
              {isTimerRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 text-emerald-500" />}
            </button>
            <button
              type="button"
              onClick={onResetTimer}
              className="p-1 text-muted-foreground hover:text-foreground cursor-pointer"
              title="Đặt lại đồng hồ"
            >
              <RotateCcw className="h-3 w-3" />
            </button>
          </div>

          {/* Word Counter Badge */}
          <div
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-mono font-extrabold border flex items-center gap-1.5",
              wordStatus.color
            )}
          >
            <span>{totalWordCount} từ</span>
            <span className="text-[10px] opacity-80 font-normal">({wordStatus.label})</span>
          </div>
        </div>
      </div>

      {/* Prompt Callout */}
      <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border/80 text-xs space-y-1">
        <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase block">
          ĐỀ BÀI (PROMPT):
        </span>
        <p className="text-foreground/90 font-medium leading-relaxed">
          {exercise.prompt}
        </p>
      </div>

      {/* 4-Section Structured Editor */}
      <div className="space-y-4 flex-1">
        {/* Paragraph 1: Introduction */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-600 font-mono text-[10px]">
                1
              </span>
              <span>Đoạn 1: Mở Bài (Introduction - Paraphrase Prompt)</span>
            </label>
            <span className="text-[10px] font-mono text-muted-foreground">
              {essaySections.introduction.trim() ? essaySections.introduction.trim().split(/\s+/).length : 0} từ
            </span>
          </div>
          <textarea
            value={essaySections.introduction}
            onChange={(e) => onSetEssaySection("introduction", e.target.value)}
            placeholder="The diagram illustrates the sequential stages involved in the production of..."
            rows={2}
            className="w-full p-3 rounded-2xl border border-border bg-secondary/20 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-serif leading-relaxed"
          />
        </div>

        {/* Paragraph 2: Overview */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 font-mono text-[10px]">
                2
              </span>
              <span>Đoạn 2: Tổng Quan (Overview - The Key Features)</span>
            </label>
            <span className="text-[10px] font-mono text-muted-foreground">
              {essaySections.overview.trim() ? essaySections.overview.trim().split(/\s+/).length : 0} từ
            </span>
          </div>
          <textarea
            value={essaySections.overview}
            onChange={(e) => onSetEssaySection("overview", e.target.value)}
            placeholder="Overall, the recycling cycle comprises six linear stages, commencing with... and culminating in..."
            rows={3}
            className="w-full p-3 rounded-2xl border border-border bg-secondary/20 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 font-serif leading-relaxed"
          />
        </div>

        {/* Paragraph 3: Body 1 */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-purple-500/10 text-purple-600 font-mono text-[10px]">
                3
              </span>
              <span>Đoạn 3: Thân Bài 1 (Body 1 - Các Giai Đoạn / Khu Vực Đầu)</span>
            </label>
            <span className="text-[10px] font-mono text-muted-foreground">
              {essaySections.body1.trim() ? essaySections.body1.trim().split(/\s+/).length : 0} từ
            </span>
          </div>
          <textarea
            value={essaySections.body1}
            onChange={(e) => onSetEssaySection("body1", e.target.value)}
            placeholder="In the initial stage, waste paper is systematically collected and sorted..."
            rows={4}
            className="w-full p-3 rounded-2xl border border-border bg-secondary/20 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 font-serif leading-relaxed"
          />
        </div>

        {/* Paragraph 4: Body 2 */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-500/10 text-amber-600 font-mono text-[10px]">
                4
              </span>
              <span>Đoạn 4: Thân Bài 2 (Body 2 - Các Giai Đoạn / Khu Vực Còn Lại)</span>
            </label>
            <span className="text-[10px] font-mono text-muted-foreground">
              {essaySections.body2.trim() ? essaySections.body2.trim().split(/\s+/).length : 0} từ
            </span>
          </div>
          <textarea
            value={essaySections.body2}
            onChange={(e) => onSetEssaySection("body2", e.target.value)}
            placeholder="The subsequent phases focus on refining and drying: the pulp is pressed through heated rollers..."
            rows={4}
            className="w-full p-3 rounded-2xl border border-border bg-secondary/20 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 font-serif leading-relaxed"
          />
        </div>
      </div>

      {/* Action Toolbar & Submit */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border/80">
        <div className="flex items-center gap-2 flex-wrap">
          {exercise.spatialLexicon && exercise.spatialLexicon.length > 0 && (
            <button
              type="button"
              onClick={onOpenLexiconDrawer}
              className="px-3 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs border border-border flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="h-3.5 w-3.5 text-emerald-500" />
              <span>Tra Cứu Từ Vựng Đô Thị</span>
            </button>
          )}

          <button
            type="button"
            onClick={onLoadModelEssay}
            className="px-3 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs border border-border flex items-center gap-1.5 cursor-pointer"
            title="Tự động điền bài viết mẫu Band 8.5+ để học hỏi"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            <span>Nạp Bài Mẫu Band 8.5+</span>
          </button>

          <button
            type="button"
            onClick={onResetWorkspace}
            className="px-3 py-2 rounded-xl bg-secondary hover:bg-rose-500/10 text-muted-foreground hover:text-rose-600 font-bold text-xs border border-border flex items-center gap-1.5 cursor-pointer"
            title="Xóa toàn bộ bài viết để làm lại từ đầu"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Xóa Trắng</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting || totalWordCount < 50}
          className={cn(
            "px-6 py-2.5 rounded-xl font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer",
            totalWordCount >= 50
              ? "bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-white shadow-indigo-600/25"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          {isSubmitting ? (
            <span>Đang Chấm Điểm & Lưu DB...</span>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Nộp Bài & Chấm Điểm Task 1</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
