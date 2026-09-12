"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Volume2,
  Sparkles,
  Gauge,
  FolderOpen
} from "lucide-react";
import { useHighRateLectureSession } from "@/hooks/useHighRateLectureSession";
import { OverSpeedPlayerControls } from "@/components/practice/high-rate-lecture/OverSpeedPlayerControls";
import { LiveSignpostingRadar } from "@/components/practice/high-rate-lecture/LiveSignpostingRadar";
import { HierarchicalLectureOutline } from "@/components/practice/high-rate-lecture/HierarchicalLectureOutline";
import { AcousticLatencyHeatmap } from "@/components/practice/high-rate-lecture/AcousticLatencyHeatmap";
import { LectureDiagnosticSummaryModal } from "@/components/practice/high-rate-lecture/LectureDiagnosticSummaryModal";

export default function HighRateLecturePage() {
  const {
    currentScenario,
    allScenarios,
    selectedScenarioId,
    handleSelectScenario,
    isPlaying,
    setIsPlaying,
    currentTimeSec,
    setCurrentTimeSec,
    playbackRate,
    setPlaybackRate,
    activeSignpost,
    approachingQuestion,
    userAnswers,
    handleAnswerChange,
    isSubmitted,
    setIsSubmitted,
    scoreStats,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isSaved,
    saveResultsToDatabase
  } = useHighRateLectureSession();

  const handleNextScenario = () => {
    const currentIndex = allScenarios.findIndex((s) => s.id === selectedScenarioId);
    const nextIndex = (currentIndex + 1) % allScenarios.length;
    handleSelectScenario(allScenarios[nextIndex].id);
  };

  const handleReset = () => {
    handleSelectScenario(selectedScenarioId);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setIsSummaryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Top Navigation */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300">
                  Step 88/100
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Listening Section 4 High-Rate Speech (Band 8.0 - 8.5+)
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
                Acoustic Compression & High-Rate Lecture Telemetry Studio
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Target: Listening 8.5+
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Scenario Selection Header */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Bài giảng học thuật Section 4:</span>
              <h3 className="text-sm md:text-base font-bold text-white">
                {currentScenario.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400 whitespace-nowrap">Chọn bài giảng:</label>
            <select
              value={selectedScenarioId}
              onChange={(e) => handleSelectScenario(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {allScenarios.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.academicDiscipline})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Over-Speed Player Controls (Audio + Rate DSP) */}
        <OverSpeedPlayerControls
          scenario={currentScenario}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          currentTimeSec={currentTimeSec}
          onSeek={(s) => setCurrentTimeSec(s)}
          playbackRate={playbackRate}
          onChangeRate={setPlaybackRate}
        />

        {/* 2-Column Split: Radar & Heatmap (Left) & Outline Blanks (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Live Signposting Radar & Latency Heatmap (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <LiveSignpostingRadar
              scenario={currentScenario}
              currentTimeSec={currentTimeSec}
              activeSignpost={activeSignpost}
              approachingQuestion={approachingQuestion}
            />

            <AcousticLatencyHeatmap
              scenario={currentScenario}
              scoreStats={scoreStats}
            />
          </div>

          {/* Right Column: Hierarchical Lecture Outline (7 cols) */}
          <div className="lg:col-span-7">
            <HierarchicalLectureOutline
              scenario={currentScenario}
              userAnswers={userAnswers}
              onAnswerChange={handleAnswerChange}
              isSubmitted={isSubmitted}
              onSubmit={handleSubmit}
              onReset={handleReset}
            />
          </div>
        </div>
      </div>

      {/* Diagnostic Summary Modal */}
      <LectureDiagnosticSummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        scenario={currentScenario}
        playbackRate={playbackRate}
        scoreStats={scoreStats}
        isSaved={isSaved}
        onSave={saveResultsToDatabase}
        onNextScenario={handleNextScenario}
      />
    </div>
  );
}
