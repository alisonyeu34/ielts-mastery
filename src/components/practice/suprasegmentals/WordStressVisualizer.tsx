"use client";

import React from "react";
import {
  Volume2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Layers,
} from "lucide-react";
import { WordStressRuleItem } from "@/data/mockSuprasegmentalData";
import { playNativeAudio } from "@/lib/phoneticAcousticAnalyzer";

interface WordStressVisualizerProps {
  items: WordStressRuleItem[];
  selectedItem: WordStressRuleItem;
  onSelectItem: (item: WordStressRuleItem) => void;
  isPairedToggled: boolean;
  onTogglePaired: () => void;
}

export function WordStressVisualizer({
  items,
  selectedItem,
  onSelectItem,
  isPairedToggled,
  onTogglePaired,
}: WordStressVisualizerProps) {
  const activeWord = isPairedToggled && selectedItem.pairedWord
    ? selectedItem.pairedWord.word
    : selectedItem.word;

  const activeIpa = isPairedToggled && selectedItem.pairedWord
    ? selectedItem.pairedWord.ipa
    : selectedItem.ipaFull;

  const activeMeaning = isPairedToggled && selectedItem.pairedWord
    ? selectedItem.pairedWord.meaning
    : selectedItem.meaning;

  const activePartOfSpeech = isPairedToggled && selectedItem.pairedWord
    ? selectedItem.pairedWord.partOfSpeech
    : selectedItem.partOfSpeech;

  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
              {selectedItem.ruleNameVi}
            </span>
          </div>
          <h3 className="text-base font-black text-foreground">
            Visualizer Trọng Âm Từ Bằng Bong Bóng Âm Tiết
          </h3>
        </div>

        {/* Rule Selector Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
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
              {item.word}
            </button>
          ))}
        </div>
      </div>

      {/* Syllable Bubbles Visualizer Canvas */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-secondary/30 via-card to-secondary/20 border border-border text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <span className="text-xs font-mono text-muted-foreground uppercase">
            Loại từ: <strong className="text-primary">{activePartOfSpeech}</strong>
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            • Ý nghĩa: <strong className="text-foreground">{activeMeaning}</strong>
          </span>
        </div>

        {/* Dynamic Syllable Bubbles */}
        <div className="flex items-center justify-center gap-4 py-2 flex-wrap">
          {selectedItem.syllables.map((syl, idx) => {
            const isPrimary = !isPairedToggled
              ? syl.stressLevel === "primary"
              : selectedItem.pairedWord?.stressOnSyllableIndex === idx;

            const isSecondary = syl.stressLevel === "secondary";

            return (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center transition-all duration-300 ${
                  isPrimary
                    ? "h-24 w-24 sm:h-28 sm:w-28 rounded-3xl bg-primary text-primary-foreground shadow-xl shadow-primary/30 ring-4 ring-primary/20 scale-110"
                    : isSecondary
                    ? "h-18 w-18 sm:h-20 sm:w-20 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border-2 border-amber-500/40"
                    : "h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-secondary/70 text-muted-foreground border border-border opacity-70"
                }`}
              >
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  {isPrimary ? "Trọng Âm 1" : isSecondary ? "Trọng Âm 2" : "Không Nhấn"}
                </span>
                <span className="text-base sm:text-lg font-black font-serif">
                  {syl.text}
                </span>
                <span className="text-[10px] font-mono opacity-80">/{syl.ipa}/</span>
              </div>
            );
          })}
        </div>

        {/* Full IPA & Audio Action */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <span className="font-mono font-bold text-lg text-foreground px-4 py-1.5 rounded-2xl bg-card border border-border shadow-xs">
            {activeIpa}
          </span>

          <button
            type="button"
            onClick={() => playNativeAudio(activeWord)}
            className="px-5 py-2 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs flex items-center gap-2 shadow-md transition-transform hover:scale-105 cursor-pointer"
          >
            <Volume2 className="h-4 w-4" />
            <span>Nghe Phát Âm</span>
          </button>
        </div>

        {/* Noun vs Verb Shift Toggle if paired */}
        {selectedItem.pairedWord && (
          <div className="pt-2">
            <button
              type="button"
              onClick={onTogglePaired}
              className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-xs font-bold text-foreground flex items-center gap-2 mx-auto transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5 text-primary" />
              <span>
                Chuyển Sang Dạng Đối Nghịch: {selectedItem.pairedWord.word} ({selectedItem.pairedWord.partOfSpeech})
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Pedagogical Explanation Box */}
      <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 text-xs space-y-1">
        <span className="font-bold text-primary text-[10px] font-mono uppercase">
          Quy Tắc Trọng Âm Cốt Lõi:
        </span>
        <p className="text-muted-foreground leading-relaxed">
          {selectedItem.explanation}
        </p>
      </div>
    </div>
  );
}
