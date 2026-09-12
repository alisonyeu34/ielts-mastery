"use client";

import React from "react";
import { Gauge, Zap, AlertCircle } from "lucide-react";

interface LiveWPMPacerGaugeProps {
  currentWpm: number;
  syllablesPerSec: number;
  isRecording: boolean;
}

export const LiveWPMPacerGauge: React.FC<LiveWPMPacerGaugeProps> = ({
  currentWpm,
  syllablesPerSec,
  isRecording,
}) => {
  // Speed status evaluation
  let statusColor = "text-emerald-400";
  let statusBg = "bg-emerald-500/20 border-emerald-500/40";
  let statusText = "Tốc độ nói chuẩn học thuật (Optimal Flow: 110 - 140 WPM)";

  if (currentWpm < 95 && isRecording) {
    statusColor = "text-amber-400";
    statusBg = "bg-amber-500/20 border-amber-500/40";
    statusText = "Nói hơi chậm / Có khoảng ngập ngừng kéo dài (< 95 WPM)";
  } else if (currentWpm > 160 && isRecording) {
    statusColor = "text-rose-400";
    statusBg = "bg-rose-500/20 border-rose-500/40";
    statusText = "Nói quá nhanh - Nguy cơ nuốt âm và thiếu tự nhiên (> 160 WPM)";
  }

  // Dial rotation angle (-90deg to +90deg for 0 to 240 WPM)
  const clampedWpm = Math.min(220, Math.max(0, currentWpm));
  const rotationDeg = -90 + (clampedWpm / 220) * 180;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl mb-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-100 flex items-center gap-2">
              <span>Đồng Hồ Đo Nhịp Độ Phát Biểu Thời Gian Thực (Live Speech Rate Pacer)</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Đo tốc độ nói WPM và tần số âm tiết/giây để giữ nhịp độ tự nhiên chuẩn Band 7.5+.
            </p>
          </div>
        </div>

        {isRecording && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse">
            <Zap className="w-3 h-3" />
            LIVE SPEECH TRACKING
          </div>
        )}
      </div>

      {/* Speedometer Gauge Body */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-950 p-5 rounded-xl border border-slate-800">
        {/* Semi-Circle Dial Visual */}
        <div className="relative w-44 h-24 flex items-end justify-center overflow-hidden">
          {/* Outer Arc track */}
          <div className="absolute top-0 w-44 h-44 rounded-full border-[10px] border-slate-800 border-b-transparent border-l-amber-500/40 border-t-emerald-500 border-r-rose-500/40" />

          {/* Needle Pointer */}
          <div
            className="absolute bottom-0 w-1.5 h-20 bg-cyan-400 rounded-full origin-bottom shadow-lg transition-transform duration-300 ease-out"
            style={{ transform: `rotate(${rotationDeg}deg)` }}
          />

          {/* Center Hub Pin */}
          <div className="w-5 h-5 rounded-full bg-cyan-300 border-2 border-slate-950 z-10 shadow" />
        </div>

        {/* Live Numbers Display */}
        <div className="flex-1 grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400 font-semibold uppercase mb-1">
              Tốc Độ Nói (WPM):
            </div>
            <div className="text-3xl font-black text-cyan-400 font-mono">
              {currentWpm} <span className="text-xs text-slate-500 font-normal">wpm</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Chuẩn: 110 - 140</div>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400 font-semibold uppercase mb-1">
              Tần Số m Tiết (Syllables):
            </div>
            <div className="text-3xl font-black text-purple-400 font-mono">
              {syllablesPerSec} <span className="text-xs text-slate-500 font-normal">âm/s</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Chuẩn: 3.5 - 4.5</div>
          </div>
        </div>
      </div>

      {/* Real-time Status Banner */}
      <div className={`mt-3.5 p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${statusBg} ${statusColor}`}>
        <AlertCircle className="w-4 h-4 shrink-0" />
        <span>{statusText}</span>
      </div>
    </div>
  );
};
