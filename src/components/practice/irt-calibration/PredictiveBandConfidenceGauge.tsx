'use client';

import React from 'react';
import { ThetaEstimationResult } from '@/lib/irtEngine';
import { Award, Zap, ShieldCheck, Target, RefreshCw } from 'lucide-react';

interface PredictiveBandConfidenceGaugeProps {
  thetaResult: ThetaEstimationResult;
  onSetPresetLevel: (level: 'band_5_5' | 'band_7_0' | 'band_7_5' | 'band_8_5') => void;
  onSaveToDB: () => void;
  isSaved: boolean;
}

export const PredictiveBandConfidenceGauge: React.FC<PredictiveBandConfidenceGaugeProps> = ({
  thetaResult,
  onSetPresetLevel,
  onSaveToDB,
  isSaved
}) => {
  const ci = thetaResult.confidenceInterval95;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            Dự Báo Band Score Đa Biến & Khoảng Tin Cậy 95%
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Dựa trên mô hình Khảo thí IRT 3PL và Hàm thông tin Fisher.
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onSetPresetLevel('band_5_5')}
            className="px-2 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Mẫu B5.5
          </button>
          <button
            onClick={() => onSetPresetLevel('band_7_0')}
            className="px-2 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Mẫu B7.0
          </button>
          <button
            onClick={() => onSetPresetLevel('band_7_5')}
            className="px-2 py-1 text-[11px] rounded-lg bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 transition-colors font-bold"
          >
            Mẫu B7.5
          </button>
          <button
            onClick={() => onSetPresetLevel('band_8_5')}
            className="px-2 py-1 text-[11px] rounded-lg bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 transition-colors font-bold"
          >
            Mẫu B8.5
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center items-center">
        {/* Predicted Band */}
        <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 uppercase font-semibold">Predicted Band Score</span>
          <div className="text-4xl font-black text-amber-400 font-mono">
            {thetaResult.predictedBand.toFixed(1)}
          </div>
          <span className="text-xs text-slate-400">
            95% CI: [{ci.lowerBand.toFixed(1)} - {ci.upperBand.toFixed(1)}]
          </span>
        </div>

        {/* Probability of Band 7.5 */}
        <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 uppercase font-semibold">Xác Suất Đạt Band 7.5+</span>
          <div className={`text-4xl font-black font-mono ${thetaResult.probabilityOfPassingBand75 >= 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {thetaResult.probabilityOfPassingBand75}%
          </div>
          <span className="text-[11px] text-slate-500">
            {thetaResult.probabilityOfPassingBand75 >= 80 ? 'Vượt ngưỡng an toàn' : 'Cần củng cố thêm'}
          </span>
        </div>

        {/* Psychometric Measurement Precision */}
        <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 uppercase font-semibold">Sai Số Đo Lường (SE)</span>
          <div className="text-2xl font-bold text-indigo-400 font-mono mt-1">
            ±{thetaResult.standardError} <span className="text-xs text-slate-500">SE(θ)</span>
          </div>
          <span className="text-[10px] text-slate-500">
            Fisher Info I(θ): {thetaResult.fisherInformation}
          </span>
        </div>
      </div>

      {/* Action to Save to DB */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-slate-400">
          Thuật toán Newton-Raphson hội tụ sau {thetaResult.convergenceIterations} vòng lặp.
        </span>

        <button
          onClick={onSaveToDB}
          disabled={isSaved}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 disabled:opacity-50 shadow-lg transition-all"
        >
          {isSaved ? '✓ Đã Lưu Định Cỡ IRT' : 'Lưu Hồ Sơ Khảo Thí Vào Dexie DB'}
        </button>
      </div>
    </div>
  );
};
