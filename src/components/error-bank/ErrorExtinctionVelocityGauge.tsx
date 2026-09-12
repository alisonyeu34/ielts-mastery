"use client";

import React, { useMemo } from "react";
import {
  Gauge,
  TrendingUp,
  TrendingDown,
  Minus,
  Zap,
  CheckCircle2,
  Flame,
  Calendar,
} from "lucide-react";
import { ErrorItem } from "@/types/database";
import { calculateEEV } from "@/lib/errorBankAnalytics";

interface ErrorExtinctionVelocityGaugeProps {
  errors: ErrorItem[];
  onTriggerArena?: () => void;
}

export function ErrorExtinctionVelocityGauge({
  errors,
  onTriggerArena,
}: ErrorExtinctionVelocityGaugeProps) {
  const eev = useMemo(() => calculateEEV(errors), [errors]);

  // Gauge SVG Math
  const radius = 68;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  // Semi-circle / 240-degree arc
  const arcPercentage = 0.75; // 270 degrees
  const strokeDasharray = `${circumference * arcPercentage} ${circumference}`;
  const strokeDashoffset =
    circumference * arcPercentage * (1 - eev.velocityScore / 100);

  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Gauge className="h-3.5 w-3.5" />
          </span>
          <h3 className="font-black text-sm text-foreground tracking-tight">
            Tốc Độ Triệt Tiêu Lỗi (EEV)
          </h3>
        </div>
        <span
          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border uppercase ${eev.statusBadgeColor}`}
        >
          {eev.statusLabel}
        </span>
      </div>

      {/* Main Gauge Visual */}
      <div className="flex flex-col sm:flex-row items-center justify-around gap-4 py-1">
        {/* Gauge Arc */}
        <div className="relative flex items-center justify-center">
          <svg width="170" height="170" className="transform -rotate-135">
            {/* Background Arc */}
            <circle
              cx="85"
              cy="85"
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={strokeDasharray}
              className="text-secondary"
              strokeLinecap="round"
            />
            {/* Active Velocity Arc */}
            <circle
              cx="85"
              cy="85"
              r={radius}
              stroke="url(#velocityGradient)"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="velocityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-0.5">
              <span className="text-3xl font-black font-mono text-foreground tracking-tight">
                {eev.velocityScore}
              </span>
              <span className="text-xs font-bold text-muted-foreground">/100</span>
            </div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              EEV Velocity
            </span>
          </div>
        </div>

        {/* Velocity Stats Grid */}
        <div className="space-y-2.5 w-full sm:w-auto">
          {/* Recent 7 Days Eliminated */}
          <div className="p-2.5 rounded-2xl border border-border/70 bg-secondary/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <div>
                <p className="text-[11px] font-bold text-foreground">Đã xóa 7 ngày qua</p>
                <p className="text-[10px] text-muted-foreground">Mastered trong tuần</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono font-black text-sm text-emerald-600 dark:text-emerald-400">
                +{eev.recent7DaysEliminated} câu
              </span>
            </div>
          </div>

          {/* Weekly Velocity Trend */}
          <div className="p-2.5 rounded-2xl border border-border/70 bg-secondary/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {eev.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              ) : eev.trend === "down" ? (
                <TrendingDown className="h-4 w-4 text-rose-500" />
              ) : (
                <Minus className="h-4 w-4 text-muted-foreground" />
              )}
              <div>
                <p className="text-[11px] font-bold text-foreground">Xu hướng tuần</p>
                <p className="text-[10px] text-muted-foreground">So với 7 ngày trước</p>
              </div>
            </div>
            <div className="text-right font-mono text-xs font-bold">
              {eev.trend === "up" ? (
                <span className="text-emerald-600 dark:text-emerald-400">
                  +{eev.trendPercentage}% tốc độ
                </span>
              ) : eev.trend === "down" ? (
                <span className="text-rose-600 dark:text-rose-400">
                  -{eev.trendPercentage}% chậm lại
                </span>
              ) : (
                <span className="text-muted-foreground">Đều đặn</span>
              )}
            </div>
          </div>

          {/* Mastered Ratio */}
          <div className="p-2.5 rounded-2xl border border-border/70 bg-secondary/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-[11px] font-bold text-foreground">Tổng số đã triệt tiêu</p>
                <p className="text-[10px] text-muted-foreground">Quy tắc 2 lần liên tiếp</p>
              </div>
            </div>
            <span className="font-mono font-black text-xs text-foreground">
              {eev.masteredCount} / {eev.totalErrors} ({eev.extinctionRatePct}%)
            </span>
          </div>
        </div>
      </div>

      {/* Description & Action Trigger */}
      <div className="rounded-2xl border border-border bg-secondary/20 p-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
        <p className="text-[11px] text-muted-foreground flex-1">
          💡 <strong className="text-foreground">Nguyên tắc:</strong> {eev.statusDescription}
        </p>

        {onTriggerArena && eev.unmasteredCount > 0 && (
          <button
            type="button"
            onClick={onTriggerArena}
            className="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs flex items-center justify-center gap-1.5 shadow-xs transition-transform hover:scale-105 shrink-0 cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Kích hoạt Arena ({eev.unmasteredCount})</span>
          </button>
        )}
      </div>
    </div>
  );
}
