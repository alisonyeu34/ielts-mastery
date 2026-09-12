"use client";

import { useState, useCallback, useMemo } from "react";
import {
  InteractiveTheoryLesson,
  TheoryAnnotation,
} from "@/data/mockTheoryLessons";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem, PracticeType } from "@/types/database";

export function useTheorySession(lesson: InteractiveTheoryLesson) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedAnnotation, setSelectedAnnotation] = useState<TheoryAnnotation | null>(
    lesson.step3.annotations[0] || null
  );

  // Quiz states
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [isQuizPassed, setIsQuizPassed] = useState<boolean>(false);
  const [quizScorePercent, setQuizScorePercent] = useState<number>(0);

  const selectQuizAnswer = useCallback((qId: string, optIdx: number) => {
    if (isQuizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  }, [isQuizSubmitted]);

  // Submit Quiz & Persist to Dexie DB
  const submitQuiz = useCallback(async () => {
    let correctCount = 0;
    const total = lesson.quiz.length;

    for (const q of lesson.quiz) {
      const userChoice = quizAnswers[q.id];
      const isCorrect = userChoice === q.correctIndex;

      if (isCorrect) {
        correctCount++;
      } else {
        // Save to Error Bank
        const userWrongText = userChoice !== undefined ? q.options[userChoice] : "(Bỏ trống)";
        const correctText = q.options[q.correctIndex];

        try {
          const errItem: ErrorItem = {
            id: `err_theory_${Date.now()}_${q.id}`,
            sourceModule: lesson.skill.startsWith("writing")
              ? "writing"
              : lesson.skill.startsWith("speaking")
              ? "speaking"
              : lesson.skill === "listening"
              ? "listening"
              : "reading",
            errorType: "careless_reading",
            questionContext: `[Lý thuyết: ${lesson.title}] Câu hỏi kiểm tra độ hiểu: ${q.question}`,
            userWrongAnswer: userWrongText,
            correctAnswer: correctText,
            deepExplanation: q.explanation,
            mastered: false,
            retryCount: 0,
            createdAt: new Date().toISOString(),
          };
          await db.error_bank.put(errItem);
        } catch (e) {
          console.error("Failed to save theory quiz error:", e);
        }
      }
    }

    const percent = Math.round((correctCount / total) * 100);
    setQuizScorePercent(percent);
    setIsQuizSubmitted(true);

    if (percent >= 75) {
      setIsQuizPassed(true);

      // Save Practice Log to DB
      try {
        let practiceType: PracticeType = "reading";
        if (lesson.skill.startsWith("writing")) practiceType = "writing";
        else if (lesson.skill.startsWith("speaking")) practiceType = "speaking";
        else if (lesson.skill === "listening") practiceType = "listening";
        else if (lesson.skill === "grammar") practiceType = "grammar";
        else if (lesson.skill === "pronunciation") practiceType = "pronunciation";

        const log: PracticeLog = {
          id: `log_theory_${Date.now()}_${lesson.id}`,
          type: practiceType,
          materialId: lesson.id,
          score: 9.0,
          timeSpentSeconds: lesson.estimatedMinutes * 60,
          accuracyPercentage: percent,
          createdAt: new Date().toISOString(),
        };
        await db.practice_logs.put(log);
      } catch (err) {
        console.error("Failed to save theory practice log:", err);
      }
    } else {
      setIsQuizPassed(false);
    }
  }, [lesson, quizAnswers]);

  const resetQuiz = useCallback(() => {
    setQuizAnswers({});
    setIsQuizSubmitted(false);
    setIsQuizPassed(false);
    setQuizScorePercent(0);
  }, []);

  return {
    currentStep,
    selectedAnnotation,
    quizAnswers,
    isQuizSubmitted,
    isQuizPassed,
    quizScorePercent,
    setCurrentStep,
    setSelectedAnnotation,
    selectQuizAnswer,
    submitQuiz,
    resetQuiz,
  };
}
