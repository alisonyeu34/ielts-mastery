"use client";

import React from "react";
import { useSyntacticEngineeringSession } from "@/hooks/useSyntacticEngineeringSession";
import { SyntacticWorkbench } from "@/components/practice/syntactic-engineering/SyntacticWorkbench";
import { InformationDensityGauge } from "@/components/practice/syntactic-engineering/InformationDensityGauge";
import { NominalizationPaletteDrawer } from "@/components/practice/syntactic-engineering/NominalizationPaletteDrawer";
import { InversionFormulaCard } from "@/components/practice/syntactic-engineering/InversionFormulaCard";
import { SyntacticUpgradeSummaryModal } from "@/components/practice/syntactic-engineering/SyntacticUpgradeSummaryModal";
import {
  Sparkles,
  Layers,
  ChevronRight,
  BookOpen,
  PenTool,
  Brain
} from "lucide-react";
import Link from "next/link";

export default function SyntacticEngineeringPage() {
  const {
    currentDrill,
    allDrills,
    selectedDrillId,
    handleSelectDrill,
    activeMode,
    setActiveMode,
    userDraft,
    setUserDraft,
    handleInsertPhrase,
    insertTier3Model,
    analysisReport,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isSaved,
    saveEvaluationToDatabase
  } = useSyntacticEngineeringSession();

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
          <span className="text-indigo-400 font-semibold">
            Step 81: C1/C2 Syntactic Engineering Studio
          </span>
        </div>

        {/* Drill Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Chọn Câu Luyện Tập:</span>
          <select
            value={selectedDrillId}
            onChange={(e) => handleSelectDrill(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
          >
            {allDrills.map((d) => (
              <option key={d.id} value={d.id}>
                {d.topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 border border-indigo-500/30 p-6 md:p-8 shadow-2xl">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>IELTS Writing Task 2 &bull; Syntactic Engineering &amp; IDI (Step 81/100)</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Xưởng Kiến Trúc Ngữ Pháp Đỉnh Cao C1/C2
          </h1>

          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            Triệt tiêu <strong>thói quen viết câu lỏng lẻo mang hơi hướng văn nói (Spoken-Style Looseness)</strong>.
            Làm chủ <strong>3 vũ khí cú pháp Band 8.5+</strong>: Danh từ hóa nén thông tin (*Nominalization*),
            Đảo ngữ học thuật (*Inversion*), và Câu chẻ nhấn mạnh (*Cleft Sentences*) để đẩy chỉ số mật độ thông tin &ge; 55%.
          </p>
        </div>
      </div>

      {/* Information Density Gauge Meter */}
      <InformationDensityGauge analysisReport={analysisReport} />

      {/* Main Syntactic Workbench */}
      <SyntacticWorkbench
        drill={currentDrill}
        activeMode={activeMode}
        onSelectMode={setActiveMode}
        userDraft={userDraft}
        onChangeDraft={setUserDraft}
        analysisReport={analysisReport}
        onInsertTier3Model={insertTier3Model}
        onOpenEvaluation={() => setIsSummaryModalOpen(true)}
      />

      {/* Nominalization Palette & Inversion Formula Cards */}
      <NominalizationPaletteDrawer onInsertPhrase={handleInsertPhrase} />
      <InversionFormulaCard onInsertTemplate={handleInsertPhrase} />

      {/* Summary Diagnostics Modal */}
      <SyntacticUpgradeSummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        analysisReport={analysisReport}
        onSaveToDatabase={saveEvaluationToDatabase}
        isSaved={isSaved}
      />
    </div>
  );
}
