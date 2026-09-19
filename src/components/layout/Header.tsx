"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Flame,
  Brain,
  ShieldAlert,
  ShieldCheck,
  Trophy,
  Printer,
  Wand2,
  Bell,
  Search,
  User,
  Sparkles,
  ChevronDown,
  CalendarDays,
  Target,
  BookOpen,
  BookmarkCheck,
} from "lucide-react";
import { useTheoryBookmarks } from "@/lib/theoryBookmarks";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { StatBadge } from "@/components/ui/StatBadge";
import { NotificationDropdown } from "@/components/layout/NotificationDropdown";
import { useUserProgress, useDueVocabCount, useErrorBankStats } from "@/hooks/useIeltsDB";
import { EmergencyLowEnergyModal } from "@/components/common/EmergencyLowEnergyModal";
import { MicroWinsModal } from "@/components/achievements/MicroWinsModal";
import { WeeklyCheatSheetModal } from "@/components/study-tools/WeeklyCheatSheetModal";
import { SentenceUpgraderModal } from "@/components/study-tools/SentenceUpgraderModal";
import { DailyScheduleBriefingModal } from "@/components/layout/DailyScheduleBriefingModal";
import { cn } from "@/lib/utils";

interface HeaderProps {
  sidebarCollapsed?: boolean;
}

export function Header({ sidebarCollapsed }: HeaderProps) {
  const { userProgress } = useUserProgress();
  const { dueCount } = useDueVocabCount();
  const { stats } = useErrorBankStats();
  const { count: savedTheoryCount } = useTheoryBookmarks();

  const [showLowEnergyModal, setShowLowEnergyModal] = useState<boolean>(false);
  const [showMicroWinsModal, setShowMicroWinsModal] = useState<boolean>(false);
  const [showCheatSheetModal, setShowCheatSheetModal] = useState<boolean>(false);
  const [showUpgraderModal, setShowUpgraderModal] = useState<boolean>(false);
  const [showDailyBriefingModal, setShowDailyBriefingModal] = useState<boolean>(false);
  const [isLowEnergyActive, setIsLowEnergyActive] = useState<boolean>(false);

  // Sync low energy status
  useEffect(() => {
    if (typeof window !== "undefined") {
      const today = new Date().toISOString().split("T")[0];
      setIsLowEnergyActive(localStorage.getItem("ielts_low_energy_date") === today);
    }
  }, [showLowEnergyModal]);

  const streak = userProgress?.streakDays ?? 0;
  const dueVocab = dueCount || 0;
  const unresolvedErrors = stats.unresolvedCount;

  return (
    <>
      <header className="sticky top-0 z-30 flex min-h-16 pt-[env(safe-area-inset-top,0px)] pb-2 sm:pb-0 w-full items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-3 sm:px-6 gap-2">
        {/* Left Area: Context / Search or Breadcrumb */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground">
            <Link
              href="/roadmap"
              prefetch={true}
              className="flex items-center gap-1 font-semibold text-foreground hover:text-red-700 dark:hover:text-red-400 transition-colors"
            >
              <Target className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
              Lộ trình IELTS 165 Ngày
            </Link>
            <span>/</span>
            <Link
              href="/roadmap"
              prefetch={true}
              className="text-red-700 dark:text-red-400 font-medium hover:underline"
            >
              Giai đoạn 1: 14 Ngày Cứu Ngữ Pháp (19/9 - 2/10)
            </Link>
          </div>

          {/* Quick Search Bar */}
          <div className="relative hidden sm:block w-36 md:w-56">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm bài học, từ vựng..."
              className="w-full rounded-xl border border-border bg-card/60 pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
          </div>
        </div>

        {/* Right Area: Widgets, Quick Tools, ThemeToggle & User Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Quick Study Tools Capsule */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* 1. Low Energy Streak Saver Button */}
            <button
              type="button"
              onClick={() => setShowLowEnergyModal(true)}
              className={cn(
                "inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-xs",
                isLowEnergyActive
                  ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/40 ring-2 ring-amber-500/20 animate-pulse"
                  : "bg-secondary/60 hover:bg-secondary border-border text-foreground"
              )}
              title="Chế độ Cứu Chuỗi Ngày Mệt Mỏi: Rút ngắn thành 1 bài 10 phút"
            >
              <ShieldCheck className={cn("h-3.5 w-3.5", isLowEnergyActive ? "text-amber-500" : "text-red-600")} />
              <span className="hidden sm:inline">
                {isLowEnergyActive ? "Cứu Chuỗi: BẬT" : "Cứu Chuỗi"}
              </span>
            </button>

            {/* 2. Micro-Wins Button */}
            <button
              type="button"
              onClick={() => setShowMicroWinsModal(true)}
              className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl border border-border bg-secondary/60 hover:bg-secondary text-foreground text-xs font-bold transition-all cursor-pointer shadow-xs"
              title="Xem các cột mốc chiến thắng nhỏ & đại lễ tốt nghiệp Phase 1"
            >
              <Trophy className="h-3.5 w-3.5 text-amber-500" />
              <span className="hidden md:inline">Chiến Tích</span>
            </button>

            {/* 3. Weekly Cheat Sheet Button */}
            <button
              type="button"
              onClick={() => setShowCheatSheetModal(true)}
              className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl border border-border bg-secondary/60 hover:bg-secondary text-foreground text-xs font-bold transition-all cursor-pointer shadow-xs"
              title="Mở Tờ Bí Kíp Tóm Tắt A4 Tự Động Mỗi Tuần"
            >
              <Printer className="h-3.5 w-3.5 text-red-600" />
              <span className="hidden lg:inline">Bí Kíp A4</span>
            </button>

            {/* 4. Sentence Upgrader Button */}
            <button
              type="button"
              onClick={() => setShowUpgraderModal(true)}
              className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-700 dark:text-red-400 text-xs font-bold transition-all cursor-pointer shadow-xs"
              title="Máy Biến Hình Câu C1 (Nominalization, Inversion, Hedging)"
            >
              <Wand2 className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">Biến Hình C1</span>
            </button>

            {/* 5. Sổ Cần Nhớ Button */}
            <Link
              href="/theory/saved-notes"
              prefetch={true}
              className={cn(
                "inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-xs",
                savedTheoryCount > 0
                  ? "border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400"
                  : "bg-secondary/60 hover:bg-secondary border-border text-foreground"
              )}
              title="Mở Sổ Tay Lý Thuyết Cần Nhớ Đã Lưu"
            >
              <BookmarkCheck className="h-3.5 w-3.5 text-amber-500" />
              <span className="hidden md:inline">Sổ Cần Nhớ</span>
              {savedTheoryCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-mono text-[10px] font-black">
                  {savedTheoryCount}
                </span>
              )}
            </Link>
          </div>

          {/* Streak Badge */}
          <Link href="/" prefetch={true} title="Chuỗi học tập liên tục">
            <StatBadge
              icon={Flame}
              label="Chuỗi"
              value={streak}
              suffix="ngày"
              variant="amber"
              size="sm"
              className="hidden sm:inline-flex cursor-pointer hover:scale-105"
            />
          </Link>

          {/* Due Vocab Badge */}
          <Link href="/vocab" prefetch={true} title="Từ vựng cần ôn hôm nay qua FSRS">
            <StatBadge
              icon={Brain}
              label="Ôn tập"
              value={dueVocab}
              suffix="từ"
              variant="violet"
              size="sm"
              className="hidden md:inline-flex cursor-pointer hover:scale-105"
            />
          </Link>

          {/* Sổ Tay Hướng Dẫn Button */}
          <Link
            href="/guide"
            prefetch={true}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-700 dark:text-red-400 text-xs font-bold transition-all shadow-sm"
            title="Xem Sổ tay hướng dẫn sử dụng web"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">Sổ Tay</span>
          </Link>

          {/* Lịch Trình Hôm Nay Button */}
          <button
            type="button"
            onClick={() => setShowDailyBriefingModal(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-bold transition-all shadow-sm cursor-pointer"
            title="Xem thông báo lịch trình học tập hôm nay"
          >
            <CalendarDays className="h-3.5 w-3.5 text-indigo-500" />
            <span className="hidden sm:inline">Lịch Hôm Nay</span>
          </button>

          {/* Notification Bell Dropdown */}
          <NotificationDropdown
            dueVocabCount={dueVocab}
            unresolvedErrorsCount={unresolvedErrors}
            streakDays={streak}
          />

          {/* Dark/Light Mode Theme Toggle */}
          <ThemeToggle />

          {/* User Profile Capsule */}
          <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-border/80">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-red-700 via-red-600 to-rose-700 text-white font-bold text-xs shadow-sm shadow-red-700/20">
              HP
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-bold leading-none text-foreground">Huyền Phạm</span>
              <span className="text-[10px] text-muted-foreground mt-0.5">Mục tiêu: Band 7.5</span>
            </div>
          </div>
        </div>
      </header>

      {/* 4 Feature Modals */}
      <EmergencyLowEnergyModal
        isOpen={showLowEnergyModal}
        onClose={() => setShowLowEnergyModal(false)}
        onStatusChange={(active) => setIsLowEnergyActive(active)}
      />

      <MicroWinsModal
        isOpen={showMicroWinsModal}
        onClose={() => setShowMicroWinsModal(false)}
      />

      <WeeklyCheatSheetModal
        isOpen={showCheatSheetModal}
        onClose={() => setShowCheatSheetModal(false)}
      />

      <SentenceUpgraderModal
        isOpen={showUpgraderModal}
        onClose={() => setShowUpgraderModal(false)}
      />

      {/* Daily Schedule Briefing Modal (Auto-triggers on daily first visit) */}
      <DailyScheduleBriefingModal
        forceOpen={showDailyBriefingModal}
        onClose={() => setShowDailyBriefingModal(false)}
      />
    </>
  );
}
