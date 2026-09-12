"use client";

import React from "react";
import {
  FileText,
  MousePointerClick,
  Sparkles,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { AnnotatedSentence } from "@/data/mockWritingFeedbackData";
import { cn } from "@/lib/utils";

interface InlineAnnotatedEssayViewerProps {
  originalEssay: string;
  annotatedSentences: AnnotatedSentence[];
  selectedSentenceId: string | null;
  onSelectSentence: (sentence: AnnotatedSentence) => void;
  className?: string;
}

export function InlineAnnotatedEssayViewer({
  originalEssay,
  annotatedSentences,
  selectedSentenceId,
  onSelectSentence,
  className,
}: InlineAnnotatedEssayViewerProps) {
  const paragraphs = originalEssay.split("\n\n").filter(Boolean);

  // Map of annotated sentences keyed by matching text or id
  const annotationMap = new Map<string, AnnotatedSentence>();
  annotatedSentences.forEach((s) => {
    annotationMap.set(s.originalSentence.trim(), s);
  });

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-5 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
              Trình Đọc Gắn Nhãn Lỗi Trực Quan
            </span>
          </div>
          <h4 className="font-bold text-sm text-foreground">
            Bản Thảo Bài Viết & Điểm Cần Chỉnh Sửa
          </h4>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-[10px] font-mono flex-wrap">
          <span className="flex items-center gap-1 text-rose-600">
            <span className="h-2 w-2 rounded-full bg-rose-500" /> Ngữ Pháp (GRA)
          </span>
          <span className="flex items-center gap-1 text-amber-600">
            <span className="h-2 w-2 rounded-full bg-amber-500" /> Collocation (LR)
          </span>
          <span className="flex items-center gap-1 text-blue-600">
            <span className="h-2 w-2 rounded-full bg-blue-500" /> Liên Kết (CC)
          </span>
        </div>
      </div>

      {/* Paragraphs Viewer */}
      <div className="space-y-4 font-serif text-sm sm:text-base leading-relaxed text-foreground/90">
        {paragraphs.map((paraText, pIdx) => {
          // Split paragraph into approximate sentences
          const rawSentences = paraText.match(/[^.!?]+[.!?]+/g) || [paraText];

          return (
            <p key={pIdx} className="space-y-1">
              {rawSentences.map((rawS, sIdx) => {
                const cleanS = rawS.trim();
                const matchedAnnotation = annotationMap.get(cleanS);
                const isSelected = matchedAnnotation && selectedSentenceId === matchedAnnotation.id;

                if (!matchedAnnotation) {
                  return <span key={sIdx}>{rawS} </span>;
                }

                const hasGra = matchedAnnotation.flaggedIssues.some((i) => i.type === "gra");
                const hasLr = matchedAnnotation.flaggedIssues.some((i) => i.type === "lr");
                const hasCc = matchedAnnotation.flaggedIssues.some((i) => i.type === "cc");

                return (
                  <span
                    key={sIdx}
                    onClick={() => onSelectSentence(matchedAnnotation)}
                    className={cn(
                      "cursor-pointer rounded-lg px-1 py-0.5 transition-all inline",
                      isSelected
                        ? "bg-primary/20 ring-2 ring-primary text-foreground font-medium shadow-xs"
                        : hasGra
                        ? "bg-rose-500/10 hover:bg-rose-500/20 text-foreground underline decoration-rose-500 decoration-wavy decoration-2"
                        : hasLr
                        ? "bg-amber-500/10 hover:bg-amber-500/20 text-foreground underline decoration-amber-500 decoration-wavy decoration-2"
                        : "bg-blue-500/10 hover:bg-blue-500/20 text-foreground underline decoration-blue-500 decoration-wavy decoration-2"
                    )}
                    title="Click để xem 3 tầng nâng cấp câu"
                  >
                    {rawS}{" "}
                  </span>
                );
              })}
            </p>
          );
        })}
      </div>

      <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
        <span className="flex items-center gap-1">
          <MousePointerClick className="h-3.5 w-3.5 text-primary" />
          Click vào các câu có gạch chân lượn sóng để xem phiên bản nâng cấp C1/C2
        </span>
      </div>
    </div>
  );
}
