"use client";

import React from "react";
import Link from "next/link";
import { WritingBlueprintLesson } from "@/data/mockWritingBlueprintsData";
import { isProductiveGatePassed } from "@/lib/productiveGateChecker";
import {
  PenTool,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Award,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WritingTopicCardProps {
  lesson: WritingBlueprintLesson;
  index: number;
  className?: string;
}

export function WritingTopicCard({
  lesson,
  index,
  className,
}: WritingTopicCardProps) {
  const isPassed = isProductiveGatePassed(lesson.id);

  return (
    <div
      className={cn(
        "p-6 rounded-3xl border transition-all space-y-4 flex flex-col justify-between bg-card shadow-sm hover:shadow-md select-none group",
        isPassed
          ? "border-emerald-500/30 hover:border-emerald-500/50"
          : "border-border hover:border-indigo-500/40",
        className
      )}
    >
      <div className="space-y-3">
        {/* Top Header & Badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase",
                lesson.taskType === "task1"
                  ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  : "bg-purple-500/10 text-purple-600 dark:text-purple-400"
              )}
            >
              {lesson.taskType === "task1" ? "Task 1 • Báo Cáo" : "Task 2 • Nghị Luận"}
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-secondary text-muted-foreground uppercase">
              {lesson.bandTarget}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
            {isPassed ? (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                <span>Đã Vượt Cổng</span>
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded bg-secondary text-muted-foreground text-[10px] flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{lesson.estimatedMinutes} Phút</span>
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h3 className="text-base font-black text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {lesson.title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {lesson.subtitle}
          </p>
        </div>

        {/* 4 Criteria Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/70">
          <span className="px-2 py-0.5 rounded-md bg-secondary/60 text-foreground font-mono text-[10px] font-bold">
            TA / TR
          </span>
          <span className="px-2 py-0.5 rounded-md bg-secondary/60 text-foreground font-mono text-[10px] font-bold">
            CC Cohesion
          </span>
          <span className="px-2 py-0.5 rounded-md bg-secondary/60 text-foreground font-mono text-[10px] font-bold">
            LR Lexis
          </span>
          <span className="px-2 py-0.5 rounded-md bg-secondary/60 text-foreground font-mono text-[10px] font-bold">
            GRA Grammar
          </span>
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-3 border-t border-border/80">
        <Link
          href={`/theory/writing-blueprints/${lesson.id}`}
          className={cn(
            "w-full py-2.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm",
            isPassed
              ? "bg-secondary hover:bg-secondary/80 text-foreground"
              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20"
          )}
        >
          <span>{isPassed ? "Ôn Lại Chiến Lược ➔" : "Học Chiến Lược 3 Bước ➔"}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
