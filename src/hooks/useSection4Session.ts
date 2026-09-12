"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
  MOCK_SECTION4_LECTURE_DATA,
  Section4LectureExerciseData,
  S4QuestionItem,
} from "@/data/mockSection4LectureData";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem, VocabCard } from "@/types/database";

export type Section4Stage = "predicting" | "listening" | "reviewing";

export function useSection4Session() {
  const data = MOCK_SECTION4_LECTURE_DATA;

  const [stage, setStage] = useState<Section4Stage>("predicting");
  const [prepSecondsLeft, setPrepSecondsLeft] = useState<number>(60);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [predictions, setPredictions] = useState<
    Record<number, { pos: string; anchor: string }>
  >({});
  const [selectedQuestionNumber, setSelectedQuestionNumber] = useState<number>(
    data.questions[0].number
  );

  // Audio Playback
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(data.totalAudioDurationSeconds);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);

  // Modals & Drawers
  const [showPredictionModal, setShowPredictionModal] = useState<boolean>(true);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const prepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioTimerRef = useRef<NodeJS.Timeout | null>(null);
  const generationRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const playbackRateRef = useRef<number>(1.0);

  isPlayingRef.current = isPlaying;
  playbackRateRef.current = playbackRate;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (audioTimerRef.current) clearInterval(audioTimerRef.current);
      if (prepTimerRef.current) clearInterval(prepTimerRef.current);
    };
  }, []);

  // Chrome Watchdog: keep SpeechSynthesis alive
  useEffect(() => {
    let watchdog: NodeJS.Timeout;
    if (isPlaying) {
      watchdog = setInterval(() => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
        }
      }, 3000);
    }
    return () => clearInterval(watchdog);
  }, [isPlaying]);

  // Speak academic lecture paragraph from index
  const speakParagraphFromIndex = useCallback(
    (idx: number) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      if (idx < 0 || idx >= data.transcriptParagraphs.length) {
        setIsPlaying(false);
        return;
      }

      const currentGen = ++generationRef.current;
      window.speechSynthesis.cancel();

      const para = data.transcriptParagraphs[idx];
      const utterance = new SpeechSynthesisUtterance(para.text);
      utterance.lang = "en-GB";
      utterance.rate = playbackRateRef.current;
      utterance.pitch = 1.02; // Academic lecturer pitch

      const voices = window.speechSynthesis.getVoices();
      const ukVoice =
        voices.find((v) => v.lang.includes("en-GB") || v.name.includes("UK") || v.name.includes("British")) ||
        voices.find((v) => v.lang.startsWith("en"));
      if (ukVoice) utterance.voice = ukVoice;

      utterance.onend = () => {
        if (generationRef.current !== currentGen) return;
        if (!isPlayingRef.current) return;
        speakParagraphFromIndex(idx + 1);
      };

      utterance.onerror = (e) => {
        if (e.error === "interrupted" || e.error === "canceled") return;
        if (generationRef.current !== currentGen) return;
        if (!isPlayingRef.current) return;
        speakParagraphFromIndex(idx + 1);
      };

      window.speechSynthesis.speak(utterance);
    },
    [data.transcriptParagraphs]
  );

  // Active Section Index based on currentTime
  const activeSectionIndex = useMemo(() => {
    const found = data.sections.findIndex(
      (sec) =>
        currentTime >= sec.startTimestampSeconds &&
        currentTime <= sec.endTimestampSeconds
    );
    return found >= 0 ? found : 0;
  }, [data.sections, currentTime]);

  // Set Single Word Answer (Sanitized: ONE WORD ONLY)
  const setAnswer = useCallback(
    (qNum: number, word: string) => {
      if (stage === "reviewing") return;
      // Extract first word only, strip special characters except hyphens
      const cleaned = word.trim().split(/\s+/)[0] || "";
      setAnswers((prev) => ({
        ...prev,
        [qNum]: cleaned,
      }));
    },
    [stage]
  );

  // Set Pre-listening Prediction
  const setPrediction = useCallback(
    (qNum: number, prediction: { pos: string; anchor: string }) => {
      setPredictions((prev) => ({
        ...prev,
        [qNum]: prediction,
      }));
    },
    []
  );

  // Audio Controls Simulation
  const playAudio = useCallback(() => {
    setIsPlaying(true);
    const idx = data.transcriptParagraphs.findIndex(
      (p) => currentTime >= p.startSecond && currentTime <= p.endSecond
    );
    speakParagraphFromIndex(idx >= 0 ? idx : 0);
  }, [currentTime, data.transcriptParagraphs, speakParagraphFromIndex]);

  const pauseAudio = useCallback(() => {
    generationRef.current++;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlayingRef.current) {
      pauseAudio();
    } else {
      playAudio();
    }
  }, [pauseAudio, playAudio]);

  const seekToSecond = useCallback(
    (seconds: number) => {
      const target = Math.min(data.totalAudioDurationSeconds, Math.max(0, seconds));
      setCurrentTime(target);

      generationRef.current++;
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }

      if (isPlayingRef.current) {
        const idx = data.transcriptParagraphs.findIndex(
          (p) => target >= p.startSecond && target <= p.endSecond
        );
        speakParagraphFromIndex(idx >= 0 ? idx : 0);
      }
    },
    [data.totalAudioDurationSeconds, data.transcriptParagraphs, speakParagraphFromIndex]
  );

  // Start Listening Phase
  const startListeningPhase = useCallback(() => {
    setStage("listening");
    setShowPredictionModal(false);
    setIsPlaying(true);
    if (prepTimerRef.current) clearInterval(prepTimerRef.current);
    speakParagraphFromIndex(0);
  }, [speakParagraphFromIndex]);

  // 60-Second Prediction Countdown Timer
  useEffect(() => {
    if (stage === "predicting" && prepSecondsLeft > 0) {
      prepTimerRef.current = setInterval(() => {
        setPrepSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(prepTimerRef.current!);
            startListeningPhase();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (prepTimerRef.current) clearInterval(prepTimerRef.current);
    };
  }, [stage, prepSecondsLeft, startListeningPhase]);

  // Audio timeline ticker
  useEffect(() => {
    if (isPlaying) {
      audioTimerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= data.totalAudioDurationSeconds) {
            setIsPlaying(false);
            if (typeof window !== "undefined" && "speechSynthesis" in window) {
              window.speechSynthesis.cancel();
            }
            return data.totalAudioDurationSeconds;
          }
          return prev + 1;
        });
      }, 1000 / playbackRate);
    } else {
      if (audioTimerRef.current) clearInterval(audioTimerRef.current);
    }

    return () => {
      if (audioTimerRef.current) clearInterval(audioTimerRef.current);
    };
  }, [isPlaying, playbackRate, data.totalAudioDurationSeconds]);

  // Jump to specific Question evidence
  const jumpToQuestionEvidence = useCallback(
    (questionNumber: number) => {
      const q = data.questions.find((item) => item.number === questionNumber);
      if (q) {
        seekToSecond(q.audioTimestampSeconds);
        setSelectedQuestionNumber(questionNumber);
        setIsPlaying(true);
      }
    },
    [data.questions, seekToSecond]
  );

  // Compute Grade & Detailed Errors
  const scoreResult = useMemo(() => {
    let correctCount = 0;
    const details: Array<{
      question: S4QuestionItem;
      userAnswer: string;
      isCorrect: boolean;
      isPluralError: boolean;
    }> = [];

    data.questions.forEach((q) => {
      const userAns = (answers[q.number] || "").trim().toLowerCase();
      const isCorrect =
        userAns === q.correctWord.toLowerCase() ||
        (q.acceptedAlternates || []).some(
          (alt) => alt.toLowerCase() === userAns
        );

      if (isCorrect) correctCount++;

      details.push({
        question: q,
        userAnswer: userAns,
        isCorrect,
        isPluralError: !isCorrect && q.isPlural,
      });
    });

    const pluralErrorCount = details.filter((d) => d.isPluralError).length;
    const totalCount = data.questions.length;
    const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    const estimatedBand =
      correctCount >= 9
        ? "8.5 - 9.0"
        : correctCount >= 7
        ? "7.0 - 7.5"
        : correctCount >= 5
        ? "6.0 - 6.5"
        : "5.0 - 5.5";

    return {
      correctCount,
      totalCount,
      pluralErrorCount,
      accuracy,
      estimatedBand,
      details,
    };
  }, [answers, data.questions]);

  // Submit test and persist to Dexie DB
  const submitAnswers = useCallback(async () => {
    setStage("reviewing");
    setIsDrawerOpen(true);
    setShowSummaryModal(true);

    // Persist wrong answers to Error Bank
    for (const item of scoreResult.details) {
      if (!item.isCorrect) {
        const errorRecord: ErrorItem = {
          id: `err_s4_${Date.now()}_${item.question.number}`,
          sourceModule: "listening",
          errorType: "singular_plural",
          questionContext: `Section 4: "${data.title}" - Câu ${item.question.number}: ${item.question.noteContext}`,
          userWrongAnswer: item.userAnswer || "(Bỏ trống)",
          correctAnswer: item.question.correctWord,
          deepExplanation: item.question.pedagogicalAdvice,
          mastered: false,
          retryCount: 0,
          consecutiveSuccesses: 0,
          createdAt: new Date().toISOString(),
        };

        try {
          await db.error_bank.put(errorRecord);
        } catch (e) {
          console.error("Error saving S4 error to DB:", e);
        }
      }
    }

    // Save Practice Log
    const log: PracticeLog = {
      id: `log_s4_${Date.now()}_${data.id}`,
      type: "listening_s4",
      materialId: data.id,
      score: Number(((scoreResult.correctCount / scoreResult.totalCount) * 9).toFixed(1)),
      timeSpentSeconds: currentTime,
      accuracyPercentage: scoreResult.accuracy,
      createdAt: new Date().toISOString(),
    };

    try {
      await db.practice_logs.put(log);
    } catch (e) {
      console.error("Error saving S4 practice log to DB:", e);
    }
  }, [scoreResult, data, currentTime]);

  // Save AWL Vocabulary to FSRS
  const saveAwlVocabToFSRS = useCallback(async () => {
    for (const item of data.awlVocabulary) {
      const card: VocabCard = {
        id: `vocab_s4_${item.word.toLowerCase()}`,
        word: item.word,
        ipa: item.ipa,
        meaning: item.meaningVi,
        collocations: [item.word, "Academic Monologue"],
        originalContext: item.contextSentence,
        category: "awl_570",
        status: "new",
        stepInterval: 1,
        nextReviewDate: new Date(Date.now() + 86400000).toISOString(),
        repetitionCount: 0,
        lapsesCount: 0,
        stability: 1.0,
        difficulty: 5.0,
        sourceModule: "listening",
        createdAt: new Date().toISOString(),
      };
      try {
        await db.vocab_matrix.put(card);
      } catch (e) {
        console.error("Error saving AWL vocab to FSRS:", e);
      }
    }
  }, [data.awlVocabulary]);

  const resetSession = useCallback(() => {
    pauseAudio();
    setAnswers({});
    setPredictions({});
    setSelectedQuestionNumber(data.questions[0].number);
    setStage("predicting");
    setPrepSecondsLeft(60);
    setCurrentTime(0);
    setShowSummaryModal(false);
    setShowPredictionModal(true);
    setIsDrawerOpen(false);
  }, [data.questions, pauseAudio]);

  return {
    data,
    stage,
    prepSecondsLeft,
    answers,
    predictions,
    selectedQuestionNumber,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    activeSectionIndex,
    showPredictionModal,
    showSummaryModal,
    isDrawerOpen,
    scoreResult,
    setSelectedQuestionNumber,
    setPlaybackRate,
    setAnswer,
    setPrediction,
    startListeningPhase,
    playAudio,
    pauseAudio,
    togglePlay,
    seekToSecond,
    jumpToQuestionEvidence,
    submitAnswers,
    resetSession,
    saveAwlVocabToFSRS,
    setShowPredictionModal,
    setShowSummaryModal,
    setIsDrawerOpen,
  };
}
