"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Check,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { DetailedGrammarError } from "@/types/database";
import { db } from "@/lib/db";
import { ErrorItem } from "@/types/database";
import { cn } from "@/lib/utils";

interface GrammarErrorListProps {
  errors: DetailedGrammarError[];
  promptTitle: string;
  className?: string;
}

export function GrammarErrorList({
  errors,
  promptTitle,
  className,
}: GrammarErrorListProps) {
  const [savedErrors, setSavedErrors] = useState<Record<number, boolean>>({});
  const [isBulkSaved, setIsBulkSaved] = useState(false);

  const handleSaveError = async (err: DetailedGrammarError, index: number) => {
    try {
      const newErrorItem: ErrorItem = {
        id: `err_writing_${Date.now()}_${index}`,
        sourceModule: "writing",
        errorType: "grammar",
        questionContext: `[Writing AI Grader] - ${promptTitle}`,
        userWrongAnswer: err.original,
        correctAnswer: err.corrected,
        deepExplanation: err.rule,
        mastered: false,
        retryCount: 0,
        createdAt: new Date().toISOString(),
      };

      await db.error_bank.put(newErrorItem);
      setSavedErrors((prev) => ({ ...prev, [index]: true }));
    } catch (e) {
      console.error("Failed to save error into bank:", e);
    }
  };

  const handleSaveAll = async () => {
    for (let i = 0; i < errors.length; i++) {
      if (!savedErrors[i]) {
        await handleSaveError(errors[i], i);
      }
    }
    setIsBulkSaved(true);
  };

  if (!errors || errors.length === 0) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] p-6 text-center space-y-2">
        <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto" />
        <h4 className="text-sm sm:text-base font-bold text-foreground">
          Không phát hiện lỗi ngữ pháp nghiêm trọng!
        </h4>
        <p className="text-xs text-muted-foreground">
          Bài viết đạt độ chính xác ngữ pháp (Grammatical Accuracy) rất cao.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-rose-500" />
            Chi Tiết Lỗi Ngữ Pháp & Diễn Đạt Cần Khắc Phục ({errors.length} lỗi)
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Lưu vào Ngân Hàng Lỗi Sai để làm lại bài tập triệt tiêu lỗi ở Module 5.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveAll}
          disabled={isBulkSaved}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto cursor-pointer",
            isBulkSaved
              ? "bg-emerald-600 text-white"
              : "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20"
          )}
        >
          {isBulkSaved ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Đã lưu tất cả vào Error Bank</span>
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" />
              <span>Lưu tất cả vào Error Bank</span>
            </>
          )}
        </button>
      </div>

      {/* Error Cards */}
      <div className="space-y-3.5">
        {errors.map((err, idx) => {
          const isItemSaved = savedErrors[idx];

          return (
            <div
              key={idx}
              className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 space-y-3 shadow-sm hover:border-border transition-colors"
            >
              {/* Comparison Header */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                {/* Original with error */}
                <div className="p-3.5 rounded-xl border border-rose-500/25 bg-rose-500/[0.04] space-y-1">
                  <span className="text-[10px] font-bold uppercase text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" /> Câu văn của bạn (Chưa chuẩn):
                  </span>
                  <p className="font-medium text-rose-950 dark:text-rose-200 line-through leading-relaxed">
                    "{err.original}"
                  </p>
                </div>

                {/* Corrected version */}
                <div className="p-3.5 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.04] space-y-1">
                  <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Sửa chuẩn Band 7.5+:
                  </span>
                  <p className="font-bold text-emerald-950 dark:text-emerald-200 leading-relaxed">
                    "{err.corrected}"
                  </p>
                </div>
              </div>

              {/* Rule Explanation & Action Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-border/60 text-xs">
                <div className="space-y-0.5 text-muted-foreground leading-relaxed flex-1">
                  <span className="font-bold text-foreground">💡 Quy tắc khảo thí:</span> {err.rule}
                </div>

                <button
                  type="button"
                  onClick={() => handleSaveError(err, idx)}
                  disabled={isItemSaved}
                  className={cn(
                    "px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer",
                    isItemSaved
                      ? "bg-emerald-600 text-white"
                      : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
                  )}
                >
                  {isItemSaved ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>Đã lưu Error Bank</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-3 w-3 text-rose-500" />
                      <span>Lưu vào Error Bank</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
