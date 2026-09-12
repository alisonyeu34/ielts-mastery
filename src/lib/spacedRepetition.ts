import { VocabCard, VocabStatus } from "@/types/database";

export const INTERVAL_STEPS = [1, 3, 7, 14, 30] as const;

export type FSRSRating = "again" | "hard" | "good" | "easy";

export interface NextReviewCalculation {
  nextStep: number;
  nextReviewDate: string;
  status: VocabStatus;
  repetitionCount: number;
  lapsesCount: number;
  stability: number;
  difficulty: number;
}

/**
 * Get date string formatted as YYYY-MM-DD
 */
export function formatDateISO(date: Date): string {
  return date.toISOString().split("T")[0];
}

/**
 * Check if a vocab card is currently due for review
 */
export function isCardDue(card: VocabCard, currentDateStr?: string): boolean {
  const today = currentDateStr || formatDateISO(new Date());
  if (card.status === "new") return true;
  return card.nextReviewDate <= today;
}

/**
 * Format interval days into human-friendly Vietnamese text
 */
export function formatIntervalLabel(days: number): string {
  if (days <= 1) return "1 ngày";
  if (days < 30) return `${days} ngày`;
  return `${Math.round(days / 30)} tháng`;
}

/**
 * Calculate the next interval, due date, and status based on Leitner / FSRS spaced repetition
 */
export function calculateNextReview(
  card: VocabCard,
  rating: FSRSRating
): NextReviewCalculation {
  const currentStep = card.stepInterval || 1;
  let nextStep = 1;
  let newStatus: VocabStatus = card.status;
  let lapsesCount = card.lapsesCount || 0;
  let repetitionCount = (card.repetitionCount || 0) + 1;
  let stability = card.stability || 1.0;
  let difficulty = card.difficulty || 5.0;

  // Find index in INTERVAL_STEPS
  const stepIndex = INTERVAL_STEPS.findIndex((s) => s >= currentStep);
  const validIndex = stepIndex === -1 ? INTERVAL_STEPS.length - 1 : stepIndex;

  switch (rating) {
    case "again":
      // Reset to 1 day, increase lapses count
      nextStep = 1;
      newStatus = "learning";
      lapsesCount += 1;
      stability = Math.max(0.5, stability * 0.5);
      difficulty = Math.min(10, difficulty + 1.0);
      break;

    case "hard":
      // Keep current interval or advance slightly
      nextStep = Math.max(1, Math.round(currentStep * 1.2));
      newStatus = "review";
      stability = stability * 1.1;
      difficulty = Math.min(10, difficulty + 0.3);
      break;

    case "good":
      // Advance to next step in [1, 3, 7, 14, 30]
      if (validIndex < INTERVAL_STEPS.length - 1) {
        nextStep = INTERVAL_STEPS[validIndex + 1];
        newStatus = "review";
      } else {
        nextStep = 30;
        newStatus = "mastered";
      }
      stability = stability * 2.2;
      difficulty = Math.max(1, difficulty - 0.2);
      break;

    case "easy":
      // Leapfrog 2 steps ahead
      const leapIndex = Math.min(INTERVAL_STEPS.length - 1, validIndex + 2);
      nextStep = INTERVAL_STEPS[leapIndex];
      newStatus = nextStep >= 30 ? "mastered" : "review";
      stability = stability * 3.5;
      difficulty = Math.max(1, difficulty - 0.8);
      break;
  }

  // Calculate next review date
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + nextStep);
  const nextReviewDate = formatDateISO(nextDate);

  return {
    nextStep,
    nextReviewDate,
    status: newStatus,
    repetitionCount,
    lapsesCount,
    stability: Number(stability.toFixed(2)),
    difficulty: Number(difficulty.toFixed(2)),
  };
}
