"use client";

import React from "react";
import Link from "next/link";
import { useSocietalPrismsSession } from "@/hooks/useSocietalPrismsSession";
import { HexagonalPrismSelector } from "@/components/practice/societal-prisms/HexagonalPrismSelector";
import { StakeholderDiversityRadar } from "@/components/practice/societal-prisms/StakeholderDiversityRadar";
import { EgocentricSpeechDetector } from "@/components/practice/societal-prisms/EgocentricSpeechDetector";
import { PrismsAudioRecorderControls } from "@/components/practice/societal-prisms/PrismsAudioRecorderControls";
import { PolicyTradeoffBuilder } from "@/components/practice/societal-prisms/PolicyTradeoffBuilder";
import { SocietalPrismsSummaryModal } from "@/components/practice/societal-prisms/SocietalPrismsSummaryModal";

export default function SocietalPrismsPage() {
  const {
    currentPrompt,
    allPrompts,
    selectedPromptId,
    handleSelectPrompt,
    selectedPrisms,
    handleTogglePrism,
    speechTranscript,
    handleUpdateTranscript,
    handleLoadSampleResponse,
    isRecording,
    recordingSeconds,
    startRecording,
    stopRecording,
    audioUrl,
    audioLevel,
    prismAnalysis,
    handleAnalyzeDiscourse,
    resetSession,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isTradeoffBuilderOpen,
    setIsTradeoffBuilderOpen,
    isSaved,
    saveResultsToDatabase
  } = useSocietalPrismsSession();

  const handleNextPrompt = () => {
    const currentIndex = allPrompts.findIndex((p) => p.id === selectedPromptId);
    const nextIndex = (currentIndex + 1) % allPrompts.length;
    handleSelectPrompt(allPrompts[nextIndex].id);
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
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Step 92/100
                </span>
                <span className="text-xs text-slate-400">
                  Speaking Part 3 Institutional Discourse & Policy Dilemmas (Band 7.5 - 8.5+)
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
                Phòng Luyện 6 Lăng Kính Chủ Thể Xã Hội Speaking Part 3
              </h1>
            </div>
          </div>

          {/* Prompt Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 whitespace-nowrap hidden md:inline">
              Chọn Câu Hỏi Part 3:
            </span>
            <select
              value={selectedPromptId}
              onChange={(e) => handleSelectPrompt(e.target.value)}
              className="bg-slate-900 border border-slate-800 focus:border-purple-500 rounded-xl px-3 py-2 text-xs font-semibold text-white cursor-pointer"
            >
              {allPrompts.map((p, idx) => (
                <option key={p.id} value={p.id}>
                  #{idx + 1} - {p.question.length > 45 ? p.question.substring(0, 42) + "..." : p.question}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Current Part 3 Question Display */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
              {currentPrompt.topicDomain}
            </span>
            <span className="text-xs text-slate-400">Yêu cầu: Kích hoạt tối thiểu 2 lăng kính thể chế</span>
          </div>

          <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
            &ldquo;{currentPrompt.question}&rdquo;
          </h2>

          <p className="text-xs text-amber-200/90 leading-relaxed bg-amber-950/20 p-2.5 rounded-xl border border-amber-500/20">
            ⚖️ <strong>Xung đột chính sách trọng tâm:</strong> {currentPrompt.policyDilemmaSummary}
          </p>
        </div>

        {/* Hexagonal 6-Prism Spinner */}
        <HexagonalPrismSelector
          selectedPrisms={selectedPrisms}
          onTogglePrism={handleTogglePrism}
          onOpenTradeoffBuilder={() => setIsTradeoffBuilderOpen(true)}
        />

        {/* Stakeholder Diversity Radar */}
        <StakeholderDiversityRadar analysis={prismAnalysis} />

        {/* Egocentric Trap Live Sentinel */}
        <EgocentricSpeechDetector transcript={speechTranscript} />

        {/* Web Audio Recorder Controls & Transcript Input */}
        <PrismsAudioRecorderControls
          currentPrompt={currentPrompt}
          speechTranscript={speechTranscript}
          isRecording={isRecording}
          recordingSeconds={recordingSeconds}
          audioUrl={audioUrl}
          audioLevel={audioLevel}
          onUpdateTranscript={handleUpdateTranscript}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          onLoadSample={handleLoadSampleResponse}
          onAnalyze={handleAnalyzeDiscourse}
          onReset={resetSession}
        />

        {/* Pedagogical Principle Footer Card */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 text-xs text-slate-400 space-y-2">
          <h4 className="font-bold text-slate-200 flex items-center gap-2">
            <span>🏛️</span>
            <span>Nguyên Lý Bứt Phá Tư Duy Vĩ Mô Speaking Part 3 Band 8.0+:</span>
          </h4>
          <p className="leading-relaxed">
            Giám khảo chấm Speaking Part 3 không tìm kiếm quan điểm cá nhân đơn giản (&ldquo;I think...&rdquo;) mà đánh giá khả năng nhìn nhận một vấn đề qua <strong className="text-purple-300">6 lăng kính thể chế</strong> (Chính phủ, Doanh nghiệp, Khoa học, Công bằng xã hội, Toàn cầu, Người tiêu dùng). Việc bóc tách sự mâu thuẫn đánh đổi lợi ích chính sách (Policy Trade-off) là chìa khóa chạm ngưỡng Band 8.5+ Fluency & Coherence và Lexical Resource.
          </p>
        </div>

        {/* Modals */}
        <PolicyTradeoffBuilder
          isOpen={isTradeoffBuilderOpen}
          onClose={() => setIsTradeoffBuilderOpen(false)}
        />

        <SocietalPrismsSummaryModal
          isOpen={isSummaryModalOpen}
          onClose={() => setIsSummaryModalOpen(false)}
          analysis={prismAnalysis}
          currentPrompt={currentPrompt}
          isSaved={isSaved}
          onSaveToDatabase={saveResultsToDatabase}
          onRetry={resetSession}
          onNextPrompt={handleNextPrompt}
        />
      </div>
    </div>
  );
}
