"use client";

import React from "react";
import { X, Award, Eye, CheckCircle2, AlertTriangle, Save, Sparkles, BookOpen } from "lucide-react";

interface PragmaticsSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAttempted: number;
  totalCorrect: number;
  totalLiteralTraps: number;
  onSaveToDatabase: () => void;
  isSaved: boolean;
}

export const PragmaticsSummaryModal: React.FC<PragmaticsSummaryModalProps> = ({
  isOpen,
  onClose,
  totalAttempted,
  totalCorrect,
  totalLiteralTraps,
  onSaveToDatabase,
  isSaved
}) => {
  if (!isOpen) return null;

  const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 100;
  const estimatedBand = Number(((accuracy / 100) * 4.5 + 4.5).toFixed(1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
              <Eye className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">
                Academic Pragmatics &amp; Subtext Decoding Diagnostic
              </h2>
              <span className="text-xs text-slate-400">
                Passage 3 &amp; Section 3/4 Implicit Stance Mastery (Band 7.5 &rarr; 8.5+)
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Telemetry Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/80 to-indigo-950/80 border border-cyan-500/40 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-300">
              Độ Chính Xác Ngữ Dụng
            </span>
            <span className="text-3xl font-extrabold text-cyan-100 font-mono mt-1">
              {totalCorrect}/{totalAttempted}
            </span>
            <span className="text-xs text-cyan-400 font-medium">({accuracy}% chính xác)</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">
              Bẫy Dịch Nghĩa Đen (Literal Traps)
            </span>
            <span
              className={`text-2xl font-bold font-mono mt-1 ${
                totalLiteralTraps === 0 ? "text-emerald-400" : "text-amber-400"
              }`}
            >
              {totalLiteralTraps} câu mắc bẫy
            </span>
            <span className="text-[11px] text-slate-500">Praise-faint-damning &amp; scare quotes</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">
              Ước Tính Band Điểm Đọc/Nghe
            </span>
            <span className="text-2xl font-bold font-mono text-emerald-400 mt-1">
              Band {estimatedBand}
            </span>
            <span className="text-[11px] text-slate-500">Mục tiêu: Band 8.5+</span>
          </div>
        </div>

        {/* Key Principles Recap */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-1.5 font-semibold text-cyan-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Quy Tắc Vàng Giải Mã Ngữ Dụng Học Cambridge:</span>
          </div>
          <ul className="space-y-1.5 pl-3 list-disc text-slate-400">
            <li>
              <strong>Praise-Faint-Damning:</strong> Tác giả khen ở vế đầu chỉ để tạo tiền đề bác bỏ hoàn toàn ở vế sau.
            </li>
            <li>
              <strong>Litotes:</strong> Phủ định kép (not entirely unfeasible) diễn tả tính chất cực kỳ gian nan.
            </li>
            <li>
              <strong>Scare Quotes:</strong> Đóng mở ngoặc kép là tín hiệu tác giả nghi ngờ tính xác thực của thuật ngữ.
            </li>
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            Đóng
          </button>

          <button
            type="button"
            onClick={onSaveToDatabase}
            disabled={isSaved}
            className={`px-5 py-2 rounded-xl text-xs font-semibold shadow-lg transition-all flex items-center gap-2 ${
              isSaved
                ? "bg-emerald-600 text-white cursor-default"
                : "bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-500/20"
            }`}
          >
            <Save className="w-4 h-4" />
            <span>{isSaved ? "Đã Lưu Vào Lộ Trình & Error Bank" : "Lưu Kết Quả Luyện Tập"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
