'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Award,
  ShieldCheck,
  Sparkles,
  Sliders,
  CheckCircle2,
  Lock,
  Layers,
  Activity,
  ArrowRight
} from 'lucide-react';
import { useReadinessAuditSession } from '@/hooks/useReadinessAuditSession';
import { CRIPentagramRadar } from '@/components/readiness/CRIPentagramRadar';
import { UnifiedTelemetryMatrix } from '@/components/readiness/UnifiedTelemetryMatrix';
import { ReadinessDeficitRemediator } from '@/components/readiness/ReadinessDeficitRemediator';
import { CryptographicCertificateModal } from '@/components/readiness/CryptographicCertificateModal';
import { OfflineServiceWorkerIndicator } from '@/components/security/OfflineServiceWorkerIndicator';

export default function ReadinessAuditPage() {
  const {
    scenarios,
    selectedScenarioId,
    selectScenario,
    studentName,
    setStudentName,
    metrics,
    updateVectorMetric,
    criResult,
    isLoadingDB,
    issueDigitalCertificate,
    showCertificateModal,
    setShowCertificateModal,
    issuedCertificate
  } = useReadinessAuditSession();

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
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold font-mono uppercase">
                Step 99 / 100 • Orchestration
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Hợp Nhất 5 Module & Kiểm Định Vượt Vũ Môn
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2.5">
              <Award className="w-6 h-6 text-emerald-400" />
              Unified 5-Module Telemetry & Band 7.5 Readiness Certification
            </h1>
          </div>
        </div>

        {/* Master CTA Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={issueDigitalCertificate}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-extrabold rounded-2xl text-xs sm:text-sm flex items-center gap-2.5 shadow-xl shadow-emerald-600/30 transition-all cursor-pointer animate-pulse"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Thẩm Định & Cấp Chứng Chỉ Band 7.5+ (SHA-256)</span>
          </button>
        </div>
      </div>

      {/* Offline Status & Candidate Name Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        <div className="lg:col-span-8">
          <OfflineServiceWorkerIndicator />
        </div>
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">Tên Thí Sinh:</span>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-bold focus:border-emerald-500 focus:outline-none"
            placeholder="Nhập tên của bạn..."
          />
        </div>
      </div>

      {/* Preset Scenarios Selector Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl space-y-3 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <Sliders className="w-4 h-4 text-emerald-400" />
          <span>Chọn hồ sơ giả lập năng lực thực tế:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {scenarios.map((scen) => {
            const isSelected = scen.id === selectedScenarioId;
            return (
              <button
                key={scen.id}
                type="button"
                onClick={() => selectScenario(scen.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-950/30'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isSelected ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {scen.labelVi.split(':')[0]}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-amber-400">
                    CRI {scen.expectedCRI}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {scen.subtitleVi}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 5-Axis Spider Radar & Deficit Remediation */}
        <div className="lg:col-span-5 space-y-6">
          <CRIPentagramRadar metrics={metrics} criResult={criResult} />
          <ReadinessDeficitRemediator
            deficits={criResult.deficits}
            criScore={criResult.criScore}
          />
        </div>

        {/* Right Column: Unified 5-Module Matrix */}
        <div className="lg:col-span-7 space-y-6">
          <UnifiedTelemetryMatrix
            metrics={metrics}
            onUpdateMetric={updateVectorMetric}
          />
        </div>
      </div>

      {/* Next Step 100 Banner */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Bước Cuối Cùng • Step 100 / 100
            </span>
          </div>
          <h3 className="text-base font-bold text-white">
            Nghi Thức Phòng Thi Ngày Thứ 180 & Két Sắt Dữ Liệu Mã Hóa
          </h3>
          <p className="text-xs text-slate-400">
            Khởi động thính giác 3 phút, luyện thanh khớp khẩu hình và kích hoạt Box Breathing 4-4-4-4.
          </p>
        </div>

        <Link
          href="/exam-day-protocol"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all shrink-0"
        >
          <span>Vào Phòng Nghi Thức Ngày 180</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Certificate Modal */}
      <CryptographicCertificateModal
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        certificate={issuedCertificate}
      />
    </div>
  );
}
