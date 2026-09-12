/**
 * Theory Gateway Mastery Gate Checker & Auto Error Logging Engine
 * Enforces >= 80% passing threshold before unlocking Module 2 practice drills
 */

import { GatewayQuizQuestion } from "@/data/mockGrammarTheoryData";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem } from "@/types/database";

export interface GatewayEvaluationResult {
  scorePercentage: number;
  isPassed: boolean;
  correctCount: number;
  totalQuestions: number;
  incorrectItems: Array<{
    question: GatewayQuizQuestion;
    userWrongOption: string;
    correctOption: string;
  }>;
}

/**
 * Evaluate Gateway Quiz user answers against official answer keys
 */
export function evaluateGatewayScore(
  answers: Record<number, number>,
  questions: GatewayQuizQuestion[]
): GatewayEvaluationResult {
  let correctCount = 0;
  const incorrectItems: GatewayEvaluationResult["incorrectItems"] = [];

  questions.forEach((q, idx) => {
    const userSelected = answers[idx];
    if (userSelected === q.correctIndex) {
      correctCount++;
    } else {
      incorrectItems.push({
        question: q,
        userWrongOption: userSelected !== undefined ? q.options[userSelected] : "(Chưa chọn đáp án)",
        correctOption: q.options[q.correctIndex],
      });
    }
  });

  const total = questions.length;
  const scorePercentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const isPassed = scorePercentage >= 80;

  return {
    scorePercentage,
    isPassed,
    correctCount,
    totalQuestions: total,
    incorrectItems,
  };
}

/**
 * Persist Theory Gate Results to Dexie DB (practice_logs and error_bank)
 */
export async function saveTheoryGateResults(
  lessonId: string,
  lessonTitle: string,
  evaluation: GatewayEvaluationResult
): Promise<void> {
  try {
    // 1. Log practice attempt
    const logEntry: PracticeLog = {
      id: `pl_theory_${Date.now()}_${lessonId}`,
      type: "grammar",
      materialId: lessonId,
      score: evaluation.scorePercentage,
      timeSpentSeconds: 600,
      accuracyPercentage: evaluation.scorePercentage,
      details: {
        lessonTitle,
        isGatePassed: evaluation.isPassed,
        correctCount: evaluation.correctCount,
        totalQuestions: evaluation.totalQuestions,
      },
      createdAt: new Date().toISOString(),
    };
    await db.practice_logs.add(logEntry);

    // 2. Automatically harvest every wrong answer into Error Bank
    for (const item of evaluation.incorrectItems) {
      const errorRecord: ErrorItem = {
        id: `err_theory_${Date.now()}_${item.question.id}`,
        sourceModule: "grammar",
        errorType: "grammar",
        questionContext: `[Lý Thuyết: ${lessonTitle}] Câu hỏi: ${item.question.question}`,
        userWrongAnswer: item.userWrongOption,
        correctAnswer: item.correctOption,
        deepExplanation: item.question.trapExplanation,
        mastered: false,
        retryCount: 0,
        createdAt: new Date().toISOString(),
      };
      await db.error_bank.add(errorRecord);
    }

    // 3. Update localStorage unlocked cache
    if (evaluation.isPassed && typeof window !== "undefined") {
      const unlockedRaw = localStorage.getItem("ielts_unlocked_theory_lessons") || "[]";
      const unlockedList: string[] = JSON.parse(unlockedRaw);
      if (!unlockedList.includes(lessonId)) {
        unlockedList.push(lessonId);
        localStorage.setItem("ielts_unlocked_theory_lessons", JSON.stringify(unlockedList));
      }
    }
  } catch (err) {
    console.error("Failed to save theory gate results to Dexie DB:", err);
  }
}

/**
 * Check if a theory lesson has passed its gate quiz
 */
export function isLessonGatePassed(lessonId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const unlockedRaw = localStorage.getItem("ielts_unlocked_theory_lessons") || "[]";
    const unlockedList: string[] = JSON.parse(unlockedRaw);
    return unlockedList.includes(lessonId);
  } catch {
    return false;
  }
}
