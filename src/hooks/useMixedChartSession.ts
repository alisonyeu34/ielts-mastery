"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { MOCK_MIXED_CHARTS, MixedChartTask } from "@/data/mockMixedChartsData";
import { analyzeMixedChartEssay, MixedChartValidationResult } from "@/lib/mixedChartValidator";
import { db } from "@/lib/db";

export interface MixedChartEssaySections {
  introduction: string;
  overview: string;
  body1: string;
  body2: string;
}

export function useMixedChartSession(initialTaskId?: string) {
  const [selectedTaskId, setSelectedTaskId] = useState<string>(
    initialTaskId || MOCK_MIXED_CHARTS[0].id
  );

  const currentTask: MixedChartTask = useMemo(() => {
    return (
      MOCK_MIXED_CHARTS.find((t) => t.id === selectedTaskId) ||
      MOCK_MIXED_CHARTS[0]
    );
  }, [selectedTaskId]);

  const [sections, setSections] = useState<MixedChartEssaySections>({
    introduction: "",
    overview: "",
    body1: "",
    body2: ""
  });

  const [activeClusterId, setActiveClusterId] = useState<string | null>(null);
  const [selectedChartPoints, setSelectedChartPoints] = useState<{
    chart1: string[];
    chart2: string[];
  }>({ chart1: [], chart2: [] });

  const [timerSeconds, setTimerSeconds] = useState<number>(1200); // 20 mins Task 1
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isEvaluationOpen, setIsEvaluationOpen] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Combine full text
  const fullText = useMemo(() => {
    return [
      sections.introduction.trim(),
      sections.overview.trim(),
      sections.body1.trim(),
      sections.body2.trim()
    ]
      .filter(Boolean)
      .join("\n\n");
  }, [sections]);

  // Real-time analysis
  const validationResult: MixedChartValidationResult = useMemo(() => {
    return analyzeMixedChartEssay(
      fullText,
      currentTask.chart1Keywords,
      currentTask.chart2Keywords
    );
  }, [fullText, currentTask]);

  // Timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => Math.max(prev - 1, 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const handleSelectTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setSections({ introduction: "", overview: "", body1: "", body2: "" });
    setSelectedChartPoints({ chart1: [], chart2: [] });
    setActiveClusterId(null);
    setTimerSeconds(1200);
    setIsTimerRunning(false);
    setIsSaved(false);
  };

  const updateSection = (sectionKey: keyof MixedChartEssaySections, content: string) => {
    setSections((prev) => ({
      ...prev,
      [sectionKey]: content
    }));
    if (!isTimerRunning && content.length > 5) {
      setIsTimerRunning(true);
    }
  };

  const togglePointSelection = (chartId: "chart1" | "chart2", pointLabel: string) => {
    setSelectedChartPoints((prev) => {
      const currentList = prev[chartId];
      const nextList = currentList.includes(pointLabel)
        ? currentList.filter((p) => p !== pointLabel)
        : [...currentList, pointLabel];
      return { ...prev, [chartId]: nextList };
    });
  };

  const insertModelTemplate = () => {
    setSections({
      introduction: currentTask.band85ModelEssay.introduction,
      overview: currentTask.band85ModelEssay.overview,
      body1: currentTask.band85ModelEssay.body1,
      body2: currentTask.band85ModelEssay.body2
    });
  };

  const saveEvaluationToDatabase = useCallback(async () => {
    try {
      // 1. Save Practice Log
      await db.practice_logs.put({
        id: `mixed_chart_${Date.now()}`,
        type: "mixed_charts",
        title: `Task 1 Mixed Chart: ${currentTask.title}`,
        score: validationResult.bandScoreEstimate.overall,
        totalQuestions: 1,
        accuracyPercentage: validationResult.synthesisRatio,
        timeSpentSeconds: 1200 - timerSeconds,
        details: {
          synthesisRatio: validationResult.synthesisRatio,
          dualOverview: validationResult.dualOverview,
          bandScores: validationResult.bandScoreEstimate
        },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      });

      // 2. If isolated dumping or invalid dual overview, record to Error Bank
      if (validationResult.isolatedDumpingDetected || !validationResult.dualOverview.isDualOverviewValid) {
        await db.error_bank.put({
          id: `err_mixed_chart_${Date.now()}`,
          sourceModule: "writing",
          errorType: "careless_reading",
          questionContext: currentTask.prompt.slice(0, 200),
          userWrongAnswer: sections.overview || "Overview missing dual elements",
          correctAnswer: "Ensure at least 40% synthesis sentences and compare both charts directly in the overview.",
          deepExplanation: validationResult.recommendations.join(" "),
          mastered: false,
          retryCount: 1,
          createdAt: new Date().toISOString()
        });
      }

      setIsSaved(true);
    } catch (err) {
      console.error("Failed to save mixed chart session:", err);
    }
  }, [validationResult, timerSeconds, fullText, sections, currentTask]);

  return {
    currentTask,
    allTasks: MOCK_MIXED_CHARTS,
    selectedTaskId,
    handleSelectTask,
    sections,
    updateSection,
    fullText,
    validationResult,
    activeClusterId,
    setActiveClusterId,
    selectedChartPoints,
    togglePointSelection,
    timerSeconds,
    isTimerRunning,
    setIsTimerRunning,
    isEvaluationOpen,
    setIsEvaluationOpen,
    isSaved,
    insertModelTemplate,
    saveEvaluationToDatabase
  };
}
