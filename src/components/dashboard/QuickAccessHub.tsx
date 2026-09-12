"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Zap,
  PenTool,
  Brain,
  ShieldAlert,
  GraduationCap,
  ArrowUpRight,
  Headphones,
} from "lucide-react";

interface QuickAccessHubProps {
  vocabDueToday?: number;
  unmasteredErrors?: number;
}

export function QuickAccessHub({
  vocabDueToday = 0,
  unmasteredErrors = 0,
}: QuickAccessHubProps) {
  const links = [
    {
      href: "/theory",
      title: "1. Học Ngữ Pháp & Lý Thuyết",
      desc: "10 chủ điểm ngữ pháp trọng tâm & kỹ năng làm bài",
      icon: <BookOpen className="h-5 w-5 text-blue-500" />,
      colorClass: "bg-blue-500/5 border-blue-500/20 hover:border-blue-500/40",
      badge: null,
    },
    {
      href: "/practice",
      title: "2. Luyện 4 Kỹ Năng",
      desc: "Nghe chính tả, viết câu & luyện tập chuyên sâu",
      icon: <Zap className="h-5 w-5 text-amber-500" />,
      colorClass: "bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40",
      badge: null,
    },
    {
      href: "/ai-grading",
      title: "3. Chấm Bài Tự Động",
      desc: "Chấm chi tiết bài Viết & Nói theo thang điểm IELTS",
      icon: <PenTool className="h-5 w-5 text-rose-500" />,
      colorClass: "bg-rose-500/5 border-rose-500/20 hover:border-rose-500/40",
      badge: "Trợ Lý AI",
    },
    {
      href: "/vocab",
      title: "4. Sổ Từ Vựng",
      desc: "Học từ vựng lặp lại thông minh & từ học thuật",
      icon: <Brain className="h-5 w-5 text-purple-500" />,
      colorClass: "bg-purple-500/5 border-purple-500/20 hover:border-purple-500/40",
      badge: vocabDueToday > 0 ? `${vocabDueToday} từ cần ôn` : null,
      badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    },
    {
      href: "/error-bank",
      title: "5. Sổ Tay Lỗi Sai",
      desc: "Ghi nhớ và khắc phục triệt để các lỗi hay mắc",
      icon: <ShieldAlert className="h-5 w-5 text-emerald-500" />,
      colorClass: "bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40",
      badge: unmasteredErrors > 0 ? `${unmasteredErrors} lỗi cần sửa` : null,
      badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    },
    {
      href: "/mock-test",
      title: "6. Thi Thử IELTS",
      desc: "Thi thử trên máy tính có bấm giờ như thi thật",
      icon: <GraduationCap className="h-5 w-5 text-primary" />,
      colorClass: "bg-primary/5 border-primary/20 hover:border-primary/40",
      badge: "Đề Thi Thật",
    },
  ];

  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <h3 className="font-black text-sm text-foreground uppercase tracking-wider">
          Phòng Học & Luyện Tập Trọng Tâm
        </h3>
        <span className="text-[10px] font-mono text-muted-foreground">
          6 Khu Vực Học
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`p-4 rounded-2xl border transition-all duration-200 flex items-start justify-between gap-3 group hover:scale-[1.02] hover:shadow-xs ${item.colorClass}`}
          >
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-card border border-border/60 shrink-0 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="font-bold text-xs sm:text-sm text-foreground truncate">
                  {item.title}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground line-clamp-1">
                {item.desc}
              </p>
            </div>

            <div className="flex flex-col items-end gap-1 shrink-0">
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              {item.badge && (
                <span
                  className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-md border whitespace-nowrap ${
                    item.badgeColor || "bg-secondary text-muted-foreground border-border"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
