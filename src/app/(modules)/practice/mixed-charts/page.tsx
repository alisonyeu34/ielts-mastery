"use client";

import React, { useState } from "react";
import { useMixedChartSession } from "@/hooks/useMixedChartSession";
import { DualChartViewer } from "@/components/practice/mixed-charts/DualChartViewer";
import { AsymmetricLassoClustering } from "@/components/practice/mixed-charts/AsymmetricLassoClustering";
import { SynthesisRatioMeter } from "@/components/practice/mixed-charts/SynthesisRatioMeter";
import { HighOrderComparisonPalette } from "@/components/practice/mixed-charts/HighOrderComparisonPalette";
import { MixedChartEssayEditor } from "@/components/practice/mixed-charts/MixedChartEssayEditor";
import { MixedChartEvaluationModal } from "@/components/practice/mixed-charts/MixedChartEvaluationModal";
import {
  Layers,
  Sparkles,
  BarChart2,
  TrendingUp,
  HelpCircle,
  Award,
  ChevronRight,
  BookOpen
} from "lucide-react";
import Link from "next/link";

export default function MixedChartsPage() {
  const {
    currentTask,
    allTasks,
    selectedTaskId,
    handleSelectTask,
    sections,
    updateSection,
    validationResult,
    activeClusterId,
    setActiveClusterId,
    selectedChartPoints,
    togglePointSelection,
    timerSeconds,
    isTimerRunning,
    setIsTimerRunning,
    isEvaluationOpen,
    setIsEvaluationOpen,
    isSaved,
    insertModelTemplate,
    saveEvaluationToDatabase
  } = useMixedChartSession();

  const [activePhraseToInsert, setActivePhraseToInsert] = useState<string | null>(null);

  const handleApplyClusterPrompt = (observation: string) => {
    updateSection("body1", (sections.body1 ? sections.body1 + "\n\n" : "") + observation);
  };

  const handleInsertPhrase = (phrase: string) => {
    setActivePhraseToInsert(phrase);
    updateSection("overview", (sections.overview ? sections.overview + " " : "") + phrase);
  };

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
            Step 77: Complex Multi-Graph Synthesis Studio
          </span>
        </div>

        {/* Task Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Chọn Bộ Đề:</span>
          <select
            value={selectedTaskId}
            onChange={(e) => handleSelectTask(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
          >
            {allTasks.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title} ({t.difficulty})
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
            <span>IELTS Writing Task 1 &bull; Asymmetric Data Clustering (Step 77/100)</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Xưởng Tổng Hợp &amp; So Sánh Số Liệu Phức Tạp Biểu Đồ Đa Trục
          </h1>

          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            Triệt tiêu hoàn toàn <strong>bẫy liệt kê số liệu tách biệt (Isolated Data Dumping)</strong>.
            Luyện phương pháp nhóm dữ liệu bất đối xứng theo tương quan (Correlation Lasso), xây dựng
            <strong> Dual Overview 3 câu chuẩn Band 8.0+</strong>, và đạt tỷ lệ câu tổng hợp chéo &ge; 40%.
          </p>
        </div>
      </div>

      {/* Task Prompt Overview Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
          <BookOpen className="w-4 h-4" />
          <span>IELTS Task 1 Academic Prompt</span>
        </div>
        <p className="text-sm text-slate-200 whitespace-pre-line leading-relaxed font-sans">
          {currentTask.prompt}
        </p>
      </div>

      {/* Dual Chart Viewer (Chart 1 & Chart 2) */}
      <DualChartViewer
        chart1={currentTask.chart1}
        chart2={currentTask.chart2}
        selectedPoints={selectedChartPoints}
        onTogglePoint={togglePointSelection}
      />

      {/* Correlation Lasso Clustering Tool */}
      <AsymmetricLassoClustering
        clusters={currentTask.clusters}
        activeClusterId={activeClusterId}
        onSelectCluster={setActiveClusterId}
        onApplyClusterPrompt={handleApplyClusterPrompt}
      />

      {/* Synthesis Ratio Gauge Meter */}
      <SynthesisRatioMeter validationResult={validationResult} />

      {/* Higher-Order Comparative Palette */}
      <HighOrderComparisonPalette onInsertPhrase={handleInsertPhrase} />

      {/* 4-Paragraph Task 1 Essay Editor */}
      <MixedChartEssayEditor
        sections={sections}
        onUpdateSection={updateSection}
        validationResult={validationResult}
        timerSeconds={timerSeconds}
        isTimerRunning={isTimerRunning}
        onToggleTimer={() => setIsTimerRunning(!isTimerRunning)}
        onInsertModelTemplate={insertModelTemplate}
        onOpenEvaluation={() => setIsEvaluationOpen(true)}
        activePhraseToInsert={activePhraseToInsert}
      />

      {/* Evaluation Diagnostic Modal */}
      <MixedChartEvaluationModal
        isOpen={isEvaluationOpen}
        onClose={() => setIsEvaluationOpen(false)}
        validationResult={validationResult}
        onSaveToDatabase={saveEvaluationToDatabase}
        isSaved={isSaved}
      />
    </div>
  );
}
