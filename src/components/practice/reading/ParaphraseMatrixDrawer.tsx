"use client";

import React, { useState } from "react";
import {
  TableProperties,
  X,
  Sparkles,
  BookmarkPlus,
  CheckCircle2,
  GitFork,
  BookOpen,
} from "lucide-react";
import { ReadingQuestion } from "@/data/mockReadingPassageData";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";

interface ParaphraseMatrixDrawerProps {
  isOpen: boolean;
  questions: ReadingQuestion[];
  onClose: () => void;
  className?: string;
}

export function ParaphraseMatrixDrawer({
  isOpen,
  questions,
  onClose,
  className,
}: ParaphraseMatrixDrawerProps) {
  const [savedKeys, setSavedKeys] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleSavePairToVocab = async (
    qNum: number,
    questionPhrase: string,
    passagePhrase: string,
    strategy: string
  ) => {
    const pairKey = `${qNum}_${questionPhrase}`;
    try {
      await db.vocab_matrix.put({
        id: `vocab_para_${Date.now()}_${qNum}`,
        word: passagePhrase,
        ipa: `/${passagePhrase}/`,
        meaning: `Từ đồng nghĩa bài đọc tương ứng với "${questionPhrase}" (Kỹ thuật: ${strategy})`,
        collocations: [passagePhrase, questionPhrase],
        originalContext: `Paraphrase trong bài Reading: "${questionPhrase}" <=> "${passagePhrase}"`,
        category: "c1_academic",
        status: "new",
        stepInterval: 1,
        repetitionCount: 0,
        lapsesCount: 0,
        stability: 1.0,
        difficulty: 5.0,
        nextReviewDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });
      setSavedKeys((prev) => [...prev, pairKey]);
    } catch (e) {
      console.error("Save paraphrase pair error:", e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-background/60 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl bg-card border-l border-border h-full shadow-2xl overflow-y-auto p-6 space-y-6 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/80 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <TableProperties className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-foreground">
                  Ma Trận Bóc Tách Paraphrase 1-1
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Đối chiếu Từ khóa trong câu hỏi vs Cách diễn đạt tương đương trong bài đọc
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Paraphrase Table Grid */}
          <div className="space-y-4 text-xs">
            {questions.map((q) => (
              <div
                key={q.id}
                className="p-4 sm:p-5 rounded-2xl bg-secondary/30 border border-border/80 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-primary px-2.5 py-0.5 rounded-lg bg-primary/10 border border-primary/20">
                    Câu {q.number} • Đoạn {q.evidenceParagraphId}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    Đáp án: <strong className="text-foreground">{q.correctAnswer}</strong>
                  </span>
                </div>

                {/* Paraphrase Pairs */}
                <div className="space-y-2 pt-1">
                  {q.paraphrasePairs.map((pair, idx) => {
                    const isSaved = savedKeys.includes(`${q.number}_${pair.questionPhrase}`);

                    return (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-card border border-border/70 space-y-2"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {/* Question Keyword */}
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-mono text-muted-foreground block uppercase font-bold">
                              1. Từ khóa câu hỏi:
                            </span>
                            <span className="font-serif font-bold text-rose-600 dark:text-rose-400">
                              "{pair.questionPhrase}"
                            </span>
                          </div>

                          {/* Passage Clue */}
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-mono text-muted-foreground block uppercase font-bold">
                              2. Từ tương đương trong bài:
                            </span>
                            <span className="font-serif font-black text-emerald-600 dark:text-emerald-400">
                              "{pair.passagePhrase}"
                            </span>
                          </div>
                        </div>

                        {/* Strategy & Save to FSRS Button */}
                        <div className="flex items-center justify-between pt-1 border-t border-border/50 text-[11px]">
                          <span className="text-[10px] font-mono text-muted-foreground italic">
                            Kỹ thuật: <strong>{pair.strategy}</strong>
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              handleSavePairToVocab(
                                q.number,
                                pair.questionPhrase,
                                pair.passagePhrase,
                                pair.strategy
                              )
                            }
                            disabled={isSaved}
                            className={cn(
                              "px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer",
                              isSaved
                                ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                                : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
                            )}
                          >
                            {isSaved ? (
                              <>
                                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                                <span>Đã Lưu FSRS</span>
                              </>
                            ) : (
                              <>
                                <BookmarkPlus className="h-3 w-3 text-primary" />
                                <span>Lưu Cặp Từ FSRS</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs transition-all hover:scale-105 cursor-pointer"
          >
            Đóng Ma Trận Paraphrase
          </button>
        </div>
      </div>
    </div>
  );
}
