"use client";

import React, { useState } from "react";
import {
  FileText,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Send,
  HelpCircle,
  Lightbulb,
} from "lucide-react";
import { Task1Dataset } from "@/data/mockTask1Datasets";
import { OverviewValidatorCallout } from "@/components/practice/writing/OverviewValidatorCallout";
import { cn } from "@/lib/utils";

interface Task1StructureBuilderProps {
  dataset: Task1Dataset;
  intro: string;
  overview: string;
  body1: string;
  body2: string;
  introWordCount: number;
  overviewWordCount: number;
  body1WordCount: number;
  body2WordCount: number;
  totalWordCount: number;
  overviewHasNumbers: boolean;
  onSetIntro: (text: string) => void;
  onSetOverview: (text: string) => void;
  onSetBody1: (text: string) => void;
  onSetBody2: (text: string) => void;
  onLoadSample: () => void;
  onSubmit: (dataset: Task1Dataset) => void;
  className?: string;
}

export function Task1StructureBuilder({
  dataset,
  intro,
  overview,
  body1,
  body2,
  introWordCount,
  overviewWordCount,
  body1WordCount,
  body2WordCount,
  totalWordCount,
  overviewHasNumbers,
  onSetIntro,
  onSetOverview,
  onSetBody1,
  onSetBody2,
  onLoadSample,
  onSubmit,
  className,
}: Task1StructureBuilderProps) {
  const [activeTab, setActiveTab] = useState<"intro" | "overview" | "body1" | "body2">("intro");

  const isWordCountSufficient = totalWordCount >= 150;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Header with Word Count Tracker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4">
        <div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            4-Paragraph Framework
          </span>
          <h3 className="text-base font-extrabold text-foreground mt-1">
            Khung Soạn Thảo 4 Đoạn Văn Chuẩn Cambridge
          </h3>
          <p className="text-xs text-muted-foreground">
            Luyện viết từng đoạn có định hướng: Introduction ➔ Overview ➔ Body 1 ➔ Body 2.
          </p>
        </div>

        {/* Word Counter Widget */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div
            className={cn(
              "px-3.5 py-1.5 rounded-2xl border text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm",
              isWordCountSufficient
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
            )}
          >
            <span>Tổng: {totalWordCount} / 150 từ</span>
            {isWordCountSufficient ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : (
              <span className="text-[10px] font-sans font-semibold">(Cần thêm {150 - totalWordCount} từ)</span>
            )}
          </div>

          <button
            type="button"
            onClick={onLoadSample}
            className="px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground border border-border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Điền bài viết mẫu Band 8.5+ để tham khảo"
          >
            <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
            <span className="hidden sm:inline">Bài mẫu Band 8+</span>
          </button>
        </div>
      </div>

      {/* Paragraph Switcher Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("intro")}
          className={cn(
            "p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-1",
            activeTab === "intro"
              ? "border-indigo-600 bg-indigo-500/10 ring-2 ring-indigo-500/20"
              : "border-border/70 bg-secondary/20 hover:border-border"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Đoạn 1
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">
              {introWordCount} từ
            </span>
          </div>
          <span className="text-xs font-bold text-foreground block truncate">
            1. Introduction
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={cn(
            "p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-1",
            activeTab === "overview"
              ? "border-indigo-600 bg-indigo-500/10 ring-2 ring-indigo-500/20"
              : "border-border/70 bg-secondary/20 hover:border-border",
            overviewHasNumbers && "border-rose-500/40 ring-2 ring-rose-500/20"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Đoạn 2
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">
              {overviewWordCount} từ
            </span>
          </div>
          <span className="text-xs font-bold text-foreground block truncate">
            2. Overview (Cốt Lõi)
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("body1")}
          className={cn(
            "p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-1",
            activeTab === "body1"
              ? "border-indigo-600 bg-indigo-500/10 ring-2 ring-indigo-500/20"
              : "border-border/70 bg-secondary/20 hover:border-border"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Đoạn 3
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">
              {body1WordCount} từ
            </span>
          </div>
          <span className="text-xs font-bold text-foreground block truncate">
            3. Body Paragraph 1
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("body2")}
          className={cn(
            "p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-1",
            activeTab === "body2"
              ? "border-indigo-600 bg-indigo-500/10 ring-2 ring-indigo-500/20"
              : "border-border/70 bg-secondary/20 hover:border-border"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Đoạn 4
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">
              {body2WordCount} từ
            </span>
          </div>
          <span className="text-xs font-bold text-foreground block truncate">
            4. Body Paragraph 2
          </span>
        </button>
      </div>

      {/* Editor Content According to Active Tab */}
      <div className="space-y-3">
        {activeTab === "intro" && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-indigo-500" />
                <span>Đoạn 1: Mở Bài (Paraphrase Đề Bài)</span>
              </label>
              <span className="text-[11px] text-muted-foreground">
                Gợi ý: <em>The line graph illustrates / compares the total volume of...</em>
              </span>
            </div>

            <textarea
              rows={4}
              value={intro}
              onChange={(e) => onSetIntro(e.target.value)}
              placeholder="Viết 1-2 câu paraphrase lại đề bài bằng cấu trúc từ vựng mới..."
              className="w-full rounded-2xl border border-border bg-secondary/20 p-4 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-serif leading-relaxed"
            />
          </div>
        )}

        {activeTab === "overview" && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>Đoạn 2: Tổng Quan (Overview - Quyết định Band 6.0+)</span>
              </label>
              <span className="text-[11px] text-muted-foreground">
                Bắt đầu bằng: <em>Overall, it is clear that... / Overall, electricity consumption...</em>
              </span>
            </div>

            <OverviewValidatorCallout
              overviewText={overview}
              hasNumbers={overviewHasNumbers}
            />

            <textarea
              rows={5}
              value={overview}
              onChange={(e) => onSetOverview(e.target.value)}
              placeholder="Nêu 2-3 xu hướng bao quát nhất và điểm cực trị nổi bật. Tuyệt đối không đưa số liệu chi tiết vào đây..."
              className={cn(
                "w-full rounded-2xl border p-4 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 font-serif leading-relaxed",
                overviewHasNumbers
                  ? "border-rose-500/60 bg-rose-500/[0.03] focus:ring-rose-500/30"
                  : "border-border bg-secondary/20 focus:ring-primary/40"
              )}
            />
          </div>
        )}

        {activeTab === "body1" && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-blue-500" />
                <span>Đoạn 3: Thân Bài 1 (Phân Tích Nhóm Số Liệu 1)</span>
              </label>
              <span className="text-[11px] text-muted-foreground">
                Nhóm đối tượng dẫn đầu hoặc giai đoạn nửa đầu (1990 - 2005)
              </span>
            </div>

            <textarea
              rows={6}
              value={body1}
              onChange={(e) => onSetBody1(e.target.value)}
              placeholder="Phân tích chi tiết số liệu khởi điểm, mốc tăng trưởng và điểm cực đại kèm số liệu chính xác (ví dụ: In 1990, electricity consumption in Germany stood at 450 TWh...)"
              className="w-full rounded-2xl border border-border bg-secondary/20 p-4 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-serif leading-relaxed"
            />
          </div>
        )}

        {activeTab === "body2" && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-purple-500" />
                <span>Đoạn 4: Thân Bài 2 (Phân Tích Nhóm Số Liệu 2 & So Sánh)</span>
              </label>
              <span className="text-[11px] text-muted-foreground">
                Sử dụng các liên từ so sánh: <em>By contrast, In stark comparison to, Meanwhile...</em>
              </span>
            </div>

            <textarea
              rows={6}
              value={body2}
              onChange={(e) => onSetBody2(e.target.value)}
              placeholder="Phân tích chi tiết số liệu các đối tượng còn lại và so sánh đối chiếu với nhóm 1..."
              className="w-full rounded-2xl border border-border bg-secondary/20 p-4 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-serif leading-relaxed"
            />
          </div>
        )}
      </div>

      {/* Navigation and Submit */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {activeTab !== "intro" && (
            <button
              type="button"
              onClick={() => {
                if (activeTab === "body2") setActiveTab("body1");
                else if (activeTab === "body1") setActiveTab("overview");
                else if (activeTab === "overview") setActiveTab("intro");
              }}
              className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-bold cursor-pointer transition-colors"
            >
              ← Đoạn trước
            </button>
          )}

          {activeTab !== "body2" && (
            <button
              type="button"
              onClick={() => {
                if (activeTab === "intro") setActiveTab("overview");
                else if (activeTab === "overview") setActiveTab("body1");
                else if (activeTab === "body1") setActiveTab("body2");
              }}
              className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-bold cursor-pointer transition-colors"
            >
              Đoạn tiếp theo →
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => onSubmit(dataset)}
          disabled={totalWordCount < 30}
          className={cn(
            "px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer",
            totalWordCount >= 30
              ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:scale-105"
              : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
          )}
        >
          <Send className="h-3.5 w-3.5" />
          <span>Tổng kết & Chấm bài Task 1</span>
        </button>
      </div>
    </div>
  );
}
