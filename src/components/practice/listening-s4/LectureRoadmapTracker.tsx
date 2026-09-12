"use client";

import React from "react";
import { LectureSectionBlock } from "@/data/mockSection4LectureData";
import { Compass, CheckCircle2, CircleDot, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LectureRoadmapTrackerProps {
  sections: LectureSectionBlock[];
  activeSectionIndex: number;
  onSeekToSection: (timestamp: number) => void;
  className?: string;
}

export function LectureRoadmapTracker({
  sections,
  activeSectionIndex,
  onSeekToSection,
  className,
}: LectureRoadmapTrackerProps) {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = Math.floor(secs % 60);
    return `0${mins}:${rem < 10 ? `0${rem}` : rem}`;
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-sm space-y-3 select-none",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border/60 pb-2">
        <div className="flex items-center gap-2">
          <Compass className="h-4 w-4 text-primary" />
          <span className="font-bold text-xs text-foreground">
            Bản Đồ Lộ Trình Bài Giảng (Lecture Roadmap Radar)
          </span>
        </div>

        <span className="text-[10px] font-mono text-primary font-bold">
          Chặng {activeSectionIndex + 1} / {sections.length}
        </span>
      </div>

      {/* 4 Roadmap Stages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {sections.map((sec, idx) => {
          const isActive = activeSectionIndex === idx;
          const isPassed = activeSectionIndex > idx;

          return (
            <button
              key={sec.sectionIndex}
              type="button"
              onClick={() => onSeekToSection(sec.startTimestampSeconds)}
              className={cn(
                "p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer space-y-1.5 relative overflow-hidden",
                isActive
                  ? "border-primary bg-primary/[0.05] ring-2 ring-primary/30 shadow-xs"
                  : isPassed
                  ? "border-emerald-500/30 bg-emerald-500/[0.02] opacity-80 hover:opacity-100"
                  : "border-border/60 bg-secondary/15 opacity-60 hover:opacity-100"
              )}
            >
              {/* Header: Roman Numeral & Status */}
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-xs text-primary">
                  Part {sec.romanNumeral}
                </span>

                <span className="text-[10px] font-mono text-muted-foreground">
                  {formatTime(sec.startTimestampSeconds)}
                </span>
              </div>

              {/* Title */}
              <h5 className="font-bold text-xs text-foreground leading-snug line-clamp-1">
                {sec.titleVi}
              </h5>

              {/* Question Range Badge */}
              <div className="flex items-center justify-between pt-0.5 text-[10px] font-mono">
                <span className="text-muted-foreground">
                  Q{sec.questionNumbers.join(", Q")}
                </span>

                {isActive ? (
                  <span className="text-primary font-bold flex items-center gap-1">
                    <CircleDot className="h-2.5 w-2.5 animate-ping" /> Đang giảng
                  </span>
                ) : isPassed ? (
                  <span className="text-emerald-600 flex items-center gap-0.5 font-bold">
                    <CheckCircle2 className="h-3 w-3" /> Đã qua
                  </span>
                ) : (
                  <span className="text-muted-foreground/60">Sắp tới</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
