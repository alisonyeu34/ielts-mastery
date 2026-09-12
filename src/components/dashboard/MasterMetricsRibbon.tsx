"use client";

import React from "react";
import {
  Award,
  Flame,
  Clock,
  TrendingUp,
  Target,
  Sparkles,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { DashboardAnalyticsData } from "@/hooks/useDashboardAnalytics";
import { cn } from "@/lib/utils";

interface MasterMetricsRibbonProps {
  analytics: DashboardAnalyticsData;
  className?: string;
}

export function MasterMetricsRibbon({
  analytics,
  className,
}: MasterMetricsRibbonProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none", className)}>
      {/* 1. Projected Band vs Target Band */}
      <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary/15 text-primary uppercase tracking-wider">
            Năng Lực Dự Báo
          </span>
          <Award className="h-4 w-4 text-primary" />
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-foreground">
              Band {analytics.projectedBand.toFixed(1)}
            </span>
            <span className="text-xs font-bold text-muted-foreground">
              / {analytics.targetBand.toFixed(1)} Target
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground flex items-center gap-1 font-medium">
            <TrendingUp className="h-3.5 w-3.5 text-amber-500" />
            <span>Khoảng cách mục tiêu: <strong>{analytics.bandGap.toFixed(1)} Band</strong></span>
          </p>
        </div>
      </div>

      {/* 2. Readiness Score % */}
      <div className="rounded-3xl border border-border bg-card p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            Chỉ Số Sẵn Sàng
          </span>
          <Target className="h-4 w-4 text-emerald-600" />
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black font-mono text-foreground">
              {analytics.readinessScore}%
            </span>
            <span className="text-[10px] text-emerald-600 font-bold">
              Trọng số 4 trụ cột
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div
              style={{ width: `${analytics.readinessScore}%` }}
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
            />
          </div>
        </div>
      </div>

      {/* 3. Iron Discipline: Streak & Roadmap Day */}
      <div className="rounded-3xl border border-border bg-card p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            Kỷ Luật Thép
          </span>
          <Flame className="h-4 w-4 text-amber-500 fill-amber-500 animate-pulse" />
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-foreground">
              {analytics.currentStreak}
            </span>
            <span className="text-xs font-bold text-muted-foreground">
              ngày liên tiếp
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground font-medium">
            Lộ trình: <strong>Ngày {analytics.currentRoadmapDay}/165</strong> (Phase {analytics.currentPhase})
          </p>
        </div>
      </div>

      {/* 4. Total Study Hours & Today Target */}
      <div className="rounded-3xl border border-border bg-card p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            Tổng Thời Gian Học
          </span>
          <Clock className="h-4 w-4 text-purple-600" />
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-foreground">
              {analytics.totalStudyHours}
            </span>
            <span className="text-xs font-bold text-muted-foreground">
              giờ tích lũy
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground font-medium">
            Hôm nay: <strong>{analytics.todayStudyMinutes}/420 phút</strong> (Mục tiêu 7h thực học • 10h ngồi bàn)
          </p>
        </div>
      </div>
    </div>
  );
}
