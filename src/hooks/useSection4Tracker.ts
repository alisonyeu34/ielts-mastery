"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import {
  Section4DenseData,
  MOCK_SECTION4_DENSE_DATA,
  Section4BlankItem,
} from "@/data/mockSection4DenseData";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem } from "@/types/database";

export interface DropoffCascade {
  startQNum: number;
  endQNum: number;
  missedCount: number;
  timeRangeSeconds: [number, number];
  primaryDiagnosis: string;
}

export function useSection4Tracker() {
  const [data] = useState<Section4DenseData>(MOCK_SECTION4_DENSE_DATA);

  // Audio Playback states
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);

  // User input states
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});
  const [scratchpadText, setScratchpadText] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Playback controls
  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const setTime = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  const changePlaybackRate = useCallback((rate: number) => {
    setPlaybackRate(rate);
  }, []);

  const setUserInput = useCallback((qNum: number, value: string) => {
    setUserInputs((prev) => ({ ...prev, [qNum]: value.trim().toLowerCase() }));
  }, []);

  // Evaluation & Drop-off Cascade Detection
  const scoreReport = useMemo(() => {
    let correctCount = 0;
    const itemResults: Record<number, boolean> = {};

    data.blanks.forEach((blank) => {
      const userVal = (userInputs[blank.questionNumber] || "").trim().toLowerCase();
      const isMatch = blank.acceptableAnswers.some(
        (ans) => ans.toLowerCase() === userVal
      );
      itemResults[blank.questionNumber] = isMatch;
      if (isMatch) correctCount++;
    });

    const total = data.blanks.length;
    const accuracy = Math.round((correctCount / total) * 100);

    // Detect dropoff cascades (consecutive errors >= 2)
    const cascades: DropoffCascade[] = [];
    let currentCascade: number[] = [];

    data.blanks.forEach((blank) => {
      const isCorrect = itemResults[blank.questionNumber];
      if (!isCorrect) {
        currentCascade.push(blank.questionNumber);
      } else {
        if (currentCascade.length >= 2) {
          const firstBlank = data.blanks.find((b) => b.questionNumber === currentCascade[0])!;
          const lastBlank = data.blanks.find((b) => b.questionNumber === currentCascade[currentCascade.length - 1])!;
          cascades.push({
            startQNum: currentCascade[0],
            endQNum: currentCascade[currentCascade.length - 1],
            missedCount: currentCascade.length,
            timeRangeSeconds: [firstBlank.timestampSeconds, lastBlank.timestampSeconds],
            primaryDiagnosis: `Bị mất dấu nhịp bài giảng từ câu ${currentCascade[0]} đến ${currentCascade[currentCascade.length - 1]}. Nguyên nhân do không bắt được từ tín hiệu chuyển đoạn '${firstBlank.signpostSignal.slice(0, 40)}...' ở mốc ${Math.floor(firstBlank.timestampSeconds / 60)}:${(firstBlank.timestampSeconds % 60).toString().padStart(2, "0")}.`,
          });
        }
        currentCascade = [];
      }
    });

    if (currentCascade.length >= 2) {
      const firstBlank = data.blanks.find((b) => b.questionNumber === currentCascade[0])!;
      const lastBlank = data.blanks.find((b) => b.questionNumber === currentCascade[currentCascade.length - 1])!;
      cascades.push({
        startQNum: currentCascade[0],
        endQNum: currentCascade[currentCascade.length - 1],
        missedCount: currentCascade.length,
        timeRangeSeconds: [firstBlank.timestampSeconds, lastBlank.timestampSeconds],
        primaryDiagnosis: `Rơi rụng thông tin liên hoàn ở cuối bài giảng (${currentCascade[0]} -> ${currentCascade[currentCascade.length - 1]}).`,
      });
    }

    return {
      correctCount,
      total,
      accuracy,
      itemResults,
      cascades,
    };
  }, [data, userInputs]);

  // Submit test and persist to Dexie DB
  const submitTest = useCallback(async () => {
    setIsSubmitted(true);
    setIsPlaying(false);

    // Save incorrect questions to Error Bank
    for (const blank of data.blanks) {
      const isCorrect = scoreReport.itemResults[blank.questionNumber];
      if (!isCorrect) {
        const userAns = userInputs[blank.questionNumber] || "(Bỏ trống)";
        try {
          const errorItem: ErrorItem = {
            id: `err_s4_${Date.now()}_q${blank.questionNumber}`,
            sourceModule: "listening",
            errorType: "pronunciation",
            questionContext: `[Section 4 Dense Lecture - ${data.title}] Câu ${blank.questionNumber}: ... ${blank.contextBefore} [${blank.targetAnswer}] ${blank.contextAfter} ...`,
            userWrongAnswer: userAns,
            correctAnswer: blank.targetAnswer,
            deepExplanation: blank.explanation,
            mastered: false,
            retryCount: 0,
            createdAt: new Date().toISOString(),
          };
          await db.error_bank.put(errorItem);
        } catch (e) {
          console.error("Failed to save S4 error to DB:", e);
        }
      }
    }

    // Save practice log
    try {
      const log: PracticeLog = {
        id: `prac_s4_${Date.now()}`,
        type: "listening",
        materialId: data.id,
        score: (scoreReport.correctCount / scoreReport.total) * 9.0,
        timeSpentSeconds: data.audioDurationSeconds,
        accuracyPercentage: scoreReport.accuracy,
        createdAt: new Date().toISOString(),
      };
      await db.practice_logs.put(log);
    } catch (err) {
      console.error("Failed to save S4 practice log:", err);
    }
  }, [data, userInputs, scoreReport]);

  const resetTest = useCallback(() => {
    setUserInputs({});
    setScratchpadText("");
    setIsSubmitted(false);
    setCurrentTime(0);
    setIsPlaying(false);
  }, []);

  return {
    data,
    isPlaying,
    currentTime,
    playbackRate,
    userInputs,
    scratchpadText,
    isSubmitted,
    isDictionaryOpen,
    scoreReport,
    togglePlay,
    setTime,
    changePlaybackRate,
    setUserInput,
    setScratchpadText,
    setIsDictionaryOpen,
    submitTest,
    resetTest,
  };
}
