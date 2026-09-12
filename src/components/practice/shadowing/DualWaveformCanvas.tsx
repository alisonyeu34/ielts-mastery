"use client";

import React, { useRef, useEffect } from "react";
import { Headphones, Mic, Volume2, Sparkles, AlertTriangle } from "lucide-react";
import { SyncGap } from "@/lib/waveformComparison";
import { cn } from "@/lib/utils";

interface DualWaveformCanvasProps {
  nativeRMS: number[];
  learnerRMS: number[];
  syncGaps?: SyncGap[];
  playbackProgressPercent: number; // 0 - 100
  isPlaying: boolean;
  onScrub?: (percent: number) => void;
  className?: string;
}

export function DualWaveformCanvas({
  nativeRMS,
  learnerRMS,
  syncGaps = [],
  playbackProgressPercent,
  isPlaying,
  onScrub,
  className,
}: DualWaveformCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const midY = height / 2;

    // Clear background with dark academic tint
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#0d090b";
    ctx.fillRect(0, 0, width, height);

    // Draw Grid Lines & Center Divider
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;

    // Horizontal Center Line
    ctx.beginPath();
    ctx.moveTo(0, midY);
    ctx.lineTo(width, midY);
    ctx.stroke();

    // Out-of-sync red warning regions on lower canvas
    syncGaps.forEach((gap) => {
      const startX = (gap.startPercent / 100) * width;
      const endX = (gap.endPercent / 100) * width;
      const gapWidth = Math.max(12, endX - startX);

      ctx.fillStyle = "rgba(225, 29, 72, 0.18)";
      ctx.fillRect(startX, midY, gapWidth, midY);

      // Warning hatched stripes
      ctx.strokeStyle = "rgba(225, 29, 72, 0.45)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(startX, midY);
      ctx.lineTo(startX + gapWidth, height);
      ctx.stroke();
    });

    const pointsCount = Math.max(nativeRMS.length, 60);
    const barWidth = width / pointsCount;

    // 1. Draw Native Waveform (Upper Track: Academic Red / Crimson)
    for (let i = 0; i < nativeRMS.length; i++) {
      const val = nativeRMS[i] || 0.05;
      const barHeight = val * (midY - 14);
      const x = i * barWidth;
      const y = midY - barHeight;

      const grad = ctx.createLinearGradient(0, y, 0, midY);
      grad.addColorStop(0, "#fb7185"); // Rose 400
      grad.addColorStop(1, "#b91c1c"); // Red 700

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x + 1, y, Math.max(1.5, barWidth - 2), barHeight, [2, 2, 0, 0]);
      ctx.fill();
    }

    // 2. Draw Learner Waveform (Lower Track: Warm Amber / Gold)
    const hasLearner = learnerRMS.length > 0;
    if (hasLearner) {
      for (let i = 0; i < learnerRMS.length; i++) {
        const val = learnerRMS[i] || 0.05;
        const barHeight = val * (midY - 14);
        const x = i * barWidth;
        const y = midY;

        const grad = ctx.createLinearGradient(0, midY, 0, midY + barHeight);
        grad.addColorStop(0, "#fbbf24"); // Amber 400
        grad.addColorStop(1, "#d97706"); // Amber 600

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x + 1, y, Math.max(1.5, barWidth - 2), barHeight, [0, 0, 2, 2]);
        ctx.fill();
      }
    } else {
      // Empty placeholder line for learner
      ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Nhấn nút Thu Âm Shadowing để thu giọng & đối chiếu sóng âm của bạn", width / 2, midY + 45);
    }

    // 3. Draw Synchronized Playhead Cursor Line
    if (playbackProgressPercent > 0) {
      const playheadX = (playbackProgressPercent / 100) * width;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "#f43f5e";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(playheadX, 0);
      ctx.lineTo(playheadX, height);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }, [nativeRMS, learnerRMS, syncGaps, playbackProgressPercent]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onScrub || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    onScrub(percent);
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-3 select-none",
        className
      )}
    >
      {/* Top Labels Bar */}
      <div className="flex items-center justify-between text-xs border-b border-border/70 pb-3">
        <div className="flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400">
          <Headphones className="h-4 w-4" />
          <span>Sóng Âm Chuẩn Bản Xứ (Native Reference)</span>
        </div>

        <div className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400">
          <Mic className="h-4 w-4" />
          <span>Sóng Âm Bạn Thu Âm (Learner Echo)</span>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative rounded-2xl overflow-hidden border border-border/80 cursor-pointer shadow-inner">
        <canvas
          ref={canvasRef}
          width={800}
          height={200}
          onClick={handleCanvasClick}
          className="w-full h-44 sm:h-52 block"
        />

        {/* Dynamic Sync Gaps Tooltip if any */}
        {syncGaps.length > 0 && learnerRMS.length > 0 && (
          <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-rose-950/90 border border-rose-500/40 text-rose-300 text-[10px] font-mono flex items-center gap-1 backdrop-blur-xs">
            <AlertTriangle className="h-3 w-3" />
            <span>Phát hiện {syncGaps.length} điểm lệch nhịp / nuốt âm</span>
          </div>
        )}
      </div>

      {/* Footer Instructions */}
      <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
        <span>Bấm vào thanh sóng âm để đối chiếu</span>
        <span>{playbackProgressPercent.toFixed(0)}% hoàn thành</span>
      </div>
    </div>
  );
}
