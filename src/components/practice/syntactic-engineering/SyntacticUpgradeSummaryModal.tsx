"use client";

import React from "react";
import { SyntacticAnalysisReport } from "@/lib/syntacticParser";
import { X, Award, CheckCircle2, AlertTriangle, Sparkles, Save, Brain } from "lucide-react";

interface SyntacticUpgradeSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysisReport: SyntacticAnalysisReport;
  onSaveToDatabase: () => void;
  isSaved: boolean;
}

export const SyntacticUpgradeSummaryModal: React.FC<SyntacticUpgradeSummaryModalProps> = ({
  isOpen,
  onClose,
  analysisReport,
  onSaveToDatabase,
  isSaved
}) => {
  if (!isOpen) return null;

  const {
    informationDensityIndex,
    densityTier,
    graBandEstimate,
    nominalizationWords,
    inversion,
    cleft,
    recommendations
  } = analysisReport;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
              <Award className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">
                C1/C2 Syntactic Engineering Diagnostic Report
              </h2>
              <span className="text-xs text-slate-400">
                Grammatical Range &amp; Accuracy (GRA) &amp; Information Density (Band 7.5 &rarr; 8.5+)
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

        {/* Score Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/80 to-purple-950/80 border border-indigo-500/50 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-300">
              GRA Band Estimate
            </span>
            <span className="text-3xl font-extrabold text-indigo-100 font-mono mt-1">
              Band {graBandEstimate.toFixed(1)}
            </span>
            <span className="text-xs text-indigo-300 font-medium">Mục tiêu: Band 8.0+</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">
              Mật Độ Thông Tin (IDI)
            </span>
            <span className="text-3xl font-extrabold font-mono text-emerald-400 mt-1">
              {informationDensityIndex}%
            </span>
            <span className="text-[11px] text-slate-500">{densityTier}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">
              Gốc Từ Danh Từ Hóa
            </span>
            <span className="text-2xl font-bold font-mono text-cyan-400 mt-1">
              {nominalizationWords.length} từ C1/C2
            </span>
            <span className="text-[11px] text-slate-500">Đã nén vào câu văn</span>
          </div>
        </div>

        {/* Syntactic Weapons Verification */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Kiểm Tra Cú Pháp Đảo Ngữ &amp; Câu Chẻ
          </h4>

          {/* Inversion check */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
            {inversion.hasInversion && inversion.isSyntacticallyValid ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : inversion.hasInversion && !inversion.isSyntacticallyValid ? (
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            ) : (
              <Sparkles className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            )}
            <div className="text-xs space-y-1">
              <span className="font-semibold text-slate-200">
                Đảo Ngữ Học Thuật ({inversion.inversionType.toUpperCase()}):
              </span>
              <p className="text-slate-300">{inversion.feedback}</p>
            </div>
          </div>

          {/* Cleft sentence check */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
            {cleft.hasCleft && cleft.isSyntacticallyValid ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <Sparkles className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            )}
            <div className="text-xs space-y-1">
              <span className="font-semibold text-slate-200">
                Câu Chẻ Nhấn Mạnh ({cleft.cleftType.toUpperCase()}):
              </span>
              <p className="text-slate-300">{cleft.feedback}</p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Chiến Thuật Tối Ưu Cú Pháp Tiếp Theo
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
            <span>{isSaved ? "Đã Lưu Vào Lộ Trình & Error Bank" : "Lưu Kết Quả Cú Pháp"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
