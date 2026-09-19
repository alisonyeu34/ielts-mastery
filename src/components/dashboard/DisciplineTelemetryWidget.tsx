"use client";

import React from "react";
import {
  Flame,
  Clock,
  Calendar,
  Zap,
  TrendingUp,
  Award,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { DisciplineTelemetryData } from "@/lib/dashboardAnalytics";

interface DisciplineTelemetryWidgetProps {
  discipline: DisciplineTelemetryData;
}

export function DisciplineTelemetryWidget({ discipline }: DisciplineTelemetryWidgetProps) {
  const {
    streakDays,
    currentDay,
    totalStudyMinutes,
    todayStudyMinutes,
    dailyTargetMinutes,
    dailyDisciplinePercentage,
    weeklyStudyHours,
  } = discipline;

  const totalHours = Math.round((totalStudyMinutes / 60) * 10) / 10;
  const todayHours = Math.round((todayStudyMinutes / 60) * 10) / 10;
  const targetHours = Math.round((dailyTargetMinutes / 60) * 10) / 10;

  const isDailyTargetMet = dailyDisciplinePercentage >= 100;

  return (
    <div className="rounded-3xl border border-border bg-gradient-to-br from-card via-card to-secondary/30 p-5 sm:p-6 shadow-sm space-y-5">
      {/* Top Banner: Day Number & Streak */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 ring-2 ring-amber-500/20 shadow-xs">
            <Flame className="h-5 w-5 fill-amber-500 animate-pulse" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Mục Tiêu Thực Học 7h/Ngày (Ngồi Bàn 10h)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded-md bg-secondary text-muted-foreground border border-border">
                Ngày {currentDay} / 165 (Khởi động: 19/9)
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-foreground">
              {streakDays === 0 ? "Chuỗi Học: 0 Ngày (Bắt đầu 19/9)" : `Chuỗi Học Tập: ${streakDays} Ngày Liên Tiếp`}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isDailyTargetMet ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold font-mono text-xs border border-emerald-500/20">
              <CheckCircle2 className="h-4 w-4" /> Đạt Chỉ Tiêu Hôm Nay
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold font-mono text-xs border border-amber-500/20">
              <Clock className="h-3.5 w-3.5" /> Còn {Math.max(0, dailyTargetMinutes - todayStudyMinutes)} phút hôm nay
            </span>
          )}
        </div>
      </div>

      {/* Main Grid: 4 Metric Blocks */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Metric 1: Today Active Time */}
        <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border/80 space-y-1">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Hôm nay</span>
            <Clock className="h-3.5 w-3.5 text-primary" />
          </div>
          <p className="text-lg sm:text-xl font-black font-mono text-foreground">
            {todayMinutesToString(todayStudyMinutes)}
          </p>
          <p className="text-[10px] text-muted-foreground font-mono">
            Mục tiêu: {targetHours}h/ngày
          </p>
        </div>

        {/* Metric 2: Today Quota Progress */}
        <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border/80 space-y-1">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Tiến độ hôm nay</span>
            <Zap className="h-3.5 w-3.5 text-amber-500" />
          </div>
          <p className="text-lg sm:text-xl font-black font-mono text-amber-600 dark:text-amber-400">
            {dailyDisciplinePercentage}%
          </p>
          <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden mt-1">
            <div
              className={`h-full rounded-full ${isDailyTargetMet ? "bg-emerald-500" : "bg-amber-500"}`}
              style={{ width: `${Math.min(100, dailyDisciplinePercentage)}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Weekly Active Hours */}
        <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border/80 space-y-1">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Tuần này</span>
            <Calendar className="h-3.5 w-3.5 text-blue-500" />
          </div>
          <p className="text-lg sm:text-xl font-black font-mono text-foreground">
            {weeklyStudyHours}h
          </p>
          <p className="text-[10px] text-muted-foreground font-mono">
            Mục tiêu 49h/tuần (7h/ngày)
          </p>
        </div>

        {/* Metric 4: Total Accumulated Time */}
        <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border/80 space-y-1">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Tổng giờ học</span>
            <Award className="h-3.5 w-3.5 text-purple-500" />
          </div>
          <p className="text-lg sm:text-xl font-black font-mono text-foreground">
            {totalHours}h
          </p>
          <p className="text-[10px] text-muted-foreground font-mono">
            Lộ trình 165 ngày (~1,155h thực học)
          </p>
        </div>
      </div>
    </div>
  );
}

function todayMinutesToString(mins: number): string {
  if (mins < 60) return `${mins} phút`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m}p`;
}
