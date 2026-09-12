"use client";

import React from "react";
import Link from "next/link";
import {
  Lock,
  Unlock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  Layers,
  Flame,
  BookOpen,
  Target,
} from "lucide-react";
import { PhaseMilestoneProgress } from "@/lib/dashboardAnalytics";

interface RoadmapMilestoneTrackerProps {
  milestones: PhaseMilestoneProgress[];
}

export function RoadmapMilestoneTracker({ milestones }: RoadmapMilestoneTrackerProps) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Target className="h-4 w-4" />
            </span>
            <h2 className="font-black text-base text-foreground tracking-tight">
              Lộ Trình 165 Ngày • 3 Giai Đoạn Học Tập
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Từng chặng sẽ mở khóa dần khi bạn hoàn thành bài học lý thuyết và bài thi thử.
          </p>
        </div>

        <Link
          href="/roadmap"
          className="text-xs font-bold text-primary hover:underline flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Xem Lộ Trình 165 Ngày Chi Tiết</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* 3 Milestone Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {milestones.map((m) => {
          const isPhase1 = m.phase === 1;
          const isPhase2 = m.phase === 2;
          const isPhase3 = m.phase === 3;

          const themeBorder = m.isCurrent
            ? "border-primary ring-2 ring-primary/20 shadow-md"
            : m.isUnlocked
            ? "border-border hover:border-border/80"
            : "border-border/50 opacity-70 bg-secondary/20";

          const accentBg = isPhase1
            ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
            : isPhase2
            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
            : "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";

          return (
            <div
              key={m.phase}
              className={`rounded-2xl border bg-card/95 p-4 sm:p-5 flex flex-col justify-between space-y-4 transition-all ${themeBorder}`}
            >
              {/* Card Top: Phase Tag & Lock Status */}
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border uppercase ${accentBg}`}>
                  Band {m.targetBandRange}
                </span>

                <div className="flex items-center gap-1.5">
                  {m.isCurrent && (
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-mono animate-pulse">
                      Đang Học
                    </span>
                  )}

                  {m.isUnlocked ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <Unlock className="h-3.5 w-3.5" /> Đã Mở
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-muted-foreground">
                      <Lock className="h-3.5 w-3.5" /> Đang Khóa
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-foreground leading-snug">
                  {m.title}
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {m.subtitle}
                </p>
              </div>

              {/* Progress Bar & Stats */}
              <div className="space-y-2 pt-2 border-t border-border/60">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Tiến độ giai đoạn</span>
                  <span className="font-black text-foreground">{m.completionPercentage}%</span>
                </div>

                <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      m.completionPercentage >= 80
                        ? "bg-emerald-500"
                        : m.completionPercentage >= 40
                        ? "bg-amber-500"
                        : "bg-primary"
                    }`}
                    style={{ width: `${m.completionPercentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono pt-1">
                  <span>Bài học: {m.completedLessons}/{m.totalLessons}</span>
                  <span>Thi thử: {m.mockTestsPassed}/{m.requiredMockTests}</span>
                </div>
              </div>

              {/* Criteria Checklist Pills */}
              <div className="space-y-1.5 pt-1 text-[11px]">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <CheckCircle2
                    className={`h-3.5 w-3.5 shrink-0 ${
                      m.criteriaStatus.theoryCompleted ? "text-emerald-500" : "text-muted-foreground/40"
                    }`}
                  />
                  <span>Hoàn thành bài học lý thuyết</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <CheckCircle2
                    className={`h-3.5 w-3.5 shrink-0 ${
                      m.criteriaStatus.vocabMilestoneMet ? "text-emerald-500" : "text-muted-foreground/40"
                    }`}
                  />
                  <span>Đạt chỉ tiêu học từ vựng</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <CheckCircle2
                    className={`h-3.5 w-3.5 shrink-0 ${
                      m.criteriaStatus.mockTestThresholdMet ? "text-emerald-500" : "text-muted-foreground/40"
                    }`}
                  />
                  <span>Đạt điểm thi thử điều kiện</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                {m.isUnlocked ? (
                  <Link
                    href={isPhase1 ? "/theory" : isPhase2 ? "/practice" : "/mock-test"}
                    className="w-full py-2 px-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs flex items-center justify-center gap-1.5 shadow-xs transition-transform hover:scale-[1.02]"
                  >
                    <span>{m.isCurrent ? "Tiếp Tục Chặng Này" : "Vào Luyện Tập"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full py-2 px-3 rounded-xl bg-secondary text-muted-foreground font-semibold text-xs flex items-center justify-center gap-1.5 border border-border cursor-not-allowed"
                  >
                    <Lock className="h-3 w-3" />
                    <span>Chưa Mở Khóa</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
