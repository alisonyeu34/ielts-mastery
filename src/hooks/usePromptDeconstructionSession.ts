'use client';

import { useState, useCallback, useMemo } from 'react';
import { db } from '@/lib/db';
import {
  PromptComponentType,
  PromptHighlight,
  DeconstructionAuditResult,
  ThesisValidationResult,
  validatePromptDeconstruction,
  evaluateThesisStatement
} from '@/lib/promptDeconstructionValidator';
import { MOCK_PROMPT_FORENSIC_CASES, PromptForensicCase } from '@/data/mockPromptForensicsData';

export function usePromptDeconstructionSession(initialCaseId?: string) {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(
    initialCaseId || MOCK_PROMPT_FORENSIC_CASES[0].id
  );
  const [activeHighlightTool, setActiveHighlightTool] = useState<PromptComponentType>('limiting_qualifier');
  const [highlights, setHighlights] = useState<PromptHighlight[]>([]);
  const [userThesisInput, setUserThesisInput] = useState<string>('');
  const [isAudited, setIsAudited] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<DeconstructionAuditResult | null>(null);
  const [thesisResult, setThesisResult] = useState<ThesisValidationResult | null>(null);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [showStealthDriftModal, setShowStealthDriftModal] = useState<boolean>(false);
  const [startTime] = useState<number>(Date.now());

  const currentCase = useMemo<PromptForensicCase>(() => {
    return (
      MOCK_PROMPT_FORENSIC_CASES.find((c) => c.id === selectedCaseId) ||
      MOCK_PROMPT_FORENSIC_CASES[0]
    );
  }, [selectedCaseId]);

  const selectCase = useCallback((caseId: string) => {
    setSelectedCaseId(caseId);
    setHighlights([]);
    setUserThesisInput('');
    setIsAudited(false);
    setAuditResult(null);
    setThesisResult(null);
    setShowSummaryModal(false);
    setShowStealthDriftModal(false);
  }, []);

  const addHighlight = useCallback((startIndex: number, endIndex: number, selectedText: string) => {
    if (startIndex >= endIndex || !selectedText.trim()) return;

    setHighlights((prev) => {
      // Remove any overlapping highlights
      const filtered = prev.filter(
        (h) => !(startIndex < h.endIndex && endIndex > h.startIndex)
      );

      const newHighlight: PromptHighlight = {
        id: `hl-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        type: activeHighlightTool,
        startIndex,
        endIndex,
        selectedText: selectedText.trim()
      };

      return [...filtered, newHighlight].sort((a, b) => a.startIndex - b.startIndex);
    });
  }, [activeHighlightTool]);

  const removeHighlight = useCallback((id: string) => {
    setHighlights((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const resetHighlights = useCallback(() => {
    setHighlights([]);
    setIsAudited(false);
    setAuditResult(null);
  }, []);

  const loadPresetAnswer = useCallback(() => {
    const c = currentCase.components;
    const presets: PromptHighlight[] = [
      {
        id: 'hl-preset-ctx',
        type: 'context',
        startIndex: c.context.startIndex,
        endIndex: c.context.endIndex,
        selectedText: c.context.text
      },
      {
        id: 'hl-preset-core',
        type: 'core_subject',
        startIndex: c.core_subject.startIndex,
        endIndex: c.core_subject.endIndex,
        selectedText: c.core_subject.text
      },
      ...c.limitingQualifiers.map((lq, idx) => ({
        id: `hl-preset-qual-${idx}`,
        type: 'limiting_qualifier' as PromptComponentType,
        startIndex: lq.startIndex,
        endIndex: lq.endIndex,
        selectedText: lq.text
      })),
      {
        id: 'hl-preset-task',
        type: 'directive_task',
        startIndex: c.directive_task.startIndex,
        endIndex: c.directive_task.endIndex,
        selectedText: c.directive_task.text
      }
    ];
    setHighlights(presets);
    setUserThesisInput(currentCase.watertightTheses.band85Sample);
  }, [currentCase]);

  const evaluateSession = useCallback(async () => {
    const audit = validatePromptDeconstruction(highlights, currentCase.expectedKeywords);
    const thesisEval = evaluateThesisStatement(
      userThesisInput,
      currentCase.promptType,
      currentCase.expectedKeywords.limiting_qualifier || []
    );

    setAuditResult(audit);
    setThesisResult(thesisEval);
    setIsAudited(true);
    setShowSummaryModal(true);

    // Save to Dexie DB
    try {
      const durationSeconds = Math.max(15, Math.round((Date.now() - startTime) / 1000));
      const overallScore = Math.round((audit.coverageScore + thesisEval.thesisScore) / 2);

      await db.practice_logs.add({
        id: `pd-${Date.now()}`,
        type: 'prompt_deconstruction',
        title: `Task Response Forensics: ${currentCase.cambridgeRef} (${currentCase.topicCategory})`,
        score: overallScore,
        totalQuestions: 2, // 1 Deconstruction + 1 Thesis Lock
        durationSeconds,
        timeSpentSeconds: durationSeconds,
        accuracyPercentage: overallScore,
        phase: 3,
        details: {
          caseId: currentCase.id,
          coverageScore: audit.coverageScore,
          thesisScore: thesisEval.thesisScore,
          missedQualifiers: audit.missedQualifiers,
          stealthDriftRisk: audit.stealthDriftRisk,
          matchedStanceType: thesisEval.matchedStanceType,
          isAmbiguousWishyWashy: thesisEval.isAmbiguousWishyWashy
        },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      });

      // Log errors if missed qualifiers or wishy-washy thesis
      if (audit.missedQualifiers.length > 0) {
        await db.error_bank.add({
          id: `err-pd-${Date.now()}-qualifier`,
          sourceModule: 'writing',
          errorType: 'paraphrase_trap',
          questionContext: `[Prompt Deconstruction] ${currentCase.promptText.slice(0, 80)}...`,
          userWrongAnswer: `Bỏ sót từ hạn định: ${audit.missedQualifiers.join(', ')}`,
          correctAnswer: `Khóa chặt phạm vi với [${audit.missedQualifiers.join(', ')}]`,
          deepExplanation: currentCase.stealthDriftAnalysis.whyItCapsBand6,
          mastered: false,
          retryCount: 0,
          createdAt: new Date().toISOString()
        });
      }
    } catch (e) {
      console.error('Dexie logging error for prompt deconstruction:', e);
    }
  }, [highlights, userThesisInput, currentCase, startTime]);

  return {
    cases: MOCK_PROMPT_FORENSIC_CASES,
    currentCase,
    selectedCaseId,
    selectCase,
    activeHighlightTool,
    setActiveHighlightTool,
    highlights,
    addHighlight,
    removeHighlight,
    resetHighlights,
    loadPresetAnswer,
    userThesisInput,
    setUserThesisInput,
    isAudited,
    auditResult,
    thesisResult,
    evaluateSession,
    showSummaryModal,
    setShowSummaryModal,
    showStealthDriftModal,
    setShowStealthDriftModal
  };
}
