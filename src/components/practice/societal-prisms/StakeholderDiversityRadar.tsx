"use client";

import React from "react";
import { PrismAnalysisResult, SOCIETAL_PRISMS } from "@/lib/societalPrismsAnalyzer";

interface StakeholderDiversityRadarProps {
  analysis: PrismAnalysisResult | null;
}

export const StakeholderDiversityRadar: React.FC<StakeholderDiversityRadarProps> = ({
  analysis
}) => {
  const prismMap = new Map(SOCIETAL_PRISMS.map((p) => [p.id, p]));

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-base">
              📡
            </span>
            <h3 className="text-base font-bold text-white">
              Radar Đo Mật Độ Đa Chủ Thể (Stakeholder Diversity Radar)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Thuật toán NLP quét tự động các thuật ngữ thể chế vĩ mô xuất hiện trong bài nói
          </p>
        </div>

        {analysis && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Institutional Breadth:</span>
            <span className="font-mono text-lg font-bold text-cyan-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
              {analysis.breadthScore}/100
            </span>
          </div>
        )}
      </div>

      {/* 6 Prisms Detection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {SOCIETAL_PRISMS.map((prism) => {
          const match = analysis?.detectedPrisms.find((p) => p.prismId === prism.id);
          const isActivated = !!match;

          return (
            <div
              key={prism.id}
              className={`p-4 rounded-2xl border transition-all ${
                isActivated
                  ? 'bg-slate-950/90 border-cyan-500/50 shadow-lg ring-1 ring-cyan-500/30'
                  : 'bg-slate-950/40 border-slate-800/80 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{prism.icon}</span>
                  <span>{prism.shortLabel}</span>
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  isActivated
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {isActivated ? `✓ ${match.count} từ` : 'Chưa kích hoạt'}
                </span>
              </div>

              {isActivated ? (
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 block">Thuật ngữ bắt được:</span>
                  <div className="flex flex-wrap gap-1">
                    {match.matches.map((kw, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-[10px] text-slate-500 italic">
                  Gợi ý: {prism.keyTerms.slice(0, 3).join(', ')}...
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
