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
import { ListeningSummary } from "@/hooks/useMapNavigation";
import { cn } from "@/lib/utils";

interface ListeningResultModalProps {
  summary: ListeningSummary;
  taskTitle: string;
  onRestart: () => void;
  className?: string;
}

export function ListeningResultModal({
  summary,
  taskTitle,
  onRestart,
  className,
}: ListeningResultModalProps) {
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
          Tổng Kết Bài Luyện Listening
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
          {isMastered ? "Làm Chủ Phần Thi Xuất Sắc!" : "Đã Hoàn Thành Bài Luyện Nghe"}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Bài thi: <strong>{taskTitle}</strong>
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

      {/* Mistake alert */}
      {summary.score < summary.total && (
        <div className="p-4 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 text-left space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-rose-600 dark:text-rose-400">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span>Đã tự động gom {summary.total - summary.score} câu sai vào Ngân Hàng Lỗi Sai</span>
          </div>
          <p className="text-muted-foreground leading-relaxed text-[11px]">
            Hệ thống đã phân loại lỗi sai theo nhóm (Bẫy tự đính chính Self-correction, Nghe nhầm số/phát âm, hoặc Nhầm lẫn phương hướng) để bạn làm lại bài tập triệt tiêu lỗi ở Module 5.
          </p>
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
          <span>Luyện lại bài nghe này</span>
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
