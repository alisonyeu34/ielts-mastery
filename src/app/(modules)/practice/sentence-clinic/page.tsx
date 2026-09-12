"use client";

import React from "react";
import Link from "next/link";
import {
  Wand2,
  Activity,
  Sparkles,
  Layers,
  CheckCircle2,
  Zap,
  ArrowRight,
  ShieldAlert,
  RotateCcw,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { useSentenceClinicSession } from "@/hooks/useSentenceClinicSession";
import { SurgeryCaseCard } from "@/components/practice/sentence-clinic/SurgeryCaseCard";
import { SentenceSurgeryWorkbench } from "@/components/practice/sentence-clinic/SentenceSurgeryWorkbench";
import { ParaphraseEngineDrill } from "@/components/practice/sentence-clinic/ParaphraseEngineDrill";
import { ClinicPostOpDiffModal } from "@/components/practice/sentence-clinic/ClinicPostOpDiffModal";
import { ClinicSummaryModal } from "@/components/practice/sentence-clinic/ClinicSummaryModal";
import { cn } from "@/lib/utils";

export default function SentenceClinicPage() {
  const {
    activeMode,
    setActiveMode,
    selectedCategory,
    setSelectedCategory,
    // Surgery
    currentSurgeryIndex,
    setCurrentSurgeryIndex,
    currentSurgeryCase,
    totalSurgeryCases,
    surgeryDraft,
    setSurgeryDraft,
    surgeryResult,
    handleEvaluateSurgery,
    handleSaveAndAdvanceSurgery,
    // Paraphrase
    currentParaphraseIndex,
    setCurrentParaphraseIndex,
    currentParaphraseDrill,
    totalParaphraseDrills,
    paraphraseDraft,
    setParaphraseDraft,
    paraphraseResult,
    handleEvaluateParaphrase,
    handleSaveAndAdvanceParaphrase,
    // Shared
    handleApplyCollocation,
    handleSyncCollocationToFSRS,
    isDiffModalOpen,
    setIsDiffModalOpen,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    surgeryHistory,
    errorBankLoggedCount,
    handleResetSession,
  } = useSentenceClinicSession();

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
            <Wand2 className="h-4 w-4" /> Module 2B / 5: Luyện Tập Vi Mô
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Phòng Khám Sửa Câu & Paraphrase Vi Mô
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Phẫu thuật dứt điểm 4 nhóm bệnh ngữ pháp Band 4.5 - 5.5 và rèn luyện 5 kỹ thuật biến đổi Paraphrase chuẩn Cambridge.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/vocab"
            className="px-4 py-2 rounded-xl border border-border bg-card hover:bg-secondary text-xs font-bold text-foreground flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            <span>Mở Sổ Từ Vựng FSRS</span>
          </Link>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-between p-1.5 rounded-2xl bg-secondary/50 border border-border">
        <div className="grid grid-cols-2 gap-1.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveMode("surgery")}
            className={cn(
              "px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer",
              activeMode === "surgery"
                ? "bg-card text-foreground shadow-sm border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Activity className="h-4 w-4 text-rose-500" />
            <span>Phẫu Thuật 4 Nhóm Bệnh Ngữ Pháp ({totalSurgeryCases})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode("paraphrase")}
            className={cn(
              "px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer",
              activeMode === "paraphrase"
                ? "bg-card text-foreground shadow-sm border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span>Xưởng 5 Kỹ Thuật Paraphrase ({totalParaphraseDrills})</span>
          </button>
        </div>
      </div>

      {/* MODE 1: SENTENCE SURGERY */}
      {activeMode === "surgery" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Category Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setCurrentSurgeryIndex(0);
              }}
              className={cn(
                "px-3.5 py-1.5 rounded-xl font-bold border transition-colors cursor-pointer shrink-0",
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              Tất Cả (20 Ca)
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("fragment");
                setCurrentSurgeryIndex(0);
              }}
              className={cn(
                "px-3.5 py-1.5 rounded-xl font-bold border transition-colors cursor-pointer shrink-0",
                selectedCategory === "fragment"
                  ? "bg-rose-500 text-white border-rose-500"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              Fragments (5 Ca)
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("comma_splice_runon");
                setCurrentSurgeryIndex(0);
              }}
              className={cn(
                "px-3.5 py-1.5 rounded-xl font-bold border transition-colors cursor-pointer shrink-0",
                selectedCategory === "comma_splice_runon"
                  ? "bg-amber-500 text-white border-amber-500"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              Comma Splice & Run-on (5 Ca)
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("subject_verb");
                setCurrentSurgeryIndex(0);
              }}
              className={cn(
                "px-3.5 py-1.5 rounded-xl font-bold border transition-colors cursor-pointer shrink-0",
                selectedCategory === "subject_verb"
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              Subject-Verb Discord (5 Ca)
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("spoken_tone");
                setCurrentSurgeryIndex(0);
              }}
              className={cn(
                "px-3.5 py-1.5 rounded-xl font-bold border transition-colors cursor-pointer shrink-0",
                selectedCategory === "spoken_tone"
                  ? "bg-purple-500 text-white border-purple-500"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              Spoken / Weak Style (5 Ca)
            </button>
          </div>

          {/* 1. Surgery Case Card */}
          <SurgeryCaseCard
            caseData={currentSurgeryCase}
            currentIndex={currentSurgeryIndex}
            totalCount={totalSurgeryCases}
          />

          {/* 2. Sentence Surgery Workbench */}
          <SentenceSurgeryWorkbench
            caseData={currentSurgeryCase}
            draft={surgeryDraft}
            onDraftChange={setSurgeryDraft}
            diagnosticResult={surgeryResult}
            onEvaluate={handleEvaluateSurgery}
            onSaveAndAdvance={handleSaveAndAdvanceSurgery}
            onApplyCollocation={handleApplyCollocation}
            onSyncCollocationToFSRS={handleSyncCollocationToFSRS}
            onOpenDiffModal={() => setIsDiffModalOpen(true)}
          />
        </div>
      )}

      {/* MODE 2: PARAPHRASE TRANSFORMATION DRILLS */}
      {activeMode === "paraphrase" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <ParaphraseEngineDrill
            drill={currentParaphraseDrill}
            currentIndex={currentParaphraseIndex}
            totalCount={totalParaphraseDrills}
            draft={paraphraseDraft}
            onDraftChange={setParaphraseDraft}
            result={paraphraseResult}
            onEvaluate={handleEvaluateParaphrase}
            onSaveAndAdvance={handleSaveAndAdvanceParaphrase}
          />
        </div>
      )}

      {/* Post-Op Diff Modal */}
      <ClinicPostOpDiffModal
        isOpen={isDiffModalOpen}
        onClose={() => setIsDiffModalOpen(false)}
        caseData={currentSurgeryCase}
        userRevisedDraft={surgeryDraft}
      />

      {/* Summary Modal */}
      <ClinicSummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        history={surgeryHistory}
        errorBankCount={errorBankLoggedCount}
        onRestart={handleResetSession}
      />
    </div>
  );
}
