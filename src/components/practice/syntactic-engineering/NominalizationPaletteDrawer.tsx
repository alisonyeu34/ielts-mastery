"use client";

import React, { useState } from "react";
import { NOMINALIZATION_DICTIONARY } from "@/data/mockSyntacticDrillsData";
import { BookOpen, Copy, Check, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

interface NominalizationPaletteDrawerProps {
  onInsertPhrase: (phrase: string) => void;
}

export const NominalizationPaletteDrawer: React.FC<NominalizationPaletteDrawerProps> = ({
  onInsertPhrase
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [copiedWord, setCopiedWord] = useState<string | null>(null);

  const handleCopyAndInsert = (phrase: string) => {
    onInsertPhrase(phrase);
    setCopiedWord(phrase);
    setTimeout(() => setCopiedWord(null), 1500);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          <h3 className="font-semibold text-slate-200 text-sm">
            Cẩm Nang Gốc Từ Danh Từ Hóa C1/C2 (Nominalization Palette)
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>{isOpen ? "Thu gọn" : "Tra cứu gốc từ C1/C2"}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 pt-3 border-t border-slate-800 space-y-4">
          <p className="text-xs text-slate-400 leading-relaxed">
            Danh từ hóa (Nominalization) giúp chuyển đổi các mệnh đề hành động thành các thực thể khái niệm khách quan, tăng vọt chỉ số IDI và điểm Lexical Resource.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {NOMINALIZATION_DICTIONARY.map((item, idx) => {
              const isCopied = copiedWord === item.c2Nominal;
              return (
                <div
                  key={idx}
                  onClick={() => handleCopyAndInsert(item.c2Nominal)}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/60 hover:bg-slate-900 transition-all cursor-pointer flex flex-col justify-between group space-y-2"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500">{item.base}</span>
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <h5 className="font-bold text-xs text-indigo-300 mt-1">
                      {item.c2Nominal}
                    </h5>
                  </div>

                  <p className="text-[11px] text-slate-400 italic line-clamp-2 bg-slate-900/80 p-2 rounded-lg border border-slate-800/80 font-serif">
                    &ldquo;{item.example}&rdquo;
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
