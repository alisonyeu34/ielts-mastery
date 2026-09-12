'use client';

import React from 'react';
import { AdversarialScenario } from '@/data/mockAdversarialSpeakingData';
import { InterruptionStage } from '@/lib/speechInterruptionEngine';
import { Mic, MicOff, Play, Square, Sparkles, Volume2, ShieldAlert, ArrowRight } from 'lucide-react';

interface TacticalInterruptionWorkletProps {
  scenario: AdversarialScenario;
  stage: InterruptionStage;
  elapsedSeconds: number;
  onStart: () => void;
  onManualResume: () => void;
  onComplete: () => void;
  onTriggerInterruptionNow: () => void;
}

export const TacticalInterruptionWorklet: React.FC<TacticalInterruptionWorkletProps> = ({
  scenario,
  stage,
  elapsedSeconds,
  onStart,
  onManualResume,
  onComplete,
  onTriggerInterruptionNow
}) => {
  const isRunning = stage === 'listening_to_candidate' || stage === 'examiner_interrupting' || stage === 'awaiting_recovery' || stage === 'recovered';
  const plan = scenario.interruptionPlan;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm space-y-6">
      {/* Question Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-indigo-400 font-semibold">
          <span>IELTS Speaking Part 3 • Dialectical Paradox Query</span>
          <span className="font-mono bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full">
            Thời lượng: {elapsedSeconds}s
          </span>
        </div>
        <h3 className="text-lg md:text-xl font-bold text-white font-serif leading-snug">
          "{scenario.openingQuestion}"
        </h3>
      </div>

      {/* Suggested Opening Angles */}
      <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
          Gợi Ý Luận Điểm Ban Đầu (Trình bày 20-30s trước khi giám khảo ngắt lời):
        </span>
        <ul className="space-y-1 text-xs text-slate-300">
          {scenario.suggestedOpeningPoints.map((pt, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold">•</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Live Interruption Prompt Box (Shown when examiner speaks or user recovers) */}
      {(stage === 'examiner_interrupting' || stage === 'awaiting_recovery' || stage === 'recovered') && (
        <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-800/60 space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5 uppercase">
              <Volume2 className="w-4 h-4" />
              Lời Giám Khảo Ngắt Lời Chiến Thuật:
            </span>
            <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full font-semibold">
              BẪY NGHỊCH LÝ
            </span>
          </div>
          <p className="text-sm font-serif italic text-rose-100 leading-relaxed font-semibold">
            "{plan.interruptionPrompt}"
          </p>
          <div className="text-xs text-rose-300/90 pt-1 border-t border-rose-900/40">
            <span className="font-bold">Bản chất nghịch lý:</span> {plan.paradoxExplanationVi}
          </div>
        </div>
      )}

      {/* Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-3">
          {!isRunning ? (
            <button
              onClick={onStart}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 shadow-xl transition-all hover:scale-[1.02]"
            >
              <Mic className="w-5 h-5" />
              Bật Micro & Bắt Đầu Trả Lời
            </button>
          ) : (
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              <Square className="w-4 h-4 text-rose-400" />
              Kết Thúc Khảo Thí
            </button>
          )}

          {stage === 'awaiting_recovery' && (
            <button
              onClick={onManualResume}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-lg animate-pulse transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Tôi Đã Xoay Chuyển (Resume Pivot)
            </button>
          )}
        </div>

        {isRunning && stage === 'listening_to_candidate' && (
          <button
            onClick={onTriggerInterruptionNow}
            className="flex items-center gap-1.5 text-xs text-rose-300 hover:text-rose-200 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 px-3 py-1.5 rounded-xl transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Ép Giám Khảo Ngắt Lời Ngay
          </button>
        )}
      </div>
    </div>
  );
};
