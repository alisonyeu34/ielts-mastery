"use client";

import React, { useState } from "react";
import { BookOpen, Sparkles, Eye, ZoomIn, ZoomOut } from "lucide-react";
import { StructuralParagraph, HeadingItem } from "@/data/mockHeadingsPassages";
import { ParagraphDropZone } from "@/components/practice/reading/ParagraphDropZone";
import { ParagraphEvaluation } from "@/hooks/useMatchingHeadings";
import { cn } from "@/lib/utils";

interface ParagraphStructuralViewerProps {
  paragraphs: StructuralParagraph[];
  headings: HeadingItem[];
  assignedHeadings: Record<string, string>;
  selectedHeadingId: string | null;
  evaluations?: ParagraphEvaluation[];
  showStructureAnalysis: boolean;
  isSubmitted: boolean;
  onAssignHeading: (paragraphId: string, headingId: string) => void;
  onRemoveHeading: (paragraphId: string) => void;
  className?: string;
}

export function ParagraphStructuralViewer({
  paragraphs,
  headings,
  assignedHeadings,
  selectedHeadingId,
  evaluations,
  showStructureAnalysis,
  isSubmitted,
  onAssignHeading,
  onRemoveHeading,
  className,
}: ParagraphStructuralViewerProps) {
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");

  const fontClasses = {
    sm: "text-xs leading-relaxed",
    base: "text-sm leading-relaxed",
    lg: "text-base leading-loose",
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Top Header & Font Zoom */}
      <div className="flex items-center justify-between border-b border-border/80 pb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-indigo-500" />
          <span className="text-xs font-bold text-foreground">
            Văn Bản Bài Đọc (Reading Passage)
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>Cỡ chữ:</span>
          <button
            type="button"
            onClick={() => setFontSize("sm")}
            className={cn(
              "px-2 py-0.5 rounded border text-[11px] font-bold cursor-pointer",
              fontSize === "sm"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-secondary border-border hover:bg-secondary/80"
            )}
          >
            A-
          </button>
          <button
            type="button"
            onClick={() => setFontSize("base")}
            className={cn(
              "px-2 py-0.5 rounded border text-[11px] font-bold cursor-pointer",
              fontSize === "base"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-secondary border-border hover:bg-secondary/80"
            )}
          >
            A
          </button>
          <button
            type="button"
            onClick={() => setFontSize("lg")}
            className={cn(
              "px-2 py-0.5 rounded border text-[11px] font-bold cursor-pointer",
              fontSize === "lg"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-secondary border-border hover:bg-secondary/80"
            )}
          >
            A+
          </button>
        </div>
      </div>

      {/* Paragraphs with Drop Zones */}
      <div className="space-y-8 font-serif">
        {paragraphs.map((para) => {
          const assignedHeadingId = assignedHeadings[para.id];
          const assignedHeading = headings.find((h) => h.id === assignedHeadingId);
          const evaluation = evaluations?.find((e) => e.paragraphId === para.id);

          return (
            <div key={para.id} className="space-y-3">
              {/* Drop Zone Above Paragraph */}
              <ParagraphDropZone
                paragraphId={para.id}
                assignedHeading={assignedHeading}
                selectedHeadingId={selectedHeadingId}
                evaluation={evaluation}
                isSubmitted={isSubmitted}
                onAssignHeading={onAssignHeading}
                onRemoveHeading={onRemoveHeading}
              />

              {/* Paragraph Content Card */}
              <div className="p-5 sm:p-6 rounded-2xl border border-border/80 bg-card shadow-sm space-y-2">
                <span className="text-[11px] font-mono font-extrabold px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 inline-block mb-1">
                  Đoạn {para.id}
                </span>

                <div className={cn("text-foreground/90 font-serif", fontClasses[fontSize])}>
                  {showStructureAnalysis ? (
                    <>
                      {/* Highlighted Topic Sentence */}
                      <span className="bg-indigo-500/15 text-indigo-950 dark:text-indigo-200 px-1 py-0.5 rounded font-medium border-b border-indigo-500/40">
                        {para.topicSentence}
                      </span>
                      {/* Supporting Details */}
                      <span>{para.supportingText}</span>
                      {/* Highlighted Concluding Sentence */}
                      <span className="bg-amber-500/15 text-amber-950 dark:text-amber-200 px-1 py-0.5 rounded font-medium border-b border-amber-500/40">
                        {para.concludingSentence}
                      </span>
                    </>
                  ) : (
                    <span>
                      {para.topicSentence}
                      {para.supportingText}
                      {para.concludingSentence}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
