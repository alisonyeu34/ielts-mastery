"use client";

import React, { useState, useEffect } from "react";
import {
  Brain,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  XCircle,
  RotateCcw,
  PenTool,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Check,
  Flame,
  HelpCircle,
} from "lucide-react";
import { CoreGrammarTheoryLesson } from "@/data/mockGrammarTheoryData";
import {
  evaluateActiveRecall,
  ActiveRecallFeedback,
} from "@/lib/activeRecallEvaluator";
import { cn } from "@/lib/utils";

interface ActiveRecallCheckWidgetProps {
  lesson: CoreGrammarTheoryLesson;
  stepNumber: 1 | 2 | 3;
  stepTitle: string;
  className?: string;
}

export function ActiveRecallCheckWidget({
  lesson,
  stepNumber,
  stepTitle,
  className,
}: ActiveRecallCheckWidgetProps) {
  const storageKey = `active_recall_${lesson.id}_step_${stepNumber}`;
  const feedbackKey = `active_recall_fb_${lesson.id}_step_${stepNumber}`;

  const [userText, setUserText] = useState<string>("");
  const [feedback, setFeedback] = useState<ActiveRecallFeedback | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [isDraftLoaded, setIsDraftLoaded] = useState<boolean>(false);
  const [showHelperPrompt, setShowHelperPrompt] = useState<boolean>(false);

  // Load saved draft and feedback on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedText = localStorage.getItem(storageKey);
        if (savedText) setUserText(savedText);

        const savedFeedback = localStorage.getItem(feedbackKey);
        if (savedFeedback) {
          setFeedback(JSON.parse(savedFeedback));
        }
      } catch (e) {
        console.error("Failed to load active recall data", e);
      } finally {
        setIsDraftLoaded(true);
      }
    }
  }, [storageKey, feedbackKey]);

  // Auto-save draft as user types
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setUserText(val);
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, val);
    }
  };

  // Run AI Evaluation
  const handleEvaluate = () => {
    if (!userText.trim()) return;

    setIsEvaluating(true);
    setTimeout(() => {
      const result = evaluateActiveRecall(userText, lesson, stepNumber);
      setFeedback(result);
      if (typeof window !== "undefined") {
        localStorage.setItem(feedbackKey, JSON.stringify(result));
      }
      setIsEvaluating(false);
    }, 600);
  };

  const handleReset = () => {
    setUserText("");
    setFeedback(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(storageKey);
      localStorage.removeItem(feedbackKey);
    }
  };

  const wordCount = userText.trim() ? userText.trim().split(/\s+/).filter(Boolean).length : 0;

  // Prompt suggestions depending on step
  const stepPrompts = {
    1: [
      "Công thức và quy tắc chia động từ chính của bài này là gì?",
      "Có trường hợp nào đặc biệt hoặc ngoại lệ cần lưu ý không?",
      "Dấu hiệu thời gian hoặc hoàn cảnh áp dụng trong IELTS?",
      "Thử tự đặt 1 câu ví dụ của riêng bạn!",
    ],
    2: [
      "Các bẫy khảo thí mà thí sinh hay bị trừ điểm oan là gì?",
      "Tại sao câu sai lại sai, câu đúng đã khắc phục như thế nào?",
      "Cách nhận biết và phản xạ ngay khi thấy bẫy đó?",
    ],
    3: [
      "Câu mẫu Band 8.5+ sử dụng cấu trúc ngữ pháp nào đặc sắc?",
      "Các cụm Collocations đắt giá nào bạn vừa học được?",
      "Thử tự viết 1 câu ghép phức ứng dụng cấu trúc này!",
    ],
  };

  return (
    <div
      className={cn(
        "rounded-3xl border-2 border-indigo-500/20 bg-gradient-to-b from-indigo-500/[0.04] via-card to-card p-5 sm:p-6 shadow-sm space-y-4 select-none",
        className
      )}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30 shrink-0">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                ACTIVE RECALL • BƯỚC {stepNumber}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                Kỹ thuật tự nhớ & Thẩm định kiến thức
              </span>
            </div>
            <h3 className="text-base font-black text-foreground mt-0.5">
              Tự Viết Lại Kiến Thức Để Khắc Sâu Trí Nhớ
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowHelperPrompt(!showHelperPrompt)}
          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
        >
          <Lightbulb className="h-3.5 w-3.5" />
          <span>{showHelperPrompt ? "Ẩn câu hỏi gợi mở" : "Xem gợi ý câu hỏi tự hỏi"}</span>
        </button>
      </div>

      {/* Helper Questions Collapsible */}
      {showHelperPrompt && (
        <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-1.5 text-xs animate-in fade-in duration-200">
          <span className="font-bold text-indigo-700 dark:text-indigo-300 block text-[11px] uppercase font-mono">
            💡 Gợi ý để bạn tự nhớ và viết xuống:
          </span>
          <ul className="space-y-1 text-muted-foreground list-disc list-inside">
            {stepPrompts[stepNumber].map((prompt, pIdx) => (
              <li key={pIdx}>{prompt}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Description */}
      <p className="text-xs text-muted-foreground leading-relaxed">
        Hãy viết tự do bất kỳ điều gì bạn vừa học được ở bước trên (công thức, quy tắc, lưu ý, bẫy hoặc câu ví dụ của riêng bạn). 
        Viết theo cách hiểu tự nhiên nhất của bạn — sau khi viết xong, bấm <strong>"Thẩm Định Trí Nhớ"</strong> để kiểm tra xem bạn đã nhớ chuẩn xác chưa, còn thiếu ý nào hay có chỗ nào nhầm lẫn không!
      </p>

      {/* Textarea Input Box */}
      <div className="relative">
        <textarea
          rows={4}
          value={userText}
          onChange={handleTextChange}
          placeholder={`Viết tự do ở đây (bằng tiếng Việt hoặc tiếng Anh)... Ví dụ: "Bước này mình học về..., quy tắc chính là..., điểm cần chú ý là..., bẫy hay gặp là..."`}
          className="w-full rounded-2xl border border-border bg-background/60 p-4 text-xs leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-sans"
        />

        {/* Word Count Indicator */}
        <div className="absolute bottom-3 right-3 text-[10px] font-mono text-muted-foreground bg-card/90 px-2 py-0.5 rounded-lg border border-border">
          {wordCount} từ
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          {userText.trim() && (
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1.5 rounded-xl text-[11px] font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Xóa viết lại</span>
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={handleEvaluate}
          disabled={isEvaluating || !userText.trim()}
          className={cn(
            "px-5 py-2.5 rounded-2xl font-black text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer",
            !userText.trim()
              ? "bg-secondary text-muted-foreground cursor-not-allowed opacity-60"
              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25 active:scale-95"
          )}
        >
          {isEvaluating ? (
            <>
              <Sparkles className="h-4 w-4 animate-spin" />
              <span>Đang phân tích & thẩm định...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>Thẩm Định Kiến Thức Đã Nhớ ✨</span>
            </>
          )}
        </button>
      </div>

      {/* Feedback Panel */}
      {feedback && (
        <div className="mt-4 rounded-2xl border border-indigo-500/30 bg-card p-5 space-y-4 animate-in fade-in-50 duration-300">
          {/* Header Score Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl font-bold font-mono text-sm",
                  feedback.scoreLevel === "excellent"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : feedback.scoreLevel === "good"
                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                )}
              >
                {feedback.scorePercent}%
              </div>
              <div>
                <span className="text-xs font-black text-foreground block">
                  {feedback.statusLabel}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {feedback.summaryFeedback}
                </span>
              </div>
            </div>

            <div className="w-full sm:w-32 h-2 bg-secondary rounded-full overflow-hidden shrink-0">
              <div
                style={{ width: `${feedback.scorePercent}%` }}
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  feedback.scoreLevel === "excellent"
                    ? "bg-emerald-600"
                    : feedback.scoreLevel === "good"
                    ? "bg-blue-600"
                    : "bg-amber-600"
                )}
              />
            </div>
          </div>

          {/* 1. Accurate Points (Green) */}
          {feedback.accuratePoints.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-extrabold uppercase font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Những ý bạn đã nhớ rất chuẩn xác:</span>
              </span>
              <div className="space-y-1 pl-1">
                {feedback.accuratePoints.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-foreground/90">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Missing Points (Yellow) */}
          {feedback.missingPoints.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-border/60">
              <span className="text-[11px] font-extrabold uppercase font-mono text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>Điểm trọng yếu bạn còn bỏ sót (Hãy bổ sung):</span>
              </span>
              <div className="space-y-1 pl-1">
                {feedback.missingPoints.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Misconceptions Detected (Red) */}
          {feedback.misconceptions.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-border/60">
              <span className="text-[11px] font-extrabold uppercase font-mono text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                <XCircle className="h-3.5 w-3.5" />
                <span>Phát hiện điểm hiểu sai hoặc nhầm lẫn cần sửa:</span>
              </span>

              <div className="space-y-2">
                {feedback.misconceptions.map((mc, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-3 rounded-xl bg-rose-500/[0.06] border border-rose-500/30 text-xs space-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="line-through text-rose-700 dark:text-rose-300 font-bold">
                        "{mc.whatUserWrote}"
                      </span>
                      <span className="text-muted-foreground font-mono">➔</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        {mc.correction}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      💡 <strong>Giải thích:</strong> {mc.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Mentor Advice */}
          <div className="p-3 rounded-xl bg-secondary/50 border border-border/80 flex items-start gap-2.5 text-xs">
            <Lightbulb className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-foreground block">
                Mẹo Khắc Sâu Trí Nhớ Của Chuyên Gia:
              </span>
              <p className="text-muted-foreground leading-relaxed">
                {feedback.mentorAdvice}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
