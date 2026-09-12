"use client";

import React from "react";
import {
  Brain,
  Sparkles,
  Plus,
  Play,
  RotateCcw,
  Zap,
  CheckCircle2,
  Clock,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VocabQueueHeaderProps {
  newCount: number;
  learningCount: number;
  dueCount: number;
  totalCount: number;
  onStartSession: () => void;
  onOpenCollocation: () => void;
  onOpenAddModal: () => void;
  className?: string;
}

export function VocabQueueHeader({
  newCount,
  learningCount,
  dueCount,
  totalCount,
  onStartSession,
  onOpenCollocation,
  onOpenAddModal,
  className,
}: VocabQueueHeaderProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
            <Brain className="h-4 w-4" /> Module 4 • FSRS Memory Matrix & Collocations
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Sổ Từ Vựng Thông Minh FSRS
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Ghi nhớ dài hạn theo chu kỳ lặp Cambridge (1 - 3 - 7 - 14 - 30 ngày) • Học theo cụm Collocations và ngữ cảnh gốc.
          </p>
        </div>

        {/* Action Buttons Top */}
        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
          <button
            type="button"
            onClick={onOpenCollocation}
            className="px-4 py-2.5 rounded-2xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <Zap className="h-4 w-4 text-amber-500" />
            <span>Ghép Cặp Collocations</span>
          </button>

          <button
            type="button"
            onClick={onOpenAddModal}
            className="px-4 py-2.5 rounded-2xl border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <Plus className="h-4 w-4" />
            <span>Thêm Từ Vựng</span>
          </button>
        </div>
      </div>

      {/* 3 Queue Status Cards & Start Button */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
        {/* 1. New Cards */}
        <div className="p-4 rounded-2xl bg-blue-500/[0.06] border border-blue-500/20 space-y-1">
          <div className="flex items-center justify-between text-blue-600 dark:text-blue-400">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
              1. Thẻ Mới (New)
            </span>
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-foreground">
            {newCount}
          </div>
          <p className="text-[10px] text-muted-foreground">
            Cần nạp lần đầu tiên
          </p>
        </div>

        {/* 2. Learning Cards */}
        <div className="p-4 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 space-y-1">
          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
              2. Đang Học (Learning)
            </span>
            <Clock className="h-3.5 w-3.5" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-foreground">
            {learningCount}
          </div>
          <p className="text-[10px] text-muted-foreground">
            Chu kỳ ngắn (1 - 3 ngày)
          </p>
        </div>

        {/* 3. Due Cards */}
        <div className="p-4 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/20 space-y-1">
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
              3. Đến Hạn (Due Review)
            </span>
            <CheckCircle2 className="h-3.5 w-3.5" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400">
            {dueCount}
          </div>
          <p className="text-[10px] text-muted-foreground">
            Cần ôn tập hôm nay
          </p>
        </div>

        {/* 4. Start Session Action Button */}
        <button
          type="button"
          onClick={onStartSession}
          disabled={dueCount === 0 && newCount === 0}
          className="h-full min-h-[96px] p-4 rounded-2xl bg-primary hover:bg-primary/90 disabled:opacity-40 text-primary-foreground font-black text-xs sm:text-sm shadow-md shadow-primary/20 flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer text-center"
        >
          <Play className="h-6 w-6 fill-white" />
          <span>
            {dueCount > 0
              ? `Ôn Tập ${dueCount} Thẻ Hôm Nay`
              : newCount > 0
              ? `Học ${newCount} Thẻ Mới`
              : "Đã Hoàn Thành Hàng Đợi"}
          </span>
        </button>
      </div>
    </div>
  );
}
