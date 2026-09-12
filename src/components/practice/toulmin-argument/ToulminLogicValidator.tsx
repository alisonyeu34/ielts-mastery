"use client";

import React from "react";
import {
  ShieldCheck,
  AlertTriangle,
  Award,
  Sparkles,
  Flame,
  CheckCircle2
} from "lucide-react";
import { ToulminValidationReport } from "@/lib/toulminStructureValidator";

interface ToulminLogicValidatorProps {
  report: ToulminValidationReport;
  onOpenPEELModal: () => void;
}

export const ToulminLogicValidator: React.FC<ToulminLogicValidatorProps> = ({
  report,
  onOpenPEELModal
}) => {
  const isHighBand = report.taskResponseEstimatedBand >= 8.0;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Bộ Thẩm Định Tính Toàn Vẹn Luận Điểm (Logic Resilience Auditor)
            </h3>
            <p className="text-[11px] text-slate-400">
              Phát hiện lỗi khẳng định võ đoán (Bald Assertion) & bẫy tự phản bội (Self-Undermining)
            </p>
          </div>
        </div>

        <button
          onClick={onOpenPEELModal}
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-indigo-300 border border-indigo-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          So Sánh PEEL vs Toulmin
        </button>
      </div>

      {/* Score & Band Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Logic Resilience Score */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
              Độ Bền Vững Luận Lý (Logic Score)
            </span>
            <span className="text-2xl font-black text-indigo-400">
              {report.logicResilienceScore}/100
            </span>
          </div>
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
              report.logicResilienceScore >= 80
                ? "bg-emerald-950 text-emerald-300 border-emerald-500/50"
                : "bg-amber-950 text-amber-300 border-amber-500/50"
            }`}
          >
            {report.logicResilienceScore >= 80 ? "Chặt chẽ tuyệt đối" : "Cần hoàn thiện mạch"}
          </span>
        </div>

        {/* Estimated Task Response Band */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
              Dự Đoán Band Task Response
            </span>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-black ${isHighBand ? "text-emerald-400" : "text-amber-400"}`}>
                Band {report.taskResponseEstimatedBand.toFixed(1)}
              </span>
              <span className="text-xs text-slate-400">/ 9.0</span>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-850 text-slate-300 border border-slate-700">
            {isHighBand ? "C1/C2 Dialectical" : "Cần thêm Rebuttal"}
          </span>
        </div>
      </div>

      {/* Warnings & Strengths Feedback */}
      <div className="space-y-2">
        {report.warnings.map((warn, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-rose-950/40 border border-rose-600/50 flex items-start gap-2.5 text-xs text-rose-200"
          >
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{warn}</span>
          </div>
        ))}

        {report.strengths.map((str, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex items-start gap-2.5 text-xs text-emerald-200"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{str}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
