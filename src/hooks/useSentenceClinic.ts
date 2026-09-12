"use client";

import { useState, useCallback, useMemo } from "react";
import {
  MOCK_SENTENCE_CLINIC_EXERCISES,
  SentenceClinicExercise,
  GrammarPathologyType,
} from "@/data/mockSentenceClinicData";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem } from "@/types/database";

export function useSentenceClinic() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [selectedTokenIndices, setSelectedTokenIndices] = useState<number[]>([]);
  const [selectedPathology, setSelectedPathology] = useState<GrammarPathologyType | null>(null);
  const [rewrittenSentence, setRewrittenSentence] = useState<string>("");

  const [stage, setStage] = useState<"hunting" | "diagnosing" | "rewriting" | "evaluated">("hunting");
  const [wrongAttempts, setWrongAttempts] = useState<number>(0);
  const [isBugLocated, setIsBugLocated] = useState<boolean>(false);
  const [isDiagnosisCorrect, setIsDiagnosisCorrect] = useState<boolean>(false);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState<boolean>(false);

  const [sessionStats, setSessionStats] = useState({
    completedCount: 0,
    totalScore: 0,
    errorCount: 0,
  });

  const currentExercise: SentenceClinicExercise =
    MOCK_SENTENCE_CLINIC_EXERCISES[currentExerciseIndex] ||
    MOCK_SENTENCE_CLINIC_EXERCISES[0];

  // 1. Check Token Click
  const handleTokenClick = useCallback(
    (tokenIndex: number) => {
      if (stage !== "hunting") return;

      const isHit = currentExercise.bugTokenIndices.includes(tokenIndex);

      if (isHit) {
        setSelectedTokenIndices((prev) => Array.from(new Set([...prev, tokenIndex])));
        setIsBugLocated(true);
        setStage("diagnosing");
      } else {
        setWrongAttempts((prev) => {
          const next = prev + 1;
          if (next >= 2) {
            // Push to Error Bank
            db.error_bank.put({
              id: `err_sc_loc_${Date.now()}_${currentExercise.id}`,
              sourceModule: "grammar",
              errorType: "grammar",
              questionContext: `[Sentence Clinic: ${currentExercise.topic}] Xác định vị trí lỗi: "${currentExercise.buggySentence}"`,
              userWrongAnswer: `Click nhầm token vị trí ${tokenIndex} (${currentExercise.tokens[tokenIndex]})`,
              correctAnswer: currentExercise.bugTokenIndices
                .map((i) => currentExercise.tokens[i])
                .join(" / "),
              deepExplanation: currentExercise.pathologyExplanation,
              mastered: false,
              retryCount: 0,
              createdAt: new Date().toISOString(),
            }).catch(() => {});

            setSessionStats((s) => ({ ...s, errorCount: s.errorCount + 1 }));
          }
          return next;
        });
      }
    },
    [stage, currentExercise]
  );

  // 2. Check Pathology Diagnosis
  const handleSelectPathology = useCallback(
    (pathology: GrammarPathologyType) => {
      setSelectedPathology(pathology);

      const isCorrect = pathology === currentExercise.pathologyType;
      setIsDiagnosisCorrect(isCorrect);

      if (!isCorrect) {
        db.error_bank.put({
          id: `err_sc_diag_${Date.now()}_${currentExercise.id}`,
          sourceModule: "grammar",
          errorType: "grammar",
          questionContext: `[Sentence Clinic: ${currentExercise.topic}] Chẩn đoán lỗi ngữ pháp: "${currentExercise.buggySentence}"`,
          userWrongAnswer: pathology,
          correctAnswer: currentExercise.pathologyType,
          deepExplanation: currentExercise.pathologyExplanation,
          mastered: false,
          retryCount: 0,
          createdAt: new Date().toISOString(),
        }).catch(() => {});

        setSessionStats((s) => ({ ...s, errorCount: s.errorCount + 1 }));
      }

      setStage("rewriting");
    },
    [currentExercise]
  );

  // 3. Submit Rewritten Sentence
  const handleSubmitRewrite = useCallback(
    async (text: string) => {
      setRewrittenSentence(text);
      setStage("evaluated");

      const scoreEarned = isDiagnosisCorrect && wrongAttempts === 0 ? 9.0 : wrongAttempts === 1 ? 7.5 : 6.5;

      setSessionStats((s) => ({
        ...s,
        completedCount: s.completedCount + 1,
        totalScore: s.totalScore + scoreEarned,
      }));

      // Save Practice Log
      try {
        const log: PracticeLog = {
          id: `log_sc_${Date.now()}_${currentExercise.id}`,
          type: "sentence_clinic",
          materialId: currentExercise.id,
          score: scoreEarned,
          timeSpentSeconds: 60,
          accuracyPercentage: isDiagnosisCorrect && wrongAttempts === 0 ? 100 : 75,
          createdAt: new Date().toISOString(),
        };
        await db.practice_logs.put(log);
      } catch (err) {
        console.error("Failed to save sentence clinic log:", err);
      }
    },
    [currentExercise, isDiagnosisCorrect, wrongAttempts]
  );

  // 4. Next Exercise Action
  const handleNextExercise = useCallback(() => {
    setSelectedTokenIndices([]);
    setSelectedPathology(null);
    setRewrittenSentence("");
    setWrongAttempts(0);
    setIsBugLocated(false);
    setIsDiagnosisCorrect(false);
    setStage("hunting");

    if (currentExerciseIndex < MOCK_SENTENCE_CLINIC_EXERCISES.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
    }
  }, [currentExerciseIndex]);

  const handleRestart = useCallback(() => {
    setCurrentExerciseIndex(0);
    setSelectedTokenIndices([]);
    setSelectedPathology(null);
    setRewrittenSentence("");
    setWrongAttempts(0);
    setIsBugLocated(false);
    setIsDiagnosisCorrect(false);
    setStage("hunting");
    setSessionStats({ completedCount: 0, totalScore: 0, errorCount: 0 });
  }, []);

  return {
    currentExerciseIndex,
    currentExercise,
    totalExercises: MOCK_SENTENCE_CLINIC_EXERCISES.length,
    selectedTokenIndices,
    selectedPathology,
    rewrittenSentence,
    stage,
    wrongAttempts,
    isBugLocated,
    isDiagnosisCorrect,
    isCheatSheetOpen,
    sessionStats,
    handleTokenClick,
    handleSelectPathology,
    handleSubmitRewrite,
    handleNextExercise,
    handleRestart,
    setIsCheatSheetOpen,
  };
}
