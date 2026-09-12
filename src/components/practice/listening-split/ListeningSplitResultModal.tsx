"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  Sparkles,
  Headphones,
  TableProperties,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ListeningSplitResultModalProps {
  isOpen: boolean;
  correctCount: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  onOpenDistractorDrawer: () => void;
  onReviewAnswers: () => void;
  onRestart: () => void;
  className?: string;
}

export function ListeningSplitResultModal({
  isOpen,
  correctCount,
  totalQuestions,
  timeSpentSeconds,
  onOpenDistractorDrawer,
  onReviewAnswers,
  onRestart,
  className,
}: ListeningSplitResultModalProps) {
  if (!isOpen) return null;

  const scoreRate = Math.round((correctCount / totalQuestions) * 100);
  const bandScore =
    correctCount >= 9
      ? "Band 8.0"
      : correctCount >= 8
      ? "Band 7.5"
      : correctCount >= 7
      ? "Band 6.5"
      : correctCount >= 5
      ? "Band 5.5"
      : "Band 4.5";

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}p ${rem}s`;
  };

  const wrongCount = totalQuestions - correctCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-lg rounded-3xl border border-primary/40 bg-card p-6 sm:p-8 shadow-2xl space-y-6 text-center">
        {/* Top Icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-primary/15 animate-bounce">
            <Award className="h-8 w-8" />
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
            Hoàn Tất Luyện Nghe Section 3
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            Báo Cáo Điểm & Thính Lực Phản Xạ
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Đã đồng bộ kết quả vào IndexedDB và tự động ghi nhận câu sai vào Error Bank.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Số Câu Đúng
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              {correctCount}/{totalQuestions}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Band Dự Phóng
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-primary">
              {bandScore}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Thời Gian Nghe
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-foreground">
              {formatTime(timeSpentSeconds)}
            </span>
          </div>
        </div>

        {/* Error Bank Notice if any wrong */}
        {wrongCount > 0 && (
          <div className="p-3.5 rounded-2xl bg-rose-500/[0.06] border border-rose-500/20 text-xs text-left flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 text-[11px]">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Đã ghi nhận {wrongCount} câu sai vào Error Bank</span>
              </span>
              <p className="text-[10px] text-muted-foreground">
                Tự động phân loại: Bẫy Số nhiều (-s), Bẫy đổi ý, hoặc Paraphrase.
              </p>
            </div>

            <Link
              href="/error-bank"
              className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs shrink-0"
            >
              Xem Lỗi
            </Link>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2.5 pt-2">
          <button
            type="button"
            onClick={onOpenDistractorDrawer}
            className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
          >
            <TableProperties className="h-4 w-4" />
            <span>Mở Ma Trận Bẫy Khảo Thí (Distractor Matrix)</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onReviewAnswers}
              className="w-1/2 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Xem Transcript & Soi Dẫn Chứng</span>
            </button>

            <button
              type="button"
              onClick={onRestart}
              className="w-1/2 py-2.5 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Luyện Lại Bài Này</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
