"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  Zap,
  Flame,
  Clock,
  HeartHandshake,
  CheckCircle2,
  X,
  ArrowRight,
  Brain,
  Volume2,
  BatteryCharging,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { db } from "@/lib/db";

interface EmergencyLowEnergyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStatusChange?: (isActive: boolean) => void;
}

export function EmergencyLowEnergyModal({
  isOpen,
  onClose,
  onStatusChange,
}: EmergencyLowEnergyModalProps) {
  const [isLowEnergyActive, setIsLowEnergyActive] = useState<boolean>(false);
  const [savedTask, setSavedTask] = useState<string | null>(null);

  // Sync state with localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const today = new Date().toISOString().split("T")[0];
      const savedDate = localStorage.getItem("ielts_low_energy_date");
      const active = savedDate === today;
      setIsLowEnergyActive(active);
      const task = localStorage.getItem("ielts_low_energy_task_completed");
      setSavedTask(task);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggleMode = () => {
    const today = new Date().toISOString().split("T")[0];
    if (isLowEnergyActive) {
      localStorage.removeItem("ielts_low_energy_date");
      setIsLowEnergyActive(false);
      if (onStatusChange) onStatusChange(false);
    } else {
      localStorage.setItem("ielts_low_energy_date", today);
      setIsLowEnergyActive(true);
      if (onStatusChange) onStatusChange(true);
    }
  };

  const handleCompleteMicroTask = async (taskName: string) => {
    localStorage.setItem("ielts_low_energy_task_completed", taskName);
    setSavedTask(taskName);

    // Ensure streak is maintained in DB
    try {
      const user = await db.user_progress.get("main_user");
      if (user) {
        const today = new Date().toISOString().split("T")[0];
        const nextStreak = user.lastActiveDate === today ? user.streakDays : (user.streakDays || 0) + 1;
        await db.user_progress.update("main_user", {
          lastActiveDate: today,
          streakDays: Math.max(1, nextStreak),
          totalStudyMinutes: (user.totalStudyMinutes || 0) + 12,
        });
      }
    } catch (e) {
      console.warn("Update streak error:", e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl border border-red-500/30 bg-card p-6 sm:p-7 shadow-2xl space-y-5 select-none overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-border/70 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/20 to-red-600/20 text-red-600 dark:text-red-400 border border-red-500/30 shadow-xs">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-foreground">
                  Chế Độ Cứu Chuỗi Ngày Mệt Mỏi
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  Emergency Mode
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Bảo vệ 100% ngọn lửa Streak khi bạn ốm, bận việc đột xuất hoặc kiệt sức.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl border border-border bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Psychological Encouragement Box */}
        <div className="p-4 rounded-2xl bg-red-500/[0.06] border border-red-500/20 space-y-2">
          <div className="flex items-center gap-2 text-xs font-extrabold text-red-700 dark:text-red-400">
            <HeartHandshake className="h-4 w-4 shrink-0" />
            <span>Thông điệp từ IELTS Master: Học bền bỉ quan trọng hơn học kiệt sức!</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Hành trình 165 ngày chắc chắn sẽ có những ngày bạn bị đau đầu, công việc dồn dập hay đơn giản là quá mệt mỏi. Đừng để cảm giác tội lỗi hay nỗi sợ mất Streak đánh gục bạn. Hôm nay, bạn chỉ cần hoàn thành <strong>1 nhiệm vụ siêu ngắn 10-15 phút</strong> dưới đây là ngọn lửa chuỗi học sẽ được giữ nguyên vẹn!
          </p>
        </div>

        {/* Activation Toggle Card */}
        <div className="p-4 rounded-2xl border border-border bg-secondary/30 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-foreground block">
              Trạng thái Chế Độ Cứu Chuỗi hôm nay:
            </span>
            <span className={cn(
              "text-xs font-mono font-bold inline-flex items-center gap-1.5",
              isLowEnergyActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
            )}>
              {isLowEnergyActive ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>ĐANG BẬT — Đã rút gọn bài học hôm nay</span>
                </>
              ) : (
                <span>Đang TẮT (Áp dụng lịch học tiêu chuẩn 3-4 tiếng)</span>
              )}
            </span>
          </div>

          <button
            type="button"
            onClick={handleToggleMode}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-xs",
              isLowEnergyActive
                ? "bg-secondary text-foreground hover:bg-secondary/80 border border-border"
                : "bg-red-700 hover:bg-red-800 text-white shadow-red-700/30"
            )}
          >
            {isLowEnergyActive ? "Tắt chế độ mệt" : "🛡️ Bật chế độ hôm nay"}
          </button>
        </div>

        {/* 2 Quick Micro-tasks */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-extrabold text-foreground">
            <span>Chọn 1 trong 2 nhiệm vụ cứu chuỗi (10 - 15 phút):</span>
            <span className="text-[10px] text-muted-foreground font-normal">
              Chỉ cần làm xong 1 bài là đủ
            </span>
          </div>

          {/* Option A: Vocab Flashcards */}
          <div className={cn(
            "p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3",
            savedTask === "vocab"
              ? "border-emerald-500/40 bg-emerald-500/[0.07]"
              : "border-border bg-card hover:border-red-500/30"
          )}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">
                  Lướt 10 Thẻ Từ Vựng FSRS (10 Phút)
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  Ôn nhanh nghĩa & collocations không cần suy nghĩ nặng nhọc.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {savedTask === "vocab" ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Đã cứu chuỗi
                </span>
              ) : (
                <>
                  <Link
                    href="/vocab"
                    onClick={() => {
                      handleCompleteMicroTask("vocab");
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold flex items-center gap-1 transition-all"
                  >
                    <span>Làm ngay</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Option B: 1-sentence Shadowing */}
          <div className={cn(
            "p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3",
            savedTask === "shadowing"
              ? "border-emerald-500/40 bg-emerald-500/[0.07]"
              : "border-border bg-card hover:border-red-500/30"
          )}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                <Volume2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">
                  Nhại 1 Câu Shadowing Cốt Lõi (5 - 7 Phút)
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  Nghe bản xứ và nhại đúng 1 câu bật chuẩn âm đuôi (-s/-ed).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {savedTask === "shadowing" ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Đã cứu chuỗi
                </span>
              ) : (
                <Link
                  href="/practice/shadowing"
                  onClick={() => {
                    handleCompleteMicroTask("shadowing");
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold flex items-center gap-1 transition-all"
                >
                  <span>Làm ngay</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between pt-2 text-[11px] text-muted-foreground border-t border-border/70">
          <span className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            Chuỗi học sẽ tự động bảo toàn đến 23:59 hôm nay
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-foreground hover:underline cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
