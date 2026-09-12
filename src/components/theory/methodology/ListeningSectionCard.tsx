"use client";

import React from "react";
import Link from "next/link";
import { ListeningSectionBlueprintLesson } from "@/data/mockListeningMethodsData";
import { isMethodologyGatePassed } from "@/lib/methodologyGateChecker";
import {
  Headphones,
  CheckCircle2,
  Clock,
  Volume2,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ListeningSectionCardProps {
  lesson: ListeningSectionBlueprintLesson;
  index: number;
  className?: string;
}

export function ListeningSectionCard({
  lesson,
  index,
  className,
}: ListeningSectionCardProps) {
  const isPassed = isMethodologyGatePassed(lesson.id);

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
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white font-mono text-xs font-bold shrink-0">
              S{lesson.sectionNumber}
            </span>
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase">
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
              <span className="px-2 py-0.5 rounded bg-secondary text-muted-foreground text-[10px] flex items-center gap-1">
                <Volume2 className="h-3 w-3 text-indigo-500" />
                <span>{lesson.audioSnippets.length} Audio Mẫu</span>
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h3 className="text-base font-black text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {lesson.title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {lesson.subtitle}
          </p>
        </div>

        {/* 3 Step List */}
        <div className="space-y-1.5 pt-2 border-t border-border/70 text-[11px] text-muted-foreground font-mono">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            <span>1. Khái niệm & Kỹ thuật 30s đọc đề</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span>2. Bắt bẫy âm thanh & Tự sửa thông tin</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>3. Mổ xẻ Audio Transcript chuẩn Band 8.5+</span>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-3 border-t border-border/80">
        <Link
          href={`/theory/listening-methods/${lesson.id}`}
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
