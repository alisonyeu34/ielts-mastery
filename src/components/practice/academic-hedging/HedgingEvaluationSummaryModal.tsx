"use client";

import React from "react";
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Award,
  Sparkles,
  TrendingUp,
  Save,
  BookOpen,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { HedgingAnalysisReport } from "@/lib/hedgingAnalyzer";
import { HedgingDrillItem } from "@/data/mockHedgingDrillsData";

interface HedgingEvaluationSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: HedgingAnalysisReport;
  drill: HedgingDrillItem;
  userDraft: string;
  isSaved: boolean;
  onSave: () => void;
  onNextDrill?: () => void;
}

export const HedgingEvaluationSummaryModal: React.FC<HedgingEvaluationSummaryModalProps> = ({
  isOpen,
  onClose,
  report,
  drill,
  userDraft,
  isSaved,
  onSave,
  onNextDrill
}) => {
  if (!isOpen) return null;

  const isHighBand = report.taskResponseEstimatedBand >= 7.5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-indigo-950/50 p-6 md:p-8 text-slate-100 overflow-hidden">
        {/* Glow Header */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-indigo-500 to-violet-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-white to-violet-200">
              Chẩn Đoán Rào Đón Học Thuật (Hedging Diagnostic)
            </h2>
            <p className="text-xs md:text-sm text-slate-400">
              IELTS C1/C2 Academic Precision & Task Response 7.5–8.5 Evaluation
            </p>
          </div>
        </div>

        {/* Score & Band Showcase Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Estimated Band */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Estimated TR/LR Band
            </span>
            <div className="flex items-baseline gap-1">
              <span className={`text-4xl font-black ${isHighBand ? "text-emerald-400" : "text-amber-400"}`}>
                {report.taskResponseEstimatedBand.toFixed(1)}
              </span>
              <span className="text-sm font-semibold text-slate-400">/ 9.0</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              {isHighBand ? "✅ C1/C2 Academic Stance" : "⚠️ Cần tăng rào đón học thuật"}
            </span>
          </div>

          {/* Epistemic Calibration Score */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Epistemic Calibration
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-indigo-400">
                {report.epistemicCalibrationScore}
              </span>
              <span className="text-sm font-semibold text-slate-400">/ 100</span>
            </div>
            <span className="text-[11px] font-medium text-indigo-300 mt-1 uppercase tracking-wide">
              {report.certaintyLevel.replace("_", " ")}
            </span>
          </div>

          {/* Hedging Density */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Hedging Density
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-violet-400">
                {report.hedgingDensityPercentage}%
              </span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              {report.hedgingMarkers.length} Hedging Markers Found
            </span>
          </div>
        </div>

        {/* Current Sentence Inspected */}
        <div className="mb-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400 mb-1">Câu được phân tích:</div>
          <p className="text-sm md:text-base font-serif italic text-slate-200">
            &ldquo;{userDraft || drill.calibrations.find(c => c.percentage === 50)?.sentence}&rdquo;
          </p>
        </div>

        {/* 5-Tier Hedging Markers Found Breakdown */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            5-Tier Hedging Architecture Breakdown
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {[
              { tier: 1, label: "Modal Aux" },
              { tier: 2, label: "Adverbs" },
              { tier: 3, label: "Attitude Verbs" },
              { tier: 4, label: "Noun Qualifiers" },
              { tier: 5, label: "Boundaries" }
            ].map((t) => {
              const count = report.hedgingMarkers.filter((m) => m.tier === t.tier).length;
              return (
                <div
                  key={t.tier}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    count > 0
                      ? "bg-indigo-950/40 border-indigo-500/40 text-indigo-200"
                      : "bg-slate-800/40 border-slate-700/40 text-slate-500"
                  }`}
                >
                  <div className="text-lg font-bold">{count}</div>
                  <div className="text-[10px] font-medium leading-tight">
                    {t.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dogmatic Terms Alert or Clean Badge */}
        <div className="mb-6">
          {report.dogmaticTerms.length > 0 ? (
            <div className="p-3.5 bg-rose-950/40 border border-rose-600/40 rounded-xl">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs mb-1">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Phát hiện {report.dogmaticTerms.length} từ khẳng định tuyệt đối (Dogmatic Terms)</span>
              </div>
              <p className="text-xs text-rose-200/80 mb-2">
                Các từ tuyệt đối hóa sẽ làm giảm tiêu chí Task Response xuống Band 6.0 nếu không có chứng cứ 100% không thể bác bỏ.
              </p>
              <div className="flex flex-wrap gap-2">
                {report.dogmaticTerms.map((m, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-mono font-bold bg-rose-900/60 text-rose-200 rounded border border-rose-500/50"
                  >
                    &ldquo;{m.matchedText}&rdquo;
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-3.5 bg-emerald-950/40 border border-emerald-600/40 rounded-xl flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs font-semibold text-emerald-300">
                  Tuyệt đối hóa đã được triệt tiêu hoàn toàn (Zero Dogmatism)
                </div>
                <div className="text-[11px] text-emerald-200/70">
                  Câu văn sở hữu độ mềm dẻo học thuật chuẩn C1/C2 Academic English.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pedagogical Recommendations */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            Khuyến Nghị Cải Thiện C1/C2 (Band 7.5 - 8.5)
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {report.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
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
            {onNextDrill && (
              <button
                onClick={() => {
                  onNextDrill();
                  onClose();
                }}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                Bài Tiếp Theo
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium text-xs border border-slate-700 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
