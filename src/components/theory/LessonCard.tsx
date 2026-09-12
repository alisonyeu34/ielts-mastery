import React from "react";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Play,
  RotateCcw,
  Zap,
} from "lucide-react";
import { TheoryLesson, SkillType } from "@/types/database";
import { cn } from "@/lib/utils";

interface LessonCardProps {
  lesson: TheoryLesson;
  className?: string;
}

const SKILL_CONFIG: Record<SkillType, { label: string; color: string; bg: string; border: string }> = {
  grammar: {
    label: "Ngữ pháp Cốt lõi",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  pronunciation: {
    label: "Phát âm IPA",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  reading: {
    label: "Reading & Bẫy Đề",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  listening: {
    label: "Listening Bẫy Âm",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  writing_task1: {
    label: "Writing Task 1",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  writing_task2: {
    label: "Writing Task 2",
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
  },
  speaking: {
    label: "Speaking Phản xạ",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
};

export function LessonCard({ lesson, className }: LessonCardProps) {
  const skillConfig = SKILL_CONFIG[lesson.skill] || {
    label: lesson.skill,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl border bg-card p-5 shadow-sm transition-all duration-200",
        lesson.isCompleted
          ? "border-emerald-500/30 hover:border-emerald-500/60 bg-gradient-to-b from-card to-emerald-500/[0.02]"
          : "border-border/80 hover:border-indigo-500/50 hover:shadow-md hover:shadow-indigo-500/5",
        className
      )}
    >
      <div className="space-y-3.5">
        {/* Top bar: Skill badge, Phase tag, Completion status */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-[10px] font-bold px-2.5 py-0.5 rounded-md border uppercase tracking-wider",
                skillConfig.color,
                skillConfig.bg,
                skillConfig.border
              )}
            >
              {skillConfig.label}
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground bg-secondary px-2 py-0.5 rounded-md">
              P{lesson.phase} • Bài {lesson.orderIndex}
            </span>
          </div>

          {lesson.isCompleted ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="h-3.5 w-3.5" /> Đã xong
            </span>
          ) : (
            <span className="text-[11px] font-medium text-muted-foreground">
              Chưa học
            </span>
          )}
        </div>

        {/* Lesson Title */}
        <Link href={`/theory/${lesson.id}`} className="block group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          <h3 className="text-base font-bold text-foreground leading-snug line-clamp-2">
            {lesson.title}
          </h3>
        </Link>

        {/* 3-Step Methodology Highlights Preview */}
        <div className="grid grid-cols-3 gap-1.5 pt-1 text-[10px] font-medium text-muted-foreground">
          <div className="p-1.5 rounded-lg bg-secondary/50 border border-border/40 text-center truncate">
            💡 1. Bản chất
          </div>
          <div className="p-1.5 rounded-lg bg-secondary/50 border border-border/40 text-center truncate">
            ⚠️ 2. Vạch bẫy
          </div>
          <div className="p-1.5 rounded-lg bg-secondary/50 border border-border/40 text-center truncate">
            💎 3. Band 8.5+
          </div>
        </div>
      </div>

      {/* Footer Info & Action Button */}
      <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            {lesson.estimatedMinutes} phút
          </span>
          <span className="flex items-center gap-1">
            <HelpCircle className="h-3.5 w-3.5 text-amber-500" />
            {lesson.quiz.length} câu quiz
          </span>
        </div>

        <Link
          href={`/theory/${lesson.id}`}
          className={cn(
            "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm",
            lesson.isCompleted
              ? "bg-secondary text-foreground hover:bg-secondary/80 border border-border"
              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 group-hover:scale-105"
          )}
        >
          {lesson.isCompleted ? (
            <>
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Ôn lại</span>
            </>
          ) : (
            <>
              <Play className="h-3 w-3 fill-white" />
              <span>Học ngay</span>
            </>
          )}
        </Link>
      </div>
    </div>
  );
}
