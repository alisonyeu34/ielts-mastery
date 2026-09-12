"use client";

import { useState, useEffect, useCallback } from "react";

export interface TokenItem {
  id: string;
  text: string;
}

export interface UseSentenceBuilderReturn {
  availableTokens: TokenItem[];
  selectedTokens: TokenItem[];
  isSubmitted: boolean;
  isCorrect: boolean | null;
  constructedSentence: string;
  addToken: (token: TokenItem) => void;
  removeToken: (token: TokenItem) => void;
  resetTokens: () => void;
  checkAnswer: () => boolean;
  reorderTokens: (dragIndex: number, hoverIndex: number) => void;
}

export function useSentenceBuilder(
  scrambledTokens: string[],
  correctSentence: string
): UseSentenceBuilderReturn {
  const [availableTokens, setAvailableTokens] = useState<TokenItem[]>([]);
  const [selectedTokens, setSelectedTokens] = useState<TokenItem[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Initialize tokens
  useEffect(() => {
    const formatted: TokenItem[] = scrambledTokens.map((text, idx) => ({
      id: `tok_${idx}_${text.substring(0, 5)}`,
      text,
    }));
    setAvailableTokens(formatted);
    setSelectedTokens([]);
    setIsSubmitted(false);
    setIsCorrect(null);
  }, [scrambledTokens]);

  const addToken = useCallback((token: TokenItem) => {
    setAvailableTokens((prev) => prev.filter((t) => t.id !== token.id));
    setSelectedTokens((prev) => [...prev, token]);
    setIsSubmitted(false);
    setIsCorrect(null);
  }, []);

  const removeToken = useCallback((token: TokenItem) => {
    setSelectedTokens((prev) => prev.filter((t) => t.id !== token.id));
    setAvailableTokens((prev) => [...prev, token]);
    setIsSubmitted(false);
    setIsCorrect(null);
  }, []);

  const resetTokens = useCallback(() => {
    const formatted: TokenItem[] = scrambledTokens.map((text, idx) => ({
      id: `tok_${idx}_${text.substring(0, 5)}`,
      text,
    }));
    setAvailableTokens(formatted);
    setSelectedTokens([]);
    setIsSubmitted(false);
    setIsCorrect(null);
  }, [scrambledTokens]);

  const constructedSentence = selectedTokens.map((t) => t.text).join(" ");

  const normalizeSentence = (str: string) => {
    return str
      .trim()
      .replace(/\s+/g, " ")
      .replace(/\s+([,.:?!])/g, "$1")
      .toLowerCase();
  };

  const checkAnswer = useCallback(() => {
    const userNormalized = normalizeSentence(constructedSentence);
    const correctNormalized = normalizeSentence(correctSentence);

    const correct = userNormalized === correctNormalized;
    setIsSubmitted(true);
    setIsCorrect(correct);
    return correct;
  }, [constructedSentence, correctSentence]);

  const reorderTokens = useCallback((dragIndex: number, hoverIndex: number) => {
    setSelectedTokens((prev) => {
      const result = [...prev];
      const [removed] = result.splice(dragIndex, 1);
      result.splice(hoverIndex, 0, removed);
      return result;
    });
    setIsSubmitted(false);
    setIsCorrect(null);
  }, []);

  return {
    availableTokens,
    selectedTokens,
    isSubmitted,
    isCorrect,
    constructedSentence,
    addToken,
    removeToken,
    resetTokens,
    checkAnswer,
    reorderTokens,
  };
}
