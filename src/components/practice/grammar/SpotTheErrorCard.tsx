"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  BookOpen,
  Edit3,
  Award,
} from "lucide-react";
import { SpotTheErrorExercise } from "@/data/mockGrammarDrills";
import { db } from "@/lib/db";
import { ErrorItem } from "@/types/database";
import { cn } from "@/lib/utils";

interface SpotTheErrorCardProps {
  exercise: SpotTheErrorExercise;
  onNext: () => void;
  isLast: boolean;
  className?: string;
}

export function SpotTheErrorCard({
  exercise,
  onNext,
  isLast,
  className,
}: SpotTheErrorCardProps) {
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null);
  const [correctionInput, setCorrectionInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isWordSelectionCorrect, setIsWordSelectionCorrect] = useState(false);
  const [isCorrectionExact, setIsCorrectionExact] = useState(false);

  const handleSelectWord = (index: number) => {
    if (isSubmitted) return;
    setSelectedWordIndex(index);
  };

  const handleCheck = async () => {
    if (selectedWordIndex === null) return;

    const isIndexCorrect = selectedWordIndex === exercise.errorWordIndex;
    const cleanInput = correctionInput.trim().toLowerCase();
    const cleanTarget = exercise.correctWord.trim().toLowerCase();

    // If target correction is deletion (empty string), user typing "(bỏ)" or leaving empty is acceptable
    const isFixed =
      cleanTarget === ""
        ? cleanInput === "" || cleanInput.includes("bỏ") || cleanInput.includes("delete")
        : cleanInput === cleanTarget;

    const overallPass = isIndexCorrect && isFixed;

    setIsWordSelectionCorrect(isIndexCorrect);
    setIsCorrectionExact(isFixed);
    setIsSubmitted(true);

    if (!overallPass) {
      try {
        const errorItem: ErrorItem = {
          id: `err_gram_se_${Date.now()}_${exercise.id}`,
          sourceModule: "grammar",
          errorType: "grammar",
          questionContext: `[Spot & Fix Error] ${exercise.title}: "${exercise.fullSentence}"`,
          userWrongAnswer: `Từ chọn sai: "${exercise.words[selectedWordIndex]}" (sửa thành: "${correctionInput}")`,
          correctAnswer: `Từ sai là "${exercise.errorWord}" -> Sửa thành: "${exercise.correctWord || '(Xóa bỏ)'}"`,
          deepExplanation: `${exercise.grammarRule} ${exercise.whyWrongInIelts}`,
          mastered: false,
          retryCount: 0,
          createdAt: new Date().toISOString(),
        };

        await db.error_bank.put(errorItem);
      } catch (e) {
        console.error("Failed to auto-save spot the error mistake:", e);
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
      {/* Header */}
      <div className="space-y-2 border-b border-border/80 pb-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 uppercase tracking-wider">
            Spot & Fix Sentence Error
          </span>
          <span className="text-xs text-muted-foreground font-medium">
            Có 1 lỗi ngữ pháp trong câu
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-foreground">
          {exercise.title}
        </h3>
        <p className="text-xs text-muted-foreground">
          <strong>Hướng dẫn:</strong> Bấm trực tiếp vào từ bị lỗi ngữ pháp trong câu dưới đây, sau đó nhập từ sửa lại cho đúng.
        </p>
      </div>

      {/* Interactive Sentence with Clickable Words */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-muted-foreground block">
          Bước 1: Click chọn từ bị sai:
        </label>

        <div className="p-5 rounded-2xl bg-secondary/30 border border-border/80 flex flex-wrap items-center gap-1.5 leading-loose sm:leading-loose">
          {exercise.words.map((word, idx) => {
            const isSelected = selectedWordIndex === idx;
            const isTargetWord = idx === exercise.errorWordIndex;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectWord(idx)}
                disabled={isSubmitted}
                className={cn(
                  "px-2.5 py-1 rounded-xl text-sm sm:text-base font-semibold transition-all select-none cursor-pointer border",
                  !isSubmitted && isSelected && "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20 scale-105",
                  !isSubmitted && !isSelected && "bg-card border-border/70 text-foreground hover:border-rose-500/50 hover:bg-rose-500/[0.04]",
                  isSubmitted && isTargetWord && "bg-rose-600 text-white border-rose-600 font-bold",
                  isSubmitted && isSelected && !isTargetWord && "bg-amber-500 text-white border-amber-500 line-through",
                  isSubmitted && !isSelected && !isTargetWord && "bg-card border-border/40 text-muted-foreground opacity-70"
                )}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Correction Input Box */}
      {selectedWordIndex !== null && !isSubmitted && (
        <div className="space-y-2 p-4 rounded-2xl bg-secondary/40 border border-border/80 animate-in fade-in duration-150">
          <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Edit3 className="h-3.5 w-3.5 text-indigo-500" />
            Bước 2: Nhập từ hoặc cấu trúc sửa lại cho đúng từ "{exercise.words[selectedWordIndex]}":
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              value={correctionInput}
              onChange={(e) => setCorrectionInput(e.target.value)}
              placeholder="Nhập từ đã sửa (hoặc để trống/gõ 'bỏ' nếu là từ thừa)..."
              className="flex-1 rounded-xl border border-border bg-card px-3.5 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
            />

            <button
              type="button"
              onClick={handleCheck}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              Kiểm tra
            </button>
          </div>
        </div>
      )}

      {/* Feedback Box */}
      {isSubmitted && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {isWordSelectionCorrect && isCorrectionExact ? (
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/[0.05] border border-emerald-500/30 space-y-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  Xuất sắc! Bạn đã phát hiện và sửa chính xác lỗi ngữ pháp.
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Từ sai: <span className="line-through text-rose-500 font-bold">"{exercise.errorWord}"</span> ➔ Sửa đúng: <strong className="text-emerald-500">"{exercise.correctWord || '(Xóa bỏ)'}"</strong>
              </p>
            </div>
          ) : (
            <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/[0.05] border border-rose-500/30 space-y-1.5">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0" />
                <span className="text-sm font-bold text-rose-600 dark:text-rose-400">
                  Phát hiện hoặc phương án sửa chưa chuẩn xác!
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Từ sai đúng là: <span className="line-through text-rose-500 font-bold">"{exercise.errorWord}"</span> ➔ Phương án sửa chuẩn: <strong className="text-emerald-500">"{exercise.correctWord || '(Xóa bỏ)'}"</strong>
              </p>
            </div>
          )}

          {/* Grammar Rule Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-secondary/30 border border-border/80 space-y-2 text-xs">
            <span className="font-bold text-foreground flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-indigo-500" />
              Giải Thích Quy Tắc Ngữ Pháp (Grammar Rule):
            </span>
            <p className="text-muted-foreground leading-relaxed">
              {exercise.grammarRule}
            </p>
          </div>

          {/* IELTS Impact */}
          <div className="p-3.5 rounded-xl bg-purple-500/[0.04] border border-purple-500/20 text-xs text-muted-foreground flex items-center gap-2">
            <Award className="h-4 w-4 text-purple-500 shrink-0" />
            <span>
              <strong>Tác động điểm thi:</strong> {exercise.whyWrongInIelts}
            </span>
          </div>

          {/* Next Button */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onNext}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <span>{isLast ? "Xem tổng kết bài tập" : "Câu tiếp theo"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
