"use client";

import React from "react";
import {
  BookOpen,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Layers,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TheoryLessonStepperProps {
  currentStep: 1 | 2 | 3;
  onSelectStep: (step: 1 | 2 | 3) => void;
  className?: string;
}

const STEPS = [
  {
    stepNumber: 1 as const,
    titleVi: "Bước 1: Bản Chất & Khái Niệm",
    subtitleEn: "Core Concept & First Principles",
    icon: BookOpen,
    activeColor: "border-blue-600 bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/20",
  },
  {
    stepNumber: 2 as const,
    titleVi: "Bước 2: Vạch Trần Bẫy Khảo Thí",
    subtitleEn: "Trap Exposure & Cambridge Mindset",
    icon: ShieldAlert,
    activeColor: "border-rose-600 bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-2 ring-rose-500/20",
  },
  {
    stepNumber: 3 as const,
    titleVi: "Bước 3: Mổ Xẻ Bài Mẫu 8.5+",
    subtitleEn: "Anatomy of Band 8.5+ Sample",
    icon: Sparkles,
    activeColor: "border-emerald-600 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-500/20",
  },
];

export function TheoryLessonStepper({
  currentStep,
  onSelectStep,
  className,
}: TheoryLessonStepperProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-3 select-none", className)}>
      {STEPS.map((step) => {
        const IconComp = step.icon;
        const isActive = currentStep === step.stepNumber;
        const isPast = currentStep > step.stepNumber;

        return (
          <button
            key={step.stepNumber}
            type="button"
            onClick={() => onSelectStep(step.stepNumber)}
            className={cn(
              "p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer",
              isActive
                ? step.activeColor
                : isPast
                ? "bg-emerald-500/[0.04] border-emerald-500/30 text-foreground hover:bg-secondary/40"
                : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-secondary/30"
            )}
          >
            <div className="flex items-center gap-2.5 truncate">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-bold text-xs border",
                  isActive
                    ? "bg-primary text-primary-foreground border-primary"
                    : isPast
                    ? "bg-emerald-500/20 text-emerald-600 border-emerald-500/40"
                    : "bg-secondary text-muted-foreground border-border"
                )}
              >
                {isPast ? <CheckCircle2 className="h-4 w-4" /> : <IconComp className="h-4 w-4" />}
              </div>

              <div className="truncate">
                <span className="font-extrabold text-xs sm:text-sm text-foreground block truncate">
                  {step.titleVi}
                </span>
                <span className="text-[11px] text-muted-foreground block truncate">
                  {step.subtitleEn}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
