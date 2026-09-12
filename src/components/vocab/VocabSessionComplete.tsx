"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  Sparkles,
  Brain,
  ShieldAlert,
  RotateCcw,
  ArrowRight,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VocabSessionCompleteProps {
  reviewedCount: number;
  againCount: number;
  hardCount: number;
  goodCount: number;
  easyCount: number;
  errorBankSyncedCount: number;
  onRestart: () => void;
  onOpenCollocation: () => void;
  className?: string;
}

export function VocabSessionComplete({
  reviewedCount,
  againCount,
  hardCount,
  goodCount,
  easyCount,
  errorBankSyncedCount,
  onRestart,
  onOpenCollocation,
  className,
}: VocabSessionCompleteProps) {
  const masteryPercentage = Math.round(
    ((goodCount + easyCount) / Math.max(1, reviewedCount)) * 100
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
          <Brain className="h-8 w-8" />
        </div>
      </div>

      <div className="space-y-1.5">
        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
          Hoàn Tất Hàng Đợi Ôn Tập FSRS
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-foreground">
          Báo Cáo Trí Nhớ & Khả Năng Nhớ Lại
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Đã cập nhật lịch giãn cách mới cho toàn bộ các thẻ từ vựng vào Dexie DB.
        </p>
      </div>

      {/* 4 Ratings Breakdown Grid */}
      <div className="grid grid-cols-4 gap-2 text-xs">
        <div className="p-3 rounded-2xl bg-rose-500/[0.06] border border-rose-500/20 space-y-0.5">
          <span className="text-[9px] font-mono text-rose-600 dark:text-rose-400 font-bold block">
            Again
          </span>
          <span className="text-lg sm:text-xl font-black font-mono text-foreground">
            {againCount}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 space-y-0.5">
          <span className="text-[9px] font-mono text-amber-600 dark:text-amber-400 font-bold block">
            Hard
          </span>
          <span className="text-lg sm:text-xl font-black font-mono text-foreground">
            {hardCount}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-blue-500/[0.06] border border-blue-500/20 space-y-0.5">
          <span className="text-[9px] font-mono text-blue-600 dark:text-blue-400 font-bold block">
            Good
          </span>
          <span className="text-lg sm:text-xl font-black font-mono text-foreground">
            {goodCount}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/20 space-y-0.5">
          <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block">
            Easy
          </span>
          <span className="text-lg sm:text-xl font-black font-mono text-foreground">
            {easyCount}
          </span>
        </div>
      </div>

      {/* Error Bank Synced Warning if any */}
      {errorBankSyncedCount > 0 && (
        <div className="p-3.5 rounded-2xl bg-rose-500/[0.08] border border-rose-500/30 text-xs text-left flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="font-bold text-rose-600 flex items-center gap-1.5 text-[11px]">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Phát hiện {errorBankSyncedCount} từ vựng hay quên (Lapses $\ge 3$)</span>
            </span>
            <p className="text-[10px] text-muted-foreground">
              Đã tự động đẩy vào Ngân hàng lỗi sai (Error Bank) để cảnh báo điểm mù.
            </p>
          </div>

          <Link
            href="/error-bank/drill"
            className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs shrink-0"
          >
            Xem lỗi
          </Link>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-2.5 pt-2">
        <button
          type="button"
          onClick={onOpenCollocation}
          className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
        >
          <Zap className="h-4 w-4" />
          <span>Luyện Đấu Trường Collocation Matrix</span>
          <ArrowRight className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onRestart}
            className="w-1/2 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Ôn Lại Danh Sách Này</span>
          </button>

          <Link
            href="/dashboard"
            className="w-1/2 py-2.5 rounded-xl border border-border bg-card hover:bg-secondary/40 text-foreground font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Về Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
