"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { fetchDashboardSummary, DashboardSummaryData } from "@/lib/dashboardAnalytics";

export function useDashboardTelemetry(): DashboardSummaryData {
  const data = useLiveQuery(async () => {
    return await fetchDashboardSummary();
  }, []) || null;

  if (!data) {
    return {
      userProgress: null,
      discipline: {
        streakDays: 0,
        currentDay: 1,
        totalStudyMinutes: 0,
        todayStudyMinutes: 0,
        dailyTargetMinutes: 200,
        dailyDisciplinePercentage: 0,
        weeklyStudyHours: 0,
        activeDaysThisMonth: 0,
      },
      milestones: [
        {
          phase: 1,
          title: "Giai Đoạn 1: Cứu Ngữ Pháp Nền Tảng (16/9 - 16/10)",
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
          title: "Giai Đoạn 2: Chiến Thuật 4 Kỹ Năng (16/10 - 30/11)",
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
          title: "Giai Đoạn 3: Luyện Đề & Về Đích 7.5 (1/12 - 26/2)",
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
        { dayNumber: 1, dateLabel: "16/9/2026", actualBand: 4.5, projectedBand: 4.5, phaseLabel: "Giai đoạn 1" },
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

  return data;
}
