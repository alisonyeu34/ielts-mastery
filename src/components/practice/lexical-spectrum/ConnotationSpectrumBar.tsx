"use client";

import React from "react";
import {
  LexicalConceptCluster,
  LexicalWordNuance,
  getConnotationColor
} from "@/lib/lexicalSemanticsEngine";
import { Sparkles, Sliders, Volume2, BookOpen, AlertCircle, Quote } from "lucide-react";

interface ConnotationSpectrumBarProps {
  cluster: LexicalConceptCluster;
  selectedScore: -2 | -1 | 0 | 1 | 2;
  onSelectScore: (score: -2 | -1 | 0 | 1 | 2) => void;
  activeWord: LexicalWordNuance;
}

export const ConnotationSpectrumBar: React.FC<ConnotationSpectrumBarProps> = ({
  cluster,
  selectedScore,
  onSelectScore,
  activeWord
}) => {
  const spectrumScores: (-2 | -1 | 0 | 1 | 2)[] = [-2, -1, 0, 1, 2];
  const activeColor = getConnotationColor(activeWord.connotationScore);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Quang Phổ Sắc Thái Từ Vựng (Connotation Spectrum)
            </h3>
            <p className="text-[11px] text-slate-400">
              5 nấc chuyển dịch sắc thái nghĩa: Tiêu cực gay gắt &rarr; Khách quan khoa học &rarr; Tán dương C2
            </p>
          </div>
        </div>

        <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${activeColor.badgeBg}`}>
          {activeWord.connotationLabel}
        </span>
      </div>

      {/* 5-Stop Gradient Bar */}
      <div className="space-y-2">
        <div className="relative h-4 rounded-full bg-gradient-to-r from-rose-600 via-amber-500 via-cyan-500 via-emerald-500 to-indigo-600 p-0.5 shadow-inner">
          <div className="flex justify-between items-center h-full px-2">
            {spectrumScores.map((score) => {
              const wordItem = cluster.wordsSpectrum.find((w) => w.connotationScore === score);
              const isSelected = selectedScore === score;
              const hasWord = !!wordItem;

              return (
                <button
                  key={score}
                  onClick={() => hasWord && onSelectScore(score)}
                  disabled={!hasWord}
                  className={`relative -top-1.5 w-7 h-7 rounded-full flex items-center justify-center font-mono text-[11px] font-bold transition-all ${
                    isSelected
                      ? "bg-white text-slate-950 scale-125 shadow-lg shadow-white/40 ring-4 ring-slate-950 z-10"
                      : hasWord
                      ? "bg-slate-900 text-white border-2 border-white/80 hover:scale-110 cursor-pointer"
                      : "bg-slate-800/60 text-slate-500 border border-slate-700 cursor-not-allowed opacity-40"
                  }`}
                  title={wordItem ? wordItem.word : "No word in this tier"}
                >
                  {score > 0 ? `+${score}` : score}
                </button>
              );
            })}
          </div>
        </div>

        {/* Labels below gradient */}
        <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-1 pt-1">
          <span className="text-rose-400">Pejorative (-2)</span>
          <span className="text-amber-400">Mild Negative (-1)</span>
          <span className="text-cyan-400">Neutral (0)</span>
          <span className="text-emerald-400">Favorable (+1)</span>
          <span className="text-indigo-400">Laudatory (+2)</span>
        </div>
      </div>

      {/* Word Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2 pt-1">
        {cluster.wordsSpectrum.map((item) => {
          const isSelected = selectedScore === item.connotationScore;
          const color = getConnotationColor(item.connotationScore);

          return (
            <button
              key={item.word}
              onClick={() => onSelectScore(item.connotationScore)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? `${color.bg} ${color.border} ring-2 ring-indigo-500 shadow-md`
                  : "bg-slate-950/50 border-slate-800 hover:border-slate-700 opacity-75 hover:opacity-100"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-mono font-bold ${color.text}`}>
                    Score: {item.connotationScore > 0 ? `+${item.connotationScore}` : item.connotationScore}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    Band {item.bandLevel.toFixed(1)}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white leading-tight line-clamp-1">
                  {item.word}
                </h4>
              </div>
              <span className="text-[10px] text-slate-400 line-clamp-1 mt-2">
                {item.vietnameseMeaning}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Word Deep Anatomy Card */}
      <div className={`p-4 rounded-xl border ${activeColor.bg} ${activeColor.border} space-y-3 animate-fade-in`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-white font-serif">
                {activeWord.word}
              </h4>
              <span className="text-xs font-mono text-slate-400">
                {activeWord.ipa}
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {activeWord.partOfSpeech}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 font-medium">
              Ý nghĩa: <strong>{activeWord.vietnameseMeaning}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300">
              Register: {activeWord.registerScore}/100 ({activeWord.registerCategory})
            </span>
          </div>
        </div>

        {/* Nuance & Thesaurus Misuse Alert */}
        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80">
            <span className="font-bold text-indigo-300 block mb-1">
              Phân tích sắc thái ngữ nghĩa (Nuance Explanation):
            </span>
            <p className="text-slate-300 leading-relaxed">
              {activeWord.nuanceExplanation}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-900/50">
            <span className="font-bold text-rose-300 flex items-center gap-1.5 mb-1">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
              Cảnh báo bẫy lạm dụng từ điển (Thesaurus Syndrome Trap):
            </span>
            <p className="text-rose-200/90 leading-relaxed">
              {activeWord.thesaurusMisuseTrap}
            </p>
          </div>
        </div>

        {/* Model Academic Sentence */}
        <div className="p-3 rounded-lg bg-slate-950/90 border border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1 mb-1">
            <Quote className="w-3 h-3" />
            Câu mẫu học thuật C1/C2 (Cambridge Model Sentence):
          </span>
          <p className="text-xs font-serif italic text-slate-200 leading-relaxed">
            &ldquo;{activeWord.modelAcademicSentence}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
};
