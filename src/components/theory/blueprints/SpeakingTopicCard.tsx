"use client";

import React from "react";
import Link from "next/link";
import { SpeakingBlueprintLesson } from "@/data/mockSpeakingBlueprintsData";
import { isProductiveGatePassed } from "@/lib/productiveGateChecker";
import {
  Mic,
  CheckCircle2,
  Clock,
  Volume2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SpeakingTopicCardProps {
  lesson: SpeakingBlueprintLesson;
  index: number;
  className?: string;
}

export function SpeakingTopicCard({
  lesson,
  index,
  className,
}: SpeakingTopicCardProps) {
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
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400">
              {lesson.partNumber === 0 ? "All Parts" : `Part ${lesson.partNumber}`}
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
                <Volume2 className="h-3 w-3 text-amber-500" />
                <span>Audio Đối Chiếu</span>
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
            FC Fluency
          </span>
          <span className="px-2 py-0.5 rounded-md bg-secondary/60 text-foreground font-mono text-[10px] font-bold">
            LR Lexis
          </span>
          <span className="px-2 py-0.5 rounded-md bg-secondary/60 text-foreground font-mono text-[10px] font-bold">
            GRA Grammar
          </span>
          <span className="px-2 py-0.5 rounded-md bg-secondary/60 text-foreground font-mono text-[10px] font-bold">
            PR Pronunciation
          </span>
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-3 border-t border-border/80">
        <Link
          href={`/theory/speaking-blueprints/${lesson.id}`}
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
