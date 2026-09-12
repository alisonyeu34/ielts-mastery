"use client";

import React from "react";
import {
  Award,
  Sparkles,
  TrendingUp,
  Target,
  Mic,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SpeakingBandOverviewProps {
  part: 1 | 2 | 3;
  overallBand: number;
  scores: {
    fc: number;
    lr: number;
    gra: number;
    pr: number;
  };
  className?: string;
}

export function SpeakingBandOverview({
  part,
  overallBand,
  scores,
  className,
}: SpeakingBandOverviewProps) {
  const targetBand = 7.5;
  const gap = Number((targetBand - overallBand).toFixed(1));

  const criteriaList = [
    { key: "fc", name: "Fluency & Coherence (FC)", score: scores.fc, desc: "Độ trôi chảy & Ngập ngừng" },
    { key: "lr", name: "Lexical Resource (LR)", score: scores.lr, desc: "Từ vựng & Cụm Collocations" },
    { key: "gra", name: "Grammatical Range (GRA)", score: scores.gra, desc: "Độ chính xác thì & Cú pháp" },
    { key: "pr", name: "Pronunciation (PR)", score: scores.pr, desc: "Âm cuối & Trọng âm ngữ điệu" },
  ];

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Top Header & Big Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-5">
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
            Thẩm Định Chuẩn Barem Speaking Cambridge
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            Báo Cáo Điểm Speaking Part {part}
          </h3>
          <p className="text-xs text-muted-foreground">
            Mục tiêu: Band {targetBand} • Còn thiếu {gap > 0 ? `+${gap} Band` : "Đã Đạt Mục Tiêu!"}
          </p>
        </div>

        {/* Overall Big Badge */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-gradient-to-br from-primary/15 via-secondary to-card border border-primary/30 shadow-xs self-start sm:self-auto">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white font-black text-xl shadow-md shadow-primary/25">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-muted-foreground uppercase block font-bold">
              Speaking Overall
            </span>
            <span className="text-2xl sm:text-3xl font-black font-mono text-foreground">
              {overallBand.toFixed(1)} <span className="text-xs text-muted-foreground font-normal">/ 9.0</span>
            </span>
          </div>
        </div>
      </div>

      {/* 4 Criteria Competency Progress Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {criteriaList.map((c) => {
          const percentage = (c.score / 9.0) * 100;

          return (
            <div
              key={c.key}
              className="p-4 rounded-2xl bg-secondary/20 border border-border/80 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs sm:text-sm text-foreground block">
                    {c.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {c.desc}
                  </span>
                </div>
                <span className="font-mono text-base sm:text-lg font-black text-primary">
                  {c.score.toFixed(1)}
                </span>
              </div>

              {/* Progress track */}
              <div className="relative h-2.5 w-full rounded-full bg-secondary overflow-hidden">
                <div
                  style={{ width: `${percentage}%` }}
                  className={cn(
                    "h-full rounded-full transition-all duration-300",
                    c.score >= 7.0 ? "bg-emerald-500" : c.score >= 6.0 ? "bg-primary" : "bg-amber-500"
                  )}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                <span>Hiện tại: {c.score.toFixed(1)}</span>
                <span className="text-primary font-bold">Mục tiêu: {targetBand}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
