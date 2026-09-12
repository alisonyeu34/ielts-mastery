"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MinimalPairResultModalProps {
  isOpen: boolean;
  score: number;
  totalCount: number;
  history: Array<{
    pairId: string;
    targetWord: string;
    userSelected: string;
    isCorrect: boolean;
    explanation: string;
  }>;
  onRestart: () => void;
  className?: string;
}

export function MinimalPairResultModal({
  isOpen,
  score,
  totalCount,
  history,
  onRestart,
  className,
}: MinimalPairResultModalProps) {
  if (!isOpen) return null;

  const percentage = Math.round((score / totalCount) * 100);
  const wrongCount = totalCount - score;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-lg rounded-3xl border border-primary/40 bg-card p-6 sm:p-8 shadow-2xl space-y-6 text-center max-h-[90vh] overflow-y-auto">
        {/* Top Icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-primary/15 animate-bounce">
            <Award className="h-8 w-8" />
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
            Hoàn Tất Thử Thách Cặp Âm
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            Báo Cáo Phản Xạ Âm Vị Học
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Đã đồng bộ kết quả vào IndexedDB và tự động ghi nhận các từ nghe nhầm vào Error Bank.
          </p>
        </div>

        {/* 2 Metric Cards */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Số Câu Đúng
            </span>
            <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              {score} / {totalCount}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Độ Nhạy Thính Giác
            </span>
            <span className="text-2xl font-black font-mono text-primary">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Error Notice */}
        {wrongCount > 0 && (
          <div className="p-3.5 rounded-2xl bg-rose-500/[0.06] border border-rose-500/20 text-xs text-left flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 text-[11px]">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Đã ghi nhận {wrongCount} cặp âm nhầm vào Error Bank</span>
              </span>
              <p className="text-[10px] text-muted-foreground">
                Tự động lên lịch drill lại để triệt tiêu lỗi phát âm.
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

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <button
            type="button"
            onClick={onRestart}
            className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Luyện Lại Bộ Cặp Âm Này</span>
          </button>
        </div>
      </div>
    </div>
  );
}
