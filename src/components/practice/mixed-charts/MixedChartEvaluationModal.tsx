"use client";

import React from "react";
import { MixedChartValidationResult } from "@/lib/mixedChartValidator";
import { X, Award, CheckCircle2, AlertTriangle, Sparkles, Save } from "lucide-react";

interface MixedChartEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  validationResult: MixedChartValidationResult;
  onSaveToDatabase: () => void;
  isSaved: boolean;
}

export const MixedChartEvaluationModal: React.FC<MixedChartEvaluationModalProps> = ({
  isOpen,
  onClose,
  validationResult,
  onSaveToDatabase,
  isSaved
}) => {
  if (!isOpen) return null;

  const { bandScoreEstimate, dualOverview, higherOrderLexis, synthesisRatio, recommendations } =
    validationResult;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
              <Award className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">
                Mixed Chart Evaluation &amp; Band Score Breakdown
              </h2>
              <span className="text-xs text-slate-400">
                Task 1 Asymmetric Synthesis Criteria (Band 4.5 &rarr; 7.5+)
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

        {/* 4 Criterion Score Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-gradient-to-br from-indigo-950/80 to-purple-950/80 border border-indigo-500/50 flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-300">
              Overall
            </span>
            <span className="text-3xl font-extrabold text-indigo-100 font-mono">
              {bandScoreEstimate.overall.toFixed(1)}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
            <span className="text-[10px] font-semibold text-slate-400 block">Task Ach.</span>
            <span className="text-xl font-bold text-slate-200 font-mono">
              {bandScoreEstimate.taskAchievement.toFixed(1)}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
            <span className="text-[10px] font-semibold text-slate-400 block">Coherence</span>
            <span className="text-xl font-bold text-slate-200 font-mono">
              {bandScoreEstimate.coherenceCohesion.toFixed(1)}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
            <span className="text-[10px] font-semibold text-slate-400 block">Lexical Res.</span>
            <span className="text-xl font-bold text-slate-200 font-mono">
              {bandScoreEstimate.lexicalResource.toFixed(1)}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
            <span className="text-[10px] font-semibold text-slate-400 block">Grammar</span>
            <span className="text-xl font-bold text-slate-200 font-mono">
              {bandScoreEstimate.grammaticalRange.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Dual Overview & Synthesis Diagnostics */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Trụ Cột Đánh Giá Trọng Tâm
          </h4>

          {/* Dual Overview Check */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
            {dualOverview.isDualOverviewValid ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="text-xs space-y-1">
              <span className="font-semibold text-slate-200">Dual Overview Formulation:</span>
              <p className="text-slate-300">{dualOverview.feedback}</p>
            </div>
          </div>

          {/* Synthesis Ratio Gauge */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div className="text-xs">
              <span className="font-semibold text-slate-200 block">Cross-Graph Synthesis Ratio:</span>
              <span className="text-slate-400">
                {synthesisRatio}% câu đạt tiêu chí đối sánh tương quan chéo (Chuẩn &ge; 40%)
              </span>
            </div>
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono border ${
                synthesisRatio >= 40
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  : "bg-amber-500/20 text-amber-300 border-amber-500/40"
              }`}
            >
              {synthesisRatio}%
            </span>
          </div>

          {/* Detected Higher-Order Lexis */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Cụm Từ So Sánh Bậc Cao Đã Nhận Diện ({higherOrderLexis.length}):</span>
            </div>
            {higherOrderLexis.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {higherOrderLexis.map((lex, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-indigo-950/70 border border-indigo-500/40 text-indigo-300 text-[11px] font-mono"
                  >
                    &ldquo;{lex.foundInText}&rdquo; ({lex.pattern})
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                Chưa phát hiện cấu trúc so sánh bậc cao nào (twofold, lion&apos;s share, in inverse proportion...). Hãy xem bảng Palette!
              </p>
            )}
          </div>
        </div>

        {/* Actionable Recommendations */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Chiến Lược Tối Ưu Cho Lần Viết Tiếp Theo
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">&bull;</span>
                <span>{rec}</span>
              </li>
            ))}
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
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20"
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
