"use client";

import { useMemo } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, getTodayDateString } from "@/lib/db";
import {
  generateNextBestActions,
  ActionRecommendation,
} from "@/lib/aiCoachRecommender";
import { ErrorClassification, PracticeLog } from "@/types/database";

export interface DashboardAnalyticsData {
  projectedBand: number;
  targetBand: number;
  bandGap: number;
  readinessScore: number;
  currentStreak: number;
  currentRoadmapDay: number;
  currentPhase: number;
  totalStudyHours: number;
  todayStudyMinutes: number;
  dueVocabCount: number;
  totalVocabCount: number;
  masteredVocabCount: number;
  unresolvedErrorsCount: number;
  totalErrorsCount: number;
  masteredErrorsCount: number;
  topErrorType?: string;
  errorDistribution: Array<{
    type: ErrorClassification;
    label: string;
    count: number;
    percentage: number;
    color: string;
  }>;
  skillScores: {
    listening: number;
    reading: number;
    writing: number;
    speaking: number;
  };
  recommendations: ActionRecommendation[];
  recentLogs: PracticeLog[];
}

export function useDashboardAnalytics(): DashboardAnalyticsData {
  const userProgress = useLiveQuery(async () => {
    try {
      return await db.user_progress.get("main_user");
    } catch {
      return null;
    }
  }, []);

  const vocabCards = useLiveQuery(async () => {
    try {
      return await db.vocab_matrix.toArray();
    } catch {
      return [];
    }
  }, []);

  const errorItems = useLiveQuery(async () => {
    try {
      return await db.error_bank.toArray();
    } catch {
      return [];
    }
  }, []);

  const practiceLogs = useLiveQuery(async () => {
    try {
      return await db.practice_logs.orderBy("createdAt").reverse().toArray();
    } catch {
      return [];
    }
  }, []);

  return useMemo(() => {
    const today = getTodayDateString();
    const nowIso = new Date().toISOString();

    // 1. Vocab metrics
    const allVocab = vocabCards || [];
    const totalVocabCount = allVocab.length;
    const dueVocabCount = allVocab.filter((v) => v.nextReviewDate <= nowIso).length;
    const masteredVocabCount = allVocab.filter((v) => v.status === "mastered").length;

    // 2. Error bank metrics
    const allErrors = errorItems || [];
    const totalErrorsCount = allErrors.length;
    const unresolvedErrorsCount = allErrors.filter((e) => !e.mastered).length;
    const masteredErrorsCount = allErrors.filter((e) => e.mastered).length;

    const errorTypeMap: Record<ErrorClassification, number> = {
      grammar: 0,
      pronunciation: 0,
      singular_plural: 0,
      paraphrase_trap: 0,
      careless_reading: 0,
      vocabulary: 0,
    };

    allErrors.forEach((e) => {
      if (errorTypeMap[e.errorType] !== undefined) {
        errorTypeMap[e.errorType]++;
      }
    });

    const errorLabels: Record<ErrorClassification, { label: string; color: string }> = {
      grammar: { label: "Ngữ pháp", color: "bg-rose-500" },
      pronunciation: { label: "Phát âm", color: "bg-purple-500" },
      singular_plural: { label: "Chính tả / Số ít-nhiều", color: "bg-amber-500" },
      paraphrase_trap: { label: "Bẫy Paraphrase", color: "bg-blue-500" },
      careless_reading: { label: "Đọc ẩu / Không chú ý", color: "bg-red-500" },
      vocabulary: { label: "Từ vựng", color: "bg-emerald-500" },
    };

    const errorDistribution = (Object.keys(errorTypeMap) as ErrorClassification[]).map((type) => {
      const count = errorTypeMap[type];
      const percentage = totalErrorsCount > 0 ? Math.round((count / totalErrorsCount) * 100) : 0;
      return {
        type,
        label: errorLabels[type].label,
        count,
        percentage,
        color: errorLabels[type].color,
      };
    });

    // Top error type
    const sortedErrors = [...errorDistribution].sort((a, b) => b.count - a.count);
    const topErrorType = sortedErrors[0]?.count > 0 ? sortedErrors[0].type : undefined;

    // 3. Practice logs & Study time
    const allLogs = practiceLogs || [];
    let totalSeconds = 0;
    let todaySeconds = 0;

    allLogs.forEach((log) => {
      totalSeconds += log.timeSpentSeconds || 0;
      if (log.createdAt.startsWith(today)) {
        todaySeconds += log.timeSpentSeconds || 0;
      }
    });

    // Total study seconds from logs
    const totalStudyHours = Math.round((totalSeconds / 3600) * 10) / 10;
    const todayStudyMinutes = Math.round(todaySeconds / 60);

    // 4. Projected Band & Skills
    const mockTests = allLogs.filter((l) => l.type === "mock_test");
    const latestMock = mockTests[0];

    const projectedBand = latestMock ? latestMock.score : 4.0;
    const targetBand = userProgress?.targetBand || 7.5;
    const bandGap = Math.max(0, targetBand - projectedBand);

    const skillScores = {
      listening: latestMock ? projectedBand : 4.0,
      reading: latestMock ? projectedBand : 4.0,
      writing: latestMock ? projectedBand : 4.0,
      speaking: latestMock ? projectedBand : 4.0,
    };

    // 5. Readiness Index Score %
    const currentRoadmapDay = userProgress?.currentDay || 1;
    const currentPhase = userProgress?.currentPhase || 1;
    const currentStreak = userProgress?.streakDays || 0;

    const roadmapWeight = Math.min(100, (currentRoadmapDay / 180) * 100) * 0.3;
    const vocabWeight =
      totalVocabCount > 0 ? (masteredVocabCount / totalVocabCount) * 100 * 0.2 : 0;
    const errorWeight =
      totalErrorsCount > 0 ? (masteredErrorsCount / totalErrorsCount) * 100 * 0.25 : 0;
    const mockWeight = (projectedBand / targetBand) * 100 * 0.25;

    const readinessScore = Math.min(
      100,
      Math.max(0, Math.round(roadmapWeight + vocabWeight + errorWeight + mockWeight))
    );

    // 6. Generate Recommendations
    const recommendations = generateNextBestActions({
      dueVocabCount,
      totalVocabCount,
      unresolvedErrorsCount,
      topErrorType,
      currentRoadmapDay,
      mockTestCount: mockTests.length,
      recentMockBand: projectedBand,
    });

    return {
      projectedBand,
      targetBand,
      bandGap,
      readinessScore,
      currentStreak,
      currentRoadmapDay,
      currentPhase,
      totalStudyHours,
      todayStudyMinutes,
      dueVocabCount,
      totalVocabCount,
      masteredVocabCount,
      unresolvedErrorsCount,
      totalErrorsCount,
      masteredErrorsCount,
      topErrorType,
      errorDistribution,
      skillScores,
      recommendations,
      recentLogs: allLogs.slice(0, 5),
    };
  }, [userProgress, vocabCards, errorItems, practiceLogs]);
}
