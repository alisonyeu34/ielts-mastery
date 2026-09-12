"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Square,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Layers,
  Headphones,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ShadowingRecorderControlProps {
  isRecording: boolean;
  shadowingMode: "repeat_after" | "simultaneous";
  learnerAudioUrl: string | null;
  onToggleRecord: () => void;
  onTogglePlayLearner: () => void;
  onPlaySideBySide?: () => void;
  sideBySideStep?: "idle" | "native" | "learner";
  onChangeMode: (mode: "repeat_after" | "simultaneous") => void;
  isPlayingLearner: boolean;
  className?: string;
}

export function ShadowingRecorderControl({
  isRecording,
  shadowingMode,
  learnerAudioUrl,
  onToggleRecord,
  onTogglePlayLearner,
  onPlaySideBySide,
  sideBySideStep = "idle",
  onChangeMode,
  isPlayingLearner,
  className,
}: ShadowingRecorderControlProps) {
  const [micLevel, setMicLevel] = useState<number>(0);
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Monitor mic live volume if recording
  useEffect(() => {
    let animFrame: number;

    if (isRecording) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          streamRef.current = stream;
          const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (!AudioCtx) return;
          const audioCtx = new AudioCtx();
          audioCtxRef.current = audioCtx;
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 128;
          const src = audioCtx.createMediaStreamSource(stream);
          src.connect(analyser);

          const data = new Uint8Array(analyser.frequencyBinCount);
          const update = () => {
            analyser.getByteFrequencyData(data);
            let sum = 0;
            for (let i = 0; i < data.length; i++) sum += data[i];
            const avg = sum / data.length;
            setMicLevel(Math.min(100, Math.round(avg * 2.2)));
            animFrame = requestAnimationFrame(update);
          };
          update();
        })
        .catch((err) => {
          console.warn("Mic meter init note:", err);
        });
    } else {
      setMicLevel(0);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    }

    return () => {
      cancelAnimationFrame(animFrame);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [isRecording]);

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5 select-none",
        className
      )}
    >
      {/* Top Header & Mode Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <Mic className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-extrabold text-foreground">
            Bộ Thu Âm Shadowing & Đối Chiếu Nhịp Điệu
          </h3>
        </div>

        {/* Shadowing Mode Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-secondary/40 border border-border text-xs">
          <button
            type="button"
            onClick={() => onChangeMode("repeat_after")}
            className={cn(
              "px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer",
              shadowingMode === "repeat_after"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            1. Nghe rồi nhại lại (Echo)
          </button>

          <button
            type="button"
            onClick={() => onChangeMode("simultaneous")}
            className={cn(
              "px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1",
              shadowingMode === "simultaneous"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Headphones className="h-3 w-3" />
            <span>2. Nhại đè trực tiếp</span>
          </button>
        </div>
      </div>

      {/* Main Recording Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Record Button & Mic Level */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onToggleRecord}
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg transition-all hover:scale-105 cursor-pointer",
              isRecording
                ? "bg-rose-600 shadow-rose-600/40 ring-4 ring-rose-500/30 animate-pulse"
                : "bg-primary shadow-primary/30 ring-2 ring-primary/20"
            )}
            title={isRecording ? "Dừng thu âm và chấm điểm" : "Bắt đầu thu âm Shadowing"}
          >
            {isRecording ? <Square className="h-6 w-6 fill-white" /> : <Mic className="h-6 w-6" />}
          </button>

          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-black text-foreground block">
              {isRecording
                ? "🔴 Đang thu âm giọng bạn... Hãy nhại lại to và rõ ràng!"
                : learnerAudioUrl
                ? "✓ Đã lưu bản thu âm. Bạn có thể nghe lại hoặc thu lại."
                : "Nhấn biểu tượng Micro để bắt đầu thu âm và nhại giọng"}
            </span>

            {/* Live Volume Meter */}
            {isRecording ? (
              <div className="w-52 h-2.5 bg-secondary/80 rounded-full overflow-hidden border border-border">
                <div
                  style={{ width: `${micLevel}%` }}
                  className="bg-rose-500 h-full rounded-full transition-all duration-75"
                />
              </div>
            ) : (
              <span className="text-[11px] text-muted-foreground font-mono">
                Mẹo: Bật to âm lượng hoặc đeo tai nghe để bắt chước chuẩn xác nhất
              </span>
            )}
          </div>
        </div>

        {/* Playback & Side-by-side Audio Controls */}
        {learnerAudioUrl && !isRecording && (
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            {/* 1. Side-by-Side Echo Comparator Button */}
            {onPlaySideBySide && (
              <button
                type="button"
                onClick={onPlaySideBySide}
                disabled={sideBySideStep !== "idle" || isPlayingLearner}
                className={cn(
                  "px-4 py-2.5 rounded-xl border font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs",
                  sideBySideStep !== "idle"
                    ? "bg-red-700 text-white border-red-700 shadow-red-700/30 animate-pulse"
                    : "bg-red-700/10 hover:bg-red-700/20 text-red-700 dark:text-red-400 border-red-500/30"
                )}
                title="Phát 1 giây mẫu bản xứ rồi phát ngay giọng của bạn để tự nghe thấy sự khác biệt"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>
                  {sideBySideStep === "native"
                    ? "1. Đang nghe mẫu bản xứ..."
                    : sideBySideStep === "learner"
                    ? "2. Đang nghe giọng của bạn..."
                    : "🎧 Đối Chiếu Âm Đôi (Mẫu ➔ Bạn)"}
                </span>
              </button>
            )}

            {/* 2. Playback Learner Audio Button */}
            <button
              type="button"
              onClick={onTogglePlayLearner}
              disabled={sideBySideStep !== "idle"}
              className={cn(
                "px-4 py-2.5 rounded-xl border font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs",
                isPlayingLearner
                  ? "bg-amber-600 text-white border-amber-600 shadow-amber-600/20"
                  : "bg-secondary/70 hover:bg-secondary border-border text-foreground"
              )}
            >
              {isPlayingLearner ? (
                <>
                  <Pause className="h-3.5 w-3.5" />
                  <span>Đang phát giọng bạn...</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 text-primary fill-primary" />
                  <span>Nghe lại giọng bạn</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Side-by-side guidance tip */}
      {learnerAudioUrl && !isRecording && (
        <div className="p-3 rounded-2xl bg-red-500/[0.04] border border-red-500/20 flex items-center justify-between gap-2 text-xs">
          <span className="text-muted-foreground">
            💡 <strong>Mẹo Đối Chiếu Âm Đôi:</strong> Hãy chú ý nghe xem âm đuôi <strong>-s</strong> (gió xì) hoặc <strong>-ed</strong> (chặn hơi /t/ hoặc /d/) của bạn có rõ nét và dứt khoát như mẫu không.
          </span>
          <span className="text-[10px] font-mono font-bold text-red-600 dark:text-red-400 shrink-0">
            Speaking 6.0 Safe Zone
          </span>
        </div>
      )}
    </div>
  );
}
