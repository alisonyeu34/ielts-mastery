"use client";

import React from "react";
import {
  Sparkles,
  Layers,
  Compass,
  Eye,
  Ear,
  Wind,
  Coffee,
  Heart,
} from "lucide-react";
import {
  FiveSensesNotes,
  MemoryPalaceNotes,
} from "@/data/mockSpeakingP1P2Data";
import { PlannerMode } from "@/hooks/useSpeakingSession";
import { FiveSensesGuideModal } from "@/components/practice/speaking-p1-p2/FiveSensesGuideModal";
import { MemoryPalaceCanvas } from "@/components/practice/speaking-p1-p2/MemoryPalaceCanvas";
import { cn } from "@/lib/utils";

interface Part2OneMinutePlannerProps {
  mode: PlannerMode;
  fiveSenses: FiveSensesNotes;
  memoryPalace: MemoryPalaceNotes;
  onSetMode: (mode: PlannerMode) => void;
  onSetSense: (sense: keyof FiveSensesNotes, val: string) => void;
  onSetStation: (station: keyof MemoryPalaceNotes, val: string) => void;
  className?: string;
}

export function Part2OneMinutePlanner({
  mode,
  fiveSenses,
  memoryPalace,
  onSetMode,
  onSetSense,
  onSetStation,
  className,
}: Part2OneMinutePlannerProps) {
  const SENSES_INPUTS: Array<{
    key: keyof FiveSensesNotes;
    icon: typeof Eye;
    label: string;
    badge: string;
    placeholder: string;
  }> = [
    {
      key: "sight",
      icon: Eye,
      label: "Thị Giác (Sight)",
      badge: "text-blue-600 bg-blue-500/10 border-blue-500/20",
      placeholder: "Màu sắc, ánh sáng, hình ảnh bao quát...",
    },
    {
      key: "sound",
      icon: Ear,
      label: "Thính Giác (Sound)",
      badge: "text-purple-600 bg-purple-500/10 border-purple-500/20",
      placeholder: "Tiếng nhạc, giọng nói, tiếng ồn xung quanh...",
    },
    {
      key: "smell",
      icon: Wind,
      label: "Khứu Giác (Smell)",
      badge: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
      placeholder: "Không khí, mùi hương, khói, thời tiết...",
    },
    {
      key: "taste",
      icon: Coffee,
      label: "Vị Giác (Taste)",
      badge: "text-amber-600 bg-amber-500/10 border-amber-500/20",
      placeholder: "Đồ ăn, thức uống, vị giác đặc trưng...",
    },
    {
      key: "touchEmotion",
      icon: Heart,
      label: "Xúc Giác / Cảm Xúc (Touch / Emotion)",
      badge: "text-rose-600 bg-rose-500/10 border-rose-500/20",
      placeholder: "Cảm giác da gà, rung chấn, sự xúc động cao trào...",
    },
  ];

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-5 select-none",
        className
      )}
    >
      {/* Header with Mode Switcher & Guide */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4">
        <div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 uppercase tracking-wider">
            1-Minute Note Taking
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-foreground mt-1">
            Bảng Ghi Chú Dàn Ý 60 Giây (Part 2 Planner)
          </h3>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <FiveSensesGuideModal />
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-secondary/60 border border-border/80">
        <button
          type="button"
          onClick={() => onSetMode("five_senses")}
          className={cn(
            "flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
            mode === "five_senses"
              ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
          <span>Mô Hình 5 Giác Quan (5 Senses Matrix)</span>
        </button>

        <button
          type="button"
          onClick={() => onSetMode("memory_palace")}
          className={cn(
            "flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
            mode === "memory_palace"
              ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Compass className="h-3.5 w-3.5 text-purple-500" />
          <span>Lâu Đài Trí Nhớ (4 Trạm Không Gian)</span>
        </button>
      </div>

      {/* Planner Content according to mode */}
      {mode === "five_senses" ? (
        <div className="space-y-3 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SENSES_INPUTS.map((item) => {
              const IconComp = item.icon;

              return (
                <div
                  key={item.key}
                  className="p-3.5 rounded-2xl bg-secondary/30 border border-border/70 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider flex items-center gap-1",
                        item.badge
                      )}
                    >
                      <IconComp className="h-3 w-3" />
                      <span>{item.label}</span>
                    </span>
                  </div>

                  <textarea
                    rows={2}
                    value={fiveSenses[item.key]}
                    onChange={(e) => onSetSense(item.key, e.target.value)}
                    placeholder={item.placeholder}
                    className="w-full rounded-xl border border-border bg-card p-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-sans leading-relaxed"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <MemoryPalaceCanvas
          notes={memoryPalace}
          onChangeStation={onSetStation}
          className="animate-in fade-in duration-150"
        />
      )}
    </div>
  );
}
