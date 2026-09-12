"use client";

import React from "react";
import { Sparkles, Pin } from "lucide-react";
import { cn } from "@/lib/utils";

interface EvidenceHighlighterOverlayProps {
  sentenceId: string;
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
}

export function EvidenceHighlighterOverlay({
  sentenceId,
  isActive,
  children,
  className,
}: EvidenceHighlighterOverlayProps) {
  return (
    <span
      id={sentenceId}
      className={cn(
        "relative transition-all duration-300 rounded-md inline",
        isActive
          ? "bg-amber-400/25 ring-2 ring-amber-500/80 dark:bg-amber-500/30 px-1 py-0.5 shadow-sm animate-pulse"
          : "",
        className
      )}
    >
      {isActive && (
        <span className="inline-flex items-center gap-0.5 mr-1 px-1.5 py-0.2 rounded bg-amber-500 text-white font-mono text-[9px] font-bold uppercase select-none align-middle shadow-xs">
          <Pin className="h-2.5 w-2.5" /> Dẫn Chứng
        </span>
      )}
      {children}
    </span>
  );
}
