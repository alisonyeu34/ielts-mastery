"use client";

import React from "react";
import { SyntacticAnalysisReport } from "@/lib/syntacticParser";
import { Gauge, Sparkles, HelpCircle, Layers } from "lucide-react";

interface InformationDensityGaugeProps {
  analysisReport: SyntacticAnalysisReport;
}

export const InformationDensityGauge: React.FC<InformationDensityGaugeProps> = ({
  analysisReport
}) => {
  const {
    informationDensityIndex,
    densityTier,
    contentWordsCount,
    functionWordsCount,
    totalWords,
    nominalizationWords
  } = analysisReport;

  const gaugeColor =
    informationDensityIndex >= 55
      ? "text-emerald-400"
      : informationDensityIndex >= 40
      ? "text-amber-400"
      : "text-rose-400";

  const barColor =
    informationDensityIndex >= 55
      ? "bg-emerald-500"
      : informationDensityIndex >= 40
      ? "bg-amber-500"
      : "bg-rose-500";

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-emerald-400" />
          <h3 className="font-semibold text-slate-200 text-sm">
            Thước Đo Chỉ Số Mật Độ Thông Tin (Information Density Index - IDI)
          </h3>
        </div>
        <span className="text-xs text-slate-400">
          Target Band 8.0+: <strong className="text-emerald-400 font-mono">&ge; 55%</strong>
        </span>
      </div>

      {/* Main Metric Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
        <div>
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-extrabold font-mono ${gaugeColor}`}>
              {informationDensityIndex}%
            </span>
            <span className="text-xs text-slate-400">
              ({contentWordsCount} từ nội dung / {totalWords} tổng số từ)
            </span>
          </div>
          <span className="text-xs font-semibold text-slate-300 mt-1 block">
            {densityTier}
          </span>
        </div>

        <div className="text-right space-y-1">
          <div className="text-xs text-slate-400">
            Từ Danh Từ Hóa Bắt Được:{" "}
            <strong className="text-indigo-400 font-mono font-bold">
              {nominalizationWords.length}
            </strong>
          </div>
          {nominalizationWords.length > 0 && (
            <div className="flex flex-wrap justify-end gap-1 max-w-xs">
              {nominalizationWords.slice(0, 4).map((w, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 text-[10px] font-mono border border-indigo-500/30"
                >
                  {w}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar with 55% target pin */}
      <div className="space-y-1.5">
        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden relative">
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
            style={{ left: "55%" }}
            title="Ngưỡng C1/C2 Chuẩn Khảo Thí (55%)"
          />
          <div
            className={`h-3 rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${Math.min(informationDensityIndex, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-slate-500">
          <span>0% (Văn nói)</span>
          <span className="text-emerald-400 font-bold">55% Target (C1/C2 Academic)</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};
