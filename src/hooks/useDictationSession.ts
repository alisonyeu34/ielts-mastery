"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  MOCK_DICTATION_DRILLS,
  DictationDrillItem,
} from "@/data/mockDictationDrillsData";
import {
  computeWordDiff,
  DictationDiffResult,
} from "@/lib/levenshteinDiffEngine";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem } from "@/types/database";
import { markPracticeCompleted } from "@/lib/taskCompletionScanner";

export function useDictationSession() {
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3 | "all">("all");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [diffResult, setDiffResult] = useState<DictationDiffResult | null>(null);

  // Audio Control
  const [playbackSpeed, setPlaybackSpeed] = useState<0.8 | 1.0>(1.0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playCount, setPlayCount] = useState<number>(0);

  // Summary & Stats
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);
  const [sessionResults, setSessionResults] = useState<
    Array<{
      drill: DictationDrillItem;
      diff: DictationDiffResult;
      plays: number;
    }>
  >([]);

  // Filter drills by level
  const filteredDrills = MOCK_DICTATION_DRILLS.filter((d) => {
    if (selectedLevel === "all") return true;
    return d.level === selectedLevel;
  });

  const currentDrill = filteredDrills[currentIndex] || filteredDrills[0];

  // Speech synthesis reference
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Play audio function
  const playAudio = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(currentDrill.targetSentence);
    utterance.rate = playbackSpeed;
    utterance.lang = "en-GB";

    // Attempt to pick a high-quality British or native English voice
    const voices = window.speechSynthesis.getVoices();
    const gbVoice = voices.find(
      (v) =>
        v.lang.includes("en-GB") ||
        v.name.includes("British") ||
        v.name.includes("UK") ||
        v.name.includes("Google UK") ||
        v.name.includes("Daniel") ||
        v.name.includes("Oliver") ||
        v.name.includes("Serena")
    );
    if (gbVoice) utterance.voice = gbVoice;

    utterance.onstart = () => {
      setIsPlaying(true);
      setPlayCount((p) => p + 1);
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [currentDrill, playbackSpeed]);

  const stopAudio = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  }, []);

  const toggleAudio = useCallback(() => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio();
    }
  }, [isPlaying, playAudio, stopAudio]);

  // Submit Dictation
  const submitDictation = useCallback(async () => {
    if (!userInput.trim()) return;

    const diff = computeWordDiff(currentDrill.targetSentence, userInput);
    setDiffResult(diff);
    setIsSubmitted(true);
    stopAudio();

    // Record to session list
    setSessionResults((prev) => [
      ...prev,
      { drill: currentDrill, diff, plays: playCount },
    ]);

    // Save to Dexie DB
    try {
      const logItem: PracticeLog = {
        id: `dict_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        type: "dictation",
        title: `Dictation L${currentDrill.level}: ${currentDrill.title}`,
        score: diff.accuracyPercentage,
        totalQuestions: 100,
        completedAt: new Date().toISOString(),
        durationSeconds: 60,
        phase: 1,
        createdAt: new Date().toISOString(),
      };
      await db.practice_logs.put(logItem);
      markPracticeCompleted("dictation");

      // Log errors if accuracy < 85% or omissions detected
      if (diff.accuracyPercentage < 85 || diff.endingOmissionsCount > 0) {
        const isPluralOrTense = diff.endingOmissionsCount > 0;
        const errItem: ErrorItem = {
          id: `err_dict_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          sourceModule: "dictation",
          errorType: isPluralOrTense ? "singular_plural" : "pronunciation",
          questionContext: `[Level ${currentDrill.level} Dictation] "${currentDrill.targetSentence}"`,
          userWrongAnswer: userInput,
          correctAnswer: currentDrill.targetSentence,
          deepExplanation: `${currentDrill.phoneticNotes.ruleVi} - ${currentDrill.phoneticNotes.acousticExplanationVi}`,
          mastered: false,
          retryCount: 0,
          createdAt: new Date().toISOString(),
        };
        await db.error_bank.put(errItem);
      }
    } catch (err) {
      console.error("Failed to save dictation log to Dexie DB:", err);
    }
  }, [userInput, currentDrill, playCount, stopAudio]);

  // Next / Prev Drill
  const nextDrill = useCallback(() => {
    stopAudio();
    if (currentIndex < filteredDrills.length - 1) {
      setCurrentIndex((i) => i + 1);
      setUserInput("");
      setIsSubmitted(false);
      setDiffResult(null);
      setPlayCount(0);
    } else {
      setIsSummaryModalOpen(true);
    }
  }, [currentIndex, filteredDrills.length, stopAudio]);

  const prevDrill = useCallback(() => {
    stopAudio();
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setUserInput("");
      setIsSubmitted(false);
      setDiffResult(null);
      setPlayCount(0);
    }
  }, [currentIndex, stopAudio]);

  const resetCurrentDrill = useCallback(() => {
    stopAudio();
    setUserInput("");
    setIsSubmitted(false);
    setDiffResult(null);
    setPlayCount(0);
  }, [stopAudio]);

  const handleLevelChange = useCallback(
    (lvl: 1 | 2 | 3 | "all") => {
      stopAudio();
      setSelectedLevel(lvl);
      setCurrentIndex(0);
      setUserInput("");
      setIsSubmitted(false);
      setDiffResult(null);
      setPlayCount(0);
    },
    [stopAudio]
  );

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in input and presses regular Space
      const target = e.target as HTMLElement;
      const isInputFocused =
        target.tagName === "INPUT" || target.tagName === "TEXTAREA";

      // Ctrl + Space: Replay Audio
      if (e.ctrlKey && e.code === "Space") {
        e.preventDefault();
        playAudio();
      }
      // Ctrl + Down: Speed 0.8x
      else if (e.ctrlKey && e.key === "ArrowDown") {
        e.preventDefault();
        setPlaybackSpeed(0.8);
      }
      // Ctrl + Up: Speed 1.0x
      else if (e.ctrlKey && e.key === "ArrowUp") {
        e.preventDefault();
        setPlaybackSpeed(1.0);
      }
      // Space when not focused in input: Toggle Audio
      else if (e.code === "Space" && !isInputFocused) {
        e.preventDefault();
        toggleAudio();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playAudio, toggleAudio]);

  return {
    selectedLevel,
    handleLevelChange,
    currentIndex,
    totalDrills: filteredDrills.length,
    currentDrill,
    userInput,
    setUserInput,
    isSubmitted,
    diffResult,
    playbackSpeed,
    setPlaybackSpeed,
    isPlaying,
    playCount,
    playAudio,
    stopAudio,
    toggleAudio,
    submitDictation,
    nextDrill,
    prevDrill,
    resetCurrentDrill,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    sessionResults,
  };
}
