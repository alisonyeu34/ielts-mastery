"use client";

import React from "react";
import Link from "next/link";
import {
  PenTool,
  ArrowLeft,
  Sparkles,
  Layers,
  BookOpen,
  GitBranch,
  RotateCcw,
} from "lucide-react";
import { usePEELSession } from "@/hooks/usePEELSession";
import { PromptDeconstructionCard } from "@/components/practice/writing-peel/PromptDeconstructionCard";
import { ThesisStatementBuilder } from "@/components/practice/writing-peel/ThesisStatementBuilder";
import { PEELSegmentInput } from "@/components/practice/writing-peel/PEELSegmentInput";
import { LogicChainVisualizer } from "@/components/practice/writing-peel/LogicChainVisualizer";
import { AcademicConnectorPalette } from "@/components/practice/writing-peel/AcademicConnectorPalette";
import { PEELParagraphPreview } from "@/components/practice/writing-peel/PEELParagraphPreview";
import { PEELAssessmentModal } from "@/components/practice/writing-peel/PEELAssessmentModal";
import { cn } from "@/lib/utils";

export default function WritingPEELPage() {
  const {
    prompts,
    currentPrompt,
    stage,
    deconstruction,
    intro,
    peelParts,
    wordStats,
    diagnostics,
    showAssessmentModal,
    setStage,
    setDeconstruction,
    setIntro,
    updatePEEL,
    insertConnector,
    selectPrompt,
    submitParagraph,
    resetSession,
    saveConnectorsToFSRS,
    setShowAssessmentModal,
  } = usePEELSession();

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto select-none">
      {/* Top Header & Topic Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <PenTool className="h-4 w-4" /> Giai Đoạn 2 (5.5 ➔ 6.5) • IELTS Writing Task 2 Specialist
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Cấu Trúc Đoạn PEEL & Luận Đề (PEEL Studio)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Bóc tách đề bài 3 bước • Luận đề dứt khoát tránh ngồi hàng rào • Xây dựng 4 mắt xích Point - Explain - Example - Link.
          </p>
        </div>

        {/* Prompt Selector & Back */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <select
            value={currentPrompt.id}
            onChange={(e) => selectPrompt(e.target.value)}
            className="text-xs font-bold px-3 py-2 rounded-xl bg-card border border-border text-foreground cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
          >
            {prompts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.typeLabelVi}: {p.topicTitleVi}
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

      {/* 4-Step Guided Progress Bar */}
      <div className="grid grid-cols-3 gap-2.5 text-xs select-none">
        <button
          type="button"
          onClick={() => setStage("prompt_analysis")}
          className={cn(
            "p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-1",
            stage === "prompt_analysis"
              ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/30 font-bold"
              : "border-border bg-card text-muted-foreground hover:text-foreground"
          )}
        >
          <span className="text-[10px] font-mono block">BƯỚC 1</span>
          <span className="truncate block">1. Giải Phẫu Đề Bài</span>
        </button>

        <button
          type="button"
          onClick={() => setStage("thesis_draft")}
          className={cn(
            "p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-1",
            stage === "thesis_draft"
              ? "border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400 ring-2 ring-purple-500/30 font-bold"
              : "border-border bg-card text-muted-foreground hover:text-foreground"
          )}
        >
          <span className="text-[10px] font-mono block">BƯỚC 2</span>
          <span className="truncate block">2. Viết Mở Bài & Luận Đề</span>
        </button>

        <button
          type="button"
          onClick={() => setStage("peel_writing")}
          className={cn(
            "p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-1",
            stage === "peel_writing" || stage === "completed"
              ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-500/30 font-bold"
              : "border-border bg-card text-muted-foreground hover:text-foreground"
          )}
        >
          <span className="text-[10px] font-mono block">BƯỚC 3</span>
          <span className="truncate block">3. Lắp Ghép Đoạn PEEL</span>
        </button>
      </div>

      {/* Main Split-View 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Guided Input Workspaces (7 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 space-y-5">
          {stage === "prompt_analysis" && (
            <PromptDeconstructionCard
              prompt={currentPrompt}
              inputs={deconstruction}
              onChangeInputs={setDeconstruction}
              onNextStage={() => setStage("thesis_draft")}
            />
          )}

          {stage === "thesis_draft" && (
            <ThesisStatementBuilder
              prompt={currentPrompt}
              intro={intro}
              hasNeutralThesis={diagnostics.hasNeutralThesis}
              onChangeIntro={setIntro}
              onPrevStage={() => setStage("prompt_analysis")}
              onNextStage={() => setStage("peel_writing")}
            />
          )}

          {(stage === "peel_writing" || stage === "completed") && (
            <PEELSegmentInput
              prompt={currentPrompt}
              peelParts={peelParts}
              wordStats={wordStats}
              diagnostics={diagnostics}
              onUpdatePEEL={updatePEEL}
            />
          )}
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Causal Domino Tree, Connector Palette, and Live Preview (5 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 space-y-5">
          <LogicChainVisualizer
            causalChain={currentPrompt.causalChain}
          />

          <AcademicConnectorPalette
            onInsertConnector={insertConnector}
            onSaveToFSRS={saveConnectorsToFSRS}
          />

          <PEELParagraphPreview
            peelParts={peelParts}
            wordStats={wordStats}
            onSubmit={submitParagraph}
          />
        </div>
      </div>

      {/* Assessment Modal */}
      <PEELAssessmentModal
        isOpen={showAssessmentModal}
        prompt={currentPrompt}
        wordStats={wordStats}
        diagnostics={diagnostics}
        onRestart={resetSession}
        onClose={() => setShowAssessmentModal(false)}
      />
    </div>
  );
}
