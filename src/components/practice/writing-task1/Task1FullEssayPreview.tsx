"use client";

import React from "react";
import {
  FileText,
  Sparkles,
  Send,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { OverviewValidationResult } from "@/lib/task1SyntaxValidator";
import { cn } from "@/lib/utils";

interface Task1FullEssayPreviewProps {
  introText: string;
  overviewText: string;
  body1Text: string;
  body2Text: string;
  introWords: number;
  overviewWords: number;
  body1Words: number;
  body2Words: number;
  totalWords: number;
  overviewValidation: OverviewValidationResult;
  modelFullEssay: string;
  onChangeIntro: (t: string) => void;
  onChangeOverview: (t: string) => void;
  onChangeBody1: (t: string) => void;
  onChangeBody2: (t: string) => void;
  onLoadModel: () => void;
  onSubmitEssay: () => void;
  className?: string;
}

export function Task1FullEssayPreview({
  introText,
  overviewText,
  body1Text,
  body2Text,
  introWords,
  overviewWords,
  body1Words,
  body2Words,
  totalWords,
  overviewValidation,
  modelFullEssay,
  onChangeIntro,
  onChangeOverview,
  onChangeBody1,
  onChangeBody2,
  onLoadModel,
  onSubmitEssay,
  className,
}: Task1FullEssayPreviewProps) {
  const isWordCountSufficient = totalWords >= 150;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Top Header & Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary uppercase">
              Bước 4 • Ghép Toàn Bài 4 Đoạn
            </span>
          </div>
          <h4 className="font-bold text-xs sm:text-sm text-foreground">
            Trình Soạn Thảo Toàn Bài Academic Writing Task 1
          </h4>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span
            className={cn(
              "font-mono text-xs font-bold px-3 py-1 rounded-xl border flex items-center gap-1.5",
              isWordCountSufficient
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
            )}
          >
            {isWordCountSufficient ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : (
              <AlertCircle className="h-3.5 w-3.5" />
            )}
            <span>Tổng: {totalWords} / 150 từ mục tiêu</span>
          </span>

          <button
            type="button"
            onClick={onLoadModel}
            className="px-3 py-1 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            <span>Nạp Bài Mẫu 8.5+</span>
          </button>
        </div>
      </div>

      {/* 4-Paragraph Form Fields */}
      <div className="space-y-4 text-xs">
        {/* Paragraph 1: Introduction */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-bold text-[11px] text-foreground">
            <span>Đoạn 1: Mở Bài (Introduction - Paraphrase Đề)</span>
            <span className="font-mono text-muted-foreground">{introWords} từ</span>
          </div>
          <textarea
            rows={2}
            value={introText}
            onChange={(e) => onChangeIntro(e.target.value)}
            placeholder="The line graph illustrates the consumption levels of four distinct fuel sources..."
            className="w-full p-3 rounded-2xl border border-border bg-card text-xs text-foreground font-sans focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Paragraph 2: Overview */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-bold text-[11px] text-foreground">
            <span>Đoạn 2: Tổng Quan (Overview - 2-3 Xu Hướng Chính)</span>
            <span className="font-mono text-muted-foreground">{overviewWords} từ</span>
          </div>
          <textarea
            rows={3}
            value={overviewText}
            onChange={(e) => onChangeOverview(e.target.value)}
            placeholder="Overall, what stands out from the chart is that..."
            className={cn(
              "w-full p-3 rounded-2xl border bg-card text-xs text-foreground font-sans focus:outline-none focus:ring-2",
              overviewValidation.hasData
                ? "border-rose-500 focus:ring-rose-500"
                : "border-border focus:ring-primary"
            )}
          />
          {overviewValidation.hasData && (
            <p className="text-[10px] text-rose-600 dark:text-rose-400 font-medium">
              {overviewValidation.warningMessage}
            </p>
          )}
        </div>

        {/* Paragraph 3: Body 1 */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-bold text-[11px] text-foreground">
            <span>Đoạn 3: Thân Bài 1 (Body 1 - Nhóm xu hướng tăng trưởng)</span>
            <span className="font-mono text-muted-foreground">{body1Words} từ</span>
          </div>
          <textarea
            rows={3}
            value={body1Text}
            onChange={(e) => onChangeBody1(e.target.value)}
            placeholder="Looking first at the rising fuel categories, petroleum consumption commenced at..."
            className="w-full p-3 rounded-2xl border border-border bg-card text-xs text-foreground font-sans focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Paragraph 4: Body 2 */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-bold text-[11px] text-foreground">
            <span>Đoạn 4: Thân Bài 2 (Body 2 - Nhóm sụt giảm & so sánh còn lại)</span>
            <span className="font-mono text-muted-foreground">{body2Words} từ</span>
          </div>
          <textarea
            rows={3}
            value={body2Text}
            onChange={(e) => onChangeBody2(e.target.value)}
            placeholder="Turning to the remaining energy sources, coal usage initially stood at..."
            className="w-full p-3 rounded-2xl border border-border bg-card text-xs text-foreground font-sans focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2 border-t border-border/80">
        <button
          type="button"
          onClick={onSubmitEssay}
          disabled={totalWords < 40}
          className={cn(
            "w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer",
            totalWords >= 40
              ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.01]"
              : "bg-secondary text-muted-foreground border border-border cursor-not-allowed"
          )}
        >
          <Send className="h-4 w-4" />
          <span>Nộp & Chấm Điểm Task 1 Toàn Diện</span>
        </button>
      </div>
    </div>
  );
}
