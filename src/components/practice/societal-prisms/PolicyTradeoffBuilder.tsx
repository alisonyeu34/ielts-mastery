"use client";

import React, { useState } from "react";
import { POLICY_TRADEOFF_TEMPLATES } from "@/lib/societalPrismsAnalyzer";

interface PolicyTradeoffBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PolicyTradeoffBuilder: React.FC<PolicyTradeoffBuilderProps> = ({
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
              ⚖️
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">
                Ma Trận Xử Lý Tiến Thoái Lưỡng Nan Chính Sách (Policy Dilemma)
              </h3>
              <p className="text-xs text-slate-400">
                Các mẫu câu đòn bẩy đối kháng C1/C2 giữa hai nhóm chủ thể xã hội
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
          {POLICY_TRADEOFF_TEMPLATES.map((tpl, idx) => (
            <div
              key={idx}
              className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2.5 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  Đối Kháng: {tpl.prismA.toUpperCase()} ⟷ {tpl.prismB.toUpperCase()}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Band 8.5+ Dilemma
                </span>
              </div>

              <p className="text-xs text-slate-200 font-serif italic bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                &ldquo;{tpl.template}&rdquo;
              </p>

              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                <span>💡 Bối cảnh: {tpl.contextVi}</span>
                <button
                  onClick={() => handleCopy(tpl.template, idx)}
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
            Đã Nắm Rõ Cấu Trúc
          </button>
        </div>
      </div>
    </div>
  );
};
