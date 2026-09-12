"use client";

import { useCallback } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { ErrorItem } from "@/types/database";
import { MOCK_ERROR_BANK_ITEMS } from "@/data/mockErrorBankData";

export async function seedErrorBankIfEmpty(): Promise<void> {
  try {
    const count = await db.error_bank.count();
    if (count === 0) {
      await db.error_bank.bulkPut(MOCK_ERROR_BANK_ITEMS);
    }
  } catch (err) {
    console.error("Failed to seed error bank:", err);
  }
}

export function useErrorBankTriage() {
  const errors = useLiveQuery(async () => {
    try {
      await seedErrorBankIfEmpty();
      return await db.error_bank.toArray();
    } catch {
      return [];
    }
  }, []) || [];

  /**
   * Record a drill attempt on a specific error item with Two-Strike rule
   */
  const recordDrillAttempt = useCallback(
    async (errorId: string, isCorrect: boolean) => {
      const item = await db.error_bank.get(errorId);
      if (!item) return;

      let consecutive = item.consecutiveSuccesses || 0;
      let isMastered = item.mastered;
      let retries = (item.retryCount || 0) + 1;

      if (isCorrect) {
        consecutive += 1;
        if (consecutive >= 2) {
          isMastered = true;
        }
      } else {
        consecutive = 0;
        isMastered = false;
      }

      await db.error_bank.update(errorId, {
        consecutiveSuccesses: consecutive,
        mastered: isMastered,
        retryCount: retries,
        lastAttemptAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Record practice log
      try {
        await db.practice_logs.put({
          id: `log_drill_${Date.now()}_${errorId}`,
          type: "grammar",
          materialId: errorId,
          score: isCorrect ? 10 : 0,
          timeSpentSeconds: 30,
          accuracyPercentage: isCorrect ? 100 : 0,
          createdAt: new Date().toISOString(),
        });
      } catch (e) {
        console.error("Failed to log drill practice:", e);
      }
    },
    []
  );

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
    recordDrillAttempt,
    markAsMastered,
    deleteError,
    resetAllMastery,
    clearAllErrors,
    seedSampleErrors,
  };
}
