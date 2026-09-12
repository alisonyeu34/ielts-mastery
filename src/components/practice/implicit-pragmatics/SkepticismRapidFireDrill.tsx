"use client";

import React from "react";
import { PragmaticExcerptItem } from "@/data/mockPragmaticsDecoderData";
import { Zap, CheckCircle2, XCircle, AlertTriangle, ArrowRight, Sparkles } from "lucide-react";

interface SkepticismRapidFireDrillProps {
  excerpt: PragmaticExcerptItem;
  userSelectedOption: number | null;
  isSubmitted: boolean;
  onSubmitAnswer: (index: number) => void;
  onNextExcerpt?: () => void;
}

export const SkepticismRapidFireDrill: React.FC<SkepticismRapidFireDrillProps> = ({
  excerpt,
  userSelectedOption,
  isSubmitted,
  onSubmitAnswer,
  onNextExcerpt
}) => {
  const { drillQuestion } = excerpt;

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <h3 className="font-semibold text-slate-200 text-sm">
            Đấu Trường Phản Xạ: Giải Mã Lập Trường Tác Giả (Implicit Stance Drill)
          </h3>
        </div>
        <span className="text-xs text-amber-300 bg-amber-950/60 border border-amber-800/60 px-2.5 py-0.5 rounded-full font-mono font-medium">
          Cambridge Passage 3 Question Type
        </span>
      </div>

      {/* Question prompt */}
      <div className="text-sm font-semibold text-slate-100 leading-relaxed">
        {drillQuestion.questionText}
      </div>

      {/* 4 Options */}
      <div className="space-y-2.5">
        {drillQuestion.options.map((opt, idx) => {
          const isSelected = userSelectedOption === idx;
          const isCorrect = idx === drillQuestion.correctIndex;
          const isLiteralTrap = idx === drillQuestion.literalTrapIndex;

          let btnStyle = "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60";
          if (isSubmitted) {
            if (isCorrect) {
              btnStyle = "bg-emerald-950/50 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500 shadow-md shadow-emerald-500/10";
            } else if (isSelected) {
              btnStyle = "bg-rose-950/50 border-rose-500 text-rose-200 ring-1 ring-rose-500";
            } else if (isLiteralTrap) {
              btnStyle = "bg-amber-950/30 border-amber-500/50 text-amber-300/80 border-dashed";
            }
          } else if (isSelected) {
            btnStyle = "bg-indigo-950/60 border-indigo-500 text-indigo-100 ring-1 ring-indigo-500";
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={isSubmitted}
              onClick={() => onSubmitAnswer(idx)}
              className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-mono text-[11px] font-bold shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="font-sans leading-relaxed">{opt}</span>
              </div>

              {isSubmitted && (
                <div className="shrink-0 ml-2">
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isSelected ? (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  ) : isLiteralTrap ? (
                    <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40">
                      BẪY NGHĨA ĐEN
                    </span>
                  ) : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Banner after Submission */}
      {isSubmitted && (
        <div
          className={`p-4 rounded-xl border text-xs space-y-2 animate-fadeIn ${
            userSelectedOption === drillQuestion.correctIndex
              ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
              : userSelectedOption === drillQuestion.literalTrapIndex
              ? "bg-amber-950/40 border-amber-500/50 text-amber-200"
              : "bg-rose-950/40 border-rose-500/40 text-rose-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold">
              {userSelectedOption === drillQuestion.correctIndex
                ? "Chính Xác! Bạn Đã Bắt Được Hàm Ý Ẩn Của Cambridge."
                : userSelectedOption === drillQuestion.literalTrapIndex
                ? "BẠN ĐÃ MẮC BẪY NGHĨA ĐEN (LITERAL TRAP)!"
                : "Chưa Chính Xác."}
            </span>
          </div>

          <p className="leading-relaxed font-sans">{drillQuestion.explanation}</p>
        </div>
      )}
    </div>
  );
};
