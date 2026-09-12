"use client";

import React, { useMemo } from "react";
import {
  ShieldAlert,
  Sparkles,
  TrendingUp,
  AlertCircle,
  FileCode2,
  Volume2,
  Crosshair,
  Layers,
  AlertTriangle,
  BookOpen,
} from "lucide-react";
import { ErrorItem } from "@/types/database";
import { calculateRadarMetrics, RadarAxisData } from "@/lib/errorBankAnalytics";

interface CognitiveDeficitRadarProps {
  errors: ErrorItem[];
  onSelectCategory?: (category: string) => void;
}

export function CognitiveDeficitRadar({ errors, onSelectCategory }: CognitiveDeficitRadarProps) {
  const radarReport = useMemo(() => calculateRadarMetrics(errors), [errors]);
  const { axes, dominantDeficit, averageMastery } = radarReport;

  // Radar Chart Math Constants
  const size = 300;
  const center = size / 2;
  const radius = 105;
  const totalAxes = axes.length;
  const angleStep = (Math.PI * 2) / totalAxes;

  // Compute Coordinates for Radar Polygon
  const polygonPoints = useMemo(() => {
    return axes
      .map((axis, i) => {
        const angle = i * angleStep - Math.PI / 2;
        // The higher the deficit severity, the further out (closer to 1.0)
        // Ensure a minimum visual anchor of 0.15
        const valueRatio = Math.max(0.15, axis.deficitSeverity / 100);
        const x = center + radius * valueRatio * Math.cos(angle);
        const y = center + radius * valueRatio * Math.sin(angle);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  }, [axes, angleStep, center, radius]);

  // Benchmark Points (50% threshold)
  const benchmarkPoints = useMemo(() => {
    return axes
      .map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const x = center + radius * 0.4 * Math.cos(angle);
        const y = center + radius * 0.4 * Math.sin(angle);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  }, [axes, angleStep, center, radius]);

  const getAxisIcon = (cat: string) => {
    switch (cat) {
      case "grammar":
        return <FileCode2 className="h-3.5 w-3.5 text-rose-500" />;
      case "pronunciation":
        return <Volume2 className="h-3.5 w-3.5 text-purple-500" />;
      case "paraphrase_trap":
        return <Crosshair className="h-3.5 w-3.5 text-blue-500" />;
      case "singular_plural":
        return <Layers className="h-3.5 w-3.5 text-amber-500" />;
      case "careless_reading":
        return <AlertTriangle className="h-3.5 w-3.5 text-red-500" />;
      default:
        return <BookOpen className="h-3.5 w-3.5 text-emerald-500" />;
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-border/60 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <ShieldAlert className="h-3.5 w-3.5" />
            </span>
            <h3 className="font-black text-sm text-foreground tracking-tight">
              Radar Chuẩn Đoán Lỗ Hổng Nhận Thức
            </h3>
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            5 trục phân loại bẫy khảo thí Cambridge • Đỉnh càng vươn xa = Lỗ hổng càng nghiêm trọng
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-mono text-muted-foreground uppercase">
            Tỷ lệ làm chủ TB
          </span>
          <p className="text-lg font-black text-primary font-mono">{averageMastery}%</p>
        </div>
      </div>

      {/* Central Area: SVG Radar + Labels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* SVG Chart */}
        <div className="lg:col-span-7 flex justify-center items-center relative py-2">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="overflow-visible select-none drop-shadow-sm"
          >
            {/* Background Circular/Concentric Grid Rings */}
            {[0.2, 0.4, 0.6, 0.8, 1.0].map((ringLevel, idx) => (
              <circle
                key={`grid-${idx}`}
                cx={center}
                cy={center}
                r={radius * ringLevel}
                fill="none"
                stroke="currentColor"
                strokeWidth={ringLevel === 1.0 ? "1.5" : "0.75"}
                className={
                  ringLevel === 1.0
                    ? "stroke-border text-border"
                    : "stroke-border/40 text-border/40"
                }
                strokeDasharray={ringLevel < 1.0 ? "3,3" : undefined}
              />
            ))}

            {/* Axis Radial Lines */}
            {axes.map((_, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const x2 = center + radius * Math.cos(angle);
              const y2 = center + radius * Math.sin(angle);
              return (
                <line
                  key={`line-${i}`}
                  x1={center}
                  y1={center}
                  x2={x2}
                  y2={y2}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="stroke-border text-border"
                />
              );
            })}

            {/* Benchmark Polygon (Target Zone - 40% Deficit) */}
            <polygon
              points={benchmarkPoints}
              fill="none"
              stroke="#10b981"
              strokeWidth="1.5"
              strokeDasharray="4,4"
              className="opacity-40"
            />

            {/* Student Deficit Polygon */}
            <polygon
              points={polygonPoints}
              fill="url(#deficitGradient)"
              stroke="#f43f5e"
              strokeWidth="2.5"
              strokeLinejoin="round"
              className="transition-all duration-500 ease-out"
            />

            {/* Gradients */}
            <defs>
              <linearGradient id="deficitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Vertices Interactive Points */}
            {axes.map((axis, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const valueRatio = Math.max(0.15, axis.deficitSeverity / 100);
              const x = center + radius * valueRatio * Math.cos(angle);
              const y = center + radius * valueRatio * Math.sin(angle);

              return (
                <g key={`vertex-${axis.category}`} className="cursor-pointer group">
                  <circle
                    cx={x}
                    cy={y}
                    r="5"
                    fill={axis.accentHex}
                    stroke="white"
                    strokeWidth="2"
                    className="transition-transform group-hover:scale-125"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Breakdown Legend & Severity Bars */}
        <div className="lg:col-span-5 space-y-2.5">
          {axes.map((axis) => {
            const isDominant = axis.category === dominantDeficit.category;
            return (
              <button
                key={axis.category}
                type="button"
                onClick={() => onSelectCategory && onSelectCategory(axis.category)}
                className={`w-full text-left p-2 rounded-xl border transition-all cursor-pointer ${
                  isDominant
                    ? "bg-rose-500/10 border-rose-500/30 ring-1 ring-rose-500/20 shadow-xs"
                    : "bg-secondary/30 border-border/70 hover:bg-secondary/60"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    {getAxisIcon(axis.category)}
                    <span className="text-xs font-bold truncate text-foreground">
                      {axis.shortLabel}
                    </span>
                    {isDominant && (
                      <span className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-rose-600 text-white rounded-md tracking-wider">
                        Đỉnh Lỗ Hổng
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-right font-mono text-[11px] shrink-0">
                    <span
                      className={`font-black ${
                        axis.unmasteredCount > 0
                          ? "text-rose-600 dark:text-rose-400"
                          : "text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {axis.unmasteredCount} chưa sửa
                    </span>
                    <span className="text-muted-foreground text-[10px]">
                      ({axis.masteryPercentage}%)
                    </span>
                  </div>
                </div>

                {/* Progress Bar for Deficit */}
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      axis.masteryPercentage >= 80
                        ? "bg-emerald-500"
                        : axis.masteryPercentage >= 50
                        ? "bg-amber-500"
                        : "bg-rose-500"
                    }`}
                    style={{ width: `${axis.masteryPercentage}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dominant Deficit Callout Banner */}
      <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-3 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
          <p className="text-foreground text-[11px]">
            <strong className="text-rose-600 dark:text-rose-400">Trọng tâm can thiệp:</strong> Nhóm{" "}
            <span className="font-bold">{dominantDeficit.label}</span> đang có{" "}
            {dominantDeficit.unmasteredCount} lỗi tồn đọng.
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 uppercase bg-rose-500/10 px-2 py-1 rounded-md border border-rose-500/20 shrink-0">
          Cần Triệt Tiêu Ngay
        </span>
      </div>
    </div>
  );
}
