"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  Sparkles,
  CheckCircle2,
  ShieldAlert,
  RotateCcw,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ShadowingSessionSummaryProps {
  completedCount: number;
  totalSentences: number;
  averageScore: number;
  errorsCount: number;
  onRestart: () => void;
  className?: string;
}

export function ShadowingSessionSummary({
  completedCount,
  totalSentences,
  averageScore,
  errorsCount,
  onRestart,
  className,
}: ShadowingSessionSummaryProps) {
  const isHighPerformance = averageScore >= 75;

  return (
    <div
      className={cn(
        "rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/10 via-card to-background p-6 sm:p-8 shadow-xl space-y-6 select-none animate-in zoom-in-95 duration-200 text-center max-w-xl mx-auto",
        className
      )}
    >
      {/* Top Trophy */}
      <div className="flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-primary/15 animate-bounce">
          <Award className="h-8 w-8" />
        </div>
      </div>

      <div className="space-y-1.5">
        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
          Hoàn Tất Phiên Luyện Shadowing
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-foreground">
          Tổng Kết Buổi Luyện Ngữ Điệu & Nhịp Điệu
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Đã ghi nhận toàn bộ kết quả bài luyện vào Dexie DB.
        </p>
      </div>

      {/* 3 Summary Big Cards */}
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
          <span className="text-[10px] font-mono text-muted-foreground block">
            Số Câu Đã Nhại
          </span>
          <span className="text-xl sm:text-2xl font-black font-mono text-foreground">
            {completedCount}/{totalSentences}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
          <span className="text-[10px] font-mono text-muted-foreground block">
            Điểm Nhịp Điệu TB
          </span>
          <span className="text-xl sm:text-2xl font-black font-mono text-primary">
            {averageScore}%
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
          <span className="text-[10px] font-mono text-muted-foreground block">
            Lỗi Cần Sửa
          </span>
          <span className="text-xl sm:text-2xl font-black font-mono text-rose-600">
            {errorsCount}
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
          <span>Xem {errorsCount} Lỗi Phát Âm Trong Error Bank</span>
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
