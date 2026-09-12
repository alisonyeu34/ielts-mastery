'use client';

import React from 'react';
import { VocalChantItem } from '@/data/mockExamDayWarmupKit';
import { Mic, Volume2, ArrowDownRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface VocalApparatusWarmupProps {
  chants: VocalChantItem[];
  selectedChantIndex: number;
  onSelectChantIndex: (index: number) => void;
}

export const VocalApparatusWarmup: React.FC<VocalApparatusWarmupProps> = ({
  chants,
  selectedChantIndex,
  onSelectChantIndex
}) => {
  const currentChant = chants[selectedChantIndex] || chants[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-rose-500/10 rounded-xl text-rose-400">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Khởi Động Khẩu Hình & Khóa Ngữ Điệu Hạ Giọng</h3>
            <p className="text-xs text-slate-400">Đọc to các câu Academic Chants để loại bỏ hoàn toàn tật lên giọng Uptalk</p>
          </div>
        </div>
      </div>

      {/* Chant Selector */}
      <div className="flex flex-wrap gap-2">
        {chants.map((ch, idx) => (
          <button
            key={ch.id}
            type="button"
            onClick={() => onSelectChantIndex(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              idx === selectedChantIndex
                ? 'bg-rose-950/40 border-rose-500/60 text-rose-300 shadow-sm'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Mẫu #{idx + 1}: {ch.intonationPattern.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Current Chant Card */}
      <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Mẫu câu đọc to (Academic Chant):</span>
            <span className="text-rose-400 font-bold">{currentChant.rhythmBeatCount} Nhịp Trọng Âm</span>
          </div>
          <p className="text-sm sm:text-base font-bold text-white leading-relaxed font-sans">
            {currentChant.text}
          </p>
          <p className="text-xs text-slate-400 font-mono">
            {currentChant.ipa}
          </p>
        </div>

        {/* Intonation Pattern & Purpose */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold uppercase text-amber-400 flex items-center gap-1">
              <ArrowDownRight className="w-3.5 h-3.5" />
              Sơ Đồ Ngữ Điệu Khảo Thí:
            </span>
            <p className="text-slate-300 font-medium">
              {currentChant.intonationNotation}
            </p>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold uppercase text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Tác Dụng Trước Giờ Thi:
            </span>
            <p className="text-slate-300">
              {currentChant.purposeVi}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
