"use client";

import React from "react";
import {
  Mic,
  Square,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Volume2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TwoMinuteSpeechRecorderProps {
  recordSeconds: number;
  isRecording: boolean;
  onStartRecord: () => void;
  onStopRecord: () => void;
  className?: string;
}

export function TwoMinuteSpeechRecorder({
  recordSeconds,
  isRecording,
  onStartRecord,
  onStopRecord,
  className,
}: TwoMinuteSpeechRecorderProps) {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `0${mins}:${rem < 10 ? `0${rem}` : rem}`;
  };

  const percentage = Math.min(100, Math.round((recordSeconds / 120) * 100));

  // Determine active speaking segment (out of 4)
  const activeSegment =
    recordSeconds < 30 ? 1 : recordSeconds < 60 ? 2 : recordSeconds < 90 ? 3 : 4;

  const isDurationGood = recordSeconds >= 90;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Header & Digital Clock */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-2xl transition-all",
              isRecording
                ? "bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/30 ring-4 ring-rose-500/20"
                : "bg-secondary text-muted-foreground"
            )}
          >
            <Mic className="h-6 w-6" />
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 uppercase">
                {isRecording ? "Đang Thu Âm Trực Tiếp" : "Phòng Thu Âm 2 Phút"}
              </span>
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-foreground">
              Bộ Đo Nhịp Độ Bài Nói Speaking Part 2
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="font-mono text-2xl sm:text-3xl font-black text-foreground px-3 py-1 rounded-2xl bg-secondary/60 border border-border">
            {formatTime(recordSeconds)} <span className="text-xs text-muted-foreground font-normal">/ 02:00</span>
          </span>
        </div>
      </div>

      {/* 4 Pacing Milestone Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-[11px] font-mono text-muted-foreground font-bold">
          <span className={activeSegment === 1 ? "text-primary" : ""}>Chặng 1: Bối Cảnh (0:30)</span>
          <span className={activeSegment === 2 ? "text-primary" : ""}>Chặng 2: Giác Quan (1:00)</span>
          <span className={activeSegment === 3 ? "text-primary" : ""}>Chặng 3: Cao Trào (1:30)</span>
          <span className={activeSegment === 4 ? "text-emerald-600" : ""}>Chặng 4: Cảm Xúc (2:00)</span>
        </div>

        {/* Visual Progress Bar */}
        <div className="h-3 w-full rounded-full bg-secondary overflow-hidden flex">
          <div
            style={{ width: `${percentage}%` }}
            className={cn(
              "h-full rounded-full transition-all duration-300",
              recordSeconds < 60
                ? "bg-amber-500"
                : recordSeconds < 90
                ? "bg-blue-500"
                : "bg-emerald-500"
            )}
          />
        </div>
      </div>

      {/* Guidance Cards on Pacing */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
        <div
          className={cn(
            "p-3 rounded-2xl border transition-all text-center space-y-1",
            activeSegment === 1 && isRecording
              ? "bg-primary/10 border-primary shadow-xs ring-1 ring-primary/40"
              : "bg-secondary/20 border-border/60 text-muted-foreground"
          )}
        >
          <span className="font-mono font-bold block text-[10px]">0:00 - 0:30</span>
          <span className="font-semibold text-foreground block">1. Who / What / Where</span>
        </div>

        <div
          className={cn(
            "p-3 rounded-2xl border transition-all text-center space-y-1",
            activeSegment === 2 && isRecording
              ? "bg-primary/10 border-primary shadow-xs ring-1 ring-primary/40"
              : "bg-secondary/20 border-border/60 text-muted-foreground"
          )}
        >
          <span className="font-mono font-bold block text-[10px]">0:30 - 1:00</span>
          <span className="font-semibold text-foreground block">2. Chi Tiết Giác Quan</span>
        </div>

        <div
          className={cn(
            "p-3 rounded-2xl border transition-all text-center space-y-1",
            activeSegment === 3 && isRecording
              ? "bg-primary/10 border-primary shadow-xs ring-1 ring-primary/40"
              : "bg-secondary/20 border-border/60 text-muted-foreground"
          )}
        >
          <span className="font-mono font-bold block text-[10px]">1:00 - 1:30</span>
          <span className="font-semibold text-foreground block">3. Cao Trào / Kỷ Niệm</span>
        </div>

        <div
          className={cn(
            "p-3 rounded-2xl border transition-all text-center space-y-1",
            activeSegment === 4 && isRecording
              ? "bg-emerald-500/15 border-emerald-500 text-emerald-700 shadow-xs ring-1 ring-emerald-500/40"
              : "bg-secondary/20 border-border/60 text-muted-foreground"
          )}
        >
          <span className="font-mono font-bold block text-[10px]">1:30 - 2:00</span>
          <span className="font-semibold text-foreground block">4. Cảm Xúc Cá Nhân</span>
        </div>
      </div>

      {/* Main Buttons */}
      <div className="pt-2">
        {!isRecording ? (
          <button
            type="button"
            onClick={onStartRecord}
            className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Mic className="h-4 w-4" />
            <span>Bắt Đầu Thu Âm Bài Nói 2 Phút</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onStopRecord}
            className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Square className="h-4 w-4" />
            <span>Dừng Thu Âm & Nộp Bài Đánh Giá</span>
          </button>
        )}
      </div>
    </div>
  );
}
