"use client";

import React from "react";
import Link from "next/link";
import {
  Mic,
  ArrowLeft,
  Sparkles,
  Layers,
  Activity,
  Send,
  RotateCcw,
} from "lucide-react";
import { MOCK_SPEAKING_P3_TOPICS } from "@/data/mockSpeakingP3Data";
import { useSpeakingP3Session } from "@/hooks/useSpeakingP3Session";
import { SocietalHexagonSelector } from "@/components/practice/speaking-p3/SocietalHexagonSelector";
import { AcademicHedgingStudio } from "@/components/practice/speaking-p3/AcademicHedgingStudio";
import { HedgingPaletteDrawer } from "@/components/practice/speaking-p3/HedgingPaletteDrawer";
import { P3PerspectiveSpeechRecorder } from "@/components/practice/speaking-p3/P3PerspectiveSpeechRecorder";
import { P3EvaluationSummaryModal } from "@/components/practice/speaking-p3/P3EvaluationSummaryModal";
import { cn } from "@/lib/utils";

export default function SpeakingP3HedgingPage() {
  const {
    selectedTopicId,
    activeTopic,
    selectedLensKeys,
    hedgingUserInput,
    speechTranscript,
    hedgingAnalysis,
    isRecording,
    recordDuration,
    pitchSamples,
    currentPitch,
    terminalPitchResult,
    showSummaryModal,
    setSelectedTopicId,
    toggleLens,
    setHedgingUserInput,
    setSpeechTranscript,
    loadSampleHedging,
    loadModelFullResponse,
    insertHedgingPhrase,
    startRecording,
    stopRecording,
    submitAttempt,
    resetSession,
    setShowSummaryModal,
  } = useSpeakingP3Session();

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto select-none">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            <Mic className="h-4 w-4" /> Giai Đoạn 3 (6.5 ➔ 7.5+) • IELTS Speaking Part 3 Specialist
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            6 Lăng Kính Chủ Thể Xã Hội, Kỹ Thuật Hedging & Ngữ Điệu Hạ Giọng
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Triệt tiêu bẫy kể chuyện cá nhân • Rào đón học thuật 4 tầng • Kiểm soát cao độ F0 dứt điểm tránh Uptalk.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Topic Selector Dropdown */}
          <select
            value={selectedTopicId}
            onChange={(e) => {
              setSelectedTopicId(e.target.value);
              resetSession();
            }}
            className="px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer shadow-2xs"
          >
            {MOCK_SPEAKING_P3_TOPICS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>

          <Link
            href="/practice"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Về phòng luyện tập
          </Link>
        </div>
      </div>

      {/* Main 2-Column Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: 6 Societal Lenses & Hedging Drills (6 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 space-y-6">
          <SocietalHexagonSelector
            topic={activeTopic}
            selectedKeys={selectedLensKeys}
            onToggleKey={toggleLens}
          />

          <AcademicHedgingStudio
            topic={activeTopic}
            userInput={hedgingUserInput}
            analysis={hedgingAnalysis}
            onChangeInput={setHedgingUserInput}
            onLoadSample={loadSampleHedging}
          />

          <HedgingPaletteDrawer onInsertPhrase={insertHedgingPhrase} />
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Speech Recording Station & Realtime Pitch Tracker (6 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 space-y-6">
          <P3PerspectiveSpeechRecorder
            topic={activeTopic}
            selectedLensKeys={selectedLensKeys}
            transcriptText={speechTranscript}
            isRecording={isRecording}
            recordDuration={recordDuration}
            pitchSamples={pitchSamples}
            currentPitch={currentPitch}
            terminalPitchResult={terminalPitchResult}
            onChangeTranscript={setSpeechTranscript}
            onLoadModelResponse={loadModelFullResponse}
            onStartRecord={startRecording}
            onStopRecord={stopRecording}
            onSubmitAttempt={submitAttempt}
          />
        </div>
      </div>

      {/* Summary Evaluation Modal */}
      <P3EvaluationSummaryModal
        isOpen={showSummaryModal}
        topic={activeTopic}
        selectedLensesCount={selectedLensKeys.length}
        hedgingAnalysis={hedgingAnalysis}
        terminalAnalysis={terminalPitchResult}
        onRestart={resetSession}
        onClose={() => setShowSummaryModal(false)}
      />
    </div>
  );
}
