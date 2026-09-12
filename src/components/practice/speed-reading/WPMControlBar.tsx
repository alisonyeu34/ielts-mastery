"use client";

import React from "react";
import { SpeedReadingMode } from "@/hooks/useSpeedReadingSession";
import {
  Play,
  Pause,
  RotateCcw,
  Gauge,
  Eye,
  Radar,
  Network,
  Timer,
  Zap,
  CheckCircle2,
} from "lucide-react";

interface WPMControlBarProps {
  mode: SpeedReadingMode;
  setMode: (mode: SpeedReadingMode) => void;
  wpm: number;
  setWpm: (wpm: number) => void;
  isPacingActive: boolean;
  togglePacing: () => void;
  resetPacing: () => void;
  isSkimmingActive: boolean;
  skimSecondsRemaining: number;
  startSkimming: () => void;
  stopSkimming: () => void;
  onOpenQuiz: () => void;
}

export const WPMControlBar: React.FC<WPMControlBarProps> = ({
  mode,
  setMode,
  wpm,
  setWpm,
  isPacingActive,
  togglePacing,
  resetPacing,
  isSkimmingActive,
  skimSecondsRemaining,
  startSkimming,
  stopSkimming,
  onOpenQuiz,
}) => {
  const wpmPresets = [
    { label: "200 (Band 5.5)", value: 200 },
    { label: "260 (Band 7.0)", value: 260 },
    { label: "320 (Band 8.0)", value: 320 },
    { label: "380 (Rapid Skim)", value: 380 },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl mb-6">
      {/* 1. Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
          <button
            onClick={() => setMode("pacer")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              mode === "pacer"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Pacer Fixation (Nhịp Mắt)</span>
          </button>

          <button
            onClick={() => setMode("skim")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              mode === "skim"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Timer className="w-4 h-4" />
            <span>90s Skimming (Khung Bài)</span>
          </button>

          <button
            onClick={() => setMode("scan")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              mode === "scan"
                ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Radar className="w-4 h-4" />
            <span>Scanning Radar (Định Vị)</span>
          </button>

          <button
            onClick={() => setMode("paraphrase")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              mode === "paraphrase"
                ? "bg-purple-500 text-white shadow-md shadow-purple-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Network className="w-4 h-4" />
            <span>Paraphrase Matrix (2 Chiều)</span>
          </button>
        </div>

        {/* Action button to test comprehension directly */}
        <button
          onClick={onOpenQuiz}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 transition-colors"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Kiểm Tra Đọc Hiểu (Quiz)</span>
        </button>
      </div>

      {/* 2. Contextual Mode Controllers */}
      <div className="pt-4">
        {mode === "pacer" && (
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Play/Pause/Reset Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePacing}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg ${
                  isPacingActive
                    ? "bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-amber-500/25"
                    : "bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-emerald-500/25"
                }`}
              >
                {isPacingActive ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Tạm Dừng Pacer</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Bắt Đầu Quét Mắt</span>
                  </>
                )}
              </button>

              <button
                onClick={resetPacing}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Về đầu bài đọc"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* WPM Slider & Gauge */}
            <div className="flex-1 w-full max-w-xl flex items-center gap-4 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-2 text-amber-400">
                <Gauge className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Tốc Độ:</span>
              </div>

              <input
                type="range"
                min="180"
                max="420"
                step="10"
                value={wpm}
                onChange={(e) => setWpm(Number(e.target.value))}
                className="flex-1 accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />

              <div className="flex items-center gap-1.5 min-w-[90px] justify-end">
                <span className="text-xl font-extrabold text-amber-400 font-mono">{wpm}</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">WPM</span>
              </div>
            </div>

            {/* WPM Preset Quick Buttons */}
            <div className="flex items-center gap-1.5">
              {wpmPresets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setWpm(preset.value)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                    wpm === preset.value
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                      : "bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/50"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {mode === "skim" && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-cyan-950/30 border border-cyan-500/20 p-3.5 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                <Timer className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-cyan-200">
                  Chế Độ 90-Second Structural Mapping (Lập Bản Đồ Cấu Trúc)
                </h4>
                <p className="text-xs text-slate-400">
                  Hệ thống tự động làm mờ chi tiết, chỉ nổi bật câu chủ đề & từ nối để nắm trọn ý toàn bài trong 90s.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-2 rounded-xl border border-cyan-500/40">
                <span className="text-xs text-slate-400 font-medium">Thời gian:</span>
                <span
                  className={`text-lg font-mono font-bold ${
                    skimSecondsRemaining <= 15 ? "text-rose-400 animate-pulse" : "text-cyan-400"
                  }`}
                >
                  {skimSecondsRemaining}s
                </span>
              </div>

              {isSkimmingActive ? (
                <button
                  onClick={stopSkimming}
                  className="px-4 py-2 bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold rounded-xl text-xs transition-colors"
                >
                  Dừng Skim
                </button>
              ) : (
                <button
                  onClick={startSkimming}
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
                >
                  <Zap className="w-4 h-4" />
                  <span>Bắt Đầu 90s Skim</span>
                </button>
              )}
            </div>
          </div>
        )}

        {mode === "scan" && (
          <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                <Radar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-emerald-300">
                  Targeted Radar Drill: Săn Tìm Từ Khóa Cứng & Mềm
                </h4>
                <p className="text-[11px] text-slate-400">
                  Chọn mục tiêu ở bảng bên dưới và click trực tiếp vào vị trí từ khóa trong bài đọc để đo tốc độ phản xạ mắt.
                </p>
              </div>
            </div>
          </div>
        )}

        {mode === "paraphrase" && (
          <div className="p-3 bg-purple-950/20 border border-purple-500/20 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/30">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-purple-300">
                  Ma Trận Lập Cặp Từ Đồng Nghĩa 2 Chiều (Interactive 2-Way Paraphrase)
                </h4>
                <p className="text-[11px] text-slate-400">
                  Click chọn cụm từ trong câu hỏi bên trái và click cụm từ tương ứng trong bài đọc bên phải để vẽ dây nối SVG.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
