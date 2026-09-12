"use client";

import { useState, useCallback } from "react";
import {
  Section1FormTask,
  Section2MapTask,
  Section1FormField,
  MapQuestion,
} from "@/data/mockListeningS1S2Data";
import { db } from "@/lib/db";
import { ErrorItem, PracticeLog, ErrorClassification } from "@/types/database";

export interface S1FieldEvaluation {
  fieldId: string;
  fieldNumber: number;
  label: string;
  userInput: string;
  isCorrect: boolean;
  expectedAnswers: string[];
  trapType: string;
  trapTitleVi: string;
  trapExplanation: string;
  dialogueSnippet: {
    speaker1: string;
    speaker2: string;
    correctionHighlight?: string;
  };
}

export interface MapQuestionEvaluation {
  questionId: string;
  questionNumber: number;
  targetName: string;
  userSelectedLetter: string;
  correctLetter: string;
  isCorrect: boolean;
  trapType: string;
  trapTitleVi: string;
  trapExplanation: string;
  directionalCue: string;
  transcriptSnippet: string;
}

export interface ListeningSummary {
  total: number;
  score: number;
  accuracyPercentage: number;
  evaluations: S1FieldEvaluation[] | MapQuestionEvaluation[];
}

function cleanInput(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .replace(/\s+/g, " ");
}

export function useMapNavigation() {
  const [section1Inputs, setSection1Inputs] = useState<Record<string, string>>({});
  const [assignedLetters, setAssignedLetters] = useState<Record<string, string>>({});
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [showBreadcrumbs, setShowBreadcrumbs] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [summary, setSummary] = useState<ListeningSummary | null>(null);

  const setS1Input = useCallback((fieldId: string, value: string) => {
    setSection1Inputs((prev) => ({ ...prev, [fieldId]: value }));
    setIsSubmitted(false);
  }, []);

  const assignLetter = useCallback((questionId: string, letter: string) => {
    setAssignedLetters((prev) => {
      const next = { ...prev };
      // Remove this letter if already assigned elsewhere
      Object.keys(next).forEach((qId) => {
        if (next[qId] === letter) delete next[qId];
      });
      next[questionId] = letter;
      return next;
    });
    setIsSubmitted(false);
  }, []);

  const removeLetter = useCallback((questionId: string) => {
    setAssignedLetters((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
    setIsSubmitted(false);
  }, []);

  const toggleBreadcrumbs = useCallback(() => {
    setShowBreadcrumbs((prev) => !prev);
  }, []);

  // Evaluate Section 1 Form
  const evaluateSection1 = useCallback(
    async (task: Section1FormTask) => {
      let score = 0;
      const evals: S1FieldEvaluation[] = [];

      for (const f of task.fields) {
        const rawInput = section1Inputs[f.id] || "";
        const cleaned = cleanInput(rawInput);
        const isCorrect = f.expectedAnswers.some(
          (ans) => cleanInput(ans) === cleaned
        );

        if (isCorrect) {
          score++;
        } else {
          // Log to error bank
          try {
            let errorType: ErrorClassification = "careless_reading";
            if (f.trapType === "spelling_silent_letter" || f.trapType === "number_teen_ty") {
              errorType = "pronunciation";
            }

            const errorItem: ErrorItem = {
              id: `err_lis_s1_${Date.now()}_${f.id}`,
              sourceModule: "listening",
              errorType,
              questionContext: `[Listening Section 1 - ${task.title}] ${f.label}`,
              userWrongAnswer: rawInput || "Chưa điền đáp án",
              correctAnswer: f.expectedAnswers.join(" / "),
              deepExplanation: `[${f.trapTitleVi}] ${f.trapExplanation}`,
              mastered: false,
              retryCount: 0,
              createdAt: new Date().toISOString(),
            };

            await db.error_bank.put(errorItem);
          } catch (e) {
            console.error("Failed to auto-save Section 1 error to DB:", e);
          }
        }

        evals.push({
          fieldId: f.id,
          fieldNumber: f.fieldNumber,
          label: f.label,
          userInput: rawInput,
          isCorrect,
          expectedAnswers: f.expectedAnswers,
          trapType: f.trapType,
          trapTitleVi: f.trapTitleVi,
          trapExplanation: f.trapExplanation,
          dialogueSnippet: f.dialogueSnippet,
        });
      }

      const total = task.fields.length;
      const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

      const sum: ListeningSummary = {
        total,
        score,
        accuracyPercentage: accuracy,
        evaluations: evals,
      };

      setSummary(sum);
      setIsSubmitted(true);

      // Save to practice_logs
      try {
        const log: PracticeLog = {
          id: `prac_lis_s1_${Date.now()}`,
          type: "split_listening",
          materialId: task.id,
          score,
          timeSpentSeconds: 150,
          accuracyPercentage: accuracy,
          createdAt: new Date().toISOString(),
        };
        await db.practice_logs.put(log);
      } catch (err) {
        console.error("Failed to save Section 1 practice log:", err);
      }

      return sum;
    },
    [section1Inputs]
  );

  // Evaluate Section 2 Map
  const evaluateSection2 = useCallback(
    async (task: Section2MapTask) => {
      let score = 0;
      const evals: MapQuestionEvaluation[] = [];

      for (const q of task.questions) {
        const userLetter = assignedLetters[q.id] || "";
        const isCorrect = userLetter.toUpperCase() === q.correctLetter.toUpperCase();

        if (isCorrect) {
          score++;
        } else {
          // Log to error bank
          try {
            const errorItem: ErrorItem = {
              id: `err_lis_s2_${Date.now()}_${q.id}`,
              sourceModule: "listening",
              errorType: "paraphrase_trap",
              questionContext: `[Listening Section 2 Map - ${task.title}] Địa điểm: ${q.targetName}`,
              userWrongAnswer: userLetter ? `Vị trí ${userLetter}` : "Chưa chọn vị trí",
              correctAnswer: `Vị trí ${q.correctLetter}`,
              deepExplanation: `[${q.trapTitleVi}] ${q.trapExplanation}. Hướng dẫn: "${q.transcriptSnippet}"`,
              mastered: false,
              retryCount: 0,
              createdAt: new Date().toISOString(),
            };

            await db.error_bank.put(errorItem);
          } catch (e) {
            console.error("Failed to auto-save Section 2 Map error to DB:", e);
          }
        }

        evals.push({
          questionId: q.id,
          questionNumber: q.questionNumber,
          targetName: q.targetName,
          userSelectedLetter: userLetter,
          correctLetter: q.correctLetter,
          isCorrect,
          trapType: q.trapType,
          trapTitleVi: q.trapTitleVi,
          trapExplanation: q.trapExplanation,
          directionalCue: q.directionalCue,
          transcriptSnippet: q.transcriptSnippet,
        });
      }

      const total = task.questions.length;
      const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

      const sum: ListeningSummary = {
        total,
        score,
        accuracyPercentage: accuracy,
        evaluations: evals,
      };

      setSummary(sum);
      setIsSubmitted(true);

      // Save to practice_logs
      try {
        const log: PracticeLog = {
          id: `prac_lis_s2_${Date.now()}`,
          type: "split_listening",
          materialId: task.id,
          score,
          timeSpentSeconds: 180,
          accuracyPercentage: accuracy,
          createdAt: new Date().toISOString(),
        };
        await db.practice_logs.put(log);
      } catch (err) {
        console.error("Failed to save Section 2 Map practice log:", err);
      }

      return sum;
    },
    [assignedLetters]
  );

  const resetAll = useCallback(() => {
    setSection1Inputs({});
    setAssignedLetters({});
    setActiveQuestionId(null);
    setIsSubmitted(false);
    setSummary(null);
  }, []);

  return {
    section1Inputs,
    assignedLetters,
    activeQuestionId,
    showBreadcrumbs,
    isSubmitted,
    summary,
    setS1Input,
    assignLetter,
    removeLetter,
    setActiveQuestionId,
    toggleBreadcrumbs,
    evaluateSection1,
    evaluateSection2,
    resetAll,
  };
}
