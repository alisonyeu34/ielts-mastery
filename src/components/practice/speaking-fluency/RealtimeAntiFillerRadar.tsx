"use client";

import React from "react";
import { FillerWordEvent, COMMON_FILLER_WORDS } from "@/lib/acousticFluencyAnalyzer";
import {
  Radar,
  Volume2,
  VolumeX,
  AlertTriangle,
  Sparkles,
  ShieldAlert,
} from "lucide-react";

interface RealtimeAntiFillerRadarProps {
  detectedFillers: FillerWordEvent[];
  isFillerWarningActive: boolean;
  isAudioCueEnabled: boolean;
  setIsAudioCueEnabled: (enabled: boolean) => void;
  recordingSeconds: number;
}

export const RealtimeAntiFillerRadar: React.FC<RealtimeAntiFillerRadarProps> = ({
  detectedFillers,
  isFillerWarningActive,
  isAudioCueEnabled,
  setIsAudioCueEnabled,
  recordingSeconds,
}) => {
  const totalCount = detectedFillers.length;
  const minutes = Math.max(0.1, recordingSeconds / 60);
  const fillerRate = (totalCount / minutes).toFixed(1);

  // Frequency per filler word
  const fillerCountsMap: Record<string, number> = {};
  detectedFillers.forEach((f) => {
    const w = f.word.toLowerCase();
    fillerCountsMap[w] = (fillerCountsMap[w] || 0) + 1;
  });

  return (
    <div
      className={`bg-slate-900 border rounded-2xl p-6 shadow-2xl mb-6 transition-all duration-300 ${
        isFillerWarningActive
          ? "border-amber-500 ring-2 ring-amber-400/50 bg-amber-950/20"
          : "border-slate-800"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Radar className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-100 flex items-center gap-2">
              <span>Radar Bắt Từ Đệm Rác Thời Gian Thực (Anti-Filler Radar)</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-mono">
                Keyword Spotting
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Tự động bắt các từ đệm <em>um, uh, like, you know</em> và rèn luyện phản xạ im lặng (Silent Pause).
            </p>
          </div>
        </div>

        {/* Audio Cue Toggle */}
        <button
          onClick={() => setIsAudioCueEnabled(!isAudioCueEnabled)}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 ${
            isAudioCueEnabled
              ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
              : "bg-slate-800 text-slate-400 border-slate-700"
          }`}
        >
          {isAudioCueEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <span>m Báo Bíp: BẬT</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span>m Báo Bíp: TẮT</span>
            </>
          )}
        </button>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">Tổng Số Từ Đệm Đã Bắt:</span>
          <span className="text-2xl font-black text-amber-400 font-mono">
            {totalCount} <span className="text-xs text-slate-500">từ</span>
          </span>
        </div>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">Tần Suất Trung Bình (Mục tiêu &lt; 1):</span>
          <span
            className={`text-2xl font-black font-mono ${
              Number(fillerRate) <= 1.0 ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {fillerRate} <span className="text-xs text-slate-500">từ/phút</span>
          </span>
        </div>
      </div>

      {/* Monitored Filler Word Chips */}
      <div className="space-y-2">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Danh Sách Từ Đệm Đang Theo Dõi:
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {COMMON_FILLER_WORDS.slice(0, 8).map((filler) => {
            const count = fillerCountsMap[filler] || 0;
            return (
              <div
                key={`chip_${filler}`}
                className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                  count > 0
                    ? "bg-amber-950/40 border-amber-500/60 text-amber-200 font-bold"
                    : "bg-slate-950/60 border-slate-800 text-slate-400"
                }`}
              >
                <span className="text-xs font-mono">"{filler}"</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    count > 0
                      ? "bg-amber-500 text-slate-950"
                      : "bg-slate-800 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
