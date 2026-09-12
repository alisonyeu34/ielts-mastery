"use client";

import React from "react";
import {
  Sparkles,
  Award,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  RotateCcw,
  ArrowRight,
  Zap,
  Target,
  ShieldCheck,
} from "lucide-react";
import { RhythmComparisonResult } from "@/lib/waveformComparison";
import { cn } from "@/lib/utils";

interface RhythmScoreCardProps {
  result: RhythmComparisonResult;
  onNextSentence: () => void;
  onRetry: () => void;
  className?: string;
}

export function RhythmScoreCard({
  result,
  onNextSentence,
  onRetry,
  className,
}: RhythmScoreCardProps) {
  const isSafe = result.isSafeForTarget || result.score >= 50;
  const isExcellent = result.score >= 80;
  const isGood = result.score >= 65 && result.score < 80;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6 select-none animate-in zoom-in-95 duration-200",
        className
      )}
    >
      {/* Header & Big Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "text-[10px] font-mono font-bold px-3 py-1 rounded-full border uppercase tracking-wider flex items-center gap-1.5 shadow-xs",
                isSafe
                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
                  : "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30"
              )}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              {result.targetStatusText || (isSafe ? "Đạt Mức An Toàn Band 6.0" : "Tiệm Cận Mức An Toàn")}
            </span>

            <span className="text-[10px] font-mono font-semibold text-muted-foreground bg-secondary/50 px-2.5 py-1 rounded-full border border-border">
              Mục tiêu bạn: Speaking 6.0 (Chuẩn ≥ 50%)
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-foreground">
            Chỉ Số Tương Đồng Nhịp Điệu (Rhythm Match)
          </h3>
          <p className="text-xs text-muted-foreground">
            Đánh giá độ khớp sóng âm, ngắt cụm tư duy và bật chuẩn âm đuôi (-s/-ed).
          </p>
        </div>

        {/* Big Score Box */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div
            className={cn(
              "px-5 py-3 rounded-2xl border-2 flex items-center gap-3 shadow-md transition-all",
              isSafe
                ? "bg-primary/10 border-primary/60 text-primary"
                : "bg-secondary border-border text-foreground"
            )}
          >
            <Award className="h-7 w-7" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider block leading-none text-muted-foreground">
                ĐIỂM NHỊP ĐIỆU
              </span>
              <span className="text-3xl font-black font-mono">
                {result.score}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Target Safety Zone Benchmark Meter */}
      <div className="p-4 sm:p-5 rounded-2xl bg-secondary/20 border border-border space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="font-bold text-foreground">Thước Đo Mức An Toàn Mục Tiêu (Target Benchmark):</span>
          </div>
          <span className="text-[11px] font-mono font-bold text-primary">
            {isSafe ? "✓ Bạn đã an toàn đạt ngưỡng Band 6.0" : "Đang tiệm cận ngưỡng Band 6.0 (Cần thêm chút độ mượt)"}
          </span>
        </div>

        {/* Visual Benchmark Slider */}
        <div className="relative pt-3 pb-4">
          {/* Track */}
          <div className="w-full h-3 bg-secondary rounded-full overflow-hidden relative">
            <div
              style={{ width: `${Math.min(100, Math.max(5, result.score))}%` }}
              className={cn(
                "h-full rounded-full transition-all duration-500",
                isSafe ? "bg-gradient-to-r from-rose-500 to-red-700" : "bg-amber-500"
              )}
            />
          </div>

          {/* Safe Target Marker Pin at 50% */}
          <div
            className="absolute top-0 flex flex-col items-center pointer-events-none -translate-x-1/2"
            style={{ left: "50%" }}
          >
            <div className="h-6 w-0.5 bg-primary/80 border-r border-background" />
            <span className="text-[9px] font-mono font-extrabold uppercase text-primary bg-card px-1.5 py-0.5 rounded border border-primary/40 shadow-xs whitespace-nowrap mt-0.5">
              Mức An Toàn Band 6.0 (≥ 50%)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
          <span>0% (Chưa nói)</span>
          <span className="text-primary font-bold">50% (Đạt Chuẩn Band 6.0)</span>
          <span>70% (Band 7.0)</span>
          <span>85%+ (Band 8.0+)</span>
        </div>
      </div>

      {/* 3 Metric Mini Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {/* 1. Tempo Alignment */}
        <div className="p-3.5 rounded-2xl bg-card border border-border space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-mono font-bold block">
            1. Tốc Độ Nói (Tempo)
          </span>
          <span className="font-extrabold text-foreground text-sm block">
            {result.tempoStatus === "perfect"
              ? "Hoàn Hảo (1.0x)"
              : result.tempoStatus === "too_fast"
              ? "Hơi Nhanh (Too Fast)"
              : "Hơi Chậm (Đủ Rõ Chữ)"}
          </span>
          <span className="text-[10px] text-muted-foreground">
            Thời lượng: {(result.durationRatio * 100).toFixed(0)}% so với mẫu
          </span>
        </div>

        {/* 2. Stress Correlation */}
        <div className="p-3.5 rounded-2xl bg-card border border-border space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-mono font-bold block">
            2. Điểm Rơi Trọng Âm
          </span>
          <span className="font-extrabold text-foreground text-sm block">
            {result.stressAlignmentScore}% Trùng khớp
          </span>
          <span className="text-[10px] text-muted-foreground">
            {result.stressAlignmentScore >= 50 ? "✓ Đạt yêu cầu nhấn từ chính" : "Chú ý nhấn từ mang nghĩa"}
          </span>
        </div>

        {/* 3. Pauses & Cadence */}
        <div className="p-3.5 rounded-2xl bg-card border border-border space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-mono font-bold block">
            3. Khoảng Dừng (Pauses)
          </span>
          <span className="font-extrabold text-foreground text-sm block">
            {result.syncGaps.length === 0 ? "Tự Nhiên (0 Lỗi)" : `${result.syncGaps.length} Điểm ngắt nhịp`}
          </span>
          <span className="text-[10px] text-muted-foreground">
            Ngắt nghỉ đúng cụm tư duy
          </span>
        </div>
      </div>

      {/* AI Pedagogical Feedback List */}
      <div className="p-4 rounded-2xl bg-primary/[0.04] border border-primary/20 space-y-2 text-xs">
        <span className="font-bold text-foreground flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-primary">
          <Sparkles className="h-3.5 w-3.5" /> Nhận Xét Giám Khảo IELTS Dành Cho Mục Tiêu Band 6.0:
        </span>
        <ul className="space-y-1 list-disc pl-5 text-muted-foreground leading-relaxed">
          {result.feedbackTips.map((tip, idx) => (
            <li key={idx} className="text-foreground/90">{tip}</li>
          ))}
        </ul>

        <div className="p-2.5 rounded-xl bg-card/70 border border-border text-[11px] text-muted-foreground leading-relaxed">
          💡 <strong>Quy tắc chấm Speaking Band 6.0:</strong> Giám khảo không đòi hỏi ngữ điệu bản xứ hoàn hảo.
          Chỉ cần bạn <em>nói rõ ràng, người nghe hiểu được mà không cần phải căng tai đoán, và không nuốt âm đuôi (-s/-ed)</em> là đã nắm chắc điểm 6.0 trong tay!
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-border/80 flex items-center justify-between">
        <button
          type="button"
          onClick={onRetry}
          className="px-4 py-2 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Thu Âm Lại</span>
        </button>

        <button
          type="button"
          onClick={onNextSentence}
          className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-md shadow-primary/20 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
        >
          <span>Sang Câu Tiếp Theo</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
