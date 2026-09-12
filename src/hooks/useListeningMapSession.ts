"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
  MOCK_SECTION2_MAP_DATA,
  ListeningMapExerciseData,
  MapQuestionItem,
} from "@/data/mockListeningMapData";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem, VocabCard } from "@/types/database";

export function useListeningMapSession() {
  const mapData = MOCK_SECTION2_MAP_DATA;

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [eliminatedLetters, setEliminatedLetters] = useState<string[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(
    mapData.questions[0].id
  );

  // Audio Playback
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(mapData.audioDurationSeconds);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);

  // Review & Forensic Mode
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isForensicMode, setIsForensicMode] = useState<boolean>(false);
  const [focusedQuestionId, setFocusedQuestionId] = useState<number | null>(null);

  // Compass rotation angle
  const [compassBearing, setCompassBearing] = useState<number>(0);

  // Modals
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [showPrepositionModal, setShowPrepositionModal] = useState<boolean>(false);

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

  // Speak paragraph from index
  const speakParagraphFromIndex = useCallback(
    (idx: number) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      if (idx < 0 || idx >= mapData.transcriptParagraphs.length) {
        setIsPlaying(false);
        return;
      }

      const currentGen = ++generationRef.current;
      window.speechSynthesis.cancel();

      const para = mapData.transcriptParagraphs[idx];
      const utterance = new SpeechSynthesisUtterance(para.text);
      utterance.lang = "en-GB";
      utterance.rate = playbackRateRef.current;
      utterance.pitch = 1.02; // Guide pitch

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
    [mapData.transcriptParagraphs]
  );

  // Assign letter to current active question
  const assignLetterToActiveQuestion = useCallback(
    (letter: string) => {
      if (isSubmitted) return;
      setAnswers((prev) => ({
        ...prev,
        [selectedQuestionId]: letter,
      }));

      // Automatically advance to the next un-answered question
      const currentIndex = mapData.questions.findIndex(
        (q) => q.id === selectedQuestionId
      );
      if (currentIndex >= 0 && currentIndex < mapData.questions.length - 1) {
        setSelectedQuestionId(mapData.questions[currentIndex + 1].id);
      }
    },
    [selectedQuestionId, isSubmitted, mapData.questions]
  );

  // Toggle strikethrough elimination on a letter
  const toggleEliminateLetter = useCallback((letter: string) => {
    setEliminatedLetters((prev) =>
      prev.includes(letter)
        ? prev.filter((l) => l !== letter)
        : [...prev, letter]
    );
  }, []);

  // Audio Controls Simulation / Synth
  const playAudio = useCallback(() => {
    setIsPlaying(true);
    const idx = mapData.transcriptParagraphs.findIndex(
      (p) => currentTime >= p.startSecond && currentTime <= p.endSecond
    );
    speakParagraphFromIndex(idx >= 0 ? idx : 0);
  }, [currentTime, mapData.transcriptParagraphs, speakParagraphFromIndex]);

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
      const target = Math.min(mapData.audioDurationSeconds, Math.max(0, seconds));
      setCurrentTime(target);

      generationRef.current++;
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }

      if (isPlayingRef.current) {
        const idx = mapData.transcriptParagraphs.findIndex(
          (p) => target >= p.startSecond && target <= p.endSecond
        );
        speakParagraphFromIndex(idx >= 0 ? idx : 0);
      }
    },
    [mapData.audioDurationSeconds, mapData.transcriptParagraphs, speakParagraphFromIndex]
  );

  // Audio timeline ticker
  useEffect(() => {
    if (isPlaying) {
      audioTimerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= mapData.audioDurationSeconds) {
            setIsPlaying(false);
            if (typeof window !== "undefined" && "speechSynthesis" in window) {
              window.speechSynthesis.cancel();
            }
            return mapData.audioDurationSeconds;
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
  }, [isPlaying, playbackRate, mapData.audioDurationSeconds]);

  // Rotate Compass
  const rotateCompass = useCallback((deltaDegrees: number) => {
    setCompassBearing((prev) => (prev + deltaDegrees + 360) % 360);
  }, []);

  // Compute Score & Results
  const scoreResult = useMemo(() => {
    let correctCount = 0;
    const details: Array<{
      question: MapQuestionItem;
      userAnswer: string;
      isCorrect: boolean;
    }> = [];

    mapData.questions.forEach((q) => {
      const userAns = answers[q.id] || "";
      const isCorrect = userAns.toUpperCase() === q.correctLetter.toUpperCase();
      if (isCorrect) correctCount++;

      details.push({
        question: q,
        userAnswer: userAns,
        isCorrect,
      });
    });

    const accuracy = Math.round((correctCount / mapData.questions.length) * 100);
    return {
      correctCount,
      totalCount: mapData.questions.length,
      accuracy,
      details,
    };
  }, [answers, mapData.questions]);

  // Submit test and persist results to DB
  const submitAnswers = useCallback(async () => {
    setIsSubmitted(true);
    setIsForensicMode(true);
    setShowSummaryModal(true);

    // Save to Error Bank for any wrong answers
    for (const item of scoreResult.details) {
      if (!item.isCorrect) {
        const errorRecord: ErrorItem = {
          id: `err_map_${Date.now()}_${item.question.id}`,
          sourceModule: "listening",
          errorType: "careless_reading",
          questionContext: `Map Labelling: "${mapData.title}" - Vị trí: ${item.question.facilityName}`,
          userWrongAnswer: item.userAnswer || "(Bỏ trống)",
          correctAnswer: item.question.correctLetter,
          deepExplanation: item.question.trapExplanationVi,
          mastered: false,
          retryCount: 0,
          consecutiveSuccesses: 0,
          createdAt: new Date().toISOString(),
        };

        try {
          await db.error_bank.put(errorRecord);
        } catch (e) {
          console.error("Error saving map error to DB:", e);
        }
      }
    }

    // Save Practice Log
    const log: PracticeLog = {
      id: `log_map_${Date.now()}_${mapData.id}`,
      type: "listening_map",
      materialId: mapData.id,
      score: Number(((scoreResult.correctCount / scoreResult.totalCount) * 9).toFixed(1)),
      timeSpentSeconds: currentTime,
      accuracyPercentage: scoreResult.accuracy,
      createdAt: new Date().toISOString(),
    };

    try {
      await db.practice_logs.put(log);
    } catch (e) {
      console.error("Error saving practice log to DB:", e);
    }
  }, [scoreResult, mapData, currentTime]);

  // Save Spatial Vocabulary to FSRS Vocab Deck
  const saveSpatialVocabToFSRS = useCallback(async () => {
    for (const item of mapData.spatialLexicon) {
      const card: VocabCard = {
        id: `vocab_map_${item.phrase.toLowerCase().replace(/\s+/g, "_")}`,
        word: item.phrase,
        ipa: "",
        meaning: item.meaningVi,
        collocations: [item.phrase, "Map Preposition"],
        originalContext: item.exampleInMap,
        category: "topic_specific",
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
        console.error("Error saving spatial vocab to FSRS:", e);
      }
    }
  }, [mapData.spatialLexicon]);

  // Jump audio and highlight specific question path
  const jumpToQuestionEvidence = useCallback(
    (questionId: number) => {
      const q = mapData.questions.find((item) => item.id === questionId);
      if (q) {
        seekToSecond(q.audioTimestampSeconds);
        setFocusedQuestionId(questionId);
        setIsPlaying(true);
      }
    },
    [mapData.questions, seekToSecond]
  );

  const resetSession = useCallback(() => {
    pauseAudio();
    setAnswers({});
    setEliminatedLetters([]);
    setSelectedQuestionId(mapData.questions[0].id);
    setIsSubmitted(false);
    setIsForensicMode(false);
    setFocusedQuestionId(null);
    setCurrentTime(0);
    setShowSummaryModal(false);
    setCompassBearing(0);
  }, [mapData.questions, pauseAudio]);

  return {
    mapData,
    answers,
    eliminatedLetters,
    selectedQuestionId,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    isSubmitted,
    isForensicMode,
    focusedQuestionId,
    compassBearing,
    showSummaryModal,
    showPrepositionModal,
    scoreResult,
    setSelectedQuestionId,
    setPlaybackRate,
    assignLetterToActiveQuestion,
    toggleEliminateLetter,
    playAudio,
    pauseAudio,
    togglePlay,
    seekToSecond,
    rotateCompass,
    jumpToQuestionEvidence,
    submitAnswers,
    resetSession,
    saveSpatialVocabToFSRS,
    setShowSummaryModal,
    setShowPrepositionModal,
    setIsForensicMode,
  };
}
