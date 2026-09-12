"use client";

import React from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import {
  Award,
  Sparkles,
  ShieldAlert,
  BookOpen,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";

interface ParaphraseResultSummaryProps {
  className?: string;
}

export function ParaphraseResultSummary({
  className,
}: ParaphraseResultSummaryProps) {
  const paraphraseErrors = useLiveQuery(async () => {
    return await db.error_bank
      .where("errorType")
      .equals("paraphrase_trap")
      .toArray();
  }) || [];

  const unresolved = paraphraseErrors.filter((e) => !e.mastered).length;

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-4 gap-4", className)}>
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 space-y-1 shadow-sm">
        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5 text-indigo-500" /> Cặp Paraphrase Học Thuật
        </span>
        <div className="text-2xl font-extrabold text-foreground">
          15+ Cặp Từ
        </div>
        <span className="text-[11px] text-muted-foreground">
          Trích từ bài đọc Cambridge Cam 14-19
        </span>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 space-y-1 shadow-sm">
        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5 text-purple-500" /> Cơ Chế Bẫy Khảo Thí
        </span>
        <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
          4 Cơ Chế
        </div>
        <span className="text-[11px] text-muted-foreground">
          Synonym, Word Class, Negation, Restatement
        </span>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 space-y-1 shadow-sm">
        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
          <ShieldAlert className="h-3.5 w-3.5 text-rose-500" /> Bẫy Đang Gom Trong Error Bank
        </span>
        <div
          className={cn(
            "text-2xl font-extrabold",
            unresolved > 0 ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"
          )}
        >
          {unresolved} bẫy
        </div>
        <span className="text-[11px] text-muted-foreground">
          Tự động gom khi ghép sai
        </span>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 space-y-1 shadow-sm">
        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
          <Award className="h-3.5 w-3.5 text-emerald-500" /> Mục Tiêu Giai Đoạn 2
        </span>
        <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
          Band 6.5+
        </div>
        <span className="text-[11px] text-muted-foreground">
          Tốc độ định vị &lt; 20s/câu
        </span>
      </div>
    </div>
  );
}
