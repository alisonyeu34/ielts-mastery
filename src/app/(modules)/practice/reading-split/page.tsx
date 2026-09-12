"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  ArrowLeft,
  Sparkles,
  TableProperties,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import { MOCK_BIOMIMETIC_PASSAGE } from "@/data/mockReadingPassageData";
import { useReadingSplitSession } from "@/hooks/useReadingSplitSession";
import { SplitViewLayout } from "@/components/practice/reading/SplitViewLayout";
import { PassageAnnotationPane } from "@/components/practice/reading/PassageAnnotationPane";
import { QuestionInteractionPane } from "@/components/practice/reading/QuestionInteractionPane";
import { ParaphraseMatrixDrawer } from "@/components/practice/reading/ParaphraseMatrixDrawer";
import { ReadingResultSummaryModal } from "@/components/practice/reading/ReadingResultSummaryModal";
import { SafeZoneGauge } from "@/components/practice/SafeZoneGauge";

export default function ReadingSplitViewPage() {
  const {
    answers,
    highlights,
    activeEvidenceSentenceId,
    isSubmitted,
    showParaphraseDrawer,
    showSummaryModal,
    timeSpentSeconds,
    fontSizeScale,
    completedCount,
    setAnswer,
    addHighlight,
    removeHighlight,
    pinpointEvidence,
    submitReadingTest,
    resetSession,
    setShowParaphraseDrawer,
    setShowSummaryModal,
    setFontSizeScale,
  } = useReadingSplitSession(MOCK_BIOMIMETIC_PASSAGE);

  // Compute total correct for summary modal
  const correctCount = MOCK_BIOMIMETIC_PASSAGE.questions.filter((q) => {
    const userAns = (answers[q.id] || "").trim().toLowerCase();
    const correctAns = q.correctAnswer.trim().toLowerCase();
    return (
      userAns === correctAns ||
      (q.type === "summary_completion" &&
        (userAns.includes(correctAns) || correctAns.includes(userAns)))
    );
  }).length;

  return (
    <div className="space-y-4 pb-12 max-w-7xl mx-auto select-none">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-red-700 dark:text-red-400 uppercase tracking-wider">
            <FileText className="h-4 w-4" /> Module 2 • Split-View Reading Workspace & Paraphrase Mapping
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-foreground">
            Luyện Đọc 2 Cột Chuẩn Kỳ Thi Máy Tính
          </h1>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {isSubmitted && (
            <button
              type="button"
              onClick={() => setShowParaphraseDrawer(true)}
              className="px-3.5 py-1.5 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <TableProperties className="h-3.5 w-3.5 text-primary" />
              <span>Bật Ma Trận Paraphrase</span>
            </button>
          )}

          <Link
            href="/theory/reading-methods/reading-foundation-skimming-scanning"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <BookOpen className="h-3.5 w-3.5" /> Học Kỹ Năng Đọc Trước
          </Link>

          <Link
            href="/practice"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-1.5 rounded-xl border border-border bg-card shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Về phòng luyện tập
          </Link>
        </div>
      </div>

      {/* Pre-Drill Strategy Callout Banner */}
      <div className="p-4 rounded-2xl bg-blue-500/[0.08] border border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-blue-700 dark:text-blue-400 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" /> Hướng Dẫn Kỹ Năng Giải Đề Chuẩn Cambridge:
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-700 dark:text-blue-400 font-bold">
              Quy Trình 3 Bước
            </span>
          </div>
          <p className="text-muted-foreground text-[11px] leading-relaxed">
            1. <strong>Skim 90s:</strong> Đọc tiêu đề & câu đầu mỗi đoạn để nắm bản đồ tư duy ➔ 2. <strong>Scan:</strong> Gạch chân Hard Keywords (tên, số, năm) định vị vị trí ➔ 3. <strong>Đối soát Soft Keywords:</strong> Bắt từ đồng nghĩa paraphrase và áp dụng quy tắc buông bỏ 1.5 phút.
          </p>
        </div>

        <Link
          href="/theory/reading-methods/reading-foundation-skimming-scanning"
          className="px-3 py-1.5 rounded-xl border border-blue-500/30 bg-card hover:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-bold text-[11px] shrink-0 self-start sm:self-auto flex items-center gap-1"
        >
          <BookOpen className="h-3 w-3" />
          <span>Xem Bài Giảng Skimming/Scanning ➔</span>
        </Link>
      </div>

      {/* Feature 4: Live Safe-Zone Gauge for Reading 8.5 */}
      <SafeZoneGauge
        skill="reading"
        currentScore={isSubmitted ? correctCount : completedCount}
        maxScore={MOCK_BIOMIMETIC_PASSAGE.questions.length}
        customSafeThreshold={12}
        targetBandLabel="8.5"
        unit="câu"
      />

      {/* 2-Column Split Workspace */}
      <SplitViewLayout
        leftPane={
          <PassageAnnotationPane
            passage={MOCK_BIOMIMETIC_PASSAGE}
            highlights={highlights}
            activeEvidenceSentenceId={activeEvidenceSentenceId}
            fontSizeScale={fontSizeScale}
            onAddHighlight={addHighlight}
            onRemoveHighlight={removeHighlight}
            onChangeFontSize={setFontSizeScale}
          />
        }
        rightPane={
          <QuestionInteractionPane
            questions={MOCK_BIOMIMETIC_PASSAGE.questions}
            answers={answers}
            isSubmitted={isSubmitted}
            timeSpentSeconds={timeSpentSeconds}
            completedCount={completedCount}
            onSetAnswer={setAnswer}
            onPinpointEvidence={pinpointEvidence}
            onSubmit={submitReadingTest}
            onOpenParaphraseDrawer={() => setShowParaphraseDrawer(true)}
          />
        }
      />

      {/* Paraphrase Mapping Drawer */}
      <ParaphraseMatrixDrawer
        isOpen={showParaphraseDrawer}
        questions={MOCK_BIOMIMETIC_PASSAGE.questions}
        onClose={() => setShowParaphraseDrawer(false)}
      />

      {/* Summary Score Modal */}
      <ReadingResultSummaryModal
        isOpen={showSummaryModal}
        correctCount={correctCount}
        totalQuestions={MOCK_BIOMIMETIC_PASSAGE.questions.length}
        timeSpentSeconds={timeSpentSeconds}
        onOpenParaphrase={() => {
          setShowSummaryModal(false);
          setShowParaphraseDrawer(true);
        }}
        onReviewAnswers={() => setShowSummaryModal(false)}
        onRestart={resetSession}
      />
    </div>
  );
}
