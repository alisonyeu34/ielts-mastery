"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Sparkles,
  Sliders,
  FolderOpen
} from "lucide-react";
import { useLexicalSpectrumSession } from "@/hooks/useLexicalSpectrumSession";
import { ConnotationSpectrumBar } from "@/components/practice/lexical-spectrum/ConnotationSpectrumBar";
import { AcademicRegisterGauge } from "@/components/practice/lexical-spectrum/AcademicRegisterGauge";
import { CollocationalAffinityGraph } from "@/components/practice/lexical-spectrum/CollocationalAffinityGraph";
import { AntiThesaurusHighlighter } from "@/components/practice/lexical-spectrum/AntiThesaurusHighlighter";
import { NaturalCollocationQuizArena } from "@/components/practice/lexical-spectrum/NaturalCollocationQuizArena";
import { LexicalSpectrumSummaryModal } from "@/components/practice/lexical-spectrum/LexicalSpectrumSummaryModal";

export default function LexicalSpectrumPage() {
  const {
    currentCluster,
    allClusters,
    selectedClusterId,
    handleSelectCluster,
    selectedWordScore,
    handleSelectSpectrumScore,
    activeWordNuance,
    userDraft,
    setUserDraft,
    thesaurusAudit,
    currentQuizItem,
    currentQuizIndex,
    totalQuizzes,
    userQuizAnswerIndex,
    isQuizAnswered,
    handleAnswerQuiz,
    handleNextQuiz,
    quizScoreStats,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isSaved,
    saveResultsToDatabase
  } = useLexicalSpectrumSession();

  const handleNextCluster = () => {
    const currentIndex = allClusters.findIndex((c) => c.id === selectedClusterId);
    const nextIndex = (currentIndex + 1) % allClusters.length;
    handleSelectCluster(allClusters[nextIndex].id);
  };

  const handleInsertCollocationToDraft = (phrase: string) => {
    setUserDraft((prev) => (prev ? prev + " " + phrase : phrase));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Top Header Navigation */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-indigo-950 border border-indigo-700/50 text-indigo-300">
                  Step 86/100
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Writing Task 2 Lexical Resource (Band 8.0 - 8.5+)
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
                Lexical Connotation Spectrum & Anti-Thesaurus Trap Studio
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSummaryModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all"
            >
              <Award className="w-3.5 h-3.5" />
              Tổng Kết & Lưu DB
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Cluster Selection Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Trường nghĩa khái niệm học thuật:</span>
              <h3 className="text-sm md:text-base font-bold text-white">
                {currentCluster.conceptName} ({currentCluster.academicDomain})
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400 whitespace-nowrap">Chọn cụm trường nghĩa:</label>
            <select
              value={selectedClusterId}
              onChange={(e) => handleSelectCluster(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {allClusters.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.conceptName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 5-Tier Connotation Spectrum Bar */}
        <ConnotationSpectrumBar
          cluster={currentCluster}
          selectedScore={selectedWordScore}
          onSelectScore={handleSelectSpectrumScore}
          activeWord={activeWordNuance}
        />

        {/* 2-Column Split: Gauge + Affinity (Left) & Anti-Thesaurus + Quiz Arena (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Academic Register & Collocational Network (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <AcademicRegisterGauge activeWord={activeWordNuance} />
            <CollocationalAffinityGraph
              activeWord={activeWordNuance}
              onInsertCollocation={handleInsertCollocationToDraft}
            />
          </div>

          {/* Right Column: Anti-Thesaurus Highlighter & Quiz Arena (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <AntiThesaurusHighlighter
              cluster={currentCluster}
              userDraft={userDraft}
              onDraftChange={setUserDraft}
              auditResult={thesaurusAudit}
            />

            <NaturalCollocationQuizArena
              quizItem={currentQuizItem}
              currentIndex={currentQuizIndex}
              totalCount={totalQuizzes}
              userAnswerIndex={userQuizAnswerIndex}
              isAnswered={isQuizAnswered}
              onSelectOption={handleAnswerQuiz}
              onNext={handleNextQuiz}
            />
          </div>
        </div>
      </div>

      {/* Summary Modal */}
      <LexicalSpectrumSummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        cluster={currentCluster}
        activeWord={activeWordNuance}
        quizScoreStats={quizScoreStats}
        thesaurusAccuracyScore={thesaurusAudit.lexicalAccuracyScore}
        isSaved={isSaved}
        onSave={saveResultsToDatabase}
        onNextCluster={handleNextCluster}
      />
    </div>
  );
}
