"use client";

import React from "react";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Target
} from "lucide-react";
import { CollocationMatchItem } from "@/lib/lexicalSemanticsEngine";

interface NaturalCollocationQuizArenaProps {
  quizItem: CollocationMatchItem;
  currentIndex: number;
  totalCount: number;
  userAnswerIndex: number | null;
  isAnswered: boolean;
  onSelectOption: (index: number) => void;
  onNext: () => void;
}

export const NaturalCollocationQuizArena: React.FC<NaturalCollocationQuizArenaProps> = ({
  quizItem,
  currentIndex,
  totalCount,
  userAnswerIndex,
  isAnswered,
  onSelectOption,
  onNext
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Đấu Trường Bắt Lỗi Kết Hợp Từ (Collocation Quiz Arena)
            </h3>
            <p className="text-[11px] text-slate-400">
              Lựa chọn cụm kết hợp bản xứ tự nhiên C1/C2 - Triệt tiêu bẫy dịch thô
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-slate-400">
          Câu {currentIndex + 1}/{totalCount}
        </span>
      </div>

      {/* Target Word & Prompt */}
      <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Từ khóa danh từ mục tiêu:</span>
        </div>
        <h4 className="text-sm md:text-base font-bold text-white font-serif">
          {quizItem.targetNounOrKeyword}
        </h4>
        <p className="text-xs text-slate-300">
          {quizItem.cambridgeAcademicContext}
        </p>
      </div>

      {/* 4 Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quizItem.options.map((opt, idx) => {
          const isSelected = userAnswerIndex === idx;
          const isCorrect = idx === quizItem.correctIndex;

          let btnStyle = "bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-200";

          if (isAnswered) {
            if (isCorrect) {
              btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500";
            } else if (isSelected && !isCorrect) {
              btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200 ring-2 ring-rose-500";
            } else {
              btnStyle = "bg-slate-950/30 border-slate-850 text-slate-500 opacity-50";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => onSelectOption(idx)}
              disabled={isAnswered}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${btnStyle}`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs md:text-sm font-bold font-serif">
                  {opt.verbOrModifier}
                </span>

                {isAnswered && isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
              </div>

              {isAnswered && (
                <div className="text-[10px] font-mono font-semibold text-slate-400">
                  {opt.examinerRating}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Answer Deep Explanation */}
      {isAnswered && userAnswerIndex !== null && (
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 animate-fade-in text-xs">
          <p className="text-slate-300 leading-relaxed">
            {quizItem.options[userAnswerIndex].feedback}
          </p>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onNext}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-colors"
            >
              Câu Tiếp Theo
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
