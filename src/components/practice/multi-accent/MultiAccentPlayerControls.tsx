"use client";

import React from "react";
import {
  Play,
  Pause,
  Square,
  Repeat,
  FastForward,
  Volume2,
} from "lucide-react";

interface MultiAccentPlayerControlsProps {
  isPlaying: boolean;
  isLooping: boolean;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  onPlayFull: () => void;
  onStartLoop: () => void;
  onStop: () => void;
  currentPlayheadSec: number;
  totalDurationSec: number;
}

export const MultiAccentPlayerControls: React.FC<MultiAccentPlayerControlsProps> = ({
  isPlaying,
  isLooping,
  playbackSpeed,
  setPlaybackSpeed,
  onPlayFull,
  onStartLoop,
  onStop,
  currentPlayheadSec,
  totalDurationSec,
}) => {
  const speeds = [
    { label: "0.7x (Slow)", value: 0.7 },
    { label: "0.8x", value: 0.8 },
    { label: "0.9x", value: 0.9 },
    { label: "1.0x (Chuẩn)", value: 1.0 },
    { label: "1.1x (Thách thức)", value: 1.1 },
  ];

  const formatSec = (sec: number) => {
    const s = Math.floor(sec);
    const ms = Math.floor((sec % 1) * 10);
    return `${s < 10 ? "0" + s : s}.${ms}s`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl mb-6">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Playback Action Buttons */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-center sm:justify-start">
          <button
            onClick={onPlayFull}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg ${
              isPlaying && !isLooping
                ? "bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-amber-500/25"
                : "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/25"
            }`}
          >
            {isPlaying && !isLooping ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Tạm Dừng Hội Thoại</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Phát Toàn Bài Thoại</span>
              </>
            )}
          </button>

          <button
            onClick={onStartLoop}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all border ${
              isLooping
                ? "bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-500/30 animate-pulse"
                : "bg-slate-800 text-purple-300 border-purple-500/30 hover:bg-slate-700"
            }`}
          >
            <Repeat className="w-4 h-4" />
            <span>{isLooping ? "Đang Lặp [A - B]" : "Lặp Đoạn Bẫy [A - B]"}</span>
          </button>

          <button
            onClick={onStop}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Dừng âm thanh"
          >
            <Square className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Time Progress Display */}
        <div className="flex items-center gap-2 font-mono text-xs bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <span className="text-cyan-400 font-bold">{formatSec(currentPlayheadSec)}</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">{formatSec(totalDurationSec)}</span>
        </div>

        {/* Pitch-Preserving Time-Stretching Speed Selectors */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 mr-1">
            <FastForward className="w-3.5 h-3.5 text-cyan-400" />
            <span>DSP Speed:</span>
          </div>

          {speeds.map((sp) => (
            <button
              key={sp.value}
              onClick={() => setPlaybackSpeed(sp.value)}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                playbackSpeed === sp.value
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-mono font-bold"
                  : "bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/50"
              }`}
            >
              {sp.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
