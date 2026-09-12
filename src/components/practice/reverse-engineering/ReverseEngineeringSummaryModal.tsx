'use client';

import React from 'react';
import { PassageEngineeringCase } from '@/data/mockReverseEngineeringData';
import { PsychometricAuditResult } from '@/lib/distractorPsychometrics';
import {
  Trophy,
  CheckCircle2,
  AlertCircle,
  X,
  RotateCcw,
  ArrowRight,
  Database,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

interface ReverseEngineeringSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCase: PassageEngineeringCase;
  auditResult: PsychometricAuditResult | null;
  onReset: () => void;
  onNextCase: () => void;
}

export const ReverseEngineeringSummaryModal: React.FC<ReverseEngineeringSummaryModalProps> = ({
  isOpen,
  onClose,
  currentCase,
  auditResult,
  onReset,
  onNextCase
}) => {
  if (!isOpen || !auditResult) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Trophy className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Báo Cáo Thẩm Định Chế Tác Đề Khảo Thí
              </h3>
              <p className="text-xs text-slate-400">
                {currentCase.cambridgeRef} • Đã lưu vào IndexedDB
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center space-y-1">
            <span className="text-xs text-slate-400 uppercase font-semibold">Paraphrase Key</span>
            <div className="text-2xl font-bold text-emerald-400">
              {auditResult.keyEvaluation.fidelityScore}%
            </div>
            <span className="text-[11px] text-slate-500">Độ chuẩn xác đáp án đúng</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center space-y-1">
            <span className="text-xs text-slate-400 uppercase font-semibold">Trap Score</span>
            <div className="text-2xl font-bold text-indigo-400">
              {auditResult.overallSophisticationScore}%
            </div>
            <span className="text-[11px] text-slate-500">Độ tinh vi phương án nhiễu</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center space-y-1">
            <span className="text-xs text-slate-400 uppercase font-semibold">Item Readiness</span>
            <div className="text-sm font-bold text-amber-400 mt-1">
              {auditResult.examinerRating.split(' ')[0]}
            </div>
            <span className="text-[11px] text-slate-500">Chuẩn Cambridge</span>
          </div>
        </div>

        {/* Strengths & Recommendations */}
        <div className="space-y-3">
          {auditResult.strengths.length > 0 && (
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Điểm Sáng Khảo Thí
              </div>
              <ul className="space-y-1 text-xs text-emerald-200">
                {auditResult.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {auditResult.recommendations.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/50 space-y-2">
              <div className="text-xs font-bold text-amber-400 uppercase flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                Gợi Ý Tăng Độ Hiểm Hóc
              </div>
              <ul className="space-y-1 text-xs text-amber-200">
                {auditResult.recommendations.map((r, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-400">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Database telemetry */}
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-400" />
            <span>Đã ghi vào <strong>IndexedDB (practice_logs & error_bank)</strong></span>
          </div>
          <span className="text-emerald-400 font-mono">100% Synced</span>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={() => {
              onReset();
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Chế Tác Lại Bài Này
          </button>

          <div className="flex items-center gap-2">
            <Link
              href="/practice/cognitive-stamina"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 transition-colors"
            >
              Chuyển Sang Step 96: 3-Hour Stamina
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => {
                onNextCase();
                onClose();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 shadow-lg transition-all"
            >
              Đoạn Văn Kế Tiếp
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
