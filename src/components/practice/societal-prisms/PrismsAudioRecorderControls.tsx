"use client";

import React, { useState } from "react";
import { SocietalPrismsPrompt } from "@/data/mockSocietalPrismsPromptsData";

interface PrismsAudioRecorderControlsProps {
  currentPrompt: SocietalPrismsPrompt;
  speechTranscript: string;
  isRecording: boolean;
  recordingSeconds: number;
  audioUrl: string | null;
  audioLevel: number;
  onUpdateTranscript: (text: string) => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onLoadSample: () => void;
  onAnalyze: () => void;
  onReset: () => void;
}

export const PrismsAudioRecorderControls: React.FC<PrismsAudioRecorderControlsProps> = ({
  currentPrompt,
  speechTranscript,
  isRecording,
  recordingSeconds,
  audioUrl,
  audioLevel,
  onUpdateTranscript,
  onStartRecording,
  onStopRecording,
  onLoadSample,
  onAnalyze,
  onReset
}) => {
  const [showModelContrast, setShowModelContrast] = useState<boolean>(false);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 backdrop-blur-md">
      {/* Waveform & Recording Status */}
      <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-rose-500 animate-ping' : 'bg-emerald-400'}`} />
            <h4 className="text-sm font-bold text-white">
              Phòng Thu & Phân Tích Diễn Ngôn Part 3 (Web Audio API)
            </h4>
          </div>
          <p className="text-xs text-slate-400">
            Nói trực tiếp hoặc nhập văn bản để thuật toán NLP đo lường mật độ 6 lăng kính
          </p>
        </div>

        {/* Live Audio Level Bars */}
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
                    ? 'bg-gradient-to-t from-purple-500 to-cyan-400'
                    : 'bg-slate-700'
                }`}
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>
      </div>

      {/* Transcript Textarea Input */}
      <div className="space-y-2">
        <textarea
          rows={5}
          value={speechTranscript}
          onChange={(e) => onUpdateTranscript(e.target.value)}
          placeholder="Nhập nội dung bài nói hoặc bật micro để ghi âm... (Sử dụng các lăng kính: From a regulatory standpoint, Examining corporate dynamics...)"
          className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-slate-600 leading-relaxed resize-y"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2.5">
          {!isRecording ? (
            <button
              onClick={onStartRecording}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-950/50 transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>🎙️</span>
              <span>Bật Mic Thu m ({recordingSeconds}s)</span>
            </button>
          ) : (
            <button
              onClick={onStopRecording}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-950/50 transition-all active:scale-95 flex items-center gap-1.5 animate-pulse"
            >
              <span>🛑</span>
              <span>Dừng Thu ({recordingSeconds}s)</span>
            </button>
          )}

          <button
            onClick={onLoadSample}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all border border-slate-700"
          >
            Nạp Bài Mẫu Band 8.5+
          </button>

          <button
            onClick={onReset}
            className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-medium transition-all"
          >
            Xóa
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowModelContrast((prev) => !prev)}
            className="px-3.5 py-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/40 text-purple-300 text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <span>⚖️</span>
            <span>{showModelContrast ? 'Ẩn Đối Chiếu Band 5.5 vs 8.5' : 'So Sánh Band 5.5 vs 8.5'}</span>
          </button>

          <button
            onClick={onAnalyze}
            disabled={speechTranscript.trim().length < 20}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 disabled:opacity-40 text-white text-xs font-bold shadow-lg shadow-indigo-950/50 transition-all active:scale-95 flex items-center gap-2"
          >
            <span>📊</span>
            <span>Đo Mật Độ 6 Lăng Kính</span>
          </button>
        </div>
      </div>

      {/* Playback player if recording available */}
      {audioUrl && (
        <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
          <span className="text-xs font-bold text-slate-300">🎧 Bản Ghi Âm Của Bạn ({recordingSeconds} giây):</span>
          <audio controls src={audioUrl} className="w-full h-10 rounded-lg" />
        </div>
      )}

      {/* Model Comparison Drawer */}
      {showModelContrast && (
        <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-4 animate-in fade-in">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-300 block">
            So Sánh Đối Chiếu: Lối Trả Lời Vị Kỷ (Band 5.5) vs Lăng Kính Thể Chế (Band 8.5+)
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Band 5.5 */}
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
              <span className="text-xs font-bold text-rose-400">
                ✗ Phong cách Band 5.5 (Egocentric Trap):
              </span>
              <p className="text-xs text-rose-200/90 font-serif italic">
                &ldquo;{currentPrompt.egocentricVsInstitutionalContrast.egocentricBand5Sample}&rdquo;
              </p>
            </div>

            {/* Band 8.5 */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
              <span className="text-xs font-bold text-emerald-400">
                ✓ Phong cách Band 8.5+ (6 Institutional Prisms):
              </span>
              <p className="text-xs text-emerald-200/90 font-serif italic">
                &ldquo;{currentPrompt.egocentricVsInstitutionalContrast.institutionalBand8Sample}&rdquo;
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-400 pt-1 border-t border-slate-800">
            💡 {currentPrompt.egocentricVsInstitutionalContrast.explanation}
          </p>
        </div>
      )}
    </div>
  );
};
