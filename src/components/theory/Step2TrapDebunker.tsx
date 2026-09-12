"use client";

import React from "react";
import {
  ShieldAlert,
  AlertTriangle,
  Zap,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Lock,
} from "lucide-react";
import { InteractiveTheoryLesson } from "@/data/mockTheoryLessons";
import { cn } from "@/lib/utils";

interface Step2TrapDebunkerProps {
  lesson: InteractiveTheoryLesson;
  onPrevStep: () => void;
  onNextStep: () => void;
  className?: string;
}

export function Step2TrapDebunker({
  lesson,
  onPrevStep,
  onNextStep,
  className,
}: Step2TrapDebunkerProps) {
  const { step2 } = lesson;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-7 select-none animate-in fade-in duration-200",
        className
      )}
    >
      {/* Header */}
      <div className="border-b border-border/70 pb-4 space-y-1">
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 uppercase tracking-wider">
          Bước 2 / 3 • Vạch Trần Bẫy Khảo Thí Cambridge
        </span>
        <h3 className="text-lg sm:text-xl font-black text-foreground">
          Bóc Tách Các Cạm Bẫy Khiến Thí Sinh Mất Điểm
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {step2.overview}
        </p>
      </div>

      {/* Traps List */}
      <div className="space-y-5">
        {step2.traps.map((trap, idx) => (
          <div
            key={trap.id}
            className="p-5 rounded-2xl bg-rose-500/[0.03] border border-rose-500/30 space-y-4 text-xs"
          >
            {/* Trap Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-500/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-600 text-white font-mono text-xs font-bold">
                  {idx + 1}
                </span>
                <h4 className="text-sm font-extrabold text-foreground">
                  {trap.trapName}
                </h4>
              </div>

              <span
                className={cn(
                  "text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border self-start sm:self-auto uppercase tracking-wider",
                  trap.dangerLevel === "Extreme"
                    ? "bg-rose-600 text-white border-rose-600 animate-pulse"
                    : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
                )}
              >
                Nguy hiểm: {trap.dangerLevel}
              </span>
            </div>

            {/* Trap Mechanism */}
            <div className="space-y-1">
              <span className="font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider text-[10px] block">
                Cơ Chế Bẫy Tâm Lý:
              </span>
              <p className="text-muted-foreground leading-relaxed">
                {trap.trapMechanism}
              </p>
            </div>

            {/* Bad Example */}
            <div className="p-3.5 rounded-xl bg-card border border-rose-500/30 space-y-1">
              <span className="text-[10px] font-bold text-rose-600 flex items-center gap-1">
                <XCircle className="h-3.5 w-3.5" /> Ví dụ câu dính bẫy (Band 5.0):
              </span>
              <p className="font-mono text-[11px] text-foreground/90 italic">
                "{trap.badExample}"
              </p>
            </div>

            {/* Antidote */}
            <div className="p-3.5 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/30 space-y-1">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Chiến thuật hóa giải (Antidote):
              </span>
              <p className="text-[11px] text-foreground leading-relaxed font-semibold">
                {trap.antidote}
              </p>
            </div>

            {/* Cambridge Secret */}
            <p className="text-[11px] text-muted-foreground italic font-serif pt-1">
              🔍 <strong>Bí mật khảo thí:</strong> {trap.cambridgeSecret}
            </p>
          </div>
        ))}
      </div>

      {/* Footer Navigation */}
      <div className="pt-2 border-t border-border/80 flex items-center justify-between">
        <button
          type="button"
          onClick={onPrevStep}
          className="px-4 py-2 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Về Bước 1</span>
        </button>

        <button
          type="button"
          onClick={onNextStep}
          className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md shadow-primary/20 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
        >
          <span>Tiếp tục: Bước 3 - Mổ Xẻ Bài Mẫu 8.5+</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
