"use client";

import React, { useRef, useEffect } from "react";
import { VanishingWordItem } from "@/lib/antiSubvocalizationEngine";
import { CognitiveReadingPassage } from "@/data/mockCognitivePassagesData";
import { BookOpen, Sparkles, EyeOff } from "lucide-react";

interface VanishingTextCanvasProps {
  passage: CognitiveReadingPassage;
  words: VanishingWordItem[];
  activeWordIndex: number;
  fadedWordIndices: Set<number>;
  isReadingActive: boolean;
  targetWpm: number;
}

export const VanishingTextCanvas: React.FC<VanishingTextCanvasProps> = ({
  passage,
  words,
  activeWordIndex,
  fadedWordIndices,
  isReadingActive,
  targetWpm,
}) => {
  const activeWordRef = useRef<HTMLSpanElement | null>(null);

  // Auto-scroll to keep active word in focus
  useEffect(() => {
    if (isReadingActive && activeWordRef.current) {
      activeWordRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeWordIndex, isReadingActive]);

  // Group words back into paragraphs for structured visual presentation
  const wordsByParagraph: VanishingWordItem[][] = [];
  words.forEach((w) => {
    if (!wordsByParagraph[w.paragraphIndex]) {
      wordsByParagraph[w.paragraphIndex] = [];
    }
    wordsByParagraph[w.paragraphIndex].push(w);
  });

  return (
    <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 shadow-2xl relative select-none">
      {/* Passage Header */}
      <div className="pb-4 mb-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
              Passage 3 Abstract Science
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {passage.academicDomain}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-100">
            {passage.title}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">{passage.subTitle}</p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-xs font-mono text-slate-400">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>{passage.wordCount} words</span>
          <span className="text-slate-600">|</span>
          <span className="text-amber-400 font-bold">{targetWpm} WPM</span>
        </div>
      </div>

      {/* Vanishing Reading Stream Surface */}
      <div className="space-y-6 text-base md:text-lg leading-relaxed font-serif text-slate-200 max-h-[550px] overflow-y-auto pr-3 custom-scrollbar">
        {wordsByParagraph.map((pWords, pIdx) => (
          <p
            key={`para_${pIdx}`}
            className="pl-4 border-l-2 border-slate-800 hover:border-amber-500/30 transition-colors"
          >
            {pWords.map((wordItem) => {
              const isCurrent = isReadingActive && wordItem.globalIndex === activeWordIndex;
              const isFaded = isReadingActive && fadedWordIndices.has(wordItem.globalIndex);

              return (
                <span
                  key={wordItem.id}
                  ref={isCurrent ? activeWordRef : null}
                  className={`inline-block mx-1 transition-all duration-300 ${
                    isCurrent
                      ? "bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-black shadow-lg shadow-amber-400/30 scale-105 z-10"
                      : isFaded
                      ? "opacity-0 invisible filter blur-sm scale-95"
                      : "text-slate-200"
                  }`}
                >
                  {wordItem.word}
                </span>
              );
            })}
          </p>
        ))}
      </div>

      {/* Anti-regression guidance badge */}
      {isReadingActive && (
        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between text-xs text-amber-300">
          <div className="flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>
              Chế độ Khử Nhảy Mắt: Các từ đã đọc qua sẽ tự động biến mất. Hãy giữ mắt nhìn về phía trước và tiếp thu toàn cụm!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
