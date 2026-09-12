"use client";

import React from "react";
import {
  Search,
  Filter,
  Layers,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Zap,
} from "lucide-react";
import { PhaseNumber, SkillType } from "@/types/database";
import { cn } from "@/lib/utils";

interface TheoryCategoryFilterProps {
  searchQuery: string;
  selectedSkill: SkillType | "all";
  selectedPhase: PhaseNumber | "all";
  onSearchChange: (query: string) => void;
  onSkillChange: (skill: SkillType | "all") => void;
  onPhaseChange: (phase: PhaseNumber | "all") => void;
  className?: string;
}

export function TheoryCategoryFilter({
  searchQuery,
  selectedSkill,
  selectedPhase,
  onSearchChange,
  onSkillChange,
  onPhaseChange,
  className,
}: TheoryCategoryFilterProps) {
  const SKILL_TABS: Array<{ id: SkillType | "all"; label: string; icon: React.ElementType }> = [
    { id: "all", label: "Tất cả kỹ năng", icon: Zap },
    { id: "reading", label: "Reading (Đọc)", icon: BookOpen },
    { id: "listening", label: "Listening (Nghe)", icon: Headphones },
    { id: "writing_task2", label: "Writing (Viết)", icon: PenTool },
    { id: "speaking", label: "Speaking (Nói)", icon: Mic },
  ];

  const PHASE_TABS: Array<{ id: PhaseNumber | "all"; label: string }> = [
    { id: "all", label: "Toàn bộ Phase" },
    { id: 1, label: "Phase 1 (4.5 ➔ 5.5)" },
    { id: 2, label: "Phase 2 (5.5 ➔ 6.5)" },
    { id: 3, label: "Phase 3 (6.5 ➔ 7.5+)" },
  ];

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-sm space-y-4 select-none",
        className
      )}
    >
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm bài học lý thuyết, bẫy khảo thí, dạng bài (PEEL, TFNG, S1, Part 1...)"
          className="w-full rounded-2xl border border-border bg-secondary/30 pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
        />
      </div>

      {/* Skills Tabs & Phase Tabs Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-t border-border/70 pt-3">
        {/* Skill Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {SKILL_TABS.map((tab) => {
            const IconComp = tab.icon;
            const isActive = selectedSkill === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSkillChange(tab.id)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer",
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-xs"
                    : "bg-secondary/40 text-muted-foreground hover:text-foreground border-border hover:bg-secondary"
                )}
              >
                <IconComp className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
          {PHASE_TABS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onPhaseChange(p.id)}
              className={cn(
                "px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold border transition-all cursor-pointer",
                selectedPhase === p.id
                  ? "bg-card text-foreground border-border/80 shadow-xs ring-1 ring-primary/20"
                  : "text-muted-foreground hover:text-foreground border-transparent"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
