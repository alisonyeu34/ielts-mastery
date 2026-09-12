"use client";

import React from "react";
import Link from "next/link";
import {
  RotateCcw,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  Clock,
  Search,
} from "lucide-react";
import { useThreePassSession } from "@/hooks/useThreePassSession";
import { ThreePassStepper } from "@/components/practice/three-pass/ThreePassStepper";
import { Pass1TimedSession } from "@/components/practice/three-pass/Pass1TimedSession";
import { Pass2UntimedSession } from "@/components/practice/three-pass/Pass2UntimedSession";
import { ThreePassComparisonReport } from "@/components/practice/three-pass/ThreePassComparisonReport";
import { Pass3PostMortemViewer } from "@/components/practice/three-pass/Pass3PostMortemViewer";
import { AutoVocabSyncDrawer } from "@/components/practice/three-pass/AutoVocabSyncDrawer";
import { cn } from "@/lib/utils";

export default function ThreePassPracticePage() {
  const {
    testData,
    currentPass,
    pass1Answers,
    pass1TimeSpent,
    isPass1Completed,
    pass2Answers,
    pass2TimeSpent,
    isPass2Completed,
    pass1Score,
    pass2Score,
    deltaScore,
    questionDiagnoses,
    diagnosisSummary,
    isVocabDrawerOpen,
    syncedVocabIds,
    completePass1,
    completePass2,
    syncVocabToFSRS,
    jumpToPass,
    resetSession,
    setIsVocabDrawerOpen,
  } = useThreePassSession();

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-1">
            <Sparkles className="h-4 w-4" /> Phương Pháp Luận Cốt Lõi • 1 Đề Làm 3 Lần (The 3-Pass Method)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Phân Hệ "1 Đề Làm 3 Lần" (The 3-Pass Method Engine)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Chất lượng hơn số lượng: Vòng 1 Áp lực thời gian ➔ Vòng 2 Đào sâu không giới hạn ➔ Vòng 3 Mổ xẻ giải phẫu & Thu hoạch FSRS.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {isPass2Completed && (
            <button
              type="button"
              onClick={resetSession}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card shadow-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Làm lại từ đầu
            </button>
          )}

          <Link
            href="/practice"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card/60 shadow-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Về Trung tâm Luyện tập
          </Link>
        </div>
      </div>

      {/* 1. Progressive 3-Pass Stepper */}
      <ThreePassStepper
        currentPass={currentPass}
        isPass1Completed={isPass1Completed}
        isPass2Completed={isPass2Completed}
        onSelectPass={jumpToPass}
      />

      {/* 2. Pass Execution Workspaces */}
      {currentPass === 1 && (
        <Pass1TimedSession
          testData={testData}
          onCompletePass1={completePass1}
        />
      )}

      {currentPass === 2 && (
        <Pass2UntimedSession
          testData={testData}
          onCompletePass2={completePass2}
        />
      )}

      {currentPass === 3 && (
        <div className="space-y-6">
          <ThreePassComparisonReport
            pass1Score={pass1Score}
            pass2Score={pass2Score}
            deltaScore={deltaScore}
            pass1TimeSpent={pass1TimeSpent}
            pass2TimeSpent={pass2TimeSpent}
            totalQuestions={testData.questions.length}
            diagnosisSummary={diagnosisSummary}
            onOpenVocabDrawer={() => setIsVocabDrawerOpen(true)}
          />

          <Pass3PostMortemViewer
            testData={testData}
            pass1Answers={pass1Answers}
            pass2Answers={pass2Answers}
            questionDiagnoses={questionDiagnoses}
          />
        </div>
      )}

      {/* 3. Auto Vocab Sync Drawer Modal */}
      <AutoVocabSyncDrawer
        isOpen={isVocabDrawerOpen}
        vocabList={testData.extractableVocab}
        syncedVocabIds={syncedVocabIds}
        onSyncVocab={syncVocabToFSRS}
        onClose={() => setIsVocabDrawerOpen(false)}
      />
    </div>
  );
}
