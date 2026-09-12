"use client";

import React from "react";
import { Search, Sparkles, BookOpen, Layers } from "lucide-react";
import {
  Passage3Data,
  ComplexSentence,
  StanceType,
  EvaluativeWord,
} from "@/data/mockPassage3Data";
import { StanceFilterMode } from "@/hooks/usePassage3Tracker";
import { cn } from "@/lib/utils";

interface ComplexPassagePaneProps {
  passageData: Passage3Data;
  activeFilter: StanceFilterMode;
  onOpenDeconstructor: (sentence: ComplexSentence) => void;
  className?: string;
}

export function ComplexPassagePane({
  passageData,
  activeFilter,
  onOpenDeconstructor,
  className,
}: ComplexPassagePaneProps) {
  // Helper to render paragraph with tone highlights & sentence deconstruct triggers
  const renderParagraphContent = (paraId: string, text: string) => {
    // Find complex sentences in this paragraph
    const complexSentences = passageData.complexSentences.filter(
      (cs) => cs.paragraphId === paraId
    );

    // Find evaluative words in this paragraph
    const evaluativeWords = passageData.evaluativeWords.filter(
      (ew) => ew.paragraphId === paraId
    );

    return (
      <div className="space-y-3">
        <p className="font-serif text-xs sm:text-sm text-foreground/90 leading-relaxed sm:leading-loose text-justify">
          {text}
        </p>

        {/* Complex Sentence Deconstruction Button if present */}
        {complexSentences.map((cs) => (
          <div
            key={cs.id}
            className="p-3 rounded-2xl bg-indigo-500/[0.04] border border-indigo-500/20 flex items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-2 truncate">
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                Câu phức 40+ từ
              </span>
              <span className="text-muted-foreground truncate font-serif italic">
                "{cs.fullText.slice(0, 50)}..."
              </span>
            </div>

            <button
              type="button"
              onClick={() => onOpenDeconstructor(cs)}
              className="shrink-0 px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-sm transition-all cursor-pointer"
            >
              <Search className="h-3 w-3" />
              <span>Mổ xẻ cú pháp</span>
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Title & Meta */}
      <div className="border-b border-border/80 pb-4 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            IELTS Academic Reading Passage 3
          </span>
          <span className="text-xs text-muted-foreground font-mono">
            {passageData.wordCount} words
          </span>
        </div>

        <h2 className="text-base sm:text-lg font-extrabold text-foreground leading-snug">
          {passageData.title}
        </h2>
        <p className="text-xs text-muted-foreground italic font-serif">
          {passageData.subtitle}
        </p>
      </div>

      {/* Paragraphs List */}
      <div className="space-y-6">
        {passageData.paragraphs.map((para) => (
          <div key={para.id} className="space-y-2">
            <span className="text-[11px] font-bold font-mono text-indigo-600 dark:text-indigo-400 bg-secondary/80 px-2.5 py-1 rounded-lg border border-border/70 inline-block">
              {para.label}
            </span>

            {renderParagraphContent(para.id, para.text)}
          </div>
        ))}
      </div>
    </div>
  );
}
