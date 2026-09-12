"use client";

import { useState, useMemo, useCallback } from "react";
import { MOCK_TOULMIN_DEBATES, ToulminDebateTopic } from "@/data/mockToulminDebatesData";
import {
  ToulminRole,
  validateToulminChain,
  synthesizeToulminToProse,
  ToulminValidationReport
} from "@/lib/toulminStructureValidator";
import { db } from "@/lib/db";

export function useAdvancedToulminSession(initialTopicId?: string) {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    initialTopicId || MOCK_TOULMIN_DEBATES[0].id
  );

  const currentTopic: ToulminDebateTopic = useMemo(() => {
    return (
      MOCK_TOULMIN_DEBATES.find((t) => t.id === selectedTopicId) ||
      MOCK_TOULMIN_DEBATES[0]
    );
  }, [selectedTopicId]);

  const [blocks, setBlocks] = useState<Record<ToulminRole, string>>(
    currentTopic.initialBlocks
  );

  const [isPEELModalOpen, setIsPEELModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Validation report
  const validationReport: ToulminValidationReport = useMemo(() => {
    return validateToulminChain(blocks);
  }, [blocks]);

  // Synthesized prose paragraph
  const synthesizedProse: string = useMemo(() => {
    return synthesizeToulminToProse(blocks);
  }, [blocks]);

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    const topic = MOCK_TOULMIN_DEBATES.find((t) => t.id === topicId) || MOCK_TOULMIN_DEBATES[0];
    setBlocks(topic.initialBlocks);
    setIsSaved(false);
  };

  const handleUpdateBlock = (role: ToulminRole, content: string) => {
    setBlocks((prev) => ({
      ...prev,
      [role]: content
    }));
  };

  const handleInsertConnector = (role: ToulminRole, connector: string) => {
    setBlocks((prev) => {
      const current = prev[role] || "";
      return {
        ...prev,
        [role]: connector + (current ? " " + current : "")
      };
    });
  };

  const handleResetToTemplate = () => {
    setBlocks(currentTopic.initialBlocks);
  };

  const saveResultsToDatabase = useCallback(async () => {
    try {
      // 1. Save Practice Log
      await db.practice_logs.put({
        id: `toulmin_log_${Date.now()}`,
        type: "toulmin_argument",
        title: `Toulmin Dialectical Argument: ${currentTopic.topicTitle}`,
        score: validationReport.taskResponseEstimatedBand,
        totalQuestions: 6,
        accuracyPercentage: validationReport.logicResilienceScore,
        timeSpentSeconds: 120,
        details: {
          topicId: currentTopic.id,
          resilienceScore: validationReport.logicResilienceScore,
          isComplete: validationReport.isComplete,
          warningsCount: validationReport.warnings.length
        },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      });

      // 2. Log Self-Undermining or Bald Assertion fallacies to Error Bank
      if (validationReport.warnings.length > 0) {
        await db.error_bank.put({
          id: `err_toulmin_${currentTopic.id}_${Date.now()}`,
          sourceModule: "writing",
          errorType: "careless_reading",
          questionContext: `Toulmin Argument Task 2: ${currentTopic.topicTitle}`,
          userWrongAnswer: blocks.counterArgument && !blocks.rebuttal
            ? "Counter-Argument without Rebuttal (Self-Undermining)"
            : "Incomplete Toulmin Logic Chain",
          correctAnswer: "Full 6-Component Toulmin Structure with Decisive Rebuttal",
          deepExplanation: validationReport.warnings.join(" "),
          mastered: false,
          retryCount: 1,
          createdAt: new Date().toISOString()
        });
      }

      setIsSaved(true);
    } catch (err) {
      console.error("Failed to save Toulmin session:", err);
    }
  }, [currentTopic, validationReport, blocks]);

  return {
    currentTopic,
    allTopics: MOCK_TOULMIN_DEBATES,
    selectedTopicId,
    handleSelectTopic,
    blocks,
    handleUpdateBlock,
    handleInsertConnector,
    handleResetToTemplate,
    validationReport,
    synthesizedProse,
    isPEELModalOpen,
    setIsPEELModalOpen,
    isDrawerOpen,
    setIsDrawerOpen,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isSaved,
    saveResultsToDatabase
  };
}
