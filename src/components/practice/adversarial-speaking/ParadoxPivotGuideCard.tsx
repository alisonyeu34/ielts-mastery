'use client';

import React from 'react';
import { AdversarialScenario } from '@/data/mockAdversarialSpeakingData';
import { PIVOT_PHRASE_TEMPLATES } from '@/lib/speechInterruptionEngine';
import { Compass, Sparkles, BookOpen, Copy, Check } from 'lucide-react';

interface ParadoxPivotGuideCardProps {
  scenario: AdversarialScenario;
  selectedPivotStrategy: string;
  setSelectedPivotStrategy: (strat: string) => void;
}

export const ParadoxPivotGuideCard: React.FC<ParadoxPivotGuideCardProps> = ({
  scenario,
  selectedPivotStrategy,
  setSelectedPivotStrategy
}) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const plan = scenario.interruptionPlan;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-400" />
            3-Second Seamless Pivot Framework
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Bộ khung câu mẫu phản ứng nhanh giúp xoay chuyển tình thế trong 3 giây đầu sau ngắt lời.
          </p>
        </div>
      </div>

      {/* 3 Strategy Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PIVOT_PHRASE_TEMPLATES.map((strat, idx) => {
          const isSelected = selectedPivotStrategy === strat.type;
          return (
            <div
              key={strat.type}
              onClick={() => setSelectedPivotStrategy(strat.type)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-indigo-950/40 border-indigo-500 shadow-lg ring-1 ring-indigo-500'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold text-indigo-300">
                <span>{strat.label}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(strat.template, idx);
                  }}
                  className="p-1 text-slate-400 hover:text-white"
                  title="Copy câu mẫu"
                >
                  {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                {strat.vietnamese}
              </div>
              <p className="text-xs text-slate-200 mt-2 font-serif italic leading-relaxed">
                "{strat.template}"
              </p>
            </div>
          );
        })}
      </div>

      {/* Model Band 8.5+ Pivot Response */}
      <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
          <span className="flex items-center gap-1.5 uppercase">
            <Sparkles className="w-4 h-4" />
            Mẫu Phản Hồi Xoay Chuyển Band 8.5+ Chuẩn Mực
          </span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
            BAND 8.5+ ORAL
          </span>
        </div>
        <p className="text-sm font-serif italic text-emerald-100 leading-relaxed">
          "{plan.modelBand85PivotResponse}"
        </p>
      </div>

      {/* C1/C2 Key Vocabulary Matrix */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          Vũ Khí Từ Vựng C1/C2 Phản Biện Tình Huống Này:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {plan.keyVocabulary.map((v, i) => (
            <div key={i} className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
              <div className="text-xs font-bold text-indigo-300 flex items-center justify-between">
                <span>{v.word}</span>
                <span className="text-[10px] text-slate-500 font-mono">{v.ipa}</span>
              </div>
              <div className="text-[11px] text-slate-300">{v.meaning}</div>
              <div className="text-[10px] text-indigo-400/80 italic">"{v.c1Usage}"</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
