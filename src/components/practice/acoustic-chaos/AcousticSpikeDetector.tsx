'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, AlertTriangle, Zap, Activity } from 'lucide-react';

interface AcousticSpikeDetectorProps {
  lastSpikeEvent: { type: string; timestamp: number } | null;
  onTriggerSpike: (type: 'loud_cough' | 'dropped_pen' | 'chair_screech') => void;
  isPlaying: boolean;
}

export const AcousticSpikeDetector: React.FC<AcousticSpikeDetectorProps> = ({
  lastSpikeEvent,
  onTriggerSpike,
  isPlaying
}) => {
  const [activeSpikeName, setActiveSpikeName] = useState<string | null>(null);
  const [spikeIntensity, setSpikeIntensity] = useState<number>(0);

  useEffect(() => {
    if (!lastSpikeEvent) return;

    const names: Record<string, string> = {
      loud_cough: 'Tiếng Ho Đột Ngột Của Thí Sinh Bên Cạnh (+14dB)',
      dropped_pen: 'Tiếng Bút Bi Rơi Lăn Trên Sàn Gỗ (+11dB)',
      chair_screech: 'Tiếng Chân Ghế Kim Loại Kéo Rít (+18dB)'
    };

    setActiveSpikeName(names[lastSpikeEvent.type] || 'Tạp m Đột Biến Phòng Thi');
    setSpikeIntensity(100);

    const decayInterval = setInterval(() => {
      setSpikeIntensity((prev) => {
        if (prev <= 10) {
          clearInterval(decayInterval);
          setActiveSpikeName(null);
          return 0;
        }
        return prev - 15;
      });
    }, 150);

    return () => clearInterval(decayInterval);
  }, [lastSpikeEvent]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Acoustic Spike & Startle Inoculation</h3>
            <p className="text-xs text-slate-400">Giả lập xung kích âm thanh đột ngột kiểm tra phản xạ thính giác</p>
          </div>
        </div>
        {activeSpikeName ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/40 rounded-full text-xs font-semibold animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
            SPIKE DETECTED!
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-medium">
            <Activity className="w-3.5 h-3.5" />
            Baseline Audio Normal
          </span>
        )}
      </div>

      {/* Visual Shockwave / Spike Bar */}
      <div className="relative h-14 bg-slate-950 rounded-xl border border-slate-800 p-3 overflow-hidden flex items-center justify-between mb-4">
        {/* Animated Ripple if spike occurs */}
        {spikeIntensity > 0 && (
          <div
            className="absolute inset-0 bg-gradient-to-r from-red-600/30 via-amber-500/20 to-transparent transition-opacity duration-300 pointer-events-none"
            style={{ opacity: spikeIntensity / 100 }}
          />
        )}

        <div className="relative z-10 flex items-center gap-3">
          <Volume2 className={`w-5 h-5 ${spikeIntensity > 0 ? 'text-red-400 animate-bounce' : 'text-slate-500'}`} />
          <div>
            <p className="text-xs font-medium text-slate-300">
              {activeSpikeName || 'Không có xung kích âm thanh cực đoan'}
            </p>
            <p className="text-[11px] text-slate-500">
              {activeSpikeName
                ? `Cường độ xung kích: ${spikeIntensity}% - Hãy duy trì tập trung vào từ khóa bài thi!`
                : 'Môi trường âm thanh đang ở trạng thái giả lập ổn định.'}
            </p>
          </div>
        </div>

        {/* Level meter bar */}
        <div className="relative z-10 flex items-center gap-1">
          {[...Array(12)].map((_, i) => {
            const threshold = (i + 1) * 8.3;
            const isLit = spikeIntensity >= threshold;
            const colorClass =
              i > 9
                ? isLit ? 'bg-red-500 shadow-sm shadow-red-500' : 'bg-slate-800'
                : i > 6
                ? isLit ? 'bg-amber-400' : 'bg-slate-800'
                : isLit ? 'bg-emerald-400' : 'bg-slate-800';

            return (
              <div
                key={i}
                className={`w-1.5 h-6 rounded-sm transition-all duration-150 ${colorClass}`}
              />
            );
          })}
        </div>
      </div>

      {/* Quick Manual Spike Trigger Buttons */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          Kích hoạt thử nghiệm xung âm thanh chủ động:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            disabled={!isPlaying}
            onClick={() => onTriggerSpike('loud_cough')}
            className="px-3 py-2 bg-slate-800/80 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700 hover:border-amber-500/50 rounded-lg text-xs font-medium text-slate-200 transition-all text-left flex items-center gap-2 group"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
            <span>Tiếng Ho Đột Ngột</span>
          </button>

          <button
            type="button"
            disabled={!isPlaying}
            onClick={() => onTriggerSpike('dropped_pen')}
            className="px-3 py-2 bg-slate-800/80 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700 hover:border-sky-500/50 rounded-lg text-xs font-medium text-slate-200 transition-all text-left flex items-center gap-2 group"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400 group-hover:scale-125 transition-transform" />
            <span>Rơi Bút Cạnh Bàn</span>
          </button>

          <button
            type="button"
            disabled={!isPlaying}
            onClick={() => onTriggerSpike('chair_screech')}
            className="px-3 py-2 bg-slate-800/80 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700 hover:border-red-500/50 rounded-lg text-xs font-medium text-slate-200 transition-all text-left flex items-center gap-2 group"
          >
            <span className="w-2 h-2 rounded-full bg-red-400 group-hover:scale-125 transition-transform" />
            <span>Ghế Kéo Rít Phòng</span>
          </button>
        </div>
      </div>
    </div>
  );
};
