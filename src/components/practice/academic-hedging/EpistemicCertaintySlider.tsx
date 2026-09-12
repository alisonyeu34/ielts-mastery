"use client";

import React from "react";
import { EpistemicCalibrationTier } from "@/data/mockHedgingDrillsData";
import { Sliders, Sparkles, HelpCircle, ShieldCheck } from "lucide-react";

interface EpistemicCertaintySliderProps {
  percentage: 100 | 75 | 50 | 25;
  onChangePercentage: (pct: 100 | 75 | 50 | 25) => void;
  calibrations: EpistemicCalibrationTier[];
}

export const EpistemicCertaintySlider: React.FC<EpistemicCertaintySliderProps> = ({
  percentage,
  onChangePercentage,
  calibrations
}) => {
  const tiers: (100 | 75 | 50 | 25)[] = [100, 75, 50, 25];

  const activeTier = calibrations.find((c) => c.percentage === percentage) || calibrations[0];

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <h3 className="font-semibold text-slate-200 text-sm">
            Thanh Đo Quang Phổ Xác Suất Nhận Thức (Epistemic Certainty Slider)
          </h3>
        </div>
        <span className="text-xs text-slate-400">
          Mức Khuyến Nghị C1/C2: <strong className="text-emerald-400 font-mono">50% - 75%</strong>
        </span>
      </div>

      {/* 4 Slider Segment Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {tiers.map((pct) => {
          const tierInfo = calibrations.find((c) => c.percentage === pct);
          const isActive = percentage === pct;

          let activeStyle = "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700";
          if (isActive) {
            if (pct === 100) activeStyle = "bg-rose-950/60 border-rose-500 text-rose-200 ring-1 ring-rose-500";
            else if (pct === 75) activeStyle = "bg-indigo-950/60 border-indigo-500 text-indigo-200 ring-1 ring-indigo-500";
            else if (pct === 50) activeStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500";
            else if (pct === 25) activeStyle = "bg-cyan-950/60 border-cyan-500 text-cyan-200 ring-1 ring-cyan-500";
          }

          return (
            <button
              key={pct}
              type="button"
              onClick={() => onChangePercentage(pct)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${activeStyle}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold font-mono">{pct}% Certainty</span>
              </div>
              <span className="text-[11px] font-medium leading-snug line-clamp-1">
                {tierInfo?.levelTitle.split(" (")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Tier Explanation Card */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200">
            {activeTier.levelTitle}
          </span>
          <span className="text-[10px] font-mono text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            {activeTier.epistemicTone}
          </span>
        </div>

        <p className="text-sm text-slate-200 font-serif leading-relaxed italic bg-slate-900/90 p-3 rounded-lg border border-slate-800 font-medium">
          &ldquo;{activeTier.sentence}&rdquo;
        </p>

        <div className="text-[11px] text-slate-400 pt-1">
          <strong className="text-amber-400">Đánh giá giám khảo Cambridge:</strong> {activeTier.cambridgeEvaluation}
        </div>
      </div>
    </div>
  );
};
