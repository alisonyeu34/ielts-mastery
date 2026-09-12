"use client";

import { useState, useCallback, useMemo } from "react";
import {
  Task1Dataset,
  MOCK_TASK1_LINE_TASK,
  MOCK_TASK1_BAR_TASK,
  KeyFeatureItem,
} from "@/data/mockTask1Datasets";
import { db } from "@/lib/db";
import { ErrorItem, PracticeLog } from "@/types/database";

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

export function detectNumbersInOverview(text: string): boolean {
  // Check for any digits or percentage symbols (e.g. 450, 1990 is acceptable in timeframe, but actual specific figures like 450 TWh, 320, 24% are prohibited)
  // Let's flag any numeric data with units or standalone quantitative numbers
  const numberRegex = /\b\d+(\.\d+)?%?\b/;
  return numberRegex.test(text);
}

export function useTask1Validator() {
  const [activeTaskId, setActiveTaskId] = useState<string>("task1_line_electricity");
  const [keyFeatureSelections, setKeyFeatureSelections] = useState<Record<string, boolean>>({});
  const [isKeyFeaturesSubmitted, setIsKeyFeaturesSubmitted] = useState<boolean>(false);
  const [keyFeaturesResult, setKeyFeaturesResult] = useState<{
    score: number;
    totalKeyFeatures: number;
    falsePositives: number;
  } | null>(null);

  // 4-Paragraph Essay Draft States
  const [intro, setIntro] = useState<string>("");
  const [overview, setOverview] = useState<string>("");
  const [body1, setBody1] = useState<string>("");
  const [body2, setBody2] = useState<string>("");
  const [isEssaySubmitted, setIsEssaySubmitted] = useState<boolean>(false);

  const activeDataset: Task1Dataset = useMemo(() => {
    return activeTaskId === "task1_line_electricity"
      ? MOCK_TASK1_LINE_TASK
      : MOCK_TASK1_BAR_TASK;
  }, [activeTaskId]);

  const introWordCount = useMemo(() => countWords(intro), [intro]);
  const overviewWordCount = useMemo(() => countWords(overview), [overview]);
  const body1WordCount = useMemo(() => countWords(body1), [body1]);
  const body2WordCount = useMemo(() => countWords(body2), [body2]);
  const totalWordCount = introWordCount + overviewWordCount + body1WordCount + body2WordCount;

  const overviewHasNumbers = useMemo(() => {
    return detectNumbersInOverview(overview);
  }, [overview]);

  const toggleKeyFeature = useCallback((id: string) => {
    setKeyFeatureSelections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setIsKeyFeaturesSubmitted(false);
  }, []);

  const evaluateKeyFeatures = useCallback(
    async (dataset: Task1Dataset) => {
      let correctPicks = 0;
      let totalKeyFeatures = 0;
      let falsePositives = 0;

      for (const item of dataset.keyFeaturesList) {
        const isSelected = !!keyFeatureSelections[item.id];
        if (item.isKeyFeature) {
          totalKeyFeatures++;
          if (isSelected) correctPicks++;
        } else {
          if (isSelected) {
            falsePositives++;
            // Log minor feature selection mistake to error bank
            try {
              const errorItem: ErrorItem = {
                id: `err_kf_${Date.now()}_${item.id}`,
                sourceModule: "writing",
                errorType: "careless_reading",
                questionContext: `[Writing Task 1 Key Features - ${dataset.title}] ${item.categoryVi}`,
                userWrongAnswer: item.description,
                correctAnswer: "Không chọn chi tiết phụ này",
                deepExplanation: `[Lỗi Chọn Chi Tiết Phụ] ${item.explanation}`,
                mastered: false,
                retryCount: 0,
                createdAt: new Date().toISOString(),
              };
              await db.error_bank.put(errorItem);
            } catch (err) {
              console.error("Failed to save Key Feature mistake to DB:", err);
            }
          }
        }
      }

      const score = correctPicks;
      setKeyFeaturesResult({
        score,
        totalKeyFeatures,
        falsePositives,
      });
      setIsKeyFeaturesSubmitted(true);
    },
    [keyFeatureSelections]
  );

  const loadSampleEssay = useCallback(() => {
    setIntro(activeDataset.sampleBand8Essay.intro);
    setOverview(activeDataset.sampleBand8Essay.overview);
    setBody1(activeDataset.sampleBand8Essay.body1);
    setBody2(activeDataset.sampleBand8Essay.body2);
  }, [activeDataset]);

  const submitEssay = useCallback(
    async (dataset: Task1Dataset) => {
      setIsEssaySubmitted(true);

      // Check if overview has numbers and log error
      if (overviewHasNumbers) {
        try {
          const errorItem: ErrorItem = {
            id: `err_ov_num_${Date.now()}`,
            sourceModule: "writing",
            errorType: "careless_reading",
            questionContext: `[Writing Task 1 Overview Rule - ${dataset.title}]`,
            userWrongAnswer: overview.slice(0, 100) + "...",
            correctAnswer: "Overview chỉ nêu 2-3 xu hướng bao quát và điểm cực trị, tuyệt đối KHÔNG đưa số liệu cụ thể.",
            deepExplanation:
              "Vi phạm tiêu chí Task Achievement (Band 5.0 penalty): Overview phải là bức tranh toàn cảnh định tính (qualitative summary). Việc đưa số liệu cụ thể vào Overview làm mất đi tính khái quát của đoạn văn.",
            mastered: false,
            retryCount: 0,
            createdAt: new Date().toISOString(),
          };
          await db.error_bank.put(errorItem);
        } catch (err) {
          console.error("Failed to save Overview violation to DB:", err);
        }
      }

      // Save to practice_logs
      try {
        const log: PracticeLog = {
          id: `prac_w1_${Date.now()}`,
          type: "writing",
          materialId: dataset.id,
          score: totalWordCount >= 150 && !overviewHasNumbers ? 8 : 6,
          timeSpentSeconds: 1200,
          accuracyPercentage: Math.min(100, Math.round((totalWordCount / 150) * 100)),
          createdAt: new Date().toISOString(),
        };
        await db.practice_logs.put(log);
      } catch (logErr) {
        console.error("Failed to save Task 1 practice log:", logErr);
      }
    },
    [overview, overviewHasNumbers, totalWordCount]
  );

  const resetAll = useCallback(() => {
    setKeyFeatureSelections({});
    setIsKeyFeaturesSubmitted(false);
    setKeyFeaturesResult(null);
    setIntro("");
    setOverview("");
    setBody1("");
    setBody2("");
    setIsEssaySubmitted(false);
  }, []);

  return {
    activeTaskId,
    activeDataset,
    keyFeatureSelections,
    isKeyFeaturesSubmitted,
    keyFeaturesResult,
    intro,
    overview,
    body1,
    body2,
    introWordCount,
    overviewWordCount,
    body1WordCount,
    body2WordCount,
    totalWordCount,
    overviewHasNumbers,
    isEssaySubmitted,
    setActiveTaskId,
    toggleKeyFeature,
    evaluateKeyFeatures,
    setIntro,
    setOverview,
    setBody1,
    setBody2,
    loadSampleEssay,
    submitEssay,
    resetAll,
  };
}
