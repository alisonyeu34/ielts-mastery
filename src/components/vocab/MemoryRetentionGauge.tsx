"use client";

import React from "react";
import {
  TrendingUp,
  Activity,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Sparkles,
} from "lucide-react";
import { computeRetrievability } from "@/lib/fsrsEngine";
import { cn } from "@/lib/utils";

interface MemoryRetentionGaugeProps {
  stability?: number;
  difficulty?: number;
  reps: number;
  lapses: number;
  lastReviewedAt?: string;
  className?: string;
}

export function MemoryRetentionGauge({
  stability = 1.5,
  difficulty = 5.0,
  reps,
  lapses,
  lastReviewedAt,
  className,
}: MemoryRetentionGaugeProps) {
  // Compute elapsed days since last review
  const elapsedDays = lastReviewedAt
    ? Math.max(0, (Date.now() - new Date(lastReviewedAt).getTime()) / (1000 * 3600 * 24))
    : 0;

  const retrievability = computeRetrievability(stability, elapsedDays);

  const isSafe = retrievability >= 80;
  const isWarning = retrievability < 80 && retrievability >= 60;

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-secondary/30 p-4 space-y-3 text-xs select-none",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-bold text-foreground">
          <Activity className="h-4 w-4 text-primary" />
          <span>Độ Bền Trí Nhớ & Xác Suất Nhớ Lại (FSRS)</span>
        </div>

        <span
          className={cn(
            "text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border",
            isSafe
              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
              : isWarning
              ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
              : "bg-rose-500/10 text-rose-600 border-rose-500/30"
          )}
        >
          {isSafe ? "Trí Nhớ Tươi Mới" : isWarning ? "Chuẩn Bị Quên" : "Vùng Lãng Quên"}
        </span>
      </div>

      {/* Retention Progress Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className="text-muted-foreground">Xác suất nhớ lại (Retrievability):</span>
          <span className="font-bold text-foreground">{retrievability}%</span>
        </div>

        <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
          <div
            style={{ width: `${retrievability}%` }}
            className={cn(
              "h-full rounded-full transition-all duration-300",
              isSafe ? "bg-emerald-500" : isWarning ? "bg-amber-500" : "bg-rose-500"
            )}
          />
        </div>
      </div>

      {/* 3 Metric Badges */}
      <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-center pt-1">
        <div className="p-2 rounded-xl bg-card border border-border">
          <span className="text-muted-foreground block">Độ Bền (Stability)</span>
          <strong className="text-foreground text-xs">{stability} ngày</strong>
        </div>

        <div className="p-2 rounded-xl bg-card border border-border">
          <span className="text-muted-foreground block">Độ Khó (Difficulty)</span>
          <strong className="text-foreground text-xs">{difficulty}/10</strong>
        </div>

        <div className="p-2 rounded-xl bg-card border border-border">
          <span className="text-muted-foreground block">Số Lần Ôn (Reps/Lapse)</span>
          <strong className="text-foreground text-xs">
            {reps} / <span className="text-rose-600">{lapses}</span>
          </strong>
        </div>
      </div>
    </div>
  );
}
