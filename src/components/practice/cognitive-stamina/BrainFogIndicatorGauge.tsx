'use client';

import React from 'react';
import { CognitiveTelemetryMetrics } from '@/lib/keystrokeDynamicsEngine';
import { Activity, Zap, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';

interface BrainFogIndicatorGaugeProps {
  telemetry: CognitiveTelemetryMetrics;
  onTriggerMicroReset: () => void;
}

export const BrainFogIndicatorGauge: React.FC<BrainFogIndicatorGaugeProps> = ({
  telemetry,
  onTriggerMicroReset
}) => {
  const bff = telemetry.brainFogFactor;
  const isHighAlert = bff >= 65;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-rose-400" />
          Brain Fog Factor (BFF) Gauge
        </h3>
        <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${telemetry.fatigueZone === 'critical_fog' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse' : 'bg-slate-800 text-slate-300 border-slate-700'}`}>
          {telemetry.fatigueLabelVi}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Main Gauge Meter */}
        <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-center space-y-2 relative overflow-hidden">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">
            Hệ Số Kiệt Sức Nhận Thức (0 - 100)
          </span>
          <div
            className={`text-5xl font-black font-mono tracking-tight transition-colors ${
              bff < 40 ? 'text-emerald-400' : bff < 60 ? 'text-blue-400' : bff < 70 ? 'text-amber-400' : 'text-rose-400'
            }`}
          >
            {bff}%
          </div>

          {/* Linear Progress Bar */}
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                bff < 40 ? 'bg-emerald-500' : bff < 60 ? 'bg-blue-500' : bff < 70 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${bff}%` }}
            />
          </div>
        </div>

        {/* Action / Warning Notice */}
        <div className="space-y-3">
          {isHighAlert ? (
            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-800/60 space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>BÁO ĐỘNG ĐỎ: VỎ NÃO TRƯỚC TRÁN CẠN KIỆT</span>
              </div>
              <p className="text-xs text-rose-200/90 leading-relaxed">
                Tỷ lệ xóa sửa vọt lên cao và thời gian chuyển ngón tăng 35%. Hãy kích hoạt ngay Micro-Reset 30s để phục hồi oxy não bộ.
              </p>
              <button
                onClick={onTriggerMicroReset}
                className="w-full py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Hít Thở Box Breathing 30s Ngay
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 text-xs text-slate-400 space-y-1">
              <span className="font-semibold text-slate-200">Ngưỡng cảnh báo sinh lý học:</span>
              <ul className="mt-1 space-y-1 text-[11px]">
                <li className="text-emerald-400">• Dưới 40%: Trạng thái Flow & Focus tối đa</li>
                <li className="text-amber-400">• 40% - 65%: Bắt đầu mỏi mắt & căng cơ ngón</li>
                <li className="text-rose-400">• Trên 65%: Nguy cơ gãy cấu trúc ngữ pháp Task 2</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
