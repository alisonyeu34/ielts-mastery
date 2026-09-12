'use client';

import React from 'react';
import { PromptForensicCase } from '@/data/mockPromptForensicsData';
import { ThesisValidationResult } from '@/lib/promptDeconstructionValidator';
import { ShieldCheck, Sparkles, AlertCircle, CheckCircle2, Copy, ArrowRight, Lightbulb } from 'lucide-react';

interface WatertightThesisWorkbenchProps {
  currentCase: PromptForensicCase;
  userThesisInput: string;
  setUserThesisInput: (val: string) => void;
  thesisResult: ThesisValidationResult | null;
  onAuditThesis: () => void;
}

export const WatertightThesisWorkbench: React.FC<WatertightThesisWorkbenchProps> = ({
  currentCase,
  userThesisInput,
  setUserThesisInput,
  thesisResult,
  onAuditThesis
}) => {
  const handleCopySample = () => {
    setUserThesisInput(currentCase.watertightTheses.band85Sample);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Watertight Thesis Lock Matrix
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Xây dựng Câu Luận Đề (Thesis Statement) đanh thép, phản hồi trực diện từ hạn định và triệt tiêu bẫy ba phải.
          </p>
        </div>
        <button
          onClick={handleCopySample}
          className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 px-3 py-1.5 rounded-lg transition-colors"
        >
          <Copy className="w-3.5 h-3.5" />
          Dán Mẫu Band 8.5+
        </button>
      </div>

      {/* Input Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-slate-300">
            Nhập Câu Luận Đề Của Bạn (Thesis Statement):
          </label>
          <span className="text-slate-500">
            {userThesisInput.trim().split(/\s+/).filter(Boolean).length} từ
          </span>
        </div>
        <textarea
          rows={3}
          value={userThesisInput}
          onChange={(e) => setUserThesisInput(e.target.value)}
          placeholder="Ví dụ: While [nhượng bộ luận điểm đối nghịch], this essay firmly maintains that [lập trường cốt lõi phản hồi trực diện từ hạn định]..."
          className="w-full bg-slate-950/90 border border-slate-700 rounded-xl p-4 text-slate-100 text-sm leading-relaxed placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner font-serif"
        />
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>Mẹo: Cấu trúc Concession Thesis (While X, I contend that Y) luôn đạt điểm tối đa TR.</span>
        </div>

        <button
          onClick={onAuditThesis}
          disabled={!userThesisInput.trim()}
          className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg transition-all flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Thẩm Định Luận Đề & Bóc Tách Bẫy
        </button>
      </div>

      {/* Thesis Validation Feedback */}
      {thesisResult && (
        <div
          className={`p-4 rounded-xl border transition-all ${
            thesisResult.isAmbiguousWishyWashy
              ? 'bg-rose-950/40 border-rose-800 text-rose-200'
              : thesisResult.isValid
              ? 'bg-emerald-950/30 border-emerald-800 text-emerald-200'
              : 'bg-amber-950/30 border-amber-800 text-amber-200'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              {thesisResult.isValid ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-400" />
              )}
              <span>
                {thesisResult.isAmbiguousWishyWashy
                  ? 'Cảnh Báo: Bẫy Mở Bài Ba Phải / Thiếu Lập Trường'
                  : thesisResult.isValid
                  ? 'Luận Đề Đạt Chuẩn Band 8.0 - 8.5+ Task Response'
                  : 'Cần Tinh Chỉnh Để Khóa Chặt Luận Điểm'}
              </span>
            </div>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                thesisResult.thesisScore >= 80
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              }`}
            >
              Thesis Score: {thesisResult.thesisScore}/100
            </span>
          </div>

          {/* Strengths */}
          {thesisResult.strengths.length > 0 && (
            <div className="space-y-1 my-2">
              {thesisResult.strengths.map((str, idx) => (
                <div key={idx} className="text-xs text-emerald-300 flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>{str}</span>
                </div>
              ))}
            </div>
          )}

          {/* Warnings */}
          {thesisResult.warnings.length > 0 && (
            <div className="space-y-1 my-2">
              {thesisResult.warnings.map((warn, idx) => (
                <div key={idx} className="text-xs text-rose-300 flex items-start gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>{warn}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Model vs Trap Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Model Band 8.5+ Thesis */}
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Chuẩn Mực Band 8.5+ (Watertight Concession)
            </span>
          </div>
          <p className="text-xs text-emerald-100/90 font-serif leading-relaxed italic">
            "{currentCase.watertightTheses.band85Sample}"
          </p>
          <div className="text-[11px] text-emerald-400/80">
            <span className="font-semibold">Chiến thuật:</span> {currentCase.watertightTheses.band85ConcessionStance}
          </div>
        </div>

        {/* Wishy-Washy Trap */}
        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-rose-400">
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              Bẫy Mở Bài Ba Phải Cần Tránh (Band 6.0 Trap)
            </span>
          </div>
          <p className="text-xs text-rose-200/90 font-serif leading-relaxed italic line-through decoration-rose-500/70">
            "{currentCase.watertightTheses.weakWishyWashyTrap}"
          </p>
          <div className="text-[11px] text-rose-400/80">
            <span className="font-semibold">Phê bình:</span> {currentCase.watertightTheses.weakTrapCritiqueVi}
          </div>
        </div>
      </div>
    </div>
  );
};
