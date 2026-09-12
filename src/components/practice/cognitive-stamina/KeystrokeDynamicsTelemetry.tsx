'use client';

import React from 'react';
import { CognitiveTelemetryMetrics } from '@/lib/keystrokeDynamicsEngine';
import { Activity, Keyboard, AlertTriangle, Timer, Delete } from 'lucide-react';

interface KeystrokeDynamicsTelemetryProps {
  telemetry: CognitiveTelemetryMetrics;
}

export const KeystrokeDynamicsTelemetry: React.FC<KeystrokeDynamicsTelemetryProps> = ({ telemetry }) => {
  const backspaceRatio =
    telemetry.totalKeystrokes > 0
      ? Math.round((telemetry.backspaceCount / telemetry.totalKeystrokes) * 100)
      : 0;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Keyboard className="w-5 h-5 text-indigo-400" />
          Keystroke Dynamics Telemetry (Đo Chuyển Động Gõ Phím)
        </h3>
        <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full">
          LIVE FEED
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Mean Flight Time */}
        <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Flight Time</span>
          <div className="text-xl font-bold text-indigo-400 font-mono">
            {telemetry.meanFlightTimeMs} <span className="text-xs text-slate-500">ms</span>
          </div>
          <span className="text-[10px] text-slate-500">Độ trễ chuyển ngón</span>
        </div>

        {/* Backspace Count & Ratio */}
        <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Backspace Ratio</span>
          <div className={`text-xl font-bold font-mono ${backspaceRatio > 25 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {backspaceRatio}%
          </div>
          <span className="text-[10px] text-slate-500">{telemetry.backspaceCount} lần xóa sửa</span>
        </div>

        {/* Pauses > 3.0s */}
        <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Cognitive Pauses</span>
          <div className="text-xl font-bold text-amber-400 font-mono">
            {telemetry.prolongedPauseCount}
          </div>
          <span className="text-[10px] text-slate-500">Khoảng dừng &gt; 3.0s</span>
        </div>

        {/* Typing Speed WPM */}
        <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Typing Velocity</span>
          <div className="text-xl font-bold text-emerald-400 font-mono">
            {telemetry.currentWpm} <span className="text-xs text-slate-500">WPM</span>
          </div>
          <span className="text-[10px] text-slate-500">Tốc độ tuôn trào ý tưởng</span>
        </div>
      </div>
    </div>
  );
};
