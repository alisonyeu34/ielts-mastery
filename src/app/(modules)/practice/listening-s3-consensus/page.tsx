"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  ArrowLeft,
  Zap,
  GitBranch,
  Volume2,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { useSection3Session } from "@/hooks/useSection3Session";
import { SpeakerAvatarTracker } from "@/components/practice/listening-s3/SpeakerAvatarTracker";
import { S3AudioController } from "@/components/practice/listening-s3/S3AudioController";
import { DynamicDialoguePane } from "@/components/practice/listening-s3/DynamicDialoguePane";
import { ConsensusFlowchart } from "@/components/practice/listening-s3/ConsensusFlowchart";
import { SubtleDisagreementDrill } from "@/components/practice/listening-s3/SubtleDisagreementDrill";
import { S3QuestionInteractionPane } from "@/components/practice/listening-s3/S3QuestionInteractionPane";
import { S3ConsensusSummaryModal } from "@/components/practice/listening-s3/S3ConsensusSummaryModal";
import { cn } from "@/lib/utils";

export default function Section3ConsensusPage() {
  const {
    data,
    answers,
    eliminatedOptions,
    selectedQuestionId,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    isBlindMode,
    isSubmitted,
    isForensicActive,
    focusedConsensusQuestionId,
    activeSpeakerId,
    currentTurn,
    showSummaryModal,
    showDisagreementModal,
    scoreResult,
    setSelectedQuestionId,
    setPlaybackRate,
    setIsBlindMode,
    setFocusedConsensusQuestionId,
    setAnswer,
    toggleEliminateOption,
    playAudio,
    pauseAudio,
    togglePlay,
    seekToSecond,
    jumpToSpeakerTurn,
    jumpToQuestionEvidence,
    submitTest,
    resetSession,
    saveDisagreementVocabToFSRS,
    setShowSummaryModal,
    setShowDisagreementModal,
  } = useSection3Session();

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto select-none">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            <Users className="h-4 w-4" /> Giai Đoạn 2 (5.5 ➔ 6.5) • IELTS Listening Section 3 Specialist
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Bắt Bẫy Đồng Thuận Nhóm (Group Consensus Studio)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Theo dấu 3 người nói • Bóc tách bất đồng ngầm & nhượng bộ giả • Giải mã quy trình thương lượng học thuật.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setShowDisagreementModal(true)}
            className="px-3.5 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Tín Hiệu Lật Kèo</span>
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
        {/* LEFT COLUMN: Speaker Tracker, Audio Player & Synchronized Dialogue (7 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 space-y-5">
          <SpeakerAvatarTracker
            speakers={data.speakers}
            activeSpeakerId={activeSpeakerId}
            currentTurn={currentTurn}
            isPlaying={isPlaying}
          />

          <S3AudioController
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            playbackRate={playbackRate}
            isBlindMode={isBlindMode}
            onTogglePlay={togglePlay}
            onSeek={seekToSecond}
            onChangeRate={setPlaybackRate}
            onToggleBlindMode={() => setIsBlindMode(!isBlindMode)}
          />

          <DynamicDialoguePane
            dialogueTurns={data.dialogueTurns}
            speakers={data.speakers}
            currentTime={currentTime}
            currentTurn={currentTurn}
            isBlindMode={isBlindMode}
            isForensicActive={isForensicActive}
            onSeekToTurn={jumpToSpeakerTurn}
          />

          {/* Consensus Flowchart (Available during Review/Forensic mode) */}
          {isForensicActive && (
            <ConsensusFlowchart
              questions={data.mcQuestions}
              focusedQuestionId={focusedConsensusQuestionId}
              onSelectQuestion={setFocusedConsensusQuestionId}
              onJumpToClimax={seekToSecond}
            />
          )}
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Question Interaction Pane (5 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 space-y-5">
          <S3QuestionInteractionPane
            mcQuestions={data.mcQuestions}
            matchingQuestions={data.matchingQuestions}
            answers={answers}
            eliminatedOptions={eliminatedOptions}
            selectedQuestionId={selectedQuestionId}
            isSubmitted={isSubmitted}
            isForensicActive={isForensicActive}
            onSelectQuestion={setSelectedQuestionId}
            onSelectAnswer={setAnswer}
            onToggleEliminate={toggleEliminateOption}
            onJumpToEvidence={jumpToQuestionEvidence}
            onOpenDrillModal={() => setShowDisagreementModal(true)}
            onSubmitTest={submitTest}
          />
        </div>
      </div>

      {/* Subtle Disagreement & False Concession Drill Modal */}
      <SubtleDisagreementDrill
        isOpen={showDisagreementModal}
        drillItems={data.subtleDisagreementDrill}
        onSaveToFSRS={saveDisagreementVocabToFSRS}
        onClose={() => setShowDisagreementModal(false)}
      />

      {/* Result Diagnostic Summary Modal */}
      <S3ConsensusSummaryModal
        isOpen={showSummaryModal}
        scoreResult={scoreResult}
        onRestart={resetSession}
        onClose={() => setShowSummaryModal(false)}
      />
    </div>
  );
}
