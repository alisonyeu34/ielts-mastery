"use client";

import React from "react";
import { AbstractConstruct } from "@/lib/epistemicGraphParser";

interface AbstractConstructViewerProps {
  constructs: AbstractConstruct[];
}

export const AbstractConstructViewer: React.FC<AbstractConstructViewerProps> = ({
  constructs
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 backdrop-blur-md">
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-base">
            💎
          </span>
          <h3 className="text-base font-bold text-white">
            Tầng Khái Niệm Siêu Hình (Core Abstract Constructs)
          </h3>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Giải mã các thuật ngữ triết học và nhận thức luận nền tảng định hình toàn bộ bài đọc
        </p>
      </div>

      <div className="space-y-4">
        {constructs.map((construct) => (
          <div
            key={construct.id}
            className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm font-bold text-cyan-300">
                {construct.name}
              </h4>
              <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Core Construct
              </span>
            </div>

            {/* Definition */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Định Nghĩa Bản Chất:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800/80">
                {construct.definition}
              </p>
            </div>

            {/* Implications */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Hàm Ý Trong Khảo Thí Cambridge:
              </span>
              <p className="text-xs text-amber-200/90 leading-relaxed bg-amber-950/20 p-3 rounded-xl border border-amber-500/20">
                💡 {construct.implications}
              </p>
            </div>

            {/* Collocations */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Cụm Từ Đi Liền C1/C2:
              </span>
              <div className="flex flex-wrap gap-2">
                {construct.collocations.map((col, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-medium"
                  >
                    {col}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
