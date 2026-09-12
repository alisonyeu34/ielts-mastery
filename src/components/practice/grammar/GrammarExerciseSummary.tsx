"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  Sparkles,
  ShieldAlert,
  RotateCcw,
  Layers,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface GrammarExerciseSummaryProps {
  score: number;
  total: number;
  topicName: string;
  onRestart: () => void;
  className?: string;
}

export function GrammarExerciseSummary({
  score,
  total,
  topicName,
  onRestart,
  className,
}: GrammarExerciseSummaryProps) {
  const accuracy = Math.round((score / total) * 100);
  const isMastered = accuracy >= 80;

  return (
    <div
      className={cn(
        "max-w-2xl mx-auto rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-sm text-center space-y-6 animate-in fade-in duration-300",
        className
      )}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 mx-auto">
        <Award className="h-10 w-10" />
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
          {topicName}
        </span>
        <h3 className="text-2xl font-extrabold text-foreground">
          Hoàn Thành Bài Luyện Ngữ Pháp Thực Hành!
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Kết quả: <strong>{score} / {total} câu đúng</strong> ({accuracy}%)
        </p>
      </div>

      {/* Accuracy Banner */}
      <div
        className={cn(
          "p-4 rounded-2xl border text-xs text-left space-y-1",
          isMastered
            ? "bg-emerald-500/[0.04] border-emerald-500/30"
            : "bg-secondary/40 border-border/80"
        )}
      >
        <span className="font-bold text-foreground flex items-center gap-1.5">
          {isMastered ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Đạt chuẩn làm chủ cấu trúc câu Phase 1!
            </>
          ) : (
            <>
              <ShieldAlert className="h-4 w-4 text-amber-500" />
              Đã tự động gom câu sai vào Ngân Hàng Lỗi Sai
            </>
          )}
        </span>
        <p className="text-muted-foreground leading-relaxed">
          {isMastered
            ? "Bạn đã sử dụng thành thạo cấu trúc này với độ chính xác cao. Hãy chuyển sang các chủ đề tiếp theo để hoàn thiện tiêu chí GRA."
            : "Các cấu trúc làm sai đã được đồng bộ vào Error Bank. Bạn có thể làm lại dạng bài tập sửa câu ở Module 5 bất cứ lúc nào."}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onRestart}
          className="px-5 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Luyện lại bài này</span>
        </button>

        <Link
          href="/error-bank/drill"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
        >
          <span>Làm bài tập xóa lỗi ở Error Bank</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
