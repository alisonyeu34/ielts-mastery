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
  Clock,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { Passage3Question } from "@/data/mockPassage3Data";
import { cn } from "@/lib/utils";

interface Passage3DiagnosticModalProps {
  isOpen: boolean;
  scoreResult: {
    correctCount: number;
    totalCount: number;
    accuracy: number;
    estimatedBand: number;
    details: Array<{
      question: Passage3Question;
      userAnswer: string;
      isCorrect: boolean;
    }>;
  };
  timeSpentSeconds: number;
  onRestart: () => void;
  onClose: () => void;
  className?: string;
}

export function Passage3DiagnosticModal({
  isOpen,
  scoreResult,
  timeSpentSeconds,
  onRestart,
  onClose,
  className,
}: Passage3DiagnosticModalProps) {
  if (!isOpen) return null;

  const minutes = Math.floor(timeSpentSeconds / 60);
  const seconds = timeSpentSeconds % 60;
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

        {/* Title */}
        <div className="space-y-1.5 text-center">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            Báo Cáo Đọc Hiểu Passage 3 Học Thuật
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            Chẩn Đoán Năng Lực Giải Mã Văn Bản Trừu Tượng
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Kết quả đã được ghi nhận vào nhật ký học tập và tự động đẩy các câu sai vào Ngân Hàng Lỗi Sai.
          </p>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-center">
          <div className="p-3 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Số Câu Đúng
            </span>
            <span className="text-xl font-black font-mono text-primary">
              {scoreResult.correctCount} / {scoreResult.totalCount}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Độ Chính Xác
            </span>
            <span
              className={cn(
                "text-xl font-black font-mono",
                scoreResult.accuracy >= 75 ? "text-emerald-600" : "text-amber-500"
              )}
            >
              {scoreResult.accuracy}%
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Thời Gian Làm
            </span>
            <span className="text-sm font-black font-mono text-foreground block pt-1">
              {minutes}m {seconds}s
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground block">
              Band Reading
            </span>
            <span className="text-xl font-black font-mono text-purple-600">
              Band {scoreResult.estimatedBand.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Question Breakdown List */}
        <div className="space-y-2 text-xs">
          <span className="font-bold text-foreground block">
            Chi tiết 14 câu hỏi Passage 3:
          </span>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {scoreResult.details.map((item) => (
              <div
                key={item.question.number}
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
                    Q{item.question.number}. {item.question.prompt}
                  </span>
                </div>

                <span className="font-mono text-[11px] font-bold shrink-0">
                  {item.isCorrect ? (
                    <span className="text-emerald-600">Đúng [{item.question.correctAnswer}]</span>
                  ) : (
                    <span className="text-rose-600">
                      Chọn [{item.userAnswer || "Trống"}] ➔ Đúng [{item.question.correctAnswer}]
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Error Bank Alert */}
        {hasWrongAnswers && (
          <div className="p-3.5 rounded-2xl bg-rose-500/[0.06] border border-rose-500/20 text-xs flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 text-[11px]">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Đã ghi nhận các câu sai vào Ngân Hàng Lỗi Sai</span>
              </span>
              <p className="text-[10px] text-muted-foreground">
                Phân loại lỗi thành bẫy quan điểm (Careless Reading) và bẫy từ đồng nghĩa (Paraphrase Trap).
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
            <span>Xem Lại Bài Đọc & Dẫn Chứng</span>
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="w-full py-2.5 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Làm Lại Bài Đọc Này</span>
          </button>
        </div>
      </div>
    </div>
  );
}
