'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Radio,
  Send,
  Zap,
  Sliders
} from 'lucide-react';
import { useAcousticChaosSession } from '@/hooks/useAcousticChaosSession';
import { MultiChannelNoiseRack } from '@/components/practice/acoustic-chaos/MultiChannelNoiseRack';
import { SNRSpectrumBar } from '@/components/practice/acoustic-chaos/SNRSpectrumBar';
import { AcousticSpikeDetector } from '@/components/practice/acoustic-chaos/AcousticSpikeDetector';
import { ChaosExamQuestionSheet } from '@/components/practice/acoustic-chaos/ChaosExamQuestionSheet';
import { NoiseImmunityIndexGauge } from '@/components/practice/acoustic-chaos/NoiseImmunityIndexGauge';
import { AcousticChaosSummaryModal } from '@/components/practice/acoustic-chaos/AcousticChaosSummaryModal';

export default function AcousticChaosPage() {
  const {
    tracks,
    currentTrack,
    selectedTrackId,
    selectTrack,
    isPlaying,
    elapsedSeconds,
    snrDb,
    updateSNR,
    autoInoculation,
    setAutoInoculation,
    channels,
    updateChannelVolume,
    toggleMute,
    startPlayback,
    pausePlayback,
    triggerManualSpike,
    lastSpikeEvent,
    userAnswers,
    handleAnswerChange,
    submitExam,
    isSubmitted,
    scorePercentage,
    noiseImmunityIndex,
    showSummaryModal,
    setShowSummaryModal
  } = useAcousticChaosSession();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            href="/practice"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold font-mono uppercase">
                Step 98 / 100 • Psycho-Acoustics
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Giai Đoạn 3: Miễn Dịch Tạp m & Xung Kích Thính Giác
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2.5">
              <Volume2 className="w-6 h-6 text-indigo-400" />
              High-Fidelity Ambient Acoustic Chaos Studio
            </h1>
          </div>
        </div>

        {/* Master Control Bar */}
        <div className="flex items-center gap-3">
          {isPlaying ? (
            <button
              type="button"
              onClick={pausePlayback}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-600/30 transition-all cursor-pointer"
            >
              <Pause className="w-4 h-4" />
              Tạm Dừng Tạp m
            </button>
          ) : (
            <button
              type="button"
              onClick={startPlayback}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer animate-pulse"
            >
              <Play className="w-4 h-4" />
              Bắt Đầu Luyện Nghe Tạp m
            </button>
          )}

          <button
            type="button"
            disabled={isSubmitted}
            onClick={submitExam}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            Nộp Bài & Đánh Giá NII
          </button>
        </div>
      </div>

      {/* Track Selector Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <Radio className="w-4 h-4 text-indigo-400" />
          <span>Chọn bài thi giả lập tạp âm Cambridge:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tracks.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => selectTrack(t.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                selectedTrackId === t.id
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-300'
              }`}
            >
              {t.cambridgeRef} ({t.sectionType === 'section_4_lecture' ? 'Section 4' : 'Section 3'})
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Audio Rack, SNR Controller & Spike Inoculation */}
        <div className="lg:col-span-5 space-y-6">
          {/* 4-Channel Mixer */}
          <MultiChannelNoiseRack
            channels={channels}
            isPlaying={isPlaying}
            onStart={startPlayback}
            onPause={pausePlayback}
            onUpdateVolume={updateChannelVolume}
            onToggleMute={toggleMute}
            autoInoculation={autoInoculation}
            onToggleAutoInoculation={() => setAutoInoculation(!autoInoculation)}
          />

          {/* SNR Slider Bar */}
          <SNRSpectrumBar
            snrDb={snrDb}
            onUpdateSNR={updateSNR}
          />

          {/* Acoustic Spike Detector */}
          <AcousticSpikeDetector
            lastSpikeEvent={lastSpikeEvent}
            onTriggerSpike={triggerManualSpike}
            isPlaying={isPlaying}
          />

          {/* Noise Immunity Index Gauge */}
          <NoiseImmunityIndexGauge
            nii={noiseImmunityIndex}
            snrDb={snrDb}
            scorePercentage={scorePercentage}
          />
        </div>

        {/* Right Column: Question Sheet with Live Timing & Inputs */}
        <div className="lg:col-span-7">
          <ChaosExamQuestionSheet
            track={currentTrack}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            isSubmitted={isSubmitted}
            elapsedSeconds={elapsedSeconds}
          />
        </div>
      </div>

      {/* Summary Evaluation Modal */}
      <AcousticChaosSummaryModal
        isOpen={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        onRetry={() => selectTrack(selectedTrackId)}
        trackTitle={currentTrack.title}
        snrDb={snrDb}
        scorePercentage={scorePercentage}
        noiseImmunityIndex={noiseImmunityIndex}
        autoInoculation={autoInoculation}
      />
    </div>
  );
}
