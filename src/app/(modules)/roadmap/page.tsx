"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  Compass,
  Layers,
  Award,
  Flame,
  ShieldCheck,
  Trophy,
  Printer,
  HeartHandshake,
} from "lucide-react";
import { useRoadmapProgress } from "@/hooks/useRoadmapProgress";
import { PhaseProgressHeader } from "@/components/roadmap/PhaseProgressHeader";
import { RoadmapJourneyMap } from "@/components/roadmap/RoadmapJourneyMap";
import { DailyTaskDrawer } from "@/components/roadmap/DailyTaskDrawer";
import { GatekeeperChallengeModal } from "@/components/roadmap/GatekeeperChallengeModal";
import { MilestoneCertificateModal } from "@/components/roadmap/MilestoneCertificateModal";
import { EmergencyLowEnergyModal } from "@/components/common/EmergencyLowEnergyModal";
import { MicroWinsModal } from "@/components/achievements/MicroWinsModal";
import { WeeklyCheatSheetModal } from "@/components/study-tools/WeeklyCheatSheetModal";
import { cn } from "@/lib/utils";

export default function RoadmapMasteryPage() {
  const {
    allNodes,
    progress,
    stats,
    selectedDay,
    activePhaseFilter,
    isDrawerOpen,
    isGatekeeperModalOpen,
    isCertificateModalOpen,
    certificatePhase,
    setActivePhaseFilter,
    setIsDrawerOpen,
    setIsGatekeeperModalOpen,
    setIsCertificateModalOpen,
    getNodeStatus,
    toggleTask,
    syncScannedTask,
    passGatekeeper,
    openNodeAction,
  } = useRoadmapProgress();

  const [isLowEnergyActive, setIsLowEnergyActive] = useState<boolean>(false);
  const [showLowEnergyModal, setShowLowEnergyModal] = useState<boolean>(false);
  const [showMicroWinsModal, setShowMicroWinsModal] = useState<boolean>(false);
  const [showCheatSheetModal, setShowCheatSheetModal] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const today = new Date().toISOString().split("T")[0];
      setIsLowEnergyActive(localStorage.getItem("ielts_low_energy_date") === today);
    }
  }, [showLowEnergyModal]);

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto select-none">
      {/* 1. Header Overview & Progress Stats */}
      <PhaseProgressHeader
        stats={stats}
        activePhaseFilter={activePhaseFilter}
        onSelectFilter={setActivePhaseFilter}
      />

      {/* Feature 1: Low Energy Mode Active Banner */}
      {isLowEnergyActive && (
        <div className="p-4 rounded-3xl bg-amber-500/[0.08] border-2 border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-foreground">
                  🛡️ Đang Bật Chế Độ Cứu Chuỗi Ngày Mệt Mỏi
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-700 dark:text-amber-400 font-mono">
                  Bảo Toàn Streak
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Mục tiêu hôm nay đã được rút gọn còn 1 nhiệm vụ 10-15 phút. Bạn không bị áp lực hoàn thành 4 ca học tiêu chuẩn.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowLowEnergyModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs self-start sm:self-auto cursor-pointer shadow-xs"
          >
            Xem Nhiệm Vụ Cứu Chuỗi ➔
          </button>
        </div>
      )}

      {/* Action Toolbar: Micro-Wins & Weekly Printable Cheat Sheet */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-secondary/30 border border-border">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-foreground">Hộp công cụ hỗ trợ:</span>
          <span className="text-muted-foreground hidden sm:inline">
            Dành riêng cho học viên Huyền Phạm (Target 7.5)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Micro-Wins Modal Trigger */}
          <button
            type="button"
            onClick={() => setShowMicroWinsModal(true)}
            className="px-3.5 py-1.5 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <Trophy className="h-3.5 w-3.5 text-amber-500" />
            <span>🏆 Chiến Tích & Tốt Nghiệp Phase 1</span>
          </button>

          {/* Printable Cheat Sheet Trigger */}
          <button
            type="button"
            onClick={() => setShowCheatSheetModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>📄 Tờ Bí Kíp A4 Tuần 1 (In Được)</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive 180-Day Journey Map */}
      <RoadmapJourneyMap
        nodes={allNodes}
        activePhaseFilter={activePhaseFilter}
        getNodeStatus={getNodeStatus}
        onNodeClick={openNodeAction}
      />

      {/* 3. Daily Task Checklist Drawer */}
      <DailyTaskDrawer
        isOpen={isDrawerOpen}
        dayNode={selectedDay}
        progress={progress}
        onToggleTask={toggleTask}
        onSyncTask={syncScannedTask}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* 4. Gatekeeper Boss Challenge Modal */}
      <GatekeeperChallengeModal
        isOpen={isGatekeeperModalOpen}
        dayNode={selectedDay}
        onPassGatekeeper={passGatekeeper}
        onClose={() => setIsGatekeeperModalOpen(false)}
      />

      {/* 5. Milestone Certificate Modal */}
      <MilestoneCertificateModal
        isOpen={isCertificateModalOpen}
        phase={certificatePhase}
        onClose={() => setIsCertificateModalOpen(false)}
      />

      {/* Feature Modals */}
      <EmergencyLowEnergyModal
        isOpen={showLowEnergyModal}
        onClose={() => setShowLowEnergyModal(false)}
        onStatusChange={(active) => setIsLowEnergyActive(active)}
      />

      <MicroWinsModal
        isOpen={showMicroWinsModal}
        onClose={() => setShowMicroWinsModal(false)}
      />

      <WeeklyCheatSheetModal
        isOpen={showCheatSheetModal}
        onClose={() => setShowCheatSheetModal(false)}
      />
    </div>
  );
}
