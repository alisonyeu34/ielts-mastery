"use client";

import React from "react";
import { useAcademicShorthandSession } from "@/hooks/useAcademicShorthandSession";
import { AcousticLatencyIndicator } from "@/components/practice/academic-shorthand/AcousticLatencyIndicator";
import { StenographyKeypadBar } from "@/components/practice/academic-shorthand/StenographyKeypadBar";
import { ShorthandCapturePad } from "@/components/practice/academic-shorthand/ShorthandCapturePad";
import { ReconstructionSprintTimer } from "@/components/practice/academic-shorthand/ReconstructionSprintTimer";
import { StenographySymbolCheatSheet } from "@/components/practice/academic-shorthand/StenographySymbolCheatSheet";
import { ShorthandSummaryModal } from "@/components/practice/academic-shorthand/ShorthandSummaryModal";
import {
  Sparkles,
  Headphones,
  Zap,
  BookOpen,
  ChevronRight,
  RotateCcw
} from "lucide-react";
import Link from "next/link";

export default function AcademicShorthandPage() {
  const {
    currentLecture,
    allLectures,
    selectedLectureId,
    handleSelectLecture,
    phase,
    setPhase,
    isPlaying,
    setIsPlaying,
    currentTime,
    playbackSpeed,
    setPlaybackSpeed,
    rawNotes,
    handleNoteChange,
    insertSymbolToNotes,
    latencyWarning,
    userAnswers,
    handleAnswerInput,
    sprintTimeRemaining,
    isSprintTimerActive,
    startReconstructionSprint,
    gradingResults,
    totalScore,
    isSummaryOpen,
    setIsSummaryOpen,
    isSaved,
    saveResultsToDatabase
  } = useAcademicShorthandSession();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/dashboard" className="hover:text-slate-200 transition-colors">
            Dashboard
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/practice" className="hover:text-slate-200 transition-colors">
            Practice Arena
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-cyan-400 font-semibold">
            Step 78: Academic Shorthand &amp; Stenographic Studio
          </span>
        </div>

        {/* Lecture Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Chọn Bài Giảng Section 4:</span>
          <select
            value={selectedLectureId}
            onChange={(e) => handleSelectLecture(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
          >
            {allLectures.map((l) => (
              <option key={l.id} value={l.id}>
                {l.title} ({l.academicDiscipline})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 border border-cyan-500/30 p-6 md:p-8 shadow-2xl">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold">
            <Headphones className="w-3.5 h-3.5 text-cyan-400" />
            <span>IELTS Listening Section 4 &bull; Working Memory Alleviation (Step 78/100)</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Phòng Huấn Luyện Tốc Ký Ký Hiệu &amp; Tái Tạo Mật Độ Section 4
          </h1>

          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            Giảm tải áp lực <strong>bộ nhớ làm việc (Working Memory Overload)</strong> trong bài giảng học thuật 7 phút.
            Sử dụng <strong>hệ thống 20 ký hiệu tốc ký chuyên dụng</strong> (&uarr;, &darr;, &Delta;, &rarr;, &exist;, &there4;, &asymp;, &ne;),
            kèm bài tập chạy nước rút <strong>Reconstruction Sprint 60s</strong> kiểm soát triệt để bẫy số ít / số nhiều <code>-s/-es</code>.
          </p>
        </div>
      </div>

      {/* Phase Mode Switcher */}
      <div className="flex items-center justify-between bg-slate-900/60 p-2 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPhase("listen_and_shorthand")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              phase === "listen_and_shorthand"
                ? "bg-cyan-600 text-white shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Phase 1: Nghe &amp; Tốc Ký Ký Hiệu
          </button>
          <button
            type="button"
            onClick={startReconstructionSprint}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              phase === "reconstruction_sprint"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Phase 2: Sprint Tái Tạo 60s (Điền Từ)
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsSummaryOpen(true)}
          className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Bảng Chẩn Đoán Chi Tiết</span>
        </button>
      </div>

      {/* Acoustic Latency & Audio Player Bar */}
      <AcousticLatencyIndicator
        lecture={currentLecture}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        currentTime={currentTime}
        playbackSpeed={playbackSpeed}
        onChangeSpeed={setPlaybackSpeed}
        onResetAudio={() => {
          setIsPlaying(false);
          // resets audio playback time
        }}
      />

      {/* 20 Academic Stenography Keypad Bar */}
      <StenographyKeypadBar onInsertSymbol={insertSymbolToNotes} />

      {/* Phase 1 or Phase 2 Workspace */}
      {phase === "listen_and_shorthand" ? (
        <ShorthandCapturePad
          notes={rawNotes}
          onChangeNotes={handleNoteChange}
          onStartReconstruction={startReconstructionSprint}
          latencyWarning={latencyWarning}
          isPlaying={isPlaying}
        />
      ) : (
        <ReconstructionSprintTimer
          questions={currentLecture.questions}
          userAnswers={userAnswers}
          onAnswerInput={handleAnswerInput}
          gradingResults={gradingResults}
          sprintTimeRemaining={sprintTimeRemaining}
          isTimerActive={isSprintTimerActive}
          shorthandNotes={rawNotes}
          onFinishSprint={() => {
            saveResultsToDatabase();
            setIsSummaryOpen(true);
          }}
        />
      )}

      {/* 20 Stenography Symbols Cheat Sheet (Collapsible) */}
      <StenographySymbolCheatSheet />

      {/* Final Diagnostic Summary Modal */}
      <ShorthandSummaryModal
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
        lecture={currentLecture}
        gradingResults={gradingResults}
        totalScore={totalScore}
        onSaveToDatabase={saveResultsToDatabase}
        isSaved={isSaved}
      />
    </div>
  );
}
