"use client";

import React, { useState } from "react";
import { SENSORY_PALETTE_ITEMS, SensoryDimension, SensoryAdjective } from "@/lib/memoryPalacePacer";

interface SensoryGridPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertWord: (adjective: SensoryAdjective) => void;
}

const DIMENSIONS: Array<{ id: SensoryDimension; label: string; icon: string; color: string; ringColor: string }> = [
  { id: 'sight', label: 'Thị Giác (Sight)', icon: '👁️', color: 'text-amber-300', ringColor: 'border-amber-500/40 bg-amber-950/30' },
  { id: 'sound', label: 'Thính Giác (Sound)', icon: '👂', color: 'text-cyan-300', ringColor: 'border-cyan-500/40 bg-cyan-950/30' },
  { id: 'touch', label: 'Xúc Giác (Touch)', icon: '✋', color: 'text-emerald-300', ringColor: 'border-emerald-500/40 bg-emerald-950/30' },
  { id: 'scent', label: 'Khứu/Vị Giác (Scent/Taste)', icon: '👃', color: 'text-rose-300', ringColor: 'border-rose-500/40 bg-rose-950/30' },
  { id: 'emotion', label: 'Cảm Xúc Nội Tâm (Emotion)', icon: '❤️', color: 'text-violet-300', ringColor: 'border-violet-500/40 bg-violet-950/30' }
];

export const SensoryGridPalette: React.FC<SensoryGridPaletteProps> = ({
  isOpen,
  onClose,
  onInsertWord
}) => {
  const [activeDimension, setActiveDimension] = useState<SensoryDimension>('sight');

  if (!isOpen) return null;

  const currentItems = SENSORY_PALETTE_ITEMS[activeDimension] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xl">
              🎨
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">
                Bảng Lưới 5 Giác Quan C1/C2 (5D Sensory Grid)
              </h3>
              <p className="text-xs text-slate-400">
                Nạp tính từ giác quan sống động vào Phòng 2 (The Sensory Gallery) để tránh bài nói khô khan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* 5-Dimension Tabs */}
        <div className="px-6 pt-4 flex gap-2 overflow-x-auto border-b border-slate-800 pb-3 scrollbar-none">
          {DIMENSIONS.map((dim) => {
            const isSelected = activeDimension === dim.id;
            return (
              <button
                key={dim.id}
                onClick={() => setActiveDimension(dim.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? `${dim.ringColor} text-white shadow-lg`
                    : 'bg-slate-800/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{dim.icon}</span>
                <span>{dim.label}</span>
              </button>
            );
          })}
        </div>

        {/* Adjectives Cards Grid */}
        <div className="p-6 overflow-y-auto space-y-3.5 flex-1">
          {currentItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-950/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white tracking-wide">
                    {item.word}
                  </span>
                  <span className="text-xs font-mono text-cyan-300/80">
                    {item.ipa}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {item.band}
                  </span>
                </div>
                <p className="text-xs font-medium text-amber-300/90">
                  {item.meaningVi}
                </p>
                <p className="text-xs text-slate-400 italic">
                  &ldquo;{item.example}&rdquo;
                </p>
              </div>

              <button
                onClick={() => {
                  onInsertWord(item);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-950/50 transition-all active:scale-95 whitespace-nowrap self-end sm:self-center"
              >
                + Chèn Vào Phòng 2
              </button>
            </div>
          ))}
        </div>

        {/* Modal Footer Note */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>💡 Lời khuyên khảo thí: Không liệt kê đơn thuần; hãy lồng ghép cảm xúc vào không gian.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
