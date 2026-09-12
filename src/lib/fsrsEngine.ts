export type FSRSRating = "again" | "hard" | "good" | "easy";

export interface FSRSReviewInput {
  stability?: number;
  difficulty?: number;
  stepInterval: number;
  repetitionCount: number;
  lapsesCount: number;
  lastReviewedAt?: string;
}

export interface FSRSReviewOutput {
  nextIntervalDays: number;
  newStability: number;
  newDifficulty: number;
  nextDueDate: string;
  newStatus: "new" | "learning" | "mastered";
  newLapsesCount: number;
  newRepetitionCount: number;
}

/**
 * Compute the probability of recalling a memory item after t elapsed days
 * Retrievability Formula: R(t, S) = (1 + 0.19 * (t / S))^(-0.5) * 100%
 */
export function computeRetrievability(stability: number, elapsedDays: number): number {
  const S = Math.max(0.5, stability);
  const t = Math.max(0, elapsedDays);
  const r = Math.pow(1 + 0.19 * (t / S), -0.5) * 100;
  return Math.max(5, Math.min(100, Math.round(r)));
}

/**
 * Calculate the next review schedule based on FSRS v4 & Cambridge intervals
 */
export function calculateNextReview(
  card: FSRSReviewInput,
  rating: FSRSRating
): FSRSReviewOutput {
  const currentStability = card.stability || 1.0;
  const currentDifficulty = card.difficulty || 5.0;
  const currentReps = card.repetitionCount || 0;
  let currentLapses = card.lapsesCount || 0;

  let nextIntervalDays = 1;
  let newStability = currentStability;
  let newDifficulty = currentDifficulty;
  let newStatus: "new" | "learning" | "mastered" = "learning";

  switch (rating) {
    case "again": {
      // Failed recall -> Reset interval to 1 day, increment lapse
      currentLapses += 1;
      nextIntervalDays = 1;
      newStability = Math.max(0.8, currentStability * 0.4);
      newDifficulty = Math.min(10.0, currentDifficulty + 1.2);
      newStatus = "learning";
      break;
    }
    case "hard": {
      // Hesitant recall -> Moderate interval 3 days
      nextIntervalDays = Math.max(2, Math.round(Math.min(4, currentStability * 1.2)));
      newStability = currentStability * 1.2;
      newDifficulty = Math.min(9.0, currentDifficulty + 0.5);
      newStatus = "learning";
      break;
    }
    case "good": {
      // Confident recall -> Standard Cambridge interval progression (1 -> 3 -> 7 -> 14 -> 30)
      if (card.stepInterval <= 1) {
        nextIntervalDays = 3;
      } else if (card.stepInterval <= 3) {
        nextIntervalDays = 7;
      } else if (card.stepInterval <= 7) {
        nextIntervalDays = 14;
      } else {
        nextIntervalDays = 30;
      }
      newStability = currentStability * 2.1;
      newDifficulty = Math.max(2.0, currentDifficulty - 0.2);
      newStatus = nextIntervalDays >= 14 ? "mastered" : "learning";
      break;
    }
    case "easy": {
      // Instant recall -> Long interval leap (14 to 30 days)
      if (card.stepInterval <= 3) {
        nextIntervalDays = 14;
      } else {
        nextIntervalDays = Math.min(60, Math.round(currentStability * 3.5));
      }
      newStability = currentStability * 3.4;
      newDifficulty = Math.max(1.0, currentDifficulty - 0.8);
      newStatus = "mastered";
      break;
    }
  }

  const nextDueDate = new Date(Date.now() + nextIntervalDays * 86400000).toISOString();

  return {
    nextIntervalDays,
    newStability: Number(newStability.toFixed(2)),
    newDifficulty: Number(newDifficulty.toFixed(2)),
    nextDueDate,
    newStatus,
    newLapsesCount: currentLapses,
    newRepetitionCount: currentReps + 1,
  };
}

/**
 * Get human-readable interval estimates for the 4 FSRS rating buttons
 */
export function getEstimatedIntervalLabels(card: {
  stability?: number;
  stepInterval: number;
}): Record<FSRSRating, string> {
  const currentStep = card.stepInterval || 1;

  let goodDays = 7;
  if (currentStep <= 1) goodDays = 3;
  else if (currentStep <= 3) goodDays = 7;
  else if (currentStep <= 7) goodDays = 14;
  else goodDays = 30;

  const easyDays = currentStep <= 3 ? 14 : Math.min(60, Math.round((card.stability || 2) * 3.5));

  return {
    again: "1 ngày",
    hard: "3 ngày",
    good: `${goodDays} ngày`,
    easy: `${easyDays} ngày`,
  };
}
