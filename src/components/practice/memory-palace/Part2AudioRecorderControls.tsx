"use client";

import React, { useState } from "react";
import { MemoryPalacePrompt } from "@/data/mockMemoryPalacePromptsData";

interface Part2AudioRecorderControlsProps {
  currentPrompt: MemoryPalacePrompt;
  phase: 'idle' | 'prep' | 'speaking' | 'completed';
  speakingTime: number;
  isRecording: boolean;
  audioUrl: string | null;
  audioLevel: number; // 0 - 100
  onStartSpeaking: () => void;
  onFinishSpeaking: () => void;
  onResetSession: () => void;
}

export const Part2AudioRecorderControls: React.FC<Part2AudioRecorderControlsProps> = ({
  currentPrompt,
  phase,
  speakingTime,
  isRecording,
  audioUrl,
  audioLevel,
  onStartSpeaking,
  onFinishSpeaking,
  onResetSession
}) => {
  const [showModelTranscript, setShowModelTranscript] = useState<boolean>(false);

  const isSpeaking = phase === 'speaking';
  const isCompleted = phase === 'completed';

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 backdrop-blur-md">
      {/* Waveform & Level Meter Display */}
      <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h4 className="text-sm font-bold text-white">
              Ghi Âm Web Audio API Thời Gian Thực
            </h4>
          </div>
          <p className="text-xs text-slate-400">
            Hệ thống phân tích cao độ và kiểm soát độ dài tự động dừng ở mốc 120 giây
          </p>
        </div>

        {/* Dynamic Waveform Visualizer */}
        <div className="flex items-center gap-1.5 h-8 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
          {[...Array(16)].map((_, i) => {
            const height = isRecording
              ? Math.max(15, Math.min(100, (audioLevel * ((i % 5) + 1)) / 4))
              : 20;

            return (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-75 ${
                  isRecording
                    ? 'bg-gradient-to-t from-emerald-500 to-cyan-400'
                    : 'bg-slate-700'
                }`}
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          {phase !== 'speaking' && phase !== 'completed' && (
            <button
              onClick={onStartSpeaking}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-bold shadow-lg shadow-emerald-950/50 transition-all active:scale-95 flex items-center gap-2"
            >
              <span>🎙️</span>
              <span>Bật Mic & Bắt Đầu Nói 2 Phút</span>
            </button>
          )}

          {isSpeaking && (
            <button
              onClick={onFinishSpeaking}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-sm font-bold shadow-lg shadow-rose-950/50 transition-all active:scale-95 flex items-center gap-2 animate-pulse"
            >
              <span>🛑</span>
              <span>Hoàn Thành & Chẩn Đoán Nhịp Độ</span>
            </button>
          )}

          <button
            onClick={onResetSession}
            className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold transition-all"
          >
            Làm Lại Từ Đầu
          </button>
        </div>

        {/* Toggle Model Band 8.5 Transcript */}
        <button
          onClick={() => setShowModelTranscript((prev) => !prev)}
          className="px-4 py-3 rounded-xl bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-500/40 text-indigo-300 text-xs font-bold transition-all flex items-center gap-2"
        >
          <span>📜</span>
          <span>{showModelTranscript ? 'Ẩn Bài Mẫu Band 8.5+' : 'Xem Bài Mẫu Band 8.5+'}</span>
        </button>
      </div>

      {/* Recorded Audio Playback */}
      {audioUrl && isCompleted && (
        <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <span>🎧</span>
            <span>Nghe Lại Bản Ghi Âm Của Bạn ({speakingTime} giây):</span>
          </span>
          <audio controls src={audioUrl} className="w-full h-10 rounded-lg" />
        </div>
      )}

      {/* Band 8.5+ Model Response Transcript Drawer */}
      {showModelTranscript && (
        <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Bài Mẫu Band 8.5+ (2-Minute Model Monologue)
            </span>
            <span className="text-[11px] text-slate-400">
              Đúng cấu trúc 4 phòng Lâu đài trí nhớ
            </span>
          </div>

          <div className="text-xs text-slate-300 leading-relaxed space-y-3 max-h-64 overflow-y-auto pr-2">
            {currentPrompt.band8Transcript.split('\n\n').map((para, idx) => (
              <p key={idx} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="font-bold text-indigo-400 block mb-1">
                  [Phòng {idx + 1}]:
                </span>
                {para}
              </p>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 space-y-1 text-[11px] text-slate-400">
            <span className="font-bold text-slate-300">Ghi chú từ giám khảo Cambridge:</span>
            {currentPrompt.examinerNotes.map((note, idx) => (
              <p key={idx}>• {note}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
