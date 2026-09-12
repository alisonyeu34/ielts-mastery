"use client";

import { useState, useEffect, useCallback } from "react";
import { ParaphrasePair } from "@/data/mockParaphraseData";

export interface ParaphraseCardItem {
  id: string;
  pairId: string;
  side: "left" | "right";
  text: string;
}

export interface UseParaphraseMatcherReturn {
  leftItems: ParaphraseCardItem[];
  rightItems: ParaphraseCardItem[];
  selectedLeftId: string | null;
  selectedRightId: string | null;
  matchedPairIds: string[];
  mismatchPair: { leftId: string; rightId: string } | null;
  lastMatchedPair: ParaphrasePair | null;
  score: number;
  attempts: number;
  isCompleted: boolean;
  selectCard: (side: "left" | "right", id: string) => void;
  resetBoard: () => void;
}

export function useParaphraseMatcher(
  pairs: ParaphrasePair[]
): UseParaphraseMatcherReturn {
  const [leftItems, setLeftItems] = useState<ParaphraseCardItem[]>([]);
  const [rightItems, setRightItems] = useState<ParaphraseCardItem[]>([]);
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [mismatchPair, setMismatchPair] = useState<{
    leftId: string;
    rightId: string;
  } | null>(null);
  const [lastMatchedPair, setLastMatchedPair] = useState<ParaphrasePair | null>(
    null
  );
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Initialize and shuffle board
  const initializeBoard = useCallback(() => {
    const left: ParaphraseCardItem[] = pairs.map((p) => ({
      id: `left_${p.id}`,
      pairId: p.id,
      side: "left" as const,
      text: p.questionKeyword,
    }));

    const right: ParaphraseCardItem[] = pairs
      .map((p) => ({
        id: `right_${p.id}`,
        pairId: p.id,
        side: "right" as const,
        text: p.passageMatch,
      }))
      .sort(() => Math.random() - 0.5); // Shuffle right column

    setLeftItems(left);
    setRightItems(right);
    setSelectedLeftId(null);
    setSelectedRightId(null);
    setMatchedPairIds([]);
    setMismatchPair(null);
    setLastMatchedPair(null);
    setScore(0);
    setAttempts(0);
  }, [pairs]);

  useEffect(() => {
    initializeBoard();
  }, [initializeBoard]);

  const checkMatch = useCallback(
    (leftId: string, rightId: string) => {
      const leftCard = leftItems.find((item) => item.id === leftId);
      const rightCard = rightItems.find((item) => item.id === rightId);

      if (!leftCard || !rightCard) return;

      setAttempts((prev) => prev + 1);

      if (leftCard.pairId === rightCard.pairId) {
        // Correct Match
        setMatchedPairIds((prev) => [...prev, leftCard.pairId]);
        setScore((prev) => prev + 1);

        const matched = pairs.find((p) => p.id === leftCard.pairId) || null;
        setLastMatchedPair(matched);

        setSelectedLeftId(null);
        setSelectedRightId(null);
        setMismatchPair(null);
      } else {
        // Mismatch
        setMismatchPair({ leftId, rightId });
        setTimeout(() => {
          setMismatchPair(null);
          setSelectedLeftId(null);
          setSelectedRightId(null);
        }, 900);
      }
    },
    [leftItems, rightItems, pairs]
  );

  const selectCard = useCallback(
    (side: "left" | "right", id: string) => {
      if (mismatchPair) return; // ignore clicks during shake animation

      if (side === "left") {
        if (selectedLeftId === id) {
          setSelectedLeftId(null);
        } else {
          setSelectedLeftId(id);
          if (selectedRightId) {
            checkMatch(id, selectedRightId);
          }
        }
      } else {
        if (selectedRightId === id) {
          setSelectedRightId(null);
        } else {
          setSelectedRightId(id);
          if (selectedLeftId) {
            checkMatch(selectedLeftId, id);
          }
        }
      }
    },
    [selectedLeftId, selectedRightId, mismatchPair, checkMatch]
  );

  const isCompleted = matchedPairIds.length === pairs.length && pairs.length > 0;

  return {
    leftItems,
    rightItems,
    selectedLeftId,
    selectedRightId,
    matchedPairIds,
    mismatchPair,
    lastMatchedPair,
    score,
    attempts,
    isCompleted,
    selectCard,
    resetBoard: initializeBoard,
  };
}
