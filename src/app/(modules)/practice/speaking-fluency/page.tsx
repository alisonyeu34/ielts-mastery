"use client";

import React from "react";
import Link from "next/link";
import { useSpeakingFluencySession } from "@/hooks/useSpeakingFluencySession";
import { MOCK_FLUENCY_PROMPTS } from "@/data/mockFluencyPromptsData";
import { LiveWPMPacerGauge } from "@/components/practice/speaking-fluency/LiveWPMPacerGauge";
import { RealtimeAntiFillerRadar } from "@/components/practice/speaking-fluency/RealtimeAntiFillerRadar";
import { AcousticPausingCanvas } from "@/components/practice/speaking-fluency/AcousticPausingCanvas";
import { BiofeedbackRecorderControls } from "@/components/practice/speaking-fluency/BiofeedbackRecorderControls";
import { FluencyDiagnosticSummaryModal } from "@/components/practice/speaking-fluency/FluencyDiagnosticSummaryModal";
import {
  ChevronRight,
  Home,
  Mic,
  Activity,
  Radio,
  Sparkles,
} from "lucide-react";

export default function SpeakingFluencyStudioPage() {
  const {
    selectedPrompt,
    setSelectedPrompt,
    isRecording,
    recordingSeconds,
    liveTranscript,
    detectedFillers,
    isFillerWarningActive,
    isAudioCueEnabled,
    setIsAudioCueEnabled,
    volumeTimeline,
    acousticPauses,
    fluencyMetrics,
    startRecording,
    stopRecordingAndEvaluate,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
  } = useSpeakingFluencySession();

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
          <span className="text-cyan-400 font-semibold">
            Speaking Fluency Biofeedback & Anti-Filler Studio (Step 74)
          </span>
        </div>

        {/* Page Title & Prompt Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>STEP 74/100: Speaking Fluency Biofeedback & Anti-Filler Studio</span>
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                Phase 3 (6.5 &rarr; 7.5+)
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-100 tracking-tight">
              Phòng Đo Lường Lưu Loát Sinh Học & Triệt Tiêu Từ Đệm Speaking
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Kiểm soát độ trôi chảy học thuật, triệt tiêu phản xạ chêm từ đệm (um, uh, like) qua radar cảnh báo thời gian thực và phân biệt khoảng lặng ngắt nhịp (Content Pause) với ngập ngừng tìm từ (Lexical Hesitation).
            </p>
          </div>

          {/* Prompt Selector Dropdown */}
          <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 self-start lg:self-auto">
            <Mic className="w-4 h-4 text-cyan-400 ml-1.5" />
            <select
              value={selectedPrompt.id}
              onChange={(e) => {
                const p = MOCK_FLUENCY_PROMPTS.find((item) => item.id === e.target.value);
                if (p) setSelectedPrompt(p);
              }}
              className="bg-transparent text-xs font-bold text-slate-200 focus:outline-none cursor-pointer pr-2"
            >
              {MOCK_FLUENCY_PROMPTS.map((p) => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-slate-200">
                  [{p.part}] {p.topicTitle}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 1. Biofeedback Recorder Controls */}
        <BiofeedbackRecorderControls
          prompt={selectedPrompt}
          isRecording={isRecording}
          recordingSeconds={recordingSeconds}
          liveTranscript={liveTranscript}
          onStart={startRecording}
          onStop={stopRecordingAndEvaluate}
        />

        {/* 2. Live WPM Pacer Gauge */}
        <LiveWPMPacerGauge
          currentWpm={fluencyMetrics.currentWpm}
          syllablesPerSec={fluencyMetrics.syllablesPerSec}
          isRecording={isRecording}
        />

        {/* 3. Realtime Anti-Filler Radar */}
        <RealtimeAntiFillerRadar
          detectedFillers={detectedFillers}
          isFillerWarningActive={isFillerWarningActive}
          isAudioCueEnabled={isAudioCueEnabled}
          setIsAudioCueEnabled={setIsAudioCueEnabled}
          recordingSeconds={recordingSeconds}
        />

        {/* 4. Acoustic Pausing Spectrogram Canvas */}
        <AcousticPausingCanvas
          volumeTimeline={volumeTimeline}
          pauses={acousticPauses}
          totalTimeSec={recordingSeconds || 15}
        />

        {/* 5. Summary Diagnostics Modal */}
        <FluencyDiagnosticSummaryModal
          isOpen={isSummaryModalOpen}
          onClose={() => setIsSummaryModalOpen(false)}
          metrics={fluencyMetrics}
          onRetry={() => {
            setIsSummaryModalOpen(false);
            startRecording();
          }}
        />
      </div>
    </div>
  );
}
