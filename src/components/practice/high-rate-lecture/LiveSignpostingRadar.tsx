"use client";

import React from "react";
import {
  Radar,
  Radio,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Zap,
  Volume2
} from "lucide-react";
import {
  SignpostMarker,
  LectureQuestionItem,
  LectureScenario
} from "@/lib/timeStretchingDSP";

interface LiveSignpostingRadarProps {
  scenario: LectureScenario;
  currentTimeSec: number;
  activeSignpost: SignpostMarker | null;
  approachingQuestion: LectureQuestionItem | null;
}

export const LiveSignpostingRadar: React.FC<LiveSignpostingRadarProps> = ({
  scenario,
  currentTimeSec,
  activeSignpost,
  approachingQuestion
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Radar Tín Hiệu Dẫn Đường Thời Gian Thực (Signposting Radar)
            </h3>
            <p className="text-[11px] text-slate-400">
              Quét các cụm từ chuyển ý, định nghĩa và cảnh báo vị trí xuất hiện câu hỏi
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
          Live Acoustic Stream
        </span>
      </div>

      {/* Approaching Question Alert Banner */}
      {approachingQuestion && (
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/80 to-rose-950/60 border border-amber-500/50 flex items-center justify-between gap-3 animate-pulse shadow-lg shadow-amber-950/30">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>CẢNH BÁO: Câu hỏi Q{approachingQuestion.questionNumber} sắp xuất hiện trong {Math.max(1, Math.round(approachingQuestion.timestampSec - currentTimeSec))}s!</span>
          </div>
          <span className="text-[10px] font-mono uppercase bg-amber-900/80 px-2 py-0.5 rounded text-amber-200 border border-amber-500/40 shrink-0">
            Target: {approachingQuestion.grammarConstraint.replace("_", " ")}
          </span>
        </div>
      )}

      {/* Active Signpost Glowing Card */}
      {activeSignpost ? (
        <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/60 space-y-2 animate-fade-in shadow-lg shadow-cyan-950/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              [SIGNPOST ACTIVE at {formatTime(activeSignpost.timestampSec)}]
            </span>
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-cyan-900/60 text-cyan-200 border border-cyan-500/40">
              Category: {activeSignpost.category}
            </span>
          </div>

          <p className="text-xs font-serif italic text-white font-medium">
            &ldquo;{activeSignpost.cuePhrase}&rdquo;
          </p>

          <div className="text-[11px] text-slate-300">
            <strong>Mục đích dẫn đường:</strong> {activeSignpost.purposeSummary}
          </div>

          <div className="text-[10px] font-mono text-cyan-400/90 pt-1 border-t border-cyan-900/50">
            Hiện tượng âm học: {activeSignpost.acousticPhenomenon}
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center text-xs text-slate-500 italic">
          Radar đang quét tín hiệu âm học từ bài giảng...
        </div>
      )}

      {/* Timeline Signpost List */}
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {scenario.signpostMarkers.map((marker) => {
          const isPassed = currentTimeSec >= marker.timestampSec;
          const isCurrent = activeSignpost?.id === marker.id;

          return (
            <div
              key={marker.id}
              className={`p-2.5 rounded-lg border text-xs transition-all flex items-center justify-between gap-2 ${
                isCurrent
                  ? "bg-cyan-950/50 border-cyan-500 text-cyan-200 font-bold"
                  : isPassed
                  ? "bg-slate-950/40 border-slate-800 text-slate-400 opacity-60"
                  : "bg-slate-950/20 border-slate-850 text-slate-500"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-mono text-[10px] text-slate-400 shrink-0">
                  {formatTime(marker.timestampSec)}
                </span>
                <span className="truncate font-serif italic">
                  &ldquo;{marker.cuePhrase}&rdquo;
                </span>
              </div>
              <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 shrink-0">
                {marker.category}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
