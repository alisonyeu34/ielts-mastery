"use client";

import React from "react";
import {
  ShieldAlert,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  BookmarkCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { VocabBreakdownWord } from "@/types/theoryBookmarks";
import { ExcerptVocabularyCard } from "@/components/theory/ExcerptVocabularyCard";
import { TheorySpeakerButton } from "@/components/theory/TheorySpeakerButton";
import { TheoryItemRecallBox } from "@/components/theory/TheoryItemRecallBox";
import { TheoryMaskableContent } from "@/components/theory/TheoryMaskableContent";
import { useTheoryBookmarks } from "@/lib/theoryBookmarks";

interface ExaminerTrapSpotlightProps {
  id?: string;
  trapName: string;
  trapMechanism: string;
  excerptText: string;
  translationVi?: string;
  wordBreakdown?: VocabBreakdownWord[];
  deceptiveStatementOrChoice: string;
  correctAnswerText: string;
  examinerInsight: string;
  lessonId?: string;
  lessonTitle?: string;
  skill?: "reading" | "listening" | "writing" | "speaking" | "grammar";
  lessonHref?: string;
  className?: string;
}

export function ExaminerTrapSpotlight({
  id,
  trapName,
  trapMechanism,
  excerptText,
  translationVi,
  wordBreakdown = [],
  deceptiveStatementOrChoice,
  correctAnswerText,
  examinerInsight,
  lessonId = "reading-lesson",
  lessonTitle = "Chiến Lược Làm Bài",
  skill = "reading",
  lessonHref,
  className,
}: ExaminerTrapSpotlightProps) {
  const bookmarkId = id || `bm_${lessonId}_trap_${trapName.replace(/[^a-zA-Z0-9]/g, "_")}`;
  const { isSaved, toggleBookmark } = useTheoryBookmarks();
  const saved = isSaved(bookmarkId);

  const handleToggleBookmark = () => {
    toggleBookmark({
      id: bookmarkId,
      lessonId,
      lessonTitle,
      skill,
      category: "trap",
      categoryLabelVi: "Bẫy Khảo Thí",
      title: trapName,
      content: trapMechanism + " | Chiến thuật: " + examinerInsight,
      excerptText,
      translationVi,
      wordBreakdown,
      lessonHref: lessonHref || (skill === "reading" ? `/theory/reading-methods/${lessonId}` : `/theory/listening-methods/${lessonId}`),
    });
  };

  return (
    <div
      className={cn(
        "p-5 sm:p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4 text-xs select-none transition-all",
        saved && "ring-2 ring-amber-500/30 border-amber-500/40",
        className
      )}
    >
      {/* Title & Bookmark Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-border/70 pb-3">
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold font-mono text-xs">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>BẪY KHẢO THÍ: {trapName}</span>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <TheorySpeakerButton
            text={`Bẫy khảo thí: ${trapName}. Cơ chế bẫy của Cambridge: ${trapMechanism}. Chiến thuật xử lý: ${examinerInsight}`}
            title="Nghe đọc bẫy khảo thí này"
            label="Đọc bẫy"
            size="sm"
          />

          {/* Dedicated bookmark button for this trap */}
          <button
            type="button"
            onClick={handleToggleBookmark}
            className={cn(
              "px-3 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs",
              saved
                ? "bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-600 font-black"
                : "bg-secondary/70 hover:bg-secondary border-border text-foreground/90"
            )}
            title="Lưu bẫy khảo thí này vào Tab Cá Nhân Cần Nhớ để ôn tập"
          >
            {saved ? (
              <>
                <BookmarkCheck className="h-3.5 w-3.5 fill-current" />
                <span>★ Đã Lưu Vào Sổ Cần Nhớ</span>
              </>
            ) : (
              <>
                <Bookmark className="h-3.5 w-3.5 text-amber-500" />
                <span>☆ Lưu Bẫy Này Vào Sổ Cần Nhớ</span>
              </>
            )}
          </button>
        </div>
      </div>

      <TheoryMaskableContent
        itemId={`recall_${skill}_${lessonId}_trap_${trapName.replace(/[^a-zA-Z0-9]/g, "_")}`}
        itemTitle={`Bẫy Khảo Thí: ${trapName}`}
      >
        <p className="text-muted-foreground leading-relaxed">
          <strong>Cơ chế bẫy của Cambridge:</strong> {trapMechanism}
        </p>

        {/* Bilingual Excerpt & Word Breakdown Card */}
        <ExcerptVocabularyCard
          label="Trích đoạn bài đọc / Audio gốc:"
          englishText={excerptText}
          translationVi={translationVi}
          wordBreakdown={wordBreakdown}
          sourceLessonTitle={lessonTitle}
          sourceModule={skill}
        />

        {/* Side-by-Side Dual Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-3.5">
          {/* Deceptive trap */}
          <div className="p-4 rounded-2xl bg-rose-500/[0.04] border border-rose-500/30 space-y-1.5">
            <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold font-mono text-[10px] uppercase">
              <XCircle className="h-3.5 w-3.5" />
              <span>Phương án bẫy thường gặp (Mất điểm):</span>
            </div>
            <p className="text-rose-800 dark:text-rose-200 font-medium leading-relaxed">
              {deceptiveStatementOrChoice}
            </p>
          </div>

          {/* Correct action */}
          <div className="p-4 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold font-mono text-[10px] uppercase">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Đáp án & Cách xử lý chuẩn xác:</span>
            </div>
            <p className="text-emerald-800 dark:text-emerald-200 font-bold leading-relaxed">
              {correctAnswerText}
            </p>
          </div>
        </div>

        {/* Insight */}
        <div className="p-3.5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 text-[11px] leading-relaxed text-foreground/90 flex items-start gap-2 mt-3.5">
          <span className="text-base leading-none">💡</span>
          <div>
            <strong>Chiến thuật vượt bẫy:</strong> {examinerInsight}
          </div>
        </div>
      </TheoryMaskableContent>

      {/* Active Recall Box */}
      <TheoryItemRecallBox
        itemId={`recall_${skill}_${lessonId}_trap_${trapName.replace(/[^a-zA-Z0-9]/g, "_")}`}
        itemTitle={`Bẫy Khảo Thí: ${trapName}`}
        targetText={`Cơ chế bẫy: ${trapMechanism}. Chiến thuật vượt bẫy: ${examinerInsight}`}
        lessonTitle={lessonTitle}
      />
    </div>
  );
}
