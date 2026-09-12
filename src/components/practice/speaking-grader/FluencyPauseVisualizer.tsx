"use client";

import React, { useState } from "react";
import {
  Activity,
  AlertCircle,
  Pause,
  Play,
  Sparkles,
  Volume2,
  Gauge,
} from "lucide-react";
import { PauseInterval } from "@/data/mockSpeakingFeedbackData";
import { cn } from "@/lib/utils";

interface FluencyPauseVisualizerProps {
  durationSeconds: number;
  wordsPerMinute: number;
  pauseIntervals: PauseInterval[];
  className?: string;
}

export function FluencyPauseVisualizer({
  durationSeconds,
  wordsPerMinute,
  pauseIntervals,
  className,
}: FluencyPauseVisualizerProps) {
  const [activePauseId, setActivePauseId] = useState<string | null>(null);

  // Determine WPM speed category
  const getSpeedCategory = (wpm: number) => {
    if (wpm < 110) return { label: "Hơi Chậm / Ngập Ngừng (< 110 WPM)", color: "text-amber-600 bg-amber-500/10 border-amber-500/30" };
    if (wpm > 165) return { label: "Hơi Nhanh / Dễ Nuốt Âm (> 165 WPM)", color: "text-amber-600 bg-amber-500/10 border-amber-500/30" };
    return { label: "Tốc Độ Tự Nhiên Chuẩn Bản Xứ (120 - 150 WPM)", color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/30" };
  };

  const speedCat = getSpeedCategory(wordsPerMinute);

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-foreground">
              Bản Đồ Sóng Âm & Khoảng Lặng Ngập Ngừng
            </h4>
            <span className="text-[10px] font-mono text-muted-foreground">
              Speech-to-Pause Visualizer & Tốc độ nói WPM
            </span>
          </div>
        </div>

        <span className={cn("text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border", speedCat.color)}>
          {speedCat.label}
        </span>
      </div>

      {/* WPM Gauge Metric */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-secondary/30 border border-border">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-primary" />
          <span className="text-xs font-bold text-foreground">
            Tốc độ phát âm trung bình:
          </span>
        </div>
        <span className="text-lg font-black font-mono text-primary">
          {wordsPerMinute} <span className="text-xs font-normal text-muted-foreground">WPM</span>
        </span>
      </div>

      {/* Waveform Timeline Container */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
          <span>00:00</span>
          <span>Timeline Bài Nói ({durationSeconds} Giây)</span>
          <span>00:{durationSeconds.toString().padStart(2, "0")}</span>
        </div>

        {/* Audio Waveform Canvas Simulated Track */}
        <div className="relative h-16 w-full rounded-2xl bg-secondary/40 border border-border overflow-hidden flex items-center px-2">
          {/* Waveform bars */}
          <div className="flex items-center justify-between w-full h-full gap-0.5">
            {Array.from({ length: 48 }).map((_, i) => {
              const currentSec = (i / 48) * durationSeconds;
              const isInsidePause = pauseIntervals.some(
                (p) => currentSec >= p.startTimeSec && currentSec <= p.endTimeSec
              );

              return (
                <div
                  key={i}
                  style={{
                    height: isInsidePause ? "10%" : `${Math.floor(Math.sin(i * 0.4) * 35 + 45)}%`,
                  }}
                  className={cn(
                    "w-full rounded-full transition-all duration-150",
                    isInsidePause ? "bg-rose-500/80" : "bg-primary/70"
                  )}
                />
              );
            })}
          </div>

          {/* Pause Flag Markers Overlaid */}
          {pauseIntervals.map((p, idx) => {
            const leftPct = (p.startTimeSec / durationSeconds) * 100;

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePauseId(p.id)}
                style={{ left: `${leftPct}%` }}
                className={cn(
                  "absolute top-1 -translate-x-1/2 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold transition-transform cursor-pointer shadow-xs",
                  activePauseId === p.id
                    ? "bg-rose-600 text-white scale-110 ring-2 ring-rose-400"
                    : "bg-rose-500/90 hover:bg-rose-600 text-white"
                )}
                title={p.reason}
              >
                ⚠️ {p.durationSec}s
              </button>
            );
          })}
        </div>
      </div>

      {/* List of Detected Long Pauses */}
      <div className="space-y-2 text-xs">
        <span className="font-mono font-bold text-[10px] text-muted-foreground uppercase block">
          Phát hiện {pauseIntervals.length} khoảng lặng ngập ngừng bất thường (&gt; 1.5s):
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {pauseIntervals.map((p, idx) => {
            const isSelected = activePauseId === p.id;

            return (
              <div
                key={p.id}
                onClick={() => setActivePauseId(p.id)}
                className={cn(
                  "p-3 rounded-xl border transition-all cursor-pointer space-y-1",
                  isSelected
                    ? "border-rose-500/60 bg-rose-500/[0.08]"
                    : "border-border bg-secondary/20 hover:bg-secondary/40"
                )}
              >
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-rose-600 dark:text-rose-400">
                    Khoảng lặng #{idx + 1} ({p.startTimeSec}s - {p.endTimeSec}s)
                  </span>
                  <span className="font-bold px-1.5 py-0.2 rounded bg-rose-500/15 text-rose-600">
                    {p.durationSec}s
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  {p.reason}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
