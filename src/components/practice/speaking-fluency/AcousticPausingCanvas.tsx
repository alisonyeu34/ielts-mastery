"use client";

import React, { useRef, useEffect, useState } from "react";
import { AcousticPauseInterval } from "@/lib/acousticFluencyAnalyzer";
import {
  AudioWaveform,
  CheckCircle2,
  AlertTriangle,
  Play,
  Layers,
  Sparkles,
} from "lucide-react";

interface AcousticPausingCanvasProps {
  volumeTimeline: Array<{ timeSec: number; volume: number }>;
  pauses: AcousticPauseInterval[];
  totalTimeSec: number;
}

export const AcousticPausingCanvas: React.FC<AcousticPausingCanvasProps> = ({
  volumeTimeline,
  pauses,
  totalTimeSec,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedPause, setSelectedPause] = useState<AcousticPauseInterval | null>(null);

  // Render Waveform Canvas with colored pause bands
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Canvas dark background
    ctx.fillStyle = "#090d16";
    ctx.fillRect(0, 0, width, height);

    const safeDuration = Math.max(1, totalTimeSec);

    // 1. Draw Pause Colored Regions
    pauses.forEach((pause) => {
      const xStart = (pause.startSec / safeDuration) * width;
      const xEnd = (pause.endSec / safeDuration) * width;
      const bandWidth = Math.max(2, xEnd - xStart);

      if (pause.pauseType === "content_pause") {
        ctx.fillStyle = "rgba(56, 189, 248, 0.25)"; // Cyan/Blue for Content Pause
      } else {
        ctx.fillStyle = "rgba(244, 63, 94, 0.35)"; // Red for Lexical Hesitation
      }
      ctx.fillRect(xStart, 0, bandWidth, height);
    });

    // 2. Draw Waveform Bars
    const totalPoints = volumeTimeline.length;
    if (totalPoints > 0) {
      const barWidth = Math.max(1.5, width / totalPoints);

      volumeTimeline.forEach((point, idx) => {
        const x = (point.timeSec / safeDuration) * width;
        const normVol = Math.min(1.0, point.volume * 3.8);
        const barHeight = normVol * (height * 0.85);
        const y = (height - barHeight) / 2;

        const isInsideLexical = pauses.some(
          (p) =>
            p.pauseType === "lexical_hesitation" &&
            point.timeSec >= p.startSec &&
            point.timeSec <= p.endSec
        );

        if (isInsideLexical) {
          ctx.fillStyle = "#f43f5e";
        } else if (normVol > 0.15) {
          ctx.fillStyle = "#a855f7"; // Speech Purple
        } else {
          ctx.fillStyle = "#38bdf8"; // Content Pause Cyan
        }

        ctx.fillRect(x, y, barWidth, Math.max(2, barHeight));
      });
    }
  }, [volumeTimeline, pauses, totalTimeSec]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <AudioWaveform className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-100 flex items-center gap-2">
              <span>Biểu Đồ Giải Phẫu Khoảng Lặng m Thanh (Acoustic Pausing Spectrogram)</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Phân biệt giữa <strong>Ngắt Nhịp Ý Nghĩa (Xanh dương)</strong> và <strong>Ngập Ngừng Tìm Từ (Đỏ)</strong>.
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5 text-cyan-300">
            <span className="w-3 h-3 rounded bg-cyan-500/40 border border-cyan-400" />
            <span>Content Pause (Học Thuật)</span>
          </div>
          <div className="flex items-center gap-1.5 text-rose-300">
            <span className="w-3 h-3 rounded bg-rose-500/40 border border-rose-400" />
            <span>Lexical Hesitation (Ngập Ngừng)</span>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 mb-4">
        <canvas
          ref={canvasRef}
          width={800}
          height={140}
          className="w-full h-36 block cursor-pointer"
        />
      </div>

      {/* Pauses Inspector List */}
      <div className="space-y-2">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Chi Tiết Các Điểm Dừng ({pauses.length} điểm dừng &gt; 400ms):
        </div>

        {pauses.length === 0 ? (
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-500 text-center">
            Chưa phát hiện khoảng lặng nào. Hãy bắt đầu thu âm bài nói!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto custom-scrollbar pr-1">
            {pauses.map((p) => {
              const isLexical = p.pauseType === "lexical_hesitation";
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPause(p)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isLexical
                      ? "bg-rose-950/20 border-rose-500/30 hover:border-rose-500/60"
                      : "bg-cyan-950/20 border-cyan-500/30 hover:border-cyan-500/60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono ${
                        isLexical
                          ? "bg-rose-500/20 text-rose-300"
                          : "bg-cyan-500/20 text-cyan-300"
                      }`}
                    >
                      {p.durationSec}s [{p.startSec}s &rarr; {p.endSec}s]
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      {isLexical ? "Ngập Ngừng Tìm Từ" : "Ngắt Nghỉ Học Thuật"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed truncate">
                    {p.advice}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
