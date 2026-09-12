"use client";

import React from "react";
import Link from "next/link";
import {
  Mic,
  ArrowLeft,
  Sparkles,
  Clock,
  Compass,
  Layers,
  FileText,
  RotateCcw,
} from "lucide-react";
import {
  MOCK_PART1_DATA,
  MOCK_PART2_CUECARDS,
} from "@/data/mockSpeakingP1P2Data";
import { useSpeakingP1P2Session } from "@/hooks/useSpeakingP1P2Session";
import { SpeakingModeSwitcher } from "@/components/practice/speaking-p1-p2/SpeakingModeSwitcher";
import { TimelineExpansionCard } from "@/components/practice/speaking-p1-p2/TimelineExpansionCard";
import { CueCardPromptViewer } from "@/components/practice/speaking-p1-p2/CueCardPromptViewer";
import { OneMinutePrepTimer } from "@/components/practice/speaking-p1-p2/OneMinutePrepTimer";
import { SensoryMindPalaceBuilder } from "@/components/practice/speaking-p1-p2/SensoryMindPalaceBuilder";
import { TwoMinuteSpeechRecorder } from "@/components/practice/speaking-p1-p2/TwoMinuteSpeechRecorder";
import { SpeakingP1P2SummaryModal } from "@/components/practice/speaking-p1-p2/SpeakingP1P2SummaryModal";
import { cn } from "@/lib/utils";

export default function SpeakingP1P2Page() {
  const {
    activeMode,
    selectedP1Id,
    selectedP2Id,
    activeP1,
    activeP2,
    p1Inputs,
    prepStrategy,
    sensoryNotes,
    memoryPalaceNotes,
    prepSecondsLeft,
    isPrepping,
    isPrepLocked,
    recordSeconds,
    isRecording,
    showSummaryModal,
    setActiveMode,
    setSelectedP1Id,
    setSelectedP2Id,
    setPrepStrategy,
    setSensoryNotes,
    setMemoryPalaceNotes,
    setP1Field,
    submitPart1,
    start1MinPrep,
    start2MinRecording,
    stopRecording,
    finishPart2Attempt,
    loadPart2ModelNotes,
    resetSession,
    setShowSummaryModal,
  } = useSpeakingP1P2Session();

  const currentP1Input = p1Inputs[activeP1.id] || {
    present: "",
    past: "",
    future: "",
  };

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto select-none">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            <Mic className="h-4 w-4" /> Giai Đoạn 2 (5.5 ➔ 6.5) • IELTS Speaking Part 1 & Part 2 Specialist
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Khung Mở Rộng 3 Mốc Thời Gian & Dàn Ý 1 Phút 5 Giác Quan
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Xóa bỏ phản xạ nói cụt lủn Part 1 • Làm chủ 1 phút chuẩn bị Part 2 & kiểm soát nhịp độ nói 2 phút trôi chảy.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Selector dropdown depending on active mode */}
          {activeMode === "part1" ? (
            <select
              value={selectedP1Id}
              onChange={(e) => setSelectedP1Id(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer shadow-2xs"
            >
              {MOCK_PART1_DATA.map((p) => (
                <option key={p.id} value={p.id}>
                  Part 1: {p.topic}
                </option>
              ))}
            </select>
          ) : (
            <select
              value={selectedP2Id}
              onChange={(e) => {
                setSelectedP2Id(e.target.value);
                resetSession();
              }}
              className="px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer shadow-2xs"
            >
              {MOCK_PART2_CUECARDS.map((c) => (
                <option key={c.id} value={c.id}>
                  Part 2: {c.title}
                </option>
              ))}
            </select>
          )}

          <Link
            href="/practice"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Về phòng luyện tập
          </Link>
        </div>
      </div>

      {/* Mode Switcher */}
      <SpeakingModeSwitcher
        activeMode={activeMode}
        onChangeMode={setActiveMode}
      />

      {/* MODE 1: SPEAKING PART 1 */}
      {activeMode === "part1" && (
        <div className="animate-in fade-in duration-200 max-w-4xl mx-auto">
          <TimelineExpansionCard
            topic={activeP1}
            presentInput={currentP1Input.present}
            pastInput={currentP1Input.past}
            futureInput={currentP1Input.future}
            onChangeField={(field, val) => setP1Field(activeP1.id, field, val)}
            onSubmit={submitPart1}
          />
        </div>
      )}

      {/* MODE 2: SPEAKING PART 2 */}
      {activeMode === "part2" && (
        <div className="animate-in fade-in duration-200 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Cue Card + Timers (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <CueCardPromptViewer cueCard={activeP2} />

            <OneMinutePrepTimer
              secondsLeft={prepSecondsLeft}
              isPrepping={isPrepping}
              isPrepLocked={isPrepLocked}
              onStartPrep={start1MinPrep}
              onSkipToRecording={start2MinRecording}
            />

            <TwoMinuteSpeechRecorder
              recordSeconds={recordSeconds}
              isRecording={isRecording}
              onStartRecord={start2MinRecording}
              onStopRecord={() => {
                stopRecording();
                finishPart2Attempt();
              }}
            />
          </div>

          {/* Right Column: 5-Senses / Memory Palace Builder (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <SensoryMindPalaceBuilder
              strategy={prepStrategy}
              isLocked={isPrepLocked}
              sensoryNotes={sensoryNotes}
              memoryPalaceNotes={memoryPalaceNotes}
              onChangeStrategy={setPrepStrategy}
              onChangeSensoryField={(f, v) =>
                setSensoryNotes((prev) => ({ ...prev, [f]: v }))
              }
              onChangePalaceField={(f, v) =>
                setMemoryPalaceNotes((prev) => ({ ...prev, [f]: v }))
              }
              onLoadModelNotes={loadPart2ModelNotes}
            />
          </div>
        </div>
      )}

      {/* Part 2 Summary Modal */}
      <SpeakingP1P2SummaryModal
        isOpen={showSummaryModal}
        recordSeconds={recordSeconds}
        cueCard={activeP2}
        onRestart={resetSession}
        onClose={() => setShowSummaryModal(false)}
      />
    </div>
  );
}
