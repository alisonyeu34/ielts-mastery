"use client";

import { useState, useCallback, useMemo } from "react";
import {
  ThreePassTestData,
  MOCK_THREE_PASS_TEST,
  ThreePassQuestion,
  ExtractableVocabItem,
} from "@/data/mockThreePassTest";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem, VocabCard } from "@/types/database";

export type QuestionDiagnosisType = "mastered" | "time_management" | "knowledge_gap";

export function useThreePassSession() {
  const [testData] = useState<ThreePassTestData>(MOCK_THREE_PASS_TEST);
  const [currentPass, setCurrentPass] = useState<1 | 2 | 3>(1);

  // Pass 1 States
  const [pass1Answers, setPass1Answers] = useState<Record<string, string>>({});
  const [pass1TimeSpent, setPass1TimeSpent] = useState<number>(0);
  const [isPass1Completed, setIsPass1Completed] = useState<boolean>(false);

  // Pass 2 States
  const [pass2Answers, setPass2Answers] = useState<Record<string, string>>({});
  const [pass2TimeSpent, setPass2TimeSpent] = useState<number>(0);
  const [isPass2Completed, setIsPass2Completed] = useState<boolean>(false);

  // Vocab Drawer
  const [isVocabDrawerOpen, setIsVocabDrawerOpen] = useState<boolean>(false);
  const [syncedVocabIds, setSyncedVocabIds] = useState<string[]>([]);

  // Helpers to check answers
  const isAnswerCorrect = useCallback(
    (q: ThreePassQuestion, answer: string | undefined): boolean => {
      if (!answer) return false;
      const cleanedUser = answer.trim().toLowerCase();
      const cleanedTarget = q.correctAnswer.trim().toLowerCase();
      return cleanedUser === cleanedTarget;
    },
    []
  );

  // Pass 1 Score
  const pass1Score = useMemo(() => {
    return testData.questions.filter((q) => isAnswerCorrect(q, pass1Answers[q.id])).length;
  }, [testData, pass1Answers, isAnswerCorrect]);

  // Pass 2 Score
  const pass2Score = useMemo(() => {
    return testData.questions.filter((q) => isAnswerCorrect(q, pass2Answers[q.id])).length;
  }, [testData, pass2Answers, isAnswerCorrect]);

  // Delta Score
  const deltaScore = useMemo(() => {
    return pass2Score - pass1Score;
  }, [pass2Score, pass1Score]);

  // Question Diagnoses
  const questionDiagnoses = useMemo(() => {
    const map: Record<string, QuestionDiagnosisType> = {};

    testData.questions.forEach((q) => {
      const p1Correct = isAnswerCorrect(q, pass1Answers[q.id]);
      const p2Correct = isAnswerCorrect(q, pass2Answers[q.id]);

      if (p1Correct) {
        map[q.id] = "mastered";
      } else if (!p1Correct && p2Correct) {
        map[q.id] = "time_management";
      } else {
        map[q.id] = "knowledge_gap";
      }
    });

    return map;
  }, [testData, pass1Answers, pass2Answers, isAnswerCorrect]);

  const diagnosisSummary = useMemo(() => {
    let masteredCount = 0;
    let timeManagementCount = 0;
    let knowledgeGapCount = 0;

    Object.values(questionDiagnoses).forEach((diag) => {
      if (diag === "mastered") masteredCount++;
      else if (diag === "time_management") timeManagementCount++;
      else if (diag === "knowledge_gap") knowledgeGapCount++;
    });

    return {
      masteredCount,
      timeManagementCount,
      knowledgeGapCount,
      total: testData.questions.length,
    };
  }, [questionDiagnoses, testData]);

  // Complete Pass 1
  const completePass1 = useCallback(
    (answers: Record<string, string>, timeSpent: number) => {
      setPass1Answers(answers);
      setPass1TimeSpent(timeSpent);
      setIsPass1Completed(true);
      setCurrentPass(2);
    },
    []
  );

  // Complete Pass 2 and trigger DB sync
  const completePass2 = useCallback(
    async (answers: Record<string, string>, timeSpent: number) => {
      setPass2Answers(answers);
      setPass2TimeSpent(timeSpent);
      setIsPass2Completed(true);
      setCurrentPass(3);

      // Save Practice Log
      try {
        const log: PracticeLog = {
          id: `prac_3pass_${Date.now()}`,
          type: "reading",
          materialId: testData.id,
          score: (pass2Score / testData.questions.length) * 9.0,
          timeSpentSeconds: pass1TimeSpent + timeSpent,
          accuracyPercentage: Math.round((pass2Score / testData.questions.length) * 100),
          createdAt: new Date().toISOString(),
        };
        await db.practice_logs.put(log);
      } catch (e) {
        console.error("Failed to save 3-pass practice log:", e);
      }

      // Save Knowledge Gap questions into Error Bank
      for (const q of testData.questions) {
        const diag = questionDiagnoses[q.id];
        if (diag === "knowledge_gap") {
          try {
            const errorItem: ErrorItem = {
              id: `err_3pass_${Date.now()}_q${q.questionNumber}`,
              sourceModule: "reading",
              errorType: "careless_reading",
              questionContext: `[3-Pass Deep Analysis - ${testData.title}] Câu ${q.questionNumber}: ${q.questionText}`,
              userWrongAnswer: answers[q.id] || "(Chưa có đáp án)",
              correctAnswer: q.correctAnswer,
              deepExplanation: `[Lỗ hổng kiến thức cốt lõi] ${q.explanation} (Bẫy: ${q.commonTrap})`,
              mastered: false,
              retryCount: 0,
              createdAt: new Date().toISOString(),
            };
            await db.error_bank.put(errorItem);
          } catch (err) {
            console.error("Failed to save 3-pass error to DB:", err);
          }
        }
      }
    },
    [testData, pass2Score, pass1TimeSpent, questionDiagnoses]
  );

  // Sync vocab item to FSRS Vocab Matrix
  const syncVocabToFSRS = useCallback(async (item: ExtractableVocabItem) => {
    try {
      const vocab: VocabCard = {
        id: `v_${item.word.toLowerCase()}_${Date.now()}`,
        word: item.word,
        ipa: item.phonetic,
        meaning: item.meaningVi,
        collocations: [],
        originalContext: item.contextSentence,
        category: "c1_academic",
        status: "learning",
        stepInterval: 1,
        nextReviewDate: new Date().toISOString().split("T")[0],
        repetitionCount: 0,
        lapsesCount: 0,
        stability: 1,
        difficulty: 3,
        lastReviewedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
      await db.vocab_matrix.put(vocab);
      setSyncedVocabIds((prev) => [...prev, item.id]);
    } catch (e) {
      console.error("Failed to sync vocab to FSRS:", e);
    }
  }, []);

  const jumpToPass = useCallback(
    (passNumber: 1 | 2 | 3) => {
      if (passNumber === 1) setCurrentPass(1);
      else if (passNumber === 2 && isPass1Completed) setCurrentPass(2);
      else if (passNumber === 3 && isPass2Completed) setCurrentPass(3);
    },
    [isPass1Completed, isPass2Completed]
  );

  const resetSession = useCallback(() => {
    setCurrentPass(1);
    setPass1Answers({});
    setPass1TimeSpent(0);
    setIsPass1Completed(false);
    setPass2Answers({});
    setPass2TimeSpent(0);
    setIsPass2Completed(false);
  }, []);

  return {
    testData,
    currentPass,
    pass1Answers,
    pass1TimeSpent,
    isPass1Completed,
    pass2Answers,
    pass2TimeSpent,
    isPass2Completed,
    pass1Score,
    pass2Score,
    deltaScore,
    questionDiagnoses,
    diagnosisSummary,
    isVocabDrawerOpen,
    syncedVocabIds,
    completePass1,
    completePass2,
    syncVocabToFSRS,
    jumpToPass,
    resetSession,
    setIsVocabDrawerOpen,
  };
}
