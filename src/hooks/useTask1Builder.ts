"use client";

import { useState, useCallback, useMemo } from "react";
import { MOCK_TASK1_PROMPTS, Task1Prompt } from "@/data/mockTask1Data";
import {
  detectDataInOverview,
  countWords,
  verifyPrepositionUsage,
  validateTrendTransformation,
  OverviewValidationResult,
} from "@/lib/task1SyntaxValidator";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem } from "@/types/database";

export function useTask1Builder() {
  const [selectedPromptId, setSelectedPromptId] = useState<string>(
    MOCK_TASK1_PROMPTS[0].id
  );
  const [spotlightActive, setSpotlightActive] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<
    "key_features" | "overview" | "trend_drills" | "full_essay"
  >("key_features");

  const [selectedKeyFeatureIds, setSelectedKeyFeatureIds] = useState<string[]>([]);
  const [isKeyFeaturesEvaluated, setIsKeyFeaturesEvaluated] = useState<boolean>(false);

  // 4-Paragraph drafts
  const [introText, setIntroText] = useState<string>("");
  const [overviewText, setOverviewText] = useState<string>("");
  const [body1Text, setBody1Text] = useState<string>("");
  const [body2Text, setBody2Text] = useState<string>("");

  // Drills
  const [trendAnswers, setTrendAnswers] = useState<Record<string, string>>({});
  const [prepAnswers, setPrepAnswers] = useState<Record<string, string>>({});

  const [showResultModal, setShowResultModal] = useState<boolean>(false);

  const activePrompt = useMemo(() => {
    return (
      MOCK_TASK1_PROMPTS.find((p) => p.id === selectedPromptId) ||
      MOCK_TASK1_PROMPTS[0]
    );
  }, [selectedPromptId]);

  // Real-time Overview Data Integrity Check
  const overviewValidation = useMemo<OverviewValidationResult>(() => {
    return detectDataInOverview(overviewText);
  }, [overviewText]);

  // Word counts
  const introWords = countWords(introText);
  const overviewWords = countWords(overviewText);
  const body1Words = countWords(body1Text);
  const body2Words = countWords(body2Text);
  const totalWords = introWords + overviewWords + body1Words + body2Words;

  // Toggle Key Feature
  const toggleKeyFeature = useCallback((id: string) => {
    setSelectedKeyFeatureIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setIsKeyFeaturesEvaluated(false);
  }, []);

  const evaluateKeyFeatures = useCallback(() => {
    setIsKeyFeaturesEvaluated(true);
  }, []);

  // Pre-fill model answers
  const loadModelEssay = useCallback(() => {
    setIntroText(activePrompt.modelIntroduction);
    setOverviewText(activePrompt.modelOverview);
    setBody1Text(activePrompt.modelBody1);
    setBody2Text(activePrompt.modelBody2);
  }, [activePrompt]);

  // Submit and Save to Dexie DB
  const submitTask1Essay = useCallback(async () => {
    setShowResultModal(true);

    // If Overview contains data, log error to Error Bank
    if (overviewValidation.hasData) {
      db.error_bank.put({
        id: `err_ov_${Date.now()}`,
        sourceModule: "writing",
        errorType: "careless_reading",
        questionContext: `Academic Writing Task 1 Overview: Data Dumping Trap`,
        userWrongAnswer: overviewText.slice(0, 120) + "...",
        correctAnswer: "Đoạn Overview thuần túy chỉ miêu tả xu hướng chung, KHÔNG chứa số liệu/năm cụ thể.",
        deepExplanation: overviewValidation.warningMessage,
        mastered: false,
        retryCount: 0,
        consecutiveSuccesses: 0,
        createdAt: new Date().toISOString(),
      }).catch((e) => console.error("Error saving overview error:", e));
    }

    // Save practice log
    try {
      const estimatedScore =
        totalWords >= 150 && !overviewValidation.hasData ? 7.5 : 6.0;
      const log: PracticeLog = {
        id: `log_task1_${Date.now()}`,
        type: "task1_drill",
        materialId: activePrompt.id,
        score: estimatedScore,
        timeSpentSeconds: 1200, // ~20 mins
        accuracyPercentage: totalWords >= 150 ? 90 : 65,
        createdAt: new Date().toISOString(),
      };
      await db.practice_logs.put(log);
    } catch (err) {
      console.error("Error saving task 1 log:", err);
    }
  }, [activePrompt, overviewText, overviewValidation, totalWords]);

  const resetTask1 = useCallback(() => {
    setSelectedKeyFeatureIds([]);
    setIsKeyFeaturesEvaluated(false);
    setIntroText("");
    setOverviewText("");
    setBody1Text("");
    setBody2Text("");
    setTrendAnswers({});
    setPrepAnswers({});
    setShowResultModal(false);
  }, []);

  return {
    selectedPromptId,
    activePrompt,
    spotlightActive,
    activeTab,
    selectedKeyFeatureIds,
    isKeyFeaturesEvaluated,
    introText,
    overviewText,
    body1Text,
    body2Text,
    trendAnswers,
    prepAnswers,
    showResultModal,
    overviewValidation,
    introWords,
    overviewWords,
    body1Words,
    body2Words,
    totalWords,
    setSelectedPromptId,
    setSpotlightActive,
    setActiveTab,
    toggleKeyFeature,
    evaluateKeyFeatures,
    setIntroText,
    setOverviewText,
    setBody1Text,
    setBody2Text,
    setTrendAnswers,
    setPrepAnswers,
    loadModelEssay,
    submitTask1Essay,
    resetTask1,
    setShowResultModal,
  };
}
