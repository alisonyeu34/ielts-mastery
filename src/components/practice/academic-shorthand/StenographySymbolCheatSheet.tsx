"use client";

import React, { useState } from "react";
import { ACADEMIC_STENOGRAPHY_SYMBOLS } from "@/lib/shorthandLexiconEngine";
import { BookOpen, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

export const StenographySymbolCheatSheet: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <h3 className="font-semibold text-slate-200 text-sm">
            20 Academic Stenography Symbols Cheat Sheet (Cẩm Nang Tốc Ký)
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>{isOpen ? "Thu gọn" : "Xem chi tiết 20 ký hiệu"}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 pt-3 border-t border-slate-800 space-y-4">
          <p className="text-xs text-slate-400 leading-relaxed">
            Trong Section 4 bài nghe dài 7 phút liên tục, việc viết trọn vẹn từ ngữ sẽ làm quá tải trí nhớ làm việc (Working Memory Overload). Hãy thuộc lòng 20 ký hiệu tốc ký này:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {ACADEMIC_STENOGRAPHY_SYMBOLS.map((sym) => (
              <div
                key={sym.id}
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-2 hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg font-bold font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/60">
                      {sym.symbol}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">
                      {sym.shortcut}
                    </span>
                  </div>
                  <h5 className="font-semibold text-xs text-slate-200 mt-1">{sym.meaning}</h5>
                </div>

                <div className="text-[11px] text-slate-400 font-mono bg-slate-900/90 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-slate-500 block text-[9px] uppercase font-sans">Ví dụ học thuật:</span>
                  {sym.academicExamples.map((ex, i) => (
                    <div key={i} className="text-cyan-300">
                      &bull; {ex}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
