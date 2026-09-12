"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Mic,
} from "lucide-react";
import { SpeakingFeedbackReport } from "@/data/mockSpeakingFeedbackData";
import { cn } from "@/lib/utils";

interface SpeakingSubmissionModalProps {
  isOpen: boolean;
  report: SpeakingFeedbackReport;
  errorCount: number;
  onClose: () => void;
  onRestart: () => void;
  className?: string;
}

export function SpeakingSubmissionModal({
  isOpen,
  report,
  errorCount,
  onClose,
  onRestart,
  className,
}: SpeakingSubmissionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-lg rounded-3xl border border-primary/40 bg-card p-6 sm:p-8 shadow-2xl space-y-6 text-center">
        {/* Top Icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-primary/15 animate-bounce">
            <Award className="h-8 w-8" />
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
            Thẩm Định Hoàn Tất
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            Báo Cáo Điểm Speaking Part {report.part}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Đã đồng bộ kết quả vào IndexedDB và tự động ghi nhận {errorCount} lỗi ngữ pháp/phát âm vào Error Bank.
          </p>
        </div>

        {/* 4 Criteria Scores Overview */}
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="p-3 rounded-2xl bg-secondary/30 border border-border space-y-0.5">
            <span className="text-[9px] font-mono text-muted-foreground uppercase block">FC</span>
            <span className="text-lg font-black font-mono text-primary">
              {report.criteria.fc.score.toFixed(1)}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-secondary/30 border border-border space-y-0.5">
            <span className="text-[9px] font-mono text-muted-foreground uppercase block">LR</span>
            <span className="text-lg font-black font-mono text-primary">
              {report.criteria.lr.score.toFixed(1)}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-secondary/30 border border-border space-y-0.5">
            <span className="text-[9px] font-mono text-muted-foreground uppercase block">GRA</span>
            <span className="text-lg font-black font-mono text-primary">
              {report.criteria.gra.score.toFixed(1)}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-secondary/30 border border-border space-y-0.5">
            <span className="text-[9px] font-mono text-muted-foreground uppercase block">PR</span>
            <span className="text-lg font-black font-mono text-primary">
              {report.criteria.pr.score.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Overall Band Banner */}
        <div className="p-4 rounded-2xl bg-primary/[0.08] border border-primary/20 flex items-center justify-between">
          <span className="font-bold text-xs text-foreground">Speaking Overall Band Score:</span>
          <span className="text-2xl font-black font-mono text-primary">
            {report.overallBand.toFixed(1)} / 9.0
          </span>
        </div>

        {/* Quick Diagnostics */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-secondary/30 border border-border">
            <span className="text-[10px] text-muted-foreground block">Tốc độ</span>
            <strong>{report.wordsPerMinute} WPM</strong>
          </div>

          <div className="p-2.5 rounded-xl bg-secondary/30 border border-border">
            <span className="text-[10px] text-muted-foreground block">Khoảng lặng</span>
            <strong className="text-amber-600">{report.pauseCount} lần</strong>
          </div>

          <div className="p-2.5 rounded-xl bg-secondary/30 border border-border">
            <span className="text-[10px] text-muted-foreground block">Từ đệm</span>
            <strong className="text-purple-600">{report.fillerWordCount} từ</strong>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
          >
            <span>Khám Phá Bản Mổ Xẻ Chi Tiết & Bài Nói Mẫu C1</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="w-full py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Thu Âm Câu Hỏi Khác</span>
          </button>
        </div>
      </div>
    </div>
  );
}
