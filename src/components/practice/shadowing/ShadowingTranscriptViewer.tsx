"use client";

import React from "react";
import {
  Sparkles,
  Zap,
  Volume2,
  Bookmark,
  Info,
  CheckCircle,
} from "lucide-react";
import { ShadowingSentence, ShadowingChunk } from "@/data/mockShadowingData";
import { cn } from "@/lib/utils";

interface ShadowingTranscriptViewerProps {
  sentence: ShadowingSentence;
  activeChunkIndex: number;
  className?: string;
}

export function ShadowingTranscriptViewer({
  sentence,
  activeChunkIndex,
  className,
}: ShadowingTranscriptViewerProps) {
  const currentChunk = sentence.chunks[activeChunkIndex] || sentence.chunks[0];

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
              {sentence.part}
            </span>
            <span className="text-xs font-bold text-muted-foreground">
              {sentence.topic} • Chuẩn {sentence.targetBand}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-foreground">
            Bản Ký Âm Ngữ Điệu & Trọng Âm Cụm (Thought Groups)
          </h3>
          <p className="text-xs font-semibold text-primary flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5" />
            <span>Trọng tâm: {sentence.soundFocus}</span>
          </p>
        </div>

        <span className="text-[11px] text-muted-foreground font-mono self-start sm:self-auto bg-secondary/40 px-3 py-1 rounded-xl border border-border">
          Tempo: ~{sentence.tempoWPM} WPM
        </span>
      </div>

      {/* Main Full Sentence Container */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
            Toàn Bộ Câu Nói (Nhấp vào từng cụm để luyện tập riêng):
          </span>
          <span className="text-[10px] text-muted-foreground italic">
            *Từ in đậm = Trọng âm câu • Gạch chân = Chứa âm đuôi cốt lõi
          </span>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-secondary/20 border border-border text-base sm:text-lg font-serif leading-relaxed text-foreground/90">
          {sentence.chunks.map((chunk, cIdx) => {
            const isActive = activeChunkIndex === cIdx;
            const words = chunk.text.split(" ");

            return (
              <span
                key={chunk.id}
                className={cn(
                  "inline-block rounded-xl px-2.5 py-1.5 mx-1 my-1 transition-all border",
                  isActive
                    ? "bg-primary/15 border-primary/40 ring-2 ring-primary/25 text-primary font-bold shadow-xs"
                    : "border-transparent hover:bg-secondary/40 text-foreground"
                )}
              >
                {words.map((word, wIdx) => {
                  const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
                  const isStressed = chunk.stressedWords.some(
                    (sw) => sw.toLowerCase() === cleanWord
                  );
                  const hasEndingSound = chunk.endingSounds?.some(
                    (es) => es.word.toLowerCase() === cleanWord
                  );

                  return (
                    <span
                      key={wIdx}
                      className={cn(
                        "inline-block mr-1.5 transition-all",
                        isStressed && "font-extrabold text-foreground",
                        hasEndingSound
                          ? "underline decoration-primary decoration-2 font-bold text-primary dark:text-rose-400"
                          : !isStressed && "font-normal text-muted-foreground/90"
                      )}
                    >
                      {word}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </div>
      </div>

      {/* Active Chunk Detailed Guidance */}
      <div className="p-4 sm:p-5 rounded-2xl bg-primary/[0.04] border border-primary/20 space-y-4 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-primary/15 pb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-[11px] px-2.5 py-0.5 rounded-lg bg-primary text-primary-foreground">
              Cụm {activeChunkIndex + 1}/{sentence.chunks.length}
            </span>
            <span className="font-serif italic font-bold text-foreground text-sm sm:text-base">
              "{currentChunk.text}"
            </span>
          </div>

          <span className="text-[11px] font-semibold text-primary font-sans bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/20">
            {currentChunk.durationSeconds} giây
          </span>
        </div>

        {/* Actionable Pronunciation Guide */}
        <div className="p-3 rounded-xl bg-card border border-border space-y-1">
          <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-wider block">
            Hướng dẫn khẩu hình & nhịp điệu:
          </span>
          <p className="text-xs sm:text-sm text-foreground font-medium leading-relaxed">
            {currentChunk.pronunciationGuide}
          </p>
        </div>

        {/* Ending Sounds Highlight (Day 1 Focus: -s / -ed) */}
        {currentChunk.endingSounds && currentChunk.endingSounds.length > 0 && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 space-y-2">
            <span className="font-bold text-[10px] text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" /> Điểm Bật Chuẩn 2 Âm Đuôi Sống Còn:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentChunk.endingSounds.map((es, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-card border border-rose-500/20 text-xs space-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-primary">
                      {es.word} ({es.ending})
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-primary/15 text-primary font-mono text-[10px] font-bold">
                      {es.sound}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-normal">
                    {es.pronounceGuide}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Connected Speech Linking & Elisions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Linking Pairs */}
          <div className="space-y-1.5">
            <span className="font-bold text-rose-700 dark:text-rose-400 uppercase text-[10px] block">
              🔗 Điểm Nối Âm (Connected Speech):
            </span>
            {currentChunk.linkingPairs.length > 0 ? (
              <ul className="space-y-1 text-[11px] text-muted-foreground font-mono">
                {currentChunk.linkingPairs.map((lp, idx) => (
                  <li
                    key={idx}
                    className="p-2 rounded-lg bg-card border border-border flex items-center justify-between"
                  >
                    <strong className="text-foreground">{lp.fromWord} ‿ {lp.toWord}</strong>
                    <span className="text-[10px] text-muted-foreground">({lp.label})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[11px] text-muted-foreground italic p-2 rounded-lg bg-card border border-border">
                Không có điểm nối âm phức tạp trong cụm này
              </p>
            )}
          </div>

          {/* Elision / Silent sounds */}
          <div className="space-y-1.5">
            <span className="font-bold text-amber-600 dark:text-amber-400 uppercase text-[10px] block">
              🔇 Điểm Nuốt Âm / Weak Form:
            </span>
            {currentChunk.elisions.length > 0 ? (
              <ul className="space-y-1 text-[11px] text-muted-foreground">
                {currentChunk.elisions.map((el, idx) => (
                  <li key={idx} className="p-2 rounded-lg bg-card border border-border text-xs">
                    <strong className="text-foreground">{el.word}:</strong> {el.explanation}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[11px] text-muted-foreground italic p-2 rounded-lg bg-card border border-border">
                Phát âm chuẩn xác các phụ âm
              </p>
            )}
          </div>
        </div>

        {/* Cambridge Tip */}
        <div className="p-3 rounded-xl bg-card/60 border border-border text-[11px] text-muted-foreground font-serif leading-relaxed">
          💡 <strong>Lời khuyên giám khảo:</strong> {sentence.cambridgeTip}
        </div>
      </div>
    </div>
  );
}
