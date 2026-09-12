"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  BookOpen,
  BookmarkPlus,
  Check,
  Languages,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Volume2,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { VocabBreakdownWord, TargetSkill } from "@/types/theoryBookmarks";
import {
  saveWordToVocabMatrix,
  isRecommendedBand75Word,
  getRecommendationBadgeInfo,
  TARGET_BAND_75_PROFILE,
} from "@/lib/theoryBookmarks";
import { db } from "@/lib/db";
import { PronounceWordButton } from "./PronounceWordButton";
import { Band75RecommendationBadge } from "./Band75RecommendationBadge";

interface ExcerptVocabularyCardProps {
  label?: string;
  englishText: string;
  translationVi?: string;
  wordBreakdown?: VocabBreakdownWord[];
  sourceLessonTitle?: string;
  sourceModule?: string;
  skill?: TargetSkill;
  className?: string;
}

export function ExcerptVocabularyCard({
  label = "Trích đoạn bài đọc / Audio gốc:",
  englishText,
  translationVi,
  wordBreakdown = [],
  sourceLessonTitle = "Bài Học IELTS",
  sourceModule = "theory_lesson",
  skill,
  className,
}: ExcerptVocabularyCardProps) {
  const [savedWords, setSavedWords] = useState<Record<string, boolean>>({});
  const [showTranslation, setShowTranslation] = useState(true);
  const [showBreakdown, setShowBreakdown] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check which words are already in db.vocab_matrix on mount
  useEffect(() => {
    let isMounted = true;
    async function checkSaved() {
      if (wordBreakdown.length === 0) return;
      const initialSaved: Record<string, boolean> = {};
      for (const item of wordBreakdown) {
        try {
          const found = await db.vocab_matrix
            .where("word")
            .equalsIgnoreCase(item.word.trim())
            .first();
          if (found) {
            initialSaved[item.word] = true;
          }
        } catch {
          // ignore error
        }
      }
      if (isMounted) {
        setSavedWords(initialSaved);
      }
    }
    checkSaved();
    return () => {
      isMounted = false;
    };
  }, [wordBreakdown]);

  const handleSaveWord = async (item: VocabBreakdownWord) => {
    if (savedWords[item.word]) return;

    const ok = await saveWordToVocabMatrix({
      word: item.word,
      ipa: item.ipa,
      type: item.type,
      meaningVi: item.meaningVi,
      context: englishText,
      sourceModule,
    });

    if (ok) {
      setSavedWords((prev) => ({ ...prev, [item.word]: true }));
      setToastMessage(`Đã lưu "${item.word}" vào Sổ Từ Vựng (FSRS)!`);
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const handleSaveAllWords = async () => {
    let addedCount = 0;
    for (const item of wordBreakdown) {
      if (!savedWords[item.word]) {
        await saveWordToVocabMatrix({
          word: item.word,
          ipa: item.ipa,
          type: item.type,
          meaningVi: item.meaningVi,
          context: englishText,
          sourceModule,
        });
        addedCount++;
      }
    }
    const updated: Record<string, boolean> = {};
    wordBreakdown.forEach((w) => {
      updated[w.word] = true;
    });
    setSavedWords(updated);
    setToastMessage(`Đã lưu toàn bộ ${wordBreakdown.length} từ vào Sổ Từ Vựng (FSRS)!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const effectiveSkill: TargetSkill = useMemo(() => {
    if (skill) return skill;
    const mod = sourceModule.toLowerCase();
    if (mod.includes("read")) return "reading";
    if (mod.includes("listen")) return "listening";
    if (mod.includes("writ")) return "writing";
    if (mod.includes("speak")) return "speaking";
    if (mod.includes("gram")) return "grammar";
    return "reading";
  }, [skill, sourceModule]);

  const skillProfile = TARGET_BAND_75_PROFILE[effectiveSkill] || TARGET_BAND_75_PROFILE.reading;

  const recommendedWords = useMemo(() => {
    return wordBreakdown.filter((w) => isRecommendedBand75Word(w, effectiveSkill));
  }, [wordBreakdown, effectiveSkill]);

  const handleSaveRecommendedWords = async () => {
    let addedCount = 0;
    const updated = { ...savedWords };
    for (const item of recommendedWords) {
      if (!savedWords[item.word]) {
        await saveWordToVocabMatrix({
          word: item.word,
          ipa: item.ipa,
          type: item.type,
          meaningVi: item.meaningVi,
          context: englishText,
          sourceModule,
        });
        addedCount++;
      }
      updated[item.word] = true;
    }
    setSavedWords(updated);
    setToastMessage(`Đã lưu ${recommendedWords.length} từ vựng cần cho ${skillProfile.buttonLabel} vào Sổ Từ Vựng (FSRS)!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div
      className={cn(
        "rounded-2xl bg-card border border-border/90 shadow-xs overflow-hidden text-xs select-none",
        className
      )}
    >
      {/* Toast banner inside card */}
      {toastMessage && (
        <div className="bg-emerald-500/15 border-b border-emerald-500/30 px-4 py-2 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <span className="text-[10px] uppercase font-mono opacity-80">Ôn theo thuật toán FSRS</span>
        </div>
      )}

      {/* 1. English Quote Area */}
      <div className="p-4 sm:p-5 space-y-2 bg-secondary/30">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-extrabold text-muted-foreground uppercase tracking-wider block">
              {label}
            </span>
            <PronounceWordButton word={englishText} size="xs" title="Nghe đọc trích đoạn này" />
          </div>
          {translationVi && (
            <button
              type="button"
              onClick={() => setShowTranslation((prev) => !prev)}
              className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Languages className="h-3 w-3" />
              <span>{showTranslation ? "Thu gọn dịch" : "Xem dịch tiếng Việt"}</span>
            </button>
          )}
        </div>

        <p className="font-serif font-bold text-foreground text-xs sm:text-sm leading-relaxed tracking-normal whitespace-pre-line">
          "{englishText}"
        </p>
      </div>

      {/* 2. Vietnamese Translation Box */}
      {translationVi && showTranslation && (
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-blue-500/[0.06] border-t border-b border-blue-500/20 space-y-1.5 animate-in fade-in duration-150">
          <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-300 font-extrabold font-mono text-[10px] uppercase">
            <span>🇻🇳 DỊCH NGHĨA TIẾNG VIỆT DỄ HIỂU:</span>
          </div>
          <p className="text-foreground/90 font-medium text-xs leading-relaxed italic">
            "{translationVi}"
          </p>
        </div>
      )}

      {/* 3. Word-by-Word Vocabulary Breakdown */}
      {wordBreakdown.length > 0 && (
        <div className="p-4 sm:p-5 space-y-3 bg-card/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-[11px] font-extrabold text-foreground font-mono uppercase">
                  Bóc Tách Nghĩa Từng Từ ({wordBreakdown.length} từ vựng trọng tâm):
                </span>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-mono font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded-md border border-border/70">
                <span>🎯 Lộ trình 7.5:</span>
                <span className="text-foreground font-extrabold">{skillProfile.labelVi}</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {recommendedWords.length > 0 && (
                <button
                  type="button"
                  onClick={handleSaveRecommendedWords}
                  className="text-[10px] font-black text-amber-800 dark:text-amber-200 border border-amber-500/40 bg-amber-500/20 hover:bg-amber-500/30 px-2.5 py-0.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-2xs"
                  title={`Chỉ lưu các từ vựng cốt lõi cho ${skillProfile.labelVi} trong chiến lược Band 7.5 Overall`}
                >
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500 shrink-0" />
                  <span>Lưu {recommendedWords.length} từ cần cho {skillProfile.buttonLabel}</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleSaveAllWords}
                className="text-[10px] font-bold text-muted-foreground hover:text-foreground border border-border bg-secondary/50 px-2 py-0.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                title="Lưu tất cả từ vựng trong đoạn này vào Sổ Từ Vựng"
              >
                <Sparkles className="h-3 w-3" />
                <span>Lưu tất cả</span>
              </button>
              <button
                type="button"
                onClick={() => setShowBreakdown((prev) => !prev)}
                className="text-muted-foreground hover:text-foreground p-1 rounded cursor-pointer"
                title={showBreakdown ? "Thu gọn danh sách từ" : "Mở rộng danh sách từ"}
              >
                {showBreakdown ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          {showBreakdown && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1 animate-in fade-in duration-150">
              {wordBreakdown.map((item, idx) => {
                const isSaved = !!savedWords[item.word];
                const recInfo = getRecommendationBadgeInfo(item, effectiveSkill);
                return (
                  <div
                    key={idx}
                    className={cn(
                      "p-2.5 rounded-xl border flex flex-col justify-between gap-2 transition-all",
                      recInfo.isRecommended
                        ? "bg-amber-500/[0.04] border-amber-500/40 shadow-xs"
                        : isSaved
                        ? "bg-emerald-500/[0.04] border-emerald-500/30"
                        : "bg-secondary/30 hover:bg-secondary/50 border-border/70"
                    )}
                  >
                    <div className="space-y-1">
                      {recInfo.isRecommended && (
                        <div className="flex items-center justify-between pb-0.5">
                          <Band75RecommendationBadge
                            skill={effectiveSkill}
                            bandTarget={recInfo.bandTarget}
                            reasonVi={recInfo.reasonVi}
                            compact
                          />
                        </div>
                      )}
                      <div className="flex items-baseline justify-between gap-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="font-black text-foreground text-xs truncate">
                            {item.word}
                          </span>
                          <PronounceWordButton word={item.word} size="xs" />
                        </div>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-secondary font-bold text-muted-foreground uppercase shrink-0">
                          {item.type}
                        </span>
                      </div>
                      {item.ipa && (
                        <span className="text-[10px] font-mono text-muted-foreground block">
                          {item.ipa}
                        </span>
                      )}
                      <p className="text-[11px] text-foreground/80 font-medium leading-snug">
                        {item.meaningVi}
                      </p>
                    </div>

                    <div className="pt-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleSaveWord(item)}
                        disabled={isSaved}
                        className={cn(
                          "px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer",
                          isSaved
                            ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 cursor-default"
                            : "bg-primary text-primary-foreground hover:opacity-90 shadow-2xs"
                        )}
                      >
                        {isSaved ? (
                          <>
                            <Check className="h-3 w-3" />
                            <span>Đã lưu ✓</span>
                          </>
                        ) : (
                          <>
                            <BookmarkPlus className="h-3 w-3" />
                            <span>+ Lưu từ</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
