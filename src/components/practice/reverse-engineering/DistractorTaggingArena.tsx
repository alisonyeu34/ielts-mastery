'use client';

import React from 'react';
import { DistractorTaggingDrillItem } from '@/data/mockReverseEngineeringData';
import { DistractorMechanism, DISTRACTOR_BLUEPRINTS } from '@/lib/distractorPsychometrics';
import {
  Tag,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';

interface DistractorTaggingArenaProps {
  currentDrill: DistractorTaggingDrillItem;
  currentDrillIndex: number;
  totalDrills: number;
  selectedOptionId: string | null;
  setSelectedOptionId: (id: string) => void;
  userAssignedTags: Record<string, DistractorMechanism>;
  onAssignTag: (optionId: string, trapType: DistractorMechanism) => void;
  onSubmit: () => void;
  onNext: () => void;
  drillScore: number;
  isSubmitted: boolean;
}

export const DistractorTaggingArena: React.FC<DistractorTaggingArenaProps> = ({
  currentDrill,
  currentDrillIndex,
  totalDrills,
  selectedOptionId,
  setSelectedOptionId,
  userAssignedTags,
  onAssignTag,
  onSubmit,
  onNext,
  drillScore,
  isSubmitted
}) => {
  const trapKeys: DistractorMechanism[] = [
    'polarity_inversion',
    'half_truth',
    'scope_escalation',
    'unwarranted_extrapolation'
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Drill #{currentDrillIndex + 1} / {totalDrills}
          </span>
          <h3 className="text-base font-bold text-white mt-1 flex items-center gap-2">
            <Tag className="w-5 h-5 text-purple-400" />
            Đấu Trường Gán Nhãn Bẫy Tốc Độ Cao (Distractor Tagging Arena)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Chọn 1 Đáp án Đúng (Key) VÀ Gắn nhãn chính xác cơ chế bẫy cho 3 phương án sai còn lại.
          </p>
        </div>

        {isSubmitted && (
          <div className="text-right">
            <span className="text-xs text-slate-400">Độ chính xác:</span>
            <div className="text-xl font-bold text-emerald-400">{drillScore}%</div>
          </div>
        )}
      </div>

      {/* Context Box */}
      <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs font-serif text-slate-300 leading-relaxed italic">
        {currentDrill.sourceContext}
      </div>

      {/* Question Stem */}
      <div className="text-sm font-bold text-white font-serif">
        {currentDrill.questionStem}
      </div>

      {/* 4 Options with Tag Selectors */}
      <div className="space-y-3">
        {currentDrill.options.map((opt, idx) => {
          const isSelectedKey = selectedOptionId === opt.id;
          const assignedTag = userAssignedTags[opt.id];
          const isCorrectKey = opt.isKey;

          return (
            <div
              key={opt.id}
              className={`p-4 rounded-2xl border transition-all ${
                isSelectedKey
                  ? 'bg-emerald-950/30 border-emerald-500 ring-1 ring-emerald-500'
                  : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                {/* Option selection Radio */}
                <div
                  onClick={() => !isSubmitted && setSelectedOptionId(opt.id)}
                  className="flex items-start gap-3 cursor-pointer flex-1"
                >
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                      isSelectedKey
                        ? 'border-emerald-500 bg-emerald-500 text-slate-950'
                        : 'border-slate-700 bg-slate-900 text-slate-400'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="text-xs text-slate-200 font-serif leading-relaxed">
                    {opt.text}
                  </div>
                </div>

                {/* Mark as Key button */}
                {!isSubmitted && (
                  <button
                    onClick={() => setSelectedOptionId(opt.id)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-colors shrink-0 ${
                      isSelectedKey
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {isSelectedKey ? '✓ Đáp án Đúng (Key)' : 'Chọn làm Key'}
                  </button>
                )}
              </div>

              {/* Tag Selector for Non-Key Options */}
              {!isSelectedKey && (
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-400">Gán nhãn bẫy:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {trapKeys.map((t) => {
                      const bp = DISTRACTOR_BLUEPRINTS[t];
                      const isTagSelected = assignedTag === t;

                      return (
                        <button
                          key={t}
                          disabled={isSubmitted}
                          onClick={() => onAssignTag(opt.id, t)}
                          className={`text-[10px] px-2.5 py-1 rounded-lg font-medium border transition-all ${
                            isTagSelected
                              ? 'bg-purple-600 text-white border-purple-400 shadow-md font-bold'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {bp.labelVi}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Submitted Feedback */}
              {isSubmitted && (
                <div className="mt-2.5 pt-2.5 border-t border-slate-800 text-[11px] space-y-1">
                  <div className="flex items-center gap-2">
                    {isCorrectKey ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> [ĐÁP ÁN ĐÚNG]
                      </span>
                    ) : (
                      <span className="text-rose-400 font-bold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> [BẪY KHẢO THÍ: {DISTRACTOR_BLUEPRINTS[opt.assignedTrapType || 'polarity_inversion'].labelVi}]
                      </span>
                    )}
                  </div>
                  <p className="text-slate-300 italic">{opt.explanationVi}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-xs text-slate-400">
          {!isSubmitted ? 'Hãy chọn 1 Key và gắn nhãn cho 3 phương án còn lại' : 'Đã hoàn thành thẩm định'}
        </div>

        {!isSubmitted ? (
          <button
            onClick={onSubmit}
            disabled={!selectedOptionId}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg transition-all"
          >
            Nộp Bài & Soi Cơ Chế Bẫy
          </button>
        ) : (
          <button
            onClick={onNext}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 shadow-lg transition-all flex items-center gap-2"
          >
            Câu Tiếp Theo
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
