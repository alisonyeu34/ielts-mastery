"use client";

import React from "react";
import {
  GripVertical,
  Check,
  Layers,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { HeadingItem } from "@/data/mockHeadingsPassages";
import { cn } from "@/lib/utils";

interface HeadingsBankProps {
  headings: HeadingItem[];
  assignedHeadings: Record<string, string>; // paragraphId -> headingId
  selectedHeadingId: string | null;
  isSubmitted: boolean;
  onSelectHeading: (headingId: string) => void;
  className?: string;
}

export function HeadingsBank({
  headings,
  assignedHeadings,
  selectedHeadingId,
  isSubmitted,
  onSelectHeading,
  className,
}: HeadingsBankProps) {
  // Find which paragraph a heading is assigned to
  const getAssignedParagraphId = (headingId: string) => {
    return Object.keys(assignedHeadings).find(
      (pId) => assignedHeadings[pId] === headingId
    );
  };

  const handleDragStart = (e: React.DragEvent, headingId: string) => {
    e.dataTransfer.setData("text/plain", headingId);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header & Instructions */}
      <div className="flex items-center justify-between border-b border-border/80 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-indigo-500" />
          <h3 className="text-sm font-bold text-foreground">
            Danh Sách Tiêu Đề (List of Headings)
          </h3>
        </div>
        <span className="text-[11px] text-muted-foreground">
          {headings.length} Tiêu đề La Mã
        </span>
      </div>

      <div className="p-3 rounded-xl bg-indigo-500/[0.04] border border-indigo-500/20 text-xs text-muted-foreground leading-relaxed">
        👉 <strong>Cách làm:</strong> Kéo thẻ tiêu đề thả vào ô phía trên mỗi đoạn văn, hoặc bấm chọn 1 tiêu đề rồi bấm vào ô đoạn văn tương ứng.
      </div>

      {/* List of Headings */}
      <div className="space-y-2.5">
        {headings.map((heading) => {
          const assignedParagraphId = getAssignedParagraphId(heading.id);
          const isAssigned = !!assignedParagraphId;
          const isSelected = selectedHeadingId === heading.id;

          return (
            <div
              key={heading.id}
              draggable={!isSubmitted}
              onDragStart={(e) => handleDragStart(e, heading.id)}
              onClick={() => !isSubmitted && onSelectHeading(heading.id)}
              className={cn(
                "p-3.5 rounded-2xl border-2 transition-all duration-200 select-none flex items-start gap-3 shadow-sm",
                !isSubmitted && "cursor-grab active:cursor-grabbing",
                // Normal
                !isSelected &&
                  !isAssigned &&
                  "bg-card border-border hover:border-indigo-500/50 hover:bg-secondary/30",
                // Selected
                isSelected &&
                  "border-indigo-600 bg-indigo-500/10 shadow-md shadow-indigo-600/20 scale-[1.02]",
                // Assigned
                isAssigned &&
                  !isSelected &&
                  "bg-secondary/30 border-border/60 opacity-60",
                isSubmitted && "cursor-default"
              )}
            >
              {/* Roman Numeral Tag */}
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold uppercase mt-0.5",
                  isSelected
                    ? "bg-indigo-600 text-white shadow-sm"
                    : isAssigned
                    ? "bg-secondary text-muted-foreground"
                    : "bg-secondary text-foreground"
                )}
              >
                {heading.romanNumeral}
              </span>

              {/* Heading Title */}
              <div className="flex-1 space-y-1">
                <p className="text-xs sm:text-sm font-semibold text-foreground leading-snug">
                  {heading.title}
                </p>

                {isAssigned && (
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                    <Check className="h-3 w-3" /> Đã gán cho Đoạn {assignedParagraphId}
                  </span>
                )}
              </div>

              {!isSubmitted && (
                <GripVertical className="h-4 w-4 text-muted-foreground/50 shrink-0 self-center" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
