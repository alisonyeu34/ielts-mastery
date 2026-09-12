"use client";

import React from "react";
import { ToulminParts } from "@/data/mockToulminData";
import { FileText, Send, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToulminParagraphAssemblerProps {
  parts: ToulminParts;
  totalWordCount: number;
  onSubmit: () => void;
  className?: string;
}

export function ToulminParagraphAssembler({
  parts,
  totalWordCount,
  onSubmit,
  className,
}: ToulminParagraphAssemblerProps) {
  const isFilled = totalWordCount >= 40;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-5 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          <span className="font-bold text-xs sm:text-sm text-foreground">
            Đoạn Văn Lập Luận Đa Chiều Hoàn Chỉnh (Toulmin Assembler)
          </span>
        </div>

        <span
          className={cn(
            "text-xs font-mono font-black px-3 py-1 rounded-xl border",
            totalWordCount >= 100 && totalWordCount <= 165
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
              : "bg-secondary text-foreground border-border"
          )}
        >
          {totalWordCount} từ (Chuẩn Band 8.0+: 110 - 150 từ)
        </span>
      </div>

      {/* Assembled Paragraph View */}
      <div className="p-4 sm:p-5 rounded-2xl bg-secondary/20 border border-border space-y-3">
        {isFilled ? (
          <p className="text-xs sm:text-sm text-foreground/90 font-serif leading-relaxed space-x-1">
            {parts.claim && (
              <span className="text-blue-600 dark:text-blue-400 font-semibold bg-blue-500/10 px-1 py-0.5 rounded" title="Claim">
                {parts.claim}
              </span>
            )}{" "}
            {parts.data && (
              <span className="text-purple-600 dark:text-purple-400 bg-purple-500/10 px-1 py-0.5 rounded" title="Data / Grounds">
                {parts.data}
              </span>
            )}{" "}
            {parts.warrant && (
              <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded" title="Warrant">
                {parts.warrant}
              </span>
            )}{" "}
            {parts.backing && (
              <span className="text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-1 py-0.5 rounded" title="Backing">
                {parts.backing}
              </span>
            )}{" "}
            {parts.counterArgument && (
              <span className="text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1 py-0.5 rounded" title="Counter-Argument">
                {parts.counterArgument}
              </span>
            )}{" "}
            {parts.rebuttal && (
              <span className="text-rose-600 dark:text-rose-400 font-semibold bg-rose-500/10 px-1 py-0.5 rounded" title="Rebuttal">
                {parts.rebuttal}
              </span>
            )}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground/60 italic font-serif text-center py-4">
            (Đoạn văn lập luận 6 khối sẽ tự động ghép và hiển thị màu sắc tương ứng tại đây)
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={!isFilled}
        className={cn(
          "w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer",
          isFilled
            ? "bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-[1.01]"
            : "bg-secondary text-muted-foreground border border-border cursor-not-allowed opacity-50"
        )}
      >
        <Send className="h-4 w-4" />
        <span>Thẩm Định Độ Sắc Bén & Chấm Điểm Lập Luận</span>
      </button>
    </div>
  );
}
