'use client';

import { useState, useCallback, useMemo } from 'react';
import { db } from '@/lib/db';
import {
  DistractorMechanism,
  DistractorDraft,
  PsychometricAuditResult,
  evaluateDistractorQuality
} from '@/lib/distractorPsychometrics';
import {
  MOCK_REVERSE_ENGINEERING_CASES,
  MOCK_DISTRACTOR_TAGGING_DRILLS,
  PassageEngineeringCase,
  DistractorTaggingDrillItem
} from '@/data/mockReverseEngineeringData';

export function useReverseEngineeringSession(initialCaseId?: string) {
  const [activeTab, setActiveTab] = useState<'workbench' | 'tagging_arena'>('workbench');
  const [selectedCaseId, setSelectedCaseId] = useState<string>(
    initialCaseId || MOCK_REVERSE_ENGINEERING_CASES[0].id
  );
  const [selectedSourceSentence, setSelectedSourceSentence] = useState<string>(
    MOCK_REVERSE_ENGINEERING_CASES[0].targetSourceSentence
  );
  const [questionPromptInput, setQuestionPromptInput] = useState<string>('');
  const [keyInput, setKeyInput] = useState<string>('');
  const [distractorDrafts, setDistractorDrafts] = useState<DistractorDraft[]>([
    {
      id: 'd-1',
      type: 'polarity_inversion',
      text: '',
      trapMechanismRationale: 'Đảo ngược cực tính sự thật bằng tiền tố phủ định / trạng từ đối nghịch'
    },
    {
      id: 'd-2',
      type: 'half_truth',
      text: '',
      trapMechanismRationale: 'Vế đầu đúng y hệt bài đọc, vế đuôi gán ghép sai lệch kết quả'
    },
    {
      id: 'd-3',
      type: 'scope_escalation',
      text: '',
      trapMechanismRationale: 'Tuyệt đối hóa phạm vi và xác suất (invariably / all / solely)'
    }
  ]);
  const [auditResult, setAuditResult] = useState<PsychometricAuditResult | null>(null);
  const [isAudited, setIsAudited] = useState<boolean>(false);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [startTime] = useState<number>(Date.now());

  // Tagging Arena State
  const [taggingDrills] = useState<DistractorTaggingDrillItem[]>(MOCK_DISTRACTOR_TAGGING_DRILLS);
  const [currentDrillIndex, setCurrentDrillIndex] = useState<number>(0);
  const [userAssignedTags, setUserAssignedTags] = useState<Record<string, DistractorMechanism>>({});
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [drillScore, setDrillScore] = useState<number>(0);
  const [isDrillSubmitted, setIsDrillSubmitted] = useState<boolean>(false);

  const currentCase = useMemo<PassageEngineeringCase>(() => {
    return (
      MOCK_REVERSE_ENGINEERING_CASES.find((c) => c.id === selectedCaseId) ||
      MOCK_REVERSE_ENGINEERING_CASES[0]
    );
  }, [selectedCaseId]);

  const selectCase = useCallback((caseId: string) => {
    setSelectedCaseId(caseId);
    const target = MOCK_REVERSE_ENGINEERING_CASES.find((c) => c.id === caseId) || MOCK_REVERSE_ENGINEERING_CASES[0];
    setSelectedSourceSentence(target.targetSourceSentence);
    setQuestionPromptInput('');
    setKeyInput('');
    setDistractorDrafts([
      { id: 'd-1', type: 'polarity_inversion', text: '', trapMechanismRationale: 'Đảo ngược cực tính' },
      { id: 'd-2', type: 'half_truth', text: '', trapMechanismRationale: 'Đúng nửa đầu, sai nửa sau' },
      { id: 'd-3', type: 'scope_escalation', text: '', trapMechanismRationale: 'Tuyệt đối hóa phạm vi' }
    ]);
    setIsAudited(false);
    setAuditResult(null);
    setShowSummaryModal(false);
  }, []);

  const updateDistractorText = useCallback((id: string, text: string) => {
    setDistractorDrafts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, text } : d))
    );
  }, []);

  const updateDistractorType = useCallback((id: string, type: DistractorMechanism) => {
    setDistractorDrafts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, type } : d))
    );
  }, []);

  const loadPresetItem = useCallback(() => {
    const item = currentCase.modelItemDraft;
    setQuestionPromptInput(item.questionPrompt);
    setKeyInput(item.modelKey);
    setDistractorDrafts(
      item.distractors.map((d) => ({
        id: d.id,
        type: d.type,
        text: d.text,
        trapMechanismRationale: d.trapMechanismRationale
      }))
    );
  }, [currentCase]);

  const evaluateWorkbenchSession = useCallback(async () => {
    const result = evaluateDistractorQuality(
      selectedSourceSentence,
      keyInput,
      distractorDrafts,
      currentCase.passageText
    );
    setAuditResult(result);
    setIsAudited(true);
    setShowSummaryModal(true);

    try {
      const durationSeconds = Math.max(20, Math.round((Date.now() - startTime) / 1000));
      await db.practice_logs.add({
        id: `rev-${Date.now()}`,
        type: 'distractor_engineering_drill',
        title: `Reverse Engineering: ${currentCase.cambridgeRef} (${currentCase.topicDomain})`,
        score: result.overallSophisticationScore,
        totalQuestions: 4, // 1 Key + 3 Distractors
        durationSeconds,
        timeSpentSeconds: durationSeconds,
        accuracyPercentage: result.overallSophisticationScore,
        phase: 3,
        details: {
          caseId: currentCase.id,
          examinerRating: result.examinerRating,
          isExamReady: result.isExamReady,
          distractorScores: result.distractorEvaluations.map((d) => ({ type: d.type, score: d.score }))
        },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      });
    } catch (e) {
      console.error('Dexie logging error for reverse engineering:', e);
    }
  }, [selectedSourceSentence, keyInput, distractorDrafts, currentCase, startTime]);

  // Tagging arena actions
  const handleAssignTag = useCallback((optionId: string, trapType: DistractorMechanism) => {
    setUserAssignedTags((prev) => ({ ...prev, [optionId]: trapType }));
  }, []);

  const submitTaggingDrill = useCallback(async () => {
    const currentDrill = taggingDrills[currentDrillIndex];
    let correctCount = 0;

    // Check Key selection
    if (selectedOptionId === currentDrill.correctOptionId) {
      correctCount += 1;
    }

    // Check Distractor tags
    currentDrill.options.forEach((opt) => {
      if (!opt.isKey && opt.assignedTrapType && userAssignedTags[opt.id] === opt.assignedTrapType) {
        correctCount += 1;
      }
    });

    const totalCheckable = currentDrill.options.length; // 4 items (1 key + 3 distractor tags)
    const scorePct = Math.round((correctCount / totalCheckable) * 100);
    setDrillScore(scorePct);
    setIsDrillSubmitted(true);

    try {
      await db.practice_logs.add({
        id: `tag-${Date.now()}`,
        type: 'distractor_engineering_drill',
        title: `Distractor Tagging Arena: Drill #${currentDrill.questionNumber}`,
        score: scorePct,
        totalQuestions: totalCheckable,
        durationSeconds: 45,
        timeSpentSeconds: 45,
        accuracyPercentage: scorePct,
        phase: 3,
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      });

      // Save wrong tags to error bank
      if (scorePct < 80) {
        await db.error_bank.add({
          id: `err-tag-${Date.now()}`,
          sourceModule: 'reading',
          errorType: 'paraphrase_trap',
          questionContext: `[Distractor Tagging] ${currentDrill.questionStem}`,
          userWrongAnswer: 'Nhận diện sai cơ chế bẫy Cambridge',
          correctAnswer: 'Bóc tách chuẩn xác 4 cơ chế bẫy: Đảo cực tính, Đúng nửa, Tuyệt đối hóa, Suy diễn',
          deepExplanation: 'Thí sinh cần rèn luyện khả năng phát hiện động cơ gài bẫy của giám khảo trong 10 giây đầu.',
          mastered: false,
          retryCount: 0,
          createdAt: new Date().toISOString()
        });
      }
    } catch (e) {
      console.error('Dexie logging error for tagging drill:', e);
    }
  }, [taggingDrills, currentDrillIndex, selectedOptionId, userAssignedTags]);

  const nextTaggingDrill = useCallback(() => {
    setCurrentDrillIndex((prev) => (prev + 1) % taggingDrills.length);
    setSelectedOptionId(null);
    setUserAssignedTags({});
    setIsDrillSubmitted(false);
  }, [taggingDrills.length]);

  return {
    activeTab,
    setActiveTab,
    cases: MOCK_REVERSE_ENGINEERING_CASES,
    currentCase,
    selectedCaseId,
    selectCase,
    selectedSourceSentence,
    setSelectedSourceSentence,
    questionPromptInput,
    setQuestionPromptInput,
    keyInput,
    setKeyInput,
    distractorDrafts,
    updateDistractorText,
    updateDistractorType,
    loadPresetItem,
    evaluateWorkbenchSession,
    isAudited,
    auditResult,
    showSummaryModal,
    setShowSummaryModal,
    // Tagging Arena
    taggingDrills,
    currentDrill: taggingDrills[currentDrillIndex],
    currentDrillIndex,
    selectedOptionId,
    setSelectedOptionId,
    userAssignedTags,
    handleAssignTag,
    submitTaggingDrill,
    nextTaggingDrill,
    drillScore,
    isDrillSubmitted
  };
}
