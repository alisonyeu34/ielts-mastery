"use client";

import React from "react";
import { DialecticalFactions } from "@/lib/epistemicGraphParser";

interface DialecticalFactionTrackerProps {
  factions: DialecticalFactions;
}

export const DialecticalFactionTracker: React.FC<DialecticalFactionTrackerProps> = ({
  factions
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 backdrop-blur-md">
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-base">
            ⚔️
          </span>
          <h3 className="text-base font-bold text-white">
            Đấu Trường Học Thuyết (Dialectical Factions: Proponents vs Skeptics)
          </h3>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Phân lập rõ ràng hai luồng tư tưởng đối nghịch để tránh bẫy nhầm lẫn quan điểm học giả trong Passage 3
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Proponents Column */}
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-emerald-500/30">
            <span className="text-xl">🛡️</span>
            <div>
              <h4 className="text-sm font-bold text-emerald-300">
                Phe Khởi Xướng / Ủng Hộ (Proponents)
              </h4>
              <span className="text-[11px] text-emerald-400/80">
                Lập thuyết & Mở rộng lý thuyết
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {factions.proponents.map((prop, idx) => (
              <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-white">
                    {prop.name}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-medium">
                    {prop.institution}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">
                    Luận Điểm Cốt Lõi:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {prop.coreClaim}
                  </p>
                </div>

                {(prop.methodology || prop.counterArgument) && (
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500">
                      Phương Pháp Luận / Cơ Sở:
                    </span>
                    <p className="text-xs text-emerald-200/90 italic">
                      🧪 {prop.methodology || prop.counterArgument}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Skeptics Column */}
        <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-rose-500/30">
            <span className="text-xl">⚔️</span>
            <div>
              <h4 className="text-sm font-bold text-rose-300">
                Phe Phản Biện / Hoài Nghi (Skeptics)
              </h4>
              <span className="text-[11px] text-rose-400/80">
                Phản bác & Đặt nghi vấn thực nghiệm
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {factions.skeptics.map((skep, idx) => (
              <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-white">
                    {skep.name}
                  </span>
                  <span className="text-[10px] text-rose-400 font-medium">
                    {skep.institution}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">
                    Luận Điểm Phản Bác:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {skep.coreClaim}
                  </p>
                </div>

                {(skep.counterArgument || skep.methodology) && (
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500">
                      Phản Đòn Trọng Yếu / Luận Cứ:
                    </span>
                    <p className="text-xs text-rose-200/90 italic">
                      ⚡ {skep.counterArgument || skep.methodology}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
