"use client";

import React from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Users,
  Mic,
  GraduationCap
} from "lucide-react";
import { Section3DialogueScenario } from "@/data/mockSection3DialoguesData";
import { ConsensusResolutionResult } from "@/lib/consensusStateMachine";

interface MultiSpeakerLiveTrackerProps {
  scenario: Section3DialogueScenario;
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentTimeSec: number;
  onSeek: (seconds: number) => void;
  consensusResolution: ConsensusResolutionResult;
}

export const MultiSpeakerLiveTracker: React.FC<MultiSpeakerLiveTrackerProps> = ({
  scenario,
  isPlaying,
  onTogglePlay,
  currentTimeSec,
  onSeek,
  consensusResolution
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const activeTurn = consensusResolution.activeTurn;
  const activeSpeakerName = activeTurn?.speakerName || "";

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
      {/* Scenario Title and Topic Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-full bg-indigo-950 border border-indigo-700/50 text-indigo-300">
              {scenario.academicDiscipline}
            </span>
            <span className="text-xs font-medium text-slate-400">
              IELTS Listening Section 3
            </span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            {scenario.title}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Chủ đề: {scenario.topic}
          </p>
        </div>

        {/* Live Audio Status */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className={`w-2.5 h-2.5 rounded-full ${isPlaying ? "bg-emerald-400 animate-ping" : "bg-slate-500"}`} />
          <span className="text-xs font-semibold text-slate-300">
            {isPlaying ? "Đang phát đoạn hội thoại" : "Tạm dừng"}
          </span>
        </div>
      </div>

      {/* 3 Live Speaker Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {scenario.speakers.map((speaker) => {
          const isActive = activeSpeakerName === speaker.name;

          return (
            <div
              key={speaker.id}
              className={`relative rounded-xl p-3.5 border transition-all duration-300 ${
                isActive
                  ? "border-indigo-500 bg-indigo-950/30 ring-2 ring-indigo-500/30 shadow-lg scale-[1.02]"
                  : "border-slate-800 bg-slate-950/40 opacity-70 hover:opacity-100"
              }`}
            >
              {isActive && (
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                  <Mic className="w-3 h-3 animate-pulse" />
                  <span>SPEAKING</span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shadow-md ${speaker.avatarColor}`}
                >
                  {speaker.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1">
                    {speaker.name}
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    {speaker.role}
                  </span>
                </div>
              </div>

              {/* Status indicator */}
              <div className="mt-2">
                <span className={`px-2 py-0.5 text-[10px] rounded border font-medium ${
                  isActive
                    ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40"
                    : "bg-slate-850 text-slate-400 border-slate-800"
                }`}>
                  {isActive ? "Đang phát biểu ý kiến" : "Đang lắng nghe"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Transcript Subtitle Snippet */}
      {activeTurn && (
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 mb-5 animate-fade-in">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5" />
              {activeTurn.speakerName} ({formatTime(activeTurn.startSec)} - {formatTime(activeTurn.endSec)})
            </span>
            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              State: {activeTurn.state}
            </span>
          </div>
          <p className="text-sm font-serif italic text-slate-200">
            &ldquo;{activeTurn.utteranceText}&rdquo;
          </p>
          <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
            <span className="font-semibold text-slate-300">Ý tóm tắt:</span>
            <span>{activeTurn.corePointSummary}</span>
          </div>
        </div>
      )}

      {/* Audio Timeline Player Controls */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5">
        <div className="flex items-center gap-4">
          <button
            onClick={onTogglePlay}
            className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/30 transition-transform active:scale-95"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          <button
            onClick={() => onSeek(0)}
            className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
            title="Restart Audio"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="flex-1">
            <input
              type="range"
              min={0}
              max={scenario.durationSec}
              value={currentTimeSec}
              onChange={(e) => onSeek(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
              <span>{formatTime(currentTimeSec)}</span>
              <span>{formatTime(scenario.durationSec)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
