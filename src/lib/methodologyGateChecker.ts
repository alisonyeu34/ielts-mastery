/**
 * Reading & Listening Methodology Gateway Mastery Checker
 * Enforces >= 80% passing threshold and automatically logs mistakes into Error Bank
 */

import { MethodologyQuizItem } from "@/data/mockReadingMethodsData";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem } from "@/types/database";

export interface MethodologyEvaluationResult {
  scorePercentage: number;
  isPassed: boolean;
  correctCount: number;
  totalQuestions: number;
  incorrectItems: Array<{
    question: MethodologyQuizItem;
    userWrongOption: string;
    correctOption: string;
  }>;
}

/**
 * Evaluate user answers against answer key
 */
export function evaluateMethodologyScore(
  answers: Record<number, number>,
  questions: MethodologyQuizItem[]
): MethodologyEvaluationResult {
  let correctCount = 0;
  const incorrectItems: MethodologyEvaluationResult["incorrectItems"] = [];

  questions.forEach((q, idx) => {
    const userSelected = answers[idx];
    if (userSelected === q.correctIndex) {
      correctCount++;
    } else {
      incorrectItems.push({
        question: q,
        userWrongOption: userSelected !== undefined ? q.options[userSelected] : "(Chưa chọn)",
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
 * Save methodology gate results to Dexie DB and unlock practice route
 */
export async function saveMethodologyGateResults(
  topicId: string,
  title: string,
  skill: "reading" | "listening",
  evaluation: MethodologyEvaluationResult
): Promise<void> {
  try {
    // 1. Log practice session
    const logEntry: PracticeLog = {
      id: `pl_method_${Date.now()}_${topicId}`,
      type: skill === "reading" ? "reading_splitview" : "listening_splitview",
      materialId: topicId,
      score: evaluation.scorePercentage,
      timeSpentSeconds: 450,
      accuracyPercentage: evaluation.scorePercentage,
      details: {
        methodologyTitle: title,
        skill,
        isGatePassed: evaluation.isPassed,
        correctCount: evaluation.correctCount,
        totalQuestions: evaluation.totalQuestions,
      },
      createdAt: new Date().toISOString(),
    };
    await db.practice_logs.add(logEntry);

    // 2. Add mistakes to Error Bank
    for (const item of evaluation.incorrectItems) {
      const errorRecord: ErrorItem = {
        id: `err_method_${Date.now()}_${item.question.id}`,
        sourceModule: skill === "reading" ? "reading" : "listening",
        errorType: item.question.trapCategory === "grammar" ? "grammar" : "paraphrase_trap",
        questionContext: `[Chiến Lược: ${title}] Q: ${item.question.prompt}`,
        userWrongAnswer: item.userWrongOption,
        correctAnswer: item.correctOption,
        deepExplanation: item.question.trapAnalysis,
        mastered: false,
        retryCount: 0,
        createdAt: new Date().toISOString(),
      };
      await db.error_bank.add(errorRecord);
    }

    // 3. Cache unlock state
    if (evaluation.isPassed && typeof window !== "undefined") {
      const unlockedRaw = localStorage.getItem("ielts_unlocked_methodology_lessons") || "[]";
      const unlockedList: string[] = JSON.parse(unlockedRaw);
      if (!unlockedList.includes(topicId)) {
        unlockedList.push(topicId);
        localStorage.setItem("ielts_unlocked_methodology_lessons", JSON.stringify(unlockedList));
      }
    }
  } catch (err) {
    console.error("Failed to save methodology gate results to Dexie DB:", err);
  }
}

/**
 * Check if a methodology topic is passed
 */
export function isMethodologyGatePassed(topicId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const unlockedRaw = localStorage.getItem("ielts_unlocked_methodology_lessons") || "[]";
    const unlockedList: string[] = JSON.parse(unlockedRaw);
    return unlockedList.includes(topicId);
  } catch {
    return false;
  }
}
