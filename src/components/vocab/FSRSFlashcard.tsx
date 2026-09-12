"use client";

import React, { useState, useEffect } from "react";
import {
  Volume2,
  Sparkles,
  HelpCircle,
  RotateCw,
  Layers,
  CheckCircle2,
  Bookmark,
  Eye,
  EyeOff,
} from "lucide-react";
import { VocabCard } from "@/types/database";
import { cn } from "@/lib/utils";

interface FSRSFlashcardProps {
  card: VocabCard;
  isFlipped: boolean;
  onToggleFlip: () => void;
  className?: string;
}

export function FSRSFlashcard({
  card,
  isFlipped,
  onToggleFlip,
  className,
}: FSRSFlashcardProps) {
  const [showHint, setShowHint] = useState<boolean>(false);

  // Reset hint when card changes
  useEffect(() => {
    setShowHint(false);
  }, [card.id]);

  // Text-to-speech for context sentence or word
  const speakText = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-GB";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Cloze Sentence: Replace target word with blank on Front
  const renderClozeSentence = () => {
    const regex = new RegExp(`\\b${card.word}\\b`, "gi");
    const parts = card.originalContext.split(regex);

    if (parts.length <= 1) {
      return <span>"{card.originalContext}"</span>;
    }

    return (
      <span>
        "{parts[0]}
        <span className="inline-block px-3 py-0.5 mx-1 rounded-lg bg-primary/15 border border-primary/40 font-mono font-bold text-primary animate-pulse">
          [ _______ ]
        </span>
        {parts[1]}"
      </span>
    );
  };

  return (
    <div className={cn("relative w-full max-w-2xl mx-auto perspective-1000 select-none", className)}>
      <div
        onClick={onToggleFlip}
        className={cn(
          "relative w-full min-h-[360px] sm:min-h-[400px] rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl transition-all duration-500 transform-style-3d cursor-pointer flex flex-col justify-between hover:border-primary/50",
          isFlipped ? "rotate-y-180" : ""
        )}
      >
        {/* ========================================================================= */}
        {/* FRONT OF FLASHCARD (Prompt / Cloze Context) */}
        {/* ========================================================================= */}
        <div
          className={cn(
            "w-full h-full flex flex-col justify-between space-y-6 backface-hidden",
            isFlipped ? "hidden" : "flex"
          )}
        >
          {/* Front Header */}
          <div className="flex items-center justify-between border-b border-border/70 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
                {card.category.toUpperCase()} • {card.bandLevel || "Band 7.5+"}
              </span>
              <span className="text-xs font-bold text-muted-foreground">
                Thẻ #{card.stepInterval} Ngày
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => speakText(card.originalContext, e)}
              className="p-2 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors cursor-pointer"
              title="Nghe phát âm câu ngữ cảnh"
            >
              <Volume2 className="h-4 w-4 text-primary" />
            </button>
          </div>

          {/* Front Center: Cloze Context */}
          <div className="space-y-4 my-auto text-center py-4">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
              Ngữ Cảnh Thực Tế (Contextual Anchoring):
            </span>
            <p className="text-base sm:text-xl font-serif leading-relaxed text-foreground/90 font-medium">
              {renderClozeSentence()}
            </p>
          </div>

          {/* Front Hint Accordion */}
          {showHint && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="p-4 rounded-2xl bg-primary/[0.04] border border-primary/20 text-xs space-y-2 text-left animate-in fade-in duration-200"
            >
              <span className="font-bold text-primary flex items-center gap-1.5 text-[11px] uppercase">
                <Sparkles className="h-3.5 w-3.5" /> Gợi Ý Định Nghĩa:
              </span>
              <p className="text-muted-foreground italic font-serif">
                "{card.definitionEn || card.meaning}"
              </p>
              {card.wordFamily && card.wordFamily.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1 border-t border-primary/10">
                  {card.wordFamily.map((wf, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-card border border-border text-[10px] font-mono">
                      {wf.pos}: {wf.word.charAt(0)}***
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Front Footer */}
          <div className="pt-4 border-t border-border/70 flex items-center justify-between text-xs text-muted-foreground">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowHint((p) => !p);
              }}
              className="px-3 py-1.5 rounded-xl border border-border bg-secondary/40 hover:bg-secondary text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <HelpCircle className="h-3.5 w-3.5 text-amber-500" />
              <span>{showHint ? "Ẩn Gợi Ý" : "Hiện Gợi Ý"}</span>
            </button>

            <span className="font-mono text-[11px] flex items-center gap-1">
              <RotateCw className="h-3.5 w-3.5 text-primary" />
              <span>Click hoặc bấm Space để lật thẻ</span>
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BACK OF FLASHCARD (Reveal & Collocations Matrix) */}
        {/* ========================================================================= */}
        <div
          className={cn(
            "w-full h-full flex flex-col justify-between space-y-5 rotate-y-180 backface-hidden",
            isFlipped ? "flex" : "hidden"
          )}
        >
          {/* Back Header */}
          <div className="flex items-center justify-between border-b border-border/70 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                ✓ Đã Mở Khóa Đáp Án
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => speakText(card.word, e)}
              className="p-2 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors cursor-pointer"
              title="Phát âm từ này"
            >
              <Volume2 className="h-4 w-4 text-emerald-600" />
            </button>
          </div>

          {/* Back Word & Meanings */}
          <div className="space-y-3">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-foreground">
                {card.word}
              </h2>
              <span className="font-mono text-sm sm:text-base text-primary font-bold">
                {card.ipa}
              </span>
            </div>

            <p className="text-sm sm:text-base font-medium text-foreground">
              {card.meaning}
            </p>

            {card.definitionEn && (
              <p className="text-xs text-muted-foreground italic font-serif">
                "{card.definitionEn}"
              </p>
            )}
          </div>

          {/* Collocation Matrix Badges */}
          {card.collocations.length > 0 && (
            <div className="space-y-1.5 p-3 rounded-2xl bg-secondary/30 border border-border text-xs">
              <span className="font-bold text-sky-600 dark:text-sky-400 text-[10px] uppercase font-mono block">
                🔗 Mạng Lưới Collocations Vàng:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {card.collocations.map((c, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-card border border-border font-serif font-bold text-foreground text-xs shadow-2xs"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Word Family Tree */}
          {card.wordFamily && card.wordFamily.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap text-xs pt-1 border-t border-border/60">
              <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold">
                Họ từ:
              </span>
              {card.wordFamily.map((wf, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-lg bg-card border border-border text-[11px] font-mono">
                  <strong>{wf.pos}:</strong> {wf.word}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
