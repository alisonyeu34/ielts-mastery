"use client";

import React from "react";
import {
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  TrendingUp,
  Award,
} from "lucide-react";
import { DashboardAnalyticsData } from "@/hooks/useDashboardAnalytics";
import { cn } from "@/lib/utils";

interface SkillRadarOverviewProps {
  analytics: DashboardAnalyticsData;
  className?: string;
}

export function SkillRadarOverview({
  analytics,
  className,
}: SkillRadarOverviewProps) {
  const { skillScores, targetBand } = analytics;

  const skills = [
    {
      id: "listening",
      name: "Listening",
      score: skillScores.listening,
      icon: Headphones,
      color: "text-blue-500",
      barColor: "bg-blue-500",
    },
    {
      id: "reading",
      name: "Reading",
      score: skillScores.reading,
      icon: BookOpen,
      color: "text-emerald-500",
      barColor: "bg-emerald-500",
    },
    {
      id: "writing",
      name: "Writing",
      score: skillScores.writing,
      icon: PenTool,
      color: "text-amber-500",
      barColor: "bg-amber-500",
    },
    {
      id: "speaking",
      name: "Speaking",
      score: skillScores.speaking,
      icon: Mic,
      color: "text-purple-500",
      barColor: "bg-purple-500",
    },
  ];

  const lowestSkill = [...skills].sort((a, b) => a.score - b.score)[0];

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
          <Award className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-extrabold text-foreground">
            Ma Trận Cân Bằng 4 Kỹ Năng (Skill Balance)
          </h3>
        </div>

        <span className="text-[11px] font-mono text-muted-foreground font-bold">
          Target Band {targetBand.toFixed(1)}
        </span>
      </div>

      {/* 4 Skill Comparison Bars */}
      <div className="space-y-3.5 text-xs">
        {skills.map((skill) => {
          const IconComp = skill.icon;
          const percent = (skill.score / 9.0) * 100;
          const isLagging = skill.id === lowestSkill.id;

          return (
            <div key={skill.id} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground flex items-center gap-1.5">
                  <IconComp className={cn("h-3.5 w-3.5", skill.color)} />
                  <span>{skill.name}</span>
                  {isLagging && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600 border border-amber-500/20">
                      Cần tập trung
                    </span>
                  )}
                </span>

                <div className="flex items-center gap-1.5 font-mono">
                  <span className="font-black text-foreground">
                    Band {skill.score.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground text-[10px]">/ 9.0</span>
                </div>
              </div>

              {/* Progress Track */}
              <div className="relative w-full bg-secondary rounded-full h-2 overflow-hidden">
                {/* Target Marker at 7.5 (83.3%) */}
                <div
                  style={{ left: `${(targetBand / 9.0) * 100}%` }}
                  className="absolute top-0 bottom-0 w-0.5 bg-foreground/40 z-10"
                  title="Target Band 7.5"
                />

                <div
                  style={{ width: `${percent}%` }}
                  className={cn("h-full rounded-full transition-all duration-300", skill.barColor)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Strategy Insight */}
      <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border text-xs space-y-1">
        <span className="font-bold text-foreground flex items-center gap-1">
          <TrendingUp className="h-3.5 w-3.5 text-primary" />
          <span>Chiến Thuật Bứt Phá:</span>
        </span>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Kỹ năng <strong>{lowestSkill.name}</strong> hiện đang có điểm thấp nhất (Band {lowestSkill.score.toFixed(1)}). Nâng kỹ năng này lên Band 7.0 sẽ giúp Overall Band tăng thêm <strong>+0.5 Band</strong> ngay lập tức.
        </p>
      </div>
    </div>
  );
}
