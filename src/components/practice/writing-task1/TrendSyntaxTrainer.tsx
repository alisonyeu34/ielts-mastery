"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Repeat,
} from "lucide-react";
import {
  TrendExercise,
  PrepositionExercise,
} from "@/data/mockTask1Data";
import {
  validateTrendTransformation,
  verifyPrepositionUsage,
} from "@/lib/task1SyntaxValidator";
import { cn } from "@/lib/utils";

interface TrendSyntaxTrainerProps {
  trendExercises: TrendExercise[];
  prepositionExercises: PrepositionExercise[];
  trendAnswers: Record<string, string>;
  prepAnswers: Record<string, string>;
  onSetTrendAnswer: (id: string, val: string) => void;
  onSetPrepAnswer: (id: string, val: string) => void;
  className?: string;
}

export function TrendSyntaxTrainer({
  trendExercises,
  prepositionExercises,
  trendAnswers,
  prepAnswers,
  onSetTrendAnswer,
  onSetPrepAnswer,
  className,
}: TrendSyntaxTrainerProps) {
  const [activeDrillTab, setActiveDrillTab] = useState<"noun_phrase" | "prepositions">("noun_phrase");

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase">
              Bước 3 • Luyện Cú Pháp & Giới Từ
            </span>
          </div>
          <h4 className="font-bold text-xs sm:text-sm text-foreground">
            Bộ Chuyển Đổi Cú Pháp Xu Hướng & Giới Từ Số Liệu
          </h4>
        </div>
      </div>

      {/* Sub-tab Switcher */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-secondary/40 border border-border">
        <button
          type="button"
          onClick={() => setActiveDrillTab("noun_phrase")}
          className={cn(
            "w-1/2 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
            activeDrillTab === "noun_phrase"
              ? "bg-card text-foreground shadow-2xs border border-border"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          1. Đổi Verb sang Noun Phrase
        </button>

        <button
          type="button"
          onClick={() => setActiveDrillTab("prepositions")}
          className={cn(
            "w-1/2 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
            activeDrillTab === "prepositions"
              ? "bg-card text-foreground shadow-2xs border border-border"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          2. Giới Từ Số Liệu (At / By / To / Of)
        </button>
      </div>

      {/* 1. Noun Phrase Transformation Drills */}
      {activeDrillTab === "noun_phrase" && (
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Chuyển đổi câu gốc (Dùng Động từ + Trạng từ) sang cụm danh từ tương ứng (Ví dụ: <em>increased significantly $\rightarrow$ witnessed a significant increase</em>):
          </p>

          <div className="space-y-3">
            {trendExercises.map((ex) => {
              const userVal = trendAnswers[ex.id] || "";
              const validation = userVal
                ? validateTrendTransformation(userVal, ex.expectedNounPhrase)
                : null;

              return (
                <div
                  key={ex.id}
                  className="p-4 rounded-2xl bg-secondary/20 border border-border/80 space-y-3 text-xs"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold">
                      Câu gốc:
                    </span>
                    <p className="font-serif italic text-foreground text-xs">
                      "{ex.verbSentence}"
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-bold text-foreground text-[11px] block">
                      {ex.targetSubject}
                    </span>
                    <input
                      type="text"
                      value={userVal}
                      onChange={(e) => onSetTrendAnswer(ex.id, e.target.value)}
                      placeholder="Gõ cụm danh từ vào đây (ví dụ: a significant increase)..."
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-card text-xs text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Feedback */}
                  {validation && (
                    <div className="flex items-start gap-1.5 text-[11px] pt-1">
                      {validation.isCorrect ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <p
                        className={cn(
                          "leading-tight font-sans",
                          validation.isCorrect ? "text-emerald-700 dark:text-emerald-400 font-semibold" : "text-rose-700 dark:text-rose-400"
                        )}
                      >
                        {validation.feedback}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Preposition Gap-fill Drills */}
      {activeDrillTab === "prepositions" && (
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Chọn giới từ chính xác cho từng ngữ cảnh (<strong>At</strong>: Mốc bắt đầu/cố định, <strong>By</strong>: Lượng tăng thêm, <strong>To</strong>: Điểm đích, <strong>Of</strong>: Sau danh từ):
          </p>

          <div className="space-y-3">
            {prepositionExercises.map((prep) => {
              const selectedPrep = prepAnswers[prep.id] || "";
              const isSubmitted = selectedPrep !== "";
              const isCorrect = selectedPrep === prep.targetPrep;

              return (
                <div
                  key={prep.id}
                  className="p-4 rounded-2xl bg-secondary/20 border border-border/80 space-y-3 text-xs"
                >
                  <div className="flex items-center flex-wrap gap-1 text-xs font-medium text-foreground">
                    <span>{prep.sentencePrefix}</span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-primary/10 text-primary font-mono font-bold">
                      {selectedPrep || "[ _____ ]"}
                    </span>
                    <span>{prep.sentenceSuffix}</span>
                  </div>

                  {/* Options */}
                  <div className="flex items-center gap-2 pt-1">
                    {prep.options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => onSetPrepAnswer(prep.id, opt)}
                        className={cn(
                          "px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer",
                          selectedPrep === opt
                            ? "bg-primary text-primary-foreground border-primary shadow-xs"
                            : "bg-card border-border hover:bg-secondary text-foreground"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {/* Feedback */}
                  {isSubmitted && (
                    <div className="pt-2 border-t border-border/60 text-[11px] flex items-start gap-1.5">
                      {isCorrect ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <p
                        className={cn(
                          "leading-tight font-sans",
                          isCorrect ? "text-emerald-700 dark:text-emerald-400 font-semibold" : "text-rose-700 dark:text-rose-400"
                        )}
                      >
                        {prep.explanationVi}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
