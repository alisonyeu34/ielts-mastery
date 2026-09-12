"use client";

import React from "react";
import {
  Clock,
  BookOpen,
  Zap,
  Brain,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import { DashboardAnalyticsData } from "@/hooks/useDashboardAnalytics";
import { cn } from "@/lib/utils";

interface StudyTimeDistributionProps {
  analytics: DashboardAnalyticsData;
  className?: string;
}

export function StudyTimeDistribution({
  analytics,
  className,
}: StudyTimeDistributionProps) {
  const dailyTargetMinutes = 180; // 3 hours
  const todayProgressPercent = Math.min(
    100,
    Math.round((analytics.todayStudyMinutes / dailyTargetMinutes) * 100)
  );

  const activities = [
    {
      title: "1. Lý Thuyết Tương Tác",
      targetMin: 45,
      icon: BookOpen,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "2. Luyện Dạng Bài Vi Mô",
      targetMin: 60,
      icon: Zap,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "3. Ôn Tập Từ Vựng FSRS",
      targetMin: 30,
      icon: Brain,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "4. Sửa Lỗi Sâu Error Bank",
      targetMin: 45,
      icon: ShieldAlert,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

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
          <Clock className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-extrabold text-foreground">
            Khung Kỷ Luật 3 Giờ / Ngày (Daily 3-Hour Target)
          </h3>
        </div>

        <span className="text-[11px] font-mono text-muted-foreground font-bold">
          {analytics.todayStudyMinutes} / {dailyTargetMinutes} phút hôm nay
        </span>
      </div>

      {/* Main Today Progress */}
      <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-foreground">
            Tiến độ hoàn thành cam kết hôm nay:
          </span>
          <span className="font-mono font-black text-primary">
            {todayProgressPercent}%
          </span>
        </div>

        <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
          <div
            style={{ width: `${todayProgressPercent}%` }}
            className="bg-primary h-full rounded-full transition-all duration-300"
          />
        </div>
      </div>

      {/* 4 Daily Activity Blocks */}
      <div className="grid grid-cols-2 gap-2.5 text-xs">
        {activities.map((act, idx) => {
          const IconComp = act.icon;

          return (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-card border border-border/80 space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <div className={cn("flex h-6 w-6 items-center justify-center rounded-lg", act.bg)}>
                  <IconComp className={cn("h-3.5 w-3.5", act.color)} />
                </div>
                <span className="font-bold text-foreground text-[11px] truncate">
                  {act.title}
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono pl-1">
                <span>Mục tiêu:</span>
                <strong>{act.targetMin} phút</strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
