"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { Task1Dataset } from "@/data/mockTask1Datasets";
import { cn } from "@/lib/utils";

interface Task1DraftSummaryProps {
  dataset: Task1Dataset;
  intro: string;
  overview: string;
  body1: string;
  body2: string;
  totalWordCount: number;
  overviewHasNumbers: boolean;
  onEditAgain: () => void;
  className?: string;
}

export function Task1DraftSummary({
  dataset,
  intro,
  overview,
  body1,
  body2,
  totalWordCount,
  overviewHasNumbers,
  onEditAgain,
  className,
}: Task1DraftSummaryProps) {
  const isWordCountSufficient = totalWordCount >= 150;
  const isOverviewCompliant = !overviewHasNumbers && overview.trim().length > 20;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-md animate-in fade-in duration-300",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 mx-auto">
        <Award className="h-7 w-7" />
      </div>

      <div className="text-center space-y-1">
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
          Bản Nháp Hoàn Chỉnh 4 Đoạn Task 1
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
          Tổng Kết Bài Dựng Writing Task 1
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Đề tài: <strong>{dataset.title}</strong>
        </p>
      </div>

      {/* Task 1 Criteria Assessment Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border flex items-center gap-3">
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
              isWordCountSufficient ? "bg-emerald-500/20 text-emerald-600" : "bg-amber-500/20 text-amber-600"
            )}
          >
            {isWordCountSufficient ? <CheckCircle2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
          </div>
          <div>
            <span className="text-xs font-bold text-foreground block">
              Dung lượng từ ({totalWordCount} từ)
            </span>
            <span className="text-[11px] text-muted-foreground">
              {isWordCountSufficient ? "Đạt chuẩn yêu cầu (≥ 150 từ)" : "Cảnh báo dưới 150 từ (bị trừ điểm TA)"}
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border flex items-center gap-3">
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
              isOverviewCompliant ? "bg-emerald-500/20 text-emerald-600" : "bg-rose-500/20 text-rose-600"
            )}
          >
            {isOverviewCompliant ? <CheckCircle2 className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
          </div>
          <div>
            <span className="text-xs font-bold text-foreground block">
              Đoạn Overview
            </span>
            <span className="text-[11px] text-muted-foreground">
              {isOverviewCompliant
                ? "Chuẩn học thuật (Không chứa số liệu cụ thể)"
                : "Chứa số liệu chi tiết (Đã lưu vào Error Bank)"}
            </span>
          </div>
        </div>
      </div>

      {/* Full 4-Paragraph Assembled Text */}
      <div className="p-5 sm:p-7 rounded-2xl bg-secondary/20 border border-border/80 text-xs sm:text-sm font-serif leading-relaxed text-foreground/90 space-y-4">
        <div>
          <span className="font-sans text-[10px] font-bold text-indigo-600 dark:text-indigo-400 block uppercase tracking-wider mb-1">
            [Paragraph 1 - Introduction]
          </span>
          <p>{intro || "(Chưa viết Introduction)"}</p>
        </div>

        <div>
          <span className="font-sans text-[10px] font-bold text-amber-600 dark:text-amber-400 block uppercase tracking-wider mb-1">
            [Paragraph 2 - Overview]
          </span>
          <p>{overview || "(Chưa viết Overview)"}</p>
        </div>

        <div>
          <span className="font-sans text-[10px] font-bold text-blue-600 dark:text-blue-400 block uppercase tracking-wider mb-1">
            [Paragraph 3 - Body Paragraph 1]
          </span>
          <p>{body1 || "(Chưa viết Body 1)"}</p>
        </div>

        <div>
          <span className="font-sans text-[10px] font-bold text-purple-600 dark:text-purple-400 block uppercase tracking-wider mb-1">
            [Paragraph 4 - Body Paragraph 2]
          </span>
          <p>{body2 || "(Chưa viết Body 2)"}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onEditAgain}
          className="px-5 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Tiếp tục chỉnh sửa bài viết</span>
        </button>

        <Link
          href="/grading/writing"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
        >
          <span>Chấm bài với AI Writing Grader (Module 3)</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
