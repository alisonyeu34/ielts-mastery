"use client";

import React, { useState } from "react";
import {
  FileSearch,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ShieldAlert,
  Layers,
} from "lucide-react";
import { Task2PromptData, Task2EssayType } from "@/data/mockTask2Prompts";
import { cn } from "@/lib/utils";

interface Task2PromptDeconstructorProps {
  prompt: Task2PromptData;
  className?: string;
}

const ESSAY_TYPES: Array<{ id: Task2EssayType; label: string; description: string }> = [
  {
    id: "opinion",
    label: "Opinion Essay (Agree / Disagree)",
    description: "Đưa ra lập trường đồng ý hoặc phản đối dứt khoát.",
  },
  {
    id: "discussion",
    label: "Discussion Essay (Discuss Both Views)",
    description: "Phân tích công bằng cả 2 mặt và đưa ra quan điểm cá nhân.",
  },
  {
    id: "problem_solution",
    label: "Problem & Solution",
    description: "Phân tích nguyên nhân và đề xuất giải pháp khả thi.",
  },
  {
    id: "two_part",
    label: "Two-Part Question",
    description: "Trả lời trực tiếp 2 câu hỏi độc lập được đặt ra.",
  },
];

export function Task2PromptDeconstructor({
  prompt,
  className,
}: Task2PromptDeconstructorProps) {
  const [selectedType, setSelectedType] = useState<string>("");
  const [checkedLimiters, setCheckedLimiters] = useState<Record<number, boolean>>({});

  const isTypeCorrect = selectedType === prompt.essayType;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="border-b border-border/70 pb-3 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            Step 1: Prompt Deconstruction
          </span>
          <span className="text-xs font-semibold text-muted-foreground">
            Chống Lạc Đề (Off-Topic Guard)
          </span>
        </div>

        <h3 className="text-sm sm:text-base font-extrabold text-foreground">
          {prompt.topicTitle}
        </h3>
      </div>

      {/* Prompt Quote Box */}
      <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 text-xs sm:text-sm font-serif leading-relaxed text-foreground/90 italic">
        "{prompt.promptText}"
      </div>

      {/* 1. Identify Essay Type */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5 text-indigo-500" />
          <span>1. Xác định đúng dạng bài (Essay Type):</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ESSAY_TYPES.map((type) => {
            const isSelected = selectedType === type.id;

            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedType(type.id)}
                className={cn(
                  "p-3 rounded-xl border text-left transition-all text-xs cursor-pointer space-y-0.5",
                  isSelected
                    ? isTypeCorrect
                      ? "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/20"
                      : "border-rose-500 bg-rose-500/10 ring-2 ring-rose-500/20"
                    : "border-border bg-secondary/20 hover:border-indigo-400/50"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">{type.label}</span>
                  {isSelected && (
                    <span className="text-[10px] font-bold">
                      {isTypeCorrect ? "✓ Đúng dạng" : "✗ Sai dạng"}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground">{type.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Micro-Keywords & Scope Limiters Checklist */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
          <FileSearch className="h-3.5 w-3.5 text-purple-500" />
          <span>2. Từ khóa giới hạn phạm vi đề bài (Micro-Limiters):</span>
        </label>

        <div className="space-y-2">
          {prompt.microLimiters.map((limiter, idx) => {
            const isChecked = !!checkedLimiters[idx];

            return (
              <label
                key={idx}
                className={cn(
                  "p-3 rounded-xl border flex items-start gap-2.5 text-xs cursor-pointer transition-colors",
                  isChecked
                    ? "bg-indigo-500/[0.06] border-indigo-500/40 text-foreground"
                    : "bg-secondary/20 border-border/70 text-muted-foreground hover:bg-secondary/30"
                )}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) =>
                    setCheckedLimiters((prev) => ({ ...prev, [idx]: e.target.checked }))
                  }
                  className="mt-0.5 rounded border-border text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
                />
                <span className="leading-snug">{limiter}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 3. Off-Topic Warning Box */}
      <div className="p-3.5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 text-xs space-y-1.5">
        <div className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <span>Cảnh Báo Bẫy Lạc Đề Phổ Biến (Band 5.0 Pitfall)</span>
        </div>
        <ul className="space-y-1 pl-5 list-disc text-[11px] text-muted-foreground">
          {prompt.commonOffTopicTraps.map((trap, idx) => (
            <li key={idx} className="leading-relaxed">
              {trap}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
