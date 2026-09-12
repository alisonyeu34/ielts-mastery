"use client";

import React from "react";
import { ParagraphCohesionAnalysis } from "@/lib/themeRhemeParser";
import {
  Trophy,
  Award,
  Database,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  X,
  Layers,
} from "lucide-react";

interface CohesionScoreSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: ParagraphCohesionAnalysis;
  onReset: () => void;
}

export const CohesionScoreSummaryModal: React.FC<CohesionScoreSummaryModalProps> = ({
  isOpen,
  onClose,
  analysis,
  onReset,
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
            Discourse Cohesion Telemetry
          </span>
          <h2 className="text-2xl font-black text-slate-100 mt-1">
            Đánh Giá Mạch Lạc Coherence & Cohesion
          </h2>
        </div>

        {/* Estimated Band Badge */}
        <div className="my-6 p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/40 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-lg font-black text-amber-300 font-mono">
              {analysis.bandEstimate}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed italic">
            "{analysis.flowSummary}"
          </p>
        </div>

        {/* 4 Metrics Grid */}
        <div className="grid grid-cols-2 gap-3.5 mb-6">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 mb-1">Điểm Mạch Lạc Tổng Thể:</div>
            <div className="text-2xl font-black text-amber-400 font-mono">
              {analysis.overallCohesionScore}/100
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 mb-1">Mô Hình Dòng Chảy:</div>
            <div className="text-sm font-bold text-purple-300 capitalize">
              {analysis.dominantPattern === "linear"
                ? "Tiến Trình Bậc Thang (Linear)"
                : analysis.dominantPattern === "constant"
                ? "Tiến Trình Đồng Trục (Constant)"
                : "Cần Cải Thiện Mắt Xích"}
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 mb-1">Liên Từ Máy Móc Đầu Câu:</div>
            <div
              className={`text-2xl font-black font-mono ${
                analysis.mechanicalLinkersCount === 0
                  ? "text-emerald-400"
                  : "text-rose-400"
              }`}
            >
              {analysis.mechanicalLinkersCount} <span className="text-xs text-slate-500">từ</span>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 mb-1">Điểm Gãy Mạch (Breakpoints):</div>
            <div
              className={`text-2xl font-black font-mono ${
                analysis.brokenPointsCount === 0
                  ? "text-emerald-400"
                  : "text-rose-400"
              }`}
            >
              {analysis.brokenPointsCount} <span className="text-xs text-slate-500">vết gãy</span>
            </div>
          </div>
        </div>

        {/* Dexie DB Notice */}
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3 text-xs text-slate-300 mb-6">
          <Database className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            Kết quả đã được tự động lưu vào <strong>practice_logs</strong> và đồng bộ các lỗi gãy mạch vào <strong>error_bank</strong>.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Luyện Đoạn Văn Khác</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs transition-colors shadow-lg shadow-amber-500/20"
          >
            Tiếp Tục Chỉnh Sửa
          </button>
        </div>
      </div>
    </div>
  );
};
