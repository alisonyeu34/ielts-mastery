"use client";

import React from "react";
import { CognitiveReadingMode } from "@/hooks/useCognitiveReadingSession";
import {
  Play,
  Pause,
  RotateCcw,
  Gauge,
  EyeOff,
  FastForward,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";

interface CognitiveFlowControllerProps {
  mode: CognitiveReadingMode;
  setMode: (m: CognitiveReadingMode) => void;
  wpm: number;
  setWpm: (w: number) => void;
  isReadingActive: boolean;
  onToggleReading: () => void;
  onResetReading: () => void;
  onOpenSummary: () => void;
}

export const CognitiveFlowController: React.FC<CognitiveFlowControllerProps> = ({
  mode,
  setMode,
  wpm,
  setWpm,
  isReadingActive,
  onToggleReading,
  onResetReading,
  onOpenSummary,
}) => {
  const speeds = [
    { label: "200 WPM (Cơ Bản)", value: 200 },
    { label: "260 WPM (Tăng Tốc)", value: 260 },
    { label: "320 WPM (Bứt Phá C1)", value: 320 },
    { label: "380 WPM (Extreme)", value: 380 },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl mb-6">
      {/* 1. Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            onClick={() => setMode("vanishing")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              mode === "vanishing"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <EyeOff className="w-4 h-4" />
            <span>Chế Độ Văn Bản Biến Mất (Vanishing Text)</span>
          </button>

          <button
            onClick={() => setMode("rsvp")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              mode === "rsvp"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <FastForward className="w-4 h-4" />
            <span>Bộ Nén Thị Giác RSVP (Multi-Word RSVP)</span>
          </button>
        </div>

        <button
          onClick={onOpenSummary}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition-colors"
        >
          Xem Báo Cáo ERR
        </button>
      </div>

      {/* 2. Control Toolbar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Play/Pause/Reset Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleReading}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg ${
              isReadingActive
                ? "bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-amber-500/25"
                : "bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-emerald-500/25"
            }`}
          >
            {isReadingActive ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Tạm Dừng Dòng Chảy</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Bắt Đầu Đọc Ép Tiến</span>
              </>
            )}
          </button>

          <button
            onClick={onResetReading}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Đọc lại từ đầu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* WPM Speed Presets */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold mr-1">
            <Gauge className="w-4 h-4" />
            <span>Tốc Độ Pacing:</span>
          </div>

          {speeds.map((s) => (
            <button
              key={s.value}
              onClick={() => setWpm(s.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                wpm === s.value
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 font-mono font-bold"
                  : "bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
