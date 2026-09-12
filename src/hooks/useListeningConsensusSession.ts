"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  MOCK_SECTION3_DIALOGUES,
  Section3DialogueScenario,
  Section3Question
} from "@/data/mockSection3DialoguesData";
import {
  resolveActiveSpeakerTurn,
  ConsensusResolutionResult
} from "@/lib/consensusStateMachine";
import { db } from "@/lib/db";

export function useListeningConsensusSession(initialScenarioId?: string) {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    initialScenarioId || MOCK_SECTION3_DIALOGUES[0].id
  );

  const currentScenario: Section3DialogueScenario = useMemo(() => {
    return (
      MOCK_SECTION3_DIALOGUES.find((s) => s.id === selectedScenarioId) ||
      MOCK_SECTION3_DIALOGUES[0]
    );
  }, [selectedScenarioId]);

  // Audio timer state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const generationRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  isPlayingRef.current = isPlaying;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Chrome Watchdog
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

  // Speak turn from index
  const speakTurnFromIndex = useCallback(
    (idx: number) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      if (idx < 0 || idx >= currentScenario.dialogueTurns.length) {
        setIsPlaying(false);
        return;
      }

      const currentGen = ++generationRef.current;
      window.speechSynthesis.cancel();

      const turn = currentScenario.dialogueTurns[idx];
      const utterance = new SpeechSynthesisUtterance(turn.utteranceText);
      utterance.lang = "en-GB";

      const spk = (turn.speakerName || "").toLowerCase();
      if (spk.includes("helen") || spk.includes("emily") || spk.includes("woman") || spk.includes("maya")) {
        utterance.pitch = 1.15;
      } else if (spk.includes("mark") || spk.includes("jack") || spk.includes("man") || spk.includes("liam")) {
        utterance.pitch = 0.90;
      } else {
        utterance.pitch = 1.02; // Professor / Tutor
      }

      const voices = window.speechSynthesis.getVoices();
      const ukVoice =
        voices.find((v) => v.lang.includes("en-GB") || v.name.includes("UK") || v.name.includes("British")) ||
        voices.find((v) => v.lang.startsWith("en"));
      if (ukVoice) utterance.voice = ukVoice;

      utterance.onend = () => {
        if (generationRef.current !== currentGen) return;
        if (!isPlayingRef.current) return;
        speakTurnFromIndex(idx + 1);
      };

      utterance.onerror = (e) => {
        if (e.error === "interrupted" || e.error === "canceled") return;
        if (generationRef.current !== currentGen) return;
        if (!isPlayingRef.current) return;
        speakTurnFromIndex(idx + 1);
      };

      window.speechSynthesis.speak(utterance);
    },
    [currentScenario.dialogueTurns]
  );

  // Audio interval simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeSec((prev) => {
          const next = prev + 1;
          if (next >= currentScenario.durationSec) {
            setIsPlaying(false);
            if (typeof window !== "undefined" && "speechSynthesis" in window) {
              window.speechSynthesis.cancel();
            }
            return currentScenario.durationSec;
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentScenario.durationSec]);

  // Handle play/pause toggle
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      generationRef.current++;
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const idx = currentScenario.dialogueTurns.findIndex(
        (t) => currentTimeSec >= t.startSec && currentTimeSec <= t.endSec
      );
      speakTurnFromIndex(idx >= 0 ? idx : 0);
    }
  }, [isPlaying, currentScenario.dialogueTurns, currentTimeSec, speakTurnFromIndex]);

  // Active consensus state resolution
  const consensusResolution: ConsensusResolutionResult = useMemo(() => {
    return resolveActiveSpeakerTurn(
      currentTimeSec,
      currentScenario.dialogueTurns
    );
  }, [currentTimeSec, currentScenario]);

  const handleSelectScenario = (scenarioId: string) => {
    generationRef.current++;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSelectedScenarioId(scenarioId);
    setIsPlaying(false);
    setCurrentTimeSec(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setIsSaved(false);
  };

  const handleSelectAnswer = (questionId: string, optionKey: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey
    }));
  };

  const submitQuiz = () => {
    setIsSubmitted(true);
    setIsSummaryModalOpen(true);
  };

  // Grade evaluation
  const scoreStats = useMemo(() => {
    let correctCount = 0;
    let falseConsensusTrapCount = 0;

    currentScenario.questions.forEach((q) => {
      const uKey = userAnswers[q.id];
      if (uKey === q.correctKey) {
        correctCount++;
      } else {
        const pickedOpt = q.options.find((o) => o.key === uKey);
        if (pickedOpt?.isFalseConsensusTrap) {
          falseConsensusTrapCount++;
        }
      }
    });

    const total = currentScenario.questions.length;
    const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const estimatedBandNum = accuracy >= 80 ? 8.0 : accuracy >= 60 ? 7.0 : 5.5;

    return {
      correctCount,
      total,
      totalCount: total,
      accuracy,
      falseConsensusTrapCount,
      estimatedBand: estimatedBandNum,
    };
  }, [currentScenario.questions, userAnswers]);

  // Persist session to Dexie DB
  const saveResultsToDatabase = useCallback(async () => {
    if (isSaved) return;

    try {
      // 1. Log Practice Result
      await db.practice_logs.put({
        id: `log_consensus_${currentScenario.id}_${Date.now()}`,
        type: "listening_consensus",
        materialId: currentScenario.id,
        score: Math.round((scoreStats.correctCount / scoreStats.total) * 9 * 10) / 10,
        timeSpentSeconds: currentTimeSec,
        accuracyPercentage: scoreStats.accuracy,
        createdAt: new Date().toISOString()
      });

      // 2. Log False Consensus Traps to Error Bank
      for (const q of currentScenario.questions) {
        const uKey = userAnswers[q.id];
        const pickedOpt = q.options.find((o) => o.key === uKey);
        if (pickedOpt && !pickedOpt.isCorrect) {
          await db.error_bank.put({
            id: `err_consensus_${q.id}_${Date.now()}`,
            sourceModule: "listening",
            errorType: "paraphrase_trap",
            questionContext: `Section 3 Consensus Trap: Q${q.questionNumber} - ${q.prompt}`,
            userWrongAnswer: `Picked (${pickedOpt.key}) ${pickedOpt.text}`,
            correctAnswer: `(${q.correctKey}) ${q.options.find((o) => o.key === q.correctKey)?.text}`,
            deepExplanation: q.trapExplanation,
            mastered: false,
            retryCount: 1,
            consecutiveSuccesses: 0,
            createdAt: new Date().toISOString()
          });
        }
      }

      setIsSaved(true);
    } catch (err) {
      console.error("Failed to save consensus session:", err);
    }
  }, [scoreStats, currentScenario, userAnswers, currentTimeSec, isSaved]);

  return {
    currentScenario,
    allScenarios: MOCK_SECTION3_DIALOGUES,
    selectedScenarioId,
    handleSelectScenario,
    isPlaying,
    setIsPlaying,
    togglePlay,
    currentTimeSec,
    setCurrentTimeSec,
    consensusResolution,
    userAnswers,
    handleSelectAnswer,
    isSubmitted,
    submitQuiz,
    scoreStats,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isSaved,
    saveResultsToDatabase
  };
}
