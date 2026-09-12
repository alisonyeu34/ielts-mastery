"use client";

import React, { useMemo } from "react";
import {
  TrendingUp,
  Award,
  Sparkles,
  Calendar,
  CheckCircle2,
  Target,
} from "lucide-react";
import { BandTrajectoryPoint } from "@/lib/dashboardAnalytics";

interface PersonalTrajectoryChartProps {
  trajectoryPoints: BandTrajectoryPoint[];
  currentEstimatedBand?: number;
  targetBand?: number;
}

export function PersonalTrajectoryChart({
  trajectoryPoints,
  currentEstimatedBand = 6.0,
  targetBand = 7.5,
}: PersonalTrajectoryChartProps) {
  // SVG Chart Geometry
  const width = 600;
  const height = 240;
  const paddingLeft = 45;
  const paddingRight = 30;
  const paddingTop = 25;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Band Score scale: 3.5 to 8.5
  const minBand = 3.5;
  const maxBand = 8.5;

  const getY = (band: number) => {
    const ratio = (band - minBand) / (maxBand - minBand);
    return paddingTop + chartHeight * (1 - ratio);
  };

  const getX = (index: number) => {
    const total = trajectoryPoints.length - 1 || 1;
    return paddingLeft + (chartWidth / total) * index;
  };

  // Projected line points
  const projectedPolyline = useMemo(() => {
    return trajectoryPoints
      .map((p, idx) => `${getX(idx).toFixed(1)},${getY(p.projectedBand).toFixed(1)}`)
      .join(" ");
  }, [trajectoryPoints]);

  // Actual data points
  const actualPoints = useMemo(() => {
    return trajectoryPoints
      .map((p, idx) => ({
        ...p,
        x: getX(idx),
        y: p.actualBand !== null ? getY(p.actualBand) : null,
      }))
      .filter((p) => p.y !== null);
  }, [trajectoryPoints]);

  const actualPolyline = useMemo(() => {
    return actualPoints.map((p) => `${p.x.toFixed(1)},${p.y!.toFixed(1)}`).join(" ");
  }, [actualPoints]);

  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="h-4 w-4" />
            </span>
            <h3 className="font-black text-base text-foreground tracking-tight">
              Biểu Đồ Dự Kiến Tăng Điểm (165 Ngày)
            </h3>
          </div>
          <p className="text-xs text-muted-foreground">
            So sánh điểm thi thực tế với lộ trình mục tiêu Band {targetBand}.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-xs">
          <div className="px-3 py-1 rounded-xl bg-secondary border border-border">
            <span className="text-muted-foreground">Hiện tại: </span>
            <strong className="text-primary font-black">Band {currentEstimatedBand}</strong>
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
            Mục tiêu: Band {targetBand}
          </div>
        </div>
      </div>

      {/* SVG Trajectory Chart */}
      <div className="relative w-full overflow-x-auto py-2 select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto max-h-64 overflow-visible"
        >
          {/* Phase Separation Vertical Shading */}
          <rect
            x={paddingLeft}
            y={paddingTop}
            width={chartWidth * 0.33}
            height={chartHeight}
            fill="currentColor"
            className="text-blue-500/[0.03]"
          />
          <rect
            x={paddingLeft + chartWidth * 0.33}
            y={paddingTop}
            width={chartWidth * 0.33}
            height={chartHeight}
            fill="currentColor"
            className="text-amber-500/[0.03]"
          />
          <rect
            x={paddingLeft + chartWidth * 0.66}
            y={paddingTop}
            width={chartWidth * 0.34}
            height={chartHeight}
            fill="currentColor"
            className="text-purple-500/[0.03]"
          />

          {/* Horizontal Band Grid Lines */}
          {[4.5, 5.0, 6.0, 7.0, 7.5, 8.0].map((band) => {
            const y = getY(band);
            const isTarget = band === targetBand;
            return (
              <g key={`grid-band-${band}`}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth={isTarget ? "1.5" : "0.75"}
                  strokeDasharray={isTarget ? "4,4" : "2,2"}
                  className={isTarget ? "text-emerald-500/60" : "text-border/60"}
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="text-[10px] font-mono fill-muted-foreground"
                >
                  {band.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Phase Labels at Top */}
          <text
            x={paddingLeft + chartWidth * 0.16}
            y={paddingTop - 8}
            textAnchor="middle"
            className="text-[10px] font-mono font-bold fill-blue-500"
          >
            Phase 1 (4.5-5.5)
          </text>
          <text
            x={paddingLeft + chartWidth * 0.5}
            y={paddingTop - 8}
            textAnchor="middle"
            className="text-[10px] font-mono font-bold fill-amber-500"
          >
            Phase 2 (5.5-6.5)
          </text>
          <text
            x={paddingLeft + chartWidth * 0.83}
            y={paddingTop - 8}
            textAnchor="middle"
            className="text-[10px] font-mono font-bold fill-purple-500"
          >
            Phase 3 (6.5-7.5+)
          </text>

          {/* Projected Target Curve (Dashed line) */}
          <polyline
            points={projectedPolyline}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray="4,4"
            className="opacity-60"
          />

          {/* Actual Historical Growth Curve (Solid bold line) */}
          <polyline
            points={actualPolyline}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Actual Data Points Circle Vertices */}
          {actualPoints.map((p) => (
            <g key={`pt-${p.dayNumber}`} className="cursor-pointer group">
              <circle
                cx={p.x}
                cy={p.y!}
                r="6"
                fill="#10b981"
                stroke="white"
                strokeWidth="2.5"
                className="transition-transform group-hover:scale-125"
              />
              <text
                x={p.x}
                y={p.y! - 10}
                textAnchor="middle"
                className="text-[10px] font-mono font-black fill-foreground"
              >
                {p.actualBand?.toFixed(1)}
              </text>
            </g>
          ))}

          {/* X-Axis Date Labels */}
          {trajectoryPoints.map((p, idx) => {
            const x = getX(idx);
            return (
              <text
                key={`label-${p.dayNumber}`}
                x={x}
                y={height - 12}
                textAnchor="middle"
                className="text-[10px] font-mono fill-muted-foreground"
              >
                {p.dateLabel}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Trajectory Insights Banner */}
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <p className="text-foreground text-[11px]">
            <strong className="text-emerald-600 dark:text-emerald-400">Đánh giá tiến độ:</strong> Tốc độ tích lũy kiến thức đang đi đúng hướng với lộ trình kỳ vọng. Duy trì kỷ luật để chạm mốc Band 7.5 đúng Ngày 165.
          </p>
        </div>
      </div>
    </div>
  );
}
