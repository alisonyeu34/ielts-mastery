"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Sparkles,
  BookOpen,
  Brain,
  ShieldAlert,
  Flame,
  Clock,
  ArrowRight,
  CheckCircle2,
  X,
  Target,
  Zap,
  ExternalLink,
} from "lucide-react";
import { useRoadmapProgress } from "@/hooks/useRoadmapProgress";
import { useDueVocabCount, useErrorBankStats, useUserProgress } from "@/hooks/useIeltsDB";
import { MOCK_ROADMAP_180_DAYS, RoadmapDayNode } from "@/data/mockRoadmapTimeline";
import { sendDesktopNotification, getPushSettings } from "@/lib/browserNotification";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "ielts_daily_briefing_last_shown";

interface DailyScheduleBriefingModalProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

export function DailyScheduleBriefingModal({
  forceOpen,
  onClose,
}: DailyScheduleBriefingModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { progress } = useRoadmapProgress();
  const { dueCount } = useDueVocabCount();
  const { stats } = useErrorBankStats();
  const { userProgress } = useUserProgress();

  const currentDay = progress.currentDay || 1;
  const streak = userProgress?.streakDays ?? 0;
  const dueVocab = dueCount || 0;
  const unresolvedErrors = stats.unresolvedCount || 0;

  // Find today's roadmap node
  const todayNode: RoadmapDayNode =
    MOCK_ROADMAP_180_DAYS.find((node) => node.dayNumber === currentDay) ||
    MOCK_ROADMAP_180_DAYS[0];

  // Auto-trigger on first visit of the day
  useEffect(() => {
    if (typeof window === "undefined") return;

    // If externally controlled to open
    if (forceOpen) {
      setIsOpen(true);
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const lastShown = localStorage.getItem(STORAGE_KEY);

    if (lastShown !== today) {
      // Open modal automatically
      setIsOpen(true);
      localStorage.setItem(STORAGE_KEY, today);

      // Also trigger desktop push notification if enabled
      const pushSettings = getPushSettings();
      if (pushSettings.enabled && "Notification" in window && Notification.permission === "granted") {
        sendDesktopNotification({
          title: `🌅 [Lịch Học Hôm Nay] Ngày ${todayNode.dayNumber}/165`,
          body: `Hôm nay bạn có ${todayNode.tasks.length} ca học, ${dueVocab} từ vựng FSRS và ${unresolvedErrors} lỗi sai cần xử lý. Bấm để bắt đầu!`,
          url: "/roadmap",
          tag: "daily-morning-briefing",
        });
      }
    }
  }, [forceOpen, todayNode.dayNumber, todayNode.tasks.length, dueVocab, unresolvedErrors]);

  // Listen for manual trigger event
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open_daily_schedule_briefing", handleOpen);
    return () => window.removeEventListener("open_daily_schedule_briefing", handleOpen);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  const firstTask = todayNode.tasks[0];
  const firstTaskUrl = firstTask?.theoryUrl || firstTask?.practiceUrl || firstTask?.linkUrl || "/theory";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Gradient Banner Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent border-b border-border/80 relative shrink-0">
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
            title="Đóng bảng lịch trình"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="space-y-2 pr-8">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 uppercase tracking-wider flex items-center gap-1">
                <CalendarDays className="h-3 w-3" />
                LỊCH HỌC HÔM NAY • NGÀY {todayNode.dayNumber}/165
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                Giai Đoạn {todayNode.phase} • Tuần {todayNode.week}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                🎯 Mục tiêu Band 7.5
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-black text-foreground">
              {todayNode.title}
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {todayNode.summary}
            </p>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 divide-y divide-border/60">
          {/* Quick Metrics Capsule Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pb-5">
            {/* Shifts Count */}
            <div className="p-3 rounded-2xl bg-indigo-500/[0.05] border border-indigo-500/20 space-y-1">
              <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase flex items-center gap-1">
                <BookOpen className="h-3 w-3 text-indigo-500" />
                Ca học hôm nay
              </span>
              <p className="text-sm font-black text-foreground">
                {todayNode.tasks.length} Ca tiêu chuẩn
              </p>
            </div>

            {/* FSRS Due Vocab */}
            <Link
              href="/vocab"
              onClick={handleClose}
              className="p-3 rounded-2xl bg-purple-500/[0.05] border border-purple-500/20 space-y-1 hover:border-purple-500/40 transition-colors group cursor-pointer block"
            >
              <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase flex items-center gap-1 group-hover:text-purple-500 transition-colors">
                <Brain className="h-3 w-3 text-purple-500" />
                Từ FSRS đến hạn
              </span>
              <p className="text-sm font-black text-purple-600 dark:text-purple-400">
                {dueVocab > 0 ? `${dueVocab} từ cần ôn` : "0 từ (Đã hoàn thành)"}
              </p>
            </Link>

            {/* Error Bank */}
            <Link
              href="/error-bank/drill"
              onClick={handleClose}
              className="p-3 rounded-2xl bg-rose-500/[0.05] border border-rose-500/20 space-y-1 hover:border-rose-500/40 transition-colors group cursor-pointer block"
            >
              <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase flex items-center gap-1 group-hover:text-rose-500 transition-colors">
                <ShieldAlert className="h-3 w-3 text-rose-500" />
                Sổ tay lỗi sai
              </span>
              <p className="text-sm font-black text-rose-600 dark:text-rose-400">
                {unresolvedErrors > 0 ? `${unresolvedErrors} lỗi cần drill` : "0 lỗi tồn đọng"}
              </p>
            </Link>

            {/* Streak */}
            <div className="p-3 rounded-2xl bg-amber-500/[0.05] border border-amber-500/20 space-y-1">
              <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase flex items-center gap-1">
                <Flame className="h-3 w-3 text-amber-500" />
                Chuỗi ngày học
              </span>
              <p className="text-sm font-black text-amber-600 dark:text-amber-400">
                {streak > 0 ? `${streak} ngày` : "Khởi động từ 12/9"}
              </p>
            </div>
          </div>

          {/* Today's 4 Tasks List */}
          <div className="pt-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-foreground uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                <span>Nhiệm Vụ 4 Ca Học Chi Tiết Hôm Nay:</span>
              </h3>
              <span className="text-[10px] font-mono text-muted-foreground">
                Tổng: ~{todayNode.tasks.reduce((acc, t) => acc + (t.durationMinutes || 0), 0)} phút
              </span>
            </div>

            <div className="space-y-2.5">
              {todayNode.tasks.map((task, idx) => {
                const theoryUrl = task.theoryUrl || task.linkUrl;
                const practiceUrl = task.practiceUrl || task.linkUrl;

                return (
                  <div
                    key={task.id || idx}
                    className="p-3.5 sm:p-4 rounded-2xl border border-border bg-secondary/20 hover:border-indigo-500/30 transition-all space-y-2.5 shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white font-mono font-black text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-extrabold text-foreground leading-snug">
                            {task.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            {task.skillBadge && (
                              <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                                {task.skillBadge}
                              </span>
                            )}
                            <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              {task.durationMinutes} phút
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons for this shift */}
                    <div className="flex items-center gap-2 pt-1 border-t border-border/50 text-xs">
                      {theoryUrl && (
                        <Link
                          href={theoryUrl}
                          onClick={handleClose}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                        >
                          <BookOpen className="h-3.5 w-3.5" />
                          <span>Học Lý Thuyết ➔</span>
                        </Link>
                      )}

                      {practiceUrl && practiceUrl !== theoryUrl && (
                        <Link
                          href={practiceUrl}
                          onClick={handleClose}
                          className="px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs border border-border flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Zap className="h-3.5 w-3.5 text-amber-500" />
                          <span>Phòng Thực Hành</span>
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 sm:p-5 bg-secondary/30 border-t border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-muted-foreground">
            💡 Tự động cập nhật lịch trình mới mỗi khi bạn vào web ngày tiếp theo.
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/roadmap"
              onClick={handleClose}
              className="px-3.5 py-2 rounded-xl border border-border text-muted-foreground hover:text-foreground text-xs font-bold transition-colors"
            >
              Xem Toàn Bộ 165 Ngày
            </Link>

            <Link
              href={firstTaskUrl}
              onClick={handleClose}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-xs shadow-md shadow-indigo-600/25 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Vào Học Ca 1 Ngay</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
