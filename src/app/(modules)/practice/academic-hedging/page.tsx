"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Sparkles,
  ArrowLeft,
  BookOpen,
  Sliders,
  Award,
  Layers,
  HelpCircle
} from "lucide-react";
import { useAcademicHedgingSession } from "@/hooks/useAcademicHedgingSession";
import { EpistemicCertaintySlider } from "@/components/practice/academic-hedging/EpistemicCertaintySlider";
import { DogmatismDeflatorPanel } from "@/components/practice/academic-hedging/DogmatismDeflatorPanel";
import { HedgingFormulasPalette } from "@/components/practice/academic-hedging/HedgingFormulasPalette";
import { HedgingWorkbench } from "@/components/practice/academic-hedging/HedgingWorkbench";
import { HedgingEvaluationSummaryModal } from "@/components/practice/academic-hedging/HedgingEvaluationSummaryModal";

export default function AcademicHedgingPage() {
  const {
    currentDrill,
    allDrills,
    selectedDrillId,
    handleSelectDrill,
    sliderPercentage,
    handleSliderChange,
    activeCalibrationTier,
    userDraft,
    setUserDraft,
    handleInsertPill,
    handleReplaceDogmaticTerm,
    analysisReport,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isSaved,
    saveEvaluationToDatabase
  } = useAcademicHedgingSession();

  const handleNextDrill = () => {
    const currentIndex = allDrills.findIndex((d) => d.id === selectedDrillId);
    const nextIndex = (currentIndex + 1) % allDrills.length;
    handleSelectDrill(allDrills[nextIndex].id);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Top Breadcrumb Navigation */}
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
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-indigo-950 border border-indigo-700/50 text-indigo-300">
                  Step 83/100
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Writing Task 2 & Speaking Part 3 (Band 7.5 - 8.5+)
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
                Academic Hedging & Epistemic Modality Studio
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Target: TR/LR 8.0+
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Drill Selector Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Đề bài & Ngữ cảnh học thuật:</span>
              <h3 className="text-sm md:text-base font-bold text-white">
                {currentDrill.topic}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400 whitespace-nowrap">Chọn chủ đề:</label>
            <select
              value={selectedDrillId}
              onChange={(e) => handleSelectDrill(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {allDrills.map((drill) => (
                <option key={drill.id} value={drill.id}>
                  {drill.topic}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Epistemic Certainty Slider */}
        <EpistemicCertaintySlider
          percentage={sliderPercentage}
          onChangePercentage={handleSliderChange}
          calibrations={currentDrill.calibrations}
        />

        {/* 2-Column Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Dogmatism Deflator & Formulas Palette (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <DogmatismDeflatorPanel
              dogmaticTerms={analysisReport.dogmaticTerms}
              onReplaceTerm={handleReplaceDogmaticTerm}
            />

            <HedgingFormulasPalette onInsertPhrase={handleInsertPill} />
          </div>

          {/* Right Column: Hedging Workbench (7 cols) */}
          <div className="lg:col-span-7">
            <HedgingWorkbench
              drill={currentDrill}
              activeTier={activeCalibrationTier}
              userDraft={userDraft}
              onChangeDraft={setUserDraft}
              analysisReport={analysisReport}
              onOpenEvaluation={() => setIsSummaryModalOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Diagnostic Evaluation Modal */}
      <HedgingEvaluationSummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        report={analysisReport}
        drill={currentDrill}
        userDraft={userDraft}
        isSaved={isSaved}
        onSave={saveEvaluationToDatabase}
        onNextDrill={handleNextDrill}
      />
    </div>
  );
}
