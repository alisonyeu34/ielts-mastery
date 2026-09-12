"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowLeft,
  Sparkles,
  Layers,
  GripVertical,
  HelpCircle,
  Clock,
  RotateCcw,
  Send,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { MOCK_HEADINGS_PASSAGE } from "@/data/mockHeadingsPassages";
import { useMatchingHeadings } from "@/hooks/useMatchingHeadings";
import { ParagraphStructuralViewer } from "@/components/practice/reading/ParagraphStructuralViewer";
import { HeadingsBank } from "@/components/practice/reading/HeadingsBank";
import { HeadingTrapModal } from "@/components/practice/reading/HeadingTrapModal";
import { HeadingsScoreSummary } from "@/components/practice/reading/HeadingsScoreSummary";
import { cn } from "@/lib/utils";

export default function ReadingHeadingsPage() {
  const [leftWidth, setLeftWidth] = useState<number>(55); // percentage
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<"passage" | "headings">("passage");

  const passage = MOCK_HEADINGS_PASSAGE;

  const {
    assignedHeadings,
    selectedHeadingId,
    showStructureAnalysis,
    isSubmitted,
    summary,
    selectHeading,
    assignHeading,
    removeHeading,
    toggleStructureAnalysis,
    evaluateSubmission,
    resetAll,
  } = useMatchingHeadings();

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Dragging logic
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const newWidth = (currentX / rect.width) * 100;
      if (newWidth >= 30 && newWidth <= 75) {
        setLeftWidth(newWidth);
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
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleSubmit = async () => {
    await evaluateSubmission(passage);
  };

  const assignedCount = Object.keys(assignedHeadings).length;
  const totalParagraphs = passage.paragraphs.length;

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">
            <Sparkles className="h-4 w-4" /> Module 2 / 5 • Chuyên Sâu Matching Headings
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Phòng Luyện Bóc Tách Dạng Bài Matching Headings
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Làm chủ kỹ thuật quét câu chủ đề (Topic Sentence), nhận diện ý chính (Main Idea) và loại bỏ bẫy từ khóa lặp lại (Word-Match Trap).
          </p>
        </div>

        <Link
          href="/practice"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card/60 self-start sm:self-auto shadow-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Về Trung tâm Luyện tập
        </Link>
      </div>

      {/* Action Bar: Structure Mode Toggle & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-card border border-border shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            {passage.topic}
          </span>
          <span className="text-xs text-muted-foreground font-medium">
            Đã gán: <strong>{assignedCount} / {totalParagraphs} đoạn</strong>
          </span>
        </div>

        {/* Structure Analysis Toggle Button */}
        <button
          type="button"
          onClick={toggleStructureAnalysis}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border shadow-sm self-start sm:self-auto",
            showStructureAnalysis
              ? "bg-indigo-600 text-white border-indigo-600 shadow-indigo-600/20"
              : "bg-secondary hover:bg-secondary/80 text-foreground border-border"
          )}
        >
          <Eye className="h-3.5 w-3.5" />
          <span>
            {showStructureAnalysis
              ? "Đang Bật: Phân tích Câu Chủ Đề (Topic Sentences)"
              : "Bật Phân Tích Cấu Trúc Đoạn (Topic Sentence Mode)"}
          </span>
        </button>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="flex md:hidden items-center gap-1.5 p-1 rounded-xl bg-secondary/80 border border-border">
        <button
          type="button"
          onClick={() => setMobileTab("passage")}
          className={cn(
            "flex-1 py-2 text-xs font-bold rounded-lg transition-all text-center",
            mobileTab === "passage"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground"
          )}
        >
          📖 Bài đọc & Ô thả ({assignedCount}/{totalParagraphs})
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("headings")}
          className={cn(
            "flex-1 py-2 text-xs font-bold rounded-lg transition-all text-center",
            mobileTab === "headings"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground"
          )}
        >
          🏷️ Danh sách tiêu đề ({passage.headings.length})
        </button>
      </div>

      {/* Split-View Workspace */}
      <div
        ref={containerRef}
        className="relative flex flex-col md:flex-row rounded-3xl border border-border bg-card shadow-sm overflow-hidden min-h-[720px]"
      >
        {/* Left Pane: Paragraphs & Drop Zones */}
        <div
          style={{ width: `${leftWidth}%` }}
          className={cn(
            "h-[720px] overflow-y-auto p-5 sm:p-7 border-r border-border/80 custom-scrollbar",
            mobileTab === "passage" ? "block w-full md:block" : "hidden md:block"
          )}
        >
          <div className="space-y-4">
            <div className="border-b border-border/80 pb-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-foreground">
                {passage.title}
              </h2>
              <span className="text-xs text-muted-foreground">
                Độ dài: ~{passage.wordCount} từ • Gồm 5 đoạn văn chính (A - E)
              </span>
            </div>

            <ParagraphStructuralViewer
              paragraphs={passage.paragraphs}
              headings={passage.headings}
              assignedHeadings={assignedHeadings}
              selectedHeadingId={selectedHeadingId}
              evaluations={summary?.evaluations}
              showStructureAnalysis={showStructureAnalysis}
              isSubmitted={isSubmitted}
              onAssignHeading={assignHeading}
              onRemoveHeading={removeHeading}
            />
          </div>
        </div>

        {/* Resizable Divider Handle (Desktop Only) */}
        <div
          onMouseDown={handleMouseDown}
          className="hidden md:flex w-2.5 bg-secondary/40 hover:bg-indigo-500/30 active:bg-indigo-600 cursor-col-resize items-center justify-center transition-colors border-x border-border/40 select-none z-10"
          title="Kéo thả để điều chỉnh tỷ lệ 2 cột"
        >
          <GripVertical className="h-4 w-4 text-muted-foreground/60" />
        </div>

        {/* Right Pane: Headings Bank, Traps & Submit */}
        <div
          style={{ width: `${100 - leftWidth}%` }}
          className={cn(
            "h-[720px] overflow-y-auto p-5 sm:p-7 space-y-6 custom-scrollbar bg-secondary/10",
            mobileTab === "headings" ? "block w-full md:block" : "hidden md:block"
          )}
        >
          {/* Cambridge Trap Guide */}
          <HeadingTrapModal />

          {/* Headings Bank */}
          <HeadingsBank
            headings={passage.headings}
            assignedHeadings={assignedHeadings}
            selectedHeadingId={selectedHeadingId}
            isSubmitted={isSubmitted}
            onSelectHeading={selectHeading}
          />

          {/* Submit Action Box */}
          {!isSubmitted ? (
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={assignedCount === 0}
                className={cn(
                  "px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer",
                  assignedCount > 0
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:scale-105"
                    : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                )}
              >
                <Send className="h-4 w-4" />
                <span>Nộp bài & Chấm điểm ({assignedCount}/{totalParagraphs})</span>
              </button>
            </div>
          ) : (
            summary && (
              <HeadingsScoreSummary
                summary={summary}
                passageTitle={passage.title}
                onRestart={resetAll}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
