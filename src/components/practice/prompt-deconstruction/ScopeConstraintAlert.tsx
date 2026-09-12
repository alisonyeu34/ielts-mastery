'use client';

import React from 'react';
import { PromptForensicCase } from '@/data/mockPromptForensicsData';
import { AlertTriangle, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';

interface ScopeConstraintAlertProps {
  currentCase: PromptForensicCase;
  missedQualifiers?: string[];
  onOpenDriftModal: () => void;
}

export const ScopeConstraintAlert: React.FC<ScopeConstraintAlertProps> = ({
  currentCase,
  missedQualifiers = [],
  onOpenDriftModal
}) => {
  const qualifiers = currentCase.components.limitingQualifiers;

  return (
    <div className="bg-rose-950/30 border border-rose-900/50 rounded-2xl p-5 backdrop-blur-sm space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 text-rose-400 font-bold">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
          <span>Bẫy Lạc Đề Ngầm (Stealth Drift Forensics)</span>
        </div>
        <button
          onClick={onOpenDriftModal}
          className="flex items-center gap-1 text-xs font-semibold text-rose-300 hover:text-rose-200 underline decoration-rose-500/50 hover:decoration-rose-300 transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          Giải phẫu chi tiết bẫy
        </button>
      </div>

      <p className="text-xs text-rose-200/90 leading-relaxed">
        {currentCase.stealthDriftAnalysis.trapSummaryVi}
      </p>

      {/* Qualifier Badges */}
      <div className="space-y-2">
        <span className="text-[11px] font-semibold text-rose-300 uppercase tracking-wider block">
          Từ Hạn Định & Phạm Vi Cốt Tử Cần Khóa Chặt:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {qualifiers.map((q, idx) => {
            const isMissed = missedQualifiers.some((mq) =>
              q.text.toLowerCase().includes(mq.toLowerCase()) || mq.toLowerCase().includes(q.text.toLowerCase())
            );

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border transition-all ${
                  isMissed
                    ? 'bg-rose-900/40 border-rose-500 shadow-md ring-1 ring-rose-500'
                    : 'bg-slate-950/60 border-rose-900/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold text-rose-300">
                  <span>"{q.text}"</span>
                  {isMissed && (
                    <span className="text-[10px] bg-rose-500/30 text-rose-200 border border-rose-500/50 px-2 py-0.5 rounded-full">
                      BỎ SÓT!
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                  {q.trapExplanation}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Band 6.0 Trap Warning */}
      <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-2.5 text-xs text-amber-200">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-amber-300">Vì sao bẫy này khống chế bài viết ở Band 6.0 TR?</span>{' '}
          {currentCase.stealthDriftAnalysis.whyItCapsBand6}
        </div>
      </div>
    </div>
  );
};
