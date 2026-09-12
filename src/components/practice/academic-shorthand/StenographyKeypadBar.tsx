"use client";

import React from "react";
import { ACADEMIC_STENOGRAPHY_SYMBOLS, StenographySymbol } from "@/lib/shorthandLexiconEngine";
import { Keyboard, Zap } from "lucide-react";

interface StenographyKeypadBarProps {
  onInsertSymbol: (symbol: string) => void;
}

export const StenographyKeypadBar: React.FC<StenographyKeypadBarProps> = ({
  onInsertSymbol
}) => {
  const categories: { key: StenographySymbol["category"]; title: string; color: string }[] = [
    { key: "trend", title: "Biến Thiên / Xu Hướng", color: "text-indigo-400 border-indigo-500/30 bg-indigo-950/40" },
    { key: "logic", title: "Mối Quan Hệ Nhân Quả", color: "text-emerald-400 border-emerald-500/30 bg-emerald-950/40" },
    { key: "quantity", title: "Số Lượng / So Sánh", color: "text-amber-400 border-amber-500/30 bg-amber-950/40" },
    { key: "abbreviation", title: "Thuật Ngữ Viết Tắt Học Thuật", color: "text-cyan-400 border-cyan-500/30 bg-cyan-950/40" }
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 shadow-xl space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Keyboard className="w-4 h-4 text-cyan-400" />
          <h3 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
            20 Academic Stenography Keypad (Tốc Ký Ký Hiệu Section 4)
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Gõ shortcut (ví dụ: <code className="text-amber-300 font-mono">\inc</code> + Space) để tự bung ký hiệu</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {categories.map((cat) => {
          const symbols = ACADEMIC_STENOGRAPHY_SYMBOLS.filter((s) => s.category === cat.key);
          return (
            <div key={cat.key} className={`p-2.5 rounded-xl border ${cat.color} space-y-2`}>
              <span className="text-[10px] font-bold uppercase tracking-wider block opacity-90">
                {cat.title}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {symbols.map((sym) => (
                  <button
                    key={sym.id}
                    type="button"
                    onClick={() => onInsertSymbol(sym.symbol)}
                    title={`${sym.meaning} (Gõ ${sym.shortcut} hoặc ${sym.keyboardAlt || ""})`}
                    className="px-2 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-slate-700 hover:border-cyan-400 font-mono text-xs font-bold transition-all shadow-sm flex items-center gap-1 group"
                  >
                    <span>{sym.symbol}</span>
                    <span className="text-[9px] text-slate-500 group-hover:text-slate-400 font-normal">
                      {sym.shortcut}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
