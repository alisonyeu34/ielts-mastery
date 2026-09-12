"use client";

import React from "react";
import Link from "next/link";
import { CoreGrammarTheoryLesson } from "@/data/mockGrammarTheoryData";
import { isLessonGatePassed } from "@/lib/theoryGateChecker";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Lock,
  Unlock,
  ShieldAlert,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface GrammarSyllabusCardProps {
  lesson: CoreGrammarTheoryLesson;
  index: number;
  className?: string;
}

export function GrammarSyllabusCard({
  lesson,
  index,
  className,
}: GrammarSyllabusCardProps) {
  const isPassed = isLessonGatePassed(lesson.id);

  return (
    <div
      className={cn(
        "p-6 rounded-3xl border transition-all space-y-4 flex flex-col justify-between bg-card shadow-sm hover:shadow-md select-none group",
        isPassed
          ? "border-emerald-500/30 hover:border-emerald-500/50"
          : "border-border hover:border-red-500/40",
        className
      )}
    >
      <div className="space-y-3">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-800 text-white font-mono text-xs font-bold shrink-0">
              {index + 1}
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20 uppercase">
              {lesson.targetBand}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
            {isPassed ? (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                <span>Đã Vượt Cổng</span>
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground text-[10px] flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{lesson.estimatedMinutes} Phút</span>
              </span>
            )}
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <h3 className="text-base font-black text-foreground group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
            {lesson.title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {lesson.subtitle}
          </p>
        </div>

        {/* 3-Step Feature List */}
        <div className="space-y-1.5 pt-2 border-t border-border/70 text-[11px] text-muted-foreground font-mono">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
            <span>1. Khái niệm & Cơ chế bản chất</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span>2. Vạch trần bẫy khảo thí thường gặp</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>3. Mổ xẻ câu mẫu chuẩn Band 8.5+</span>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-3 border-t border-border/80">
        <Link
          href={`/theory/${lesson.id}`}
          className={cn(
            "w-full py-2.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm",
            isPassed
              ? "bg-secondary hover:bg-secondary/80 text-foreground"
              : "bg-red-700 hover:bg-red-800 text-white shadow-red-700/20"
          )}
        >
          <span>{isPassed ? "Ôn Lại Lý Thuyết ➔" : "Học Lý Thuyết 3 Bước ➔"}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
