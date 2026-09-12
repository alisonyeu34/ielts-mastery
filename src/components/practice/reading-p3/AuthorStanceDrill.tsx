"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  UserCheck,
  Building,
  ShieldAlert,
} from "lucide-react";
import { AuthorStanceDrillItem } from "@/data/mockPassage3Data";
import { cn } from "@/lib/utils";

interface AuthorStanceDrillProps {
  drillItems: AuthorStanceDrillItem[];
  drillAnswers: Record<string, "cited_researcher" | "author_stance" | "debunked_myth">;
  onSelectAnswer: (
    drillId: string,
    answer: "cited_researcher" | "author_stance" | "debunked_myth"
  ) => void;
  className?: string;
}

const SPEAKER_OPTIONS: Array<{
  id: "cited_researcher" | "author_stance" | "debunked_myth";
  labelVi: string;
  icon: typeof UserCheck;
  color: string;
}> = [
  {
    id: "cited_researcher",
    labelVi: "A. Ý kiến Nhà nghiên cứu được trích dẫn (Cited View)",
    icon: Building,
    color: "border-blue-500/40 hover:border-blue-500 bg-blue-500/5",
  },
  {
    id: "author_stance",
    labelVi: "B. Ý kiến / Kết luận của Tác giả bài viết (Author's Stance)",
    icon: UserCheck,
    color: "border-emerald-500/40 hover:border-emerald-500 bg-emerald-500/5",
  },
  {
    id: "debunked_myth",
    labelVi: "C. Quan niệm cũ bị bác bỏ (Debunked Myth)",
    icon: ShieldAlert,
    color: "border-rose-500/40 hover:border-rose-500 bg-rose-500/5",
  },
];

export function AuthorStanceDrill({
  drillItems,
  drillAnswers,
  onSelectAnswer,
  className,
}: AuthorStanceDrillProps) {
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  const toggleExplanation = (id: string) => {
    setShowExplanations((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5 select-none",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-3">
        <div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            Attribution vs Author Stance Drill
          </span>
          <h3 className="text-sm sm:text-base font-extrabold text-foreground mt-1">
            Bóc Tách: Ai Thực Sự Là Người Phát Ngôn?
          </h3>
        </div>
        <span className="text-xs text-muted-foreground">
          Bẫy khảo thí kinh điển Passage 3
        </span>
      </div>

      <div className="space-y-4">
        {drillItems.map((item, idx) => {
          const selected = drillAnswers[item.id];
          const isAnswered = !!selected;
          const isCorrect = selected === item.speakerIdentity;
          const isExplOpen = showExplanations[item.id] || isAnswered;

          return (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-3 text-xs"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">
                  Trích đoạn {idx + 1}:
                </span>
                <p className="font-serif italic text-foreground font-semibold text-xs sm:text-sm leading-relaxed">
                  "{item.quoteText}"
                </p>
              </div>

              {/* 3 Options */}
              <div className="space-y-1.5 pt-1">
                {SPEAKER_OPTIONS.map((opt) => {
                  const isOptSelected = selected === opt.id;
                  const isActualCorrect = item.speakerIdentity === opt.id;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => onSelectAnswer(item.id, opt.id)}
                      className={cn(
                        "w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer",
                        isOptSelected
                          ? isCorrect
                            ? "bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold ring-2 ring-emerald-500/20"
                            : "bg-rose-500/15 border-rose-500 text-rose-800 dark:text-rose-300 font-bold"
                          : isAnswered && isActualCorrect
                          ? "border-emerald-500/60 bg-emerald-500/10 font-bold text-foreground"
                          : "bg-card border-border/80 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <span className="truncate">{opt.labelVi}</span>
                      {isOptSelected && (
                        <span>{isCorrect ? "✓ Chính xác" : "✗ Nhầm lẫn"}</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Pedagogical Explanation */}
              {isExplOpen && (
                <div className="p-3 rounded-xl bg-card border border-border/70 text-[11px] leading-relaxed text-muted-foreground animate-in fade-in duration-150">
                  💡 <strong>Giải thích bẫy:</strong> {item.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
