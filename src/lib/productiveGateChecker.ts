/**
 * Writing & Speaking Productive Blueprints Gateway Mastery Checker
 * Enforces >= 80% passing threshold and logs mistakes into Error Bank
 */

import { WritingGatewayQuizItem } from "@/data/mockWritingBlueprintsData";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem } from "@/types/database";

export interface ProductiveEvaluationResult {
  scorePercentage: number;
  isPassed: boolean;
  correctCount: number;
  totalQuestions: number;
  incorrectItems: Array<{
    question: WritingGatewayQuizItem;
    userWrongOption: string;
    correctOption: string;
  }>;
}

/**
 * Evaluate user answers against answer key
 */
export function evaluateProductiveScore(
  answers: Record<number, number>,
  questions: WritingGatewayQuizItem[]
): ProductiveEvaluationResult {
  let correctCount = 0;
  const incorrectItems: ProductiveEvaluationResult["incorrectItems"] = [];

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
 * Persist productive gate results to Dexie DB and unlock practice modules
 */
export async function saveProductiveGateResults(
  topicId: string,
  title: string,
  skill: "writing" | "speaking",
  evaluation: ProductiveEvaluationResult
): Promise<void> {
  try {
    // 1. Log practice session
    const logEntry: PracticeLog = {
      id: `pl_prod_${Date.now()}_${topicId}`,
      type: skill === "writing" ? "writing" : "speaking",
      materialId: topicId,
      score: evaluation.scorePercentage,
      timeSpentSeconds: 500,
      accuracyPercentage: evaluation.scorePercentage,
      details: {
        blueprintTitle: title,
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
        id: `err_prod_${Date.now()}_${item.question.id}`,
        sourceModule: skill === "writing" ? "writing" : "speaking",
        errorType: item.question.isGrammarRelated ? "grammar" : "careless_reading",
        questionContext: `[Chiến Lược: ${title}] Q: ${item.question.prompt}`,
        userWrongAnswer: item.userWrongOption,
        correctAnswer: item.correctOption,
        deepExplanation: item.question.examinerReasoning,
        mastered: false,
        retryCount: 0,
        createdAt: new Date().toISOString(),
      };
      await db.error_bank.add(errorRecord);
    }

    // 3. Cache unlock state
    if (evaluation.isPassed && typeof window !== "undefined") {
      const unlockedRaw = localStorage.getItem("ielts_unlocked_productive_lessons") || "[]";
      const unlockedList: string[] = JSON.parse(unlockedRaw);
      if (!unlockedList.includes(topicId)) {
        unlockedList.push(topicId);
        localStorage.setItem("ielts_unlocked_productive_lessons", JSON.stringify(unlockedList));
      }
    }
  } catch (err) {
    console.error("Failed to save productive gate results to Dexie DB:", err);
  }
}

/**
 * Check if a productive blueprint topic is passed
 */
export function isProductiveGatePassed(topicId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const unlockedRaw = localStorage.getItem("ielts_unlocked_productive_lessons") || "[]";
    const unlockedList: string[] = JSON.parse(unlockedRaw);
    return unlockedList.includes(topicId);
  } catch {
    return false;
  }
}
