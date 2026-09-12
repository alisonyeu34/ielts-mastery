"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  FileWarning,
} from "lucide-react";
import { ErrorItem, ErrorClassification } from "@/types/database";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

interface ErrorCategoryBreakdownProps {
  errors: ErrorItem[];
  onSelectCategory?: (category: ErrorClassification | "all") => void;
  selectedCategory?: ErrorClassification | "all";
  className?: string;
}

export const ERROR_CATEGORY_CONFIG: Record<
  ErrorClassification,
  { label: string; shortDesc: string; color: string; bg: string; border: string; icon: any }
> = {
  grammar: {
    label: "Ngữ Pháp (Grammar)",
    shortDesc: "Thì, Mệnh đề quan hệ, S-V Agreement",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    icon: BookOpen,
  },
  singular_plural: {
    label: "Số Ít / Số Nhiều (-s/es)",
    shortDesc: "Nuốt âm đuôi, Danh từ đếm được",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    icon: AlertTriangle,
  },
  paraphrase_trap: {
    label: "Bẫy Paraphrase & Suy Diễn",
    shortDesc: "True/False/Not Given, Bẫy đồng nghĩa",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    icon: ShieldAlert,
  },
  pronunciation: {
    label: "Phát Âm & Bắt Âm (Pronunciation)",
    shortDesc: "Cặp âm /iː/ vs /ɪ/, Âm đuôi -ed/s",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    icon: Sparkles,
  },
  careless_reading: {
    label: "Đọc Ẩu & Giới Hạn Từ",
    shortDesc: "Vi phạm số từ, Đọc lướt thiếu ý",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    icon: FileWarning,
  },
  vocabulary: {
    label: "Từ Vựng & Collocations",
    shortDesc: "Sai kết hợp từ, Dùng từ chưa tự nhiên",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon: HelpCircle,
  },
};

export function ErrorCategoryBreakdown({
  errors,
  onSelectCategory,
  selectedCategory = "all",
  className,
}: ErrorCategoryBreakdownProps) {
  const categories = Object.keys(ERROR_CATEGORY_CONFIG) as ErrorClassification[];

  // Calculate statistics per category
  const statsByCategory = categories.map((cat) => {
    const catErrors = errors.filter((e) => e.errorType === cat);
    const total = catErrors.length;
    const mastered = catErrors.filter((e) => e.mastered).length;
    const unresolved = total - mastered;
    const percentage = total > 0 ? Math.round((mastered / total) * 100) : 100;

    return {
      category: cat,
      config: ERROR_CATEGORY_CONFIG[cat],
      total,
      mastered,
      unresolved,
      percentage,
    };
  });

  // Identify the weakest area (highest unresolved count)
  const weakestArea = [...statsByCategory]
    .filter((s) => s.unresolved > 0)
    .sort((a, b) => b.unresolved - a.unresolved)[0];

  const totalUnresolved = errors.filter((e) => !e.mastered).length;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Weakest Area Alert & CTA Banner */}
      {weakestArea && totalUnresolved > 0 && (
        <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-r from-rose-500/10 via-card to-background p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5">
              <TrendingDown className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">
                  Lỗ hổng kiến thức lớn nhất
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-foreground mt-0.5">
                Bạn đang mắc nhiều lỗi nhất ở nhóm: <strong className="text-rose-600 dark:text-rose-400">{weakestArea.config.label}</strong>
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Có <strong>{weakestArea.unresolved} câu sai chưa khắc phục</strong> ({weakestArea.config.shortDesc}). Hãy làm bài luyện tập để triệt tiêu lỗi.
              </p>
            </div>
          </div>

          <Link
            href="/error-bank/drill"
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105 shrink-0"
          >
            <Sparkles className="h-4 w-4" />
            <span>Luyện Tập {totalUnresolved} Câu Sai Ngay ➔</span>
          </Link>
        </div>
      )}

      {/* 6 Category Breakdown Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {statsByCategory.map((item) => {
          const Icon = item.config.icon;
          const isSelected = selectedCategory === item.category;

          return (
            <div
              key={item.category}
              onClick={() => onSelectCategory && onSelectCategory(item.category)}
              className={cn(
                "rounded-2xl border p-4 transition-all cursor-pointer bg-card space-y-3",
                isSelected
                  ? "border-primary ring-2 ring-primary/20 shadow-sm"
                  : "border-border/80 hover:border-border hover:shadow-sm"
              )}
            >
              {/* Card top */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg border shrink-0", item.config.bg, item.config.color, item.config.border)}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-foreground line-clamp-1">
                      {item.config.label}
                    </h5>
                    <span className="text-[10px] text-muted-foreground line-clamp-1">
                      {item.config.shortDesc}
                    </span>
                  </div>
                </div>

                <span
                  className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0",
                    item.unresolved > 0
                      ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                      : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                  )}
                >
                  {item.unresolved > 0 ? `${item.unresolved} chưa sửa` : "Đã sạch lỗi"}
                </span>
              </div>

              {/* Progress & Stats */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Khắc phục: {item.mastered}/{item.total} lỗi</span>
                  <span className="font-bold text-foreground">{item.percentage}%</span>
                </div>
                <ProgressBar
                  value={item.percentage}
                  size="sm"
                  variant={item.unresolved === 0 ? "emerald" : "primary"}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
