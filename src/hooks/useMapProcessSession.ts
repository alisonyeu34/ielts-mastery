"use client";

import { useState, useMemo, useCallback } from "react";
import {
  MapProcessTaskItem,
  MOCK_MAP_PROCESS_DATA
} from "@/data/mockMapProcessData";
import {
  MapProcessOverallScore,
  auditMapProcessEssay,
  validateSpatialPrepositions,
  analyzeProcessPassiveRatio
} from "@/lib/mapProcessValidator";
import { db } from "@/lib/db";

export function useMapProcessSession(initialTaskId?: string) {
  const [selectedTaskId, setSelectedTaskId] = useState<string>(
    initialTaskId || MOCK_MAP_PROCESS_DATA[0].id
  );

  const currentTask: MapProcessTaskItem = useMemo(() => {
    return (
      MOCK_MAP_PROCESS_DATA.find((t) => t.id === selectedTaskId) ||
      MOCK_MAP_PROCESS_DATA[0]
    );
  }, [selectedTaskId]);

  const [essayText, setEssayText] = useState<string>("");
  const [activeQuadrant, setActiveQuadrant] = useState<string>("All");
  const [activeStage, setActiveStage] = useState<number>(1);
  const [activeTimeFrame, setActiveTimeFrame] = useState<string>(
    currentTask.timeFrames ? currentTask.timeFrames[0] : "1995"
  );
  const [isSplitView, setIsSplitView] = useState<boolean>(true);

  // Evaluation & Modals
  const [overallScore, setOverallScore] = useState<MapProcessOverallScore | null>(null);
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState<boolean>(false);
  const [isPrepositionHelperOpen, setIsPrepositionHelperOpen] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Switch Task
  const handleSelectTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setEssayText("");
    setOverallScore(null);
    setIsSaved(false);
    const task = MOCK_MAP_PROCESS_DATA.find((t) => t.id === taskId) || MOCK_MAP_PROCESS_DATA[0];
    if (task.timeFrames) {
      setActiveTimeFrame(task.timeFrames[0]);
    }
  };

  const handleUpdateEssay = (text: string) => {
    setEssayText(text);
    setIsSaved(false);
  };

  const handleLoadSampleEssay = () => {
    setEssayText(currentTask.band8SampleEssay);
  };

  const handleResetEssay = () => {
    setEssayText("");
    setOverallScore(null);
    setIsSaved(false);
  };

  // Evaluate Essay
  const handleEvaluateEssay = () => {
    const totalItems = currentTask.type === 'map'
      ? (currentTask.mapFeatures?.length || 4)
      : (currentTask.processStages?.length || 5);

    const score = auditMapProcessEssay(currentTask.type, essayText, totalItems);
    setOverallScore(score);
    setIsEvaluationModalOpen(true);
  };

  // Save to Dexie DB
  const saveResultsToDatabase = useCallback(async () => {
    if (!overallScore) return;
    try {
      // 1. Save Practice Log
      await db.practice_logs.put({
        id: `map_process_log_${Date.now()}`,
        type: "map_process",
        title: `Task 1 ${currentTask.type.toUpperCase()}: ${currentTask.title}`,
        score: overallScore.overallBand,
        totalQuestions: currentTask.type === 'map' ? 4 : 5,
        accuracyPercentage: Math.round((overallScore.overallBand / 9) * 100),
        timeSpentSeconds: 1200, // 20 mins Task 1 standard
        durationSeconds: 1200,
        details: {
          taskId: currentTask.id,
          taskType: currentTask.type,
          wordCount: overallScore.wordCount,
          taScore: overallScore.taScore,
          ccScore: overallScore.ccScore,
          lrScore: overallScore.lrScore,
          graScore: overallScore.graScore
        },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      });

      // 2. Add Preposition or Passive Violations to Error Bank
      if (currentTask.type === 'map') {
        const prepAudit = validateSpatialPrepositions(essayText);
        for (const err of prepAudit.errors) {
          await db.error_bank.put({
            id: `err_map_prep_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            sourceModule: "writing",
            errorType: "grammar",
            questionContext: `Task 1 Map: ${currentTask.title}`,
            userWrongAnswer: err.snippet,
            correctAnswer: err.correctForm,
            deepExplanation: err.ruleExplanation,
            mastered: false,
            retryCount: 1,
            createdAt: new Date().toISOString()
          });
        }
      } else {
        const passiveAudit = analyzeProcessPassiveRatio(essayText);
        for (const viol of passiveAudit.activeHumanSubjectViolations) {
          await db.error_bank.put({
            id: `err_process_passive_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            sourceModule: "writing",
            errorType: "grammar",
            questionContext: `Task 1 Process: ${currentTask.title}`,
            userWrongAnswer: viol.snippet,
            correctAnswer: viol.suggestedPassive,
            deepExplanation: `Quy trình sản xuất cơ khí đòi hỏi 100% thể bị động khách quan. Tránh dùng chủ ngữ con người (workers/we/people).`,
            mastered: false,
            retryCount: 1,
            createdAt: new Date().toISOString()
          });
        }
      }

      // 3. Save Vocabulary Cheat Sheet to Vocab Matrix
      for (const vocab of currentTask.vocabularyCheatSheet) {
        await db.vocab_matrix.put({
          id: `vocab_task1_${vocab.term.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
          word: vocab.term,
          ipa: vocab.ipa,
          meaning: vocab.meaningVi,
          definitionEn: vocab.category,
          collocations: [vocab.category],
          originalContext: `Writing Task 1 (${currentTask.type.toUpperCase()}): ${currentTask.title}`,
          category: "c1_academic",
          status: "learning",
          stepInterval: 1,
          nextReviewDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
          repetitionCount: 1,
          lapsesCount: 0,
          stability: 1.0,
          difficulty: 5.0,
          bandLevel: "C1",
          sourceModule: "writing",
          createdAt: new Date().toISOString(),
          lastReviewedAt: new Date().toISOString()
        });
      }

      setIsSaved(true);
    } catch (err) {
      console.error("Failed to save Map/Process session:", err);
    }
  }, [overallScore, currentTask, essayText]);

  return {
    currentTask,
    allTasks: MOCK_MAP_PROCESS_DATA,
    selectedTaskId,
    handleSelectTask,
    essayText,
    handleUpdateEssay,
    handleLoadSampleEssay,
    handleResetEssay,
    activeQuadrant,
    setActiveQuadrant,
    activeStage,
    setActiveStage,
    activeTimeFrame,
    setActiveTimeFrame,
    isSplitView,
    setIsSplitView,
    overallScore,
    isEvaluationModalOpen,
    setIsEvaluationModalOpen,
    isPrepositionHelperOpen,
    setIsPrepositionHelperOpen,
    handleEvaluateEssay,
    isSaved,
    saveResultsToDatabase
  };
}
