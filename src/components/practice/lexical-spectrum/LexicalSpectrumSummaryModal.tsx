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
import { LexicalConceptCluster, LexicalWordNuance } from "@/lib/lexicalSemanticsEngine";

interface LexicalSpectrumSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  cluster: LexicalConceptCluster;
  activeWord: LexicalWordNuance;
  quizScoreStats: { correct: number; total: number };
  thesaurusAccuracyScore: number;
  isSaved: boolean;
  onSave: () => void;
  onNextCluster?: () => void;
}

export const LexicalSpectrumSummaryModal: React.FC<LexicalSpectrumSummaryModalProps> = ({
  isOpen,
  onClose,
  cluster,
  activeWord,
  quizScoreStats,
  thesaurusAccuracyScore,
  isSaved,
  onSave,
  onNextCluster
}) => {
  if (!isOpen) return null;

  const isHighBand = activeWord.bandLevel >= 7.5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-indigo-950/50 p-6 md:p-8 text-slate-100 overflow-hidden">
        {/* Glow Header */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-indigo-500 to-pink-500" />

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
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-pink-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-white to-pink-200">
              Tổng Kết Chẩn Đoán Sắc Thái Từ Vựng & Collocation
            </h2>
            <p className="text-xs md:text-sm text-slate-400">
              IELTS Writing Task 2 Lexical Resource (Band 8.0 - 8.5+) Precision Analysis
            </p>
          </div>
        </div>

        {/* Stats Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Estimated LR Band */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Estimated LR Band
            </span>
            <div className="flex items-baseline gap-1">
              <span className={`text-4xl font-black ${isHighBand ? "text-emerald-400" : "text-amber-400"}`}>
                {activeWord.bandLevel.toFixed(1)}
              </span>
              <span className="text-sm font-semibold text-slate-400">/ 9.0</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              {isHighBand ? "✅ C1/C2 Nuanced Vocabulary" : "⚠️ Cần nâng cấp độ tinh tế"}
            </span>
          </div>

          {/* Academic Register */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Academic Register
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-cyan-400">
                {activeWord.registerScore}
              </span>
              <span className="text-sm font-semibold text-slate-400">/ 100</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              {activeWord.registerCategory}
            </span>
          </div>

          {/* Collocation Reflex Score */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Độ Chuẩn Collocation
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-pink-400">
                {quizScoreStats.total > 0
                  ? Math.round((quizScoreStats.correct / quizScoreStats.total) * 100)
                  : thesaurusAccuracyScore}%
              </span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              {quizScoreStats.correct}/{quizScoreStats.total} Collocations Đúng
            </span>
          </div>
        </div>

        {/* Selected Word Highlight */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 mb-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">
              Từ khóa đã hiệu chuẩn: <strong className="text-indigo-400">{activeWord.word}</strong> ({activeWord.ipa})
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
              Connotation Score: {activeWord.connotationScore > 0 ? `+${activeWord.connotationScore}` : activeWord.connotationScore}
            </span>
          </div>
          <p className="text-xs text-slate-300 font-serif italic">
            &ldquo;{activeWord.modelAcademicSentence}&rdquo;
          </p>
        </div>

        {/* Cambridge Lexical Guidance */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            Lời Khuyên Của Giám Khảo Chấm Thi (Band 8.0+ LR)
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold">•</span>
              <span><strong>Không tra từ điển đồng nghĩa máy móc:</strong> Một từ đồng nghĩa hiếm khi thay thế được 100% ngữ cảnh của từ gốc mà không làm đổi sắc thái hoặc vi phạm collocation.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold">•</span>
              <span><strong>Tự động hóa thẻ FSRS:</strong> Các cặp Collocation mạnh đã được đồng bộ vào `vocab_matrix` để ôn luyện lặp lại ngắt quãng định kỳ.</span>
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
            {onNextCluster && (
              <button
                onClick={() => {
                  onNextCluster();
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
