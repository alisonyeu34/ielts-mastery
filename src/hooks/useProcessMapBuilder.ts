"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import {
  MOCK_PROCESS_MAP_EXERCISES,
  Task1PMExercise,
  PMExerciseType,
  MapMutationHotspot,
  ProcessStageItem,
} from "@/data/mockProcessMapData";
import {
  calculatePassiveRatio,
  validateProcessOverview,
  validateMapOverview,
  estimateBandScore,
  PassiveAnalysisResult,
  OverviewValidationResult,
  BandScoreAssessment,
} from "@/lib/processMapValidator";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem, VocabCard } from "@/types/database";

export interface EssaySections {
  introduction: string;
  overview: string;
  body1: string;
  body2: string;
}

export function useProcessMapBuilder(initialExerciseId?: string) {
  // 1. Exercise selection
  const [activeExerciseId, setActiveExerciseId] = useState<string>(
    initialExerciseId || MOCK_PROCESS_MAP_EXERCISES[0].id
  );

  const currentExercise = useMemo(() => {
    return (
      MOCK_PROCESS_MAP_EXERCISES.find((e) => e.id === activeExerciseId) ||
      MOCK_PROCESS_MAP_EXERCISES[0]
    );
  }, [activeExerciseId]);

  const activeMode: "process" | "map" = currentExercise.diagramType.startsWith("process")
    ? "process"
    : "map";

  // 2. Interactive state
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(0);
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(
    currentExercise.mutationHotspots && currentExercise.mutationHotspots.length > 0
      ? currentExercise.mutationHotspots[0].id
      : null
  );
  const [mapSliderPos, setMapSliderPos] = useState<number>(50);
  const [isSideBySideView, setIsSideBySideView] = useState<boolean>(false);

  // When exercise changes, reset interactive focus
  useEffect(() => {
    setSelectedStepIndex(0);
    if (currentExercise.mutationHotspots && currentExercise.mutationHotspots.length > 0) {
      setSelectedHotspotId(currentExercise.mutationHotspots[0].id);
    } else {
      setSelectedHotspotId(null);
    }
  }, [currentExercise]);

  // 3. Essay Sections
  const [essaySections, setEssaySections] = useState<EssaySections>({
    introduction: "",
    overview: "",
    body1: "",
    body2: "",
  });

  const setEssaySection = useCallback((section: keyof EssaySections, text: string) => {
    setEssaySections((prev) => ({
      ...prev,
      [section]: text,
    }));
  }, []);

  const fullEssayText = useMemo(() => {
    const parts = [
      essaySections.introduction.trim(),
      essaySections.overview.trim(),
      essaySections.body1.trim(),
      essaySections.body2.trim(),
    ].filter((p) => p.length > 0);

    return parts.join("\n\n");
  }, [essaySections]);

  const totalWordCount = useMemo(() => {
    if (!fullEssayText || fullEssayText.trim().length === 0) return 0;
    return fullEssayText
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length;
  }, [fullEssayText]);

  // 4. Timer State
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const toggleTimer = useCallback(() => {
    setIsTimerRunning((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setTimerSeconds(0);
    setIsTimerRunning(false);
  }, []);

  // 5. Live Validations
  const passiveAnalysis: PassiveAnalysisResult = useMemo(() => {
    return calculatePassiveRatio(fullEssayText, currentExercise.diagramType);
  }, [fullEssayText, currentExercise.diagramType]);

  const overviewValidation: OverviewValidationResult = useMemo(() => {
    if (activeMode === "process") {
      return validateProcessOverview(essaySections.overview);
    } else {
      return validateMapOverview(essaySections.overview);
    }
  }, [activeMode, essaySections.overview]);

  // 6. Assessment & Modal State
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [assessmentResult, setAssessmentResult] = useState<BandScoreAssessment | null>(null);

  const calculateAssessment = useCallback(() => {
    return estimateBandScore(
      fullEssayText,
      currentExercise.diagramType,
      totalWordCount,
      overviewValidation,
      passiveAnalysis
    );
  }, [fullEssayText, currentExercise.diagramType, totalWordCount, overviewValidation, passiveAnalysis]);

  // 7. Submit and Save to Dexie DB
  const submitEssayAndSaveToDb = useCallback(async () => {
    setIsSubmitting(true);
    const assessment = calculateAssessment();
    setAssessmentResult(assessment);

    try {
      // 1. Save to practice_logs
      const logEntry: PracticeLog = {
        id: `pl_pm_${Date.now()}_${currentExercise.id}`,
        type: "task1_process_map_drill",
        materialId: currentExercise.id,
        score: Math.round(assessment.overallBand * 10),
        timeSpentSeconds: timerSeconds,
        accuracyPercentage: Math.round((assessment.overallBand / 9.0) * 100),
        details: {
          exerciseId: currentExercise.id,
          exerciseTitle: currentExercise.title,
          diagramType: currentExercise.diagramType,
          overallBand: assessment.overallBand,
          taskAchievement: assessment.taskAchievement,
          coherenceCohesion: assessment.coherenceCohesion,
          lexicalResource: assessment.lexicalResource,
          grammaticalRange: assessment.grammaticalRange,
          wordCount: totalWordCount,
          timeSpentSeconds: timerSeconds,
          passiveRatio: passiveAnalysis.passiveRatioPercentage,
          userEssay: fullEssayText,
        },
        createdAt: new Date().toISOString(),
      };
      await db.practice_logs.add(logEntry);

      // 2. Identify potential errors for error_bank
      if (currentExercise.diagramType === "process_manmade" && passiveAnalysis.passiveRatioPercentage < 35) {
        const errorItem: ErrorItem = {
          id: `err_pm_passive_${Date.now()}`,
          sourceModule: "writing",
          errorType: "grammar",
          questionContext: `[Task 1 Process - ${currentExercise.title}] Thiếu thể bị động học thuật`,
          userWrongAnswer: `Tỷ lệ câu bị động chỉ đạt ${passiveAnalysis.passiveRatioPercentage}%`,
          correctAnswer: "Nên đạt > 50% câu bị động trong quy trình sản xuất công nghiệp",
          deepExplanation:
            "Trong quy trình sản xuất nhân tạo (Man-made Process), bạn phải sử dụng thể bị động (Passive Voice) để tập trung miêu tả vật thể được xử lý thay vì nhắc đến người thao tác.",
          mastered: false,
          retryCount: 0,
          createdAt: new Date().toISOString(),
        };
        await db.error_bank.add(errorItem);
      }

      if (!overviewValidation.isValid) {
        const errorItem: ErrorItem = {
          id: `err_pm_overview_${Date.now()}`,
          sourceModule: "writing",
          errorType: "careless_reading",
          questionContext: `[Task 1 ${currentExercise.diagramType.toUpperCase()} - ${currentExercise.title}] Lỗi cấu trúc Overview`,
          userWrongAnswer: essaySections.overview || "(Chưa có Overview)",
          correctAnswer: currentExercise.modelOverview.text,
          deepExplanation:
            activeMode === "process"
              ? "Đoạn Overview dạng Quy trình cần nêu rõ: (1) Tổng số giai đoạn, (2) Điểm bắt đầu, và (3) Sản phẩm đầu ra cuối cùng."
              : "Đoạn Overview dạng Bản đồ cần khái quát hóa: (1) Xu hướng đô thị hóa/hiện đại hóa, (2) Mốc thời gian và (3) Điểm nhấn tương phản hoặc công trình giữ nguyên.",
          mastered: false,
          retryCount: 0,
          createdAt: new Date().toISOString(),
        };
        await db.error_bank.add(errorItem);
      }

      setIsAssessmentModalOpen(true);
    } catch (e) {
      console.error("Failed to save Task 1 Process/Map log to Dexie DB:", e);
      setIsAssessmentModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    calculateAssessment,
    currentExercise,
    totalWordCount,
    timerSeconds,
    passiveAnalysis,
    fullEssayText,
    overviewValidation,
    essaySections.overview,
    activeMode,
  ]);

  // 8. Save Vocabulary to Dexie DB (vocab_matrix)
  const saveVocabToMatrix = useCallback(async (words: Array<{ word: string; meaningVi: string }>) => {
    try {
      for (const item of words) {
        const card: VocabCard = {
          id: `vocab_pm_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          word: item.word,
          ipa: "",
          meaning: item.meaningVi,
          definitionEn: item.word,
          collocations: [],
          originalContext: `Academic Task 1 (${currentExercise.title})`,
          category: "c1_academic",
          status: "learning",
          stepInterval: 1,
          nextReviewDate: new Date().toISOString(),
          repetitionCount: 0,
          lapsesCount: 0,
          bandLevel: "7.5+",
          sourceModule: "writing_task1",
          createdAt: new Date().toISOString(),
        };
        await db.vocab_matrix.put(card);
      }
    } catch (e) {
      console.error("Failed to save vocabulary to Dexie DB:", e);
    }
  }, [currentExercise.title]);

  const loadModelEssay = useCallback(() => {
    setEssaySections({
      introduction: currentExercise.prompt,
      overview: currentExercise.modelOverview.text,
      body1: currentExercise.modelBody1,
      body2: currentExercise.modelBody2,
    });
  }, [currentExercise]);

  const resetWorkspace = useCallback(() => {
    setEssaySections({
      introduction: "",
      overview: "",
      body1: "",
      body2: "",
    });
    setTimerSeconds(0);
    setIsTimerRunning(true);
    setAssessmentResult(null);
  }, []);

  return {
    // Selection
    activeExerciseId,
    setActiveExerciseId,
    currentExercise,
    activeMode,

    // Interactive
    selectedStepIndex,
    setSelectedStepIndex,
    selectedHotspotId,
    setSelectedHotspotId,
    mapSliderPos,
    setMapSliderPos,
    isSideBySideView,
    setIsSideBySideView,

    // Editor & Text
    essaySections,
    setEssaySection,
    fullEssayText,
    totalWordCount,

    // Timer
    timerSeconds,
    isTimerRunning,
    toggleTimer,
    resetTimer,

    // Live Metrics
    passiveAnalysis,
    overviewValidation,

    // Assessment & Actions
    isAssessmentModalOpen,
    setIsAssessmentModalOpen,
    isSubmitting,
    assessmentResult,
    submitEssayAndSaveToDb,
    saveVocabToMatrix,
    loadModelEssay,
    resetWorkspace,
  };
}
