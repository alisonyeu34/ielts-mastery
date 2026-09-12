"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Zap,
  Award,
} from "lucide-react";
import { MOCK_SCANNING_DRILLS, ScanningDrillItem } from "@/data/mockParaphraseData";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { db } from "@/lib/db";
import { ErrorItem } from "@/types/database";
import { cn } from "@/lib/utils";

interface ScanningSpeedDrillProps {
  className?: string;
}

export function ScanningSpeedDrill({ className }: ScanningSpeedDrillProps) {
  const [currentDrillIndex, setCurrentDrillIndex] = useState(0);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(20);
  const [timeTaken, setTimeTaken] = useState(0);

  const drill =
    MOCK_SCANNING_DRILLS[currentDrillIndex % MOCK_SCANNING_DRILLS.length];

  // Timer countdown
  useEffect(() => {
    setSecondsRemaining(drill.timeLimitSeconds);
    setSelectedSegmentId(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setTimeTaken(0);

    let timer: NodeJS.Timeout | null = null;
    const startTime = Date.now();

    timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          if (timer) clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [currentDrillIndex, drill.timeLimitSeconds]);

  const handleSelectSegment = async (segmentId: string, isTarget: boolean) => {
    if (isAnswered) return;

    const timeUsed = drill.timeLimitSeconds - secondsRemaining;
    setTimeTaken(Math.max(1, timeUsed));
    setSelectedSegmentId(segmentId);
    setIsAnswered(true);
    setIsCorrect(isTarget);

    if (!isTarget) {
      try {
        const errorItem: ErrorItem = {
          id: `err_scan_${Date.now()}_${drill.id}`,
          sourceModule: "reading",
          errorType: "paraphrase_trap",
          questionContext: `[Scanning Speed Drill] ${drill.title}: "${drill.targetKeyword}"`,
          userWrongAnswer: `Chọn nhầm đoạn khác`,
          correctAnswer: drill.passageSegments.find((s) => s.isTarget)?.text || "",
          deepExplanation: drill.trapExplanation,
          mastered: false,
          retryCount: 0,
          createdAt: new Date().toISOString(),
        };

        await db.error_bank.put(errorItem);
      } catch (e) {
        console.error("Failed to auto-save scanning mistake:", e);
      }
    }
  };

  const handleNextDrill = () => {
    setCurrentDrillIndex((prev) => (prev + 1) % MOCK_SCANNING_DRILLS.length);
  };

  const timerPercent = (secondsRemaining / drill.timeLimitSeconds) * 100;

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm",
        className
      )}
    >
      {/* Header & Scanning Target */}
      <div className="space-y-3 border-b border-border/80 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 uppercase tracking-wider">
              Timed Scanning Drill • Bài {currentDrillIndex + 1}/{MOCK_SCANNING_DRILLS.length}
            </span>
          </div>

          {/* Countdown Clock */}
          <div
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold border self-start sm:self-auto",
              secondsRemaining <= 5
                ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 animate-pulse"
                : "bg-secondary text-foreground border-border"
            )}
          >
            <Clock className="h-3.5 w-3.5 text-indigo-500" />
            <span>Còn lại: {secondsRemaining}s</span>
          </div>
        </div>

        {/* Target Keyword Prompt */}
        <div className="p-4 rounded-2xl bg-indigo-500/[0.05] border border-indigo-500/20 space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
            🎯 Mục tiêu Scanning:
          </span>
          <p className="text-xs sm:text-sm text-foreground font-semibold">
            {drill.questionPrompt}
          </p>
        </div>

        <ProgressBar
          value={timerPercent}
          size="sm"
          variant={secondsRemaining <= 5 ? "rose" : "primary"}
        />
      </div>

      {/* Clickable Reading Passage */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-muted-foreground block">
          Đoạn văn bài đọc (Bấm trực tiếp vào cụm từ bạn cho là đáp án):
        </span>

        <div className="p-5 sm:p-6 rounded-2xl bg-secondary/30 border border-border/80 text-xs sm:text-sm leading-loose sm:leading-loose text-foreground font-serif">
          {drill.passageSegments.map((segment) => {
            const isSelected = selectedSegmentId === segment.id;

            return (
              <button
                key={segment.id}
                type="button"
                disabled={isAnswered}
                onClick={() => handleSelectSegment(segment.id, segment.isTarget)}
                className={cn(
                  "inline px-1.5 py-0.5 mx-0.5 rounded-lg transition-all select-none cursor-pointer border text-left",
                  !isAnswered && "hover:bg-indigo-500/20 hover:border-indigo-500/40 border-transparent",
                  isAnswered && segment.isTarget && "bg-emerald-500/30 border-emerald-500 font-bold text-emerald-950 dark:text-emerald-200",
                  isAnswered && isSelected && !segment.isTarget && "bg-rose-500/30 border-rose-500 line-through text-rose-950 dark:text-rose-200"
                )}
              >
                {segment.text}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback when Answered */}
      {isAnswered && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {isCorrect ? (
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/[0.05] border border-emerald-500/30 space-y-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  Chính xác! Bạn đã định vị thành công trong {timeTaken} giây.
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {drill.correctExplanation}
              </p>
            </div>
          ) : (
            <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/[0.05] border border-rose-500/30 space-y-1.5">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0" />
                <span className="text-sm font-bold text-rose-600 dark:text-rose-400">
                  Chưa chính xác hoặc hết thời gian!
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {drill.trapExplanation}
              </p>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleNextDrill}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Bài Scanning tiếp theo</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
