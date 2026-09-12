"use client";

import React from "react";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Send,
  Sparkles,
  BookOpen
} from "lucide-react";
import { Section3DialogueScenario, Section3Question } from "@/data/mockSection3DialoguesData";

interface Section3QuestionPaletteProps {
  scenario: Section3DialogueScenario;
  userAnswers: Record<string, string>;
  onSelectAnswer: (questionId: string, optionKey: string) => void;
  isSubmitted: boolean;
  onSubmit: () => void;
  onReset: () => void;
}

export const Section3QuestionPalette: React.FC<Section3QuestionPaletteProps> = ({
  scenario,
  userAnswers,
  onSelectAnswer,
  isSubmitted,
  onSubmit,
  onReset
}) => {
  const answeredCount = Object.keys(userAnswers).length;
  const totalQuestions = scenario.questions.length;
  const isAllAnswered = answeredCount === totalQuestions;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Bảng Câu Hỏi Khảo Thí Section 3 (Consensus Exam Questions)
            </h3>
            <p className="text-[11px] text-slate-400">
              Lựa chọn phương án được cả nhóm đồng thuận chung cuộc
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">
            Đã làm: <strong className="text-indigo-400">{answeredCount}/{totalQuestions}</strong>
          </span>
        </div>
      </div>

      {/* Question list */}
      <div className="space-y-6 mb-6">
        {scenario.questions.map((question) => {
          const selectedKey = userAnswers[question.id];

          return (
            <div
              key={question.id}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800"
            >
              {/* Question Header */}
              <div className="flex items-start gap-2.5 mb-3">
                <span className="px-2 py-0.5 text-xs font-mono font-bold rounded bg-indigo-950 text-indigo-300 border border-indigo-700/50 shrink-0 mt-0.5">
                  Q{question.questionNumber}
                </span>
                <h4 className="text-sm font-semibold text-slate-100 leading-snug">
                  {question.prompt}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2 mb-3">
                {question.options.map((opt) => {
                  const isChecked = selectedKey === opt.key;
                  let optionStyle = "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300";

                  if (isSubmitted) {
                    if (opt.key === question.correctKey) {
                      optionStyle = "bg-emerald-950/50 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500";
                    } else if (isChecked && !opt.isCorrect) {
                      optionStyle = "bg-rose-950/50 border-rose-500 text-rose-200 ring-1 ring-rose-500";
                    } else {
                      optionStyle = "bg-slate-900/40 border-slate-800/60 text-slate-500 opacity-60";
                    }
                  } else if (isChecked) {
                    optionStyle = "bg-indigo-950/60 border-indigo-500 text-indigo-200 ring-1 ring-indigo-500";
                  }

                  return (
                    <button
                      key={opt.key}
                      onClick={() => !isSubmitted && onSelectAnswer(question.id, opt.key)}
                      disabled={isSubmitted}
                      className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${optionStyle}`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {opt.key}
                      </span>
                      <div className="flex-1 text-xs md:text-sm leading-relaxed">
                        {opt.text}
                        {opt.distractorSpeaker && isSubmitted && !opt.isCorrect && (
                          <span className="block text-[10px] text-amber-400 mt-0.5">
                            (Ý kiến cá nhân của {opt.distractorSpeaker} - Chưa phải đồng thuận)
                          </span>
                        )}
                      </div>

                      {isSubmitted && opt.key === question.correctKey && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {isSubmitted && isChecked && !opt.isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanations after submission */}
              {isSubmitted && (
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/80 space-y-2 animate-fade-in text-xs">
                  {/* Correct Evidence */}
                  <div className="flex items-start gap-2 text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
                    <div>
                      <span className="font-bold">Chứng cứ đồng thuận: </span>
                      <span className="text-slate-200">{question.consensusEvidence}</span>
                    </div>
                  </div>

                  {/* Trap Explanation */}
                  <div className="flex items-start gap-2 text-amber-300">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                    <div>
                      <span className="font-bold">Giải mã bẫy khảo thí: </span>
                      <span className="text-slate-300">{question.trapExplanation}</span>
                    </div>
                  </div>
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
            disabled={!isAllAnswered}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
              isAllAnswered
                ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 cursor-pointer"
                : "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
            }`}
          >
            <Send className="w-4 h-4" />
            Nộp Bài & Phân Tích Đồng Thuận
          </button>
        ) : (
          <button
            onClick={onReset}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-slate-700 transition-colors"
          >
            Làm Lại Bài Này
          </button>
        )}
      </div>
    </div>
  );
};
