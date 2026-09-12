"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  ArrowLeft,
  Clock,
  Compass,
  FileText,
  Radio,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { useSection4Session } from "@/hooks/useSection4Session";
import { LectureRoadmapTracker } from "@/components/practice/listening-s4/LectureRoadmapTracker";
import { S4AudioStreamController } from "@/components/practice/listening-s4/S4AudioStreamController";
import { SignpostingRadarWidget } from "@/components/practice/listening-s4/SignpostingRadarWidget";
import { HierarchicalNoteCanvas } from "@/components/practice/listening-s4/HierarchicalNoteCanvas";
import { PreListeningPredictionModal } from "@/components/practice/listening-s4/PreListeningPredictionModal";
import { S4ForensicTranscriptDrawer } from "@/components/practice/listening-s4/S4ForensicTranscriptDrawer";
import { S4DiagnosticSummaryModal } from "@/components/practice/listening-s4/S4DiagnosticSummaryModal";
import { cn } from "@/lib/utils";

export default function Section4LecturePage() {
  const {
    data,
    stage,
    prepSecondsLeft,
    answers,
    predictions,
    selectedQuestionNumber,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    activeSectionIndex,
    showPredictionModal,
    showSummaryModal,
    isDrawerOpen,
    scoreResult,
    setSelectedQuestionNumber,
    setPlaybackRate,
    setAnswer,
    setPrediction,
    startListeningPhase,
    playAudio,
    pauseAudio,
    togglePlay,
    seekToSecond,
    jumpToQuestionEvidence,
    submitAnswers,
    resetSession,
    saveAwlVocabToFSRS,
    setShowPredictionModal,
    setShowSummaryModal,
    setIsDrawerOpen,
  } = useSection4Session();

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto select-none">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            <GraduationCap className="h-4 w-4" /> Giai Đoạn 2 & 3 (5.5 ➔ 7.5+) • IELTS Listening Section 4 Specialist
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Ghi Chú Bài Giảng Phân Cấp (Hierarchical Note-Taking)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Độc thoại học thuật 7 phút liên tục • Bản đồ lộ trình bài giảng • Bắt từ tín hiệu dẫn đường (Signposting Radar).
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {stage === "predicting" && (
            <button
              type="button"
              onClick={() => setShowPredictionModal(true)}
              className="px-3.5 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Clock className="h-3.5 w-3.5" />
              <span>Dự Đoán 60s (00:{prepSecondsLeft < 10 ? `0${prepSecondsLeft}` : prepSecondsLeft})</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="px-3.5 py-2 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <FileText className="h-3.5 w-3.5 text-primary" />
            <span>Transcript & Bẫy</span>
          </button>

          <Link
            href="/practice"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Về phòng luyện tập
          </Link>
        </div>
      </div>

      {/* Main Split-View 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Roadmap Tracker, Audio Stream, and Signposting Radar (5 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 space-y-5">
          <LectureRoadmapTracker
            sections={data.sections}
            activeSectionIndex={activeSectionIndex}
            onSeekToSection={seekToSecond}
          />

          <S4AudioStreamController
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            playbackRate={playbackRate}
            questions={data.questions}
            onTogglePlay={togglePlay}
            onSeek={seekToSecond}
            onChangeRate={setPlaybackRate}
            onOpenDrawer={() => setIsDrawerOpen(true)}
          />

          <SignpostingRadarWidget
            categories={data.signpostingCategories}
          />
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Hierarchical Note Canvas (7 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 space-y-5">
          <HierarchicalNoteCanvas
            data={data}
            answers={answers}
            activeSectionIndex={activeSectionIndex}
            stage={stage}
            selectedQuestionNumber={selectedQuestionNumber}
            onSelectQuestion={setSelectedQuestionNumber}
            onSetAnswer={setAnswer}
            onJumpToEvidence={jumpToQuestionEvidence}
            onSubmitAnswers={submitAnswers}
          />
        </div>
      </div>

      {/* 60s Pre-listening Prediction Modal */}
      <PreListeningPredictionModal
        isOpen={showPredictionModal}
        secondsLeft={prepSecondsLeft}
        questions={data.questions}
        predictions={predictions}
        onSetPrediction={setPrediction}
        onStartListening={startListeningPhase}
        onClose={() => setShowPredictionModal(false)}
      />

      {/* Forensic Transcript Drawer */}
      <S4ForensicTranscriptDrawer
        isOpen={isDrawerOpen}
        data={data}
        onSeekToSecond={seekToSecond}
        onSaveAwlVocab={saveAwlVocabToFSRS}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* Diagnostic Summary Modal */}
      <S4DiagnosticSummaryModal
        isOpen={showSummaryModal}
        scoreResult={scoreResult}
        onRestart={resetSession}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onClose={() => setShowSummaryModal(false)}
      />
    </div>
  );
}
