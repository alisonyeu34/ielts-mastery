"use client";

import React from "react";
import { ScanningKeywordTarget } from "@/data/mockSpeedReadingData";
import {
  Radar,
  Play,
  CheckCircle2,
  AlertTriangle,
  Timer,
  Crosshair,
  Hash,
  Sparkles,
} from "lucide-react";

interface ScanningTargetRadarProps {
  targets: ScanningKeywordTarget[];
  activeTargetIndex: number;
  setActiveTargetIndex: (idx: number) => void;
  scanStopwatchMs: number;
  isScanRunning: boolean;
  scanResultFeedback: {
    success: boolean;
    elapsedSeconds: number;
    message: string;
  } | null;
  onStartTarget: (targetIdx: number) => void;
}

export const ScanningTargetRadar: React.FC<ScanningTargetRadarProps> = ({
  targets,
  activeTargetIndex,
  setActiveTargetIndex,
  scanStopwatchMs,
  isScanRunning,
  scanResultFeedback,
  onStartTarget,
}) => {
  const currentTarget = targets[activeTargetIndex] || targets[0];
  const elapsedSec = (scanStopwatchMs / 1000).toFixed(2);

  return (
    <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-5 shadow-xl mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Radar className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span>Radar Định Vị Từ Khóa (Scanning Speed Target)</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-mono">
                Hard/Soft Keywords
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Định vị vị trí xuất hiện của từ khóa trong bài đọc dưới áp lực thời gian.
            </p>
          </div>
        </div>

        {/* Stopwatch Display */}
        <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-emerald-500/30">
          <Timer className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Đồng hồ:</span>
          <span className="text-xl font-mono font-extrabold text-emerald-400">
            {elapsedSec}s
          </span>
        </div>
      </div>

      {/* Target Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 my-4">
        {targets.map((target, idx) => {
          const isSelected = idx === activeTargetIndex;
          return (
            <button
              key={target.id}
              onClick={() => {
                setActiveTargetIndex(idx);
                onStartTarget(idx);
              }}
              className={`p-3 rounded-xl text-left border transition-all ${
                isSelected
                  ? "bg-emerald-950/50 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/10"
                  : "bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                    target.type === "hard"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  }`}
                >
                  {target.type === "hard" ? "Hard Keyword" : "Soft Keyword"}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  &le; {target.maxTargetTimeSeconds}s
                </span>
              </div>
              <div className="font-bold text-sm text-slate-100 font-mono truncate">
                "{target.keyword}"
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Target Action Banner */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
            <Crosshair className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Từ khóa cần định vị ngay:</div>
            <div className="text-lg font-black text-emerald-400 font-mono tracking-wide flex items-center gap-2">
              <span>{currentTarget.keyword}</span>
            </div>
            <div className="text-xs text-slate-400 mt-0.5 italic">
              Gợi ý: {currentTarget.hint}
            </div>
          </div>
        </div>

        <div>
          {isScanRunning ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span>Đang tính giờ! Click trực tiếp vào từ trong bài đọc</span>
            </div>
          ) : (
            <button
              onClick={() => onStartTarget(activeTargetIndex)}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Bắt Đầu Quét Từ Khóa Này</span>
            </button>
          )}
        </div>
      </div>

      {/* Result / Feedback Alert */}
      {scanResultFeedback && (
        <div
          className={`mt-4 p-4 rounded-xl border flex items-start gap-3 transition-all ${
            scanResultFeedback.success
              ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-200"
              : "bg-rose-950/40 border-rose-500/50 text-rose-200"
          }`}
        >
          {scanResultFeedback.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          )}
          <div className="text-xs leading-relaxed">
            <div className="font-bold mb-0.5">{scanResultFeedback.message}</div>
            {!scanResultFeedback.success && (
              <div className="text-slate-400 text-[11px] mt-1">
                Lỗi quét chậm/nhầm đã tự động ghi nhận vào <strong>Ngân Hàng Lỗi Sai (Error Bank)</strong> để phân tích phản xạ đọc.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
