"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Brain,
  ShieldAlert,
  Target,
  Award,
  Zap,
  BookOpen,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { ActionRecommendation } from "@/lib/aiCoachRecommender";
import { cn } from "@/lib/utils";

interface NextBestActionCardProps {
  recommendations: ActionRecommendation[];
  className?: string;
}

const iconMap = {
  Brain,
  ShieldAlert,
  Target,
  Award,
  Zap,
  BookOpen,
};

export function NextBestActionCard({
  recommendations,
  className,
}: NextBestActionCardProps) {
  if (recommendations.length === 0) return null;

  const topAction = recommendations[0];
  const TopIcon = iconMap[topAction.iconName] || Zap;
  const secondaryActions = recommendations.slice(1);

  return (
    <div
      className={cn(
        "rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/10 via-card to-background p-6 sm:p-8 shadow-lg shadow-primary/5 space-y-6 select-none",
        className
      )}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/25">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary block leading-none">
              Adaptive AI Learning Coach
            </span>
            <h3 className="text-base sm:text-lg font-black text-foreground">
              Hành Động Tối Ưu Cần Làm Tiếp Theo (Next Best Action)
            </h3>
          </div>
        </div>

        <span className="text-[11px] font-mono text-muted-foreground self-start sm:self-auto">
          Thuật toán tự động định tuyến
        </span>
      </div>

      {/* Hero Featured Action Box */}
      <div className="p-5 sm:p-6 rounded-2xl bg-card border-2 border-primary/60 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all hover:border-primary">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-md",
              topAction.priority === "critical"
                ? "bg-rose-600 shadow-rose-600/25 animate-pulse"
                : "bg-primary shadow-primary/25"
            )}
          >
            <TopIcon className="h-6 w-6" />
          </div>

          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                  topAction.priority === "critical"
                    ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                    : "bg-primary/15 text-primary border border-primary/30"
                )}
              >
                {topAction.priority === "critical" ? "Ưu Tiên Số 1 (Khẩn Cấp)" : "Hành Động Đề Xuất"}
              </span>

              {topAction.badgeText && (
                <span className="text-[10px] font-bold text-muted-foreground font-mono">
                  • {topAction.badgeText}
                </span>
              )}

              <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-mono">
                <Clock className="h-3 w-3" />
                <span>{topAction.estimatedMinutes} phút</span>
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-extrabold text-foreground leading-snug">
              {topAction.title}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed font-serif">
              {topAction.reasoning}
            </p>
          </div>
        </div>

        <Link
          href={topAction.targetRoute}
          className="px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all hover:scale-105 shrink-0 cursor-pointer"
        >
          <span>{topAction.actionLabel}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Secondary Actions Row */}
      {secondaryActions.length > 0 && (
        <div className="space-y-2.5 pt-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Các Nhiệm Vụ Tiếp Theo Trong Ngày:
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {secondaryActions.map((action) => {
              const ActionIcon = iconMap[action.iconName] || Zap;

              return (
                <div
                  key={action.id}
                  className="p-4 rounded-2xl bg-secondary/30 border border-border/80 flex items-center justify-between gap-3 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3 truncate">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-card border border-border text-foreground">
                      <ActionIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="truncate">
                      <span className="font-bold text-foreground block truncate">
                        {action.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {action.estimatedMinutes} min • {action.category.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={action.targetRoute}
                    className="px-3.5 py-1.5 rounded-xl border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary text-foreground font-bold text-xs transition-all flex items-center gap-1 shrink-0"
                  >
                    <span>Làm</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
