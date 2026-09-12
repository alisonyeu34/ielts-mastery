"use client";

import React from "react";
import { Search, Filter, Layers, CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";
import { ErrorClassification, ErrorSourceModule } from "@/types/database";
import { cn } from "@/lib/utils";

interface ErrorFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: ErrorClassification | "all";
  onSelectCategory: (cat: ErrorClassification | "all") => void;
  selectedSource: ErrorSourceModule | "all";
  onSelectSource: (src: ErrorSourceModule | "all") => void;
  statusFilter: "all" | "unresolved" | "mastered";
  onStatusFilterChange: (status: "all" | "unresolved" | "mastered") => void;
  totalCount: number;
  unresolvedCount: number;
  masteredCount: number;
  className?: string;
}

const SOURCE_OPTIONS: Array<{ value: ErrorSourceModule | "all"; label: string }> = [
  { value: "all", label: "Tất cả Nguồn lỗi" },
  { value: "dictation", label: "Chép chính tả" },
  { value: "reading", label: "Reading" },
  { value: "listening", label: "Listening" },
  { value: "writing", label: "Writing" },
  { value: "speaking", label: "Speaking" },
];

export function ErrorFilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  selectedSource,
  onSelectSource,
  statusFilter,
  onStatusFilterChange,
  totalCount,
  unresolvedCount,
  masteredCount,
  className,
}: ErrorFilterBarProps) {
  return (
    <div className={cn("space-y-3.5 rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm", className)}>
      {/* Search & Status Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm kiếm lỗi sai, ngữ cảnh bài tập, từ gõ sai, giải thích..."
            className="w-full rounded-xl border border-border bg-secondary/30 pl-9 pr-4 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          )}
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-secondary/60 border border-border/60 text-xs self-start md:self-auto">
          <button
            type="button"
            onClick={() => onStatusFilterChange("all")}
            className={cn(
              "px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer",
              statusFilter === "all"
                ? "bg-card text-foreground shadow-sm font-bold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Tất cả ({totalCount})
          </button>
          <button
            type="button"
            onClick={() => onStatusFilterChange("unresolved")}
            className={cn(
              "px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer",
              statusFilter === "unresolved"
                ? "bg-rose-600 text-white shadow-sm font-bold"
                : "text-muted-foreground hover:text-rose-600"
            )}
          >
            Chưa sửa ({unresolvedCount})
          </button>
          <button
            type="button"
            onClick={() => onStatusFilterChange("mastered")}
            className={cn(
              "px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer",
              statusFilter === "mastered"
                ? "bg-emerald-600 text-white shadow-sm font-bold"
                : "text-muted-foreground hover:text-emerald-600"
            )}
          >
            Đã khắc phục ({masteredCount})
          </button>
        </div>
      </div>

      {/* Secondary filter selectors (Category & Source Module) */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/60 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Source module select */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-muted-foreground font-semibold">Nguồn lỗi:</span>
            <select
              value={selectedSource}
              onChange={(e) => onSelectSource(e.target.value as any)}
              className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {SOURCE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category select */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-muted-foreground font-semibold">Phân loại lỗi:</span>
            <select
              value={selectedCategory}
              onChange={(e) => onSelectCategory(e.target.value as any)}
              className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">Tất cả 6 nhóm lỗi</option>
              <option value="grammar">Ngữ Pháp (Grammar)</option>
              <option value="singular_plural">Số Ít / Số Nhiều (-s/es)</option>
              <option value="paraphrase_trap">Bẫy Paraphrase & Suy Diễn</option>
              <option value="pronunciation">Phát Âm & Bắt Âm</option>
              <option value="careless_reading">Đọc Ẩu & Giới Hạn Từ</option>
              <option value="vocabulary">Từ Vựng & Collocations</option>
            </select>
          </div>
        </div>

        {/* Reset filter */}
        {(searchQuery || selectedCategory !== "all" || selectedSource !== "all" || statusFilter !== "all") && (
          <button
            type="button"
            onClick={() => {
              onSearchChange("");
              onSelectCategory("all");
              onSelectSource("all");
              onStatusFilterChange("all");
            }}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            Xóa bộ lọc
          </button>
        )}
      </div>
    </div>
  );
}
