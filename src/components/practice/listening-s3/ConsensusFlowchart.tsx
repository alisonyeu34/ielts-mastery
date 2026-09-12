"use client";

import React from "react";
import {
  S3MultipleChoiceQuestion,
} from "@/data/mockSection3ConsensusData";
import {
  GitBranch,
  XCircle,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Volume2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ConsensusFlowchartProps {
  questions: S3MultipleChoiceQuestion[];
  focusedQuestionId: number | null;
  onSelectQuestion: (id: number) => void;
  onJumpToClimax: (timestamp: number) => void;
  className?: string;
}

export function ConsensusFlowchart({
  questions,
  focusedQuestionId,
  onSelectQuestion,
  onJumpToClimax,
  className,
}: ConsensusFlowchartProps) {
  const currentQ =
    questions.find((q) => q.id === focusedQuestionId) || questions[0];

  const { rejectedProposal, counterReason, ultimateDecision } =
    currentQ.consensusFlow;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5 select-none",
        className
      )}
    >
      {/* Header & Question Selector Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
            <GitBranch className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-black text-sm text-foreground">
              Ma Trận Diễn Biến Đồng Thuận (Consensus Evolution Flowchart)
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Giải mã 3 bước thương lượng học thuật: Đề xuất ➔ Bác bỏ ➔ Chốt hạ
            </p>
          </div>
        </div>

        {/* Question Selector Tabs */}
        <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-2xl border border-border text-xs font-bold self-start sm:self-auto">
          {questions.map((q) => (
            <button
              key={q.id}
              type="button"
              onClick={() => onSelectQuestion(q.id)}
              className={cn(
                "px-2.5 py-1 rounded-xl transition-all cursor-pointer font-mono",
                currentQ.id === q.id
                  ? "bg-card text-foreground shadow-2xs border border-border font-black"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Q{q.id}
            </button>
          ))}
        </div>
      </div>

      {/* Active Question Prompt */}
      <div className="p-3 rounded-2xl bg-secondary/20 border border-border/60 text-xs">
        <span className="font-mono font-bold text-primary mr-1.5">
          Q{currentQ.id}:
        </span>
        <span className="font-bold text-foreground">{currentQ.prompt}</span>
      </div>

      {/* 3-Step Flowchart Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
        {/* Step 1: Rejected Proposal */}
        <div className="p-4 rounded-2xl border border-rose-500/30 bg-rose-500/[0.03] space-y-2 flex flex-col justify-between relative">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                1. Đề Xuất Ban Đầu (Bị Loại)
              </span>
              <XCircle className="h-4 w-4 text-rose-500" />
            </div>

            <div className="text-[11px] font-bold text-foreground">
              Khởi xướng: <span className="text-rose-600">{rejectedProposal.speaker}</span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {rejectedProposal.idea}
            </p>
          </div>

          <div className="pt-2 text-[10px] font-mono text-rose-600/80 font-bold">
            ⚠️ Bẫy nghe vội đáp án
          </div>
        </div>

        {/* Step 2: Pushback / Counter-argument */}
        <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/[0.03] space-y-2 flex flex-col justify-between relative">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                2. Phản Biện / Bất Khả Thi
              </span>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </div>

            <div className="text-[11px] font-bold text-foreground">
              Phản biện: <span className="text-amber-600">{counterReason.speaker}</span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {counterReason.critique}
            </p>
          </div>

          <div className="pt-2 text-[10px] font-mono text-amber-600/80 font-bold">
            🔄 Điểm ngoặt đàm phán
          </div>
        </div>

        {/* Step 3: Resolved Consensus */}
        <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.03] space-y-2 flex flex-col justify-between relative">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                3. Đồng Thuận Chốt Hạ (Đáp Án)
              </span>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>

            <div className="text-[11px] font-bold text-foreground">
              Giải pháp thỏa hiệp chung
            </div>

            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium leading-relaxed">
              {ultimateDecision.summary}
            </p>
          </div>

          <div className="pt-2 text-[11px] font-serif italic text-muted-foreground border-t border-emerald-500/20">
            "{ultimateDecision.reversalQuote}"
          </div>
        </div>
      </div>

      {/* Jump Audio Button */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => onJumpToClimax(currentQ.audioTimestampSeconds)}
          className="px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Volume2 className="h-4 w-4" />
          <span>Nghe lại 10 giây chốt hạ sự đồng thuận của câu này</span>
        </button>

        <span className="text-[11px] font-mono text-muted-foreground">
          Đáp án đúng: [{currentQ.correctOption}]
        </span>
      </div>
    </div>
  );
}
