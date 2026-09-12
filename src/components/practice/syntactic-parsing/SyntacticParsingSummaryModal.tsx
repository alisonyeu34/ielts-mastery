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
  BookOpen
} from "lucide-react";
import { GardenPathChallenge } from "@/lib/syntacticTreeParser";

interface SyntacticParsingSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: GardenPathChallenge;
  puzzleResult: "idle" | "correct" | "wrong" | "timeout";
  userSelectedVerb: string | null;
  isSaved: boolean;
  onSave: () => void;
  onNextChallenge?: () => void;
}

export const SyntacticParsingSummaryModal: React.FC<SyntacticParsingSummaryModalProps> = ({
  isOpen,
  onClose,
  challenge,
  puzzleResult,
  userSelectedVerb,
  isSaved,
  onSave,
  onNextChallenge
}) => {
  if (!isOpen) return null;

  const isSuccess = puzzleResult === "correct";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-emerald-950/50 p-6 md:p-8 text-slate-100 overflow-hidden">
        {/* Glow Header Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-pink-500" />

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
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-200 via-white to-cyan-200">
              Tổng Kết Chẩn Đoán Phân Rã Cú Pháp Passage 3
            </h2>
            <p className="text-xs md:text-sm text-slate-400">
              IELTS Reading Passage 3 Cognitive Syntax Mastery & Garden-Path Trap Disentanglement
            </p>
          </div>
        </div>

        {/* Score & Band Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Estimated Reading Band */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Estimated Reading Band
            </span>
            <div className="flex items-baseline gap-1">
              <span className={`text-4xl font-black ${isSuccess ? "text-emerald-400" : "text-amber-400"}`}>
                {isSuccess ? "8.5" : "6.0"}
              </span>
              <span className="text-sm font-semibold text-slate-400">/ 9.0</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              {isSuccess ? "✅ C1/C2 Syntactic Mastery" : "⚠️ Cần rèn luyện bóc tách nòng cốt"}
            </span>
          </div>

          {/* Precision Score */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Kháng Bẫy Nhận Thức
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-cyan-400">
                {isSuccess ? "100%" : "0%"}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              {isSuccess ? "Đã triệt tiêu bẫy phân từ" : "Bị đánh lừa bởi mệnh đề phụ"}
            </span>
          </div>

          {/* Complexity Level */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Độ Dài & Phức Hợp
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-violet-400">
                {challenge.wordCount}
              </span>
              <span className="text-sm font-semibold text-slate-400">từ</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              {challenge.passageDomain}
            </span>
          </div>
        </div>

        {/* Diagnostic Banner */}
        <div className="mb-6">
          {isSuccess ? (
            <div className="p-3.5 bg-emerald-950/40 border border-emerald-600/40 rounded-xl flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs font-semibold text-emerald-300">
                  Xác định chính xác vị ngữ chính: &ldquo;{challenge.trueMainVerb}&rdquo;
                </div>
                <div className="text-[11px] text-emerald-200/70">
                  Bạn không bị các động từ phân từ rút gọn ở giữa câu làm gián đoạn luồng tư duy.
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3.5 bg-rose-950/40 border border-rose-600/40 rounded-xl">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs mb-1">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Nhận diện sai vị ngữ: {userSelectedVerb ? `"${userSelectedVerb}"` : "Hết giờ"}</span>
              </div>
              <p className="text-xs text-rose-200/80">
                Vị ngữ chính thực sự là: <strong>{challenge.trueMainVerb}</strong>. {challenge.ieltsTrapExplanation}
              </p>
            </div>
          )}
        </div>

        {/* Cambridge Tip */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            Chiến Thuật Đọc Nhanh Passage 3 Chuẩn Cambridge
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            {challenge.cambridgeTip}
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
                : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30"
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
            {onNextChallenge && (
              <button
                onClick={() => {
                  onNextChallenge();
                  onClose();
                }}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                Câu Tiếp Theo
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
