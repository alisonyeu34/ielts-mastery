"use client";

import React from "react";
import { usePitchContourSession } from "@/hooks/usePitchContourSession";
import { RealtimePitchCanvas } from "@/components/practice/pitch-contour/RealtimePitchCanvas";
import { UptalkAlertBadge } from "@/components/practice/pitch-contour/UptalkAlertBadge";
import { TonicStressMarker } from "@/components/practice/pitch-contour/TonicStressMarker";
import { PitchContourShadowingLab } from "@/components/practice/pitch-contour/PitchContourShadowingLab";
import { PitchAudioRecorderControls } from "@/components/practice/pitch-contour/PitchAudioRecorderControls";
import { PitchCadenceSummaryModal } from "@/components/practice/pitch-contour/PitchCadenceSummaryModal";
import {
  Activity,
  Sparkles,
  Volume2,
  ChevronRight,
  BookOpen,
  Mic
} from "lucide-react";
import Link from "next/link";

export default function PitchContourPage() {
  const {
    currentExercise,
    allExercises,
    selectedExerciseId,
    handleSelectExercise,
    isRecording,
    startRecording,
    stopRecording,
    simulateNativePlayback,
    simulateUptalkPlayback,
    isPlayingNativeModel,
    isSimulatingUptalk,
    userPitchTimeline,
    uptalkDetection,
    alignmentResult,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isSaved,
    saveResultsToDatabase
  } = usePitchContourSession();

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
          <span className="text-purple-400 font-semibold">
            Step 82: Bio-Acoustic Pitch Contour &amp; Anti-Uptalk Studio
          </span>
        </div>

        {/* Exercise Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Chọn Câu Speaking Part 3:</span>
          <select
            value={selectedExerciseId}
            onChange={(e) => handleSelectExercise(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 font-medium"
          >
            {allExercises.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-500/30 p-6 md:p-8 shadow-2xl">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5 text-purple-400" />
            <span>IELTS Speaking Part 3 &bull; Bio-Acoustic Pitch Contour (Step 82/100)</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Phòng Đo Lường Âm Điệu Cao Độ &amp; Triệt Tiêu Uptalk
          </h1>

          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            Xóa bỏ triệt để thói quen <strong>Uptalk (High Rising Terminal &nearr;)</strong> gây mất uy quyền học thuật.
            Theo dõi <strong>đường bao cao độ $F_0$ (Hz) thời gian thực</strong> qua thuật toán YIN Autocorrelation,
            làm chủ <strong>ngữ điệu hạ giọng dứt khoát (&searrow; -35Hz)</strong> ở âm tiết trọng âm hạt nhân (*Nuclear Syllable*).
          </p>
        </div>
      </div>

      {/* Action Trigger for Summary Modal */}
      <div className="flex items-center justify-between bg-slate-900/60 p-2 rounded-2xl border border-slate-800">
        <div className="text-xs text-slate-400 px-3 flex items-center gap-2">
          <span>Trạng Thái Âm Học:</span>
          <strong className="text-purple-400 font-mono">
            Độ khớp bản xứ: {alignmentResult.alignmentScore}%
          </strong>
          {uptalkDetection.isUptalkDetected && (
            <span className="text-rose-400 font-mono font-bold">
              (Cảnh báo Uptalk +{uptalkDetection.terminalPitchRiseHz}Hz)
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsSummaryModalOpen(true)}
          className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all shadow-md shadow-purple-500/20 flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bảng Chẩn Đoán Cao Độ Chi Tiết</span>
        </button>
      </div>

      {/* Question Prompt Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
          <BookOpen className="w-4 h-4" />
          <span>IELTS Speaking Part 3 Examiner Question</span>
        </div>
        <p className="text-base text-slate-100 font-medium leading-relaxed font-sans">
          &ldquo;{currentExercise.question}&rdquo;
        </p>
      </div>

      {/* Tonic Nuclear Stress Marker Component */}
      <TonicStressMarker exercise={currentExercise} />

      {/* Realtime Pitch Canvas */}
      <RealtimePitchCanvas
        userTimeline={userPitchTimeline}
        nativeTimeline={currentExercise.nativePitchTimeline}
        durationSec={currentExercise.durationSec}
        isUptalk={uptalkDetection.isUptalkDetected}
        isCadenceMastered={uptalkDetection.isAuthoritativeFallingCadence}
      />

      {/* Instant Uptalk Alert Badge */}
      <UptalkAlertBadge uptalkDetection={uptalkDetection} />

      {/* Audio Recorder Controls */}
      <PitchAudioRecorderControls
        isRecording={isRecording}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        onPlayNativeModel={simulateNativePlayback}
        onSimulateUptalk={simulateUptalkPlayback}
        isPlayingNativeModel={isPlayingNativeModel}
        isSimulatingUptalk={isSimulatingUptalk}
      />

      {/* Shadowing Alignment Lab */}
      <PitchContourShadowingLab alignmentResult={alignmentResult} />

      {/* Summary Diagnostics Modal */}
      <PitchCadenceSummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        exercise={currentExercise}
        uptalkDetection={uptalkDetection}
        alignmentResult={alignmentResult}
        onSaveToDatabase={saveResultsToDatabase}
        isSaved={isSaved}
      />
    </div>
  );
}
