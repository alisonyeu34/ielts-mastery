"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AudioWaveformProps {
  frequencyData: Uint8Array;
  isRecording: boolean;
  isPaused: boolean;
  className?: string;
}

export function AudioWaveform({
  frequencyData,
  isRecording,
  isPaused,
  className,
}: AudioWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const barCount = 36;
      const barWidth = Math.max(3, (width - barCount * 3) / barCount);
      const step = Math.floor(frequencyData.length / barCount);

      for (let i = 0; i < barCount; i++) {
        let value = isRecording && !isPaused ? frequencyData[i * step] || 10 : 8;

        // Add gentle pulse if idle/recording
        if (value < 10) {
          value = 10 + Math.sin(Date.now() / 200 + i) * 4;
        }

        const barHeight = Math.min(height - 6, (value / 255) * (height - 8));
        const x = i * (barWidth + 3) + 6;
        const y = (height - barHeight) / 2;

        // Gradient color for each bar
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        if (isRecording && !isPaused) {
          gradient.addColorStop(0, "#6366f1"); // Indigo
          gradient.addColorStop(0.5, "#a855f7"); // Purple
          gradient.addColorStop(1, "#10b981"); // Emerald
        } else if (isPaused) {
          gradient.addColorStop(0, "#f59e0b");
          gradient.addColorStop(1, "#fbbf24");
        } else {
          gradient.addColorStop(0, "#64748b");
          gradient.addColorStop(1, "#94a3b8");
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, Math.max(4, barHeight), [3, 3, 3, 3]);
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [frequencyData, isRecording, isPaused]);

  return (
    <div className={cn("relative w-full rounded-2xl bg-secondary/30 p-2.5 border border-border/60 overflow-hidden flex items-center justify-center", className)}>
      <canvas
        ref={canvasRef}
        width={480}
        height={70}
        className="w-full h-[65px] block"
      />

      {/* Floating status tag */}
      <div className="absolute top-2 right-3">
        {isRecording && !isPaused && (
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />
            Live Waveform (60 FPS)
          </span>
        )}
        {isPaused && (
          <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
            Tạm dừng
          </span>
        )}
      </div>
    </div>
  );
}
