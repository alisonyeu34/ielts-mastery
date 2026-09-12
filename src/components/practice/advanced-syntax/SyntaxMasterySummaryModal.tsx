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
  Zap,
} from "lucide-react";
import { SyntaxExerciseItem } from "@/data/mockAdvancedSyntaxData";
import { SyntaxValidationResult } from "@/lib/syntaxTransformerValidator";
import { cn } from "@/lib/utils";

interface SyntaxMasterySummaryModalProps {
  isOpen: boolean;
  stats: {
    completedCount: number;
    correctCount: number;
    totalCount: number;
    accuracy: number;
    avgDensity: number;
    estimatedBand: number;
  };
  exercises: SyntaxExerciseItem[];
  results: Record<string, SyntaxValidationResult>;
  onRestart: () => void;
  onClose: () => void;
  className?: string;
}

export function SyntaxMasterySummaryModal({
  isOpen,
  stats,
  exercises,
  results,
  onRestart,
  onClose,
  className,
}: SyntaxMasterySummaryModalProps) {
  if (!isOpen) return null;

  const hasWrongAnswers = stats.correctCount < stats.totalCount;

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
            Kết Quả Luyện Cú Pháp Học Thuật C1/C2
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            Báo Cáo Năng Lực Cú Pháp Nâng Cao (GRA & LR)
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Hệ thống đã phân tích độ nén thông tin, kiểm tra trật tự đảo ngữ và tự động ghi nhận vào nhật ký học tập.
          </p>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-center">
          <div className="p-3 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Câu Chính Xác
            </span>
            <span className="text-xl font-black font-mono text-primary">
              {stats.correctCount} / {stats.totalCount}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Độ Chính Xác
            </span>
            <span
              className={cn(
                "text-xl font-black font-mono",
                stats.accuracy >= 80 ? "text-emerald-600" : "text-amber-500"
              )}
            >
              {stats.accuracy}%
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Mật Độ Cú Pháp
            </span>
            <span className="text-xl font-black font-mono text-purple-600">
              {stats.avgDensity}%
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Band GRA Dự Phóng
            </span>
            <span className="text-xs font-black font-mono text-foreground block pt-1">
              Band {stats.estimatedBand.toFixed(1)}+
            </span>
          </div>
        </div>

        {/* Exercises Diagnostic Breakdown */}
        <div className="space-y-2 text-xs">
          <span className="font-bold text-foreground block">Chi tiết từng câu luyện tập:</span>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {exercises.map((ex, idx) => {
              const res = results[ex.id];
              const isCorrect = res?.isCorrect || false;

              return (
                <div
                  key={ex.id}
                  className={cn(
                    "p-2.5 rounded-xl border flex items-center justify-between text-xs",
                    isCorrect
                      ? "bg-emerald-500/[0.04] border-emerald-500/20"
                      : "bg-rose-500/[0.04] border-rose-500/20"
                  )}
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    {isCorrect ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                    )}
                    <span className="font-bold text-foreground truncate">
                      Câu {idx + 1}. {ex.topicTitleVi}
                    </span>
                  </div>

                  <span className="font-mono text-[11px] font-bold shrink-0">
                    {isCorrect ? (
                      <span className="text-emerald-600">Mật độ {res.syntacticDensity}%</span>
                    ) : (
                      <span className="text-rose-600">Chưa đạt chuẩn</span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Error Bank Notice */}
        {hasWrongAnswers && (
          <div className="p-3.5 rounded-2xl bg-rose-500/[0.06] border border-rose-500/20 text-xs flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 text-[11px]">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Đã ghi nhận các lỗi sai vào Ngân Hàng Lỗi Sai</span>
              </span>
              <p className="text-[10px] text-muted-foreground">
                Hệ thống đã lưu lại phân tích giải thích cú pháp để bạn ôn luyện lại.
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
        <div className="space-y-2.5 pt-2 border-t border-border/80">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Tiếp Tục Luyện Tập Cú Pháp</span>
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="w-full py-2.5 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Luyện Tập Lại Phần Này</span>
          </button>
        </div>
      </div>
    </div>
  );
}
