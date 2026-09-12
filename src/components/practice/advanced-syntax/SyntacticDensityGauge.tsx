"use client";

import React from "react";
import { Gauge, Sparkles, Layers, Award, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SyntacticDensityGaugeProps {
  score: number; // 0 to 100
  targetScore?: number;
  className?: string;
}

export function SyntacticDensityGauge({
  score,
  targetScore = 85,
  className,
}: SyntacticDensityGaugeProps) {
  const isHighDensity = score >= targetScore;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 shadow-sm space-y-4 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-primary" />
          <span className="font-bold text-xs text-foreground">
            Thước Đo Mật Độ Cú Pháp (Syntactic Density Gauge)
          </span>
        </div>

        <span
          className={cn(
            "text-xs font-mono font-black px-2.5 py-0.5 rounded-full border",
            isHighDensity
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
              : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
          )}
        >
          {score}% Mật Độ
        </span>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground font-bold">
          <span>Độ Nén Thông Tin Học Thuật:</span>
          <span>
            {score >= 90
              ? "Band 8.5+ (Dense Academic)"
              : score >= 80
              ? "Band 8.0 (Compact C1)"
              : score >= 65
              ? "Band 7.0 - 7.5 (Clear)"
              : "Band 6.0 (Loose / Spoken)"}
          </span>
        </div>

        <div className="w-full h-3 rounded-full bg-secondary overflow-hidden border border-border">
          <div
            style={{ width: `${score}%` }}
            className={cn(
              "h-full transition-all duration-300",
              score >= 85
                ? "bg-emerald-500"
                : score >= 70
                ? "bg-blue-500"
                : score >= 50
                ? "bg-amber-500"
                : "bg-rose-500"
            )}
          />
        </div>
      </div>

      {/* 3 Density Indicators */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2 rounded-xl bg-secondary/30 border border-border space-y-0.5">
          <span className="text-[10px] font-mono text-muted-foreground block">
            Từ Nội Dung
          </span>
          <span className="font-mono font-bold text-foreground text-xs">
            {score > 60 ? "Cao (C1)" : "Trung bình"}
          </span>
        </div>

        <div className="p-2 rounded-xl bg-secondary/30 border border-border space-y-0.5">
          <span className="text-[10px] font-mono text-muted-foreground block">
            Cụm Danh Từ
          </span>
          <span className="font-mono font-bold text-purple-600 text-xs">
            {score > 75 ? "Nén tối ưu" : "Rời rạc"}
          </span>
        </div>

        <div className="p-2 rounded-xl bg-secondary/30 border border-border space-y-0.5">
          <span className="text-[10px] font-mono text-muted-foreground block">
            Động Từ Mạnh
          </span>
          <span className="font-mono font-bold text-emerald-600 text-xs">
            {score > 80 ? "Đạt chuẩn" : "Cần bổ sung"}
          </span>
        </div>
      </div>
    </div>
  );
}
