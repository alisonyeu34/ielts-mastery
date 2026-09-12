"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Cpu,
  Sparkles,
  Layers,
  FolderOpen
} from "lucide-react";
import { useAdvancedToulminSession } from "@/hooks/useAdvancedToulminSession";
import { ToulminCircuitBoard } from "@/components/practice/toulmin-argument/ToulminCircuitBoard";
import { ToulminLogicValidator } from "@/components/practice/toulmin-argument/ToulminLogicValidator";
import { LogicToProseSynthesizer } from "@/components/practice/toulmin-argument/LogicToProseSynthesizer";
import { PEELvsToulminModal } from "@/components/practice/toulmin-argument/PEELvsToulminModal";
import { ToulminPaletteDrawer } from "@/components/practice/toulmin-argument/ToulminPaletteDrawer";
import { ToulminSummaryModal } from "@/components/practice/toulmin-argument/ToulminSummaryModal";

export default function ToulminArgumentPage() {
  const {
    currentTopic,
    allTopics,
    selectedTopicId,
    handleSelectTopic,
    blocks,
    handleUpdateBlock,
    handleInsertConnector,
    handleResetToTemplate,
    validationReport,
    synthesizedProse,
    isPEELModalOpen,
    setIsPEELModalOpen,
    isDrawerOpen,
    setIsDrawerOpen,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isSaved,
    saveResultsToDatabase
  } = useAdvancedToulminSession();

  const handleNextTopic = () => {
    const currentIndex = allTopics.findIndex((t) => t.id === selectedTopicId);
    const nextIndex = (currentIndex + 1) % allTopics.length;
    handleSelectTopic(allTopics[nextIndex].id);
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
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-blue-950 border border-blue-700/50 text-blue-300">
                  Step 87/100
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Writing Task 2 & Speaking Part 3 (Band 8.0 - 8.5+)
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
                Advanced Toulmin Argumentation & Rebuttal Synthesizer Studio
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Target: Task Response 8.5+
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Topic Selector Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Chủ đề nghị luận học thuật:</span>
              <h3 className="text-sm md:text-base font-bold text-white">
                {currentTopic.topicTitle} ({currentTopic.academicDomain})
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400 whitespace-nowrap">Chọn chủ đề:</label>
            <select
              value={selectedTopicId}
              onChange={(e) => handleSelectTopic(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {allTopics.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.topicTitle}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Prompt Card */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
          <BookOpen className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-serif">
            <strong>Đề bài:</strong> {currentTopic.prompt}
          </p>
        </div>

        {/* 6-Block Toulmin Circuit Board */}
        <ToulminCircuitBoard
          blocks={blocks}
          onUpdateBlock={handleUpdateBlock}
          onReset={handleResetToTemplate}
          onOpenDrawer={() => setIsDrawerOpen(true)}
        />

        {/* 2-Column Split: Logic Validator (Left) & Prose Synthesizer (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6">
            <ToulminLogicValidator
              report={validationReport}
              onOpenPEELModal={() => setIsPEELModalOpen(true)}
            />
          </div>

          <div className="lg:col-span-6">
            <LogicToProseSynthesizer
              synthesizedProse={synthesizedProse}
              onOpenSummary={() => setIsSummaryModalOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* PEEL vs Toulmin Comparator Modal */}
      <PEELvsToulminModal
        isOpen={isPEELModalOpen}
        onClose={() => setIsPEELModalOpen(false)}
        topic={currentTopic}
      />

      {/* Palette Drawer */}
      <ToulminPaletteDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        topic={currentTopic}
        onInsertConnector={handleInsertConnector}
      />

      {/* Diagnostic Summary Modal */}
      <ToulminSummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        topic={currentTopic}
        report={validationReport}
        synthesizedProse={synthesizedProse}
        isSaved={isSaved}
        onSave={saveResultsToDatabase}
        onNextTopic={handleNextTopic}
      />
    </div>
  );
}
