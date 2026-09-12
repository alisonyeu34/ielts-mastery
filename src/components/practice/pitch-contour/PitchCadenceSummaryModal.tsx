"use client";

import React from "react";
import { UptalkDetectionResult, ShadowingAlignmentResult } from "@/lib/pitchTrackerEngine";
import { SpeakingPart3PitchExercise } from "@/data/mockPitchCadenceData";
import { X, Award, Activity, CheckCircle2, AlertTriangle, Sparkles, Save } from "lucide-react";

interface PitchCadenceSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: SpeakingPart3PitchExercise;
  uptalkDetection: UptalkDetectionResult;
  alignmentResult: ShadowingAlignmentResult;
  onSaveToDatabase: () => void;
  isSaved: boolean;
}

export const PitchCadenceSummaryModal: React.FC<PitchCadenceSummaryModalProps> = ({
  isOpen,
  onClose,
  exercise,
  uptalkDetection,
  alignmentResult,
  onSaveToDatabase,
  isSaved
}) => {
  if (!isOpen) return null;

  const estimatedPronBand =
    alignmentResult.alignmentScore >= 80 && !uptalkDetection.isUptalkDetected
      ? 8.5
      : alignmentResult.alignmentScore >= 65 && !uptalkDetection.isUptalkDetected
      ? 7.5
      : 6.5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
              <Activity className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">
                Bio-Acoustic Pitch Cadence &amp; Pronunciation Report
              </h2>
              <span className="text-xs text-slate-400">
                Speaking Part 3 Pitch Contour &amp; Anti-Uptalk Mastery (Band 7.5 &rarr; 8.5+)
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
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/80 to-indigo-950/80 border border-purple-500/50 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300">
              Pronunciation Band
            </span>
            <span className="text-3xl font-extrabold text-purple-100 font-mono mt-1">
              Band {estimatedPronBand.toFixed(1)}
            </span>
            <span className="text-xs text-purple-300 font-medium">Mục tiêu: Band 8.5+</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">
              Độ Khớp Ngữ Điệu RP
            </span>
            <span className="text-3xl font-extrabold font-mono text-emerald-400 mt-1">
              {alignmentResult.alignmentScore}%
            </span>
            <span className="text-[11px] text-slate-500">Native Alignment</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">
              Bẫy Lên Giọng Uptalk
            </span>
            <span
              className={`text-2xl font-bold font-mono mt-1 ${
                uptalkDetection.isUptalkDetected ? "text-rose-400" : "text-emerald-400"
              }`}
            >
              {uptalkDetection.isUptalkDetected ? "PHÁT HIỆN" : "TRIỆT TIÊU (0)"}
            </span>
            <span className="text-[11px] text-slate-500">
              {uptalkDetection.isUptalkDetected ? `+${uptalkDetection.terminalPitchRiseHz}Hz Rise` : "Hạ giọng dứt khoát"}
            </span>
          </div>
        </div>

        {/* Acoustic Mechanics Diagnostic */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
          <span className="font-bold text-slate-300 uppercase tracking-wider block">
            Chẩn Đoán Âm Học Câu Trả Lời:
          </span>
          <p className="text-slate-300 leading-relaxed font-sans">{uptalkDetection.feedback}</p>
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
                : "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/20"
            }`}
          >
            <Save className="w-4 h-4" />
            <span>{isSaved ? "Đã Lưu Vào Lộ Trình & Error Bank" : "Lưu Kết Quả Cao Độ"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
