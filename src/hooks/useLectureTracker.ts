"use client";

import { useState, useCallback } from "react";
import {
  Section3Task,
  Section4Task,
  S3Question,
  S4NoteItem,
} from "@/data/mockListeningS3S4Data";
import { db } from "@/lib/db";
import { ErrorItem, PracticeLog, ErrorClassification } from "@/types/database";

export interface S3QuestionEvaluation {
  questionId: string;
  questionNumber: number;
  prompt: string;
  userSelectedOptionId: string;
  correctOptionId: string;
  isCorrect: boolean;
  trapTitleVi: string;
  explanationMarkdown: string;
  options: Array<{
    id: string;
    letter: string;
    text: string;
    speaker: string;
    status: "proposed" | "rejected" | "consensus";
    rejectionReason?: string;
    dialogueQuote: string;
  }>;
}

export interface S4QuestionEvaluation {
  questionId: string;
  questionNumber: number;
  userInput: string;
  isCorrect: boolean;
  isWordLimitExceeded: boolean;
  expectedAnswers: string[];
  signpostCue: string;
  explanationDetail: string;
}

export interface S3S4Summary {
  sectionType: "section3" | "section4";
  total: number;
  score: number;
  accuracyPercentage: number;
  evaluations: S3QuestionEvaluation[] | S4QuestionEvaluation[];
}

function cleanInput(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .replace(/\s+/g, " ");
}

export function useLectureTracker() {
  // Section 3 states
  const [s3Selections, setS3Selections] = useState<Record<string, string>>({});
  const [s3Eliminated, setS3Eliminated] = useState<Record<string, string[]>>({});
  const [activeS3QuestionId, setActiveS3QuestionId] = useState<string | null>(null);

  // Section 4 states
  const [s4Inputs, setS4Inputs] = useState<Record<string, string>>({});
  const [activeSignpostIndex, setActiveSignpostIndex] = useState<number>(0);
  const [showSignpostRadar, setShowSignpostRadar] = useState<boolean>(true);

  // Common states
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [summary, setSummary] = useState<S3S4Summary | null>(null);

  const selectS3Option = useCallback((questionId: string, optionId: string) => {
    setS3Selections((prev) => ({ ...prev, [questionId]: optionId }));
    setIsSubmitted(false);
  }, []);

  const toggleEliminateS3Option = useCallback(
    (questionId: string, optionId: string) => {
      setS3Eliminated((prev) => {
        const list = prev[questionId] || [];
        const isAlready = list.includes(optionId);
        const updated = isAlready
          ? list.filter((id) => id !== optionId)
          : [...list, optionId];
        return { ...prev, [questionId]: updated };
      });
    },
    []
  );

  const setS4Input = useCallback((questionId: string, value: string) => {
    setS4Inputs((prev) => ({ ...prev, [questionId]: value }));
    setIsSubmitted(false);
  }, []);

  const toggleSignpostRadar = useCallback(() => {
    setShowSignpostRadar((prev) => !prev);
  }, []);

  // Evaluate Section 3
  const evaluateSection3 = useCallback(
    async (task: Section3Task) => {
      let score = 0;
      const evals: S3QuestionEvaluation[] = [];

      for (const q of task.questions) {
        const userChoice = s3Selections[q.id] || "";
        const isCorrect = userChoice === q.correctOptionId;

        if (isCorrect) {
          score++;
        } else {
          // Log to error bank
          try {
            const selectedOpt = q.options.find((o) => o.id === userChoice);
            const correctOpt = q.options.find((o) => o.id === q.correctOptionId);

            const errorItem: ErrorItem = {
              id: `err_lis_s3_${Date.now()}_${q.id}`,
              sourceModule: "listening",
              errorType: "careless_reading",
              questionContext: `[Section 3 Group Consensus - ${task.title}] Câu ${q.questionNumber}: ${q.prompt}`,
              userWrongAnswer: selectedOpt
                ? `Option ${selectedOpt.letter}: ${selectedOpt.text}`
                : "Chưa chọn đáp án",
              correctAnswer: correctOpt
                ? `Option ${correctOpt.letter}: ${correctOpt.text}`
                : "Option C",
              deepExplanation: `[${q.trapTitleVi}] ${q.explanationMarkdown}`,
              mastered: false,
              retryCount: 0,
              createdAt: new Date().toISOString(),
            };

            await db.error_bank.put(errorItem);
          } catch (err) {
            console.error("Failed to auto-save Section 3 error to DB:", err);
          }
        }

        evals.push({
          questionId: q.id,
          questionNumber: q.questionNumber,
          prompt: q.prompt,
          userSelectedOptionId: userChoice,
          correctOptionId: q.correctOptionId,
          isCorrect,
          trapTitleVi: q.trapTitleVi,
          explanationMarkdown: q.explanationMarkdown,
          options: q.options,
        });
      }

      const total = task.questions.length;
      const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

      const sum: S3S4Summary = {
        sectionType: "section3",
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
          id: `prac_lis_s3_${Date.now()}`,
          type: "split_listening",
          materialId: task.id,
          score,
          timeSpentSeconds: 160,
          accuracyPercentage: accuracy,
          createdAt: new Date().toISOString(),
        };
        await db.practice_logs.put(log);
      } catch (logErr) {
        console.error("Failed to save Section 3 practice log:", logErr);
      }

      return sum;
    },
    [s3Selections]
  );

  // Evaluate Section 4
  const evaluateSection4 = useCallback(
    async (task: Section4Task) => {
      let score = 0;
      const evals: S4QuestionEvaluation[] = [];

      for (const q of task.questions) {
        const rawInput = s4Inputs[q.id] || "";
        const cleaned = cleanInput(rawInput);
        const wordCount = cleaned.split(/\s+/).filter(Boolean).length;
        const isWordLimitExceeded = wordCount > 1;

        const isCorrect =
          !isWordLimitExceeded &&
          q.expectedAnswers.some((ans) => cleanInput(ans) === cleaned);

        if (isCorrect) {
          score++;
        } else {
          // Log to error bank
          try {
            const errorType: ErrorClassification = isWordLimitExceeded
              ? "careless_reading"
              : "paraphrase_trap";

            const explanation = isWordLimitExceeded
              ? `[Lỗi Quá Giới Hạn Từ] Đề bài yêu cầu ONE WORD ONLY nhưng bạn đã điền ${wordCount} từ. ${q.explanationDetail}`
              : `[Lỗi Ghi Chú Bài Giảng] Từ báo hiệu chuyển ý: "${q.signpostCue}". ${q.explanationDetail}`;

            const errorItem: ErrorItem = {
              id: `err_lis_s4_${Date.now()}_${q.id}`,
              sourceModule: "listening",
              errorType,
              questionContext: `[Section 4 Lecture Notes - ${task.title}] Câu ${q.questionNumber}`,
              userWrongAnswer: rawInput || "Chưa điền đáp án",
              correctAnswer: q.expectedAnswers.join(" / "),
              deepExplanation: explanation,
              mastered: false,
              retryCount: 0,
              createdAt: new Date().toISOString(),
            };

            await db.error_bank.put(errorItem);
          } catch (err) {
            console.error("Failed to auto-save Section 4 error to DB:", err);
          }
        }

        evals.push({
          questionId: q.id,
          questionNumber: q.questionNumber,
          userInput: rawInput,
          isCorrect,
          isWordLimitExceeded,
          expectedAnswers: q.expectedAnswers,
          signpostCue: q.signpostCue,
          explanationDetail: q.explanationDetail,
        });
      }

      const total = task.questions.length;
      const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

      const sum: S3S4Summary = {
        sectionType: "section4",
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
          id: `prac_lis_s4_${Date.now()}`,
          type: "split_listening",
          materialId: task.id,
          score,
          timeSpentSeconds: 190,
          accuracyPercentage: accuracy,
          createdAt: new Date().toISOString(),
        };
        await db.practice_logs.put(log);
      } catch (logErr) {
        console.error("Failed to save Section 4 practice log:", logErr);
      }

      return sum;
    },
    [s4Inputs]
  );

  const resetAll = useCallback(() => {
    setS3Selections({});
    setS3Eliminated({});
    setActiveS3QuestionId(null);
    setS4Inputs({});
    setIsSubmitted(false);
    setSummary(null);
  }, []);

  return {
    s3Selections,
    s3Eliminated,
    activeS3QuestionId,
    s4Inputs,
    activeSignpostIndex,
    showSignpostRadar,
    isSubmitted,
    summary,
    selectS3Option,
    toggleEliminateS3Option,
    setActiveS3QuestionId,
    setS4Input,
    setActiveSignpostIndex,
    toggleSignpostRadar,
    evaluateSection3,
    evaluateSection4,
    resetAll,
  };
}
