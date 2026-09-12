'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Wind, CheckCircle2, X } from 'lucide-react';

interface MicroResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const MicroResetModal: React.FC<MicroResetModalProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');

  useEffect(() => {
    if (!isOpen) {
      setSecondsRemaining(30);
      setBreathingPhase('inhale');
      return;
    }

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, onComplete]);

  // Box Breathing 4-4-4-4 cycle (16s cycle)
  useEffect(() => {
    if (!isOpen) return;

    const cycleSec = (30 - secondsRemaining) % 16;
    if (cycleSec < 4) {
      setBreathingPhase('inhale');
    } else if (cycleSec < 8) {
      setBreathingPhase('hold1');
    } else if (cycleSec < 12) {
      setBreathingPhase('exhale');
    } else {
      setBreathingPhase('hold2');
    }
  }, [secondsRemaining, isOpen]);

  if (!isOpen) return null;

  const phaseInstruction = {
    inhale: { label: 'HÍT VÀO SÂU QUA MŨI', sub: 'Mở rộng lồng ngực (4 giây)', scale: 'scale-125', color: 'border-emerald-400 text-emerald-300' },
    hold1: { label: 'GIỮ HƠI TRONG PHỔI', sub: 'Cung cấp oxy lên vỏ não trước trán (4 giây)', scale: 'scale-125', color: 'border-blue-400 text-blue-300' },
    exhale: { label: 'THỞ RA TỪ TỪ QUA MIỆNG', sub: 'Giải phóng cortisol & căng cơ (4 giây)', scale: 'scale-90', color: 'border-purple-400 text-purple-300' },
    hold2: { label: 'GIỮ RỖNG LỒNG NGỰC', sub: 'Tái lập sự tĩnh lặng thần kinh (4 giây)', scale: 'scale-90', color: 'border-amber-400 text-amber-300' }
  }[breathingPhase];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 text-center">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase">
            <Wind className="w-4 h-4" />
            <span>Giao Thức Phục Hồi Nhận Thức 30 Giây (Box Breathing)</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Animated Pulsing Breathing Circle */}
        <div className="py-6 flex flex-col items-center justify-center">
          <div
            className={`w-44 h-44 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-1000 shadow-2xl ${phaseInstruction.scale} ${phaseInstruction.color} bg-slate-950/80`}
          >
            <span className="text-3xl font-black font-mono">{secondsRemaining}s</span>
            <span className="text-[11px] font-bold mt-1 tracking-wider">{phaseInstruction.label}</span>
          </div>
          <p className="text-xs text-slate-400 mt-4 font-medium">{phaseInstruction.sub}</p>
        </div>

        {/* Biological Benefits Bullet points */}
        <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
          <div className="font-semibold text-emerald-400 flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tác động sinh lý học thần kinh:</span>
          </div>
          <p>
            Kích hoạt hệ thần kinh phó giao cảm (Parasympathetic), hạ nhịp tim từ 95 bpm xuống 72 bpm, tái nạp năng lượng cho bộ nhớ làm việc (Working Memory).
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            onComplete();
            onClose();
          }}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg transition-all"
        >
          Tôi Đã Hồi Phục Oxy • Quay Lại Viết Bài
        </button>
      </div>
    </div>
  );
};
