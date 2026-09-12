"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  SpeakingSetData,
  MOCK_SPEAKING_SETS,
  FiveSensesNotes,
  MemoryPalaceNotes,
} from "@/data/mockSpeakingP1P2Data";
import { db } from "@/lib/db";
import { ErrorItem, PracticeLog, AISubmission } from "@/types/database";

export type SpeakingPhase = "idle" | "preparing" | "speaking" | "completed";
export type PlannerMode = "five_senses" | "memory_palace";

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

export function useSpeakingSession() {
  const [activeSetId, setActiveSetId] = useState<string>("set_1_music_performance");
  const [sessionMode, setSessionMode] = useState<"part1" | "part2">("part1");

  // Part 1 States
  const [activeP1Index, setActiveP1Index] = useState<number>(0);
  const [p1Answers, setP1Answers] = useState<
    Record<string, { present: string; past: string; future: string }>
  >({});

  // Part 2 States
  const [phase, setPhase] = useState<SpeakingPhase>("idle");
  const [prepTimeRemaining, setPrepTimeRemaining] = useState<number>(60);
  const [speakingTimeElapsed, setSpeakingTimeElapsed] = useState<number>(0);
  const [plannerMode, setPlannerMode] = useState<PlannerMode>("five_senses");

  const [fiveSensesNotes, setFiveSensesNotes] = useState<FiveSensesNotes>({
    sight: "",
    sound: "",
    smell: "",
    taste: "",
    touchEmotion: "",
  });

  const [memoryPalaceNotes, setMemoryPalaceNotes] = useState<MemoryPalaceNotes>({
    station1: "",
    station2: "",
    station3: "",
    station4: "",
  });

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const activeSet: SpeakingSetData = useMemo(() => {
    return (
      MOCK_SPEAKING_SETS.find((s) => s.id === activeSetId) ||
      MOCK_SPEAKING_SETS[0]
    );
  }, [activeSetId]);

  // Audio Recording initialization
  const startRecordingAudio = async () => {
    try {
      if (typeof window === "undefined" || !navigator.mediaDevices) return;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.warn("Microphone access denied or unavailable in this environment:", err);
    }
  };

  const stopRecordingAudio = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Preparation Countdown Timer (60s)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (phase === "preparing") {
      interval = setInterval(() => {
        setPrepTimeRemaining((prev) => {
          if (prev <= 1) {
            // Auto transition to speaking
            setPhase("speaking");
            startRecordingAudio();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [phase]);

  // Speaking Elapsed Timer (0 -> 120s)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (phase === "speaking") {
      interval = setInterval(() => {
        setSpeakingTimeElapsed((prev) => {
          if (prev >= 125) {
            // Auto cut-off after 2 mins 5s
            stopRecordingAudio();
            setPhase("completed");
            return 125;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [phase]);

  // Part 1 Handlers
  const setP1Field = useCallback(
    (questionId: string, field: "present" | "past" | "future", value: string) => {
      setP1Answers((prev) => {
        const current = prev[questionId] || { present: "", past: "", future: "" };
        return {
          ...prev,
          [questionId]: { ...current, [field]: value },
        };
      });
    },
    []
  );

  const savePart1Answers = useCallback(
    async (setData: SpeakingSetData) => {
      for (const q of setData.part1Questions) {
        const ans = p1Answers[q.id] || { present: "", past: "", future: "" };
        const totalWords =
          countWords(ans.present) +
          countWords(ans.past) +
          countWords(ans.future);

        const isMissingTimeline =
          !ans.present.trim() || !ans.past.trim() || !ans.future.trim();

        if (totalWords < 20 || isMissingTimeline) {
          try {
            const errorItem: ErrorItem = {
              id: `err_spk_p1_${Date.now()}_${q.id}`,
              sourceModule: "speaking",
              errorType: "grammar",
              questionContext: `[Speaking Part 1 Timeline Expansion - ${q.topic}] ${q.questionText}`,
              userWrongAnswer: `Present: ${ans.present || "trống"} | Past: ${ans.past || "trống"} | Future: ${ans.future || "trống"}`,
              correctAnswer: `${q.sampleAnswer.present} ${q.sampleAnswer.past} ${q.sampleAnswer.future}`,
              deepExplanation:
                "[Lỗi Trả Lời Ngắn / Thiếu Linh Hoạt Thì] Trả lời Part 1 cần áp dụng đầy đủ 3 mốc thời gian Past-Present-Future để chứng minh khả năng kiểm soát đa dạng thì ngữ pháp với giám khảo (Band 6.5+ Grammatical Range).",
              mastered: false,
              retryCount: 0,
              createdAt: new Date().toISOString(),
            };
            await db.error_bank.put(errorItem);
          } catch (e) {
            console.error("Failed to save Part 1 mistake to DB:", e);
          }
        }
      }

      // Save practice log
      try {
        const log: PracticeLog = {
          id: `prac_spk_p1_${Date.now()}`,
          type: "speaking",
          materialId: setData.id,
          score: 7,
          timeSpentSeconds: 300,
          accuracyPercentage: 85,
          createdAt: new Date().toISOString(),
        };
        await db.practice_logs.put(log);
      } catch (logErr) {
        console.error("Failed to save Part 1 practice log:", logErr);
      }
    },
    [p1Answers]
  );

  // Part 2 Handlers
  const startPrep = useCallback(() => {
    setPrepTimeRemaining(60);
    setSpeakingTimeElapsed(0);
    setAudioUrl(null);
    setPhase("preparing");
  }, []);

  const skipToSpeaking = useCallback(() => {
    setPrepTimeRemaining(0);
    setSpeakingTimeElapsed(0);
    setPhase("speaking");
    startRecordingAudio();
  }, []);

  const finishSpeaking = useCallback(
    async (task: SpeakingSetData["part2Task"]) => {
      stopRecordingAudio();
      setPhase("completed");

      // Check speaking time
      const isUnderlength = speakingTimeElapsed < 90;

      if (isUnderlength) {
        try {
          const errorItem: ErrorItem = {
            id: `err_spk_p2_len_${Date.now()}`,
            sourceModule: "speaking",
            errorType: "careless_reading",
            questionContext: `[Speaking Part 2 Time Management - ${task.cueCardTitle}]`,
            userWrongAnswer: `Thời gian nói: ${speakingTimeElapsed} giây`,
            correctAnswer: "Duy trì độc thoại từ 1 phút 45 giây đến 2 phút 00 giây.",
            deepExplanation:
              "[Lỗi Chưa Đủ Thời Lượng Part 2] Nói dưới 1 phút 30 giây sẽ bị trừ điểm tiêu chí Fluency & Coherence. Hãy áp dụng Mô hình 5 Giác Quan hoặc Lâu Đài Trí Nhớ để mở rộng chi tiết miêu tả.",
            mastered: false,
            retryCount: 0,
            createdAt: new Date().toISOString(),
          };
          await db.error_bank.put(errorItem);
        } catch (e) {
          console.error("Failed to save Part 2 length error to DB:", e);
        }
      }

      // Save AI Submission record
      try {
        const sub: AISubmission = {
          id: `sub_spk_p2_${Date.now()}`,
          skill: "speaking_part2",
          promptQuestion: task.cueCardTitle,
          userContent: `[Part 2 Audio Recording - ${speakingTimeElapsed}s]`,
          wordCount: Math.round(speakingTimeElapsed * 2.2),
          scores: {
            tr: isUnderlength ? 5.5 : 7.0,
            cc: isUnderlength ? 5.0 : 7.0,
            lr: 7.0,
            gra: 6.5,
            overall: isUnderlength ? 5.5 : 7.0,
          },
          detailedFeedback: {
            grammarErrors: [],
            c1Upgrades: [],
            generalComment: isUnderlength
              ? "Bài nói Part 2 hơi ngắn (dưới 90s). Cần mở rộng thêm các chi tiết cảm xúc và bối cảnh không gian."
              : "Thời lượng nói xuất sắc (đạt vùng an toàn 1:45 - 2:00 của giám khảo). Dàn ý phát triển mạch lạc.",
          },
          createdAt: new Date().toISOString(),
        };
        await db.ai_submissions.put(sub);

        const log: PracticeLog = {
          id: `prac_spk_p2_${Date.now()}`,
          type: "speaking",
          materialId: task.id,
          score: isUnderlength ? 5.5 : 7.0,
          timeSpentSeconds: speakingTimeElapsed + 60,
          accuracyPercentage: isUnderlength ? 60 : 90,
          createdAt: new Date().toISOString(),
        };
        await db.practice_logs.put(log);
      } catch (err) {
        console.error("Failed to save Part 2 submission to DB:", err);
      }
    },
    [speakingTimeElapsed]
  );

  const loadSamplePart2Notes = useCallback(() => {
    setFiveSensesNotes({ ...activeSet.part2Task.sample5Senses });
    setMemoryPalaceNotes({ ...activeSet.part2Task.sampleMemoryPalace });
  }, [activeSet]);

  const resetAll = useCallback(() => {
    stopRecordingAudio();
    setPhase("idle");
    setPrepTimeRemaining(60);
    setSpeakingTimeElapsed(0);
    setAudioUrl(null);
    setP1Answers({});
    setFiveSensesNotes({ sight: "", sound: "", smell: "", taste: "", touchEmotion: "" });
    setMemoryPalaceNotes({ station1: "", station2: "", station3: "", station4: "" });
  }, []);

  return {
    activeSetId,
    activeSet,
    sessionMode,
    activeP1Index,
    p1Answers,
    phase,
    prepTimeRemaining,
    speakingTimeElapsed,
    plannerMode,
    fiveSensesNotes,
    memoryPalaceNotes,
    isRecording,
    audioUrl,
    setActiveSetId,
    setSessionMode,
    setActiveP1Index,
    setP1Field,
    savePart1Answers,
    setPlannerMode,
    setFiveSensesNotes,
    setMemoryPalaceNotes,
    startPrep,
    skipToSpeaking,
    finishSpeaking,
    loadSamplePart2Notes,
    resetAll,
  };
}
