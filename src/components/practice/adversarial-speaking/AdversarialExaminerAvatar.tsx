'use client';

import React from 'react';
import { AdversarialScenario } from '@/data/mockAdversarialSpeakingData';
import { InterruptionStage } from '@/lib/speechInterruptionEngine';
import { User, Volume2, Mic, AlertCircle, Sparkles } from 'lucide-react';

interface AdversarialExaminerAvatarProps {
  scenario: AdversarialScenario;
  stage: InterruptionStage;
  micVolume: number;
}

export const AdversarialExaminerAvatar: React.FC<AdversarialExaminerAvatarProps> = ({
  scenario,
  stage,
  micVolume
}) => {
  const isSpeaking = stage === 'examiner_interrupting';
  const isListening = stage === 'listening_to_candidate' || stage === 'recovered';
  const isInterruptionPending = stage === 'awaiting_recovery';

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm relative overflow-hidden flex flex-col items-center text-center space-y-4">
      {/* Background Pulse Glow */}
      <div
        className={`absolute -inset-10 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-500 ${
          isSpeaking
            ? 'bg-rose-500 opacity-40 scale-110'
            : isInterruptionPending
            ? 'bg-amber-500 opacity-30 scale-105'
            : isListening
            ? 'bg-indigo-500 opacity-30'
            : 'bg-slate-700 opacity-10'
        }`}
      />

      {/* Avatar Circle */}
      <div className="relative">
        <div
          className={`w-28 h-28 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative shadow-2xl ${
            isSpeaking
              ? 'border-rose-500 bg-rose-950/40 ring-4 ring-rose-500/30 scale-105'
              : isInterruptionPending
              ? 'border-amber-500 bg-amber-950/40 ring-4 ring-amber-500/30 animate-pulse'
              : isListening
              ? 'border-indigo-500 bg-indigo-950/40 ring-2 ring-indigo-500/20'
              : 'border-slate-700 bg-slate-950/80'
          }`}
        >
          <div className="w-24 h-24 rounded-full bg-slate-900 flex flex-col items-center justify-center text-slate-300">
            <User className="w-10 h-10 text-indigo-400 mb-1" />
            <span className="text-[10px] font-mono text-slate-400">EXAMINER</span>
          </div>
        </div>

        {/* Status Badge Pin */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap">
          {isSpeaking && (
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-rose-500 text-white shadow-lg flex items-center gap-1.5 animate-bounce">
              <Volume2 className="w-3.5 h-3.5 animate-spin" />
              Đang Ngắt Lời Chiến Thuật...
            </span>
          )}
          {isInterruptionPending && (
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 shadow-lg flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              Đang Chờ Phản Ứng (FRL Timer)!
            </span>
          )}
          {isListening && (
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5" />
              Đang Lắng Nghe Bạn Nói ({micVolume}%)
            </span>
          )}
          {stage === 'idle' && (
            <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-slate-800 text-slate-400 border border-slate-700">
              Sẵn Sàng Khảo Thí
            </span>
          )}
        </div>
      </div>

      {/* Examiner Bio */}
      <div className="pt-2 space-y-1">
        <h4 className="text-base font-bold text-white">{scenario.examiner.name}</h4>
        <p className="text-xs text-indigo-400 font-medium">{scenario.examiner.title}</p>
        <p className="text-[11px] text-slate-400 max-w-sm italic">
          "{scenario.examiner.demeanor}"
        </p>
      </div>

      {/* Accent & Style Tags */}
      <div className="flex flex-wrap justify-center gap-2 pt-1">
        <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
          Accent: {scenario.examiner.accent}
        </span>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
          Paradox Trap Specialist
        </span>
      </div>
    </div>
  );
};
