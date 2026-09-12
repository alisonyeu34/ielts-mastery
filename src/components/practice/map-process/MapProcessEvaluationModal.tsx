"use client";

import React from "react";
import { MapProcessOverallScore } from "@/lib/mapProcessValidator";

interface MapProcessEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  overallScore: MapProcessOverallScore | null;
  isSaved: boolean;
  onSaveToDatabase: () => void;
  onNextTask: () => void;
}

export const MapProcessEvaluationModal: React.FC<MapProcessEvaluationModalProps> = ({
  isOpen,
  onClose,
  overallScore,
  isSaved,
  onSaveToDatabase,
  onNextTask
}) => {
  if (!isOpen || !overallScore) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-2xl">
              📊
            </span>
            <div>
              <h3 className="text-xl font-bold text-white">
                Báo Cáo Đánh Giá Task 1: {overallScore.taskType === 'map' ? 'Bản Đồ Quy Hoạch' : 'Chuỗi Quy Trình'}
              </h3>
              <p className="text-xs text-slate-400">
                Chẩn đoán 4 tiêu chí chuẩn khảo thí Cambridge IELTS Writing Task 1
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
          {/* 4 Criteria Scores Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl text-center">
              <span className="text-[10px] text-slate-400 font-medium block mb-1">
                Task Achievement
              </span>
              <span className="font-mono text-2xl font-black text-amber-400">
                {overallScore.taScore.toFixed(1)}
              </span>
              <span className="text-[9px] text-slate-500 block mt-0.5">Overview & Features</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl text-center">
              <span className="text-[10px] text-slate-400 font-medium block mb-1">
                Coherence & Cohesion
              </span>
              <span className="font-mono text-2xl font-black text-cyan-400">
                {overallScore.ccScore.toFixed(1)}
              </span>
              <span className="text-[9px] text-slate-500 block mt-0.5">Sequencing & Logic</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl text-center">
              <span className="text-[10px] text-slate-400 font-medium block mb-1">
                Lexical Resource
              </span>
              <span className="font-mono text-2xl font-black text-purple-400">
                {overallScore.lrScore.toFixed(1)}
              </span>
              <span className="text-[9px] text-slate-500 block mt-0.5">Urban/Process Verbs</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl text-center">
              <span className="text-[10px] text-slate-400 font-medium block mb-1">
                Grammatical Range
              </span>
              <span className="font-mono text-2xl font-black text-emerald-400">
                {overallScore.graScore.toFixed(1)}
              </span>
              <span className="text-[9px] text-slate-500 block mt-0.5">Passive & Prepositions</span>
            </div>
          </div>

          {/* Overall Band Banner */}
          <div className="bg-slate-950 border border-indigo-500/40 rounded-2xl p-4 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                Dự Phóng Điểm Overall Task 1:
              </span>
              <p className="text-xs text-slate-400">
                Độ dài bài viết: <strong className="text-white">{overallScore.wordCount} từ</strong> (Chuẩn: 150 - 200 từ)
              </p>
            </div>
            <div className="text-right">
              <span className="font-mono text-3xl font-black text-white">
                Band {overallScore.overallBand.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Strengths & Warnings */}
          <div className="space-y-3">
            {overallScore.strengths.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <span>✅</span>
                  <span>Điểm Sáng Đã Đạt Được:</span>
                </span>
                {overallScore.strengths.map((str, idx) => (
                  <p key={idx} className="text-xs text-emerald-200/90 pl-5">
                    • {str}
                  </p>
                ))}
              </div>
            )}

            {overallScore.warnings.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-1">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <span>⚠️</span>
                  <span>Điểm Nghẽn & Vi Phạm Cần Khắc Phục:</span>
                </span>
                {overallScore.warnings.map((warn, idx) => (
                  <p key={idx} className="text-xs text-rose-200/90 pl-5">
                    • {warn}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Recommendations */}
          {overallScore.recommendations.length > 0 && (
            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-1.5">
              <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <span>💡</span>
                <span>Lời Khuyên Tối Ưu Hóa Band 8.0+:</span>
              </span>
              {overallScore.recommendations.map((rec, idx) => (
                <p key={idx} className="text-xs text-indigo-200/90 pl-5">
                  • {rec}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onNextTask}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
          >
            Đề Task 1 Kế Tiếp ➔
          </button>

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
