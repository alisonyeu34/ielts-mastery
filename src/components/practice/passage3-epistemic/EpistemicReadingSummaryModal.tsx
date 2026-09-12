"use client";

import React from "react";
import { SummaryEvaluationResult, Passage3EpistemicItem } from "@/lib/epistemicGraphParser";

interface EpistemicReadingSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  evaluationResult: SummaryEvaluationResult | null;
  currentPassage: Passage3EpistemicItem;
  isSaved: boolean;
  onSaveToDatabase: () => void;
  onRetry: () => void;
  onNextPassage: () => void;
}

export const EpistemicReadingSummaryModal: React.FC<EpistemicReadingSummaryModalProps> = ({
  isOpen,
  onClose,
  evaluationResult,
  currentPassage,
  isSaved,
  onSaveToDatabase,
  onRetry,
  onNextPassage
}) => {
  if (!isOpen || !evaluationResult) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 text-2xl">
              🏆
            </span>
            <div>
              <h3 className="text-xl font-bold text-white">
                Tổng Kết Chẩn Đoán Khái Niệm Trừu Tượng Passage 3
              </h3>
              <p className="text-xs text-slate-400">
                Đánh giá năng lực giải mã văn bản học thuật siêu trừu tượng Band 7.5 - 8.5+
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
          {/* Performance Overview Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-center">
              <span className="text-[11px] text-slate-400 font-medium block mb-1">
                Điểm Tóm Tắt
              </span>
              <span className="font-mono text-2xl font-black text-white">
                {evaluationResult.score} / {evaluationResult.total}
              </span>
              <span className="text-[10px] text-purple-400 font-bold block mt-1">
                {evaluationResult.percentage}% chính xác
              </span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-center">
              <span className="text-[11px] text-slate-400 font-medium block mb-1">
                Dự Phóng Reading
              </span>
              <span className="font-mono text-2xl font-black text-emerald-400">
                {evaluationResult.percentage >= 80 ? 'Band 8.0+' : evaluationResult.percentage >= 60 ? 'Band 7.0' : 'Band 6.0'}
              </span>
              <span className="text-[10px] text-emerald-300/80 font-bold block mt-1">
                Passage 3 Proficiency
              </span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-center">
              <span className="text-[11px] text-slate-400 font-medium block mb-1">
                Độ Thấu Cảm Luận Đề
              </span>
              <span className="font-mono text-xl font-black text-amber-400">
                {evaluationResult.isPassed ? 'Xuất Sắc' : 'Cần Cải Thiện'}
              </span>
              <span className="text-[10px] text-amber-300/80 font-bold block mt-1">
                Epistemic Synthesis
              </span>
            </div>
          </div>

          {/* Slot Breakdown List */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-300 block">
              Chi Tiết Kết Quả Từng Ô Trống (5 Slots):
            </span>

            {currentPassage.summaryTask.slots.map((slot) => {
              const res = evaluationResult.results[slot.id];
              if (!res) return null;

              return (
                <div
                  key={slot.id}
                  className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
                    res.isCorrect
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : 'bg-rose-950/20 border-rose-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className={res.isCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                      Ô #{slot.slotNumber}: {res.isCorrect ? '✅ Đúng' : `❌ Sai (Bạn chọn: "${res.userTerm}")`}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Đáp án chuẩn: &ldquo;{res.correctTerm}&rdquo;
                    </span>
                  </div>

                  <p className="text-slate-300 leading-relaxed">
                    💡 {res.explanation}
                  </p>

                  {!res.isCorrect && (
                    <p className="text-amber-300 text-[11px] font-medium">
                      ⚠️ Cảnh báo bẫy khảo thí: {res.epistemicTrap}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Error Bank Notice */}
          {!evaluationResult.isPassed && (
            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-xs text-rose-200/90 space-y-1">
              <span className="font-bold flex items-center gap-1.5">
                <span>⚠️</span>
                <span>Tự Động Ghi Nhận Lỗi Vào Error Bank:</span>
              </span>
              <p className="pl-5">
                Các câu sai đã được phân loại với nhãn <code className="bg-rose-900/60 px-1 py-0.5 rounded text-rose-300 font-mono">paraphrase_trap</code> để tự động đưa vào chu trình ôn tập Spaced Repetition.
              </p>
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
              Làm Lại Bài Này
            </button>
            <button
              onClick={onNextPassage}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
            >
              Bài Đọc Tiếp Theo ➔
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
