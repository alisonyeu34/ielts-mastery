"use client";

import React from "react";
import Link from "next/link";
import { useSocraticDebateSession } from "@/hooks/useSocraticDebateSession";
import { MOCK_SOCRATIC_TOPICS } from "@/data/mockSocraticDebateData";
import { SocraticArenaTurnFlow } from "@/components/practice/socratic-debate/SocraticArenaTurnFlow";
import { SocietalLensActiveRadar } from "@/components/practice/socratic-debate/SocietalLensActiveRadar";
import { ArgumentResilienceMeter } from "@/components/practice/socratic-debate/ArgumentResilienceMeter";
import { SocraticRebuttalWorkbench } from "@/components/practice/socratic-debate/SocraticRebuttalWorkbench";
import { SocraticDebateSummaryModal } from "@/components/practice/socratic-debate/SocraticDebateSummaryModal";
import {
  ChevronRight,
  Home,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  BookOpen,
} from "lucide-react";

export default function SocraticDebateStudioPage() {
  const {
    selectedTopic,
    handleSelectTopic,
    currentRound,
    turns,
    userDraftText,
    setUserDraftText,
    isRecordingVoice,
    toggleVoiceRecording,
    roundSecondsLeft,
    isScholarTyping,
    activeLenses,
    resilienceScore,
    submitUserTurn,
    insertTemplatePhrase,
    addCollocationToVocab,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
  } = useSocraticDebateSession();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-slate-200 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link
            href="/practice"
            className="hover:text-slate-200 transition-colors"
          >
            Practice Modules
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-purple-400 font-semibold">
            Interactive Socratic Debate Studio (Step 75)
          </span>
        </div>

        {/* Page Title & Topic Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                <span>STEP 75/100: Interactive Socratic Debate Studio (Band 7.5 - 8.5+)</span>
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                Phase 3 (6.5 &rarr; 7.5+)
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-100 tracking-tight">
              Vũ Đài Tranh Biện Học Thuật Đối Kháng Socratic (3-Round Dialectical Challenge)
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Bẻ gãy thói quen trả lời một chiều. Đối thoại trực tiếp 3 hiệp với Học Giả AI, vạch trần các lỗ hổng logic và rèn luyện kỹ thuật nhượng bộ rào đón C1/C2 qua 6 lăng kính chủ thể xã hội.
            </p>
          </div>

          {/* Topic Select Dropdown */}
          <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 self-start lg:self-auto">
            <BookOpen className="w-4 h-4 text-purple-400 ml-1.5" />
            <select
              value={selectedTopic.id}
              onChange={(e) => {
                const t = MOCK_SOCRATIC_TOPICS.find((item) => item.id === e.target.value);
                if (t) handleSelectTopic(t);
              }}
              className="bg-transparent text-xs font-bold text-slate-200 focus:outline-none cursor-pointer pr-2"
            >
              {MOCK_SOCRATIC_TOPICS.map((t) => (
                <option key={t.id} value={t.id} className="bg-slate-900 text-slate-200">
                  {t.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 1. Societal Lenses Active Radar */}
        <SocietalLensActiveRadar activeLenses={activeLenses} />

        {/* 2. Argument Resilience Meter */}
        <ArgumentResilienceMeter score={resilienceScore} />

        {/* 3. Socratic Arena Turn Flow (3-Round Conversation) */}
        <SocraticArenaTurnFlow
          turns={turns}
          isScholarTyping={isScholarTyping}
          currentRound={currentRound}
        />

        {/* 4. Socratic Rebuttal Workbench (Drafting Bench & Voice Input) */}
        <SocraticRebuttalWorkbench
          userDraftText={userDraftText}
          setUserDraftText={setUserDraftText}
          isRecordingVoice={isRecordingVoice}
          onToggleVoice={toggleVoiceRecording}
          roundSecondsLeft={roundSecondsLeft}
          currentRound={currentRound}
          onSubmitTurn={submitUserTurn}
          onInsertTemplate={insertTemplatePhrase}
          collocations={selectedTopic.c1UsefulCollocations}
          onAddCollocation={addCollocationToVocab}
        />

        {/* 5. Socratic Debate Summary Modal */}
        <SocraticDebateSummaryModal
          isOpen={isSummaryModalOpen}
          onClose={() => setIsSummaryModalOpen(false)}
          score={resilienceScore}
          topic={selectedTopic}
          onRetry={() => handleSelectTopic(selectedTopic)}
        />
      </div>
    </div>
  );
}
