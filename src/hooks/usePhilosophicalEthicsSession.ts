"use client";

import { useState, useMemo, useCallback } from "react";
import {
  MOCK_PHILOSOPHICAL_TOPICS,
  PhilosophicalTopic,
  VeilOfIgnoranceScenario
} from "@/data/mockPhilosophicalEthicsData";
import {
  evaluatePhilosophicalDepth,
  PhilosophicalEvaluationResult,
  MoralPlatitudeMatch
} from "@/lib/philosophicalEthicsValidator";
import { db } from "@/lib/db";

export function usePhilosophicalEthicsSession(initialTopicId?: string) {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    initialTopicId || MOCK_PHILOSOPHICAL_TOPICS[0].id
  );

  const currentTopic: PhilosophicalTopic = useMemo(() => {
    return (
      MOCK_PHILOSOPHICAL_TOPICS.find((t) => t.id === selectedTopicId) ||
      MOCK_PHILOSOPHICAL_TOPICS[0]
    );
  }, [selectedTopicId]);

  const [activeLens, setActiveLens] = useState<"utilitarian" | "deontology" | "socialContract">("utilitarian");
  const [userDraft, setUserDraft] = useState<string>("");
  const [selectedVeilOptionId, setSelectedVeilOptionId] = useState<string | null>(null);
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Real-time evaluation
  const evaluationResult: PhilosophicalEvaluationResult = useMemo(() => {
    return evaluatePhilosophicalDepth(userDraft);
  }, [userDraft]);

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setUserDraft("");
    setSelectedVeilOptionId(null);
    setIsSaved(false);
  };

  const handleInsertLexis = (phrase: string) => {
    setUserDraft((prev) => (prev ? prev + " " + phrase : phrase));
  };

  const handleReplacePlatitude = (match: MoralPlatitudeMatch, replacement: string) => {
    const before = userDraft.slice(0, match.index);
    const after = userDraft.slice(match.index + match.length);
    setUserDraft(before + replacement + after);
  };

  const insertModelSynthesis = () => {
    setUserDraft(
      currentTopic.c2SynthesizedModel.thesisStatement +
        "\n\n" +
        currentTopic.c2SynthesizedModel.bodyParagraph
    );
  };

  const handleSelectVeilOption = (optionId: "option_a" | "option_b" | "option_c") => {
    setSelectedVeilOptionId(optionId);
    const option = currentTopic.veilOfIgnoranceScenario.policyOptions.find(
      (o) => o.id === optionId
    );
    if (option) {
      const philosophicalText = `According to Rawlsian distributive justice and the 'Veil of Ignorance', policy decision '${option.title}' reflects that ${option.rawlsianC2Reflection}`;
      setUserDraft((prev) => (prev ? prev + "\n\n" + philosophicalText : philosophicalText));
    }
  };

  const saveEvaluationToDatabase = useCallback(async () => {
    try {
      // 1. Save Practice Log
      await db.practice_logs.put({
        id: `philo_ethics_${Date.now()}`,
        type: "philosophical_ethics",
        title: `Socio-Philosophical Studio: ${currentTopic.title}`,
        score: evaluationResult.taskResponseBandEstimate,
        totalQuestions: 1,
        accuracyPercentage: evaluationResult.philosophicalDepthScore,
        timeSpentSeconds: 300,
        details: {
          depthScore: evaluationResult.philosophicalDepthScore,
          primaryFramework: evaluationResult.frameworkAnalysis.primaryFramework,
          platitudesCount: evaluationResult.platitudesDetected.length,
          bandEstimate: evaluationResult.taskResponseBandEstimate
        },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      });

      // 2. Log Platitudes or Superficial Reasoning to Error Bank
      if (evaluationResult.platitudesDetected.length > 0 || evaluationResult.philosophicalDepthScore < 50) {
        await db.error_bank.put({
          id: `err_philo_${Date.now()}`,
          sourceModule: "writing",
          errorType: "careless_reading",
          questionContext: currentTopic.prompt.slice(0, 200),
          userWrongAnswer: userDraft.slice(0, 150) || "(Platitude detected)",
          correctAnswer: currentTopic.c2SynthesizedModel.thesisStatement,
          deepExplanation: evaluationResult.recommendations.join(" "),
          mastered: false,
          retryCount: 1,
          createdAt: new Date().toISOString()
        });
      }

      setIsSaved(true);
    } catch (err) {
      console.error("Failed to save philosophical ethics log:", err);
    }
  }, [evaluationResult, currentTopic, userDraft]);

  return {
    currentTopic,
    allTopics: MOCK_PHILOSOPHICAL_TOPICS,
    selectedTopicId,
    handleSelectTopic,
    activeLens,
    setActiveLens,
    userDraft,
    setUserDraft,
    handleInsertLexis,
    handleReplacePlatitude,
    insertModelSynthesis,
    selectedVeilOptionId,
    handleSelectVeilOption,
    evaluationResult,
    isEvaluationModalOpen,
    setIsEvaluationModalOpen,
    isSaved,
    saveEvaluationToDatabase
  };
}
