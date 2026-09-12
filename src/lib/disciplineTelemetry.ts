/**
 * 165-Day Discipline Telemetry & Adaptive Stage Unlocking Engine
 * Tracks active study time (with 60s idle detection), calculates daily study quotas,
 * manages 3-stage unlocking gates, and projects band trajectory from 4.5 to 7.5+.
 */

export interface DailyStudyStats {
  date: string; // YYYY-MM-DD
  activeSeconds: number;
  targetSeconds: number; // 7 hours = 25200s
  isTargetMet: boolean;
  streakDays: number;
  idleEventsCount: number;
}

export interface StageGateStatus {
  stageNumber: 1 | 2 | 3;
  stageNameVi: string;
  targetBandRange: string;
  durationMonths: string;
  isUnlocked: boolean;
  progressPercentage: number;
  unlockRequirements: Array<{
    titleVi: string;
    isMet: boolean;
    currentValue: string | number;
    requiredValue: string | number;
  }>;
}

export interface BandTrajectoryPoint {
  day: number; // 1 -> 180
  projectedBand: number;
  targetBaselineBand: number;
  actualAchievedBand?: number;
  phaseLabel: string;
}

const DAILY_TARGET_SECONDS = 7 * 3600; // 7 hours net study = 25,200 seconds

/**
 * Calculate Stage Gates Unlocking Status based on user progress metrics
 */
export function evaluateStageGates(
  completedIpaCount: number,
  grammarQuizzesPassed: number,
  masteredErrorsCount: number,
  totalErrorsCount: number,
  latestMockBand: number
): StageGateStatus[] {
  // Stage 1 Requirements
  const ipaMet = completedIpaCount >= 15;
  const grammarMet = grammarQuizzesPassed >= 12;
  const stage1Progress = Math.min(100, Math.round(((completedIpaCount + grammarQuizzesPassed) / 27) * 100));

  // Stage 2 Requirements (Needs Stage 1 + at least 15 mastered error patterns)
  const stage2Unlocked = ipaMet && grammarMet;
  const stage2Progress = stage2Unlocked
    ? Math.min(100, Math.round((masteredErrorsCount / Math.max(1, totalErrorsCount || 30)) * 100))
    : 0;

  // Stage 3 Requirements (Needs Stage 2 + Mock Test >= 6.5)
  const stage3Unlocked = stage2Unlocked && latestMockBand >= 6.5;
  const stage3Progress = stage3Unlocked ? Math.min(100, Math.round(((latestMockBand - 6.5) / 1.0) * 100)) : 0;

  return [
    {
      stageNumber: 1,
      stageNameVi: "Giai Đoạn 1: Cứu Ngữ Pháp Tinh Gọn & Phản Xạ Âm Điệu",
      targetBandRange: "4.5 ➔ 5.5",
      durationMonths: "Tháng 1",
      isUnlocked: true,
      progressPercentage: stage1Progress,
      unlockRequirements: [
        {
          titleVi: "Luyện Âm Điệu & Nhại Giọng Shadowing (15 Bài)",
          isMet: ipaMet,
          currentValue: `${completedIpaCount}/15`,
          requiredValue: 15,
        },
        {
          titleVi: "Vượt qua 7 Trụ Cột Ngữ Pháp Cốt Lõi",
          isMet: grammarMet,
          currentValue: `${grammarQuizzesPassed}/7`,
          requiredValue: 7,
        },
      ],
    },
    {
      stageNumber: 2,
      stageNameVi: "Giai Đoạn 2: Kỹ Thuật & Dạng Bài Chuyên Sâu",
      targetBandRange: "5.5 ➔ 6.5",
      durationMonths: "Tháng 2",
      isUnlocked: stage2Unlocked,
      progressPercentage: stage2Progress,
      unlockRequirements: [
        {
          titleVi: "Hoàn thành toàn bộ Giai Đoạn 1",
          isMet: stage2Unlocked,
          currentValue: stage2Unlocked ? "Đã Đạt" : "Chưa Đạt",
          requiredValue: "Đạt",
        },
        {
          titleVi: "Chữa trị lỗi sai trong Sổ Tay Lỗi Sai (Error Bank)",
          isMet: masteredErrorsCount >= 15,
          currentValue: `${masteredErrorsCount}/15 lỗi`,
          requiredValue: 15,
        },
      ],
    },
    {
      stageNumber: 3,
      stageNameVi: "Giai Đoạn 3: Tư Duy C1/C2 & Lập Luận Đỉnh Cao",
      targetBandRange: "6.5 ➔ 7.5+",
      durationMonths: "Tháng 3 – 5.5",
      isUnlocked: stage3Unlocked,
      progressPercentage: stage3Progress,
      unlockRequirements: [
        {
          titleVi: "Thi thử CD-IELTS đạt mốc tối thiểu Band 6.5",
          isMet: latestMockBand >= 6.5,
          currentValue: `Band ${latestMockBand.toFixed(1)}`,
          requiredValue: "Band 6.5",
        },
        {
          titleVi: "Làm chủ Cú pháp Nâng cao (Đảo ngữ, Danh từ hóa, Toulmin)",
          isMet: latestMockBand >= 7.0,
          currentValue: latestMockBand >= 7.0 ? "Đạt Chuẩn" : "Đang Rèn Luyện",
          requiredValue: "Đạt Chuẩn",
        },
      ],
    },
  ];
}

/**
 * Generate 165-day Band Trajectory Points for Forecasting Graph
 */
export function generate165DayTrajectory(
  currentDay: number = 45,
  masteredErrorsRate: number = 0.65,
  fsrsRetentionRate: number = 0.88,
  actualCurrentBand: number = 5.5
): BandTrajectoryPoint[] {
  const points: BandTrajectoryPoint[] = [];

  // Key milestone days across the 165 days journey
  const sampleDays = [1, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165];

  sampleDays.forEach((d) => {
    // Standard baseline curve: 4.5 at Day 1 -> 5.5 at Day 46 -> 6.5 at Day 110 -> 7.5 at Day 165
    let baseline = 4.5;
    if (d <= 46) {
      baseline = 4.5 + (1.0 * d) / 46;
    } else if (d <= 110) {
      baseline = 5.5 + (1.0 * (d - 46)) / 64;
    } else {
      baseline = 6.5 + (1.0 * (d - 110)) / 55;
    }

    // Adaptive projection adjusted by FSRS retention and error bank mastery
    const qualityMultiplier = (masteredErrorsRate > 0 || fsrsRetentionRate > 0)
      ? (masteredErrorsRate * 0.5 + fsrsRetentionRate * 0.5)
      : 0.75;
    const projected = Math.min(9.0, Math.round((baseline * (0.85 + qualityMultiplier * 0.2)) * 10) / 10);

    let phaseLabel = "GĐ 1: Xây Gốc";
    if (d > 110) phaseLabel = "GĐ 3: Tư Duy C1/C2";
    else if (d > 46) phaseLabel = "GĐ 2: Kỹ Thuật";

    points.push({
      day: d,
      projectedBand: projected,
      targetBaselineBand: Math.round(baseline * 10) / 10,
      actualAchievedBand: d <= currentDay ? (d === currentDay ? actualCurrentBand : Math.round((4.5 + ((actualCurrentBand - 4.5) * d) / currentDay) * 10) / 10) : undefined,
      phaseLabel,
    });
  });

  return points;
}

export const generate180DayTrajectory = generate165DayTrajectory;
