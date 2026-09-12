"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Unlock,
  CheckCircle2,
  ArrowRight,
  X,
  Zap,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TheoryGateUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
  scorePercentage: number;
  unlockedModule: {
    id: string;
    nameVi: string;
    href: string;
    descriptionVi: string;
  };
  className?: string;
}

export function TheoryGateUnlockModal({
  isOpen,
  onClose,
  lessonTitle,
  scorePercentage,
  unlockedModule,
  className,
}: TheoryGateUnlockModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6 text-center">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-xl p-2 text-muted-foreground hover:bg-secondary cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Celebration Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white shadow-xl shadow-emerald-500/30 animate-bounce">
          <Award className="h-8 w-8" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-black border border-emerald-500/20">
            CHÚC MỪNG BẠN ĐẠT {scorePercentage}% ĐIỂM SỐ
          </span>
          <h3 className="text-xl font-black text-foreground">
            Vượt Qua Cổng Kiểm Tra Độ Hiểu!
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
            Bạn đã làm chủ hoàn toàn các nguyên tắc bản chất của bài học <strong>"{lessonTitle}"</strong>.
          </p>
        </div>

        {/* Unlocked Practice Module Box */}
        <div className="p-4 rounded-2xl bg-indigo-500/[0.04] border border-indigo-500/30 text-left space-y-2 text-xs">
          <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold font-mono text-[10px] uppercase">
            <Unlock className="h-3.5 w-3.5" />
            <span>Mở Khóa Module Thực Hành Tương Ứng:</span>
          </div>

          <h4 className="font-extrabold text-foreground text-sm">
            {unlockedModule.nameVi}
          </h4>

          <p className="text-muted-foreground leading-relaxed text-[11px]">
            {unlockedModule.descriptionVi}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <Link
            href={unlockedModule.href}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
          >
            <Zap className="h-4 w-4" />
            <span>Chuyển Sang Phòng Luyện Tập Thực Tế ➔</span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs border border-border cursor-pointer"
          >
            Ở Lại Xem Lại Lý Thuyết
          </button>
        </div>
      </div>
    </div>
  );
}
