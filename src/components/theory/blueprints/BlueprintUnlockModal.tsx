"use client";

import React from "react";
import Link from "next/link";
import {
  Trophy,
  Sparkles,
  Unlock,
  ArrowRight,
  X,
  CheckCircle2,
  BookOpen,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BlueprintUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicTitle: string;
  skill: "writing" | "speaking";
  scorePercentage: number;
  correctCount: number;
  totalCount: number;
  unlockedPracticeRoute: string;
  unlockedPracticeTitle: string;
}

export function BlueprintUnlockModal({
  isOpen,
  onClose,
  topicTitle,
  skill,
  scorePercentage,
  correctCount,
  totalCount,
  unlockedPracticeRoute,
  unlockedPracticeTitle,
}: BlueprintUnlockModalProps) {
  if (!isOpen) return null;

  const isWriting = skill === "writing";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={cn(
          "relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6 text-center animate-in zoom-in-95 duration-200",
          isWriting
            ? "border-amber-500/30 dark:border-amber-500/20"
            : "border-sky-500/30 dark:border-sky-500/20"
        )}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Đóng thông báo"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Celebration Trophy Icon */}
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-amber-500/20 via-yellow-400/20 to-emerald-500/20 border border-amber-500/30 shadow-inner">
          <Trophy className="h-10 w-10 text-amber-500 animate-bounce" />
          <div className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow">
            <CheckCircle2 className="h-4 w-4" />
          </div>
        </div>

        {/* Header Titles */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Sparkles className="h-3.5 w-3.5" />
            Cổng Khảo Thí Đã Mở Khóa ({scorePercentage}%)
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
            Chúc mừng! Bạn Đã Làm Chủ Lý Thuyết
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 px-2">
            Đã hoàn thành xuất sắc {correctCount}/{totalCount} câu hỏi chuẩn khảo thí cho chuyên đề:{" "}
            <span className="font-semibold text-foreground">{topicTitle}</span>.
          </p>
        </div>

        {/* Unlock Target Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-muted/60 border border-border text-left space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Unlock className="h-4 w-4 text-emerald-500" />
            Phòng Thực Hành Được Khai Mở:
          </div>
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "p-2.5 rounded-xl text-white shadow-sm shrink-0",
                isWriting
                  ? "bg-gradient-to-br from-amber-500 to-orange-600"
                  : "bg-gradient-to-br from-sky-500 to-blue-600"
              )}
            >
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-foreground">
                {unlockedPracticeTitle}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Áp dụng ngay các kỹ thuật vừa học vào bài thực chiến với AI Examiner chấm điểm real-time.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-full sm:w-1/2 px-4 py-3 rounded-2xl border border-border text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2"
          >
            <BookOpen className="h-4 w-4" />
            Ở lại Ôn Tập Thêm
          </button>
          <Link
            href={unlockedPracticeRoute}
            className={cn(
              "w-full sm:w-1/2 px-4 py-3 rounded-2xl text-white text-xs sm:text-sm font-bold shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]",
              isWriting
                ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-amber-500/20"
                : "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-sky-500/20"
            )}
          >
            <span>Vào Luyện Ngay</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
