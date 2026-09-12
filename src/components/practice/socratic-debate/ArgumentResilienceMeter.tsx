"use client";

import React from "react";
import { DialecticalResilienceScore } from "@/lib/socraticDebateEngine";
import { ShieldCheck, Award, Zap, AlertTriangle, Sparkles } from "lucide-react";

interface ArgumentResilienceMeterProps {
  score: DialecticalResilienceScore;
}

export const ArgumentResilienceMeter: React.FC<ArgumentResilienceMeterProps> = ({
  score,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-100 flex items-center gap-2">
              <span>Thước Đo Độ Vững Lập Luận (Argument Resilience Meter)</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 font-mono">
                {score.bandEstimate.split(" (")[0]}
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Đánh giá sức mạnh phản biện, mật độ rào đón học thuật và tính nhất quán của tiền đề.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="text-xs text-slate-400 font-semibold uppercase">Resilience Index:</span>
          <span className="text-xl font-mono font-black text-amber-400">
            {score.overallScore}%
          </span>
        </div>
      </div>

      {/* 3 Metrics Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Rebuttal Power */}
        <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
            <span className="font-semibold text-emerald-400">Sức Bẻ Gãy Luận Cứ:</span>
            <span className="font-mono font-bold text-emerald-300">{score.rebuttalPower}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${score.rebuttalPower}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-500 mt-1.5">Nhượng bộ & Phản pháo C1</div>
        </div>

        {/* Hedging Density */}
        <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
            <span className="font-semibold text-purple-400">Mật Độ Rào Đón (Hedging):</span>
            <span className="font-mono font-bold text-purple-300">{score.hedgingDensity}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-purple-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${score.hedgingDensity}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-500 mt-1.5">Từ ngữ thận trọng học thuật</div>
        </div>

        {/* Premise Solidity */}
        <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
            <span className="font-semibold text-cyan-400">Tính Vững Chắc Tiền Đề:</span>
            <span className="font-mono font-bold text-cyan-300">{score.premiseSolidity}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-cyan-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${score.premiseSolidity}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-500 mt-1.5">Tránh ngụy biện võ đoán</div>
        </div>
      </div>
    </div>
  );
};
