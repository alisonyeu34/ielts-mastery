"use client";

import { useEffect, useState, useMemo } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, initDefaultUserData, getTodayDateString } from "@/lib/db";
import {
  UserProgress,
  TheoryLesson,
  VocabCard,
  ErrorItem,
  PracticeLog,
  AISubmission,
  ErrorClassification,
  ErrorSourceModule,
  ErrorBankStats,
  PhaseNumber,
} from "@/types/database";

/**
 * Hook to automatically initialize DB with seed data on initial client render
 */
export function useInitDB() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    initDefaultUserData().then(() => {
      if (isMounted) setIsReady(true);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return { isReady };
}

/**
 * 1. Hook for User Progress & Streak Tracker
 */
export function useUserProgress() {
  const user = useLiveQuery(async () => {
    return await db.user_progress.get("main_user");
  });

  const updateStreak = async () => {
    const today = getTodayDateString();
    const currentUser = await db.user_progress.get("main_user");
    if (!currentUser) return;

    let newStreak = currentUser.streakDays;
    if (currentUser.lastActiveDate !== today) {
      // Check if lastActiveDate was yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toISOString().split("T")[0];

      if (currentUser.lastActiveDate === yesterdayString) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }

      await db.user_progress.update("main_user", {
        streakDays: newStreak,
        lastActiveDate: today,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const completeLesson = async (lessonId: string) => {
    const currentUser = await db.user_progress.get("main_user");
    if (!currentUser) return;

    const completedSet = new Set(currentUser.completedLessonIds);
    completedSet.add(lessonId);

    await db.user_progress.update("main_user", {
      completedLessonIds: Array.from(completedSet),
      updatedAt: new Date().toISOString(),
    });

    await db.theory_lessons.update(lessonId, {
      isCompleted: true,
    });
  };

  const unlockPhase = async (phase: PhaseNumber) => {
    const updates: Partial<UserProgress> = {
      updatedAt: new Date().toISOString(),
    };
    if (phase === 2) {
      updates.phase2Unlocked = true;
      updates.currentPhase = 2;
    } else if (phase === 3) {
      updates.phase3Unlocked = true;
      updates.currentPhase = 3;
    }
    await db.user_progress.update("main_user", updates);
  };

  return {
    userProgress: user,
    isLoading: user === undefined,
    updateStreak,
    completeLesson,
    unlockPhase,
  };
}

/**
 * 2. Hook for Theory Hub & Quizzes
 */
export function useTheoryLessons(phase?: PhaseNumber) {
  const lessons = useLiveQuery(async () => {
    if (phase) {
      return await db.theory_lessons.where("phase").equals(phase).sortBy("orderIndex");
    }
    return await db.theory_lessons.orderBy("orderIndex").toArray();
  }, [phase]);

  const toggleLessonCompletion = async (lessonId: string, isCompleted: boolean) => {
    await db.theory_lessons.update(lessonId, { isCompleted });
    const user = await db.user_progress.get("main_user");
    if (user) {
      const set = new Set(user.completedLessonIds);
      if (isCompleted) set.add(lessonId);
      else set.delete(lessonId);
      await db.user_progress.update("main_user", {
        completedLessonIds: Array.from(set),
        updatedAt: new Date().toISOString(),
      });
    }
  };

  return {
    lessons: lessons || [],
    isLoading: lessons === undefined,
    toggleLessonCompletion,
  };
}

/**
 * 3. Hook for Spaced Repetition / FSRS Vocab Matrix (Consolidated Fast Query)
 */
export function useDueVocabCount() {
  const today = getTodayDateString();

  const stats = useLiveQuery(async () => {
    try {
      const dueCards = await db.vocab_matrix
        .filter((card) => card.status !== "new" && Boolean(card.nextReviewDate) && card.nextReviewDate <= today)
        .toArray();
      const [total, mastered] = await Promise.all([
        db.vocab_matrix.count(),
        db.vocab_matrix.where("status").equals("mastered").count(),
      ]);
      return {
        dueCards,
        dueCount: dueCards.length,
        totalCardsCount: total,
        masteredCount: mastered,
      };
    } catch {
      return { dueCards: [], dueCount: 0, totalCardsCount: 0, masteredCount: 0 };
    }
  }, [today]);

  /**
   * Process FSRS rating feedback (Again / Hard / Good / Easy)
   */
  const answerVocabCard = async (
    cardId: string,
    grade: "again" | "hard" | "good" | "easy"
  ) => {
    const card = await db.vocab_matrix.get(cardId);
    if (!card) return;

    let nextIntervalDays = 1;
    let newStatus = card.status;
    let newLapses = card.lapsesCount;
    let newRepetitions = card.repetitionCount + 1;

    switch (grade) {
      case "again":
        nextIntervalDays = 1;
        newStatus = "learning";
        newLapses += 1;
        break;
      case "hard":
        nextIntervalDays = Math.max(1, Math.round(card.stepInterval * 1.2));
        newStatus = "review";
        break;
      case "good":
        nextIntervalDays = Math.max(2, Math.round(card.stepInterval * 2.2));
        newStatus = nextIntervalDays >= 21 ? "mastered" : "review";
        break;
      case "easy":
        nextIntervalDays = Math.max(4, Math.round(card.stepInterval * 3.5));
        newStatus = nextIntervalDays >= 21 ? "mastered" : "review";
        break;
    }

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + nextIntervalDays);
    const nextReviewDateString = nextDate.toISOString().split("T")[0];

    await db.vocab_matrix.update(cardId, {
      status: newStatus,
      stepInterval: nextIntervalDays,
      nextReviewDate: nextReviewDateString,
      repetitionCount: newRepetitions,
      lapsesCount: newLapses,
      lastReviewedAt: new Date().toISOString(),
    });
  };

  return {
    dueCards: stats?.dueCards || [],
    dueCount: stats?.dueCount ?? 0,
    totalCardsCount: stats?.totalCardsCount ?? 0,
    masteredCount: stats?.masteredCount ?? 0,
    isLoading: stats === undefined,
    answerVocabCard,
  };
}

/**
 * 4. Hook for Error Bank Statistics and Items (Memoized)
 */
export function useErrorBankStats() {
  const errors = useLiveQuery(async () => {
    return await db.error_bank.toArray();
  });

  const stats = useMemo<ErrorBankStats>(() => {
    const s: ErrorBankStats = {
      totalErrors: errors?.length ?? 0,
      unresolvedCount: 0,
      masteredCount: 0,
      byType: {
        grammar: 0,
        pronunciation: 0,
        paraphrase_trap: 0,
        singular_plural: 0,
        careless_reading: 0,
        vocabulary: 0,
      },
      byModule: {
        dictation: 0,
        reading: 0,
        listening: 0,
        writing: 0,
        speaking: 0,
        pronunciation: 0,
        grammar: 0,
        vocab: 0,
      },
    };

    if (errors) {
      errors.forEach((e) => {
        if (e.mastered) s.masteredCount++;
        else s.unresolvedCount++;

        if (s.byType[e.errorType] !== undefined) {
          s.byType[e.errorType]++;
        }
        if (s.byModule[e.sourceModule] !== undefined) {
          s.byModule[e.sourceModule]++;
        }
      });
    }

    return s;
  }, [errors]);

  const markErrorMastered = async (errorId: string, mastered: boolean) => {
    await db.error_bank.update(errorId, {
      mastered,
      updatedAt: new Date().toISOString(),
    });
  };

  const deleteError = async (errorId: string) => {
    await db.error_bank.delete(errorId);
  };

  return {
    errors: errors || [],
    stats,
    isLoading: errors === undefined,
    markErrorMastered,
    deleteError,
  };
}

/**
 * 5. Hook / Helper for adding an automated error item to Error Bank
 */
export function useAddError() {
  const addError = async (item: Omit<ErrorItem, "id" | "createdAt" | "mastered" | "retryCount">) => {
    const newId = `err_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const errorRecord: ErrorItem = {
      ...item,
      id: newId,
      mastered: false,
      retryCount: 1,
      createdAt: new Date().toISOString(),
    };
    await db.error_bank.put(errorRecord);
    return newId;
  };

  return { addError };
}

/**
 * 6. Hook for Practice & Dictation Logs
 */
export function usePracticeLogs(limit = 20) {
  const logs = useLiveQuery(async () => {
    return await db.practice_logs.orderBy("createdAt").reverse().limit(limit).toArray();
  }, [limit]);

  const addPracticeLog = async (log: Omit<PracticeLog, "id" | "createdAt">) => {
    const newId = `prac_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newLog: PracticeLog = {
      ...log,
      id: newId,
      createdAt: new Date().toISOString(),
    };
    await db.practice_logs.put(newLog);
    return newId;
  };

  return {
    logs: logs || [],
    isLoading: logs === undefined,
    addPracticeLog,
  };
}

/**
 * 7. Hook for AI Submissions (Writing & Speaking Grader)
 */
export function useAISubmissions(limit = 20) {
  const submissions = useLiveQuery(async () => {
    return await db.ai_submissions
      .orderBy("createdAt")
      .reverse()
      .limit(limit)
      .toArray();
  }, [limit]);

  const saveSubmission = async (
    submission: Omit<AISubmission, "id" | "createdAt">
  ) => {
    const newId = `ai_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newSubmission: AISubmission = {
      ...submission,
      id: newId,
      createdAt: new Date().toISOString(),
    };
    await db.ai_submissions.put(newSubmission);
    return newId;
  };

  return {
    submissions: submissions || [],
    isLoading: submissions === undefined,
    saveSubmission,
  };
}
