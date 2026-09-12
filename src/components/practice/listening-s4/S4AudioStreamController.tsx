"use client";

import React from "react";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  Sparkles,
  FileText,
} from "lucide-react";
import { S4QuestionItem } from "@/data/mockSection4LectureData";
import { cn } from "@/lib/utils";

interface S4AudioStreamControllerProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  questions: S4QuestionItem[];
  onTogglePlay: () => void;
  onSeek: (seconds: number) => void;
  onChangeRate: (rate: number) => void;
  onOpenDrawer?: () => void;
  className?: string;
}

export function S4AudioStreamController({
  isPlaying,
  currentTime,
  duration,
  playbackRate,
  questions,
  onTogglePlay,
  onSeek,
  onChangeRate,
  onOpenDrawer,
  className,
}: S4AudioStreamControllerProps) {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = Math.floor(secs % 60);
    return `0${mins}:${rem < 10 ? `0${rem}` : rem}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-sm space-y-3 select-none",
        className
      )}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-primary" />
          <span className="font-bold text-xs text-foreground">
            IELTS Section 4 Academic Monologue (Uninterrupted)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onOpenDrawer && (
            <button
              type="button"
              onClick={onOpenDrawer}
              className="px-2.5 py-1 rounded-xl text-[10px] font-bold border border-border bg-secondary hover:bg-secondary/80 text-foreground flex items-center gap-1 transition-colors cursor-pointer"
            >
              <FileText className="h-3 w-3" />
              <span>Transcript & Bẫy</span>
            </button>
          )}

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-secondary/50 p-0.5 rounded-xl border border-border text-[10px] font-bold">
            {[0.75, 1.0, 1.5].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => onChangeRate(rate)}
                className={cn(
                  "px-2 py-0.5 rounded-lg transition-colors cursor-pointer",
                  playbackRate === rate
                    ? "bg-card text-foreground shadow-2xs font-mono font-bold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {rate === 1.0 ? "1x" : `${rate}x`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scrub Bar with Question Jump Markers */}
      <div className="space-y-1">
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newTime = (clickX / rect.width) * duration;
            onSeek(newTime);
          }}
          className="w-full h-2.5 rounded-full bg-secondary border border-border overflow-hidden relative cursor-pointer group"
        >
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-primary transition-all duration-100"
          />

          {/* Question markers */}
          {questions.map((q) => {
            const pinPercent = (q.audioTimestampSeconds / duration) * 100;
            return (
              <span
                key={q.number}
                style={{ left: `${pinPercent}%` }}
                className="absolute top-0 bottom-0 w-0.5 bg-card/60"
              />
            );
          })}
        </div>

        {/* Time Readout */}
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground font-bold">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-center gap-3 pt-1">
        <button
          type="button"
          onClick={() => onSeek(currentTime - 5)}
          className="p-2 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors cursor-pointer"
          title="Tua lại 5 giây"
        >
          <RotateCcw className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={onTogglePlay}
          className="px-5 py-2 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-md shadow-primary/20 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4" /> <span>Tạm dừng</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4 fill-current" /> <span>Phát Bài Giảng</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => onSeek(currentTime + 5)}
          className="p-2 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors cursor-pointer"
          title="Tua tới 5 giây"
        >
          <RotateCw className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
