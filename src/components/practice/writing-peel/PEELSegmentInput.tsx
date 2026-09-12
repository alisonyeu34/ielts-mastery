"use client";

import React from "react";
import { Task2PEELPrompt } from "@/data/mockTask2PEELData";
import {
  Sparkles,
  AlertTriangle,
  ShieldAlert,
  HelpCircle,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PEELSegmentInputProps {
  prompt: Task2PEELPrompt;
  peelParts: {
    point: string;
    explain: string;
    example: string;
    link: string;
  };
  wordStats: {
    pointCount: number;
    explainCount: number;
    exampleCount: number;
    linkCount: number;
    totalCount: number;
  };
  diagnostics: {
    hasPersonalExample: boolean;
    hasListingTrap: boolean;
    hasCausalLogic: boolean;
  };
  onUpdatePEEL: (
    key: "point" | "explain" | "example" | "link",
    text: string
  ) => void;
  className?: string;
}

export function PEELSegmentInput({
  prompt,
  peelParts,
  wordStats,
  diagnostics,
  onUpdatePEEL,
  className,
}: PEELSegmentInputProps) {
  const handleFillModel = () => {
    onUpdatePEEL("point", prompt.samplePEEL.point);
    onUpdatePEEL("explain", prompt.samplePEEL.explain);
    onUpdatePEEL("example", prompt.samplePEEL.example);
    onUpdatePEEL("link", prompt.samplePEEL.link);
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
            Bước 3 / 4 • Xưởng Soạn Thảo Đoạn PEEL
          </span>
          <h3 className="text-sm sm:text-base font-black text-foreground pt-1">
            Xây Dựng 4 Mắt Xích: Point ➔ Explain ➔ Example ➔ Link
          </h3>
        </div>

        <button
          type="button"
          onClick={handleFillModel}
          className="text-[11px] font-mono text-primary hover:underline font-bold flex items-center gap-1 cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="h-3.5 w-3.5" /> Điền đoạn văn mẫu Band 8.5+
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. POINT (TOPIC SENTENCE) */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-2xl border border-blue-500/30 bg-blue-500/[0.02] space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-bold text-xs text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-500 text-white font-mono text-[10px] font-black">
              P
            </span>
            <span>Point (Câu Chủ Đề - 1 Luận Điểm Duy Nhất)</span>
          </label>
          <span className="text-[10px] font-mono text-muted-foreground">
            {wordStats.pointCount} từ • Mục tiêu: 15 - 25 từ
          </span>
        </div>

        <textarea
          rows={2}
          value={peelParts.point}
          onChange={(e) => onUpdatePEEL("point", e.target.value)}
          placeholder="Nêu trực diện luận điểm của đoạn, trả lời trực tiếp câu hỏi của đề bài..."
          className="w-full text-xs sm:text-sm p-3 rounded-xl bg-card border border-border text-foreground font-serif placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. EXPLAIN (CAUSAL MECHANISM) */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-2xl border border-purple-500/30 bg-purple-500/[0.02] space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-bold text-xs text-purple-600 dark:text-purple-400 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-purple-500 text-white font-mono text-[10px] font-black">
              E
            </span>
            <span>Explain (Giải Thích Chuỗi Nhân Quả Logic)</span>
          </label>
          <span className="text-[10px] font-mono text-muted-foreground">
            {wordStats.explainCount} từ • Mục tiêu: 40 - 65 từ
          </span>
        </div>

        <textarea
          rows={4}
          value={peelParts.explain}
          onChange={(e) => onUpdatePEEL("explain", e.target.value)}
          placeholder="Giải thích tại sao và cơ chế dẫn đến điều đó (Because... Consequently... As a result...)..."
          className="w-full text-xs sm:text-sm p-3 rounded-xl bg-card border border-border text-foreground font-serif placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-1 focus:ring-purple-500"
        />

        {/* Listing Trap Alert Warning */}
        {diagnostics.hasListingTrap && (
          <div className="p-2.5 rounded-xl bg-rose-500/[0.08] border border-rose-500/30 text-xs flex items-center gap-2 text-rose-600 dark:text-rose-400">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span className="text-[11px] leading-snug">
              <strong>Cảnh báo Listing Trap:</strong> Phát hiện liên từ liệt kê (furthermore, also, secondly). 1 Đoạn PEEL chỉ đào sâu 1 luận điểm duy nhất!
            </span>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. EXAMPLE (ACADEMIC EVIDENCE) */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/[0.02] space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-bold text-xs text-amber-600 dark:text-amber-400 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-500 text-white font-mono text-[10px] font-black">
              E
            </span>
            <span>Example (Dẫn Chứng Thực Tế / Nghiên Cứu Học Thuật)</span>
          </label>
          <span className="text-[10px] font-mono text-muted-foreground">
            {wordStats.exampleCount} từ • Mục tiêu: 20 - 35 từ
          </span>
        </div>

        <textarea
          rows={3}
          value={peelParts.example}
          onChange={(e) => onUpdatePEEL("example", e.target.value)}
          placeholder="Đưa ra nghiên cứu hoặc tình huống điển hình (Ví dụ: A salient manifestation of this is observed in...)"
          className="w-full text-xs sm:text-sm p-3 rounded-xl bg-card border border-border text-foreground font-serif placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-1 focus:ring-amber-500"
        />

        {/* Personal Pronoun Alert Warning */}
        {diagnostics.hasPersonalExample && (
          <div className="p-2.5 rounded-xl bg-rose-500/[0.08] border border-rose-500/30 text-xs flex items-center gap-2 text-rose-600 dark:text-rose-400">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span className="text-[11px] leading-snug">
              <strong>Cảnh báo xưng hô cá nhân:</strong> Phát hiện đại từ (I, me, my, our). Hãy quy nạp thành hiện tượng xã hội hoặc nghiên cứu thực nghiệm.
            </span>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. LINK (ANCHOR TO THESIS) */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.02] space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-bold text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500 text-white font-mono text-[10px] font-black">
              L
            </span>
            <span>Link (Câu Neo Đúc Kết & Liên Kết Ngược Luận Đề)</span>
          </label>
          <span className="text-[10px] font-mono text-muted-foreground">
            {wordStats.linkCount} từ • Mục tiêu: 10 - 20 từ
          </span>
        </div>

        <textarea
          rows={2}
          value={peelParts.link}
          onChange={(e) => onUpdatePEEL("link", e.target.value)}
          placeholder="Đúc kết và neo lại luận đề (Ví dụ: Hence, it stands to reason that...)"
          className="w-full text-xs sm:text-sm p-3 rounded-xl bg-card border border-border text-foreground font-serif placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>
    </div>
  );
}
