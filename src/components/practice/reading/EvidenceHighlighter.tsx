"use client";

import React from "react";
import { BookOpen, Sparkles, Pin, ZoomIn, ZoomOut } from "lucide-react";
import { TFNGParagraph } from "@/data/mockTFNGPassages";
import { cn } from "@/lib/utils";

interface EvidenceHighlighterProps {
  paragraphs: TFNGParagraph[];
  activeEvidenceQuote: string | null;
  activeParagraphId: string | null;
  className?: string;
}

export function EvidenceHighlighter({
  paragraphs,
  activeEvidenceQuote,
  activeParagraphId,
  className,
}: EvidenceHighlighterProps) {
  const [fontSize, setFontSize] = React.useState<"sm" | "base" | "lg">("base");

  const fontClasses = {
    sm: "text-xs leading-relaxed",
    base: "text-sm leading-relaxed",
    lg: "text-base leading-loose",
  };

  const highlightQuoteInText = (text: string, quote: string | null) => {
    if (!quote) return text;

    // Clean comparison: take a 20-40 char unique snippet of the quote
    const cleanQuote = quote.replace(/\.\.\./g, "").trim();
    if (!cleanQuote || cleanQuote.length < 10) return text;

    const snippet = cleanQuote.substring(0, Math.min(cleanQuote.length, 35));
    const index = text.indexOf(snippet);

    if (index === -1) return text;

    const before = text.substring(0, index);
    const match = text.substring(index, index + cleanQuote.length);
    const after = text.substring(index + cleanQuote.length);

    return (
      <>
        {before}
        <mark className="bg-amber-400/30 dark:bg-amber-400/20 text-foreground px-1 py-0.5 rounded border-b-2 border-amber-500 font-semibold">
          {match}
        </mark>
        {after}
      </>
    );
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Passage Header & Font Zoom */}
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

      {/* Paragraphs List */}
      <div className="space-y-5 font-serif">
        {paragraphs.map((para) => {
          const isTargetParagraph = activeParagraphId === para.id;

          return (
            <div
              key={para.id}
              className={cn(
                "p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative",
                isTargetParagraph
                  ? "border-amber-500/50 bg-amber-500/[0.03] shadow-sm ring-1 ring-amber-500/20"
                  : "border-border/60 bg-card hover:border-border"
              )}
            >
              {/* Paragraph Label Badge */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  Đoạn {para.id}
                </span>

                {isTargetParagraph && (
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 animate-pulse">
                    <Pin className="h-3 w-3" /> Đang xem dẫn chứng câu hỏi
                  </span>
                )}
              </div>

              {/* Paragraph Text with potential highlighted quote */}
              <p className={cn("text-foreground/90 font-serif", fontClasses[fontSize])}>
                {highlightQuoteInText(para.content, isTargetParagraph ? activeEvidenceQuote : null)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
