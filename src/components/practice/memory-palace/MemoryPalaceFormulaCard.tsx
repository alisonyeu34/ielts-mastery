"use client";

import React, { useState } from "react";
import { TRANSITION_FORMULAS } from "@/lib/memoryPalacePacer";

interface MemoryPalaceFormulaCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const ALL_FORMULAS = [
  {
    title: 'Công Thức Khởi Đầu Phòng 1 (Genesis / Past Anchor)',
    formula: 'To trace the genesis of this encounter, I must cast my mind back to [Time / Setting], when I was confronted with...',
    purpose: 'Định vị mốc thời gian quá khứ ngay trong 5 giây đầu tiên mà không dùng mẫu câu nhàm chán "I would like to talk about".',
    band: 'Band 8.5+'
  },
  ...TRANSITION_FORMULAS.map((tf) => ({
    title: `Chuyển Tiếp: ${tf.fromRoom} ➔ ${tf.toRoom}`,
    formula: tf.formula,
    purpose: tf.function,
    band: 'Band 8.0+'
  })),
  {
    title: 'Công Thức Đúc Kết Phòng 4 (Balcony of Hindsight & Future Anchor)',
    formula: 'Perched upon the balcony of hindsight, I now recognize that [Core Philosophical Lesson]. Looking ahead, this episode will undoubtedly continue to anchor my worldview regarding...',
    purpose: 'Chạm mốc 2 phút hoàn hảo bằng tư duy chiêm nghiệm triết lý và liên hệ tương lai.',
    band: 'Band 8.5+'
  }
];

export const MemoryPalaceFormulaCard: React.FC<MemoryPalaceFormulaCardProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xl">
              📖
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">
                Cẩm Nang Mở Đầu & Chuyển Phòng C1/C2
              </h3>
              <p className="text-xs text-slate-400">
                Các cấu trúc câu nối tự nhiên giúp bài nói mượt mà không ngắc ngứ
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

        {/* List of Formulas */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {ALL_FORMULAS.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-indigo-300">
                  {item.title}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {item.band}
                </span>
              </div>

              <p className="text-xs text-slate-200 font-serif italic bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                &ldquo;{item.formula}&rdquo;
              </p>

              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                <span>💡 {item.purpose}</span>
                <button
                  onClick={() => handleCopy(item.formula, idx)}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all active:scale-95"
                >
                  {copiedIdx === idx ? '✓ Đã Chép' : 'Sao Chép'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all"
          >
            Đã Hiểu & Quay Lại Luyện Tập
          </button>
        </div>
      </div>
    </div>
  );
};
