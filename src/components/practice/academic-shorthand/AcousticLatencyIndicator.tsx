"use client";

import React from "react";
import { Section4Lecture } from "@/data/mockShorthandLecturesData";
import { Play, Pause, RotateCcw, Volume2, FastForward, Clock } from "lucide-react";

interface AcousticLatencyIndicatorProps {
  lecture: Section4Lecture;
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentTime: number;
  playbackSpeed: number;
  onChangeSpeed: (speed: number) => void;
  onResetAudio: () => void;
}

export const AcousticLatencyIndicator: React.FC<AcousticLatencyIndicatorProps> = ({
  lecture,
  isPlaying,
  onTogglePlay,
  currentTime,
  playbackSpeed,
  onChangeSpeed,
  onResetAudio
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progressPct = Math.min((currentTime / lecture.durationSeconds) * 100, 100);

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Lecture Info Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm">{lecture.title}</h3>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-cyan-400 font-medium">{lecture.academicDiscipline}</span>
              <span>&bull;</span>
              <span>Accent: {lecture.accent}</span>
              <span>&bull;</span>
              <span>{lecture.speakerName}</span>
            </div>
          </div>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center gap-2">
          {/* Speed Selector */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
            {[0.75, 1.0, 1.5].map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => onChangeSpeed(spd)}
                className={`px-2 py-1 rounded font-mono font-medium transition-colors ${
                  playbackSpeed === spd
                    ? "bg-cyan-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {spd === 1.0 ? "1x" : `${spd}x`}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onResetAudio}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-colors"
            title="Nghe lại từ đầu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onTogglePlay}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-500/20 flex items-center gap-1.5"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Tạm Dừng</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Bắt Đầu Nghe</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress Timeline with Question Timestamp Cues */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{formatTime(currentTime)}</span>
          </div>
          <span>{formatTime(lecture.durationSeconds)}</span>
        </div>

        {/* Multi-section Progress Bar with Cue Points */}
        <div className="relative w-full bg-slate-800 rounded-full h-3 overflow-visible">
          {/* Question Cue Pins */}
          {lecture.questions.map((q) => {
            const cuePct = (q.timestampSeconds / lecture.durationSeconds) * 100;
            return (
              <div
                key={q.id}
                className="absolute top-0 bottom-0 w-1 bg-amber-400/80 z-10 cursor-pointer group"
                style={{ left: `${cuePct}%` }}
                title={`Q${q.questionNumber}: ${q.sectionContext}`}
              >
                <div className="hidden group-hover:block absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-900 border border-slate-700 text-[10px] text-amber-300 px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-20">
                  Q{q.questionNumber}: {q.sectionContext}
                </div>
              </div>
            );
          })}

          <div
            className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Active Snippet Display */}
      <div className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl text-xs text-slate-300 leading-relaxed italic">
        {lecture.audioSections.find(
          (s) => currentTime >= s.startSec && currentTime <= s.endSec
        )?.transcriptSnippet || lecture.introTranscript}
      </div>
    </div>
  );
};
