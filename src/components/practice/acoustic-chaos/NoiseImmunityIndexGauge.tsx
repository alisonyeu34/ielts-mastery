'use client';

import React from 'react';
import { ShieldCheck, ShieldAlert, ShieldX, Sparkles, Radio, Zap } from 'lucide-react';

interface NoiseImmunityIndexGaugeProps {
  nii: number; // 0 - 100
  snrDb: number;
  scorePercentage: number;
}

export const NoiseImmunityIndexGauge: React.FC<NoiseImmunityIndexGaugeProps> = ({
  nii,
  snrDb,
  scorePercentage
}) => {
  // Classification
  let tierInfo = {
    title: 'Acoustic Fortress (Band 8.5+)',
    desc: 'Lá chắn thính giác thép: Bạn duy trì khả năng bóc tách từ khóa hoàn hảo ngay cả khi SNR chạm ngưỡng 3 - 6dB.',
    colorText: 'text-emerald-400',
    colorBg: 'bg-emerald-500/10',
    colorBorder: 'border-emerald-500/30',
    icon: ShieldCheck
  };

  if (nii < 50) {
    tierInfo = {
      title: 'Acoustic Fragile (Band <6.0)',
      desc: 'Dễ suy sụp nhận thức khi SNR < 15dB. Cần tăng cường luyện nghe qua lọc Biquad và tiếng ồn nền.',
      colorText: 'text-red-400',
      colorBg: 'bg-red-500/10',
      colorBorder: 'border-red-500/30',
      icon: ShieldX
    };
  } else if (nii < 70) {
    tierInfo = {
      title: 'Vulnerable Target (Band 6.0 - 7.0)',
      desc: 'Bị phân tâm bởi tiếng ho đột ngột hoặc tiếng gõ bàn phím nhịp nhanh. Dễ rơi rụng các âm đuôi và liên kết từ.',
      colorText: 'text-amber-400',
      colorBg: 'bg-amber-500/10',
      colorBorder: 'border-amber-500/30',
      icon: ShieldAlert
    };
  } else if (nii < 85) {
    tierInfo = {
      title: 'Resilient Focus (Band 7.5 - 8.0)',
      desc: 'Duy trì trường tập trung thính giác tốt. Có thể xử lý các bài giảng Section 4 với SNR từ 8 - 12dB.',
      colorText: 'text-sky-400',
      colorBg: 'bg-sky-500/10',
      colorBorder: 'border-sky-500/30',
      icon: ShieldCheck
    };
  }

  const IconComponent = tierInfo.icon;
  const strokeDashoffset = 283 - (283 * Math.min(100, Math.max(0, nii))) / 100;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Auditory Noise Immunity Index (NII)</h3>
            <p className="text-xs text-slate-400">Chỉ số miễn dịch tạp âm và duy trì trường tập trung thính giác</p>
          </div>
        </div>
        <span className="text-xs font-mono font-medium text-slate-400">
          SNR Test Level: <strong className="text-amber-400">{snrDb} dB</strong>
        </span>
      </div>

      {/* Gauge and Breakdown */}
      <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
        {/* Radial Progress Ring */}
        <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              className="text-slate-800"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              className="text-indigo-500 transition-all duration-1000 ease-out"
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-black text-white font-mono">{nii}</span>
            <span className="text-[10px] font-bold text-indigo-400 tracking-wider">NII SCORE</span>
          </div>
        </div>

        {/* Tier Description */}
        <div className="space-y-3 flex-1">
          <div
            className={`p-3.5 rounded-xl border ${tierInfo.colorBg} ${tierInfo.colorBorder} space-y-1.5`}
          >
            <div className="flex items-center gap-2">
              <IconComponent className={`w-4 h-4 ${tierInfo.colorText}`} />
              <span className={`text-xs font-bold ${tierInfo.colorText}`}>
                {tierInfo.title}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {tierInfo.desc}
            </p>
          </div>

          {/* Mini telemetry bars */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400">Độ chính xác bài thi:</span>
              <div className="flex items-center justify-between font-mono font-bold text-white">
                <span>{scorePercentage}%</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400">Kháng lấn âm HVAC:</span>
              <div className="flex items-center justify-between font-mono font-bold text-white">
                <span>{Math.round(nii * 0.95)}%</span>
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
