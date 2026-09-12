"use client";

import React from "react";
import { ERREvaluation } from "@/lib/antiSubvocalizationEngine";
import { Gauge, Target, Award, Brain } from "lucide-react";

interface EffectiveReadingRateGaugeProps {
  evaluation: ERREvaluation;
}

export const EffectiveReadingRateGauge: React.FC<EffectiveReadingRateGaugeProps> = ({
  evaluation,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-100 flex items-center gap-2">
              <span>Chỉ Số Tốc Độ Đọc Hiệu Dụng (Effective Reading Rate - ERR)</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-mono">
                ERR = WPM &times; Accuracy
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Mục tiêu vượt ngưỡng Band 7.5+ Reading: <strong>ERR &ge; 220 từ/phút</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-amber-300 font-bold">{evaluation.bandEstimate}</span>
        </div>
      </div>

      {/* 3 Metrics Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 font-semibold uppercase mb-0.5">
            Raw Pacing WPM:
          </div>
          <div className="text-xl font-black text-amber-400 font-mono">
            {evaluation.rawWpm}
          </div>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 font-semibold uppercase mb-0.5">
            Độ Hiểu Nhận Thức:
          </div>
          <div className="text-xl font-black text-cyan-400 font-mono">
            {evaluation.comprehensionPercentage}%
          </div>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 font-semibold uppercase mb-0.5">
            Chỉ Số ERR Thực Tế:
          </div>
          <div
            className={`text-xl font-black font-mono ${
              evaluation.effectiveReadingRate >= 220 ? "text-emerald-400" : "text-amber-400"
            }`}
          >
            {evaluation.effectiveReadingRate} <span className="text-[10px] font-normal text-slate-500">wpm</span>
          </div>
        </div>
      </div>
    </div>
  );
};
