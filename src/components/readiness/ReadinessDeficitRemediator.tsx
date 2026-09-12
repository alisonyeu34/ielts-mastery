'use client';

import React from 'react';
import Link from 'next/link';
import { CRICalculationResult } from '@/lib/readinessEvaluator';
import { ShieldCheck, AlertCircle, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface ReadinessDeficitRemediatorProps {
  deficits: CRICalculationResult['deficits'];
  criScore: number;
}

export const ReadinessDeficitRemediator: React.FC<ReadinessDeficitRemediatorProps> = ({
  deficits,
  criScore
}) => {
  if (deficits.length === 0) {
    return (
      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-3xl p-6 shadow-xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-emerald-300">
              Không Còn Lỗ Hổng Kiến Thức Hoặc Thần Kinh (Zero Critical Deficits)
            </h3>
            <p className="text-xs text-emerald-400/80">
              Tất cả 5 vector năng lực đều đã vượt ngưỡng chuẩn khảo thí Band 7.5 của Đại học Cambridge.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Toa Thuốc Khắc Phục Lỗ Hổng Cấp Tốc (Remediation Actions)</h3>
            <p className="text-xs text-slate-400">
              {deficits.length} hạng mục cần gia cố để nâng chỉ số CRI từ {criScore}% lên ngưỡng chứng thực (&ge; 88%)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deficits.map((def, i) => (
          <div
            key={i}
            className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-1.5">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <h4 className="text-xs font-bold text-slate-200">
                  {def.titleVi}
                </h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pl-6">
                {def.descriptionVi}
              </p>
            </div>

            <div className="pl-6 pt-2">
              <Link
                href={def.actionHref}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/20"
              >
                <span>{def.actionLabelVi}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
