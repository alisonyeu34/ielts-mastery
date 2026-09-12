'use client';

import React from 'react';
import { PsychometricAuditResult } from '@/lib/distractorPsychometrics';
import { Trophy, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface TrapSophisticationGaugeProps {
  auditResult: PsychometricAuditResult | null;
}

export const TrapSophisticationGauge: React.FC<TrapSophisticationGaugeProps> = ({ auditResult }) => {
  if (!auditResult) return null;

  const score = auditResult.overallSophisticationScore;
  const isHigh = score >= 75;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          Trap Sophistication Telemetry (Độ Tinh Vi Khảo Thí)
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold border ${
            isHigh
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
          }`}
        >
          {auditResult.examinerRating}
        </span>
      </div>

      {/* Metric Gauge */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Fidelity Paraphrase Key</span>
          <div className="text-3xl font-black text-emerald-400">
            {auditResult.keyEvaluation.fidelityScore}%
          </div>
          <span className="text-[10px] text-slate-500">Chuẩn xác bảo toàn nghĩa</span>
        </div>

        <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Trap Sophistication</span>
          <div className="text-3xl font-black text-indigo-400">
            {auditResult.overallSophisticationScore}%
          </div>
          <span className="text-[10px] text-slate-500">Độ hiểm hóc phương án nhiễu</span>
        </div>

        <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Cambridge Exam Readiness</span>
          <div className={`text-3xl font-black ${auditResult.isExamReady ? 'text-emerald-400' : 'text-amber-400'}`}>
            {auditResult.isExamReady ? 'READY' : 'REVIEW'}
          </div>
          <span className="text-[10px] text-slate-500">Đủ chuẩn đưa vào đề thi thật</span>
        </div>
      </div>

      {/* Distractor Deep Breakdown */}
      <div className="space-y-2 pt-1">
        <span className="text-xs font-bold text-slate-300 uppercase block">
          Đánh Giá Chi Tiết Từng Phương Án Nhiễu:
        </span>
        <div className="space-y-2">
          {auditResult.distractorEvaluations.map((d, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-1"
            >
              <div className="flex items-center justify-between font-semibold text-slate-200">
                <span className="text-indigo-300">[{d.type.toUpperCase()}]: "{d.text}"</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${d.score >= 70 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                  Điểm bẫy: {d.score}/100
                </span>
              </div>
              <ul className="space-y-0.5 text-[11px] text-slate-400 pl-2">
                {d.feedbacksVi.map((fb, idx) => (
                  <li key={idx}>• {fb}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
