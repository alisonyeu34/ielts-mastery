"use client";

import { useState, useMemo, useCallback } from "react";
import {
  MOCK_HEDGING_DRILLS,
  HedgingDrillItem,
  EpistemicCalibrationTier
} from "@/data/mockHedgingDrillsData";
import {
  evaluateEpistemicCalibration,
  HedgingAnalysisReport,
  DogmaticTermMatch
} from "@/lib/hedgingAnalyzer";
import { db } from "@/lib/db";

export function useAcademicHedgingSession(initialDrillId?: string) {
  const [selectedDrillId, setSelectedDrillId] = useState<string>(
    initialDrillId || MOCK_HEDGING_DRILLS[0].id
  );

  const currentDrill: HedgingDrillItem = useMemo(() => {
    return (
      MOCK_HEDGING_DRILLS.find((d) => d.id === selectedDrillId) ||
      MOCK_HEDGING_DRILLS[0]
    );
  }, [selectedDrillId]);

  const [sliderPercentage, setSliderPercentage] = useState<100 | 75 | 50 | 25>(50);
  const [userDraft, setUserDraft] = useState<string>("");
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Active calibration tier from slider
  const activeCalibrationTier: EpistemicCalibrationTier = useMemo(() => {
    return (
      currentDrill.calibrations.find((c) => c.percentage === sliderPercentage) ||
      currentDrill.calibrations[0]
    );
  }, [currentDrill, sliderPercentage]);

  // Real-time analysis report
  const analysisReport: HedgingAnalysisReport = useMemo(() => {
    return evaluateEpistemicCalibration(userDraft || activeCalibrationTier.sentence);
  }, [userDraft, activeCalibrationTier]);

  const handleSelectDrill = (drillId: string) => {
    setSelectedDrillId(drillId);
    setSliderPercentage(50);
    setUserDraft("");
    setIsSaved(false);
  };

  const handleSliderChange = (pct: 100 | 75 | 50 | 25) => {
    setSliderPercentage(pct);
    const tier = currentDrill.calibrations.find((c) => c.percentage === pct);
    if (tier) {
      setUserDraft(tier.sentence);
    }
  };

  const handleInsertPill = (pill: string) => {
    setUserDraft((prev) => (prev ? prev + " " + pill : pill));
  };

  const handleReplaceDogmaticTerm = (match: DogmaticTermMatch, replacement: string) => {
    const text = userDraft || activeCalibrationTier.sentence;
    const before = text.slice(0, match.index);
    const after = text.slice(match.index + match.length);
    setUserDraft(before + replacement + after);
  };

  const saveEvaluationToDatabase = useCallback(async () => {
    try {
      // 1. Save Practice Log
      await db.practice_logs.put({
        id: `hedge_log_${Date.now()}`,
        type: "academic_hedging",
        title: `Academic Hedging: ${currentDrill.topic}`,
        score: analysisReport.taskResponseEstimatedBand,
        totalQuestions: 1,
        accuracyPercentage: analysisReport.epistemicCalibrationScore,
        timeSpentSeconds: 120,
        details: {
          densityPercentage: analysisReport.hedgingDensityPercentage,
          calibrationScore: analysisReport.epistemicCalibrationScore,
          dogmaticCount: analysisReport.dogmaticTerms.length,
          certaintyLevel: analysisReport.certaintyLevel
        },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      });

      // 2. Log Dogmatic Overstatement to Error Bank if unhedged
      if (analysisReport.dogmaticTerms.length > 0) {
        await db.error_bank.put({
          id: `err_hedge_${currentDrill.id}_${Date.now()}`,
          sourceModule: "writing",
          errorType: "careless_reading",
          questionContext: currentDrill.dogmaticSentence,
          userWrongAnswer: userDraft || currentDrill.dogmaticSentence,
          correctAnswer: currentDrill.calibrations.find((c) => c.percentage === 50)?.sentence || "",
          deepExplanation: analysisReport.recommendations.join(" "),
          mastered: false,
          retryCount: 1,
          createdAt: new Date().toISOString()
        });
      }

      setIsSaved(true);
    } catch (err) {
      console.error("Failed to save hedging session:", err);
    }
  }, [analysisReport, currentDrill, userDraft]);

  return {
    currentDrill,
    allDrills: MOCK_HEDGING_DRILLS,
    selectedDrillId,
    handleSelectDrill,
    sliderPercentage,
    handleSliderChange,
    activeCalibrationTier,
    userDraft,
    setUserDraft,
    handleInsertPill,
    handleReplaceDogmaticTerm,
    analysisReport,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isSaved,
    saveEvaluationToDatabase
  };
}
