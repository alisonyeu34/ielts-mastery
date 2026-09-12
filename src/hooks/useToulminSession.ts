"use client";

import { useState, useMemo, useCallback } from "react";
import {
  MOCK_TOULMIN_DATA,
  ToulminPromptItem,
  ToulminParts,
  OppositionArgumentItem
} from "@/data/mockToulminData";
import {
  evaluateToulminIntegrity,
  ToulminEvaluationResult
} from "@/lib/toulminLogicChecker";
import { db } from "@/lib/db";

export function useToulminSession(initialTopicId?: string) {
  const topics = MOCK_TOULMIN_DATA;
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    initialTopicId || MOCK_TOULMIN_DATA[0].id
  );

  const currentTopic: ToulminPromptItem = useMemo(() => {
    return (
      MOCK_TOULMIN_DATA.find((t) => t.id === selectedTopicId) ||
      MOCK_TOULMIN_DATA[0]
    );
  }, [selectedTopicId]);

  const [toulminParts, setToulminParts] = useState<ToulminParts>({
    claim: "",
    data: "",
    warrant: "",
    backing: "",
    counterArgument: "",
    rebuttal: ""
  });

  const [activeBlock, setActiveBlock] = useState<keyof ToulminParts | null>("claim");
  const [showAssessmentModal, setShowAssessmentModal] = useState<boolean>(false);

  const evaluation: ToulminEvaluationResult = useMemo(() => {
    return evaluateToulminIntegrity(toulminParts);
  }, [toulminParts]);

  const selectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setToulminParts({
      claim: "",
      data: "",
      warrant: "",
      backing: "",
      counterArgument: "",
      rebuttal: ""
    });
    setActiveBlock("claim");
  };

  const updateBlock = (block: keyof ToulminParts, text: string) => {
    setToulminParts((prev) => ({
      ...prev,
      [block]: text
    }));
  };

  const insertPhrase = (phrase: string) => {
    if (!activeBlock) return;
    setToulminParts((prev) => {
      const current = prev[activeBlock];
      return {
        ...prev,
        [activeBlock]: current ? `${current} ${phrase}` : phrase
      };
    });
  };

  const applyOppositionRebuttal = (opp: OppositionArgumentItem) => {
    setToulminParts((prev) => ({
      ...prev,
      counterArgument: opp.opponentPointEn,
      rebuttal: opp.suggestedRebuttal
    }));
  };

  const loadSampleToulmin = () => {
    setToulminParts(currentTopic.modelToulmin);
  };

  const resetSession = () => {
    setToulminParts({
      claim: "",
      data: "",
      warrant: "",
      backing: "",
      counterArgument: "",
      rebuttal: ""
    });
    setActiveBlock("claim");
  };

  const submitParagraph = () => {
    setShowAssessmentModal(true);
  };

  const saveRebuttalPhrasesToFSRS = useCallback(async () => {
    try {
      await db.practice_logs.put({
        id: `toulmin_writing_log_${Date.now()}`,
        type: "writing_toulmin",
        title: `Toulmin Writing: ${currentTopic.topicTitleVi}`,
        score: evaluation.estimatedBand,
        totalQuestions: 6,
        accuracyPercentage: evaluation.dialecticalScore,
        timeSpentSeconds: 120,
        details: {
          topicId: currentTopic.id,
          totalWordCount: evaluation.totalWordCount,
          dialecticalScore: evaluation.dialecticalScore
        },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      });
    } catch (err) {
      console.error("Failed to save Toulmin writing log:", err);
    }
  }, [currentTopic, evaluation]);

  return {
    topics,
    currentTopic,
    toulminParts,
    activeBlock,
    evaluation,
    showAssessmentModal,
    setActiveBlock,
    selectTopic,
    updateBlock,
    insertPhrase,
    applyOppositionRebuttal,
    loadSampleToulmin,
    submitParagraph,
    resetSession,
    saveRebuttalPhrasesToFSRS,
    setShowAssessmentModal
  };
}
