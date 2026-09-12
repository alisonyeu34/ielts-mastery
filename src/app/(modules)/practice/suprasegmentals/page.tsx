"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import {
  Activity,
  Sparkles,
  Volume2,
  ArrowRight,
  ShieldAlert,
  Layers,
  BookOpen,
} from "lucide-react";
import { useSuprasegmentalSession } from "@/hooks/useSuprasegmentalSession";
import {
  MOCK_WORD_STRESS_ITEMS,
  MOCK_CONNECTED_SPEECH_ITEMS,
  MOCK_THOUGHT_GROUP_ITEMS,
} from "@/data/mockSuprasegmentalData";
import { WordStressVisualizer } from "@/components/practice/suprasegmentals/WordStressVisualizer";
import { ConnectedSpeechHighlighter } from "@/components/practice/suprasegmentals/ConnectedSpeechHighlighter";
import { ThoughtGroupChunker } from "@/components/practice/suprasegmentals/ThoughtGroupChunker";
import { SentenceStressRecorder } from "@/components/practice/suprasegmentals/SentenceStressRecorder";
import { SuprasegmentalSummaryModal } from "@/components/practice/suprasegmentals/SuprasegmentalSummaryModal";

function SuprasegmentalsContent() {
  const {
    activeTab,
    setActiveTab,
    // Word Stress
    selectedStressWord,
    setSelectedStressWord,
    isPairedToggled,
    setIsPairedToggled,
    // Connected Speech
    selectedConnectedItem,
    setSelectedConnectedItem,
    showLinkingMarks,
    setShowLinkingMarks,
    // Thought Groups
    selectedThoughtGroupItem,
    setSelectedThoughtGroupItem,
    isMetronomeRunning,
    toggleMetronome,
    activeChunkIndex,
    metronomeBPM,
    setMetronomeBPM,
    // Recording & Evaluation
    isRecording,
    recordingSeconds,
    pauseScore,
    pauseFeedback,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    startRecording,
    stopRecordingAndEvaluate,
  } = useSuprasegmentalSession();

  return (
    <div className="space-y-8 pb-24 max-w-6xl mx-auto select-none">
      {/* 1. Page Header & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
            <Activity className="h-4 w-4" /> Giai Đoạn 1 • Siêu Đoạn Tính, Nối Âm & Nhịp Điệu
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Phòng Luyện Trọng Âm, Biến Âm & Ngắt Cụm Ý Nghĩa
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Huấn luyện 4 quy luật trọng âm từ • Kỹ thuật nối âm C-V & âm chèn • Chia Thought Groups và đọc đồng nhịp Shadowing.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-secondary border border-border text-xs font-bold self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("word_stress")}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === "word_stress"
                ? "bg-card text-foreground shadow-sm font-black scale-102"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            1. Trọng Âm Từ
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("connected_speech")}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === "connected_speech"
                ? "bg-card text-foreground shadow-sm font-black scale-102"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            2. Nối Âm & Biến Âm
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("thought_groups")}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === "thought_groups"
                ? "bg-card text-foreground shadow-sm font-black scale-102"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            3. Ngắt Cụm Thought Groups
          </button>
        </div>
      </div>

      {/* 2. Dynamic Workspace based on Active Tab */}
      {activeTab === "word_stress" && (
        <WordStressVisualizer
          items={MOCK_WORD_STRESS_ITEMS}
          selectedItem={selectedStressWord}
          onSelectItem={(item) => {
            setSelectedStressWord(item);
            setIsPairedToggled(false);
          }}
          isPairedToggled={isPairedToggled}
          onTogglePaired={() => setIsPairedToggled(!isPairedToggled)}
        />
      )}

      {activeTab === "connected_speech" && (
        <ConnectedSpeechHighlighter
          items={MOCK_CONNECTED_SPEECH_ITEMS}
          selectedItem={selectedConnectedItem}
          onSelectItem={setSelectedConnectedItem}
          showLinkingMarks={showLinkingMarks}
          onToggleLinkingMarks={() => setShowLinkingMarks(!showLinkingMarks)}
        />
      )}

      {activeTab === "thought_groups" && (
        <div className="space-y-6">
          <ThoughtGroupChunker
            items={MOCK_THOUGHT_GROUP_ITEMS}
            selectedItem={selectedThoughtGroupItem}
            onSelectItem={setSelectedThoughtGroupItem}
            isMetronomeRunning={isMetronomeRunning}
            onToggleMetronome={toggleMetronome}
            activeChunkIndex={activeChunkIndex}
            metronomeBPM={metronomeBPM}
            onBpmChange={setMetronomeBPM}
          />

          <SentenceStressRecorder
            sentenceItem={selectedThoughtGroupItem}
            isRecording={isRecording}
            recordingSeconds={recordingSeconds}
            onStartRecording={startRecording}
            onStopRecording={stopRecordingAndEvaluate}
          />
        </div>
      )}

      {/* 3. Summary Modal */}
      <SuprasegmentalSummaryModal
        isOpen={isSummaryModalOpen}
        score={pauseScore}
        feedback={pauseFeedback}
        onClose={() => setIsSummaryModalOpen(false)}
      />
    </div>
  );
}

export default function SuprasegmentalsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-xs font-mono text-muted-foreground animate-pulse">
          Đang nạp Phòng Luyện Siêu Đoạn Tính & Nối Âm...
        </div>
      }
    >
      <SuprasegmentalsContent />
    </Suspense>
  );
}
