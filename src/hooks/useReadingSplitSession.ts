"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MOCK_BIOMIMETIC_PASSAGE,
  ReadingPassageData,
  ReadingQuestion,
} from "@/data/mockReadingPassageData";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem } from "@/types/database";
import { markPracticeCompleted } from "@/lib/taskCompletionScanner";

export interface HighlightItem {
  id: string;
  text: string;
  color: "yellow" | "green" | "red" | "purple";
  paragraphId: string;
}

export function useReadingSplitSession(passageData: ReadingPassageData = MOCK_BIOMIMETIC_PASSAGE) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [highlights, setHighlights] = useState<HighlightItem[]>([]);
  const [activeEvidenceSentenceId, setActiveEvidenceSentenceId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showParaphraseDrawer, setShowParaphraseDrawer] = useState<boolean>(false);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState<number>(0);
  const [fontSizeScale, setFontSizeScale] = useState<number>(15); // default font-size

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isSubmitted) {
      interval = setInterval(() => {
        setTimeSpentSeconds((p) => p + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const setAnswer = useCallback((questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  }, []);

  const addHighlight = useCallback(
    (text: string, color: "yellow" | "green" | "red" | "purple", paragraphId: string) => {
      const newHl: HighlightItem = {
        id: `hl_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        text: text.trim(),
        color,
        paragraphId,
      };
      setHighlights((prev) => [...prev, newHl]);
    },
    []
  );

  const removeHighlight = useCallback((id: string) => {
    setHighlights((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const pinpointEvidence = useCallback((sentenceId: string) => {
    setActiveEvidenceSentenceId(sentenceId);
    if (typeof document !== "undefined") {
      const el = document.getElementById(sentenceId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, []);

  // Submit test and sync with Dexie DB
  const submitReadingTest = useCallback(async () => {
    setIsSubmitted(true);

    let correctCount = 0;
    const questions = passageData.questions;

    for (const q of questions) {
      const userAns = (answers[q.id] || "").trim().toLowerCase();
      const correctAns = q.correctAnswer.trim().toLowerCase();

      const isCorrect =
        userAns === correctAns ||
        (q.type === "summary_completion" &&
          (userAns.includes(correctAns) || correctAns.includes(userAns)));

      if (isCorrect) {
        correctCount++;
      } else {
        // Save to Error Bank
        db.error_bank.put({
          id: `err_split_rd_${Date.now()}_${q.id}`,
          sourceModule: "reading",
          errorType: q.isParaphraseTrap ? "paraphrase_trap" : "careless_reading",
          questionContext: `Reading Passage: "${passageData.title}" - Câu ${q.number}: ${q.prompt}`,
          userWrongAnswer: answers[q.id] || "(Bỏ trống)",
          correctAnswer: q.correctAnswer,
          deepExplanation: q.explanation,
          mastered: false,
          retryCount: 0,
          consecutiveSuccesses: 0,
          createdAt: new Date().toISOString(),
        }).catch((err) => console.error("Error saving to error bank:", err));
      }
    }

    const accuracy = Math.round((correctCount / questions.length) * 100);

    // Save Practice Log
    try {
      const log: PracticeLog = {
        id: `log_split_rd_${Date.now()}_${passageData.id}`,
        type: "reading_splitview",
        materialId: passageData.id,
        score: Number(((correctCount / questions.length) * 9).toFixed(1)),
        timeSpentSeconds,
        accuracyPercentage: accuracy,
        createdAt: new Date().toISOString(),
      };
      await db.practice_logs.put(log);
      markPracticeCompleted("reading-split");
    } catch (e) {
      console.error("Failed to save reading practice log:", e);
    }

    setShowSummaryModal(true);
  }, [answers, passageData, timeSpentSeconds]);

  const resetSession = useCallback(() => {
    setAnswers({});
    setHighlights([]);
    setActiveEvidenceSentenceId(null);
    setIsSubmitted(false);
    setShowParaphraseDrawer(false);
    setShowSummaryModal(false);
    setTimeSpentSeconds(0);
  }, []);

  const completedCount = Object.keys(answers).filter((k) => (answers[k] || "").trim().length > 0).length;

  return {
    answers,
    highlights,
    activeEvidenceSentenceId,
    isSubmitted,
    showParaphraseDrawer,
    showSummaryModal,
    timeSpentSeconds,
    fontSizeScale,
    completedCount,
    setAnswer,
    addHighlight,
    removeHighlight,
    pinpointEvidence,
    submitReadingTest,
    resetSession,
    setShowParaphraseDrawer,
    setShowSummaryModal,
    setFontSizeScale,
  };
}
