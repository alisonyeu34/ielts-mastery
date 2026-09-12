"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, Volume2, RotateCcw, Activity, HelpCircle } from "lucide-react";

interface PragmaticToneAudioPlayerProps {
  speakerIntonationNote?: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const PragmaticToneAudioPlayer: React.FC<PragmaticToneAudioPlayerProps> = ({
  speakerIntonationNote,
  isPlaying,
  onTogglePlay
}) => {
  const [playbackSeconds, setPlaybackSeconds] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackSeconds((prev) => (prev >= 12 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-cyan-400" />
          <h3 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
            Phân Tích Ngữ Điệu Học Thuật &amp; Hàm Ý Giọng Nói (Acoustic Pragmatics)
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-500">
          Listening Section 3 Nuance
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onTogglePlay}
            className="w-10 h-10 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white flex items-center justify-center transition-all shadow-md shadow-cyan-500/20 shrink-0"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
          </button>

          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-slate-200 block">
              Mô Phỏng Âm Học: Ngữ Điệu Giọng Nói (Intonation Contour)
            </span>
            <span className="text-[11px] text-slate-400">
              {isPlaying ? "Đang phân tích đường cong cao độ (Pitch Contour)..." : "Bấm để nghe & phân tích ngữ điệu"}
            </span>
          </div>
        </div>

        {/* Visual Intonation Waveform Simulation */}
        <div className="flex items-center gap-1">
          {[40, 65, 80, 50, 90, 75, 45, 30, 20, 15].map((height, i) => (
            <div
              key={i}
              className={`w-1.5 rounded-full transition-all duration-300 ${
                isPlaying ? "bg-cyan-400" : "bg-slate-700"
              }`}
              style={{
                height: isPlaying ? `${Math.max(10, (height * (playbackSeconds % 3 + 1)) % 32)}px` : `${height / 3}px`
              }}
            />
          ))}
        </div>
      </div>

      {/* Intonation Diagnostic Note */}
      {speakerIntonationNote && (
        <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200 flex items-start gap-2">
          <Activity className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-cyan-100 mb-0.5">Giải Mã Âm Học Ngữ Điệu:</strong>
            {speakerIntonationNote}
          </div>
        </div>
      )}
    </div>
  );
};
