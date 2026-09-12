"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Headphones,
  Lock,
  Unlock,
  Volume2,
  Sparkles,
  BookmarkPlus,
  CheckCircle2,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { TranscriptSentence } from "@/data/mockListeningSplitData";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";

interface InteractiveTranscriptPaneProps {
  transcript: TranscriptSentence[];
  activeSentenceId: string | null;
  blindMode: boolean;
  onSeek: (timeSec: number) => void;
  onUnlockBlindMode: () => void;
  className?: string;
}

export function InteractiveTranscriptPane({
  transcript,
  activeSentenceId,
  blindMode,
  onSeek,
  onUnlockBlindMode,
  className,
}: InteractiveTranscriptPaneProps) {
  const [fontSizeScale, setFontSizeScale] = useState<number>(14);
  const [savedVocabIds, setSavedVocabIds] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active sentence into view
  useEffect(() => {
    if (activeSentenceId && !blindMode) {
      const el = document.getElementById(`sentence_${activeSentenceId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [activeSentenceId, blindMode]);

  const handleSaveVocab = async (word: string, contextSentence: string) => {
    try {
      await db.vocab_matrix.put({
        id: `vocab_ls_${Date.now()}_${word.substring(0, 8)}`,
        word: word.trim(),
        ipa: `/${word.trim()}/`,
        meaning: `Từ vựng trích từ bài nghe Listening Section 3`,
        collocations: [word.trim()],
        originalContext: contextSentence,
        category: "c1_academic",
        status: "new",
        stepInterval: 1,
        repetitionCount: 0,
        lapsesCount: 0,
        stability: 1.0,
        difficulty: 5.0,
        nextReviewDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });
      setSavedVocabIds((prev) => [...prev, word]);
    } catch (e) {
      console.error("Failed to save listening vocab:", e);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex flex-col h-full bg-card rounded-3xl border border-border shadow-xs overflow-hidden select-none",
        className
      )}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/80 bg-secondary/20 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Headphones className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-bold text-xs text-foreground">
              Transcript Đồng Bộ Thời Gian Thực
            </h3>
            <span className="text-[10px] font-mono text-muted-foreground">
              {transcript.length} Câu Thoại • Đồng Bộ Sóng Âm Karaoke
            </span>
          </div>
        </div>

        {/* Font Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setFontSizeScale(Math.max(12, fontSizeScale - 1))}
            className="p-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-foreground text-xs font-bold transition-colors cursor-pointer"
            title="Giảm cỡ chữ (A-)"
          >
            A-
          </button>
          <button
            type="button"
            onClick={() => setFontSizeScale(Math.min(18, fontSizeScale + 1))}
            className="p-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-foreground text-xs font-bold transition-colors cursor-pointer"
            title="Tăng cỡ chữ (A+)"
          >
            A+
          </button>
        </div>
      </div>

      {/* Transcript Body */}
      <div
        style={{ fontSize: `${fontSizeScale}px` }}
        className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 font-serif leading-relaxed text-foreground/90 scroll-smooth relative"
      >
        {/* Blind Mode Lock Overlay */}
        {blindMode ? (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-card/85 backdrop-blur-md text-center space-y-4 animate-in fade-in">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-amber-500/15 text-amber-600 border border-amber-500/30 shadow-md">
              <Lock className="h-7 w-7" />
            </div>

            <div className="space-y-1 max-w-sm">
              <h4 className="font-bold text-sm text-foreground">
                Chế Độ Phòng Thi (Blind Listening Mode)
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Transcript tạm thời bị ẩn để ngăn thói quen nhìn chữ đoán âm, rèn luyện phản xạ thính lực 100%. Transcript sẽ tự động mở khóa sau khi bạn nộp bài.
              </p>
            </div>

            <button
              type="button"
              onClick={onUnlockBlindMode}
              className="px-4 py-2 rounded-xl border border-border bg-card hover:bg-secondary text-foreground text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Unlock className="h-3.5 w-3.5 text-primary" />
              <span>Tạm Thời Mở Khóa Xem Transcript</span>
            </button>
          </div>
        ) : (
          /* Unlocked Interactive Sentences List */
          transcript.map((t) => {
            const isActive = activeSentenceId === t.id;
            const isEvidence = t.trapType === "evidence";
            const isDistractor = t.trapType === "distractor";

            return (
              <div
                key={t.id}
                id={`sentence_${t.id}`}
                onClick={() => onSeek(t.startTimeSec)}
                className={cn(
                  "p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1.5",
                  isActive
                    ? "bg-primary/10 border-primary ring-2 ring-primary/40 shadow-sm"
                    : "bg-secondary/[0.08] hover:bg-secondary/30 border-border/70",
                  isEvidence && !isActive ? "border-emerald-500/30 bg-emerald-500/[0.03]" : "",
                  isDistractor && !isActive ? "border-rose-500/30 bg-rose-500/[0.03]" : ""
                )}
              >
                {/* Speaker & Timestamp ribbon */}
                <div className="flex items-center justify-between font-sans text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-1.5 font-bold">
                    <span className="px-2 py-0.5 rounded-md bg-secondary text-foreground font-mono">
                      {t.speaker}
                    </span>
                    {isEvidence && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 font-mono font-bold">
                        📍 Dẫn Chứng Đáp Án
                      </span>
                    )}
                    {isDistractor && (
                      <span className="px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-600 font-mono font-bold">
                        ⚠️ Bẫy Gây Nhiễu
                      </span>
                    )}
                  </div>

                  <span className="font-mono">
                    {Math.floor(t.startTimeSec)}s - {Math.floor(t.endTimeSec)}s
                  </span>
                </div>

                {/* Sentence Text */}
                <p className="leading-relaxed text-foreground">
                  {t.text}
                </p>

                {/* Trap Explanation if flagged */}
                {t.trapExplanation && (
                  <div className="pt-1 text-[11px] font-sans text-muted-foreground border-t border-border/50">
                    💡 <strong>Mổ xẻ:</strong> {t.trapExplanation}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
