"use client";

import React from "react";
import { AuthorialStanceAnalysis } from "@/lib/epistemicGraphParser";

interface AuthorialStancePinpointProps {
  stance: AuthorialStanceAnalysis;
}

export const AuthorialStancePinpoint: React.FC<AuthorialStancePinpointProps> = ({
  stance
}) => {
  return (
    <div className="bg-slate-900/90 border border-amber-500/40 rounded-3xl p-6 shadow-xl space-y-6 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 text-2xl">
            👑
          </span>
          <div>
            <h3 className="text-base font-bold text-white">
              Tầng Lập Trường Tác Giả (Authorial Stance Pinpoint)
            </h3>
            <p className="text-xs text-amber-200/80">
              Bóc trần thái độ thực sự của tác giả ở đoạn văn kết luận [Đoạn {stance.concludingParagraphIndex}]
            </p>
          </div>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold self-start sm:self-center">
          {stance.stanceTitle}
        </span>
      </div>

      {/* Core Thesis */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Luận Đề Kết Luận Của Tác Giả:
        </span>
        <p className="text-xs text-slate-200 leading-relaxed font-medium">
          {stance.coreThesis}
        </p>
      </div>

      {/* Key Hedging & Epistemic Stance Markers */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-300">
          Các Dấu Hiệu Rào Đón Học Thuật (Hedging Markers) Định Hình Lập Trường:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {stance.keyHedgingExpressions.map((hedge, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 italic flex items-start gap-2"
            >
              <span className="text-amber-400 font-bold not-italic">📌</span>
              <span>&ldquo;{hedge}&rdquo;</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cambridge Trap Explanation */}
      <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
        <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
          <span>⚠️</span>
          <span>Vạch Trần Bẫy Khảo Thí Cambridge Về Lập Trường Tác Giả:</span>
        </span>
        <p className="text-xs text-slate-300 leading-relaxed pl-5">
          {stance.cambridgeTrapExplanation}
        </p>
      </div>
    </div>
  );
};
