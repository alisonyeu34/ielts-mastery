"use client";

import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import {
  Volume2,
  Sparkles,
  ShieldAlert,
  Award,
  Layers,
  Smile,
  Zap,
} from "lucide-react";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";

interface PronunciationStatsProps {
  className?: string;
}

export function PronunciationStats({ className }: PronunciationStatsProps) {
  const pronunciationErrors = useLiveQuery(async () => {
    return await db.error_bank
      .where("errorType")
      .equals("pronunciation")
      .toArray();
  }) || [];

  const unresolvedErrors = pronunciationErrors.filter((e) => !e.mastered).length;

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-4 gap-4", className)}>
      {/* 1. 44 IPA Total */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 space-y-1 shadow-sm">
        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
          <Volume2 className="h-3.5 w-3.5 text-indigo-500" /> Chuẩn Âm Vị Quốc Tế
        </span>
        <div className="text-2xl font-extrabold text-foreground">
          44 Ký Tự IPA
        </div>
        <span className="text-[11px] text-muted-foreground">
          20 Nguyên âm & 24 Phụ âm
        </span>
      </div>

      {/* 2. Minimal Pairs */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 space-y-1 shadow-sm">
        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
          <Smile className="h-3.5 w-3.5 text-purple-500" /> Cặp Âm Tương Phản
        </span>
        <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
          15+ Bộ Cặp Âm
        </div>
        <span className="text-[11px] text-muted-foreground">
          Luyện tai nghe IELTS Listening
        </span>
      </div>

      {/* 3. Error Bank Pronunciation */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 space-y-1 shadow-sm">
        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
          <ShieldAlert className="h-3.5 w-3.5 text-rose-500" /> Lỗi Cần Khắc Phục
        </span>
        <div
          className={cn(
            "text-2xl font-extrabold",
            unresolvedErrors > 0 ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"
          )}
        >
          {unresolvedErrors} âm nhầm
        </div>
        <span className="text-[11px] text-muted-foreground">
          Đang gom trong Ngân Hàng Lỗi Sai
        </span>
      </div>

      {/* 4. Phase 1 Goal */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 space-y-1 shadow-sm">
        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
          <Award className="h-3.5 w-3.5 text-amber-500" /> Mục Tiêu Giai Đoạn 1
        </span>
        <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
          Band 5.5+
        </div>
        <span className="text-[11px] text-muted-foreground">
          Chuẩn hóa phát âm & bật âm đuôi
        </span>
      </div>
    </div>
  );
}
