"use client";

import { useState, useCallback, useMemo } from "react";
import {
  MOCK_ADVANCED_SYNTAX_DATA,
  SyntaxExerciseItem,
  SyntaxModeType,
  ACADEMIC_WORD_FAMILIES,
} from "@/data/mockAdvancedSyntaxData";
import {
  checkSentenceMatch,
  SyntaxValidationResult,
  calculateSyntacticDensity,
} from "@/lib/syntaxTransformerValidator";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem, VocabCard } from "@/types/database";

export function useAdvancedSyntaxSession() {
  const allExercises = MOCK_ADVANCED_SYNTAX_DATA;

  const [activeMode, setActiveMode] = useState<SyntaxModeType>("nominalization");
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, SyntaxValidationResult>>({});

  // Modals & Drawers
  const [showCheatSheetModal, setShowCheatSheetModal] = useState<boolean>(false);
  const [showComparisonDrawer, setShowComparisonDrawer] = useState<boolean>(false);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);

  // Filtered exercises by mode (6 items each)
  const filteredExercises = useMemo(() => {
    return allExercises.filter((item) => item.syntaxType === activeMode);
  }, [allExercises, activeMode]);

  const currentExercise = useMemo<SyntaxExerciseItem>(() => {
    return (
      filteredExercises[currentExerciseIndex] ||
      filteredExercises[0] ||
      allExercises[0]
    );
  }, [filteredExercises, currentExerciseIndex, allExercises]);

  const userAnswer = answers[currentExercise.id] || "";
  const currentResult = results[currentExercise.id] || null;

  // Set answer
  const setAnswer = useCallback(
    (text: string) => {
      setAnswers((prev) => ({
        ...prev,
        [currentExercise.id]: text,
      }));
    },
    [currentExercise.id]
  );

  // Check current answer
  const checkCurrentAnswer = useCallback(() => {
    const res = checkSentenceMatch(userAnswer, currentExercise);
    setResults((prev) => ({
      ...prev,
      [currentExercise.id]: res,
    }));
    return res;
  }, [userAnswer, currentExercise]);

  // Fill model solution
  const fillModelSolution = useCallback(() => {
    const model = currentExercise.modelSolutions[0];
    setAnswers((prev) => ({
      ...prev,
      [currentExercise.id]: model,
    }));
    const res = checkSentenceMatch(model, currentExercise);
    setResults((prev) => ({
      ...prev,
      [currentExercise.id]: res,
    }));
  }, [currentExercise]);

  // Next / Prev exercise
  const nextExercise = useCallback(() => {
    if (currentExerciseIndex < filteredExercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
    }
  }, [currentExerciseIndex, filteredExercises.length]);

  const prevExercise = useCallback(() => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((prev) => prev - 1);
    }
  }, [currentExerciseIndex]);

  // Change mode
  const handleModeChange = useCallback((mode: SyntaxModeType) => {
    setActiveMode(mode);
    setCurrentExerciseIndex(0);
  }, []);

  // Overall session statistics
  const sessionStats = useMemo(() => {
    const modeExercises = filteredExercises;
    let completedCount = 0;
    let correctCount = 0;
    let totalDensity = 0;

    for (const ex of modeExercises) {
      const res = results[ex.id];
      if (res) {
        completedCount++;
        if (res.isCorrect) correctCount++;
        totalDensity += res.syntacticDensity;
      }
    }

    const avgDensity = completedCount > 0 ? Math.round(totalDensity / completedCount) : 0;
    const accuracy = completedCount > 0 ? Math.round((correctCount / modeExercises.length) * 100) : 0;

    let estimatedBand = 6.5;
    if (accuracy >= 80 && avgDensity >= 85) estimatedBand = 8.5;
    else if (accuracy >= 60 && avgDensity >= 75) estimatedBand = 8.0;
    else if (accuracy >= 40) estimatedBand = 7.5;
    else estimatedBand = 7.0;

    return {
      completedCount,
      correctCount,
      totalCount: modeExercises.length,
      accuracy,
      avgDensity,
      estimatedBand,
    };
  }, [filteredExercises, results]);

  // Submit and Save to Dexie DB
  const submitSession = useCallback(async () => {
    setShowSummaryModal(true);

    try {
      const log: PracticeLog = {
        id: `log_syntax_${Date.now()}`,
        type: "advanced_syntax_drill",
        materialId: activeMode,
        score: sessionStats.correctCount,
        accuracyPercentage: sessionStats.accuracy,
        timeSpentSeconds: 240,
        createdAt: new Date().toISOString(),
      };
      await db.practice_logs.put(log);
    } catch (e) {
      console.error("Error saving advanced syntax practice log:", e);
    }

    // Save incorrect sentences into Error Bank
    for (const ex of filteredExercises) {
      const res = results[ex.id];
      if (res && !res.isCorrect) {
        try {
          await db.error_bank.put({
            id: `err_syntax_${ex.id}_${Date.now()}`,
            sourceModule: "grammar",
            errorType: "grammar",
            questionContext: `Academic Syntax (${ex.syntaxType}): "${ex.originalSentence}"`,
            userWrongAnswer: answers[ex.id] || "Để trống",
            correctAnswer: ex.modelSolutions[0],
            deepExplanation: res.feedbackVi || ex.pedagogicalTipVi,
            mastered: false,
            retryCount: 0,
            consecutiveSuccesses: 0,
            createdAt: new Date().toISOString(),
          });
        } catch (e) {
          console.error("Error saving syntax error to Error Bank:", e);
        }
      }
    }
  }, [activeMode, sessionStats, filteredExercises, results, answers]);

  // Save Word Families to FSRS
  const saveWordFamiliesToFSRS = useCallback(async () => {
    for (const item of ACADEMIC_WORD_FAMILIES) {
      const card: VocabCard = {
        id: `vocab_wf_${item.noun.toLowerCase()}`,
        word: `${item.noun} (v: ${item.verb})`,
        ipa: "/ˌæk.əˈdem.ɪk/",
        meaning: item.meaningVi,
        collocations: [item.verb, item.noun, item.adjective],
        originalContext: item.exampleSentence,
        category: "awl_570",
        status: "new",
        stepInterval: 1,
        nextReviewDate: new Date(Date.now() + 86400000).toISOString(),
        repetitionCount: 0,
        lapsesCount: 0,
        stability: 1.0,
        difficulty: 5.0,
        sourceModule: "syntax",
        createdAt: new Date().toISOString(),
      };
      try {
        await db.vocab_matrix.put(card);
      } catch (e) {
        console.error("Error saving word family to FSRS:", e);
      }
    }
  }, []);

  const resetSession = useCallback(() => {
    setAnswers({});
    setResults({});
    setCurrentExerciseIndex(0);
    setShowSummaryModal(false);
  }, []);

  return {
    activeMode,
    currentExerciseIndex,
    filteredExercises,
    currentExercise,
    userAnswer,
    currentResult,
    sessionStats,
    showCheatSheetModal,
    showComparisonDrawer,
    showSummaryModal,
    handleModeChange,
    setCurrentExerciseIndex,
    setAnswer,
    checkCurrentAnswer,
    fillModelSolution,
    nextExercise,
    prevExercise,
    submitSession,
    saveWordFamiliesToFSRS,
    resetSession,
    setShowCheatSheetModal,
    setShowComparisonDrawer,
    setShowSummaryModal,
  };
}
