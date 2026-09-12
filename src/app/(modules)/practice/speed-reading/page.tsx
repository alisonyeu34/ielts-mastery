"use client";

import React from "react";
import Link from "next/link";
import { useSpeedReadingSession } from "@/hooks/useSpeedReadingSession";
import { MOCK_SPEED_READING_PASSAGES } from "@/data/mockSpeedReadingData";
import { WPMControlBar } from "@/components/practice/speed-reading/WPMControlBar";
import { SaccadesPacerCanvas } from "@/components/practice/speed-reading/SaccadesPacerCanvas";
import { ScanningTargetRadar } from "@/components/practice/speed-reading/ScanningTargetRadar";
import { ParaphraseBezierLinker } from "@/components/practice/speed-reading/ParaphraseBezierLinker";
import { SpeedReadingQuizModal } from "@/components/practice/speed-reading/SpeedReadingQuizModal";
import { SpeedReadingStatsModal } from "@/components/practice/speed-reading/SpeedReadingStatsModal";
import {
  ChevronRight,
  Home,
  BookOpen,
  Zap,
  RotateCcw,
  Sparkles,
  Award,
} from "lucide-react";

export default function SpeedReadingStudioPage() {
  const {
    selectedPassage,
    setSelectedPassage,
    mode,
    setMode,
    wpm,
    setWpm,
    chunks,
    paragraphs,
    // Pacer
    isPacingActive,
    currentChunkIndex,
    togglePacing,
    resetPacing,
    // Skim
    isSkimmingActive,
    skimSecondsRemaining,
    startSkimming,
    stopSkimming,
    // Scan Radar
    activeScanTargetIndex,
    setActiveScanTargetIndex,
    scanStopwatchMs,
    isScanRunning,
    scanResultFeedback,
    startScanningTarget,
    handleScanChunkClick,
    // Paraphrase
    selectedQuestionPhraseId,
    selectedPassagePhraseId,
    matchedPairs,
    activeParaphraseModalPair,
    setActiveParaphraseModalPair,
    paraphraseErrorShake,
    handleSelectQuestionPhrase,
    handleSelectPassagePhrase,
    addParaphraseToVocabMatrix,
    // Quiz & Stats
    isQuizModalOpen,
    setIsQuizModalOpen,
    isStatsModalOpen,
    setIsStatsModalOpen,
    quizScore,
    comprehensionRate,
    submitComprehensionQuiz,
    effectiveWpm,
    bandRating,
  } = useSpeedReadingSession();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-slate-200 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link
            href="/practice"
            className="hover:text-slate-200 transition-colors"
          >
            Practice Modules
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400 font-semibold">
            Speed-Reading & Paraphrase Matrix (Step 71)
          </span>
        </div>

        {/* Page Title & Passage Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-500/20 to-cyan-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>STEP 71/100: Academic Speed-Reading & 2-Way Paraphrase Engine</span>
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                Phase 2 & 3 (5.5 &rarr; 7.5+)
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-100 tracking-tight">
              Xưởng Đọc Tốc Độ Học Thuật & Ma Trận Paraphrase 2 Chiều
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Bẻ gãy triệt để thói quen đọc thầm từng chữ (Sub-vocalization Trap) bằng con trỏ ánh sáng quét nhịp mắt Fixation Saccades từ 220 &rarr; 380 WPM, kết hợp lập bản đồ cấu trúc 90s và định vị từ khóa tức thì.
            </p>
          </div>

          {/* Passage Select Dropdown */}
          <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 self-start lg:self-auto">
            <BookOpen className="w-4 h-4 text-amber-400 ml-2" />
            <select
              value={selectedPassage.id}
              onChange={(e) => {
                const p = MOCK_SPEED_READING_PASSAGES.find((item) => item.id === e.target.value);
                if (p) setSelectedPassage(p);
              }}
              className="bg-transparent text-xs font-bold text-slate-200 focus:outline-none cursor-pointer pr-2"
            >
              {MOCK_SPEED_READING_PASSAGES.map((p) => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-slate-200">
                  {p.title} ({p.wordCount} words)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 1. Master Pacing & Mode Bar */}
        <WPMControlBar
          mode={mode}
          setMode={setMode}
          wpm={wpm}
          setWpm={setWpm}
          isPacingActive={isPacingActive}
          togglePacing={togglePacing}
          resetPacing={resetPacing}
          isSkimmingActive={isSkimmingActive}
          skimSecondsRemaining={skimSecondsRemaining}
          startSkimming={startSkimming}
          stopSkimming={stopSkimming}
          onOpenQuiz={() => setIsQuizModalOpen(true)}
        />

        {/* 2. Mode Contextual Addons */}
        {mode === "scan" && (
          <ScanningTargetRadar
            targets={selectedPassage.scanningTargets}
            activeTargetIndex={activeScanTargetIndex}
            setActiveTargetIndex={setActiveScanTargetIndex}
            scanStopwatchMs={scanStopwatchMs}
            isScanRunning={isScanRunning}
            scanResultFeedback={scanResultFeedback}
            onStartTarget={startScanningTarget}
          />
        )}

        {mode === "paraphrase" && (
          <ParaphraseBezierLinker
            paraphrasePairs={selectedPassage.paraphrasePairs}
            selectedQuestionPhraseId={selectedQuestionPhraseId}
            selectedPassagePhraseId={selectedPassagePhraseId}
            matchedPairs={matchedPairs}
            activeModalPair={activeParaphraseModalPair}
            setActiveModalPair={setActiveParaphraseModalPair}
            paraphraseErrorShake={paraphraseErrorShake}
            onSelectQuestionPhrase={handleSelectQuestionPhrase}
            onSelectPassagePhrase={handleSelectPassagePhrase}
            onAddToVocabMatrix={addParaphraseToVocabMatrix}
          />
        )}

        {/* 3. Main Saccades Pacer Canvas */}
        <SaccadesPacerCanvas
          mode={mode}
          passage={selectedPassage}
          paragraphs={paragraphs}
          chunks={chunks}
          currentChunkIndex={currentChunkIndex}
          isPacingActive={isPacingActive}
          isSkimmingActive={isSkimmingActive}
          onScanChunkClick={handleScanChunkClick}
          selectedPassagePhraseId={selectedPassagePhraseId}
          onSelectPassagePhrase={handleSelectPassagePhrase}
        />

        {/* 4. Comprehension Quiz Modal */}
        <SpeedReadingQuizModal
          isOpen={isQuizModalOpen}
          onClose={() => setIsQuizModalOpen(false)}
          questions={selectedPassage.comprehensionQuestions}
          onSubmitQuiz={submitComprehensionQuiz}
          currentWpm={wpm}
        />

        {/* 5. Telemetry & Stats Summary Modal */}
        <SpeedReadingStatsModal
          isOpen={isStatsModalOpen}
          onClose={() => setIsStatsModalOpen(false)}
          rawWpm={wpm}
          effectiveWpm={effectiveWpm}
          comprehensionRate={comprehensionRate}
          quizScore={quizScore}
          totalQuestions={selectedPassage.comprehensionQuestions.length}
          bandRating={bandRating}
          matchedParaphrasesCount={matchedPairs.length}
          onRetry={() => {
            setIsStatsModalOpen(false);
            resetPacing();
          }}
        />
      </div>
    </div>
  );
}
