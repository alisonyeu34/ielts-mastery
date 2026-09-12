"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowLeft,
  Sparkles,
  Layers,
  Edit3,
  CheckCircle2,
  Award,
  Zap,
} from "lucide-react";
import {
  GRAMMAR_TOPICS,
  GrammarTopicId,
  MOCK_BUILDER_EXERCISES,
  MOCK_SPOT_ERROR_EXERCISES,
} from "@/data/mockGrammarDrills";
import { GrammarTopicSelector } from "@/components/practice/grammar/GrammarTopicSelector";
import { SentenceBuilderCard } from "@/components/practice/grammar/SentenceBuilderCard";
import { SpotTheErrorCard } from "@/components/practice/grammar/SpotTheErrorCard";
import { GrammarExerciseSummary } from "@/components/practice/grammar/GrammarExerciseSummary";
import { db } from "@/lib/db";
import { PracticeLog } from "@/types/database";
import { cn } from "@/lib/utils";

type PracticeMode = "sentence_builder" | "spot_error";

export default function GrammarPracticePage() {
  const [selectedTopicId, setSelectedTopicId] =
    useState<GrammarTopicId>("complex_sentences");
  const [practiceMode, setPracticeMode] =
    useState<PracticeMode>("sentence_builder");
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Filter exercises by selected topic
  const builderExercises = MOCK_BUILDER_EXERCISES.filter(
    (e) => e.topicId === selectedTopicId
  );
  const spotErrorExercises = MOCK_SPOT_ERROR_EXERCISES.filter(
    (e) => e.topicId === selectedTopicId
  );

  // Fallback to all if specific topic has fewer exercises
  const currentBuilderList =
    builderExercises.length > 0 ? builderExercises : MOCK_BUILDER_EXERCISES;
  const currentSpotList =
    spotErrorExercises.length > 0 ? spotErrorExercises : MOCK_SPOT_ERROR_EXERCISES;

  const currentList =
    practiceMode === "sentence_builder" ? currentBuilderList : currentSpotList;
  const totalExercises = currentList.length;

  const handleTopicChange = (newTopicId: GrammarTopicId) => {
    setSelectedTopicId(newTopicId);
    setCurrentExerciseIndex(0);
    setScore(0);
    setIsCompleted(false);
  };

  const handleModeChange = (newMode: PracticeMode) => {
    setPracticeMode(newMode);
    setCurrentExerciseIndex(0);
    setScore(0);
    setIsCompleted(false);
  };

  const handleNext = async () => {
    if (currentExerciseIndex + 1 >= totalExercises) {
      setIsCompleted(true);

      // Save to practice_logs
      try {
        const newLog: PracticeLog = {
          id: `prac_gram_${Date.now()}`,
          type: "grammar",
          materialId: `grammar_${selectedTopicId}_${practiceMode}`,
          score: score + 1,
          timeSpentSeconds: 180,
          accuracyPercentage: Math.round(((score + 1) / totalExercises) * 100),
          createdAt: new Date().toISOString(),
        };
        await db.practice_logs.put(newLog);
      } catch (err) {
        console.error("Failed to save grammar practice log:", err);
      }
    } else {
      setCurrentExerciseIndex((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentExerciseIndex(0);
    setScore(0);
    setIsCompleted(false);
  };

  const currentTopic =
    GRAMMAR_TOPICS.find((t) => t.id === selectedTopicId) || GRAMMAR_TOPICS[0];

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">
            <Sparkles className="h-4 w-4" /> Module 2 / 5 • Luyện Tập Vi Mô (Giai đoạn 1)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Luyện Cấu Trúc Câu & Sửa Lỗi Ngữ Pháp (Grammar Drills)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Làm chủ 12 thì, Mệnh đề quan hệ, Câu bị động & Câu phức học thuật. Triệt tiêu hoàn toàn các lỗi sai ngữ pháp Band 4.5 - 5.5.
          </p>
        </div>

        <Link
          href="/practice"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground px-3.5 py-2 rounded-xl border border-border bg-card/60 self-start sm:self-auto shadow-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Về Trung tâm Luyện tập
        </Link>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-secondary/60 border border-border/80">
        <button
          type="button"
          onClick={() => handleModeChange("sentence_builder")}
          className={cn(
            "flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
            practiceMode === "sentence_builder"
              ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Layers className="h-4 w-4 text-indigo-500" />
          <span>Ghép Khối Từ Học Thuật (Sentence Builder)</span>
        </button>

        <button
          type="button"
          onClick={() => handleModeChange("spot_error")}
          className={cn(
            "flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
            practiceMode === "spot_error"
              ? "bg-card text-foreground shadow-sm font-extrabold border border-border/60"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Edit3 className="h-4 w-4 text-rose-500" />
          <span>Tìm & Sửa Lỗi Ngữ Pháp (Spot & Fix Error)</span>
        </button>
      </div>

      {/* Grammar Topic Selector */}
      <GrammarTopicSelector
        selectedTopicId={selectedTopicId}
        onSelectTopic={handleTopicChange}
      />

      {/* Main Exercise View */}
      {!isCompleted ? (
        <div className="space-y-6">
          {practiceMode === "sentence_builder" ? (
            <SentenceBuilderCard
              key={`${selectedTopicId}_sb_${currentExerciseIndex}`}
              exercise={currentBuilderList[currentExerciseIndex % currentBuilderList.length]}
              onNext={handleNext}
              isLast={currentExerciseIndex + 1 === totalExercises}
            />
          ) : (
            <SpotTheErrorCard
              key={`${selectedTopicId}_se_${currentExerciseIndex}`}
              exercise={currentSpotList[currentExerciseIndex % currentSpotList.length]}
              onNext={handleNext}
              isLast={currentExerciseIndex + 1 === totalExercises}
            />
          )}
        </div>
      ) : (
        <GrammarExerciseSummary
          score={score || totalExercises}
          total={totalExercises}
          topicName={currentTopic.name}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
