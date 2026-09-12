"use client";

import React from "react";
import { Mic, Square, Play, RotateCcw, Volume2, AlertTriangle, Sparkles } from "lucide-react";

interface PitchAudioRecorderControlsProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onPlayNativeModel: () => void;
  onSimulateUptalk: () => void;
  isPlayingNativeModel: boolean;
  isSimulatingUptalk: boolean;
}

export const PitchAudioRecorderControls: React.FC<PitchAudioRecorderControlsProps> = ({
  isRecording,
  onStartRecording,
  onStopRecording,
  onPlayNativeModel,
  onSimulateUptalk,
  isPlayingNativeModel,
  isSimulatingUptalk
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
      {/* Microphone Record Button */}
      <div className="flex items-center gap-3">
        {isRecording ? (
          <button
            type="button"
            onClick={onStopRecording}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-all shadow-lg shadow-rose-500/20 flex items-center gap-2 animate-pulse"
          >
            <Square className="w-4 h-4 fill-white" />
            <span>Dừng Thu Âm &amp; Phân Tích Pitch</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onStartRecording}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-lg shadow-purple-500/20 flex items-center gap-2"
          >
            <Mic className="w-4 h-4" />
            <span>Bắt Đầu Thu Âm (Live Web Audio)</span>
          </button>
        )}

        <span className="text-xs text-slate-400">
          {isRecording ? "Đang theo dõi cao độ thời gian thực..." : "Yêu cầu quyền micro"}
        </span>
      </div>

      {/* Simulation / Model Playback Controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPlayNativeModel}
          disabled={isPlayingNativeModel || isRecording}
          className={`px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 ${
            isPlayingNativeModel
              ? "bg-cyan-950/80 border-cyan-500 text-cyan-300 ring-1 ring-cyan-500 animate-pulse"
              : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-cyan-500 hover:bg-slate-900"
          }`}
        >
          <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
          <span>Nghe Mẫu Bản Xứ (RP Fall)</span>
        </button>

        <button
          type="button"
          onClick={onSimulateUptalk}
          disabled={isSimulatingUptalk || isRecording}
          className={`px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 ${
            isSimulatingUptalk
              ? "bg-rose-950/80 border-rose-500 text-rose-300 ring-1 ring-rose-500 animate-pulse"
              : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-rose-500 hover:bg-slate-900 hover:text-rose-300"
          }`}
          title="Mô phỏng đường pitch bị lỗi lên giọng đuôi câu"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          <span>Mô Phỏng Lỗi Uptalk (+35Hz)</span>
        </button>
      </div>
    </div>
  );
};
