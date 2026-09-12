'use client';

import React from 'react';
import { CognitiveTelemetryMetrics } from '@/lib/keystrokeDynamicsEngine';
import { ThreeHourExamPackage } from '@/data/mockThreeHourExamPackage';
import {
  Trophy,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Database,
  X
} from 'lucide-react';
import Link from 'next/link';

interface StaminaTelemetrySummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  telemetry: CognitiveTelemetryMetrics;
  examPackage: ThreeHourExamPackage;
  onReset: () => void;
}

export const StaminaTelemetrySummaryModal: React.FC<StaminaTelemetrySummaryModalProps> = ({
  isOpen,
  onClose,
  telemetry,
  examPackage,
  onReset
}) => {
  if (!isOpen) return null;

  const bff = telemetry.brainFogFactor;
  const isHighFatigue = bff >= 65;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-rose-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Trophy className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Báo Cáo Sức Bền Nhận Thức Phòng Thi 3 Giờ
              </h3>
              <p className="text-xs text-slate-400">
                {examPackage.packageName} • Đã lưu vào IndexedDB
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Brain Fog Factor</span>
            <div className={`text-2xl font-bold font-mono ${bff > 65 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {bff}%
            </div>
            <span className="text-[10px] text-slate-500">{telemetry.fatigueLabelVi}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Keystroke Flight</span>
            <div className="text-2xl font-bold text-indigo-400 font-mono">
              {telemetry.meanFlightTimeMs}ms
            </div>
            <span className="text-[10px] text-slate-500">Độ trễ thần kinh vận động</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Corrections</span>
            <div className="text-2xl font-bold text-amber-400 font-mono">
              {telemetry.backspaceCount}
            </div>
            <span className="text-[10px] text-slate-500">Lần xóa sửa Backspace</span>
          </div>
        </div>

        {/* Fatigue Diagnostics & Knowledge vs Stamina Error Separation */}
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-indigo-300 uppercase flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-indigo-400" />
              Chẩn Đoán Phân Biệt: Lỗi Kiến Thức vs Lỗi Kiệt Sức Nhận Thức
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isHighFatigue
                ? 'Các lỗi cú pháp (rơi đuôi -s/ed, câu cụt, lặp từ) ở phần Writing Task 2 phát sinh do Hiện tượng suy kiệt bộ nhớ làm việc (Working Memory Depletion) ở phút thứ 130+, không phải do bạn hổng ngữ pháp căn bản.'
                : 'Khả năng kiểm soát sức bền thần kinh của bạn rất xuất sắc. Độ trôi chảy và tốc độ gõ phím được duy trì ổn định qua cả 3 chặng thi.'}
            </p>
          </div>
        </div>

        {/* Database telemetry */}
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-400" />
            <span>Đã ghi nhật ký vào <strong>IndexedDB (practice_logs & error_bank)</strong></span>
          </div>
          <span className="text-emerald-400 font-mono">100% Synced</span>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={() => {
              onReset();
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Luyện Lại 3-Hour Simulation
          </button>

          <Link
            href="/practice/reverse-engineering"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 shadow-lg transition-all"
          >
            Quay Lại Step 95: Reverse Engineering
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
