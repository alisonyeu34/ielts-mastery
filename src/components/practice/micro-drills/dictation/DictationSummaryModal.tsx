"use client";

import React from "react";
import Link from "next/link";
import { DictationDrillItem } from "@/data/mockDictationDrillsData";
import { DictationDiffResult } from "@/lib/levenshteinDiffEngine";
import {
  Trophy,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  X,
  Headphones,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DictationSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  sessionResults: Array<{
    drill: DictationDrillItem;
    diff: DictationDiffResult;
    plays: number;
  }>;
}

export function DictationSummaryModal({
  isOpen,
  onClose,
  onRestart,
  sessionResults,
}: DictationSummaryModalProps) {
  if (!isOpen) return null;

  const totalDrills = sessionResults.length;
  const avgAccuracy =
    totalDrills > 0
      ? Math.round(
          sessionResults.reduce((acc, r) => acc + r.diff.accuracyPercentage, 0) /
            totalDrills
        )
      : 0;

  const totalEndingOmissions = sessionResults.reduce(
    (acc, r) => acc + r.diff.endingOmissionsCount,
    0
  );

  const perfectCount = sessionResults.filter(
    (r) => r.diff.accuracyPercentage === 100
  ).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-muted-foreground hover:bg-secondary cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Celebration Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shadow-inner">
            <Trophy className="h-8 w-8 text-amber-500 animate-bounce" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <Sparkles className="h-3.5 w-3.5" />
            Hoàn Thành Phiên Luyện Chép Chính Tả
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            Báo Cáo Độ Nhạy Âm Học IELTS
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Đã hoàn thành {totalDrills} bài luyện tập vi mô với đầy đủ chẩn đoán âm vị học.
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground block">
              Độ Chính Xác TB
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400">
              {avgAccuracy}%
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground block">
              Câu Hoàn Hảo (100%)
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              {perfectCount}/{totalDrills}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground block">
              Lỗi Rơi Đuôi (-s/-ed)
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-amber-600 dark:text-amber-400">
              {totalEndingOmissions}
            </span>
          </div>
        </div>

        {/* Session Drills Breakdown List */}
        <div className="space-y-3">
          <span className="text-xs font-bold font-mono text-foreground uppercase tracking-wider block">
            Chi Tiết Từng Câu Đã Luyện:
          </span>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {sessionResults.map((res, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-secondary/40 border border-border flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white font-mono font-bold shrink-0 text-[10px]">
                    #{idx + 1}
                  </span>
                  <div className="truncate">
                    <h5 className="font-bold text-foreground truncate">
                      {res.drill.title}
                    </h5>
                    <p className="text-[10px] text-muted-foreground truncate font-serif">
                      {res.drill.targetSentence}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 font-mono">
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-lg text-xs font-bold",
                      res.diff.accuracyPercentage >= 85
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-amber-500/10 text-amber-600"
                    )}
                  >
                    {res.diff.accuracyPercentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onRestart}
            className="w-full sm:w-1/2 px-4 py-3 rounded-2xl border border-border text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Luyện Lại Từ Đầu</span>
          </button>

          <Link
            href="/practice"
            className="w-full sm:w-1/2 px-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Về Trung Tâm Luyện Tập</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
