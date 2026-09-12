"use client";

import React from "react";
import { Task2PEELPrompt } from "@/data/mockTask2PEELData";
import {
  FileText,
  AlertTriangle,
  Target,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PromptDeconstructionCardProps {
  prompt: Task2PEELPrompt;
  inputs: {
    generalTopic: string;
    microTopic: string;
    instruction: string;
  };
  onChangeInputs: (inputs: {
    generalTopic: string;
    microTopic: string;
    instruction: string;
  }) => void;
  onNextStage: () => void;
  className?: string;
}

export function PromptDeconstructionCard({
  prompt,
  inputs,
  onChangeInputs,
  onNextStage,
  className,
}: PromptDeconstructionCardProps) {
  const isFilled =
    inputs.generalTopic.trim().length > 3 ||
    inputs.microTopic.trim().length > 3 ||
    inputs.instruction.trim().length > 3;

  const handleFillModel = () => {
    onChangeInputs({
      generalTopic: prompt.topicAnalysis.generalTopic,
      microTopic: prompt.topicAnalysis.microTopic,
      instruction: prompt.topicAnalysis.instructionType,
    });
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Top Header & Category Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
            Bước 1 / 4 • Giải Phẫu Đề Bài
          </span>
          <span className="text-xs font-bold text-foreground">
            Prompt Anatomy & Deconstruction
          </span>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-secondary text-foreground border border-border self-start sm:self-auto">
          {prompt.typeLabelVi}
        </span>
      </div>

      {/* Prompt Text Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-secondary/30 border border-border space-y-2">
        <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold tracking-wider block">
          Đề Bài Writing Task 2 Chuẩn Cambridge:
        </span>
        <p className="text-sm sm:text-base font-black text-foreground font-serif leading-relaxed">
          "{prompt.promptText}"
        </p>
      </div>

      {/* Anti-Off-Topic Warning Alert */}
      <div className="p-4 rounded-2xl bg-rose-500/[0.06] border border-rose-500/20 space-y-1.5 text-xs">
        <div className="flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <span>Bẫy Lạc Đề Thường Gặp (Off-topic Trap Warning):</span>
        </div>
        <p className="text-muted-foreground leading-relaxed pl-6">
          {prompt.topicAnalysis.offTopicPitfallVi}
        </p>
      </div>

      {/* 3-Part Deconstruction Input Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-foreground">
            Bóc tách 3 thành tố cốt lõi của đề bài:
          </span>
          <button
            type="button"
            onClick={handleFillModel}
            className="text-[11px] font-mono text-primary hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="h-3 w-3" /> Điền nhanh gợi ý mẫu
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* General Topic */}
          <div className="p-3.5 rounded-2xl bg-secondary/15 border border-border space-y-1.5">
            <label className="text-[11px] font-mono font-bold text-primary block">
              1. Chủ Đề Bao Quát (Topic)
            </label>
            <textarea
              rows={2}
              value={inputs.generalTopic}
              onChange={(e) =>
                onChangeInputs({ ...inputs, generalTopic: e.target.value })
              }
              placeholder="Ví dụ: Technological innovation..."
              className="w-full text-xs p-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Micro Topic */}
          <div className="p-3.5 rounded-2xl bg-secondary/15 border border-border space-y-1.5">
            <label className="text-[11px] font-mono font-bold text-purple-600 dark:text-purple-400 block">
              2. Trọng Tâm Tranh Cãi (Focus)
            </label>
            <textarea
              rows={2}
              value={inputs.microTopic}
              onChange={(e) =>
                onChangeInputs({ ...inputs, microTopic: e.target.value })
              }
              placeholder="Ví dụ: Wealth gap between nations..."
              className="w-full text-xs p-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          {/* Instruction */}
          <div className="p-3.5 rounded-2xl bg-secondary/15 border border-border space-y-1.5">
            <label className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 block">
              3. Nhiệm Vụ Đề Bài (Instruction)
            </label>
            <textarea
              rows={2}
              value={inputs.instruction}
              onChange={(e) =>
                onChangeInputs({ ...inputs, instruction: e.target.value })
              }
              placeholder="Ví dụ: Agree or disagree..."
              className="w-full text-xs p-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Advance Button */}
      <div className="pt-2 border-t border-border/70 flex justify-end">
        <button
          type="button"
          onClick={onNextStage}
          className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
        >
          <span>Chuyển Sang Bước 2: Viết Mở Bài & Luận Đề</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
