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
  Target,
  Sparkles,
  BookOpen
} from "lucide-react";
import { Section3DialogueScenario } from "@/data/mockSection3DialoguesData";

interface Section3DiagnosticSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: Section3DialogueScenario;
  scoreStats: {
    correctCount: number;
    total: number;
    accuracy: number;
    falseConsensusTrapCount: number;
    estimatedBand: number;
  };
  isSaved: boolean;
  onSave: () => void;
  onNextScenario?: () => void;
}

export const Section3DiagnosticSummaryModal: React.FC<Section3DiagnosticSummaryModalProps> = ({
  isOpen,
  onClose,
  scenario,
  scoreStats,
  isSaved,
  onSave,
  onNextScenario
}) => {
  if (!isOpen) return null;

  const isHighBand = scoreStats.estimatedBand >= 7.5;
  const fellIntoTraps = scoreStats.falseConsensusTrapCount > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-indigo-950/50 p-6 md:p-8 text-slate-100 overflow-hidden">
        {/* Glow Header Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500" />

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
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-white to-purple-200">
              Tổng Kết Chẩn Đoán Đồng Thuận Section 3
            </h2>
            <p className="text-xs md:text-sm text-slate-400">
              IELTS Listening Section 3 Multi-Speaker Consensus & Trap Resistance
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Estimated Band */}
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
              {isHighBand ? "✅ C1/C2 Academic Listening" : "⚠️ Cần rèn luyện nhận diện bẫy"}
            </span>
          </div>

          {/* Accuracy Percentage */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Tỷ Lệ Chính Xác
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-indigo-400">
                {scoreStats.accuracy}%
              </span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              {scoreStats.correctCount}/{scoreStats.total} Câu Đúng
            </span>
          </div>

          {/* Trap Resistance */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Bẫy False Consensus
            </span>
            <div className="flex items-baseline gap-1">
              <span className={`text-4xl font-black ${fellIntoTraps ? "text-rose-400" : "text-emerald-400"}`}>
                {scoreStats.falseConsensusTrapCount}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              {fellIntoTraps ? "⚠️ Bị lừa bởi đồng thuận giả" : "🛡️ Miễn nhiễm với bẫy"}
            </span>
          </div>
        </div>

        {/* Trap Diagnostic Banner */}
        <div className="mb-6">
          {fellIntoTraps ? (
            <div className="p-3.5 bg-rose-950/40 border border-rose-600/40 rounded-xl">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs mb-1">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Cảnh báo thói quen chọn đáp án quá sớm!</span>
              </div>
              <p className="text-xs text-rose-200/80">
                Bạn đã mắc {scoreStats.falseConsensusTrapCount} bẫy đồng thuận giả. Trong Section 3, thí sinh cần chờ đợi cho đến khi <em>tất cả các thành viên và giáo viên</em> xác nhận tán thành phương án trước khi chốt đáp án vào phiếu trả lời.
              </p>
            </div>
          ) : (
            <div className="p-3.5 bg-emerald-950/40 border border-emerald-600/40 rounded-xl flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs font-semibold text-emerald-300">
                  Phản xạ thính giác tuyệt đối (Trap Resistance Master)
                </div>
                <div className="text-[11px] text-emerald-200/70">
                  Bạn không bị lừa bởi các nhượng bộ nửa vời hay ý kiến cá nhân của từng nhân vật.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pedagogical Guidance */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            Chiến Thuật Bắt Trọn Band 8.0+ Section 3
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold">•</span>
              <span><strong>Theo dõi nhân vật thứ 3 (Supervisor):</strong> Thường người có tiếng nói quyết định phương án đề tài chính là Giáo viên hướng dẫn (Tutor / Supervisor).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold">•</span>
              <span><strong>Cảnh giác liên từ tương phản ngầm:</strong> Chú ý các từ chuyển ý như <em>&ldquo;Having said that...&rdquo;</em>, <em>&ldquo;Mind you...&rdquo;</em>, <em>&ldquo;On second thought...&rdquo;</em>.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold">•</span>
              <span><strong>Đồng bộ Error Bank:</strong> Các câu trả lời sai đã được tự động phân tích và lưu vào ngân hàng bẫy để ôn tập định kỳ theo thuật toán Spaced Repetition.</span>
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
