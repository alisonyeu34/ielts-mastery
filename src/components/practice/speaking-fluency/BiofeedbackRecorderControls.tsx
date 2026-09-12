"use client";

import React from "react";
import { SpeakingFluencyPrompt } from "@/data/mockFluencyPromptsData";
import {
  Mic,
  Square,
  Sparkles,
  HelpCircle,
  Clock,
  Radio,
} from "lucide-react";

interface BiofeedbackRecorderControlsProps {
  prompt: SpeakingFluencyPrompt;
  isRecording: boolean;
  recordingSeconds: number;
  liveTranscript: string;
  onStart: () => void;
  onStop: () => void;
}

export const BiofeedbackRecorderControls: React.FC<BiofeedbackRecorderControlsProps> = ({
  prompt,
  isRecording,
  recordingSeconds,
  liveTranscript,
  onStart,
  onStop,
}) => {
  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl mb-6">
      {/* Prompt Question Display Card */}
      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase">
            {prompt.part} Topic
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Mục tiêu nhịp độ: {prompt.targetWpmRange.min} - {prompt.targetWpmRange.max} WPM
          </span>
        </div>
        <h3 className="text-base font-black text-slate-100 mb-2">
          {prompt.promptQuestion}
        </h3>

        {prompt.cueCards && (
          <div className="space-y-1 pl-4 border-l-2 border-cyan-500/40 text-xs text-slate-300">
            {prompt.cueCards.map((cue, idx) => (
              <div key={`cue_${idx}`}>• {cue}</div>
            ))}
          </div>
        )}
      </div>

      {/* Main Recording Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
        {/* Record / Stop Button */}
        <div>
          {isRecording ? (
            <button
              onClick={onStop}
              className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-2xl text-xs transition-all shadow-xl shadow-rose-600/30 flex items-center gap-2.5 animate-pulse"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>Dừng Thu m & Phân Tích Fluency</span>
            </button>
          ) : (
            <button
              onClick={onStart}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-2xl text-xs transition-all shadow-xl shadow-cyan-500/25 flex items-center gap-2.5 cursor-pointer"
            >
              <Mic className="w-4 h-4" />
              <span>Bắt Đầu Thu m Phát Biểu</span>
            </button>
          )}
        </div>

        {/* Live Timer */}
        <div className="flex items-center gap-2 font-mono text-sm bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-400 font-semibold uppercase text-xs">Thời Gian:</span>
          <span
            className={`text-xl font-bold ${
              isRecording ? "text-cyan-400 animate-pulse" : "text-slate-400"
            }`}
          >
            {formatTimer(recordingSeconds)}
          </span>
        </div>
      </div>

      {/* Live Transcript Stream */}
      <div className="mt-4">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-cyan-400" />
          <span>Văn Bản Nhận Diện Giọng Nói Thời Gian Thực (Live Transcript):</span>
        </div>
        <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs md:text-sm font-serif text-slate-200 leading-relaxed min-h-[70px] max-h-36 overflow-y-auto custom-scrollbar">
          {liveTranscript || (
            <span className="text-slate-500 italic">
              {isRecording
                ? "Đang lắng nghe giọng nói của bạn... Hãy phát biểu tự nhiên."
                : "Nhấn 'Bắt Đầu Thu m' để kích hoạt micro và radar bắt từ đệm."}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
