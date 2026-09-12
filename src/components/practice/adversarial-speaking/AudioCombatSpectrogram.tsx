'use client';

import React from 'react';
import { Activity, Radio } from 'lucide-react';

interface AudioCombatSpectrogramProps {
  frequencyData: Uint8Array;
  micVolume: number;
  isMicActive: boolean;
}

export const AudioCombatSpectrogram: React.FC<AudioCombatSpectrogramProps> = ({
  frequencyData,
  micVolume,
  isMicActive
}) => {
  const bars = Array.from(frequencyData.slice(0, 32));

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-xl backdrop-blur-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
          <Activity className="w-4 h-4 text-indigo-400" />
          <span>Acoustic Combat Spectrogram (Phổ Tần Số Âm Lượng Thực)</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isMicActive ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'
            }`}
          />
          <span className="text-[11px] font-mono text-slate-400">
            {isMicActive ? `LIVE: ${micVolume}%` : 'STANDBY'}
          </span>
        </div>
      </div>

      {/* Bar visualizer */}
      <div className="h-16 flex items-end justify-between gap-1 p-3 bg-slate-950/80 rounded-2xl border border-slate-800/80 overflow-hidden">
        {bars.map((val, idx) => {
          const heightPercent = Math.max(8, Math.min(100, (val / 255) * 100));
          return (
            <div
              key={idx}
              className="flex-1 bg-gradient-to-t from-indigo-600 via-purple-500 to-emerald-400 rounded-t-sm transition-all duration-75"
              style={{ height: `${heightPercent}%` }}
            />
          );
        })}
      </div>
    </div>
  );
};
