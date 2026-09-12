"use client";

import React from "react";
import {
  Flame,
  Target,
  Trophy,
  Sparkles,
  Calendar,
  Layers,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { PhaseNumber } from "@/types/database";
import { cn } from "@/lib/utils";

interface PhaseProgressHeaderProps {
  stats: {
    completedCount: number;
    totalDays: number;
    progressPercent: number;
    streakDays: number;
    currentDay: number;
    targetBand: number;
    phase1Percent: number;
    phase2Percent: number;
    phase3Percent: number;
  };
  activePhaseFilter: PhaseNumber | "all";
  onSelectFilter: (filter: PhaseNumber | "all") => void;
  className?: string;
}

export function PhaseProgressHeader({
  stats,
  activePhaseFilter,
  onSelectFilter,
  className,
}: PhaseProgressHeaderProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Top Banner: Streak, Day Count & Target Band */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/70 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
            <Sparkles className="h-4 w-4" /> Lộ Trình Học Tập 165 Ngày
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-foreground">
            Lộ Trình Học 165 Ngày (Band 4.5 ➔ 7.5)
          </h2>
          <p className="text-xs text-muted-foreground">
            Khởi động ngày mai: 12/9/2026 • Mục tiêu 2-3 tiếng/ngày • 3 Giai đoạn học tập
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Streak Badge */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 shadow-xs">
            <Flame className="h-5 w-5 fill-amber-500 animate-bounce" />
            <div>
              <span className="text-[10px] uppercase font-bold block leading-none">Chuỗi Học</span>
              <span className="text-sm font-black font-mono">
                {stats.streakDays === 0 ? "0 Ngày (Bắt đầu 12/9)" : `${stats.streakDays} Ngày Liên Tục`}
              </span>
            </div>
          </div>

          {/* Current Day / Target Band */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 shadow-xs">
            <Target className="h-5 w-5" />
            <div>
              <span className="text-[10px] uppercase font-bold block leading-none">Mục Tiêu</span>
              <span className="text-sm font-black font-mono">Band {stats.targetBand}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Phase Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Phase 1 */}
        <div className="p-4 rounded-2xl bg-red-500/[0.04] border border-red-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-red-700 dark:text-red-400">
              Giai đoạn 1: 14 Ngày Cứu Ngữ Pháp (12/9 - 25/9)
            </span>
            <span className="font-mono font-bold text-muted-foreground">
              {stats.phase1Percent}% (Ngày 1-14)
            </span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              style={{ width: `${stats.phase1Percent}%` }}
              className="h-full bg-red-700 rounded-full transition-all duration-300"
            />
          </div>
        </div>

        {/* Phase 2 */}
        <div className="p-4 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-rose-700 dark:text-rose-400">
              Giai đoạn 2: Chiến Thuật 4 Kỹ Năng (12/10 - 26/11)
            </span>
            <span className="font-mono font-bold text-muted-foreground">
              {stats.phase2Percent}% (Ngày 32-77)
            </span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              style={{ width: `${stats.phase2Percent}%` }}
              className="h-full bg-rose-700 rounded-full transition-all duration-300"
            />
          </div>
        </div>

        {/* Phase 3 */}
        <div className="p-4 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-amber-600 dark:text-amber-400">
              Giai đoạn 3: Luyện Đề Về Đích (27/11 - 22/2)
            </span>
            <span className="font-mono font-bold text-muted-foreground">
              {stats.phase3Percent}% (Ngày 78-165)
            </span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              style={{ width: `${stats.phase3Percent}%` }}
              className="h-full bg-amber-600 rounded-full transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Phase Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs font-bold text-muted-foreground mr-1 flex items-center gap-1">
          <Layers className="h-3.5 w-3.5" /> Lọc Giai Đoạn:
        </span>

        {[
          { id: "all", label: "Toàn bộ 165 Ngày" },
          { id: 1, label: "Giai đoạn 1 (4.5 ➔ 5.5)" },
          { id: 2, label: "Giai đoạn 2 (5.5 ➔ 6.5)" },
          { id: 3, label: "Giai đoạn 3 (6.5 ➔ 7.5+)" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectFilter(tab.id as PhaseNumber | "all")}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border",
              activePhaseFilter === tab.id
                ? "bg-primary text-primary-foreground border-primary shadow-xs"
                : "bg-secondary/40 text-muted-foreground hover:text-foreground border-border hover:bg-secondary"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
