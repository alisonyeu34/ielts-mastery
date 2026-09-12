"use client";

import React, { useState } from "react";
import { ParagraphCohesionAnalysis } from "@/lib/themeRhemeParser";
import {
  Layers,
  Edit3,
  Sparkles,
  RotateCcw,
  BookOpen,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

interface ThemeRhemeVisualizerProps {
  paragraphText: string;
  setParagraphText: (text: string) => void;
  analysis: ParagraphCohesionAnalysis;
  onLoadBand8Model: () => void;
  onResetDraft: () => void;
  onOpenPalette: () => void;
}

export const ThemeRhemeVisualizer: React.FC<ThemeRhemeVisualizerProps> = ({
  paragraphText,
  setParagraphText,
  analysis,
  onLoadBand8Model,
  onResetDraft,
  onOpenPalette,
}) => {
  const [isEditingRaw, setIsEditingRaw] = useState<boolean>(false);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl mb-6">
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-100 flex items-center gap-2">
              <span>Khung Phân Giải Cấu Trúc Thông Tin Đề - Thuyết (Theme & Rheme)</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-mono">
                SFL Linguistics
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Màu vàng: <strong>Theme (Đề ngữ)</strong> - Thông tin đã biết | Màu tím: <strong>Rheme (Thuyết ngữ)</strong> - Thông tin mới.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsEditingRaw(!isEditingRaw)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              isEditingRaw
                ? "bg-cyan-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditingRaw ? "Xem Tô Màu Đề-Thuyết" : "Chỉnh Sửa Văn Bản"}</span>
          </button>

          <button
            onClick={onLoadBand8Model}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500/20 to-purple-500/20 text-amber-300 border border-amber-500/40 hover:from-amber-500/30 hover:to-purple-500/30 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Nạp Bài Mẫu Band 8.5</span>
          </button>

          <button
            onClick={onResetDraft}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Khôi phục đoạn văn gốc"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor or Visualizer Surface */}
      {isEditingRaw ? (
        <div className="space-y-3">
          <textarea
            value={paragraphText}
            onChange={(e) => setParagraphText(e.target.value)}
            rows={6}
            placeholder="Dán hoặc viết đoạn văn thân bài Task 2 của bạn tại đây..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-amber-500 leading-relaxed font-serif custom-scrollbar"
          />
          <div className="text-[11px] text-slate-400 italic">
            * Nhấn "Xem Tô Màu Đề-Thuyết" để phân tích lại luồng thông tin ngay lập tức.
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {analysis.sentences.map((sent, idx) => {
            const isBroken = sent.connectionStatusToPrev === "broken";
            const isLinear = sent.connectionStatusToPrev === "linear";
            const isConstant = sent.connectionStatusToPrev === "constant";

            return (
              <div
                key={sent.id}
                className={`p-4 rounded-xl border transition-all ${
                  isBroken
                    ? "bg-rose-950/20 border-rose-500/40"
                    : isLinear
                    ? "bg-slate-950/60 border-emerald-500/30"
                    : isConstant
                    ? "bg-slate-950/60 border-cyan-500/30"
                    : "bg-slate-950/60 border-slate-800"
                }`}
              >
                {/* Sentence Progression Badge */}
                <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-[10px] font-mono font-bold">
                      S{idx + 1}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        idx === 0
                          ? "bg-slate-800 text-slate-300"
                          : isLinear
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : isConstant
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                          : "bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse"
                      }`}
                    >
                      {idx === 0
                        ? "Topic Sentence (Hyper-Theme)"
                        : isLinear
                        ? "Linear Flow (Bậc Thang)"
                        : isConstant
                        ? "Constant Theme (Đồng Trục)"
                        : "Gãy Mạch Thông Tin (Breakpoint)"}
                    </span>
                  </div>

                  {sent.hasMechanicalLinker && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Liên từ máy móc: "{sent.linkerDetected}"
                    </span>
                  )}
                </div>

                {/* Theme & Rheme Visual Spans */}
                <div className="text-sm md:text-base leading-relaxed font-serif mb-2">
                  <span
                    className="inline-block px-2 py-0.5 rounded bg-amber-500/15 text-amber-200 border border-amber-500/30 font-semibold mr-1.5 shadow-sm"
                    title="Theme (Thông tin đã biết / Điểm neo)"
                  >
                    [Theme: {sent.theme}]
                  </span>
                  <span
                    className="inline-block px-2 py-0.5 rounded bg-purple-500/15 text-purple-200 border border-purple-500/30 mr-1.5 shadow-sm"
                    title="Rheme (Thông tin mới / Trọng tâm)"
                  >
                    [Rheme: {sent.rheme}]
                  </span>
                </div>

                {/* Pedagogical Note */}
                <div className="text-[11px] text-slate-400 flex items-start gap-1.5 mt-1.5 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  {isBroken ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  <span className="leading-relaxed">{sent.cohesionNote}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
