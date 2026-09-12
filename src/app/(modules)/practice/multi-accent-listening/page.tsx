"use client";

import React from "react";
import Link from "next/link";
import { useMultiAccentSession } from "@/hooks/useMultiAccentSession";
import { MOCK_MULTI_ACCENT_SCENARIOS } from "@/data/mockMultiAccentAudioData";
import { AccentSwitcherBar } from "@/components/practice/multi-accent/AccentSwitcherBar";
import { AccentPhoneticGuideCard } from "@/components/practice/multi-accent/AccentPhoneticGuideCard";
import { MultiAccentPlayerControls } from "@/components/practice/multi-accent/MultiAccentPlayerControls";
import { AudioMicroLooper } from "@/components/practice/multi-accent/AudioMicroLooper";
import { DistractorForensicSlicer } from "@/components/practice/multi-accent/DistractorForensicSlicer";
import { MultiAccentSummaryModal } from "@/components/practice/multi-accent/MultiAccentSummaryModal";
import {
  ChevronRight,
  Home,
  Ear,
  Headphones,
  Radio,
  Layers,
} from "lucide-react";

export default function MultiAccentListeningStudioPage() {
  const {
    selectedScenario,
    setSelectedScenario,
    currentAccent,
    switchAccent,
    playbackSpeed,
    setPlaybackSpeed,
    isPlaying,
    isLooping,
    playFullAudio,
    startMicroLoop,
    stopAudio,
    loopStartSec,
    loopEndSec,
    updateLoopPoints,
    currentPlayheadSec,
    waveformPeaks,
    activeTrapIndex,
    setActiveTrapIndex,
    activeTrap,
    userSelectedOption,
    isAnswerSubmitted,
    isAnswerCorrect,
    submitTrapAnswer,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    drillAttemptCount,
    drillSuccessCount,
  } = useMultiAccentSession();

  const dialectNote = selectedScenario.accentDialectNotes[currentAccent];

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
          <span className="text-cyan-400 font-semibold">
            Multi-Accent Acoustic & Micro-Looper Studio (Step 72)
          </span>
        </div>

        {/* Page Title & Scenario Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5 text-cyan-400" />
                <span>STEP 72/100: Multi-Accent Acoustic Studio & Micro-Looper Forensic Slicer</span>
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                Phase 2 & 3 (5.5 &rarr; 7.5+)
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-100 tracking-tight">
              Phòng Luyện Thính Giác Đa Ngữ Điệu & Mổ Xẻ Bẫy m Thanh Vi Mô
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Khắc chế sự sai lệch âm vị và bẫy đổi ý trong đề thi Cambridge với ma trận 4 giọng thi chuẩn (RP British, Australian, North American, Scottish), bộ lặp A-B vô tận không đổi pitch và giải phẫu 3 lớp ngữ âm.
            </p>
          </div>

          {/* Scenario Select Dropdown */}
          <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 self-start lg:self-auto">
            <Radio className="w-4 h-4 text-cyan-400 ml-2" />
            <select
              value={selectedScenario.id}
              onChange={(e) => {
                const s = MOCK_MULTI_ACCENT_SCENARIOS.find((item) => item.id === e.target.value);
                if (s) {
                  setSelectedScenario(s);
                  setActiveTrapIndex(0);
                }
              }}
              className="bg-transparent text-xs font-bold text-slate-200 focus:outline-none cursor-pointer pr-2"
            >
              {MOCK_MULTI_ACCENT_SCENARIOS.map((s) => (
                <option key={s.id} value={s.id} className="bg-slate-900 text-slate-200">
                  [{s.section}] {s.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 1. Accent 4-Flag Switcher */}
        <AccentSwitcherBar
          currentAccent={currentAccent}
          onSwitchAccent={switchAccent}
          isPlaying={isPlaying}
        />

        {/* 2. Phonetic Guide Card for Selected Accent */}
        {dialectNote && (
          <AccentPhoneticGuideCard
            currentAccent={currentAccent}
            dialectNote={dialectNote}
          />
        )}

        {/* 3. Audio Master Player Controls */}
        <MultiAccentPlayerControls
          isPlaying={isPlaying}
          isLooping={isLooping}
          playbackSpeed={playbackSpeed}
          setPlaybackSpeed={setPlaybackSpeed}
          onPlayFull={playFullAudio}
          onStartLoop={startMicroLoop}
          onStop={stopAudio}
          currentPlayheadSec={currentPlayheadSec}
          totalDurationSec={selectedScenario.durationSec}
        />

        {/* 4. Canvas Waveform Micro-Looper */}
        <AudioMicroLooper
          waveformPeaks={waveformPeaks}
          loopStartSec={loopStartSec}
          loopEndSec={loopEndSec}
          onUpdateLoopPoints={updateLoopPoints}
          currentPlayheadSec={currentPlayheadSec}
          totalDurationSec={selectedScenario.durationSec}
          isLooping={isLooping}
          onToggleLoop={startMicroLoop}
          traps={selectedScenario.forensicTraps}
          activeTrapIndex={activeTrapIndex}
          onSelectTrap={(idx) => setActiveTrapIndex(idx)}
        />

        {/* 5. 3-Layer Distractor Forensic Slicer & Trap Drill */}
        {activeTrap && (
          <DistractorForensicSlicer
            trap={activeTrap}
            currentAccent={currentAccent}
            userSelectedOption={userSelectedOption}
            isAnswerSubmitted={isAnswerSubmitted}
            isAnswerCorrect={isAnswerCorrect}
            onSubmitAnswer={submitTrapAnswer}
            onOpenSummary={() => setIsSummaryModalOpen(true)}
          />
        )}

        {/* 6. Summary Diagnostics Modal */}
        <MultiAccentSummaryModal
          isOpen={isSummaryModalOpen}
          onClose={() => setIsSummaryModalOpen(false)}
          currentAccent={currentAccent}
          drillAttemptCount={drillAttemptCount}
          drillSuccessCount={drillSuccessCount}
          onRetry={() => {
            setIsSummaryModalOpen(false);
            startMicroLoop();
          }}
        />
      </div>
    </div>
  );
}
