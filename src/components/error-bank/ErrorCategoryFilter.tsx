"use client";

import React from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  ShieldAlert,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  ErrorClassification,
  ErrorSourceModule,
  ErrorItem,
} from "@/types/database";
import {
  groupErrorsByType,
  ERROR_CATEGORY_METADATA,
} from "@/lib/errorBankHelpers";
import { cn } from "@/lib/utils";

interface ErrorCategoryFilterProps {
  errors: ErrorItem[];
  selectedCategory: ErrorClassification | "all";
  onSelectCategory: (category: ErrorClassification | "all") => void;
  selectedStatus: "all" | "unmastered" | "mastered";
  onSelectStatus: (status: "all" | "unmastered" | "mastered") => void;
  selectedModule: ErrorSourceModule | "all";
  onSelectModule: (module: ErrorSourceModule | "all") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  className?: string;
}

export function ErrorCategoryFilter({
  errors,
  selectedCategory,
  onSelectCategory,
  selectedStatus,
  onSelectStatus,
  selectedModule,
  onSelectModule,
  searchQuery,
  onSearchChange,
  className,
}: ErrorCategoryFilterProps) {
  const categoryGroups = groupErrorsByType(errors);

  const categories: Array<{ id: ErrorClassification | "all"; label: string; count: number }> = [
    { id: "all", label: "Tất Cả Lỗi", count: errors.length },
    { id: "grammar", label: "Ngữ Pháp", count: categoryGroups.grammar.count },
    { id: "pronunciation", label: "Phát Âm", count: categoryGroups.pronunciation.count },
    { id: "paraphrase_trap", label: "Bẫy Paraphrase", count: categoryGroups.paraphrase_trap.count },
    { id: "singular_plural", label: "Số Ít / Nhiều", count: categoryGroups.singular_plural.count },
    { id: "careless_reading", label: "Đọc Ẩu", count: categoryGroups.careless_reading.count },
    { id: "vocabulary", label: "Từ Vựng", count: categoryGroups.vocabulary.count },
  ];

  return (
    <div className={cn("space-y-4 select-none", className)}>
      {/* 1. Main Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-2xl border text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer",
                isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-card border-border hover:bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              <span>{cat.label}</span>
              <span
                className={cn(
                  "font-mono text-[10px] px-1.5 py-0.2 rounded-full",
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Sub-filters & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-secondary/30 border border-border text-xs">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo bối cảnh, câu hỏi..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-border bg-card text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Status & Module Selects */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedStatus}
            onChange={(e) => onSelectStatus(e.target.value as "all" | "unmastered" | "mastered")}
            className="px-3 py-1.5 rounded-xl border border-border bg-card text-foreground font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <option value="all">Mọi trạng thái</option>
            <option value="unmastered">Chưa làm chủ (0/2 - 1/2)</option>
            <option value="mastered">Đã triệt tiêu (2/2)</option>
          </select>

          <select
            value={selectedModule}
            onChange={(e) => onSelectModule(e.target.value as ErrorSourceModule | "all")}
            className="px-3 py-1.5 rounded-xl border border-border bg-card text-foreground font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <option value="all">Mọi kỹ năng nguồn</option>
            <option value="reading">Reading</option>
            <option value="listening">Listening</option>
            <option value="dictation">Dictation</option>
            <option value="grammar">Grammar Clinic</option>
            <option value="writing">Writing</option>
            <option value="speaking">Speaking</option>
          </select>
        </div>
      </div>
    </div>
  );
}
