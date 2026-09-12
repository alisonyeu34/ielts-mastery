"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Passage3EpistemicItem,
  EpistemicNodeType,
  SummaryEvaluationResult,
  evaluateSummaryAnswers
} from "@/lib/epistemicGraphParser";
import { MOCK_PASSAGE3_EPISTEMIC_DATA } from "@/data/mockPassage3EpistemicData";
import { db } from "@/lib/db";

export type EpistemicTab = 'graph' | 'constructs' | 'factions' | 'author_stance' | 'summary_matcher';

export function usePassage3EpistemicSession(initialPassageId?: string) {
  const [selectedPassageId, setSelectedPassageId] = useState<string>(
    initialPassageId || MOCK_PASSAGE3_EPISTEMIC_DATA[0].id
  );

  const currentPassage: Passage3EpistemicItem = useMemo(() => {
    return (
      MOCK_PASSAGE3_EPISTEMIC_DATA.find((p) => p.id === selectedPassageId) ||
      MOCK_PASSAGE3_EPISTEMIC_DATA[0]
    );
  }, [selectedPassageId]);

  // Graph and interactive states
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [highlightedParagraph, setHighlightedParagraph] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<EpistemicNodeType | 'all'>('all');
  const [activeTab, setActiveTab] = useState<EpistemicTab>('graph');

  // Summary Completion state
  const [userSummarySlots, setUserSummarySlots] = useState<Record<string, string>>({});
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<SummaryEvaluationResult | null>(null);

  // Modals & Persistence
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Filtered nodes
  const filteredNodes = useMemo(() => {
    if (activeFilter === 'all') return currentPassage.nodes;
    return currentPassage.nodes.filter((n) => n.type === activeFilter);
  }, [currentPassage.nodes, activeFilter]);

  // Selected Node Details
  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return currentPassage.nodes.find((n) => n.id === selectedNodeId) || null;
  }, [selectedNodeId, currentPassage.nodes]);

  // Selected Edge Details
  const selectedEdge = useMemo(() => {
    if (!selectedEdgeId) return null;
    return currentPassage.edges.find((e) => e.id === selectedEdgeId) || null;
  }, [selectedEdgeId, currentPassage.edges]);

  // Switch Passage
  const handleSelectPassage = (passageId: string) => {
    setSelectedPassageId(passageId);
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
    setHighlightedParagraph(null);
    setUserSummarySlots({});
    setIsEvaluated(false);
    setEvaluationResult(null);
    setIsSaved(false);
  };

  // Node selection handler
  const handleSelectNode = (nodeId: string | null) => {
    setSelectedNodeId(nodeId);
    setSelectedEdgeId(null);
    if (nodeId) {
      const node = currentPassage.nodes.find((n) => n.id === nodeId);
      if (node) {
        setHighlightedParagraph(node.paragraphIndex);
      }
    } else {
      setHighlightedParagraph(null);
    }
  };

  // Edge selection handler
  const handleSelectEdge = (edgeId: string | null) => {
    setSelectedEdgeId(edgeId);
    setSelectedNodeId(null);
    if (edgeId) {
      const edge = currentPassage.edges.find((e) => e.id === edgeId);
      if (edge) {
        setHighlightedParagraph(edge.paragraphIndex);
      }
    } else {
      setHighlightedParagraph(null);
    }
  };

  // Set slot answer
  const handleSetSlotAnswer = (slotId: string, optionId: string) => {
    setUserSummarySlots((prev) => ({
      ...prev,
      [slotId]: optionId
    }));
    setIsEvaluated(false);
  };

  // Clear slot answer
  const handleClearSlotAnswer = (slotId: string) => {
    setUserSummarySlots((prev) => {
      const updated = { ...prev };
      delete updated[slotId];
      return updated;
    });
    setIsEvaluated(false);
  };

  // Evaluate Summary Answers
  const handleEvaluateSummary = () => {
    const result = evaluateSummaryAnswers(
      userSummarySlots,
      currentPassage.summaryTask.slots,
      currentPassage.summaryTask.options
    );
    setEvaluationResult(result);
    setIsEvaluated(true);
    setIsSummaryModalOpen(true);
  };

  // Reset Summary Task
  const handleResetSummary = () => {
    setUserSummarySlots({});
    setIsEvaluated(false);
    setEvaluationResult(null);
  };

  // Save Results to Dexie DB
  const saveResultsToDatabase = useCallback(async () => {
    if (!evaluationResult) return;
    try {
      // 1. Save Practice Log
      await db.practice_logs.put({
        id: `passage3_log_${Date.now()}`,
        type: "passage3_epistemic",
        title: `Passage 3 Epistemic Mapping: ${currentPassage.title}`,
        score: evaluationResult.score,
        totalQuestions: evaluationResult.total,
        accuracyPercentage: evaluationResult.percentage,
        timeSpentSeconds: 240,
        details: {
          passageId: currentPassage.id,
          category: currentPassage.category,
          score: evaluationResult.score,
          total: evaluationResult.total,
          isPassed: evaluationResult.isPassed
        },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      });

      // 2. Add wrong answers to Error Bank with paraphrase_trap
      for (const slot of currentPassage.summaryTask.slots) {
        const slotResult = evaluationResult.results[slot.id];
        if (slotResult && !slotResult.isCorrect) {
          await db.error_bank.put({
            id: `err_p3_${currentPassage.id}_${slot.id}_${Date.now()}`,
            sourceModule: "reading",
            errorType: "paraphrase_trap",
            questionContext: `Passage 3 Summary Slot #${slot.slotNumber} (${currentPassage.title})`,
            userWrongAnswer: slotResult.userTerm || "(Bỏ trống)",
            correctAnswer: `${slotResult.correctTerm} (${slot.explanation})`,
            deepExplanation: `${slotResult.epistemicTrap} Khái niệm đúng: ${slotResult.correctTerm}`,
            mastered: false,
            retryCount: 1,
            createdAt: new Date().toISOString()
          });
        }
      }

      // 3. Save Abstract Terms into Vocab Matrix with FSRS
      for (const opt of currentPassage.summaryTask.options) {
        await db.vocab_matrix.put({
          id: `vocab_abstract_${opt.term.toLowerCase()}`,
          word: opt.term,
          ipa: opt.ipa,
          meaning: opt.definitionVi,
          definitionEn: opt.definitionEn,
          collocations: [opt.definitionEn],
          originalContext: `Reading Passage 3: ${currentPassage.title}`,
          category: "c1_academic",
          status: "learning",
          stepInterval: 1,
          nextReviewDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
          repetitionCount: 1,
          lapsesCount: 0,
          stability: 1.0,
          difficulty: 5.0,
          bandLevel: opt.band,
          sourceModule: "reading",
          createdAt: new Date().toISOString(),
          lastReviewedAt: new Date().toISOString()
        });
      }

      setIsSaved(true);
    } catch (err) {
      console.error("Failed to save Passage 3 Epistemic session:", err);
    }
  }, [evaluationResult, currentPassage]);

  return {
    currentPassage,
    allPassages: MOCK_PASSAGE3_EPISTEMIC_DATA,
    selectedPassageId,
    handleSelectPassage,
    selectedNodeId,
    selectedNode,
    handleSelectNode,
    selectedEdgeId,
    selectedEdge,
    handleSelectEdge,
    highlightedParagraph,
    setHighlightedParagraph,
    activeFilter,
    setActiveFilter,
    filteredNodes,
    activeTab,
    setActiveTab,
    userSummarySlots,
    handleSetSlotAnswer,
    handleClearSlotAnswer,
    isEvaluated,
    evaluationResult,
    handleEvaluateSummary,
    handleResetSummary,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isSaved,
    saveResultsToDatabase
  };
}
