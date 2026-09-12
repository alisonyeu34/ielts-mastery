"use client";

import React from "react";
import { AlertCircle, CheckCircle2, ShieldAlert, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface OverviewValidatorCalloutProps {
  overviewText: string;
  hasNumbers: boolean;
  className?: string;
}

export function OverviewValidatorCallout({
  overviewText,
  hasNumbers,
  className,
}: OverviewValidatorCalloutProps) {
  const isFilled = overviewText.trim().length > 20;

  if (!isFilled) {
    return (
      <div
        className={cn(
          "p-3 rounded-2xl bg-secondary/30 border border-border/80 text-xs text-muted-foreground flex items-center gap-2",
          className
        )}
      >
        <Sparkles className="h-4 w-4 text-indigo-500 shrink-0" />
        <span>
          <strong>Quy tắc Overview:</strong> Nêu 2-3 xu hướng chung và điểm cực trị nổi bật nhất. Tuyệt đối KHÔNG đưa số liệu cụ thể.
        </span>
      </div>
    );
  }

  if (hasNumbers) {
    return (
      <div
        className={cn(
          "p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-700 dark:text-rose-300 space-y-1.5 animate-pulse",
          className
        )}
      >
        <div className="flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <span>CẢNH BÁO VI PHẠM BAREM TASK 1 (OVERVIEW NUMBER TRAP)</span>
        </div>
        <p className="leading-relaxed text-[11px]">
          Phát hiện số liệu cụ thể trong đoạn Overview! Giám khảo Cambridge sẽ trừ điểm Task Achievement (giới hạn ở Band 5.0) nếu Overview chứa số liệu chi tiết. Hãy chuyển toàn bộ số liệu sang Body 1 & Body 2 và chỉ giữ lại mô tả xu hướng định tính (ví dụ: *followed an upward trajectory*, *experienced a dramatic surge*).
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2",
        className
      )}
    >
      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
      <span>
        <strong>Overview chuẩn học thuật (Band 7.0+):</strong> Đoạn văn mang tính khái quát cao, bao quát bức tranh tổng thể và không chứa số liệu vụn vặt.
      </span>
    </div>
  );
}
