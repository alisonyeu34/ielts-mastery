"use client";

import React from "react";
import { CognitiveCheckpointQuestion } from "@/data/mockCognitivePassagesData";
import { Clock, HelpCircle, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";

interface RetentionCheckpointCardProps {
  isOpen: boolean;
  checkpoint: CognitiveCheckpointQuestion | null;
  secondsLeft: number;
  onSubmitAnswer: (optionIndex: number) => void;
}

export const RetentionCheckpointCard: React.FC<RetentionCheckpointCardProps> = ({
  isOpen,
  checkpoint,
  secondsLeft,
  onSubmitAnswer,
}) => {
  if (!isOpen || !checkpoint) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative animate-scaleUp">
        {/* Header with 15s Countdown */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                Instant Cognitive Checkpoint
              </span>
              <h3 className="text-base font-black text-slate-100">
                Kiểm Tra Khả Năng Lưu Giữ Ý Niệm Cốt Lõi
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-amber-500/40 font-mono text-xs">
            <Clock className="w-4 h-4 text-amber-400" />
            <span
              className={`font-black text-sm ${
                secondsLeft <= 5 ? "text-rose-400 animate-pulse" : "text-amber-400"
              }`}
            >
              {secondsLeft}s
            </span>
          </div>
        </div>

        {/* Question Text */}
        <p className="text-sm font-serif text-slate-200 leading-relaxed mb-6 font-semibold bg-slate-950 p-4 rounded-xl border border-slate-800">
          {checkpoint.question}
        </p>

        {/* Options */}
        <div className="space-y-2.5">
          {checkpoint.options.map((opt, optIdx) => (
            <button
              key={`opt_${optIdx}`}
              onClick={() => onSubmitAnswer(optIdx)}
              className="w-full text-left p-3.5 rounded-xl border border-slate-800 bg-slate-950/70 hover:bg-slate-800 hover:border-amber-500/50 text-xs text-slate-300 transition-all flex items-center justify-between"
            >
              <span className="leading-relaxed">{opt}</span>
              <Sparkles className="w-3.5 h-3.5 text-slate-600 shrink-0 ml-2" />
            </button>
          ))}
        </div>

        <p className="text-[11px] text-slate-500 text-center mt-4 italic">
          * Trả lời ngay bằng trực giác nhận thức, không được xem lại câu chữ của đoạn trước.
        </p>
      </div>
    </div>
  );
};
