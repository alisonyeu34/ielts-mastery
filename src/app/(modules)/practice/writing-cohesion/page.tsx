"use client";

import React from "react";
import Link from "next/link";
import { useThemeRhemeSession } from "@/hooks/useThemeRhemeSession";
import { MOCK_COHESION_DRILLS } from "@/data/mockCohesionDrillsData";
import { ThemeRhemeVisualizer } from "@/components/practice/writing-cohesion/ThemeRhemeVisualizer";
import { MechanicalLinkerStripper } from "@/components/practice/writing-cohesion/MechanicalLinkerStripper";
import { CohesionDominoGraph } from "@/components/practice/writing-cohesion/CohesionDominoGraph";
import { NaturalCohesionPaletteDrawer } from "@/components/practice/writing-cohesion/NaturalCohesionPaletteDrawer";
import { CohesionScoreSummaryModal } from "@/components/practice/writing-cohesion/CohesionScoreSummaryModal";
import {
  ChevronRight,
  Home,
  BookOpen,
  Sparkles,
  Layers,
  Award,
  BookMarked,
  CheckCircle2,
} from "lucide-react";

export default function WritingCohesionStudioPage() {
  const {
    selectedDrill,
    handleSelectDrill,
    paragraphText,
    setParagraphText,
    analysis,
    detectedMechanicalLinkers,
    applyRewriteOption,
    loadBand8Model,
    resetToOriginalDraft,
    addNominalizationToVocab,
    saveCohesionLog,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isPaletteOpen,
    setIsPaletteOpen,
  } = useThemeRhemeSession();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-slate-200 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link
            href="/practice"
            className="hover:text-slate-200 transition-colors"
          >
            Practice Modules
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-purple-400 font-semibold">
            Theme-Rheme Progression & Cohesion Stripper (Step 73)
          </span>
        </div>

        {/* Page Title & Preset Drill Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-purple-500/20 to-amber-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>STEP 73/100: Writing Coherence & Cohesion Theme-Rheme Studio</span>
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                Phase 3 (6.5 &rarr; 7.5+)
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-100 tracking-tight">
              Xưởng Mạch Lạc Vi Hiến: Tiến Trình Đề - Thuyết & Triệt Tiêu Liên Từ Máy Móc
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Bẻ gãy bẫy liên từ máy móc (Firstly, Furthermore, In addition) giam hãm ở Band 6.0 CC. Làm chủ nghệ thuật liên kết vô hình đạt Band 8.0+ CC ("cohesion attracts no attention") bằng mô hình Đề - Thuyết SFL.
            </p>
          </div>

          {/* Drill Select Dropdown & Palette Trigger */}
          <div className="flex items-center gap-3 self-start lg:self-auto flex-wrap">
            <button
              onClick={() => setIsPaletteOpen(true)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg"
            >
              <BookMarked className="w-4 h-4" />
              <span>Palette Chuyển Ý C1/C2</span>
            </button>

            <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
              <BookOpen className="w-4 h-4 text-amber-400 ml-1.5" />
              <select
                value={selectedDrill.id}
                onChange={(e) => {
                  const d = MOCK_COHESION_DRILLS.find((item) => item.id === e.target.value);
                  if (d) handleSelectDrill(d);
                }}
                className="bg-transparent text-xs font-bold text-slate-200 focus:outline-none cursor-pointer pr-2"
              >
                {MOCK_COHESION_DRILLS.map((d) => (
                  <option key={d.id} value={d.id} className="bg-slate-900 text-slate-200">
                    {d.topicTitle} ({d.currentBandCC.split(" ")[0]})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 1. Theme-Rheme Visualizer */}
        <ThemeRhemeVisualizer
          paragraphText={paragraphText}
          setParagraphText={setParagraphText}
          analysis={analysis}
          onLoadBand8Model={loadBand8Model}
          onResetDraft={resetToOriginalDraft}
          onOpenPalette={() => setIsPaletteOpen(true)}
        />

        {/* 2. Mechanical Linker Stripper */}
        <MechanicalLinkerStripper
          detectedLinkers={detectedMechanicalLinkers}
          onApplyRewrite={applyRewriteOption}
          onAddToVocab={addNominalizationToVocab}
        />

        {/* 3. Cohesion Domino Graph */}
        <CohesionDominoGraph sentences={analysis.sentences} />

        {/* 4. Action Banner to Save Log & View Score */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Đánh giá tiêu chí Coherence & Cohesion:</div>
              <div className="text-base font-black text-slate-100">
                {analysis.bandEstimate} ({analysis.overallCohesionScore}/100)
              </div>
            </div>
          </div>

          <button
            onClick={saveCohesionLog}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Đánh Giá Mạch Lạc & Lưu Lịch Sử</span>
          </button>
        </div>

        {/* 5. Palette Drawer */}
        <NaturalCohesionPaletteDrawer
          isOpen={isPaletteOpen}
          onClose={() => setIsPaletteOpen(false)}
        />

        {/* 6. Cohesion Score Summary Modal */}
        <CohesionScoreSummaryModal
          isOpen={isSummaryModalOpen}
          onClose={() => setIsSummaryModalOpen(false)}
          analysis={analysis}
          onReset={() => {
            setIsSummaryModalOpen(false);
            resetToOriginalDraft();
          }}
        />
      </div>
    </div>
  );
}
