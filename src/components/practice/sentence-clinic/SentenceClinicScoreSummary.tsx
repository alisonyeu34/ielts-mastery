"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  Sparkles,
  Bug,
  ShieldAlert,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SentenceClinicScoreSummaryProps {
  completedCount: number;
  totalExercises: number;
  errorCount: number;
  onRestart: () => void;
  className?: string;
}

export function SentenceClinicScoreSummary({
  completedCount,
  totalExercises,
  errorCount,
  onRestart,
  className,
}: SentenceClinicScoreSummaryProps) {
  const accuracyPercent = Math.max(
    50,
    Math.round(((completedCount - errorCount) / Math.max(1, completedCount)) * 100)
  );

  return (
    <div
      className={cn(
        "rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/10 via-card to-background p-6 sm:p-8 shadow-xl space-y-6 select-none animate-in zoom-in-95 duration-200 text-center max-w-xl mx-auto",
        className
      )}
    >
      {/* Top Icon */}
      <div className="flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-primary/15 animate-bounce">
          <Bug className="h-8 w-8" />
        </div>
      </div>

      <div className="space-y-1.5">
        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
          Hoàn Tất Phiên Săn Bọ Ngữ Pháp
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-foreground">
          Báo Cáo Sức Khỏe Ngữ Pháp Học Thuật
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Đã triệt tiêu các bẫy ngữ pháp tử thần và ghi nhận điểm số vào Dexie DB.
        </p>
      </div>

      {/* 3 Metrics */}
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
          <span className="text-[10px] font-mono text-muted-foreground block">
            Câu Đã Sửa
          </span>
          <span className="text-xl sm:text-2xl font-black font-mono text-foreground">
            {completedCount}/{totalExercises}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
          <span className="text-[10px] font-mono text-muted-foreground block">
            Độ Chuẩn Xác
          </span>
          <span className="text-xl sm:text-2xl font-black font-mono text-primary">
            {accuracyPercent}%
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
          <span className="text-[10px] font-mono text-muted-foreground block">
            Lỗi Cần Ôn
          </span>
          <span className="text-xl sm:text-2xl font-black font-mono text-rose-600">
            {errorCount}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-2">
        <Link
          href="/error-bank/drill"
          className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-md shadow-primary/20 flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
        >
          <ShieldAlert className="h-4 w-4" />
          <span>Xem {errorCount} Lỗi Cú Pháp Trong Error Bank</span>
          <ArrowRight className="h-4 w-4" />
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onRestart}
            className="w-1/2 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Luyện Lại Từ Đầu</span>
          </button>

          <Link
            href="/practice"
            className="w-1/2 py-2.5 rounded-xl border border-border bg-card hover:bg-secondary/40 text-foreground font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Về Phòng Luyện Tập</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
