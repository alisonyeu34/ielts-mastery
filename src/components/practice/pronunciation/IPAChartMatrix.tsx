"use client";

import React from "react";
import {
  Volume2,
  Sparkles,
  Layers,
  CheckCircle2,
} from "lucide-react";
import {
  IPAPhonemeData,
  IPACategory,
  IPA_44_PHONEMES,
} from "@/data/mockIPA44Data";

interface IPAChartMatrixProps {
  phonemes: IPAPhonemeData[];
  selectedPhoneme: IPAPhonemeData;
  onSelectPhoneme: (phoneme: IPAPhonemeData) => void;
  selectedCategory: IPACategory | "all";
  onSelectCategory: (category: IPACategory | "all") => void;
}

export function IPAChartMatrix({
  phonemes,
  selectedPhoneme,
  onSelectPhoneme,
  selectedCategory,
  onSelectCategory,
}: IPAChartMatrixProps) {
  const categoryFilters: Array<{ id: IPACategory | "all"; label: string }> = [
    { id: "all", label: "Tất Cả (44 Âm)" },
    { id: "long_vowel", label: "Nguyên Âm Dài (5)" },
    { id: "short_vowel", label: "Nguyên Âm Ngắn (7)" },
    { id: "diphthong", label: "Nguyên Âm Đôi (8)" },
    { id: "voiceless_consonant", label: "Phụ Âm Vô Thanh (8)" },
    { id: "voiced_consonant", label: "Phụ Âm Hữu Thanh (8)" },
    { id: "other_consonant", label: "Phụ Âm Mũi/Cạnh (8)" },
  ];

  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5">
      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categoryFilters.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectCategory(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === tab.id
                ? "bg-primary text-primary-foreground shadow-xs font-black scale-[1.02]"
                : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 44 Phonemes Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5">
        {phonemes.map((p) => {
          const isSelected = selectedPhoneme.id === p.id;
          const firstExample = p.exampleWords[0]?.word || "";

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelectPhoneme(p)}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-between text-center transition-all duration-200 cursor-pointer group min-h-[82px] ${
                isSelected
                  ? "border-primary ring-2 ring-primary/30 bg-primary/10 shadow-md scale-105"
                  : "border-border/80 bg-card hover:bg-secondary/50 hover:border-primary/40 hover:scale-102"
              }`}
            >
              <div className="flex items-center justify-between w-full text-[9px] font-mono text-muted-foreground opacity-60">
                <span>{p.category.slice(0, 3).toUpperCase()}</span>
                <Volume2 className="h-3 w-3 group-hover:text-primary transition-colors" />
              </div>

              {/* Main IPA Symbol */}
              <span className="text-xl sm:text-2xl font-serif font-bold text-foreground py-0.5 tracking-wide">
                /{p.symbol}/
              </span>

              {/* Example Word */}
              <span className="text-[10px] font-mono text-muted-foreground truncate w-full group-hover:text-foreground font-medium">
                {firstExample}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/60 text-[11px] font-mono text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600" /> Nguyên âm dài
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-sky-500" /> Nguyên âm ngắn
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-purple-600" /> Nguyên âm đôi
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Vô thanh
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-orange-600" /> Hữu thanh
          </span>
        </div>

        <span>💡 Nhấn vào ô để phát âm & xem mặt cắt giải phẫu</span>
      </div>
    </div>
  );
}
