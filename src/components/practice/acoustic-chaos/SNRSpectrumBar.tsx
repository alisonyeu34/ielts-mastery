'use client';

import React from 'react';
import { Radio, AlertTriangle, ShieldCheck, Flame } from 'lucide-react';

interface SNRSpectrumBarProps {
  snrDb: number;
  onUpdateSNR: (snr: number) => void;
}

export const SNRSpectrumBar: React.FC<SNRSpectrumBarProps> = ({ snrDb, onUpdateSNR }) => {
  const getSNRMeta = (snr: number) => {
    if (snr >= 15) {
      return {
        labelVi: 'Môi Trường Tiêu Chuẩn (Standard Exam Center)',
        colorText: 'text-emerald-400',
        badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        descVi: 'Tạp âm nền nhẹ, tiếng gõ phím rải rác. Thí sinh nghe rõ 95% âm vị.'
      };
    }
    if (snr >= 10) {
      return {
        labelVi: 'Môi Trường Huyên Náo (Restless Test Room)',
        colorText: 'text-blue-400',
        badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
        descVi: 'Tiếng gõ phím bắt đầu dồn dập, tiếng ho hắng ngắt quãng gây phân tâm.'
      };
    }
    if (snr >= 6) {
      return {
        labelVi: 'Áp Lực Nhiễu Loạn Nặng (High Acoustic Stress)',
        colorText: 'text-amber-400',
        badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        descVi: 'Tạp âm che lấp các âm đuôi (-s/-ed) và từ nối yếu. Cần tập trung cao độ.'
      };
    }
    return {
      labelVi: 'Thảm Họa m Học Cực Hạn (Sensory Overload)',
      colorText: 'text-rose-400',
      badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse',
      descVi: 'Tiếng ồn lấn át bài nghe (3-5dB). Chỉ thí sinh có bản lĩnh thính giác Band 8.5+ mới bám sát được transcript.'
    };
  };

  const meta = getSNRMeta(snrDb);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Radio className="w-5 h-5 text-indigo-400" />
          Signal-to-Noise Ratio (Thước Đo Tỷ Số Tín Hiệu Trên Nhiễu SNR)
        </h3>
        <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${meta.badgeClass}`}>
          SNR: {snrDb} dB
        </span>
      </div>

      <div className="space-y-3">
        {/* Slider */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>3dB (Cực Hạn)</span>
            <span className={`font-bold font-mono text-sm ${meta.colorText}`}>{snrDb} dB</span>
            <span>18dB (Êm Ả)</span>
          </div>
          <input
            type="range"
            min="3"
            max="18"
            step="1"
            value={snrDb}
            onChange={(e) => onUpdateSNR(parseInt(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
        </div>

        {/* Status description */}
        <div className="p-3.5 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-1 text-xs">
          <div className={`font-bold ${meta.colorText}`}>
            {meta.labelVi}
          </div>
          <p className="text-slate-300 leading-relaxed">
            {meta.descVi}
          </p>
        </div>
      </div>
    </div>
  );
};
