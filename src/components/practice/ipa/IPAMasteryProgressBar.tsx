"use client";

import React from "react";
import { Award, Sparkles, TrendingUp, CheckCircle2 } from "lucide-react";
import { ALL_IPA_PHONEMES } from "@/data/mockIPAData";
import { cn } from "@/lib/utils";

interface IPAMasteryProgressBarProps {
  masteredCount: number;
  totalCount?: number;
  className?: string;
}

export function IPAMasteryProgressBar({
  masteredCount,
  totalCount = 44,
  className,
}: IPAMasteryProgressBarProps) {
  const percentage = Math.round((masteredCount / totalCount) * 100);

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 select-none",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-foreground">
              Tiến Độ Làm Chủ 44 Âm IPA Chuẩn Quốc Tế
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Giai đoạn 1 (Cứu ngữ pháp & Nền tảng 4.5 ➔ 5.5): Chuẩn hóa âm vị & vị trí cấu âm
            </p>
          </div>
        </div>

        <span className="font-mono text-xl sm:text-2xl font-black text-primary self-start sm:self-auto">
          {masteredCount}/{totalCount} <span className="text-xs font-normal text-muted-foreground">({percentage}%)</span>
        </span>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="h-2.5 w-full rounded-full bg-secondary overflow-hidden">
          <div
            style={{ width: `${percentage}%` }}
            className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-500 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
}
