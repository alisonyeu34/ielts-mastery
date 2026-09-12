"use client";

import React from "react";
import {
  Trophy,
  Gauge,
  Target,
  Brain,
  Database,
  RotateCcw,
  CheckCircle,
  X,
  Award,
} from "lucide-react";

interface SpeedReadingStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  rawWpm: number;
  effectiveWpm: number;
  comprehensionRate: number;
  quizScore: number | null;
  totalQuestions: number;
  bandRating: {
    band: string;
    title: string;
    badgeColor: string;
    advice: string;
  };
  matchedParaphrasesCount: number;
  onRetry: () => void;
}

export const SpeedReadingStatsModal: React.FC<SpeedReadingStatsModalProps> = ({
  isOpen,
  onClose,
  rawWpm,
  effectiveWpm,
  comprehensionRate,
  quizScore,
  totalQuestions,
  bandRating,
  matchedParaphrasesCount,
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

        {/* Modal Header */}
        <div className="text-center pb-6 border-b border-slate-800">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto mb-3 shadow-lg shadow-amber-500/20">
            <Trophy className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Speed-Reading Telemetry
          </span>
          <h2 className="text-2xl font-black text-slate-100 mt-1">
            Báo Cáo Tốc Độ & Tiếp Thu Học Thuật
          </h2>
        </div>

        {/* Band Rating Badge Banner */}
        <div className="my-6 p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/40 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-lg font-black text-amber-300 font-mono">
              {bandRating.band}
            </span>
          </div>
          <div className="text-sm font-bold text-slate-200">{bandRating.title}</div>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed italic">
            "{bandRating.advice}"
          </p>
        </div>

        {/* 4 Core Telemetry Metrics */}
        <div className="grid grid-cols-2 gap-3.5 mb-6">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Gauge className="w-4 h-4 text-amber-400" />
              <span>Raw Pacing WPM:</span>
            </div>
            <div className="text-2xl font-black text-amber-400 font-mono">
              {rawWpm} <span className="text-xs text-slate-500 font-normal">từ/phút</span>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Brain className="w-4 h-4 text-cyan-400" />
              <span>Effective WPM (E-WPM):</span>
            </div>
            <div className="text-2xl font-black text-cyan-400 font-mono">
              {effectiveWpm} <span className="text-xs text-slate-500 font-normal">từ/phút</span>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>Độ Hiểu (Comprehension):</span>
            </div>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              {comprehensionRate}%{" "}
              <span className="text-xs text-slate-500 font-normal">
                ({quizScore ?? 0}/{totalQuestions})
              </span>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <CheckCircle className="w-4 h-4 text-purple-400" />
              <span>Cặp Paraphrase Đã Nối:</span>
            </div>
            <div className="text-2xl font-black text-purple-400 font-mono">
              {matchedParaphrasesCount} <span className="text-xs text-slate-500 font-normal">cặp</span>
            </div>
          </div>
        </div>

        {/* Dexie DB Synced Notice */}
        <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-xs text-emerald-300 mb-6">
          <Database className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Kết quả đã được tự động lưu vào <strong>IndexedDB (db.practice_logs)</strong> để theo dõi tiến độ WPM 180 ngày.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onRetry}
            className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Thử Lại Tốc Độ Khác</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs transition-colors shadow-lg shadow-amber-500/20"
          >
            Quay Lại Bài Đọc
          </button>
        </div>
      </div>
    </div>
  );
};
