"use client";

import React from "react";
import {
  MockTestOverallScore,
  GapAnalysisResult,
} from "@/lib/cambridgeScoringEngine";
import {
  Award,
  X,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  ArrowRight,
  Sparkles,
  BarChart3,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OfficialScoreReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  scores: MockTestOverallScore | null;
  gapAnalysis: GapAnalysisResult | null;
  testTitle: string;
  testCode: string;
  onProceedToPass3: () => void;
  className?: string;
}

export function OfficialScoreReportModal({
  isOpen,
  onClose,
  scores,
  gapAnalysis,
  testTitle,
  testCode,
  onProceedToPass3,
  className,
}: OfficialScoreReportModalProps) {
  if (!isOpen || !scores) return null;

  const getBandColor = (band: number) => {
    if (band >= 7.5) return "text-emerald-600 dark:text-emerald-400";
    if (band >= 6.5) return "text-indigo-600 dark:text-indigo-400";
    if (band >= 5.5) return "text-amber-600 dark:text-amber-400";
    return "text-rose-600 dark:text-rose-400";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-4xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-border/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-red-600 to-indigo-600 text-white font-black text-sm shadow-lg shadow-red-600/30">
              IELTS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-foreground">
                  Official Cambridge Test Report Form (TRF)
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                  Đã Lưu Dexie DB
                </span>
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                {testCode} • {testTitle}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-muted-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Big Overall Band Display */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-red-500/10 via-indigo-500/10 to-emerald-500/10 border border-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block">
              OVERALL IELTS BAND SCORE (CAMBRIDGE ROUNDING):
            </span>
            <div className="flex items-baseline gap-3 mt-1">
              <span
                className={cn(
                  "text-4xl sm:text-5xl font-black font-mono tracking-tight",
                  getBandColor(scores.overallBand)
                )}
              >
                Band {scores.overallBand.toFixed(1)}
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                (Điểm trung bình cộng: {scores.rawAverage.toFixed(3)})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-card border border-border shadow-sm text-foreground">
              {scores.overallBand >= 7.5
                ? "🏆 Đạt Mục Tiêu Band 7.5+ IELTS"
                : scores.overallBand >= 6.5
                ? "🎯 Nền Tảng Band 6.5 Sẵn Sàng Bứt Phá"
                : "📈 Cần Tập Trung Khắc Phục Lỗ Hổng Cốt Lõi"}
            </span>
          </div>
        </div>

        {/* 4 Skills Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Listening */}
          <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <Headphones className="h-4 w-4 text-indigo-500" />
                <span>Listening</span>
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {scores.listening.rawScore}/40 Câu
              </span>
            </div>
            <div className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400">
              Band {scores.listening.bandScore.toFixed(1)}
            </div>
          </div>

          {/* Reading */}
          <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <BookOpen className="h-4 w-4 text-emerald-500" />
                <span>Reading</span>
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {scores.reading.rawScore}/40 Câu
              </span>
            </div>
            <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              Band {scores.reading.bandScore.toFixed(1)}
            </div>
          </div>

          {/* Writing */}
          <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <PenTool className="h-4 w-4 text-purple-500" />
                <span>Writing</span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">
                T1: {scores.writing.task1Band.toFixed(1)} | T2: {scores.writing.task2Band.toFixed(1)}
              </span>
            </div>
            <div className="text-2xl font-black font-mono text-purple-600 dark:text-purple-400">
              Band {scores.writing.compositeBand.toFixed(1)}
            </div>
          </div>

          {/* Speaking */}
          <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <Mic className="h-4 w-4 text-amber-500" />
                <span>Speaking</span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">4 Tiêu Chí</span>
            </div>
            <div className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400">
              Band {scores.speaking.compositeBand.toFixed(1)}
            </div>
          </div>
        </div>

        {/* 3-Pass Gap Analysis Card */}
        {gapAnalysis && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-500/[0.04] to-emerald-500/[0.04] border border-indigo-500/30 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-500/20 pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-500" />
                <div>
                  <h4 className="font-extrabold text-foreground text-sm">
                    Biểu Đồ Chênh Lệch Pass 1 vs Pass 2 (Knowledge Potential Gap)
                  </h4>
                  <span className="text-muted-foreground">{gapAnalysis.titleVi}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono font-extrabold">
                <span className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-600 border border-red-500/20">
                  Pass 1: Band {gapAnalysis.pass1Band.toFixed(1)}
                </span>
                <span>➔</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  Pass 2: Band {gapAnalysis.pass2Band.toFixed(1)}
                </span>
                <span className="px-2 py-0.5 rounded bg-indigo-600 text-white text-[11px]">
                  (+{gapAnalysis.bandGap.toFixed(1)} Band)
                </span>
              </div>
            </div>

            <p className="text-foreground/90 leading-relaxed font-medium">
              {gapAnalysis.diagnosisVi}
            </p>

            {/* Prescribed Remedies */}
            <div className="space-y-2 pt-1">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 block uppercase font-mono text-[10px]">
                Chiến lược hành động khắc phục:
              </span>
              <ul className="space-y-1.5">
                {gapAnalysis.prescribedRemedyVi.map((rem, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2 text-foreground/90 leading-relaxed">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{rem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border/80">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-bold border border-border cursor-pointer"
          >
            Đóng Bảng Điểm
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onProceedToPass3();
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Mở Pass 3: Giải Phẫu Khảo Thí & Thu Hoạch Từ Vựng</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
