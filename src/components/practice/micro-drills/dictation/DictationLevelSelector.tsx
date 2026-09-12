"use client";

import React from "react";
import { Headphones, Sparkles, Layers, Zap, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface DictationLevelSelectorProps {
  selectedLevel: 1 | 2 | 3 | "all";
  onSelectLevel: (lvl: 1 | 2 | 3 | "all") => void;
  className?: string;
}

export function DictationLevelSelector({
  selectedLevel,
  onSelectLevel,
  className,
}: DictationLevelSelectorProps) {
  const levels = [
    {
      id: "all" as const,
      label: "Tất Cả Cấp Độ",
      badge: "15 Bài",
      icon: <Layers className="h-4 w-4" />,
      desc: "Tổng hợp toàn bộ dạng bài",
    },
    {
      id: 1 as const,
      label: "Level 1: Cloze Dictation",
      badge: "Mạo / Giới / Trợ từ",
      icon: <Sparkles className="h-4 w-4 text-emerald-500" />,
      desc: "Bắt các từ chức năng vô hình",
    },
    {
      id: 2 as const,
      label: "Level 2: Connected Speech",
      badge: "Nối / Nuốt / -s / -ed",
      icon: <Zap className="h-4 w-4 text-amber-500" />,
      desc: "Bóc tách biến âm & bẫy âm vị",
    },
    {
      id: 3 as const,
      label: "Level 3: Full Reconstruction",
      badge: "Academic C1/C2",
      icon: <Award className="h-4 w-4 text-purple-500" />,
      desc: "Tái tạo 100% câu độc thoại học thuật",
    },
  ];

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 select-none",
        className
      )}
    >
      {levels.map((lvl) => {
        const isActive = selectedLevel === lvl.id;

        return (
          <button
            key={lvl.id}
            type="button"
            onClick={() => onSelectLevel(lvl.id)}
            className={cn(
              "p-4 rounded-3xl border text-left transition-all flex flex-col justify-between gap-2.5 cursor-pointer shadow-xs",
              isActive
                ? "bg-indigo-500/10 border-indigo-500/40 text-foreground ring-2 ring-indigo-500/20"
                : "bg-card border-border hover:bg-secondary/60 hover:border-border text-muted-foreground"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-xl",
                  isActive
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {lvl.icon}
              </div>
              <span
                className={cn(
                  "text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase",
                  isActive
                    ? "bg-indigo-500/20 text-indigo-700 dark:text-indigo-300"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {lvl.badge}
              </span>
            </div>

            <div>
              <h4
                className={cn(
                  "text-xs font-black tracking-tight",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {lvl.label}
              </h4>
              <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                {lvl.desc}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
