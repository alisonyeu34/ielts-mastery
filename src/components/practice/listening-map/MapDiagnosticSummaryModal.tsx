"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Footprints,
  ShieldAlert,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { MapQuestionItem } from "@/data/mockListeningMapData";
import { cn } from "@/lib/utils";

interface MapDiagnosticSummaryModalProps {
  isOpen: boolean;
  scoreResult: {
    correctCount: number;
    totalCount: number;
    accuracy: number;
    details: Array<{
      question: MapQuestionItem;
      userAnswer: string;
      isCorrect: boolean;
    }>;
  };
  onRestart: () => void;
  onClose: () => void;
  className?: string;
}

export function MapDiagnosticSummaryModal({
  isOpen,
  scoreResult,
  onRestart,
  onClose,
  className,
}: MapDiagnosticSummaryModalProps) {
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
            Kết Quả Luyện Nghe Section 2 Bản Đồ
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            Báo Cáo Năng Lực Định Vị Không Gian
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Kết quả đã được ghi nhận vào nhật ký học tập và tự động phân loại các bẫy chuyển hướng vào Error Bank.
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

        {/* Questions Diagnostic Table */}
        <div className="space-y-2 text-xs">
          <span className="font-bold text-foreground block">Chi tiết từng địa danh:</span>
          <div className="space-y-1.5">
            {scoreResult.details.map(({ question, userAnswer, isCorrect }) => (
              <div
                key={question.id}
                className={cn(
                  "p-3 rounded-xl border flex items-center justify-between text-xs",
                  isCorrect
                    ? "bg-emerald-500/[0.04] border-emerald-500/20"
                    : "bg-rose-500/[0.04] border-rose-500/20"
                )}
              >
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-rose-600" />
                  )}
                  <span className="font-bold text-foreground">
                    Q{question.id}. {question.facilityName}
                  </span>
                </div>

                <div className="font-mono text-xs font-bold">
                  {isCorrect ? (
                    <span className="text-emerald-600">Đúng: [{question.correctLetter}]</span>
                  ) : (
                    <span className="text-rose-600">
                      Chọn [{userAnswer || "Trống"}] ➔ Đúng [{question.correctLetter}]
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
                <span>Đã ghi nhận các câu sai vào Ngân Hàng Lỗi Sai</span>
              </span>
              <p className="text-[10px] text-muted-foreground">
                Hệ thống đã phân loại lỗi bẫy chuyển hướng để bạn ôn tập lặp lại ngắt quãng (FSRS).
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
            <Footprints className="h-4 w-4" />
            <span>Mở Lộ Trình Di Chuyển Trên Bản Đồ (Forensic Path)</span>
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
