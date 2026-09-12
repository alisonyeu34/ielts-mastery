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
  Zap,
  Gauge,
  BookOpen
} from "lucide-react";
import { LectureScenario, PlaybackRateTier } from "@/lib/timeStretchingDSP";

interface LectureDiagnosticSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: LectureScenario;
  playbackRate: PlaybackRateTier;
  scoreStats: {
    correctCount: number;
    total: number;
    accuracy: number;
    estimatedBand: number;
    detailsList: {
      questionNumber: number;
      userAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
      isPluralTrap: boolean;
    }[];
  };
  isSaved: boolean;
  onSave: () => void;
  onNextScenario?: () => void;
}

export const LectureDiagnosticSummaryModal: React.FC<LectureDiagnosticSummaryModalProps> = ({
  isOpen,
  onClose,
  scenario,
  playbackRate,
  scoreStats,
  isSaved,
  onSave,
  onNextScenario
}) => {
  if (!isOpen) return null;

  const isHighBand = scoreStats.estimatedBand >= 7.5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-indigo-950/50 p-6 md:p-8 text-slate-100 overflow-hidden">
        {/* Glow Header */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-indigo-500 to-cyan-500" />

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
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-white to-cyan-200">
              Tổng Kết Chẩn Đoán Thính Giác Bài Giảng Section 4
            </h2>
            <p className="text-xs md:text-sm text-slate-400">
              IELTS Listening Section 4 High-Rate Speech & Signpost Telemetry Diagnostic
            </p>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Estimated Listening Band */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Estimated Listening Band
            </span>
            <div className="flex items-baseline gap-1">
              <span className={`text-4xl font-black ${isHighBand ? "text-emerald-400" : "text-amber-400"}`}>
                {scoreStats.estimatedBand.toFixed(1)}
              </span>
              <span className="text-sm font-semibold text-slate-400">/ 9.0</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              {isHighBand ? "✅ C1/C2 Acoustic Processing" : "⚠️ Cần rèn luyện phản xạ tốc độ"}
            </span>
          </div>

          {/* Accuracy Score */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Tỷ Lệ Bắt Từ Đúng
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-cyan-400">
                {scoreStats.accuracy}%
              </span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              {scoreStats.correctCount}/{scoreStats.total} Ô Trống Đúng
            </span>
          </div>

          {/* Playback Rate Trained */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Tốc Độ Luyện Nghe
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-indigo-400">
                {playbackRate}x
              </span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              Nén tốc độ giữ nguyên cao độ
            </span>
          </div>
        </div>

        {/* Pedagogical Guidance */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            Chiến Thuật Thống Trị Section 4 (Band 8.0+)
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold">•</span>
              <span><strong>Dự đoán từ loại và ngữ pháp:</strong> Luôn đọc lướt trước đề bài để xác định ô trống cần danh từ số ít, số nhiều (-s) hay tính từ trước khi audio vang lên.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold">•</span>
              <span><strong>Bắt bám từ tín hiệu (Signposts):</strong> Khi nghe các cụm từ chuyển ý như <em>&ldquo;Turning now to...&rdquo;</em>, lập tức di chuyển tầm mắt tới nhóm câu hỏi tiếp theo.</span>
            </li>
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
            {onNextScenario && (
              <button
                onClick={() => {
                  onNextScenario();
                  onClose();
                }}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl font-medium text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                Bài Giảng Tiếp Theo
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
