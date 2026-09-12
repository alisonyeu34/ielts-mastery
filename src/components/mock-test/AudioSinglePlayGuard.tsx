"use client";

import React, { useState, useEffect, useRef } from "react";
import { MockPassType } from "@/hooks/useCDIELTSMockSession";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Lock,
  Unlock,
  AlertCircle,
  Radio,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioSinglePlayGuardProps {
  currentPass: MockPassType;
  totalDurationSeconds: number;
  partNumber: number;
  partTitle: string;
  className?: string;
}

export function AudioSinglePlayGuard({
  currentPass,
  totalDurationSeconds,
  partNumber,
  partTitle,
  className,
}: AudioSinglePlayGuardProps) {
  const isPass1 = currentPass === "pass1";
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(80);

  // Simulated audio playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTime < totalDurationSeconds) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDurationSeconds - 1) {
            setIsPlaying(false);
            return totalDurationSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, totalDurationSeconds]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`;
  };

  const progressPercentage = Math.min(
    100,
    Math.round((currentTime / totalDurationSeconds) * 100)
  );

  return (
    <div
      className={cn(
        "p-3.5 sm:p-4 rounded-2xl border bg-slate-950 text-white shadow-md select-none transition-all",
        isPass1 ? "border-amber-500/30" : "border-indigo-500/30",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Track info */}
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-xl",
              isPass1 ? "bg-amber-500/20 text-amber-400" : "bg-indigo-500/20 text-indigo-400"
            )}
          >
            <Radio className="h-5 w-5 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-white font-mono">
                Audio CD-IELTS • Phần {partNumber}
              </span>

              {isPass1 ? (
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-bold flex items-center gap-1 font-mono">
                  <Lock className="h-3 w-3" />
                  <span>Phát 1 Lần Duy Nhất (Chống Tua)</span>
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold flex items-center gap-1 font-mono">
                  <Unlock className="h-3 w-3" />
                  <span>Đã Mở Khóa Tua & Nghe Lại</span>
                </span>
              )}
            </div>

            <p className="text-[11px] text-slate-400 truncate max-w-md">{partTitle}</p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Controls unlocked in Pass 2 and Pass 3 */}
          {!isPass1 && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                title={isPlaying ? "Tạm dừng" : "Phát tiếp"}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 text-emerald-400" />}
              </button>

              <button
                type="button"
                onClick={() => setCurrentTime(0)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                title="Phát lại từ đầu"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Volume Control */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              type="button"
              onClick={() => setIsMuted((m) => !m)}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              {isMuted ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-16 accent-indigo-500 cursor-pointer h-1.5"
            />
          </div>

          {/* Digital Elapsed Time */}
          <div className="font-mono text-xs font-bold text-slate-300 min-w-[75px] text-right">
            {formatTime(currentTime)} / {formatTime(totalDurationSeconds)}
          </div>
        </div>
      </div>

      {/* Progress Track (Locked scrub in Pass 1) */}
      <div className="mt-3 relative">
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full transition-all duration-300 rounded-full",
              isPass1
                ? "bg-gradient-to-r from-amber-500 to-orange-500"
                : "bg-gradient-to-r from-indigo-500 to-emerald-500"
            )}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {!isPass1 && (
          <input
            type="range"
            min={0}
            max={totalDurationSeconds}
            value={currentTime}
            onChange={(e) => setCurrentTime(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
