"use client";

import React from "react";
import { DogmaticTermMatch } from "@/lib/hedgingAnalyzer";
import { AlertTriangle, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

interface DogmatismDeflatorPanelProps {
  dogmaticTerms: DogmaticTermMatch[];
  onReplaceTerm: (match: DogmaticTermMatch, replacement: string) => void;
}

export const DogmatismDeflatorPanel: React.FC<DogmatismDeflatorPanelProps> = ({
  dogmaticTerms,
  onReplaceTerm
}) => {
  if (dogmaticTerms.length === 0) {
    return (
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h4 className="font-semibold text-xs text-slate-200">
              Bộ Triệt Tiêu Võ Đoán (Dogmatism Deflator)
            </h4>
            <p className="text-[11px] text-slate-400">
              Không có từ khẳng định tuyệt đối hóa. Lập luận của bạn giữ vững tính khách quan học thuật.
            </p>
          </div>
        </div>
        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30">
          Clean (0 Dogmatic)
        </span>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-rose-500/40 rounded-2xl p-5 shadow-xl space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <h3 className="font-semibold text-slate-200 text-sm">
            Phát Hiện {dogmaticTerms.length} Từ Khẳng Định Võ Đoán (Dogmatic Overstatements)
          </h3>
        </div>
        <span className="text-xs text-rose-300 bg-rose-950/60 border border-rose-500/40 px-2.5 py-0.5 rounded-full font-mono font-medium">
          Band 6.0 Bias
        </span>
      </div>

      <div className="space-y-3">
        {dogmaticTerms.map((match, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-slate-950/80 border border-rose-900/60 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-xs font-bold border border-rose-500/30">
                &ldquo;{match.matchedText}&rdquo;
              </span>
              <span className="text-[10px] text-slate-500 italic font-mono">{match.category}</span>
            </div>

            <p className="text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <strong className="text-amber-400 block mb-0.5">Phân Tích Bẫy Khảo Thí:</strong>
              {match.critique}
            </p>

            {/* Replacements */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Đề Xuất Rào Đón C1/C2 (Click để thay thế ngay):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {match.hedgedReplacements.map((repl, rIdx) => (
                  <button
                    key={rIdx}
                    type="button"
                    onClick={() => onReplaceTerm(match, repl)}
                    className="p-2 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/40 hover:border-cyan-400 text-left text-xs text-cyan-200 transition-all flex items-center justify-between group"
                  >
                    <span className="font-sans leading-snug line-clamp-1">{repl}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
