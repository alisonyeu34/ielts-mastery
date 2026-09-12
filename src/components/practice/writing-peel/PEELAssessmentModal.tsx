"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ShieldAlert,
  ArrowRight,
  AlertTriangle,
  Layers,
} from "lucide-react";
import { Task2PEELPrompt } from "@/data/mockTask2PEELData";
import { cn } from "@/lib/utils";

interface PEELAssessmentModalProps {
  isOpen: boolean;
  prompt: Task2PEELPrompt;
  wordStats: {
    pointCount: number;
    explainCount: number;
    exampleCount: number;
    linkCount: number;
    totalCount: number;
    explainRatio: number;
  };
  diagnostics: {
    hasPersonalExample: boolean;
    hasListingTrap: boolean;
    hasCausalLogic: boolean;
    hasNeutralThesis: boolean;
    estimatedBand: number;
    fullParagraph: string;
  };
  onRestart: () => void;
  onClose: () => void;
  className?: string;
}

export function PEELAssessmentModal({
  isOpen,
  prompt,
  wordStats,
  diagnostics,
  onRestart,
  onClose,
  className,
}: PEELAssessmentModalProps) {
  if (!isOpen) return null;

  const hasIssues =
    diagnostics.hasPersonalExample ||
    diagnostics.hasListingTrap ||
    diagnostics.hasNeutralThesis ||
    wordStats.totalCount < 75;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl rounded-3xl border border-primary/40 bg-card p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Top Icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-primary/15 animate-bounce">
            <Award className="h-8 w-8" />
          </div>
        </div>

        <div className="space-y-1.5 text-center">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
            Kết Quả Thẩm Định Cấu Trúc PEEL
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            Báo Cáo Năng Lực Phát Triển Luận Điểm
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Hệ thống đã phân tích chuỗi nhân quả, tỷ lệ cân đối 4 mắt xích và tự động lưu trữ vào nhật ký học tập.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-3 gap-2.5 text-xs text-center">
          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Band Dự Phóng
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-primary">
              Band {diagnostics.estimatedBand.toFixed(1)}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Tổng Số Từ
            </span>
            <span
              className={cn(
                "text-xl sm:text-2xl font-black font-mono",
                wordStats.totalCount >= 80 && wordStats.totalCount <= 140
                  ? "text-emerald-600"
                  : "text-amber-500"
              )}
            >
              {wordStats.totalCount} w
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Độ Sâu Explain
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-purple-600">
              {wordStats.explainRatio}%
            </span>
          </div>
        </div>

        {/* 4-Item Diagnostic Checklist */}
        <div className="space-y-2 text-xs">
          <span className="font-bold text-foreground block">Đánh giá 4 tiêu chí cốt lõi:</span>
          <div className="space-y-1.5">
            {/* Rule 1: 1 Core Point */}
            <div className="p-2.5 rounded-xl border border-border/80 bg-secondary/15 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {!diagnostics.hasListingTrap ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
                )}
                <span className="font-bold text-foreground">
                  Quy chuẩn 1 Đoạn = 1 Luận Điểm (Tránh Listing Trap)
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold">
                {!diagnostics.hasListingTrap ? "Đạt chuẩn" : "Mắc lỗi liệt kê"}
              </span>
            </div>

            {/* Rule 2: Causal Logic Chain */}
            <div className="p-2.5 rounded-xl border border-border/80 bg-secondary/15 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {diagnostics.hasCausalLogic ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                )}
                <span className="font-bold text-foreground">
                  Chuỗi Giải Thích Nhân Quả (Explain Depth)
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold">
                {diagnostics.hasCausalLogic ? "Có từ nối nhân quả" : "Cần bổ sung liên từ"}
              </span>
            </div>

            {/* Rule 3: Academic Example */}
            <div className="p-2.5 rounded-xl border border-border/80 bg-secondary/15 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {!diagnostics.hasPersonalExample ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
                )}
                <span className="font-bold text-foreground">
                  Dẫn Chứng Học Thuật (Không Dùng Ngôi Thứ Nhất I/Me)
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold">
                {!diagnostics.hasPersonalExample ? "Chuẩn học thuật" : "Chứa đại từ cá nhân"}
              </span>
            </div>

            {/* Rule 4: Clear Thesis */}
            <div className="p-2.5 rounded-xl border border-border/80 bg-secondary/15 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {!diagnostics.hasNeutralThesis ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
                )}
                <span className="font-bold text-foreground">
                  Luận Đề Dứt Khoát (Anti-Fence-Sitting)
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold">
                {!diagnostics.hasNeutralThesis ? "Khẳng định rõ" : "Trung lập nửa vời"}
              </span>
            </div>
          </div>
        </div>

        {/* Error Bank Notice */}
        {hasIssues && (
          <div className="p-3.5 rounded-2xl bg-rose-500/[0.06] border border-rose-500/20 text-xs flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 text-[11px]">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Đã ghi nhận các lỗi lập luận vào Ngân Hàng Lỗi Sai</span>
              </span>
              <p className="text-[10px] text-muted-foreground">
                Hệ thống đã lưu lại phân tích sư phạm để bạn ôn tập và luyện viết lại.
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

        {/* Model PEEL Comparison */}
        <div className="p-4 rounded-2xl bg-secondary/15 border border-border space-y-2 text-xs">
          <span className="font-mono font-bold text-primary text-[10px] uppercase tracking-wider block">
            Đoạn Thân Bài PEEL Mẫu Band 8.5+ Đối Chứng:
          </span>
          <p className="font-serif italic text-foreground/90 leading-relaxed">
            "{prompt.samplePEEL.fullParagraph}"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2 border-t border-border/80">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Tiếp Tục Hoàn Thiện & Chỉnh Sửa Đoạn Văn</span>
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="w-full py-2.5 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Luyện Tập Lại Đề Này Từ Bước 1</span>
          </button>
        </div>
      </div>
    </div>
  );
}
