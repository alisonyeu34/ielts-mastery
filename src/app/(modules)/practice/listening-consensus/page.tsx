"use client";

import React from "react";
import Link from "next/link";
import {
  GitCommit,
  Sparkles,
  ArrowLeft,
  Volume2,
  Award,
  Layers,
  HelpCircle,
  FolderOpen
} from "lucide-react";
import { useListeningConsensusSession } from "@/hooks/useListeningConsensusSession";
import { MultiSpeakerLiveTracker } from "@/components/practice/listening-consensus/MultiSpeakerLiveTracker";
import { ConsensusStateMachineCard } from "@/components/practice/listening-consensus/ConsensusStateMachineCard";
import { FalseConsensusAlertBanner } from "@/components/practice/listening-consensus/FalseConsensusAlertBanner";
import { DialecticalArgumentTree } from "@/components/practice/listening-consensus/DialecticalArgumentTree";
import { Section3QuestionPalette } from "@/components/practice/listening-consensus/Section3QuestionPalette";
import { Section3DiagnosticSummaryModal } from "@/components/practice/listening-consensus/Section3DiagnosticSummaryModal";

export default function ListeningConsensusPage() {
  const {
    currentScenario,
    allScenarios,
    selectedScenarioId,
    handleSelectScenario,
    isPlaying,
    setIsPlaying,
    currentTimeSec,
    setCurrentTimeSec,
    consensusResolution,
    userAnswers,
    handleSelectAnswer,
    isSubmitted,
    submitQuiz,
    scoreStats,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isSaved,
    saveResultsToDatabase
  } = useListeningConsensusSession();

  const handleNextScenario = () => {
    const currentIndex = allScenarios.findIndex((s) => s.id === selectedScenarioId);
    const nextIndex = (currentIndex + 1) % allScenarios.length;
    handleSelectScenario(allScenarios[nextIndex].id);
  };

  const handleReset = () => {
    handleSelectScenario(selectedScenarioId);
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
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-violet-950 border border-violet-700/50 text-violet-300">
                  Step 84/100
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Listening Section 3 (Band 7.5 - 8.5+)
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
                Multi-Speaker Consensus Mapping & Dialectical Tree Engine
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Target: Listening 8.0+
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Scenario Selection Header */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 shrink-0">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Kịch bản nghiên cứu học thuật:</span>
              <h3 className="text-sm md:text-base font-bold text-white">
                {currentScenario.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400 whitespace-nowrap">Chọn kịch bản:</label>
            <select
              value={selectedScenarioId}
              onChange={(e) => handleSelectScenario(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              {allScenarios.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.title} ({scenario.academicDiscipline})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3-Speaker Live Avatar & Audio Controller Tracker */}
        <MultiSpeakerLiveTracker
          scenario={currentScenario}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          currentTimeSec={currentTimeSec}
          onSeek={(s) => setCurrentTimeSec(s)}
          consensusResolution={consensusResolution}
        />

        {/* False Consensus Trap Real-time Warning Banner */}
        <FalseConsensusAlertBanner consensusResolution={consensusResolution} />

        {/* 2-Column Split View: State Machine & Dialectical Tree (Left), Questions (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Consensus State Machine & Argument Tree (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <ConsensusStateMachineCard consensusResolution={consensusResolution} />
            <DialecticalArgumentTree
              scenario={currentScenario}
              activeTurnSpeaker={consensusResolution.activeTurn?.speakerName}
            />
          </div>

          {/* Right Column: Question Palette (5 cols) */}
          <div className="lg:col-span-5">
            <Section3QuestionPalette
              scenario={currentScenario}
              userAnswers={userAnswers}
              onSelectAnswer={handleSelectAnswer}
              isSubmitted={isSubmitted}
              onSubmit={submitQuiz}
              onReset={handleReset}
            />
          </div>
        </div>
      </div>

      {/* Diagnostic Summary Modal */}
      <Section3DiagnosticSummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        scenario={currentScenario}
        scoreStats={scoreStats}
        isSaved={isSaved}
        onSave={saveResultsToDatabase}
        onNextScenario={handleNextScenario}
      />
    </div>
  );
}
