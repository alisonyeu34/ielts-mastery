"use client";

import { useState, useCallback, useEffect } from "react";
import {
  ALL_IPA_PHONEMES,
  IPAPhoneme,
  MINIMAL_PAIRS_DATA,
  MinimalPairItem,
} from "@/data/mockIPAData";
import { db } from "@/lib/db";
import { PracticeLog, ErrorItem } from "@/types/database";

export function useIPAPhonetics() {
  const [masteredPhonemes, setMasteredPhonemes] = useState<Set<string>>(
    new Set(["iː", "e", "p", "b", "t", "d", "m", "s", "z"]) // Default initial seed
  );
  const [selectedPhoneme, setSelectedPhoneme] = useState<IPAPhoneme | null>(null);
  const [activeTab, setActiveTab] = useState<"ipa_matrix" | "minimal_pairs">("ipa_matrix");

  // Minimal Pairs State
  const [minimalPairIndex, setMinimalPairIndex] = useState<number>(0);
  const [targetWordSide, setTargetWordSide] = useState<"A" | "B">("A");
  const [earScore, setEarScore] = useState<number>(0);
  const [isDrillCompleted, setIsDrillCompleted] = useState<boolean>(false);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [drillHistory, setDrillHistory] = useState<
    Array<{
      pairId: string;
      targetWord: string;
      userSelected: string;
      isCorrect: boolean;
      explanation: string;
    }>
  >([]);

  // Randomize target side for current minimal pair
  const currentPair = MINIMAL_PAIRS_DATA[minimalPairIndex];
  const currentTargetWord = targetWordSide === "A" ? currentPair?.wordA : currentPair?.wordB;

  // Web Speech API Pronunciation
  const speakText = useCallback((text: string, rate = 0.85) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-GB";
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const speakPhoneme = useCallback(
    (symbol: string, exampleWord: string) => {
      // Speak example word with emphasis
      speakText(`${exampleWord}, ${exampleWord}`, 0.8);
    },
    [speakText]
  );

  const togglePhonemeMastered = useCallback((symbol: string) => {
    setMasteredPhonemes((prev) => {
      const next = new Set(prev);
      if (next.has(symbol)) {
        next.delete(symbol);
      } else {
        next.add(symbol);
      }
      return next;
    });
  }, []);

  // Answer a Minimal Pair in Ear Training Mode
  const answerMinimalPair = useCallback(
    async (selectedWord: string) => {
      if (!currentPair) return;

      const isCorrect = selectedWord === currentTargetWord;
      const explanation = `Cặp âm /${currentPair.phonemeA}/ vs /${currentPair.phonemeB}/ (${currentPair.wordA} vs ${currentPair.wordB}). ${currentPair.articulatoryDifference}`;

      if (isCorrect) {
        setEarScore((prev) => prev + 1);
      } else {
        // Save pronunciation error to Dexie DB
        db.error_bank.put({
          id: `err_ipa_${Date.now()}_${currentPair.id}`,
          sourceModule: "pronunciation",
          errorType: "pronunciation",
          questionContext: `Minimal Pair Trap: /${currentPair.phonemeA}/ vs /${currentPair.phonemeB}/ ("${currentPair.wordA}" vs "${currentPair.wordB}")`,
          userWrongAnswer: selectedWord,
          correctAnswer: currentTargetWord,
          deepExplanation: explanation,
          mastered: false,
          retryCount: 0,
          consecutiveSuccesses: 0,
          createdAt: new Date().toISOString(),
        }).catch((err) => console.error("Error saving IPA error to DB:", err));
      }

      setDrillHistory((prev) => [
        ...prev,
        {
          pairId: currentPair.id,
          targetWord: currentTargetWord,
          userSelected: selectedWord,
          isCorrect,
          explanation,
        },
      ]);

      // Move to next pair or finish
      if (minimalPairIndex + 1 < MINIMAL_PAIRS_DATA.length) {
        setMinimalPairIndex((prev) => prev + 1);
        setTargetWordSide(Math.random() > 0.5 ? "A" : "B");
      } else {
        setIsDrillCompleted(true);
        setShowResultModal(true);

        // Save Practice Log
        try {
          const finalScore = earScore + (isCorrect ? 1 : 0);
          const log: PracticeLog = {
            id: `log_ipa_drill_${Date.now()}`,
            type: "ipa_studio",
            materialId: "minimal_pairs_10",
            score: Number(((finalScore / MINIMAL_PAIRS_DATA.length) * 9).toFixed(1)),
            timeSpentSeconds: 60,
            accuracyPercentage: Math.round((finalScore / MINIMAL_PAIRS_DATA.length) * 100),
            createdAt: new Date().toISOString(),
          };
          await db.practice_logs.put(log);
        } catch (e) {
          console.error("Failed to save IPA practice log:", e);
        }
      }
    },
    [currentPair, currentTargetWord, minimalPairIndex, earScore]
  );

  const resetDrill = useCallback(() => {
    setMinimalPairIndex(0);
    setTargetWordSide(Math.random() > 0.5 ? "A" : "B");
    setEarScore(0);
    setIsDrillCompleted(false);
    setShowResultModal(false);
    setDrillHistory([]);
  }, []);

  return {
    masteredPhonemes,
    selectedPhoneme,
    activeTab,
    minimalPairIndex,
    currentPair,
    currentTargetWord,
    earScore,
    isDrillCompleted,
    showResultModal,
    drillHistory,
    setSelectedPhoneme,
    setActiveTab,
    speakText,
    speakPhoneme,
    togglePhonemeMastered,
    answerMinimalPair,
    resetDrill,
    setShowResultModal,
  };
}
