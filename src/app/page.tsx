"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Zap,
  PenTool,
  Brain,
  ShieldAlert,
  ArrowRight,
  Flame,
  Target,
  Sparkles,
  Clock,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Calendar,
  Layers,
} from "lucide-react";
import { PhaseTracker } from "@/components/layout/PhaseTracker";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { NAVIGATION_ITEMS } from "@/lib/constants";

const MODULE_METRICS = {
  theory: {
    progress: 0,
    metricText: "11 Bài ngữ pháp trọng tâm",
    highlight: "7 Trụ cột ngữ pháp nền tảng",
    actionLabel: "Vào học ngay",
    color: "from-red-600/20 to-rose-600/10",
    badgeColor: "text-red-700 dark:text-red-400 bg-red-500/10 border-red-500/20",
  },
  practice: {
    progress: 0,
    metricText: "Phòng luyện 4 kỹ năng",
    highlight: "Nghe, Đọc, Viết, Nói Cambridge",
    actionLabel: "Vào phòng luyện",
    color: "from-amber-500/20 to-orange-500/10",
    badgeColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
  grading: {
    progress: 0,
    metricText: "Chấm điểm tự động tức thì",
    highlight: "Sửa lỗi Writing & Speaking",
    actionLabel: "Nộp bài chấm",
    color: "from-rose-500/20 to-pink-500/10",
    badgeColor: "text-rose-500 bg-rose-500/10 border-rose-500/20",
  },
  vocab: {
    progress: 0,
    metricText: "Sổ từ vựng thông minh",
    highlight: "Tự động nhắc ôn để nhớ lâu",
    actionLabel: "Học từ mới",
    color: "from-purple-500/20 to-indigo-500/10",
    badgeColor: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  },
  "error-bank": {
    progress: 0,
    metricText: "0 Lỗi sai ghi nhận",
    highlight: "Tự động lưu câu làm sai",
    actionLabel: "Xem sổ lỗi",
    color: "from-emerald-500/20 to-teal-500/10",
    badgeColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
  "ai-coach": {
    progress: 0,
    metricText: "Luyện nói cùng giám khảo ảo",
    highlight: "Hỏi đáp phản xạ trực tiếp 1-1",
    actionLabel: "Vào phòng nói",
    color: "from-red-600/20 to-rose-600/10",
    badgeColor: "text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/20",
  },
};

export default function HomePage() {
  return (
    <div className="space-y-8 pb-12">
      {/* 1. Hero Section: Overview & Today's Target */}
      <section className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-red-950/30 via-card to-background p-6 sm:p-8 shadow-sm">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 h-64 w-64 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-8 h-48 w-48 rounded-full bg-rose-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-700 dark:text-red-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Lộ trình 165 Ngày Tự Động (5.5 Tháng) • Khởi động: 16/9/2026 (Ngày 1/165)</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Chinh phục IELTS <span className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 bg-clip-text text-transparent">Band 7.5</span> từ Band 4.5
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Lộ trình học tập 3 giai đoạn vững vàng: <strong>14 Ngày Cứu Ngữ Pháp Nền Tảng (16/9 - 29/9)</strong> ➔ <strong>Chiến Thuật 4 Kỹ Năng & 2.500 Từ Chuyên Ngành Passage 3 (29/9 - 30/11)</strong> ➔ <strong>Luyện Đề Cambridge & Về Đích 7.5 (1/12 - 26/2)</strong>.
            </p>

            <div className="flex wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground bg-secondary/80 px-3 py-1.5 rounded-xl border border-border">
                <Target className="h-4 w-4 text-red-600 dark:text-red-400" />
                <span>Band khởi điểm: 4.5 ➔ Mục tiêu: 7.5+</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground bg-secondary/80 px-3 py-1.5 rounded-xl border border-border">
                <Flame className="h-4 w-4 text-muted-foreground" />
                <span>Chuỗi học: 0 ngày (Bắt đầu 16/9)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground bg-secondary/80 px-3 py-1.5 rounded-xl border border-border">
                <Clock className="h-4 w-4 text-red-600 dark:text-red-400" />
                <span>Trọn vẹn 165 ngày (5.5 tháng) đến đích 7.5</span>
              </div>
            </div>
          </div>

          {/* Quick Summary Card */}
          <div className="w-full lg:w-80 rounded-2xl border border-border bg-card/80 backdrop-blur-md p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Tiến độ Giai đoạn 1
              </span>
              <span className="text-sm font-extrabold text-red-700 dark:text-red-400">
                0% Hoàn thành
              </span>
            </div>

            <ProgressBar value={0} variant="primary" size="md" />

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Nhiệm vụ Ngày 1:</span>
                <span className="font-bold text-foreground">0 / 4 ca hoàn thành</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Thời gian thực học:</span>
                <span className="font-bold text-foreground">0 / 420 phút (7 tiếng)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Thời gian ngồi bàn:</span>
                <span className="font-bold text-foreground">10 giờ (kèm 3h nghỉ)</span>
              </div>
            </div>

            <Link
              href="/roadmap"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-700 hover:bg-red-800 text-white py-2.5 px-4 text-xs font-bold shadow-md shadow-red-700/30 transition-all hover:scale-[1.02]"
            >
              Bắt đầu học Ngày 1 (16/9) <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. 3-Phase Roadmap Progression Tracker */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
              <Layers className="h-5 w-5 text-red-700 dark:text-red-400" />
              3 Giai đoạn trong lộ trình 165 ngày
            </h2>
            <p className="text-xs text-muted-foreground">
              Vượt qua bài kiểm tra cột mốc cuối mỗi giai đoạn để tự động mở khóa giai đoạn tiếp theo.
            </p>
          </div>
        </div>
        <PhaseTracker />
      </section>

      {/* 3. Core Modules Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-red-700 dark:text-red-400" />
              Các phòng học & Luyện tập chính
            </h2>
            <p className="text-xs text-muted-foreground">
              Mỗi phòng học tập trung vào một phần kiến thức trọng tâm giúp bạn tiến bộ từng ngày.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {NAVIGATION_ITEMS.map((item) => {
            const metrics = MODULE_METRICS[item.id as keyof typeof MODULE_METRICS];

            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-all duration-200 hover:border-red-500/50 hover:shadow-md hover:shadow-red-500/5"
              >
                <div className="space-y-3">
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between">
                    <span className={item.highlightColor + " text-xs font-bold px-2.5 py-1 rounded-lg border"}>
                      Module {item.moduleNumber}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {item.estimatedTime}
                    </span>
                  </div>

                  {/* Title and Short description */}
                  <div>
                    <h3 className="text-base font-bold text-foreground group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Live Status / Metric snippet */}
                  <div className="rounded-xl bg-secondary/50 border border-border/60 p-3 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">{metrics.metricText}</span>
                      <span className="text-muted-foreground text-[11px]">{metrics.progress}%</span>
                    </div>
                    <ProgressBar value={metrics.progress} size="sm" variant="primary" />
                    <div className="text-[11px] text-muted-foreground truncate pt-0.5">
                      Đang tập trung: <span className="font-medium text-foreground">{metrics.highlight}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 mt-3 border-t border-border/60 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    {item.badge}
                  </span>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors group-hover:translate-x-0.5"
                  >
                    <span>{metrics.actionLabel}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Today's Recommended Micro-actions */}
      <section className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-red-600 dark:text-red-400" />
            <h3 className="text-base font-bold text-foreground">
              4 Ca Học Ngày 1 — Quy Luật "Nạp Trước - Xả Sau" (Khởi động: 16/9/2026)
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-xl self-start sm:self-auto">
            ⏱️ Ngồi bàn 10h • Thực học 7h (105m/ca) • Nạp sáng, Xả chiều
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Ca 1: Reading (Nạp) */}
          <Link
            href="/practice/reading-split"
            prefetch={true}
            className="flex flex-col justify-between p-4 rounded-xl border border-blue-500/20 bg-blue-500/[0.03] hover:bg-blue-500/10 transition-colors"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                1. Kỹ Năng Đọc (Reading • Nạp)
              </span>
              <h4 className="text-xs font-bold text-foreground">
                Ca 1: Đọc Hiểu 2 Cột & Nạp Từ Vựng Chuyên Ngành
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Nạp từ vựng Passage 3, bóc tách cấu trúc câu phức trong bài và lưu vào Sổ FSRS.
              </p>
            </div>
            <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-3 pt-2 border-t border-blue-500/10">
              <span className="font-mono font-semibold">⏱️ 08:00 – 09:45 (105p)</span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">Luyện đọc ➔</span>
            </div>
          </Link>

          {/* Ca 2: Listening (Nạp) */}
          <Link
            href="/practice/dictation"
            prefetch={true}
            className="flex flex-col justify-between p-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.03] hover:bg-amber-500/10 transition-colors"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                2. Kỹ Năng Nghe (Listening • Nạp)
              </span>
              <h4 className="text-xs font-bold text-foreground">
                Ca 2: Cam 11 T1 Section 1 & Chép Chính Tả 3 Tốc Độ
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Nạp phản xạ âm thanh, bắt số, tên riêng và nghe chép chính tả (1.5x, 1x, 0.75x).
              </p>
            </div>
            <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-3 pt-2 border-t border-amber-500/10">
              <span className="font-mono font-semibold">⏱️ 10:15 – 12:00 (105p)</span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold">Luyện nghe ➔</span>
            </div>
          </Link>

          {/* Ca 3: Writing (Xả) */}
          <Link
            href="/theory/day1-present-simple-to-be"
            prefetch={true}
            className="flex flex-col justify-between p-4 rounded-xl border border-red-500/20 bg-red-500/[0.03] hover:bg-red-500/10 transition-colors"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-red-700 dark:text-red-400 uppercase tracking-wider">
                3. Kỹ Năng Viết (Writing • Xả)
              </span>
              <h4 className="text-xs font-bold text-foreground">
                Ca 3: 14 Ngày Cứu Ngữ Pháp & Sentence Writing Lab
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Xả từ vựng vào viết câu S-V-O, làm chủ To Be am/is/are và xóa vĩnh viễn thói quen dịch word-by-word.
              </p>
            </div>
            <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-3 pt-2 border-t border-red-500/10">
              <span className="font-mono font-semibold">⏱️ 13:15 – 15:00 (105p)</span>
              <span className="text-red-700 dark:text-red-400 font-semibold">Vào học ➔</span>
            </div>
          </Link>

          {/* Ca 4: Speaking (Xả) */}
          <Link
            href="/practice/shadowing"
            prefetch={true}
            className="flex flex-col justify-between p-4 rounded-xl border border-purple-500/20 bg-purple-500/[0.03] hover:bg-purple-500/10 transition-colors"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                4. Kỹ Năng Nói (Speaking • Xả)
              </span>
              <h4 className="text-xs font-bold text-foreground">
                Ca 4: Nhại Giọng Bản Xứ (Shadowing Echo) & Phản Xạ Thực Chiến
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Nói KHÔNG với IPA: Nhại âm thanh trực tiếp, ngắt cụm ý, bật âm đuôi (-s/-ed) bằng cơ miệng, công thức 1-2-3 Part 1.
              </p>
            </div>
            <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-3 pt-2 border-t border-purple-500/10">
              <span className="font-mono font-semibold">⏱️ 16:15 – 18:00 (105p)</span>
              <span className="text-purple-600 dark:text-purple-400 font-semibold">Luyện nói ➔</span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
