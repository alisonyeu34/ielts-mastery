'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Shield,
  FileText,
  Lock,
  Headphones,
  Mic,
  Wind,
  HardDrive,
  Sparkles,
  Award,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { useExamDayProtocolSession } from '@/hooks/useExamDayProtocolSession';
import { AcousticIgnitionPlayer } from '@/components/exam-day/AcousticIgnitionPlayer';
import { VocalApparatusWarmup } from '@/components/exam-day/VocalApparatusWarmup';
import { BoxBreathingZenPacer } from '@/components/exam-day/BoxBreathingZenPacer';
import { OnePageCheatSheetModal } from '@/components/exam-day/OnePageCheatSheetModal';
import { EncryptedVaultManager } from '@/components/security/EncryptedVaultManager';
import { OfflineServiceWorkerIndicator } from '@/components/security/OfflineServiceWorkerIndicator';

export default function ExamDayProtocolPage() {
  const {
    accentTracks,
    selectedAccentIndex,
    setSelectedAccentIndex,
    currentAccent,
    isPlayingAccent,
    playAccentAudio,
    pauseAccentAudio,
    vocalChants,
    selectedChantIndex,
    setSelectedChantIndex,
    isBreathingActive,
    breathingPhase,
    breathingCountdown,
    completedCycles,
    startBreathing,
    pauseBreathing,
    resetBreathing,
    cheatSheetSections,
    showCheatSheet,
    setShowCheatSheet
  } = useExamDayProtocolSession();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            href="/readiness-audit"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold font-mono uppercase">
                Step 100 / 100 • Grand Finale
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Nghi Thức Phòng Thi Ngày Thứ 165 & Két Sắt Dữ Liệu
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2.5">
              <Shield className="w-6 h-6 text-amber-400" />
              Day-165 Exam Day Protocol & Encrypted Vault
            </h1>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowCheatSheet(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-600/30 transition-all cursor-pointer animate-pulse"
          >
            <FileText className="w-4 h-4" />
            <span>Mở Cẩm Nang Cứu Nguy 60 Giây (The 1-Page Cheat Sheet)</span>
          </button>
        </div>
      </div>

      {/* PWA Offline Status Banner */}
      <OfflineServiceWorkerIndicator />

      {/* Main Protocol Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 4-4-4-4 Box Breathing & AES-GCM 256-bit Vault */}
        <div className="lg:col-span-5 space-y-6">
          <BoxBreathingZenPacer
            isActive={isBreathingActive}
            phase={breathingPhase}
            countdown={breathingCountdown}
            completedCycles={completedCycles}
            onStart={startBreathing}
            onPause={pauseBreathing}
            onReset={resetBreathing}
          />

          <EncryptedVaultManager />
        </div>

        {/* Right Column: Multi-Accent Ear Warmup & Vocal Chanting Warmup */}
        <div className="lg:col-span-7 space-y-6">
          <AcousticIgnitionPlayer
            tracks={accentTracks}
            selectedAccentIndex={selectedAccentIndex}
            onSelectAccentIndex={setSelectedAccentIndex}
            isPlaying={isPlayingAccent}
            onPlay={playAccentAudio}
            onPause={pauseAccentAudio}
          />

          <VocalApparatusWarmup
            chants={vocalChants}
            selectedChantIndex={selectedChantIndex}
            onSelectChantIndex={setSelectedChantIndex}
          />
        </div>
      </div>

      {/* Grand Milestones Celebration Banner */}
      <div className="p-8 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-emerald-950/30 border-2 border-emerald-500/40 rounded-3xl text-center space-y-4 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-widest font-mono">
          <Award className="w-4 h-4 text-emerald-400" />
          100 / 100 STEPS COMPLETED • 165-DAY ROADMAP REACHED
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white font-serif">
          Chúc Bạn Tự Tin Vượt Vũ Môn & Chinh Phục Band 7.5 - 8.5+!
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Bạn đã hoàn thành 100 bước rèn luyện khắt khe: Từ nhại giọng Shadowing thực chiến, ngữ pháp bản chất, 14 dạng bài Reading, 4 Section Listening, khung PEEL & Toulmin Task 2 đến đo lường tâm trắc học IRT 3PL và phòng thi 180 phút. Giờ là lúc bạn tỏa sáng!
        </p>
      </div>

      {/* Cheat Sheet Modal */}
      <OnePageCheatSheetModal
        isOpen={showCheatSheet}
        onClose={() => setShowCheatSheet(false)}
        sections={cheatSheetSections}
      />
    </div>
  );
}
