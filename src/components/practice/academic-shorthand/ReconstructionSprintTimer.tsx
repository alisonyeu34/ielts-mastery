"use client";

import React from "react";
import { ShorthandQuestion } from "@/data/mockShorthandLecturesData";
import { AnswerValidationResult } from "@/lib/shorthandLexiconEngine";
import { Timer, CheckCircle2, XCircle, AlertTriangle, Lightbulb } from "lucide-react";

interface ReconstructionSprintTimerProps {
  questions: ShorthandQuestion[];
  userAnswers: Record<string, string>;
  onAnswerInput: (questionId: string, val: string) => void;
  gradingResults: { question: ShorthandQuestion; validation: AnswerValidationResult }[];
  sprintTimeRemaining: number;
  isTimerActive: boolean;
  shorthandNotes: string;
  onFinishSprint: () => void;
}

export const ReconstructionSprintTimer: React.FC<ReconstructionSprintTimerProps> = ({
  questions,
  userAnswers,
  onAnswerInput,
  gradingResults,
  sprintTimeRemaining,
  isTimerActive,
  shorthandNotes,
  onFinishSprint
}) => {
  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const timerColor =
    sprintTimeRemaining > 45
      ? "text-cyan-400"
      : sprintTimeRemaining > 15
      ? "text-amber-400 animate-pulse"
      : "text-rose-400 animate-bounce";

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-5">
      {/* Header bar with countdown timer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h3 className="font-semibold text-slate-200 text-sm">
            Phase 2: Reconstruction Sprint (Tái Tạo Đáp Án Từ Tốc Ký)
          </h3>
          <p className="text-xs text-slate-400">
            Điền từ còn thiếu vào chỗ trống. Yêu cầu tuân thủ nghiêm ngặt <strong>ONE WORD ONLY</strong> và đuôi số nhiều <strong>-s/-es</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700">
            <Timer className={`w-4 h-4 ${timerColor}`} />
            <span className="text-xs text-slate-400">Sprint Countdown:</span>
            <span className={`font-mono font-bold text-sm ${timerColor}`}>
              {formatTimer(sprintTimeRemaining)}
            </span>
          </div>

          <button
            type="button"
            onClick={onFinishSprint}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-500/20"
          >
            Hoàn Thành &amp; Chấm Điểm
          </button>
        </div>
      </div>

      {/* Captured Notes Quick Reference Box */}
      {shorthandNotes && (
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Sổ Tốc Ký Ghi Lại Của Bạn:</span>
          </div>
          <p className="font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
            {shorthandNotes}
          </p>
        </div>
      )}

      {/* Fill-in-the-blank Questions list */}
      <div className="space-y-4">
        {questions.map((q) => {
          const uAnswer = userAnswers[q.id] || "";
          const result = gradingResults.find((r) => r.question.id === q.id);
          const val = result?.validation;

          return (
            <div
              key={q.id}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700/80 transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-400">
                  Question {q.questionNumber} &bull; {q.sectionContext}
                </span>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
                  NO MORE THAN {q.maxWords} WORD{q.maxWords > 1 ? "S" : ""}
                </span>
              </div>

              {/* Inline fill-in-the-blank sentence */}
              <div className="text-sm text-slate-200 leading-relaxed flex flex-wrap items-center gap-2">
                <span>{q.preText}</span>
                <input
                  type="text"
                  value={uAnswer}
                  onChange={(e) => onAnswerInput(q.id, e.target.value)}
                  placeholder="Gõ đáp án..."
                  className="bg-slate-900 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-lg px-3 py-1 font-mono font-medium text-cyan-200 text-sm w-44 outline-none transition-all"
                />
                <span>{q.postText}</span>
              </div>

              {/* Shorthand Note Hint */}
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                <span className="text-amber-400">Shorthand Cue:</span>
                <span>{q.shorthandNoteCue}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
