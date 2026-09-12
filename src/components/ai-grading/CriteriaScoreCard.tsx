"use client";

import React from "react";
import { Award, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";
import { AIGradingScores } from "@/lib/aiGraderAPIClient";

interface CriteriaScoreCardProps {
  scores: AIGradingScores;
  criteriaLabels: {
    c1: string;
    c2: string;
    c3: string;
    c4: string;
  };
}

export function CriteriaScoreCard({ scores, criteriaLabels }: CriteriaScoreCardProps) {
  const criteriaList = [
    { label: criteriaLabels.c1, score: scores.criteria1 },
    { label: criteriaLabels.c2, score: scores.criteria2 },
    { label: criteriaLabels.c3, score: scores.criteria3 },
    { label: criteriaLabels.c4, score: scores.criteria4 },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 7.5) return "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (score >= 6.5) return "text-primary bg-primary/10 border-primary/20";
    if (score >= 6.0) return "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20";
    return "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20";
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5">
      {/* Top Ribbon: Overall Band Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-card to-background border border-primary/30">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-md shadow-primary/25">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
              Cambridge Examiner Assessment
            </span>
            <h3 className="text-base font-black text-foreground">
              Bảng Điểm 4 Tiêu Chí Chính Thức
            </h3>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-[10px] font-mono text-muted-foreground uppercase">
            Overall Band Score
          </span>
          <p className="text-3xl font-black text-primary font-mono tracking-tight">
            Band {scores.overallBand.toFixed(1)}
          </p>
        </div>
      </div>

      {/* 4 Criteria Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {criteriaList.map((item, idx) => {
          const pct = Math.round((item.score / 9) * 100);
          return (
            <div
              key={idx}
              className="p-3.5 rounded-2xl border border-border/80 bg-secondary/30 space-y-2 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-foreground leading-snug line-clamp-2">
                  {item.label}
                </span>
                <span className={`text-xs font-mono font-black px-2 py-0.5 rounded-lg border shrink-0 ${getScoreColor(item.score)}`}>
                  {item.score.toFixed(1)}
                </span>
              </div>

              <div className="space-y-1">
                <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      item.score >= 7.0
                        ? "bg-emerald-500"
                        : item.score >= 6.0
                        ? "bg-amber-500"
                        : "bg-rose-500"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                  <span>Quy đổi: {pct}%</span>
                  <span>Max: 9.0</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
