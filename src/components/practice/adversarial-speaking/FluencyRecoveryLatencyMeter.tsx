'use client';

import React from 'react';
import { InterruptionStage, InterruptionEvaluation, evaluateFluencyRecovery } from '@/lib/speechInterruptionEngine';
import { Timer, Zap, CheckCircle2, AlertTriangle, Flame } from 'lucide-react';

interface FluencyRecoveryLatencyMeterProps {
  stage: InterruptionStage;
  recoveryTimerMs: number;
  measuredLatencyMs: number | null;
  evaluationResult: InterruptionEvaluation | null;
}

export const FluencyRecoveryLatencyMeter: React.FC<FluencyRecoveryLatencyMeterProps> = ({
  stage,
  recoveryTimerMs,
  measuredLatencyMs,
  evaluationResult
}) => {
  const currentMs = measuredLatencyMs !== null ? measuredLatencyMs : recoveryTimerMs;
  const currentSeconds = (currentMs / 1000).toFixed(2);

  // Latency benchmark colors
  const isOptimal = currentMs < 1200;
  const isAcceptable = currentMs >= 1200 && currentMs <= 2500;
  const isDelayed = currentMs > 2500;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Timer className="w-5 h-5 text-indigo-400" />
            Fluency Recovery Latency (FRL) Meter
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Đo lường độ trễ phục hồi mạch nói sau khi bị giám khảo ngắt lời.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-slate-400">&lt;1.2s: Band 8.5+</span>
        </div>
      </div>

      {/* Latency Gauge Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Millisecond Display */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1 relative overflow-hidden">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            {stage === 'awaiting_recovery' ? 'Đang Đếm Độ Trễ Phục Hồi...' : 'Độ Trễ Phục Hồi Đo Được'}
          </span>
          <div
            className={`text-4xl md:text-5xl font-extrabold font-mono tracking-tight transition-colors ${
              currentMs === 0
                ? 'text-slate-500'
                : isOptimal
                ? 'text-emerald-400'
                : isAcceptable
                ? 'text-amber-400'
                : 'text-rose-400'
            }`}
          >
            {currentSeconds}s
            <span className="text-lg text-slate-500 ml-1">({currentMs}ms)</span>
          </div>

          {stage === 'awaiting_recovery' && (
            <div className="absolute inset-x-0 bottom-0 h-1 bg-amber-500 animate-pulse" />
          )}
        </div>

        {/* Band Assessment Badge */}
        <div className="space-y-2">
          {evaluationResult ? (
            <div className={`p-4 rounded-2xl border ${evaluationResult.colorClass} space-y-1.5`}>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  {evaluationResult.ratingLabel}
                </span>
                <span className="font-mono">{measuredLatencyMs}ms</span>
              </div>
              <p className="text-xs leading-relaxed font-medium">
                {evaluationResult.feedbackVi}
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 text-xs text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-300">Quy chuẩn chấm Fluency Part 3:</span>
              <ul className="mt-1.5 space-y-1 text-[11px]">
                <li className="text-emerald-400">• Dưới 1.2s: Seamless Pivot (Band 8.5+ F&C)</li>
                <li className="text-amber-400">• 1.2s – 2.5s: Competent Recovery (Band 7.0 - 7.5)</li>
                <li className="text-rose-400">• Trên 2.5s: Hesitation / Cognitive Breakdown (Band 6.0-)</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
