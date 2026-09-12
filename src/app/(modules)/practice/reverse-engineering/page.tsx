'use client';

import React from 'react';
import Link from 'next/link';
import { useReverseEngineeringSession } from '@/hooks/useReverseEngineeringSession';
import { ItemWriterWorkbench } from '@/components/practice/reverse-engineering/ItemWriterWorkbench';
import { DistractorTaxonomyCard } from '@/components/practice/reverse-engineering/DistractorTaxonomyCard';
import { TrapSophisticationGauge } from '@/components/practice/reverse-engineering/TrapSophisticationGauge';
import { DistractorTaggingArena } from '@/components/practice/reverse-engineering/DistractorTaggingArena';
import { ReverseEngineeringSummaryModal } from '@/components/practice/reverse-engineering/ReverseEngineeringSummaryModal';
import { PenTool, Tag, BookOpen, Layers, Sparkles, ArrowRight } from 'lucide-react';

export default function ReverseEngineeringPage() {
  const {
    activeTab,
    setActiveTab,
    cases,
    currentCase,
    selectedCaseId,
    selectCase,
    selectedSourceSentence,
    setSelectedSourceSentence,
    questionPromptInput,
    setQuestionPromptInput,
    keyInput,
    setKeyInput,
    distractorDrafts,
    updateDistractorText,
    updateDistractorType,
    loadPresetItem,
    evaluateWorkbenchSession,
    isAudited,
    auditResult,
    showSummaryModal,
    setShowSummaryModal,
    // Tagging Arena
    taggingDrills,
    currentDrill,
    currentDrillIndex,
    selectedOptionId,
    setSelectedOptionId,
    userAssignedTags,
    handleAssignTag,
    submitTaggingDrill,
    nextTaggingDrill,
    drillScore,
    isDrillSubmitted
  } = useReverseEngineeringSession();

  const handleNextCase = () => {
    const currentIndex = cases.findIndex((c) => c.id === selectedCaseId);
    const nextIndex = (currentIndex + 1) % cases.length;
    selectCase(cases[nextIndex].id);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Link
              href="/practice"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all text-xs font-semibold"
            >
              ← Trung Tâm Luyện Tập
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Step 95/100
                </span>
                <span className="text-xs text-slate-400">
                  Reading Passage 3 Psychometrics & Reverse Item Engineering (Band 7.5 - 8.5+)
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <PenTool className="w-6 h-6 text-indigo-400" />
                Giải Phẫu Ngược Bẫy Khảo Thí Cambridge: Đóng Vai Chuyên Gia Soạn Đề
              </h1>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('workbench')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'workbench'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              Item Writer Sandbox
            </button>
            <button
              onClick={() => setActiveTab('tagging_arena')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'tagging_arena'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              Distractor Tagging Arena
            </button>
          </div>
        </div>

        {/* Tab 1: Item Writer Sandbox */}
        {activeTab === 'workbench' && (
          <div className="space-y-6">
            {/* Passage Selector Bar */}
            <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
              <span className="text-xs text-slate-400 font-semibold">
                Chọn Đoạn Văn Passage 3 Để Chế Tác Câu Hỏi:
              </span>
              <select
                value={selectedCaseId}
                onChange={(e) => selectCase(e.target.value)}
                className="bg-slate-900 border border-slate-700 focus:border-indigo-500 rounded-xl px-3 py-1.5 text-xs font-semibold text-white cursor-pointer"
              >
                {cases.map((c, idx) => (
                  <option key={c.id} value={c.id}>
                    #{idx + 1} [{c.cambridgeRef}] - {c.passageTitle}
                  </option>
                ))}
              </select>
            </div>

            {/* Workbench Editor */}
            <ItemWriterWorkbench
              currentCase={currentCase}
              selectedSourceSentence={selectedSourceSentence}
              setSelectedSourceSentence={setSelectedSourceSentence}
              questionPromptInput={questionPromptInput}
              setQuestionPromptInput={setQuestionPromptInput}
              keyInput={keyInput}
              setKeyInput={setKeyInput}
              distractorDrafts={distractorDrafts}
              onUpdateDistractorText={updateDistractorText}
              onUpdateDistractorType={updateDistractorType}
              onLoadPreset={loadPresetItem}
              onEvaluate={evaluateWorkbenchSession}
              auditResult={auditResult}
            />

            {/* Gauge Telemetry */}
            {isAudited && <TrapSophisticationGauge auditResult={auditResult} />}

            {/* 4 Blueprints Taxonomy Card */}
            <DistractorTaxonomyCard />
          </div>
        )}

        {/* Tab 2: Distractor Tagging Arena */}
        {activeTab === 'tagging_arena' && (
          <div className="space-y-6">
            <DistractorTaggingArena
              currentDrill={currentDrill}
              currentDrillIndex={currentDrillIndex}
              totalDrills={taggingDrills.length}
              selectedOptionId={selectedOptionId}
              setSelectedOptionId={setSelectedOptionId}
              userAssignedTags={userAssignedTags}
              onAssignTag={handleAssignTag}
              onSubmit={submitTaggingDrill}
              onNext={nextTaggingDrill}
              drillScore={drillScore}
              isSubmitted={isDrillSubmitted}
            />

            <DistractorTaxonomyCard />
          </div>
        )}

        {/* Pedagogical Principle Footer Card */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 text-xs text-slate-400 space-y-2">
          <h4 className="font-bold text-slate-200 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Nguyên Lý Tâm Lý Học Khảo Thí (Psychometrics) Của Cambridge:</span>
          </h4>
          <p className="leading-relaxed">
            Hội đồng khảo thí Cambridge không bao giờ tạo phương án sai ngẫu nhiên. Mọi phương án nhiễu đều được chế tác theo 4 cơ chế bẫy cốt lõi:{' '}
            <strong className="text-rose-300">Đảo cực tính</strong>,{' '}
            <strong className="text-amber-300">Đúng một nửa</strong>,{' '}
            <strong className="text-purple-300">Tuyệt đối hóa phạm vi</strong>, và{' '}
            <strong className="text-sky-300">Suy diễn ngoài bài (Not Given)</strong>. Khi người học thuần thục kỹ năng tự chế tác bẫy từ góc nhìn của Examiner, bạn sẽ đạt được trạng thái <strong>"miễn dịch bẫy hoàn toàn"</strong> trong phòng thi.
          </p>
        </div>

        {/* Modals */}
        <ReverseEngineeringSummaryModal
          isOpen={showSummaryModal}
          onClose={() => setShowSummaryModal(false)}
          currentCase={currentCase}
          auditResult={auditResult}
          onReset={loadPresetItem}
          onNextCase={handleNextCase}
        />
      </div>
    </div>
  );
}
