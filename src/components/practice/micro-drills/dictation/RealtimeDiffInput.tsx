"use client";

import React, { useRef, useEffect } from "react";
import { DictationDrillItem } from "@/data/mockDictationDrillsData";
import { DictationDiffResult } from "@/lib/levenshteinDiffEngine";
import {
  Send,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RealtimeDiffInputProps {
  drill: DictationDrillItem;
  userInput: string;
  onChangeInput: (val: string) => void;
  isSubmitted: boolean;
  diffResult: DictationDiffResult | null;
  onSubmit: () => void;
  onReset: () => void;
  onNext: () => void;
  className?: string;
}

export function RealtimeDiffInput({
  drill,
  userInput,
  onChangeInput,
  isSubmitted,
  diffResult,
  onSubmit,
  onReset,
  onNext,
  className,
}: RealtimeDiffInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!isSubmitted && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [drill.id, isSubmitted]);

  const targetWords = drill.targetSentence.trim().split(/\s+/);
  const isCloze = drill.category === "cloze" && drill.clozeIndices;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isSubmitted && userInput.trim()) {
        onSubmit();
      } else if (isSubmitted) {
        onNext();
      }
    }
  };

  return (
    <div
      className={cn(
        "p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Cloze Mask Hint (Level 1) */}
      {isCloze && !isSubmitted && (
        <div className="space-y-2 p-4 rounded-2xl bg-secondary/40 border border-border/80">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
            KHUNG GỢI Ý CÂU (CLOZE PLACEHOLDERS):
          </span>
          <p className="font-serif text-sm sm:text-base leading-relaxed flex flex-wrap gap-2 items-center">
            {targetWords.map((word, idx) => {
              const isBlank = drill.clozeIndices?.includes(idx);
              if (isBlank) {
                return (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-lg bg-indigo-500/10 border-b-2 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-mono text-xs font-bold"
                  >
                    [_{idx + 1}_]
                  </span>
                );
              }
              return (
                <span key={idx} className="text-foreground/80 font-medium">
                  {word}
                </span>
              );
            })}
          </p>
        </div>
      )}

      {/* Input Area (Pre-submission) */}
      {!isSubmitted ? (
        <div className="space-y-3">
          <label
            htmlFor="dictation-input"
            className="text-xs font-extrabold text-foreground uppercase tracking-wider flex items-center justify-between"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              <span>Gõ Lại Toàn Bộ Câu Bạn Nghe Được:</span>
            </span>
            <span className="text-[10px] font-mono text-muted-foreground font-normal">
              Nhấn Enter để nộp bài
            </span>
          </label>

          <textarea
            id="dictation-input"
            ref={textareaRef}
            value={userInput}
            onChange={(e) => onChangeInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            placeholder={
              isCloze
                ? "Gõ toàn bộ câu hoàn chỉnh (bao gồm các từ trong ô trống)..."
                : "Nghe và gõ lại chính xác từng từ (chú ý đuôi -s/-ed và từ nối)..."
            }
            className="w-full p-4 rounded-2xl border border-border bg-background text-sm sm:text-base font-serif text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all resize-none leading-relaxed"
          />

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-mono text-muted-foreground">
              Số từ đã gõ: {userInput.trim() ? userInput.trim().split(/\s+/).length : 0} / {targetWords.length} từ
            </span>

            <button
              type="button"
              onClick={onSubmit}
              disabled={!userInput.trim()}
              className={cn(
                "px-6 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer",
                userInput.trim()
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              <span>Kiểm Tra Đối Soát</span>
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Post-Submission Diff Viewer */
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header Score & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-2xl font-bold text-white shadow-sm",
                  diffResult?.accuracyPercentage && diffResult.accuracyPercentage >= 85
                    ? "bg-emerald-500 shadow-emerald-500/30"
                    : diffResult?.accuracyPercentage && diffResult.accuracyPercentage >= 60
                    ? "bg-amber-500 shadow-amber-500/30"
                    : "bg-rose-500 shadow-rose-500/30"
                )}
              >
                {diffResult?.isFullyCorrect ? (
                  <CheckCircle2 className="h-6 w-6" />
                ) : (
                  <AlertTriangle className="h-6 w-6" />
                )}
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  KẾT QUẢ ĐỐI SOÁT ÂM HỌC
                </span>
                <h3 className="text-base sm:text-lg font-black text-foreground">
                  Độ Chính Xác: {diffResult?.accuracyPercentage}%
                </h3>
              </div>
            </div>

            {/* Counts Breakdown */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-bold">
                ✓ {diffResult?.correctWordsCount} đúng
              </span>
              {diffResult && diffResult.endingOmissionsCount > 0 && (
                <span className="px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-bold">
                  ⚠️ {diffResult.endingOmissionsCount} rơi đuôi
                </span>
              )}
              {diffResult && diffResult.missingWordsCount > 0 && (
                <span className="px-2.5 py-1 rounded-xl bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20 font-bold">
                  ✕ {diffResult.missingWordsCount} thiếu
                </span>
              )}
            </div>
          </div>

          {/* Diff Tokens View */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
              MỔ XẺ TỪNG TỪ (WORD-LEVEL ACOUSTIC DIFF):
            </span>

            <div className="p-5 rounded-2xl bg-secondary/30 border border-border flex flex-wrap gap-2 text-sm sm:text-base font-serif leading-loose">
              {diffResult?.wordTokens.map((token, tIdx) => {
                if (token.status === "correct") {
                  return (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border border-emerald-500/40 font-bold"
                    >
                      {token.word}
                    </span>
                  );
                }

                if (token.status === "ending_omitted") {
                  return (
                    <span
                      key={tIdx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/15 text-amber-800 dark:text-amber-200 border border-amber-500/40 font-bold"
                      title={`Bạn gõ '${token.userWord}', thiếu đuôi '${token.omittedEnding}'`}
                    >
                      <span>{token.userWord}</span>
                      <span className="px-1 py-0.2 rounded bg-amber-500 text-white font-mono text-[10px]">
                        +{token.omittedEnding}
                      </span>
                    </span>
                  );
                }

                if (token.status === "missing") {
                  return (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-lg bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-dashed border-rose-400 font-bold line-through"
                      title="Từ bị bỏ sót"
                    >
                      {token.word}
                    </span>
                  );
                }

                if (token.status === "extra") {
                  return (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-lg bg-slate-500/15 text-muted-foreground border border-slate-400 text-xs italic"
                      title="Từ thừa do gõ nhầm"
                    >
                      {token.word}
                    </span>
                  );
                }

                // Incorrect word
                return (
                  <span
                    key={tIdx}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-800 dark:text-rose-200 border border-rose-500/40 font-bold"
                  >
                    <span className="line-through">{token.userWord}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xs">
                      ➔ {token.word}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Target Full Transcript Reference */}
          <div className="p-4 rounded-2xl bg-muted/60 border border-border text-xs sm:text-sm space-y-1">
            <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase block">
              Văn Bản Gốc Chuẩn (Full Transcript):
            </span>
            <p className="font-serif font-bold text-foreground leading-relaxed">
              &ldquo;{drill.targetSentence}&rdquo;
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={onReset}
              className="px-4 py-2.5 rounded-xl border border-border text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-secondary flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Gõ Lại Câu Này</span>
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <span>Tiếp Tục Câu Tiếp Theo</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
