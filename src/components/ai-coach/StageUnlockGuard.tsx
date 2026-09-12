"use client";

import React from "react";
import {
  evaluateStageGates,
  StageGateStatus,
} from "@/lib/disciplineTelemetry";
import {
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StageUnlockGuardProps {
  completedIpaCount?: number;
  grammarQuizzesPassed?: number;
  masteredErrorsCount?: number;
  totalErrorsCount?: number;
  latestMockBand?: number;
  className?: string;
}

export function StageUnlockGuard({
  completedIpaCount = 0,
  grammarQuizzesPassed = 0,
  masteredErrorsCount = 0,
  totalErrorsCount = 0,
  latestMockBand = 4.5,
  className,
}: StageUnlockGuardProps) {
  const gates: StageGateStatus[] = evaluateStageGates(
    completedIpaCount,
    grammarQuizzesPassed,
    masteredErrorsCount,
    totalErrorsCount,
    latestMockBand
  );

  const activeStageLabel = gates[2]?.isUnlocked
    ? "Giai Đoạn 3 (6.5 ➔ 7.5+)"
    : gates[1]?.isUnlocked
    ? "Giai Đoạn 2 (5.5 ➔ 6.5)"
    : "Giai Đoạn 1 (4.5 ➔ 5.5)";

  return (
    <div
      className={cn(
        "p-5 sm:p-6 rounded-3xl border border-border bg-card shadow-sm space-y-5 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-foreground">
              Lộ Trình Mở Khóa 3 Giai Đoạn (165 Ngày)
            </h3>
            <p className="text-xs text-muted-foreground">
              Học tuần tự chuẩn lộ trình: Hoàn thành vững chắc bài tập nền tảng trước khi bước vào các dạng bài nâng cao.
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-xs font-bold font-mono self-start sm:self-auto">
          Đang Học: {activeStageLabel}
        </span>
      </div>

      {/* 3 Stage Gates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {gates.map((g) => {
          return (
            <div
              key={g.stageNumber}
              className={cn(
                "p-4 rounded-2xl border transition-all space-y-3 relative overflow-hidden flex flex-col justify-between",
                g.isUnlocked
                  ? "bg-secondary/20 border-border"
                  : "bg-secondary/40 border-border/50 opacity-60"
              )}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-secondary text-muted-foreground uppercase">
                    {g.durationMonths} • Band {g.targetBandRange}
                  </span>

                  <div className="flex items-center gap-1">
                    {g.isUnlocked ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                        <Unlock className="h-3 w-3" />
                        <span>ĐÃ MỞ</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground font-mono">
                        <Lock className="h-3 w-3" />
                        <span>KHÓA</span>
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="text-xs font-black text-foreground">{g.stageNameVi}</h4>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-purple-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${g.progressPercentage}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground block text-right">
                    {g.progressPercentage}% Hoàn thành
                  </span>
                </div>
              </div>

              {/* Unlock Requirements Checklist */}
              <div className="space-y-1.5 pt-2 border-t border-border/70 text-xs">
                <span className="text-[10px] font-bold text-muted-foreground font-mono uppercase block">
                  Điều kiện qua cổng:
                </span>

                {g.unlockRequirements.map((req, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-1.5 text-[11px] leading-tight">
                    {req.isMet ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                    )}
                    <span className={cn(req.isMet ? "text-foreground font-medium" : "text-muted-foreground")}>
                      {req.titleVi}: <strong className="font-mono">{req.currentValue}</strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
