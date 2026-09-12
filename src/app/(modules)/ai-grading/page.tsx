"use client";

import React, { Suspense } from "react";
import {
  Sparkles,
  PenTool,
  Mic,
  Award,
  BookOpen,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { useAIGradingSession } from "@/hooks/useAIGradingSession";
import { WritingGraderWorkspace } from "@/components/ai-grading/WritingGraderWorkspace";
import { SpeakingGraderWorkspace } from "@/components/ai-grading/SpeakingGraderWorkspace";
import { AIFeedbackReportModal } from "@/components/ai-grading/AIFeedbackReportModal";
import { C1SentenceUpgraderDrawer } from "@/components/ai-grading/C1SentenceUpgraderDrawer";

function AIGradingContent() {
  const {
    activeTab,
    setActiveTab,
    // Writing
    selectedWritingPrompt,
    handleSelectWritingPrompt,
    writingEssay,
    setWritingEssay,
    isWritingTimerRunning,
    setIsWritingTimerRunning,
    writingSecondsRemaining,
    isAnalyzingWriting,
    submitWriting,
    // Speaking
    selectedSpeakingPrompt,
    setSelectedSpeakingPrompt,
    isRecording,
    recordingSeconds,
    audioUrl,
    audioWaveformLevels,
    isAnalyzingSpeaking,
    startRecording,
    stopRecording,
    submitSpeaking,
    // Modals
    currentReport,
    isReportModalOpen,
    setIsReportModalOpen,
    activeUpgraderItem,
    isUpgraderDrawerOpen,
    openUpgraderDrawer,
    closeUpgraderDrawer,
  } = useAIGradingSession();

  return (
    <div className="space-y-7 pb-24 max-w-5xl mx-auto select-none">
      {/* 1. Header & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            <Sparkles className="h-4 w-4" /> Module 3 • Chấm Điểm AI 4 Tiêu Chí Cambridge
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Phòng Chấm Bài Writing & Speaking Tương Tác
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Phân tích 4 tiêu chí chính thức (TR/CC/LR/GRA & FC/LR/GRA/PR) • Gợi ý nâng cấp câu chuẩn C1 • Bắt khoảng lặng ngập ngừng.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center p-1 rounded-2xl bg-secondary border border-border text-xs font-bold self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("writing")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "writing"
                ? "bg-card text-foreground shadow-sm font-black scale-[1.02]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <PenTool className="h-4 w-4 text-rose-500" />
            <span>Writing Grader</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("speaking")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "speaking"
                ? "bg-card text-foreground shadow-sm font-black scale-[1.02]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Mic className="h-4 w-4 text-purple-500" />
            <span>Speaking Grader</span>
          </button>
        </div>
      </div>

      {/* 2. Main Workspace (Writing or Speaking) */}
      {activeTab === "writing" ? (
        <WritingGraderWorkspace
          selectedPrompt={selectedWritingPrompt}
          onSelectPrompt={handleSelectWritingPrompt}
          essayText={writingEssay}
          onChangeEssay={setWritingEssay}
          isTimerRunning={isWritingTimerRunning}
          onToggleTimer={() => setIsWritingTimerRunning(!isWritingTimerRunning)}
          secondsRemaining={writingSecondsRemaining}
          isAnalyzing={isAnalyzingWriting}
          onSubmit={submitWriting}
        />
      ) : (
        <SpeakingGraderWorkspace
          selectedPrompt={selectedSpeakingPrompt}
          onSelectPrompt={setSelectedSpeakingPrompt}
          isRecording={isRecording}
          recordingSeconds={recordingSeconds}
          audioUrl={audioUrl}
          audioWaveformLevels={audioWaveformLevels}
          isAnalyzing={isAnalyzingSpeaking}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          onSubmit={submitSpeaking}
        />
      )}

      {/* 3. Feedback Report Modal */}
      <AIFeedbackReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        report={currentReport}
        onOpenUpgrader={openUpgraderDrawer}
      />

      {/* 4. C1 Upgrader Drawer Modal */}
      <C1SentenceUpgraderDrawer
        isOpen={isUpgraderDrawerOpen}
        onClose={closeUpgraderDrawer}
        upgradeItem={activeUpgraderItem}
      />
    </div>
  );
}

export default function AIGradingPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-xs font-mono text-muted-foreground animate-pulse">
          Đang nạp Phòng Chấm Điểm AI...
        </div>
      }
    >
      <AIGradingContent />
    </Suspense>
  );
}
