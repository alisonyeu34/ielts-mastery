'use client';

import React from 'react';
import Link from 'next/link';
import { useAdversarialSpeakingSession } from '@/hooks/useAdversarialSpeakingSession';
import { AdversarialExaminerAvatar } from '@/components/practice/adversarial-speaking/AdversarialExaminerAvatar';
import { TacticalInterruptionWorklet } from '@/components/practice/adversarial-speaking/TacticalInterruptionWorklet';
import { FluencyRecoveryLatencyMeter } from '@/components/practice/adversarial-speaking/FluencyRecoveryLatencyMeter';
import { ParadoxPivotGuideCard } from '@/components/practice/adversarial-speaking/ParadoxPivotGuideCard';
import { AudioCombatSpectrogram } from '@/components/practice/adversarial-speaking/AudioCombatSpectrogram';
import { AdversarialSpeakingSummaryModal } from '@/components/practice/adversarial-speaking/AdversarialSpeakingSummaryModal';
import { Swords, Sparkles, BookOpen, ArrowRight } from 'lucide-react';

export default function AdversarialSpeakingPage() {
  const {
    scenarios,
    currentScenario,
    selectedScenarioId,
    selectScenario,
    stage,
    elapsedSeconds,
    recoveryTimerMs,
    measuredLatencyMs,
    isMicActive,
    micVolume,
    audioFrequencyData,
    selectedPivotStrategy,
    setSelectedPivotStrategy,
    startSpeakingSession,
    triggerExaminerInterruption,
    manualResumeSpeech,
    completeSession,
    evaluationResult,
    showSummaryModal,
    setShowSummaryModal
  } = useAdversarialSpeakingSession();

  const handleNextScenario = () => {
    const currentIndex = scenarios.findIndex((s) => s.id === selectedScenarioId);
    const nextIndex = (currentIndex + 1) % scenarios.length;
    selectScenario(scenarios[nextIndex].id);
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
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Step 94/100
                </span>
                <span className="text-xs text-slate-400">
                  Speaking Part 3 High-Stakes Oral Assessment & Paradox Navigation
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <Swords className="w-6 h-6 text-rose-400" />
                Phòng Thử Nghiệm Tác Chiến: Giám Khảo Ngắt Lời & Truy Vấn Nghịch Lý
              </h1>
            </div>
          </div>

          {/* Scenario Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 whitespace-nowrap hidden md:inline">
              Chọn Tình Huống Oral Combat:
            </span>
            <select
              value={selectedScenarioId}
              onChange={(e) => selectScenario(e.target.value)}
              className="bg-slate-900 border border-slate-800 focus:border-rose-500 rounded-xl px-3 py-2 text-xs font-semibold text-white cursor-pointer"
            >
              {scenarios.map((s, idx) => (
                <option key={s.id} value={s.id}>
                  #{idx + 1} {s.topicTitle} ({s.examiner.name})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Top Grid: Avatar + Interactive Worklet */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <AdversarialExaminerAvatar
              scenario={currentScenario}
              stage={stage}
              micVolume={micVolume}
            />
          </div>

          <div className="lg:col-span-2">
            <TacticalInterruptionWorklet
              scenario={currentScenario}
              stage={stage}
              elapsedSeconds={elapsedSeconds}
              onStart={startSpeakingSession}
              onManualResume={manualResumeSpeech}
              onComplete={completeSession}
              onTriggerInterruptionNow={triggerExaminerInterruption}
            />
          </div>
        </div>

        {/* Live Audio Spectrogram & Fluency Recovery Latency Meter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FluencyRecoveryLatencyMeter
            stage={stage}
            recoveryTimerMs={recoveryTimerMs}
            measuredLatencyMs={measuredLatencyMs}
            evaluationResult={evaluationResult}
          />

          <AudioCombatSpectrogram
            frequencyData={audioFrequencyData}
            micVolume={micVolume}
            isMicActive={isMicActive}
          />
        </div>

        {/* 3-Second Seamless Pivot Framework Card */}
        <ParadoxPivotGuideCard
          scenario={currentScenario}
          selectedPivotStrategy={selectedPivotStrategy}
          setSelectedPivotStrategy={setSelectedPivotStrategy}
        />

        {/* Pedagogical Principle Footer Card */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 text-xs text-slate-400 space-y-2">
          <h4 className="font-bold text-slate-200 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-rose-400" />
            <span>Nguyên Lý Khảo Thí Fluency & Coherence (F&C) Part 3:</span>
          </h4>
          <p className="leading-relaxed">
            Trong kỳ thi IELTS Speaking thực tế, giám khảo bản xứ thường xuyên cố tình ngắt lời thí sinh ở Part 3 nhằm 2 mục đích:{' '}
            <strong className="text-rose-300">(1) Kiểm tra xem bạn có học vẹt câu trả lời thuộc lòng hay không</strong>, và{' '}
            <strong className="text-emerald-300">(2) Đánh giá phản xạ ngôn ngữ tự nhiên (Fluency Recovery) khi đối mặt với nghịch lý logic</strong>.
            Thí sinh đạt Band 8.0 - 8.5+ không bao giờ "đơ cứng" hay dùng "uhm/ah" quá 1.5 giây, mà lập tức sử dụng câu nhượng bộ phản đề (<code className="bg-slate-800 px-1 py-0.5 rounded text-indigo-300 font-mono">"That is indeed a legitimate caveat; however..."</code>) để tái lập thế chủ động.
          </p>
        </div>

        {/* Summary Modal */}
        <AdversarialSpeakingSummaryModal
          isOpen={showSummaryModal}
          onClose={() => setShowSummaryModal(false)}
          scenario={currentScenario}
          measuredLatencyMs={measuredLatencyMs}
          evaluationResult={evaluationResult}
          onReset={startSpeakingSession}
          onNextScenario={handleNextScenario}
        />
      </div>
    </div>
  );
}
