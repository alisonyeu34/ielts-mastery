"use client";

import React from "react";
import Link from "next/link";
import {
  Headphones,
  ArrowLeft,
  Sparkles,
  TableProperties,
  RotateCcw,
} from "lucide-react";
import { MOCK_LISTENING_SPLIT_SECTION3 } from "@/data/mockListeningSplitData";
import { useListeningSplitSession } from "@/hooks/useListeningSplitSession";
import { ListeningSplitLayout } from "@/components/practice/listening-split/ListeningSplitLayout";
import { AudioTimelineController } from "@/components/practice/listening-split/AudioTimelineController";
import { InteractiveTranscriptPane } from "@/components/practice/listening-split/InteractiveTranscriptPane";
import { ListeningQuestionsPane } from "@/components/practice/listening-split/ListeningQuestionsPane";
import { DistractorBreakdownDrawer } from "@/components/practice/listening-split/DistractorBreakdownDrawer";
import { ListeningSplitResultModal } from "@/components/practice/listening-split/ListeningSplitResultModal";

export default function ListeningSplitViewPage() {
  const {
    currentTime,
    duration,
    isPlaying,
    playbackRate,
    volume,
    blindMode,
    activeSentenceId,
    answers,
    isSubmitted,
    showDistractorDrawer,
    showResultModal,
    activeEvidenceQuestionId,
    completedCount,
    play,
    pause,
    togglePlay,
    seek,
    setPlaybackRate,
    setVolume,
    setBlindMode,
    setAnswer,
    jumpToEvidence,
    submitListeningTest,
    resetSession,
    setShowDistractorDrawer,
    setShowResultModal,
  } = useListeningSplitSession(MOCK_LISTENING_SPLIT_SECTION3);

  // Compute total correct for summary modal
  const correctCount = MOCK_LISTENING_SPLIT_SECTION3.questions.filter((q) => {
    const userAns = (answers[q.id] || "").trim().toLowerCase();
    const correctAns = q.correctAnswer.trim().toLowerCase();
    return (
      userAns === correctAns ||
      (q.type === "form_completion" &&
        (userAns.includes(correctAns) || correctAns.includes(userAns)))
    );
  }).length;

  return (
    <div className="space-y-4 pb-12 max-w-7xl mx-auto select-none">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            <Headphones className="h-4 w-4" /> Module 2B • Split-View Listening Workspace & Synchronized Transcript
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-foreground">
            Luyện Nghe 2 Cột Chuẩn Kỳ Thi Máy Tính & Soi Bẫy Khảo Thí
          </h1>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {isSubmitted && (
            <button
              type="button"
              onClick={() => setShowDistractorDrawer(true)}
              className="px-3.5 py-1.5 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <TableProperties className="h-3.5 w-3.5 text-primary" />
              <span>Bật Ma Trận Bẫy</span>
            </button>
          )}

          <Link
            href="/practice"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-1.5 rounded-xl border border-border bg-card shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Về phòng luyện tập
          </Link>
        </div>
      </div>

      {/* 2-Column Split Workspace */}
      <ListeningSplitLayout
        audioController={
          <AudioTimelineController
            currentTime={currentTime}
            duration={duration}
            isPlaying={isPlaying}
            playbackRate={playbackRate}
            blindMode={blindMode}
            onTogglePlay={togglePlay}
            onSeek={seek}
            onChangeRate={setPlaybackRate}
            onToggleBlindMode={() => setBlindMode(!blindMode)}
          />
        }
        leftPane={
          <InteractiveTranscriptPane
            transcript={MOCK_LISTENING_SPLIT_SECTION3.transcript}
            activeSentenceId={activeSentenceId}
            blindMode={blindMode}
            onSeek={seek}
            onUnlockBlindMode={() => setBlindMode(false)}
          />
        }
        rightPane={
          <ListeningQuestionsPane
            questions={MOCK_LISTENING_SPLIT_SECTION3.questions}
            answers={answers}
            isSubmitted={isSubmitted}
            completedCount={completedCount}
            activeEvidenceQuestionId={activeEvidenceQuestionId}
            onSetAnswer={setAnswer}
            onJumpToEvidence={jumpToEvidence}
            onSubmit={submitListeningTest}
            onOpenDistractorDrawer={() => setShowDistractorDrawer(true)}
          />
        }
      />

      {/* Distractor Matrix Drawer */}
      <DistractorBreakdownDrawer
        isOpen={showDistractorDrawer}
        questions={MOCK_LISTENING_SPLIT_SECTION3.questions}
        onClose={() => setShowDistractorDrawer(false)}
      />

      {/* Result Summary Modal */}
      <ListeningSplitResultModal
        isOpen={showResultModal}
        correctCount={correctCount}
        totalQuestions={MOCK_LISTENING_SPLIT_SECTION3.questions.length}
        timeSpentSeconds={Math.round(currentTime)}
        onOpenDistractorDrawer={() => {
          setShowResultModal(false);
          setShowDistractorDrawer(true);
        }}
        onReviewAnswers={() => setShowResultModal(false)}
        onRestart={resetSession}
      />
    </div>
  );
}
