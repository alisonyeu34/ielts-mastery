"use client";

import { useState, useCallback, useMemo } from "react";
import {
  SyntaxCategory,
  SyntaxExerciseItem,
  MOCK_SYNTAX_EXERCISES,
} from "@/data/mockSyntaxData";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem } from "@/types/database";

export interface ExerciseEvaluation {
  isSubmitted: boolean;
  isCorrect: boolean;
  score: number;
  matchedAnswer: string;
  detectedError?: string;
  feedbackText: string;
}

function cleanSentence(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .replace(/\s+/g, " ");
}

function calculateSimilarity(user: string, target: string): number {
  const uWords = new Set(cleanSentence(user).split(" ").filter(Boolean));
  const tWords = new Set(cleanSentence(target).split(" ").filter(Boolean));
  if (tWords.size === 0) return 0;

  let intersection = 0;
  uWords.forEach((w) => {
    if (tWords.has(w)) intersection++;
  });

  return intersection / tWords.size;
}

export function useSyntaxTransformer() {
  const [activeCategory, setActiveCategory] = useState<SyntaxCategory>("nominalization");
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(0);

  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [evaluations, setEvaluations] = useState<Record<string, ExerciseEvaluation>>({});

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState<boolean>(false);
  const [currentFeedbackItem, setCurrentFeedbackItem] = useState<SyntaxExerciseItem | null>(null);

  const categoryExercises = useMemo(() => {
    return MOCK_SYNTAX_EXERCISES.filter((ex) => ex.category === activeCategory);
  }, [activeCategory]);

  const activeExercise: SyntaxExerciseItem = useMemo(() => {
    return categoryExercises[activeExerciseIndex] || categoryExercises[0];
  }, [categoryExercises, activeExerciseIndex]);

  const setUserInput = useCallback((exerciseId: string, text: string) => {
    setUserInputs((prev) => ({ ...prev, [exerciseId]: text }));
  }, []);

  const evaluateAttempt = useCallback(
    async (exercise: SyntaxExerciseItem) => {
      const userText = userInputs[exercise.id] || "";
      const cleanedUser = cleanSentence(userText);

      let isCorrect = false;
      let matchedAnswer = exercise.targetBand8Sentences[0];
      let detectedError: string | undefined = undefined;
      let feedbackText = "";
      let score = 5.5;

      // 1. Check for common grammatical mistake regex (e.g. Inversion word order error)
      if (exercise.commonMistakeRegex) {
        const regex = new RegExp(exercise.commonMistakeRegex, "i");
        if (regex.test(userText)) {
          detectedError = exercise.commonMistakeExplanation;
        }
      }

      // 2. Check match with target Band 8+ sentence variants
      for (const target of exercise.targetBand8Sentences) {
        const sim = calculateSimilarity(userText, target);
        if (sim >= 0.75 && !detectedError) {
          isCorrect = true;
          matchedAnswer = target;
          score = sim >= 0.9 ? 8.5 : 8.0;
          break;
        }
      }

      if (isCorrect) {
        feedbackText =
          "Xuất sắc! Câu biến đổi đạt chuẩn học thuật Band 8.0+ với cấu trúc ngữ pháp chặt chẽ và mật độ từ vựng cao.";
      } else if (detectedError) {
        feedbackText = `Phát hiện lỗi sai cấu trúc: ${detectedError}`;
      } else {
        feedbackText =
          "Câu viết chưa hoàn toàn chuẩn xác theo cấu trúc mục tiêu. Hãy đối chiếu với các câu mẫu Band 8.5+ bên dưới.";
      }

      const evaluation: ExerciseEvaluation = {
        isSubmitted: true,
        isCorrect,
        score,
        matchedAnswer,
        detectedError,
        feedbackText,
      };

      setEvaluations((prev) => ({ ...prev, [exercise.id]: evaluation }));
      setCurrentFeedbackItem(exercise);
      setIsFeedbackModalOpen(true);

      // Save to error_bank if mistake detected
      if (!isCorrect || detectedError) {
        try {
          const errorItem: ErrorItem = {
            id: `err_syntax_${Date.now()}_${exercise.id}`,
            sourceModule: "writing",
            errorType: "grammar",
            questionContext: `[Cú Pháp C1/C2 - ${exercise.categoryTitleVi}] ${exercise.title}`,
            userWrongAnswer: userText || "(Chưa nhập câu trả lời)",
            correctAnswer: exercise.targetBand8Sentences[0],
            deepExplanation: detectedError || exercise.explanation,
            mastered: false,
            retryCount: 0,
            createdAt: new Date().toISOString(),
          };
          await db.error_bank.put(errorItem);
        } catch (err) {
          console.error("Failed to save syntax error to DB:", err);
        }
      }

      // Save to practice_logs
      try {
        const log: PracticeLog = {
          id: `prac_syntax_${Date.now()}`,
          type: "writing",
          materialId: exercise.id,
          score,
          timeSpentSeconds: 120,
          accuracyPercentage: isCorrect ? 100 : 50,
          createdAt: new Date().toISOString(),
        };
        await db.practice_logs.put(log);
      } catch (logErr) {
        console.error("Failed to save syntax practice log:", logErr);
      }
    },
    [userInputs]
  );

  const switchCategory = useCallback((cat: SyntaxCategory) => {
    setActiveCategory(cat);
    setActiveExerciseIndex(0);
  }, []);

  const totalCompleted = useMemo(() => {
    return Object.values(evaluations).filter((ev) => ev.isSubmitted).length;
  }, [evaluations]);

  const totalCorrect = useMemo(() => {
    return Object.values(evaluations).filter((ev) => ev.isCorrect).length;
  }, [evaluations]);

  const accuracyRate = totalCompleted > 0 ? Math.round((totalCorrect / totalCompleted) * 100) : 0;

  return {
    activeCategory,
    activeExerciseIndex,
    categoryExercises,
    activeExercise,
    userInputs,
    evaluations,
    isFeedbackModalOpen,
    currentFeedbackItem,
    totalCompleted,
    totalCorrect,
    accuracyRate,
    setActiveCategory: switchCategory,
    setActiveExerciseIndex,
    setUserInput,
    evaluateAttempt,
    setIsFeedbackModalOpen,
  };
}
