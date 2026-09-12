"use client";

import React, { useState } from "react";
import { Share2, Sparkles, Check, Copy, ArrowRight, Zap } from "lucide-react";
import { LexicalWordNuance } from "@/lib/lexicalSemanticsEngine";

interface CollocationalAffinityGraphProps {
  activeWord: LexicalWordNuance;
  onInsertCollocation?: (phrase: string) => void;
}

export const CollocationalAffinityGraph: React.FC<CollocationalAffinityGraphProps> = ({
  activeWord,
  onInsertCollocation
}) => {
  const [copiedPhrase, setCopiedPhrase] = useState<string | null>(null);

  const handleCopy = (phrase: string) => {
    navigator.clipboard.writeText(phrase);
    setCopiedPhrase(phrase);
    if (onInsertCollocation) onInsertCollocation(phrase);
    setTimeout(() => setCopiedPhrase(null), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Mạng Lưới Kết Hợp Tự Nhiên (Collocational Affinity Graph)
            </h3>
            <p className="text-[11px] text-slate-400">
              Các cụm kết hợp mạnh chuẩn bản xứ C1/C2 đi liền với từ khóa
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-300 border border-slate-700">
          Native Affinity: 95%+
        </span>
      </div>

      {/* Network Center & Orbiting Nodes */}
      <div className="relative p-6 rounded-xl bg-slate-950/90 border border-slate-800/90 flex flex-col items-center justify-center min-h-[220px]">
        {/* Center Node */}
        <div className="z-10 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-indigo-600 text-white font-serif font-bold text-sm shadow-xl shadow-emerald-950/60 ring-4 ring-slate-950 flex items-center gap-2 mb-6">
          <Sparkles className="w-4 h-4" />
          <span>{activeWord.word}</span>
        </div>

        {/* Orbiting Collocations Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 z-10">
          {activeWord.collocationalPartners.map((partner, idx) => {
            const isCopied = copiedPhrase === partner;

            return (
              <button
                key={idx}
                onClick={() => handleCopy(partner)}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between group ${
                  isCopied
                    ? "bg-emerald-950 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500"
                    : "bg-slate-900/90 border-slate-750 hover:border-emerald-500/60 text-slate-200 hover:bg-slate-850"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:animate-ping" />
                  <span className="text-xs font-serif font-medium line-clamp-1">
                    {partner}
                  </span>
                </div>

                <div className="text-slate-400 group-hover:text-emerald-300 transition-colors shrink-0 ml-2">
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
