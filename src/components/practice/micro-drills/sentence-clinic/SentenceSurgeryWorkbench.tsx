"use client";

import React, { useRef, useEffect } from "react";
import { SentenceClinicCase } from "@/data/mockSentenceClinicData";
import { SentenceEvaluationFeedback } from "@/lib/sentenceClinicEvaluator";
import {
  Send,
  RotateCcw,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Award,
  Layers,
  Palette,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SentenceSurgeryWorkbenchProps {
  clinicCase: SentenceClinicCase;
  userRevision: string;
  onChangeRevision: (val: string) => void;
  isSubmitted: boolean;
  evaluation: SentenceEvaluationFeedback | null;
  onSubmit: () => void;
  onReset: () => void;
  onNext: () => void;
  onToggleCollocationDrawer: () => void;
  className?: string;
}

export function SentenceSurgeryWorkbench({
  clinicCase,
  userRevision,
  onChangeRevision,
  isSubmitted,
  evaluation,
  onSubmit,
  onReset,
  onNext,
  onToggleCollocationDrawer,
  className,
}: SentenceSurgeryWorkbenchProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!isSubmitted && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [clinicCase.id, isSubmitted]);

  return (
    <div
      className={cn(
        "p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold shadow-xs">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
              BÀN PHẪU THUẬT CÂU (SENTENCE OPERATING TABLE)
            </span>
            <h4 className="text-sm font-extrabold text-foreground">
              Viết Lại Phiên Bản Đã Chữa Lỗi & Nâng Cấp Cú Pháp C1
            </h4>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleCollocationDrawer}
          className="px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-bold font-mono flex items-center gap-1.5 transition-colors cursor-pointer border border-border"
        >
          <Palette className="h-4 w-4 text-emerald-500" />
          <span>Tra Cứu Collocations C1</span>
        </button>
      </div>

      {/* Input / Editing Area */}
      {!isSubmitted ? (
        <div className="space-y-3">
          <textarea
            ref={textareaRef}
            value={userRevision}
            onChange={(e) => onChangeRevision(e.target.value)}
            rows={3}
            placeholder="Gõ phiên bản câu đã phẫu thuật sạch lỗi ngữ pháp và nâng cấp collocations C1..."
            className="w-full p-4 rounded-2xl border border-border bg-background text-sm sm:text-base font-serif text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all resize-none leading-relaxed"
          />

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-mono text-muted-foreground">
              Độ dài: {userRevision.trim() ? userRevision.trim().split(/\s+/).length : 0} từ
            </span>

            <button
              type="button"
              onClick={onSubmit}
              disabled={!userRevision.trim()}
              className={cn(
                "px-6 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer",
                userRevision.trim()
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              <span>Phân Tích & Chấm Điểm</span>
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Evaluation Results Feedback */
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Estimated Band Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-secondary/50 border border-border">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl font-mono font-black text-lg text-white shadow-sm",
                  evaluation && evaluation.estimatedBand >= 7.5
                    ? "bg-emerald-600 shadow-emerald-600/30"
                    : evaluation && evaluation.estimatedBand >= 6.5
                    ? "bg-indigo-600 shadow-indigo-600/30"
                    : "bg-amber-600 shadow-amber-600/30"
                )}
              >
                {evaluation?.estimatedBand.toFixed(1)}
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                  ĐÁNH GIÁ NĂNG LỰC PHẪU THUẬT
                </span>
                <h4 className="text-sm sm:text-base font-black text-foreground">
                  Ước Tính Band: {evaluation?.estimatedBand.toFixed(1)} • Tương thích {evaluation?.similarityPercentage}%
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              {evaluation?.isPassed ? (
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  Đạt Chuẩn Học Thuật
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 font-bold flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4" />
                  Cần Nâng Cấp Thêm
                </span>
              )}
            </div>
          </div>

          {/* User Submitted Revision Display */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
              CÂU CỦA BẠN ĐÃ VIẾT LẠI:
            </span>
            <p className="p-4 rounded-2xl bg-card border border-border font-serif text-sm sm:text-base font-bold text-foreground leading-relaxed">
              &ldquo;{userRevision}&rdquo;
            </p>
          </div>

          {/* Matched Collocations Found */}
          {evaluation && evaluation.matchedCollocations.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                CỤM TỪ C1 COLLOCATIONS BẠN ĐÃ ỨNG DỤNG THÀNH CÔNG:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {evaluation.matchedCollocations.map((col, cIdx) => (
                  <span
                    key={cIdx}
                    className="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-mono font-bold text-xs"
                  >
                    ✓ {col}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-1.5">
              <span className="font-bold font-mono text-emerald-700 dark:text-emerald-300 uppercase block">
                ✨ Điểm Sáng Khảo Thí:
              </span>
              {evaluation?.diagnosedStrengthsVi.map((s, idx) => (
                <p key={idx} className="text-foreground/80 leading-relaxed">
                  • {s}
                </p>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 space-y-1.5">
              <span className="font-bold font-mono text-indigo-700 dark:text-indigo-300 uppercase block">
                💡 Định Hướng Nâng Cao:
              </span>
              {evaluation?.diagnosedImprovementsVi.map((imp, idx) => (
                <p key={idx} className="text-foreground/80 leading-relaxed">
                  • {imp}
                </p>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={onReset}
              className="px-4 py-2.5 rounded-xl border border-border text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-secondary flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Sửa Lại Ca Này</span>
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <span>Tiếp Tục Ca Bệnh Tiếp Theo</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
