"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Mic,
  Play,
  Clock,
  FileText,
} from "lucide-react";
import { Part2CueCardTask } from "@/data/mockSpeakingP1P2Data";
import { cn } from "@/lib/utils";

interface SpeakingPartSummaryProps {
  task: Part2CueCardTask;
  speakingTimeElapsed: number;
  audioUrl: string | null;
  onReset: () => void;
  className?: string;
}

export function SpeakingPartSummary({
  task,
  speakingTimeElapsed,
  audioUrl,
  onReset,
  className,
}: SpeakingPartSummaryProps) {
  const isOptimal = speakingTimeElapsed >= 100 && speakingTimeElapsed <= 125;
  const isUnderlength = speakingTimeElapsed < 90;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-md animate-in fade-in duration-300 select-none",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 mx-auto">
        <Award className="h-7 w-7" />
      </div>

      <div className="text-center space-y-1">
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
          Part 2 Monologue Completed
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
          Tổng Kết Bài Nói Part 2
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Đề tài: <strong>{task.cueCardTitle}</strong>
        </p>
      </div>

      {/* Evaluation Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border flex items-center gap-3">
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
              isOptimal ? "bg-emerald-500/20 text-emerald-600" : "bg-amber-500/20 text-amber-600"
            )}
          >
            {isOptimal ? <CheckCircle2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
          </div>
          <div>
            <span className="text-xs font-bold text-foreground block">
              Thời lượng bài nói ({formatTime(speakingTimeElapsed)})
            </span>
            <span className="text-[11px] text-muted-foreground">
              {isOptimal
                ? "Đạt chuẩn lý tưởng (1:45 - 2:00)"
                : isUnderlength
                ? "Dưới 1:30 (Bị trừ điểm Fluency)"
                : "Vượt ngưỡng 2:00 (Giám khảo sẽ ngắt lời)"}
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-600">
            <Mic className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-foreground block">
              Bản ghi âm & Sóng âm
            </span>
            <span className="text-[11px] text-muted-foreground">
              {audioUrl ? "Đã lưu bản thu vào IndexedDB" : "Đã ghi nhận dữ liệu phiên"}
            </span>
          </div>
        </div>
      </div>

      {/* Audio Player if available */}
      {audioUrl && (
        <div className="p-4 rounded-2xl bg-secondary/20 border border-border space-y-2">
          <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Play className="h-3.5 w-3.5 text-indigo-500" />
            <span>Nghe lại bản thu âm của bạn:</span>
          </span>
          <audio controls src={audioUrl} className="w-full rounded-lg" />
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onReset}
          className="px-5 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Luyện lại bài nói</span>
        </button>

        <Link
          href="/grading/speaking"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
        >
          <span>Chấm điểm với AI Speaking Coach (Module 3)</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
