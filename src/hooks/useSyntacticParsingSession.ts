"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { MOCK_GARDEN_PATH_SENTENCES } from "@/data/mockGardenPathSentencesData";
import { GardenPathChallenge, calculateDependencyEdges, DependencyEdge } from "@/lib/syntacticTreeParser";
import { db } from "@/lib/db";

export function useSyntacticParsingSession(initialChallengeId?: string) {
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(
    initialChallengeId || MOCK_GARDEN_PATH_SENTENCES[0].id
  );

  const currentChallenge: GardenPathChallenge = useMemo(() => {
    return (
      MOCK_GARDEN_PATH_SENTENCES.find((c) => c.id === selectedChallengeId) ||
      MOCK_GARDEN_PATH_SENTENCES[0]
    );
  }, [selectedChallengeId]);

  // Visual Skeleton Stripper State
  const [isSkeletonStripped, setIsSkeletonStripped] = useState<boolean>(false);

  // Selected Node in Dependency Tree
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    currentChallenge.nodes.find((n) => n.isCoreSkeleton)?.id || currentChallenge.nodes[0].id
  );

  // Garden-Path Puzzle Mode State
  const [puzzleTimeLeft, setPuzzleTimeLeft] = useState<number>(15);
  const [isPuzzleRunning, setIsPuzzleRunning] = useState<boolean>(false);
  const [userSelectedVerb, setUserSelectedVerb] = useState<string | null>(null);
  const [puzzleResult, setPuzzleResult] = useState<"idle" | "correct" | "wrong" | "timeout">("idle");
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // 15s Countdown Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPuzzleRunning && puzzleTimeLeft > 0 && puzzleResult === "idle") {
      timer = setInterval(() => {
        setPuzzleTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPuzzleRunning(false);
            setPuzzleResult("timeout");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPuzzleRunning, puzzleTimeLeft, puzzleResult]);

  // Dependency Edges (Curves)
  const dependencyEdges: DependencyEdge[] = useMemo(() => {
    return calculateDependencyEdges(currentChallenge.nodes);
  }, [currentChallenge]);

  const handleSelectChallenge = (id: string) => {
    setSelectedChallengeId(id);
    setIsSkeletonStripped(false);
    setUserSelectedVerb(null);
    setPuzzleResult("idle");
    setPuzzleTimeLeft(15);
    setIsPuzzleRunning(false);
    setIsSaved(false);
    const challenge = MOCK_GARDEN_PATH_SENTENCES.find((c) => c.id === id) || MOCK_GARDEN_PATH_SENTENCES[0];
    setSelectedNodeId(challenge.nodes.find((n) => n.isCoreSkeleton)?.id || challenge.nodes[0].id);
  };

  const startPuzzle = () => {
    setUserSelectedVerb(null);
    setPuzzleResult("idle");
    setPuzzleTimeLeft(15);
    setIsPuzzleRunning(true);
  };

  const handleSelectVerbInPuzzle = (word: string) => {
    if (!isPuzzleRunning && puzzleResult !== "idle") return;

    setIsPuzzleRunning(false);
    setUserSelectedVerb(word);

    const isMatch = word.toLowerCase().trim() === currentChallenge.trueMainVerb.toLowerCase().trim();
    if (isMatch) {
      setPuzzleResult("correct");
    } else {
      setPuzzleResult("wrong");
    }
  };

  const saveResultsToDatabase = useCallback(async () => {
    try {
      const isCorrect = puzzleResult === "correct";
      const timeSpent = 15 - puzzleTimeLeft;

      // 1. Save Practice Log
      await db.practice_logs.put({
        id: `parsing_log_${Date.now()}`,
        type: "syntactic_parsing",
        title: `Passage 3 Syntax Disentanglement: ${currentChallenge.passageDomain}`,
        score: isCorrect ? 8.5 : 6.0,
        totalQuestions: 1,
        accuracyPercentage: isCorrect ? 100 : 0,
        timeSpentSeconds: timeSpent > 0 ? timeSpent : 15,
        details: {
          challengeId: currentChallenge.id,
          selectedVerb: userSelectedVerb,
          trueMainVerb: currentChallenge.trueMainVerb,
          puzzleResult,
          cognitiveTrapType: currentChallenge.cognitiveTrapType
        },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      });

      // 2. Log Error to Error Bank if user picked decoy verb or timed out
      if (!isCorrect) {
        const decoyInfo = currentChallenge.decoyVerbs.find(
          (d) => d.verb.toLowerCase() === (userSelectedVerb || "").toLowerCase()
        );

        await db.error_bank.put({
          id: `err_syntax_${currentChallenge.id}_${Date.now()}`,
          sourceModule: "reading",
          errorType: "careless_reading",
          questionContext: `Garden-Path Sentence: "${currentChallenge.sentenceText}"`,
          userWrongAnswer: userSelectedVerb ? `Identified "${userSelectedVerb}" as Main Verb` : "Timeout after 15s",
          correctAnswer: `Actual Main Finite Verb: "${currentChallenge.trueMainVerb}"`,
          deepExplanation: decoyInfo
            ? `Bạn đã mắc bẫy ${decoyInfo.actualRole}. ${decoyInfo.trapReason}`
            : currentChallenge.ieltsTrapExplanation,
          mastered: false,
          retryCount: 1,
          createdAt: new Date().toISOString()
        });
      }

      setIsSaved(true);
    } catch (err) {
      console.error("Failed to save syntactic parsing session:", err);
    }
  }, [puzzleResult, puzzleTimeLeft, currentChallenge, userSelectedVerb]);

  return {
    currentChallenge,
    allChallenges: MOCK_GARDEN_PATH_SENTENCES,
    selectedChallengeId,
    handleSelectChallenge,
    isSkeletonStripped,
    setIsSkeletonStripped,
    selectedNodeId,
    setSelectedNodeId,
    dependencyEdges,
    puzzleTimeLeft,
    isPuzzleRunning,
    startPuzzle,
    userSelectedVerb,
    handleSelectVerbInPuzzle,
    puzzleResult,
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    isSaved,
    saveResultsToDatabase
  };
}
