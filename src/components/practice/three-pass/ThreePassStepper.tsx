"use client";

import React from "react";
import { Clock, Search, BookOpen, CheckCircle2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThreePassStepperProps {
  currentPass: 1 | 2 | 3;
  isPass1Completed: boolean;
  isPass2Completed: boolean;
  onSelectPass: (pass: 1 | 2 | 3) => void;
  className?: string;
}

const PASS_STEPS: Array<{
  passNumber: 1 | 2 | 3;
  titleVi: string;
  subtitleEn: string;
  icon: typeof Clock;
  colorActive: string;
}> = [
  {
    passNumber: 1,
    titleVi: "Vòng 1: Áp Lực Thời Gian",
    subtitleEn: "Timed Exam Simulation (12 Mins)",
    icon: Clock,
    colorActive: "border-blue-600 bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/20",
  },
  {
    passNumber: 2,
    titleVi: "Vòng 2: Đào Sâu Không Giới Hạn",
    subtitleEn: "Untimed Deep Dive (Zero Pressure)",
    icon: Search,
    colorActive: "border-purple-600 bg-purple-500/10 text-purple-600 dark:text-purple-400 ring-2 ring-purple-500/20",
  },
  {
    passNumber: 3,
    titleVi: "Vòng 3: Mổ Xẻ & Thu Hoạch",
    subtitleEn: "Post-Mortem & FSRS Sync",
    icon: BookOpen,
    colorActive: "border-emerald-600 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-500/20",
  },
];

export function ThreePassStepper({
  currentPass,
  isPass1Completed,
  isPass2Completed,
  onSelectPass,
  className,
}: ThreePassStepperProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-3 select-none", className)}>
      {PASS_STEPS.map((step) => {
        const IconComp = step.icon;
        const isActive = currentPass === step.passNumber;

        let isUnlocked = false;
        let isDone = false;

        if (step.passNumber === 1) {
          isUnlocked = true;
          isDone = isPass1Completed;
        } else if (step.passNumber === 2) {
          isUnlocked = isPass1Completed;
          isDone = isPass2Completed;
        } else if (step.passNumber === 3) {
          isUnlocked = isPass2Completed;
          isDone = false;
        }

        return (
          <button
            key={step.passNumber}
            type="button"
            onClick={() => isUnlocked && onSelectPass(step.passNumber)}
            disabled={!isUnlocked}
            className={cn(
              "p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3",
              isActive
                ? step.colorActive
                : isUnlocked
                ? "bg-card border-border/80 text-foreground hover:bg-secondary/40 cursor-pointer"
                : "bg-secondary/20 border-border/40 text-muted-foreground/50 opacity-60 cursor-not-allowed"
            )}
          >
            <div className="flex items-center gap-2.5 truncate">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-bold text-xs border",
                  isActive
                    ? "bg-primary text-primary-foreground border-primary"
                    : isDone
                    ? "bg-emerald-500/20 text-emerald-600 border-emerald-500/40"
                    : "bg-secondary text-muted-foreground border-border"
                )}
              >
                {isDone ? <CheckCircle2 className="h-4 w-4" /> : <IconComp className="h-4 w-4" />}
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

            {!isUnlocked && <Lock className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />}
          </button>
        );
      })}
    </div>
  );
}
