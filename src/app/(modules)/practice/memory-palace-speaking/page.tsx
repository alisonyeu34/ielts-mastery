"use client";

import React from "react";
import Link from "next/link";
import { useMemoryPalaceSession } from "@/hooks/useMemoryPalaceSession";
import { SixtySecondPalaceScratchpad } from "@/components/practice/memory-palace/SixtySecondPalaceScratchpad";
import { NarrativePacingChronometer } from "@/components/practice/memory-palace/NarrativePacingChronometer";
import { Part2AudioRecorderControls } from "@/components/practice/memory-palace/Part2AudioRecorderControls";
import { SensoryGridPalette } from "@/components/practice/memory-palace/SensoryGridPalette";
import { MemoryPalaceFormulaCard } from "@/components/practice/memory-palace/MemoryPalaceFormulaCard";
import { MemoryPalaceSummaryModal } from "@/components/practice/memory-palace/MemoryPalaceSummaryModal";

export default function MemoryPalaceSpeakingPage() {
  const {
    currentPrompt,
    allPrompts,
    selectedPromptId,
    handleSelectPrompt,
    phase,
    prepTimeRemaining,
    speakingTime,
    activeRoom,
    setActiveRoomManual,
    roomNotes,
    handleAddKeyword,
    handleRemoveKeyword,
    handleInsertSensoryWord,
    handleLoadSamplePlan,
    startPrepPhase,
    startSpeakingPhase,
    finishSpeaking,
    resetSession,
    isRecording,
    audioUrl,
    audioLevel,
    pacingAssessment,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isFormulaCardOpen,
    setIsFormulaCardOpen,
    isSensoryPaletteOpen,
    setIsSensoryPaletteOpen,
    isSaved,
    saveResultsToDatabase
  } = useMemoryPalaceSession();

  const handleNextPrompt = () => {
    const currentIndex = allPrompts.findIndex((p) => p.id === selectedPromptId);
    const nextIndex = (currentIndex + 1) % allPrompts.length;
    handleSelectPrompt(allPrompts[nextIndex].id);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Link
              href="/practice"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all text-xs font-semibold"
            >
              ← Trung Tâm Luyện Tập
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Step 89/100
                </span>
                <span className="text-xs text-slate-400">
                  Giai Đoạn 2 & 3 (5.5 ➔ 7.5+)
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
                Xưởng Lập Dàn Ý 60s & Lâu Đài Trí Nhớ Speaking Part 2
              </h1>
            </div>
          </div>

          {/* Cue Card Prompt Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 whitespace-nowrap hidden md:inline">
              Chọn Đề Cue Card:
            </span>
            <select
              value={selectedPromptId}
              onChange={(e) => handleSelectPrompt(e.target.value)}
              className="bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs font-semibold text-white cursor-pointer"
            >
              {allPrompts.map((p, idx) => (
                <option key={p.id} value={p.id}>
                  #{idx + 1} [{p.category}] - {p.topic.length > 45 ? p.topic.substring(0, 42) + "..." : p.topic}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Scratchpad: 4-Room Circuit & 60s Prep Countdown */}
        <SixtySecondPalaceScratchpad
          currentPrompt={currentPrompt}
          phase={phase}
          prepTimeRemaining={prepTimeRemaining}
          activeRoom={activeRoom}
          roomNotes={roomNotes}
          onAddKeyword={handleAddKeyword}
          onRemoveKeyword={handleRemoveKeyword}
          onSetActiveRoom={setActiveRoomManual}
          onOpenSensoryPalette={() => setIsSensoryPaletteOpen(true)}
          onOpenFormulaCard={() => setIsFormulaCardOpen(true)}
          onLoadSamplePlan={handleLoadSamplePlan}
          onStartPrep={startPrepPhase}
          onStartSpeaking={startSpeakingPhase}
        />

        {/* Narrative Pacing Chronometer (120s 4-Segment Track) */}
        <NarrativePacingChronometer
          speakingTime={speakingTime}
          isRecording={isRecording}
          phase={phase}
        />

        {/* Web Audio Recorder Controls & Model Monologue */}
        <Part2AudioRecorderControls
          currentPrompt={currentPrompt}
          phase={phase}
          speakingTime={speakingTime}
          isRecording={isRecording}
          audioUrl={audioUrl}
          audioLevel={audioLevel}
          onStartSpeaking={startSpeakingPhase}
          onFinishSpeaking={() => finishSpeaking()}
          onResetSession={resetSession}
        />

        {/* Pedagogical Principle Footer Card */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 text-xs text-slate-400 space-y-2">
          <h4 className="font-bold text-slate-200 flex items-center gap-2">
            <span>🏛️</span>
            <span>Bản Chất Tâm Lý Học Nhận Thức Lâu Đài Trí Nhớ 4 Gian Phòng:</span>
          </h4>
          <p className="leading-relaxed">
            Phương pháp Lâu Đài Trí Nhớ (Method of Loci) chuyển đổi việc ghi nhớ từ vựng trừu tượng thành việc đi dạo qua 4 không gian quen thuộc: <strong className="text-emerald-300">Phòng 1 (Bối cảnh quá khứ)</strong> ➔ <strong className="text-cyan-300">Phòng 2 (Lưới 5 giác quan)</strong> ➔ <strong className="text-amber-300">Phòng 3 (Khúc triết kịch tính)</strong> ➔ <strong className="text-violet-300">Phòng 4 (Chiêm nghiệm tương lai)</strong>. Nhờ đó, thí sinh không bao giờ rơi vào khoảng lặng ngắc ngứ (Dead Air) và tự tin duy trì độc thoại chuẩn mực 110s – 120s chạm ngưỡng Band 7.5 – 8.5+ Fluency & Coherence.
          </p>
        </div>

        {/* Modals & Drawers */}
        <SensoryGridPalette
          isOpen={isSensoryPaletteOpen}
          onClose={() => setIsSensoryPaletteOpen(false)}
          onInsertWord={handleInsertSensoryWord}
        />

        <MemoryPalaceFormulaCard
          isOpen={isFormulaCardOpen}
          onClose={() => setIsFormulaCardOpen(false)}
        />

        <MemoryPalaceSummaryModal
          isOpen={isSummaryModalOpen}
          onClose={() => setIsSummaryModalOpen(false)}
          assessment={pacingAssessment}
          currentPrompt={currentPrompt}
          isSaved={isSaved}
          onSaveToDatabase={saveResultsToDatabase}
          onRetry={resetSession}
          onNextPrompt={handleNextPrompt}
        />
      </div>
    </div>
  );
}
