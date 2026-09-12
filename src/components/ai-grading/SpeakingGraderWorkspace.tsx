"use client";

import React from "react";
import {
  Mic,
  Square,
  Sparkles,
  Volume2,
  Clock,
  Play,
  RotateCcw,
  AlertTriangle,
  Headphones,
  CheckCircle2,
} from "lucide-react";
import { DEFAULT_SPEAKING_PROMPTS } from "@/hooks/useAIGradingSession";

interface SpeakingGraderWorkspaceProps {
  selectedPrompt: typeof DEFAULT_SPEAKING_PROMPTS[0];
  onSelectPrompt: (prompt: typeof DEFAULT_SPEAKING_PROMPTS[0]) => void;
  isRecording: boolean;
  recordingSeconds: number;
  audioUrl: string | null;
  audioWaveformLevels: number[];
  isAnalyzing: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onSubmit: () => void;
}

export function SpeakingGraderWorkspace({
  selectedPrompt,
  onSelectPrompt,
  isRecording,
  recordingSeconds,
  audioUrl,
  audioWaveformLevels,
  isAnalyzing,
  onStartRecording,
  onStopRecording,
  onSubmit,
}: SpeakingGraderWorkspaceProps) {
  const minutes = Math.floor(recordingSeconds / 60);
  const seconds = recordingSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="space-y-5">
      {/* 1. Speaking Prompt Selector Card */}
      <div className="rounded-3xl border border-border bg-card p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Mic className="h-4 w-4" />
            </span>
            <h3 className="font-black text-sm text-foreground">
              Phòng Thu Âm & Chấm Điểm Speaking AI (Fluency & Phonetics)
            </h3>
          </div>

          <div className="flex items-center p-0.5 rounded-xl bg-secondary border border-border text-xs font-bold">
            {DEFAULT_SPEAKING_PROMPTS.map((prompt) => (
              <button
                key={prompt.part}
                type="button"
                onClick={() => onSelectPrompt(prompt)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedPrompt.part === prompt.part
                    ? "bg-card text-foreground shadow-xs font-black"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {prompt.part === "part1" ? "Speaking Part 1 (45s)" : "Speaking Part 2 (2 phút)"}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Prompt Question */}
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-primary">{selectedPrompt.topic}</span>
            <span className="font-mono text-muted-foreground">
              Thời lượng gợi ý: ~{selectedPrompt.suggestedDurationSec}s
            </span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-foreground leading-relaxed">
            {selectedPrompt.question}
          </p>
        </div>
      </div>

      {/* 2. Audio Recording & Waveform Visualizer */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm text-center space-y-6">
        {/* Waveform Bars Display */}
        <div className="h-24 w-full rounded-2xl bg-secondary/30 border border-border/70 flex items-center justify-center gap-1.5 px-6 overflow-hidden">
          {audioWaveformLevels.length > 0 ? (
            audioWaveformLevels.map((lvl, idx) => (
              <div
                key={idx}
                className="w-1.5 rounded-full bg-gradient-to-t from-purple-500 to-primary transition-all duration-150"
                style={{ height: `${Math.max(12, lvl)}%` }}
              />
            ))
          ) : (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Headphones className="h-4 w-4" />
              <span>Nhấn nút bên dưới để bắt đầu thu âm câu trả lời</span>
            </div>
          )}
        </div>

        {/* Recording Timer & Status */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            {isRecording && <span className="h-3 w-3 rounded-full bg-rose-600 animate-ping" />}
            <span className="text-3xl font-black font-mono text-foreground tracking-tight">
              {formattedTime}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {isRecording
              ? "Đang ghi âm phổ âm thanh & quét khoảng lặng ngập ngừng (>2s)..."
              : audioUrl
              ? "Đã hoàn tất đoạn ghi âm. Bạn có thể nghe lại hoặc gửi chấm điểm."
              : "Sẵn sàng thu âm"}
          </p>
        </div>

        {/* Audio Playback if recorded */}
        {audioUrl && !isRecording && (
          <div className="max-w-md mx-auto p-3 rounded-2xl bg-secondary/50 border border-border">
            <audio src={audioUrl} controls className="w-full h-10" />
          </div>
        )}

        {/* Action Buttons: Record / Stop / Submit */}
        <div className="flex items-center justify-center gap-4 pt-2">
          {!isRecording ? (
            <button
              type="button"
              onClick={onStartRecording}
              className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-rose-600/20 transition-transform hover:scale-105 cursor-pointer"
            >
              <Mic className="h-4 w-4" />
              <span>{audioUrl ? "Thu Âm Lại Lượt Mới" : "Bắt Đầu Ghi Âm"}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onStopRecording}
              className="px-6 py-3 rounded-2xl bg-secondary hover:bg-secondary/80 text-rose-600 dark:text-rose-400 font-black text-xs flex items-center gap-2 border border-rose-500/30 transition-all hover:scale-105 cursor-pointer"
            >
              <Square className="h-4 w-4 fill-rose-600" />
              <span>Dừng Ghi Âm</span>
            </button>
          )}

          {audioUrl && !isRecording && (
            <button
              type="button"
              disabled={isAnalyzing}
              onClick={onSubmit}
              className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs flex items-center gap-2 shadow-lg shadow-primary/20 transition-transform hover:scale-105 cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin" />
                  <span>Đang Phân Tích Độ Trôi Chảy & Phát Âm...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Gửi Chấm Điểm Speaking AI</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
