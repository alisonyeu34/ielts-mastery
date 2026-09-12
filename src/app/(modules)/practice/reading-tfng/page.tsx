"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowLeft,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertTriangle,
  GripVertical,
  HelpCircle,
  Clock,
  RotateCcw,
  Send,
} from "lucide-react";
import { MOCK_TFNG_PASSAGES, TFNGPassage } from "@/data/mockTFNGPassages";
import { useTFNGLogic } from "@/hooks/useTFNGLogic";
import { EvidenceHighlighter } from "@/components/practice/reading/EvidenceHighlighter";
import { TFNGDecisionTree } from "@/components/practice/reading/TFNGDecisionTree";
import { TFNGTrapCallout } from "@/components/practice/reading/TFNGTrapCallout";
import { TFNGQuestionItem } from "@/components/practice/reading/TFNGQuestionItem";
import { TFNGSummaryModal } from "@/components/practice/reading/TFNGSummaryModal";
import { cn } from "@/lib/utils";

export default function ReadingTFNGPage() {
  const [selectedPassageId, setSelectedPassageId] = useState<string>(
    MOCK_TFNG_PASSAGES[0].id
  );
  const [leftWidth, setLeftWidth] = useState<number>(50); // percentage 50%
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<"passage" | "questions">("passage");

  const currentPassage: TFNGPassage =
    MOCK_TFNG_PASSAGES.find((p) => p.id === selectedPassageId) ||
    MOCK_TFNG_PASSAGES[0];

  const {
    answers,
    activeEvidenceQuote,
    activeParagraphId,
    isSubmitted,
    resultSummary,
    setAnswer,
    highlightEvidence,
    checkAnswersAndLogErrors,
    resetAll,
  } = useTFNGLogic();

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

  const handlePassageChange = (newPassageId: string) => {
    setSelectedPassageId(newPassageId);
    resetAll();
  };

  const handleSubmit = async () => {
    await checkAnswersAndLogErrors(
      currentPassage.questions,
      currentPassage.title,
      currentPassage.id
    );
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = currentPassage.questions.length;

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">
            <Sparkles className="h-4 w-4" /> Module 2 / 5 • Chuyên Sâu Reading True / False / Not Given
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Phòng Luyện Bóc Tách Dạng Bài True / False / Not Given
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Làm chủ tư duy phân biệt FALSE (mâu thuẫn 180°) vs NOT GIVEN (suy diễn ngoài bài). Bóc tách 5 bẫy khảo thí Cambridge.
          </p>
        </div>

        <Link
          href="/practice"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card/60 self-start sm:self-auto shadow-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Về Trung tâm Luyện tập
        </Link>
      </div>

      {/* Passage Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {MOCK_TFNG_PASSAGES.map((passage, idx) => {
          const isSelected = passage.id === selectedPassageId;

          return (
            <button
              key={passage.id}
              type="button"
              onClick={() => handlePassageChange(passage.id)}
              className={cn(
                "px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 cursor-pointer flex items-center gap-2 shadow-sm",
                isSelected
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-indigo-600/20 scale-[1.02]"
                  : "bg-card hover:bg-secondary text-muted-foreground border-border"
              )}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Bài đọc {idx + 1}: {passage.topic}</span>
            </button>
          );
        })}
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
          ❓ Câu hỏi TFNG ({answeredCount}/{totalQuestions})
        </button>
      </div>

      {/* Split-View Workspace Container */}
      <div
        ref={containerRef}
        className="relative flex flex-col md:flex-row rounded-3xl border border-border bg-card shadow-sm overflow-hidden min-h-[700px]"
      >
        {/* Left Pane: Reading Passage & Evidence Highlighter */}
        <div
          style={{ width: `${leftWidth}%` }}
          className={cn(
            "h-[700px] overflow-y-auto p-5 sm:p-7 border-r border-border/80 custom-scrollbar",
            mobileTab === "passage" ? "block w-full md:block" : "hidden md:block"
          )}
        >
          <div className="space-y-4">
            <div className="border-b border-border/80 pb-3">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
                {currentPassage.topic}
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-foreground mt-1">
                {currentPassage.title}
              </h2>
              <span className="text-xs text-muted-foreground">
                Độ dài: ~{currentPassage.wordCount} từ • Thời gian làm đề nghị: {currentPassage.timeLimitMinutes} phút
              </span>
            </div>

            <EvidenceHighlighter
              paragraphs={currentPassage.paragraphs}
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

        {/* Right Pane: TFNG Questions, Decision Tree & Traps */}
        <div
          style={{ width: `${100 - leftWidth}%` }}
          className={cn(
            "h-[700px] overflow-y-auto p-5 sm:p-7 space-y-6 custom-scrollbar bg-secondary/10",
            mobileTab === "questions" ? "block w-full md:block" : "hidden md:block"
          )}
        >
          {/* Interactive Decision Tree */}
          <TFNGDecisionTree />

          {/* Trap Callout Guide */}
          <TFNGTrapCallout />

          {/* Questions Header */}
          <div className="flex items-center justify-between border-b border-border/80 pb-2">
            <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-indigo-500" />
              <span>Danh Sách Nhận Định (Statements 1 - {totalQuestions})</span>
            </h3>
            <span className="text-xs font-semibold text-muted-foreground">
              Đã chọn: <strong>{answeredCount} / {totalQuestions}</strong>
            </span>
          </div>

          {/* List of Questions */}
          <div className="space-y-4">
            {currentPassage.questions.map((q, idx) => (
              <TFNGQuestionItem
                key={q.id}
                question={q}
                index={idx}
                userAnswer={answers[q.id]}
                isSubmitted={isSubmitted}
                onSelectAnswer={(ans) => setAnswer(q.id, ans)}
                onHighlightEvidence={(quote, pId) => {
                  highlightEvidence(quote, pId);
                  setMobileTab("passage"); // on mobile, switch to passage to view evidence
                }}
              />
            ))}
          </div>

          {/* Submit Action Box */}
          {!isSubmitted ? (
            <div className="pt-3 flex justify-end">
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
                <span>Kiểm tra toàn bộ đáp án ({answeredCount}/{totalQuestions})</span>
              </button>
            </div>
          ) : (
            resultSummary && (
              <TFNGSummaryModal
                summary={resultSummary}
                passageTitle={currentPassage.title}
                onRestart={resetAll}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
