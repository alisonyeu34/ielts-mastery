"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Play,
  Square,
  Sparkles,
  Clock,
  RotateCcw,
  Volume2,
  Zap,
  HelpCircle,
} from "lucide-react";
import { MOCK_BAND55_SPEAKING_TRANSCRIPT } from "@/data/mockSpeakingFeedbackData";
import { cn } from "@/lib/utils";

interface SpeakingRecordArenaProps {
  part: 1 | 2 | 3;
  onPartChange: (part: 1 | 2 | 3) => void;
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onGrade: (transcriptText: string, durationSec: number) => void;
  isGrading: boolean;
  className?: string;
}

export function SpeakingRecordArena({
  part,
  onPartChange,
  prompt,
  onPromptChange,
  onGrade,
  isGrading,
  className,
}: SpeakingRecordArenaProps) {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [hasRecorded, setHasRecorded] = useState<boolean>(false);
  const [recordDuration, setRecordDuration] = useState<number>(0);
  const [currentTranscript, setCurrentTranscript] = useState<string>("");

  // Simulated Mic volume bars
  const [audioBars, setAudioBars] = useState<number[]>([30, 45, 60, 25, 75, 50, 80, 40, 65, 35, 90, 55]);

  // Recording Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let visualizerInterval: NodeJS.Timeout;

    if (isRecording) {
      timer = setInterval(() => {
        setRecordDuration((p) => p + 1);
      }, 1000);

      visualizerInterval = setInterval(() => {
        setAudioBars(Array.from({ length: 16 }, () => Math.floor(Math.random() * 80) + 20));
      }, 150);
    }

    return () => {
      clearInterval(timer);
      clearInterval(visualizerInterval);
    };
  }, [isRecording]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${rem.toString().padStart(2, "0")}`;
  };

  const handleToggleRecord = () => {
    if (!isRecording) {
      // Start Recording
      setIsRecording(true);
      setHasRecorded(false);
      setRecordDuration(0);
      setCurrentTranscript("");
    } else {
      // Stop Recording
      setIsRecording(false);
      setHasRecorded(true);
      if (!currentTranscript) {
        setCurrentTranscript(MOCK_BAND55_SPEAKING_TRANSCRIPT);
      }
    }
  };

  const handleLoadSample = () => {
    onPromptChange("Do you think technology has made people's lives easier or more complicated?");
    setRecordDuration(42);
    setHasRecorded(true);
    setCurrentTranscript(MOCK_BAND55_SPEAKING_TRANSCRIPT);
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Top Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-4">
        {/* Part Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-secondary/40 border border-border">
          {([1, 2, 3] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onPartChange(p)}
              className={cn(
                "px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer",
                part === p
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Part {p} {p === 1 ? "(Ngắn)" : p === 2 ? "(Cue Card 2p)" : "(Bàn Luận)"}
            </button>
          ))}
        </div>

        {/* Load Sample Button */}
        <button
          type="button"
          onClick={handleLoadSample}
          className="px-3.5 py-1.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shadow-2xs"
        >
          <Zap className="h-3.5 w-3.5 text-amber-500" />
          <span>Nạp Bản Nói Mẫu Band 5.5 Thử Nghiệm</span>
        </button>
      </div>

      {/* Prompt Display */}
      <div className="space-y-2">
        <label className="font-bold text-xs text-foreground uppercase tracking-wider font-mono flex items-center gap-1.5">
          <Mic className="h-3.5 w-3.5 text-primary" />
          Câu Hỏi Speaking Part {part}:
        </label>
        <textarea
          rows={2}
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="Nhập câu hỏi Speaking vào đây..."
          className="w-full p-4 rounded-2xl border border-border bg-secondary/20 text-foreground text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed"
        />
      </div>

      {/* Recording Studio Box */}
      <div className="p-6 sm:p-8 rounded-3xl border border-border bg-gradient-to-br from-secondary/30 via-card to-background text-center space-y-6">
        {/* Animated Waveform Bars */}
        <div className="flex items-center justify-center gap-1.5 h-16">
          {audioBars.map((height, idx) => (
            <div
              key={idx}
              style={{ height: isRecording ? `${height}%` : "15%" }}
              className={cn(
                "w-1.5 rounded-full transition-all duration-150",
                isRecording ? "bg-rose-500" : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>

        {/* Recording Timer */}
        <div className="space-y-1">
          <span className="text-2xl sm:text-3xl font-black font-mono text-foreground">
            {formatTime(recordDuration)}
          </span>
          <p className="text-[11px] text-muted-foreground">
            {isRecording
              ? "🔴 Đang thu âm giọng nói của bạn..."
              : hasRecorded
              ? "✓ Đã thu âm xong bản nói"
              : "Nhấn nút bên dưới để bắt đầu nói"}
          </p>
        </div>

        {/* Big Record Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleToggleRecord}
            className={cn(
              "h-16 w-16 rounded-full flex items-center justify-center transition-all shadow-xl hover:scale-105 cursor-pointer ring-4",
              isRecording
                ? "bg-rose-600 text-white ring-rose-500/30 animate-pulse"
                : "bg-primary text-white ring-primary/30"
            )}
          >
            {isRecording ? <Square className="h-6 w-6" /> : <Mic className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Transcript Preview & Submit Action */}
      {hasRecorded && (
        <div className="space-y-4 p-5 rounded-2xl bg-secondary/30 border border-border text-xs animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="font-bold text-foreground font-mono uppercase text-[11px]">
              Bản Ghi Lời Nói (Speech-to-Text):
            </span>
            <span className="font-mono text-muted-foreground text-[10px]">
              {currentTranscript.split(/\s+/).filter(Boolean).length} Từ • {recordDuration} Giây
            </span>
          </div>

          <p className="font-serif italic leading-relaxed text-foreground/90 bg-card p-3.5 rounded-xl border border-border">
            "{currentTranscript}"
          </p>

          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => onGrade(currentTranscript, recordDuration)}
              disabled={isGrading}
              className="px-8 py-3.5 rounded-2xl bg-primary hover:bg-primary/90 disabled:opacity-40 text-primary-foreground font-black text-xs sm:text-sm shadow-md shadow-primary/25 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>{isGrading ? "AI Đang Thẩm Định..." : "Thẩm Định Bằng AI Examiner"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
