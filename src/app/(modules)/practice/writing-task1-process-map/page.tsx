"use client";

import React, { useState } from "react";
import { useProcessMapBuilder } from "@/hooks/useProcessMapBuilder";
import { PMModeSwitcher } from "@/components/practice/writing-task1-pm/PMModeSwitcher";
import { InteractiveProcessPipeline } from "@/components/practice/writing-task1-pm/InteractiveProcessPipeline";
import { DualEpochMapSlider } from "@/components/practice/writing-task1-pm/DualEpochMapSlider";
import { MapMutationHotspotLayer } from "@/components/practice/writing-task1-pm/MapMutationHotspotLayer";
import { UrbanLexiconPaletteDrawer } from "@/components/practice/writing-task1-pm/UrbanLexiconPaletteDrawer";
import { PassiveVoiceRatioGauge } from "@/components/practice/writing-task1-pm/PassiveVoiceRatioGauge";
import { ProcessMapOverviewValidator } from "@/components/practice/writing-task1-pm/ProcessMapOverviewValidator";
import { PMFullEssayWorkspace } from "@/components/practice/writing-task1-pm/PMFullEssayWorkspace";
import { PMResultAssessmentModal } from "@/components/practice/writing-task1-pm/PMResultAssessmentModal";
import {
  PenTool,
  Sparkles,
  Layers,
  Compass,
  Building2,
  BookOpen,
  HelpCircle,
  Award,
} from "lucide-react";

export default function WritingTask1ProcessMapPage() {
  const {
    activeExerciseId,
    setActiveExerciseId,
    currentExercise,
    activeMode,

    selectedStepIndex,
    setSelectedStepIndex,
    selectedHotspotId,
    setSelectedHotspotId,
    mapSliderPos,
    setMapSliderPos,
    isSideBySideView,
    setIsSideBySideView,

    essaySections,
    setEssaySection,
    fullEssayText,
    totalWordCount,

    timerSeconds,
    isTimerRunning,
    toggleTimer,
    resetTimer,

    passiveAnalysis,
    overviewValidation,

    isAssessmentModalOpen,
    setIsAssessmentModalOpen,
    isSubmitting,
    assessmentResult,
    submitEssayAndSaveToDb,
    saveVocabToMatrix,
    loadModelEssay,
    resetWorkspace,
  } = useProcessMapBuilder();

  const [isLexiconDrawerOpen, setIsLexiconDrawerOpen] = useState(false);

  // Helper to insert text into active/overview/body section
  const handleInsertSignpost = (text: string) => {
    // If overview is focused or body1 is empty, append to body1 or overview
    if (!essaySections.body1) {
      setEssaySection("body1", text);
    } else {
      setEssaySection("body1", essaySections.body1 + " " + text);
    }
  };

  const handleInsertSentence = (sentence: string) => {
    if (!essaySections.body1) {
      setEssaySection("body1", sentence);
    } else {
      setEssaySection("body1", essaySections.body1 + " " + sentence);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-extrabold border border-indigo-500/20">
              Giai Đoạn 2 • Kỹ Thuật Task 1 Phi Số Liệu
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-extrabold border border-emerald-500/20">
              Band 7.5 - 8.5+ Target
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Chuyên Sâu Task 1: Quy Trình (Process) & Bản Đồ Biến Đổi (Map Evolution)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-3xl leading-relaxed">
            Hóa giải 2 dạng bài gây bối rối nhất của Task 1. Luyện thể bị động học thuật cho quy trình công nghiệp, thể chủ động cho vòng đời sinh thái, và kéo thanh trượt Before/After bắt trọn từng biến đổi đô thị hóa.
          </p>
        </div>

        {currentExercise.spatialLexicon && currentExercise.spatialLexicon.length > 0 && (
          <button
            type="button"
            onClick={() => setIsLexiconDrawerOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/25 flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <BookOpen className="h-4 w-4" />
            <span>Cẩm Nang Từ Vựng Đô Thị</span>
          </button>
        )}
      </div>

      {/* Mode / Topic Switcher */}
      <PMModeSwitcher
        activeExerciseId={activeExerciseId}
        onSelectExercise={setActiveExerciseId}
      />

      {/* Main 2-Column Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Diagram / Map & Hotspots (Cols 1-6) */}
        <div className="lg:col-span-6 space-y-6">
          {activeMode === "process" ? (
            <InteractiveProcessPipeline
              exercise={currentExercise}
              selectedStepIndex={selectedStepIndex}
              onSelectStep={setSelectedStepIndex}
              onInsertSignpost={handleInsertSignpost}
            />
          ) : (
            <div className="space-y-6">
              <DualEpochMapSlider
                exercise={currentExercise}
                sliderPos={mapSliderPos}
                onSliderChange={setMapSliderPos}
                isSideBySideView={isSideBySideView}
                onToggleSideBySide={() => setIsSideBySideView((prev) => !prev)}
                selectedHotspotId={selectedHotspotId}
                onSelectHotspot={setSelectedHotspotId}
              />

              {currentExercise.mutationHotspots && currentExercise.mutationHotspots.length > 0 && (
                <MapMutationHotspotLayer
                  hotspots={currentExercise.mutationHotspots}
                  selectedHotspotId={selectedHotspotId}
                  onSelectHotspot={setSelectedHotspotId}
                  onInsertSentence={handleInsertSentence}
                />
              )}
            </div>
          )}
        </div>

        {/* Right Column: Live Analysis & 4-Paragraph Editor (Cols 7-12) */}
        <div className="lg:col-span-6 space-y-5">
          {/* Live Passive Ratio Meter */}
          <PassiveVoiceRatioGauge
            passiveAnalysis={passiveAnalysis}
            diagramType={currentExercise.diagramType}
          />

          {/* Live Overview Quality Validator */}
          <ProcessMapOverviewValidator
            validationResult={overviewValidation}
            diagramType={currentExercise.diagramType}
            modelOverviewText={currentExercise.modelOverview.text}
          />

          {/* Full 4-Paragraph Essay Editor */}
          <PMFullEssayWorkspace
            exercise={currentExercise}
            essaySections={essaySections}
            onSetEssaySection={setEssaySection}
            totalWordCount={totalWordCount}
            timerSeconds={timerSeconds}
            isTimerRunning={isTimerRunning}
            onToggleTimer={toggleTimer}
            onResetTimer={resetTimer}
            passiveAnalysis={passiveAnalysis}
            overviewValidation={overviewValidation}
            onOpenLexiconDrawer={() => setIsLexiconDrawerOpen(true)}
            onLoadModelEssay={loadModelEssay}
            onResetWorkspace={resetWorkspace}
            onSubmit={submitEssayAndSaveToDb}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>

      {/* Urban Lexicon Drawer Modal */}
      {currentExercise.spatialLexicon && (
        <UrbanLexiconPaletteDrawer
          isOpen={isLexiconDrawerOpen}
          onClose={() => setIsLexiconDrawerOpen(false)}
          lexicon={currentExercise.spatialLexicon}
          onInsertTerm={handleInsertSentence}
          onSaveToDb={saveVocabToMatrix}
        />
      )}

      {/* Result Assessment & Model Comparison Modal */}
      <PMResultAssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        assessment={assessmentResult}
        exercise={currentExercise}
        userFullEssay={fullEssayText}
        passiveAnalysis={passiveAnalysis}
        overviewValidation={overviewValidation}
        onSaveVocabToDb={saveVocabToMatrix}
      />
    </div>
  );
}
