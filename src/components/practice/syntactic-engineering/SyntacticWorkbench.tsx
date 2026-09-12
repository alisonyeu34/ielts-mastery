"use client";

import React from "react";
import { SyntacticDrillItem } from "@/data/mockSyntacticDrillsData";
import { SyntacticAnalysisReport } from "@/lib/syntacticParser";
import { SyntacticMode } from "@/hooks/useSyntacticEngineeringSession";
import { PenTool, Sparkles, ArrowRight, CheckCircle2, ShieldAlert, BookOpen, Layers } from "lucide-react";

interface SyntacticWorkbenchProps {
  drill: SyntacticDrillItem;
  activeMode: SyntacticMode;
  onSelectMode: (mode: SyntacticMode) => void;
  userDraft: string;
  onChangeDraft: (text: string) => void;
  analysisReport: SyntacticAnalysisReport;
  onInsertTier3Model: () => void;
  onOpenEvaluation: () => void;
}

export const SyntacticWorkbench: React.FC<SyntacticWorkbenchProps> = ({
  drill,
  activeMode,
  onSelectMode,
  userDraft,
  onChangeDraft,
  analysisReport,
  onInsertTier3Model,
  onOpenEvaluation
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <PenTool className="w-4 h-4 text-indigo-400" />
          <h3 className="font-semibold text-slate-200 text-sm">
            Bàn Làm Việc Tái Cấu Trúc Cú Pháp C1/C2 (Syntactic Engineering Workbench)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onInsertTier3Model}
            className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600/50 text-xs font-semibold transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Nạp Bài Mẫu Band 8.5+</span>
          </button>
        </div>
      </div>

      {/* 3 Upgrade Modes Switcher */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => onSelectMode("nominalize")}
          className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
            activeMode === "nominalize"
              ? "bg-indigo-950/60 border-indigo-500 text-indigo-100 shadow-md ring-1 ring-indigo-500"
              : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
          }`}
        >
          <span className="font-bold text-xs">1. Nominalization (Danh Từ Hóa)</span>
          <span className="text-[10px] text-slate-500 mt-1">Nén mệnh đề thành thực thể trừu tượng</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectMode("invert")}
          className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
            activeMode === "invert"
              ? "bg-indigo-950/60 border-indigo-500 text-indigo-100 shadow-md ring-1 ring-indigo-500"
              : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
          }`}
        >
          <span className="font-bold text-xs">2. Inversion (Đảo Ngữ Học Thuật)</span>
          <span className="text-[10px] text-slate-500 mt-1">Seldom / Were / Had / Should</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectMode("cleft")}
          className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
            activeMode === "cleft"
              ? "bg-indigo-950/60 border-indigo-500 text-indigo-100 shadow-md ring-1 ring-indigo-500"
              : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
          }`}
        >
          <span className="font-bold text-xs">3. Cleft Sentences (Câu Chẻ Nhấn Mạnh)</span>
          <span className="text-[10px] text-slate-500 mt-1">It is... that / What remains is...</span>
        </button>
      </div>

      {/* Split-Screen: Original Band 6.0 vs User C1/C2 Redesign */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Box: Band 6.0 Original */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Câu Gốc Band 6.0 (Văn Nói Lỏng Lẻo)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-rose-300 font-semibold">
                IDI: {drill.idiBand6}%
              </span>
            </div>
            <p className="text-sm text-slate-300 font-serif leading-relaxed italic">
              &ldquo;{drill.band6SpokenSentence}&rdquo;
            </p>
          </div>

          <p className="text-xs text-slate-400 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 leading-relaxed">
            <strong className="text-amber-400 block mb-0.5">Phân Tích Khuyết Tật Cú Pháp:</strong>
            {drill.critiqueBand6}
          </p>
        </div>

        {/* Right Box: User Editor */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-700 space-y-2.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                Phiên Bản Nâng Cấp C1/C2 Của Bạn
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 font-bold border border-indigo-500/40">
                IDI Hiện Tại: {analysisReport.informationDensityIndex}%
              </span>
            </div>

            <textarea
              value={userDraft}
              onChange={(e) => onChangeDraft(e.target.value)}
              placeholder="Tái cấu trúc lại câu văn sử dụng danh từ hóa, đảo ngữ hoặc câu chẻ..."
              rows={4}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-sans leading-relaxed resize-none"
            />
          </div>

          {/* Mode-specific guidance cue */}
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>
              {activeMode === "nominalize" && "Gợi ý: Chuyển động từ thành cụm danh từ trừu tượng."}
              {activeMode === "invert" && (drill.inversionFormulaHint || "Gợi ý: Đặt trợ động từ trước chủ ngữ.")}
              {activeMode === "cleft" && (drill.cleftFormulaHint || "Gợi ý: Dùng It is [Focus] that [Clause].")}
            </span>
          </div>
        </div>
      </div>

      {/* 3-Tier Model Comparison Accordion */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
        <span className="font-bold text-slate-400 uppercase tracking-wider block">
          Khung Đối Chiếu 3 Tầng Trưởng Thành Cú Pháp:
        </span>
        <div className="space-y-1.5 pt-1">
          <div className="p-2 rounded bg-slate-900 border border-slate-800/80 flex items-start gap-2">
            <span className="font-mono text-slate-500 font-bold shrink-0">[Band 6.0]</span>
            <span className="text-slate-400">{drill.band6SpokenSentence}</span>
          </div>
          <div className="p-2 rounded bg-slate-900 border border-slate-800/80 flex items-start gap-2">
            <span className="font-mono text-cyan-400 font-bold shrink-0">[Band 7.5]</span>
            <span className="text-cyan-200">{drill.tier2Band75Sentence}</span>
          </div>
          <div className="p-2 rounded bg-indigo-950/40 border border-indigo-500/40 flex items-start gap-2">
            <span className="font-mono text-indigo-400 font-bold shrink-0">[Band 8.5+]</span>
            <span className="text-indigo-100 font-semibold">{drill.tier3Band85Sentence}</span>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-xs text-slate-400">
          Chỉ số GRA ước tính:{" "}
          <strong className="text-emerald-400 font-mono font-bold text-sm">
            Band {analysisReport.graBandEstimate.toFixed(1)}
          </strong>
        </div>

        <button
          type="button"
          onClick={onOpenEvaluation}
          disabled={!userDraft || userDraft.length < 10}
          className={`px-5 py-2 rounded-xl text-xs font-semibold shadow-lg transition-all flex items-center gap-2 ${
            userDraft && userDraft.length >= 10
              ? "bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white shadow-indigo-500/20"
              : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Đánh Giá Chi Tiết Độ Nén Cú Pháp</span>
        </button>
      </div>
    </div>
  );
};
