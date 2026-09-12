"use client";

import { useState, useCallback, useMemo } from "react";
import {
  ToulminElements,
  ToulminPromptData,
  MOCK_TOULMIN_PROMPTS,
  RebuttalTacticKey,
} from "@/data/mockToulminPrompts";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem } from "@/types/database";

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

export interface ArgumentIntegrityReport {
  isValid: boolean;
  score: number;
  warnings: string[];
  hasMissingWarrant: boolean;
  hasOrphanedCounter: boolean;
  isWordCountSufficient: boolean;
}

export function validateToulminIntegrity(elements: ToulminElements): ArgumentIntegrityReport {
  const warnings: string[] = [];
  let score = 9.0;

  const hasData = elements.data.trim().length > 15;
  const hasWarrant = elements.warrant.trim().length > 15;
  const hasCounter = elements.counterArgument.trim().length > 15;
  const hasRebuttal = elements.rebuttal.trim().length > 15;
  const hasClaim = elements.claim.trim().length > 15;

  const totalWords =
    countWords(elements.claim) +
    countWords(elements.data) +
    countWords(elements.warrant) +
    countWords(elements.backing) +
    countWords(elements.counterArgument) +
    countWords(elements.rebuttal);

  const isWordCountSufficient = totalWords >= 90;

  let hasMissingWarrant = false;
  if (hasData && !hasWarrant) {
    hasMissingWarrant = true;
    score -= 2.0;
    warnings.push(
      "[Đứt Gãy Logic - Missing Warrant] Bạn đã đưa ra Dữ liệu (Data) nhưng chưa có Cầu nối logic (Warrant) để giải thích cơ chế vì sao Data dẫn tới Claim."
    );
  }

  let hasOrphanedCounter = false;
  if (hasCounter && !hasRebuttal) {
    hasOrphanedCounter = true;
    score -= 2.5;
    warnings.push(
      "[Tự Bắn Vào Chân - Orphaned Counter-Argument] Bạn đã nêu quan điểm đối lập (Counter-argument) nhưng quên viết câu Phản đòn bác bỏ (Rebuttal), làm suy yếu lập trường chính."
    );
  }

  if (!hasClaim) {
    score -= 2.0;
    warnings.push("[Thiếu Luận Điểm - Missing Claim] Đoạn văn chưa có câu Claim xác định quan điểm cốt lõi.");
  }

  if (!isWordCountSufficient) {
    score -= 1.0;
    warnings.push(`[Dung lượng chưa đạt] Đoạn văn hiện tại có ${totalWords} từ (Chuẩn yêu cầu: 90 - 130 từ).`);
  }

  return {
    isValid: warnings.length === 0,
    score: Math.max(5.0, Math.min(9.0, score)),
    warnings,
    hasMissingWarrant,
    hasOrphanedCounter,
    isWordCountSufficient,
  };
}

export function useToulminBuilder() {
  const [activePromptId, setActivePromptId] = useState<string>("toulmin_automation_tax");
  const [templateStyle, setTemplateStyle] = useState<"standard" | "counter_first">("standard");

  const [toulminData, setToulminData] = useState<ToulminElements>({
    claim: "",
    data: "",
    warrant: "",
    backing: "",
    counterArgument: "",
    rebuttal: "",
  });

  const [drillSelection, setDrillSelection] = useState<{
    selectedCounterId: string;
    selectedTactic: RebuttalTacticKey;
    userRebuttal: string;
  }>({
    selectedCounterId: "ca_unemployment_shock",
    selectedTactic: "feasibility",
    userRebuttal: "",
  });

  const [isAssembled, setIsAssembled] = useState<boolean>(false);

  const activePrompt: ToulminPromptData = useMemo(() => {
    return (
      MOCK_TOULMIN_PROMPTS.find((p) => p.id === activePromptId) ||
      MOCK_TOULMIN_PROMPTS[0]
    );
  }, [activePromptId]);

  const totalWords = useMemo(() => {
    return (
      countWords(toulminData.claim) +
      countWords(toulminData.data) +
      countWords(toulminData.warrant) +
      countWords(toulminData.backing) +
      countWords(toulminData.counterArgument) +
      countWords(toulminData.rebuttal)
    );
  }, [toulminData]);

  const integrityReport = useMemo(() => {
    return validateToulminIntegrity(toulminData);
  }, [toulminData]);

  const setToulminField = useCallback(
    (field: keyof ToulminElements, value: string) => {
      setToulminData((prev) => ({ ...prev, [field]: value }));
      setIsAssembled(false);
    },
    []
  );

  const loadSampleToulmin = useCallback(() => {
    setToulminData({ ...activePrompt.sampleToulmin });
    setIsAssembled(false);
  }, [activePrompt]);

  const assembleText = useMemo(() => {
    if (templateStyle === "standard") {
      const parts = [
        toulminData.claim,
        toulminData.data,
        toulminData.warrant ? `The underlying mechanism is that ${toulminData.warrant.toLowerCase()}` : "",
        toulminData.backing ? `This principle is supported by ${toulminData.backing.toLowerCase()}` : "",
        toulminData.counterArgument,
        toulminData.rebuttal,
      ].filter(Boolean);
      return parts.join(" ");
    } else {
      const parts = [
        toulminData.counterArgument,
        toulminData.rebuttal,
        toulminData.claim ? `In reality, ${toulminData.claim.toLowerCase()}` : "",
        toulminData.data,
        toulminData.warrant ? `The fundamental rationale is that ${toulminData.warrant.toLowerCase()}` : "",
        toulminData.backing ? `Consequently, ${toulminData.backing.toLowerCase()}` : "",
      ].filter(Boolean);
      return parts.join(" ");
    }
  }, [toulminData, templateStyle]);

  const saveToulminDraft = useCallback(
    async (prompt: ToulminPromptData) => {
      setIsAssembled(true);

      // Check integrity issues and log to Error Bank
      if (integrityReport.hasMissingWarrant) {
        try {
          const errorItem: ErrorItem = {
            id: `err_warrant_${Date.now()}`,
            sourceModule: "writing",
            errorType: "careless_reading",
            questionContext: `[Toulmin Argumentation - ${prompt.topicTitle}] Missing Warrant Logic Connector`,
            userWrongAnswer: `Data: ${toulminData.data} (Không có Warrant)`,
            correctAnswer: prompt.sampleToulmin.warrant,
            deepExplanation:
              "[Lỗi Nhảy Cóc Logic] Đưa ra Dữ liệu (Data) nhưng không giải thích cơ chế Warrant kết nối với Luận điểm (Claim).",
            mastered: false,
            retryCount: 0,
            createdAt: new Date().toISOString(),
          };
          await db.error_bank.put(errorItem);
        } catch (e) {
          console.error("Failed to save Warrant error to DB:", e);
        }
      }

      if (integrityReport.hasOrphanedCounter) {
        try {
          const errorItem: ErrorItem = {
            id: `err_rebuttal_${Date.now()}`,
            sourceModule: "writing",
            errorType: "grammar",
            questionContext: `[Toulmin Argumentation - ${prompt.topicTitle}] Orphaned Counter-Argument`,
            userWrongAnswer: `Counter-Argument: ${toulminData.counterArgument} (Không có Rebuttal)`,
            correctAnswer: prompt.sampleToulmin.rebuttal,
            deepExplanation:
              "[Lỗi Thiếu Phản Đòn] Nêu quan điểm đối lập nhưng không có câu Bác bỏ (Rebuttal) làm suy yếu luận điểm chính của bài viết.",
            mastered: false,
            retryCount: 0,
            createdAt: new Date().toISOString(),
          };
          await db.error_bank.put(errorItem);
        } catch (e) {
          console.error("Failed to save Rebuttal error to DB:", e);
        }
      }

      // Save Practice Log
      try {
        const log: PracticeLog = {
          id: `prac_toulmin_${Date.now()}`,
          type: "writing",
          materialId: prompt.id,
          score: integrityReport.score,
          timeSpentSeconds: 900,
          accuracyPercentage: Math.min(100, Math.round((integrityReport.score / 9.0) * 100)),
          createdAt: new Date().toISOString(),
        };
        await db.practice_logs.put(log);
      } catch (err) {
        console.error("Failed to save Toulmin practice log:", err);
      }
    },
    [toulminData, integrityReport]
  );

  const resetAll = useCallback(() => {
    setToulminData({
      claim: "",
      data: "",
      warrant: "",
      backing: "",
      counterArgument: "",
      rebuttal: "",
    });
    setIsAssembled(false);
  }, []);

  return {
    activePromptId,
    activePrompt,
    templateStyle,
    toulminData,
    drillSelection,
    isAssembled,
    totalWords,
    integrityReport,
    assembleText,
    setActivePromptId,
    setTemplateStyle,
    setToulminField,
    setDrillSelection,
    loadSampleToulmin,
    saveToulminDraft,
    resetAll,
  };
}
