"use client";

import React from "react";
import Link from "next/link";
import { useCognitiveReadingSession } from "@/hooks/useCognitiveReadingSession";
import { MOCK_COGNITIVE_PASSAGES } from "@/data/mockCognitivePassagesData";
import { CognitiveFlowController } from "@/components/practice/cognitive-reading/CognitiveFlowController";
import { VanishingTextCanvas } from "@/components/practice/cognitive-reading/VanishingTextCanvas";
import { MultiWordRSVPViewer } from "@/components/practice/cognitive-reading/MultiWordRSVPViewer";
import { EffectiveReadingRateGauge } from "@/components/practice/cognitive-reading/EffectiveReadingRateGauge";
import { RetentionCheckpointCard } from "@/components/practice/cognitive-reading/RetentionCheckpointCard";
import { CognitiveReadingSummaryModal } from "@/components/practice/cognitive-reading/CognitiveReadingSummaryModal";
import {
  ChevronRight,
  Home,
  Brain,
  EyeOff,
  BookOpen,
  Sparkles,
} from "lucide-react";

export default function CognitiveReadingStudioPage() {
  const {
    selectedPassage,
    setSelectedPassage,
    mode,
    setMode,
    wpm,
    setWpm,
    vanishingWords,
    activeWordGlobalIndex,
    fadedWordIndices,
    isReadingActive,
    toggleReading,
    resetReading,
    rsvpChunks,
    activeRSVPIndex,
    isRSVPActive,
    toggleRSVP,
    resetRSVP,
    activeCheckpoint,
    isCheckpointModalOpen,
    checkpointSecondsLeft,
    submitCheckpointAnswer,
    errEvaluation,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    saveFinalEvaluationLog,
  } = useCognitiveReadingSession();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
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
            Cognitive Subvocalization & Anti-Regression Engine (Step 76)
          </span>
        </div>

        {/* Page Title & Passage Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-amber-400" />
                <span>STEP 76/100: Cognitive Subvocalization & Anti-Regression Reading Engine</span>
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                Phase 3 (6.5 &rarr; 7.5+)
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-100 tracking-tight">
              Bộ Đo Nhận Thức Triệt Tiêu Đọc Dịch Thầm & Nhảy Giật Lùi Mắt (Passage 3)
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Xóa bỏ 2 rào cản sinh lý kìm hãm tốc độ đọc: Đọc thầm bằng thanh quản và đảo mắt lùi về câu cũ qua Chế độ Văn Bản Biến Mất (Vanishing Text) và Nén Thị Giác RSVP Đa Từ.
            </p>
          </div>

          {/* Passage Selector */}
          <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 self-start lg:self-auto">
            <BookOpen className="w-4 h-4 text-amber-400 ml-1.5" />
            <select
              value={selectedPassage.id}
              onChange={(e) => {
                const p = MOCK_COGNITIVE_PASSAGES.find((item) => item.id === e.target.value);
                if (p) setSelectedPassage(p);
              }}
              className="bg-transparent text-xs font-bold text-slate-200 focus:outline-none cursor-pointer pr-2"
            >
              {MOCK_COGNITIVE_PASSAGES.map((p) => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-slate-200">
                  {p.title} ({p.wordCount} words)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 1. Cognitive Flow Controller */}
        <CognitiveFlowController
          mode={mode}
          setMode={setMode}
          wpm={wpm}
          setWpm={setWpm}
          isReadingActive={mode === "vanishing" ? isReadingActive : isRSVPActive}
          onToggleReading={mode === "vanishing" ? toggleReading : toggleRSVP}
          onResetReading={mode === "vanishing" ? resetReading : resetRSVP}
          onOpenSummary={saveFinalEvaluationLog}
        />

        {/* 2. Effective Reading Rate (ERR) Real-time Gauge */}
        <EffectiveReadingRateGauge evaluation={errEvaluation} />

        {/* 3. Reading Surface (Vanishing Text or RSVP Viewer) */}
        {mode === "vanishing" ? (
          <VanishingTextCanvas
            passage={selectedPassage}
            words={vanishingWords}
            activeWordIndex={activeWordGlobalIndex}
            fadedWordIndices={fadedWordIndices}
            isReadingActive={isReadingActive}
            targetWpm={wpm}
          />
        ) : (
          <MultiWordRSVPViewer
            chunks={rsvpChunks}
            activeChunkIndex={activeRSVPIndex}
            isRSVPActive={isRSVPActive}
            targetWpm={wpm}
          />
        )}

        {/* 4. Instant 15s Retention Checkpoint Modal */}
        <RetentionCheckpointCard
          isOpen={isCheckpointModalOpen}
          checkpoint={activeCheckpoint}
          secondsLeft={checkpointSecondsLeft}
          onSubmitAnswer={submitCheckpointAnswer}
        />

        {/* 5. Summary Diagnostics Modal */}
        <CognitiveReadingSummaryModal
          isOpen={isSummaryModalOpen}
          onClose={() => setIsSummaryModalOpen(false)}
          evaluation={errEvaluation}
          onRetry={() => {
            setIsSummaryModalOpen(false);
            if (mode === "vanishing") resetReading();
            else resetRSVP();
          }}
        />
      </div>
    </div>
  );
}
