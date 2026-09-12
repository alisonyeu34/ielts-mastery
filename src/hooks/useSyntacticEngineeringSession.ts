"use client";

import { useState, useMemo, useCallback } from "react";
import {
  MOCK_SYNTACTIC_DRILLS,
  SyntacticDrillItem
} from "@/data/mockSyntacticDrillsData";
import {
  analyzeSyntacticStructure,
  SyntacticAnalysisReport
} from "@/lib/syntacticParser";
import { db } from "@/lib/db";

export type SyntacticMode = "nominalize" | "invert" | "cleft";

export function useSyntacticEngineeringSession(initialDrillId?: string) {
  const [selectedDrillId, setSelectedDrillId] = useState<string>(
    initialDrillId || MOCK_SYNTACTIC_DRILLS[0].id
  );

  const currentDrill: SyntacticDrillItem = useMemo(() => {
    return (
      MOCK_SYNTACTIC_DRILLS.find((d) => d.id === selectedDrillId) ||
      MOCK_SYNTACTIC_DRILLS[0]
    );
  }, [selectedDrillId]);

  const [activeMode, setActiveMode] = useState<SyntacticMode>("nominalize");
  const [userDraft, setUserDraft] = useState<string>("");
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Real-time syntactic report
  const analysisReport: SyntacticAnalysisReport = useMemo(() => {
    return analyzeSyntacticStructure(userDraft || currentDrill.band6SpokenSentence);
  }, [userDraft, currentDrill]);

  const handleSelectDrill = (drillId: string) => {
    setSelectedDrillId(drillId);
    setUserDraft("");
    setIsSaved(false);
  };

  const handleInsertPhrase = (phrase: string) => {
    setUserDraft((prev) => (prev ? prev + " " + phrase : phrase));
  };

  const insertTier3Model = () => {
    setUserDraft(currentDrill.tier3Band85Sentence);
  };

  const saveEvaluationToDatabase = useCallback(async () => {
    try {
      // 1. Save Practice Log
      await db.practice_logs.put({
        id: `syntax_log_${Date.now()}`,
        type: "syntactic_engineering",
        title: `Syntactic Engineering: ${currentDrill.topic}`,
        score: analysisReport.graBandEstimate,
        totalQuestions: 1,
        accuracyPercentage: analysisReport.informationDensityIndex,
        timeSpentSeconds: 180,
        details: {
          idi: analysisReport.informationDensityIndex,
          densityTier: analysisReport.densityTier,
          hasInversion: analysisReport.inversion.hasInversion,
          hasCleft: analysisReport.cleft.hasCleft,
          nominalWords: analysisReport.nominalizationWords
        },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      });

      // 2. Log Broken Inversion or Low IDI to Error Bank
      if (
        (analysisReport.inversion.hasInversion && !analysisReport.inversion.isSyntacticallyValid) ||
        analysisReport.informationDensityIndex < 40
      ) {
        await db.error_bank.put({
          id: `err_syntax_${currentDrill.id}_${Date.now()}`,
          sourceModule: "writing",
          errorType: "grammar",
          questionContext: currentDrill.band6SpokenSentence,
          userWrongAnswer: userDraft || "(Low IDI / Broken Inversion)",
          correctAnswer: currentDrill.tier3Band85Sentence,
          deepExplanation: analysisReport.recommendations.join(" "),
          mastered: false,
          retryCount: 1,
          createdAt: new Date().toISOString()
        });
      }

      setIsSaved(true);
    } catch (err) {
      console.error("Failed to save syntactic session:", err);
    }
  }, [analysisReport, currentDrill, userDraft]);

  return {
    currentDrill,
    allDrills: MOCK_SYNTACTIC_DRILLS,
    selectedDrillId,
    handleSelectDrill,
    activeMode,
    setActiveMode,
    userDraft,
    setUserDraft,
    handleInsertPhrase,
    insertTier3Model,
    analysisReport,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isSaved,
    saveEvaluationToDatabase
  };
}
