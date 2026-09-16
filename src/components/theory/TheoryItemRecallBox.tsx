"use client";

import React, { useState, useEffect, useId } from "react";
import {
  Brain,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  PenLine,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Eye,
  EyeOff,
  Check,
  Send,
  Loader2,
} from "lucide-react";
import {
  evaluateTheoryItemRecall,
  RecallEvaluationResult,
} from "@/lib/theoryRecallEvaluator";
import { setRecallItemMasked } from "@/lib/theoryRecallMaskStore";
import { TheoryMaskableContent } from "./TheoryMaskableContent";
import { cn } from "@/lib/utils";

export interface TheoryItemRecallBoxProps {
  itemId: string;
  itemTitle?: string;
  targetText: string;
  lessonTitle?: string;
  defaultOpen?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function TheoryItemRecallBox({
  itemId,
  itemTitle = "Phần Lý Thuyết Này",
  targetText,
  lessonTitle,
  defaultOpen = false,
  className,
  children,
}: TheoryItemRecallBoxProps) {
  const storageKey = `theory_item_recall_${itemId}`;
  const resultKey = `theory_item_recall_res_${itemId}`;

  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const [userText, setUserText] = useState<string>("");
  const [result, setResult] = useState<RecallEvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [showOriginal, setShowOriginal] = useState<boolean>(false);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  // Load from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedText = localStorage.getItem(storageKey);
        if (savedText) {
          setUserText(savedText);
        }

        const savedResult = localStorage.getItem(resultKey);
        if (savedResult) {
          setResult(JSON.parse(savedResult));
          // If already has result, open if desired
        }
      } catch (e) {
        console.error("Failed to load recall state", e);
      } finally {
        setHasLoaded(true);
      }
    }
  }, [storageKey, resultKey]);

  // Synchronize mask state with global store so target theory content is covered when box is open
  useEffect(() => {
    setRecallItemMasked(itemId, isOpen);
    return () => {
      setRecallItemMasked(itemId, false);
    };
  }, [itemId, isOpen]);

  const boxRef = React.useRef<HTMLDivElement>(null);

  // Auto-mask fallback for previous sibling element if no explicit TheoryMaskableContent was wrapped
  useEffect(() => {
    if (!hasLoaded || typeof document === "undefined") return;
    const existingMaskedEl = document.querySelector(`[data-theory-masked-item="${itemId}"]`);

    if (!existingMaskedEl && boxRef.current) {
      const prevEl = boxRef.current.previousElementSibling as HTMLElement | null;
      if (prevEl) {
        if (isOpen) {
          prevEl.classList.add("theory-auto-masked-fallback");
          prevEl.setAttribute("data-auto-masked-by", itemId);
        } else {
          prevEl.classList.remove("theory-auto-masked-fallback");
          prevEl.removeAttribute("data-auto-masked-by");
        }
      }
    }

    return () => {
      if (boxRef.current) {
        const prevEl = boxRef.current.previousElementSibling as HTMLElement | null;
        if (prevEl && prevEl.getAttribute("data-auto-masked-by") === itemId) {
          prevEl.classList.remove("theory-auto-masked-fallback");
          prevEl.removeAttribute("data-auto-masked-by");
        }
      }
    };
  }, [itemId, isOpen, hasLoaded]);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    setRecallItemMasked(itemId, nextState);
  };

  // Handle typing & auto-save draft
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setUserText(val);
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, val);
      window.dispatchEvent(
        new CustomEvent("theory-recall-updated", {
          detail: { itemId, filled: val.trim().length >= 3, lessonTitle },
        })
      );
    }
  };

  // Run checking evaluation
  const handleCheck = () => {
    if (!userText.trim()) return;

    setIsEvaluating(true);
    setTimeout(() => {
      const evalRes = evaluateTheoryItemRecall(userText, targetText);
      setResult(evalRes);
      if (typeof window !== "undefined") {
        localStorage.setItem(resultKey, JSON.stringify(evalRes));
        window.dispatchEvent(
          new CustomEvent("theory-recall-updated", {
            detail: { itemId, filled: true, scorePercent: evalRes.scorePercent, lessonTitle },
          })
        );
      }
      setIsEvaluating(false);
    }, 350);
  };

  const handleReset = () => {
    setUserText("");
    setResult(null);
    setShowOriginal(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem(storageKey);
      localStorage.removeItem(resultKey);
      window.dispatchEvent(
        new CustomEvent("theory-recall-updated", {
          detail: { itemId, filled: false, lessonTitle },
        })
      );
    }
  };

  const hasContent = userText.trim().length > 0;
  const isBoxFilled = userText.trim().length >= 3 || result !== null;
  const wordCount = userText.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div
      ref={boxRef}
      data-theory-recall-box={itemId}
      className={cn(
        "w-full block select-none transition-all",
        !children && "mt-3 pt-2.5 border-t border-border/70 text-xs",
        className
      )}
    >
      {/* If children provided, wrap them in TheoryMaskableContent directly */}
      {children && (
        <div className="mb-2.5">
          <TheoryMaskableContent itemId={itemId} itemTitle={itemTitle}>
            {children}
          </TheoryMaskableContent>
        </div>
      )}

      {/* Toggle Bar / Button */}
      <div className="flex items-center justify-between gap-2 w-full">
        <button
          type="button"
          onClick={handleToggle}
          className={cn(
            "w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer border shadow-2xs",
            isOpen
              ? "bg-primary/10 text-primary border-primary/30"
              : isBoxFilled
              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
              : "bg-secondary/70 hover:bg-secondary text-muted-foreground hover:text-foreground border-border/80"
          )}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <PenLine className="h-3.5 w-3.5 text-primary shrink-0" />
            <span className="truncate">
              {isOpen
                ? "🙈 Đang che bài để viết lại • Bấm để thu gọn"
                : isBoxFilled
                ? `✅ Đã Điền Ô Này ${result ? `(${result.scorePercent}% tương đồng)` : ""}`
                : "✍️ Tự Viết Lại Kiến Thức (Ô điền lý thuyết)"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {isBoxFilled && !isOpen && (
              <span className="px-2 py-0.5 rounded-full font-mono text-[9px] font-extrabold border bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25">
                {result ? `${result.scorePercent}%` : "Đã điền ✓"}
              </span>
            )}
            {isOpen ? (
              <ChevronUp className="h-3.5 w-3.5 opacity-70" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5 opacity-70" />
            )}
          </div>
        </button>
      </div>

      {/* Expanded Interactive Recall Box */}
      {isOpen && (
        <div className="mt-2.5 p-3.5 sm:p-4 rounded-2xl bg-card border border-primary/20 shadow-xs space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-foreground font-bold text-[11px]">
              <Brain className="h-3.5 w-3.5 text-primary" />
              <span>Tự viết lại theo trí nhớ / cách hiểu của bạn:</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold">
                🙈 Đang che bài gốc
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">
                {wordCount} từ
              </span>
            </div>
          </div>

          {/* User Input Textarea */}
          <textarea
            value={userText}
            onChange={handleTextChange}
            placeholder={`Viết lại quy tắc, bản chất hoặc công thức của "${itemTitle}" vào đây (không nhìn tài liệu) để hệ thống tự động chấm điểm ghi nhớ...`}
            rows={2}
            className="w-full rounded-xl border border-border bg-secondary/30 p-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all font-medium leading-relaxed resize-y min-h-[58px]"
          />

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-2 flex-wrap pt-0.5">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCheck}
                disabled={!hasContent || isEvaluating}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl font-extrabold text-[11px] flex items-center gap-1.5 cursor-pointer transition-all shadow-xs",
                  hasContent && !isEvaluating
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "bg-secondary text-muted-foreground/60 cursor-not-allowed border border-border"
                )}
              >
                {isEvaluating ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Đang kiểm tra...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Kiểm Tra Trí Nhớ</span>
                  </>
                )}
              </button>

              {hasContent && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-2.5 py-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary text-[11px] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                  title="Xóa nội dung và thử lại"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Viết lại</span>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowOriginal(!showOriginal)}
              className="px-2.5 py-1.5 rounded-xl text-[10px] font-bold text-muted-foreground hover:text-foreground hover:bg-secondary flex items-center gap-1 cursor-pointer transition-colors"
            >
              {showOriginal ? (
                <>
                  <EyeOff className="h-3 w-3" />
                  <span>Ẩn bản gốc</span>
                </>
              ) : (
                <>
                  <Eye className="h-3 w-3" />
                  <span>Đối chiếu bản gốc</span>
                </>
              )}
            </button>
          </div>

          {/* Show Original Comparison Text if toggled */}
          {showOriginal && (
            <div className="p-3 rounded-xl bg-secondary/40 border border-border/80 text-xs space-y-1 animate-in fade-in duration-150">
              <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase block">
                Nội Dung Lý Thuyết Gốc:
              </span>
              <p className="text-foreground/90 font-medium italic leading-relaxed text-[11px]">
                &ldquo;{targetText}&rdquo;
              </p>
            </div>
          )}

          {/* Evaluation Feedback Result */}
          {result && (
            <div
              className={cn(
                "p-3 sm:p-3.5 rounded-xl border text-xs space-y-2.5 animate-in fade-in duration-200",
                "bg-emerald-500/[0.06] border-emerald-500/30 text-emerald-950 dark:text-emerald-100"
              )}
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 font-extrabold text-[11px] text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Đã ghi nhận hoàn thành ô này ✓</span>
                </div>
                <span
                  className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-black border bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40"
                >
                  Độ tương đồng: {result.scorePercent}% • ĐÃ ĐIỀN ✓
                </span>
              </div>

              <p className="text-foreground/90 font-medium text-[11px] leading-relaxed">
                {result.feedbackVi}
              </p>

              {/* Matched Keywords */}
              {result.matchedKeywords.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    Từ khóa bạn đã nhớ đúng ({result.matchedKeywords.length}):
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {result.matchedKeywords.map((kw, kIdx) => (
                      <span
                        key={kIdx}
                        className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-bold"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Keywords */}
              {result.missingKeywords.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Từ khóa quan trọng cần bổ sung thêm:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {result.missingKeywords.map((kw, kIdx) => (
                      <span
                        key={kIdx}
                        className="px-2 py-0.5 rounded-md bg-secondary/80 border border-border text-foreground font-mono text-[10px]"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
