"use client";

import React from "react";
import {
  ShieldCheck,
  AlertCircle,
  Target,
  Sparkles,
  CheckCircle2,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type SafeZoneSkill = "reading" | "listening" | "writing" | "speaking" | "grammar";

interface SafeZoneGaugeProps {
  skill: SafeZoneSkill;
  currentScore: number;
  maxScore: number;
  targetBandLabel?: string;
  customSafeThreshold?: number; // In raw score units
  unit?: string;
  className?: string;
}

const SKILL_DEFAULTS: Record<
  SafeZoneSkill,
  {
    targetBand: string;
    safePercentage: number;
    skillTitle: string;
    description: string;
  }
> = {
  reading: {
    targetBand: "8.5",
    safePercentage: 92.5, // 37/40
    skillTitle: "Reading",
    description: "Mục tiêu 8.5: Cần đạt tối thiểu 37/40 câu (92.5%)",
  },
  listening: {
    targetBand: "8.0",
    safePercentage: 87.5, // 35/40
    skillTitle: "Listening",
    description: "Mục tiêu 8.0: Cần đạt tối thiểu 35/40 câu (87.5%)",
  },
  writing: {
    targetBand: "6.5",
    safePercentage: 72.2, // 6.5 / 9.0
    skillTitle: "Writing",
    description: "Mục tiêu 6.5: Kiểm soát 100% ngữ pháp & cấu trúc PEEL",
  },
  speaking: {
    targetBand: "6.0",
    safePercentage: 50.0, // 50% nhịp điệu & âm đuôi
    skillTitle: "Speaking",
    description: "Mục tiêu 6.0: Nhại đúng ≥ 50% nhịp điệu & bật chuẩn âm đuôi (-s/-ed)",
  },
  grammar: {
    targetBand: "Chuẩn C1",
    safePercentage: 80.0,
    skillTitle: "Ngữ Pháp",
    description: "Mức an toàn: Sửa đúng ≥ 80% câu lỗi sai",
  },
};

export function SafeZoneGauge({
  skill,
  currentScore,
  maxScore,
  targetBandLabel,
  customSafeThreshold,
  unit = "câu",
  className,
}: SafeZoneGaugeProps) {
  const config = SKILL_DEFAULTS[skill];
  const targetBand = targetBandLabel || config.targetBand;

  // Compute safe threshold in current score scale
  const safeScore =
    customSafeThreshold !== undefined
      ? customSafeThreshold
      : Math.round((config.safePercentage / 100) * maxScore);

  const currentPercent = Math.min(100, Math.max(0, (currentScore / maxScore) * 100));
  const safePercent = Math.min(100, Math.max(0, (safeScore / maxScore) * 100));
  const isSafe = currentScore >= safeScore;
  const gap = Math.max(0, safeScore - currentScore);

  return (
    <div
      className={cn(
        "rounded-2xl border p-3.5 sm:p-4 transition-all select-none space-y-2.5",
        isSafe
          ? "border-emerald-500/40 bg-emerald-500/[0.05]"
          : "border-red-500/30 bg-card",
        className
      )}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-lg text-white font-bold text-xs shadow-xs",
              isSafe ? "bg-emerald-600" : "bg-red-700"
            )}
          >
            {isSafe ? <ShieldCheck className="h-4 w-4" /> : <Target className="h-4 w-4" />}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-foreground">
                Thước Đo Vùng An Toàn • {config.skillTitle} Band {targetBand}
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-secondary text-muted-foreground">
                Mốc: {safeScore}/{maxScore} {unit}
              </span>
            </div>
          </div>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {isSafe ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full shadow-2xs">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>ĐÃ ĐẠT MỨC AN TOÀN</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-500/15 border border-rose-500/30 px-2.5 py-1 rounded-full">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>Cần thêm {gap.toFixed(gap % 1 === 0 ? 0 : 1)} {unit}</span>
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar with Safe Zone Marker */}
      <div className="space-y-1">
        <div className="relative w-full h-3 bg-secondary/80 rounded-full overflow-hidden border border-border">
          {/* Current Score Progress Fill */}
          <div
            style={{ width: `${currentPercent}%` }}
            className={cn(
              "h-full rounded-full transition-all duration-500",
              isSafe ? "bg-emerald-500" : "bg-red-600"
            )}
          />

          {/* Vertical Safe Threshold Marker */}
          <div
            style={{ left: `${safePercent}%` }}
            className="absolute top-0 bottom-0 w-0.5 bg-foreground/80 z-10"
            title={`Vạch an toàn: ${safeScore} ${unit}`}
          />
        </div>

        {/* Scale labels below bar */}
        <div className="relative flex justify-between text-[10px] font-mono text-muted-foreground pt-0.5">
          <span>0 {unit}</span>
          <span
            style={{ left: `${safePercent}%`, transform: "translateX(-50%)" }}
            className="absolute font-bold text-foreground flex items-center gap-0.5"
          >
            ▲ Vạch An Toàn ({safeScore} {unit})
          </span>
          <span>{maxScore} {unit}</span>
        </div>
      </div>

      {/* Reassuring Psychological Note */}
      <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-0.5">
        <span className="flex items-center gap-1 truncate">
          <Info className="h-3 w-3 shrink-0 text-red-600 dark:text-red-400" />
          <span>{config.description}</span>
        </span>
        <span className="font-mono font-bold text-foreground shrink-0 ml-2">
          Hiện tại: {currentScore} / {maxScore} ({Math.round(currentPercent)}%)
        </span>
      </div>
    </div>
  );
}
