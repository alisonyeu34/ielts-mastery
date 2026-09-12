"use client";

import React, { useState, useEffect } from "react";
import { Clock, Pause, Play, RotateCcw, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WritingTimerProps {
  initialMinutes: number;
  onTimeUp?: () => void;
  className?: string;
}

export function WritingTimer({
  initialMinutes,
  onTimeUp,
  className,
}: WritingTimerProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(true);

  // Update seconds if initialMinutes changes (when switching tasks)
  useEffect(() => {
    setSecondsRemaining(initialMinutes * 60);
    setIsRunning(true);
  }, [initialMinutes]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (onTimeUp) onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsRemaining, onTimeUp]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const isLowTime = secondsRemaining <= 300 && secondsRemaining > 0; // < 5 mins
  const isTimeUp = secondsRemaining === 0;

  const handleReset = () => {
    setSecondsRemaining(initialMinutes * 60);
    setIsRunning(true);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all shadow-sm",
        isTimeUp
          ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 animate-pulse"
          : isLowTime
          ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30"
          : "bg-secondary/60 text-foreground border-border",
        className
      )}
    >
      <Clock className={cn("h-3.5 w-3.5", isLowTime ? "text-amber-500 animate-spin" : "text-indigo-500")} />
      <span>{formattedTime}</span>

      {/* Control Buttons */}
      <div className="flex items-center gap-1 ml-1 border-l border-border/80 pl-1.5">
        <button
          type="button"
          onClick={() => setIsRunning(!isRunning)}
          className="p-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          title={isRunning ? "Tạm dừng đồng hồ" : "Tiếp tục làm bài"}
        >
          {isRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="p-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          title="Đặt lại thời gian"
        >
          <RotateCcw className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
