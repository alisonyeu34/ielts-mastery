"use client";

import React from "react";
import {
  Volume2,
  Sparkles,
  BookOpen,
  ArrowRight,
  Headphones,
} from "lucide-react";
import {
  ThoughtGroupSentenceItem,
  ThoughtGroupChunk,
} from "@/data/mockSuprasegmentalData";
import { RhythmMetronomeBar } from "./RhythmMetronomeBar";
import { playNativeAudio } from "@/lib/phoneticAcousticAnalyzer";

interface ThoughtGroupChunkerProps {
  items: ThoughtGroupSentenceItem[];
  selectedItem: ThoughtGroupSentenceItem;
  onSelectItem: (item: ThoughtGroupSentenceItem) => void;
  isMetronomeRunning: boolean;
  onToggleMetronome: () => void;
  activeChunkIndex: number;
  metronomeBPM: number;
  onBpmChange: (bpm: number) => void;
}

export function ThoughtGroupChunker({
  items,
  selectedItem,
  onSelectItem,
  isMetronomeRunning,
  onToggleMetronome,
  activeChunkIndex,
  metronomeBPM,
  onBpmChange,
}: ThoughtGroupChunkerProps) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">
            {selectedItem.topic}
          </span>
          <h3 className="text-base font-black text-foreground">
            Xưởng Ngắt Cụm Ý Nghĩa (Thought Groups) & Nhịp Điệu
          </h3>
        </div>

        {/* Sentence Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectItem(item)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedItem.id === item.id
                  ? "bg-primary text-primary-foreground font-black shadow-xs scale-102"
                  : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/80"
              }`}
            >
              {item.fullSentence.slice(0, 22)}...
            </button>
          ))}
        </div>
      </div>

      {/* Metronome Rhythm Controller */}
      <RhythmMetronomeBar
        isRunning={isMetronomeRunning}
        onToggle={onToggleMetronome}
        bpm={metronomeBPM}
        onBpmChange={onBpmChange}
        activeChunkIndex={activeChunkIndex}
        totalChunks={selectedItem.chunks.length}
      />

      {/* Chunked Visualizer Canvas */}
      <div className="p-6 sm:p-8 rounded-3xl bg-secondary/30 border border-border text-center space-y-6">
        {/* Thought Group Blocks */}
        <div className="flex flex-wrap items-center justify-center gap-3 py-2">
          {selectedItem.chunks.map((chunk, idx) => {
            const isActive = isMetronomeRunning && activeChunkIndex === idx;

            return (
              <React.Fragment key={idx}>
                <div
                  className={`p-4 rounded-2xl border transition-all duration-200 text-left space-y-1.5 ${
                    isActive
                      ? "bg-primary/10 border-primary ring-2 ring-primary/30 shadow-md scale-105"
                      : "bg-card border-border/80"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                    <span>Cụm #{chunk.chunkIndex + 1}</span>
                    <span className="text-primary font-bold">
                      Ngắt ~{chunk.suggestedPauseSeconds}s
                    </span>
                  </div>

                  {/* Words rendering with Content vs Function styling */}
                  <p className="text-sm sm:text-base font-serif font-bold text-foreground">
                    {chunk.text.split(" ").map((w, wIdx) => {
                      const cleanWord = w.replace(/[^a-zA-Z]/g, "");
                      const isContent = chunk.contentWords.some(
                        (cw) => cw.toLowerCase() === cleanWord.toLowerCase()
                      );
                      return (
                        <span
                          key={wIdx}
                          className={
                            isContent
                              ? "text-foreground font-black font-serif underline decoration-primary/40 mr-1.5"
                              : "text-muted-foreground font-normal mr-1.5"
                          }
                        >
                          {w}
                        </span>
                      );
                    })}
                  </p>
                </div>

                {/* Boundary Pause Indicator */}
                <span className="text-xl font-mono font-black text-primary select-none px-1">
                  {chunk.isTerminal ? "||" : "|"}
                </span>
              </React.Fragment>
            );
          })}
        </div>

        {/* Audio Button */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => playNativeAudio(selectedItem.fullSentence)}
            className="px-6 py-2.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs inline-flex items-center gap-2 shadow-md transition-transform hover:scale-105 cursor-pointer"
          >
            <Volume2 className="h-4 w-4" />
            <span>Nghe Câu Mẫu Có Ngắt Cụm Chuẩn</span>
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-muted-foreground pt-1 border-t border-border/60">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <strong className="text-foreground underline">Từ đậm</strong>: Content Words (Nhấn mạnh, to hơn)
          </span>
          <span className="flex items-center gap-1">
            <span className="text-muted-foreground">Từ mờ</span>: Function Words (Âm lướt Schwa)
          </span>
          <span className="flex items-center gap-1">
            <strong className="text-primary font-bold">|</strong>: Ngắt ngắn 0.3s
          </span>
          <span className="flex items-center gap-1">
            <strong className="text-primary font-bold">||</strong>: Ngắt dài 0.8s
          </span>
        </div>
      </div>
    </div>
  );
}
