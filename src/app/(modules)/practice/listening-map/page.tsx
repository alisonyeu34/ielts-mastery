"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  ArrowLeft,
  Compass,
  Footprints,
  BookOpen,
  Sparkles,
  FileText,
  Volume2,
} from "lucide-react";
import { useListeningMapSession } from "@/hooks/useListeningMapSession";
import { InteractiveSVGMap } from "@/components/practice/listening-map/InteractiveSVGMap";
import { MapAudioController } from "@/components/practice/listening-map/MapAudioController";
import { MapQuestionForm } from "@/components/practice/listening-map/MapQuestionForm";
import { SpatialPrepositionModal } from "@/components/practice/listening-map/SpatialPrepositionModal";
import { MapDiagnosticSummaryModal } from "@/components/practice/listening-map/MapDiagnosticSummaryModal";
import { cn } from "@/lib/utils";

export default function ListeningMapPage() {
  const {
    mapData,
    answers,
    eliminatedLetters,
    selectedQuestionId,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    isSubmitted,
    isForensicMode,
    focusedQuestionId,
    compassBearing,
    showSummaryModal,
    showPrepositionModal,
    scoreResult,
    setSelectedQuestionId,
    setPlaybackRate,
    assignLetterToActiveQuestion,
    toggleEliminateLetter,
    playAudio,
    pauseAudio,
    togglePlay,
    seekToSecond,
    rotateCompass,
    jumpToQuestionEvidence,
    submitAnswers,
    resetSession,
    saveSpatialVocabToFSRS,
    setShowSummaryModal,
    setShowPrepositionModal,
  } = useListeningMapSession();

  const focusedLetter =
    focusedQuestionId !== null
      ? mapData.questions.find((q) => q.id === focusedQuestionId)?.correctLetter || null
      : answers[selectedQuestionId] || null;

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto select-none">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
            <Compass className="h-4 w-4" /> Giai Đoạn 2 (5.5 ➔ 6.5) • IELTS Listening Section 2 Specialist
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Bản Đồ & Sơ Đồ Không Gian (Interactive Map Labelling)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Định vị điểm mốc xuất phát • La bàn xoay góc nhìn • Bắt bẫy chuyển hướng kế hoạch phút chót.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setShowPrepositionModal(true)}
            className="px-3.5 py-2 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            <span>Cẩm Nang Vị Trí</span>
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
        {/* LEFT COLUMN: Interactive SVG Map & Audio Player (7 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 space-y-5">
          <InteractiveSVGMap
            mapData={mapData}
            answers={answers}
            selectedQuestionId={selectedQuestionId}
            eliminatedLetters={eliminatedLetters}
            isForensicMode={isForensicMode}
            focusedLetter={focusedLetter}
            compassBearing={compassBearing}
            onSelectLetter={(letter) => assignLetterToActiveQuestion(letter)}
            onToggleEliminate={toggleEliminateLetter}
            onRotateCompass={rotateCompass}
          />

          <MapAudioController
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            playbackRate={playbackRate}
            questions={mapData.questions}
            onTogglePlay={togglePlay}
            onSeek={seekToSecond}
            onChangeRate={setPlaybackRate}
          />
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Question Form & Forensic Transcript Review (5 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 space-y-5">
          <MapQuestionForm
            mapData={mapData}
            answers={answers}
            selectedQuestionId={selectedQuestionId}
            isSubmitted={isSubmitted}
            isForensicMode={isForensicMode}
            onSelectQuestion={setSelectedQuestionId}
            onAssignLetter={(qId, letChoice) => {
              setSelectedQuestionId(qId);
              assignLetterToActiveQuestion(letChoice);
            }}
            onJumpToEvidence={jumpToQuestionEvidence}
            onOpenLexiconModal={() => setShowPrepositionModal(true)}
            onSubmitAnswers={submitAnswers}
          />

          {/* Forensic Audio Transcript Card (Active after Submission) */}
          {isSubmitted && (
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 border-b border-border/70 pb-3">
                <FileText className="h-4 w-4 text-primary" />
                <h4 className="font-bold text-xs sm:text-sm text-foreground">
                  Bản Ghi Lời Thoại Bóc Tách Bẫy (Audio Transcript)
                </h4>
              </div>

              <div className="space-y-3 text-xs leading-relaxed max-h-60 overflow-y-auto pr-1">
                {mapData.transcriptParagraphs.map((para, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-3 rounded-xl bg-secondary/30 border border-border/70 space-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                      <span className="font-bold text-primary">{para.speaker}</span>
                      <span>
                        {para.startSecond}s - {para.endSecond}s
                      </span>
                    </div>
                    <p className="text-foreground/90 font-serif">
                      {para.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Spatial Prepositions Guide Modal */}
      <SpatialPrepositionModal
        isOpen={showPrepositionModal}
        lexicon={mapData.spatialLexicon}
        onSaveToFSRS={saveSpatialVocabToFSRS}
        onClose={() => setShowPrepositionModal(false)}
      />

      {/* Result Diagnostic Summary Modal */}
      <MapDiagnosticSummaryModal
        isOpen={showSummaryModal}
        scoreResult={scoreResult}
        onRestart={resetSession}
        onClose={() => setShowSummaryModal(false)}
      />
    </div>
  );
}
