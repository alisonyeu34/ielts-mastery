"use client";

import React, { useState } from "react";
import { EssayAnnotationToken } from "@/data/mockWritingBlueprintsData";
import {
  Sparkles,
  BookOpen,
  Info,
  CheckCircle2,
  Layers,
  Bookmark,
  BookmarkCheck,
  Languages,
  Plus,
  Check,
  Star,
} from "lucide-react";
import {
  useTheoryBookmarks,
  saveWordToVocabMatrix,
  isRecommendedBand75Word,
  getRecommendationBadgeInfo,
} from "@/lib/theoryBookmarks";
import { VocabBreakdownWord } from "@/types/theoryBookmarks";
import { PronounceWordButton } from "../PronounceWordButton";
import { Band75RecommendationBadge } from "../Band75RecommendationBadge";
import { TheorySpeakerButton } from "../TheorySpeakerButton";
import { TheoryItemRecallBox } from "../TheoryItemRecallBox";
import { TheoryMaskableContent } from "../TheoryMaskableContent";
import { cn } from "@/lib/utils";

interface ModelEssayAnnotatorProps {
  promptTitle: string;
  annotatedParagraphs?: Array<{
    paragraphName: string;
    tokens: EssayAnnotationToken[];
    paragraphTranslationVi?: string;
    wordBreakdown?: VocabBreakdownWord[];
  }>;
  paragraphs?: Array<{
    paragraphName: string;
    tokens: EssayAnnotationToken[];
    paragraphTranslationVi?: string;
    wordBreakdown?: VocabBreakdownWord[];
  }>;
  academicCollocations: string[];
  concludingFormula?: string;
  concludingFormulaVi?: string;
  lessonId?: string;
  lessonTitle?: string;
  className?: string;
}

export function ModelEssayAnnotator({
  promptTitle,
  annotatedParagraphs,
  paragraphs,
  academicCollocations,
  concludingFormula,
  concludingFormulaVi,
  lessonId = "writing-model-essay",
  lessonTitle = "Writing Model Essay",
  className,
}: ModelEssayAnnotatorProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [showTrans, setShowTrans] = useState<Record<number, boolean>>({});
  const [savedWords, setSavedWords] = useState<Record<string, boolean>>({});
  const { isSaved, toggleBookmark } = useTheoryBookmarks();

  const activeParagraphs = annotatedParagraphs || paragraphs || [];
  const formula = concludingFormula || concludingFormulaVi || "";

  const fullEssayText = activeParagraphs
    .map((p) => `${p.paragraphName}:\n${p.tokens.map((t) => t.text).join("")}`)
    .join("\n\n");

  const essayBmId = `bm_writing_model_${lessonId}`;
  const isEssaySaved = isSaved(essayBmId);

  const handleSaveWord = async (item: VocabBreakdownWord, contextSentence?: string) => {
    if (savedWords[item.word]) return;
    const ok = await saveWordToVocabMatrix({
      word: item.word,
      ipa: item.ipa,
      type: item.type,
      meaningVi: item.meaningVi,
      context: contextSentence || promptTitle,
      sourceModule: "writing",
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
        context: contextSentence || promptTitle,
        sourceModule: "writing",
      });
    }
    const updated = { ...savedWords };
    words.forEach((w) => {
      updated[w.word] = true;
    });
    setSavedWords(updated);
  };

  const getStyleForToken = (type: EssayAnnotationToken["type"]) => {
    switch (type) {
      case "thesis":
        return "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border-b-2 border-emerald-500 font-bold";
      case "topic_sentence":
        return "bg-blue-500/15 text-blue-800 dark:text-blue-200 border-b-2 border-blue-500 font-bold";
      case "causal_chain":
        return "bg-purple-500/15 text-purple-800 dark:text-purple-200 border-b-2 border-purple-500 font-medium";
      case "example":
        return "bg-amber-500/15 text-amber-800 dark:text-amber-200 border-b-2 border-amber-500 font-medium";
      case "hedging":
        return "bg-rose-500/15 text-rose-800 dark:text-rose-200 border-b-2 border-rose-500 font-bold italic";
      default:
        return "text-foreground";
    }
  };

  return (
    <div
      className={cn(
        "p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-6 select-none transition-all",
        isEssaySaved && "ring-2 ring-amber-500/30 border-amber-500/40",
        className
      )}
    >
      {/* Header & Prompt & Bookmark Button */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            MỔ XẺ BÀI VIẾT MẪU BAND 8.5+ CÓ BÔI MÀU CẤU TRÚC (STRUCTURE ANNOTATOR)
          </span>
          <h3 className="text-base sm:text-lg font-black text-foreground">
            &ldquo;{promptTitle}&rdquo;
          </h3>
        </div>

        {/* Dedicated bookmark button for the entire model essay */}
        <button
          type="button"
          onClick={() =>
            toggleBookmark({
              id: essayBmId,
              lessonId,
              lessonTitle,
              skill: "writing",
              category: "model",
              categoryLabelVi: "Bài Viết Mẫu Band 8.5+",
              title: `Bài Mẫu: ${promptTitle}`,
              content: fullEssayText,
              excerptText: fullEssayText,
              lessonHref: `/theory/writing-blueprints/${lessonId}`,
            })
          }
          className={cn(
            "px-3 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition-all shadow-2xs shrink-0",
            isEssaySaved
              ? "bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-600 font-black"
              : "bg-secondary/70 hover:bg-secondary border-border text-foreground/90"
          )}
          title="Lưu toàn bộ bài viết mẫu này vào Sổ Cần Nhớ"
        >
          {isEssaySaved ? (
            <>
              <BookmarkCheck className="h-3.5 w-3.5 fill-current" />
              <span>★ Đã Lưu Toàn Bài Vào Sổ</span>
            </>
          ) : (
            <>
              <Bookmark className="h-3.5 w-3.5 text-amber-500" />
              <span>☆ Lưu Toàn Bộ Bài Mẫu</span>
            </>
          )}
        </button>
      </div>

      {/* Legend Bar */}
      <div className="flex flex-wrap gap-2 p-3.5 rounded-2xl bg-secondary/30 border border-border/80 text-[11px] font-mono font-bold">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-emerald-500" />
          <span>Thesis Statement</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-blue-500" />
          <span>Topic Sentence</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-purple-500" />
          <span>Causal Chain (Chuỗi nhân quả)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-amber-500" />
          <span>Example</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-rose-500" />
          <span>Academic Hedging</span>
        </div>
      </div>

      {/* Annotated Paragraphs */}
      <div className="space-y-5">
        {activeParagraphs.map((para, pIdx) => {
          const paraBmId = `bm_writing_${lessonId}_para_${pIdx}`;
          const isParaSaved = isSaved(paraBmId);
          const paraText = para.tokens.map((t) => t.text).join("");
          const isTransVisible = showTrans[pIdx] ?? true;

          return (
            <div
              key={pIdx}
              className={cn(
                "p-5 rounded-3xl border border-border bg-card space-y-3 text-xs shadow-xs transition-all",
                isParaSaved && "ring-1 ring-amber-500/30 border-amber-500/40"
              )}
            >
              <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase block">
                  {para.paragraphName}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      toggleBookmark({
                        id: paraBmId,
                        lessonId,
                        lessonTitle,
                        skill: "writing",
                        category: "model",
                        categoryLabelVi: "Đoạn Văn Mẫu Writing",
                        title: `${lessonTitle} • ${para.paragraphName}`,
                        content: paraText,
                        excerptText: paraText,
                        translationVi: para.paragraphTranslationVi,
                        wordBreakdown: para.wordBreakdown,
                        lessonHref: `/theory/writing-blueprints/${lessonId}`,
                      })
                    }
                    className={cn(
                      "px-2 py-0.5 rounded-lg border text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all",
                      isParaSaved
                        ? "bg-amber-500 text-slate-950 border-amber-600 font-black"
                        : "bg-secondary text-muted-foreground hover:text-foreground border-border"
                    )}
                    title="Lưu đoạn văn này vào Sổ Cần Nhớ"
                  >
                    {isParaSaved ? (
                      <>
                        <BookmarkCheck className="h-3 w-3 fill-current" />
                        <span>Đã lưu đoạn</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-3 w-3 text-amber-500" />
                        <span>Lưu đoạn</span>
                      </>
                    )}
                  </button>
                  <PronounceWordButton word={paraText} size="xs" title="Nghe đọc đoạn văn này" />
                </div>
              </div>

              <p className="font-serif text-sm sm:text-base leading-relaxed">
                {para.tokens.map((token, tIdx) => (
                  <span
                    key={tIdx}
                    className={cn(
                      "transition-colors rounded-sm px-0.5 cursor-pointer relative",
                      getStyleForToken(token.type)
                    )}
                    onMouseEnter={() => token.annotationNoteVi && setActiveTooltip(token.annotationNoteVi)}
                    onMouseLeave={() => setActiveTooltip(null)}
                    title={token.annotationNoteVi}
                  >
                    {token.text}
                  </span>
                ))}
              </p>

              {/* Vietnamese Translation of Paragraph */}
              {para.paragraphTranslationVi && (
                <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border/70 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                      <Languages className="h-3.5 w-3.5 text-blue-500" />
                      Bản Dịch Tiếng Việt Dễ Hiểu:
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setShowTrans((prev) => ({ ...prev, [pIdx]: !isTransVisible }))
                      }
                      className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      {isTransVisible ? "Thu gọn" : "Xem dịch"}
                    </button>
                  </div>

                  {isTransVisible && (
                    <p className="text-xs text-foreground/90 leading-relaxed pt-0.5 animate-in fade-in">
                      {para.paragraphTranslationVi}
                    </p>
                  )}
                </div>
              )}

              {/* Word Breakdown for Paragraph */}
              {para.wordBreakdown && para.wordBreakdown.length > 0 && (() => {
                const recWords = para.wordBreakdown.filter((w) => isRecommendedBand75Word(w, "writing"));
                return (
                  <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border/60 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 uppercase flex items-center gap-1">
                          <Sparkles className="h-3 w-3 text-emerald-500" />
                          Tách Nghĩa Từ Vựng Điểm Cao (Lưu FSRS):
                        </span>
                        <span className="text-[9px] font-mono font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded border border-border/70">
                          🎯 Lộ trình 7.5: <strong>Mục tiêu 6.5 Writing</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {recWords.length > 0 && (
                          <button
                            type="button"
                            onClick={() => handleSaveAllWords(recWords, paraText)}
                            className="text-[10px] font-black text-amber-800 dark:text-amber-200 border border-amber-500/40 bg-amber-500/20 hover:bg-amber-500/30 px-2.5 py-0.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-2xs"
                            title="Chỉ lưu các collocation & liên từ chuẩn xác cho mục tiêu 6.5 Writing trong lộ trình 7.5"
                          >
                            <Star className="h-3 w-3 fill-amber-500 text-amber-500 shrink-0" />
                            <span>Lưu {recWords.length} từ cần cho 6.5 Wri</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleSaveAllWords(para.wordBreakdown || [], paraText)}
                          className="text-[10px] font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Lưu tất cả</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {para.wordBreakdown.map((item, wIdx) => {
                        const isWordSaved = savedWords[item.word];
                        const recInfo = getRecommendationBadgeInfo(item, "writing");
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
                                    skill="writing"
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
                              onClick={() => handleSaveWord(item, paraText)}
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
            </div>
          );
        })}
      </div>

      {/* Hover Tooltip Insight */}
      {activeTooltip && (
        <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-900 dark:text-indigo-200 text-xs font-mono font-bold animate-in fade-in flex items-center gap-2">
          <Info className="h-4 w-4 text-indigo-500 shrink-0" />
          <span>💡 Phân tích sư phạm: {activeTooltip}</span>
        </div>
      )}

      {/* Academic Collocations List with 1-Click Save */}
      <div className="space-y-2 pt-2 border-t border-border/80 text-xs">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 uppercase block">
              Cụm từ vựng học thuật ghi điểm cao trong bài mẫu (Collocations):
            </span>
            <Band75RecommendationBadge skill="writing" bandTarget="6.5 Wri" compact />
          </div>
          <span className="text-[10px] text-muted-foreground font-mono">Bấm [+] để lưu vào Sổ FSRS</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {academicCollocations.map((col, cIdx) => {
            const isSavedCol = savedWords[col];
            return (
              <div
                key={cIdx}
                className={cn(
                  "px-2.5 py-1 rounded-xl font-mono font-bold text-[11px] shadow-xs border flex items-center gap-1.5 transition-all",
                  isSavedCol
                    ? "bg-emerald-600 text-white border-emerald-700 font-black"
                    : "bg-card border-emerald-500/30 text-foreground"
                )}
              >
                <button
                  type="button"
                  onClick={() =>
                    handleSaveWord(
                      { word: col, ipa: "", type: "collocation", meaningVi: "Cụm từ học thuật ghi điểm Writing Band 8.0+" },
                      promptTitle
                    )
                  }
                  className="flex items-center gap-1.5 cursor-pointer hover:underline"
                  title="Lưu cụm collocations này vào Sổ FSRS"
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

      {/* Concluding Formula */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-2 text-xs">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[10px] font-mono font-bold text-blue-400 uppercase block">
            KHUNG CÔNG THỨC ĐÚC KẾT BAND 8.0+:
          </span>
          <TheorySpeakerButton
            text={`Khung công thức đúc kết: ${formula}`}
            title="Nghe đọc công thức"
            label="Đọc công thức"
            size="sm"
          />
        </div>
        <TheoryMaskableContent
          itemId={`recall_writing_${lessonId}_formula`}
          itemTitle="Khung Công Thức Đúc Kết Band 8.0+"
        >
          <p className="font-mono text-blue-300 leading-relaxed font-bold">
            {formula}
          </p>
        </TheoryMaskableContent>
        <TheoryItemRecallBox
          itemId={`recall_writing_${lessonId}_formula`}
          itemTitle="Khung Công Thức Đúc Kết Band 8.0+"
          targetText={formula}
          lessonTitle={lessonTitle}
        />
      </div>
    </div>
  );
}
