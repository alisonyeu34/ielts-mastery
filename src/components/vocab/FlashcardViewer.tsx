"use client";

import React, { useState, useEffect } from "react";
import {
  Volume2,
  RotateCw,
  Sparkles,
  BookmarkCheck,
  Check,
  HelpCircle,
  Clock,
  Layers,
  Tag,
} from "lucide-react";
import { VocabCard } from "@/types/database";
import { FSRSRating } from "@/lib/spacedRepetition";
import { cn } from "@/lib/utils";

interface FlashcardViewerProps {
  card: VocabCard;
  onRate: (rating: FSRSRating) => void;
  isFlipped: boolean;
  onToggleFlip: () => void;
  className?: string;
}

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  awl_570: { label: "AWL 570 (Academic)", color: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20" },
  "570_awl": { label: "AWL 570 (Academic)", color: "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20" },
  core_3000: { label: "Oxford Core 3000", color: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20" },
  "3000_core": { label: "Oxford Core 3000", color: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20" },
  c1_academic: { label: "C1/C2 Advanced", color: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20" },
  custom: { label: "Từ Vựng Cá Nhân", color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
};

export function FlashcardViewer({
  card,
  onRate,
  isFlipped,
  onToggleFlip,
  className,
}: FlashcardViewerProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Play audio using Web Speech API
  const speakWord = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(card.word);
    utterance.lang = "en-GB";
    utterance.rate = 0.9;

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (v) => (v.lang === "en-GB" || v.lang === "en-US") && !v.name.includes("Google")
    ) || voices.find((v) => v.lang.startsWith("en"));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  // Keyboard shortcut listener: Space to flip, 1-2-3-4 to rate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or modal
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        onToggleFlip();
      } else if (isFlipped) {
        if (e.key === "1") {
          e.preventDefault();
          onRate("again");
        } else if (e.key === "2") {
          e.preventDefault();
          onRate("hard");
        } else if (e.key === "3") {
          e.preventDefault();
          onRate("good");
        } else if (e.key === "4") {
          e.preventDefault();
          onRate("easy");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFlipped, onToggleFlip, onRate]);

  // Create masked sentence on front face (masking the target word)
  const getMaskedContext = (sentence: string, targetWord: string) => {
    if (!sentence || !targetWord) return sentence;
    const regex = new RegExp(`\\b${targetWord}\\w*\\b`, "gi");
    const parts = sentence.split(regex);
    const matches = sentence.match(regex);

    if (!matches) return sentence;

    return (
      <span>
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i < matches.length && (
              <span className="inline-block px-2.5 py-0.5 mx-1 rounded-lg bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold border border-dashed border-indigo-500/40 select-none">
                [ {targetWord.length > 4 ? `${targetWord.slice(0, 2)}...` : "_____"} ]
              </span>
            )}
          </React.Fragment>
        ))}
      </span>
    );
  };

  // Highlight word on back face
  const getHighlightedContext = (sentence: string, targetWord: string) => {
    if (!sentence || !targetWord) return sentence;
    const regex = new RegExp(`(\\b${targetWord}\\w*\\b)`, "gi");
    const parts = sentence.split(regex);

    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark
              key={i}
              className="bg-purple-500/20 text-purple-700 dark:text-purple-300 px-1 rounded font-bold"
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const categoryStyle = CATEGORY_LABELS[card.category] || CATEGORY_LABELS.awl_570;

  return (
    <div className={cn("w-full max-w-2xl mx-auto select-none", className)} style={{ perspective: "1200px" }}>
      <div
        onClick={onToggleFlip}
        className={cn(
          "relative w-full rounded-3xl cursor-pointer transition-all duration-500 ease-out",
          "min-h-[420px] sm:min-h-[440px]"
        )}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ================= FRONT FACE (Prompt & Masked Context) ================= */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full rounded-3xl border border-border/80 bg-card p-6 sm:p-8 flex flex-col justify-between shadow-lg shadow-indigo-500/5",
            "backface-hidden"
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Top metadata */}
          <div className="flex items-center justify-between border-b border-border/80 pb-3.5">
            <span className={cn("text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider", categoryStyle.color)}>
              {categoryStyle.label}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-indigo-500" />
              <span>Khoảng cách: <strong>{card.stepInterval} ngày</strong></span>
            </div>
          </div>

          {/* Center: Word, IPA and Audio */}
          <div className="my-auto text-center space-y-4 py-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-center gap-3">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                  {card.word}
                </h2>
                <button
                  type="button"
                  onClick={speakWord}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-all cursor-pointer",
                    isPlayingAudio && "text-indigo-600 scale-110 ring-2 ring-indigo-500"
                  )}
                  title="Phát âm từ vựng"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>

              {card.ipa && (
                <p className="text-sm sm:text-base font-mono font-medium text-muted-foreground">
                  {card.ipa}
                </p>
              )}
            </div>

            {/* Masked Original Context */}
            {card.originalContext && (
              <div className="p-4 sm:p-5 rounded-2xl bg-secondary/40 border border-border/60 text-xs sm:text-sm text-foreground/90 text-left leading-relaxed">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-indigo-500" /> Ngữ Cảnh Gốc (Active Recall):
                </div>
                <p className="italic">
                  "{getMaskedContext(card.originalContext, card.word)}"
                </p>
              </div>
            )}
          </div>

          {/* Bottom Flip Trigger Guide */}
          <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
            <span className="hidden sm:inline">Nhấn phím <kbd className="px-1.5 py-0.5 rounded bg-secondary font-mono text-[10px] text-foreground">Space</kbd> để lật thẻ</span>
            <div className="flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400 ml-auto">
              <span>Lật thẻ xem nghĩa & Collocations</span>
              <RotateCw className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>

        {/* ================= BACK FACE (Answer, Collocations & FSRS Ratings) ================= */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full rounded-3xl border border-purple-500/30 bg-card p-6 sm:p-8 flex flex-col justify-between shadow-xl shadow-purple-500/10",
            "backface-hidden"
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          onClick={(e) => e.stopPropagation()} // Prevent auto-flipping when clicking answer buttons
        >
          {/* Top Word header on back */}
          <div className="flex items-center justify-between border-b border-border/80 pb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-foreground">{card.word}</h3>
              <span className="text-xs font-mono text-muted-foreground">{card.ipa}</span>
              <button
                type="button"
                onClick={speakWord}
                className="p-1 rounded-lg hover:bg-secondary text-foreground"
                title="Phát âm"
              >
                <Volume2 className="h-4 w-4 text-purple-500" />
              </button>
            </div>
            <button
              type="button"
              onClick={onToggleFlip}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <RotateCw className="h-3 w-3" /> Lật lại
            </button>
          </div>

          {/* Center Details */}
          <div className="space-y-4 my-auto py-2">
            {/* Meaning */}
            <div className="p-3.5 rounded-xl bg-purple-500/5 border border-purple-500/20 text-xs sm:text-sm space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Định nghĩa Tiếng Việt:
              </span>
              <p className="font-bold text-foreground leading-relaxed">{card.meaning}</p>
            </div>

            {/* Mandatory Academic Collocations */}
            {card.collocations && card.collocations.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <BookmarkCheck className="h-3.5 w-3.5 text-purple-500" /> Cụm Collocations Bắt Buộc:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {card.collocations.map((colloc, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-secondary/80 border border-border/80 font-medium text-foreground hover:border-purple-500/40 transition-colors"
                    >
                      • {colloc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Complete Context */}
            {card.originalContext && (
              <div className="text-xs text-muted-foreground italic bg-secondary/30 p-3 rounded-xl border border-border/50">
                "{getHighlightedContext(card.originalContext, card.word)}"
              </div>
            )}
          </div>

          {/* Bottom 4 FSRS Assessment Buttons */}
          <div className="pt-3 border-t border-border/80 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
              <span>Đánh giá độ nhớ để xếp lịch FSRS:</span>
              <span className="hidden sm:inline">Phím tắt: 1, 2, 3, 4</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => onRate("again")}
                className="flex flex-col items-center p-2 sm:p-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 transition-all text-center cursor-pointer group"
              >
                <span className="text-xs font-bold text-rose-500 group-hover:scale-105">1. Again</span>
                <span className="text-[10px] text-muted-foreground">1 ngày</span>
              </button>

              <button
                type="button"
                onClick={() => onRate("hard")}
                className="flex flex-col items-center p-2 sm:p-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 transition-all text-center cursor-pointer group"
              >
                <span className="text-xs font-bold text-amber-500 group-hover:scale-105">2. Hard</span>
                <span className="text-[10px] text-muted-foreground">
                  {Math.max(1, Math.round(card.stepInterval * 1.2))} ngày
                </span>
              </button>

              <button
                type="button"
                onClick={() => onRate("good")}
                className="flex flex-col items-center p-2 sm:p-2.5 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 transition-all text-center cursor-pointer group"
              >
                <span className="text-xs font-bold text-blue-500 group-hover:scale-105">3. Good</span>
                <span className="text-[10px] text-muted-foreground">
                  {card.stepInterval === 1 ? "3" : card.stepInterval === 3 ? "7" : card.stepInterval === 7 ? "14" : "30"} ngày
                </span>
              </button>

              <button
                type="button"
                onClick={() => onRate("easy")}
                className="flex flex-col items-center p-2 sm:p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all text-center cursor-pointer group"
              >
                <span className="text-xs font-bold text-emerald-500 group-hover:scale-105">4. Easy</span>
                <span className="text-[10px] text-muted-foreground">
                  {card.stepInterval <= 3 ? "7" : card.stepInterval <= 7 ? "14" : "30"} ngày
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
