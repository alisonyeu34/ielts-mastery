"use client";

import React from "react";
import { UptalkDetectionResult } from "@/lib/pitchTrackerEngine";
import { AlertTriangle, CheckCircle2, TrendingUp, TrendingDown, Sparkles } from "lucide-react";

interface UptalkAlertBadgeProps {
  uptalkDetection: UptalkDetectionResult;
}

export const UptalkAlertBadge: React.FC<UptalkAlertBadgeProps> = ({
  uptalkDetection
}) => {
  const {
    isUptalkDetected,
    terminalPitchRiseHz,
    isAuthoritativeFallingCadence,
    cadenceDropHz,
    feedback
  } = uptalkDetection;

  if (isUptalkDetected) {
    return (
      <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500 text-rose-200 shadow-lg shadow-rose-500/10 flex items-start gap-3.5 animate-pulse">
        <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0">
          <TrendingUp className="w-5 h-5 text-rose-400" />
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-extrabold uppercase tracking-wider text-rose-300">
              [UPTALK DETECTED: +{terminalPitchRiseHz}Hz RISE]
            </span>
            <span className="px-2 py-0.5 rounded bg-rose-900/80 text-[10px] font-mono">
              Bẫy Lên Giọng Cuối Câu
            </span>
          </div>
          <p className="leading-relaxed font-sans">{feedback}</p>
        </div>
      </div>
    );
  }

  if (isAuthoritativeFallingCadence) {
    return (
      <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/10 flex items-start gap-3.5 animate-fadeIn">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
          <TrendingDown className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-extrabold uppercase tracking-wider text-emerald-300">
              [AUTHORITATIVE CADENCE: -{cadenceDropHz}Hz FALL]
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-900/80 text-[10px] font-mono">
              Hạ Giọng Chuẩn Band 8.5+
            </span>
          </div>
          <p className="leading-relaxed font-sans">{feedback}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 text-slate-400 text-xs flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-cyan-400" />
        <span>Sẵn sàng phát hiện ngữ điệu âm học. Bấm micro và phát âm câu trần thuật.</span>
      </div>
      <span className="text-[11px] font-mono text-slate-500">
        Ngưỡng cảnh báo: &gt;25Hz Rise
      </span>
    </div>
  );
};
