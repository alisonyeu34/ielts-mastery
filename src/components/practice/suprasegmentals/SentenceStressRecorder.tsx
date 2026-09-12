"use client";

import React from "react";
import { Mic, Square, Sparkles, Activity, Clock, Award } from "lucide-react";
import { ThoughtGroupSentenceItem } from "@/data/mockSuprasegmentalData";

interface SentenceStressRecorderProps {
  sentenceItem: ThoughtGroupSentenceItem;
  isRecording: boolean;
  recordingSeconds: number;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export function SentenceStressRecorder({
  sentenceItem,
  isRecording,
  recordingSeconds,
  onStartRecording,
  onStopRecording,
}: SentenceStressRecorderProps) {
  const minutes = Math.floor(recordingSeconds / 60);
  const seconds = recordingSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">
            Voice Recorder & Pause Analyzer
          </span>
          <h4 className="text-sm font-black text-foreground">
            Thu Âm Thử & Đo Lường Độ Chuẩn Ngắt Nghỉ
          </h4>
        </div>

        <span className="text-xs font-mono font-bold text-muted-foreground">
          Thời lượng: {formattedTime}
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-secondary/30 border border-border/70 text-center space-y-4">
        <p className="text-xs sm:text-sm text-foreground font-serif italic">
          &ldquo;{sentenceItem.fullSentence}&rdquo;
        </p>

        <div className="flex items-center justify-center gap-3">
          {!isRecording ? (
            <button
              type="button"
              onClick={onStartRecording}
              className="px-6 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-rose-600/20 transition-transform hover:scale-105 cursor-pointer"
            >
              <Mic className="h-4 w-4" />
              <span>Bắt Đầu Đọc & Thu Âm</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onStopRecording}
              className="px-6 py-2.5 rounded-2xl bg-secondary hover:bg-secondary/80 text-rose-600 dark:text-rose-400 font-black text-xs flex items-center gap-2 border border-rose-500/30 transition-all hover:scale-105 cursor-pointer"
            >
              <Square className="h-4 w-4 fill-rose-600" />
              <span>Dừng Thu Âm & Chấm Điểm Ngắt Nhịp</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
