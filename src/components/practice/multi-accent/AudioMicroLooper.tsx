"use client";

import React, { useRef, useEffect } from "react";
import { ForensicTrapSegment } from "@/data/mockMultiAccentAudioData";
import {
  Repeat,
  Sparkles,
  Sliders,
  Scissors,
  Activity,
} from "lucide-react";

interface AudioMicroLooperProps {
  waveformPeaks: number[];
  loopStartSec: number;
  loopEndSec: number;
  onUpdateLoopPoints: (start: number, end: number) => void;
  currentPlayheadSec: number;
  totalDurationSec: number;
  isLooping: boolean;
  onToggleLoop: () => void;
  traps: ForensicTrapSegment[];
  activeTrapIndex: number;
  onSelectTrap: (idx: number) => void;
}

export const AudioMicroLooper: React.FC<AudioMicroLooperProps> = ({
  waveformPeaks,
  loopStartSec,
  loopEndSec,
  onUpdateLoopPoints,
  currentPlayheadSec,
  totalDurationSec,
  isLooping,
  onToggleLoop,
  traps,
  activeTrapIndex,
  onSelectTrap,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render Waveform Canvas with A-B loop slice and Playhead
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, "#090d16");
    bgGrad.addColorStop(1, "#0f172a");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    const safeDuration = totalDurationSec || 16;
    const startX = (loopStartSec / safeDuration) * width;
    const endX = (loopEndSec / safeDuration) * width;

    // 1. Shaded A-B Loop Region
    ctx.fillStyle = "rgba(168, 85, 247, 0.18)";
    ctx.fillRect(startX, 0, endX - startX, height);

    // A-B border strokes
    ctx.strokeStyle = "#a855f7";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, 0);
    ctx.lineTo(startX, height);
    ctx.moveTo(endX, 0);
    ctx.lineTo(endX, height);
    ctx.stroke();

    // 2. Draw Waveform Peaks
    const numBars = waveformPeaks.length || 100;
    const barWidth = (width / numBars) * 0.75;
    const gap = (width / numBars) * 0.25;

    for (let i = 0; i < numBars; i++) {
      const peak = waveformPeaks[i] || 0.3;
      const barHeight = peak * (height * 0.85);
      const x = i * (barWidth + gap);
      const y = (height - barHeight) / 2;

      const isInsideLoop = x >= startX && x <= endX;

      if (isInsideLoop) {
        ctx.fillStyle = "#38bdf8"; // Neon Cyan for active loop segment
      } else {
        ctx.fillStyle = "#334155"; // Muted Slate for outer audio
      }

      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, 2);
      ctx.fill();
    }

    // 3. Draw Live Playhead Line
    const playheadX = (currentPlayheadSec / safeDuration) * width;
    ctx.strokeStyle = "#f59e0b"; // Amber playhead
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(playheadX, 0);
    ctx.lineTo(playheadX, height);
    ctx.stroke();

    // Playhead Glow Top Pin
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.arc(playheadX, 6, 5, 0, Math.PI * 2);
    ctx.fill();
  }, [waveformPeaks, loopStartSec, loopEndSec, currentPlayheadSec, totalDurationSec]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl mb-6">
      {/* Header & Trap Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-100 flex items-center gap-2">
              <span>Bộ Mổ Xẻ m Thanh Bẫy Vi Mô (Audio Micro-Looper)</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 font-mono">
                DSP Waveform Slicer
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Cô lập phân đoạn âm thanh 2 - 4 giây chứa bẫy để lặp vô tận và giải phẫu ngữ âm.
            </p>
          </div>
        </div>

        {/* Preset Trap Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] text-slate-400 font-semibold uppercase">Điểm Bẫy:</span>
          {traps.map((trap, idx) => (
            <button
              key={trap.id}
              onClick={() => onSelectTrap(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                idx === activeTrapIndex
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <Scissors className="w-3 h-3 text-purple-300" />
              <span>Bẫy {idx + 1}: {trap.title.split(" (")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Waveform Canvas */}
      <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 mb-4">
        <canvas
          ref={canvasRef}
          width={800}
          height={140}
          className="w-full h-36 block cursor-pointer"
        />

        {/* Floating Badges for A and B Marker Timestamps */}
        <div className="absolute top-2 left-3 flex items-center gap-2 font-mono text-[10px] bg-slate-900/90 px-2.5 py-1 rounded-lg border border-purple-500/40 text-purple-300">
          <span className="font-bold text-purple-400">A (Start):</span>
          <span>{loopStartSec.toFixed(1)}s</span>
        </div>

        <div className="absolute top-2 right-3 flex items-center gap-2 font-mono text-[10px] bg-slate-900/90 px-2.5 py-1 rounded-lg border border-purple-500/40 text-purple-300">
          <span className="font-bold text-purple-400">B (End):</span>
          <span>{loopEndSec.toFixed(1)}s</span>
        </div>
      </div>

      {/* Manual Fine-Tuning Sliders for A and B */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
            <span className="flex items-center gap-1 font-semibold text-purple-400">
              <Sliders className="w-3.5 h-3.5" />
              Điểm Bắt Đầu [A]:
            </span>
            <span className="font-mono text-purple-300 font-bold">{loopStartSec.toFixed(1)}s</span>
          </div>
          <input
            type="range"
            min="0"
            max={Math.max(0, loopEndSec - 0.5)}
            step="0.1"
            value={loopStartSec}
            onChange={(e) => onUpdateLoopPoints(Number(e.target.value), loopEndSec)}
            className="w-full accent-purple-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
            <span className="flex items-center gap-1 font-semibold text-cyan-400">
              <Sliders className="w-3.5 h-3.5" />
              Điểm Kết Thúc [B]:
            </span>
            <span className="font-mono text-cyan-300 font-bold">{loopEndSec.toFixed(1)}s</span>
          </div>
          <input
            type="range"
            min={loopStartSec + 0.5}
            max={totalDurationSec || 16}
            step="0.1"
            value={loopEndSec}
            onChange={(e) => onUpdateLoopPoints(loopStartSec, Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
