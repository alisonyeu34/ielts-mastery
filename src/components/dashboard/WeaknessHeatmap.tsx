"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Sparkles,
} from "lucide-react";
import { DashboardAnalyticsData } from "@/hooks/useDashboardAnalytics";
import { cn } from "@/lib/utils";

interface WeaknessHeatmapProps {
  analytics: DashboardAnalyticsData;
  className?: string;
}

export function WeaknessHeatmap({
  analytics,
  className,
}: WeaknessHeatmapProps) {
  const { errorDistribution, totalErrorsCount, unresolvedErrorsCount } = analytics;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5 select-none",
        className
      )}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-rose-500" />
          <h3 className="text-sm font-extrabold text-foreground">
            Bản Đồ Điểm Nghẽn Nhận Thức (Weakness Heatmap)
          </h3>
        </div>

        <Link
          href="/error-bank"
          className="text-[11px] font-bold text-primary hover:underline flex items-center gap-0.5"
        >
          <span>Xem {unresolvedErrorsCount} lỗi</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Multi-segmented Distribution Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-foreground">
            Phân Bổ 5 Nhóm Lỗi Sai (Tổng: {totalErrorsCount} lỗi)
          </span>
          <span className="text-[11px] text-muted-foreground font-mono">
            {unresolvedErrorsCount} chưa khắc phục
          </span>
        </div>

        <div className="w-full h-3.5 bg-secondary rounded-full overflow-hidden flex">
          {errorDistribution.map((item) => {
            if (item.percentage === 0) return null;
            return (
              <div
                key={item.type}
                style={{ width: `${item.percentage}%` }}
                className={cn("h-full transition-all duration-300", item.color)}
                title={`${item.label}: ${item.count} lỗi (${item.percentage}%)`}
              />
            );
          })}
        </div>
      </div>

      {/* Legend & Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs pt-1">
        {errorDistribution.map((item) => (
          <div
            key={item.type}
            className="p-2.5 rounded-xl bg-secondary/30 border border-border/70 flex items-center justify-between gap-1.5"
          >
            <div className="flex items-center gap-1.5 truncate">
              <span className={cn("h-2.5 w-2.5 rounded-full shrink-0", item.color)} />
              <span className="text-muted-foreground truncate text-[11px] font-medium">
                {item.label}
              </span>
            </div>
            <span className="font-mono font-bold text-foreground text-[11px]">
              {item.count}
            </span>
          </div>
        ))}
      </div>

      {/* Diagnostic Warning Box */}
      <div className="p-3.5 rounded-2xl bg-rose-500/[0.05] border border-rose-500/20 text-xs space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-rose-600 dark:text-rose-400">
          <AlertTriangle className="h-3.5 w-3.5" />
          <span>Cảnh Báo Sư Phạm:</span>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Nhóm lỗi <strong>{analytics.topErrorType || "Ngữ pháp"}</strong> đang chiếm tỷ lệ cao nhất. Đề xuất làm ngay phiên <strong>Error Drill</strong> để không bị trừ điểm lặp lại trong bài thi thật.
        </p>
      </div>
    </div>
  );
}
