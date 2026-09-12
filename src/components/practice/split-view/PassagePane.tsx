"use client";

import React, { useRef, useState } from "react";
import {
  BookOpen,
  Clock,
  FileText,
  Sparkles,
  Highlighter,
  Check,
  RotateCcw,
} from "lucide-react";
import { ReadingPassageData } from "@/data/mockReadingPassage";
import { useTextSelection } from "@/hooks/useTextSelection";
import { TextSelectionMenu, HighlightColor, HIGHLIGHT_COLORS } from "@/components/practice/split-view/TextSelectionMenu";
import { InstantDictionaryModal } from "@/components/practice/split-view/InstantDictionaryModal";
import { useDictionary } from "@/hooks/useDictionary";
import { db } from "@/lib/db";
import { VocabCard } from "@/types/database";
import { cleanWord } from "@/lib/diffEngine";
import { cn } from "@/lib/utils";

interface PassageHighlight {
  id: string;
  text: string;
  color: HighlightColor;
  paragraphId: string;
}

interface PassagePaneProps {
  passage: ReadingPassageData;
  highlightedParagraphId?: string | null;
  className?: string;
}

export function PassagePane({
  passage,
  highlightedParagraphId,
  className,
}: PassagePaneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { selectedText, surroundingSentence, position, clearSelection } =
    useTextSelection(containerRef);
  const { result: dictResult, isLoading: isDictLoading, lookupWord, clearResult } = useDictionary();

  const [isDictModalOpen, setIsDictModalOpen] = useState(false);
  const [highlights, setHighlights] = useState<PassageHighlight[]>([]);

  // Add highlight to list
  const handleAddHighlight = (color: HighlightColor) => {
    if (!selectedText) return;
    const newHighlight: PassageHighlight = {
      id: `hl_${Date.now()}`,
      text: selectedText,
      color,
      paragraphId: "",
    };
    setHighlights((prev) => [...prev, newHighlight]);
    clearSelection();
  };

  const handleRemoveHighlight = () => {
    if (!selectedText) return;
    setHighlights((prev) => prev.filter((h) => !h.text.includes(selectedText)));
    clearSelection();
  };

  const handleOpenDictionary = () => {
    if (!selectedText) return;
    lookupWord(selectedText);
    setIsDictModalOpen(true);
    clearSelection();
  };

  const handleSaveToVocabDirect = async () => {
    if (!selectedText) return;
    const cleaned = cleanWord(selectedText);
    if (!cleaned) return;

    try {
      const today = new Date().toISOString().split("T")[0];
      const newCard: VocabCard = {
        id: `vocab_${cleaned}_${Date.now()}`,
        word: cleaned.charAt(0).toUpperCase() + cleaned.slice(1),
        ipa: "",
        meaning: `Từ vựng từ bài đọc: "${passage.title}"`,
        collocations: [],
        originalContext:
          surroundingSentence.trim() || `Ngữ cảnh từ bài đọc: ${cleaned}`,
        category: "awl_570",
        status: "new",
        stepInterval: 1,
        nextReviewDate: today,
        repetitionCount: 0,
        lapsesCount: 0,
        stability: 1.0,
        difficulty: 4.0,
        createdAt: new Date().toISOString(),
      };
      await db.vocab_matrix.put(newCard);
      alert(`Đã lưu từ '${cleaned}' kèm câu ngữ cảnh gốc vào Sổ FSRS!`);
      clearSelection();
    } catch (err) {
      console.error("Failed to save vocab:", err);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full overflow-y-auto p-5 sm:p-7 space-y-6 bg-card select-text",
        className
      )}
    >
      {/* Passage Header */}
      <div className="space-y-2 border-b border-border/80 pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 uppercase tracking-wider">
            {passage.category}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-indigo-500" /> ~{passage.estimatedMinutes} phút
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <FileText className="h-3.5 w-3.5 text-indigo-500" /> {passage.wordCount} từ
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-foreground leading-snug">
          {passage.title}
        </h2>
        <p className="text-xs text-muted-foreground">{passage.subtitle}</p>
      </div>

      {/* Floating Action Menu for Text Selection */}
      <TextSelectionMenu
        position={position}
        selectedText={selectedText}
        onHighlight={handleAddHighlight}
        onRemoveHighlight={handleRemoveHighlight}
        onLookupDictionary={handleOpenDictionary}
        onSaveToVocab={handleSaveToVocabDirect}
      />

      {/* Paragraphs with labels A, B, C, D */}
      <div className="space-y-6 text-sm sm:text-base leading-relaxed text-foreground/90 font-normal">
        {passage.paragraphs.map((p) => {
          const isTargetEvidence = highlightedParagraphId === p.id;

          return (
            <div
              key={p.id}
              id={p.id}
              className={cn(
                "relative rounded-2xl p-4 transition-all duration-300",
                isTargetEvidence
                  ? "bg-amber-500/[0.08] ring-2 ring-amber-500/60 shadow-md"
                  : "hover:bg-secondary/20"
              )}
            >
              {/* Paragraph marker badge */}
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary border border-border font-bold text-xs text-foreground shrink-0 select-none">
                  {p.label}
                </span>
                <p className="text-justify leading-relaxed">{p.content}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dictionary Popover Modal */}
      <InstantDictionaryModal
        isOpen={isDictModalOpen}
        onClose={() => {
          setIsDictModalOpen(false);
          clearResult();
        }}
        dictionaryData={dictResult}
        isLoading={isDictLoading}
        surroundingSentence={surroundingSentence}
      />
    </div>
  );
}
