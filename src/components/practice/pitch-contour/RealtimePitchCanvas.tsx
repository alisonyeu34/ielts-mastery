"use client";

import React, { useRef, useEffect } from "react";
import { PitchDataPoint } from "@/lib/pitchTrackerEngine";

interface RealtimePitchCanvasProps {
  userTimeline: PitchDataPoint[];
  nativeTimeline: PitchDataPoint[];
  durationSec: number;
  isUptalk: boolean;
  isCadenceMastered: boolean;
}

export const RealtimePitchCanvas: React.FC<RealtimePitchCanvasProps> = ({
  userTimeline,
  nativeTimeline,
  durationSec,
  isUptalk,
  isCadenceMastered
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.fillStyle = "#020617"; // slate-950
    ctx.fillRect(0, 0, width, height);

    // Draw Gridlines (Hz levels: 100Hz, 150Hz, 200Hz, 250Hz, 300Hz)
    const minHz = 80;
    const maxHz = 320;

    const getX = (t: number) => (t / durationSec) * (width - 80) + 50;
    const getY = (hz: number) => height - 30 - ((hz - minHz) / (maxHz - minHz)) * (height - 60);

    ctx.strokeStyle = "#1e293b"; // slate-800
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);

    [100, 150, 200, 250, 300].forEach((hz) => {
      const y = getY(hz);
      ctx.beginPath();
      ctx.moveTo(50, y);
      ctx.lineTo(width - 20, y);
      ctx.stroke();

      ctx.fillStyle = "#64748b"; // slate-500
      ctx.font = "10px monospace";
      ctx.fillText(`${hz}Hz`, 10, y + 3);
    });

    // Time Axis
    ctx.setLineDash([]);
    ctx.strokeStyle = "#334155";
    ctx.beginPath();
    ctx.moveTo(50, height - 30);
    ctx.lineTo(width - 20, height - 30);
    ctx.stroke();

    for (let t = 0; t <= durationSec; t += 1) {
      const x = getX(t);
      ctx.fillStyle = "#64748b";
      ctx.font = "10px monospace";
      ctx.fillText(`${t}s`, x - 6, height - 12);
    }

    // 1. Draw Native Model Pitch Curve (Cyan / Blue Dashed)
    if (nativeTimeline.length > 1) {
      ctx.strokeStyle = "#06b6d4"; // cyan-500
      ctx.lineWidth = 3;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();

      let started = false;
      nativeTimeline.forEach((p) => {
        if (p.pitchHz > 60) {
          const x = getX(p.timeSec);
          const y = getY(p.pitchHz);
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 2. Draw User Realtime Pitch Curve (Purple / Pink / Red if Uptalk / Emerald if Cadence)
    if (userTimeline.length > 1) {
      let lineColor = "#a855f7"; // purple-500 default
      if (isUptalk) {
        lineColor = "#f43f5e"; // rose-500
      } else if (isCadenceMastered) {
        lineColor = "#10b981"; // emerald-500
      }

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();

      let started = false;
      userTimeline.forEach((p) => {
        if (p.pitchHz > 60) {
          const x = getX(p.timeSec);
          const y = getY(p.pitchHz);
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }
      });
      ctx.stroke();

      // Draw point markers
      userTimeline.forEach((p, idx) => {
        if (p.pitchHz > 60 && idx % 2 === 0) {
          const x = getX(p.timeSec);
          const y = getY(p.pitchHz);
          ctx.fillStyle = lineColor;
          ctx.beginPath();
          ctx.arc(x, y, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }
  }, [userTimeline, nativeTimeline, durationSec, isUptalk, isCadenceMastered]);

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <h3 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
            Đường Bao Cao Độ F0 Thời Gian Thực (Fundamental Frequency Canvas)
          </h3>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-cyan-400 border-dashed inline-block" />
            <span className="text-slate-300">Giám Khảo Bản Xứ (RP Examiner)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className={`w-3 h-1.5 rounded-full inline-block ${
                isUptalk
                  ? "bg-rose-500"
                  : isCadenceMastered
                  ? "bg-emerald-500"
                  : "bg-purple-500"
              }`}
            />
            <span className="text-slate-300">Giọng Của Bạn (Your Voice)</span>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
        <canvas
          ref={canvasRef}
          width={700}
          height={240}
          className="w-full h-auto block"
        />
      </div>
    </div>
  );
};
