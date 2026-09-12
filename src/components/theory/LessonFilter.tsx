"use client";

import React from "react";
import { Search, Filter, Sparkles, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import { PhaseNumber, SkillType } from "@/types/database";
import { cn } from "@/lib/utils";

interface LessonFilterProps {
  selectedPhase: PhaseNumber | "all";
  onSelectPhase: (phase: PhaseNumber | "all") => void;
  selectedSkill: SkillType | "all";
  onSelectSkill: (skill: SkillType | "all") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: "all" | "completed" | "uncompleted";
  onStatusFilterChange: (status: "all" | "completed" | "uncompleted") => void;
  className?: string;
}

const SKILL_OPTIONS: Array<{ value: SkillType | "all"; label: string; icon?: string }> = [
  { value: "all", label: "Tất cả Kỹ năng" },
  { value: "grammar", label: "Ngữ pháp Cốt lõi" },
  { value: "pronunciation", label: "Phát âm IPA" },
  { value: "reading", label: "Reading & Bẫy Đề" },
  { value: "listening", label: "Listening Bẫy Âm" },
  { value: "writing_task1", label: "Writing Task 1" },
  { value: "writing_task2", label: "Writing Task 2" },
  { value: "speaking", label: "Speaking Phản xạ" },
];

export function LessonFilter({
  selectedPhase,
  onSelectPhase,
  selectedSkill,
  onSelectSkill,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  className,
}: LessonFilterProps) {
  return (
    <div className={cn("space-y-4 rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-sm", className)}>
      {/* Top row: Search Bar & Completion Filter */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm kiếm theo tiêu đề bài học, bẫy khảo thí, chủ đề..."
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

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-secondary/60 border border-border/60 self-start md:self-auto text-xs">
          <button
            type="button"
            onClick={() => onStatusFilterChange("all")}
            className={cn(
              "px-3 py-1.5 rounded-lg font-medium transition-all",
              statusFilter === "all"
                ? "bg-card text-foreground shadow-sm font-bold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Tất cả
          </button>
          <button
            type="button"
            onClick={() => onStatusFilterChange("uncompleted")}
            className={cn(
              "px-3 py-1.5 rounded-lg font-medium transition-all",
              statusFilter === "uncompleted"
                ? "bg-card text-foreground shadow-sm font-bold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Chưa học
          </button>
          <button
            type="button"
            onClick={() => onStatusFilterChange("completed")}
            className={cn(
              "px-3 py-1.5 rounded-lg font-medium transition-all",
              statusFilter === "completed"
                ? "bg-card text-emerald-600 dark:text-emerald-400 shadow-sm font-bold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Đã xong
          </button>
        </div>
      </div>

      {/* Middle row: Phase Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1 shrink-0 mr-1">
          <Layers className="h-3.5 w-3.5 text-indigo-500" /> Giai đoạn:
        </span>
        <button
          type="button"
          onClick={() => onSelectPhase("all")}
          className={cn(
            "px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all shrink-0",
            selectedPhase === "all"
              ? "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/30"
              : "bg-secondary/40 text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
          )}
        >
          Toàn bộ Lộ trình
        </button>
        <button
          type="button"
          onClick={() => onSelectPhase(1)}
          className={cn(
            "px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all shrink-0",
            selectedPhase === 1
              ? "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/30"
              : "bg-secondary/40 text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
          )}
        >
          Phase 1: Cứu Ngữ Pháp (4.5 ➔ 5.5)
        </button>
        <button
          type="button"
          onClick={() => onSelectPhase(2)}
          className={cn(
            "px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all shrink-0",
            selectedPhase === 2
              ? "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/30"
              : "bg-secondary/40 text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
          )}
        >
          Phase 2: 14 Dạng Bài (5.5 ➔ 6.5)
        </button>
        <button
          type="button"
          onClick={() => onSelectPhase(3)}
          className={cn(
            "px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all shrink-0",
            selectedPhase === 3
              ? "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/30"
              : "bg-secondary/40 text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
          )}
        >
          Phase 3: C1/C2 & Phản Xạ (6.5 ➔ 7.5+)
        </button>
      </div>

      {/* Bottom row: Skill Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pt-1 border-t border-border/50">
        <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1 shrink-0 mr-1">
          <BookOpen className="h-3.5 w-3.5 text-blue-500" /> Kỹ năng:
        </span>
        {SKILL_OPTIONS.map((option) => {
          const isSelected = selectedSkill === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelectSkill(option.value)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-medium border transition-all shrink-0 whitespace-nowrap",
                isSelected
                  ? "bg-primary/10 text-primary border-primary/30 font-bold"
                  : "bg-card text-muted-foreground border-border hover:bg-accent hover:text-foreground"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
