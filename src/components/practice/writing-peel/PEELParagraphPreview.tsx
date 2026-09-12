"use client";

import React from "react";
import {
  FileText,
  Sparkles,
  Send,
  Layers,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PEELParagraphPreviewProps {
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
    pointRatio: number;
    explainRatio: number;
    exampleRatio: number;
    linkRatio: number;
  };
  onSubmit: () => void;
  className?: string;
}

export function PEELParagraphPreview({
  peelParts,
  wordStats,
  onSubmit,
  className,
}: PEELParagraphPreviewProps) {
  const isFilled = wordStats.totalCount > 30;

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
            Đoạn Văn Hoàn Chỉnh Ghép Từ 4 Mắt Xích (Live Preview)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-xs font-mono font-black px-3 py-1 rounded-xl border",
              wordStats.totalCount >= 80 && wordStats.totalCount <= 140
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                : "bg-secondary text-foreground border-border"
            )}
          >
            {wordStats.totalCount} từ (Chuẩn: 80 - 130 từ)
          </span>
        </div>
      </div>

      {/* Balance Ratio Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground font-bold">
          <span>Tỷ Lệ Phân Bổ 4 Mắt Xích:</span>
          <span>P: {wordStats.pointRatio}% | E: {wordStats.explainRatio}% | E: {wordStats.exampleRatio}% | L: {wordStats.linkRatio}%</span>
        </div>

        <div className="w-full h-3 rounded-full bg-secondary overflow-hidden flex border border-border">
          <div style={{ width: `${wordStats.pointRatio}%` }} className="bg-blue-500 transition-all duration-300" title="Point" />
          <div style={{ width: `${wordStats.explainRatio}%` }} className="bg-purple-500 transition-all duration-300" title="Explain" />
          <div style={{ width: `${wordStats.exampleRatio}%` }} className="bg-amber-500 transition-all duration-300" title="Example" />
          <div style={{ width: `${wordStats.linkRatio}%` }} className="bg-emerald-500 transition-all duration-300" title="Link" />
        </div>
      </div>

      {/* Assembled Paragraph Display */}
      <div className="p-4 sm:p-5 rounded-2xl bg-secondary/20 border border-border space-y-3">
        {isFilled ? (
          <p className="text-xs sm:text-sm text-foreground/90 font-serif leading-relaxed space-x-1">
            {peelParts.point && (
              <span className="text-blue-600 dark:text-blue-400 font-semibold bg-blue-500/10 px-1 py-0.5 rounded">
                {peelParts.point}
              </span>
            )}{" "}
            {peelParts.explain && (
              <span className="text-purple-600 dark:text-purple-400 bg-purple-500/10 px-1 py-0.5 rounded">
                {peelParts.explain}
              </span>
            )}{" "}
            {peelParts.example && (
              <span className="text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1 py-0.5 rounded">
                {peelParts.example}
              </span>
            )}{" "}
            {peelParts.link && (
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-1 py-0.5 rounded">
                {peelParts.link}
              </span>
            )}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground/60 italic font-serif text-center py-4">
            (Đoạn văn sẽ tự động hiển thị tại đây khi bạn nhập các mắt xích PEEL bên trên)
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
        <span>Thẩm Định & Chẩn Đoán Độ Sâu Luận Điểm</span>
      </button>
    </div>
  );
}
