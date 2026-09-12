"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles,
  Layers,
  ArrowDown,
} from "lucide-react";
import { HeadingItem } from "@/data/mockHeadingsPassages";
import { ParagraphEvaluation } from "@/hooks/useMatchingHeadings";
import { cn } from "@/lib/utils";

interface ParagraphDropZoneProps {
  paragraphId: string;
  assignedHeading?: HeadingItem;
  selectedHeadingId: string | null;
  evaluation?: ParagraphEvaluation;
  isSubmitted: boolean;
  onAssignHeading: (paragraphId: string, headingId: string) => void;
  onRemoveHeading: (paragraphId: string) => void;
  className?: string;
}

export function ParagraphDropZone({
  paragraphId,
  assignedHeading,
  selectedHeadingId,
  evaluation,
  isSubmitted,
  onAssignHeading,
  onRemoveHeading,
  className,
}: ParagraphDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isSubmitted) setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (isSubmitted) return;

    const headingId = e.dataTransfer.getData("text/plain");
    if (headingId) {
      onAssignHeading(paragraphId, headingId);
    }
  };

  const handleClickToAssign = () => {
    if (isSubmitted || !selectedHeadingId) return;
    onAssignHeading(paragraphId, selectedHeadingId);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {/* Drop Zone Box */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClickToAssign}
        className={cn(
          "p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-200 select-none",
          // Empty State
          !assignedHeading &&
            !isDragOver &&
            "border-dashed border-border bg-secondary/20 hover:border-indigo-500/50 hover:bg-secondary/40 cursor-pointer",
          // Dragging over or Heading Selected ready to click
          !assignedHeading &&
            (isDragOver || selectedHeadingId) &&
            "border-dashed border-indigo-500 bg-indigo-500/10 shadow-sm cursor-pointer",
          // Occupied State (Before Submit)
          assignedHeading &&
            !isSubmitted &&
            "border-indigo-500/40 bg-card shadow-sm",
          // Submitted & Correct
          isSubmitted &&
            evaluation?.isCorrect &&
            "border-emerald-500/50 bg-emerald-500/[0.04] shadow-sm",
          // Submitted & Wrong
          isSubmitted &&
            evaluation &&
            !evaluation.isCorrect &&
            "border-rose-500/50 bg-rose-500/[0.04] shadow-sm"
        )}
      >
        {/* If Empty */}
        {!assignedHeading && (
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium">
              <Layers className="h-3.5 w-3.5 text-indigo-500" />
              {selectedHeadingId
                ? "Bấm vào đây để gán tiêu đề đang chọn..."
                : "Kéo hoặc chọn tiêu đề La Mã đặt vào Đoạn này..."}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-secondary border border-border">
              Đoạn {paragraphId}
            </span>
          </div>
        )}

        {/* If Occupied */}
        {assignedHeading && (
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white font-mono text-xs font-bold shadow-sm shadow-indigo-600/30 uppercase mt-0.5">
                {assignedHeading.romanNumeral}
              </span>
              <div>
                <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                  Tiêu đề gán cho Đoạn {paragraphId}:
                </span>
                <p className="text-xs sm:text-sm font-bold text-foreground leading-snug">
                  {assignedHeading.title}
                </p>
              </div>
            </div>

            {!isSubmitted && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveHeading(paragraphId);
                }}
                className="flex h-6 w-6 items-center justify-center rounded-lg bg-secondary text-muted-foreground hover:bg-rose-500/20 hover:text-rose-500 transition-colors cursor-pointer shrink-0"
                title="Gỡ bỏ tiêu đề khỏi đoạn này"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Post-Submit Detailed Evaluation & Trap Analysis */}
      {isSubmitted && evaluation && (
        <div className="animate-in fade-in duration-200">
          {evaluation.isCorrect ? (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>
                <strong>Chính xác 100%!</strong> {evaluation.explanationMarkdown}
              </span>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-rose-500/[0.05] border border-rose-500/30 text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>
                  Chưa chính xác! Đáp án chuẩn: {evaluation.correctHeadingTitle}
                </span>
              </div>

              {evaluation.trapTitleVi && (
                <div className="p-2 rounded-lg bg-card border border-border/80 text-[11px] text-muted-foreground space-y-0.5">
                  <span className="font-bold text-rose-500 block">
                    ⚠️ {evaluation.trapTitleVi}
                  </span>
                  <p>{evaluation.trapExplanation}</p>
                </div>
              )}

              <p className="text-muted-foreground text-[11px] leading-relaxed">
                💡 {evaluation.explanationMarkdown}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
