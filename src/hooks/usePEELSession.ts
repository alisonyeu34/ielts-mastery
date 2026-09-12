"use client";

import { useState, useCallback, useMemo } from "react";
import {
  MOCK_TASK2_PEEL_PROMPTS,
  Task2PEELPrompt,
  ACADEMIC_CONNECTORS,
} from "@/data/mockTask2PEELData";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem, VocabCard } from "@/types/database";

export type PEELStage = "prompt_analysis" | "thesis_draft" | "peel_writing" | "completed";

export function usePEELSession() {
  const prompts = MOCK_TASK2_PEEL_PROMPTS;
  const [selectedPromptId, setSelectedPromptId] = useState<string>(prompts[0].id);
  const [stage, setStage] = useState<PEELStage>("prompt_analysis");

  // Step 1: Prompt Deconstruction Inputs
  const [deconstruction, setDeconstruction] = useState({
    generalTopic: "",
    microTopic: "",
    instruction: "",
  });

  // Step 2: Introduction Inputs
  const [intro, setIntro] = useState({
    backgroundParaphrase: "",
    thesisStatement: "",
  });

  // Step 3: PEEL Segments
  const [peelParts, setPEELParts] = useState({
    point: "",
    explain: "",
    example: "",
    link: "",
  });

  // Modals & Drawers
  const [showAssessmentModal, setShowAssessmentModal] = useState<boolean>(false);
  const [showConnectorDrawer, setShowConnectorDrawer] = useState<boolean>(false);

  const currentPrompt = useMemo<Task2PEELPrompt>(() => {
    return prompts.find((p) => p.id === selectedPromptId) || prompts[0];
  }, [prompts, selectedPromptId]);

  // Helpers to count words
  const countWords = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  };

  const wordStats = useMemo(() => {
    const pointCount = countWords(peelParts.point);
    const explainCount = countWords(peelParts.explain);
    const exampleCount = countWords(peelParts.example);
    const linkCount = countWords(peelParts.link);
    const totalCount = pointCount + explainCount + exampleCount + linkCount;

    return {
      pointCount,
      explainCount,
      exampleCount,
      linkCount,
      totalCount,
      // Target percentages: Point ~15%, Explain ~50%, Example ~25%, Link ~10%
      pointRatio: totalCount > 0 ? Math.round((pointCount / totalCount) * 100) : 0,
      explainRatio: totalCount > 0 ? Math.round((explainCount / totalCount) * 100) : 0,
      exampleRatio: totalCount > 0 ? Math.round((exampleCount / totalCount) * 100) : 0,
      linkRatio: totalCount > 0 ? Math.round((linkCount / totalCount) * 100) : 0,
    };
  }, [peelParts]);

  // Linting and Diagnostics
  const diagnostics = useMemo(() => {
    const fullParagraph = `${peelParts.point} ${peelParts.explain} ${peelParts.example} ${peelParts.link}`;

    // 1. Personal Pronoun check in Example (I, me, my, our, us)
    const personalPronounRegex = /\b(I|me|my|mine|myself|our|us|ours)\b/i;
    const hasPersonalExample = personalPronounRegex.test(peelParts.example);

    // 2. Listing Trap check inside Explain block (firstly, secondly, furthermore, in addition)
    const listingTrapRegex = /\b(firstly|secondly|thirdly|furthermore|in addition|also|another reason|moreover)\b/i;
    const hasListingTrap = listingTrapRegex.test(peelParts.explain);

    // 3. Causal Chain connectors check in Explain block
    const causalRegex = /\b(because|consequently|therefore|as a result|leading to|thereby|precipitates|stems from|attributable to|ensures|triggers)\b/i;
    const hasCausalLogic = causalRegex.test(peelParts.explain);

    // 4. Bad Neutral Thesis check
    const isOpinionOrOutweigh =
      currentPrompt.type === "opinion" || currentPrompt.type === "advantage_outweigh";
    const neutralThesisRegex = /\b(both sides|discuss both|pros and cons|advantages and disadvantages|before reaching a conclusion)\b/i;
    const hasNeutralThesis =
      isOpinionOrOutweigh &&
      intro.thesisStatement.length > 15 &&
      neutralThesisRegex.test(intro.thesisStatement);

    // Score estimation (1 to 9 Band scale)
    let estimatedBand = 6.0;
    if (wordStats.totalCount >= 85 && wordStats.totalCount <= 150) estimatedBand += 0.5;
    if (hasCausalLogic && wordStats.explainCount >= 35) estimatedBand += 0.5;
    if (!hasPersonalExample && wordStats.exampleCount >= 15) estimatedBand += 0.5;
    if (!hasListingTrap) estimatedBand += 0.5;
    if (hasNeutralThesis) estimatedBand -= 1.0;
    if (hasPersonalExample) estimatedBand -= 0.5;
    if (hasListingTrap) estimatedBand -= 0.5;

    estimatedBand = Math.min(8.5, Math.max(5.0, estimatedBand));

    return {
      hasPersonalExample,
      hasListingTrap,
      hasCausalLogic,
      hasNeutralThesis,
      estimatedBand,
      fullParagraph: fullParagraph.trim(),
    };
  }, [peelParts, intro.thesisStatement, wordStats, currentPrompt.type]);

  // Insert Connector into Explain box
  const insertConnector = useCallback((connector: string) => {
    setPEELParts((prev) => ({
      ...prev,
      explain: prev.explain ? `${prev.explain} ${connector}` : connector,
    }));
  }, []);

  // Update segments
  const updatePEEL = useCallback(
    (key: "point" | "explain" | "example" | "link", text: string) => {
      setPEELParts((prev) => ({
        ...prev,
        [key]: text,
      }));
    },
    []
  );

  // Submit and Save to Dexie DB
  const submitParagraph = useCallback(async () => {
    setStage("completed");
    setShowAssessmentModal(true);

    // Save Practice Log
    try {
      const log: PracticeLog = {
        id: `log_peel_${Date.now()}`,
        type: "task2_peel_drill",
        materialId: currentPrompt.id,
        score: Math.round(diagnostics.estimatedBand * 10),
        accuracyPercentage: Math.round((diagnostics.estimatedBand / 9.0) * 100),
        timeSpentSeconds: 300,
        createdAt: new Date().toISOString(),
      };
      await db.practice_logs.put(log);
    } catch (e) {
      console.error("Error saving PEEL practice log:", e);
    }

    // Save Error Bank Items if traps detected
    if (diagnostics.hasPersonalExample) {
      try {
        await db.error_bank.put({
          id: `err_peel_personal_${Date.now()}`,
          sourceModule: "writing",
          errorType: "grammar",
          questionContext: `Writing Task 2 PEEL Example: ${currentPrompt.promptText}`,
          userWrongAnswer: peelParts.example,
          correctAnswer: currentPrompt.samplePEEL.example,
          deepExplanation:
            "Ví dụ của bạn chứa đại từ nhân xưng phi học thuật (I, me, my). Trong IELTS Academic, hãy nâng cấp thành nghiên cứu thực nghiệm (Empirical studies) hoặc số liệu thống kê ngành.",
          mastered: false,
          retryCount: 0,
          consecutiveSuccesses: 0,
          createdAt: new Date().toISOString(),
        });
      } catch (e) {
        console.error("Error saving personal example error:", e);
      }
    }

    if (diagnostics.hasListingTrap) {
      try {
        await db.error_bank.put({
          id: `err_peel_listing_${Date.now()}`,
          sourceModule: "writing",
          errorType: "grammar",
          questionContext: `Writing Task 2 Listing Trap: ${currentPrompt.promptText}`,
          userWrongAnswer: peelParts.explain,
          correctAnswer: currentPrompt.samplePEEL.explain,
          deepExplanation:
            "Bạn đã mắc bẫy Liệt Kê Ý (Listing Trap) khi dùng các liên từ 'furthermore, also, secondly' trong một đoạn thân bài. 1 Đoạn PEEL chỉ được chứa 1 luận điểm duy nhất và đào sâu chuỗi nhân quả.",
          mastered: false,
          retryCount: 0,
          consecutiveSuccesses: 0,
          createdAt: new Date().toISOString(),
        });
      } catch (e) {
        console.error("Error saving listing trap error:", e);
      }
    }

    if (diagnostics.hasNeutralThesis) {
      try {
        await db.error_bank.put({
          id: `err_peel_neutral_thesis_${Date.now()}`,
          sourceModule: "writing",
          errorType: "careless_reading",
          questionContext: `Writing Task 2 Neutral Thesis: ${currentPrompt.promptText}`,
          userWrongAnswer: intro.thesisStatement,
          correctAnswer: currentPrompt.thesisGuidance.modelThesisStatement,
          deepExplanation:
            "Lập luận trung lập (Fencing-sitting) trong đề bài Opinion. Bạn cần nêu rõ mức độ đồng ý/không đồng ý dứt khoát ngay tại Mở bài.",
          mastered: false,
          retryCount: 0,
          consecutiveSuccesses: 0,
          createdAt: new Date().toISOString(),
        });
      } catch (e) {
        console.error("Error saving neutral thesis error:", e);
      }
    }
  }, [currentPrompt, diagnostics, peelParts, intro]);

  // Save Connectors to FSRS
  const saveConnectorsToFSRS = useCallback(async () => {
    for (const item of ACADEMIC_CONNECTORS) {
      const card: VocabCard = {
        id: `vocab_connector_${item.connector.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
        word: item.connector,
        ipa: "/kəˈnek.tər/",
        meaning: item.meaningVi,
        collocations: [item.connector, item.categoryVi],
        originalContext: item.exampleInTask2,
        category: "c1_academic",
        status: "new",
        stepInterval: 1,
        nextReviewDate: new Date(Date.now() + 86400000).toISOString(),
        repetitionCount: 0,
        lapsesCount: 0,
        stability: 1.0,
        difficulty: 5.0,
        sourceModule: "writing",
        createdAt: new Date().toISOString(),
      };
      try {
        await db.vocab_matrix.put(card);
      } catch (e) {
        console.error("Error saving connector vocab:", e);
      }
    }
  }, []);

  const selectPrompt = useCallback((id: string) => {
    setSelectedPromptId(id);
    setStage("prompt_analysis");
    setDeconstruction({ generalTopic: "", microTopic: "", instruction: "" });
    setIntro({ backgroundParaphrase: "", thesisStatement: "" });
    setPEELParts({ point: "", explain: "", example: "", link: "" });
    setShowAssessmentModal(false);
  }, []);

  const resetSession = useCallback(() => {
    setStage("prompt_analysis");
    setDeconstruction({ generalTopic: "", microTopic: "", instruction: "" });
    setIntro({ backgroundParaphrase: "", thesisStatement: "" });
    setPEELParts({ point: "", explain: "", example: "", link: "" });
    setShowAssessmentModal(false);
  }, []);

  return {
    prompts,
    currentPrompt,
    stage,
    deconstruction,
    intro,
    peelParts,
    wordStats,
    diagnostics,
    showAssessmentModal,
    showConnectorDrawer,
    setStage,
    setDeconstruction,
    setIntro,
    updatePEEL,
    insertConnector,
    selectPrompt,
    submitParagraph,
    resetSession,
    saveConnectorsToFSRS,
    setShowAssessmentModal,
    setShowConnectorDrawer,
  };
}
