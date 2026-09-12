"use client";

import React from "react";
import { PhilosophicalEvaluationResult } from "@/lib/philosophicalEthicsValidator";
import { PenTool, Brain, Sparkles, CheckCircle2, ShieldAlert, Award, FileText } from "lucide-react";

interface MoralArgumentWeaverProps {
  userDraft: string;
  onChangeDraft: (text: string) => void;
  evaluationResult: PhilosophicalEvaluationResult;
  onInsertModelSynthesis: () => void;
  onOpenEvaluation: () => void;
}

export const MoralArgumentWeaver: React.FC<MoralArgumentWeaverProps> = ({
  userDraft,
  onChangeDraft,
  evaluationResult,
  onInsertModelSynthesis,
  onOpenEvaluation
}) => {
  const { philosophicalDepthScore, synthesizedDualStance, wordCount, taskResponseBandEstimate, frameworkAnalysis } =
    evaluationResult;

  const depthColor =
    philosophicalDepthScore >= 75
      ? "text-emerald-400"
      : philosophicalDepthScore >= 50
      ? "text-cyan-400"
      : "text-amber-400";

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <PenTool className="w-4 h-4 text-indigo-400" />
          <h3 className="font-semibold text-slate-200 text-sm">
            Xưởng Lắp Ráp Lập Luận Triết Học (Philosophical Stance Weaver)
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {/* Word Count */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>{wordCount} words</span>
          </div>

          {/* Depth Gauge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono">
            <Brain className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-400">Depth Score:</span>
            <span className={`font-bold ${depthColor}`}>{philosophicalDepthScore}/100</span>
          </div>

          {/* Model Insert Button */}
          <button
            type="button"
            onClick={onInsertModelSynthesis}
            className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600/50 text-xs font-semibold transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Nạp Bài Mẫu C2</span>
          </button>
        </div>
      </div>

      {/* Primary Framework Detection Pill */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Khung Triết Học Nhận Diện:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold font-mono border border-indigo-500/30">
            {frameworkAnalysis.primaryFramework}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          {synthesizedDualStance ? (
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Đã phối hợp &ge; 2 lăng kính đối kháng (Band 8.0+ Target)
            </span>
          ) : (
            <span className="flex items-center gap-1 text-amber-400 font-medium">
              <ShieldAlert className="w-3.5 h-3.5" />
              Chưa đủ 2 lăng kính đối kháng (Hãy bổ sung phản biện Kant hoặc Rawls)
            </span>
          )}
        </div>
      </div>

      {/* Main Textarea */}
      <div className="relative">
        <textarea
          value={userDraft}
          onChange={(e) => onChangeDraft(e.target.value)}
          placeholder="Soạn thảo luận điểm hoặc đoạn văn Task 2 / Speaking Part 3 của bạn tại đây...
Ví dụ:
'While from a utilitarian perspective, the policy ostensibly maximizes aggregate societal utility by reducing logistical friction; nonetheless, such a calculus collapses under deontological scrutiny when individual liberties and cognitive privacy are systematically compromised. Under Rawlsian distributive justice, no rational agent beneath the Veil of Ignorance would sanction perpetual subjugation.'"
          rows={8}
          className="w-full bg-slate-950/90 border border-slate-700 rounded-xl p-4 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-slate-600 font-sans leading-relaxed resize-y"
        />
      </div>

      {/* Action Footer with Diagnostics Trigger */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Ước Tính Task Response: </span>
          <strong className="text-emerald-400 font-mono font-bold text-sm">
            Band {taskResponseBandEstimate.toFixed(1)}
          </strong>
        </div>

        <button
          type="button"
          onClick={onOpenEvaluation}
          disabled={wordCount < 15}
          className={`px-5 py-2 rounded-xl text-xs font-semibold shadow-lg transition-all flex items-center gap-2 ${
            wordCount >= 15
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/20"
              : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>Đánh Giá Chi Tiết Luận Cứ Triết Học</span>
        </button>
      </div>
    </div>
  );
};
