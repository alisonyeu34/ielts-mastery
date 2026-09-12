"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  Sparkles,
  ShieldAlert,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { CompletionSummary } from "@/hooks/useCompletionValidator";
import { cn } from "@/lib/utils";

interface CompletionFeedbackModalProps {
  summary: CompletionSummary;
  taskTitle: string;
  onRestart: () => void;
  className?: string;
}

export function CompletionFeedbackModal({
  summary,
  taskTitle,
  onRestart,
  className,
}: CompletionFeedbackModalProps) {
  const isMastered = summary.accuracyPercentage >= 80;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-md text-center animate-in fade-in duration-300",
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 mx-auto">
        <Award className="h-8 w-8" />
      </div>

      <div className="space-y-1.5">
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
          Tổng Kết Bài Luyện Điền Từ & Sơ Đồ
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
          {isMastered ? "Làm Chủ Dạng Bài Xuất Sắc!" : "Đã Hoàn Thành Bài Luyện Điền Từ"}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Nhiệm vụ: <strong>{taskTitle}</strong>
        </p>
      </div>

      {/* Score Grid */}
      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border/80">
          <span className="text-[11px] text-muted-foreground block font-medium">
            Số câu đúng
          </span>
          <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {summary.score} / {summary.total}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border/80">
          <span className="text-[11px] text-muted-foreground block font-medium">
            Độ chính xác
          </span>
          <div
            className={cn(
              "text-2xl font-extrabold",
              isMastered
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-amber-600 dark:text-amber-400"
            )}
          >
            {summary.accuracyPercentage}%
          </div>
        </div>
      </div>

      {/* Trap Breakdown & Error Bank Sync Note */}
      {summary.score < summary.total && (
        <div className="p-4 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 text-left space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-rose-600 dark:text-rose-400">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span>Đã tự động gom {summary.total - summary.score} câu sai vào Ngân Hàng Lỗi Sai</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
            {summary.singularPluralErrors > 0 && (
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 font-semibold">
                ⚠️ {summary.singularPluralErrors} lỗi sai số ít / số nhiều (-s/-es)
              </div>
            )}
            {summary.wordLimitViolations > 0 && (
              <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 font-semibold">
                ⚠️ {summary.wordLimitViolations} lỗi vi phạm giới hạn số từ cho phép
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onRestart}
          className="px-5 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Luyện lại bài này</span>
        </button>

        <Link
          href="/error-bank/drill"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
        >
          <span>Làm bài tập xóa bẫy trong Error Bank</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
