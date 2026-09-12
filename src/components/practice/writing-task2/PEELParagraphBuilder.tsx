"use client";

import React, { useState } from "react";
import {
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
} from "lucide-react";
import { PEELBlockData } from "@/data/mockTask2Prompts";
import { PEELBlockCard } from "@/components/practice/writing-task2/PEELBlockCard";
import { countWords } from "@/hooks/usePEELEditor";
import { cn } from "@/lib/utils";

interface PEELParagraphBuilderProps {
  body1: PEELBlockData;
  body2: PEELBlockData;
  body1WordCount: number;
  body2WordCount: number;
  onSetBody1Field: (field: keyof PEELBlockData, val: string) => void;
  onSetBody2Field: (field: keyof PEELBlockData, val: string) => void;
  className?: string;
}

export function PEELParagraphBuilder({
  body1,
  body2,
  body1WordCount,
  body2WordCount,
  onSetBody1Field,
  onSetBody2Field,
  className,
}: PEELParagraphBuilderProps) {
  const [activeBodyTab, setActiveBodyTab] = useState<"body1" | "body2">("body1");

  const currentBody = activeBodyTab === "body1" ? body1 : body2;
  const currentWordCount = activeBodyTab === "body1" ? body1WordCount : body2WordCount;
  const onSetCurrentField = activeBodyTab === "body1" ? onSetBody1Field : onSetBody2Field;

  const completedBlocksCount = [
    currentBody.point,
    currentBody.explain,
    currentBody.example,
    currentBody.link,
  ].filter((text) => text.trim().length > 10).length;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-5 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-3">
        <div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 uppercase tracking-wider">
            Step 3: PEEL Paragraph Architecture
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-foreground mt-1">
            Khung Dựng Thân Bài Theo Mô Hình PEEL
          </h3>
          <p className="text-xs text-muted-foreground">
            Đảm bảo mỗi đoạn thân bài có đủ: Point ➔ Explain ➔ Example ➔ Link (Band 7.0+ Coherence & Cohesion).
          </p>
        </div>

        {/* Completion Indicator */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div
            className={cn(
              "px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm",
              completedBlocksCount === 4
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                : "bg-secondary text-muted-foreground border-border"
            )}
          >
            <span>PEEL: {completedBlocksCount}/4 Khối</span>
            {completedBlocksCount === 4 && <CheckCircle2 className="h-3.5 w-3.5" />}
          </div>
          <span className="text-xs font-mono font-bold text-foreground">
            {currentWordCount} từ (Chuẩn 90-120 từ)
          </span>
        </div>
      </div>

      {/* Body Tab Switcher */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-secondary/60 border border-border/80">
        <button
          type="button"
          onClick={() => setActiveBodyTab("body1")}
          className={cn(
            "flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
            activeBodyTab === "body1"
              ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <FileText className="h-3.5 w-3.5 text-blue-500" />
          <span>Thân Bài 1 (Body Paragraph 1)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveBodyTab("body2")}
          className={cn(
            "flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
            activeBodyTab === "body2"
              ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <FileText className="h-3.5 w-3.5 text-purple-500" />
          <span>Thân Bài 2 (Body Paragraph 2)</span>
        </button>
      </div>

      {/* 4 PEEL Block Cards */}
      <div className="space-y-4">
        <PEELBlockCard
          type="point"
          value={currentBody.point}
          onChange={(val) => onSetCurrentField("point", val)}
        />

        <PEELBlockCard
          type="explain"
          value={currentBody.explain}
          onChange={(val) => onSetCurrentField("explain", val)}
        />

        <PEELBlockCard
          type="example"
          value={currentBody.example}
          onChange={(val) => onSetCurrentField("example", val)}
        />

        <PEELBlockCard
          type="link"
          value={currentBody.link}
          onChange={(val) => onSetCurrentField("link", val)}
        />
      </div>
    </div>
  );
}
