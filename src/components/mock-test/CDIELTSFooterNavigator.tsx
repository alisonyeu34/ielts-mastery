"use client";

import React from "react";
import {
  Flag,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CDIELTSFooterNavigatorProps {
  totalQuestions: number;
  activeQuestionNumber: number;
  onSelectQuestionNumber: (num: number) => void;
  answeredQuestionIds: Record<string, string>;
  questionsList: Array<{ id: string; questionNumber: number }>;
  flaggedQuestions: Set<number>;
  onToggleFlag: (qNum: number) => void;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}

export function CDIELTSFooterNavigator({
  totalQuestions,
  activeQuestionNumber,
  onSelectQuestionNumber,
  answeredQuestionIds,
  questionsList,
  flaggedQuestions,
  onToggleFlag,
  onPrev,
  onNext,
  className,
}: CDIELTSFooterNavigatorProps) {
  const answeredCount = questionsList.filter(
    (q) => answeredQuestionIds[q.id] && answeredQuestionIds[q.id].trim().length > 0
  ).length;

  const isCurrentFlagged = flaggedQuestions.has(activeQuestionNumber);

  // Split questions into 4 Parts / Passages (10 questions per group)
  const groups: Array<{ name: string; start: number; end: number }> = [
    { name: "Part 1 (Q1-10)", start: 1, end: 10 },
    { name: "Part 2 (Q11-20)", start: 11, end: 20 },
    { name: "Part 3 (Q21-30)", start: 21, end: 30 },
    { name: "Part 4 (Q31-40)", start: 31, end: 40 },
  ];

  return (
    <footer
      className={cn(
        "sticky bottom-0 z-40 w-full border-t border-border bg-slate-900 text-white p-3 sm:p-4 shadow-lg select-none",
        className
      )}
    >
      <div className="max-w-7xl mx-auto space-y-2.5">
        {/* Navigation Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <span>Đang làm:</span>
              <strong className="text-white text-sm font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                Câu {activeQuestionNumber}/{totalQuestions}
              </strong>
            </span>

            <span className="text-[11px] text-slate-400 font-mono">
              Đã trả lời: <strong className="text-emerald-400">{answeredCount}</strong>/{totalQuestions}
            </span>

            {flaggedQuestions.size > 0 && (
              <span className="text-[11px] text-amber-400 font-mono flex items-center gap-1">
                <Flag className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span>{flaggedQuestions.size} câu cần xem lại</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Back Button (Alt + B) */}
            <button
              type="button"
              onClick={onPrev}
              disabled={activeQuestionNumber <= 1}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 cursor-pointer",
                activeQuestionNumber <= 1
                  ? "opacity-40 cursor-not-allowed bg-slate-800 border-slate-700 text-slate-500"
                  : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-white"
              )}
              title="Quay lại câu trước (Phím tắt: Alt + B hoặc Shift + Tab)"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back (Alt+B)</span>
            </button>

            {/* Flag / Review Toggle Button (Alt + F) */}
            <button
              type="button"
              onClick={() => onToggleFlag(activeQuestionNumber)}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer",
                isCurrentFlagged
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow-sm"
                  : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-amber-400"
              )}
              title="Đánh dấu câu cần kiểm tra lại trước khi hết giờ (Phím tắt: Alt + F)"
            >
              <Flag className={cn("h-3.5 w-3.5", isCurrentFlagged ? "fill-slate-950" : "")} />
              <span>{isCurrentFlagged ? "Đã Gắn Cờ (Alt+F)" : "Gắn Cờ Review (Alt+F)"}</span>
            </button>

            {/* Next Button (Alt + N) */}
            <button
              type="button"
              onClick={onNext}
              disabled={activeQuestionNumber >= totalQuestions}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 cursor-pointer",
                activeQuestionNumber >= totalQuestions
                  ? "opacity-40 cursor-not-allowed bg-slate-800 border-slate-700 text-slate-500"
                  : "bg-red-600 hover:bg-red-700 border-red-500 text-white shadow-md shadow-red-600/30"
              )}
              title="Chuyển sang câu tiếp theo (Phím tắt: Alt + N hoặc Tab)"
            >
              <span>Next (Alt+N)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* 40 Question Palette Grid */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {groups.map((grp, gIdx) => (
            <div key={gIdx} className="flex items-center gap-1 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80 shrink-0">
              <span className="text-[10px] font-mono text-slate-400 font-bold px-1.5 hidden md:inline">
                P{gIdx + 1}:
              </span>

              {Array.from({ length: grp.end - grp.start + 1 }, (_, i) => {
                const qNum = grp.start + i;
                const questionObj = questionsList.find((q) => q.questionNumber === qNum);
                const isAnswered =
                  questionObj &&
                  answeredQuestionIds[questionObj.id] &&
                  answeredQuestionIds[questionObj.id].trim().length > 0;
                const isActive = activeQuestionNumber === qNum;
                const isFlagged = flaggedQuestions.has(qNum);

                return (
                  <button
                    key={qNum}
                    type="button"
                    onClick={() => onSelectQuestionNumber(qNum)}
                    className={cn(
                      "relative h-7 w-7 sm:h-8 sm:w-8 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center cursor-pointer",
                      isActive
                        ? "bg-red-600 text-white ring-2 ring-white shadow-md scale-105 z-10"
                        : isAnswered
                        ? "bg-slate-700 hover:bg-slate-600 text-emerald-400 border border-emerald-500/40"
                        : "bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800"
                    )}
                  >
                    <span>{qNum}</span>

                    {/* Flag Banner Corner Marker */}
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-amber-400 border border-slate-950 shadow-sm" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
