"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  BookmarkPlus,
  Zap,
  Volume2,
  Layers,
} from "lucide-react";
import { AnnotatedSentence } from "@/data/mockWritingFeedbackData";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";

interface SentenceUpgradeComparisonProps {
  sentence: AnnotatedSentence | null;
  className?: string;
}

export function SentenceUpgradeComparison({
  sentence,
  className,
}: SentenceUpgradeComparisonProps) {
  const [isSavedVocab, setIsSavedVocab] = useState<boolean>(false);

  if (!sentence) {
    return (
      <div
        className={cn(
          "p-8 text-center rounded-3xl border border-dashed border-border bg-card text-muted-foreground select-none space-y-2",
          className
        )}
      >
        <Sparkles className="h-6 w-6 text-primary mx-auto animate-pulse" />
        <p className="font-bold text-xs text-foreground">
          Click vào bất kỳ câu văn nào có gạch chân trong bài viết
        </p>
        <p className="text-[11px] text-muted-foreground">
          Hệ thống sẽ mở bung bảng so sánh 3 tầng nâng cấp từ Band 5.5 lên Band 8.0+.
        </p>
      </div>
    );
  }

  const handleSaveToVocab = async () => {
    if (!sentence.targetVocabCollocation) return;
    const { phrase, ipa, meaningVi, contextSentence } = sentence.targetVocabCollocation;

    try {
      await db.vocab_matrix.put({
        id: `vocab_wr_${Date.now()}_${sentence.id}`,
        word: phrase,
        ipa: ipa,
        meaning: meaningVi,
        collocations: [phrase],
        originalContext: contextSentence,
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
      setIsSavedVocab(true);
    } catch (e) {
      console.error("Save to vocab failed:", e);
    }
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-GB";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5 select-none animate-in fade-in duration-200",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
            Nâng Cấp Câu 3 Tầng
          </span>
          <span className="text-xs font-bold text-foreground">
            Đoạn {sentence.paragraphIndex}
          </span>
        </div>

        <span className="text-[10px] font-mono text-muted-foreground italic">
          Kỹ thuật: <strong>{sentence.upgradeTechnique}</strong>
        </span>
      </div>

      {/* 3-Tier Comparison Stack */}
      <div className="space-y-3.5 text-xs">
        {/* Tier 1: Original Sentence */}
        <div className="p-4 rounded-2xl bg-rose-500/[0.05] border border-rose-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-rose-600 dark:text-rose-400 text-[10px] uppercase">
              Tầng 1 • Câu Gốc Của Bạn (Band 5.0 - 5.5)
            </span>
            <XCircle className="h-3.5 w-3.5 text-rose-600" />
          </div>

          <p className="font-serif leading-relaxed text-foreground font-medium">
            "{sentence.originalSentence}"
          </p>

          {/* Flagged issues */}
          <div className="space-y-1 pt-1 border-t border-rose-500/15">
            {sentence.flaggedIssues.map((issue, idx) => (
              <p key={idx} className="text-[11px] text-rose-700 dark:text-rose-300">
                ⚠️ <strong>Lỗi [{issue.type.toUpperCase()}]:</strong> {issue.issueDescription}
              </p>
            ))}
          </div>
        </div>

        {/* Tier 2: Band 6.5 Correction */}
        <div className="p-4 rounded-2xl bg-blue-500/[0.05] border border-blue-500/20 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-[10px] uppercase">
              Tầng 2 • Phiên Bản Sửa Chuẩn (Band 6.5)
            </span>
            <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
          </div>

          <p className="font-serif leading-relaxed text-foreground font-medium">
            "{sentence.band65Correction}"
          </p>
          <span className="text-[10px] text-muted-foreground block">
            Đã triệt tiêu hoàn toàn lỗi ngữ pháp, chia thì và số nhiều.
          </span>
        </div>

        {/* Tier 3: Band 8.0+ Stylistic Upgrade */}
        <div className="p-4 rounded-2xl bg-emerald-500/[0.07] border border-emerald-500/30 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-[10px] uppercase flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Tầng 3 • C1/C2 Academic Upgrade (Band 8.0+)
            </span>
            <button
              type="button"
              onClick={() => speakText(sentence.band80Upgrade)}
              className="p-1 rounded-lg hover:bg-emerald-500/20 text-emerald-600 transition-colors cursor-pointer"
              title="Phát âm câu nâng cấp"
            >
              <Volume2 className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="font-serif leading-relaxed text-foreground font-black text-xs sm:text-sm">
            "{sentence.band80Upgrade}"
          </p>

          {/* Collocation FSRS Action */}
          {sentence.targetVocabCollocation && (
            <div className="p-3 rounded-xl bg-card border border-border/80 flex items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif font-bold text-foreground text-xs">
                    {sentence.targetVocabCollocation.phrase}
                  </span>
                  <span className="font-mono text-[10px] text-primary">
                    {sentence.targetVocabCollocation.ipa}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {sentence.targetVocabCollocation.meaningVi}
                </p>
              </div>

              <button
                type="button"
                onClick={handleSaveToVocab}
                disabled={isSavedVocab}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0",
                  isSavedVocab
                    ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                    : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xs"
                )}
              >
                {isSavedVocab ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Đã Lưu FSRS</span>
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="h-3.5 w-3.5" />
                    <span>Lưu Sổ FSRS</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
