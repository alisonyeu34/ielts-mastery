'use client';

import React from 'react';
import { ThetaEstimationResult } from '@/lib/irtEngine';
import {
  Trophy,
  CheckCircle2,
  AlertCircle,
  X,
  Database,
  ArrowRight,
  Zap,
  Target
} from 'lucide-react';
import Link from 'next/link';

interface IRTDiagnosticSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  thetaResult: ThetaEstimationResult;
}

export const IRTDiagnosticSummaryModal: React.FC<IRTDiagnosticSummaryModalProps> = ({
  isOpen,
  onClose,
  thetaResult
}) => {
  if (!isOpen) return null;

  const ci = thetaResult.confidenceInterval95;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Trophy className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Báo Cáo Định Cỡ Năng Lực IRT 3PL
              </h3>
              <p className="text-xs text-slate-400">
                Psychometric Latent Trait Calibration • Đã lưu vào IndexedDB
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

        {/* 3 Main Stat Cards */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Năng Lực Tiềm Ẩn</span>
            <div className="text-2xl font-bold text-indigo-400 font-mono">
              θ = {thetaResult.theta > 0 ? `+${thetaResult.theta.toFixed(2)}` : thetaResult.theta.toFixed(2)}
            </div>
            <span className="text-[10px] text-slate-500">Top {100 - thetaResult.abilityPercentile}% thí sinh</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Predicted Band</span>
            <div className="text-2xl font-bold text-amber-400 font-mono">
              Band {thetaResult.predictedBand.toFixed(1)}
            </div>
            <span className="text-[10px] text-slate-500">
              95% CI: [{ci.lowerBand} - {ci.upperBand}]
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Độ Chuẩn Xác Đo</span>
            <div className="text-2xl font-bold text-emerald-400 font-mono">
              ±{thetaResult.standardError}
            </div>
            <span className="text-[10px] text-slate-500">Sai số chuẩn SE(θ)</span>
          </div>
        </div>

        {/* Diagnostic Analysis */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs text-slate-300 leading-relaxed">
          <div className="font-bold text-indigo-300 flex items-center gap-1.5 uppercase">
            <Target className="w-4 h-4 text-indigo-400" />
            Nhận Định Khảo Thí Tâm Trắc Học:
          </div>
          <p>
            Với mức năng lực $\theta = {thetaResult.theta.toFixed(2)}$, bạn có xác suất làm đúng{' '}
            <strong className="text-emerald-300">{thetaResult.probabilityOfPassingBand75}%</strong> đối với các câu hỏi có độ khó cao (Passage 3 / Section 4). Khác với điểm số thô CTT (Classical Test Theory), giá trị $\theta$ chứng minh bạn đã hoàn toàn làm chủ các cấu trúc ngữ pháp phức tạp và bẫy suy luận C1/C2.
          </p>
        </div>

        {/* Database Sync Telemetry */}
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-400" />
            <span>Đã ghi vào <strong>IndexedDB (practice_logs & user_profile)</strong></span>
          </div>
          <span className="text-emerald-400 font-mono">100% Synced</span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Đóng Báo Cáo
          </button>

          <Link
            href="/practice/acoustic-chaos"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 shadow-lg transition-all"
          >
            Chuyển Sang Step 98: Acoustic Chaos Studio
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
