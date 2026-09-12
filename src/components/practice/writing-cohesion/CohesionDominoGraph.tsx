"use client";

import React, { useRef, useEffect, useState } from "react";
import { ThemeRhemeSentence, ProgressionPattern } from "@/lib/themeRhemeParser";
import { Network, AlertTriangle, CheckCircle2, ArrowDown } from "lucide-react";

interface CohesionDominoGraphProps {
  sentences: ThemeRhemeSentence[];
}

export const CohesionDominoGraph: React.FC<CohesionDominoGraphProps> = ({
  sentences,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl mb-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-100 flex items-center gap-2">
              <span>Sơ Đồ Dòng Chảy Thông Tin Domino (Information Flow Domino Graph)</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Mô hình hóa chuỗi mắt xích chuyển dịch $R_{'{n-1}'} \rightarrow T_n$ giữa các câu liên tiếp.
            </p>
          </div>
        </div>
      </div>

      {/* Stacked Domino Nodes */}
      <div ref={containerRef} className="space-y-6 relative">
        {sentences.map((sent, idx) => {
          const isBroken = sent.connectionStatusToPrev === "broken";
          const isLinear = sent.connectionStatusToPrev === "linear";
          const isConstant = sent.connectionStatusToPrev === "constant";

          return (
            <div key={`domino_${sent.id}`} className="space-y-2 relative">
              {/* Connector Bridge indicator from previous sentence */}
              {idx > 0 && (
                <div className="flex items-center justify-center py-1">
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold border transition-all ${
                      isLinear
                        ? "bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10"
                        : isConstant
                        ? "bg-cyan-950/60 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10"
                        : "bg-rose-950/60 border-rose-500 text-rose-300 animate-pulse shadow-md shadow-rose-500/10"
                    }`}
                  >
                    <ArrowDown className="w-3 h-3" />
                    <span>
                      {isLinear
                        ? `Mắt xích Bậc Thang: R${idx} \u27F6 T${idx + 1} (Linear)`
                        : isConstant
                        ? `Mắt xích Đồng Trục: T${idx} \u27F6 T${idx + 1} (Constant)`
                        : `GÃY MẠCH THÔNG TIN (Break: R${idx} \u2260 T${idx + 1})`}
                    </span>
                  </div>
                </div>
              )}

              {/* Domino Block (Theme [Amber] + Rheme [Purple]) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 bg-slate-950 p-3.5 rounded-xl border border-slate-800 shadow-md">
                {/* Sentence Number Pin */}
                <div className="md:col-span-1 flex items-center justify-center">
                  <span className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-mono font-bold">
                    S{idx + 1}
                  </span>
                </div>

                {/* Theme Box (Left Anchor) */}
                <div className="md:col-span-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-mono uppercase font-bold text-amber-400">
                      Theme (Known / Đề ngữ)
                    </span>
                    <p className="text-xs font-serif font-semibold text-amber-200 mt-1 leading-relaxed">
                      "{sent.theme}"
                    </p>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-2 font-mono">
                    Keywords: {sent.keywordsInTheme.slice(0, 3).join(", ") || "none"}
                  </div>
                </div>

                {/* Transition Flow Arrow */}
                <div className="md:col-span-1 flex items-center justify-center text-slate-600 font-bold">
                  &rarr;
                </div>

                {/* Rheme Box (Right Core) */}
                <div className="md:col-span-6 p-3 rounded-lg bg-purple-500/10 border border-purple-500/30 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-mono uppercase font-bold text-purple-400">
                      Rheme (New / Thuyết ngữ)
                    </span>
                    <p className="text-xs font-serif text-purple-200 mt-1 leading-relaxed">
                      "{sent.rheme}"
                    </p>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-2 font-mono">
                    Keywords: {sent.keywordsInRheme.slice(0, 4).join(", ") || "none"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
