"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import {
  FileText,
  ArrowLeft,
  Sparkles,
  Award,
  BookOpen,
  CheckCircle2,
  ShieldAlert,
  Zap,
  RotateCcw,
  Clock,
  History,
  PenTool,
} from "lucide-react";
import { db } from "@/lib/db";
import { AISubmission, AISkillType, ErrorItem, ErrorClassification } from "@/types/database";
import { WritingPrompt } from "@/data/mockWritingPrompts";
import { AIWritingEvaluationResponse } from "@/lib/aiPrompts";
import { WritingWorkspace } from "@/components/grading/writing/WritingWorkspace";
import { CriteriaScoreCards } from "@/components/grading/writing/CriteriaScoreCards";
import { GrammarErrorList } from "@/components/grading/writing/GrammarErrorList";
import { C1UpgradeList } from "@/components/grading/writing/C1UpgradeList";
import { cn } from "@/lib/utils";

type ViewMode = "editor" | "report" | "history";
type ReportTab = "scores" | "grammar" | "upgrades";

export default function WritingGraderPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("editor");
  const [reportTab, setReportTab] = useState<ReportTab>("scores");
  const [currentPrompt, setCurrentPrompt] = useState<WritingPrompt | null>(null);
  const [currentEssay, setCurrentEssay] = useState<string>("");
  const [evaluationResult, setEvaluationResult] =
    useState<AIWritingEvaluationResponse | null>(null);

  // Live Query for past AI writing submissions
  const pastSubmissions = useLiveQuery(async () => {
    return await db.ai_submissions
      .where("skill")
      .startsWith("writing")
      .reverse()
      .sortBy("createdAt");
  }) || [];

  const handleEvaluationComplete = async (
    prompt: WritingPrompt,
    essay: string,
    result: AIWritingEvaluationResponse
  ) => {
    setCurrentPrompt(prompt);
    setCurrentEssay(essay);
    setEvaluationResult(result);
    setViewMode("report");

    // 1. Save to Dexie DB ai_submissions
    try {
      const submissionId = `ai_sub_${Date.now()}`;
      const newSubmission: AISubmission = {
        id: submissionId,
        skill: prompt.taskType === "task1" ? "writing_task1" : "writing_task2",
        promptQuestion: prompt.promptText,
        userContent: essay,
        wordCount: essay.split(/\s+/).length,
        scores: {
          tr: result.criteriaScores.tr,
          cc: result.criteriaScores.cc,
          lr: result.criteriaScores.lr,
          gra: result.criteriaScores.gra,
          overall: result.overallScore,
        },
        detailedFeedback: {
          grammarErrors: result.grammarErrors,
          c1Upgrades: result.c1Upgrades.map((u) => ({
            original: u.originalSentence,
            upgraded: u.upgradedSentence,
            explanation: u.explanation,
          })),
          generalComment: result.generalFeedback,
        },
        createdAt: new Date().toISOString(),
      };

      await db.ai_submissions.put(newSubmission);

      // 2. Automatically sync identified grammar errors into error_bank
      for (let i = 0; i < result.grammarErrors.length; i++) {
        const err = result.grammarErrors[i];
        let mappedType: ErrorClassification = "grammar";
        if (
          err.errorType === "vocabulary" ||
          err.errorType === "unnatural_collocation" ||
          err.errorType === "vietnamese_thinking"
        ) {
          mappedType = "vocabulary";
        } else if (err.errorType === "singular_plural") {
          mappedType = "singular_plural";
        }

        const tagPrefix =
          err.errorType === "unnatural_collocation"
            ? "[Gượng từ / Collocation gượng] "
            : err.errorType === "vietnamese_thinking"
            ? "[Tư duy dịch thô / Vietlish] "
            : "";

        const errorItem: ErrorItem = {
          id: `err_w_${Date.now()}_${i}`,
          sourceModule: "writing",
          errorType: mappedType,
          questionContext: `[Writing ${prompt.taskType.toUpperCase()}] - ${prompt.title}`,
          userWrongAnswer: err.original,
          correctAnswer: err.corrected,
          deepExplanation: `${tagPrefix}${err.rule}`,
          mastered: false,
          retryCount: 0,
          createdAt: new Date().toISOString(),
        };
        await db.error_bank.put(errorItem);
      }
    } catch (dbErr) {
      console.error("Failed to auto-save AI submission to Dexie DB:", dbErr);
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">
            <Sparkles className="h-4 w-4" /> Module 3 / 5 • Chấm & Chữa AI
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            AI Writing Diagnostic & Grading Engine
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Chấm bài IELTS Writing Task 1 & Task 2 theo 4 tiêu chí chuẩn Cambridge. Soi lỗi ngữ pháp và nâng cấp câu C1/C2.
          </p>
        </div>

        {/* View Mode Navigation Pills */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("editor")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
              viewMode === "editor"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "border border-border bg-card hover:bg-secondary text-muted-foreground"
            )}
          >
            <PenTool className="h-3.5 w-3.5" />
            <span>Viết Bài Mới</span>
          </button>

          {evaluationResult && (
            <button
              type="button"
              onClick={() => setViewMode("report")}
              className={cn(
                "px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                viewMode === "report"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                  : "border border-border bg-card hover:bg-secondary text-muted-foreground"
              )}
            >
              <Award className="h-3.5 w-3.5" />
              <span>Kết Quả Chấm</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setViewMode("history")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
              viewMode === "history"
                ? "bg-primary text-primary-foreground shadow-md"
                : "border border-border bg-card hover:bg-secondary text-muted-foreground"
            )}
          >
            <History className="h-3.5 w-3.5" />
            <span>Lịch Sử ({pastSubmissions.length})</span>
          </button>
        </div>
      </div>

      {/* Network & Offline Status Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-2xl bg-indigo-500/[0.05] border border-indigo-500/20 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-foreground">
            AI Cloud Grader:
          </span>
          <span className="text-muted-foreground">
            Cần kết nối Internet để gửi bài chấm qua mô hình AI chuẩn khảo thí BC / IDP (bắt lỗi Vietlish & chặn trần GRA 5.5).
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
          <span className="px-2 py-0.5 rounded-md bg-secondary border border-border">
            Bản nháp & Lịch sử: Tự lưu Offline 100% (IndexedDB)
          </span>
        </div>
      </div>

      {/* Mode 1: Editor Workspace */}
      {viewMode === "editor" && (
        <WritingWorkspace onEvaluationComplete={handleEvaluationComplete} />
      )}

      {/* Mode 2: Diagnostic Evaluation Report */}
      {viewMode === "report" && evaluationResult && currentPrompt && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Report Sub-Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 rounded-2xl bg-secondary/60 border border-border/80">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setReportTab("scores")}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                  reportTab === "scores"
                    ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Award className="h-4 w-4 text-indigo-500" />
                <span>4 Tiêu Chí Barem</span>
              </button>

              <button
                type="button"
                onClick={() => setReportTab("grammar")}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                  reportTab === "grammar"
                    ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <ShieldAlert className="h-4 w-4 text-rose-500" />
                <span>Lỗi Ngữ Pháp ({evaluationResult.grammarErrors.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setReportTab("upgrades")}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                  reportTab === "upgrades"
                    ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Zap className="h-4 w-4 text-purple-500" />
                <span>Nâng Cấp C1/C2 ({evaluationResult.c1Upgrades.length})</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setViewMode("editor")}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline px-3 flex items-center gap-1 cursor-pointer"
            >
              <PenTool className="h-3.5 w-3.5" /> Viết bài khác
            </button>
          </div>

          {/* Report Tab Contents */}
          {reportTab === "scores" && (
            <CriteriaScoreCards
              scores={{
                tr: evaluationResult.criteriaScores.tr,
                cc: evaluationResult.criteriaScores.cc,
                lr: evaluationResult.criteriaScores.lr,
                gra: evaluationResult.criteriaScores.gra,
                overall: evaluationResult.overallScore,
              }}
              generalFeedback={evaluationResult.generalFeedback}
              detailedAnalysis={evaluationResult.detailedAnalysis}
            />
          )}

          {reportTab === "grammar" && (
            <GrammarErrorList
              errors={evaluationResult.grammarErrors}
              promptTitle={currentPrompt.title}
            />
          )}

          {reportTab === "upgrades" && (
            <C1UpgradeList
              upgrades={evaluationResult.c1Upgrades.map((u) => ({
                original: u.originalSentence,
                upgraded: u.upgradedSentence,
                explanation: u.explanation,
              }))}
            />
          )}
        </div>
      )}

      {/* Mode 3: Past History Log */}
      {viewMode === "history" && (
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-7 space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-border/80 pb-4">
            <div>
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <History className="h-4 w-4 text-indigo-500" />
                Lịch Sử Chấm Bài IELTS Writing ({pastSubmissions.length} bài)
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Dữ liệu được lưu trữ tự động offline trong IndexedDB.
              </p>
            </div>
          </div>

          {pastSubmissions.length > 0 ? (
            <div className="space-y-3.5">
              {pastSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold uppercase text-[10px] border border-indigo-500/20">
                        {sub.skill}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {new Date(sub.createdAt).toLocaleDateString("vi-VN")} • {sub.wordCount} từ
                      </span>
                    </div>
                    <h4 className="font-bold text-foreground text-sm line-clamp-1">
                      {sub.promptQuestion}
                    </h4>
                    <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                      "{sub.userContent}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-center p-2.5 rounded-xl bg-card border border-border min-w-[70px]">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                        Overall
                      </span>
                      <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
                        {sub.scores.overall.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 space-y-3 text-muted-foreground text-xs">
              <p>Bạn chưa nộp bài viết nào. Hãy bấm "Viết Bài Mới" để bắt đầu bài luyện tập đầu tiên!</p>
              <button
                type="button"
                onClick={() => setViewMode("editor")}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold inline-flex items-center gap-1.5"
              >
                <PenTool className="h-3.5 w-3.5" />
                <span>Bắt đầu viết bài ngay</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
