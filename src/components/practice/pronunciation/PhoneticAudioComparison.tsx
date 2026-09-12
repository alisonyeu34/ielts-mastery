"use client";

import React, { useState } from "react";
import {
  Volume2,
  Mic,
  Square,
  Play,
  RotateCcw,
  Sparkles,
  Headphones,
  CheckCircle2,
} from "lucide-react";
import { IPAPhonemeData } from "@/data/mockIPA44Data";
import { playNativeAudio } from "@/lib/phoneticAcousticAnalyzer";

interface PhoneticAudioComparisonProps {
  phoneme: IPAPhonemeData;
}

export function PhoneticAudioComparison({ phoneme }: PhoneticAudioComparisonProps) {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);

  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setRecordedAudioUrl("simulated_url");
      }, 2000);
    } else {
      setIsRecording(false);
    }
  };

  const currentWord = phoneme.exampleWords[0]?.word || phoneme.symbol;

  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">
            Acoustic Waveform Matcher
          </span>
          <h4 className="text-sm font-black text-foreground">
            Đối Chiếu Âm Vị: Bản Xứ vs Học Viên
          </h4>
        </div>

        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-secondary border border-border">
          Từ Mẫu: &ldquo;{currentWord}&rdquo;
        </span>
      </div>

      {/* Side-by-side Audio Panels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Panel 1: Native Speaker (RP British) */}
        <div className="p-4 rounded-2xl bg-secondary/40 border border-border/80 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Headphones className="h-4 w-4 text-primary" /> Âm Thanh Mẫu Bản Xứ
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-primary/10 text-primary font-bold">
              RP British
            </span>
          </div>

          <div className="h-12 w-full rounded-xl bg-card border border-border flex items-center justify-center gap-1 px-4">
            {[40, 70, 90, 60, 30, 80, 100, 75, 45, 20].map((h, i) => (
              <div key={i} className="w-1.5 rounded-full bg-primary" style={{ height: `${h}%` }} />
            ))}
          </div>

          <button
            type="button"
            onClick={() => playNativeAudio(currentWord)}
            className="w-full py-2 px-3 rounded-xl bg-card hover:bg-secondary border border-border text-foreground font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Volume2 className="h-3.5 w-3.5 text-primary" />
            <span>Nghe Lại Bản Xứ</span>
          </button>
        </div>

        {/* Panel 2: Student Voice Recording */}
        <div className="p-4 rounded-2xl bg-secondary/40 border border-border/80 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Mic className="h-4 w-4 text-rose-500" /> Giọng Thu Âm Của Bạn
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">
              {isRecording ? "Đang thu..." : recordedAudioUrl ? "Đã thu" : "Chưa thu"}
            </span>
          </div>

          <div className="h-12 w-full rounded-xl bg-card border border-border flex items-center justify-center gap-1 px-4">
            {isRecording ? (
              <div className="flex items-center gap-1 text-xs text-rose-500 font-mono animate-pulse">
                <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" /> Đang ghi âm...
              </div>
            ) : recordedAudioUrl ? (
              [30, 60, 85, 50, 25, 75, 90, 70, 40, 15].map((h, i) => (
                <div key={i} className="w-1.5 rounded-full bg-emerald-500" style={{ height: `${h}%` }} />
              ))
            ) : (
              <span className="text-[11px] text-muted-foreground">Bấm nút bên dưới để ghi âm thử</span>
            )}
          </div>

          <button
            type="button"
            onClick={handleToggleRecord}
            className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              isRecording
                ? "bg-rose-600 text-white"
                : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs"
            }`}
          >
            {isRecording ? <Square className="h-3.5 w-3.5 fill-white" /> : <Mic className="h-3.5 w-3.5" />}
            <span>{isRecording ? "Dừng Ghi Âm" : recordedAudioUrl ? "Thu Lại Lượt Mới" : "Thu Âm Thử Ngay"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
