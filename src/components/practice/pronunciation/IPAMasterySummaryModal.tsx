"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ShieldAlert,
  ArrowRight,
  Brain,
} from "lucide-react";
import { MinimalPairQuestion } from "@/hooks/useIPAInteractiveSession";

interface IPAMasterySummaryModalProps {
  isOpen: boolean;
  score: { correct: number; total: number };
  errors: Array<{ question: MinimalPairQuestion; wrongWord: string }>;
  onRestart: () => void;
  onClose: () => void;
}

export function IPAMasterySummaryModal({
  isOpen,
  score,
  errors,
  onRestart,
  onClose,
}: IPAMasterySummaryModalProps) {
  if (!isOpen) return null;

  const total = score.total || 1;
  const accuracyPct = Math.round((score.correct / total) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6 text-center max-h-[90vh] overflow-y-auto">
        {/* Top Trophy Icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-white shadow-xl shadow-primary/30 ring-4 ring-primary/15 animate-bounce">
            <Award className="h-8 w-8" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
            Hoàn Tất Đấu Trường Cặp Âm
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            Độ Nhạy Tai Âm Vị: {accuracyPct}%
          </h3>
          <p className="text-xs text-muted-foreground">
            Đúng {score.correct} / {score.total} câu thử thách phân biệt âm thanh tốc độ cao.
          </p>
        </div>

        {/* Errors Breakdown */}
        {errors.length > 0 ? (
          <div className="space-y-2 text-left">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-foreground flex items-center gap-1">
                <ShieldAlert className="h-3.5 w-3.5 text-rose-500" />
                <span>Các Cặp Âm Nhầm Lẫn (Đã Lưu Error Bank):</span>
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">{errors.length} cặp</span>
            </div>

            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {errors.map((err, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-secondary/40 border border-border/80 text-xs flex items-center justify-between gap-2"
                >
                  <div>
                    <span className="font-bold text-rose-600 dark:text-rose-400 line-through mr-1.5">
                      {err.wrongWord}
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      ➔ {err.question.targetWord}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground block">
                      /{err.question.pairSet.soundA}/ vs /{err.question.pairSet.soundB}/
                    </span>
                  </div>

                  <Link
                    href="/error-bank"
                    className="text-[10px] font-bold text-primary hover:underline shrink-0"
                  >
                    Xem Lỗi
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 font-bold">
            🎉 Hoàn hảo! Bạn không nhầm lẫn bất kỳ cặp âm tối thiểu nào.
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onRestart}
            className="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-1.5 border border-border transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Luyện Thêm Lượt Mới</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs shadow-xs transition-transform hover:scale-105 cursor-pointer"
          >
            Về Xưởng IPA
          </button>
        </div>
      </div>
    </div>
  );
}
