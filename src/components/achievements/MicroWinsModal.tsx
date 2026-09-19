"use client";

import React, { useState, useEffect } from "react";
import {
  Trophy,
  Award,
  Sparkles,
  Zap,
  CheckCircle2,
  Lock,
  Volume2,
  Headphones,
  FileText,
  PenTool,
  ShieldCheck,
  GraduationCap,
  X,
  Star,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MicroWinItem {
  id: string;
  title: string;
  category: "speaking" | "listening" | "reading" | "writing" | "persistence" | "phase_milestone";
  icon: React.ElementType;
  description: string;
  realWorldImpact: string;
  progress: number;
  maxProgress: number;
  unit: string;
  isUnlocked: boolean;
  unlockedDate?: string;
  badgeColor: string;
}

const INITIAL_MICRO_WINS: MicroWinItem[] = [
  {
    id: "win_ending_sound",
    title: "Bậc Thầy Âm Đuôi (-s / -ed)",
    category: "speaking",
    icon: Volume2,
    description: "Nhại đúng 100% âm đuôi sống còn trong các bài Shadowing.",
    realWorldImpact: "Chấm dứt thói quen nuốt âm tiếng Việt, bảo toàn điểm Pronunciation Band 6.0.",
    progress: 2,
    maxProgress: 3,
    unit: "ngày",
    isUnlocked: false,
    badgeColor: "from-amber-500/20 to-rose-600/20 text-amber-500 border-amber-500/30",
  },
  {
    id: "win_listening_s1",
    title: "Tai Thính Tuyệt Đối (S1 10/10)",
    category: "listening",
    icon: Headphones,
    description: "Làm đúng trọn vẹn 10/10 câu nghe thông tin cá nhân Section 1.",
    realWorldImpact: "Tạo đà tâm lý vững vàng cho mục tiêu Listening 8.0.",
    progress: 10,
    maxProgress: 10,
    unit: "câu",
    isUnlocked: true,
    unlockedDate: "Hôm nay",
    badgeColor: "from-emerald-500/20 to-teal-600/20 text-emerald-500 border-emerald-500/30",
  },
  {
    id: "win_reading_safe",
    title: "Chiến Thần Đọc Hiểu (≥ 12/13)",
    category: "reading",
    icon: FileText,
    description: "Đạt ≥ 12/13 câu trong bài đọc The Biomimetic Revolution.",
    realWorldImpact: "Chạm vạch an toàn Reading 8.5, bóc tách chuẩn bẫy Cambridge.",
    progress: 11,
    maxProgress: 13,
    unit: "câu",
    isUnlocked: false,
    badgeColor: "from-rose-500/20 to-red-700/20 text-rose-500 border-rose-500/30",
  },
  {
    id: "win_sentence_c1",
    title: "Kiến Trúc Sư Cú Pháp C1",
    category: "writing",
    icon: PenTool,
    description: "Nâng cấp thành công 5 câu văn cơ bản sang 3 cấu trúc C1 học thuật.",
    realWorldImpact: "Tự động hóa kỹ thuật Nominalization & Inversion cho Writing 6.5.",
    progress: 4,
    maxProgress: 5,
    unit: "câu",
    isUnlocked: false,
    badgeColor: "from-purple-500/20 to-indigo-600/20 text-purple-500 border-purple-500/30",
  },
  {
    id: "win_streak_shield",
    title: "Tấm Khiên Bền Bỉ",
    category: "persistence",
    icon: ShieldCheck,
    description: "Kích hoạt Chế độ Ngày Mệt Mỏi và hoàn thành micro-task cứu chuỗi.",
    realWorldImpact: "Bảo vệ kỷ luật bản thân, loại bỏ áp lực tâm lý bỏ cuộc giữa chừng.",
    progress: 1,
    maxProgress: 1,
    unit: "lần",
    isUnlocked: true,
    unlockedDate: "Đã sẵn sàng",
    badgeColor: "from-red-600/20 to-amber-600/20 text-red-500 border-red-500/30",
  },
  {
    id: "win_graduation_p1",
    title: "Lễ Tốt Nghiệp Giai Đoạn 1 (10/10)",
    category: "phase_milestone",
    icon: GraduationCap,
    description: "Hoàn thành 31 ngày cứu ngữ pháp, xóa phản xạ dịch word-by-word & nhận Chứng Chỉ Chuyển Cấp Band 4.5 ➔ 5.5.",
    realWorldImpact: "Mốc chuyển giao trọng đại: Xóa sổ toàn bộ bọ ngữ pháp và nạp 800 từ nền tảng để bước vào Phase 2.",
    progress: 1,
    maxProgress: 31,
    unit: "ngày",
    isUnlocked: false,
    badgeColor: "from-red-700/30 via-rose-600/20 to-amber-500/20 text-red-600 border-red-500/40",
  },
];

interface MicroWinsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MicroWinsModal({ isOpen, onClose }: MicroWinsModalProps) {
  const [activeTab, setActiveTab] = useState<"all" | "unlocked" | "in_progress">("all");

  if (!isOpen) return null;

  const unlockedCount = INITIAL_MICRO_WINS.filter((w) => w.isUnlocked).length;

  const filteredWins = INITIAL_MICRO_WINS.filter((w) => {
    if (activeTab === "unlocked") return w.isUnlocked;
    if (activeTab === "in_progress") return !w.isUnlocked;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl border border-red-500/30 bg-card shadow-2xl overflow-hidden select-none">
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-border/80 bg-secondary/20 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/20 to-red-600/20 text-amber-500 border border-amber-500/30 shadow-xs">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-foreground">
                  Hệ Thống Chiến Thắng Nhỏ & Cột Mốc Vinh Danh
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30">
                  Micro-Wins
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Ghi nhận từng bước tiến nhỏ có ý nghĩa thực tế trên hành trình chinh phục Band 7.5.
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

        {/* Phase 1 Graduation Banner Spotlight */}
        <div className="px-6 pt-5">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-red-700/15 via-rose-600/10 to-amber-500/10 border border-red-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-700 text-white shadow-sm">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-foreground">
                    Đại Lễ Chuyển Cấp Giai Đoạn 1 (11/10/2026)
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-600 text-white">
                    Sắp Diễn Ra
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Báo cáo tổng kết tăng trưởng cá nhân + Cấp Chứng nhận Nền tảng Band 4.5 ➔ 5.5.
                </p>
              </div>
            </div>

            <div className="text-right sm:text-right shrink-0">
              <span className="text-xs font-black text-red-600 dark:text-red-400 font-mono block">
                Mục Tiêu 31 Ngày
              </span>
              <span className="text-[10px] text-muted-foreground font-medium">
                (19/9 - 19/10/2026)
              </span>
            </div>
          </div>
        </div>

        {/* Filter Tabs & Stats Bar */}
        <div className="px-6 pt-4 pb-2 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={cn(
                "px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer",
                activeTab === "all"
                  ? "bg-red-700 text-white shadow-xs"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              Tất cả ({INITIAL_MICRO_WINS.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("unlocked")}
              className={cn(
                "px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer",
                activeTab === "unlocked"
                  ? "bg-red-700 text-white shadow-xs"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              Đã mở khóa ({unlockedCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("in_progress")}
              className={cn(
                "px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer",
                activeTab === "in_progress"
                  ? "bg-red-700 text-white shadow-xs"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              Đang chinh phục ({INITIAL_MICRO_WINS.length - unlockedCount})
            </button>
          </div>

          <div className="text-[11px] font-mono font-bold text-muted-foreground">
            Đạt: <strong className="text-red-600 dark:text-red-400">{unlockedCount}</strong> / {INITIAL_MICRO_WINS.length} Cột Mốc
          </div>
        </div>

        {/* Micro-Wins Grid */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {filteredWins.map((win) => {
            const Icon = win.icon;
            const percent = Math.min(100, Math.round((win.progress / win.maxProgress) * 100));

            return (
              <div
                key={win.id}
                className={cn(
                  "p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4",
                  win.isUnlocked
                    ? "border-emerald-500/30 bg-emerald-500/[0.04]"
                    : "border-border bg-card/60"
                )}
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border bg-gradient-to-br shadow-xs",
                      win.badgeColor
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-extrabold text-foreground truncate">
                        {win.title}
                      </h4>
                      {win.isUnlocked ? (
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Đã Mở Khóa
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.2 rounded-md bg-secondary text-muted-foreground border border-border flex items-center gap-1">
                          <Lock className="h-3 w-3" /> Đang Chinh Phục
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground leading-normal">
                      {win.description}
                    </p>

                    <div className="text-[11px] text-red-700 dark:text-red-400/90 font-medium">
                      🎯 <strong>Ý nghĩa thực tế:</strong> {win.realWorldImpact}
                    </div>
                  </div>
                </div>

                {/* Progress bar or Unlocked Date */}
                <div className="sm:w-44 shrink-0 space-y-1 sm:text-right">
                  {win.isUnlocked ? (
                    <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center sm:justify-end gap-1">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Hoàn tất: {win.unlockedDate}</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between sm:justify-end gap-2 text-[11px] font-mono">
                        <span className="text-muted-foreground">Tiến độ:</span>
                        <span className="font-bold text-foreground">
                          {win.progress} / {win.maxProgress} {win.unit} ({percent}%)
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                        <div
                          style={{ width: `${percent}%` }}
                          className="bg-red-600 h-full rounded-full transition-all duration-300"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/80 bg-secondary/20 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            Tự động cập nhật khi bạn hoàn thành các bài tập trong từng Module
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
