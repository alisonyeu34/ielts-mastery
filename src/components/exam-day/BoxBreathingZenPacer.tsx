'use client';

import React from 'react';
import { Wind, Play, Pause, RotateCcw, Heart, Sparkles } from 'lucide-react';

interface BoxBreathingZenPacerProps {
  isActive: boolean;
  phase: 'inhale' | 'hold_in' | 'exhale' | 'hold_out';
  countdown: number;
  completedCycles: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export const BoxBreathingZenPacer: React.FC<BoxBreathingZenPacerProps> = ({
  isActive,
  phase,
  countdown,
  completedCycles,
  onStart,
  onPause,
  onReset
}) => {
  const getPhaseMeta = (p: BoxBreathingZenPacerProps['phase']) => {
    switch (p) {
      case 'inhale':
        return {
          labelVi: 'HÍT VÀO S U (4s)',
          descVi: 'Hít qua mũi, căng phồng cơ hoành nạp oxy tươi cho não bộ.',
          colorText: 'text-sky-400',
          ringScale: 'scale-125'
        };
      case 'hold_in':
        return {
          labelVi: 'GIỮ HƠI (4s)',
          descVi: 'Thả lỏng hai vai, giữ yên oxy trong lồng ngực.',
          colorText: 'text-indigo-400',
          ringScale: 'scale-125'
        };
      case 'exhale':
        return {
          labelVi: 'THỞ RA CHẬM (4s)',
          descVi: 'Thở từ từ qua miệng, giải tỏa mọi cortisol căng thẳng.',
          colorText: 'text-amber-400',
          ringScale: 'scale-90'
        };
      case 'hold_out':
        return {
          labelVi: 'GIỮ RỖNG (4s)',
          descVi: 'Tĩnh tại tâm trí, ổn định nhịp tim về mức tối ưu 60-70 BPM.',
          colorText: 'text-emerald-400',
          ringScale: 'scale-90'
        };
    }
  };

  const meta = getPhaseMeta(phase);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Box Breathing 4-4-4-4 Zen Pacer</h3>
            <p className="text-xs text-slate-400">Ổn định nhịp tim và tái nạp oxy cho bộ nhớ làm việc trước giờ G</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isActive ? (
            <button
              type="button"
              onClick={onPause}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Pause className="w-3.5 h-3.5" />
              Tạm Dừng
            </button>
          ) : (
            <button
              type="button"
              onClick={onStart}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              Bắt Đầu Thở
            </button>
          )}

          <button
            type="button"
            onClick={onReset}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl text-xs transition-colors cursor-pointer"
            title="Thiết lập lại"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Visual Breathing Ring */}
      <div className="flex flex-col items-center justify-center py-4 space-y-4">
        <div className="relative w-44 h-44 flex items-center justify-center">
          {/* Animated Glow Halo */}
          <div
            className={`absolute inset-0 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 transition-transform duration-1000 ease-in-out ${
              isActive ? meta.ringScale : 'scale-100'
            }`}
          />
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-black text-white font-mono">{countdown}s</span>
            <span className={`text-[11px] font-bold tracking-wider uppercase mt-1 ${meta.colorText}`}>
              {meta.labelVi}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-400 text-center max-w-sm">
          {meta.descVi}
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-950 rounded-full border border-slate-800 text-xs text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Chu kỳ hoàn tất: <strong className="text-emerald-400 font-mono">{completedCycles}</strong></span>
        </div>
      </div>
    </div>
  );
};
