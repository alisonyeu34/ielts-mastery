"use client";

import React from "react";
import Link from "next/link";
import {
  Wand2,
  ArrowLeft,
  BookOpen,
  Layers,
  Sparkles,
  Send,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { useAdvancedSyntaxSession } from "@/hooks/useAdvancedSyntaxSession";
import { SyntaxModeSwitcher } from "@/components/practice/advanced-syntax/SyntaxModeSwitcher";
import { SyntacticDensityGauge } from "@/components/practice/advanced-syntax/SyntacticDensityGauge";
import { NominalizationTransformer } from "@/components/practice/advanced-syntax/NominalizationTransformer";
import { AcademicInversionStudio } from "@/components/practice/advanced-syntax/AcademicInversionStudio";
import { CleftSentenceBuilder } from "@/components/practice/advanced-syntax/CleftSentenceBuilder";
import { SyntaxComparisonDrawer } from "@/components/practice/advanced-syntax/SyntaxComparisonDrawer";
import { SyntaxCheatSheetModal } from "@/components/practice/advanced-syntax/SyntaxCheatSheetModal";
import { SyntaxMasterySummaryModal } from "@/components/practice/advanced-syntax/SyntaxMasterySummaryModal";
import { cn } from "@/lib/utils";

export default function AdvancedSyntaxPage() {
  const {
    activeMode,
    currentExerciseIndex,
    filteredExercises,
    currentExercise,
    userAnswer,
    currentResult,
    sessionStats,
    showCheatSheetModal,
    showComparisonDrawer,
    showSummaryModal,
    handleModeChange,
    setCurrentExerciseIndex,
    setAnswer,
    checkCurrentAnswer,
    fillModelSolution,
    nextExercise,
    prevExercise,
    submitSession,
    saveWordFamiliesToFSRS,
    resetSession,
    setShowCheatSheetModal,
    setShowComparisonDrawer,
    setShowSummaryModal,
  } = useAdvancedSyntaxSession();

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            <Wand2 className="h-4 w-4" /> Giai Đoạn 3 (6.5 ➔ 7.5+) • IELTS Academic Syntax Mastery (Band 8.0+ GRA & LR)
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Cú Pháp Học Thuật Đỉnh Cao C1/C2
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Danh từ hóa (Nominalization) • Đảo ngữ học thuật (Academic Inversion) • Câu chẻ nhấn mạnh (Cleft Sentences).
          </p>
        </div>

        {/* Action Buttons & Back */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setShowCheatSheetModal(true)}
            className="px-3.5 py-2 rounded-xl border border-primary/30 bg-primary/10 text-primary font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Cẩm Nang Cú Pháp</span>
          </button>

          <button
            type="button"
            onClick={() => setShowComparisonDrawer(true)}
            className="px-3.5 py-2 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Layers className="h-3.5 w-3.5 text-indigo-600" />
            <span>So Sánh Đối Chiếu</span>
          </button>

          <Link
            href="/practice"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Về phòng luyện tập
          </Link>
        </div>
      </div>

      {/* 3 Syntax Mode Tabs Switcher */}
      <SyntaxModeSwitcher
        activeMode={activeMode}
        onChangeMode={handleModeChange}
      />

      {/* Main Split-View 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Active Mode Transformation Studio (7 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 space-y-5">
          {activeMode === "nominalization" && (
            <NominalizationTransformer
              exercise={currentExercise}
              exerciseIndex={currentExerciseIndex}
              totalExercises={filteredExercises.length}
              userAnswer={userAnswer}
              result={currentResult}
              onUpdateAnswer={setAnswer}
              onCheckAnswer={checkCurrentAnswer}
              onFillModel={fillModelSolution}
              onNext={nextExercise}
              onPrev={prevExercise}
            />
          )}

          {activeMode === "inversion" && (
            <AcademicInversionStudio
              exercise={currentExercise}
              exerciseIndex={currentExerciseIndex}
              totalExercises={filteredExercises.length}
              userAnswer={userAnswer}
              result={currentResult}
              onUpdateAnswer={setAnswer}
              onCheckAnswer={checkCurrentAnswer}
              onFillModel={fillModelSolution}
              onNext={nextExercise}
              onPrev={prevExercise}
            />
          )}

          {activeMode === "cleft" && (
            <CleftSentenceBuilder
              exercise={currentExercise}
              exerciseIndex={currentExerciseIndex}
              totalExercises={filteredExercises.length}
              userAnswer={userAnswer}
              result={currentResult}
              onUpdateAnswer={setAnswer}
              onCheckAnswer={checkCurrentAnswer}
              onFillModel={fillModelSolution}
              onNext={nextExercise}
              onPrev={prevExercise}
            />
          )}
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Syntactic Density Gauge & Exercise Navigator (5 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 space-y-5">
          <SyntacticDensityGauge
            score={currentResult ? currentResult.syntacticDensity : 45}
          />

          {/* Exercise Index Selector Panel */}
          <div className="rounded-3xl border border-border bg-card p-5 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between border-b border-border/70 pb-2.5">
              <span className="font-bold text-xs text-foreground">
                Tiến Trình Chế Độ ({sessionStats.completedCount}/{sessionStats.totalCount})
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">
                Đúng: {sessionStats.correctCount} câu
              </span>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {filteredExercises.map((ex, idx) => {
                const isCurrent = idx === currentExerciseIndex;

                return (
                  <button
                    key={ex.id}
                    type="button"
                    onClick={() => setCurrentExerciseIndex(idx)}
                    className={cn(
                      "p-2.5 rounded-xl border font-mono font-bold text-xs transition-all cursor-pointer",
                      isCurrent
                        ? "border-primary bg-primary text-primary-foreground shadow-xs scale-105"
                        : "border-border bg-secondary/30 text-foreground hover:bg-secondary"
                    )}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={submitSession}
              className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer pt-2"
            >
              <Send className="h-4 w-4" />
              <span>Nộp Bài & Tổng Kết Cú Pháp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cheat Sheet Modal */}
      <SyntaxCheatSheetModal
        isOpen={showCheatSheetModal}
        onClose={() => setShowCheatSheetModal(false)}
      />

      {/* Side-by-side Comparison Drawer */}
      <SyntaxComparisonDrawer
        isOpen={showComparisonDrawer}
        exercise={currentExercise}
        onSaveWordFamilies={saveWordFamiliesToFSRS}
        onClose={() => setShowComparisonDrawer(false)}
      />

      {/* Summary Report Modal */}
      <SyntaxMasterySummaryModal
        isOpen={showSummaryModal}
        stats={sessionStats}
        exercises={filteredExercises}
        results={{}}
        onRestart={resetSession}
        onClose={() => setShowSummaryModal(false)}
      />
    </div>
  );
}
