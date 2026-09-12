"use client";

import React from "react";
import {
  Sparkles,
  Trophy,
  Lock,
  CheckCircle2,
  Compass,
  Layers,
  Flag,
} from "lucide-react";
import { RoadmapDayNode } from "@/data/mockRoadmapTimeline";
import { PhaseNumber } from "@/types/database";
import { MilestoneNode } from "@/components/roadmap/MilestoneNode";
import { cn } from "@/lib/utils";

interface RoadmapJourneyMapProps {
  nodes: RoadmapDayNode[];
  activePhaseFilter: PhaseNumber | "all";
  getNodeStatus: (
    dayNode: RoadmapDayNode
  ) => "locked" | "active" | "completed" | "gatekeeper_ready";
  onNodeClick: (dayNode: RoadmapDayNode) => void;
  className?: string;
}

export function RoadmapJourneyMap({
  nodes,
  activePhaseFilter,
  getNodeStatus,
  onNodeClick,
  className,
}: RoadmapJourneyMapProps) {
  // Filter nodes based on selected phase
  const filteredNodes = nodes.filter((n) => {
    if (activePhaseFilter === "all") return true;
    return n.phase === activePhaseFilter;
  });

  // Group nodes by Phase for visual biome dividers when "all" is selected
  const phase1Nodes = filteredNodes.filter((n) => n.phase === 1);
  const phase2Nodes = filteredNodes.filter((n) => n.phase === 2);
  const phase3Nodes = filteredNodes.filter((n) => n.phase === 3);

  const renderSection = (
    title: string,
    phaseNumber: PhaseNumber,
    sectionNodes: RoadmapDayNode[],
    colorBadge: string,
    biomeBg: string
  ) => {
    if (sectionNodes.length === 0) return null;

    return (
      <div className={cn("rounded-3xl border p-5 sm:p-7 space-y-6 shadow-sm", biomeBg)}>
        {/* Biome Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-4">
          <div className="flex items-center gap-2.5">
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-xl font-bold text-xs border shadow-xs",
                colorBadge
              )}
            >
              P{phaseNumber}
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-black text-foreground">
                {title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {sectionNodes.length} trạm học tập • Trọng tâm năng lực Phase {phaseNumber}
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-card border border-border text-muted-foreground self-start sm:self-auto">
            {phaseNumber === 1
              ? "Ngày 1 ➔ Ngày 11"
              : phaseNumber === 2
              ? "Ngày 12 ➔ Ngày 46"
              : "Ngày 47 ➔ Ngày 165"}
          </span>
        </div>

        {/* Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sectionNodes.map((dayNode) => {
            const status = getNodeStatus(dayNode);
            return (
              <MilestoneNode
                key={dayNode.dayNumber}
                dayNode={dayNode}
                status={status}
                onClick={() => onNodeClick(dayNode)}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={cn("space-y-8 select-none", className)}>
      {activePhaseFilter === "all" || activePhaseFilter === 1 ? (
        renderSection(
          "Phase 1: Cứu Ngữ Pháp Tinh Gọn (Band 4.5 ➔ 5.5)",
          1,
          phase1Nodes,
          "bg-red-700 text-white border-red-700",
          "bg-red-500/[0.02] border-red-500/20"
        )
      ) : null}

      {activePhaseFilter === "all" || activePhaseFilter === 2 ? (
        renderSection(
          "Phase 2: Kỹ Thuật & 14 Dạng Bài (Band 5.5 ➔ 6.5)",
          2,
          phase2Nodes,
          "bg-purple-600 text-white border-purple-600",
          "bg-purple-500/[0.02] border-purple-500/20"
        )
      ) : null}

      {activePhaseFilter === "all" || activePhaseFilter === 3 ? (
        renderSection(
          "Phase 3: Tư Duy Phản Biện C1/C2 (Band 6.5 ➔ 7.5+)",
          3,
          phase3Nodes,
          "bg-amber-600 text-white border-amber-600",
          "bg-amber-500/[0.02] border-amber-500/20"
        )
      ) : null}
    </div>
  );
}
