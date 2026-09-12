"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  Scale,
  RotateCcw,
  BookOpen,
  FileText,
  HelpCircle,
} from "lucide-react";
import { useToulminSession } from "@/hooks/useToulminSession";
import { ToulminModularCanvas } from "@/components/practice/writing-toulmin/ToulminModularCanvas";
import { CounterRebuttalLever } from "@/components/practice/writing-toulmin/CounterRebuttalLever";
import { DialecticalBalanceMeter } from "@/components/practice/writing-toulmin/DialecticalBalanceMeter";
import { LogicalFallacyAlert } from "@/components/practice/writing-toulmin/LogicalFallacyAlert";
import { AcademicRebuttalPalette } from "@/components/practice/writing-toulmin/AcademicRebuttalPalette";
import { ToulminParagraphAssembler } from "@/components/practice/writing-toulmin/ToulminParagraphAssembler";
import { ToulminAssessmentModal } from "@/components/practice/writing-toulmin/ToulminAssessmentModal";
import { cn } from "@/lib/utils";

export default function WritingToulminPage() {
  const {
    topics,
    currentTopic,
    toulminParts,
    activeBlock,
    evaluation,
    showAssessmentModal,
    setActiveBlock,
    selectTopic,
    updateBlock,
    insertPhrase,
    applyOppositionRebuttal,
    loadSampleToulmin,
    submitParagraph,
    resetSession,
    saveRebuttalPhrasesToFSRS,
    setShowAssessmentModal,
  } = useToulminSession();

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto select-none">
      {/* Top Header & Topic Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            <Scale className="h-4 w-4" /> Giai Đoạn 3 (6.5 ➔ 7.5+) • IELTS Writing Task 2 Toulmin Argumentation Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Lập Luận Đa Chiều Mô Hình Toulmin (Band 7.5 - 8.0+)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Khung 6 khối Claim - Data - Warrant - Backing - Counter - Rebuttal • Bẻ gãy tư duy phiến diện • Radar quét ngụy biện logic.
          </p>
        </div>

        {/* Topic Selector & Back */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <select
            value={currentTopic.id}
            onChange={(e) => selectTopic(e.target.value)}
            className="text-xs font-bold px-3 py-2 rounded-xl bg-card border border-border text-foreground cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
          >
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.topicTitleVi}
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

      {/* Topic Prompt & Collocations Banner */}
      <div className="p-5 rounded-3xl bg-secondary/30 border border-border space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-2.5">
          <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">
            Đề Bài Tranh Luận Học Thuật Phân Cực:
          </span>
          <span className="text-xs font-mono font-bold text-muted-foreground">
            Mục Tiêu: Band 8.0+ Task Response
          </span>
        </div>

        <p className="text-sm sm:text-base font-black text-foreground font-serif leading-relaxed">
          "{currentTopic.promptText}"
        </p>

        <p className="text-xs text-muted-foreground leading-relaxed">
          💡 <strong>Bối cảnh tranh luận:</strong> {currentTopic.backgroundContextVi}
        </p>

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10px] font-mono text-muted-foreground">Collocations C1 gợi ý:</span>
          {currentTopic.scaffoldingCollocations.map((col, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-card border border-border text-foreground"
            >
              {col}
            </span>
          ))}
        </div>
      </div>

      {/* Main Split-View 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Toulmin Modular Canvas & Counter-Rebuttal Lever (7 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 space-y-6">
          <ToulminModularCanvas
            topic={currentTopic}
            parts={toulminParts}
            activeBlock={activeBlock}
            wordCountByBlock={evaluation.wordCountByBlock}
            onSelectBlock={setActiveBlock}
            onUpdateBlock={updateBlock}
            onLoadSample={loadSampleToulmin}
          />

          <CounterRebuttalLever
            oppositionBank={currentTopic.oppositionBank}
            counterText={toulminParts.counterArgument}
            rebuttalText={toulminParts.rebuttal}
            onApplyOpposition={applyOppositionRebuttal}
          />
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Dialectical Meter, Fallacy Radar, Palette & Preview (5 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 space-y-5">
          <DialecticalBalanceMeter
            evaluation={evaluation}
          />

          <LogicalFallacyAlert
            fallacies={evaluation.fallacies}
          />

          <AcademicRebuttalPalette
            onInsertPhrase={insertPhrase}
            onSaveToFSRS={saveRebuttalPhrasesToFSRS}
          />

          <ToulminParagraphAssembler
            parts={toulminParts}
            totalWordCount={evaluation.totalWordCount}
            onSubmit={submitParagraph}
          />
        </div>
      </div>

      {/* Assessment Modal */}
      <ToulminAssessmentModal
        isOpen={showAssessmentModal}
        topic={currentTopic}
        evaluation={evaluation}
        onRestart={resetSession}
        onClose={() => setShowAssessmentModal(false)}
      />
    </div>
  );
}
