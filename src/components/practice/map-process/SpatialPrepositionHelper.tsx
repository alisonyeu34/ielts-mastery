"use client";

import React from "react";
import { SPATIAL_PREPOSITION_RULES } from "@/lib/mapProcessValidator";

interface SpatialPrepositionHelperProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpatialPrepositionHelper: React.FC<SpatialPrepositionHelperProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xl">
              📐
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">
                Cẩm Nang Giới Từ Không Gian & Động Từ Quy Hoạch Task 1
              </h3>
              <p className="text-xs text-slate-400">
                Phân biệt chính xác ranh giới địa lý để đạt điểm tuyệt đối Grammatical Range & Accuracy
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {SPATIAL_PREPOSITION_RULES.map((rule, idx) => (
            <div
              key={idx}
              className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300">
                  {rule.rule}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Band 8.0+ Rule
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
                    ✓ Cấu trúc chuẩn:
                  </span>
                  {rule.correctPattern}
                </div>
                <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-200">
                  <span className="text-[10px] uppercase font-bold text-rose-400 block mb-1">
                    ✗ Bẫy hay sai:
                  </span>
                  {rule.incorrectTrap}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                💡 {rule.explanation}
              </p>
            </div>
          ))}

          {/* 5 Pairs of Urban Transformation Verbs */}
          <div className="bg-slate-950/90 border border-indigo-500/30 rounded-2xl p-4 space-y-3">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
              5 Cặp Động Từ Biến Đổi Quy Hoạch Đô Thị C1/C2:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-emerald-400 block mb-1">1. Xây mới ➔ Phá dỡ:</strong>
                <code>erect, construct, introduce</code> ↔ <code>demolish, flatten, raze to the ground</code>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-cyan-400 block mb-1">2. Mở rộng ➔ Thu hẹp:</strong>
                <code>expand, enlarge, widen</code> ↔ <code>diminish, contract in footprint</code>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-purple-400 block mb-1">3. Chuyển đổi công năng:</strong>
                <code>convert into, transform into, make way for</code>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <strong className="text-amber-400 block mb-1">4. Hiện đại hóa:</strong>
                <code>pedestrianize, modernize, commercialize</code>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-all"
          >
            Đã Nắm Rõ Quy Tắc
          </button>
        </div>
      </div>
    </div>
  );
};
