"use client";

import React, { useRef, useEffect } from "react";
import { Activity, AlertTriangle, CheckCircle2, Volume2 } from "lucide-react";
import { PitchAnalysisResult } from "@/lib/pitchDetectionEngine";
import { cn } from "@/lib/utils";

interface TerminalPitchCanvasProps {
  pitchSamples: number[];
  currentPitch: number;
  isRecording: boolean;
  terminalAnalysis: PitchAnalysisResult | null;
  className?: string;
}

export function TerminalPitchCanvas({
  pitchSamples,
  currentPitch,
  isRecording,
  terminalAnalysis,
  className,
}: TerminalPitchCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw Background Grid
    ctx.strokeStyle = "rgba(128, 128, 128, 0.15)";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);

    const pitchLevels = [100, 150, 200, 250, 300];
    const minP = 70;
    const maxP = 350;

    pitchLevels.forEach((p) => {
      const y = height - ((p - minP) / (maxP - minP)) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();

      ctx.fillStyle = "rgba(128, 128, 128, 0.6)";
      ctx.font = "9px monospace";
      ctx.fillText(`${p}Hz`, 6, y - 2);
    });

    ctx.setLineDash([]);

    // Shaded Terminal Region (last 30% of canvas width)
    const terminalStartX = width * 0.7;
    ctx.fillStyle = "rgba(139, 92, 246, 0.05)";
    ctx.fillRect(terminalStartX, 0, width - terminalStartX, height);

    ctx.strokeStyle = "rgba(139, 92, 246, 0.3)";
    ctx.beginPath();
    ctx.moveTo(terminalStartX, 0);
    ctx.lineTo(terminalStartX, height);
    ctx.stroke();

    ctx.fillStyle = "rgba(139, 92, 246, 0.8)";
    ctx.font = "bold 9px monospace";
    ctx.fillText("VÙNG ĐUÔI CÂU (0.5s Cuối)", terminalStartX + 6, 14);

    if (pitchSamples.length < 2) {
      return;
    }

    // Draw Pitch Curve
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const step = width / Math.max(100, pitchSamples.length);

    for (let i = 1; i < pitchSamples.length; i++) {
      const p1 = pitchSamples[i - 1];
      const p2 = pitchSamples[i];

      if (p1 <= 0 || p2 <= 0) continue;

      const x1 = (i - 1) * step;
      const y1 = height - ((p1 - minP) / (maxP - minP)) * height;
      const x2 = i * step;
      const y2 = height - ((p2 - minP) / (maxP - minP)) * height;

      // In terminal zone, color differently if Uptalk is occurring
      const isInTerminal = x2 >= terminalStartX;
      if (isInTerminal && p2 > p1 + 4) {
        ctx.strokeStyle = "#f43f5e"; // Rose / Red for Uptalk
      } else if (isInTerminal && p2 < p1 - 2) {
        ctx.strokeStyle = "#10b981"; // Emerald for Falling Cadence
      } else {
        ctx.strokeStyle = "#06b6d4"; // Cyan for normal pitch
      }

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }, [pitchSamples]);

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 shadow-sm space-y-4 select-none",
        className
      )}
    >
      {/* Header & Digital Readout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-3">
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-xl",
              isRecording
                ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 animate-pulse"
                : "bg-secondary text-muted-foreground"
            )}
          >
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-foreground">
              Đồ Thị Cao Độ Giọng Nói (F0 Pitch & Anti-Uptalk Tracker)
            </h4>
            <span className="text-[10px] font-mono text-muted-foreground">
              Nhận diện trực quan ngữ điệu hạ giọng cuối câu khẳng định (↘)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-xs">
          <span className="px-2.5 py-1 rounded-xl bg-secondary border border-border font-bold text-foreground">
            F0: {currentPitch > 0 ? `${currentPitch} Hz` : "---"}
          </span>
        </div>
      </div>

      {/* Pitch Canvas */}
      <div className="relative rounded-2xl bg-secondary/20 border border-border/70 p-1 flex justify-center">
        <canvas
          ref={canvasRef}
          width={560}
          height={180}
          className="w-full max-w-xl h-auto rounded-xl"
        />
      </div>

      {/* Cadence Status Badge */}
      <div className="text-xs">
        {terminalAnalysis?.isUptalk ? (
          <div className="p-3 rounded-2xl bg-rose-500/[0.08] border border-rose-500/30 text-rose-700 dark:text-rose-400 flex items-center gap-2 animate-in fade-in">
            <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600" />
            <span className="font-semibold">
              {terminalAnalysis.messageVi}
            </span>
          </div>
        ) : terminalAnalysis?.isAuthoritative ? (
          <div className="p-3 rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span className="font-semibold">
              {terminalAnalysis.messageVi}
            </span>
          </div>
        ) : (
          <div className="p-2.5 rounded-xl bg-secondary/30 border border-border text-[11px] text-muted-foreground flex items-center gap-2">
            <Volume2 className="h-3.5 w-3.5 text-primary" />
            <span>
              Quy tắc hạ giọng: Hãy chủ động hạ tần số giọng nói xuống 100 - 120Hz ở 2 từ cuối cùng của câu khẳng định.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
