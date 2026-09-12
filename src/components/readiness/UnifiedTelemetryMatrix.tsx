'use client';

import React from 'react';
import { VectorMetrics } from '@/lib/readinessEvaluator';
import {
  Layers,
  BookOpen,
  Sparkles,
  Bug,
  Award,
  Activity,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface UnifiedTelemetryMatrixProps {
  metrics: VectorMetrics;
  onUpdateMetric: (key: keyof VectorMetrics, value: number) => void;
}

export const UnifiedTelemetryMatrix: React.FC<UnifiedTelemetryMatrixProps> = ({
  metrics,
  onUpdateMetric
}) => {
  const telemetryItems = [
    {
      key: 'theoryMastery' as const,
      moduleName: 'Module 1: Theory Hub',
      titleVi: 'Cổng Kiểm Soát Lý Thuyết Cốt Lõi (V_theory - 15%)',
      descVi: 'Tỷ lệ vượt qua Gateway Quiz (>=80%) của 12 thì, 14 dạng Reading, 4 Section Listening, Writing & Speaking.',
      icon: BookOpen,
      colorText: 'text-indigo-400',
      colorBg: 'bg-indigo-500/10',
      colorBorder: 'border-indigo-500/20',
      benchmark: 85
    },
    {
      key: 'fsrsStability' as const,
      moduleName: 'Module 4: FSRS Vocab Matrix',
      titleVi: 'Độ Ổn Định Trí Nhớ Từ Vựng (V_vocab - 20%)',
      descVi: '570 từ AWL & Collocations đạt độ ổn định S >= 30 ngày và xác suất gợi nhớ R >= 90%.',
      icon: Sparkles,
      colorText: 'text-purple-400',
      colorBg: 'bg-purple-500/10',
      colorBorder: 'border-purple-500/20',
      benchmark: 90
    },
    {
      key: 'errorExtinction' as const,
      moduleName: 'Module 5: Automated Error Bank',
      titleVi: 'Tốc Độ Triệt Tiêu Lỗi Tái Diễn (V_error - 25%)',
      descVi: 'Tỷ lệ hóa giải hoàn toàn lỗi sai theo quy tắc Two-Strike Mastery (làm đúng 2 lần liên tiếp).',
      icon: Bug,
      colorText: 'text-rose-400',
      colorBg: 'bg-rose-500/10',
      colorBorder: 'border-rose-500/20',
      benchmark: 90
    },
    {
      key: 'mockConvergence' as const,
      moduleName: 'Module 3: AI Grader & Mock Test',
      titleVi: 'Độ Hội Tụ Điểm Thi Thử (V_mock - 25%)',
      descVi: '3 bài Full Mock Test liên tiếp đạt Overall Band >= 7.5 và Delta giữa Pass 1 vs Pass 2 < 0.5 band.',
      icon: Award,
      colorText: 'text-amber-400',
      colorBg: 'bg-amber-500/10',
      colorBorder: 'border-amber-500/20',
      benchmark: 85
    },
    {
      key: 'staminaScore' as const,
      moduleName: 'Module 2: Sensory & Stamina Rack',
      titleVi: 'Sức Bền Thần Kinh & Miễn Dịch Tạp Âm (V_stamina - 15%)',
      descVi: 'Duy trì Brain Fog Factor (BFF) < 30% ở 20 phút cuối Task 2 dưới môi trường tạp âm SNR 8-12dB.',
      icon: Activity,
      colorText: 'text-emerald-400',
      colorBg: 'bg-emerald-500/10',
      colorBorder: 'border-emerald-500/20',
      benchmark: 85
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Hợp Nhất Dữ Liệu 5 Module (Unified Telemetry Matrix)</h3>
            <p className="text-xs text-slate-400">Điều chỉnh thanh trượt để thử nghiệm độ nhạy chỉ số CRI</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {telemetryItems.map((item) => {
          const Icon = item.icon;
          const currentVal = metrics[item.key] || 0;
          const isPassed = currentVal >= item.benchmark;

          return (
            <div
              key={item.key}
              className={`p-4 rounded-2xl border transition-all ${item.colorBg} ${item.colorBorder} space-y-3`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg bg-slate-900 ${item.colorText}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      {item.moduleName}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      {item.titleVi}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400">
                    Chuẩn: <strong className="text-amber-400">{item.benchmark}%</strong>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-base font-black font-mono ${isPassed ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {currentVal}%
                    </span>
                    {isPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.descVi}
              </p>

              {/* Slider for interactive adjustment */}
              <div className="pt-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={currentVal}
                  onChange={(e) => onUpdateMetric(item.key, parseInt(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
