'use client';

import React from 'react';
import Link from 'next/link';
import { usePromptDeconstructionSession } from '@/hooks/usePromptDeconstructionSession';
import { PromptHighlighterStudio } from '@/components/practice/prompt-deconstruction/PromptHighlighterStudio';
import { ScopeConstraintAlert } from '@/components/practice/prompt-deconstruction/ScopeConstraintAlert';
import { WatertightThesisWorkbench } from '@/components/practice/prompt-deconstruction/WatertightThesisWorkbench';
import { StealthDriftDetectorModal } from '@/components/practice/prompt-deconstruction/StealthDriftDetectorModal';
import { PromptDeconstructionSummaryModal } from '@/components/practice/prompt-deconstruction/PromptDeconstructionSummaryModal';
import { FileSearch, Sparkles, BookOpen, ArrowRight } from 'lucide-react';

export default function PromptDeconstructionPage() {
  const {
    cases,
    currentCase,
    selectedCaseId,
    selectCase,
    activeHighlightTool,
    setActiveHighlightTool,
    highlights,
    addHighlight,
    removeHighlight,
    resetHighlights,
    loadPresetAnswer,
    userThesisInput,
    setUserThesisInput,
    isAudited,
    auditResult,
    thesisResult,
    evaluateSession,
    showSummaryModal,
    setShowSummaryModal,
    showStealthDriftModal,
    setShowStealthDriftModal
  } = usePromptDeconstructionSession();

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
                  Step 93/100
                </span>
                <span className="text-xs text-slate-400">
                  Writing Task 2 Task Response Forensics (Band 7.5 - 8.5+)
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <FileSearch className="w-6 h-6 text-indigo-400" />
                Xưởng Phẫu Thuật Luận Đề Lạc Đề Ngầm & Khóa Chặt Luận Điểm
              </h1>
            </div>
          </div>

          {/* Case Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 whitespace-nowrap hidden md:inline">
              Chọn Đề Thi Cambridge:
            </span>
            <select
              value={selectedCaseId}
              onChange={(e) => selectCase(e.target.value)}
              className="bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs font-semibold text-white cursor-pointer"
            >
              {cases.map((c, idx) => (
                <option key={c.id} value={c.id}>
                  #{idx + 1} [{c.cambridgeRef}] - {c.topicCategory}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4-Component Highlighter Studio */}
        <PromptHighlighterStudio
          currentCase={currentCase}
          activeHighlightTool={activeHighlightTool}
          setActiveHighlightTool={setActiveHighlightTool}
          highlights={highlights}
          onAddHighlight={addHighlight}
          onRemoveHighlight={removeHighlight}
          onResetHighlights={resetHighlights}
          onLoadPreset={loadPresetAnswer}
        />

        {/* Scope Constraint & Stealth Drift Alert */}
        <ScopeConstraintAlert
          currentCase={currentCase}
          missedQualifiers={auditResult?.missedQualifiers}
          onOpenDriftModal={() => setShowStealthDriftModal(true)}
        />

        {/* Watertight Thesis Lock Matrix */}
        <WatertightThesisWorkbench
          currentCase={currentCase}
          userThesisInput={userThesisInput}
          setUserThesisInput={setUserThesisInput}
          thesisResult={thesisResult}
          onAuditThesis={evaluateSession}
        />

        {/* Pedagogical Principle Footer Card */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 text-xs text-slate-400 space-y-2">
          <h4 className="font-bold text-slate-200 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Nguyên Lý Khảo Thí Band Descriptors Task Response (TR):</span>
          </h4>
          <p className="leading-relaxed">
            Để đạt Band 7.0 - 8.5+ Task Response, giám khảo yêu cầu thí sinh phải{' '}
            <strong className="text-indigo-300">"address all parts of the task"</strong> và{' '}
            <strong className="text-emerald-300">"present a clear position throughout the response"</strong>.
            Nếu bỏ qua các từ hạn định phạm vi (<code className="bg-slate-800 px-1 py-0.5 rounded text-rose-300 font-mono">only</code>, <code className="bg-slate-800 px-1 py-0.5 rounded text-rose-300 font-mono">solely</code>, <code className="bg-slate-800 px-1 py-0.5 rounded text-rose-300 font-mono">in cities</code>) hoặc viết câu mở bài ba phải (<code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300 font-mono">"there are both pros and cons"</code>), bài viết sẽ bị khống chế ở mức <strong>Band 6.0 Task Response</strong> dù ngữ pháp và từ vựng có xuất sắc đến đâu.
          </p>
        </div>

        {/* Modals */}
        <StealthDriftDetectorModal
          isOpen={showStealthDriftModal}
          onClose={() => setShowStealthDriftModal(false)}
          currentCase={currentCase}
        />

        <PromptDeconstructionSummaryModal
          isOpen={showSummaryModal}
          onClose={() => setShowSummaryModal(false)}
          currentCase={currentCase}
          auditResult={auditResult}
          thesisResult={thesisResult}
          onReset={resetHighlights}
          onNextCase={handleNextCase}
        />
      </div>
    </div>
  );
}
