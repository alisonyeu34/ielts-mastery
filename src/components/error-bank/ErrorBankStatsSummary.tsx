"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  Zap,
  RotateCcw,
  Sparkles,
  Award,
  Play,
  Layers,
  Trash2,
} from "lucide-react";
import { ErrorItem } from "@/types/database";
import { calculateMasteryRate } from "@/lib/errorBankHelpers";
import { cn } from "@/lib/utils";

interface ErrorBankStatsSummaryProps {
  errors: ErrorItem[];
  onOpenDisasterModal: () => void;
  className?: string;
}

export function ErrorBankStatsSummary({
  errors,
  onOpenDisasterModal,
  className,
}: ErrorBankStatsSummaryProps) {
  const stats = calculateMasteryRate(errors);

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            <ShieldAlert className="h-4 w-4" /> Module 5 • Ngân Hàng Lỗi Sai & Triệt Tiêu Lỗ Hổng
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Ngân Hàng Lỗi Sai Thông Minh (Error Bank)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Tập trung mọi câu trả lời sai từ 4 kỹ năng • Mổ xẻ nguyên nhân tư duy • Triệt tiêu lỗ hổng với quy tắc 2 lần đúng liên tiếp.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 self-start lg:self-auto">
          <button
            type="button"
            onClick={onOpenDisasterModal}
            className="p-2.5 rounded-2xl border border-border bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Tùy chọn thiết lập & dọn dẹp ngân hàng"
          >
            <Trash2 className="h-4 w-4" />
          </button>

          <Link
            href="/error-bank/drill"
            className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm shadow-md shadow-rose-600/20 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Play className="h-4 w-4 fill-white" />
            <span>Luyện Tập Triệt Tiêu Lỗi ({stats.unmastered} Câu)</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total */}
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-1">
          <span className="text-[10px] font-mono text-muted-foreground uppercase block font-bold">
            Tổng Số Lỗi Tích Lũy
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-foreground">
            {stats.total}
          </div>
          <p className="text-[10px] text-muted-foreground">
            Từ mọi module thực hành
          </p>
        </div>

        {/* Unmastered */}
        <div className="p-4 rounded-2xl bg-rose-500/[0.06] border border-rose-500/20 space-y-1">
          <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 uppercase block font-bold">
            Lỗi Chưa Làm Chủ
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-rose-600 dark:text-rose-400">
            {stats.unmastered}
          </div>
          <p className="text-[10px] text-muted-foreground">
            Cần luyện lại ngay
          </p>
        </div>

        {/* Mastered */}
        <div className="p-4 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/20 space-y-1">
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase block font-bold">
            Đã Triệt Tiêu (2/2)
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400">
            {stats.mastered}
          </div>
          <p className="text-[10px] text-muted-foreground">
            Đúng 2 lần liên tiếp
          </p>
        </div>

        {/* Mastery Rate */}
        <div className="p-4 rounded-2xl bg-primary/[0.06] border border-primary/20 space-y-1">
          <span className="text-[10px] font-mono text-primary uppercase block font-bold">
            Tỷ Lệ Thuần Thục
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-primary">
            {stats.ratePercentage}%
          </div>
          <p className="text-[10px] text-muted-foreground">
            Độ an toàn kiến thức
          </p>
        </div>
      </div>
    </div>
  );
}
