'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Sliders,
  TrendingUp,
  Brain,
  Activity,
  Save,
  CheckCircle2,
  Sparkles,
  Award,
  Layers
} from 'lucide-react';
import { useIRTCaliSession } from '@/hooks/useIRTCaliSession';
import { ItemCharacteristicCurveCanvas } from '@/components/practice/irt-calibration/ItemCharacteristicCurveCanvas';
import { ThetaAbilityDistributionChart } from '@/components/practice/irt-calibration/ThetaAbilityDistributionChart';
import { PredictiveBandConfidenceGauge } from '@/components/practice/irt-calibration/PredictiveBandConfidenceGauge';
import { ItemParametersBreakdownTable } from '@/components/practice/irt-calibration/ItemParametersBreakdownTable';
import { IRTDiagnosticSummaryModal } from '@/components/practice/irt-calibration/IRTDiagnosticSummaryModal';

export default function IRTCalibrationPage() {
  const {
    items,
    selectedItemId,
    setSelectedItemId,
    selectedItem,
    userResponses,
    toggleItemResponse,
    setPresetCandidateLevel,
    thetaResult,
    saveCalibrationToDB,
    isSavedToDB,
    showSummaryModal,
    setShowSummaryModal
  } = useIRTCaliSession();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Navigation */}
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
                Step 97 / 100 • Psychometrics
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Giai Đoạn 3: Năng Lực Ẩn & Mô Hình Khảo Thí 3PL
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2.5">
              <Brain className="w-6 h-6 text-indigo-400" />
              Item Response Theory (IRT 3PL) Calibration Studio
            </h1>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={saveCalibrationToDB}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            {isSavedToDB ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {isSavedToDB ? 'Đã Lưu Vào Hồ Sơ Khảo Thí' : 'Lưu & Phân Tích Chuyên Sâu'}
          </button>
        </div>
      </div>

      {/* Preset Level Quick Selector */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <Sliders className="w-4 h-4 text-indigo-400" />
          <span>Giả lập hồ sơ năng lực thí sinh:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setPresetCandidateLevel('band_5_5')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-all cursor-pointer"
          >
            Mức 1: Band 5.5 (θ ≈ -0.80)
          </button>
          <button
            type="button"
            onClick={() => setPresetCandidateLevel('band_7_0')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-all cursor-pointer"
          >
            Mức 2: Band 7.0 (θ ≈ +0.45)
          </button>
          <button
            type="button"
            onClick={() => setPresetCandidateLevel('band_7_5')}
            className="px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 hover:text-white text-xs font-bold border border-indigo-500/40 transition-all cursor-pointer"
          >
            Mức 3: Mục Tiêu Band 7.5 (θ ≈ +1.20)
          </button>
          <button
            type="button"
            onClick={() => setPresetCandidateLevel('band_8_5')}
            className="px-3 py-1.5 rounded-lg bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 hover:text-white text-xs font-bold border border-amber-500/40 transition-all cursor-pointer"
          >
            Mức 4: Master Band 8.5+ (θ ≈ +2.15)
          </button>
        </div>
      </div>

      {/* Main Psychometric Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Predictive Band Gauge & Ability Distribution */}
        <div className="lg:col-span-5 space-y-6">
          <PredictiveBandConfidenceGauge
            thetaResult={thetaResult}
            onSetPresetLevel={setPresetCandidateLevel}
            onSaveToDB={saveCalibrationToDB}
            isSaved={isSavedToDB}
          />
          <ThetaAbilityDistributionChart
            thetaResult={thetaResult}
          />
        </div>

        {/* Right Column: Interactive HTML5 Canvas for Item Characteristic Curve (ICC) */}
        <div className="lg:col-span-7">
          <ItemCharacteristicCurveCanvas
            item={selectedItem}
            studentTheta={thetaResult.theta}
          />
        </div>
      </div>

      {/* Calibrated Items Parameter Matrix Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white">
              Bảng Ma Trận Tham Số 12 Câu Hỏi Cambridge Calibrated (3PL Parameters)
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Click vào dòng để xem đường cong đặc trưng (ICC) tương ứng
          </span>
        </div>
        <ItemParametersBreakdownTable
          items={items}
          userResponses={userResponses}
          studentTheta={thetaResult.theta}
          selectedItemId={selectedItemId}
          onSelectItem={setSelectedItemId}
          onToggleResponse={toggleItemResponse}
        />
      </div>

      {/* Diagnostic Summary Modal */}
      <IRTDiagnosticSummaryModal
        isOpen={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        thetaResult={thetaResult}
      />
    </div>
  );
}
