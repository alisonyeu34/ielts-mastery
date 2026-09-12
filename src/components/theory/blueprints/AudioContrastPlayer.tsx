"use client";

import React, { useState } from "react";
import { SpeakingAudioContrastSample } from "@/data/mockSpeakingBlueprintsData";
import {
  Volume2,
  Square,
  Play,
  Sparkles,
  AlertTriangle,
  Award,
  Languages,
  Bookmark,
  BookmarkCheck,
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
import { cn } from "@/lib/utils";

interface AudioContrastPlayerProps {
  sample?: SpeakingAudioContrastSample;
  audioSample?: SpeakingAudioContrastSample;
  activeAudioType: "band55" | "band85" | null;
  onPlay: (type: "band55" | "band85", text: string) => void;
  onStop: () => void;
  lessonId?: string;
  lessonTitle?: string;
  className?: string;
}

export function AudioContrastPlayer({
  sample,
  audioSample,
  activeAudioType,
  onPlay,
  onStop,
  lessonId = "speaking-audio-contrast",
  lessonTitle = "Speaking Audio Contrast Studio",
  className,
}: AudioContrastPlayerProps) {
  const contrastSample = sample || audioSample;
  const { isSaved, toggleBookmark } = useTheoryBookmarks();
  const [savedWords, setSavedWords] = useState<Record<string, boolean>>({});
  const [showTrans55, setShowTrans55] = useState(true);
  const [showTrans85, setShowTrans85] = useState(true);

  if (!contrastSample) return null;

  const bookmarkId = `bm_speaking_audio_${lessonId}`;
  const saved = isSaved(bookmarkId);

  const handleSaveWord = async (item: VocabBreakdownWord) => {
    if (savedWords[item.word]) return;
    const ok = await saveWordToVocabMatrix({
      word: item.word,
      ipa: item.ipa,
      type: item.type,
      meaningVi: item.meaningVi,
      context: contrastSample.band85Text,
      sourceModule: "speaking",
    });
    if (ok) {
      setSavedWords((prev) => ({ ...prev, [item.word]: true }));
    }
  };

  const handleSaveAllWords = async () => {
    if (!contrastSample.wordBreakdown) return;
    for (const item of contrastSample.wordBreakdown) {
      await saveWordToVocabMatrix({
        word: item.word,
        ipa: item.ipa,
        type: item.type,
        meaningVi: item.meaningVi,
        context: contrastSample.band85Text,
        sourceModule: "speaking",
      });
    }
    const updated: Record<string, boolean> = {};
    contrastSample.wordBreakdown.forEach((w) => {
      updated[w.word] = true;
    });
    setSavedWords(updated);
  };

  return (
    <div
      className={cn(
        "p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-6 select-none transition-all",
        saved && "ring-2 ring-amber-500/30 border-amber-500/40",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold shadow-sm shrink-0">
            <Volume2 className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
              ĐỐI CHIẾU ÂM THANH TRỰC QUAN (AUDIO CONTRAST STUDIO)
            </span>
            <h3 className="text-base sm:text-lg font-black text-foreground mt-0.5">
              So Sánh Câu Trả Lời Band 5.5 vs Chuẩn Xuất Sắc Band 8.5+
            </h3>
          </div>
        </div>

        {/* Dedicated bookmark button */}
        <button
          type="button"
          onClick={() =>
            toggleBookmark({
              id: bookmarkId,
              lessonId,
              lessonTitle,
              skill: "speaking",
              category: "model",
              categoryLabelVi: "Audio Contrast Speaking",
              title: `Audio Contrast: ${lessonTitle}`,
              content: `Band 5.5: "${contrastSample.band55Text}"\nBand 8.5+: "${contrastSample.band85Text}"\nKhuyết điểm: ${contrastSample.band55FlawVi}\nĐiểm sáng: ${contrastSample.band85FeatureVi}`,
              lessonHref: `/theory/speaking-blueprints/${lessonId}`,
            })
          }
          className={cn(
            "px-3 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition-all shadow-2xs",
            saved
              ? "bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-600 font-black"
              : "bg-secondary/70 hover:bg-secondary border-border text-foreground/90"
          )}
          title="Lưu mẫu đối chiếu âm thanh này vào Sổ Cần Nhớ"
        >
          {saved ? (
            <>
              <BookmarkCheck className="h-3.5 w-3.5 fill-current" />
              <span>★ Đã Lưu Vào Sổ Cần Nhớ</span>
            </>
          ) : (
            <>
              <Bookmark className="h-3.5 w-3.5 text-amber-500" />
              <span>☆ Lưu Đối Chiếu Này</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
        {/* Band 5.5 Card */}
        <div
          className={cn(
            "p-5 rounded-3xl border transition-all space-y-3 bg-rose-500/[0.02]",
            activeAudioType === "band55"
              ? "border-rose-500 ring-2 ring-rose-500/20"
              : "border-rose-500/30"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold font-mono text-xs">
              <AlertTriangle className="h-4 w-4" />
              <span>CÂU NÓI BAND 5.5 (CỘC LỐC / NÔNG):</span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (activeAudioType === "band55") onStop();
                else onPlay("band55", contrastSample.band55Text);
              }}
              className={cn(
                "px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm",
                activeAudioType === "band55"
                  ? "bg-rose-600 text-white animate-pulse"
                  : "bg-rose-500/10 text-rose-600 hover:bg-rose-500/20"
              )}
            >
              {activeAudioType === "band55" ? (
                <>
                  <Square className="h-3 w-3" />
                  <span>Dừng</span>
                </>
              ) : (
                <>
                  <Play className="h-3 w-3" />
                  <span>Nghe Band 5.5</span>
                </>
              )}
            </button>
          </div>

          <p className="font-serif text-foreground font-bold text-xs sm:text-sm leading-relaxed p-3.5 rounded-2xl bg-card border border-border">
            &ldquo;{contrastSample.band55Text}&rdquo;
          </p>

          {contrastSample.band55TranslationVi && (
            <div className="p-2.5 rounded-xl bg-secondary/40 border border-border/60 text-[11px] text-muted-foreground flex items-start justify-between gap-2">
              <div className="flex items-start gap-1.5">
                <Languages className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                {showTrans55 ? (
                  <span className="italic leading-relaxed">{contrastSample.band55TranslationVi}</span>
                ) : (
                  <span className="text-[10px] text-muted-foreground italic">Bản dịch tiếng Việt đang ẩn</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowTrans55((p) => !p)}
                className="text-[10px] font-bold text-rose-600 dark:text-rose-400 hover:underline shrink-0"
              >
                {showTrans55 ? "Ẩn" : "Xem"}
              </button>
            </div>
          )}

          <p className="text-[11px] text-rose-800 dark:text-rose-200 leading-relaxed font-medium">
            ⚠️ <strong>Khuyết điểm:</strong> {contrastSample.band55FlawVi}
          </p>
        </div>

        {/* Band 8.5+ Card */}
        <div
          className={cn(
            "p-5 rounded-3xl border transition-all space-y-3 bg-emerald-500/[0.02]",
            activeAudioType === "band85"
              ? "border-emerald-500 ring-2 ring-emerald-500/20"
              : "border-emerald-500/30"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold font-mono text-xs">
              <Award className="h-4 w-4" />
              <span>CÂU NÓI BAND 8.5+ (TỰ NHIÊN / C1):</span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (activeAudioType === "band85") onStop();
                else onPlay("band85", contrastSample.band85Text);
              }}
              className={cn(
                "px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm",
                activeAudioType === "band85"
                  ? "bg-emerald-600 text-white animate-pulse"
                  : "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
              )}
            >
              {activeAudioType === "band85" ? (
                <>
                  <Square className="h-3 w-3" />
                  <span>Dừng</span>
                </>
              ) : (
                <>
                  <Play className="h-3 w-3" />
                  <span>Nghe Band 8.5+</span>
                </>
              )}
            </button>
          </div>

          <p className="font-serif text-foreground font-bold text-xs sm:text-sm leading-relaxed p-3.5 rounded-2xl bg-card border border-border">
            &ldquo;{contrastSample.band85Text}&rdquo;
          </p>

          {contrastSample.band85TranslationVi && (
            <div className="p-2.5 rounded-xl bg-secondary/40 border border-border/60 text-[11px] text-foreground/90 flex items-start justify-between gap-2">
              <div className="flex items-start gap-1.5">
                <Languages className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                {showTrans85 ? (
                  <span className="leading-relaxed">{contrastSample.band85TranslationVi}</span>
                ) : (
                  <span className="text-[10px] text-muted-foreground italic">Bản dịch tiếng Việt đang ẩn</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowTrans85((p) => !p)}
                className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
              >
                {showTrans85 ? "Ẩn" : "Xem"}
              </button>
            </div>
          )}

          <p className="text-[11px] text-emerald-800 dark:text-emerald-200 leading-relaxed font-medium">
            ✨ <strong>Điểm sáng:</strong> {contrastSample.band85FeatureVi}
          </p>
        </div>
      </div>

      {/* Vocabulary Breakdown Section for Audio Contrast */}
      {contrastSample.wordBreakdown && contrastSample.wordBreakdown.length > 0 && (() => {
        const recWords = contrastSample.wordBreakdown.filter((w) => isRecommendedBand75Word(w, "speaking"));
        return (
          <div className="p-4 sm:p-5 rounded-2xl bg-secondary/30 border border-border space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-300 uppercase flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                  Tách Nghĩa Từ Vựng Điểm Cao Trong Đoạn Audio (Lưu FSRS):
                </span>
                <span className="text-[9px] font-mono font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded border border-border/70">
                  🎯 Lộ trình 7.5: <strong>Mục tiêu 6.0 Speaking</strong>
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {recWords.length > 0 && (
                  <button
                    type="button"
                    onClick={async () => {
                      for (const item of recWords) {
                        await handleSaveWord(item);
                      }
                    }}
                    className="text-[10px] font-black text-amber-800 dark:text-amber-200 border border-amber-500/40 bg-amber-500/20 hover:bg-amber-500/30 px-2.5 py-0.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-2xs"
                    title="Chỉ lưu các cụm từ đệm & collocation tự nhiên cho mục tiêu 6.0 Speaking trong lộ trình 7.5"
                  >
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500 shrink-0" />
                    <span>Lưu {recWords.length} từ cần cho 6.0 Speak</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleSaveAllWords}
                  className="text-[10px] font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="h-3 w-3" />
                  <span>Lưu toàn bộ từ</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {contrastSample.wordBreakdown.map((item, wIdx) => {
                const isSavedWord = savedWords[item.word];
                const recInfo = getRecommendationBadgeInfo(item, "speaking");
                return (
                  <div
                    key={wIdx}
                    className={cn(
                      "p-2.5 rounded-xl bg-card border flex items-center justify-between gap-2 shadow-2xs transition-all",
                      recInfo.isRecommended
                        ? "border-amber-500/40 bg-amber-500/[0.03]"
                        : "border-border/80"
                    )}
                  >
                    <div className="min-w-0 flex-1 space-y-0.5">
                      {recInfo.isRecommended && (
                        <div className="pb-0.5">
                          <Band75RecommendationBadge
                            skill="speaking"
                            bandTarget={recInfo.bandTarget}
                            reasonVi={recInfo.reasonVi}
                            compact
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-foreground font-mono text-xs">{item.word}</span>
                        <PronounceWordButton word={item.word} size="xs" />
                        <span className="text-[10px] text-muted-foreground font-mono">{item.ipa}</span>
                        <span className="text-[9px] px-1 rounded bg-secondary text-muted-foreground uppercase">{item.type}</span>
                      </div>
                      <p className="text-[11px] text-foreground/80 truncate mt-0.5">{item.meaningVi}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSaveWord(item)}
                      className={cn(
                        "px-2 py-1 rounded-lg text-[10px] font-bold shrink-0 flex items-center gap-1 cursor-pointer transition-all",
                        isSavedWord
                          ? "bg-emerald-500 text-white font-black"
                          : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                      )}
                      title="Lưu từ vào sổ từ vựng FSRS"
                    >
                      {isSavedWord ? (
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
}
