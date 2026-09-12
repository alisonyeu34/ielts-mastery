"use client";

import { useState, useCallback } from "react";
import { HeadingsPassage, HeadingItem } from "@/data/mockHeadingsPassages";
import { db } from "@/lib/db";
import { ErrorItem, PracticeLog } from "@/types/database";

export interface ParagraphEvaluation {
  paragraphId: string;
  isCorrect: boolean;
  selectedHeadingId?: string;
  selectedHeadingTitle?: string;
  correctHeadingId: string;
  correctHeadingTitle: string;
  trapType?: string;
  trapTitleVi?: string;
  trapExplanation?: string;
  explanationMarkdown: string;
}

export interface MatchingHeadingsSummary {
  total: number;
  score: number;
  accuracyPercentage: number;
  evaluations: ParagraphEvaluation[];
}

export function useMatchingHeadings() {
  const [assignedHeadings, setAssignedHeadings] = useState<Record<string, string>>({});
  const [selectedHeadingId, setSelectedHeadingId] = useState<string | null>(null);
  const [showStructureAnalysis, setShowStructureAnalysis] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [summary, setSummary] = useState<MatchingHeadingsSummary | null>(null);

  const selectHeading = useCallback((headingId: string) => {
    setSelectedHeadingId((prev) => (prev === headingId ? null : headingId));
  }, []);

  const assignHeading = useCallback((paragraphId: string, headingId: string) => {
    setAssignedHeadings((prev) => {
      const next = { ...prev };
      // If heading is already assigned to another paragraph, remove it from that paragraph
      Object.keys(next).forEach((pId) => {
        if (next[pId] === headingId) {
          delete next[pId];
        }
      });
      next[paragraphId] = headingId;
      return next;
    });
    setSelectedHeadingId(null);
    setIsSubmitted(false);
  }, []);

  const removeHeading = useCallback((paragraphId: string) => {
    setAssignedHeadings((prev) => {
      const next = { ...prev };
      delete next[paragraphId];
      return next;
    });
    setIsSubmitted(false);
  }, []);

  const toggleStructureAnalysis = useCallback(() => {
    setShowStructureAnalysis((prev) => !prev);
  }, []);

  const evaluateSubmission = useCallback(
    async (passage: HeadingsPassage) => {
      let correctScore = 0;
      const evaluations: ParagraphEvaluation[] = [];

      for (const p of passage.paragraphs) {
        const userHeadingId = assignedHeadings[p.id];
        const isCorrect = userHeadingId === p.correctHeadingId;

        const correctHeading = passage.headings.find(
          (h) => h.id === p.correctHeadingId
        );
        const selectedHeading = passage.headings.find(
          (h) => h.id === userHeadingId
        );

        if (isCorrect) {
          correctScore++;
        } else {
          // Log to error bank
          try {
            const errorItem: ErrorItem = {
              id: `err_hdg_${Date.now()}_${p.id}`,
              sourceModule: "reading",
              errorType:
                selectedHeading?.trapType === "word_match"
                  ? "paraphrase_trap"
                  : "careless_reading",
              questionContext: `[Matching Headings - ${passage.title}] Đoạn ${p.id}`,
              userWrongAnswer: selectedHeading
                ? `${selectedHeading.romanNumeral}. ${selectedHeading.title}`
                : "Chưa chọn tiêu đề",
              correctAnswer: correctHeading
                ? `${correctHeading.romanNumeral}. ${correctHeading.title}`
                : "",
              deepExplanation: `${
                selectedHeading?.trapTitleVi
                  ? `[${selectedHeading.trapTitleVi}] ${selectedHeading.trapExplanation}`
                  : ""
              } ${p.explanationMarkdown}`,
              mastered: false,
              retryCount: 0,
              createdAt: new Date().toISOString(),
            };

            await db.error_bank.put(errorItem);
          } catch (e) {
            console.error("Failed to auto-save headings error to DB:", e);
          }
        }

        evaluations.push({
          paragraphId: p.id,
          isCorrect,
          selectedHeadingId: userHeadingId,
          selectedHeadingTitle: selectedHeading
            ? `${selectedHeading.romanNumeral}. ${selectedHeading.title}`
            : undefined,
          correctHeadingId: p.correctHeadingId,
          correctHeadingTitle: correctHeading
            ? `${correctHeading.romanNumeral}. ${correctHeading.title}`
            : "",
          trapType: selectedHeading?.trapType,
          trapTitleVi: selectedHeading?.trapTitleVi,
          trapExplanation: selectedHeading?.trapExplanation,
          explanationMarkdown: p.explanationMarkdown,
        });
      }

      const total = passage.paragraphs.length;
      const accuracy = total > 0 ? Math.round((correctScore / total) * 100) : 0;

      const sum: MatchingHeadingsSummary = {
        total,
        score: correctScore,
        accuracyPercentage: accuracy,
        evaluations,
      };

      setSummary(sum);
      setIsSubmitted(true);

      // Save to practice_logs
      try {
        const log: PracticeLog = {
          id: `prac_hdg_${Date.now()}`,
          type: "split_reading",
          materialId: passage.id,
          score: correctScore,
          timeSpentSeconds: 600,
          accuracyPercentage: accuracy,
          createdAt: new Date().toISOString(),
        };
        await db.practice_logs.put(log);
      } catch (err) {
        console.error("Failed to save headings practice log:", err);
      }

      return sum;
    },
    [assignedHeadings]
  );

  const resetAll = useCallback(() => {
    setAssignedHeadings({});
    setSelectedHeadingId(null);
    setIsSubmitted(false);
    setSummary(null);
  }, []);

  return {
    assignedHeadings,
    selectedHeadingId,
    showStructureAnalysis,
    isSubmitted,
    summary,
    selectHeading,
    assignHeading,
    removeHeading,
    toggleStructureAnalysis,
    evaluateSubmission,
    resetAll,
  };
}
