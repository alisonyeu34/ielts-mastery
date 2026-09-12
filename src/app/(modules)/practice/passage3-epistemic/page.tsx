"use client";

import React from "react";
import Link from "next/link";
import { usePassage3EpistemicSession, EpistemicTab } from "@/hooks/usePassage3EpistemicSession";
import { EpistemicGraphCanvas } from "@/components/practice/passage3-epistemic/EpistemicGraphCanvas";
import { AbstractConstructViewer } from "@/components/practice/passage3-epistemic/AbstractConstructViewer";
import { DialecticalFactionTracker } from "@/components/practice/passage3-epistemic/DialecticalFactionTracker";
import { AbstractSummaryBoxMatcher } from "@/components/practice/passage3-epistemic/AbstractSummaryBoxMatcher";
import { AuthorialStancePinpoint } from "@/components/practice/passage3-epistemic/AuthorialStancePinpoint";
import { EpistemicReadingSummaryModal } from "@/components/practice/passage3-epistemic/EpistemicReadingSummaryModal";

export default function Passage3EpistemicPage() {
  const {
    currentPassage,
    allPassages,
    selectedPassageId,
    handleSelectPassage,
    selectedNodeId,
    handleSelectNode,
    selectedEdgeId,
    handleSelectEdge,
    highlightedParagraph,
    setHighlightedParagraph,
    activeFilter,
    setActiveFilter,
    activeTab,
    setActiveTab,
    userSummarySlots,
    handleSetSlotAnswer,
    handleClearSlotAnswer,
    isEvaluated,
    evaluationResult,
    handleEvaluateSummary,
    handleResetSummary,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isSaved,
    saveResultsToDatabase
  } = usePassage3EpistemicSession();

  const handleNextPassage = () => {
    const currentIndex = allPassages.findIndex((p) => p.id === selectedPassageId);
    const nextIndex = (currentIndex + 1) % allPassages.length;
    handleSelectPassage(allPassages[nextIndex].id);
  };

  const TABS: Array<{ id: EpistemicTab; label: string; icon: string }> = [
    { id: 'graph', label: 'Sơ Đồ Mạng Lưới', icon: '🕸️' },
    { id: 'summary_matcher', label: 'Summary Box Matcher', icon: '📝' },
    { id: 'constructs', label: 'Khái Niệm Siêu Hình', icon: '💎' },
    { id: 'factions', label: 'Đấu Trường Học Thuyết', icon: '⚔️' },
    { id: 'author_stance', label: 'Lập Trường Tác Giả', icon: '👑' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header Navigation */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Link
              href="/practice"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all text-xs font-semibold"
            >
              ← Trung Tâm Luyện Tập
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Step 90/100
                </span>
                <span className="text-xs text-slate-400">
                  Reading Passage 3 Epistemic Discourse (Band 7.5 - 8.5+)
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
                Hệ Thống Giải Mã Văn Bản Trừu Tượng Passage 3
              </h1>
            </div>
          </div>

          {/* Passage Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 whitespace-nowrap hidden sm:inline">
              Chọn Bài Đọc:
            </span>
            <select
              value={selectedPassageId}
              onChange={(e) => handleSelectPassage(e.target.value)}
              className="bg-slate-900 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-xs font-semibold text-white cursor-pointer"
            >
              {allPassages.map((p, idx) => (
                <option key={p.id} value={p.id}>
                  #{idx + 1} - {p.title.length > 40 ? p.title.substring(0, 38) + "..." : p.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Split Screen Workspace: Reading Passage (Left) + Epistemic Studio Tabs (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Full Reading Passage */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-4 backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800 mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                    {currentPassage.category}
                  </span>
                  <h2 className="text-base font-bold text-white">
                    {currentPassage.title}
                  </h2>
                  <p className="text-xs text-slate-400 italic">
                    {currentPassage.subtitle}
                  </p>
                </div>

                <span className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300">
                  {currentPassage.wordCount} từ
                </span>
              </div>

              {/* Scrollable Passage Paragraphs */}
              <div className="space-y-4 max-h-[750px] overflow-y-auto pr-2 text-xs text-slate-300 leading-relaxed scrollbar-thin">
                {currentPassage.paragraphs.map((para, idx) => {
                  const paraNumber = idx + 1;
                  const isHighlighted = highlightedParagraph === paraNumber;

                  return (
                    <div
                      key={idx}
                      id={`para-${paraNumber}`}
                      onClick={() => setHighlightedParagraph(paraNumber)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isHighlighted
                          ? 'bg-amber-950/40 border-amber-500/60 ring-2 ring-amber-500/40 text-slate-100 shadow-lg'
                          : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-purple-400 text-[11px]">
                          Đoạn {paraNumber}
                        </span>
                        {isHighlighted && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                            Dẫn Chứng Đang Chọn
                          </span>
                        )}
                      </div>
                      <p>{para.replace(/\[Paragraph \d+\]\s*/, '')}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Paragraph Navigation Pills */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Nhảy nhanh đến đoạn:</span>
              <div className="flex items-center gap-1.5">
                {currentPassage.paragraphs.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setHighlightedParagraph(idx + 1)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold font-mono transition-all border ${
                      highlightedParagraph === idx + 1
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Epistemic Studio Tools */}
          <div className="lg:col-span-7 space-y-4">
            {/* 5 Tab Navigation Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {TABS.map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-400 text-white shadow-lg shadow-purple-950/50 scale-[1.02]'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Epistemic Graph Canvas */}
            {activeTab === 'graph' && (
              <EpistemicGraphCanvas
                nodes={currentPassage.nodes}
                edges={currentPassage.edges}
                selectedNodeId={selectedNodeId}
                selectedEdgeId={selectedEdgeId}
                activeFilter={activeFilter}
                onSelectNode={handleSelectNode}
                onSelectEdge={handleSelectEdge}
                onChangeFilter={setActiveFilter}
                onHighlightParagraph={setHighlightedParagraph}
              />
            )}

            {/* Tab 2: Summary Box Matcher */}
            {activeTab === 'summary_matcher' && (
              <AbstractSummaryBoxMatcher
                summaryTask={currentPassage.summaryTask}
                userSlots={userSummarySlots}
                isEvaluated={isEvaluated}
                evaluationResult={evaluationResult}
                onSetSlotAnswer={handleSetSlotAnswer}
                onClearSlotAnswer={handleClearSlotAnswer}
                onEvaluate={handleEvaluateSummary}
                onReset={handleResetSummary}
              />
            )}

            {/* Tab 3: Abstract Constructs */}
            {activeTab === 'constructs' && (
              <AbstractConstructViewer constructs={currentPassage.constructs} />
            )}

            {/* Tab 4: Dialectical Factions */}
            {activeTab === 'factions' && (
              <DialecticalFactionTracker factions={currentPassage.factions} />
            )}

            {/* Tab 5: Authorial Stance */}
            {activeTab === 'author_stance' && (
              <AuthorialStancePinpoint stance={currentPassage.authorStance} />
            )}
          </div>
        </div>

        {/* Pedagogical Principle Footer Card */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 text-xs text-slate-400 space-y-2">
          <h4 className="font-bold text-slate-200 flex items-center gap-2">
            <span>🧠</span>
            <span>Phương Pháp Giải Mã Mạng Lưới Nhận Thức Luận (Epistemic Discourse Mapping):</span>
          </h4>
          <p className="leading-relaxed">
            Các bài đọc khó nhất của Cambridge Passage 3 (Triết học nhận thức, Trí tuệ nhân tạo, Ngôn ngữ học cấu trúc) vận hành theo cấu trúc <strong className="text-purple-300">Khái niệm siêu hình ➔ Đấu trường học thuyết đối lập ➔ Lập trường rào đón của tác giả</strong>. Việc lập sơ đồ mạng lưới giúp thí sinh không bị &ldquo;ngộp&rdquo; trước hàng loạt tên học giả và giải quyết dạng bài <strong className="text-cyan-300">Summary Completion with Box of Options</strong> hóc búa nhất một cách có hệ thống.
          </p>
        </div>

        {/* Summary Completion Diagnostic Modal */}
        <EpistemicReadingSummaryModal
          isOpen={isSummaryModalOpen}
          onClose={() => setIsSummaryModalOpen(false)}
          evaluationResult={evaluationResult}
          currentPassage={currentPassage}
          isSaved={isSaved}
          onSaveToDatabase={saveResultsToDatabase}
          onRetry={handleResetSummary}
          onNextPassage={handleNextPassage}
        />
      </div>
    </div>
  );
}
