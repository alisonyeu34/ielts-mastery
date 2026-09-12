"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PenTool,
  ArrowLeft,
  Sparkles,
  RotateCcw,
  Award,
  BookOpen,
  Layers,
  CheckCircle2,
} from "lucide-react";
import {
  MOCK_BAND55_ESSAY,
  MOCK_WRITING_FEEDBACK,
  WritingFeedbackReport,
  AnnotatedSentence,
} from "@/data/mockWritingFeedbackData";
import {
  calculateOfficialWritingBand,
  extractErrorsForErrorBank,
} from "@/lib/writingEvaluationParser";
import { db } from "@/lib/db";
import { PracticeLog } from "@/types/database";
import { WritingInputWorkspace } from "@/components/practice/writing-grader/WritingInputWorkspace";
import { BandScoreRadarOverview } from "@/components/practice/writing-grader/BandScoreRadarOverview";
import { CriteriaBreakdownCard } from "@/components/practice/writing-grader/CriteriaBreakdownCard";
import { LexicalDensityMeter } from "@/components/practice/writing-grader/LexicalDensityMeter";
import { InlineAnnotatedEssayViewer } from "@/components/practice/writing-grader/InlineAnnotatedEssayViewer";
import { SentenceUpgradeComparison } from "@/components/practice/writing-grader/SentenceUpgradeComparison";
import { WritingFeedbackSummaryModal } from "@/components/practice/writing-grader/WritingFeedbackSummaryModal";

export default function WritingGraderStudioPage() {
  const [taskType, setTaskType] = useState<"task1" | "task2">("task2");
  const [prompt, setPrompt] = useState<string>(
    "Some people believe that unpaid community service should be a compulsory part of high school programmes. To what extent do you agree or disagree?"
  );
  const [essayContent, setEssayContent] = useState<string>("");
  const [isGrading, setIsGrading] = useState<boolean>(false);
  const [isGraded, setIsGraded] = useState<boolean>(false);

  // Feedback Data
  const [feedbackReport, setFeedbackReport] = useState<WritingFeedbackReport>(MOCK_WRITING_FEEDBACK);
  const [selectedSentence, setSelectedSentence] = useState<AnnotatedSentence | null>(
    MOCK_WRITING_FEEDBACK.annotatedSentences[0]
  );
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);
  const [syncedErrorsCount, setSyncedErrorsCount] = useState<number>(0);

  // Trigger Grading
  const handleGradeEssay = async () => {
    setIsGrading(true);

    // Simulate AI grading analysis latency (800ms)
    setTimeout(async () => {
      const report: WritingFeedbackReport = {
        ...MOCK_WRITING_FEEDBACK,
        taskType,
        prompt,
        originalEssay: essayContent.trim() || MOCK_BAND55_ESSAY,
        wordCount: (essayContent.trim() || MOCK_BAND55_ESSAY).split(/\s+/).filter(Boolean).length,
      };

      setFeedbackReport(report);
      setSelectedSentence(report.annotatedSentences[0] || null);

      // Extract and save errors into Dexie DB
      const extractedErrors = extractErrorsForErrorBank(report.annotatedSentences, prompt);
      setSyncedErrorsCount(extractedErrors.length);

      for (const err of extractedErrors) {
        db.error_bank.put(err).catch(() => {});
      }

      // Save Practice Log
      try {
        const log: PracticeLog = {
          id: `log_writing_${Date.now()}_${report.id}`,
          type: "writing_grader",
          materialId: report.id,
          score: report.overallBand,
          timeSpentSeconds: report.timeSpentSeconds,
          accuracyPercentage: Math.round((report.overallBand / 9.0) * 100),
          createdAt: new Date().toISOString(),
        };
        await db.practice_logs.put(log);
      } catch (e) {
        console.error("Failed to save writing practice log:", e);
      }

      setIsGrading(false);
      setIsGraded(true);
      setIsSummaryModalOpen(true);
    }, 800);
  };

  const handleRestart = () => {
    setIsGraded(false);
    setIsSummaryModalOpen(false);
  };

  return (
    <div className="space-y-7 pb-20 max-w-7xl mx-auto select-none">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
            <PenTool className="h-4 w-4" /> Module 3A • Phòng Chấm & Chữa Bài Writing Học Thuật AI
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Thẩm Định Bài Viết 4 Tiêu Chí Cambridge & Nâng Cấp Câu C1
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Bóc tách điểm số TR - CC - LR - GRA • Chỉ báo lỗi sai ngữ pháp & gợi ý diễn đạt chuẩn Band 8.0+.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {isGraded && (
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground px-3.5 py-2 rounded-xl border border-border bg-card shadow-xs hover:bg-secondary transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5 text-primary" />
              <span>Soạn Bài Mới</span>
            </button>
          )}

          <Link
            href="/practice"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Về phòng luyện tập
          </Link>
        </div>
      </div>

      {/* Main Screen Modes */}
      {!isGraded ? (
        /* State 1: Drafting & Pre-flight Workspace */
        <WritingInputWorkspace
          taskType={taskType}
          onTaskTypeChange={setTaskType}
          prompt={prompt}
          onPromptChange={setPrompt}
          essayContent={essayContent}
          onEssayContentChange={setEssayContent}
          onGrade={handleGradeEssay}
          isGrading={isGrading}
        />
      ) : (
        /* State 2: 2-Column Assessment & Upgrade Studio */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-in fade-in duration-300">
          {/* Left Column (Scores & Criteria Breakdown) - 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            <BandScoreRadarOverview
              overallBand={feedbackReport.overallBand}
              scores={{
                tr: feedbackReport.criteria.tr.score,
                cc: feedbackReport.criteria.cc.score,
                lr: feedbackReport.criteria.lr.score,
                gra: feedbackReport.criteria.gra.score,
              }}
            />

            <CriteriaBreakdownCard criteria={feedbackReport.criteria} />

            <LexicalDensityMeter essayText={feedbackReport.originalEssay} />
          </div>

          {/* Right Column (Essay Annotation & 3-Tier Upgrade) - 7 cols */}
          <div className="lg:col-span-7 space-y-6">
            <InlineAnnotatedEssayViewer
              originalEssay={feedbackReport.originalEssay}
              annotatedSentences={feedbackReport.annotatedSentences}
              selectedSentenceId={selectedSentence?.id || null}
              onSelectSentence={setSelectedSentence}
            />

            <SentenceUpgradeComparison sentence={selectedSentence} />
          </div>
        </div>
      )}

      {/* Summary Report Modal */}
      <WritingFeedbackSummaryModal
        isOpen={isSummaryModalOpen}
        report={feedbackReport}
        errorCount={syncedErrorsCount}
        onClose={() => setIsSummaryModalOpen(false)}
        onRestart={handleRestart}
      />
    </div>
  );
}
