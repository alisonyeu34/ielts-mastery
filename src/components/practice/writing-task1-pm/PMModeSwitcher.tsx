"use client";

import React from "react";
import {
  MOCK_PROCESS_MAP_EXERCISES,
  Task1PMExercise,
} from "@/data/mockProcessMapData";
import {
  Factory,
  Bug,
  Compass,
  Building2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PMModeSwitcherProps {
  activeExerciseId: string;
  onSelectExercise: (id: string) => void;
  className?: string;
}

export function PMModeSwitcher({
  activeExerciseId,
  onSelectExercise,
  className,
}: PMModeSwitcherProps) {
  const getExerciseIcon = (type: string) => {
    switch (type) {
      case "process_manmade":
        return <Factory className="h-4 w-4" />;
      case "process_natural":
        return <Bug className="h-4 w-4" />;
      case "map_past_present":
        return <Compass className="h-4 w-4" />;
      case "map_present_future":
        return <Building2 className="h-4 w-4" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };

  const getTagBadge = (type: string) => {
    switch (type) {
      case "process_manmade":
        return "Quy trình nhân tạo • Thể bị động";
      case "process_natural":
        return "Vòng đời tự nhiên • Thể chủ động";
      case "map_past_present":
        return "Bản đồ 1990 - 2020 • Đô thị hóa";
      case "map_present_future":
        return "Bản đồ tương lai • Dự án 2035";
      default:
        return "Task 1 Visual";
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
          <span>Chọn Dạng Đề Process & Map Studio:</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {MOCK_PROCESS_MAP_EXERCISES.map((ex) => {
          const isSelected = ex.id === activeExerciseId;
          const isProcess = ex.diagramType.startsWith("process");

          return (
            <button
              key={ex.id}
              type="button"
              onClick={() => onSelectExercise(ex.id)}
              className={cn(
                "p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer",
                isSelected
                  ? isProcess
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/25 ring-2 ring-indigo-500/20"
                    : "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/25 ring-2 ring-emerald-500/20"
                  : "bg-card border-border hover:border-indigo-500/50 hover:bg-secondary/40 text-foreground"
              )}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-xl",
                    isSelected
                      ? "bg-white/20 text-white"
                      : isProcess
                      ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                      : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  )}
                >
                  {getExerciseIcon(ex.diagramType)}
                </div>

                {isSelected && (
                  <CheckCircle2 className="h-4 w-4 text-white shrink-0 animate-in zoom-in-50 duration-200" />
                )}
              </div>

              <span
                className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-md inline-block mb-1",
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {getTagBadge(ex.diagramType)}
              </span>

              <h4
                className={cn(
                  "text-xs font-bold line-clamp-2 leading-snug",
                  isSelected ? "text-white" : "text-foreground"
                )}
              >
                {ex.title}
              </h4>
            </button>
          );
        })}
      </div>
    </div>
  );
}
