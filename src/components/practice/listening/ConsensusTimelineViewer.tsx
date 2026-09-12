"use client";

import React from "react";
import {
  CheckCircle2,
  XCircle,
  Users,
  ArrowDown,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { S3Question, S3Option } from "@/data/mockListeningS3S4Data";
import { cn } from "@/lib/utils";

interface ConsensusTimelineViewerProps {
  question: S3Question;
  userSelectedOptionId: string;
  className?: string;
}

export function ConsensusTimelineViewer({
  question,
  userSelectedOptionId,
  className,
}: ConsensusTimelineViewerProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/80 bg-secondary/20 p-4 sm:p-5 space-y-4 text-xs",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
        <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
          <Users className="h-3.5 w-3.5" />
          Dòng Thời Gian Diễn Biến Sự Đồng Thuận Nhóm (Consensus Flow)
        </span>
        <span className="text-[10px] font-mono text-muted-foreground">
          Chốt lúc ~{question.consensusTimestamp}
        </span>
      </div>

      <div className="space-y-3 relative pl-4 sm:pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
        {question.options.map((opt, idx) => {
          const isUserChoice = userSelectedOptionId === opt.id;
          const isConsensus = opt.status === "consensus";

          return (
            <div
              key={opt.id}
              className={cn(
                "relative p-3 rounded-xl border transition-all text-xs space-y-1.5",
                isConsensus
                  ? "bg-emerald-500/[0.06] border-emerald-500/40 text-foreground"
                  : "bg-card border-border/70 text-muted-foreground",
                isUserChoice && !isConsensus && "ring-2 ring-rose-500/40 border-rose-500/40"
              )}
            >
              {/* Dot marker on timeline */}
              <div
                className={cn(
                  "absolute -left-6 sm:-left-8 top-3.5 h-4 w-4 rounded-full border-2 flex items-center justify-center bg-card",
                  isConsensus
                    ? "border-emerald-500 text-emerald-500"
                    : "border-muted-foreground/60 text-muted-foreground"
                )}
              >
                {isConsensus ? (
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                ) : (
                  <XCircle className="h-3 w-3 text-muted-foreground" />
                )}
              </div>

              {/* Status Header */}
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <span className="font-bold text-foreground">
                  Phương án ({opt.letter}): {opt.text}
                </span>

                <span
                  className={cn(
                    "text-[10px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider",
                    isConsensus
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                      : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                  )}
                >
                  {isConsensus ? "✓ Thống Nhất Chung (Consensus)" : "✗ Đã Bác Bỏ (Rejected)"}
                </span>
              </div>

              {/* Rejection / Consensus details */}
              {!isConsensus && opt.rejectionReason && (
                <p className="text-[11px] text-rose-600/90 dark:text-rose-400/90 font-medium">
                  ⚠️ Lý do bị loại: {opt.rejectionReason}
                </p>
              )}

              {/* Dialogue snippet */}
              <div className="p-2 rounded-lg bg-secondary/50 font-serif text-[11px] text-foreground/80 italic">
                "{opt.dialogueQuote}"
              </div>

              {isUserChoice && !isConsensus && (
                <div className="p-1.5 rounded-md bg-rose-500/15 text-[10px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 shrink-0" />
                  <span>
                    Bạn đã chọn phương án này vì nó xuất hiện sớm trong audio, nhưng người nói khác đã phản đối sau đó!
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
