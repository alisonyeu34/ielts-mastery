"use client";

import React from "react";
import {
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Volume2,
  Gauge,
} from "lucide-react";
import { PauseStats } from "@/hooks/useAudioRecorder";
import { cn } from "@/lib/utils";

interface FluencyMetricsCardProps {
  pauseStats: PauseStats;
  wordCount?: number;
  className?: string;
}

export function FluencyMetricsCard({
  pauseStats,
  wordCount = 0,
  className,
}: FluencyMetricsCardProps) {
  const { pauseCount, totalSilenceSeconds, totalDurationSeconds, silenceRatioPercentage } =
    pauseStats;

  // Words per minute (WPM) estimation
  const minutes = totalDurationSeconds / 60;
  const estimatedWpm = minutes > 0 && wordCount > 0 ? Math.round(wordCount / minutes) : 0;

  const isFluencyGood = pauseCount <= 2 && silenceRatioPercentage < 25;

  return (
    <div
      className={cn(
        "rounded-2xl border p-4 sm:p-5 space-y-4 bg-card shadow-sm",
        isFluencyGood ? "border-emerald-500/30" : "border-border",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border/80 pb-3">
        <h4 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-2">
          <Activity className="h-4 w-4 text-indigo-500" />
          Chỉ Số Đo Độ Trôi Chảy (Fluency Telemetry)
        </h4>

        <span
          className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded-full border",
            isFluencyGood
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
              : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
          )}
        >
          {isFluencyGood ? "Nhịp điệu tốt" : "Cần giảm ngập ngừng"}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        {/* Total Time */}
        <div className="p-3 rounded-xl bg-secondary/40 border border-border space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center justify-center gap-1">
            <Clock className="h-3 w-3 text-indigo-500" /> Tổng Thời Gian
          </span>
          <div className="text-lg sm:text-xl font-extrabold text-foreground">
            {totalDurationSeconds}s
          </div>
        </div>

        {/* Long Pauses */}
        <div className="p-3 rounded-xl bg-secondary/40 border border-border space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center justify-center gap-1">
            <AlertTriangle className="h-3 w-3 text-rose-500" /> Ngập Ngừng (&gt;1.5s)
          </span>
          <div
            className={cn(
              "text-lg sm:text-xl font-extrabold",
              pauseCount > 2 ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"
            )}
          >
            {pauseCount} lần
          </div>
        </div>

        {/* Silence Ratio */}
        <div className="p-3 rounded-xl bg-secondary/40 border border-border space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center justify-center gap-1">
            <Gauge className="h-3 w-3 text-amber-500" /> Tỷ Lệ Khoảng Lặng
          </span>
          <div
            className={cn(
              "text-lg sm:text-xl font-extrabold",
              silenceRatioPercentage > 30 ? "text-amber-600 dark:text-amber-400" : "text-foreground"
            )}
          >
            {silenceRatioPercentage}%
          </div>
        </div>

        {/* Estimated WPM */}
        <div className="p-3 rounded-xl bg-secondary/40 border border-border space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center justify-center gap-1">
            <TrendingUp className="h-3 w-3 text-emerald-500" /> Tốc Độ (WPM)
          </span>
          <div className="text-lg sm:text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {estimatedWpm > 0 ? `${estimatedWpm}` : "--"}
          </div>
        </div>
      </div>
    </div>
  );
}
