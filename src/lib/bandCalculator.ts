export interface SkillScoreRecord {
  rawScore?: number;
  maxScore?: number;
  bandScore: number;
  feedbackSummary?: string;
  criteriaScores?: {
    tr?: number;
    cc?: number;
    lr?: number;
    gra?: number;
    pr?: number;
  };
}

export interface MockExamResult {
  attemptId: string;
  testId: string;
  testTitle: string;
  mode: "full" | "single_skill";
  targetBand: number;
  overallBand: number;
  listening: SkillScoreRecord;
  reading: SkillScoreRecord;
  writing: SkillScoreRecord;
  speaking: SkillScoreRecord;
  bandGap: number; // targetBand - overallBand
  totalTimeSpentSeconds: number;
  completedAt: string;
}

/**
 * Cambridge Academic Reading Raw Score to Band Score Conversion Table (0-40)
 */
export function rawToReadingBand(raw: number): number {
  const score = Math.max(0, Math.min(40, Math.round(raw)));
  if (score >= 39) return 9.0;
  if (score >= 37) return 8.5;
  if (score >= 35) return 8.0;
  if (score >= 33) return 7.5;
  if (score >= 30) return 7.0;
  if (score >= 27) return 6.5;
  if (score >= 23) return 6.0;
  if (score >= 19) return 5.5;
  if (score >= 15) return 5.0;
  if (score >= 13) return 4.5;
  if (score >= 10) return 4.0;
  if (score >= 8) return 3.5;
  if (score >= 6) return 3.0;
  if (score >= 4) return 2.5;
  return 2.0;
}

/**
 * Cambridge Listening Raw Score to Band Score Conversion Table (0-40)
 */
export function rawToListeningBand(raw: number): number {
  const score = Math.max(0, Math.min(40, Math.round(raw)));
  if (score >= 39) return 9.0;
  if (score >= 37) return 8.5;
  if (score >= 35) return 8.0;
  if (score >= 32) return 7.5;
  if (score >= 30) return 7.0;
  if (score >= 26) return 6.5;
  if (score >= 23) return 6.0;
  if (score >= 18) return 5.5;
  if (score >= 16) return 5.0;
  if (score >= 13) return 4.5;
  if (score >= 10) return 4.0;
  if (score >= 8) return 3.5;
  if (score >= 6) return 3.0;
  if (score >= 4) return 2.5;
  return 2.0;
}

/**
 * Official Cambridge Overall Band Score Rounding Algorithm
 * - If average fraction is < 0.25 -> round down to .0 (e.g. 6.125 -> 6.0)
 * - If average fraction is >= 0.25 and < 0.75 -> round to .5 (e.g. 6.25 -> 6.5, 6.375 -> 6.5, 6.625 -> 6.5)
 * - If average fraction is >= 0.75 -> round up to next integer .0 (e.g. 6.75 -> 7.0, 6.875 -> 7.0)
 */
export function calculateOverallBand(
  listening: number,
  reading: number,
  writing: number,
  speaking: number
): number {
  const mean = (listening + reading + writing + speaking) / 4;
  const base = Math.floor(mean);
  const fraction = mean - base;

  if (fraction < 0.25) {
    return base;
  } else if (fraction < 0.75) {
    return base + 0.5;
  } else {
    return base + 1.0;
  }
}
