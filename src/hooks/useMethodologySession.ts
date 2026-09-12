"use client";

import { useState, useCallback, useEffect } from "react";
import { MethodologyQuizItem } from "@/data/mockReadingMethodsData";
import {
  evaluateMethodologyScore,
  saveMethodologyGateResults,
  MethodologyEvaluationResult,
  isMethodologyGatePassed,
} from "@/lib/methodologyGateChecker";
import { playExaminerSpeech } from "@/lib/aiExaminerClient";

export function useMethodologySession(
  topicId: string,
  title: string,
  skill: "reading" | "listening",
  quizQuestions: MethodologyQuizItem[]
) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<MethodologyEvaluationResult | null>(null);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState<boolean>(false);
  const [isAlreadyPassed, setIsAlreadyPassed] = useState<boolean>(false);
  const [playingSnippetId, setPlayingSnippetId] = useState<string | null>(null);

  useEffect(() => {
    setIsAlreadyPassed(isMethodologyGatePassed(topicId));
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
    const evalResult = evaluateMethodologyScore(quizAnswers, quizQuestions);
    setEvaluation(evalResult);
    setIsSubmitted(true);

    await saveMethodologyGateResults(topicId, title, skill, evalResult);

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

  const playAudioSnippet = useCallback((snippetId: string, text: string) => {
    setPlayingSnippetId(snippetId);
    playExaminerSpeech(text, "strict_examiner", () => {
      setPlayingSnippetId(null);
    });
  }, []);

  const stopAudioSnippet = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setPlayingSnippetId(null);
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
    playingSnippetId,
    playAudioSnippet,
    stopAudioSnippet,
  };
}
