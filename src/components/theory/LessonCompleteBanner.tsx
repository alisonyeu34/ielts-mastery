"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Sparkles,
  Zap,
  ArrowRight,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonCompleteBannerProps {
  relatedPracticeRoute: string;
  relatedPracticeName: string;
  className?: string;
}

export function LessonCompleteBanner({
  relatedPracticeRoute,
  relatedPracticeName,
  className,
}: LessonCompleteBannerProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-emerald-500/40 bg-gradient-to-r from-emerald-600/10 via-card to-emerald-600/5 p-6 sm:p-8 shadow-lg shadow-emerald-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 select-none animate-in zoom-in-95 duration-200",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-4 ring-emerald-500/20">
          <Trophy className="h-6 w-6" />
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
              Khóa Cổng Mở Thành Công
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-foreground">
            Bạn Đã Nắm Vững Toàn Bộ Lý Thuyết!
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Hệ thống đã ghi nhận hoàn thành bài học vào Dexie DB. Hãy chuyển ngay sang chế độ Luyện tập Vi mô để củng cố phản xạ.
          </p>
        </div>
      </div>

      <Link
        href={relatedPracticeRoute}
        className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105 shrink-0"
      >
        <Zap className="h-4 w-4 fill-white" />
        <span>Bắt đầu Luyện tập: {relatedPracticeName}</span>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
