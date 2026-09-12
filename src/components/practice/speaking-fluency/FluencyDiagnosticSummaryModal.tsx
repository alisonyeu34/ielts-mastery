"use client";

import React from "react";
import { FluencyMetrics } from "@/lib/acousticFluencyAnalyzer";
import {
  Trophy,
  Award,
  Database,
  Gauge,
  Ear,
  AlertTriangle,
  RotateCcw,
  X,
  Sparkles,
} from "lucide-react";

interface FluencyDiagnosticSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: FluencyMetrics;
  onRetry: () => void;
}

export const FluencyDiagnosticSummaryModal: React.FC<FluencyDiagnosticSummaryModalProps> = ({
  isOpen,
  onClose,
  metrics,
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
          <div className="w-16 h-16 rounded-3xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mx-auto mb-3 shadow-lg shadow-cyan-500/20">
            <Trophy className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
            Speaking Biofeedback Telemetry
          </span>
          <h2 className="text-2xl font-black text-slate-100 mt-1">
            Báo Cáo Lưu Loát & Phân Tích m Học
          </h2>
        </div>

        {/* Fluency Band Banner */}
        <div className="my-6 p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/40 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Award className="w-5 h-5 text-cyan-400" />
            <span className="text-lg font-black text-cyan-300 font-mono">
              {metrics.fluencyBandEstimate}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Điểm Lưu Loát Cốt Lõi (Fluency Index):{" "}
            <strong className="text-cyan-400 font-mono">{metrics.fluencyScore}/100</strong>
          </p>
        </div>

        {/* 4 Core Metrics Grid */}
        <div className="grid grid-cols-2 gap-3.5 mb-6">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 mb-1">Tốc Độ Nói Trung Bình:</div>
            <div className="text-2xl font-black text-cyan-400 font-mono">
              {metrics.averageWpm} <span className="text-xs text-slate-500 font-normal">WPM</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              ({metrics.syllablesPerSec} âm tiết/giây)
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 mb-1">Tần Suất Từ Đệm (Fillers):</div>
            <div
              className={`text-2xl font-black font-mono ${
                metrics.fillerRatePerMinute <= 1.0 ? "text-emerald-400" : "text-amber-400"
              }`}
            >
              {metrics.fillerRatePerMinute} <span className="text-xs text-slate-500 font-normal">từ/phút</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              (Tổng: {metrics.fillerCount} từ đệm)
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 mb-1">Tỷ Lệ Ngập Ngừng Tìm Từ:</div>
            <div
              className={`text-2xl font-black font-mono ${
                metrics.hesitationRatio <= 8 ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {metrics.hesitationRatio}%
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              ({metrics.lexicalHesitationsCount} lần ngập ngừng &gt;1s)
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 mb-1">Ngắt Nhịp Học Thuật (Content):</div>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              {metrics.contentPausesCount} <span className="text-xs text-slate-500 font-normal">lần</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              (Ngắt nhịp tự nhiên theo cụm ý)
            </div>
          </div>
        </div>

        {/* Dexie DB Notice */}
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3 text-xs text-slate-300 mb-6">
          <Database className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            Kết quả đã được tự động lưu vào <strong>practice_logs</strong> và các trường hợp ngập ngừng nhiều được đồng bộ vào <strong>error_bank</strong>.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onRetry}
            className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Luyện Lại Bài Nói</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold rounded-xl text-xs transition-colors shadow-lg shadow-cyan-500/20"
          >
            Xem Lại Phổ m
          </button>
        </div>
      </div>
    </div>
  );
};
