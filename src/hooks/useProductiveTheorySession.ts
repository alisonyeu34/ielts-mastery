"use client";

import { useState, useCallback, useEffect } from "react";
import { WritingGatewayQuizItem } from "@/data/mockWritingBlueprintsData";
import {
  evaluateProductiveScore,
  saveProductiveGateResults,
  ProductiveEvaluationResult,
  isProductiveGatePassed,
} from "@/lib/productiveGateChecker";
import { playExaminerSpeech } from "@/lib/aiExaminerClient";

export function useProductiveTheorySession(
  topicId: string,
  title: string,
  skill: "writing" | "speaking",
  quizQuestions: WritingGatewayQuizItem[]
) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<ProductiveEvaluationResult | null>(null);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState<boolean>(false);
  const [isAlreadyPassed, setIsAlreadyPassed] = useState<boolean>(false);
  const [activeAudioType, setActiveAudioType] = useState<"band55" | "band85" | null>(null);

  useEffect(() => {
    setIsAlreadyPassed(isProductiveGatePassed(topicId));
  }, [topicId]);

  const selectOption = useCallback(
    (questionIndex: number, optionIndex: number) => {
      if (isSubmitted) return;
      setQuizAnswers((prev) => ({
        ...prev,
        [questionIndex]: optionIndex,
      }));
    },
    [isSubmitted]
  );

  const submitQuiz = useCallback(async () => {
    const evalResult = evaluateProductiveScore(quizAnswers, quizQuestions);
    setEvaluation(evalResult);
    setIsSubmitted(true);

    await saveProductiveGateResults(topicId, title, skill, evalResult);

    if (evalResult.isPassed) {
      setIsAlreadyPassed(true);
      setIsUnlockModalOpen(true);
    }
  }, [quizAnswers, quizQuestions, topicId, title, skill]);

  const retakeQuiz = useCallback(() => {
    setQuizAnswers({});
    setIsSubmitted(false);
    setEvaluation(null);
  }, []);

  const playAudioContrast = useCallback((type: "band55" | "band85", text: string) => {
    setActiveAudioType(type);
    playExaminerSpeech(text, "strict_examiner", () => {
      setActiveAudioType(null);
    });
  }, []);

  const stopAudioContrast = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setActiveAudioType(null);
  }, []);

  return {
    currentStep,
    setCurrentStep,
    quizAnswers,
    selectOption,
    isSubmitted,
    evaluation,
    isAlreadyPassed,
    isUnlockModalOpen,
    setIsUnlockModalOpen,
    submitQuiz,
    retakeQuiz,
    activeAudioType,
    playAudioContrast,
    stopAudioContrast,
  };
}
