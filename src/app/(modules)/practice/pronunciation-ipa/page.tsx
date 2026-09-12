"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import {
  Volume2,
  Sparkles,
  Zap,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
  Headphones,
  Award,
} from "lucide-react";
import { useIPAInteractiveSession } from "@/hooks/useIPAInteractiveSession";
import { IPAChartMatrix } from "@/components/practice/pronunciation/IPAChartMatrix";
import { VocalTractSagittalSVG } from "@/components/practice/pronunciation/VocalTractSagittalSVG";
import { IPAAnatomyDrawer } from "@/components/practice/pronunciation/IPAAnatomyDrawer";
import { MinimalPairsArena } from "@/components/practice/pronunciation/MinimalPairsArena";
import { PhoneticAudioComparison } from "@/components/practice/pronunciation/PhoneticAudioComparison";
import { IPAMasterySummaryModal } from "@/components/practice/pronunciation/IPAMasterySummaryModal";

function IPAStudioContent() {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedPhoneme,
    filteredPhonemes,
    isAirflowAnimating,
    playSound,
    handleSelectPhoneme,
    // Arena
    isArenaActive,
    arenaQuestions,
    currentQuestionIndex,
    selectedOption,
    isQuestionAnswered,
    arenaScore,
    arenaStreak,
    arenaErrors,
    isArenaFinished,
    startMinimalPairsArena,
    handleAnswerQuestion,
    handleNextQuestion,
    closeArena,
  } = useIPAInteractiveSession();

  return (
    <div className="space-y-8 pb-24 max-w-6xl mx-auto select-none">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
            <Volume2 className="h-4 w-4" /> Giai Đoạn 1 • Xưởng Giải Phẫu Khẩu Hình 44 Âm IPA
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Bản Đồ 44 Âm IPA & Đấu Trường Cặp Âm Tối Thiểu
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Mặt cắt thanh âm sinh học SVG động • Huấn luyện vị trí lưỡi, môi & dây thanh quản • Triệt tiêu bẫy nghe nhầm âm.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={startMinimalPairsArena}
            className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-rose-600/20 transition-transform hover:scale-105 cursor-pointer"
          >
            <Zap className="h-4 w-4 fill-white" />
            <span>Đấu Trường Cặp Âm (10 Câu)</span>
          </button>

          <Link
            href="/practice/suprasegmentals"
            className="px-4 py-2.5 rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs border border-border transition-colors flex items-center gap-1.5"
          >
            <span>Luyện Trọng Âm & Nối Âm</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Main 44 IPA Soundboard Matrix */}
      <IPAChartMatrix
        phonemes={filteredPhonemes}
        selectedPhoneme={selectedPhoneme}
        onSelectPhoneme={handleSelectPhoneme}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 3. Anatomical Sagittal Canvas & Instruction Drawer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Sagittal Vocal Tract SVG (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <VocalTractSagittalSVG
            phoneme={selectedPhoneme}
            isAirflowAnimating={isAirflowAnimating}
          />
        </div>

        {/* Right: Anatomical Instructions & Example Words (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <IPAAnatomyDrawer
            phoneme={selectedPhoneme}
            onPlaySound={playSound}
          />
        </div>
      </div>

      {/* 4. Acoustic Waveform Voice Comparison */}
      <PhoneticAudioComparison phoneme={selectedPhoneme} />

      {/* 5. Minimal Pairs Arena Active Mode Overlay */}
      {isArenaActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-lg animate-in fade-in duration-200">
          <div className="w-full max-w-2xl">
            <MinimalPairsArena
              questions={arenaQuestions}
              currentIndex={currentQuestionIndex}
              selectedOption={selectedOption}
              isAnswered={isQuestionAnswered}
              score={arenaScore}
              streak={arenaStreak}
              onAnswer={handleAnswerQuestion}
              onNext={handleNextQuestion}
              onClose={closeArena}
            />
          </div>
        </div>
      )}

      {/* 6. Arena Summary Modal */}
      <IPAMasterySummaryModal
        isOpen={isArenaFinished}
        score={arenaScore}
        errors={arenaErrors}
        onRestart={startMinimalPairsArena}
        onClose={closeArena}
      />
    </div>
  );
}

export default function IPAPronunciationPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-xs font-mono text-muted-foreground animate-pulse">
          Đang nạp Xưởng Giải Phẫu 44 Âm IPA...
        </div>
      }
    >
      <IPAStudioContent />
    </Suspense>
  );
}
