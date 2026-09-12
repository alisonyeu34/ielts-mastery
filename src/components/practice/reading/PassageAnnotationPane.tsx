"use client";

import React, { useState, useRef } from "react";
import {
  BookOpen,
  ZoomIn,
  ZoomOut,
  Highlighter,
  Trash2,
  Sparkles,
} from "lucide-react";
import { ReadingPassageData } from "@/data/mockReadingPassageData";
import { HighlightItem } from "@/hooks/useReadingSplitSession";
import { FloatingAnnotationBar } from "./FloatingAnnotationBar";
import { EvidenceHighlighterOverlay } from "./EvidenceHighlighterOverlay";
import { cn } from "@/lib/utils";

interface PassageAnnotationPaneProps {
  passage: ReadingPassageData;
  highlights: HighlightItem[];
  activeEvidenceSentenceId: string | null;
  fontSizeScale: number;
  onAddHighlight: (text: string, color: "yellow" | "green" | "red" | "purple", paragraphId: string) => void;
  onRemoveHighlight: (id: string) => void;
  onChangeFontSize: (size: number) => void;
  className?: string;
}

export function PassageAnnotationPane({
  passage,
  highlights,
  activeEvidenceSentenceId,
  fontSizeScale,
  onAddHighlight,
  onRemoveHighlight,
  onChangeFontSize,
  className,
}: PassageAnnotationPaneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedText, setSelectedText] = useState<string>("");
  const [selectedParagraphId, setSelectedParagraphId] = useState<string>("A");
  const [toolbarPosition, setToolbarPosition] = useState<{ top: number; left: number } | null>(null);

  // Handle Text Selection in Passage
  const handleMouseUp = (paragraphId: string) => {
    if (typeof window === "undefined") return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setSelectedText("");
      setToolbarPosition(null);
      return;
    }

    const text = selection.toString().trim();
    if (text.length > 2) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect() || { top: 0, left: 0 };

      setSelectedText(text);
      setSelectedParagraphId(paragraphId);
      setToolbarPosition({
        top: rect.top - containerRect.top,
        left: rect.left - containerRect.left,
      });
    }
  };

  const handleApplyHighlight = (color: "yellow" | "green" | "red" | "purple") => {
    if (selectedText) {
      onAddHighlight(selectedText, color, selectedParagraphId);
      setSelectedText("");
      setToolbarPosition(null);
      if (typeof window !== "undefined") {
        window.getSelection()?.removeAllRanges();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex flex-col h-full bg-card rounded-3xl border border-border shadow-xs overflow-hidden select-text",
        className
      )}
    >
      {/* Top Header of Passage Pane */}
      <div className="flex items-center justify-between p-4 border-b border-border/80 bg-secondary/20 shrink-0 select-none">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-bold text-xs text-foreground truncate max-w-[220px] sm:max-w-xs">
              {passage.title}
            </h3>
            <span className="text-[10px] font-mono text-muted-foreground">
              {passage.wordCount} Từ • {passage.paragraphs.length} Đoạn Văn
            </span>
          </div>
        </div>

        {/* Font size zoom controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onChangeFontSize(Math.max(13, fontSizeScale - 1))}
            className="p-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-foreground text-xs font-bold transition-colors cursor-pointer"
            title="Giảm kích thước chữ (A-)"
          >
            A-
          </button>
          <button
            type="button"
            onClick={() => onChangeFontSize(Math.min(20, fontSizeScale + 1))}
            className="p-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-foreground text-xs font-bold transition-colors cursor-pointer"
            title="Tăng kích thước chữ (A+)"
          >
            A+
          </button>
        </div>
      </div>

      {/* Passage Content Body */}
      <div
        style={{ fontSize: `${fontSizeScale}px` }}
        className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 font-serif leading-relaxed text-foreground/90 scroll-smooth"
      >
        <div className="space-y-1.5 border-b border-border/70 pb-4">
          <h2 className="text-xl sm:text-2xl font-black font-sans text-foreground">
            {passage.title}
          </h2>
          <p className="text-xs text-muted-foreground font-sans italic leading-normal">
            {passage.subtitle}
          </p>
        </div>

        {/* Paragraphs List */}
        {passage.paragraphs.map((p) => (
          <div
            key={p.id}
            id={`paragraph_${p.id}`}
            onMouseUp={() => handleMouseUp(p.id)}
            className="space-y-2 relative group"
          >
            <div className="inline-block px-2 py-0.5 rounded-md bg-secondary font-sans font-black text-[11px] text-primary border border-border/80 select-none mr-2">
              Paragraph {p.id}
            </div>

            <span className="inline">
              {p.sentences.map((sentence) => (
                <EvidenceHighlighterOverlay
                  key={sentence.id}
                  sentenceId={sentence.id}
                  isActive={activeEvidenceSentenceId === sentence.id}
                >
                  {sentence.text}{" "}
                </EvidenceHighlighterOverlay>
              ))}
            </span>
          </div>
        ))}
      </div>

      {/* Floating Highlight Toolbar */}
      {toolbarPosition && selectedText && (
        <FloatingAnnotationBar
          selectedText={selectedText}
          paragraphId={selectedParagraphId}
          position={toolbarPosition}
          onHighlight={handleApplyHighlight}
          onClose={() => {
            setSelectedText("");
            setToolbarPosition(null);
          }}
        />
      )}
    </div>
  );
}
