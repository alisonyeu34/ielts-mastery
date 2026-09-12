"use client";

import React from "react";
import {
  FileText,
  Sparkles,
  Clock,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import { Part2CueCardTask } from "@/data/mockSpeakingP1P2Data";
import { cn } from "@/lib/utils";

interface CueCardViewerProps {
  task: Part2CueCardTask;
  isPreparing: boolean;
  onStartPrep: () => void;
  onLoadSampleNotes: () => void;
  className?: string;
}

export function CueCardViewer({
  task,
  isPreparing,
  onStartPrep,
  onLoadSampleNotes,
  className,
}: CueCardViewerProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-4 select-none",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
          Part 2: Candidate Task Card
        </span>

        <span className="text-xs font-semibold text-muted-foreground">
          Chủ đề: {task.topic}
        </span>
      </div>

      {/* Official Cambridge Cue Card Frame */}
      <div className="p-5 rounded-2xl bg-secondary/30 border border-border/90 space-y-3 font-serif">
        <h3 className="text-base sm:text-lg font-bold text-foreground">
          {task.cueCardTitle || task.title}
        </h3>

        <div className="space-y-1 text-xs sm:text-sm text-foreground/90">
          <p className="font-sans font-semibold text-[11px] text-muted-foreground uppercase tracking-wider">
            You should say:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            {(task.prompts || task.bulletPoints || []).map((p, idx) => (
              <li key={idx} className="leading-relaxed">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
        <button
          type="button"
          onClick={onLoadSampleNotes}
          className="text-xs font-semibold text-muted-foreground hover:text-foreground bg-secondary hover:bg-secondary/80 px-3.5 py-2 rounded-xl border border-border flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
          <span>Tải dàn ý mẫu Band 8+</span>
        </button>

        {!isPreparing && (
          <button
            type="button"
            onClick={onStartPrep}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
          >
            <Clock className="h-3.5 w-3.5" />
            <span>Bắt đầu 60s Chuẩn Bị (Prep Timer)</span>
          </button>
        )}
      </div>
    </div>
  );
}
