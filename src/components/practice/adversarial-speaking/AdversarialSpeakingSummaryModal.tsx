'use client';

import React from 'react';
import { AdversarialScenario } from '@/data/mockAdversarialSpeakingData';
import { InterruptionEvaluation } from '@/lib/speechInterruptionEngine';
import {
  Trophy,
  Zap,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Database,
  X
} from 'lucide-react';
import Link from 'next/link';

interface AdversarialSpeakingSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: AdversarialScenario;
  measuredLatencyMs: number | null;
  evaluationResult: InterruptionEvaluation | null;
  onReset: () => void;
  onNextScenario: () => void;
}

export const AdversarialSpeakingSummaryModal: React.FC<AdversarialSpeakingSummaryModalProps> = ({
  isOpen,
  onClose,
  scenario,
  measuredLatencyMs,
  evaluationResult,
  onReset,
  onNextScenario
}) => {
  if (!isOpen || !evaluationResult) return null;

  const latencySeconds = ((measuredLatencyMs || 0) / 1000).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500/20 to-indigo-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <Trophy className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Báo Cáo Tác Chiến Ngắt Lời Oral Combat
              </h3>
              <p className="text-xs text-slate-400">
                {scenario.topicTitle} • Giám khảo {scenario.examiner.name}
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
            <span className="text-xs text-slate-400 uppercase font-semibold">Fluency Latency</span>
            <div className="text-2xl font-bold text-indigo-400 font-mono">{latencySeconds}s</div>
            <span className="text-[11px] text-slate-500">{measuredLatencyMs} ms</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center space-y-1">
            <span className="text-xs text-slate-400 uppercase font-semibold">Fluency Rating</span>
            <div className="text-sm font-bold text-emerald-400 mt-1">{evaluationResult.ratingLabel.split(' ')[0]}</div>
            <span className="text-[11px] text-slate-500">Phản xạ xoay chuyển</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center space-y-1">
            <span className="text-xs text-slate-400 uppercase font-semibold">F&C Band Target</span>
            <div className="text-2xl font-bold text-amber-400">
              {evaluationResult.latencyBand === 'band_8_5_plus'
                ? '8.5 - 9.0'
                : evaluationResult.latencyBand === 'band_7_5'
                ? '7.5 - 8.0'
                : evaluationResult.latencyBand === 'band_6_5'
                ? '6.5'
                : '5.5'}
            </div>
            <span className="text-[11px] text-slate-500">Fluency & Coherence</span>
          </div>
        </div>

        {/* Evaluation Banner */}
        <div className={`p-4 rounded-2xl border ${evaluationResult.colorClass} space-y-2`}>
          <div className="flex items-center gap-2 font-bold text-sm">
            <Zap className="w-5 h-5" />
            <span>{evaluationResult.ratingLabel}</span>
          </div>
          <p className="text-xs leading-relaxed">
            {evaluationResult.feedbackVi}
          </p>
          <div className="text-[11px] opacity-90 pt-1 border-t border-current/20">
            <span className="font-semibold">Tác động đến điểm thi:</span> {evaluationResult.fluencyImpact}
          </div>
        </div>

        {/* Model Pivot Recap */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
          <span className="text-xs font-semibold text-emerald-400 uppercase">
            Mẫu Xoay Chuyển Chuẩn Mực Band 8.5+:
          </span>
          <p className="text-xs font-serif italic text-slate-200 leading-relaxed">
            "{scenario.interruptionPlan.modelBand85PivotResponse}"
          </p>
        </div>

        {/* IndexedDB sync telemetry */}
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-400" />
            <span>Đã ghi nhật ký vào <strong>IndexedDB (practice_logs & error_bank)</strong></span>
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
            Thử Thách Lại Với Giám Khảo
          </button>

          <div className="flex items-center gap-2">
            <Link
              href="/practice/prompt-deconstruction"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 transition-colors"
            >
              Quay Lại Step 93: Task 2 Forensics
            </Link>

            <button
              onClick={() => {
                onNextScenario();
                onClose();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 shadow-lg transition-all"
            >
              Kịch Bản Kế Tiếp
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
