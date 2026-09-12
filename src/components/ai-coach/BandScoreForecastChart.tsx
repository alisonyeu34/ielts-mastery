"use client";

import React from "react";
import {
  generate180DayTrajectory,
  BandTrajectoryPoint,
} from "@/lib/disciplineTelemetry";
import {
  TrendingUp,
  Award,
  Calendar,
  Zap,
  CheckCircle2,
  Sparkles,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BandScoreForecastChartProps {
  currentDay?: number;
  actualCurrentBand?: number;
  masteredErrorsRate?: number;
  fsrsRetentionRate?: number;
  className?: string;
}

export function BandScoreForecastChart({
  currentDay = 1,
  actualCurrentBand = 4.5,
  masteredErrorsRate = 0,
  fsrsRetentionRate = 0,
  className,
}: BandScoreForecastChartProps) {
  const points: BandTrajectoryPoint[] = generate180DayTrajectory(
    currentDay,
    masteredErrorsRate,
    fsrsRetentionRate,
    actualCurrentBand
  );

  const finalProjected = points[points.length - 1]?.projectedBand || 7.5;
  const daysRemaining = Math.max(0, 165 - currentDay);

  return (
    <div
      className={cn(
        "p-5 sm:p-7 rounded-3xl border border-border bg-card shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-foreground">
              Biểu Đồ Dự Báo Tiến Độ Đạt Band 7.5 (165 Ngày • 5.5 Tháng)
            </h3>
            <span className="text-xs text-muted-foreground">
              Dự báo lộ trình tăng điểm từ 4.5 lên 7.5 dựa trên thời gian học và kết quả làm bài thực tế mỗi ngày.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs font-black self-start sm:self-auto">
          <span className="px-3 py-1.5 rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            Mục tiêu Ngày 165: Band {finalProjected.toFixed(1)}
          </span>
        </div>
      </div>

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border/80 space-y-1">
          <span className="text-[10px] font-mono text-muted-foreground block font-bold">
            NGÀY HIỆN TẠI
          </span>
          <span className="text-xl font-black font-mono text-foreground">
            Ngày {currentDay} <span className="text-xs text-muted-foreground font-normal">/ 165</span>
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border/80 space-y-1">
          <span className="text-[10px] font-mono text-muted-foreground block font-bold">
            BAND SCORE HIỆN TẠI
          </span>
          <span className="text-xl font-black font-mono text-indigo-600 dark:text-indigo-400">
            Band {actualCurrentBand.toFixed(1)}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border/80 space-y-1">
          <span className="text-[10px] font-mono text-muted-foreground block font-bold">
            TỶ LỆ LÀM CHỦ LỖI SAI
          </span>
          <span className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">
            {Math.round(masteredErrorsRate * 100)}%
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border/80 space-y-1">
          <span className="text-[10px] font-mono text-muted-foreground block font-bold">
            GHI NHỚ TỪ VỰNG FSRS
          </span>
          <span className="text-xl font-black font-mono text-purple-600 dark:text-purple-400">
            {Math.round(fsrsRetentionRate * 100)}%
          </span>
        </div>
      </div>

      {/* Visual Trajectory Graph (Custom SVG Coordinates) */}
      <div className="p-4 sm:p-6 rounded-2xl bg-secondary/20 border border-border space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-muted-foreground font-bold">Band 9.0</span>
          <span className="text-muted-foreground">Trục Tung: IELTS Band Score (4.5 ➔ 9.0)</span>
        </div>

        <div className="relative h-44 w-full">
          {/* SVG Chart */}
          <svg className="w-full h-full overflow-visible" viewBox="0 0 600 150" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="30" x2="600" y2="30" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
            <line x1="0" y1="75" x2="600" y2="75" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
            <line x1="0" y1="120" x2="600" y2="120" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />

            {/* Target Baseline Curve (Dashed Indigo) */}
            <polyline
              fill="none"
              stroke="#6366f1"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              points={points
                .map((p) => {
                  const x = (p.day / 165) * 600;
                  const y = 150 - ((p.targetBaselineBand - 4.5) / 4.5) * 150;
                  return `${x},${y}`;
                })
                .join(" ")}
            />

            {/* Projected Trajectory Curve (Solid Emerald) */}
            <polyline
              fill="none"
              stroke="#10b981"
              strokeWidth="3.5"
              points={points
                .map((p) => {
                  const x = (p.day / 165) * 600;
                  const y = 150 - ((p.projectedBand - 4.5) / 4.5) * 150;
                  return `${x},${y}`;
                })
                .join(" ")}
            />

            {/* Actual Track Line (Bold Rose) */}
            <polyline
              fill="none"
              stroke="#f43f5e"
              strokeWidth="4"
              points={points
                .filter((p) => p.actualAchievedBand !== undefined)
                .map((p) => {
                  const x = (p.day / 165) * 600;
                  const y = 150 - (((p.actualAchievedBand || 4.5) - 4.5) / 4.5) * 150;
                  return `${x},${y}`;
                })
                .join(" ")}
            />

            {/* Current Day Milestone Dot */}
            <circle
              cx={(currentDay / 165) * 600}
              cy={150 - ((actualCurrentBand - 4.5) / 4.5) * 150}
              r="6"
              fill="#f43f5e"
              stroke="#ffffff"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-1 border-t border-border/70">
          <span>Ngày 1 (Band 4.5)</span>
          <span>Ngày 46 (Band 5.5)</span>
          <span>Ngày 110 (Band 6.5)</span>
          <span className="text-emerald-600 font-bold">Ngày 165 (Mục Tiêu Band 7.5+)</span>
        </div>
      </div>

      {/* Legend & Summary Statement */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
            <strong className="text-foreground">Thực tế đã đạt</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <strong className="text-foreground">Quỹ đạo dự báo AI</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
            <strong className="text-muted-foreground">Chuẩn cơ sở 180 ngày</strong>
          </span>
        </div>

        <span className="text-muted-foreground text-[11px]">
          Còn <strong>{daysRemaining} ngày</strong> với tốc độ bứt phá <strong>+0.5 Band / 30 ngày</strong>.
        </span>
      </div>
    </div>
  );
}
