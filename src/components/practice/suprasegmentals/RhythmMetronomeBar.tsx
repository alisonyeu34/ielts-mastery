"use client";

import React from "react";
import { Play, Pause, Zap, Activity, Clock } from "lucide-react";

interface RhythmMetronomeBarProps {
  isRunning: boolean;
  onToggle: () => void;
  bpm: number;
  onBpmChange: (bpm: number) => void;
  activeChunkIndex: number;
  totalChunks: number;
}

export function RhythmMetronomeBar({
  isRunning,
  onToggle,
  bpm,
  onBpmChange,
  activeChunkIndex,
  totalChunks,
}: RhythmMetronomeBarProps) {
  return (
    <div className="p-4 rounded-2xl bg-secondary/40 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Play/Pause & Tempo Status */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggle}
          className={`h-11 w-11 rounded-2xl flex items-center justify-center font-bold text-xs shadow-md transition-transform hover:scale-105 cursor-pointer ${
            isRunning
              ? "bg-amber-500 text-white shadow-amber-500/20"
              : "bg-primary text-primary-foreground shadow-primary/20"
          }`}
        >
          {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-white" />}
        </button>

        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-foreground">
              {isRunning ? "Metronome Đang Đệm Nhịp Shadowing" : "Bật Nhịp Điệu Pacing Metronome"}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.2 rounded-md bg-secondary text-muted-foreground border border-border">
              {bpm} BPM
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Đọc đồng nhịp theo vạch sáng đang di chuyển giữa các cụm ý nghĩa.
          </p>
        </div>
      </div>

      {/* Tempo Slider & Chunk Dots */}
      <div className="flex items-center gap-4">
        {/* Visual Beats */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalChunks }).map((_, idx) => (
            <span
              key={idx}
              className={`h-3 w-3 rounded-full transition-all duration-200 ${
                activeChunkIndex === idx && isRunning
                  ? "bg-primary ring-4 ring-primary/30 scale-125"
                  : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* BPM Slider */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-muted-foreground">90</span>
          <input
            type="range"
            min="90"
            max="140"
            step="5"
            value={bpm}
            onChange={(e) => onBpmChange(Number(e.target.value))}
            className="w-24 accent-primary cursor-pointer"
          />
          <span className="text-[10px] font-mono text-muted-foreground">140</span>
        </div>
      </div>
    </div>
  );
}
