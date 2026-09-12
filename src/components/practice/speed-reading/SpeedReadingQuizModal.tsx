"use client";

import React, { useState } from "react";
import { QuizQuestion } from "@/types/database";
import { CheckCircle2, HelpCircle, X, Sparkles } from "lucide-react";

interface SpeedReadingQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: QuizQuestion[];
  onSubmitQuiz: (answers: Record<string, number>) => void;
  currentWpm: number;
}

export const SpeedReadingQuizModal: React.FC<SpeedReadingQuizModalProps> = ({
  isOpen,
  onClose,
  questions,
  onSubmitQuiz,
  currentWpm,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  if (!isOpen) return null;

  const handleOptionSelect = (qId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
  };

  const isAllAnswered = questions.every((q) => selectedAnswers[q.id] !== undefined);

  const handleSubmit = () => {
    onSubmitQuiz(selectedAnswers);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative my-8 animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-5 mb-6 border-b border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Comprehension Check
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-slate-300">
                Pacing: {currentWpm} WPM
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-100 mt-0.5">
              Kiểm Tra Năng Lực Nắm Bắt Ý Bài Đọc
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-6 bg-slate-950 p-3.5 rounded-xl border border-slate-800 leading-relaxed">
          💡 Theo tiêu chuẩn khảo thí IELTS, tốc độ đọc chỉ có giá trị khi mức độ tiếp thu (Comprehension Rate) đạt từ <strong>67% trở lên</strong>. Hãy trả lời các câu hỏi dưới đây dựa trên những gì bạn vừa quét được.
        </p>

        {/* Question List */}
        <div className="space-y-6">
          {questions.map((q, qIndex) => {
            const currentSelected = selectedAnswers[q.id];

            return (
              <div
                key={q.id}
                className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800/80"
              >
                <h4 className="text-sm font-bold text-slate-200 mb-3.5 flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    {qIndex + 1}
                  </span>
                  <span>{q.question}</span>
                </h4>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isChecked = currentSelected === optIdx;
                    return (
                      <button
                        key={`${q.id}_opt_${optIdx}`}
                        onClick={() => handleOptionSelect(q.id, optIdx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                          isChecked
                            ? "bg-amber-500/20 border-amber-500 text-amber-200 font-semibold shadow-md shadow-amber-500/10"
                            : "bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
                        }`}
                      >
                        <span className="leading-relaxed">{opt}</span>
                        {isChecked && (
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <div className="mt-8 pt-5 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {Object.keys(selectedAnswers).length}/{questions.length} câu đã trả lời
          </span>

          <button
            onClick={handleSubmit}
            disabled={!isAllAnswered}
            className={`px-6 py-3 rounded-xl font-extrabold text-sm transition-all shadow-xl flex items-center gap-2 ${
              isAllAnswered
                ? "bg-gradient-to-r from-amber-500 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-slate-950 cursor-pointer shadow-amber-500/20"
                : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Nộp Bài & Đánh Giá Chỉ Số WPM</span>
          </button>
        </div>
      </div>
    </div>
  );
};
