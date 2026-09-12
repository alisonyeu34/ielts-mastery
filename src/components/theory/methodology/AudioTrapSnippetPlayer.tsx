"use client";

import React from "react";
import { AudioSnippetTrapSample } from "@/data/mockListeningMethodsData";
import {
  Volume2,
  Square,
  Play,
  Sparkles,
  Headphones,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ExcerptVocabularyCard } from "@/components/theory/ExcerptVocabularyCard";
import { useTheoryBookmarks } from "@/lib/theoryBookmarks";

interface AudioTrapSnippetPlayerProps {
  snippet: AudioSnippetTrapSample;
  isPlaying: boolean;
  onPlay: (snippetId: string, text: string) => void;
  onStop: () => void;
  lessonId?: string;
  lessonTitle?: string;
  className?: string;
}

export function AudioTrapSnippetPlayer({
  snippet,
  isPlaying,
  onPlay,
  onStop,
  lessonId = "listening-lesson",
  lessonTitle = "Chiến Lược Listening",
  className,
}: AudioTrapSnippetPlayerProps) {
  const bookmarkId = `bm_${lessonId}_snippet_${snippet.id}`;
  const { isSaved, toggleBookmark } = useTheoryBookmarks();
  const saved = isSaved(bookmarkId);

  const handleToggleBookmark = () => {
    toggleBookmark({
      id: bookmarkId,
      lessonId,
      lessonTitle,
      skill: "listening",
      category: "audio_snippet",
      categoryLabelVi: "Audio Bẫy Thường Gặp",
      title: snippet.titleVi,
      content: snippet.trapExplanationVi + ` (Đáp án: ${snippet.correctAnswerText})`,
      excerptText: snippet.transcriptText,
      translationVi: snippet.translationVi,
      wordBreakdown: snippet.wordBreakdown,
      lessonHref: `/theory/listening-methods/${lessonId}`,
    });
  };

  return (
    <div
      className={cn(
        "p-5 rounded-3xl border transition-all space-y-3.5 bg-card shadow-sm text-xs select-none",
        isPlaying ? "border-indigo-500 ring-2 ring-indigo-500/20" : "border-border",
        saved && "ring-2 ring-amber-500/30 border-amber-500/40",
        className
      )}
    >
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold shrink-0">
            <Headphones className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-extrabold text-foreground text-xs sm:text-sm">
              {snippet.titleVi}
            </h4>
            <span className="text-[10px] text-muted-foreground font-mono">
              Âm thanh mô phỏng giọng đọc Cambridge
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Bookmark Button */}
          <button
            type="button"
            onClick={handleToggleBookmark}
            className={cn(
              "px-3 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs",
              saved
                ? "bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-600 font-black"
                : "bg-secondary/70 hover:bg-secondary border-border text-foreground/90"
            )}
            title="Lưu đoạn Audio này vào Sổ Cần Nhớ"
          >
            {saved ? (
              <>
                <BookmarkCheck className="h-3.5 w-3.5 fill-current" />
                <span>Đã lưu ✓</span>
              </>
            ) : (
              <>
                <Bookmark className="h-3.5 w-3.5 text-amber-500" />
                <span>Lưu đoạn này</span>
              </>
            )}
          </button>

          {/* Audio Play Button */}
          <button
            type="button"
            onClick={() => {
              if (isPlaying) {
                onStop();
              } else {
                onPlay(snippet.id, snippet.transcriptText);
              }
            }}
            className={cn(
              "px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-sm",
              isPlaying
                ? "bg-rose-600 hover:bg-rose-700 text-white animate-pulse"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            )}
          >
            {isPlaying ? (
              <>
                <Square className="h-3.5 w-3.5" />
                <span>Dừng</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" />
                <span>Nghe Audio Bẫy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bilingual Excerpt & Word Breakdown */}
      <ExcerptVocabularyCard
        label="Audio Transcript Hội Thoại Mẫu:"
        englishText={snippet.transcriptText}
        translationVi={snippet.translationVi}
        wordBreakdown={snippet.wordBreakdown}
        sourceLessonTitle={lessonTitle}
        sourceModule="listening"
      />

      {/* Explanation & Correct Answer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-[11px]">
        <div className="text-muted-foreground">
          💡 <strong>Phân tích bẫy:</strong> {snippet.trapExplanationVi}
        </div>
        <div className="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold shrink-0 self-start sm:self-auto border border-emerald-500/20">
          Đáp án đúng: <strong>{snippet.correctAnswerText}</strong>
        </div>
      </div>
    </div>
  );
}
