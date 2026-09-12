"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import {
  MOCK_PART1_DATA,
  MOCK_PART2_CUECARDS,
  SpeakingPart1Item,
  SpeakingCueCardItem,
} from "@/data/mockSpeakingP1P2Data";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem } from "@/types/database";

export function useSpeakingP1P2Session() {
  const [activeMode, setActiveMode] = useState<"part1" | "part2">("part1");
  const [selectedP1Id, setSelectedP1Id] = useState<string>(MOCK_PART1_DATA[0].id);
  const [selectedP2Id, setSelectedP2Id] = useState<string>(MOCK_PART2_CUECARDS[0].id);

  // Part 1 Inputs
  const [p1Inputs, setP1Inputs] = useState<
    Record<string, { present: string; past: string; future: string }>
  >({});

  // Part 2 Prep & Recording State
  const [prepStrategy, setPrepStrategy] = useState<"sensory" | "memory_palace">("sensory");
  const [sensoryNotes, setSensoryNotes] = useState<{
    sight: string;
    sound: string;
    smellTaste: string;
    touchAtmosphere: string;
    emotion: string;
  }>({
    sight: "",
    sound: "",
    smellTaste: "",
    touchAtmosphere: "",
    emotion: "",
  });

  const [memoryPalaceNotes, setMemoryPalaceNotes] = useState<{
    station1: string;
    station2: string;
    station3: string;
  }>({
    station1: "",
    station2: "",
    station3: "",
  });

  const [prepSecondsLeft, setPrepSecondsLeft] = useState<number>(60);
  const [isPrepping, setIsPrepping] = useState<boolean>(false);
  const [isPrepLocked, setIsPrepLocked] = useState<boolean>(false);

  const [recordSeconds, setRecordSeconds] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);

  const prepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recordTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeP1 = useMemo(() => {
    return (
      MOCK_PART1_DATA.find((p) => p.id === selectedP1Id) || MOCK_PART1_DATA[0]
    );
  }, [selectedP1Id]);

  const activeP2 = useMemo(() => {
    return (
      MOCK_PART2_CUECARDS.find((c) => c.id === selectedP2Id) ||
      MOCK_PART2_CUECARDS[0]
    );
  }, [selectedP2Id]);

  // Handle Part 1 Text change
  const setP1Field = useCallback(
    (topicId: string, field: "present" | "past" | "future", value: string) => {
      setP1Inputs((prev) => ({
        ...prev,
        [topicId]: {
          ...(prev[topicId] || { present: "", past: "", future: "" }),
          [field]: value,
        },
      }));
    },
    []
  );

  // Save and Grade Part 1
  const submitPart1 = useCallback(async (topicId: string) => {
    const input = p1Inputs[topicId] || { present: "", past: "", future: "" };
    const combined = `${input.present} ${input.past} ${input.future}`.trim();
    const wordCount = combined.split(/\s+/).filter(Boolean).length;
    const isSufficient = wordCount >= 35 && Boolean(input.present && input.past && input.future);

    if (!isSufficient) {
      db.error_bank.put({
        id: `err_p1_${Date.now()}`,
        sourceModule: "speaking",
        errorType: "careless_reading",
        questionContext: `Speaking Part 1 Short Answer Trap: ${activeP1.question}`,
        userWrongAnswer: combined || "Câu trả lời quá ngắn hoặc thiếu mốc thời gian",
        correctAnswer: "Câu trả lời Part 1 hoàn chỉnh 3 mốc: Direct + Past Contrast + Future Projection",
        deepExplanation: "Bạn bị lỗi trả lời cụt lủn ở Part 1. Hãy luôn mở rộng bằng cách so sánh với trải nghiệm trong quá khứ hoặc dự định tương lai để đạt Band 7.0+ Fluency.",
        mastered: false,
        retryCount: 0,
        consecutiveSuccesses: 0,
        createdAt: new Date().toISOString(),
      }).catch((e) => console.error("Error saving P1 error:", e));
    }

    // Save practice log
    try {
      const log: PracticeLog = {
        id: `log_p1_${Date.now()}`,
        type: "speaking_p1_p2_framework",
        materialId: topicId,
        score: isSufficient ? 7.5 : 5.5,
        timeSpentSeconds: 60,
        accuracyPercentage: isSufficient ? 88 : 55,
        createdAt: new Date().toISOString(),
      };
      await db.practice_logs.put(log);
    } catch (e) {
      console.error("Error saving P1 practice log:", e);
    }
  }, [p1Inputs, activeP1]);

  // Start 1-Min Prep Timer
  const start1MinPrep = useCallback(() => {
    setIsPrepping(true);
    setIsPrepLocked(false);
    setPrepSecondsLeft(60);

    if (prepTimerRef.current) clearInterval(prepTimerRef.current);

    prepTimerRef.current = setInterval(() => {
      setPrepSecondsLeft((prev) => {
        if (prev <= 1) {
          if (prepTimerRef.current) clearInterval(prepTimerRef.current);
          setIsPrepping(false);
          setIsPrepLocked(true);
          // Auto-start recording
          start2MinRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Start 2-Min Recording
  const start2MinRecording = useCallback(() => {
    if (prepTimerRef.current) clearInterval(prepTimerRef.current);
    setIsPrepping(false);
    setIsPrepLocked(true);
    setIsRecording(true);
    setRecordSeconds(0);

    if (recordTimerRef.current) clearInterval(recordTimerRef.current);

    recordTimerRef.current = setInterval(() => {
      setRecordSeconds((prev) => {
        if (prev >= 120) {
          if (recordTimerRef.current) clearInterval(recordTimerRef.current);
          setIsRecording(false);
          setShowSummaryModal(true);
          return 120;
        }
        return prev + 1;
      });
    }, 1000);
  }, []);

  // Stop Recording
  const stopRecording = useCallback(() => {
    if (recordTimerRef.current) clearInterval(recordTimerRef.current);
    setIsRecording(false);
    setShowSummaryModal(true);
  }, []);

  // Save Part 2 Attempt to Dexie DB
  const finishPart2Attempt = useCallback(async () => {
    const isDurationSufficient = recordSeconds >= 90;

    if (!isDurationSufficient) {
      db.error_bank.put({
        id: `err_p2_dur_${Date.now()}`,
        sourceModule: "speaking",
        errorType: "careless_reading",
        questionContext: `Speaking Part 2 Short Duration: ${activeP2.topic}`,
        userWrongAnswer: `Speaking duration: ${recordSeconds}s (Under minimal 90s threshold)`,
        correctAnswer: "Sustained continuous speech for 100 - 120 seconds",
        deepExplanation: "Bài nói Part 2 của bạn dừng lại trước mốc 1:30 khiến tiêu chí Fluency bị giới hạn ở Band 5.0 - 5.5. Hãy áp dụng mô hình 5 Giác Quan để bổ sung chi tiết miêu tả không gian và cảm xúc.",
        mastered: false,
        retryCount: 0,
        consecutiveSuccesses: 0,
        createdAt: new Date().toISOString(),
      }).catch((e) => console.error("Error saving P2 duration error:", e));
    }

    try {
      const log: PracticeLog = {
        id: `log_p2_${Date.now()}`,
        type: "speaking_p1_p2_framework",
        materialId: activeP2.id,
        score: recordSeconds >= 100 ? 8.0 : recordSeconds >= 90 ? 7.0 : 5.5,
        timeSpentSeconds: recordSeconds + (60 - prepSecondsLeft),
        accuracyPercentage: recordSeconds >= 90 ? 90 : 60,
        createdAt: new Date().toISOString(),
      };
      await db.practice_logs.put(log);
    } catch (e) {
      console.error("Error saving P2 practice log:", e);
    }
  }, [recordSeconds, prepSecondsLeft, activeP2]);

  // Load sample model notes
  const loadPart2ModelNotes = useCallback(() => {
    setSensoryNotes(activeP2.sensoryPlanModel);
    setMemoryPalaceNotes(activeP2.memoryPalacePlanModel);
  }, [activeP2]);

  const resetSession = useCallback(() => {
    if (prepTimerRef.current) clearInterval(prepTimerRef.current);
    if (recordTimerRef.current) clearInterval(recordTimerRef.current);
    setIsPrepping(false);
    setIsPrepLocked(false);
    setPrepSecondsLeft(60);
    setIsRecording(false);
    setRecordSeconds(0);
    setShowSummaryModal(false);
    setSensoryNotes({
      sight: "",
      sound: "",
      smellTaste: "",
      touchAtmosphere: "",
      emotion: "",
    });
    setMemoryPalaceNotes({
      station1: "",
      station2: "",
      station3: "",
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (prepTimerRef.current) clearInterval(prepTimerRef.current);
      if (recordTimerRef.current) clearInterval(recordTimerRef.current);
    };
  }, []);

  return {
    activeMode,
    selectedP1Id,
    selectedP2Id,
    activeP1,
    activeP2,
    p1Inputs,
    prepStrategy,
    sensoryNotes,
    memoryPalaceNotes,
    prepSecondsLeft,
    isPrepping,
    isPrepLocked,
    recordSeconds,
    isRecording,
    showSummaryModal,
    setActiveMode,
    setSelectedP1Id,
    setSelectedP2Id,
    setPrepStrategy,
    setSensoryNotes,
    setMemoryPalaceNotes,
    setP1Field,
    submitPart1,
    start1MinPrep,
    start2MinRecording,
    stopRecording,
    finishPart2Attempt,
    loadPart2ModelNotes,
    resetSession,
    setShowSummaryModal,
  };
}
