"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import {
  Sparkles,
  HardDrive,
  Target,
  Award,
  Flame,
  Clock,
  Layers,
  ArrowRight,
  ShieldAlert,
  Brain,
  Zap,
  BookOpen,
  PenTool,
} from "lucide-react";
import { useDashboardTelemetry } from "@/hooks/useDashboardTelemetry";
import { DisciplineTelemetryData } from "@/lib/dashboardAnalytics";
import { RoadmapMilestoneTracker } from "@/components/dashboard/RoadmapMilestoneTracker";
import { DisciplineTelemetryWidget } from "@/components/dashboard/DisciplineTelemetryWidget";
import { QuickAccessHub } from "@/components/dashboard/QuickAccessHub";
import { PersonalTrajectoryChart } from "@/components/dashboard/PersonalTrajectoryChart";
import { DataBackupManagerModal } from "@/components/dashboard/DataBackupManagerModal";

function DashboardMainContent() {
  const telemetry = useDashboardTelemetry();
  const [isBackupModalOpen, setIsBackupModalOpen] = useState<boolean>(false);

  return (
    <div className="space-y-8 pb-24 max-w-6xl mx-auto select-none">
      {/* 1. Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
            <Sparkles className="h-4 w-4" /> Bảng Theo Dõi Học Tập IELTS
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Bảng Theo Dõi Lộ Trình 165 Ngày (4.5 ➔ 7.5)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Theo dõi tiến độ 3 giai đoạn (5.5 tháng) • Mục tiêu học linh hoạt • Dự kiến thăng hạng mục tiêu Band 7.5.
          </p>
        </div>

        {/* Data Backup Center Button */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsBackupModalOpen(true)}
            className="inline-flex items-center gap-2 text-xs font-bold text-foreground px-4 py-2.5 rounded-2xl border border-border bg-card hover:bg-secondary/70 shadow-xs transition-all hover:scale-105 cursor-pointer"
          >
            <HardDrive className="h-4 w-4 text-primary" />
            <span>Sao Lưu Dữ Liệu</span>
          </button>
        </div>
      </div>

      {/* 2. Top Widget: Discipline Telemetry & Daily Quota */}
      <DisciplineTelemetryWidget discipline={telemetry.discipline} />

      {/* 3. Quick Access Hub (6 Core Modules with Live Pending Badges) */}
      <QuickAccessHub
        vocabDueToday={telemetry.vocabStats.dueToday}
        unmasteredErrors={telemetry.errorBankStats.unmastered}
      />

      {/* 4. 180-Day Unlock-based Roadmap Milestone Tracker */}
      <RoadmapMilestoneTracker milestones={telemetry.milestones} />

      {/* 5. Personal Band Trajectory Chart */}
      <PersonalTrajectoryChart
        trajectoryPoints={telemetry.trajectoryPoints}
        currentEstimatedBand={telemetry.estimatedOverallBand}
        targetBand={7.5}
      />

      {/* 6. Data Backup Modal */}
      <DataBackupManagerModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-xs font-mono text-muted-foreground animate-pulse">
          Đang tải bảng theo dõi học tập...
        </div>
      }
    >
      <DashboardMainContent />
    </Suspense>
  );
}
