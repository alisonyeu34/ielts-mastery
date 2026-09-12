"use client";

import React from "react";
import { DebateTurn } from "@/lib/socraticDebateEngine";
import {
  GraduationCap,
  User,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface SocraticArenaTurnFlowProps {
  turns: DebateTurn[];
  isScholarTyping: boolean;
  currentRound: 1 | 2 | 3;
}

export const SocraticArenaTurnFlow: React.FC<SocraticArenaTurnFlowProps> = ({
  turns,
  isScholarTyping,
  currentRound,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl mb-6">
      {/* 3-Round Dialectical Step Tracker */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
        {[
          { round: 1, title: "Hiệp 1: Luận Điểm Ban Đầu" },
          { round: 2, title: "Hiệp 2: Phản Biện Socratic" },
          { round: 3, title: "Hiệp 3: Tái Lập Luận C1" },
        ].map((step) => {
          const isDone = currentRound > step.round;
          const isCurrent = currentRound === step.round;

          return (
            <div key={`step_${step.round}`} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all ${
                  isDone
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                    : isCurrent
                    ? "bg-purple-600 text-white ring-2 ring-purple-300 shadow-lg"
                    : "bg-slate-800 text-slate-500"
                }`}
              >
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : step.round}
              </div>
              <span
                className={`text-xs font-bold hidden sm:inline ${
                  isCurrent ? "text-purple-300" : isDone ? "text-emerald-400" : "text-slate-500"
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Conversation Turns Stream */}
      <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {turns.map((turn) => {
          const isScholar = turn.speaker === "scholar";

          return (
            <div
              key={turn.id}
              className={`flex items-start gap-3.5 ${
                isScholar ? "justify-start" : "justify-end"
              }`}
            >
              {isScholar && (
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-purple-600/20">
                  <GraduationCap className="w-5 h-5" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-5 shadow-xl ${
                  isScholar
                    ? "bg-slate-950 border border-purple-500/30 text-slate-200"
                    : "bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/40 text-slate-100"
                }`}
              >
                {/* Speaker Header */}
                <div className="flex items-center justify-between gap-3 pb-2 mb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider font-mono">
                      {isScholar ? "Học Giả Socratic AI" : "Lập Luận Thí Sinh"}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      [Hiệp {turn.round}]
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {turn.timestamp}
                  </span>
                </div>

                {/* Message Body */}
                <p className="text-xs md:text-sm font-serif leading-relaxed whitespace-pre-line">
                  {turn.text}
                </p>

                {/* Badges for User Turn (Lenses, Hedging, Concession) */}
                {!isScholar && (
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-800">
                    {turn.concessionUsed && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Nhượng bộ C1 (Concession)
                      </span>
                    )}

                    {turn.hedgingWords.map((hw, hIdx) => (
                      <span
                        key={`hw_${hIdx}`}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40"
                      >
                        Hedging: "{hw}"
                      </span>
                    ))}

                    {turn.detectedLenses.map((lens) => (
                      <span
                        key={`lens_${lens}`}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase"
                      >
                        {lens} Lens
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {!isScholar && (
                <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shrink-0 shadow-lg shadow-amber-500/20">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          );
        })}

        {/* Scholar Typing Indicator */}
        {isScholarTyping && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-white shrink-0 animate-pulse">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="bg-slate-950 border border-purple-500/30 p-3.5 rounded-2xl flex items-center gap-2 text-xs text-purple-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <span>Học giả Socratic đang bóc tách luận điểm và chuẩn bị phản đề...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
