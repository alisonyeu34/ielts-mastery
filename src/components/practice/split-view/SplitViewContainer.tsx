"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  GripVertical,
  BookOpen,
  HelpCircle,
  Maximize2,
  Minimize2,
  Layers,
} from "lucide-react";
import { ReadingPassageData } from "@/data/mockReadingPassage";
import { PassagePane } from "@/components/practice/split-view/PassagePane";
import { QuestionPane } from "@/components/practice/split-view/QuestionPane";
import { cn } from "@/lib/utils";

interface SplitViewContainerProps {
  passage: ReadingPassageData;
  className?: string;
}

export function SplitViewContainer({ passage, className }: SplitViewContainerProps) {
  const [leftWidth, setLeftWidth] = useState<number>(50); // percentage 50%
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeMobileTab, setActiveMobileTab] = useState<"passage" | "questions">("passage");
  const [highlightedParagraphId, setHighlightedParagraphId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Dragging logic
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newLeftWidth = ((e.clientX - rect.left) / rect.width) * 100;
      // Clamp between 30% and 70%
      if (newLeftWidth >= 30 && newLeftWidth <= 70) {
        setLeftWidth(newLeftWidth);
      }
    },
    [isDragging]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !containerRef.current || !e.touches[0]) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newLeftWidth = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
      if (newLeftWidth >= 30 && newLeftWidth <= 70) {
        setLeftWidth(newLeftWidth);
      }
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const handleScrollToEvidence = (paragraphId: string) => {
    setHighlightedParagraphId(paragraphId);
    setActiveMobileTab("passage"); // Switch tab on mobile if needed

    setTimeout(() => {
      const el = document.getElementById(paragraphId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 50);

    // Remove pulse after 4s
    setTimeout(() => {
      setHighlightedParagraphId(null);
    }, 4000);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Mobile / Tablet Responsive Tab Switcher */}
      <div className="flex lg:hidden items-center justify-between p-1 rounded-2xl bg-secondary/80 border border-border">
        <button
          type="button"
          onClick={() => setActiveMobileTab("passage")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
            activeMobileTab === "passage"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <BookOpen className="h-4 w-4 text-indigo-500" />
          <span>Bài Đọc (Passage)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMobileTab("questions")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
            activeMobileTab === "questions"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <HelpCircle className="h-4 w-4 text-purple-500" />
          <span>Câu Hỏi ({passage.questions.length})</span>
        </button>
      </div>

      {/* Main Split View Container */}
      <div
        ref={containerRef}
        className={cn(
          "relative flex flex-col lg:flex-row w-full h-[78vh] min-h-[600px] rounded-3xl border border-border/80 bg-card overflow-hidden shadow-md select-none",
          isDragging && "cursor-col-resize select-none"
        )}
      >
        {/* Left Pane: Passage Pane */}
        <div
          className={cn(
            "h-full overflow-hidden transition-all duration-75 select-text",
            "hidden lg:block", // Desktop split
            activeMobileTab === "passage" && "block w-full lg:block" // Mobile tab
          )}
          style={{
            flex: `0 0 ${leftWidth}%`,
            maxWidth: `${leftWidth}%`,
          }}
        >
          <PassagePane
            passage={passage}
            highlightedParagraphId={highlightedParagraphId}
          />
        </div>

        {/* Resizable Divider (Desktop only) */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className={cn(
            "hidden lg:flex relative w-3.5 h-full items-center justify-center bg-secondary/40 hover:bg-indigo-500/20 transition-colors cursor-col-resize select-none shrink-0 border-x border-border/60 z-30 group",
            isDragging && "bg-indigo-500/30 border-indigo-500"
          )}
          title="Kéo thả sang trái/phải để điều chỉnh độ rộng 2 cột"
        >
          <div className="flex h-8 w-4 items-center justify-center rounded-md bg-card border border-border/80 shadow-sm text-muted-foreground group-hover:text-foreground">
            <GripVertical className="h-3 w-3" />
          </div>
        </div>

        {/* Right Pane: Question Pane */}
        <div
          className={cn(
            "h-full overflow-hidden transition-all duration-75 select-text",
            "hidden lg:block flex-1", // Desktop split
            activeMobileTab === "questions" && "block w-full lg:block" // Mobile tab
          )}
          style={{
            flex: `0 0 ${100 - leftWidth}%`,
            maxWidth: `${100 - leftWidth}%`,
          }}
        >
          <QuestionPane
            questions={passage.questions}
            materialId={passage.id}
            onScrollToEvidence={handleScrollToEvidence}
          />
        </div>
      </div>
    </div>
  );
}
