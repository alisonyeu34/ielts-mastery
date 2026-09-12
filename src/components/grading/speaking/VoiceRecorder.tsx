"use client";

import React, { useState } from "react";
import {
  Mic,
  Square,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Send,
  AlertCircle,
  Volume2,
  FileText,
  Edit3,
} from "lucide-react";
import { useAudioRecorder, PauseStats } from "@/hooks/useAudioRecorder";
import { AudioWaveform } from "@/components/grading/speaking/AudioWaveform";
import { FluencyMetricsCard } from "@/components/grading/speaking/FluencyMetricsCard";
import { cn } from "@/lib/utils";

interface VoiceRecorderProps {
  onEvaluate: (transcript: string, audioBlob: Blob | null, pauseStats: PauseStats) => void;
  isEvaluating: boolean;
  sampleTranscriptHint?: string;
  className?: string;
}

export function VoiceRecorder({
  onEvaluate,
  isEvaluating,
  sampleTranscriptHint,
  className,
}: VoiceRecorderProps) {
  const {
    isRecording,
    isPaused,
    recordingTimeSeconds,
    audioBlob,
    audioUrl,
    frequencyData,
    pauseStats,
    permissionError,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetRecording,
  } = useAudioRecorder();

  const [transcript, setTranscript] = useState("");
  const [showManualEdit, setShowManualEdit] = useState(false);

  const handleStopAndPrepare = () => {
    stopRecording();
    if (!transcript && sampleTranscriptHint) {
      setTranscript(sampleTranscriptHint);
    }
  };

  const handleResetAll = () => {
    resetRecording();
    setTranscript("");
    setShowManualEdit(false);
  };

  const handleFillSampleText = () => {
    if (sampleTranscriptHint) {
      setTranscript(sampleTranscriptHint);
      setShowManualEdit(true);
    }
  };

  const handleSubmit = () => {
    if (!transcript.trim() && sampleTranscriptHint) {
      onEvaluate(sampleTranscriptHint, audioBlob, pauseStats);
    } else {
      onEvaluate(transcript.trim(), audioBlob, pauseStats);
    }
  };

  const words = transcript.trim() ? transcript.trim().split(/\s+/).length : 0;

  return (
    <div className={cn("rounded-3xl border border-border bg-card p-5 sm:p-7 space-y-5 shadow-sm", className)}>
      {/* Top Header & Timer */}
      <div className="flex items-center justify-between border-b border-border/80 pb-4">
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <Mic className="h-4 w-4 text-indigo-500" />
            Phòng Thu Âm Câu Trả Lời
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Bấm "Bắt đầu nói" để ghi âm trực tiếp và quan sát sóng âm thời gian thực.
          </p>
        </div>

        {/* Live Timer */}
        <div
          className={cn(
            "flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold border",
            isRecording
              ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 animate-pulse"
              : "bg-secondary text-muted-foreground border-border"
          )}
        >
          <span className="h-2 w-2 rounded-full bg-rose-500" />
          <span>
            {String(Math.floor(recordingTimeSeconds / 60)).padStart(2, "0")}:
            {String(recordingTimeSeconds % 60).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Permission error banner */}
      {permissionError && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{permissionError}</p>
            <p className="mt-1 opacity-90">
              Bạn vẫn có thể nhập transcript thủ công bên dưới để test hệ thống chấm AI.
            </p>
          </div>
        </div>
      )}

      {/* Real-time Waveform Canvas */}
      <AudioWaveform
        frequencyData={frequencyData}
        isRecording={isRecording}
        isPaused={isPaused}
      />

      {/* Primary Recording Control Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 py-1">
        {!isRecording && !audioUrl && (
          <button
            type="button"
            onClick={startRecording}
            className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-600/30 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
          >
            <Mic className="h-5 w-5" />
            <span>Bắt đầu thu âm câu trả lời</span>
          </button>
        )}

        {isRecording && (
          <>
            <button
              type="button"
              onClick={isPaused ? resumeRecording : pauseRecording}
              className="px-4 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {isPaused ? <Play className="h-4 w-4 text-emerald-500" /> : <Pause className="h-4 w-4 text-amber-500" />}
              <span>{isPaused ? "Tiếp tục nói" : "Tạm dừng"}</span>
            </button>

            <button
              type="button"
              onClick={handleStopAndPrepare}
              className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-600/30 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <Square className="h-4 w-4 fill-white" />
              <span>Dừng thu âm & Chuẩn bị nộp</span>
            </button>
          </>
        )}

        {audioUrl && !isRecording && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetAll}
              className="px-4 py-2 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Ghi âm lại</span>
            </button>
          </div>
        )}
      </div>

      {/* Audio Playback Player when recorded */}
      {audioUrl && !isRecording && (
        <div className="p-4 rounded-2xl bg-secondary/40 border border-border/80 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Bản Thu Âm Của Bạn:
          </span>
          <audio src={audioUrl} controls className="w-full h-9 rounded-lg" />
        </div>
      )}

      {/* Fluency Telemetry Metrics when recorded */}
      {pauseStats.totalDurationSeconds > 0 && (
        <FluencyMetricsCard pauseStats={pauseStats} wordCount={words} />
      )}

      {/* Spoken Transcript Area */}
      <div className="space-y-2 pt-2 border-t border-border/80 text-xs">
        <div className="flex items-center justify-between">
          <label className="font-bold text-foreground flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-indigo-500" />
            Nội Dung Bản Nói (Spoken Transcript):
          </label>

          <button
            type="button"
            onClick={handleFillSampleText}
            className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            [ Điền câu mẫu để test nhanh ]
          </button>
        </div>

        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Nội dung bạn vừa nói sẽ hiển thị tại đây hoặc gõ trực tiếp transcript để AI phân tích..."
          rows={3}
          className="w-full rounded-2xl border border-border bg-secondary/15 p-3.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 leading-relaxed resize-none font-medium"
        />
      </div>

      {/* Submit Action */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          disabled={isEvaluating || (!transcript.trim() && !sampleTranscriptHint)}
          onClick={handleSubmit}
          className={cn(
            "px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer",
            transcript.trim() || sampleTranscriptHint
              ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:scale-105"
              : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
          )}
        >
          <Sparkles className="h-4 w-4" />
          <span>{isEvaluating ? "AI Examiner Đang Chấm..." : "Nộp bài cho Examiner Chấm AI"}</span>
        </button>
      </div>
    </div>
  );
}
