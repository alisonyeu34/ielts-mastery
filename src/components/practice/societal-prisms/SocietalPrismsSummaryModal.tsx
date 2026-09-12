"use client";

import React from "react";
import { PrismAnalysisResult } from "@/lib/societalPrismsAnalyzer";
import { SocietalPrismsPrompt } from "@/data/mockSocietalPrismsPromptsData";

interface SocietalPrismsSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: PrismAnalysisResult | null;
  currentPrompt: SocietalPrismsPrompt;
  isSaved: boolean;
  onSaveToDatabase: () => void;
  onRetry: () => void;
  onNextPrompt: () => void;
}

export const SocietalPrismsSummaryModal: React.FC<SocietalPrismsSummaryModalProps> = ({
  isOpen,
  onClose,
  analysis,
  currentPrompt,
  isSaved,
  onSaveToDatabase,
  onRetry,
  onNextPrompt
}) => {
  if (!isOpen || !analysis) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 text-2xl">
              💎
            </span>
            <div>
              <h3 className="text-xl font-bold text-white">
                Chẩn Đoán Diễn Ngôn Thể Chế Speaking Part 3
              </h3>
              <p className="text-xs text-slate-400">
                Đo lường độ bao phủ 6 lăng kính và khả năng xử lý xung đột chính sách
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
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-center">
              <span className="text-[11px] text-slate-400 font-medium block mb-1">
                Lăng Kính Kích Hoạt
              </span>
              <span className="font-mono text-2xl font-black text-cyan-400">
                {analysis.activePrismCount} / 6
              </span>
              <span className="text-[10px] text-cyan-300 font-bold block mt-1">
                {analysis.activePrismCount >= 2 ? '✅ Đạt chuẩn vĩ mô' : '⚠️ Thiếu đa chiều'}
              </span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-center">
              <span className="text-[11px] text-slate-400 font-medium block mb-1">
                Institutional Breadth
              </span>
              <span className="font-mono text-2xl font-black text-purple-400">
                {analysis.breadthScore}
                <span className="text-xs text-slate-500">/100</span>
              </span>
              <span className="text-[10px] text-purple-300 font-bold block mt-1">
                Độ sâu thể chế
              </span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-center">
              <span className="text-[11px] text-slate-400 font-medium block mb-1">
                Dự Phóng Band FC/LR
              </span>
              <span className="font-mono text-2xl font-black text-emerald-400">
                Band {analysis.fluencyBandEstimate.toFixed(1)}
              </span>
              <span className="text-[10px] text-emerald-300/80 font-bold block mt-1">
                Speaking Part 3
              </span>
            </div>
          </div>

          {/* Active Prisms Badges */}
          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl space-y-2">
            <span className="text-xs font-bold text-slate-300 block">
              Các Nhóm Chủ Thể Được Nhắc Đến Trong Bài:
            </span>
            <div className="flex flex-wrap gap-2">
              {analysis.detectedPrisms.length === 0 ? (
                <span className="text-xs text-slate-500 italic">
                  Chưa nhận diện được thuật ngữ thể chế vĩ mô nào.
                </span>
              ) : (
                analysis.detectedPrisms.map((p) => (
                  <span
                    key={p.prismId}
                    className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <span>✓ {p.prismName}</span>
                    <span className="text-[10px] font-mono text-slate-400">({p.count} từ)</span>
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Strengths & Warnings */}
          <div className="space-y-3">
            {analysis.strengths.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <span>✅</span>
                  <span>Điểm Mạnh Đã Thể Hiện:</span>
                </span>
                {analysis.strengths.map((str, idx) => (
                  <p key={idx} className="text-xs text-emerald-200/90 pl-5">
                    • {str}
                  </p>
                ))}
              </div>
            )}

            {analysis.warnings.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-1">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <span>⚠️</span>
                  <span>Cảnh Báo Lối Tư Duy:</span>
                </span>
                {analysis.warnings.map((warn, idx) => (
                  <p key={idx} className="text-xs text-rose-200/90 pl-5">
                    • {warn}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Recommendations */}
          {analysis.recommendations.length > 0 && (
            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-1.5">
              <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <span>💡</span>
                <span>Lời Khuyên Bứt Phá Band 8.0+:</span>
              </span>
              {analysis.recommendations.map((rec, idx) => (
                <p key={idx} className="text-xs text-indigo-200/90 pl-5">
                  • {rec}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onRetry}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
            >
              Luyện Lại Câu Này
            </button>
            <button
              onClick={onNextPrompt}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
            >
              Câu Hỏi Tiếp Theo ➔
            </button>
          </div>

          <button
            onClick={onSaveToDatabase}
            disabled={isSaved}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2 ${
              isSaved
                ? 'bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 cursor-default'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-950/50 active:scale-95'
            }`}
          >
            <span>{isSaved ? '✓' : '💾'}</span>
            <span>{isSaved ? 'Đã Lưu Vào Error Bank & Vocab' : 'Lưu Kết Quả Vào IndexedDB'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
