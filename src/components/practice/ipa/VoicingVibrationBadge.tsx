"use client";

import React from "react";
import { Activity, Wind, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoicingVibrationBadgeProps {
  isVoiced: boolean;
  className?: string;
}

export function VoicingVibrationBadge({
  isVoiced,
  className,
}: VoicingVibrationBadgeProps) {
  if (isVoiced) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 select-none shadow-2xs",
          className
        )}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        <span>Hữu Thanh (Voiced • Rung Cổ)</span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 select-none shadow-2xs",
        className
      )}
    >
      <Wind className="h-3 w-3 text-blue-500" />
      <span>Vô Thanh (Voiceless • Bật Hơi)</span>
    </span>
  );
}
