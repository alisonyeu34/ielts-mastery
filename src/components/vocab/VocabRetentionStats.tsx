"use client";

import React from "react";
import { Brain, Activity, Clock, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { VocabCard } from "@/types/database";

interface VocabRetentionStatsProps {
  allCards: VocabCard[];
  dueCards: VocabCard[];
  masteredCards: VocabCard[];
  learningCards: VocabCard[];
}

export function VocabRetentionStats({
  allCards,
  dueCards,
  masteredCards,
  learningCards,
}: VocabRetentionStatsProps) {
  const totalCards = allCards.length || 1;
  const masteryPercentage = Math.round((masteredCards.length / totalCards) * 100);
  const avgStability =
    allCards.length > 0 && (learningCards.length + masteredCards.length > 0)
      ? (allCards.reduce((acc, c) => acc + (c.stability || 0), 0) / allCards.length).toFixed(1)
      : "0.0";

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 select-none">
      {/* 1. Due Today */}
      <div className="p-4 sm:p-5 rounded-3xl border border-rose-500/20 bg-rose-500/5 space-y-1 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase text-rose-500">Cần Ôn Hôm Nay</span>
          <Clock className="h-4 w-4 text-rose-500" />
        </div>
        <div className="text-2xl sm:text-3xl font-black text-foreground font-mono">
          {dueCards.length}
        </div>
        <p className="text-[11px] text-muted-foreground">
          Thẻ từ đến chu kỳ FSRS
        </p>
      </div>

      {/* 2. Currently Learning */}
      <div className="p-4 sm:p-5 rounded-3xl border border-blue-500/20 bg-blue-500/5 space-y-1 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase text-blue-500">Đang Trong Chu Kỳ</span>
          <Activity className="h-4 w-4 text-blue-500" />
        </div>
        <div className="text-2xl sm:text-3xl font-black text-foreground font-mono">
          {learningCards.length}
        </div>
        <p className="text-[11px] text-muted-foreground">
          Đang lặp lại 1d, 3d, 7d, 14d
        </p>
      </div>

      {/* 3. Mastered */}
      <div className="p-4 sm:p-5 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 space-y-1 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase text-emerald-500">Đã Khắc Sâu</span>
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
        </div>
        <div className="text-2xl sm:text-3xl font-black text-foreground font-mono">
          {masteredCards.length} <span className="text-xs font-sans text-muted-foreground font-bold">({masteryPercentage}%)</span>
        </div>
        <p className="text-[11px] text-muted-foreground">
          Độ ổn định S &gt;= 21 ngày
        </p>
      </div>

      {/* 4. Memory Stability S */}
      <div className="p-4 sm:p-5 rounded-3xl border border-purple-500/20 bg-purple-500/5 space-y-1 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase text-purple-500">Độ Ổn Định S Trung Bình</span>
          <Brain className="h-4 w-4 text-purple-500" />
        </div>
        <div className="text-2xl sm:text-3xl font-black text-foreground font-mono">
          {avgStability}d
        </div>
        <p className="text-[11px] text-muted-foreground">
          Mô hình trí nhớ FSRS v4
        </p>
      </div>
    </div>
  );
}
