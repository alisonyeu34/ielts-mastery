"use client";

import React from "react";
import { X, Volume2, Sparkles, BookOpen, Clock, Activity, ShieldCheck } from "lucide-react";
import { VocabCard } from "@/types/database";

interface VocabCardDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: VocabCard | null;
  onSpeak: (word: string) => void;
}

export function VocabCardDetailsModal({
  isOpen,
  onClose,
  card,
  onSpeak,
}: VocabCardDetailsModalProps) {
  if (!isOpen || !card) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-black text-foreground font-serif">
              {card.word}
            </h3>
            <button
              type="button"
              onClick={() => onSpeak(card.word)}
              className="p-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-colors cursor-pointer"
            >
              <Volume2 className="h-4 w-4" />
            </button>
            <span className="text-xs font-mono text-primary font-bold">{card.ipa}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Details */}
        <div className="space-y-4 text-xs">
          {/* Meaning */}
          <div className="space-y-1">
            <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider block">
              Nghĩa Tiếng Việt & Định Nghĩa Học Thuật:
            </span>
            <p className="text-sm font-bold text-foreground">
              {card.meaning}
            </p>
            {card.definitionEn && (
              <p className="text-xs text-muted-foreground italic">
                {card.definitionEn}
              </p>
            )}
          </div>

          {/* Collocations */}
          {card.collocations && card.collocations.length > 0 && (
            <div className="space-y-1.5">
              <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider block">
                Cụm Collocations Khảo Thí:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {card.collocations.map((colloc, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-secondary border border-border text-xs font-medium text-foreground"
                  >
                    {colloc}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Context Sentence */}
          <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-1">
            <span className="font-bold text-foreground block">Ngữ cảnh bài học:</span>
            <p className="font-serif text-xs sm:text-sm text-foreground leading-relaxed">
              "{card.originalContext}"
            </p>
          </div>

          {/* FSRS Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="p-3 rounded-xl bg-secondary/40 border border-border space-y-0.5">
              <span className="text-[10px] text-muted-foreground uppercase">Stability (S)</span>
              <div className="font-mono font-bold text-foreground">{card.stability || 2.4}d</div>
            </div>
            <div className="p-3 rounded-xl bg-secondary/40 border border-border space-y-0.5">
              <span className="text-[10px] text-muted-foreground uppercase">Difficulty (D)</span>
              <div className="font-mono font-bold text-foreground">{card.difficulty || 4.5}</div>
            </div>
            <div className="p-3 rounded-xl bg-secondary/40 border border-border space-y-0.5">
              <span className="text-[10px] text-muted-foreground uppercase">Repetitions</span>
              <div className="font-mono font-bold text-foreground">{card.repetitionCount || 0}</div>
            </div>
            <div className="p-3 rounded-xl bg-secondary/40 border border-border space-y-0.5">
              <span className="text-[10px] text-muted-foreground uppercase">Next Due</span>
              <div className="font-mono font-bold text-primary">{card.nextReviewDate}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-border/60">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-foreground text-background font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
