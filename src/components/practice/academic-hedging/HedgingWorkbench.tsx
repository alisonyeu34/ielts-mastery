"use client";

import React from "react";
import { HedgingDrillItem, EpistemicCalibrationTier } from "@/data/mockHedgingDrillsData";
import { HedgingAnalysisReport } from "@/lib/hedgingAnalyzer";
import { PenTool, Sparkles, ShieldAlert, CheckCircle2, ArrowRight, BookOpen } from "lucide-react";

interface HedgingWorkbenchProps {
  drill: HedgingDrillItem;
  activeTier: EpistemicCalibrationTier;
  userDraft: string;
  onChangeDraft: (text: string) => void;
  analysisReport: HedgingAnalysisReport;
  onOpenEvaluation: () => void;
}

export const HedgingWorkbench: React.FC<HedgingWorkbenchProps> = ({
  drill,
  activeTier,
  userDraft,
  onChangeDraft,
  analysisReport,
  onOpenEvaluation
}) => {
  const { dogmaticTerms, hedgingMarkers, epistemicCalibrationScore, taskResponseEstimatedBand, certaintyLevel } =
    analysisReport;

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <PenTool className="w-4 h-4 text-cyan-400" />
          <h3 className="font-semibold text-slate-200 text-sm">
            Bàn Làm Việc Rào Đón Học Thuật (Academic Hedging Workbench)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-cyan-950/80 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40">
            {certaintyLevel}
          </span>
        </div>
      </div>

      {/* Split-Screen: Dogmatic Original vs User Calibrated Rewrite */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Dogmatic Sentence */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Câu Khẳng Định Võ Đoán (100% Dogmatic)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                Band 6.0 Trap
              </span>
            </div>

            <p className="text-sm text-slate-300 font-serif leading-relaxed italic">
              &ldquo;{renderDogmaticHighlights(drill.dogmaticSentence, drill.dogmaticTriggers)}&rdquo;
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-400">
            <strong className="text-amber-400 block mb-0.5">Khuyết Tật Nhận Thức:</strong>
            {drill.critique}
          </div>
        </div>

        {/* Right: Calibrated Rewrite */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-700 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                Vùng Soạn Thảo Rào Đón C1/C2
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 font-bold border border-cyan-500/40">
                Calibration: {epistemicCalibrationScore}/100
              </span>
            </div>

            <textarea
              value={userDraft || activeTier.sentence}
              onChange={(e) => onChangeDraft(e.target.value)}
              placeholder="Hiệu chỉnh câu văn sử dụng các từ ngữ rào đón (Hedging markers)..."
              rows={4}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-sans leading-relaxed resize-none"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="italic">
              Từ rào đón đã bắt: <strong className="text-cyan-400">{hedgingMarkers.length}</strong> | Từ võ đoán:{" "}
              <strong className={dogmaticTerms.length > 0 ? "text-rose-400" : "text-emerald-400"}>
                {dogmaticTerms.length}
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-xs text-slate-400">
          Task Response ước tính:{" "}
          <strong className="text-emerald-400 font-mono font-bold text-sm">
            Band {taskResponseEstimatedBand.toFixed(1)}
          </strong>
        </div>

        <button
          type="button"
          onClick={onOpenEvaluation}
          className="px-5 py-2 rounded-xl text-xs font-semibold shadow-lg transition-all flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-cyan-500/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>Đánh Giá Chi Tiết Rào Đón Học Thuật</span>
        </button>
      </div>
    </div>
  );
};

function renderDogmaticHighlights(sentence: string, triggers: string[]) {
  return sentence;
}
