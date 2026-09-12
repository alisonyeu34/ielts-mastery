"use client";

import React from "react";
import { Gauge, ShieldCheck, AlertTriangle, Sparkles } from "lucide-react";
import { LexicalWordNuance } from "@/lib/lexicalSemanticsEngine";

interface AcademicRegisterGaugeProps {
  activeWord: LexicalWordNuance;
}

export const AcademicRegisterGauge: React.FC<AcademicRegisterGaugeProps> = ({
  activeWord
}) => {
  const score = activeWord.registerScore;

  let gaugeColor = "text-rose-400 bg-rose-500";
  let statusText = "Văn phong thông tục / Hội thoại (Không dùng trong Task 2)";

  if (score >= 86) {
    gaugeColor = "text-indigo-400 bg-indigo-500";
    statusText = "Chuẩn mực học thuật đỉnh cao C2 (High Academic Monograph)";
  } else if (score >= 66) {
    gaugeColor = "text-emerald-400 bg-emerald-500";
    statusText = "Văn phong học thuật trang trọng (Formal Academic C1)";
  } else if (score >= 41) {
    gaugeColor = "text-amber-400 bg-amber-500";
    statusText = "Văn phong trung tính đời sống (Chỉ hợp Speaking Part 1)";
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Thước Đo Độ Trang Trọng Học Thuật (Academic Register Gauge)
            </h3>
            <p className="text-[11px] text-slate-400">
              Kiểm soát phong cách ngôn từ từ Colloquial &rarr; Formal Academic Monograph
            </p>
          </div>
        </div>

        <span className="text-sm font-black font-mono text-cyan-400">
          {score}/100
        </span>
      </div>

      {/* Progress Bar Gauge */}
      <div className="space-y-2">
        <div className="w-full h-3.5 bg-slate-950 rounded-full p-0.5 border border-slate-800 overflow-hidden flex">
          <div
            className={`h-full rounded-full transition-all duration-500 shadow-md ${gaugeColor}`}
            style={{ width: `${score}%` }}
          />
        </div>

        <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-1">
          <span>0 (Street Slang)</span>
          <span>50 (General Spoken)</span>
          <span>75 (Academic C1)</span>
          <span className="text-indigo-400">100 (C2 Monograph)</span>
        </div>
      </div>

      {/* Register Evaluation Card */}
      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
        {score >= 66 ? (
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
        )}
        <div>
          <h4 className="text-xs font-bold text-white">
            {activeWord.registerCategory}
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {statusText}
          </p>
        </div>
      </div>
    </div>
  );
};
