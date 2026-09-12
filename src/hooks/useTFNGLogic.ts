"use client";

import { useState, useCallback } from "react";
import { TFNGQuestion, TFNGAnswer } from "@/data/mockTFNGPassages";
import { db } from "@/lib/db";
import { ErrorItem, PracticeLog } from "@/types/database";

export interface TFNGResultSummary {
  total: number;
  correctCount: number;
  accuracyPercentage: number;
  trapBreakdown: Record<string, number>;
}

export function useTFNGLogic() {
  const [answers, setAnswers] = useState<Record<string, TFNGAnswer>>({});
  const [pinnedEvidence, setPinnedEvidence] = useState<Record<string, string>>({});
  const [activeEvidenceQuote, setActiveEvidenceQuote] = useState<string | null>(null);
  const [activeParagraphId, setActiveParagraphId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultSummary, setResultSummary] = useState<TFNGResultSummary | null>(null);

  const setAnswer = useCallback((questionId: string, answer: TFNGAnswer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setIsSubmitted(false);
  }, []);

  const pinEvidence = useCallback((questionId: string, quote: string, paragraphId?: string) => {
    setPinnedEvidence((prev) => ({ ...prev, [questionId]: quote }));
    setActiveEvidenceQuote(quote);
    if (paragraphId) setActiveParagraphId(paragraphId);
  }, []);

  const highlightEvidence = useCallback((quote: string, paragraphId?: string) => {
    setActiveEvidenceQuote(quote);
    if (paragraphId) setActiveParagraphId(paragraphId);
  }, []);

  const checkAnswersAndLogErrors = useCallback(
    async (questions: TFNGQuestion[], passageTitle: string, passageId: string) => {
      let correctCount = 0;
      const trapBreakdown: Record<string, number> = {};

      for (const q of questions) {
        const userAns = answers[q.id];
        const isCorrect = userAns === q.correctAnswer;

        if (isCorrect) {
          correctCount++;
        } else {
          // Log mistake breakdown
          trapBreakdown[q.trapType] = (trapBreakdown[q.trapType] || 0) + 1;

          // Auto-save into Dexie DB error_bank
          try {
            const errorType =
              q.trapType === "qualifier" ? "careless_reading" : "paraphrase_trap";

            const errorItem: ErrorItem = {
              id: `err_tfng_${Date.now()}_${q.id}`,
              sourceModule: "reading",
              errorType,
              questionContext: `[TFNG - ${passageTitle}] Statement: "${q.statement}"`,
              userWrongAnswer: userAns || "Chưa chọn đáp án",
              correctAnswer: q.correctAnswer,
              deepExplanation: `${q.trapTitleVi}. ${q.explanationMarkdown}`,
              mastered: false,
              retryCount: 0,
              createdAt: new Date().toISOString(),
            };

            await db.error_bank.put(errorItem);
          } catch (dbErr) {
            console.error("Failed to auto-save TFNG mistake to Error Bank:", dbErr);
          }
        }
      }

      const total = questions.length;
      const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;

      const summary: TFNGResultSummary = {
        total,
        correctCount,
        accuracyPercentage: accuracy,
        trapBreakdown,
      };

      setResultSummary(summary);
      setIsSubmitted(true);

      // Save to practice_logs
      try {
        const log: PracticeLog = {
          id: `prac_tfng_${Date.now()}`,
          type: "split_reading",
          materialId: passageId,
          score: correctCount,
          timeSpentSeconds: 420,
          accuracyPercentage: accuracy,
          createdAt: new Date().toISOString(),
        };
        await db.practice_logs.put(log);
      } catch (logErr) {
        console.error("Failed to save TFNG practice log:", logErr);
      }

      return summary;
    },
    [answers]
  );

  const resetAll = useCallback(() => {
    setAnswers({});
    setPinnedEvidence({});
    setActiveEvidenceQuote(null);
    setActiveParagraphId(null);
    setIsSubmitted(false);
    setResultSummary(null);
  }, []);

  return {
    answers,
    pinnedEvidence,
    activeEvidenceQuote,
    activeParagraphId,
    isSubmitted,
    resultSummary,
    setAnswer,
    pinEvidence,
    highlightEvidence,
    checkAnswersAndLogErrors,
    resetAll,
  };
}
