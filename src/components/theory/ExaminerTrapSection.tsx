"use client";

import React, { useState } from "react";
import {
  CoreGrammarTheoryLesson,
} from "@/data/mockGrammarTheoryData";
import {
  ShieldAlert,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Languages,
  Sparkles,
  Plus,
  Check,
  Star,
} from "lucide-react";
import { ActiveRecallCheckWidget } from "@/components/theory/ActiveRecallCheckWidget";
import {
  useTheoryBookmarks,
  saveWordToVocabMatrix,
  isRecommendedBand75Word,
  getRecommendationBadgeInfo,
} from "@/lib/theoryBookmarks";
import { VocabBreakdownWord } from "@/types/theoryBookmarks";
import { PronounceWordButton } from "./PronounceWordButton";
import { Band75RecommendationBadge } from "./Band75RecommendationBadge";
import { TheorySpeakerButton } from "./TheorySpeakerButton";
import { TheoryItemRecallBox } from "./TheoryItemRecallBox";
import { TheoryMaskableContent } from "./TheoryMaskableContent";
import { cn } from "@/lib/utils";

interface ExaminerTrapSectionProps {
  lesson: CoreGrammarTheoryLesson;
  onProceedToStep3: () => void;
  className?: string;
}

export function ExaminerTrapSection({
  lesson,
  onProceedToStep3,
  className,
}: ExaminerTrapSectionProps) {
  const { step2Traps } = lesson;
  const { isSaved, toggleBookmark } = useTheoryBookmarks();
  const [savedWords, setSavedWords] = useState<Record<string, boolean>>({});

  const handleSaveWord = async (item: VocabBreakdownWord, contextSentence?: string) => {
    if (savedWords[item.word]) return;
    const ok = await saveWordToVocabMatrix({
      word: item.word,
      ipa: item.ipa,
      type: item.type,
      meaningVi: item.meaningVi,
      context: contextSentence || "",
      sourceModule: "grammar",
    });
    if (ok) {
      setSavedWords((prev) => ({ ...prev, [item.word]: true }));
    }
  };

  const handleSaveAllWords = async (words: VocabBreakdownWord[], contextSentence?: string) => {
    for (const item of words) {
      await saveWordToVocabMatrix({
        word: item.word,
        ipa: item.ipa,
        type: item.type,
        meaningVi: item.meaningVi,
        context: contextSentence || "",
        sourceModule: "grammar",
      });
    }
    const updated = { ...savedWords };
    words.forEach((w) => {
      updated[w.word] = true;
    });
    setSavedWords(updated);
  };

  return (
    <div
      className={cn(
        "p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-6 select-none",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border/80 pb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold shadow-sm">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
            BƯỚC 2 / 3 • VẠCH TRẦN BẪY KHẢO THÍ (EXAMINER TRAP EXPOSURE)
          </span>
          <h2 className="text-lg sm:text-xl font-black text-foreground mt-0.5">
            Các Bẫy Mất Điểm Oan Thường Gặp & Cách Khắc Phục
          </h2>
        </div>
      </div>

      {/* Trap Cards List */}
      <div className="space-y-5">
        {step2Traps.examinerTraps.map((trap, tIdx) => {
          const bookmarkId = `bm_grammar_${lesson.id}_trap_${tIdx}`;
          const saved = isSaved(bookmarkId);
          return (
            <div
              key={tIdx}
              className={cn(
                "p-5 rounded-3xl border border-border bg-secondary/20 space-y-4 text-xs transition-all",
                saved && "border-amber-500/40 ring-1 ring-amber-500/30"
              )}
            >
              {/* Trap Title & Individual Bookmark */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-2.5">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold font-mono text-xs">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>BẪY {tIdx + 1}: {trap.trapNameVi}</span>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <TheorySpeakerButton
                    text={`Bẫy ${tIdx + 1}: ${trap.trapNameVi}. Phân tích lỗi sai: ${trap.band50FlawAnalysisVi}. Lưu ý giám khảo: ${trap.examinerNoteVi}`}
                    title={`Nghe đọc bẫy ${tIdx + 1}`}
                    label="Đọc bẫy"
                    size="sm"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      toggleBookmark({
                        id: bookmarkId,
                        lessonId: lesson.id,
                        lessonTitle: lesson.title,
                        skill: "grammar",
                        category: "trap",
                        categoryLabelVi: "Bẫy Ngữ Pháp",
                        title: `Bẫy: ${trap.trapNameVi}`,
                        content: `Sai: "${trap.band50WrongExample}"\nĐúng: "${trap.band80CorrectExample}"\nLý do: ${trap.band50FlawAnalysisVi}`,
                        lessonHref: `/theory/${lesson.id}`,
                      })
                    }
                    className={cn(
                      "px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all border shadow-2xs",
                      saved
                        ? "bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-600 font-black"
                        : "bg-secondary/70 hover:bg-secondary text-muted-foreground hover:text-foreground border-border"
                    )}
                    title="Lưu bẫy ngữ pháp này vào Sổ Cần Nhớ"
                  >
                    {saved ? (
                      <>
                        <BookmarkCheck className="h-3 w-3 fill-current" />
                        <span>Đã lưu ✓</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-3 w-3 text-amber-500" />
                        <span>Lưu bẫy này</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Side-by-Side Dual Comparison */}
              <TheoryMaskableContent
                itemId={`recall_grammar_${lesson.id}_trap_${tIdx}`}
                itemTitle={`Bẫy ${tIdx + 1}: ${trap.trapNameVi}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Band 5.0 Error */}
                  <div className="p-4 rounded-2xl bg-rose-500/[0.04] border border-rose-500/30 space-y-2">
                    <div className="flex items-center justify-between gap-1 text-rose-600 dark:text-rose-400 font-bold font-mono text-[10px] uppercase">
                      <div className="flex items-center gap-1.5">
                        <XCircle className="h-3.5 w-3.5" />
                        <span>Sai lầm Band 5.0 (Bị trừ điểm GRA):</span>
                      </div>
                      <PronounceWordButton word={trap.band50WrongExample} size="xs" title="Nghe câu mẫu lỗi Band 5.0" />
                    </div>

                    <p className="font-serif line-through text-foreground font-bold text-xs leading-relaxed">
                      &ldquo;{trap.band50WrongExample}&rdquo;
                    </p>

                    {trap.band50TranslationVi && (
                      <div className="pt-1.5 border-t border-rose-500/20 text-[11px] text-muted-foreground flex items-start gap-1.5">
                        <Languages className="h-3 w-3 text-rose-500 shrink-0 mt-0.5" />
                        <span className="italic leading-relaxed">
                          <strong className="text-rose-600 dark:text-rose-400 not-italic">Dịch:</strong> {trap.band50TranslationVi}
                        </span>
                      </div>
                    )}

                    <p className="text-[11px] text-muted-foreground leading-relaxed pt-1 border-t border-rose-500/20">
                      ⚠️ <strong>Nguyên nhân sai:</strong> {trap.band50FlawAnalysisVi}
                    </p>
                  </div>

                  {/* Band 8.0+ Correction */}
                  <div className="p-4 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/30 space-y-2">
                    <div className="flex items-center justify-between gap-1 text-emerald-600 dark:text-emerald-400 font-bold font-mono text-[10px] uppercase">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Cách dùng chuẩn Band 8.0+ (Ăn trọn điểm):</span>
                      </div>
                      <PronounceWordButton word={trap.band80CorrectExample} size="xs" title="Nghe câu chuẩn Band 8.0+" />
                    </div>

                    <p className="font-serif text-foreground font-bold text-xs leading-relaxed">
                      &ldquo;{trap.band80CorrectExample}&rdquo;
                    </p>

                    {trap.band80TranslationVi && (
                      <div className="pt-1.5 border-t border-emerald-500/20 text-[11px] text-foreground/90 flex items-start gap-1.5">
                        <Languages className="h-3 w-3 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">
                          <strong className="text-emerald-600 dark:text-emerald-400">Dịch:</strong> {trap.band80TranslationVi}
                        </span>
                      </div>
                    )}

                    <p className="text-[11px] text-emerald-700 dark:text-emerald-300 leading-relaxed pt-1 border-t border-emerald-500/20 font-medium">
                      💡 <strong>Ghi chú Giám khảo:</strong> {trap.examinerNoteVi}
                    </p>
                  </div>
                </div>
              </TheoryMaskableContent>

              {/* Vocabulary Breakdown for Trap */}
              {trap.wordBreakdown && trap.wordBreakdown.length > 0 && (() => {
                const recWords = trap.wordBreakdown.filter((w) => isRecommendedBand75Word(w, "grammar"));
                return (
                  <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border/70 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 uppercase flex items-center gap-1">
                          <Sparkles className="h-3 w-3 text-emerald-500" />
                          Tách Nghĩa Từ Vựng Điểm Cao (Lưu FSRS):
                        </span>
                        <span className="text-[9px] font-mono font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded border border-border/70">
                          🎯 Lộ trình 7.5: <strong>Cú pháp chuẩn điểm 6.5+</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {recWords.length > 0 && (
                          <button
                            type="button"
                            onClick={() => handleSaveAllWords(recWords, trap.band80CorrectExample)}
                            className="text-[10px] font-black text-amber-800 dark:text-amber-200 border border-amber-500/40 bg-amber-500/20 hover:bg-amber-500/30 px-2.5 py-0.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-2xs"
                            title="Lưu các cấu trúc & từ vựng ngữ pháp chuẩn điểm nâng band toàn diện 7.5"
                          >
                            <Star className="h-3 w-3 fill-amber-500 text-amber-500 shrink-0" />
                            <span>Lưu {recWords.length} từ cần cho 7.5 (Cú pháp 6.5+)</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleSaveAllWords(trap.wordBreakdown || [], trap.band80CorrectExample)}
                          className="text-[10px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Lưu tất cả</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {trap.wordBreakdown.map((item, wIdx) => {
                        const isWordSaved = savedWords[item.word];
                        const recInfo = getRecommendationBadgeInfo(item, "grammar");
                        return (
                          <div
                            key={wIdx}
                            className={cn(
                              "p-2 rounded-xl bg-card border flex items-center justify-between gap-2 shadow-2xs transition-all",
                              recInfo.isRecommended
                                ? "border-amber-500/40 bg-amber-500/[0.03]"
                                : "border-border"
                            )}
                          >
                            <div className="min-w-0 flex-1 space-y-0.5">
                              {recInfo.isRecommended && (
                                <div className="pb-0.5">
                                  <Band75RecommendationBadge
                                    skill="grammar"
                                    bandTarget={recInfo.bandTarget}
                                    reasonVi={recInfo.reasonVi}
                                    compact
                                  />
                                </div>
                              )}
                              <div className="flex items-center gap-1 flex-wrap">
                                <span className="font-bold text-foreground font-mono text-[11px]">{item.word}</span>
                                <PronounceWordButton word={item.word} size="xs" />
                                <span className="text-[9px] text-muted-foreground font-mono">{item.ipa}</span>
                                <span className="text-[8px] px-1 rounded bg-secondary text-muted-foreground uppercase">{item.type}</span>
                              </div>
                              <p className="text-[10px] text-foreground/80 truncate mt-0.5">{item.meaningVi}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleSaveWord(item, trap.band80CorrectExample)}
                              className={cn(
                                "px-2 py-0.5 rounded-lg text-[10px] font-bold shrink-0 flex items-center gap-1 cursor-pointer transition-all",
                                isWordSaved
                                  ? "bg-emerald-500 text-white font-black"
                                  : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                              )}
                              title="Lưu từ vào Sổ FSRS"
                            >
                              {isWordSaved ? (
                                <>
                                  <Check className="h-3 w-3" />
                                  <span>Đã lưu</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="h-3 w-3" />
                                  <span>Lưu</span>
                                </>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              <TheoryItemRecallBox
                itemId={`recall_grammar_${lesson.id}_trap_${tIdx}`}
                itemTitle={`Bẫy ${tIdx + 1}: ${trap.trapNameVi}`}
                targetText={`Sai: ${trap.band50WrongExample}. Đúng: ${trap.band80CorrectExample}. Phân tích: ${trap.band50FlawAnalysisVi}. Lưu ý giám khảo: ${trap.examinerNoteVi}`}
                lessonTitle={lesson.title}
              />
            </div>
          );
        })}
      </div>

      {/* Active Recall Knowledge Check Widget */}
      <ActiveRecallCheckWidget
        lesson={lesson}
        stepNumber={2}
        stepTitle="Bẫy Khảo Thí Thường Gặp"
      />

      {/* Bottom CTA to Step 3 */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={onProceedToStep3}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-extrabold text-xs shadow-md shadow-amber-600/25 flex items-center gap-2 cursor-pointer transition-all"
        >
          <span>Tiếp Tục ➔ Bước 3: Mổ Xẻ Câu Band 8.5+</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
