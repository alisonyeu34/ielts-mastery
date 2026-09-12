"use client";

import React from "react";
import { PragmaticAnalysisResult } from "@/lib/pragmaticsSubtextEngine";
import { Radar, ShieldAlert, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

interface AcademicIronyRadarProps {
  analysis: PragmaticAnalysisResult;
}

export const AcademicIronyRadar: React.FC<AcademicIronyRadarProps> = ({
  analysis
}) => {
  const { toneCategory, hasPragmaticSubtext, detectedMarker, cambridgeExamTip, confidence } =
    analysis;

  const toneColors: Record<string, { badge: string; text: string }> = {
    "Faint Praise Damning": { badge: "bg-rose-500/20 border-rose-500/40 text-rose-300", text: "text-rose-400" },
    "Nuanced Skepticism": { badge: "bg-amber-500/20 border-amber-500/40 text-amber-300", text: "text-amber-400" },
    "Sarcastic / Mocking": { badge: "bg-purple-500/20 border-purple-500/40 text-purple-300", text: "text-purple-400" },
    "Reluctant Concession": { badge: "bg-cyan-500/20 border-cyan-500/40 text-cyan-300", text: "text-cyan-400" },
    "Direct Endorsement": { badge: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300", text: "text-emerald-400" },
    Neutral: { badge: "bg-slate-800 border-slate-700 text-slate-300", text: "text-slate-400" }
  };

  const currentStyle = toneColors[toneCategory] || toneColors.Neutral;

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Radar className="w-4 h-4 text-purple-400" />
          <h3 className="font-semibold text-slate-200 text-sm">
            Radar Đo Lường Mỉa Mai &amp; Hoài Nghi Học Thuật (Academic Irony Radar)
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <span>Độ Tin Cậy:</span>
          <span className="font-mono font-bold text-cyan-400">{confidence}%</span>
        </div>
      </div>

      {/* Radar Main Tone Card */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Chẩn Đoán Thái Độ &amp; Ngữ Cảnh Giao Tiếp:
          </span>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${currentStyle.badge}`}
            >
              {toneCategory}
            </span>
            {hasPragmaticSubtext && (
              <span className="text-xs text-rose-300 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                Có hàm ý ẩn (Subtext detected)
              </span>
            )}
          </div>
        </div>

        {detectedMarker && (
          <div className="text-right">
            <span className="text-[10px] text-slate-500 block">Tín Hiệu Kích Hoạt Bắt Được:</span>
            <span className="text-xs font-mono text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              &ldquo;{detectedMarker.slice(0, 35)}...&rdquo;
            </span>
          </div>
        )}
      </div>

      {/* Cambridge Tip Bar */}
      <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-200 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="block text-indigo-100 mb-0.5">Lời Khuyên Chiến Thuật Khảo Thí:</strong>
          {cambridgeExamTip}
        </div>
      </div>
    </div>
  );
};
