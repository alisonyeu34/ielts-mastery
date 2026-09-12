"use client";

import React from "react";
import { AccentType, ACCENT_CONFIGS, speakMultiAccentUtterance } from "@/lib/webAudioLooperEngine";
import { AccentDialectNote } from "@/data/mockMultiAccentAudioData";
import { Sparkles, Volume2, ShieldAlert } from "lucide-react";

interface AccentPhoneticGuideCardProps {
  currentAccent: AccentType;
  dialectNote: AccentDialectNote;
}

export const AccentPhoneticGuideCard: React.FC<AccentPhoneticGuideCardProps> = ({
  currentAccent,
  dialectNote,
}) => {
  const cfg = ACCENT_CONFIGS[currentAccent];

  const handlePlayWord = (word: string) => {
    speakMultiAccentUtterance(word, currentAccent, 0.9);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl mb-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{cfg.flag}</span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-slate-100">
                Cẩm Nang m Học Giọng {dialectNote.accentLabel}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                Spotlight Rules
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
              {dialectNote.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Phonetic Features Tag List */}
      <div className="flex flex-wrap gap-2 mb-4">
        {cfg.phoneticFeatures.map((feat, idx) => (
          <span
            key={`feat_${idx}`}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-950 border border-cyan-500/30 text-cyan-200 flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>{feat}</span>
          </span>
        ))}
      </div>

      {/* Specific Word Shifts Breakdown */}
      <div className="space-y-3">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>Các Từ Khóa Bị Biến m Điển Hình Trong Đề Thi:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dialectNote.keyPhoneticShifts.map((shift, idx) => (
            <div
              key={`shift_${idx}`}
              className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 flex items-start justify-between gap-3 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-200 text-sm font-mono">
                    "{shift.word}"
                  </span>
                  <span className="text-xs text-slate-500 line-through font-mono">
                    {shift.standardIpa}
                  </span>
                  <span className="text-xs text-amber-400 font-bold font-mono">
                    &rarr; {shift.accentedIpa}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {shift.explanation}
                </p>
              </div>

              <button
                onClick={() => handlePlayWord(shift.word)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-300 transition-all shrink-0"
                title={`Nghe thử phát âm "${shift.word}"`}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
