"use client";

import React from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import {
  Section4BlankItem,
  SignpostMarker,
} from "@/data/mockSection4DenseData";
import { DropoffCascade } from "@/hooks/useSection4Tracker";
import { cn } from "@/lib/utils";

interface CognitiveDropoffHeatmapProps {
  blanks: Section4BlankItem[];
  signposts: SignpostMarker[];
  itemResults: Record<number, boolean>;
  cascades: DropoffCascade[];
  durationSeconds: number;
  onSeekTo: (seconds: number) => void;
  className?: string;
}

export function CognitiveDropoffHeatmap({
  blanks,
  signposts,
  itemResults,
  cascades,
  durationSeconds,
  onSeekTo,
  className,
}: CognitiveDropoffHeatmapProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground">
              Bản Đồ Điểm Rơi Nhận Thức (Cognitive Drop-off Heatmap)
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Phân tích trực quan các vị trí bắt kịp vs rơi rụng thông tin trên dòng thời gian
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
          420s Timeline
        </span>
      </div>

      {/* Visual Timeline Bar with 10 Question Markers */}
      <div className="space-y-2 pt-2">
        <div className="relative w-full h-8 bg-secondary/50 rounded-2xl border border-border flex items-center px-4">
          {/* Timeline background track */}
          <div className="w-full h-1 bg-border rounded-full" />

          {/* 10 Question Markers */}
          {blanks.map((b) => {
            const isCorrect = itemResults[b.questionNumber];
            const posPercent = (b.timestampSeconds / durationSeconds) * 100;

            return (
              <button
                key={b.questionNumber}
                type="button"
                onClick={() => onSeekTo(b.timestampSeconds)}
                style={{ left: `${posPercent}%` }}
                className={cn(
                  "absolute -translate-x-1/2 flex flex-col items-center group cursor-pointer"
                )}
                title={`Q${b.questionNumber} (${Math.floor(b.timestampSeconds / 60)}:${(b.timestampSeconds % 60).toString().padStart(2, "0")}): ${isCorrect ? "Đúng" : "Sai"}`}
              >
                <span
                  className={cn(
                    "h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-mono font-extrabold text-white shadow-xs transition-transform group-hover:scale-125",
                    isCorrect ? "bg-emerald-600" : "bg-rose-600 animate-pulse"
                  )}
                >
                  {b.questionNumber}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground px-1">
          <span>00:00 (Start)</span>
          <span>03:30 (Mid-point)</span>
          <span>07:00 (End)</span>
        </div>
      </div>

      {/* Cascading Drop-off Alerts */}
      {cascades.length > 0 ? (
        <div className="space-y-2 pt-1">
          {cascades.map((casc, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-rose-500/[0.08] border border-rose-500/30 text-xs space-y-1"
            >
              <div className="flex items-center gap-1.5 font-bold text-rose-600 dark:text-rose-400">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span>Phát hiện Vùng Mất Dấu Thông Tin (Câu {casc.startQNum} ➔ {casc.endQNum}):</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {casc.primaryDiagnosis}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-3 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>
            Tuyệt vời! Bạn duy trì nhịp độ nghe liên tục và không bị mất dấu trong suốt bài giảng Section 4.
          </span>
        </div>
      )}
    </div>
  );
}
