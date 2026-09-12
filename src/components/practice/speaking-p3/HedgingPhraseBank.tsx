"use client";

import React, { useState } from "react";
import {
  Shield,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import { HedgingDrillItem } from "@/data/mockSpeakingP3Data";
import { cn } from "@/lib/utils";

interface HedgingPhraseBankProps {
  drill: HedgingDrillItem;
  className?: string;
}

const HEDGING_LEVELS = [
  {
    level: "Cấp độ 1: Động từ khuyết thiếu & Tần suất",
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    phrases: ["may potentially", "could possibly", "tend to", "typically manifest as", "is prone to"],
  },
  {
    level: "Cấp độ 2: Mệnh đề chứng cứ & Khả năng",
    badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    phrases: ["Evidence suggests that", "It is widely believed that", "It is plausible that", "There is a likelihood that"],
  },
  {
    level: "Cấp độ 3: Mệnh đề giới hạn phạm vi",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    phrases: ["In certain socioeconomic contexts", "Under specific conditions", "To a significant extent", "Not necessarily indicative of"],
  },
];

export function HedgingPhraseBank({ drill, className }: HedgingPhraseBankProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDrillAnswer, setShowDrillAnswer] = useState(false);
  const [userHedgingInput, setUserHedgingInput] = useState("");

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card overflow-hidden shadow-sm transition-all select-none",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-secondary/30 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <Shield className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-2">
              <span>Kỹ Thuật Rào Đón Học Thuật (Academic Hedging Toolkit)</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                Band 7.5+ Stance
              </span>
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Tránh phát ngôn quy chụp 100%, nâng tầm câu nói bằng các cấu trúc xác suất và điều kiện
            </p>
          </div>
        </div>

        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 sm:p-6 pt-1 space-y-5 border-t border-border/70 text-xs animate-in fade-in duration-150">
          {/* 3 Hedging Levels Table */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {HEDGING_LEVELS.map((hl, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-secondary/30 border border-border/70 space-y-2"
              >
                <span
                  className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full border block w-fit truncate",
                    hl.badge
                  )}
                >
                  {hl.level}
                </span>

                <div className="flex flex-wrap gap-1">
                  {hl.phrases.map((p, pIdx) => (
                    <code
                      key={pIdx}
                      className="text-[10px] bg-card px-1.5 py-0.5 rounded border border-border/80 text-foreground"
                    >
                      {p}
                    </code>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Reformulation Drill */}
          <div className="p-4 rounded-2xl bg-indigo-500/[0.03] border border-indigo-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Thử Thách Chuyển Đổi Câu Quy Chụp Sang Câu Học Thuật (Hedging Drill)</span>
              </span>

              <button
                type="button"
                onClick={() => setShowDrillAnswer(!showDrillAnswer)}
                className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 cursor-pointer"
              >
                {showDrillAnswer ? "Ẩn đáp án C1" : "Xem đáp án C1 mẫu"}
              </button>
            </div>

            {/* Crude Statement */}
            <div className="p-3 rounded-xl bg-rose-500/[0.05] border border-rose-500/20 space-y-1">
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">
                🔴 Câu Quy Chụp Thô Cứng (Band 5.0):
              </span>
              <p className="text-xs font-serif italic text-foreground/90">
                "{drill.crudeStatement}"
              </p>
            </div>

            {/* Practice Input */}
            <div className="space-y-1">
              <textarea
                rows={2}
                value={userHedgingInput}
                onChange={(e) => setUserHedgingInput(e.target.value)}
                placeholder="Thử viết lại câu trên bằng cách chèn từ rào đón (ví dụ: While X is true, it is plausible that Y could...)"
                className="w-full rounded-xl border border-border bg-card p-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-serif leading-relaxed"
              />
            </div>

            {/* Model Hedged Answer */}
            {showDrillAnswer && (
              <div className="p-3.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/30 space-y-1.5 animate-in fade-in duration-150">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
                  🟢 Câu Rào Đón Chuẩn Học Thuật (Band 8.0+):
                </span>
                <p className="text-xs font-serif text-foreground/95 italic">
                  "{drill.hedgedSample}"
                </p>
                <p className="text-[11px] text-muted-foreground pt-1 border-t border-border/40">
                  💡 {drill.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
