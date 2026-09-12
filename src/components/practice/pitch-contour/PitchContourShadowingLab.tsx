"use client";

import React from "react";
import { ShadowingAlignmentResult } from "@/lib/pitchTrackerEngine";
import { Sparkles, Award, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";

interface PitchContourShadowingLabProps {
  alignmentResult: ShadowingAlignmentResult;
}

export const PitchContourShadowingLab: React.FC<PitchContourShadowingLabProps> = ({
  alignmentResult
}) => {
  const { alignmentScore, meanPitchDiffHz, isBand8TargetMet, diagnostics } =
    alignmentResult;

  const scoreColor =
    alignmentScore >= 80
      ? "text-emerald-400"
      : alignmentScore >= 60
      ? "text-amber-400"
      : "text-slate-400";

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <h3 className="font-semibold text-slate-200 text-sm">
            Xưởng Shadowing Ngữ Điệu Hạ Giọng (Pitch Contour Alignment Lab)
          </h3>
        </div>
        <span className="text-xs text-purple-300 bg-purple-950/60 border border-purple-800/60 px-2.5 py-0.5 rounded-full font-mono font-medium">
          Native RP Shadowing
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Alignment Score Meter */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Độ Khớp Ngữ Điệu (Pitch Alignment Score):
            </span>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-extrabold font-mono ${scoreColor}`}>
                {alignmentScore}%
              </span>
              <span className="text-xs text-slate-400">
                (&Delta; trung bình: {meanPitchDiffHz} Hz)
              </span>
            </div>
          </div>

          <div className="text-right">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${
                isBand8TargetMet
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  : "bg-slate-800 text-slate-400 border-slate-700"
              }`}
            >
              {isBand8TargetMet ? "Band 8.0+ Met" : "Luyện Tập Thêm"}
            </span>
          </div>
        </div>

        {/* Diagnostic Cues */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 text-xs">
          <span className="font-semibold text-slate-300 block">Chẩn Đoán Khảo Thí:</span>
          {diagnostics.map((d, i) => (
            <div key={i} className="flex items-start gap-1.5 text-slate-400 leading-relaxed">
              <span className="text-cyan-400 font-bold">&bull;</span>
              <span>{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
