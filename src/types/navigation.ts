import { LucideIcon } from "lucide-react";

export interface NavItem {
  id: string;
  moduleNumber: number;
  title: string;
  shortTitle: string;
  description: string;
  href: string;
  iconName: "BookOpen" | "Zap" | "PenTool" | "Brain" | "ShieldAlert" | "Bot" | "Sparkles";
  badge?: string;
  status: "active" | "locked" | "completed";
  highlightColor: string;
  estimatedTime?: string;
  metricsLabel?: string;
  metricsValue?: string;
}

export interface UserStats {
  targetBand: number;
  currentBand: number;
  studyDaysRemaining: number;
  totalDays: number;
  currentStreak: number;
  dueVocabCount: number;
  unresolvedErrorsCount: number;
  overallProgressPercent: number;
}
