"use client";

import React from "react";
import { DialecticalResilienceScore } from "@/lib/socraticDebateEngine";
import { SocraticDebateTopic } from "@/data/mockSocraticDebateData";
import {
  Trophy,
  Award,
  Database,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  X,
  Sparkles,
  BookOpen,
} from "lucide-react";

interface SocraticDebateSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: DialecticalResilienceScore;
  topic: SocraticDebateTopic;
  onRetry: () => void;
}

export const SocraticDebateSummaryModal: React.FC<SocraticDebateSummaryModalProps> = ({
  isOpen,
  onClose,
  score,
  topic,
  onRetry,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative my-8 animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center pb-6 border-b border-slate-800">
          <div className="w-16 h-16 rounded-3xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 mx-auto mb-3 shadow-lg shadow-purple-500/20">
            <Trophy className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
            Socratic Dialectical Telemetry
          </span>
          <h2 className="text-2xl font-black text-slate-100 mt-1">
            Báo Cáo Năng Lực Tranh Biện Học Thuật
          </h2>
        </div>

        {/* Resilience Band Banner */}
        <div className="my-6 p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-purple-500/40 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Award className="w-5 h-5 text-purple-400" />
            <span className="text-lg font-black text-purple-300 font-mono">
              {score.bandEstimate}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 italic">
            "{score.pedagogicalAdvice}"
          </p>
        </div>

        {/* 3 Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
            <div className="text-[11px] text-slate-400 mb-1">Chỉ Số Vững Chắc:</div>
            <div className="text-2xl font-black text-amber-400 font-mono">
              {score.overallScore}%
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
            <div className="text-[11px] text-slate-400 mb-1">Mật Độ Rào Đón:</div>
            <div className="text-2xl font-black text-purple-400 font-mono">
              {score.hedgingDensity}%
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
            <div className="text-[11px] text-slate-400 mb-1">Lăng Kính Xã Hội:</div>
            <div className="text-2xl font-black text-cyan-400 font-mono">
              {score.activeLensesCount}/6
            </div>
          </div>
        </div>

        {/* Model Synthesized Position Section */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 mb-6">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Bài Mẫu Tái Lập Luận Band 8.5+ (Model Synthesis Position):</span>
          </div>
          <p className="text-xs font-serif text-slate-200 leading-relaxed italic bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            "{topic.modelSynthesizedPosition}"
          </p>
        </div>

        {/* Dexie DB Notice */}
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3 text-xs text-slate-300 mb-6">
          <Database className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            Kết quả đã được ghi nhận vào <strong>practice_logs</strong> và đồng bộ các lỗi ngụy biện vào <strong>error_bank</strong>.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onRetry}
            className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Tranh Biện Lại Chủ Đề Này</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-purple-600 hover:bg-purple-500 text-white font-extrabold rounded-xl text-xs transition-colors shadow-lg shadow-purple-600/20"
          >
            Đóng Báo Cáo
          </button>
        </div>
      </div>
    </div>
  );
};
