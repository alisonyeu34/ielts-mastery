"use client";

import React from "react";
import { Layers, Eye, EyeOff, Sparkles, CheckCircle2 } from "lucide-react";
import { GardenPathChallenge } from "@/lib/syntacticTreeParser";

interface CoreSkeletonStripperProps {
  challenge: GardenPathChallenge;
  isStripped: boolean;
  onToggleStripped: () => void;
}

export const CoreSkeletonStripper: React.FC<CoreSkeletonStripperProps> = ({
  challenge,
  isStripped,
  onToggleStripped
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header & Toggle Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Bóc Tách Xương Sống Câu Văn (Core Skeleton Stripper)
            </h3>
            <p className="text-[11px] text-slate-400">
              Lọc bỏ vỏ bọc bổ ngữ tầng bậc để lộ diện cấu trúc tam đoạn S-V-O nòng cốt
            </p>
          </div>
        </div>

        <button
          onClick={onToggleStripped}
          className={`px-3.5 py-1.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all ${
            isStripped
              ? "bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/30"
              : "bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700"
          }`}
        >
          {isStripped ? (
            <>
              <EyeOff className="w-3.5 h-3.5" />
              Đang Hiện Xương Sống
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              Bóc Tách Nòng Cốt S-V-O
            </>
          )}
        </button>
      </div>

      {/* Full Sentence Display with Dynamic Highlighting */}
      <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/90 leading-relaxed font-serif text-sm md:text-base">
        {isStripped ? (
          <div>
            <span className="text-emerald-400 font-bold underline decoration-emerald-500 decoration-2">
              {challenge.coreSubject}
            </span>{" "}
            <span className="text-slate-600 select-none blur-[0.4px] transition-all">
              [{challenge.reducedClauseSnippet}]
            </span>{" "}
            <span className="text-cyan-400 font-black underline decoration-cyan-500 decoration-2">
              {challenge.trueMainVerb}
            </span>{" "}
            <span className="text-violet-400 font-bold underline decoration-violet-500 decoration-2">
              {challenge.coreObjectOrComplement}
            </span>
            .
          </div>
        ) : (
          <p className="text-slate-200">
            {challenge.sentenceText}
          </p>
        )}
      </div>

      {/* 3 Core Structural Pillars Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Subject */}
        <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
            1. Chủ Ngữ Cốt Lõi (Subject)
          </div>
          <p className="text-xs font-mono font-bold text-white line-clamp-2">
            {challenge.coreSubject}
          </p>
        </div>

        {/* Main Verb */}
        <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/40 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
            2. Vị Ngữ Chính (Root Verb)
          </div>
          <p className="text-xs font-mono font-bold text-white line-clamp-2">
            {challenge.trueMainVerb}
          </p>
        </div>

        {/* Object / Complement */}
        <div className="p-3 rounded-xl bg-violet-950/30 border border-violet-500/40 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-violet-400">
            3. Tân Ngữ / Bổ Ngữ (Object)
          </div>
          <p className="text-xs font-mono font-bold text-white line-clamp-2">
            {challenge.coreObjectOrComplement}
          </p>
        </div>
      </div>
    </div>
  );
};
