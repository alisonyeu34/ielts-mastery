"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mic,
  ArrowLeft,
  Sparkles,
  RotateCcw,
  Award,
  Layers,
} from "lucide-react";
import {
  MOCK_SPEAKING_FEEDBACK,
  SpeakingFeedbackReport,
} from "@/data/mockSpeakingFeedbackData";
import {
  calculateWPM,
  analyzeFillerWords,
  calculateOfficialSpeakingBand,
  extractSpeakingErrorsForErrorBank,
} from "@/lib/speakingEvaluationParser";
import { db } from "@/lib/db";
import { PracticeLog } from "@/types/database";
import { SpeakingRecordArena } from "@/components/practice/speaking-grader/SpeakingRecordArena";
import { SpeakingBandOverview } from "@/components/practice/speaking-grader/SpeakingBandOverview";
import { FluencyPauseVisualizer } from "@/components/practice/speaking-grader/FluencyPauseVisualizer";
import { FillerWordMeter } from "@/components/practice/speaking-grader/FillerWordMeter";
import { SpeakingCriteriaDetail } from "@/components/practice/speaking-grader/SpeakingCriteriaDetail";
import { SpeakingTranscriptAnnotator } from "@/components/practice/speaking-grader/SpeakingTranscriptAnnotator";
import { SpeakingModelAnswerCard } from "@/components/practice/speaking-grader/SpeakingModelAnswerCard";
import { SpeakingSubmissionModal } from "@/components/practice/speaking-grader/SpeakingSubmissionModal";

export default function SpeakingGraderStudioPage() {
  const [part, setPart] = useState<1 | 2 | 3>(3);
  const [prompt, setPrompt] = useState<string>(
    "Do you think technology has made people's lives easier or more complicated?"
  );
  const [isGrading, setIsGrading] = useState<boolean>(false);
  const [isGraded, setIsGraded] = useState<boolean>(false);

  // Feedback Data
  const [feedbackReport, setFeedbackReport] = useState<SpeakingFeedbackReport>(MOCK_SPEAKING_FEEDBACK);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);
  const [syncedErrorsCount, setSyncedErrorsCount] = useState<number>(0);

  // Trigger Grading
  const handleGradeSpeaking = async (transcriptText: string, durationSec: number) => {
    setIsGrading(true);

    setTimeout(async () => {
      const wordsCount = transcriptText.trim().split(/\s+/).filter(Boolean).length;
      const wpm = calculateWPM(wordsCount, durationSec || 42);
      const fillerAnalysis = analyzeFillerWords(transcriptText);

      const report: SpeakingFeedbackReport = {
        ...MOCK_SPEAKING_FEEDBACK,
        part,
        prompt,
        originalTranscript: transcriptText,
        durationSeconds: durationSec || 42,
        wordCount: wordsCount,
        wordsPerMinute: wpm || 122,
        fillerWordCount: fillerAnalysis.totalFillers,
      };

      setFeedbackReport(report);

      // Extract and save errors to Error Bank
      const extractedErrors = extractSpeakingErrorsForErrorBank(report.annotatedTokens, prompt);
      setSyncedErrorsCount(extractedErrors.length);

      for (const err of extractedErrors) {
        db.error_bank.put(err).catch(() => {});
      }

      // Save Practice Log
      try {
        const log: PracticeLog = {
          id: `log_speaking_${Date.now()}_${report.id}`,
          type: "speaking_grader",
          materialId: report.id,
          score: report.overallBand,
          timeSpentSeconds: report.durationSeconds,
          accuracyPercentage: Math.round((report.overallBand / 9.0) * 100),
          createdAt: new Date().toISOString(),
        };
        await db.practice_logs.put(log);
      } catch (e) {
        console.error("Failed to save speaking practice log:", e);
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
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
            <Mic className="h-4 w-4" /> Module 3B • Phòng Chấm & Chữa Bài Speaking AI Tương Tác
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Thẩm Định Bài Nói 4 Tiêu Chí Cambridge & Nâng Cấp C1
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Bóc tách FC - LR - GRA - PR • Đo lường WPM, khoảng lặng ngập ngừng & cung cấp bài mẫu Band 8.5+.
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
              <span>Thu Âm Bài Mới</span>
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
        /* State 1: Recording Arena */
        <SpeakingRecordArena
          part={part}
          onPartChange={setPart}
          prompt={prompt}
          onPromptChange={setPrompt}
          onGrade={handleGradeSpeaking}
          isGrading={isGrading}
        />
      ) : (
        /* State 2: 2-Column Assessment & Upgrade Studio */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-in fade-in duration-300">
          {/* Left Column (Scores, Fluency & Criteria Detail) - 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            <SpeakingBandOverview
              part={feedbackReport.part}
              overallBand={feedbackReport.overallBand}
              scores={{
                fc: feedbackReport.criteria.fc.score,
                lr: feedbackReport.criteria.lr.score,
                gra: feedbackReport.criteria.gra.score,
                pr: feedbackReport.criteria.pr.score,
              }}
            />

            <FluencyPauseVisualizer
              durationSeconds={feedbackReport.durationSeconds}
              wordsPerMinute={feedbackReport.wordsPerMinute}
              pauseIntervals={feedbackReport.pauseIntervals}
            />

            <FillerWordMeter transcript={feedbackReport.originalTranscript} />

            <SpeakingCriteriaDetail criteria={feedbackReport.criteria} />
          </div>

          {/* Right Column (Transcript Annotations & Model Answer) - 7 cols */}
          <div className="lg:col-span-7 space-y-6">
            <SpeakingTranscriptAnnotator
              annotatedTokens={feedbackReport.annotatedTokens}
            />

            <SpeakingModelAnswerCard
              modelAnswer={feedbackReport.modelAnswer}
              modelCollocations={feedbackReport.modelCollocations}
            />
          </div>
        </div>
      )}

      {/* Summary Report Modal */}
      <SpeakingSubmissionModal
        isOpen={isSummaryModalOpen}
        report={feedbackReport}
        errorCount={syncedErrorsCount}
        onClose={() => setIsSummaryModalOpen(false)}
        onRestart={handleRestart}
      />
    </div>
  );
}
