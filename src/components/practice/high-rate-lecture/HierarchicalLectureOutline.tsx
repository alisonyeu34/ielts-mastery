"use client";

import React from "react";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Send,
  Sparkles,
  BookOpen,
  RotateCcw,
  AlertTriangle
} from "lucide-react";
import { LectureScenario } from "@/lib/timeStretchingDSP";

interface HierarchicalLectureOutlineProps {
  scenario: LectureScenario;
  userAnswers: Record<string, string>;
  onAnswerChange: (questionId: string, value: string) => void;
  isSubmitted: boolean;
  onSubmit: () => void;
  onReset: () => void;
}

export const HierarchicalLectureOutline: React.FC<HierarchicalLectureOutlineProps> = ({
  scenario,
  userAnswers,
  onAnswerChange,
  isSubmitted,
  onSubmit,
  onReset
}) => {
  const answeredCount = Object.values(userAnswers).filter((v) => v.trim().length > 0).length;
  const totalQuestions = scenario.questions.length;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Dàn Ý Ghi Chú Bài Giảng Section 4 (Lecture Notes Outline)
            </h3>
            <p className="text-[11px] text-slate-400">
              Điền 1 từ duy nhất vào mỗi ô trống theo chuẩn đề thi Cambridge
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">
            Đã điền: <strong className="text-emerald-400">{answeredCount}/{totalQuestions}</strong>
          </span>
        </div>
      </div>

      {/* 10 Fill-in-the-Blank Questions List */}
      <div className="space-y-4">
        {scenario.questions.map((q) => {
          const userVal = userAnswers[q.id] || "";
          const isCorrect = userVal.trim().toLowerCase() === q.targetWord.toLowerCase();
          const isPluralTrap =
            q.grammarConstraint === "plural_noun" &&
            userVal.trim().length > 0 &&
            !userVal.trim().endsWith("s") &&
            q.targetWord.endsWith("s");

          return (
            <div
              key={q.id}
              className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-2"
            >
              {/* Context with Inline Input */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs md:text-sm text-slate-200 leading-relaxed font-serif">
                <span className="font-mono font-bold text-xs text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/30 mr-1">
                  Q{q.questionNumber}
                </span>
                <span>{q.blankPrefix}</span>
                <input
                  type="text"
                  value={userVal}
                  onChange={(e) => onAnswerChange(q.id, e.target.value)}
                  disabled={isSubmitted}
                  placeholder={`[${q.questionNumber}]...`}
                  className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold border transition-all focus:outline-none focus:ring-2 w-36 ${
                    isSubmitted
                      ? isCorrect
                        ? "bg-emerald-950/80 border-emerald-500 text-emerald-200"
                        : "bg-rose-950/80 border-rose-500 text-rose-200"
                      : "bg-slate-900 border-slate-700 text-white focus:ring-indigo-500"
                  }`}
                />
                <span>{q.blankSuffix}</span>
              </div>

              {/* Submitted Feedback */}
              {isSubmitted && (
                <div className="pt-2 border-t border-slate-850 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đúng ({q.targetWord})
                      </span>
                    ) : (
                      <span className="text-rose-400 font-bold flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> Đáp án đúng: <strong>{q.targetWord}</strong>
                      </span>
                    )}

                    {isPluralTrap && (
                      <span className="px-2 py-0.5 rounded bg-amber-900/60 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                        Bẫy thiếu số nhiều (-s)
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-400 italic">
                    {q.acousticTrapExplanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
        {!isSubmitted ? (
          <button
            onClick={onSubmit}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <Send className="w-4 h-4" />
            Nộp Bài & Kiểm Tra Độ Nhạy m Học
          </button>
        ) : (
          <button
            onClick={onReset}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Luyện Lại Bài Này
          </button>
        )}
      </div>
    </div>
  );
};
