"use client";

import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Layers,
  BookOpen,
  Check,
  Award,
} from "lucide-react";
import { SentenceBuilderExercise } from "@/data/mockGrammarDrills";
import { useSentenceBuilder, TokenItem } from "@/hooks/useSentenceBuilder";
import { GrammarStructureBadge } from "@/components/practice/grammar/GrammarStructureBadge";
import { db } from "@/lib/db";
import { ErrorItem } from "@/types/database";
import { cn } from "@/lib/utils";

interface SentenceBuilderCardProps {
  exercise: SentenceBuilderExercise;
  onNext: () => void;
  isLast: boolean;
  className?: string;
}

export function SentenceBuilderCard({
  exercise,
  onNext,
  isLast,
  className,
}: SentenceBuilderCardProps) {
  const {
    availableTokens,
    selectedTokens,
    isSubmitted,
    isCorrect,
    constructedSentence,
    addToken,
    removeToken,
    resetTokens,
    checkAnswer,
  } = useSentenceBuilder(exercise.scrambledTokens, exercise.correctSentence);

  const [hasSavedError, setHasSavedError] = useState(false);

  const handleCheck = async () => {
    const correct = checkAnswer();

    if (!correct && !hasSavedError) {
      try {
        const errorItem: ErrorItem = {
          id: `err_gram_sb_${Date.now()}_${exercise.id}`,
          sourceModule: "grammar",
          errorType: "grammar",
          questionContext: `[Sentence Builder] ${exercise.title}: "${exercise.vietnameseMeaning}"`,
          userWrongAnswer: constructedSentence,
          correctAnswer: exercise.correctSentence,
          deepExplanation: `Cú pháp chuẩn: ${exercise.structureFormula}. ${exercise.syntaxBreakdown.map((s) => `${s.role}: "${s.part}"`).join(". ")}`,
          mastered: false,
          retryCount: 0,
          createdAt: new Date().toISOString(),
        };

        await db.error_bank.put(errorItem);
        setHasSavedError(true);
      } catch (e) {
        console.error("Failed to auto-save sentence builder error:", e);
      }
    }
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm",
        className
      )}
    >
      {/* Header & Prompt */}
      <div className="space-y-2 border-b border-border/80 pb-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            Sentence Builder
          </span>
          <span className="text-xs text-muted-foreground font-medium">
            {selectedTokens.length} / {exercise.scrambledTokens.length} khối từ đã chọn
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-foreground">
          {exercise.title}
        </h3>

        {/* Vietnamese Meaning Prompt */}
        <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border/70 text-xs sm:text-sm text-foreground font-medium leading-relaxed">
          🇻🇳 <strong>Nghĩa tiếng Việt cần diễn đạt:</strong> "{exercise.vietnameseMeaning}"
        </div>
      </div>

      {/* Constructed Sentence Drop Zone */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-muted-foreground flex items-center justify-between">
          <span>Câu tiếng Anh bạn đang ghép (Bấm vào khối từ để xóa):</span>
          {selectedTokens.length > 0 && (
            <button
              type="button"
              onClick={resetTokens}
              className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" /> Đặt lại từ đầu
            </button>
          )}
        </label>

        <div className="min-h-[90px] p-4 rounded-2xl border-2 border-dashed border-border bg-secondary/15 flex flex-wrap items-center gap-2 transition-all">
          {selectedTokens.length === 0 ? (
            <span className="text-xs text-muted-foreground/60 italic select-none">
              Bấm chọn các khối từ bên dưới theo đúng trật tự ngữ pháp để dựng câu...
            </span>
          ) : (
            selectedTokens.map((token) => (
              <button
                key={token.id}
                type="button"
                onClick={() => removeToken(token)}
                disabled={isSubmitted && isCorrect === true}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/20 hover:bg-rose-600 hover:scale-95 transition-all cursor-pointer select-none"
                title="Bấm để đưa từ này về lại ngân hàng"
              >
                {token.text}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Available Tokens Bank */}
      {availableTokens.length > 0 && (
        <div className="space-y-2 pt-1">
          <span className="text-xs font-bold text-muted-foreground block">
            Ngân hàng khối từ có sẵn (Bấm để chọn):
          </span>
          <div className="flex flex-wrap gap-2">
            {availableTokens.map((token) => (
              <button
                key={token.id}
                type="button"
                onClick={() => addToken(token)}
                className="px-3.5 py-1.5 rounded-xl border border-border/80 bg-secondary hover:bg-indigo-500/10 hover:border-indigo-500/40 text-foreground text-xs sm:text-sm font-semibold shadow-sm transition-all hover:scale-105 cursor-pointer select-none"
              >
                {token.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Check Button */}
      {!isSubmitted && (
        <div className="flex justify-end pt-2">
          <button
            type="button"
            disabled={selectedTokens.length === 0}
            onClick={handleCheck}
            className={cn(
              "px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer",
              selectedTokens.length > 0
                ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:scale-105"
                : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
            )}
          >
            <Sparkles className="h-4 w-4" />
            <span>Kiểm tra cú pháp</span>
          </button>
        </div>
      )}

      {/* Feedback Box & Syntax Structure Breakdown */}
      {isSubmitted && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {isCorrect ? (
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/[0.05] border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  Hoàn hảo! Bạn đã sắp xếp chuẩn xác 100% cú pháp học thuật.
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                "{exercise.correctSentence}"
              </p>
            </div>
          ) : (
            <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/[0.05] border border-rose-500/30 space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0" />
                <span className="text-sm font-bold text-rose-600 dark:text-rose-400">
                  Trật tự cú pháp chưa chuẩn xác!
                </span>
              </div>
              <div className="text-xs space-y-1">
                <p className="text-muted-foreground">
                  <strong>Đáp án chuẩn:</strong> "{exercise.correctSentence}"
                </p>
                <p className="text-[11px] text-rose-600 dark:text-rose-400">
                  (Đã tự động lưu câu này vào Ngân Hàng Lỗi Sai để bạn luyện lại)
                </p>
              </div>
            </div>
          )}

          {/* Grammar Structure Formula & Breakdown */}
          <GrammarStructureBadge
            formula={exercise.structureFormula}
            syntaxBreakdown={exercise.syntaxBreakdown}
          />

          {/* IELTS Application Tip */}
          <div className="p-3.5 rounded-xl bg-purple-500/[0.04] border border-purple-500/20 text-xs text-muted-foreground flex items-center gap-2">
            <Award className="h-4 w-4 text-purple-500 shrink-0" />
            <span>
              <strong>Ứng dụng IELTS:</strong> {exercise.ieltsApplication}
            </span>
          </div>

          {/* Next Button */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onNext}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <span>{isLast ? "Xem tổng kết bài tập" : "Bài tiếp theo"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
