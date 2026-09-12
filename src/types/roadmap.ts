export type PhaseStatus = "active" | "locked" | "completed";

export interface PhaseMilestone {
  id: string;
  title: string;
  completed: boolean;
}

export interface RoadmapPhase {
  id: number;
  phaseNumber: number;
  title: string;
  subtitle: string;
  targetRange: string;
  duration: string;
  status: PhaseStatus;
  progressPercent: number;
  description: string;
  focusAreas: string[];
  milestones: PhaseMilestone[];
  unlockedModulesCount: number;
  totalModulesCount: number;
}

export interface RoadmapOverview {
  currentPhaseId: number;
  totalPhases: number;
  overallProgress: number;
  startBand: number;
  targetBand: number;
  totalDays: number;
  elapsedDays: number;
  phases: RoadmapPhase[];
}
