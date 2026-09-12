"use client";

import React from "react";
import { AccentType, ACCENT_CONFIGS } from "@/lib/webAudioLooperEngine";
import { Radio, Volume2 } from "lucide-react";

interface AccentSwitcherBarProps {
  currentAccent: AccentType;
  onSwitchAccent: (accent: AccentType) => void;
  isPlaying: boolean;
}

export const AccentSwitcherBar: React.FC<AccentSwitcherBarProps> = ({
  currentAccent,
  onSwitchAccent,
  isPlaying,
}) => {
  const accents: AccentType[] = ["british", "australian", "american", "scottish"];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-100 flex items-center gap-2">
              <span>Ma Trận 4 Ngữ Điệu Khảo Thí Cambridge</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-mono">
                1-Touch Switch
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Chuyển đổi tức thì cùng một đoạn hội thoại qua 4 accent để tai quen với sự sai lệch âm vị.
            </p>
          </div>
        </div>

        {isPlaying && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-500/30 font-medium">
            <Volume2 className="w-3.5 h-3.5 animate-bounce" />
            <span>Đang phát {ACCENT_CONFIGS[currentAccent].label}</span>
          </div>
        )}
      </div>

      {/* Accent 4-Button Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {accents.map((accKey) => {
          const cfg = ACCENT_CONFIGS[accKey];
          const isSelected = currentAccent === accKey;

          return (
            <button
              key={accKey}
              onClick={() => onSwitchAccent(accKey)}
              className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                isSelected
                  ? "bg-cyan-950/50 border-cyan-500 text-cyan-100 shadow-lg shadow-cyan-500/15 scale-[1.02] ring-1 ring-cyan-400"
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-2xl">{cfg.flag}</span>
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold ${
                    isSelected
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                      : "bg-slate-800 text-slate-500"
                  }`}
                >
                  {cfg.localeCode}
                </span>
              </div>

              <div className="text-xs font-bold text-slate-100 mb-1">{cfg.label}</div>

              <div className="text-[10px] text-slate-400 truncate">
                {cfg.phoneticFeatures[0]}
              </div>

              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
