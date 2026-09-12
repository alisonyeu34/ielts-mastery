"use client";

import React from "react";
import { DataCluster } from "@/data/mockMixedChartsData";
import { Layers, Sparkles, ArrowRightLeft, CheckCircle2 } from "lucide-react";

interface AsymmetricLassoClusteringProps {
  clusters: DataCluster[];
  activeClusterId: string | null;
  onSelectCluster: (clusterId: string) => void;
  onApplyClusterPrompt: (observation: string) => void;
}

export const AsymmetricLassoClustering: React.FC<AsymmetricLassoClusteringProps> = ({
  clusters,
  activeClusterId,
  onSelectCluster,
  onApplyClusterPrompt
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <h3 className="font-semibold text-slate-200 text-sm">
            Asymmetric Data Clustering & Correlation Lasso
          </h3>
        </div>
        <span className="text-xs text-indigo-300 bg-indigo-950/60 border border-indigo-800/60 px-2.5 py-0.5 rounded-full font-medium">
          Band 8.0+ Correlation Method
        </span>
      </div>

      <p className="text-xs text-slate-400 mb-4 leading-relaxed">
        Tránh bẫy tả tách biệt từng biểu đồ (Isolated Dumping). Hãy gom các cụm dữ liệu có
        <strong> mối tương quan trực tiếp</strong> (Đồng biến, Nghịch biến, hoặc Phân cực cực đoan)
        giữa Biểu đồ 1 &amp; Biểu đồ 2:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clusters.map((cluster) => {
          const isActive = activeClusterId === cluster.id;
          return (
            <div
              key={cluster.id}
              onClick={() => onSelectCluster(cluster.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? "bg-indigo-950/40 border-indigo-500 ring-1 ring-indigo-500 shadow-lg shadow-indigo-500/10"
                  : "bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    <h4 className="font-semibold text-slate-100 text-xs">{cluster.title}</h4>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Body {cluster.suggestedBodyParagraph}
                  </span>
                </div>

                {/* Point Linking */}
                <div className="space-y-1.5 mb-3 text-[11px] bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
                  <div className="text-indigo-300 flex items-center gap-1.5">
                    <span className="font-semibold text-[10px] px-1 bg-indigo-900/60 rounded">C1</span>
                    <span>{cluster.chart1Points.join(" | ")}</span>
                  </div>
                  <div className="flex items-center justify-center text-slate-500 py-0.5">
                    <ArrowRightLeft className="w-3 h-3" />
                  </div>
                  <div className="text-emerald-300 flex items-center gap-1.5">
                    <span className="font-semibold text-[10px] px-1 bg-emerald-900/60 rounded">C2</span>
                    <span>{cluster.chart2Points.join(" | ")}</span>
                  </div>
                </div>

                {/* Synthesis Observation */}
                <p className="text-xs text-slate-300 italic mb-3 leading-relaxed">
                  &ldquo;{cluster.synthesisObservation}&rdquo;
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-[11px] text-amber-400 font-mono">
                  <Sparkles className="w-3 h-3" />
                  <span>{cluster.higherOrderLexis}</span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onApplyClusterPrompt(cluster.synthesisObservation);
                  }}
                  className="px-2.5 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-[11px] transition-colors"
                >
                  Dùng Cụm Này
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
