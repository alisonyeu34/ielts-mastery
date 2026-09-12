"use client";

import { useState, useCallback, useMemo } from "react";
import {
  Passage3Data,
  MOCK_PASSAGE3_DATA,
  ComplexSentence,
  StanceType,
  Passage3Question,
} from "@/data/mockPassage3Data";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem } from "@/types/database";

export type StanceFilterMode = "all" | "positive" | "critical" | "concession" | "none";

export function usePassage3Tracker() {
  const [passageData] = useState<Passage3Data>(MOCK_PASSAGE3_DATA);
  const [activeStanceFilter, setActiveStanceFilter] = useState<StanceFilterMode>("all");

  const [selectedSentenceForDeconstruct, setSelectedSentenceForDeconstruct] =
    useState<ComplexSentence | null>(null);
  const [isDeconstructorOpen, setIsDeconstructorOpen] = useState<boolean>(false);
  const [isToneDrawerOpen, setIsToneDrawerOpen] = useState<boolean>(false);

  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [drillAnswers, setDrillAnswers] = useState<
    Record<string, "cited_researcher" | "author_stance" | "debunked_myth">
  >({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const setAnswer = useCallback((questionId: string, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  }, []);

  const setDrillAnswer = useCallback(
    (drillId: string, answer: "cited_researcher" | "author_stance" | "debunked_myth") => {
      setDrillAnswers((prev) => ({ ...prev, [drillId]: answer }));
    },
    []
  );

  const openDeconstructor = useCallback((sentence: ComplexSentence) => {
    setSelectedSentenceForDeconstruct(sentence);
    setIsDeconstructorOpen(true);
  }, []);

  const closeDeconstructor = useCallback(() => {
    setIsDeconstructorOpen(false);
    setSelectedSentenceForDeconstruct(null);
  }, []);

  const toggleToneDrawer = useCallback(() => {
    setIsToneDrawerOpen((prev) => !prev);
  }, []);

  const scoreReport = useMemo(() => {
    let correctCount = 0;
    passageData.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    let drillCorrectCount = 0;
    const drills = passageData.authorStanceDrillItems || passageData.stanceDrillItems || [];
    drills.forEach((d) => {
      if (drillAnswers[d.id] === d.speakerIdentity) {
        drillCorrectCount++;
      }
    });

    const totalQuestions = passageData.questions.length;
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    return {
      correctCount,
      totalQuestions,
      accuracy,
      drillCorrectCount,
      drillTotal: drills.length,
    };
  }, [passageData, userAnswers, drillAnswers]);

  const submitExam = useCallback(async () => {
    setIsSubmitted(true);

    // Save incorrect questions to Error Bank
    for (const q of passageData.questions) {
      const userAns = userAnswers[q.id];
      if (userAns !== q.correctAnswer) {
        try {
          let errorType: "careless_reading" | "paraphrase_trap" = "careless_reading";
          let deepExpl = q.examinerExplanation || q.distractorExplanationVi || "Giải thích chi tiết bẫy đọc hiểu học thuật";

          if (q.trapType === "attribution_confusion") {
            errorType = "paraphrase_trap";
            deepExpl = `[Bẫy Nhầm Lẫn Quan Điểm] ${q.examinerExplanation || q.distractorExplanationVi}`;
          }

          const errorItem: ErrorItem = {
            id: `err_p3_${Date.now()}_${q.id}`,
            sourceModule: "reading",
            errorType,
            questionContext: `[Passage 3 Stance - ${passageData.title}] Câu ${q.questionNumber}: ${q.questionText}`,
            userWrongAnswer: userAns || "(Chưa chọn đáp án)",
            correctAnswer: q.correctAnswer,
            deepExplanation: deepExpl,
            mastered: false,
            retryCount: 0,
            createdAt: new Date().toISOString(),
          };
          await db.error_bank.put(errorItem);
        } catch (e) {
          console.error("Failed to save Passage 3 error to DB:", e);
        }
      }
    }

    // Save practice log
    try {
      const log: PracticeLog = {
        id: `prac_p3_${Date.now()}`,
        type: "reading",
        materialId: passageData.id,
        score: (scoreReport.correctCount / scoreReport.totalQuestions) * 9.0,
        timeSpentSeconds: 1200,
        accuracyPercentage: scoreReport.accuracy,
        createdAt: new Date().toISOString(),
      };
      await db.practice_logs.put(log);
    } catch (err) {
      console.error("Failed to save Passage 3 practice log:", err);
    }
  }, [passageData, userAnswers, scoreReport]);

  const resetExam = useCallback(() => {
    setUserAnswers({});
    setDrillAnswers({});
    setIsSubmitted(false);
    setActiveStanceFilter("all");
  }, []);

  return {
    passageData,
    activeStanceFilter,
    selectedSentenceForDeconstruct,
    isDeconstructorOpen,
    isToneDrawerOpen,
    userAnswers,
    drillAnswers,
    isSubmitted,
    scoreReport,
    setActiveStanceFilter,
    setAnswer,
    setDrillAnswer,
    openDeconstructor,
    closeDeconstructor,
    toggleToneDrawer,
    submitExam,
    resetExam,
  };
}
