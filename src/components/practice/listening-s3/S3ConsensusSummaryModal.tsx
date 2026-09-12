"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  GitBranch,
  ShieldAlert,
  ArrowRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface S3ConsensusSummaryModalProps {
  isOpen: boolean;
  scoreResult: {
    correctCount: number;
    totalCount: number;
    accuracy: number;
    mcDetails: Array<{
      id: number;
      prompt: string;
      userAnswer: string;
      correctOption: string;
      isCorrect: boolean;
      explanationVi: string;
    }>;
    matchingDetails: Array<{
      id: number;
      prompt: string;
      userAnswer: string;
      correctOption: string;
      isCorrect: boolean;
      debateSummaryVi: string;
    }>;
  };
  onRestart: () => void;
  onClose: () => void;
  className?: string;
}

export function S3ConsensusSummaryModal({
  isOpen,
  scoreResult,
  onRestart,
  onClose,
  className,
}: S3ConsensusSummaryModalProps) {
  if (!isOpen) return null;

  const hasWrongAnswers = scoreResult.correctCount < scoreResult.totalCount;

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
            Kết Quả Luyện Nghe Section 3 Đa Chủ Thể
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            Báo Cáo Năng Lực Bắt Bẫy Đồng Thuận Nhóm
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Kết quả đã được ghi nhận vào nhật ký học tập và tự động phân loại các bẫy đề xuất bị từ chối vào Error Bank.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-3 gap-2.5 text-xs text-center">
          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Số Câu Đúng
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-primary">
              {scoreResult.correctCount} / {scoreResult.totalCount}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Độ Chính Xác
            </span>
            <span
              className={cn(
                "text-xl sm:text-2xl font-black font-mono",
                scoreResult.accuracy >= 80 ? "text-emerald-600" : "text-amber-500"
              )}
            >
              {scoreResult.accuracy}%
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Band Dự Phóng
            </span>
            <span className="text-xs font-black font-mono text-foreground block pt-1">
              {scoreResult.accuracy === 100
                ? "Band 7.5+"
                : scoreResult.accuracy >= 80
                ? "Band 6.5 - 7.0"
                : "Band 5.5 - 6.0"}
            </span>
          </div>
        </div>

        {/* Detailed Items Breakdown */}
        <div className="space-y-2 text-xs">
          <span className="font-bold text-foreground block">Chi tiết từng câu hỏi:</span>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {scoreResult.mcDetails.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "p-2.5 rounded-xl border flex items-center justify-between text-xs",
                  item.isCorrect
                    ? "bg-emerald-500/[0.04] border-emerald-500/20"
                    : "bg-rose-500/[0.04] border-rose-500/20"
                )}
              >
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  {item.isCorrect ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                  )}
                  <span className="font-bold text-foreground truncate">
                    Q{item.id}. {item.prompt}
                  </span>
                </div>

                <div className="font-mono text-xs font-bold shrink-0">
                  {item.isCorrect ? (
                    <span className="text-emerald-600">Đúng: [{item.correctOption}]</span>
                  ) : (
                    <span className="text-rose-600">
                      Chọn [{item.userAnswer || "Trống"}] ➔ Đúng [{item.correctOption}]
                    </span>
                  )}
                </div>
              </div>
            ))}

            {scoreResult.matchingDetails.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "p-2.5 rounded-xl border flex items-center justify-between text-xs",
                  item.isCorrect
                    ? "bg-emerald-500/[0.04] border-emerald-500/20"
                    : "bg-rose-500/[0.04] border-rose-500/20"
                )}
              >
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  {item.isCorrect ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                  )}
                  <span className="font-bold text-foreground truncate">
                    Q{item.id}. {item.prompt}
                  </span>
                </div>

                <div className="font-mono text-xs font-bold shrink-0">
                  {item.isCorrect ? (
                    <span className="text-emerald-600">Đúng: [{item.correctOption}]</span>
                  ) : (
                    <span className="text-rose-600">
                      Chọn [{item.userAnswer || "Trống"}] ➔ Đúng [{item.correctOption}]
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Error Bank Notice */}
        {hasWrongAnswers && (
          <div className="p-3.5 rounded-2xl bg-rose-500/[0.06] border border-rose-500/20 text-xs flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 text-[11px]">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Đã ghi nhận các bẫy đồng thuận vào Ngân Hàng Lỗi Sai</span>
              </span>
              <p className="text-[10px] text-muted-foreground">
                Hệ thống đã lưu lại phân tích phản biện để bạn ôn tập lặp lại ngắt quãng (FSRS).
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
        <div className="space-y-2.5 pt-2 border-t border-border/80">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
          >
            <GitBranch className="h-4 w-4" />
            <span>Mở Ma Trận Diễn Biến Đồng Thuận (Consensus Flowchart)</span>
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="w-full py-2.5 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Luyện Tập Lại Bài Nghe Này</span>
          </button>
        </div>
      </div>
    </div>
  );
}
