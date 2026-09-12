"use client";

import React from "react";
import { AlertTriangle, TrendingUp, ShieldAlert, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface UptalkWarningAlertProps {
  isUptalkDetected: boolean;
  uptalkCount: number;
  className?: string;
}

export function UptalkWarningAlert({
  isUptalkDetected,
  uptalkCount,
  className,
}: UptalkWarningAlertProps) {
  if (!isUptalkDetected && uptalkCount === 0) {
    return (
      <div
        className={cn(
          "p-3 rounded-2xl bg-secondary/30 border border-border/80 text-xs text-muted-foreground flex items-center gap-2",
          className
        )}
      >
        <Sparkles className="h-4 w-4 text-indigo-500 shrink-0" />
        <span>
          <strong>Quy tắc Ngữ điệu Band 7.5+:</strong> Luôn hạ giọng ở âm tiết cuối của câu trần thuật (Falling Intonation) để thể hiện sự đĩnh đạc, chắc chắn.
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-3.5 rounded-2xl border text-xs transition-all space-y-1.5 select-none",
        isUptalkDetected
          ? "bg-rose-500/15 border-rose-500/40 text-rose-800 dark:text-rose-200 animate-pulse ring-2 ring-rose-500/30"
          : "bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-200",
        className
      )}
    >
      <div className="flex items-center gap-2 font-bold">
        <ShieldAlert className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
        <span>
          {isUptalkDetected
            ? "PHÁT HIỆN LỖI UPTALK (LÊN GIỌNG CUỐI CÂU TRẦN THUẬT)!"
            : `Đã phát hiện ${uptalkCount} lần lỗi Uptalk trong phiên nói`}
        </span>
      </div>
      <p className="leading-relaxed text-[11px]">
        Việc vô thức vọt cao độ ở cuối câu trần thuật khiến lời nói nghe giống như câu hỏi hoặc bạn đang hoài nghi luận điểm của chính mình. Hãy chủ động <strong>hạ cao độ giọng nói (Fall)</strong> ở 1-2 âm tiết cuối cùng để tạo độ thuyết phục học thuật.
      </p>
    </div>
  );
}
