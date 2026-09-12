"use client";

import React, { useRef, useEffect } from "react";
import { Activity, Mic, Volume2, Sparkles, TrendingDown } from "lucide-react";
import { PitchDataPoint } from "@/hooks/usePitchTracker";
import { cn } from "@/lib/utils";

interface PitchIntonationVisualizerProps {
  isRecording: boolean;
  currentPitch: number;
  pitchHistory: PitchDataPoint[];
  uptalkCount: number;
  fallingCadenceCount: number;
  className?: string;
}

export function PitchIntonationVisualizer({
  isRecording,
  currentPitch,
  pitchHistory,
  uptalkCount,
  fallingCadenceCount,
  className,
}: PitchIntonationVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.clearRect(0, 0, width, height);

    // Draw reference grid lines (100Hz, 150Hz, 200Hz, 250Hz, 300Hz)
    const minPitch = 80;
    const maxPitch = 350;
    const pitchRange = maxPitch - minPitch;

    ctx.strokeStyle = "rgba(150, 150, 150, 0.1)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    [100, 150, 200, 250, 300].forEach((hz) => {
      const y = height - ((hz - minPitch) / pitchRange) * height;
      ctx.beginPath();
      ctx.moveTo(35, y);
      ctx.lineTo(width, y);
      ctx.stroke();

      ctx.fillStyle = "rgba(150, 150, 150, 0.5)";
      ctx.font = "9px monospace";
      ctx.fillText(`${hz}Hz`, 4, y + 3);
    });

    ctx.setLineDash([]); // Reset line dash

    if (pitchHistory.length < 2) return;

    // Draw pitch contour curve
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#6366f1"; // Indigo
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    const totalPoints = pitchHistory.length;
    const maxVisiblePoints = 120;
    const pointsToRender = pitchHistory.slice(-maxVisiblePoints);

    pointsToRender.forEach((dp, idx) => {
      const x = 40 + (idx / (maxVisiblePoints - 1)) * (width - 50);
      const clampedPitch = Math.max(minPitch, Math.min(maxPitch, dp.pitch));
      const y = height - ((clampedPitch - minPitch) / pitchRange) * height;

      if (idx === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw uptalk warning dots on the curve
    pointsToRender.forEach((dp, idx) => {
      if (dp.isUptalk) {
        const x = 40 + (idx / (maxVisiblePoints - 1)) * (width - 50);
        const clampedPitch = Math.max(minPitch, Math.min(maxPitch, dp.pitch));
        const y = height - ((clampedPitch - minPitch) / pitchRange) * height;

        ctx.fillStyle = "#ef4444"; // Red
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    });
  }, [pitchHistory]);

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-sm space-y-3 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/70 pb-2.5">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-indigo-500" />
          <h4 className="text-xs sm:text-sm font-bold text-foreground">
            Phân Tích Đường Cong Cao Độ & Ngữ Điệu (Pitch Contour Visualizer)
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border",
              isRecording
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 animate-pulse"
                : "bg-secondary text-muted-foreground border-border"
            )}
          >
            {isRecording ? `Live: ${currentPitch > 0 ? `${currentPitch} Hz` : "Voicing..."}` : "Chưa kích hoạt mic"}
          </span>
        </div>
      </div>

      {/* Canvas Visualizer */}
      <div className="relative w-full h-[150px] bg-secondary/30 rounded-2xl border border-border/80 overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={600}
          height={150}
          className="w-full h-full object-cover"
        />

        {!isRecording && pitchHistory.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-xs text-muted-foreground space-y-1">
            <Mic className="h-6 w-6 text-muted-foreground/50 animate-bounce" />
            <span>Bấm 'Bắt đầu nói' bên dưới để theo dõi ngữ điệu trực tiếp</span>
          </div>
        )}
      </div>

      {/* Intonation Metrics & Guide */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/20 flex items-center justify-between">
          <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
            <TrendingDown className="h-3.5 w-3.5 text-emerald-600" />
            <span>Hạ giọng chuẩn (Falling):</span>
          </span>
          <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">
            {fallingCadenceCount} lần
          </strong>
        </div>

        <div className="p-2.5 rounded-xl bg-rose-500/[0.05] border border-rose-500/20 flex items-center justify-between">
          <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
            <Activity className="h-3.5 w-3.5 text-rose-600" />
            <span>Lỗi Uptalk (Lên giọng):</span>
          </span>
          <strong className="text-rose-600 dark:text-rose-400 font-mono font-bold">
            {uptalkCount} lần
          </strong>
        </div>
      </div>
    </div>
  );
}
