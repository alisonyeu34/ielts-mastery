"use client";

import React from "react";
import { PhilosophicalEvaluationResult } from "@/lib/philosophicalEthicsValidator";
import { X, Award, Brain, CheckCircle2, AlertTriangle, Sparkles, Save, ShieldCheck } from "lucide-react";

interface EthicsEvaluationSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  evaluationResult: PhilosophicalEvaluationResult;
  onSaveToDatabase: () => void;
  isSaved: boolean;
}

export const EthicsEvaluationSummaryModal: React.FC<EthicsEvaluationSummaryModalProps> = ({
  isOpen,
  onClose,
  evaluationResult,
  onSaveToDatabase,
  isSaved
}) => {
  if (!isOpen) return null;

  const {
    philosophicalDepthScore,
    taskResponseBandEstimate,
    frameworkAnalysis,
    platitudesDetected,
    synthesizedDualStance,
    recommendations
  } = evaluationResult;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
              <Brain className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">
                Socio-Philosophical &amp; Task Response Diagnostic
              </h2>
              <span className="text-xs text-slate-400">
                Normative Ethics &amp; Social Contract Rigor (Band 7.5 &rarr; 8.5+)
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
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/80 to-purple-950/80 border border-indigo-500/50 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-300">
              Task Response Band
            </span>
            <span className="text-3xl font-extrabold text-indigo-100 font-mono mt-1">
              Band {taskResponseBandEstimate.toFixed(1)}
            </span>
            <span className="text-xs text-indigo-300 font-medium">Mục tiêu: Band 8.0+</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">
              Độ Sâu Triết Học (Depth)
            </span>
            <span className="text-3xl font-extrabold font-mono text-cyan-400 mt-1">
              {philosophicalDepthScore}/100
            </span>
            <span className="text-[11px] text-slate-500">Mức độ chặt chẽ quy chuẩn</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">
              Khẩu Hiệu Cảm Tính
            </span>
            <span
              className={`text-2xl font-bold font-mono mt-1 ${
                platitudesDetected.length === 0 ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {platitudesDetected.length} lỗi
            </span>
            <span className="text-[11px] text-slate-500">
              {platitudesDetected.length === 0 ? "Văn phong học thuật sạch" : "Cần loại bỏ khẩu hiệu"}
            </span>
          </div>
        </div>

        {/* Framework Analysis Diagnostic */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Phân Tích 3 Trụ Cột Triết Học Đã Tích Hợp
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
              <span className="font-semibold text-amber-400 block">Vị Lợi (Utilitarian)</span>
              <span className="text-slate-300 font-mono text-[11px]">
                {frameworkAnalysis.utilitarianKeywords.length > 0
                  ? frameworkAnalysis.utilitarianKeywords.join(", ")
                  : "Chưa sử dụng"}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
              <span className="font-semibold text-rose-400 block">Nghĩa Vụ (Deontology)</span>
              <span className="text-slate-300 font-mono text-[11px]">
                {frameworkAnalysis.deontologyKeywords.length > 0
                  ? frameworkAnalysis.deontologyKeywords.join(", ")
                  : "Chưa sử dụng"}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
              <span className="font-semibold text-cyan-400 block">Khế Ước (Rawlsian)</span>
              <span className="text-slate-300 font-mono text-[11px]">
                {frameworkAnalysis.socialContractKeywords.length > 0
                  ? frameworkAnalysis.socialContractKeywords.join(", ")
                  : "Chưa sử dụng"}
              </span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Chiến Lược Tối Ưu Hóa Chiều Sâu Lập Luận
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
