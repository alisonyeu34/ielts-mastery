"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { UserProgress, PhaseNumber } from "@/types/database";
import {
  RoadmapDayNode,
  MOCK_ROADMAP_180_DAYS,
} from "@/data/mockRoadmapTimeline";

const INITIAL_USER_PROGRESS: UserProgress = {
  id: "main_user",
  currentPhase: 1,
  streakDays: 0,
  lastActiveDate: new Date().toISOString().split("T")[0],
  targetBand: 7.5,
  phase1Unlocked: true,
  phase2Unlocked: false,
  phase3Unlocked: false,
  completedLessonIds: [],
  currentDay: 1,
  completedDayNodes: [],
  dailyChecklistStatus: {
    1: {
      theoryCompleted: false,
      drillCompleted: false,
      vocabReviewed: false,
      errorBankCleared: false,
    },
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export function useRoadmapProgress() {
  const [localProgress, setLocalProgress] = useState<UserProgress>(INITIAL_USER_PROGRESS);
  const [activePhaseFilter, setActivePhaseFilter] = useState<PhaseNumber | "all">(1);
  const [selectedDay, setSelectedDay] = useState<RoadmapDayNode | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isGatekeeperModalOpen, setIsGatekeeperModalOpen] = useState<boolean>(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState<boolean>(false);
  const [certificatePhase, setCertificatePhase] = useState<PhaseNumber>(1);

  // Live Query from Dexie DB
  const dbProgress = useLiveQuery(async () => {
    try {
      const user = await db.user_progress.get("main_user");
      if (user) return user;

      // Seed initial progress if none exists
      await db.user_progress.put(INITIAL_USER_PROGRESS);
      return INITIAL_USER_PROGRESS;
    } catch (e) {
      console.error("Dexie query error:", e);
      return INITIAL_USER_PROGRESS;
    }
  }, []);

  const progress = dbProgress || localProgress;

  // Compute node status for a day
  const getNodeStatus = useCallback(
    (dayNode: RoadmapDayNode): "locked" | "active" | "completed" | "gatekeeper_ready" => {
      const completedDays = progress.completedDayNodes || [];
      const currentDay = progress.currentDay || 1;

      // Completed
      if (completedDays.includes(dayNode.dayNumber)) {
        return "completed";
      }

      // Check Phase unlock
      if (dayNode.phase === 2 && !progress.phase2Unlocked) {
        return "locked";
      }
      if (dayNode.phase === 3 && !progress.phase3Unlocked) {
        return "locked";
      }

      // Gatekeeper Node
      if (dayNode.isGatekeeper && dayNode.dayNumber <= currentDay) {
        return "gatekeeper_ready";
      }

      // Active
      if (dayNode.dayNumber === currentDay) {
        return "active";
      }

      // If dayNumber < currentDay but not completed, still active
      if (dayNode.dayNumber < currentDay) {
        return "active";
      }

      return "locked";
    },
    [progress]
  );

  // Sync task status based on true scanner verification
  const syncScannedTask = useCallback(
    async (
      dayNumber: number,
      taskType: "theoryCompleted" | "drillCompleted" | "vocabReviewed" | "errorBankCleared",
      isDone: boolean
    ) => {
      const currentChecklists = progress.dailyChecklistStatus || {};
      const dayStatus = currentChecklists[dayNumber] || {
        theoryCompleted: false,
        drillCompleted: false,
        vocabReviewed: false,
        errorBankCleared: false,
      };

      if (dayStatus[taskType] === isDone) return;

      const updatedDayStatus = {
        ...dayStatus,
        [taskType]: isDone,
      };

      const updatedChecklists = {
        ...currentChecklists,
        [dayNumber]: updatedDayStatus,
      };

      const isAllDone =
        updatedDayStatus.theoryCompleted &&
        updatedDayStatus.drillCompleted &&
        updatedDayStatus.vocabReviewed &&
        updatedDayStatus.errorBankCleared;

      const completedDays = new Set(progress.completedDayNodes || []);
      let newCurrentDay = progress.currentDay || 1;
      let newStreak = progress.streakDays;

      if (isAllDone) {
        completedDays.add(dayNumber);
        if (dayNumber >= newCurrentDay && dayNumber < 180) {
          newCurrentDay = dayNumber + 1;
          newStreak += 1;
        }
      } else {
        completedDays.delete(dayNumber);
      }

      const updatedProgress: UserProgress = {
        ...progress,
        currentDay: newCurrentDay,
        streakDays: newStreak,
        completedDayNodes: Array.from(completedDays),
        dailyChecklistStatus: updatedChecklists,
        lastActiveDate: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString(),
      };

      try {
        await db.user_progress.put(updatedProgress);
      } catch (e) {
        console.error("Failed to save progress to DB:", e);
        setLocalProgress(updatedProgress);
      }
    },
    [progress]
  );

  // Toggle task checkbox (now guarded by scanner validation)
  const toggleTask = useCallback(
    async (
      dayNumber: number,
      taskType: "theoryCompleted" | "drillCompleted" | "vocabReviewed" | "errorBankCleared"
    ) => {
      const currentChecklists = progress.dailyChecklistStatus || {};
      const dayStatus = currentChecklists[dayNumber] || {
        theoryCompleted: false,
        drillCompleted: false,
        vocabReviewed: false,
        errorBankCleared: false,
      };

      const updatedDayStatus = {
        ...dayStatus,
        [taskType]: !dayStatus[taskType],
      };

      const updatedChecklists = {
        ...currentChecklists,
        [dayNumber]: updatedDayStatus,
      };

      // Check if all 4 are completed
      const isAllDone =
        updatedDayStatus.theoryCompleted &&
        updatedDayStatus.drillCompleted &&
        updatedDayStatus.vocabReviewed &&
        updatedDayStatus.errorBankCleared;

      const completedDays = new Set(progress.completedDayNodes || []);
      let newCurrentDay = progress.currentDay || 1;
      let newStreak = progress.streakDays;

      if (isAllDone) {
        completedDays.add(dayNumber);
        if (dayNumber >= newCurrentDay && dayNumber < 180) {
          newCurrentDay = dayNumber + 1;
          newStreak += 1;
        }
      } else {
        completedDays.delete(dayNumber);
      }

      const updatedProgress: UserProgress = {
        ...progress,
        currentDay: newCurrentDay,
        streakDays: newStreak,
        completedDayNodes: Array.from(completedDays),
        dailyChecklistStatus: updatedChecklists,
        lastActiveDate: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString(),
      };

      try {
        await db.user_progress.put(updatedProgress);
      } catch (e) {
        console.error("Failed to save progress to DB:", e);
        setLocalProgress(updatedProgress);
      }
    },
    [progress]
  );

  // Pass Gatekeeper Boss Challenge
  const passGatekeeper = useCallback(
    async (phase: PhaseNumber) => {
      const nextPhase = (phase < 3 ? phase + 1 : 3) as PhaseNumber;
      const completedDays = new Set(progress.completedDayNodes || []);
      const gatekeeperDay = phase === 1 ? 60 : phase === 2 ? 120 : 180;
      completedDays.add(gatekeeperDay);

      const updatedProgress: UserProgress = {
        ...progress,
        currentPhase: nextPhase,
        phase1Unlocked: true,
        phase2Unlocked: phase >= 1 ? true : progress.phase2Unlocked,
        phase3Unlocked: phase >= 2 ? true : progress.phase3Unlocked,
        currentDay: gatekeeperDay < 180 ? gatekeeperDay + 1 : 180,
        completedDayNodes: Array.from(completedDays),
        updatedAt: new Date().toISOString(),
      };

      try {
        await db.user_progress.put(updatedProgress);
      } catch (e) {
        console.error("Failed to save gatekeeper pass:", e);
        setLocalProgress(updatedProgress);
      }

      setIsGatekeeperModalOpen(false);
      setCertificatePhase(phase);
      setIsCertificateModalOpen(true);
    },
    [progress]
  );

  // Open appropriate modal/drawer on node click
  const openNodeAction = useCallback(
    (dayNode: RoadmapDayNode) => {
      const status = getNodeStatus(dayNode);
      if (status === "locked") return;

      setSelectedDay(dayNode);

      if (dayNode.isGatekeeper && (status === "gatekeeper_ready" || status === "active" || status === "completed")) {
        setIsGatekeeperModalOpen(true);
      } else {
        setIsDrawerOpen(true);
      }
    },
    [getNodeStatus]
  );

  // Overall statistics
  const stats = useMemo(() => {
    const completedCount = (progress.completedDayNodes || []).length;
    const totalDays = 180;
    const progressPercent = Math.round((completedCount / totalDays) * 100);

    const phase1Count = (progress.completedDayNodes || []).filter((d) => d <= 31).length;
    const phase2Count = (progress.completedDayNodes || []).filter((d) => d > 31 && d <= 77).length;
    const phase3Count = (progress.completedDayNodes || []).filter((d) => d > 77).length;

    return {
      completedCount,
      totalDays,
      progressPercent,
      streakDays: progress.streakDays || 0,
      currentDay: progress.currentDay || 1,
      targetBand: progress.targetBand || 7.5,
      phase1Percent: Math.round((phase1Count / 31) * 100),
      phase2Percent: Math.round((phase2Count / 46) * 100),
      phase3Percent: Math.round((phase3Count / 88) * 100),
    };
  }, [progress]);

  return {
    allNodes: MOCK_ROADMAP_180_DAYS,
    progress,
    stats,
    selectedDay,
    activePhaseFilter,
    isDrawerOpen,
    isGatekeeperModalOpen,
    isCertificateModalOpen,
    certificatePhase,
    setActivePhaseFilter,
    setSelectedDay,
    setIsDrawerOpen,
    setIsGatekeeperModalOpen,
    setIsCertificateModalOpen,
    getNodeStatus,
    toggleTask,
    syncScannedTask,
    passGatekeeper,
    openNodeAction,
  };
}
