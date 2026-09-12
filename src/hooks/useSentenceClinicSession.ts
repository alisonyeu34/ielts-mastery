"use client";

import { useState, useCallback, useMemo } from "react";
import { MOCK_SENTENCE_SURGERY_CASES, SentenceSurgeryCase } from "@/data/mockSentenceSurgeryData";
import { MOCK_PARAPHRASE_DRILLS, ParaphraseDrillItem } from "@/data/mockParaphraseDrillsData";
import { diagnoseSentenceFault, SentenceDiagnosticResult } from "@/lib/sentenceDiagnosticParser";
import { verifyParaphrase, ParaphraseVerificationResult } from "@/lib/paraphraseVerifier";
import { db } from "@/lib/db";

export type ClinicMode = "surgery" | "paraphrase";

export interface SurgeryAttemptRecord {
  caseId: string;
  category: string;
  originalBuggy: string;
  userRevised: string;
  score: number;
  estimatedBand: number;
  hasErrors: boolean;
  collocationsUsed: string[];
  timestamp: string;
}

export function useSentenceClinicSession() {
  const [activeMode, setActiveMode] = useState<ClinicMode>("surgery");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Surgery State
  const [currentSurgeryIndex, setCurrentSurgeryIndex] = useState<number>(0);
  const [surgeryDraft, setSurgeryDraft] = useState<string>("");
  const [surgeryResult, setSurgeryResult] = useState<SentenceDiagnosticResult | null>(null);
  
  // Paraphrase State
  const [currentParaphraseIndex, setCurrentParaphraseIndex] = useState<number>(0);
  const [paraphraseDraft, setParaphraseDraft] = useState<string>("");
  const [paraphraseResult, setParaphraseResult] = useState<ParaphraseVerificationResult | null>(null);

  // Modals & History
  const [isDiffModalOpen, setIsDiffModalOpen] = useState<boolean>(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);
  const [surgeryHistory, setSurgeryHistory] = useState<SurgeryAttemptRecord[]>([]);
  const [errorBankLoggedCount, setErrorBankLoggedCount] = useState<number>(0);

  const filteredSurgeryCases = useMemo(() => {
    if (selectedCategory === "all") return MOCK_SENTENCE_SURGERY_CASES;
    return MOCK_SENTENCE_SURGERY_CASES.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  const currentSurgeryCase: SentenceSurgeryCase =
    filteredSurgeryCases[currentSurgeryIndex] || filteredSurgeryCases[0] || MOCK_SENTENCE_SURGERY_CASES[0];

  const currentParaphraseDrill: ParaphraseDrillItem =
    MOCK_PARAPHRASE_DRILLS[currentParaphraseIndex] || MOCK_PARAPHRASE_DRILLS[0];

  const handleEvaluateSurgery = useCallback(() => {
    if (!surgeryDraft.trim()) return;
    const result = diagnoseSentenceFault(surgeryDraft, currentSurgeryCase.category);
    setSurgeryResult(result);
  }, [surgeryDraft, currentSurgeryCase]);

  const handleEvaluateParaphrase = useCallback(() => {
    if (!paraphraseDraft.trim()) return;
    const result = verifyParaphrase(
      currentParaphraseDrill.originalSentence,
      paraphraseDraft,
      currentParaphraseDrill.technique,
      currentParaphraseDrill.targetTerm,
      currentParaphraseDrill.requiredKeyword
    );
    setParaphraseResult(result);
  }, [paraphraseDraft, currentParaphraseDrill]);

  const handleApplyCollocation = useCallback((collocation: string) => {
    if (activeMode === "surgery") {
      setSurgeryDraft((prev) => {
        const trimmed = prev.trim();
        return trimmed ? (trimmed + " " + collocation) : collocation;
      });
    } else {
      setParaphraseDraft((prev) => {
        const trimmed = prev.trim();
        return trimmed ? (trimmed + " " + collocation) : collocation;
      });
    }
  }, [activeMode]);

  const handleSyncCollocationToFSRS = useCallback(async (collocation: string, topic: string) => {
    const today = new Date().toISOString().split("T")[0];
    await db.vocab_matrix.put({
      id: "vocab_colloc_" + Date.now() + "_" + collocation.replace(/\s+/g, "_").toLowerCase(),
      word: collocation,
      ipa: "/kəˈlɒk.ə.əl/",
      meaning: "Cụm từ học thuật C1 (Chủ đề: " + topic + ")",
      collocations: [collocation],
      originalContext: "Sử dụng trong câu văn học thuật chủ đề " + topic + ".",
      category: "c1_academic",
      status: "new",
      stepInterval: 1,
      nextReviewDate: today,
      repetitionCount: 0,
      lapsesCount: 0,
      stability: 2.0,
      difficulty: 4.5,
      createdAt: new Date().toISOString(),
    });
  }, []);

  const handleSaveAndAdvanceSurgery = useCallback(async () => {
    if (!surgeryResult) return;

    const usedCollocs = currentSurgeryCase.collocationPalette.filter((c) =>
      surgeryDraft.toLowerCase().includes(c.toLowerCase())
    );

    const attempt: SurgeryAttemptRecord = {
      caseId: currentSurgeryCase.id,
      category: currentSurgeryCase.category,
      originalBuggy: currentSurgeryCase.buggySentence,
      userRevised: surgeryDraft,
      score: surgeryResult.score,
      estimatedBand: surgeryResult.estimatedBand,
      hasErrors: surgeryResult.hasErrors,
      collocationsUsed: usedCollocs,
      timestamp: new Date().toISOString(),
    };

    setSurgeryHistory((prev) => [...prev, attempt]);

    await db.practice_logs.put({
      id: "log_surgery_" + Date.now() + "_" + currentSurgeryCase.id,
      type: "sentence_clinic",
      materialId: currentSurgeryCase.id,
      title: "Sentence Surgery: " + currentSurgeryCase.pathologyTitle,
      score: surgeryResult.score,
      totalQuestions: 1,
      accuracyPercentage: surgeryResult.score,
      timeSpentSeconds: 60,
      createdAt: new Date().toISOString(),
    });

    if (!surgeryResult.isClearOfCriticalFlaws) {
      setErrorBankLoggedCount((prev) => prev + 1);
      await db.error_bank.put({
        id: "err_surgery_" + Date.now() + "_" + currentSurgeryCase.id,
        sourceModule: "grammar",
        errorType: "grammar",
        questionContext: "[Sentence Surgery] " + currentSurgeryCase.pathologyTitle,
        userWrongAnswer: surgeryDraft,
        correctAnswer: currentSurgeryCase.modelSolutions.band70,
        deepExplanation: currentSurgeryCase.pedagogicalAnalysis,
        mastered: false,
        retryCount: 0,
        createdAt: new Date().toISOString(),
      });
    }

    if (currentSurgeryIndex < filteredSurgeryCases.length - 1) {
      setCurrentSurgeryIndex((p) => p + 1);
      setSurgeryDraft("");
      setSurgeryResult(null);
    } else {
      setIsSummaryModalOpen(true);
    }
  }, [surgeryResult, surgeryDraft, currentSurgeryCase, currentSurgeryIndex, filteredSurgeryCases.length]);

  const handleSaveAndAdvanceParaphrase = useCallback(async () => {
    if (!paraphraseResult) return;

    await db.practice_logs.put({
      id: "log_para_" + Date.now() + "_" + currentParaphraseDrill.id,
      type: "paraphrase",
      materialId: currentParaphraseDrill.id,
      title: "Paraphrase (" + currentParaphraseDrill.techniqueName + "): " + currentParaphraseDrill.topic,
      score: paraphraseResult.score,
      totalQuestions: 1,
      accuracyPercentage: paraphraseResult.score,
      timeSpentSeconds: 60,
      createdAt: new Date().toISOString(),
    });

    if (paraphraseResult.score < 70) {
      setErrorBankLoggedCount((prev) => prev + 1);
      await db.error_bank.put({
        id: "err_para_" + Date.now() + "_" + currentParaphraseDrill.id,
        sourceModule: "writing",
        errorType: "paraphrase_trap",
        questionContext: "[Paraphrase Drill - " + currentParaphraseDrill.techniqueName + "] " + currentParaphraseDrill.originalSentence,
        userWrongAnswer: paraphraseDraft,
        correctAnswer: currentParaphraseDrill.benchmarks.band75,
        deepExplanation: currentParaphraseDrill.examinerPedagogy,
        mastered: false,
        retryCount: 0,
        createdAt: new Date().toISOString(),
      });
    }

    if (currentParaphraseIndex < MOCK_PARAPHRASE_DRILLS.length - 1) {
      setCurrentParaphraseIndex((p) => p + 1);
      setParaphraseDraft("");
      setParaphraseResult(null);
    } else {
      setIsSummaryModalOpen(true);
    }
  }, [paraphraseResult, paraphraseDraft, currentParaphraseDrill, currentParaphraseIndex]);

  const handleResetSession = useCallback(() => {
    setCurrentSurgeryIndex(0);
    setSurgeryDraft("");
    setSurgeryResult(null);
    setCurrentParaphraseIndex(0);
    setParaphraseDraft("");
    setParaphraseResult(null);
    setSurgeryHistory([]);
    setErrorBankLoggedCount(0);
    setIsSummaryModalOpen(false);
  }, []);

  return {
    activeMode,
    setActiveMode,
    selectedCategory,
    setSelectedCategory,
    currentSurgeryIndex,
    setCurrentSurgeryIndex,
    currentSurgeryCase,
    totalSurgeryCases: filteredSurgeryCases.length,
    surgeryDraft,
    setSurgeryDraft,
    surgeryResult,
    handleEvaluateSurgery,
    handleSaveAndAdvanceSurgery,
    currentParaphraseIndex,
    setCurrentParaphraseIndex,
    currentParaphraseDrill,
    totalParaphraseDrills: MOCK_PARAPHRASE_DRILLS.length,
    paraphraseDraft,
    setParaphraseDraft,
    paraphraseResult,
    handleEvaluateParaphrase,
    handleSaveAndAdvanceParaphrase,
    handleApplyCollocation,
    handleSyncCollocationToFSRS,
    isDiffModalOpen,
    setIsDiffModalOpen,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    surgeryHistory,
    errorBankLoggedCount,
    handleResetSession,
  };
}
