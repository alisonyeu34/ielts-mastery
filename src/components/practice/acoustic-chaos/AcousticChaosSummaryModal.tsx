'use client';

import React from 'react';
import {
  CheckCircle,
  Database,
  Award,
  Radio,
  ArrowRight,
  RotateCcw,
  X,
  Volume2,
  ShieldCheck
} from 'lucide-react';
import { NoiseImmunityIndexGauge } from './NoiseImmunityIndexGauge';

interface AcousticChaosSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  trackTitle: string;
  snrDb: number;
  scorePercentage: number;
  noiseImmunityIndex: number;
  autoInoculation: boolean;
}

export const AcousticChaosSummaryModal: React.FC<AcousticChaosSummaryModalProps> = ({
  isOpen,
  onClose,
  onRetry,
  trackTitle,
  snrDb,
  scorePercentage,
  noiseImmunityIndex,
  autoInoculation
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-indigo-500/10 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[11px] font-bold uppercase tracking-wider">
                  Tập Huấn Miễn Dịch Thính Giác Hoàn Tất
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">
                Báo Cáo Tác Chiến Nhiễu Loạn m Thanh (Step 98)
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Track info banner */}
        <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Volume2 className="w-4 h-4 text-sky-400" />
            <span>{trackTitle}</span>
          </div>
          <span className="font-mono text-slate-400">
            SNR: <strong className="text-amber-400">{snrDb}dB</strong>{' '}
            {autoInoculation && '(Tự động hạ bậc SNR)'}
          </span>
        </div>

        {/* Noise Immunity Gauge */}
        <NoiseImmunityIndexGauge
          nii={noiseImmunityIndex}
          snrDb={snrDb}
          scorePercentage={scorePercentage}
        />

        {/* Key takeaways */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Chiến thuật duy trì điểm Band 7.5 - 8.5+ trong phòng thi thực tế:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
              <strong className="text-sky-400 block mb-1">Kỹ thuật Shadow-Echoing:</strong>
              Khi gặp tiếng ồn đột biến, lập tức lặp lại thầm trong đầu 3 từ vừa nghe để giữ buffer bộ nhớ ngắn hạn không bị xóa bởi tiếng ho/tiếng gõ phím.
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
              <strong className="text-amber-400 block mb-1">Khóa Nhịp Trọng m:</strong>
              Tiếng ù thông gió HVAC triệt tiêu các phụ âm nhỏ nhưng không xóa được trọng âm chính của từ học thuật C1/C2.
            </div>
          </div>
        </div>

        {/* Dexie sync indicator */}
        <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/20 rounded-xl flex items-center justify-between text-xs text-emerald-400">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            <span>Dữ liệu đã tự động đồng bộ vào Dexie `practice_logs` & `error_bank`.</span>
          </div>
          <CheckCircle className="w-4 h-4" />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onRetry}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl text-xs flex items-center gap-2 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Luyện Lại Bài Này
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
          >
            Tiếp Tục Lộ Trình
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
