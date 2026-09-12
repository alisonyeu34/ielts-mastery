"use client";

import { useState, useCallback, useMemo } from "react";
import { db } from "@/lib/db";
import {
  MOCK_COHESION_DRILLS,
  CohesionDrillItem,
} from "@/data/mockCohesionDrillsData";
import {
  parseThemeRheme,
  ParagraphCohesionAnalysis,
} from "@/lib/themeRhemeParser";
import {
  detectAndRewriteMechanicalLinker,
  DetectedMechanicalLinker,
} from "@/lib/mechanicalLinkerDetector";

export function useThemeRhemeSession() {
  const [selectedDrill, setSelectedDrill] = useState<CohesionDrillItem>(
    MOCK_COHESION_DRILLS[0]
  );
  const [paragraphText, setParagraphText] = useState<string>(
    MOCK_COHESION_DRILLS[0].originalParagraph
  );
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false);

  // Analysis of current paragraph text
  const analysis: ParagraphCohesionAnalysis = useMemo(() => {
    return parseThemeRheme(paragraphText);
  }, [paragraphText]);

  // Detected mechanical linkers in each sentence
  const detectedMechanicalLinkers: DetectedMechanicalLinker[] = useMemo(() => {
    const list: DetectedMechanicalLinker[] = [];
    analysis.sentences.forEach((sent, idx) => {
      const prevContext = idx > 0 ? analysis.sentences[idx - 1].fullSentence : undefined;
      const detected = detectAndRewriteMechanicalLinker(sent.fullSentence, prevContext);
      if (detected) {
        list.push(detected);
      }
    });
    return list;
  }, [analysis.sentences]);

  // Select a preset drill
  const handleSelectDrill = useCallback((drill: CohesionDrillItem) => {
    setSelectedDrill(drill);
    setParagraphText(drill.originalParagraph);
  }, []);

  // Replace a mechanical sentence with a C1/C2 natural rewrite
  const applyRewriteOption = useCallback(
    (originalSentence: string, rewrittenSentence: string) => {
      setParagraphText((prev) => {
        return prev.replace(originalSentence, rewrittenSentence);
      });
    },
    []
  );

  // Load Band 8.5 Model Paragraph directly
  const loadBand8Model = useCallback(() => {
    setParagraphText(selectedDrill.band8RewrittenParagraph);
  }, [selectedDrill]);

  // Reset to original draft
  const resetToOriginalDraft = useCallback(() => {
    setParagraphText(selectedDrill.originalParagraph);
  }, [selectedDrill]);

  // Add C1 Nominalization phrase to Vocab Matrix (FSRS)
  const addNominalizationToVocab = useCallback(
    async (payload: {
      word: string;
      ipa: string;
      meaning: string;
      collocations: string[];
      originalContext: string;
    }) => {
      try {
        const today = new Date().toISOString().split("T")[0];
        await db.vocab_matrix.put({
          id: `vocab_nom_${Date.now()}`,
          word: payload.word,
          ipa: payload.ipa,
          meaning: payload.meaning,
          collocations: payload.collocations,
          originalContext: payload.originalContext,
          category: "c1_academic",
          status: "learning",
          stepInterval: 1,
          nextReviewDate: today,
          repetitionCount: 0,
          lapsesCount: 0,
          stability: 2.5,
          difficulty: 4.8,
          createdAt: new Date().toISOString(),
        });
        return true;
      } catch (err) {
        console.error("Failed to add nominalization to vocab matrix:", err);
        return false;
      }
    },
    []
  );

  // Save Cohesion Analysis to Practice Logs and Error Bank
  const saveCohesionLog = useCallback(async () => {
    setIsSummaryModalOpen(true);

    try {
      await db.practice_logs.put({
        id: `log_cohesion_${Date.now()}`,
        type: "writing_cohesion_drill",
        materialId: selectedDrill.id,
        title: `Coherence & Cohesion: ${selectedDrill.topicTitle}`,
        score: analysis.overallCohesionScore,
        totalQuestions: analysis.sentences.length,
        accuracyPercentage: analysis.overallCohesionScore,
        timeSpentSeconds: 120,
        details: {
          mechanicalLinkersCount: analysis.mechanicalLinkersCount,
          brokenPointsCount: analysis.brokenPointsCount,
          dominantPattern: analysis.dominantPattern,
          bandEstimate: analysis.bandEstimate,
        },
        createdAt: new Date().toISOString(),
      });

      // Auto-save to Error Bank if broken transitions or excessive mechanical linkers exist
      if (analysis.brokenPointsCount > 0 || analysis.mechanicalLinkersCount >= 3) {
        await db.error_bank.add({
          id: `err_cohesion_${Date.now()}`,
          sourceModule: "writing",
          errorType: "careless_reading",
          questionContext: `Cohesion Breakdown: ${selectedDrill.topicTitle}`,
          userWrongAnswer: `Mechanical Linkers: ${analysis.mechanicalLinkersCount}, Breakpoints: ${analysis.brokenPointsCount}`,
          correctAnswer: "Band 8.0+ Seamless Theme-Rheme Flow with Zero Mechanical Openers",
          deepExplanation: `Đoạn văn của bạn chứa ${analysis.mechanicalLinkersCount} liên từ thô và ${analysis.brokenPointsCount} điểm gãy mạch. Cần chuyển hóa thành cấu trúc Danh từ Tóm lược (Summary Nominalization) và Phân từ hiện tại nối dòng.`,
          mastered: false,
          retryCount: 0,
          createdAt: new Date().toISOString(),
        });
      }
    } catch (e) {
      console.error("Failed to save cohesion log:", e);
    }
  }, [analysis, selectedDrill]);

  return {
    selectedDrill,
    handleSelectDrill,
    paragraphText,
    setParagraphText,
    analysis,
    detectedMechanicalLinkers,
    applyRewriteOption,
    loadBand8Model,
    resetToOriginalDraft,
    addNominalizationToVocab,
    saveCohesionLog,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isPaletteOpen,
    setIsPaletteOpen,
  };
}
