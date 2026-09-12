"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  MOCK_GRAMMAR_THEORY_LESSONS,
  CoreGrammarTheoryLesson,
} from "@/data/mockGrammarTheoryData";
import { useTheoryLessonSession } from "@/hooks/useTheoryLessonSession";
import { TheoryStepNavigator } from "@/components/theory/TheoryStepNavigator";
import { ConceptPrinciplesSection } from "@/components/theory/ConceptPrinciplesSection";
import { ExaminerTrapSection } from "@/components/theory/ExaminerTrapSection";
import { Band85DissectionSection } from "@/components/theory/Band85DissectionSection";
import { GatewayQuizEngine } from "@/components/theory/GatewayQuizEngine";
import { TheoryGateUnlockModal } from "@/components/theory/TheoryGateUnlockModal";
import { TheoryNotesDrawer } from "@/components/theory/TheoryNotesDrawer";
import {
  ArrowLeft,
  ArrowRight,
  StickyNote,
  BookOpen,
  Clock,
  Sparkles,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ALIAS_MAP: Record<string, string> = {
  "present-simple-foundation": "day1-present-simple-to-be",
  "past-simple-foundation": "day5-past-simple-verbs",
  "present-perfect-foundation": "day6-present-perfect",
  "passive-voice-foundation": "day8-passive-voice",
  "comparisons-foundation": "day9-comparatives",
  "relative-clauses-basic": "day11-relative-clauses-who-which",
  "conditionals-type1-2": "day13-first-conditional",
};

export default function InteractiveTheoryLessonDetailPage() {
  const params = useParams();
  const rawId = (params?.id as string) || (params?.lessonId as string) || "day1-present-simple-to-be";
  const resolvedId = ALIAS_MAP[rawId] || rawId;

  const lesson: CoreGrammarTheoryLesson =
    MOCK_GRAMMAR_THEORY_LESSONS.find((l) => l.id === resolvedId) ||
    MOCK_GRAMMAR_THEORY_LESSONS[0];

  const currentIndex = MOCK_GRAMMAR_THEORY_LESSONS.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? MOCK_GRAMMAR_THEORY_LESSONS[currentIndex - 1] : null;
  const nextLesson =
    currentIndex >= 0 && currentIndex < MOCK_GRAMMAR_THEORY_LESSONS.length - 1
      ? MOCK_GRAMMAR_THEORY_LESSONS[currentIndex + 1]
      : null;

  const {
    currentStep,
    setCurrentStep,
    quizAnswers,
    selectQuizOption,
    isQuizSubmitted,
    evaluation,
    isAlreadyPassed,
    isUnlockModalOpen,
    setIsUnlockModalOpen,
    submitQuiz,
    retakeQuiz,
    notes,
    addNote,
    removeNote,
  } = useTheoryLessonSession(lesson);

  const [isNotesDrawerOpen, setIsNotesDrawerOpen] = useState(false);

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto select-none">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/theory"
            className="p-2.5 rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground border border-border cursor-pointer transition-all"
            title="Quay lại danh mục lý thuyết"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 uppercase">
                {lesson.targetBand}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {lesson.estimatedMinutes} Phút đọc
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-foreground mt-0.5">
              {lesson.title}
            </h1>
          </div>
        </div>

        {/* Inline Notes Trigger Button */}
        <button
          type="button"
          onClick={() => setIsNotesDrawerOpen(true)}
          className="px-3.5 py-2 rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-bold border border-border flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <StickyNote className="h-4 w-4 text-amber-500" />
          <span>Ghi Chú ({notes.length})</span>
        </button>
      </div>

      {/* 1. Step Progress Navigator */}
      <TheoryStepNavigator
        currentStep={currentStep}
        onSelectStep={setCurrentStep}
        isGatePassed={isAlreadyPassed}
      />

      {/* 2. Step 1: Concept & First-Principles */}
      {currentStep === 1 && (
        <ConceptPrinciplesSection
          lesson={lesson}
          onProceedToStep2={() => setCurrentStep(2)}
        />
      )}

      {/* 3. Step 2: Examiner Trap Exposure */}
      {currentStep === 2 && (
        <ExaminerTrapSection
          lesson={lesson}
          onProceedToStep3={() => setCurrentStep(3)}
        />
      )}

      {/* 4. Step 3: High-Band 8.5+ Dissection */}
      {currentStep === 3 && (
        <Band85DissectionSection
          lesson={lesson}
          onProceedToQuiz={() => setCurrentStep(4)}
        />
      )}

      {/* 5. Step 4: Gateway Mastery Quiz */}
      {currentStep === 4 && (
        <GatewayQuizEngine
          questions={lesson.gatewayQuestions}
          userAnswers={quizAnswers}
          onSelectOption={selectQuizOption}
          isSubmitted={isQuizSubmitted}
          evaluation={evaluation}
          onSubmit={submitQuiz}
          onRetake={retakeQuiz}
          onOpenUnlockModal={() => setIsUnlockModalOpen(true)}
        />
      )}

      {/* Gate Unlock Modal */}
      <TheoryGateUnlockModal
        isOpen={isUnlockModalOpen}
        onClose={() => setIsUnlockModalOpen(false)}
        lessonTitle={lesson.title}
        scorePercentage={evaluation?.scorePercentage || 100}
        unlockedModule={lesson.unlockedPracticeModule}
      />

      {/* 6. Lesson Footer Navigation (Prev / Next Lesson) */}
      <div className="pt-6 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevLesson ? (
          <Link
            href={`/theory/${prevLesson.id}`}
            className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground border border-border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <div className="text-left">
              <span className="text-[10px] text-muted-foreground block uppercase font-mono">Bài trước</span>
              <span className="line-clamp-1">{prevLesson.title}</span>
            </div>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        <Link
          href="/theory"
          className="px-4 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          Danh mục tất cả bài học
        </Link>

        {nextLesson ? (
          <Link
            href={`/theory/${nextLesson.id}`}
            className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold flex items-center justify-between sm:justify-end gap-2 transition-all cursor-pointer shadow-sm"
          >
            <div className="text-right">
              <span className="text-[10px] opacity-80 block uppercase font-mono">Bài tiếp theo</span>
              <span className="line-clamp-1">{nextLesson.title}</span>
            </div>
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>

      {/* Notes Drawer */}
      <TheoryNotesDrawer
        isOpen={isNotesDrawerOpen}
        onClose={() => setIsNotesDrawerOpen(false)}
        notes={notes}
        onAddNote={addNote}
        onRemoveNote={removeNote}
        currentStep={currentStep}
      />
    </div>
  );
}
