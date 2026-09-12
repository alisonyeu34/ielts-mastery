"use client";

import React from "react";
import {
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Eye,
} from "lucide-react";
import { ParaphraseDrillItem } from "@/data/mockParaphraseDrillsData";
import { ParaphraseVerificationResult } from "@/lib/paraphraseVerifier";
import { cn } from "@/lib/utils";

interface ParaphraseEngineDrillProps {
  drill: ParaphraseDrillItem;
  currentIndex: number;
  totalCount: number;
  draft: string;
  onDraftChange: (text: string) => void;
  result: ParaphraseVerificationResult | null;
  onEvaluate: () => void;
  onSaveAndAdvance: () => void;
}

export function ParaphraseEngineDrill({
  drill,
  currentIndex,
  totalCount,
  draft,
  onDraftChange,
  result,
  onEvaluate,
  onSaveAndAdvance,
}: ParaphraseEngineDrillProps) {
  const [showHints, setShowHints] = React.useState<boolean>(false);
  const [showBenchmarks, setShowBenchmarks] = React.useState<boolean>(false);

  return (
    <div className="space-y-6">
      {/* Question Card */}
      <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-xl bg-secondary font-mono text-xs font-bold text-foreground">
              Bài tập {currentIndex + 1} / {totalCount}
            </span>
            <span className="px-3 py-1 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20 text-xs font-bold uppercase tracking-wider">
              Kỹ Thuật: {drill.techniqueName}
            </span>
          </div>

          <div className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            <span>Chủ đề: <strong className="text-foreground">{drill.topic}</strong></span>
          </div>
        </div>

        {/* Original Sentence */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Câu Gốc Chuẩn IELTS Reading / Writing:
          </span>
          <div className="p-4 rounded-2xl bg-secondary/50 border border-border font-serif text-base sm:text-lg text-foreground leading-relaxed">
            {drill.originalSentence}
          </div>
        </div>

        {/* Prompt Instruction */}
        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-foreground flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-primary" />
              Yêu Cầu Biến Đổi Paraphrase:
            </span>
            <button
              type="button"
              onClick={() => setShowHints((p) => !p)}
              className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              {showHints ? "Ẩn gợi ý C1" : "Xem gợi ý C1"}
            </button>
          </div>
          <p className="text-muted-foreground leading-relaxed font-medium">
            {drill.promptInstruction}
          </p>

          {showHints && (
            <div className="mt-2 pt-2 border-t border-primary/20 space-y-1 text-[11px] text-foreground animate-in fade-in duration-150">
              <strong className="text-primary">Gợi ý học thuật:</strong>
              <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                {drill.hints.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Paraphrase Interactive Workbench */}
      <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground flex items-center justify-between">
            <span>Nhập Câu Paraphrase Của Bạn:</span>
            <span className="text-[11px] font-mono text-muted-foreground">
              {draft.trim().split(/\s+/).filter(Boolean).length} từ
            </span>
          </label>
          <textarea
            value={draft}
            onChange={(e) => onDraftChange(e.target.value)}
            placeholder="Viết lại câu văn giữ nguyên 100% sắc thái nghĩa gốc và áp dụng kỹ thuật chỉ định..."
            rows={4}
            className="w-full rounded-2xl border border-border bg-background p-4 text-sm sm:text-base font-serif text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed resize-y"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={onEvaluate}
              disabled={!draft.trim()}
              className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-sm"
            >
              <Zap className="h-4 w-4" />
              Thẩm Định Biến Đổi Paraphrase
            </button>

            <button
              type="button"
              onClick={() => setShowBenchmarks((p) => !p)}
              className="px-4 py-2.5 rounded-xl border border-border bg-secondary/50 hover:bg-secondary text-xs font-bold text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5 text-primary" />
              {showBenchmarks ? "Ẩn Đáp Án Mẫu" : "Mở Kính So Sánh 3 Chuẩn Band"}
            </button>
          </div>
        </div>

        {/* Verification Result Panel */}
        {result && (
          <div
            className={cn(
              "p-5 rounded-2xl border space-y-4 animate-in fade-in duration-200",
              result.score >= 70
                ? "bg-emerald-500/5 border-emerald-500/20"
                : "bg-amber-500/5 border-amber-500/20"
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "h-9 w-9 rounded-xl flex items-center justify-center font-black text-sm text-white",
                    result.score >= 80 ? "bg-emerald-500" : "bg-amber-500"
                  )}
                >
                  {result.score}%
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">
                    {result.techniqueApplied
                      ? "Đã Áp Dụng Thành Công Kỹ Thuật Paraphrase!"
                      : "Chưa Đạt Chuẩn Kỹ Thuật Chỉ Định!"}
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    Ước lượng Band điểm Lexical & GRA: <strong className="text-primary">Band {result.bandScore.toFixed(1)}</strong>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onSaveAndAdvance}
                className="px-4 py-2 rounded-xl bg-foreground text-background font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
              >
                <span>Lưu & Sang Bài Tiếp</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Feedback Points */}
            <div className="space-y-2 text-xs">
              {result.strengths.map((s, idx) => (
                <div key={idx} className="flex items-start gap-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{s}</span>
                </div>
              ))}
              {result.improvements.map((imp, idx) => (
                <div key={idx} className="flex items-start gap-2 text-amber-600 dark:text-amber-400">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{imp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Benchmark Comparisons Box */}
        {showBenchmarks && (
          <div className="p-5 rounded-2xl bg-secondary/30 border border-border space-y-3 text-xs animate-in fade-in duration-150">
            <div className="flex items-center justify-between font-bold text-foreground border-b border-border pb-2">
              <span>Bộ Đáp Án Mẫu 3 Mức Điểm Cambridge ({drill.techniqueName})</span>
              <span className="text-primary text-[11px]">{drill.topic}</span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-card border border-border space-y-1 font-serif">
                <div className="font-sans font-bold text-foreground text-[11px] flex items-center justify-between">
                  <span className="text-amber-500">Band 6.5 (Đúng kỹ thuật cơ bản)</span>
                </div>
                <p className="text-foreground text-xs leading-relaxed">{drill.benchmarks.band65}</p>
              </div>

              <div className="p-3 rounded-xl bg-card border border-border space-y-1 font-serif">
                <div className="font-sans font-bold text-foreground text-[11px] flex items-center justify-between">
                  <span className="text-primary">Band 7.5 (C1 Collocations tự nhiên)</span>
                </div>
                <p className="text-foreground text-xs leading-relaxed">{drill.benchmarks.band75}</p>
              </div>

              <div className="p-3 rounded-xl bg-card border border-border space-y-1 font-serif">
                <div className="font-sans font-bold text-foreground text-[11px] flex items-center justify-between">
                  <span className="text-purple-500">Band 8.5+ (Cú pháp học thuật C2)</span>
                </div>
                <p className="text-foreground text-xs leading-relaxed">{drill.benchmarks.band85}</p>
              </div>
            </div>

            <p className="text-[11px] text-muted-foreground pt-1 border-t border-border/60">
              <strong>Lời khuyên giám khảo:</strong> {drill.examinerPedagogy}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
