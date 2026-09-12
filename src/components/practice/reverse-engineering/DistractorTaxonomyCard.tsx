'use client';

import React from 'react';
import { DISTRACTOR_BLUEPRINTS, DistractorMechanism } from '@/lib/distractorPsychometrics';
import { BookOpen, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';

export const DistractorTaxonomyCard: React.FC = () => {
  const blueprints = Object.values(DISTRACTOR_BLUEPRINTS);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-white font-bold text-base">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <span>Cẩm Nang 4 Cơ Chế Chế Tác Phương Án Nhiễu Cambridge</span>
        </div>
        <span className="text-xs text-indigo-400 font-semibold bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full">
          Psychometric Distractor Anatomy
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blueprints.map((bp) => (
          <div
            key={bp.type}
            className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">
                {bp.labelVi}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${bp.badgeClass}`}>
                {bp.labelEn}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {bp.descriptionVi}
            </p>

            {/* Example Box */}
            <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] space-y-1">
              <div className="text-slate-400">
                <span className="font-semibold text-emerald-400">Đoạn gốc:</span> "{bp.examplePassageText}"
              </div>
              <div className="text-slate-300">
                <span className="font-semibold text-rose-400">Phương án bẫy:</span> "{bp.exampleTrapOption}"
              </div>
            </div>

            <div className="text-[11px] text-amber-300/90 flex items-start gap-1 pt-1">
              <span className="font-bold shrink-0">Bẫy Band 6.0:</span>
              <span>{bp.whyItDeceivesBand6}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
