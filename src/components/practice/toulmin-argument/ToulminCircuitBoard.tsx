"use client";

import React from "react";
import {
  TOULMIN_ROLES_CONFIG,
  ToulminRole
} from "@/lib/toulminStructureValidator";
import { Cpu, RotateCcw, Sparkles, BookOpen, Layers } from "lucide-react";

interface ToulminCircuitBoardProps {
  blocks: Record<ToulminRole, string>;
  onUpdateBlock: (role: ToulminRole, content: string) => void;
  onReset: () => void;
  onOpenDrawer: () => void;
}

export const ToulminCircuitBoard: React.FC<ToulminCircuitBoardProps> = ({
  blocks,
  onUpdateBlock,
  onReset,
  onOpenDrawer
}) => {
  const roles: ToulminRole[] = [
    "claim",
    "data",
    "warrant",
    "backing",
    "counterArgument",
    "rebuttal"
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Bảng Mạch Lập Luận Toulmin 6 Khối (Toulmin Logic Circuit Board)
            </h3>
            <p className="text-[11px] text-slate-400">
              Lắp ghép các khối tư duy: Claim &rarr; Data &rarr; Warrant &rarr; Backing &rarr; Counter &rarr; Rebuttal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDrawer}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            Mẫu Liên Từ C1/C2
          </button>
          <button
            onClick={onReset}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            title="Khôi phục dữ liệu mẫu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 6 Circuit Cards Grid (2 columns on md, 3 columns on lg) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role) => {
          const config = TOULMIN_ROLES_CONFIG[role];
          const content = blocks[role] || "";
          const isFilled = content.trim().length > 0;

          return (
            <div
              key={role}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                config.colorTheme.bg
              } ${config.colorTheme.border} ${
                isFilled ? "shadow-lg shadow-indigo-950/20" : "opacity-80"
              }`}
            >
              <div>
                {/* Block Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border font-mono ${config.colorTheme.badgeBg}`}>
                    {config.label}
                  </span>
                  <span className="text-[10px] text-slate-400 font-sans">
                    {config.vietnameseTitle.split(" (")[0]}
                  </span>
                </div>

                {/* Prompt instruction */}
                <p className="text-[11px] text-slate-300/80 mb-2 leading-tight italic">
                  {config.guidingPrompt}
                </p>

                {/* Text Input */}
                <textarea
                  value={content}
                  onChange={(e) => onUpdateBlock(role, e.target.value)}
                  placeholder={config.placeholder}
                  className="w-full h-24 p-2.5 rounded-lg bg-slate-950/90 border border-slate-800/80 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 font-sans resize-none leading-relaxed"
                />
              </div>

              {/* Character Count */}
              <div className="text-[10px] text-slate-500 text-right mt-1.5">
                {content.length} ký tự
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
