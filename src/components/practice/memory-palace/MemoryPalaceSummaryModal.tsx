"use client";

import React from "react";
import { PacingBalanceAssessment, PALACE_ROOMS } from "@/lib/memoryPalacePacer";
import { MemoryPalacePrompt } from "@/data/mockMemoryPalacePromptsData";

interface MemoryPalaceSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessment: PacingBalanceAssessment | null;
  currentPrompt: MemoryPalacePrompt;
  isSaved: boolean;
  onSaveToDatabase: () => void;
  onRetry: () => void;
  onNextPrompt: () => void;
}

export const MemoryPalaceSummaryModal: React.FC<MemoryPalaceSummaryModalProps> = ({
  isOpen,
  onClose,
  assessment,
  currentPrompt,
  isSaved,
  onSaveToDatabase,
  onRetry,
  onNextPrompt
}) => {
  if (!isOpen || !assessment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-2xl">
              📊
            </span>
            <div>
              <h3 className="text-xl font-bold text-white">
                Chẩn Đoán Nhịp Độ Lâu Đài Trí Nhớ Speaking Part 2
              </h3>
              <p className="text-xs text-slate-400">
                Đánh giá theo 4 tiêu chí chuẩn khảo thí Cambridge IELTS
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
                Thời Lượng Bài Nói
              </span>
              <span className="font-mono text-2xl font-black text-white">
                {assessment.totalDuration}s
              </span>
              <span className={`text-[10px] font-bold block mt-1 ${assessment.isUnderLength ? 'text-rose-400' : 'text-emerald-400'}`}>
                {assessment.isUnderLength ? '⚠️ Thiếu thời lượng' : '✅ Đạt chuẩn 110-120s'}
              </span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-center">
              <span className="text-[11px] text-slate-400 font-medium block mb-1">
                Điểm Cân Bằng 4 Phòng
              </span>
              <span className="font-mono text-2xl font-black text-cyan-400">
                {assessment.balanceScore}
                <span className="text-xs text-slate-500">/100</span>
              </span>
              <span className="text-[10px] text-cyan-300 font-bold block mt-1">
                {assessment.balanceScore >= 80 ? '🌟 Cực kỳ đồng đều' : '⚙️ Cần phân bổ lại'}
              </span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-center">
              <span className="text-[11px] text-slate-400 font-medium block mb-1">
                Dự Phóng Band FC
              </span>
              <span className="font-mono text-2xl font-black text-amber-400">
                {assessment.fluencyBandEstimate.toFixed(1)}
              </span>
              <span className="text-[10px] text-amber-300/80 font-bold block mt-1">
                Fluency & Coherence
              </span>
            </div>
          </div>

          {/* Time Spent per Room Breakdown */}
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl space-y-3">
            <span className="text-xs font-bold text-slate-300 block">
              Phân Bổ Thời Gian Từng Gian Phòng (Mục tiêu 30s/phòng):
            </span>
            <div className="grid grid-cols-4 gap-2 text-center">
              {PALACE_ROOMS.map((room) => {
                const duration = assessment.roomDurations[room.id] || 0;
                const isOver = room.id === 1 && duration > 45;
                const isUnder = duration < 15;

                return (
                  <div
                    key={room.id}
                    className={`p-3 rounded-xl border ${
                      isOver
                        ? 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                        : isUnder
                        ? 'bg-amber-950/30 border-amber-500/40 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="text-[10px] text-slate-400 font-medium block">
                      Phòng {room.id}
                    </span>
                    <span className="font-mono text-base font-bold">
                      {duration}s
                    </span>
                    <span className="text-[9px] block text-slate-500 mt-0.5">
                      {room.name.replace('The ', '')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strengths & Warnings */}
          <div className="space-y-3">
            {assessment.strengths.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <span>✅</span>
                  <span>Điểm Mạnh Đã Thể Hiện:</span>
                </span>
                {assessment.strengths.map((str, idx) => (
                  <p key={idx} className="text-xs text-emerald-200/90 pl-5">
                    • {str}
                  </p>
                ))}
              </div>
            )}

            {assessment.warnings.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-1">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <span>⚠️</span>
                  <span>Điểm Nghẽn Cần Khắc Phục:</span>
                </span>
                {assessment.warnings.map((warn, idx) => (
                  <p key={idx} className="text-xs text-rose-200/90 pl-5">
                    • {warn}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Actionable Pedagogical Recommendations */}
          {assessment.recommendations.length > 0 && (
            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-1.5">
              <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <span>💡</span>
                <span>Lời Khuyên Chiến Thuật Cho Lần Luyện Tập Tới:</span>
              </span>
              {assessment.recommendations.map((rec, idx) => (
                <p key={idx} className="text-xs text-indigo-200/90 pl-5">
                  • {rec}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onRetry}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
            >
              Luyện Lại Đề Này
            </button>
            <button
              onClick={onNextPrompt}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
            >
              Đề Kế Tiếp ➔
            </button>
          </div>

          <button
            onClick={onSaveToDatabase}
            disabled={isSaved}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2 ${
              isSaved
                ? 'bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 cursor-default'
                : 'bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-indigo-950/50 active:scale-95'
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
