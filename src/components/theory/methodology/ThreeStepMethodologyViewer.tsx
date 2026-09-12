"use client";

import React from "react";
import {
  Lightbulb,
  ShieldAlert,
  Award,
  CheckCircle2,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ThreeStepMethodologyViewerProps {
  currentStep: 1 | 2 | 3 | 4;
  onSelectStep: (step: 1 | 2 | 3 | 4) => void;
  isGatePassed: boolean;
  className?: string;
}

export function ThreeStepMethodologyViewer({
  currentStep,
  onSelectStep,
  isGatePassed,
  className,
}: ThreeStepMethodologyViewerProps) {
  const steps = [
    {
      number: 1 as const,
      title: "Bước 1: Khái Niệm & Bản Chất",
      subtitle: "First-Principles Concept",
      icon: <Lightbulb className="h-4 w-4" />,
      color: "from-blue-600 to-indigo-600",
    },
    {
      number: 2 as const,
      title: "Bước 2: Vạch Trần Bẫy Khảo Thí",
      subtitle: "Examiner Trap Exposure",
      icon: <ShieldAlert className="h-4 w-4" />,
      color: "from-amber-600 to-orange-600",
    },
    {
      number: 3 as const,
      title: "Bước 3: Mổ Xẻ Câu Hỏi Mẫu 8.5+",
      subtitle: "Band 8.5+ Model Dissection",
      icon: <Award className="h-4 w-4" />,
      color: "from-emerald-600 to-teal-600",
    },
    {
      number: 4 as const,
      title: "Cổng Kiểm Tra Độ Hiểu",
      subtitle: "Gateway Mastery Quiz (≥80%)",
      icon: <HelpCircle className="h-4 w-4" />,
      color: "from-purple-600 to-pink-600",
    },
  ];

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-3 sm:p-4 shadow-sm space-y-2 select-none",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
          <span>Quy Trình Phương Pháp Luận 3 Bước + Cổng Mở Khóa Thực Hành:</span>
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {steps.map((s) => {
          const isActive = currentStep === s.number;

          return (
            <button
              key={s.number}
              type="button"
              onClick={() => onSelectStep(s.number)}
              className={cn(
                "p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer group",
                isActive
                  ? `bg-gradient-to-r text-white shadow-md ring-2 ring-indigo-500/20 ${s.color}`
                  : "bg-card border-border hover:border-indigo-500/40 hover:bg-secondary/60 text-foreground"
              )}
            >
              <div className="flex items-center justify-between gap-1.5 mb-1">
                <div className="flex items-center gap-1.5">
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-lg",
                      isActive ? "bg-white/20 text-white" : "bg-secondary text-foreground"
                    )}
                  >
                    {s.icon}
                  </div>
                  <span className={cn("text-xs font-extrabold truncate", isActive ? "text-white" : "text-foreground")}>
                    {s.title}
                  </span>
                </div>

                {s.number === 4 && isGatePassed ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                ) : null}
              </div>

              <p
                className={cn(
                  "text-[10px] leading-tight font-mono",
                  isActive ? "text-white/90" : "text-muted-foreground"
                )}
              >
                {s.subtitle}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
