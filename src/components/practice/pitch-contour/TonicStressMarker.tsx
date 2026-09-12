"use client";

import React from "react";
import { SpeakingPart3PitchExercise } from "@/data/mockPitchCadenceData";
import { Activity, Sparkles, HelpCircle } from "lucide-react";

interface TonicStressMarkerProps {
  exercise: SpeakingPart3PitchExercise;
}

export const TonicStressMarker: React.FC<TonicStressMarkerProps> = ({
  exercise
}) => {
  const { nativeModelAnswer, tonicNuclearSyllable, nuclearStressExplanation } = exercise;

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <h3 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
            Vị Trí Đặt Trọng Âm Hạt Nhân (Tonic / Nuclear Stress Placement)
          </h3>
        </div>
        <span className="text-[11px] font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
          Nuclear Syllable: {tonicNuclearSyllable}
        </span>
      </div>

      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
        <span className="text-xs text-slate-400 block font-sans">
          Câu mẫu Speaking Part 3:
        </span>
        <p className="text-base font-medium text-slate-100 font-sans leading-relaxed">
          {renderNuclearStressHighlight(nativeModelAnswer, tonicNuclearSyllable)}
        </p>
      </div>

      <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-200 leading-relaxed font-sans">
        <strong className="block text-indigo-100 mb-0.5">Bản Chất Âm Học (Acoustic Mechanics):</strong>
        {nuclearStressExplanation}
      </div>
    </div>
  );
};

function renderNuclearStressHighlight(fullSentence: string, targetWordOrSyllable: string) {
  const targetBase = targetWordOrSyllable.replace(/-/g, "").toLowerCase();

  const words = fullSentence.split(" ");
  return (
    <>
      {words.map((w, idx) => {
        const cleanW = w.toLowerCase().replace(/[^a-z]/g, "");
        const isTarget = cleanW.includes(targetBase) || targetBase.includes(cleanW);

        if (isTarget) {
          return (
            <span
              key={idx}
              className="inline-block px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm mx-0.5"
            >
              {w} &searrow;
            </span>
          );
        }
        return <span key={idx}> {w}</span>;
      })}
    </>
  );
}
