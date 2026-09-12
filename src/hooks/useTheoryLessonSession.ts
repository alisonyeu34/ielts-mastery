"use client";

import { useState, useCallback, useEffect } from "react";
import {
  CoreGrammarTheoryLesson,
} from "@/data/mockGrammarTheoryData";
import {
  evaluateGatewayScore,
  saveTheoryGateResults,
  GatewayEvaluationResult,
  isLessonGatePassed,
} from "@/lib/theoryGateChecker";

export interface TheoryNote {
  id: string;
  stepNumber: number;
  text: string;
  timestamp: string;
}

export function useTheoryLessonSession(lesson: CoreGrammarTheoryLesson) {
  // Step state: 1 (Concept), 2 (Traps), 3 (Band 8.5+ Dissection), 4 (Gateway Quiz)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<GatewayEvaluationResult | null>(null);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState<boolean>(false);

  // Check if previously passed
  const [isAlreadyPassed, setIsAlreadyPassed] = useState<boolean>(false);

  useEffect(() => {
    setIsAlreadyPassed(isLessonGatePassed(lesson.id));
  }, [lesson.id]);

  // Notes state
  const [notes, setNotes] = useState<TheoryNote[]>([]);

  const selectQuizOption = useCallback((questionIndex: number, optionIndex: number) => {
    if (isQuizSubmitted) return;
    setQuizAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  }, [isQuizSubmitted]);

  // Submit Quiz and calculate mastery
  const submitQuiz = useCallback(async () => {
    const evalResult = evaluateGatewayScore(quizAnswers, lesson.gatewayQuestions);
    setEvaluation(evalResult);
    setIsQuizSubmitted(true);

    // Save to Dexie DB
    await saveTheoryGateResults(lesson.id, lesson.title, evalResult);

    if (evalResult.isPassed) {
      setIsAlreadyPassed(true);
      setIsUnlockModalOpen(true);
    }
  }, [quizAnswers, lesson]);

  const retakeQuiz = useCallback(() => {
    setQuizAnswers({});
    setIsQuizSubmitted(false);
    setEvaluation(null);
  }, []);

  const addNote = useCallback((text: string) => {
    const newNote: TheoryNote = {
      id: `note_${Date.now()}`,
      stepNumber: currentStep,
      text,
      timestamp: new Date().toLocaleTimeString(),
    };
    setNotes((prev) => [newNote, ...prev]);
  }, [currentStep]);

  const removeNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return {
    currentStep,
    setCurrentStep,
    quizAnswers,
    selectQuizOption,
    isQuizSubmitted,
    evaluation,
    isAlreadyPassed,
    isUnlockModalOpen,
    setIsUnlockModalOpen,
    submitQuiz,
    retakeQuiz,
    notes,
    addNote,
    removeNote,
  };
}
