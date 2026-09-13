"use client";

import React, { useState } from "react";
import { CheckCircle2, Lock, Sparkles, ChevronRight, Target, Calendar, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { RoadmapPhase } from "@/types/roadmap";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ROADMAP_PHASES } from "@/lib/constants";

interface PhaseTrackerProps {
  className?: string;
  compact?: boolean;
}

export function PhaseTracker({ className, compact = false }: PhaseTrackerProps) {
  const [selectedPhase, setSelectedPhase] = useState<RoadmapPhase>(ROADMAP_PHASES[0]);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn("w-full bg-card/60 backdrop-blur-md rounded-2xl border border-border/80 p-4 shadow-sm", className)}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-red-600 animate-ping" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Lộ Trình Học 180 Ngày
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-semibold text-red-700 dark:text-red-400 border border-red-500/20">
              <Target className="h-3 w-3" /> Target 7.5
            </span>
          </div>
          <p className="text-sm font-medium text-foreground mt-0.5">
            Đang học: <strong className="text-red-700 dark:text-red-400">{ROADMAP_PHASES[0].title}</strong> (Band 4.5 ➔ 5.5)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-muted-foreground">Tiến độ tổng thể</div>
            <div className="text-sm font-bold text-foreground">Ngày 1 / 165 (Khởi động 14/9)</div>
          </div>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-medium text-red-700 dark:text-red-400 hover:underline flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors"
          >
            {expanded ? "Thu gọn chi tiết" : "Xem chi tiết 3 Giai đoạn"}
            <ChevronRight className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-90")} />
          </button>
        </div>
      </div>

      {/* 3-Phase Stepper */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {ROADMAP_PHASES.map((phase) => {
          const isActive = phase.status === "active";
          const isCompleted = phase.status === "completed";
          const isLocked = phase.status === "locked";
          const isSelected = selectedPhase.id === phase.id;

          return (
            <div
              key={phase.id}
              onClick={() => setSelectedPhase(phase)}
              className={cn(
                "relative rounded-xl border p-3.5 transition-all cursor-pointer select-none",
                isActive && "border-red-500/50 bg-red-500/[0.04] shadow-sm ring-1 ring-red-500/20",
                isCompleted && "border-emerald-500/40 bg-emerald-500/[0.03]",
                isLocked && "border-border/60 bg-muted/30 opacity-80 hover:opacity-100",
                isSelected && "ring-2 ring-primary"
              )}
            >
              {/* Header inside phase card */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold shrink-0",
                      isActive && "bg-red-700 text-white shadow-sm shadow-red-700/40",
                      isCompleted && "bg-emerald-600 text-white",
                      isLocked && "bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : isLocked ? (
                      <Lock className="h-3.5 w-3.5" />
                    ) : (
                      <span>P{phase.phaseNumber}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground line-clamp-1">
                      {phase.title}
                    </h4>
                    <span className="text-[11px] font-semibold text-red-700 dark:text-red-400">
                      {phase.targetRange}
                    </span>
                  </div>
                </div>

                <span
                  className={cn(
                    "text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0",
                    isActive && "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
                    isCompleted && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
                    isLocked && "bg-muted text-muted-foreground border-border"
                  )}
                >
                  {isActive ? "Đang học" : isCompleted ? "Đã xong" : "Khóa"}
                </span>
              </div>

              {/* Progress and duration */}
              <div className="space-y-1.5 mt-2">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {phase.duration}
                  </span>
                  <span className="font-semibold text-foreground">
                    {isActive ? `${phase.progressPercent}%` : isLocked ? "Mở khóa sau P1" : "100%"}
                  </span>
                </div>
                <ProgressBar
                  value={phase.progressPercent}
                  size="sm"
                  variant={isActive ? "primary" : isCompleted ? "emerald" : "primary"}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Expandable Phase Details */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-border/60 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-red-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Mục tiêu Trọng tâm: {selectedPhase.title} ({selectedPhase.targetRange})
              </h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {selectedPhase.description}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedPhase.focusAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="text-[11px] bg-secondary/80 border border-border px-2 py-0.5 rounded-md text-secondary-foreground"
                >
                  • {area}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Cột Mốc Mở Khóa (Milestones)
              </h4>
            </div>
            <div className="space-y-1.5">
              {selectedPhase.milestones.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center gap-2 text-xs p-2 rounded-lg bg-secondary/40 border border-border/50"
                >
                  {m.completed ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  ) : (
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-muted-foreground/40 shrink-0" />
                  )}
                  <span className={cn(m.completed && "line-through text-muted-foreground")}>
                    {m.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
