"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  BookOpen,
  GitGraph,
  Sparkles,
  Layers,
  HelpCircle,
  FolderOpen
} from "lucide-react";
import { useSyntacticParsingSession } from "@/hooks/useSyntacticParsingSession";
import { SyntacticTreeCanvas } from "@/components/practice/syntactic-parsing/SyntacticTreeCanvas";
import { CoreSkeletonStripper } from "@/components/practice/syntactic-parsing/CoreSkeletonStripper";
import { GardenPathPuzzleCard } from "@/components/practice/syntactic-parsing/GardenPathPuzzleCard";
import { ClauseHierarchyBreadcrumbs } from "@/components/practice/syntactic-parsing/ClauseHierarchyBreadcrumbs";
import { SyntacticParsingSummaryModal } from "@/components/practice/syntactic-parsing/SyntacticParsingSummaryModal";

export default function SyntacticParsingPage() {
  const {
    currentChallenge,
    allChallenges,
    selectedChallengeId,
    handleSelectChallenge,
    isSkeletonStripped,
    setIsSkeletonStripped,
    selectedNodeId,
    setSelectedNodeId,
    dependencyEdges,
    puzzleTimeLeft,
    isPuzzleRunning,
    startPuzzle,
    userSelectedVerb,
    handleSelectVerbInPuzzle,
    puzzleResult,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isSaved,
    saveResultsToDatabase
  } = useSyntacticParsingSession();

  const handleNextChallenge = () => {
    const currentIndex = allChallenges.findIndex((c) => c.id === selectedChallengeId);
    const nextIndex = (currentIndex + 1) % allChallenges.length;
    handleSelectChallenge(allChallenges[nextIndex].id);
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
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-emerald-950 border border-emerald-700/50 text-emerald-300">
                  Step 85/100
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Reading Passage 3 Cognitive Syntax (Band 8.0 - 8.5+)
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
                Hierarchical Syntactic Tree & Garden-Path Disentangler Studio
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Target: Reading 8.5+
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Challenge Selection Header */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Bài đọc & Lĩnh vực khoa học Passage 3:</span>
              <h3 className="text-sm md:text-base font-bold text-white">
                {currentChallenge.passageTitle} ({currentChallenge.passageDomain})
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400 whitespace-nowrap">Chọn câu phân tích:</label>
            <select
              value={selectedChallengeId}
              onChange={(e) => handleSelectChallenge(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {allChallenges.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.passageDomain} ({item.wordCount} từ)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Core Skeleton Stripper */}
        <CoreSkeletonStripper
          challenge={currentChallenge}
          isStripped={isSkeletonStripped}
          onToggleStripped={() => setIsSkeletonStripped(!isSkeletonStripped)}
        />

        {/* Interactive SVG Dependency Tree */}
        <SyntacticTreeCanvas
          nodes={currentChallenge.nodes}
          edges={dependencyEdges}
          selectedNodeId={selectedNodeId}
          onSelectNode={setSelectedNodeId}
          isSkeletonStripped={isSkeletonStripped}
        />

        {/* 2-Column Split: Garden-Path Puzzle (Left) & Hierarchy Breadcrumbs (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <GardenPathPuzzleCard
              challenge={currentChallenge}
              timeLeft={puzzleTimeLeft}
              isRunning={isPuzzleRunning}
              onStart={startPuzzle}
              selectedVerb={userSelectedVerb}
              onSelectVerb={handleSelectVerbInPuzzle}
              puzzleResult={puzzleResult}
              onOpenSummary={() => setIsSummaryModalOpen(true)}
            />
          </div>

          <div className="lg:col-span-5">
            <ClauseHierarchyBreadcrumbs
              challenge={currentChallenge}
              selectedNodeId={selectedNodeId}
              onSelectNode={setSelectedNodeId}
            />
          </div>
        </div>
      </div>

      {/* Summary Modal */}
      <SyntacticParsingSummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        challenge={currentChallenge}
        puzzleResult={puzzleResult}
        userSelectedVerb={userSelectedVerb}
        isSaved={isSaved}
        onSave={saveResultsToDatabase}
        onNextChallenge={handleNextChallenge}
      />
    </div>
  );
}
