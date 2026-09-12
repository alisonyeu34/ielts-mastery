"use client";

import React, { useRef, useEffect } from "react";
import {
  DialogueTurn,
  S3Speaker,
} from "@/data/mockSection3ConsensusData";
import {
  User,
  GraduationCap,
  Sparkles,
  EyeOff,
  Volume2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DynamicDialoguePaneProps {
  dialogueTurns: DialogueTurn[];
  speakers: S3Speaker[];
  currentTime: number;
  currentTurn: DialogueTurn | null;
  isBlindMode: boolean;
  isForensicActive: boolean;
  onSeekToTurn: (turnId: number) => void;
  className?: string;
}

export function DynamicDialoguePane({
  dialogueTurns,
  speakers,
  currentTime,
  currentTurn,
  isBlindMode,
  isForensicActive,
  onSeekToTurn,
  className,
}: DynamicDialoguePaneProps) {
  const activeTurnRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to active turn when playing
  useEffect(() => {
    if (activeTurnRef.current && !isBlindMode) {
      activeTurnRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentTurn?.turnId, isBlindMode]);

  const getSpeaker = (speakerId: string) => {
    return speakers.find((s) => s.id === speakerId) || speakers[0];
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = Math.floor(secs % 60);
    return `0${mins}:${rem < 10 ? `0${rem}` : rem}`;
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 shadow-sm space-y-4 select-none relative overflow-hidden flex flex-col",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
            Hội Thoại Học Thuật Đồng Bộ
          </span>
          <span className="text-xs font-bold text-foreground">
            Academic Dialogue Transcript
          </span>
        </div>

        <span className="text-[10px] font-mono text-muted-foreground">
          Click câu thoại để nghe lại
        </span>
      </div>

      {/* Blind Mode Curtain Overlay */}
      {isBlindMode && (
        <div className="p-8 rounded-2xl bg-secondary/30 border border-border text-center space-y-3 my-auto">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
              <EyeOff className="h-6 w-6" />
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-foreground">
              Chế Độ Thực Chiến (Blind Mode) Đang Bật
            </h4>
            <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
              Transcript đang được ẩn để rèn luyện thính giác và bắt từ nối chuyển hướng giống kỳ thi thật. Bạn có thể bật hiển thị ở thanh điều khiển phía trên.
            </p>
          </div>
        </div>
      )}

      {/* Synchronized Dialogue List */}
      {!isBlindMode && (
        <div className="space-y-3 overflow-y-auto max-h-[500px] pr-1.5">
          {dialogueTurns.map((turn) => {
            const speaker = getSpeaker(turn.speakerId);
            const isActive = currentTurn?.turnId === turn.turnId;
            const isSupervisor = turn.speakerId === "prof_davies";

            return (
              <div
                key={turn.turnId}
                ref={isActive ? activeTurnRef : null}
                onClick={() => onSeekToTurn(turn.turnId)}
                className={cn(
                  "p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer space-y-2",
                  isActive
                    ? speaker.borderActive
                    : "border-border/60 bg-secondary/15 hover:bg-secondary/30",
                  turn.isConsensusClimax && isForensicActive && "ring-2 ring-emerald-500/40 bg-emerald-500/[0.03]"
                )}
              >
                {/* Speaker Info Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-bold text-[10px] border shadow-2xs",
                        speaker.avatarBg
                      )}
                    >
                      {isSupervisor ? (
                        <GraduationCap className="h-3.5 w-3.5" />
                      ) : (
                        <User className="h-3.5 w-3.5" />
                      )}
                    </div>

                    <span className={cn("font-black text-xs", speaker.textColor)}>
                      {speaker.name}
                    </span>

                    <span className="text-[10px] font-mono text-muted-foreground">
                      ({formatTime(turn.startTime)} - {formatTime(turn.endTime)})
                    </span>
                  </div>

                  {/* Stance Tag */}
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md bg-secondary text-foreground border border-border">
                    {turn.stanceLabelVi}
                  </span>
                </div>

                {/* Dialogue Text Content */}
                <p className="text-xs sm:text-[13px] leading-relaxed text-foreground/90 font-serif">
                  {turn.text}
                </p>

                {/* Forensic Highlight Cue Breakdown */}
                {isForensicActive && turn.highlightCue && (
                  <div className="pt-2 border-t border-border/60 text-[11px] space-y-1 animate-in fade-in">
                    <div className="flex items-center gap-1.5 font-bold font-mono text-primary">
                      <Sparkles className="h-3 w-3" />
                      <span>Tín hiệu đàm phán: "{turn.highlightCue.phrase}"</span>
                    </div>
                    <p className="text-muted-foreground italic">
                      {turn.highlightCue.explanationVi}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
