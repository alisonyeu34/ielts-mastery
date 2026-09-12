"use client";

import React from "react";
import { ERREvaluation } from "@/lib/antiSubvocalizationEngine";
import {
  Trophy,
  Award,
  Database,
  Gauge,
  RotateCcw,
  X,
  Sparkles,
  EyeOff,
} from "lucide-react";

interface CognitiveReadingSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  evaluation: ERREvaluation;
  onRetry: () => void;
}

export const CognitiveReadingSummaryModal: React.FC<CognitiveReadingSummaryModalProps> = ({
  isOpen,
  onClose,
  evaluation,
  onRetry,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center pb-6 border-b border-slate-800">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto mb-3 shadow-lg shadow-amber-500/20">
            <Trophy className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Cognitive Reading Telemetry
          </span>
          <h2 className="text-2xl font-black text-slate-100 mt-1">
            Báo Cáo Tốc Độ Đọc Hiệu Dụng (ERR)
          </h2>
        </div>

        {/* Band Rating Banner */}
        <div className="my-6 p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/40 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-lg font-black text-amber-300 font-mono">
              {evaluation.bandEstimate} ({evaluation.performanceGrade})
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed italic">
            "{evaluation.pedagogicalFeedback}"
          </p>
        </div>

        {/* 3 Metrics Cards */}
        <div className="grid grid-cols-3 gap-3.5 mb-6">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 font-semibold mb-1">Raw Pacing:</div>
            <div className="text-2xl font-black text-amber-400 font-mono">
              {evaluation.rawWpm}
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 font-semibold mb-1">Độ Hiểu Ý Niệm:</div>
            <div className="text-2xl font-black text-cyan-400 font-mono">
              {evaluation.comprehensionPercentage}%
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 font-semibold mb-1">ERR Thực Tế:</div>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              {evaluation.effectiveReadingRate}
            </div>
          </div>
        </div>

        {/* Dexie DB Notice */}
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3 text-xs text-slate-300 mb-6">
          <Database className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            Kết quả đã được ghi nhận vào <strong>practice_logs</strong> và các câu checkpoint sai được đồng bộ vào <strong>error_bank</strong>.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onRetry}
            className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Đọc Lại Tốc Độ Khác</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs transition-colors shadow-lg shadow-amber-500/20"
          >
            Đóng Báo Cáo
          </button>
        </div>
      </div>
    </div>
  );
};
