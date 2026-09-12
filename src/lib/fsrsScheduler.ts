/**
 * FSRS (Free Spaced Repetition Scheduler) Algorithm Engine v4/v5
 * Models human memory decay based on Retrievability (R), Stability (S), and Difficulty (D)
 */

export type FSRSRating = 1 | 2 | 3 | 4; // 1: Again, 2: Hard, 3: Good, 4: Easy
export type FSRSState = "new" | "learning" | "review" | "relearning";

export interface FSRSCardData {
  due: string; // ISO String (YYYY-MM-DD)
  stability: number; // S (days required for R to drop to 90%)
  difficulty: number; // D (1.0 to 10.0)
  elapsedDays: number;
  scheduledDays: number;
  reps: number;
  lapses: number;
  state: FSRSState;
  lastReview?: string;
}

export interface FSRSReviewOutput {
  nextDue: string; // ISO date YYYY-MM-DD
  newStability: number;
  newDifficulty: number;
  newState: FSRSState;
  scheduledDays: number;
  retrievability: number;
  intervalDescription: string;
}

const DEFAULT_WEIGHTS = [
  0.4, 0.6, 2.4, 5.8,
  4.93, 0.94,
  0.86, 0.01, 1.49,
  0.14, 0.94,
  2.18, 0.05, 0.34, 1.26,
  0.29, 2.61,
];

const REQUEST_RETENTION = 0.9;
const DECAY = -0.5;
const FACTOR = Math.pow(REQUEST_RETENTION, 1 / DECAY) - 1;

export function calculateRetrievability(stability: number, elapsedDays: number): number {
  if (stability <= 0) return 0;
  if (elapsedDays <= 0) return 1.0;
  const r = Math.pow(1 + (FACTOR * elapsedDays) / stability, DECAY);
  return Math.min(1.0, Math.max(0.0, Math.round(r * 1000) / 1000));
}

export function calculateIntervalDays(stability: number, targetRetention: number = REQUEST_RETENTION): number {
  if (stability <= 0) return 1;
  const interval = (stability / FACTOR) * (Math.pow(targetRetention, 1 / DECAY) - 1);
  return Math.max(1, Math.round(interval));
}

export function clampDifficulty(d: number): number {
  return Math.min(10.0, Math.max(1.0, Math.round(d * 100) / 100));
}

export function calculateNextFSRSState(
  card: {
    stability?: number;
    difficulty?: number;
    reps?: number;
    lapses?: number;
    state?: FSRSState;
    lastReview?: string;
  },
  rating: FSRSRating,
  reviewTime: Date = new Date()
): FSRSReviewOutput {
  const currentStability = card.stability && card.stability > 0 ? card.stability : 0;
  const currentDifficulty = card.difficulty && card.difficulty > 0 ? card.difficulty : 5.0;
  const currentState = card.state || (card.reps && card.reps > 0 ? "review" : "new");

  let elapsedDays = 0;
  if (card.lastReview) {
    const lastDate = new Date(card.lastReview);
    const diffMs = reviewTime.getTime() - lastDate.getTime();
    elapsedDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  }

  const retrievability = calculateRetrievability(currentStability, elapsedDays);

  let newStability: number;
  let newDifficulty: number;
  let newState: FSRSState;
  let scheduledDays: number;

  if (currentState === "new" || currentStability === 0) {
    newStability = DEFAULT_WEIGHTS[rating - 1];
    newDifficulty = clampDifficulty(DEFAULT_WEIGHTS[4] - (rating - 3) * DEFAULT_WEIGHTS[5]);

    if (rating === 1) {
      newState = "learning";
      scheduledDays = 1;
    } else if (rating === 2) {
      newState = "learning";
      scheduledDays = 1;
    } else if (rating === 3) {
      newState = "review";
      scheduledDays = 3;
    } else {
      newState = "review";
      scheduledDays = 7;
    }
  } else {
    const dDiff = currentDifficulty - DEFAULT_WEIGHTS[7] * (rating - 3);
    newDifficulty = clampDifficulty(DEFAULT_WEIGHTS[6] * DEFAULT_WEIGHTS[4] + (1 - DEFAULT_WEIGHTS[6]) * dDiff);

    if (rating === 1) {
      newState = "relearning";
      newStability = Math.max(
        0.5,
        DEFAULT_WEIGHTS[11] *
          Math.pow(currentDifficulty, -DEFAULT_WEIGHTS[12]) *
          (Math.pow(currentStability + 1, DEFAULT_WEIGHTS[13]) - 1) *
          Math.exp(DEFAULT_WEIGHTS[14] * (1 - retrievability))
      );
      scheduledDays = 1;
    } else {
      newState = "review";
      const hardPenalty = rating === 2 ? DEFAULT_WEIGHTS[15] : 1.0;
      const easyBonus = rating === 4 ? DEFAULT_WEIGHTS[16] : 1.0;

      const stabilityIncrement =
        Math.exp(DEFAULT_WEIGHTS[8]) *
        (11 - newDifficulty) *
        Math.pow(currentStability, -DEFAULT_WEIGHTS[9]) *
        (Math.exp(DEFAULT_WEIGHTS[10] * (1 - retrievability)) - 1) *
        hardPenalty *
        easyBonus;

      newStability = Math.max(currentStability * 1.1, currentStability * (1 + Math.max(0.1, stabilityIncrement)));

      if (rating === 2) {
        scheduledDays = Math.max(1, Math.round(calculateIntervalDays(newStability) * 0.7));
      } else if (rating === 3) {
        scheduledDays = Math.max(2, calculateIntervalDays(newStability));
      } else {
        scheduledDays = Math.max(4, Math.round(calculateIntervalDays(newStability) * 1.3));
      }
    }
  }

  const nextDueDate = new Date(reviewTime);
  nextDueDate.setDate(nextDueDate.getDate() + scheduledDays);

  let intervalDescription = scheduledDays + " ngày";
  if (scheduledDays === 1) intervalDescription = "1 ngày (Ngày mai)";
  else if (scheduledDays < 7) intervalDescription = scheduledDays + " ngày tới";
  else if (scheduledDays < 30) intervalDescription = Math.round(scheduledDays / 7) + " tuần tới";
  else intervalDescription = Math.round(scheduledDays / 30) + " tháng tới";

  return {
    nextDue: nextDueDate.toISOString().split("T")[0],
    newStability: Math.round(newStability * 100) / 100,
    newDifficulty: Math.round(newDifficulty * 100) / 100,
    newState,
    scheduledDays,
    retrievability,
    intervalDescription,
  };
}

export function createInitialFSRSRecord(initialStability: number = 1.0, initialDifficulty: number = 5.0): FSRSCardData {
  const today = new Date().toISOString().split("T")[0];
  return {
    due: today,
    stability: initialStability,
    difficulty: initialDifficulty,
    elapsedDays: 0,
    scheduledDays: 1,
    reps: 0,
    lapses: 0,
    state: "new",
  };
}
