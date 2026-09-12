"use client";

import React, { useState } from "react";
import { Sparkles, Copy, Check, FileText, Send } from "lucide-react";

interface LogicToProseSynthesizerProps {
  synthesizedProse: string;
  onOpenSummary: () => void;
}

export const LogicToProseSynthesizer: React.FC<LogicToProseSynthesizerProps> = ({
  synthesizedProse,
  onOpenSummary
}) => {
  const [copied, setCopied] = useState(false);
  const wordCount = synthesizedProse.trim() ? synthesizedProse.trim().split(/\s+/).length : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(synthesizedProse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Đoạn Văn Thân Bài C1/C2 Hoàn Chỉnh (Synthesized Academic Prose)
            </h3>
            <p className="text-[11px] text-slate-400">
              Tổng hợp tự động 6 khối Toulmin kèm liên từ học thuật kết nối mượt mà
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">
            Độ dài: <strong className="text-cyan-400">{wordCount} từ</strong> (Chuẩn: 90 - 130 từ)
          </span>
        </div>
      </div>

      {/* Synthesized Prose Container */}
      <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
        <p className="text-xs md:text-sm font-serif italic text-slate-200 leading-relaxed">
          {synthesizedProse || "Vui lòng nhập ít nhất Claim và Data để tổng hợp đoạn văn..."}
        </p>
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          {copied ? "Đã Sao Chép Đoạn Văn" : "Sao Chép Vào Clipboard"}
        </button>

        <button
          onClick={onOpenSummary}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition-all"
        >
          <Send className="w-3.5 h-3.5" />
          Đánh Giá & Lưu Lịch Sử
        </button>
      </div>
    </div>
  );
};
