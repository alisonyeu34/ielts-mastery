"use client";

import React from "react";
import Link from "next/link";
import {
  PenTool,
  ArrowLeft,
  Sparkles,
  BarChart3,
  TrendingUp,
  Filter,
  Layers,
  FileText,
  RotateCcw,
} from "lucide-react";
import { MOCK_TASK1_PROMPTS } from "@/data/mockTask1Data";
import { useTask1Builder } from "@/hooks/useTask1Builder";
import { InteractiveChartViewer } from "@/components/practice/writing-task1/InteractiveChartViewer";
import { KeyFeatureSelector } from "@/components/practice/writing-task1/KeyFeatureSelector";
import { OverviewBuilderCard } from "@/components/practice/writing-task1/OverviewBuilderCard";
import { ComparisonMatrixCard } from "@/components/practice/writing-task1/ComparisonMatrixCard";
import { TrendSyntaxTrainer } from "@/components/practice/writing-task1/TrendSyntaxTrainer";
import { Task1FullEssayPreview } from "@/components/practice/writing-task1/Task1FullEssayPreview";
import { Task1ResultSummaryModal } from "@/components/practice/writing-task1/Task1ResultSummaryModal";
import { cn } from "@/lib/utils";

export default function WritingTask1Page() {
  const {
    selectedPromptId,
    activePrompt,
    spotlightActive,
    activeTab,
    selectedKeyFeatureIds,
    isKeyFeaturesEvaluated,
    introText,
    overviewText,
    body1Text,
    body2Text,
    trendAnswers,
    prepAnswers,
    showResultModal,
    overviewValidation,
    introWords,
    overviewWords,
    body1Words,
    body2Words,
    totalWords,
    setSelectedPromptId,
    setSpotlightActive,
    setActiveTab,
    toggleKeyFeature,
    evaluateKeyFeatures,
    setIntroText,
    setOverviewText,
    setBody1Text,
    setBody2Text,
    setTrendAnswers,
    setPrepAnswers,
    loadModelEssay,
    submitTask1Essay,
    resetTask1,
    setShowResultModal,
  } = useTask1Builder();

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto select-none">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
            <PenTool className="h-4 w-4" /> Giai Đoạn 2 (5.5 ➔ 6.5) • Academic Writing Task 1 Specialist
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Lọc Key Features, Máy Tạo Overview & Cú Pháp Xu Hướng Band 7.5+
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Triệt tiêu bẫy liệt kê số liệu dàn trải • Huấn luyện công thức tổng quan rào đón & cấu trúc so sánh học thuật.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Prompt Selector Dropdown */}
          <select
            value={selectedPromptId}
            onChange={(e) => setSelectedPromptId(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer shadow-2xs"
          >
            {MOCK_TASK1_PROMPTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>

          <Link
            href="/practice"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Về phòng luyện tập
          </Link>
        </div>
      </div>

      {/* Main 2-Column Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Chart Viewer & Comparison Matrix (5 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 space-y-6">
          <InteractiveChartViewer
            prompt={activePrompt}
            spotlightActive={spotlightActive}
            onToggleSpotlight={() => setSpotlightActive(!spotlightActive)}
          />

          <ComparisonMatrixCard />
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: 4-Step Interactive Builder (7 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 space-y-4">
          {/* Step Tab Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-secondary/40 border border-border text-xs overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("key_features")}
              className={cn(
                "flex-1 py-2 px-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap",
                activeTab === "key_features"
                  ? "bg-card text-foreground shadow-2xs border border-border"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Filter className="h-3.5 w-3.5 text-primary" />
              <span>1. Key Features</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={cn(
                "flex-1 py-2 px-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap",
                activeTab === "overview"
                  ? "bg-card text-foreground shadow-2xs border border-border"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Sparkles className="h-3.5 w-3.5 text-purple-500" />
              <span>2. Overview</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("trend_drills")}
              className={cn(
                "flex-1 py-2 px-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap",
                activeTab === "trend_drills"
                  ? "bg-card text-foreground shadow-2xs border border-border"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              <span>3. Cú Pháp & Giới Từ</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("full_essay")}
              className={cn(
                "flex-1 py-2 px-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap",
                activeTab === "full_essay"
                  ? "bg-card text-foreground shadow-2xs border border-border"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <FileText className="h-3.5 w-3.5 text-cyan-500" />
              <span>4. Ghép Toàn Bài</span>
            </button>
          </div>

          {/* Active Tab Views */}
          {activeTab === "key_features" && (
            <div className="animate-in fade-in duration-200">
              <KeyFeatureSelector
                features={activePrompt.keyFeatures}
                selectedIds={selectedKeyFeatureIds}
                isEvaluated={isKeyFeaturesEvaluated}
                onToggleFeature={toggleKeyFeature}
                onEvaluate={evaluateKeyFeatures}
              />
            </div>
          )}

          {activeTab === "overview" && (
            <div className="animate-in fade-in duration-200">
              <OverviewBuilderCard
                overviewText={overviewText}
                wordCount={overviewWords}
                validation={overviewValidation}
                modelOverview={activePrompt.modelOverview}
                onChangeOverview={setOverviewText}
              />
            </div>
          )}

          {activeTab === "trend_drills" && (
            <div className="animate-in fade-in duration-200">
              <TrendSyntaxTrainer
                trendExercises={activePrompt.trendExercises}
                prepositionExercises={activePrompt.prepositionExercises}
                trendAnswers={trendAnswers}
                prepAnswers={prepAnswers}
                onSetTrendAnswer={(id, val) =>
                  setTrendAnswers((prev) => ({ ...prev, [id]: val }))
                }
                onSetPrepAnswer={(id, val) =>
                  setPrepAnswers((prev) => ({ ...prev, [id]: val }))
                }
              />
            </div>
          )}

          {activeTab === "full_essay" && (
            <div className="animate-in fade-in duration-200">
              <Task1FullEssayPreview
                introText={introText}
                overviewText={overviewText}
                body1Text={body1Text}
                body2Text={body2Text}
                introWords={introWords}
                overviewWords={overviewWords}
                body1Words={body1Words}
                body2Words={body2Words}
                totalWords={totalWords}
                overviewValidation={overviewValidation}
                modelFullEssay={activePrompt.modelFullEssay}
                onChangeIntro={setIntroText}
                onChangeOverview={setOverviewText}
                onChangeBody1={setBody1Text}
                onChangeBody2={setBody2Text}
                onLoadModel={loadModelEssay}
                onSubmitEssay={submitTask1Essay}
              />
            </div>
          )}
        </div>
      </div>

      {/* Summary Evaluation Modal */}
      <Task1ResultSummaryModal
        isOpen={showResultModal}
        totalWords={totalWords}
        overviewValidation={overviewValidation}
        selectedKeyFeaturesCount={selectedKeyFeatureIds.length}
        onRestart={resetTask1}
        onClose={() => setShowResultModal(false)}
      />
    </div>
  );
}
