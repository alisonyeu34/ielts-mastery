"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowLeft,
  Clock,
  Sparkles,
  Layers,
  Compass,
  GitBranch,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { usePassage3Session } from "@/hooks/usePassage3Session";
import { Passage3SplitLayout } from "@/components/practice/reading-passage3/Passage3SplitLayout";
import { AbstractPassagePane } from "@/components/practice/reading-passage3/AbstractPassagePane";
import { Passage3QuestionsPane } from "@/components/practice/reading-passage3/Passage3QuestionsPane";
import { SentenceDenestingModal } from "@/components/practice/reading-passage3/SentenceDenestingModal";
import { AuthorStanceSpectrumCard } from "@/components/practice/reading-passage3/AuthorStanceSpectrumCard";
import { ConceptualThreadVisualizer } from "@/components/practice/reading-passage3/ConceptualThreadVisualizer";
import { Passage3DiagnosticModal } from "@/components/practice/reading-passage3/Passage3DiagnosticModal";
import { cn } from "@/lib/utils";

export default function ReadingPassage3Page() {
  const {
    data,
    answers,
    activeDenestingSentence,
    eliminatedOptions,
    isSubmitted,
    selectedParagraphLetter,
    showDiagnosticModal,
    showStanceDrawer,
    showVocabModal,
    elapsedSeconds,
    scoreResult,
    setAnswer,
    toggleEliminateOption,
    openDenesting,
    closeDenesting,
    setSelectedParagraphLetter,
    submitPassage3,
    saveAbstractVocabToFSRS,
    resetSession,
    setShowDiagnosticModal,
    setShowStanceDrawer,
    setShowVocabModal,
  } = usePassage3Session();

  const [showThreadVisualizer, setShowThreadVisualizer] = useState<boolean>(true);
  const [showStanceCard, setShowStanceCard] = useState<boolean>(true);

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  const scrollToParagraph = (letter: string) => {
    setSelectedParagraphLetter(letter);
    const el = document.getElementById(`para-${letter}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            <BookOpen className="h-4 w-4" /> Giai Đoạn 3 (6.5 ➔ 7.5+) • Academic Reading Passage 3 Studio
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Giải Mã Văn Bản Trừu Tượng & Lập Trường Tác Giả
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Bóc tách câu phức lồng tầng (De-nesting) • Quang phổ lập trường tác giả (Author Stance) • 14 câu hỏi Cambridge C1/C2.
          </p>
        </div>

        {/* Right Tools & Timer */}
        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
          {/* Timer Display */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card font-mono text-xs text-foreground shadow-2xs">
            <Clock className="h-3.5 w-3.5 text-primary" />
            <span>
              {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowThreadVisualizer((prev) => !prev)}
            className={cn(
              "px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5",
              showThreadVisualizer
                ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400"
                : "border-border bg-card text-muted-foreground hover:bg-secondary"
            )}
          >
            <GitBranch className="h-3.5 w-3.5" />
            <span>Mạch Ý Niệm</span>
          </button>

          <button
            type="button"
            onClick={() => setShowStanceCard((prev) => !prev)}
            className={cn(
              "px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5",
              showStanceCard
                ? "bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400"
                : "border-border bg-card text-muted-foreground hover:bg-secondary"
            )}
          >
            <Compass className="h-3.5 w-3.5" />
            <span>Quang Phổ Lập Trường</span>
          </button>

          <Link
            href="/practice"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-xl border border-border bg-card shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Về phòng luyện tập
          </Link>
        </div>
      </div>

      {/* Main Dual-Column Split Layout */}
      <Passage3SplitLayout
        leftPane={
          <AbstractPassagePane
            data={data}
            selectedParagraph={selectedParagraphLetter}
            onOpenDenesting={openDenesting}
            onSaveVocab={saveAbstractVocabToFSRS}
          />
        }
        rightPane={
          <div className="space-y-6">
            {/* Conceptual Thread Visualizer */}
            {showThreadVisualizer && (
              <ConceptualThreadVisualizer
                threads={data.conceptualThread}
                selectedParagraph={selectedParagraphLetter}
                onSelectParagraph={scrollToParagraph}
              />
            )}

            {/* Author Stance Spectrum Card */}
            {showStanceCard && (
              <AuthorStanceSpectrumCard
                currentStance={data.authorOverallStance.level}
                titleVi={data.authorOverallStance.titleVi}
                descriptionVi={data.authorOverallStance.descriptionVi}
                evidenceQuotes={data.authorOverallStance.evidenceQuotes}
              />
            )}

            {/* Questions Pane (Q27 - Q40) */}
            <Passage3QuestionsPane
              data={data}
              answers={answers}
              eliminatedOptions={eliminatedOptions}
              isSubmitted={isSubmitted}
              scoreResult={scoreResult}
              onSetAnswer={setAnswer}
              onToggleEliminateOption={toggleEliminateOption}
              onSubmit={submitPassage3}
              onHighlightParagraph={scrollToParagraph}
            />
          </div>
        }
      />

      {/* Sentence De-nesting Modal */}
      <SentenceDenestingModal
        sentence={activeDenestingSentence}
        onClose={closeDenesting}
      />

      {/* Diagnostic Results Summary Modal */}
      <Passage3DiagnosticModal
        isOpen={showDiagnosticModal}
        scoreResult={scoreResult}
        timeSpentSeconds={elapsedSeconds}
        onRestart={resetSession}
        onClose={() => setShowDiagnosticModal(false)}
      />
    </div>
  );
}
