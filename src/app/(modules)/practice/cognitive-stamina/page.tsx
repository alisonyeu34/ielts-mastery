'use client';

import React from 'react';
import Link from 'next/link';
import { useCognitiveStaminaSession } from '@/hooks/useCognitiveStaminaSession';
import { ThreeHourSimulationCanvas } from '@/components/practice/cognitive-stamina/ThreeHourSimulationCanvas';
import { KeystrokeDynamicsTelemetry } from '@/components/practice/cognitive-stamina/KeystrokeDynamicsTelemetry';
import { BrainFogIndicatorGauge } from '@/components/practice/cognitive-stamina/BrainFogIndicatorGauge';
import { MicroResetModal } from '@/components/practice/cognitive-stamina/MicroResetModal';
import { CognitiveDecayCurveChart } from '@/components/practice/cognitive-stamina/CognitiveDecayCurveChart';
import { StaminaTelemetrySummaryModal } from '@/components/practice/cognitive-stamina/StaminaTelemetrySummaryModal';
import { BatteryCharging, Activity, BookOpen, ArrowRight, Zap } from 'lucide-react';

export default function CognitiveStaminaPage() {
  const {
    examPackage,
    isRunning,
    startSimulation,
    pauseSimulation,
    resetSimulation,
    completeExam,
    jumpToMinute,
    simulationSpeedMultiplier,
    setSimulationSpeedMultiplier,
    telemetryMetrics,
    cognitiveCurvePoints,
    candidateEssayText,
    handleEssayChange,
    handleEssayKeyDown,
    handleEssayKeyUp,
    isMicroResetOpen,
    triggerMicroReset,
    completeMicroReset,
    showSummaryModal,
    setShowSummaryModal,
    activeSection
  } = useCognitiveStaminaSession();

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
                  Step 96/100
                </span>
                <span className="text-xs text-slate-400">
                  3-Hour Cognitive Ergonomics & Mental Stamina Telemetry Engine (Band 7.5 - 8.5+)
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <BatteryCharging className="w-6 h-6 text-rose-400" />
                Đo Lường & Quản Trị Suy Giảm Nhận Thức Phòng Thi 3 Giờ Liên Tục
              </h1>
            </div>
          </div>
        </div>

        {/* Top Section: Main 3-Hour Simulation Canvas */}
        <ThreeHourSimulationCanvas
          activeSection={activeSection}
          telemetry={telemetryMetrics}
          isRunning={isRunning}
          onStart={startSimulation}
          onPause={pauseSimulation}
          onReset={resetSimulation}
          onComplete={completeExam}
          onJumpToMinute={jumpToMinute}
          speedMultiplier={simulationSpeedMultiplier}
          setSpeedMultiplier={setSimulationSpeedMultiplier}
          candidateEssayText={candidateEssayText}
          onEssayChange={handleEssayChange}
          onEssayKeyDown={handleEssayKeyDown}
          onEssayKeyUp={handleEssayKeyUp}
          onTriggerMicroReset={triggerMicroReset}
        />

        {/* Telemetry Row: Keystroke Telemetry + Brain Fog Factor Gauge */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <KeystrokeDynamicsTelemetry telemetry={telemetryMetrics} />
          <BrainFogIndicatorGauge
            telemetry={telemetryMetrics}
            onTriggerMicroReset={triggerMicroReset}
          />
        </div>

        {/* Cognitive Decay Curve 180-min Chart */}
        <CognitiveDecayCurveChart
          curvePoints={cognitiveCurvePoints}
          currentMinute={telemetryMetrics.elapsedMinutes}
        />

        {/* Pedagogical Principle Footer Card */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 text-xs text-slate-400 space-y-2">
          <h4 className="font-bold text-slate-200 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-rose-400" />
            <span>Nguyên Lý Công Thái Học Nhận Thức (Cognitive Ergonomics):</span>
          </h4>
          <p className="leading-relaxed">
            Trong một kỳ thi kéo dài 180 phút liên tục, năng lượng glucose của vỏ não trước trán (<strong className="text-slate-200">Prefrontal Cortex</strong>) bị tiêu hao 70% từ phút thứ 110 trở đi. Hầu hết các lỗi cú pháp nghiêm trọng ở Task 2 (rơi mạo từ, nhầm thì, câu cụt) là do <strong className="text-rose-300">suy kiệt bộ nhớ làm việc (Working Memory Depletion)</strong> chứ không phải do hổng kiến thức. Áp dụng <strong className="text-emerald-300">Giao thức Micro-Reset 30s (Box Breathing)</strong> trước khi viết Body 2 giúp bơm oxy lên não, hạ nhịp tim và bảo toàn 100% độ chính xác ngữ pháp Band 8.0+.
          </p>
        </div>

        {/* Modals */}
        <MicroResetModal
          isOpen={isMicroResetOpen}
          onClose={() => completeMicroReset()}
          onComplete={completeMicroReset}
        />

        <StaminaTelemetrySummaryModal
          isOpen={showSummaryModal}
          onClose={() => setShowSummaryModal(false)}
          telemetry={telemetryMetrics}
          examPackage={examPackage}
          onReset={resetSimulation}
        />
      </div>
    </div>
  );
}
