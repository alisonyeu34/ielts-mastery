"use client";

import React from "react";
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface SuprasegmentalSummaryModalProps {
  isOpen: boolean;
  score: number | null;
  feedback: string | null;
  onClose: () => void;
}

export function SuprasegmentalSummaryModal({
  isOpen,
  score,
  feedback,
  onClose,
}: SuprasegmentalSummaryModalProps) {
  if (!isOpen || score === null) return null;

  const isExcellent = score >= 80;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6 text-center">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-white shadow-xl shadow-primary/30 ring-4 ring-primary/15 animate-bounce">
            <Award className="h-8 w-8" />
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
            Đánh Giá Nhịp Điệu & Ngắt Cụm
          </span>
          <h3 className="text-2xl font-black text-foreground">
            Độ Chuẩn Nhịp Điệu: {score}%
          </h3>
        </div>

        <div
          className={`p-4 rounded-2xl border text-xs text-left space-y-1 ${
            isExcellent
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200"
              : "bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-200"
          }`}
        >
          <span className="font-bold uppercase text-[10px] block">
            Nhận Xét Từ AI Examiner:
          </span>
          <p className="leading-relaxed font-medium">{feedback}</p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs shadow-xs transition-transform hover:scale-105 cursor-pointer"
          >
            Hoàn Tất & Tiếp Tục
          </button>
        </div>
      </div>
    </div>
  );
}
