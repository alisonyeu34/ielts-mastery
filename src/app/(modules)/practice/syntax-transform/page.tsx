"use client";

import React from "react";
import Link from "next/link";
import {
  PenTool,
  ArrowLeft,
  Sparkles,
  Layers,
  ArrowUpDown,
  BookOpen,
} from "lucide-react";
import { useSyntaxTransformer } from "@/hooks/useSyntaxTransformer";
import { SyntaxCategoryTabs } from "@/components/practice/syntax/SyntaxCategoryTabs";
import { SyntaxRuleCard } from "@/components/practice/syntax/SyntaxRuleCard";
import { NominalizationDrill } from "@/components/practice/syntax/NominalizationDrill";
import { InversionDrill } from "@/components/practice/syntax/InversionDrill";
import { CleftSentenceDrill } from "@/components/practice/syntax/CleftSentenceDrill";
import { SyntaxProgressStats } from "@/components/practice/syntax/SyntaxProgressStats";
import { SyntaxFeedbackModal } from "@/components/practice/syntax/SyntaxFeedbackModal";
import { cn } from "@/lib/utils";

export default function SyntaxTransformPracticePage() {
  const {
    activeCategory,
    activeExerciseIndex,
    categoryExercises,
    activeExercise,
    userInputs,
    evaluations,
    isFeedbackModalOpen,
    currentFeedbackItem,
    accuracyRate,
    setActiveCategory,
    setActiveExerciseIndex,
    setUserInput,
    evaluateAttempt,
    setIsFeedbackModalOpen,
  } = useSyntaxTransformer();

  const currentInput = userInputs[activeExercise.id] || "";
  const currentEvaluation = evaluations[activeExercise.id];

  const hasNextExercise = activeExerciseIndex < categoryExercises.length - 1;

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1">
            <Sparkles className="h-4 w-4" /> Module 2 / 5 • Cú Pháp Học Thuật C1/C2 Nâng Cao
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Biến Đổi Cú Pháp Học Thuật (Syntax Transformer)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Làm chủ 3 kỹ thuật nâng tầm văn phong: Danh từ hóa (Nominalization), Đảo ngữ (Inversion) & Câu chẻ (Cleft Sentences).
          </p>
        </div>

        <Link
          href="/practice"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card/60 self-start sm:self-auto shadow-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Về Trung tâm Luyện tập
        </Link>
      </div>

      {/* 1. Category Switcher Tabs */}
      <SyntaxCategoryTabs
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* 2. Rule & Contrast Card */}
      <SyntaxRuleCard category={activeCategory} />

      {/* 3. Category Progress & Exercise Navigator */}
      <SyntaxProgressStats
        exercises={categoryExercises}
        currentIndex={activeExerciseIndex}
        evaluations={evaluations}
        accuracyRate={accuracyRate}
        onSelectIndex={setActiveExerciseIndex}
      />

      {/* 4. Active Interactive Drill Workspace */}
      <div className="pt-1">
        {activeCategory === "nominalization" && (
          <NominalizationDrill
            exercise={activeExercise}
            userInput={currentInput}
            evaluation={currentEvaluation}
            onInputChange={(val) => setUserInput(activeExercise.id, val)}
            onSubmit={evaluateAttempt}
          />
        )}

        {activeCategory === "inversion" && (
          <InversionDrill
            exercise={activeExercise}
            userInput={currentInput}
            evaluation={currentEvaluation}
            onInputChange={(val) => setUserInput(activeExercise.id, val)}
            onSubmit={evaluateAttempt}
          />
        )}

        {activeCategory === "cleft" && (
          <CleftSentenceDrill
            exercise={activeExercise}
            userInput={currentInput}
            evaluation={currentEvaluation}
            onInputChange={(val) => setUserInput(activeExercise.id, val)}
            onSubmit={evaluateAttempt}
          />
        )}
      </div>

      {/* Feedback & Detailed Dissection Modal */}
      <SyntaxFeedbackModal
        isOpen={isFeedbackModalOpen}
        exercise={currentFeedbackItem}
        evaluation={currentFeedbackItem ? evaluations[currentFeedbackItem.id] : undefined}
        userText={currentFeedbackItem ? userInputs[currentFeedbackItem.id] || "" : ""}
        onClose={() => setIsFeedbackModalOpen(false)}
        onNext={() => setActiveExerciseIndex((prev) => prev + 1)}
        hasNext={hasNextExercise}
      />
    </div>
  );
}
