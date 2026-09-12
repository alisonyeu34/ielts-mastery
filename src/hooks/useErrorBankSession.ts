"use client";

import { useState, useCallback, useMemo } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { ErrorItem, ErrorClassification, ErrorSourceModule } from "@/types/database";
import { MOCK_ERROR_BANK_ITEMS } from "@/data/mockErrorBankData";

export interface ArenaSessionState {
  isOpen: boolean;
  category: ErrorClassification | "all";
  queue: ErrorItem[];
  currentIndex: number;
  results: Array<{
    item: ErrorItem;
    isCorrect: boolean;
    consecutiveBefore: number;
    consecutiveAfter: number;
    newlyMastered: boolean;
  }>;
  isFinished: boolean;
}

export function useErrorBankSession() {
  // Query all errors from Dexie LiveQuery
  const errors = useLiveQuery(async () => {
    try {
      return await db.error_bank.toArray();
    } catch (e) {
      console.error("Dexie error reading error_bank:", e);
      return [];
    }
  }, []) || [];

  // Filter States
  const [categoryFilter, setCategoryFilter] = useState<ErrorClassification | "all">("all");
  const [moduleFilter, setModuleFilter] = useState<ErrorSourceModule | "all">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "unmastered" | "mastered">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Single Item Retry Modal State
  const [activeSingleError, setActiveSingleError] = useState<ErrorItem | null>(null);

  // Remediation Arena Session State
  const [arenaState, setArenaState] = useState<ArenaSessionState>({
    isOpen: false,
    category: "all",
    queue: [],
    currentIndex: 0,
    results: [],
    isFinished: false,
  });

  // Filtered List
  const filteredErrors = useMemo(() => {
    return errors.filter((item) => {
      const matchCat = categoryFilter === "all" || item.errorType === categoryFilter;
      const matchMod = moduleFilter === "all" || item.sourceModule === moduleFilter;
      const matchStat =
        statusFilter === "all" ||
        (statusFilter === "unmastered" && !item.mastered) ||
        (statusFilter === "mastered" && item.mastered);
      const matchQuery =
        !searchQuery ||
        item.questionContext.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.userWrongAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.correctAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.deepExplanation.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchMod && matchStat && matchQuery;
    });
  }, [errors, categoryFilter, moduleFilter, statusFilter, searchQuery]);

  /**
   * Submit an attempt with the Two-Strike Mastery Rule (2 consecutive successes = Mastered)
   */
  const submitAttempt = useCallback(
    async (errorId: string, isCorrect: boolean) => {
      const item = await db.error_bank.get(errorId);
      if (!item) return { isMastered: false, consecutiveSuccesses: 0, retryCount: 0 };

      const prevConsecutive = item.consecutiveSuccesses || 0;
      let newConsecutive = prevConsecutive;
      let newMastered = item.mastered;
      let newRetries = (item.retryCount || 0) + 1;
      let newFsrsStage = item.fsrsStage || 0;
      let newNextReviewDate: string | undefined = undefined;
      let newIntervalDays: number | undefined = undefined;

      const addDays = (days: number) => {
        const d = new Date();
        d.setDate(d.getDate() + days);
        return d.toISOString().split("T")[0];
      };

      if (isCorrect) {
        newConsecutive = prevConsecutive + 1;
        newFsrsStage = Math.min(4, newFsrsStage + 1);

        if (newFsrsStage === 1) {
          newIntervalDays = 3;
          newNextReviewDate = addDays(3);
          newMastered = false;
        } else if (newFsrsStage === 2) {
          newIntervalDays = 7;
          newNextReviewDate = addDays(7);
          newMastered = false;
        } else if (newFsrsStage === 3) {
          newIntervalDays = 21;
          newNextReviewDate = addDays(21);
          newMastered = false;
        } else if (newFsrsStage >= 4) {
          newIntervalDays = 60;
          newNextReviewDate = addDays(60);
          newMastered = true;
        }
      } else {
        newConsecutive = 0;
        newMastered = false;
        newFsrsStage = 0;
        newIntervalDays = 1;
        newNextReviewDate = addDays(1);
      }

      await db.error_bank.update(errorId, {
        consecutiveSuccesses: newConsecutive,
        mastered: newMastered,
        retryCount: newRetries,
        fsrsStage: newFsrsStage,
        nextReviewDate: newNextReviewDate,
        intervalDays: newIntervalDays,
        lastAttemptAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Update active single error if open
      if (activeSingleError && activeSingleError.id === errorId) {
        setActiveSingleError({
          ...activeSingleError,
          consecutiveSuccesses: newConsecutive,
          mastered: newMastered,
          retryCount: newRetries,
          fsrsStage: newFsrsStage,
          nextReviewDate: newNextReviewDate,
          intervalDays: newIntervalDays,
          lastAttemptAt: new Date().toISOString(),
        });
      }

      // Log Practice Activity in Dexie
      try {
        await db.practice_logs.put({
          id: `log_drill_${Date.now()}_${errorId}`,
          type: "grammar",
          materialId: errorId,
          title: `Error Bank Drill: ${item.errorType}`,
          score: isCorrect ? 10 : 0,
          timeSpentSeconds: 45,
          accuracyPercentage: isCorrect ? 100 : 0,
          createdAt: new Date().toISOString(),
        });
      } catch (e) {
        console.error("Failed to write practice log:", e);
      }

      return {
        isMastered: newMastered,
        consecutiveSuccesses: newConsecutive,
        retryCount: newRetries,
      };
    },
    [activeSingleError]
  );

  /**
   * Open single error instant retry modal
   */
  const openSingleRetry = useCallback((error: ErrorItem) => {
    setActiveSingleError(error);
  }, []);

  const closeSingleRetry = useCallback(() => {
    setActiveSingleError(null);
  }, []);

  /**
   * Start multi-item Remediation Arena
   */
  const startArena = useCallback(
    (category: ErrorClassification | "all" = "all", maxQuestions = 8) => {
      let candidatePool = errors;
      if (category !== "all") {
        candidatePool = candidatePool.filter((e) => e.errorType === category);
      }

      // Prioritize unmastered first, then highest retries, then most recent
      const queue = [...candidatePool]
        .sort((a, b) => {
          if (a.mastered !== b.mastered) {
            return a.mastered ? 1 : -1;
          }
          if (b.retryCount !== a.retryCount) {
            return b.retryCount - a.retryCount;
          }
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        })
        .slice(0, maxQuestions);

      setArenaState({
        isOpen: true,
        category,
        queue,
        currentIndex: 0,
        results: [],
        isFinished: queue.length === 0,
      });
    },
    [errors]
  );

  /**
   * Submit answer for current arena item
   */
  const submitArenaAnswer = useCallback(
    async (isCorrect: boolean) => {
      const currentItem = arenaState.queue[arenaState.currentIndex];
      if (!currentItem) return;

      const prevConsecutive = currentItem.consecutiveSuccesses || 0;
      const result = await submitAttempt(currentItem.id, isCorrect);
      const newlyMastered = !currentItem.mastered && result.isMastered;

      const nextResults = [
        ...arenaState.results,
        {
          item: currentItem,
          isCorrect,
          consecutiveBefore: prevConsecutive,
          consecutiveAfter: result.consecutiveSuccesses,
          newlyMastered,
        },
      ];

      const nextIndex = arenaState.currentIndex + 1;
      const isFinished = nextIndex >= arenaState.queue.length;

      setArenaState((prev) => ({
        ...prev,
        results: nextResults,
        currentIndex: nextIndex,
        isFinished,
      }));
    },
    [arenaState, submitAttempt]
  );

  /**
   * Close arena modal
   */
  const closeArena = useCallback(() => {
    setArenaState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  /**
   * Reset arena for another round
   */
  const restartArena = useCallback(() => {
    startArena(arenaState.category, arenaState.queue.length || 8);
  }, [arenaState.category, arenaState.queue.length, startArena]);

  /**
   * Quick toggle mastered status
   */
  const markAsMastered = useCallback(async (errorId: string) => {
    await db.error_bank.update(errorId, {
      mastered: true,
      consecutiveSuccesses: 2,
      lastAttemptAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }, []);

  const deleteError = useCallback(async (errorId: string) => {
    await db.error_bank.delete(errorId);
  }, []);

  const resetAllMastery = useCallback(async () => {
    const all = await db.error_bank.toArray();
    for (const item of all) {
      await db.error_bank.update(item.id, {
        mastered: false,
        consecutiveSuccesses: 0,
        updatedAt: new Date().toISOString(),
      });
    }
  }, []);

  const clearAllErrors = useCallback(async () => {
    await db.error_bank.clear();
  }, []);

  const seedSampleErrors = useCallback(async () => {
    await db.error_bank.clear();
    await db.error_bank.bulkPut(MOCK_ERROR_BANK_ITEMS);
  }, []);

  return {
    errors,
    filteredErrors,
    // Filters
    categoryFilter,
    setCategoryFilter,
    moduleFilter,
    setModuleFilter,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    // Attempt & Actions
    submitAttempt,
    markAsMastered,
    deleteError,
    resetAllMastery,
    clearAllErrors,
    seedSampleErrors,
    // Single Retry
    activeSingleError,
    openSingleRetry,
    closeSingleRetry,
    // Remediation Arena
    arenaState,
    startArena,
    submitArenaAnswer,
    closeArena,
    restartArena,
  };
}
