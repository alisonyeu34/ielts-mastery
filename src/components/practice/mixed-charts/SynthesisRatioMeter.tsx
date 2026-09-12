"use client";

import React from "react";
import { MixedChartValidationResult } from "@/lib/mixedChartValidator";
import { Gauge, AlertTriangle, CheckCircle2, TrendingUp, HelpCircle } from "lucide-react";

interface SynthesisRatioMeterProps {
  validationResult: MixedChartValidationResult;
}

export const SynthesisRatioMeter: React.FC<SynthesisRatioMeterProps> = ({
  validationResult
}) => {
  const {
    synthesisRatio,
    targetRatioMet,
    synthesisSentenceCount,
    totalSentences,
    isolatedDumpingDetected,
    dualOverview
  } = validationResult;

  const ratioColor =
    synthesisRatio >= 40
      ? "text-emerald-400"
      : synthesisRatio >= 25
      ? "text-amber-400"
      : "text-rose-400";

  const barColor =
    synthesisRatio >= 40
      ? "bg-emerald-500"
      : synthesisRatio >= 25
      ? "bg-amber-500"
      : "bg-rose-500";

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-emerald-400" />
          <h3 className="font-semibold text-slate-200 text-sm">
            Cross-Graph Synthesis Ratio Meter
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-400">Target:</span>
          <span className="font-bold text-emerald-400">&ge; 40%</span>
        </div>
      </div>

      {/* Main Ratio Metric */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-3xl font-extrabold font-mono ${ratioColor}`}>
              {synthesisRatio}%
            </span>
            <span className="text-xs text-slate-400">
              ({synthesisSentenceCount}/{totalSentences} câu đối sánh chéo)
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {targetRatioMet
              ? "Xuất sắc! Đạt chuẩn tỷ lệ tổng hợp đa biểu đồ Band 8.0+."
              : "Chưa đạt! Cần tăng thêm câu liên kết tương quan giữa 2 biểu đồ."}
          </p>
        </div>

        {/* Dual Overview Indicator Badge */}
        <div className="text-right">
          <div
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
              dualOverview.isDualOverviewValid
                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                : "bg-amber-500/10 text-amber-300 border-amber-500/30"
            }`}
          >
            {dualOverview.isDualOverviewValid ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5" />
            )}
            <span>Dual Overview {dualOverview.isDualOverviewValid ? "Chuẩn" : "Cần Bổ Sung"}</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {dualOverview.addressesChart1 && dualOverview.addressesChart2
              ? "Bao quát cả C1 + C2"
              : "Chưa đủ 2 biểu đồ"}
          </div>
        </div>
      </div>

      {/* Visual Progress Bar */}
      <div className="space-y-1.5">
        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden relative">
          {/* Target marker at 40% */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white/80 z-10"
            style={{ left: "40%" }}
            title="Ngưỡng chuẩn Band 8.0 (40%)"
          />
          <div
            className={`h-3 rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${Math.min(synthesisRatio, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>0% (Isolated Dumping)</span>
          <span className="text-emerald-400 font-bold">40% Target (Synthesis)</span>
          <span>100%</span>
        </div>
      </div>

      {/* Warning if Isolated Dumping is detected */}
      {isolatedDumpingDetected && (
        <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5 animate-pulse">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block">Cảnh Báo Bẫy Liệt Kê Tách Biệt (Isolated Data Dumping)!</span>
            Bài viết của bạn đang tả hoàn toàn Biểu đồ 1 ở Body 1 và Biểu đồ 2 ở Body 2 mà không có liên từ so sánh chéo. Giám khảo sẽ khống chế điểm Task Achievement ở mức 5.0 - 6.0.
          </div>
        </div>
      )}
    </div>
  );
};
