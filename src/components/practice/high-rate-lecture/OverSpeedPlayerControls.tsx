"use client";

import React from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Gauge,
  Zap,
  Sparkles
} from "lucide-react";
import {
  PlaybackRateTier,
  PLAYBACK_RATE_TIERS,
  LectureScenario
} from "@/lib/timeStretchingDSP";

interface OverSpeedPlayerControlsProps {
  scenario: LectureScenario;
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentTimeSec: number;
  onSeek: (seconds: number) => void;
  playbackRate: PlaybackRateTier;
  onChangeRate: (rate: PlaybackRateTier) => void;
}

export const OverSpeedPlayerControls: React.FC<OverSpeedPlayerControlsProps> = ({
  scenario,
  isPlaying,
  onTogglePlay,
  currentTimeSec,
  onSeek,
  playbackRate,
  onChangeRate
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const rates: PlaybackRateTier[] = [1.0, 1.15, 1.25, 1.35];
  const activeRateConfig = PLAYBACK_RATE_TIERS[playbackRate];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Title & Topic Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-full bg-indigo-950 border border-indigo-700/50 text-indigo-300">
              Section 4 Academic Lecture
            </span>
            <span className="text-xs font-semibold text-slate-400">
              {scenario.academicDiscipline}
            </span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            {scenario.title}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Diễn giả: <strong>{scenario.professorName}</strong> ({scenario.speakerAccent})
          </p>
        </div>

        {/* Live Audio Status */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className={`w-2.5 h-2.5 rounded-full ${isPlaying ? "bg-emerald-400 animate-ping" : "bg-slate-500"}`} />
          <span className="text-xs font-semibold text-slate-300">
            {isPlaying ? `Đang phát (${playbackRate}x)` : "Tạm dừng"}
          </span>
        </div>
      </div>

      {/* 4 Over-Speed Tier Selector */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-indigo-400" />
            Máy Nén Tốc Độ Quá Tải Nhận Thức (Over-Speed DSP):
          </span>
          <span className="text-xs font-mono font-bold text-cyan-400">
            {activeRateConfig.wpm} WPM
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {rates.map((rate) => {
            const config = PLAYBACK_RATE_TIERS[rate];
            const isActive = playbackRate === rate;

            return (
              <button
                key={rate}
                onClick={() => onChangeRate(rate)}
                className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isActive
                    ? "bg-indigo-950/80 border-indigo-500 ring-2 ring-indigo-500/50 shadow-md text-white"
                    : "bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs">{rate}x</span>
                  <span className="text-[10px] font-mono text-slate-400">{config.wpm} WPM</span>
                </div>
                <span className="text-[10px] text-slate-300 line-clamp-1 mt-1 font-medium">
                  {config.label.split(" (")[1]?.replace(")", "") || ""}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Audio Timeline Player Controls */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex items-center gap-4">
        <button
          onClick={onTogglePlay}
          className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/30 transition-transform active:scale-95"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>

        <button
          onClick={() => onSeek(0)}
          className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
          title="Restart Audio"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={scenario.durationSec}
            value={currentTimeSec}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
            <span>{formatTime(currentTimeSec)}</span>
            <span>{formatTime(scenario.durationSec)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
