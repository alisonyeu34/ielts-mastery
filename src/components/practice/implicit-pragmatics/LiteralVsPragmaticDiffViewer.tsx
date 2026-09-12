"use client";

import React from "react";
import { PragmaticExcerptItem } from "@/data/mockPragmaticsDecoderData";
import { ArrowRightLeft, ShieldAlert, Sparkles, HelpCircle } from "lucide-react";

interface LiteralVsPragmaticDiffViewerProps {
  excerpt: PragmaticExcerptItem;
}

export const LiteralVsPragmaticDiffViewer: React.FC<LiteralVsPragmaticDiffViewerProps> = ({
  excerpt
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="w-4 h-4 text-amber-400" />
          <h3 className="font-semibold text-slate-200 text-sm">
            Bảng Đối Chiếu: Nghĩa Đen (Literal) vs Hàm Ý Ngữ Dụng Khảo Thí (Pragmatic Subtext)
          </h3>
        </div>
        <span className="text-xs text-amber-300 bg-amber-950/60 border border-amber-800/60 px-2.5 py-0.5 rounded-full font-mono font-medium">
          Split-Diff View
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Column 1: Literal Meaning */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                1. Nghĩa Đen Bề Nổi (Literal Utterance)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                Band 6.0 - 6.5 Trap
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              &ldquo;{excerpt.literalMeaning}&rdquo;
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
            <strong>Bẫy nhận thức:</strong> Thí sinh dịch từng từ mà không nhận ra các tín hiệu mỉa mai ngầm (Irony / Understatement).
          </div>
        </div>

        {/* Column 2: Intended Pragmatic Implicature */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/30 to-slate-950 border border-amber-500/50 shadow-lg shadow-amber-500/5 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-amber-500/30 mb-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  2. Hàm Ý Ngữ Dụng Thật Của Tác Giả (Intended Stance)
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                Band 8.5+ Target
              </span>
            </div>

            <p className="text-xs text-amber-100 font-medium leading-relaxed font-sans">
              &ldquo;{excerpt.intendedPragmaticImplicature}&rdquo;
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-amber-950/60 border border-amber-500/30 text-[11px] text-amber-200">
            <strong className="block text-amber-300 mb-0.5">Bí quyết khảo thí Cambridge:</strong>
            {excerpt.cambridgeExamTrapAnalysis}
          </div>
        </div>
      </div>
    </div>
  );
};
