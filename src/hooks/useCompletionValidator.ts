"use client";

import { useState, useCallback } from "react";
import { CompletionQuestion } from "@/data/mockCompletionPassages";
import { db } from "@/lib/db";
import { ErrorItem, PracticeLog, ErrorClassification } from "@/types/database";

export interface QuestionEvaluation {
  questionId: string;
  questionNumber: number;
  label: string;
  userInput: string;
  wordCount: number;
  maxWordsAllowed: number;
  isCorrect: boolean;
  isWordLimitExceeded: boolean;
  isSingularPluralMismatch: boolean;
  errorClassification?: ErrorClassification;
  expectedAnswers: string[];
  explanationDetail: string;
  evidenceQuote: string;
  evidenceParagraphId: string;
}

export interface CompletionSummary {
  total: number;
  score: number;
  accuracyPercentage: number;
  wordLimitViolations: number;
  singularPluralErrors: number;
  evaluations: QuestionEvaluation[];
}

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

export function cleanText(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .replace(/\s+/g, " ");
}

export function useCompletionValidator() {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Record<string, string>>({});
  const [showPredictions, setShowPredictions] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [summary, setSummary] = useState<CompletionSummary | null>(null);

  const setInput = useCallback((questionId: string, value: string) => {
    setInputs((prev) => ({ ...prev, [questionId]: value }));
    setIsSubmitted(false);
  }, []);

  const setPrediction = useCallback((questionId: string, pos: string) => {
    setPredictions((prev) => ({ ...prev, [questionId]: pos }));
  }, []);

  const togglePredictions = useCallback(() => {
    setShowPredictions((prev) => !prev);
  }, []);

  const evaluate = useCallback(
    async (
      questions: CompletionQuestion[],
      taskTitle: string,
      taskId: string
    ) => {
      let correctScore = 0;
      let wordLimitViolations = 0;
      let singularPluralErrors = 0;
      const evaluations: QuestionEvaluation[] = [];

      for (const q of questions) {
        const rawInput = inputs[q.id] || "";
        const cleanedInput = cleanText(rawInput);
        const wordCount = countWords(rawInput);
        const isWordLimitExceeded = wordCount > q.maxWords;

        // Check against acceptable answers
        const matched = q.expectedAnswers.some(
          (ans) => cleanText(ans) === cleanedInput
        );

        let isSingularPluralMismatch = false;
        let isCorrect = false;
        let errorClassification: ErrorClassification | undefined = undefined;

        if (isWordLimitExceeded) {
          isCorrect = false;
          wordLimitViolations++;
          errorClassification = "careless_reading";
        } else if (matched) {
          isCorrect = true;
          correctScore++;
        } else {
          isCorrect = false;

          // Check if it was a singular/plural mistake
          const isPluralExpected = q.posCategory === "plural_noun";
          const endsWithS = cleanedInput.endsWith("s");

          if (
            q.singularPluralTrap ||
            (isPluralExpected && !endsWithS) ||
            (!isPluralExpected && endsWithS)
          ) {
            isSingularPluralMismatch = true;
            singularPluralErrors++;
            errorClassification = "singular_plural";
          } else {
            errorClassification = "paraphrase_trap";
          }
        }

        // Save mistake to Error Bank in Dexie DB
        if (!isCorrect) {
          try {
            let explanation = q.explanationDetail;
            if (isWordLimitExceeded) {
              explanation = `[Lỗi Vượt Giới Hạn Từ] Đề bài chỉ cho phép tối đa ${q.maxWords} từ, nhưng bạn đã điền ${wordCount} từ. ${q.explanationDetail}`;
            } else if (isSingularPluralMismatch) {
              explanation = `[Lỗi Số Ít / Số Nhiều] ${
                q.singularPluralNote || "Sai dạng số ít hoặc số nhiều của danh từ."
              } ${q.explanationDetail}`;
            }

            const errorItem: ErrorItem = {
              id: `err_comp_${Date.now()}_${q.id}`,
              sourceModule: "reading",
              errorType: errorClassification || "careless_reading",
              questionContext: `[Reading Completion - ${taskTitle}] ${q.label}`,
              userWrongAnswer: rawInput || "Chưa điền đáp án",
              correctAnswer: q.expectedAnswers.join(" / "),
              deepExplanation: explanation,
              mastered: false,
              retryCount: 0,
              createdAt: new Date().toISOString(),
            };

            await db.error_bank.put(errorItem);
          } catch (err) {
            console.error("Failed to auto-save completion error to DB:", err);
          }
        }

        evaluations.push({
          questionId: q.id,
          questionNumber: q.questionNumber,
          label: q.label,
          userInput: rawInput,
          wordCount,
          maxWordsAllowed: q.maxWords,
          isCorrect,
          isWordLimitExceeded,
          isSingularPluralMismatch,
          errorClassification,
          expectedAnswers: q.expectedAnswers,
          explanationDetail: q.explanationDetail,
          evidenceQuote: q.evidenceQuote,
          evidenceParagraphId: q.evidenceParagraphId,
        });
      }

      const total = questions.length;
      const accuracy = total > 0 ? Math.round((correctScore / total) * 100) : 0;

      const summaryObj: CompletionSummary = {
        total,
        score: correctScore,
        accuracyPercentage: accuracy,
        wordLimitViolations,
        singularPluralErrors,
        evaluations,
      };

      setSummary(summaryObj);
      setIsSubmitted(true);

      // Save to practice_logs
      try {
        const log: PracticeLog = {
          id: `prac_comp_${Date.now()}`,
          type: "split_reading",
          materialId: taskId,
          score: correctScore,
          timeSpentSeconds: 480,
          accuracyPercentage: accuracy,
          createdAt: new Date().toISOString(),
        };
        await db.practice_logs.put(log);
      } catch (logErr) {
        console.error("Failed to save completion practice log:", logErr);
      }

      return summaryObj;
    },
    [inputs]
  );

  const resetAll = useCallback(() => {
    setInputs({});
    setActiveQuestionId(null);
    setIsSubmitted(false);
    setSummary(null);
  }, []);

  return {
    inputs,
    activeQuestionId,
    predictions,
    showPredictions,
    isSubmitted,
    summary,
    setInput,
    setActiveQuestionId,
    setPrediction,
    togglePredictions,
    evaluate,
    resetAll,
  };
}
