"use client";

import React from "react";
import {
  X,
  Award,
  CheckCircle2,
  AlertTriangle,
  Save,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  BookOpen
} from "lucide-react";
import { ToulminDebateTopic } from "@/data/mockToulminDebatesData";
import { ToulminValidationReport } from "@/lib/toulminStructureValidator";

interface ToulminSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: ToulminDebateTopic;
  report: ToulminValidationReport;
  synthesizedProse: string;
  isSaved: boolean;
  onSave: () => void;
  onNextTopic?: () => void;
}

export const ToulminSummaryModal: React.FC<ToulminSummaryModalProps> = ({
  isOpen,
  onClose,
  topic,
  report,
  synthesizedProse,
  isSaved,
  onSave,
  onNextTopic
}) => {
  if (!isOpen) return null;

  const isHighBand = report.taskResponseEstimatedBand >= 8.0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-indigo-950/50 p-6 md:p-8 text-slate-100 overflow-hidden">
        {/* Glow Header */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-emerald-500 to-cyan-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-cyan-200">
              Tổng Kết Chẩn Đoán Lập Luận Toulmin Đa Tầng
            </h2>
            <p className="text-xs md:text-sm text-slate-400">
              IELTS Writing Task 2 Task Response & Dialectical Resilience (Band 8.0 - 8.5+)
            </p>
          </div>
        </div>

        {/* Stats Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Estimated TR Band */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Estimated TR Band
            </span>
            <div className="flex items-baseline gap-1">
              <span className={`text-4xl font-black ${isHighBand ? "text-emerald-400" : "text-amber-400"}`}>
                {report.taskResponseEstimatedBand.toFixed(1)}
              </span>
              <span className="text-sm font-semibold text-slate-400">/ 9.0</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              {isHighBand ? "✅ C1/C2 Dialectical Depth" : "⚠️ Cần bổ sung Rebuttal"}
            </span>
          </div>

          {/* Logic Resilience Score */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Logic Resilience
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-indigo-400">
                {report.logicResilienceScore}
              </span>
              <span className="text-sm font-semibold text-slate-400">/ 100</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              {report.isComplete ? "Hoàn chỉnh 6 khối" : "Khuyết khối tư duy"}
            </span>
          </div>

          {/* Topic Domain */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Academic Domain
            </span>
            <div className="text-sm font-bold text-cyan-300 line-clamp-1 mt-2">
              {topic.academicDomain}
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              Chủ đề chuyên sâu
            </span>
          </div>
        </div>

        {/* Synthesized Prose Highlight */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 mb-6 space-y-2">
          <span className="text-xs font-bold text-slate-300 block">
            Đoạn văn thân bài hoàn thiện:
          </span>
          <p className="text-xs font-serif italic text-slate-200 leading-relaxed max-h-32 overflow-y-auto pr-1">
            &ldquo;{synthesizedProse}&rdquo;
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onSave}
            disabled={isSaved}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
              isSaved
                ? "bg-emerald-800/50 text-emerald-300 border border-emerald-500/50 cursor-default"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
            }`}
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Đã Lưu Vào Lịch Sử & Error Bank
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Lưu Kết Quả Vào Dexie DB
              </>
            )}
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onNextTopic && (
              <button
                onClick={() => {
                  onNextTopic();
                  onClose();
                }}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                Chủ Đề Tiếp Theo
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl font-medium text-xs border border-slate-700 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
