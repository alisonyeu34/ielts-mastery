"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowLeft,
  Sparkles,
  Layers,
  FileText,
  GripVertical,
  HelpCircle,
  Clock,
  RotateCcw,
  Send,
  Eye,
  CheckCircle2,
} from "lucide-react";
import {
  MOCK_SUMMARY_TASK,
  MOCK_DIAGRAM_TASK,
  SummaryCompletionTask,
  DiagramLabellingTask,
} from "@/data/mockCompletionPassages";
import { useCompletionValidator } from "@/hooks/useCompletionValidator";
import { EvidenceHighlighter } from "@/components/practice/reading/EvidenceHighlighter";
import { SummaryCompletionPane } from "@/components/practice/reading/SummaryCompletionPane";
import { DiagramLabellingPane } from "@/components/practice/reading/DiagramLabellingPane";
import { PredictionHelperModal } from "@/components/practice/reading/PredictionHelperModal";
import { CompletionFeedbackModal } from "@/components/practice/reading/CompletionFeedbackModal";
import { cn } from "@/lib/utils";

type TaskMode = "summary" | "diagram";

export default function ReadingCompletionPage() {
  const [taskMode, setTaskMode] = useState<TaskMode>("summary");
  const [leftWidth, setLeftWidth] = useState<number>(50); // percentage 50%
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<"passage" | "questions">("passage");

  const [activeEvidenceQuote, setActiveEvidenceQuote] = useState<string | null>(null);
  const [activeParagraphId, setActiveParagraphId] = useState<string | null>(null);

  const currentTask = taskMode === "summary" ? MOCK_SUMMARY_TASK : MOCK_DIAGRAM_TASK;

  const {
    inputs,
    activeQuestionId,
    isSubmitted,
    summary,
    setInput,
    setActiveQuestionId,
    evaluate,
    resetAll,
  } = useCompletionValidator();

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
      if (newWidth >= 30 && newWidth <= 70) {
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

  const handleModeChange = (mode: TaskMode) => {
    setTaskMode(mode);
    setActiveEvidenceQuote(null);
    setActiveParagraphId(null);
    resetAll();
  };

  const handleHighlightEvidence = (quote: string, paragraphId: string) => {
    setActiveEvidenceQuote(quote);
    setActiveParagraphId(paragraphId);
    setMobileTab("passage"); // switch on mobile
  };

  const handleSubmit = async () => {
    await evaluate(
      currentTask.questions,
      currentTask.title,
      currentTask.id
    );
  };

  const answeredCount = Object.values(inputs).filter((v) => v.trim().length > 0).length;
  const totalQuestions = currentTask.questions.length;

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">
            <Sparkles className="h-4 w-4" /> Module 2 / 5 • Chuyên Sâu Summary Completion & Diagram Labelling
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Phòng Luyện Điền Từ Tóm Tắt & Gán Nhãn Sơ Đồ
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Làm chủ kỹ thuật dự đoán từ loại (POS Prediction), kiểm soát giới hạn số từ và triệt tiêu bẫy danh từ số ít / số nhiều (-s/-es).
          </p>
        </div>

        <Link
          href="/practice"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card/60 self-start sm:self-auto shadow-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Về Trung tâm Luyện tập
        </Link>
      </div>

      {/* Task Mode Switcher Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-secondary/60 border border-border/80">
        <button
          type="button"
          onClick={() => handleModeChange("summary")}
          className={cn(
            "flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
            taskMode === "summary"
              ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <FileText className="h-4 w-4 text-indigo-500" />
          <span>Điền Tóm Tắt Đoạn Văn (Summary Completion)</span>
        </button>

        <button
          type="button"
          onClick={() => handleModeChange("diagram")}
          className={cn(
            "flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
            taskMode === "diagram"
              ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Layers className="h-4 w-4 text-purple-500" />
          <span>Gán Nhãn Sơ Đồ Kỹ Thuật (Diagram Labelling)</span>
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
          📖 Văn bản bài đọc
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("questions")}
          className={cn(
            "flex-1 py-2 text-xs font-bold rounded-lg transition-all text-center",
            mobileTab === "questions"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground"
          )}
        >
          ✍️ Ô điền từ ({answeredCount}/{totalQuestions})
        </button>
      </div>

      {/* Split-View Workspace */}
      <div
        ref={containerRef}
        className="relative flex flex-col md:flex-row rounded-3xl border border-border bg-card shadow-sm overflow-hidden min-h-[720px]"
      >
        {/* Left Pane: Reading Passage & Evidence Highlighter */}
        <div
          style={{ width: `${leftWidth}%` }}
          className={cn(
            "h-[720px] overflow-y-auto p-5 sm:p-7 border-r border-border/80 custom-scrollbar",
            mobileTab === "passage" ? "block w-full md:block" : "hidden md:block"
          )}
        >
          <div className="space-y-4">
            <div className="border-b border-border/80 pb-3">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
                {currentTask.topic}
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-foreground mt-1">
                {currentTask.title}
              </h2>
            </div>

            <EvidenceHighlighter
              paragraphs={currentTask.paragraphs}
              activeEvidenceQuote={activeEvidenceQuote}
              activeParagraphId={activeParagraphId}
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

        {/* Right Pane: Summary/Diagram Inputs & POS Prediction Guide */}
        <div
          style={{ width: `${100 - leftWidth}%` }}
          className={cn(
            "h-[720px] overflow-y-auto p-5 sm:p-7 space-y-6 custom-scrollbar bg-secondary/10",
            mobileTab === "questions" ? "block w-full md:block" : "hidden md:block"
          )}
        >
          {/* Predictive Reading Guide */}
          <PredictionHelperModal />

          {/* Mode-specific Pane */}
          {taskMode === "summary" ? (
            <SummaryCompletionPane
              task={MOCK_SUMMARY_TASK}
              inputs={inputs}
              activeQuestionId={activeQuestionId}
              evaluations={summary?.evaluations}
              isSubmitted={isSubmitted}
              onInputChange={setInput}
              onSelectQuestion={setActiveQuestionId}
              onHighlightEvidence={handleHighlightEvidence}
            />
          ) : (
            <DiagramLabellingPane
              task={MOCK_DIAGRAM_TASK}
              inputs={inputs}
              activeQuestionId={activeQuestionId}
              evaluations={summary?.evaluations}
              isSubmitted={isSubmitted}
              onInputChange={setInput}
              onSelectQuestion={setActiveQuestionId}
            />
          )}

          {/* Submit Action Box */}
          {!isSubmitted ? (
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={answeredCount === 0}
                className={cn(
                  "px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer",
                  answeredCount > 0
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:scale-105"
                    : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                )}
              >
                <Send className="h-4 w-4" />
                <span>Nộp bài & Chấm điểm ({answeredCount}/{totalQuestions})</span>
              </button>
            </div>
          ) : (
            summary && (
              <CompletionFeedbackModal
                summary={summary}
                taskTitle={currentTask.title}
                onRestart={resetAll}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
