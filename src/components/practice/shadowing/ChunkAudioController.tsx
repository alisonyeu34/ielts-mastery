"use client";

import React from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Repeat,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Sparkles,
  Zap,
} from "lucide-react";
import { ShadowingSentence, ShadowingChunk } from "@/data/mockShadowingData";
import { cn } from "@/lib/utils";

interface ChunkAudioControllerProps {
  sentence: ShadowingSentence;
  activeChunkIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  playbackSpeed: number; // 0.8, 0.9, 1.0
  onTogglePlay: () => void;
  onToggleLoop: () => void;
  onSelectChunk: (idx: number) => void;
  onPlayChunk?: (idx: number) => void;
  onChangeSpeed: (speed: number) => void;
  className?: string;
}

export function ChunkAudioController({
  sentence,
  activeChunkIndex,
  isPlaying,
  isLooping,
  playbackSpeed,
  onTogglePlay,
  onToggleLoop,
  onSelectChunk,
  onPlayChunk,
  onChangeSpeed,
  className,
}: ChunkAudioControllerProps) {
  const currentChunk: ShadowingChunk | undefined = sentence.chunks[activeChunkIndex];

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4 select-none",
        className
      )}
    >
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Play/Pause & Nav */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onTogglePlay}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg transition-all hover:scale-105 cursor-pointer",
              isPlaying
                ? "bg-amber-600 shadow-amber-600/30 ring-2 ring-amber-500/20"
                : "bg-primary shadow-primary/30 ring-2 ring-primary/20"
            )}
            title={isPlaying ? "Tạm dừng phát" : "Nghe câu mẫu bản xứ"}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 fill-white ml-0.5" />
            )}
          </button>

          <div className="space-y-0.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
              Audio Mẫu Bản Xứ • Tốc Độ {playbackSpeed}x
            </span>
            <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-foreground">
              <span>{isPlaying ? "Đang phát âm thanh..." : "Bấm để nghe toàn câu mẫu"}</span>
              <Volume2 className={cn("h-3.5 w-3.5 text-primary", isPlaying && "animate-pulse")} />
            </div>
          </div>
        </div>

        {/* Speed Controls & Loop Toggle */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Loop Toggle */}
          <button
            type="button"
            onClick={onToggleLoop}
            className={cn(
              "p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
              isLooping
                ? "bg-primary text-primary-foreground border-primary shadow-xs"
                : "bg-secondary/40 text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
            )}
            title="Lặp lại cụm từ đang chọn liên tục"
          >
            <Repeat className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Lặp Cụm</span>
          </button>

          {/* Speed Selector Buttons */}
          <div className="flex items-center p-1 rounded-xl bg-secondary/40 border border-border">
            {[0.8, 0.9, 1.0].map((speed) => (
              <button
                key={speed}
                type="button"
                onClick={() => onChangeSpeed(speed)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer",
                  playbackSpeed === speed
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chunk Tabs Bar */}
      <div className="pt-2 border-t border-border/70 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="font-bold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-primary" />
            <span>Phân Cụm Nghĩa & Luyện Từng Cụm:</span>
          </span>
          <span className="font-mono">
            Đang chọn Cụm {activeChunkIndex + 1}/{sentence.chunks.length}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {sentence.chunks.map((chunk, idx) => {
            const isActive = activeChunkIndex === idx;

            return (
              <div
                key={chunk.id}
                onClick={() => onSelectChunk(idx)}
                className={cn(
                  "p-3 rounded-2xl border text-left text-xs transition-all space-y-1.5 cursor-pointer relative group",
                  isActive
                    ? "bg-primary/10 border-primary ring-2 ring-primary/25 shadow-xs"
                    : "bg-secondary/20 border-border hover:bg-secondary/40 text-muted-foreground"
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "font-mono font-bold text-[10px] px-1.5 py-0.5 rounded border",
                      isActive
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-foreground border-border"
                    )}
                  >
                    Cụm {idx + 1}
                  </span>

                  {onPlayChunk && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectChunk(idx);
                        onPlayChunk(idx);
                      }}
                      className="p-1 rounded-md bg-card/80 hover:bg-primary hover:text-white border border-border text-muted-foreground transition-all cursor-pointer"
                      title="Nghe riêng cụm này"
                    >
                      <Volume2 className="h-3 w-3" />
                    </button>
                  )}
                </div>

                <p className="font-serif font-bold text-foreground truncate text-xs">
                  "{chunk.text}"
                </p>

                {chunk.endingSounds && chunk.endingSounds.length > 0 && (
                  <div className="flex items-center gap-1 text-[10px] text-primary font-bold">
                    <span>⚡ {chunk.endingSounds.map((es) => `${es.word} (${es.sound})`).join(", ")}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
