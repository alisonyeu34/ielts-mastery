"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Clock,
  Flame,
  Pause,
  Play,
  CheckCircle2,
  AlertCircle,
  Activity,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ActiveStudyTimeTrackerProps {
  dailyTargetSeconds?: number; // Default 3.5 hours = 12600s
  className?: string;
}

export function ActiveStudyTimeTracker({
  dailyTargetSeconds = 12600,
  className,
}: ActiveStudyTimeTrackerProps) {
  // Active study seconds accumulated today
  const [activeSeconds, setActiveSeconds] = useState<number>(0); // 0s on Day 1
  const [isUserActive, setIsUserActive] = useState<boolean>(true);
  const [streakDays, setStreakDays] = useState<number>(0);

  const lastActivityRef = useRef<number>(Date.now());
  const idleThresholdMs = 60 * 1000; // 60 seconds of inactivity pauses timer

  // Track user mouse, keyboard and touch activity
  useEffect(() => {
    const handleUserInteraction = () => {
      lastActivityRef.current = Date.now();
      if (!isUserActive) {
        setIsUserActive(true);
      }
    };

    window.addEventListener("mousemove", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);
    window.addEventListener("scroll", handleUserInteraction);
    window.addEventListener("click", handleUserInteraction);

    // Inactivity checker interval
    const checkerInterval = setInterval(() => {
      const now = Date.now();
      if (now - lastActivityRef.current > idleThresholdMs) {
        setIsUserActive(false);
      }
    }, 2000);

    // Active study time tick interval (only counts when active)
    const tickInterval = setInterval(() => {
      if (Date.now() - lastActivityRef.current <= idleThresholdMs) {
        setActiveSeconds((prev) => prev + 1);
      }
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
      window.removeEventListener("click", handleUserInteraction);
      clearInterval(checkerInterval);
      clearInterval(tickInterval);
    };
  }, [isUserActive]);

  const hours = Math.floor(activeSeconds / 3600);
  const minutes = Math.floor((activeSeconds % 3600) / 60);
  const seconds = activeSeconds % 60;

  const targetHours = (dailyTargetSeconds / 3600).toFixed(1);
  const progressPercent = Math.min(100, Math.round((activeSeconds / dailyTargetSeconds) * 100));

  // Weekly study history (starts at 0 before official start on 16/9/2026)
  const weeklyRecords = [
    { day: "T2", hours: 0, isMet: false },
    { day: "T3", hours: 0, isMet: false },
    { day: "T4", hours: 0, isMet: false },
    { day: "T5", hours: 0, isMet: false },
    { day: "T6", hours: (activeSeconds / 3600), isMet: progressPercent >= 100 },
    { day: "T7", hours: 0, isMet: false },
    { day: "CN", hours: 0, isMet: false },
  ];

  return (
    <div
      className={cn(
        "p-5 sm:p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4 select-none",
        className
      )}
    >
      {/* Header with Live Interaction Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-foreground">
                Theo Dõi Thời Gian Học Hàng Ngày
              </h3>
              <div
                className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 font-mono border",
                  isUserActive
                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                    : "bg-amber-500/10 text-amber-600 border-amber-500/30"
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", isUserActive ? "bg-emerald-500 animate-pulse" : "bg-amber-500")} />
                <span>{isUserActive ? "Đang Tương Tác" : "Tạm Dừng (Idle > 60s)"}</span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">
              Chỉ tính giờ khi bạn thực tế làm bài, học từ, gõ câu, nghe audio • Chỉ tiêu 3 – 4h/ngày.
            </span>
          </div>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 self-start sm:self-auto font-mono text-xs font-black">
          <Flame className="h-4 w-4 fill-orange-500 text-orange-500 animate-bounce" />
          <span>{streakDays === 0 ? "Bắt đầu 16/9/2026 (0 Ngày)" : `${streakDays} Ngày Liên Tiếp`}</span>
        </div>
      </div>

      {/* Main Counter & Progress Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Left Big Timer (Cols 1-5) */}
        <div className="md:col-span-5 p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-2">
          <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase block">
            THỜI GIAN HỌC THỰC TẾ HÔM NAY:
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-black font-mono text-foreground tracking-tight">
              {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
            </span>
            <span className="text-xs font-bold text-muted-foreground">
              / {targetHours}h Chỉ Tiêu
            </span>
          </div>

          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
            <span>Tiến độ ngày: {progressPercent}%</span>
            <span>{progressPercent >= 100 ? "🎉 Đã Đạt Chuẩn!" : `Còn ${Math.max(0, 3.5 - hours - minutes / 60).toFixed(1)}h`}</span>
          </div>
        </div>

        {/* Right Weekly Discipline Bars (Cols 6-12) */}
        <div className="md:col-span-7 space-y-2">
          <span className="text-xs font-bold text-foreground block">
            Thời Gian Học 7 Ngày Qua (Khởi động: 16/9/2026):
          </span>

          <div className="grid grid-cols-7 gap-2 pt-1">
            {weeklyRecords.map((w, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <div className="w-full bg-secondary/40 rounded-xl h-20 relative flex items-end p-1 overflow-hidden border border-border/60">
                  <div
                    className={cn(
                      "w-full rounded-lg transition-all",
                      w.isMet
                        ? "bg-emerald-500 shadow-sm"
                        : "bg-muted-foreground/20"
                    )}
                    style={{ height: `${Math.max(4, Math.min(100, (w.hours / 4) * 100))}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono font-bold text-foreground">{w.day}</span>
                <span className="text-[9px] font-mono text-muted-foreground">{w.hours.toFixed(1)}h</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
