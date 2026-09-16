"use client";

import React, { useState } from "react";
import {
  CoreGrammarTheoryLesson,
} from "@/data/mockGrammarTheoryData";
import { playExaminerSpeech } from "@/lib/aiExaminerClient";
import {
  Award,
  Volume2,
  Sparkles,
  BookOpen,
  ArrowRight,
  Layers,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Languages,
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

interface Band85DissectionSectionProps {
  lesson: CoreGrammarTheoryLesson;
  onProceedToQuiz: () => void;
  className?: string;
}

export function Band85DissectionSection({
  lesson,
  onProceedToQuiz,
  className,
}: Band85DissectionSectionProps) {
  const { step3Band85Dissections } = lesson;
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [showTrans, setShowTrans] = useState<Record<number, boolean>>({});
  const [savedWords, setSavedWords] = useState<Record<string, boolean>>({});
  const { isSaved, toggleBookmark } = useTheoryBookmarks();

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

  const handlePlayAudio = (text: string, idx: number) => {
    setPlayingIndex(idx);
    playExaminerSpeech(text, "strict_examiner", () => {
      setPlayingIndex(null);
    });
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
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm">
          <Award className="h-6 w-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            BƯỚC 3 / 3 • MỔ XẺ VÍ DỤ CHUẨN BAND 8.5+ (HIGH-BAND MODEL DISSECTION)
          </span>
          <h2 className="text-lg sm:text-xl font-black text-foreground mt-0.5">
            Ứng Dụng Cú Pháp Học Thuật Trong Bài Viết Thực Tế
          </h2>
        </div>
      </div>

      {/* Dissection Cards */}
      <div className="space-y-5">
        {step3Band85Dissections.academicDissections.map((item, dIdx) => {
          const isPlaying = playingIndex === dIdx;
          const discBmId = `bm_grammar_${lesson.id}_disc_${dIdx}`;
          const isDiscSaved = isSaved(discBmId);
          const isTransVisible = showTrans[dIdx] ?? true;

          return (
            <div
              key={dIdx}
              className={cn(
                "p-5 sm:p-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.02] space-y-4 text-xs transition-all",
                isDiscSaved && "ring-2 ring-amber-500/30 border-amber-500/40"
              )}
            >
              {/* Item Header & Dedicated Bookmark */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-border/60 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500 text-white font-mono font-black text-[10px]">
                    {item.bandLevel}
                  </span>
                  <span className="text-[11px] font-bold text-foreground font-mono">
                    {item.grammaticalFeature}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <TheorySpeakerButton
                    text={`Cấu trúc ${item.grammaticalFeature} Band ${item.bandLevel}. Câu mẫu: "${item.originalSentence}". Sắc thái học thuật: ${item.academicNuanceVi}`}
                    title="Nghe đọc câu mẫu và phân tích học thuật"
                    label="Đọc câu mẫu"
                    size="sm"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      toggleBookmark({
                        id: discBmId,
                        lessonId: lesson.id,
                        lessonTitle: lesson.title,
                        skill: "grammar",
                        category: "model",
                        categoryLabelVi: "Câu Mẫu Ngữ Pháp Band 8.5+",
                        title: `Mẫu Band 8.5+: ${item.grammaticalFeature}`,
                        content: `"${item.originalSentence}"\nNuance: ${item.academicNuanceVi}`,
                        excerptText: item.originalSentence,
                        translationVi: item.vietnameseTranslation,
                        wordBreakdown: item.wordBreakdown,
                        lessonHref: `/theory/${lesson.id}`,
                      })
                    }
                    className={cn(
                      "px-3 py-1 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition-all shadow-2xs",
                      isDiscSaved
                        ? "bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-600 font-black"
                        : "bg-secondary/70 hover:bg-secondary border-border text-foreground/90"
                    )}
                    title="Lưu câu mẫu Band 8.5+ này vào Sổ Cần Nhớ"
                  >
                    {isDiscSaved ? (
                      <>
                        <BookmarkCheck className="h-3.5 w-3.5 fill-current" />
                        <span>★ Đã Lưu Vào Sổ</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-3.5 w-3.5 text-amber-500" />
                        <span>☆ Lưu Câu Mẫu Này</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Sentence Card with Audio Play button & Translation */}
              <TheoryMaskableContent
                itemId={`recall_grammar_${lesson.id}_disc_${dIdx}`}
                itemTitle={`Mổ xẻ Band 8.5+: ${item.grammaticalFeature}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 p-4 rounded-2xl bg-card border border-border shadow-xs">
                  <div className="space-y-1.5 flex-1">
                    <p className="font-serif font-bold text-foreground text-sm sm:text-base leading-relaxed">
                      &ldquo;{item.originalSentence}&rdquo;
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePlayAudio(item.originalSentence, dIdx)}
                    className={cn(
                      "p-3 rounded-2xl border transition-all flex items-center gap-1.5 cursor-pointer shrink-0 self-start sm:self-auto",
                      isPlaying
                        ? "bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-500/40 animate-pulse"
                        : "bg-secondary text-foreground hover:bg-secondary/80 border-border"
                    )}
                    title="Nghe phát âm giọng chuẩn Anh - Anh"
                  >
                    <Volume2 className="h-4 w-4" />
                    <span className="text-[10px] font-bold font-mono">
                      {isPlaying ? "Đang đọc..." : "Nghe Audio"}
                    </span>
                  </button>
                </div>

                {/* Vietnamese Translation of Original Sentence */}
                {item.vietnameseTranslation && (
                  <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border/70 space-y-1 mt-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                        <Languages className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        Bản Dịch Tiếng Việt Chuẩn Nghĩa:
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setShowTrans((prev) => ({ ...prev, [dIdx]: !isTransVisible }))
                        }
                        className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                      >
                        {isTransVisible ? "Thu gọn" : "Xem dịch"}
                      </button>
                    </div>
                    {isTransVisible && (
                      <p className="text-xs text-foreground/90 leading-relaxed font-medium pt-0.5 animate-in fade-in">
                        {item.vietnameseTranslation}
                      </p>
                    )}
                  </div>
                )}
              </TheoryMaskableContent>

              {/* Vocabulary Breakdown for Dissection */}
              {item.wordBreakdown && item.wordBreakdown.length > 0 && (() => {
                const recWords = item.wordBreakdown.filter((w) => isRecommendedBand75Word(w, "grammar"));
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
                            onClick={() => handleSaveAllWords(recWords, item.originalSentence)}
                            className="text-[10px] font-black text-amber-800 dark:text-amber-200 border border-amber-500/40 bg-amber-500/20 hover:bg-amber-500/30 px-2.5 py-0.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-2xs"
                            title="Lưu các từ vựng & cấu trúc ngữ pháp chuẩn điểm cho chiến lược 7.5 Overall"
                          >
                            <Star className="h-3 w-3 fill-amber-500 text-amber-500 shrink-0" />
                            <span>Lưu {recWords.length} từ cần cho 7.5 (Cú pháp 6.5+)</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleSaveAllWords(item.wordBreakdown || [], item.originalSentence)}
                          className="text-[10px] font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Lưu tất cả</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {item.wordBreakdown.map((wItem, wIdx) => {
                        const isWordSaved = savedWords[wItem.word];
                        const recInfo = getRecommendationBadgeInfo(wItem, "grammar");
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
                                <span className="font-bold text-foreground font-mono text-[11px]">{wItem.word}</span>
                                <PronounceWordButton word={wItem.word} size="xs" />
                                <span className="text-[9px] text-muted-foreground font-mono">{wItem.ipa}</span>
                                <span className="text-[8px] px-1 rounded bg-secondary text-muted-foreground uppercase">{wItem.type}</span>
                              </div>
                              <p className="text-[10px] text-foreground/80 truncate mt-0.5">{wItem.meaningVi}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleSaveWord(wItem, item.originalSentence)}
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

              {/* Academic Nuance Explanation */}
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-1.5">
                <span className="font-extrabold text-foreground font-mono text-[10px] uppercase block">
                  SẮC THÁI HỌC THUẬT & TÍNH SƯ PHẠM (ACADEMIC NUANCE):
                </span>
                <p className="text-foreground/90 leading-relaxed font-medium">
                  {item.academicNuanceVi}
                </p>
              </div>

              {/* Key AWL Collocations with 1-Click Save */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 uppercase block">
                      Cụm từ vựng học thuật trọng điểm (Collocations):
                    </span>
                    <Band75RecommendationBadge skill="grammar" bandTarget="7.5 (Cú pháp 6.5+)" compact />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">Bấm [+] để lưu vào Sổ FSRS</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.keyCollocations.map((col, cIdx) => {
                    const isSavedCol = savedWords[col];
                    return (
                      <div
                        key={cIdx}
                        className={cn(
                          "px-2.5 py-1 rounded-xl border font-mono font-bold text-[11px] shadow-xs flex items-center gap-1.5 transition-all",
                          isSavedCol
                            ? "bg-emerald-600 text-white border-emerald-700 font-black"
                            : "bg-card border-amber-500/30 hover:border-amber-500/50 text-foreground"
                        )}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            handleSaveWord(
                              { word: col, ipa: "", type: "collocation", meaningVi: "Cụm collocations học thuật IELTS" },
                              item.originalSentence
                            )
                          }
                          className="flex items-center gap-1.5 cursor-pointer hover:underline"
                          title="Lưu cụm từ này vào Sổ FSRS"
                        >
                          <span>{col}</span>
                          {isSavedCol ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Plus className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                          )}
                        </button>
                        <PronounceWordButton
                          word={col}
                          size="xs"
                          iconClassName={isSavedCol ? "text-white" : undefined}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <TheoryItemRecallBox
                itemId={`recall_grammar_${lesson.id}_disc_${dIdx}`}
                itemTitle={`Mổ xẻ Band 8.5+: ${item.grammaticalFeature}`}
                targetText={`Câu mẫu: ${item.originalSentence}. Sắc thái học thuật: ${item.academicNuanceVi}`}
                lessonTitle={lesson.title}
              />
            </div>
          );
        })}
      </div>

      {/* Active Recall Knowledge Check Widget */}
      <ActiveRecallCheckWidget
        lesson={lesson}
        stepNumber={3}
        stepTitle="Mổ Xẻ Ví Dụ Chuẩn Band 8.5+"
      />

      {/* Bottom CTA to Gateway Quiz */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={onProceedToQuiz}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-600/30 flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
        >
          <span>Làm Cổng Trắc Nghiệm Mở Khóa Thực Hành (≥80%)</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
