import { db } from "./db";
import {
  UserProgress,
  VocabCard,
  ErrorItem,
  PracticeLog,
  AISubmission,
  PhaseNumber,
} from "@/types/database";

export interface PhaseMilestoneProgress {
  phase: PhaseNumber;
  title: string;
  subtitle: string;
  targetBandRange: string;
  isUnlocked: boolean;
  isCurrent: boolean;
  completionPercentage: number;
  completedLessons: number;
  totalLessons: number;
  mockTestsPassed: number;
  requiredMockTests: number;
  criteriaStatus: {
    theoryCompleted: boolean;
    drillsTargetMet: boolean;
    vocabMilestoneMet: boolean;
    mockTestThresholdMet: boolean;
  };
}

export interface DisciplineTelemetryData {
  streakDays: number;
  currentDay: number; // 1 -> 165
  totalStudyMinutes: number;
  todayStudyMinutes: number;
  dailyTargetMinutes: number; // 140 - 240 mins (2 - 4 hours)
  dailyDisciplinePercentage: number; // (todayStudyMinutes / 200) * 100
  weeklyStudyHours: number;
  activeDaysThisMonth: number;
}

export interface BandTrajectoryPoint {
  dayNumber: number;
  dateLabel: string;
  actualBand: number | null;
  projectedBand: number;
  phaseLabel: string;
}

export interface DashboardSummaryData {
  userProgress: UserProgress | null;
  discipline: DisciplineTelemetryData;
  milestones: PhaseMilestoneProgress[];
  vocabStats: {
    total: number;
    mastered: number;
    dueToday: number;
    learning: number;
  };
  errorBankStats: {
    total: number;
    unmastered: number;
    mastered: number;
  };
  aiGradingStats: {
    totalEvaluations: number;
    latestWritingBand: number | null;
    latestSpeakingBand: number | null;
    averageBand: number;
  };
  trajectoryPoints: BandTrajectoryPoint[];
  estimatedOverallBand: number;
}

/**
 * Fetch comprehensive Dashboard summary metrics from Dexie DB
 */
export async function fetchDashboardSummary(): Promise<DashboardSummaryData> {
  if (typeof window === "undefined") {
    return getFallbackSummary();
  }

  try {
    const user = (await db.user_progress.get("main_user")) || null;
    const allVocab = await db.vocab_matrix.toArray();
    const allErrors = await db.error_bank.toArray();
    const allPractice = await db.practice_logs.toArray();
    const allAiSubs = await db.ai_submissions.toArray();
    const allTheory = await db.theory_lessons.toArray();

    // 1. Discipline & Study Time
    const todayStr = new Date().toISOString().split("T")[0];
    const todayLogs = allPractice.filter((p) => p.createdAt?.startsWith(todayStr));
    const todaySeconds = todayLogs.reduce((acc, curr) => acc + (curr.timeSpentSeconds || 0), 0);
    const todayMinutes = Math.round(todaySeconds / 60);

    const totalSeconds = allPractice.reduce((acc, curr) => acc + (curr.timeSpentSeconds || 0), 0);
    const totalMinutes = Math.round(totalSeconds / 60) + (user?.totalStudyMinutes || 0);

    const streakDays = user?.streakDays || 0;
    const currentDay = user?.currentDay || 1;
    const dailyTargetMinutes = 420; // 7 hours net study (4 shifts x 105 mins)
    const dailyDisciplinePercentage = Math.min(100, Math.round((todayMinutes / dailyTargetMinutes) * 100));

    const discipline: DisciplineTelemetryData = {
      streakDays,
      currentDay,
      totalStudyMinutes: totalMinutes,
      todayStudyMinutes: todayMinutes,
      dailyTargetMinutes,
      dailyDisciplinePercentage,
      weeklyStudyHours: Math.round(((totalMinutes % 1400) / 60) * 10) / 10 || 0,
      activeDaysThisMonth: streakDays,
    };

    // 2. Vocab & Error Bank Aggregates
    const vocabMastered = allVocab.filter((v) => v.status === "mastered" || (v.stability && v.stability >= 14)).length;
    const vocabDueToday = allVocab.filter((v) => v.nextReviewDate && v.nextReviewDate <= todayStr).length;

    const errorsUnmastered = allErrors.filter((e) => !e.mastered).length;
    const errorsMastered = allErrors.filter((e) => e.mastered).length;

    // 3. AI Grading Scores
    const writingSubs = allAiSubs.filter((s) => s.skill.startsWith("writing"));
    const speakingSubs = allAiSubs.filter((s) => s.skill.startsWith("speaking"));

    const latestWritingBand = writingSubs.length > 0 ? writingSubs[writingSubs.length - 1].scores.overall : null;
    const latestSpeakingBand = speakingSubs.length > 0 ? speakingSubs[speakingSubs.length - 1].scores.overall : null;

    const allBands = allAiSubs.map((s) => s.scores.overall);
    const averageBand = allBands.length > 0 ? Math.round((allBands.reduce((a, b) => a + b, 0) / allBands.length) * 10) / 10 : 0;

    // 4. 3-Phase Milestones
    const currentPhase = user?.currentPhase || 1;

    const phase1Lessons = allTheory.filter((t) => t.phase === 1);
    const phase1Completed = phase1Lessons.filter((t) => t.isCompleted).length;
    const phase1Total = phase1Lessons.length || 10;
    const phase1Pct = Math.round((phase1Completed / phase1Total) * 100);

    const phase2Lessons = allTheory.filter((t) => t.phase === 2);
    const phase2Completed = phase2Lessons.filter((t) => t.isCompleted).length;
    const phase2Total = phase2Lessons.length || 14;
    const phase2Pct = Math.round((phase2Completed / phase2Total) * 100);

    const phase3Lessons = allTheory.filter((t) => t.phase === 3);
    const phase3Completed = phase3Lessons.filter((t) => t.isCompleted).length;
    const phase3Total = phase3Lessons.length || 10;
    const phase3Pct = Math.round((phase3Completed / phase3Total) * 100);

    const milestones: PhaseMilestoneProgress[] = [
      {
        phase: 1,
        title: "Giai Đoạn 1: Cứu Ngữ Pháp Nền Tảng (19/9 - 19/10)",
        subtitle: "Ngày 1 - 31 • Lấp 12 Thì, Xóa Dịch Word-by-Word, 800 Từ Nền Tảng & 4 Ca Bằng Nhau",
        targetBandRange: "4.5 -> 5.5",
        isUnlocked: true,
        isCurrent: currentPhase === 1,
        completionPercentage: phase1Pct,
        completedLessons: phase1Completed,
        totalLessons: phase1Total,
        mockTestsPassed: 0,
        requiredMockTests: 1,
        criteriaStatus: {
          theoryCompleted: phase1Pct >= 100,
          drillsTargetMet: false,
          vocabMilestoneMet: false,
          mockTestThresholdMet: false,
        },
      },
      {
        phase: 2,
        title: "Giai Đoạn 2: Chiến Thuật 4 Kỹ Năng (19/10 - 3/12)",
        subtitle: "Ngày 32 - 77 • 14 Dạng Reading, 4 Section Listening, Viết Task 1/2 & Nói",
        targetBandRange: "5.5 -> 6.5",
        isUnlocked: user?.phase2Unlocked || false,
        isCurrent: currentPhase === 2,
        completionPercentage: phase2Pct,
        completedLessons: phase2Completed,
        totalLessons: phase2Total,
        mockTestsPassed: 0,
        requiredMockTests: 3,
        criteriaStatus: {
          theoryCompleted: phase2Pct >= 100,
          drillsTargetMet: false,
          vocabMilestoneMet: false,
          mockTestThresholdMet: false,
        },
      },
      {
        phase: 3,
        title: "Giai Đoạn 3: Luyện Đề & Về Đích 7.5 (4/12 - 1/3)",
        subtitle: "Ngày 78 - 165 • Luyện Đề Cambridge, Chấm Bài Tự Động & Bứt Phá",
        targetBandRange: "6.5 -> 7.5+",
        isUnlocked: user?.phase3Unlocked || false,
        isCurrent: currentPhase === 3,
        completionPercentage: phase3Pct,
        completedLessons: phase3Completed,
        totalLessons: phase3Total,
        mockTestsPassed: 0,
        requiredMockTests: 5,
        criteriaStatus: {
          theoryCompleted: false,
          drillsTargetMet: false,
          vocabMilestoneMet: false,
          mockTestThresholdMet: false,
        },
      },
    ];

    // 5. Trajectory Chart Data
    const trajectoryPoints: BandTrajectoryPoint[] = [
      { dayNumber: 1, dateLabel: "19/9/2026", actualBand: 4.5, projectedBand: 4.5, phaseLabel: "Giai đoạn 1" },
      { dayNumber: 30, dateLabel: "Ngày 30", actualBand: null, projectedBand: 5.0, phaseLabel: "Giai đoạn 1" },
      { dayNumber: 60, dateLabel: "Ngày 60", actualBand: null, projectedBand: 5.8, phaseLabel: "Giai đoạn 1" },
      { dayNumber: 90, dateLabel: "Ngày 90", actualBand: null, projectedBand: 6.3, phaseLabel: "Giai đoạn 2" },
      { dayNumber: 120, dateLabel: "Ngày 120", actualBand: null, projectedBand: 6.8, phaseLabel: "Giai đoạn 2" },
      { dayNumber: 150, dateLabel: "Ngày 150", actualBand: null, projectedBand: 7.2, phaseLabel: "Giai đoạn 3" },
      { dayNumber: 165, dateLabel: "Ngày 165 (Đích)", actualBand: null, projectedBand: 7.5, phaseLabel: "Giai đoạn 3" },
    ];

    const estimatedOverallBand = 4.5;

    return {
      userProgress: user,
      discipline,
      milestones,
      vocabStats: {
        total: allVocab.length,
        mastered: vocabMastered,
        dueToday: vocabDueToday,
        learning: allVocab.length - vocabMastered,
      },
      errorBankStats: {
        total: allErrors.length,
        unmastered: errorsUnmastered,
        mastered: errorsMastered,
      },
      aiGradingStats: {
        totalEvaluations: allAiSubs.length,
        latestWritingBand,
        latestSpeakingBand,
        averageBand,
      },
      trajectoryPoints,
      estimatedOverallBand,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard summary:", error);
    return getFallbackSummary();
  }
}

function getFallbackSummary(): DashboardSummaryData {
  return {
    userProgress: null,
    discipline: {
      streakDays: 0,
      currentDay: 1,
      totalStudyMinutes: 0,
      todayStudyMinutes: 0,
      dailyTargetMinutes: 420,
      dailyDisciplinePercentage: 0,
      weeklyStudyHours: 0,
      activeDaysThisMonth: 0,
    },
    milestones: [
      {
        phase: 1,
        title: "Giai Đoạn 1: Cứu Ngữ Pháp Nền Tảng (19/9 - 19/10)",
        subtitle: "Ngày 1 - 31 • Lấp 12 Thì, Xóa Dịch Word-by-Word, 800 Từ Nền Tảng & 4 Ca Bằng Nhau",
        targetBandRange: "4.5 -> 5.5",
        isUnlocked: true,
        isCurrent: true,
        completionPercentage: 0,
        completedLessons: 0,
        totalLessons: 10,
        mockTestsPassed: 0,
        requiredMockTests: 1,
        criteriaStatus: {
          theoryCompleted: false,
          drillsTargetMet: false,
          vocabMilestoneMet: false,
          mockTestThresholdMet: false,
        },
      },
      {
        phase: 2,
        title: "Giai Đoạn 2: Chiến Thuật 4 Kỹ Năng (19/10 - 3/12)",
        subtitle: "Ngày 32 - 77 • 14 Dạng Reading, 4 Section Listening, Viết Task 1/2 & Nói",
        targetBandRange: "5.5 -> 6.5",
        isUnlocked: false,
        isCurrent: false,
        completionPercentage: 0,
        completedLessons: 0,
        totalLessons: 14,
        mockTestsPassed: 0,
        requiredMockTests: 3,
        criteriaStatus: {
          theoryCompleted: false,
          drillsTargetMet: false,
          vocabMilestoneMet: false,
          mockTestThresholdMet: false,
        },
      },
      {
        phase: 3,
        title: "Giai Đoạn 3: Luyện Đề & Về Đích 7.5 (4/12 - 1/3)",
        subtitle: "Ngày 78 - 165 • Luyện Đề Cambridge, Chấm Bài Tự Động & Bứt Phá",
        targetBandRange: "6.5 -> 7.5+",
        isUnlocked: false,
        isCurrent: false,
        completionPercentage: 0,
        completedLessons: 0,
        totalLessons: 10,
        mockTestsPassed: 0,
        requiredMockTests: 5,
        criteriaStatus: {
          theoryCompleted: false,
          drillsTargetMet: false,
          vocabMilestoneMet: false,
          mockTestThresholdMet: false,
        },
      },
    ],
    vocabStats: {
      total: 0,
      mastered: 0,
      dueToday: 0,
      learning: 0,
    },
    errorBankStats: {
      total: 0,
      unmastered: 0,
      mastered: 0,
    },
    aiGradingStats: {
      totalEvaluations: 0,
      latestWritingBand: null,
      latestSpeakingBand: null,
      averageBand: 0,
    },
    trajectoryPoints: [
      { dayNumber: 1, dateLabel: "19/9/2026", actualBand: 4.5, projectedBand: 4.5, phaseLabel: "Giai đoạn 1" },
      { dayNumber: 30, dateLabel: "Ngày 30", actualBand: null, projectedBand: 5.0, phaseLabel: "Giai đoạn 1" },
      { dayNumber: 60, dateLabel: "Ngày 60", actualBand: null, projectedBand: 5.8, phaseLabel: "Giai đoạn 1" },
      { dayNumber: 90, dateLabel: "Ngày 90", actualBand: null, projectedBand: 6.3, phaseLabel: "Giai đoạn 2" },
      { dayNumber: 120, dateLabel: "Ngày 120", actualBand: null, projectedBand: 6.8, phaseLabel: "Giai đoạn 2" },
      { dayNumber: 150, dateLabel: "Ngày 150", actualBand: null, projectedBand: 7.2, phaseLabel: "Giai đoạn 3" },
      { dayNumber: 165, dateLabel: "Ngày 165 (Đích)", actualBand: null, projectedBand: 7.5, phaseLabel: "Giai đoạn 3" },
    ],
    estimatedOverallBand: 4.5,
  };
}
