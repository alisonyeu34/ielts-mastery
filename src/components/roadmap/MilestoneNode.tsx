"use client";

import React from "react";
import {
  Lock,
  CheckCircle2,
  Trophy,
  Play,
  Sparkles,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { RoadmapDayNode } from "@/data/mockRoadmapTimeline";
import { cn } from "@/lib/utils";

interface MilestoneNodeProps {
  dayNode: RoadmapDayNode;
  status: "locked" | "active" | "completed" | "gatekeeper_ready";
  onClick: () => void;
  className?: string;
}

export function MilestoneNode({
  dayNode,
  status,
  onClick,
  className,
}: MilestoneNodeProps) {
  const isLocked = status === "locked";
  const isActive = status === "active";
  const isCompleted = status === "completed";
  const isGatekeeper = dayNode.isGatekeeper;

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative rounded-3xl border p-4 sm:p-5 transition-all select-none",
        isLocked
          ? "bg-secondary/10 border-border/40 text-muted-foreground/50 opacity-60 cursor-not-allowed"
          : isCompleted
          ? "bg-emerald-500/[0.04] border-emerald-500/40 hover:border-emerald-500 hover:shadow-md cursor-pointer"
          : isGatekeeper
          ? "bg-amber-500/[0.08] border-amber-500/60 shadow-lg shadow-amber-500/10 hover:border-amber-500 hover:scale-105 cursor-pointer ring-2 ring-amber-500/30 animate-pulse"
          : isActive
          ? "bg-card border-primary/80 shadow-md shadow-primary/10 hover:border-primary hover:scale-[1.02] cursor-pointer ring-2 ring-primary/30"
          : "bg-card border-border hover:border-border/80 hover:shadow-sm cursor-pointer",
        className
      )}
    >
      {/* Top Node Header: Day # & Status Badge */}
      <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2.5">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-xl font-mono text-xs font-black border",
              isGatekeeper
                ? "bg-amber-600 text-white border-amber-600"
                : isCompleted
                ? "bg-emerald-600 text-white border-emerald-600"
                : isActive
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary text-muted-foreground border-border"
            )}
          >
            {isCompleted ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : isGatekeeper ? (
              <Trophy className="h-4 w-4" />
            ) : isLocked ? (
              <Lock className="h-3.5 w-3.5" />
            ) : (
              dayNode.dayNumber
            )}
          </span>

          <span className="text-xs font-black text-foreground">
            Ngày {dayNode.dayNumber}
          </span>
        </div>

        {/* Focus Skill Pill */}
        <span
          className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border",
            dayNode.phase === 1
              ? "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
              : dayNode.phase === 2
              ? "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20"
              : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
          )}
        >
          {isGatekeeper ? "BOSS FIGHT" : dayNode.focusSkill}
        </span>
      </div>

      {/* Main Title & Summary */}
      <div className="space-y-1 py-2.5">
        <h4
          className={cn(
            "text-xs sm:text-sm font-extrabold leading-snug line-clamp-2",
            isLocked ? "text-muted-foreground/60" : "text-foreground group-hover:text-primary transition-colors"
          )}
        >
          {dayNode.title}
        </h4>
        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
          {dayNode.summary}
        </p>
      </div>

      {/* Footer / Action trigger */}
      <div className="flex items-center justify-between pt-2 border-t border-border/60 text-[11px]">
        <span className="text-muted-foreground text-[10px]">
          {isGatekeeper ? "Sát hạch vượt cấp" : "4 nhiệm vụ (3 giờ)"}
        </span>

        {!isLocked && (
          <span
            className={cn(
              "font-bold flex items-center gap-1 text-[11px]",
              isCompleted
                ? "text-emerald-600 dark:text-emerald-400"
                : isGatekeeper
                ? "text-amber-600 dark:text-amber-400"
                : "text-primary"
            )}
          >
            <span>{isCompleted ? "Xem lại" : isGatekeeper ? "Vào thi Boss" : "Mở nhiệm vụ"}</span>
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </span>
        )}
      </div>
    </div>
  );
}
