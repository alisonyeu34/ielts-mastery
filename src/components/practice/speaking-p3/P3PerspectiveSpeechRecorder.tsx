"use client";

import React from "react";
import {
  Mic,
  Square,
  Sparkles,
  BookOpen,
  Send,
  RotateCcw,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  SpeakingP3Topic,
  SocialPerspectiveKey,
  SOCIETAL_LENSES_METADATA,
} from "@/data/mockSpeakingP3Data";
import { PitchAnalysisResult } from "@/lib/pitchDetectionEngine";
import { TerminalPitchCanvas } from "./TerminalPitchCanvas";
import { cn } from "@/lib/utils";

interface P3PerspectiveSpeechRecorderProps {
  topic: SpeakingP3Topic;
  selectedLensKeys: SocialPerspectiveKey[];
  transcriptText: string;
  isRecording: boolean;
  recordDuration: number;
  pitchSamples: number[];
  currentPitch: number;
  terminalPitchResult: PitchAnalysisResult | null;
  onChangeTranscript: (val: string) => void;
  onLoadModelResponse: () => void;
  onStartRecord: () => void;
  onStopRecord: () => void;
  onSubmitAttempt: () => void;
  className?: string;
}

export function P3PerspectiveSpeechRecorder({
  topic,
  selectedLensKeys,
  transcriptText,
  isRecording,
  recordDuration,
  pitchSamples,
  currentPitch,
  terminalPitchResult,
  onChangeTranscript,
  onLoadModelResponse,
  onStartRecord,
  onStopRecord,
  onSubmitAttempt,
  className,
}: P3PerspectiveSpeechRecorderProps) {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `0${mins}:${rem < 10 ? `0${rem}` : rem}`;
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Top Question & Lenses Header */}
      <div className="space-y-3 border-b border-border/70 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
            Speaking Part 3 • Thảo Luận Vĩ Mô
          </span>

          <button
            type="button"
            onClick={onLoadModelResponse}
            className="px-3 py-1 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            <span>Nạp Bài Nói Mẫu 8.5+</span>
          </button>
        </div>

        <h3 className="text-lg sm:text-xl font-black text-foreground">
          "{topic.question}"
        </h3>

        {/* Selected Lenses Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-mono text-muted-foreground font-bold">
            Góc nhìn đã kích hoạt:
          </span>
          {selectedLensKeys.map((k) => {
            const meta = SOCIETAL_LENSES_METADATA[k];
            return (
              <span
                key={k}
                className={cn(
                  "text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-lg border",
                  meta.bgLight,
                  meta.borderColor
                )}
              >
                {meta.labelVi}
              </span>
            );
          })}
        </div>
      </div>

      {/* Speech Transcript Text Area */}
      <div className="space-y-2 text-xs">
        <div className="flex justify-between font-bold text-foreground">
          <span>Khung Bài Nói 4 Khối (Direct Stance ➔ Lens A ➔ Lens B ➔ Conclusion ↘):</span>
          <span className="font-mono text-muted-foreground">
            {transcriptText.split(/\s+/).filter(Boolean).length} từ
          </span>
        </div>

        <textarea
          rows={5}
          value={transcriptText}
          onChange={(e) => onChangeTranscript(e.target.value)}
          placeholder="To be perfectly honest, while corporations arguably have a moral obligation... From a corporate perspective... However, looking through the lens of state policymakers... Therefore..."
          className="w-full p-4 rounded-2xl border border-border bg-card text-xs sm:text-sm font-sans text-foreground leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Terminal Pitch Canvas Realtime Tracker */}
      <TerminalPitchCanvas
        pitchSamples={pitchSamples}
        currentPitch={currentPitch}
        isRecording={isRecording}
        terminalAnalysis={terminalPitchResult}
      />

      {/* Recording Controls & Submit */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        {!isRecording ? (
          <button
            type="button"
            onClick={onStartRecord}
            className="w-full sm:w-1/2 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Mic className="h-4 w-4" />
            <span>Thu Âm & Đo Ngữ Điệu (45 - 60s)</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onStopRecord}
            className="w-full sm:w-1/2 py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Square className="h-4 w-4" />
            <span>Dừng Thu ({formatTime(recordDuration)}) & Phân Tích</span>
          </button>
        )}

        <button
          type="button"
          onClick={onSubmitAttempt}
          disabled={!transcriptText}
          className={cn(
            "w-full sm:w-1/2 py-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer",
            transcriptText
              ? "bg-secondary text-foreground hover:bg-secondary/80 border border-border"
              : "bg-secondary/50 text-muted-foreground border border-border cursor-not-allowed"
          )}
        >
          <Send className="h-4 w-4 text-primary" />
          <span>Nộp & Chấm Điểm Part 3</span>
        </button>
      </div>
    </div>
  );
}
