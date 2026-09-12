"use client";

import React from "react";
import { Volume2, Sparkles, Pin } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioEvidencePinpointerProps {
  startTimeSec: number;
  questionNumber: number;
  isActive: boolean;
  onJumpToEvidence: (startTimeSec: number) => void;
  className?: string;
}

export function AudioEvidencePinpointer({
  startTimeSec,
  questionNumber,
  isActive,
  onJumpToEvidence,
  className,
}: AudioEvidencePinpointerProps) {
  return (
    <button
      type="button"
      onClick={() => onJumpToEvidence(startTimeSec)}
      className={cn(
        "px-2.5 py-1 rounded-xl border text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-2xs",
        isActive
          ? "bg-amber-500 text-white border-amber-600 animate-pulse scale-105"
          : "bg-secondary/40 hover:bg-secondary border-border text-muted-foreground hover:text-foreground",
        className
      )}
      title="Tua audio phát đúng 8s câu dẫn chứng"
    >
      <Volume2 className={cn("h-3.5 w-3.5", isActive ? "text-white" : "text-amber-500")} />
      <span>Soi Dẫn Chứng ({startTimeSec}s)</span>
    </button>
  );
}
