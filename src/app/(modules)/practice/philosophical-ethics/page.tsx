"use client";

import React from "react";
import { usePhilosophicalEthicsSession } from "@/hooks/usePhilosophicalEthicsSession";
import { PhilosophicalLensSwitcher } from "@/components/practice/philosophical-ethics/PhilosophicalLensSwitcher";
import { MoralClicheStripper } from "@/components/practice/philosophical-ethics/MoralClicheStripper";
import { MoralArgumentWeaver } from "@/components/practice/philosophical-ethics/MoralArgumentWeaver";
import { DistributiveJusticeSimulator } from "@/components/practice/philosophical-ethics/DistributiveJusticeSimulator";
import { EthicsEvaluationSummaryModal } from "@/components/practice/philosophical-ethics/EthicsEvaluationSummaryModal";
import {
  Scale,
  Sparkles,
  BookOpen,
  ChevronRight,
  Brain,
  ShieldCheck,
  Award
} from "lucide-react";
import Link from "next/link";

export default function PhilosophicalEthicsPage() {
  const {
    currentTopic,
    allTopics,
    selectedTopicId,
    handleSelectTopic,
    activeLens,
    setActiveLens,
    userDraft,
    setUserDraft,
    handleInsertLexis,
    handleReplacePlatitude,
    insertModelSynthesis,
    selectedVeilOptionId,
    handleSelectVeilOption,
    evaluationResult,
    isEvaluationModalOpen,
    setIsEvaluationModalOpen,
    isSaved,
    saveEvaluationToDatabase
  } = usePhilosophicalEthicsSession();

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
            Step 79: Normative Ethics &amp; Socio-Philosophical Studio
          </span>
        </div>

        {/* Topic Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Chọn Chủ Đề Triết Học:</span>
          <select
            value={selectedTopicId}
            onChange={(e) => handleSelectTopic(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
          >
            {allTopics.map((t) => (
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
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>IELTS Writing Task 2 &amp; Speaking Part 3 &bull; Socio-Philosophical Logic (Step 79/100)</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Xưởng Biện Luận Triết Lý Đạo Đức Học &amp; Khế Ước Xã Hội
          </h1>

          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            Triệt tiêu <strong>bẫy khẩu hiệu cảm tính sáo rỗng (Moral Platitudes)</strong>.
            Luyện phương pháp phối hợp <strong>3 lăng kính triết học chuẩn mực</strong> (Vị lợi Utilitarianism,
            Nghĩa vụ luận Kantian Deontology, và Khế ước Xã hội Rawlsian Justice) để kiến tạo luận điểm Task Response Band 8.5+.
          </p>
        </div>
      </div>

      {/* Topic Prompt Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <BookOpen className="w-4 h-4" />
            <span>Đề Bài Task 2 / Speaking Part 3</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 italic">
            {currentTopic.normativeContext}
          </span>
        </div>
        <p className="text-sm text-slate-200 whitespace-pre-line leading-relaxed font-sans">
          {currentTopic.prompt}
        </p>
      </div>

      {/* 3 Normative Lenses Switcher */}
      <PhilosophicalLensSwitcher
        topic={currentTopic}
        activeLens={activeLens}
        onSelectLens={setActiveLens}
        onInsertPhrase={handleInsertLexis}
      />

      {/* Moral Platitudes Stripper */}
      <MoralClicheStripper
        platitudes={evaluationResult.platitudesDetected}
        onReplacePlatitude={handleReplacePlatitude}
      />

      {/* Veil of Ignorance Simulator */}
      <DistributiveJusticeSimulator
        scenario={currentTopic.veilOfIgnoranceScenario}
        selectedOptionId={selectedVeilOptionId}
        onSelectOption={handleSelectVeilOption}
      />

      {/* Main Argument Weaver Editor */}
      <MoralArgumentWeaver
        userDraft={userDraft}
        onChangeDraft={setUserDraft}
        evaluationResult={evaluationResult}
        onInsertModelSynthesis={insertModelSynthesis}
        onOpenEvaluation={() => setIsEvaluationModalOpen(true)}
      />

      {/* Evaluation Diagnostic Modal */}
      <EthicsEvaluationSummaryModal
        isOpen={isEvaluationModalOpen}
        onClose={() => setIsEvaluationModalOpen(false)}
        evaluationResult={evaluationResult}
        onSaveToDatabase={saveEvaluationToDatabase}
        isSaved={isSaved}
      />
    </div>
  );
}
