"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  MOCK_LISTENING_SPLIT_SECTION3,
  ListeningSplitData,
  ListeningQuestion,
  TranscriptSentence,
} from "@/data/mockListeningSplitData";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem } from "@/types/database";

export function useListeningSplitSession(
  data: ListeningSplitData = MOCK_LISTENING_SPLIT_SECTION3
) {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(data.totalDurationSec);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [volume, setVolume] = useState<number>(0.9);
  const [blindMode, setBlindMode] = useState<boolean>(true);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showDistractorDrawer, setShowDistractorDrawer] = useState<boolean>(false);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [activeEvidenceQuestionId, setActiveEvidenceQuestionId] = useState<string | null>(null);

  const evidenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const generationRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const playbackRateRef = useRef<number>(1.0);

  isPlayingRef.current = isPlaying;
  playbackRateRef.current = playbackRate;

  // Cleanup Web Speech API on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (evidenceTimeoutRef.current) clearTimeout(evidenceTimeoutRef.current);
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

  // Audio Playback Simulation Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.25 * playbackRateRef.current;
          if (next >= duration) {
            setIsPlaying(false);
            if (typeof window !== "undefined" && "speechSynthesis" in window) {
              window.speechSynthesis.cancel();
            }
            return duration;
          }
          return next;
        });
      }, 250);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Determine active transcript sentence based on currentTime
  const activeSentence = data.transcript.find(
    (t) => currentTime >= t.startTimeSec && currentTime <= t.endTimeSec
  );
  const activeSentenceId = activeSentence?.id || null;

  // Speak a sentence chunk by index using Web Speech API
  const speakSentenceFromIndex = useCallback(
    (index: number) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      if (index < 0 || index >= data.transcript.length) {
        setIsPlaying(false);
        return;
      }

      const currentGen = ++generationRef.current;
      window.speechSynthesis.cancel();

      const sent = data.transcript[index];
      const utterance = new SpeechSynthesisUtterance(sent.text);
      utterance.lang = "en-GB";
      utterance.rate = playbackRateRef.current;

      // Modulate speaker pitch
      const spk = sent.speaker.toLowerCase();
      if (spk.includes("maya") || spk.includes("woman") || spk.includes("helen")) {
        utterance.pitch = 1.15;
      } else if (spk.includes("liam") || spk.includes("mark") || spk.includes("man")) {
        utterance.pitch = 0.90;
      } else {
        utterance.pitch = 1.02; // Dr. Stevens
      }

      const voices = window.speechSynthesis.getVoices();
      const ukVoice =
        voices.find((v) => v.lang.includes("en-GB") || v.name.includes("UK") || v.name.includes("British")) ||
        voices.find((v) => v.lang.startsWith("en"));
      if (ukVoice) utterance.voice = ukVoice;

      utterance.onend = () => {
        if (generationRef.current !== currentGen) return;
        if (!isPlayingRef.current) return;
        speakSentenceFromIndex(index + 1);
      };

      utterance.onerror = (e) => {
        if (e.error === "interrupted" || e.error === "canceled") return;
        if (generationRef.current !== currentGen) return;
        if (!isPlayingRef.current) return;
        speakSentenceFromIndex(index + 1);
      };

      window.speechSynthesis.speak(utterance);
    },
    [data.transcript]
  );

  const play = useCallback(() => {
    setIsPlaying(true);
    const idx = data.transcript.findIndex(
      (t) => currentTime >= t.startTimeSec && currentTime <= t.endTimeSec
    );
    speakSentenceFromIndex(idx >= 0 ? idx : 0);
  }, [currentTime, data.transcript, speakSentenceFromIndex]);

  const pause = useCallback(() => {
    generationRef.current++;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlayingRef.current) {
      pause();
    } else {
      play();
    }
  }, [pause, play]);

  const seek = useCallback(
    (timeSec: number) => {
      const target = Math.max(0, Math.min(duration, timeSec));
      setCurrentTime(target);

      generationRef.current++;
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }

      if (isPlayingRef.current) {
        const idx = data.transcript.findIndex(
          (t) => target >= t.startTimeSec && target <= t.endTimeSec
        );
        speakSentenceFromIndex(idx >= 0 ? idx : 0);
      }
    },
    [duration, data.transcript, speakSentenceFromIndex]
  );

  const setAnswer = useCallback((questionId: string, val: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: val,
    }));
  }, []);

  // Jump to evidence audio segment (5-10s) with live speech recitation
  const jumpToEvidence = useCallback(
    (startTimeSec: number, durationSec = 8, questionId?: string) => {
      if (evidenceTimeoutRef.current) {
        clearTimeout(evidenceTimeoutRef.current);
      }

      seek(startTimeSec);
      setIsPlaying(true);
      if (questionId) {
        setActiveEvidenceQuestionId(questionId);
      }

      // Smooth scroll transcript sentence into view
      if (typeof document !== "undefined") {
        const sentence = data.transcript.find(
          (t) => startTimeSec >= t.startTimeSec && startTimeSec <= t.endTimeSec
        );
        if (sentence) {
          const el = document.getElementById(`sentence_${sentence.id}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      }

      // Start speaking from this sentence
      const idx = data.transcript.findIndex(
        (t) => startTimeSec >= t.startTimeSec && startTimeSec <= t.endTimeSec
      );
      speakSentenceFromIndex(idx >= 0 ? idx : 0);

      // Auto pause after durationSec
      evidenceTimeoutRef.current = setTimeout(() => {
        pause();
        setActiveEvidenceQuestionId(null);
      }, durationSec * 1000);
    },
    [seek, data.transcript, speakSentenceFromIndex, pause]
  );

  // Submit test and sync with Dexie DB
  const submitListeningTest = useCallback(async () => {
    setIsSubmitted(true);
    setBlindMode(false); // Unlock transcript for forensic review

    let correctCount = 0;
    const questions = data.questions;

    for (const q of questions) {
      const userAns = (answers[q.id] || "").trim().toLowerCase();
      const correctAns = q.correctAnswer.trim().toLowerCase();

      const isCorrect =
        userAns === correctAns ||
        (q.type === "form_completion" &&
          (userAns.includes(correctAns) || correctAns.includes(userAns)));

      if (isCorrect) {
        correctCount++;
      } else {
        // Save to Error Bank
        db.error_bank.put({
          id: `err_split_ls_${Date.now()}_${q.id}`,
          sourceModule: "listening",
          errorType: q.trapType,
          questionContext: `Listening Section ${data.sectionNumber}: "${data.title}" - Câu ${q.number}: ${q.prompt}`,
          userWrongAnswer: answers[q.id] || "(Bỏ trống)",
          correctAnswer: q.correctAnswer,
          deepExplanation: q.trapExplanation,
          mastered: false,
          retryCount: 0,
          consecutiveSuccesses: 0,
          createdAt: new Date().toISOString(),
        }).catch((err) => console.error("Error saving listening error to DB:", err));
      }
    }

    const accuracy = Math.round((correctCount / questions.length) * 100);

    // Save Practice Log
    try {
      const log: PracticeLog = {
        id: `log_split_ls_${Date.now()}_${data.id}`,
        type: "listening_splitview",
        materialId: data.id,
        score: Number(((correctCount / questions.length) * 9).toFixed(1)),
        timeSpentSeconds: Math.round(currentTime),
        accuracyPercentage: accuracy,
        createdAt: new Date().toISOString(),
      };
      await db.practice_logs.put(log);
    } catch (e) {
      console.error("Failed to save listening practice log:", e);
    }

    setShowResultModal(true);
  }, [answers, data, currentTime]);

  const resetSession = useCallback(() => {
    pause();
    setCurrentTime(0);
    setAnswers({});
    setIsSubmitted(false);
    setBlindMode(true);
    setShowDistractorDrawer(false);
    setShowResultModal(false);
    setActiveEvidenceQuestionId(null);
  }, [pause]);

  const completedCount = Object.keys(answers).filter((k) => (answers[k] || "").trim().length > 0).length;

  return {
    currentTime,
    duration,
    isPlaying,
    playbackRate,
    volume,
    blindMode,
    activeSentenceId,
    answers,
    isSubmitted,
    showDistractorDrawer,
    showResultModal,
    activeEvidenceQuestionId,
    completedCount,
    play,
    pause,
    togglePlay,
    seek,
    setPlaybackRate,
    setVolume,
    setBlindMode,
    setAnswer,
    jumpToEvidence,
    submitListeningTest,
    resetSession,
    setShowDistractorDrawer,
    setShowResultModal,
  };
}
