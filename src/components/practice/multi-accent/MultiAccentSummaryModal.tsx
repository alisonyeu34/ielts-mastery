"use client";

import React from "react";
import { AccentType, ACCENT_CONFIGS } from "@/lib/webAudioLooperEngine";
import {
  Trophy,
  Ear,
  ShieldCheck,
  Database,
  RotateCcw,
  X,
  Award,
} from "lucide-react";

interface MultiAccentSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAccent: AccentType;
  drillAttemptCount: number;
  drillSuccessCount: number;
  onRetry: () => void;
}

export const MultiAccentSummaryModal: React.FC<MultiAccentSummaryModalProps> = ({
  isOpen,
  onClose,
  currentAccent,
  drillAttemptCount,
  drillSuccessCount,
  onRetry,
}) => {
  if (!isOpen) return null;

  const cfg = ACCENT_CONFIGS[currentAccent];
  const accuracy =
    drillAttemptCount > 0
      ? Math.round((drillSuccessCount / drillAttemptCount) * 100)
      : 100;

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
          <div className="w-16 h-16 rounded-3xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mx-auto mb-3 shadow-lg shadow-cyan-500/20">
            <Trophy className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
            Acoustic Diagnostics Report
          </span>
          <h2 className="text-2xl font-black text-slate-100 mt-1">
            Báo Cáo Độ Nhạy Tai Đa Ngữ Điệu
          </h2>
        </div>

        {/* Accent Banner */}
        <div className="my-6 p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/40 text-center">
          <div className="text-3xl mb-1">{cfg.flag}</div>
          <div className="text-lg font-black text-cyan-300">
            Giọng {cfg.label} ({cfg.localeCode})
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Độ tương thích âm học với kỳ thi Cambridge IELTS
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3.5 mb-6">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Ear className="w-4 h-4 text-cyan-400" />
              <span>Độ Nhạy Bẫy m (Ear Accuracy):</span>
            </div>
            <div className="text-2xl font-black text-cyan-400 font-mono">
              {accuracy}%
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Số Lượt Vượt Bẫy:</span>
            </div>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              {drillSuccessCount}/{drillAttemptCount || 1}
            </div>
          </div>
        </div>

        {/* Dexie DB Notice */}
        <div className="p-3 bg-cyan-950/30 border border-cyan-500/30 rounded-xl flex items-center gap-3 text-xs text-cyan-300 mb-6">
          <Database className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            Các bẫy nghe sai đã được tự động lưu vào <strong>Error Bank (errorType: 'pronunciation')</strong> để kích hoạt phân tuyến bài tập vi mô thích ứng.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onRetry}
            className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Luyện Lại Vòng Lặp</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold rounded-xl text-xs transition-colors shadow-lg shadow-cyan-500/20"
          >
            Tiếp Tục Luyện Nghe
          </button>
        </div>
      </div>
    </div>
  );
};
