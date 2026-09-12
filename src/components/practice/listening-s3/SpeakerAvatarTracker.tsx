"use client";

import React from "react";
import { S3Speaker, DialogueTurn } from "@/data/mockSection3ConsensusData";
import { User, GraduationCap, Mic, Volume2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpeakerAvatarTrackerProps {
  speakers: S3Speaker[];
  activeSpeakerId: string | null;
  currentTurn: DialogueTurn | null;
  isPlaying: boolean;
  className?: string;
}

export function SpeakerAvatarTracker({
  speakers,
  activeSpeakerId,
  currentTurn,
  isPlaying,
  className,
}: SpeakerAvatarTrackerProps) {
  const getStanceBadge = (stance?: string) => {
    switch (stance) {
      case "disagreement":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30";
      case "final_agreement":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
      case "proposal":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30";
      case "supervisor_advice":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30";
      default:
        return "bg-secondary text-muted-foreground border-border";
    }
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-sm space-y-3 select-none",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border/60 pb-2">
        <div className="flex items-center gap-2">
          <Mic className="h-4 w-4 text-primary" />
          <span className="font-bold text-xs text-foreground">
            Theo Dấu Đa Chủ Thể Thời Gian Thực (Multi-Speaker Tracker)
          </span>
        </div>

        <span className="text-[10px] font-mono text-muted-foreground">
          3 Nhân vật tham gia
        </span>
      </div>

      {/* 3 Speaker Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {speakers.map((spk) => {
          const isActive = activeSpeakerId === spk.id;
          const isSupervisor = spk.id === "prof_davies";

          return (
            <div
              key={spk.id}
              className={cn(
                "p-3 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-2 relative overflow-hidden",
                isActive
                  ? spk.borderActive
                  : "border-border/70 bg-secondary/15 opacity-70 hover:opacity-100"
              )}
            >
              {/* Active Audio Waveform Background Animation */}
              {isActive && isPlaying && (
                <div className="absolute top-2 right-2 flex items-end gap-0.5 h-4">
                  <span className="w-1 bg-current h-3 animate-pulse rounded-full" />
                  <span className="w-1 bg-current h-4 animate-ping rounded-full" />
                  <span className="w-1 bg-current h-2 animate-bounce rounded-full" />
                </div>
              )}

              {/* Speaker Header */}
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold text-xs border shadow-2xs transition-transform",
                    spk.avatarBg,
                    isActive && isPlaying && "scale-110 ring-2 ring-current/30"
                  )}
                >
                  {isSupervisor ? (
                    <GraduationCap className="h-5 w-5" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>

                <div className="min-w-0">
                  <h4 className={cn("font-black text-xs sm:text-sm truncate", spk.textColor)}>
                    {spk.name}
                  </h4>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {spk.roleEn}
                  </p>
                </div>
              </div>

              {/* Current Stance Badge */}
              <div className="pt-1">
                {isActive && currentTurn ? (
                  <span
                    className={cn(
                      "text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border truncate block text-center",
                      getStanceBadge(currentTurn.stance)
                    )}
                  >
                    ● {currentTurn.stance.toUpperCase()}
                  </span>
                ) : (
                  <span className="text-[9px] font-mono text-muted-foreground/60 block text-center">
                    Đang lắng nghe
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
