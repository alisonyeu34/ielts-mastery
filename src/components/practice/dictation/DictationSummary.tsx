"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ArrowRight,
  RotateCcw,
  Sparkles,
  BookOpen,
  Plus,
  Check,
} from "lucide-react";
import { DiffResult, cleanWord } from "@/lib/diffEngine";
import { db } from "@/lib/db";
import { VocabCard } from "@/types/database";
import { cn } from "@/lib/utils";

interface DictationSummaryProps {
  diffResult: DiffResult;
  timeSpentSeconds: number;
  onNextSentence: () => void;
  onRetrySentence: () => void;
  hasNextSentence: boolean;
  isLastSentence?: boolean;
  className?: string;
}

export function DictationSummary({
  diffResult,
  timeSpentSeconds,
  onNextSentence,
  onRetrySentence,
  hasNextSentence,
  isLastSentence = false,
  className,
}: DictationSummaryProps) {
  const [savedVocabs, setSavedVocabs] = useState<Record<string, boolean>>({});

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins > 0 ? `${mins}m ` : ""}${secs}s`;
  };

  const handleSaveAllErrorsToVocab = async () => {
    const today = new Date().toISOString().split("T")[0];
    for (const err of diffResult.identifiedErrors) {
      const w = cleanWord(err.targetWord);
      if (w && !savedVocabs[w]) {
        const newCard: VocabCard = {
          id: `vocab_${w}_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
          word: w.charAt(0).toUpperCase() + w.slice(1),
          ipa: "",
          meaning: `Lỗi sai chính tả từ bài Dictation (Đã gõ '${err.userWord}')`,
          collocations: [],
          originalContext: err.reason,
          category: "custom",
          status: "new",
          stepInterval: 1,
          nextReviewDate: today,
          repetitionCount: 0,
          lapsesCount: 0,
          stability: 1.0,
          difficulty: 4.5,
          createdAt: new Date().toISOString(),
        };
        await db.vocab_matrix.put(newCard);
      }
    }
    const updated: Record<string, boolean> = {};
    diffResult.identifiedErrors.forEach((e) => {
      updated[cleanWord(e.targetWord)] = true;
    });
    setSavedVocabs(updated);
  };

  const isHighAccuracy = diffResult.accuracyPercentage >= 80;

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 sm:p-6 space-y-6 shadow-sm",
        isHighAccuracy
          ? "border-emerald-500/30 bg-gradient-to-b from-card to-emerald-500/[0.02]"
          : "border-border bg-card",
        className
      )}
    >
      {/* Top Banner & Accuracy Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm text-white shrink-0",
              isHighAccuracy ? "bg-emerald-600 shadow-emerald-600/30" : "bg-amber-600 shadow-amber-600/30"
            )}
          >
            <Award className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              {isHighAccuracy
                ? "Xuất Sắc! Bạn Đã Nghe & Chép Chính Xác Cao"
                : "Hoàn Thành Câu Luyện Nghe"}
            </h3>
            <p className="text-xs text-muted-foreground">
              Độ chính xác: <strong className={isHighAccuracy ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-amber-600 dark:text-amber-400 font-bold"}>{diffResult.accuracyPercentage}%</strong> • Thời gian: <strong>{formatTime(timeSpentSeconds)}</strong>
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRetrySentence}
            className="px-3.5 py-2 rounded-xl border border-border bg-secondary/50 hover:bg-secondary text-xs font-bold text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Luyện lại</span>
          </button>

          {hasNextSentence ? (
            <button
              type="button"
              onClick={onNextSentence}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Câu tiếp theo</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <Link
              href="/practice"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/30 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Hoàn thành bài tập</span>
              <CheckCircle2 className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-secondary/40 border border-border text-center space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-muted-foreground">Từ Đúng</span>
          <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {diffResult.correctWordsCount} / {diffResult.totalTargetWords}
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-secondary/40 border border-border text-center space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-muted-foreground">Từ Sai</span>
          <div className="text-xl font-extrabold text-rose-600 dark:text-rose-400">
            {diffResult.wrongWordsCount}
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-secondary/40 border border-border text-center space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-muted-foreground">Từ Bỏ Sót</span>
          <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400">
            {diffResult.missingWordsCount}
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-secondary/40 border border-border text-center space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-muted-foreground">Thời Gian</span>
          <div className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {formatTime(timeSpentSeconds)}
          </div>
        </div>
      </div>

      {/* Identified Errors Breakdown */}
      {diffResult.identifiedErrors.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-rose-500" />
              Các Lỗi Sai Đã Được Tự Động Phân Loại & Lưu Vào Error Bank ({diffResult.identifiedErrors.length}):
            </h4>

            <button
              type="button"
              onClick={handleSaveAllErrorsToVocab}
              className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> Thêm tất cả vào Sổ FSRS
            </button>
          </div>

          <div className="space-y-2">
            {diffResult.identifiedErrors.map((err, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-border/80 bg-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase",
                        err.classification === "singular_plural"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                          : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                      )}
                    >
                      {err.classification === "singular_plural"
                        ? "Lỗi Số Ít / Số Nhiều (-s/es)"
                        : "Lỗi Bắt Âm / Từ Vựng"}
                    </span>
                    <span className="text-muted-foreground">
                      Bạn gõ: <strong className="text-rose-600 dark:text-rose-400 line-through">'{err.userWord}'</strong> ➔ Chuẩn: <strong className="text-emerald-600 dark:text-emerald-400">'{err.targetWord}'</strong>
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {err.reason}
                  </p>
                </div>

                <div className="shrink-0">
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    ✓ Đã ghi Error Bank
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
