"use client";

import React from "react";
import {
  Search,
  Filter,
  Layers,
  Sparkles,
  Zap,
  RotateCcw,
  CheckCircle2,
  XCircle,
  FileCode2,
  Volume2,
  Crosshair,
  AlertTriangle,
  BookOpen,
} from "lucide-react";
import { ErrorClassification, ErrorSourceModule, ErrorItem } from "@/types/database";
import { ERROR_CATEGORY_DETAILS, SOURCE_MODULE_LABELS } from "@/lib/errorBankAnalytics";

interface ErrorBankFilterBarProps {
  errors: ErrorItem[];
  selectedCategory: ErrorClassification | "all";
  onSelectCategory: (category: ErrorClassification | "all") => void;
  selectedModule: ErrorSourceModule | "all";
  onSelectModule: (module: ErrorSourceModule | "all") => void;
  selectedStatus: "all" | "unmastered" | "mastered";
  onSelectStatus: (status: "all" | "unmastered" | "mastered") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onStartArena: () => void;
  onSeedSampleErrors: () => void;
  onResetMastery: () => void;
}

export function ErrorBankFilterBar({
  errors,
  selectedCategory,
  onSelectCategory,
  selectedModule,
  onSelectModule,
  selectedStatus,
  onSelectStatus,
  searchQuery,
  onSearchChange,
  onStartArena,
  onSeedSampleErrors,
  onResetMastery,
}: ErrorBankFilterBarProps) {
  const categories: Array<ErrorClassification | "all"> = [
    "all",
    "grammar",
    "pronunciation",
    "paraphrase_trap",
    "singular_plural",
    "careless_reading",
  ];

  const modules: Array<ErrorSourceModule | "all"> = [
    "all",
    "reading",
    "listening",
    "writing",
    "speaking",
    "dictation",
    "grammar",
  ];

  const getUnmasteredCountForCategory = (cat: ErrorClassification | "all") => {
    if (cat === "all") return errors.filter((e) => !e.mastered).length;
    return errors.filter((e) => e.errorType === cat && !e.mastered).length;
  };

  const getCategoryIcon = (cat: ErrorClassification | "all") => {
    switch (cat) {
      case "all":
        return <Layers className="h-3.5 w-3.5" />;
      case "grammar":
        return <FileCode2 className="h-3.5 w-3.5 text-rose-500" />;
      case "pronunciation":
        return <Volume2 className="h-3.5 w-3.5 text-purple-500" />;
      case "paraphrase_trap":
        return <Crosshair className="h-3.5 w-3.5 text-blue-500" />;
      case "singular_plural":
        return <Layers className="h-3.5 w-3.5 text-amber-500" />;
      case "careless_reading":
        return <AlertTriangle className="h-3.5 w-3.5 text-red-500" />;
      default:
        return <BookOpen className="h-3.5 w-3.5 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          const unmasteredCount = getUnmasteredCountForCategory(cat);
          const label =
            cat === "all" ? "Tất Cả Danh Mục" : ERROR_CATEGORY_DETAILS[cat].shortLabel;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-xs scale-[1.02]"
                  : "bg-card hover:bg-secondary/80 text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {getCategoryIcon(cat)}
              <span>{label}</span>
              {unmasteredCount > 0 && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-black ${
                    isSelected
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                  }`}
                >
                  {unmasteredCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Filter Options & Controls Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3.5 rounded-2xl border border-border bg-card shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm theo ngữ cảnh câu, đáp án sai hoặc giải thích..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-secondary/50 border border-border/80 focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <XCircle className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Module Selector */}
          <select
            value={selectedModule}
            aria-label="Lọc theo kỹ năng nguồn"
            onChange={(e) => onSelectModule(e.target.value as ErrorSourceModule | "all")}
            className="px-3 py-2 text-xs rounded-xl bg-secondary/50 border border-border text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <option value="all">Mọi Kỹ Năng Nguồn</option>
            {modules
              .filter((m) => m !== "all")
              .map((mod) => (
                <option key={mod} value={mod}>
                  {SOURCE_MODULE_LABELS[mod as ErrorSourceModule] || mod}
                </option>
              ))}
          </select>

          {/* Status Tabs */}
          <div className="flex items-center p-0.5 rounded-xl bg-secondary/60 border border-border text-xs font-semibold">
            <button
              type="button"
              onClick={() => onSelectStatus("all")}
              className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedStatus === "all" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Tất cả
            </button>
            <button
              type="button"
              onClick={() => onSelectStatus("unmastered")}
              className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedStatus === "unmastered"
                  ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Chưa làm chủ
            </button>
            <button
              type="button"
              onClick={() => onSelectStatus("mastered")}
              className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedStatus === "mastered"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Đã khắc phục
            </button>
          </div>

          {/* Action Trigger: Start Remediation Arena */}
          <button
            type="button"
            onClick={onStartArena}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105 cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5 fill-white" />
            <span>Phòng Luyện Arena</span>
          </button>
        </div>
      </div>

      {/* Secondary Tools Line */}
      <div className="flex items-center justify-between text-xs px-1">
        <div className="text-muted-foreground font-mono">
          Hiển thị{" "}
          <strong className="text-foreground">
            {errors.filter((e) => (selectedCategory === "all" ? true : e.errorType === selectedCategory)).length}
          </strong>{" "}
          câu bẫy khảo thí
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSeedSampleErrors}
            className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="h-3 w-3" /> Nạp 25 Lỗi Cambridge Mẫu
          </button>

          <button
            type="button"
            onClick={onResetMastery}
            className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" /> Đặt lại trạng thái luyện
          </button>
        </div>
      </div>
    </div>
  );
}
