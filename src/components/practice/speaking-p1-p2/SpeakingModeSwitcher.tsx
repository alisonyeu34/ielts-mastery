"use client";

import React from "react";
import { Mic, Clock, Sparkles, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpeakingModeSwitcherProps {
  activeMode: "part1" | "part2";
  onChangeMode: (mode: "part1" | "part2") => void;
  className?: string;
}

export function SpeakingModeSwitcher({
  activeMode,
  onChangeMode,
  className,
}: SpeakingModeSwitcherProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 p-1.5 rounded-2xl bg-secondary/40 border border-border max-w-xl select-none",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onChangeMode("part1")}
        className={cn(
          "w-1/2 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer",
          activeMode === "part1"
            ? "bg-card text-foreground shadow-xs border border-border"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Clock className="h-4 w-4 text-emerald-500" />
        <span>Part 1: Khung 3 Mốc Thời Gian</span>
      </button>

      <button
        type="button"
        onClick={() => onChangeMode("part2")}
        className={cn(
          "w-1/2 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer",
          activeMode === "part2"
            ? "bg-card text-foreground shadow-xs border border-border"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Compass className="h-4 w-4 text-purple-500" />
        <span>Part 2: Dàn Ý 1 Phút & Thu Âm</span>
      </button>
    </div>
  );
}
