"use client";

import React, { useState } from "react";
import {
  X,
  Volume2,
  BookOpen,
  Plus,
  Check,
  Sparkles,
  BookmarkCheck,
} from "lucide-react";
import { DictionaryResult } from "@/hooks/useDictionary";
import { db } from "@/lib/db";
import { VocabCard } from "@/types/database";
import { cleanWord } from "@/lib/diffEngine";
import { cn } from "@/lib/utils";

interface InstantDictionaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  dictionaryData: DictionaryResult | null;
  isLoading: boolean;
  surroundingSentence: string;
  onSavedToVocab?: (word: string) => void;
}

export function InstantDictionaryModal({
  isOpen,
  onClose,
  dictionaryData,
  isLoading,
  surroundingSentence,
  onSavedToVocab,
}: InstantDictionaryModalProps) {
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const speakWord = (word: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-GB";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleSaveToFSRS = async () => {
    if (!dictionaryData) return;

    const cleaned = cleanWord(dictionaryData.word);
    if (!cleaned) return;

    try {
      const today = new Date().toISOString().split("T")[0];
      const primaryDef =
        dictionaryData.vietnameseMeaning ||
        dictionaryData.meanings[0]?.definitions[0]?.definition ||
        "Từ vựng trích xuất từ bài đọc";

      const collocations: string[] = [];
      dictionaryData.meanings.forEach((m) => {
        m.definitions.forEach((d) => {
          if (d.example && d.example.length < 50) {
            collocations.push(d.example);
          }
        });
      });

      const newCard: VocabCard = {
        id: `vocab_${cleaned}_${Date.now()}`,
        word: cleaned.charAt(0).toUpperCase() + cleaned.slice(1),
        ipa: dictionaryData.phonetic || "",
        meaning: primaryDef,
        collocations: collocations.slice(0, 3),
        originalContext:
          surroundingSentence.trim() || `Ngữ cảnh từ bài đọc học thuật: ${cleaned}`,
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
      setIsSaved(true);
      if (onSavedToVocab) onSavedToVocab(cleaned);
    } catch (err) {
      console.error("Failed to save vocab card:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div
        className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border/80 pb-3.5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                Tra Từ Điển Ngữ Cảnh Tức Thì
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Định nghĩa chuẩn Oxford & Cambridge
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="py-10 text-center space-y-2">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-xs text-muted-foreground">Đang tra cứu từ điển học thuật...</p>
          </div>
        ) : dictionaryData ? (
          <div className="space-y-4 text-xs">
            {/* Word title, phonetic, and pronunciation button */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-secondary/40 border border-border/60">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-foreground capitalize">
                  {dictionaryData.word}
                </h2>
                {dictionaryData.phonetic && (
                  <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    {dictionaryData.phonetic}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => speakWord(dictionaryData.word)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card hover:bg-secondary text-foreground transition-all shadow-sm cursor-pointer"
                title="Nghe phát âm"
              >
                <Volume2 className="h-4 w-4 text-indigo-500" />
              </button>
            </div>

            {/* Vietnamese meaning preview if available */}
            {dictionaryData.vietnameseMeaning && (
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-0.5">
                  Nghĩa Tiếng Việt:
                </span>
                <p className="font-bold text-foreground">
                  {dictionaryData.vietnameseMeaning}
                </p>
              </div>
            )}

            {/* English Meanings & Definitions */}
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {dictionaryData.meanings.map((meaning, idx) => (
                <div key={idx} className="space-y-1.5">
                  <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-secondary border border-border text-foreground">
                    {meaning.partOfSpeech}
                  </span>
                  <ul className="space-y-1.5 pl-2">
                    {meaning.definitions.slice(0, 2).map((def, dIdx) => (
                      <li key={dIdx} className="text-muted-foreground leading-relaxed">
                        • <strong className="text-foreground">{def.definition}</strong>
                        {def.example && (
                          <span className="block text-[11px] text-muted-foreground/80 italic mt-0.5">
                            "{def.example}"
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Original Surrounding Sentence from Passage */}
            {surroundingSentence && (
              <div className="p-3.5 rounded-2xl bg-indigo-500/[0.04] border border-indigo-500/20 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Ngữ Cảnh Gốc Trong Bài Đọc:
                </span>
                <p className="italic text-foreground/90 font-medium leading-relaxed">
                  "{surroundingSentence}"
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-muted-foreground">
            Không tìm thấy thông tin từ vựng này trong từ điển.
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-border text-muted-foreground hover:text-foreground text-xs font-semibold transition-colors"
          >
            Đóng
          </button>

          {dictionaryData && (
            <button
              type="button"
              onClick={handleSaveToFSRS}
              disabled={isSaved}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer",
                isSaved
                  ? "bg-emerald-600 text-white"
                  : "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/30 hover:scale-105"
              )}
            >
              {isSaved ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Đã lưu vào Sổ FSRS</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span>Lưu từ kèm ngữ cảnh vào FSRS</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
