"use client";

import React from "react";
import { Compass, Sparkles, BookOpen, Layers } from "lucide-react";
import { SpeakingCueCardItem } from "@/data/mockSpeakingP1P2Data";
import { cn } from "@/lib/utils";

interface CueCardPromptViewerProps {
  cueCard: SpeakingCueCardItem;
  className?: string;
}

export function CueCardPromptViewer({
  cueCard,
  className,
}: CueCardPromptViewerProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-primary/30 bg-card p-6 sm:p-7 shadow-sm space-y-5 select-none relative overflow-hidden",
        className
      )}
    >
      {/* Top Background Ribbon */}
      <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-2xl bg-primary/10 text-primary font-mono text-[10px] font-bold uppercase tracking-wider border-b border-l border-primary/20">
        IELTS Speaking Part 2
      </div>

      <div className="space-y-1.5">
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-secondary text-muted-foreground uppercase">
          Cue Card Topic
        </span>
        <h3 className="text-lg sm:text-xl font-black text-foreground">
          {cueCard.topic}
        </h3>
      </div>

      {/* Cue Card Body Box */}
      <div className="p-5 rounded-2xl bg-secondary/30 border border-border/80 space-y-3 font-serif">
        <span className="text-xs font-bold text-foreground font-sans block">
          You should say:
        </span>

        <ul className="space-y-2 text-xs sm:text-sm text-foreground/90 pl-1">
          {cueCard.bulletPoints.map((bp, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-mono text-[10px] font-bold mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-snug">{bp}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-3 rounded-xl bg-amber-500/[0.06] border border-amber-500/20 text-[11px] text-muted-foreground">
        💡 <strong>Chiến thuật:</strong> Bạn có đúng 1 phút để phác thảo các từ khóa giác quan hoặc trạm không gian. Không viết thành câu hoàn chỉnh!
      </div>
    </div>
  );
}
