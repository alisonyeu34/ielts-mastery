"use client";

import React, { useState } from "react";
import {
  AbstractBoxOption,
  AbstractSummarySlot,
  SummaryEvaluationResult
} from "@/lib/epistemicGraphParser";

interface AbstractSummaryBoxMatcherProps {
  summaryTask: {
    title: string;
    instructions: string;
    options: AbstractBoxOption[];
    slots: AbstractSummarySlot[];
  };
  userSlots: Record<string, string>; // slotId -> optionId
  isEvaluated: boolean;
  evaluationResult: SummaryEvaluationResult | null;
  onSetSlotAnswer: (slotId: string, optionId: string) => void;
  onClearSlotAnswer: (slotId: string) => void;
  onEvaluate: () => void;
  onReset: () => void;
}

export const AbstractSummaryBoxMatcher: React.FC<AbstractSummaryBoxMatcherProps> = ({
  summaryTask,
  userSlots,
  isEvaluated,
  evaluationResult,
  onSetSlotAnswer,
  onClearSlotAnswer,
  onEvaluate,
  onReset
}) => {
  const [selectedSlotId, setSelectedSlotId] = useState<string>(
    summaryTask.slots[0]?.id || ''
  );

  const optionMap = new Map(summaryTask.options.map((opt) => [opt.id, opt]));

  const handleSelectOption = (optionId: string) => {
    if (!selectedSlotId) return;
    onSetSlotAnswer(selectedSlotId, optionId);

    // Auto move to next empty slot if available
    const currentIndex = summaryTask.slots.findIndex((s) => s.id === selectedSlotId);
    const nextSlot = summaryTask.slots.find(
      (s, idx) => idx > currentIndex && !userSlots[s.id]
    );
    if (nextSlot) {
      setSelectedSlotId(nextSlot.id);
    }
  };

  const isAllFilled = summaryTask.slots.every((s) => !!userSlots[s.id]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 backdrop-blur-md">
      {/* Task Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 text-base">
              🧩
            </span>
            <h3 className="text-base font-bold text-white">
              {summaryTask.title}
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {summaryTask.instructions}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isEvaluated ? (
            <button
              onClick={onReset}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
            >
              Làm Lại Bài Này
            </button>
          ) : (
            <button
              onClick={onEvaluate}
              disabled={!isAllFilled}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white text-xs font-bold shadow-lg shadow-purple-950/50 transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>🔍</span>
              <span>Kiểm Tra & Bóc Tách Bẫy (Đã điền {Object.keys(userSlots).length}/{summaryTask.slots.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Box of Options Grid (10 C1/C2 Terms) */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
            <span>📦</span>
            <span>Box of Options (Chọn từ vựng trừu tượng để điền vào ô được chọn):</span>
          </span>
          <span className="text-[11px] text-slate-400">
            Ô đang chọn: [Ô #{summaryTask.slots.find((s) => s.id === selectedSlotId)?.slotNumber || 1}]
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {summaryTask.options.map((opt) => {
            const isUsedInAnySlot = Object.values(userSlots).includes(opt.id);
            const isUsedInCurrentSlot = userSlots[selectedSlotId] === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                  isUsedInCurrentSlot
                    ? 'bg-purple-950/80 border-purple-400 text-white ring-2 ring-purple-500/50 shadow-md'
                    : isUsedInAnySlot
                    ? 'bg-slate-900/40 border-slate-800/80 text-slate-500 opacity-60'
                    : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-purple-500/50 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-bold truncate">
                    {opt.term}
                  </span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-purple-300">
                    {opt.band}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 truncate">
                  {opt.definitionVi}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary Interactive Paragraph with Blanks */}
      <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 space-y-4 leading-relaxed text-sm text-slate-300">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-800">
          Đoạn Văn Tóm Tắt Khái Niệm:
        </h4>

        <div className="space-y-4">
          {summaryTask.slots.map((slot) => {
            const isSelected = selectedSlotId === slot.id;
            const chosenOptionId = userSlots[slot.id];
            const chosenOption = chosenOptionId ? optionMap.get(chosenOptionId) : null;
            const evalResult = evaluationResult?.results[slot.id];

            return (
              <div key={slot.id} className="space-y-2">
                <div className="flex flex-wrap items-baseline gap-1.5">
                  <span>{slot.preText}</span>

                  {/* Slot Blank Button */}
                  <div className="inline-flex items-center gap-1 my-1">
                    <button
                      onClick={() => setSelectedSlotId(slot.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold font-mono transition-all border inline-flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-purple-950 border-purple-400 text-purple-200 ring-2 ring-purple-500/60 shadow-lg'
                          : chosenOption
                          ? isEvaluated
                            ? evalResult?.isCorrect
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                              : 'bg-rose-950/80 border-rose-500 text-rose-300'
                            : 'bg-slate-800 border-indigo-500/40 text-indigo-300'
                          : 'bg-slate-900 border-dashed border-slate-700 text-slate-500 hover:border-slate-500'
                      }`}
                    >
                      <span className="text-[10px] text-slate-400">[{slot.slotNumber}]</span>
                      <span>
                        {chosenOption ? chosenOption.term : '--- Chọn từ ---'}
                      </span>
                    </button>

                    {chosenOption && !isEvaluated && (
                      <button
                        onClick={() => onClearSlotAnswer(slot.id)}
                        className="text-slate-500 hover:text-rose-400 text-xs font-bold px-1"
                        title="Xóa lựa chọn"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  <span>{slot.postText}</span>
                </div>

                {/* Evaluation Feedback & Cambridge Trap Breakdown */}
                {isEvaluated && evalResult && (
                  <div
                    className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                      evalResult.isCorrect
                        ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                        : 'bg-rose-950/30 border-rose-500/30 text-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span>
                        {evalResult.isCorrect ? '✅ Chính Xác!' : `❌ Sai! Đáp án đúng: "${evalResult.correctTerm}"`}
                      </span>
                      <span className="text-[11px] font-normal text-slate-400">
                        Ô số {slot.slotNumber}
                      </span>
                    </div>
                    <p className="text-slate-300">
                      💡 {evalResult.explanation}
                    </p>
                    {!evalResult.isCorrect && (
                      <p className="text-amber-300/90 font-medium">
                        ⚠️ Cảnh báo bẫy: {evalResult.epistemicTrap}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
