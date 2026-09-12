"use client";

import React from "react";
import {
  Award,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { MockExamResult } from "@/lib/bandCalculator";
import { cn } from "@/lib/utils";

interface OfficialScoreBreakdownProps {
  result: MockExamResult;
  className?: string;
}

export function OfficialScoreBreakdown({
  result,
  className,
}: OfficialScoreBreakdownProps) {
  const isTargetAchieved = result.overallBand >= result.targetBand;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* TRF Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
              Official Test Report Form (TRF) Simulation
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-foreground">
            Bảng Điểm Tổng Hợp 4 Kỹ Năng Chuẩn Khảo Thí
          </h3>
          <p className="text-xs text-muted-foreground">
            {result.testTitle} • Ngày thi: {new Date(result.completedAt).toLocaleDateString("vi-VN")}
          </p>
        </div>

        {/* Overall Band Stamp */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div
            className={cn(
              "px-5 py-2.5 rounded-2xl border-2 flex items-center gap-3 shadow-md",
              isTargetAchieved
                ? "bg-emerald-500/10 border-emerald-500/60 text-emerald-600 dark:text-emerald-400 shadow-emerald-500/10"
                : "bg-primary/10 border-primary/60 text-primary shadow-primary/10"
            )}
          >
            <Award className="h-6 w-6" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider block leading-none">
                OVERALL BAND
              </span>
              <span className="text-2xl font-black font-mono">
                {result.overallBand.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Skills Big Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {/* Listening */}
        <div className="p-4 rounded-2xl bg-blue-500/[0.04] border border-blue-500/20 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <Headphones className="h-3.5 w-3.5" />
              <span>Listening</span>
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">
              {result.listening.rawScore !== undefined ? `${result.listening.rawScore}/40` : ""}
            </span>
          </div>
          <span className="text-2xl sm:text-3xl font-black font-mono text-foreground block">
            {result.listening.bandScore.toFixed(1)}
          </span>
        </div>

        {/* Reading */}
        <div className="p-4 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Reading</span>
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">
              {result.reading.rawScore !== undefined ? `${result.reading.rawScore}/40` : ""}
            </span>
          </div>
          <span className="text-2xl sm:text-3xl font-black font-mono text-foreground block">
            {result.reading.bandScore.toFixed(1)}
          </span>
        </div>

        {/* Writing */}
        <div className="p-4 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <PenTool className="h-3.5 w-3.5" />
              <span>Writing</span>
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">AI Graded</span>
          </div>
          <span className="text-2xl sm:text-3xl font-black font-mono text-foreground block">
            {result.writing.bandScore.toFixed(1)}
          </span>
        </div>

        {/* Speaking */}
        <div className="p-4 rounded-2xl bg-purple-500/[0.04] border border-purple-500/20 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400 flex items-center gap-1">
              <Mic className="h-3.5 w-3.5" />
              <span>Speaking</span>
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">AI Graded</span>
          </div>
          <span className="text-2xl sm:text-3xl font-black font-mono text-foreground block">
            {result.speaking.bandScore.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Sub-Criteria Breakdown Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Writing Sub-criteria */}
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-2.5">
          <span className="font-bold text-foreground uppercase tracking-wider text-[10px] block">
            Phân Tích Tiêu Chí Writing (Task 1 + Task 2):
          </span>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded-xl bg-card border border-border/70 flex justify-between items-center">
              <span className="text-muted-foreground">Task Achievement (TR):</span>
              <strong className="font-mono text-amber-600">{result.writing.criteriaScores?.tr?.toFixed(1) || "7.0"}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-card border border-border/70 flex justify-between items-center">
              <span className="text-muted-foreground">Coherence (CC):</span>
              <strong className="font-mono text-amber-600">{result.writing.criteriaScores?.cc?.toFixed(1) || "7.5"}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-card border border-border/70 flex justify-between items-center">
              <span className="text-muted-foreground">Lexical Resource (LR):</span>
              <strong className="font-mono text-amber-600">{result.writing.criteriaScores?.lr?.toFixed(1) || "7.0"}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-card border border-border/70 flex justify-between items-center">
              <span className="text-muted-foreground">Grammar (GRA):</span>
              <strong className="font-mono text-amber-600">{result.writing.criteriaScores?.gra?.toFixed(1) || "7.5"}</strong>
            </div>
          </div>
        </div>

        {/* Speaking Sub-criteria */}
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-2.5">
          <span className="font-bold text-foreground uppercase tracking-wider text-[10px] block">
            Phân Tích Tiêu Chí Speaking (Part 1, 2, 3):
          </span>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded-xl bg-card border border-border/70 flex justify-between items-center">
              <span className="text-muted-foreground">Fluency (FC):</span>
              <strong className="font-mono text-purple-600">{result.speaking.criteriaScores?.tr?.toFixed(1) || "7.5"}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-card border border-border/70 flex justify-between items-center">
              <span className="text-muted-foreground">Lexical Resource (LR):</span>
              <strong className="font-mono text-purple-600">{result.speaking.criteriaScores?.lr?.toFixed(1) || "7.0"}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-card border border-border/70 flex justify-between items-center">
              <span className="text-muted-foreground">Grammar (GRA):</span>
              <strong className="font-mono text-purple-600">{result.speaking.criteriaScores?.gra?.toFixed(1) || "7.5"}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-card border border-border/70 flex justify-between items-center">
              <span className="text-muted-foreground">Pronunciation (PR):</span>
              <strong className="font-mono text-purple-600">{result.speaking.criteriaScores?.pr?.toFixed(1) || "8.0"}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
