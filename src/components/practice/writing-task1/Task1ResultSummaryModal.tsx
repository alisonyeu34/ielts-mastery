"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
  FileText,
} from "lucide-react";
import { OverviewValidationResult } from "@/lib/task1SyntaxValidator";
import { cn } from "@/lib/utils";

interface Task1ResultSummaryModalProps {
  isOpen: boolean;
  totalWords: number;
  overviewValidation: OverviewValidationResult;
  selectedKeyFeaturesCount: number;
  onRestart: () => void;
  onClose: () => void;
  className?: string;
}

export function Task1ResultSummaryModal({
  isOpen,
  totalWords,
  overviewValidation,
  selectedKeyFeaturesCount,
  onRestart,
  onClose,
  className,
}: Task1ResultSummaryModalProps) {
  if (!isOpen) return null;

  const isWordCountSufficient = totalWords >= 150;
  const isOverviewClean = !overviewValidation.hasData;

  const estimatedBand =
    isWordCountSufficient && isOverviewClean
      ? "Band 7.5+"
      : isWordCountSufficient
      ? "Band 6.5"
      : "Band 5.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-lg rounded-3xl border border-primary/40 bg-card p-6 sm:p-8 shadow-2xl space-y-6 text-center max-h-[90vh] overflow-y-auto">
        {/* Top Badge */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-primary/15 animate-bounce">
            <Award className="h-8 w-8" />
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
            Hoàn Tất Luyện Writing Task 1
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            Báo Cáo Đánh Giá Task Achievement & GRA
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Hệ thống đã lưu kết quả vào IndexedDB và tự động phân loại các lỗi số liệu vào Error Bank.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-3 gap-2.5 text-xs">
          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Band Dự Phóng
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-primary">
              {estimatedBand}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Tổng Số Từ
            </span>
            <span
              className={cn(
                "text-xl sm:text-2xl font-black font-mono",
                isWordCountSufficient ? "text-emerald-600" : "text-amber-500"
              )}
            >
              {totalWords} / 150
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Overview
            </span>
            <span
              className={cn(
                "text-xs font-black font-mono block pt-1",
                isOverviewClean ? "text-emerald-600" : "text-rose-600"
              )}
            >
              {isOverviewClean ? "Chuẩn Mực" : "Lộ Số Liệu"}
            </span>
          </div>
        </div>

        {/* Warning if data found in overview */}
        {overviewValidation.hasData && (
          <div className="p-3.5 rounded-2xl bg-rose-500/[0.06] border border-rose-500/20 text-xs text-left flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 text-[11px]">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Đã ghi nhận lỗi "Data Dumping" vào Error Bank</span>
              </span>
              <p className="text-[10px] text-muted-foreground">
                Đoạn Overview chứa {overviewValidation.foundItems.join(", ")} làm tụt Task Achievement.
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
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 cursor-pointer"
          >
            Đóng & Xem Lại Bài Viết
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="w-full py-2.5 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Luyện Lại Đề Này Từ Đầu</span>
          </button>
        </div>
      </div>
    </div>
  );
}
