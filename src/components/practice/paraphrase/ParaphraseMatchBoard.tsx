"use client";

import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  Plus,
  Check,
  ArrowRight,
  Layers,
  Award,
} from "lucide-react";
import { ParaphrasePair } from "@/data/mockParaphraseData";
import { useParaphraseMatcher } from "@/hooks/useParaphraseMatcher";
import { ParaphraseMatchCard } from "@/components/practice/paraphrase/ParaphraseMatchCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { db } from "@/lib/db";
import { VocabCard, ErrorItem } from "@/types/database";
import { cn } from "@/lib/utils";

interface ParaphraseMatchBoardProps {
  pairs: ParaphrasePair[];
  onComplete?: () => void;
  className?: string;
}

export function ParaphraseMatchBoard({
  pairs,
  onComplete,
  className,
}: ParaphraseMatchBoardProps) {
  const {
    leftItems,
    rightItems,
    selectedLeftId,
    selectedRightId,
    matchedPairIds,
    mismatchPair,
    lastMatchedPair,
    score,
    attempts,
    isCompleted,
    selectCard,
    resetBoard,
  } = useParaphraseMatcher(pairs);

  const [savedVocabIds, setSavedVocabIds] = useState<Record<string, boolean>>({});

  const handleSaveToFSRS = async (pair: ParaphrasePair) => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const newCard: VocabCard = {
        id: `vocab_para_${pair.id}_${Date.now()}`,
        word: pair.questionKeyword,
        ipa: "",
        meaning: `${pair.vietnameseMeaning} (Đồng nghĩa với: '${pair.passageMatch}')`,
        collocations: [pair.passageMatch],
        originalContext: `[Paraphrase Mapping] Question: "${pair.ieltsExampleContext.questionSentence}" ➔ Passage: "${pair.ieltsExampleContext.passageSentence}"`,
        category: "awl_570",
        status: "new",
        stepInterval: 1,
        nextReviewDate: today,
        repetitionCount: 0,
        lapsesCount: 0,
        stability: 1.0,
        difficulty: 5.0,
        createdAt: new Date().toISOString(),
      };

      await db.vocab_matrix.put(newCard);
      setSavedVocabIds((prev) => ({ ...prev, [pair.id]: true }));
    } catch (e) {
      console.error("Failed to save paraphrase to vocab matrix:", e);
    }
  };

  const totalPairs = pairs.length;
  const progressPercent = Math.round((matchedPairIds.length / totalPairs) * 100);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Top Header & Progress */}
      <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">
              Tiến Độ Ghép Cặp: {matchedPairIds.length} / {totalPairs} cặp
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold uppercase text-[10px] border border-indigo-500/20">
              {progressPercent}% Hoàn Thành
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              Số lần thử: <strong>{attempts}</strong>
            </span>
            <button
              type="button"
              onClick={resetBoard}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Xáo trộn lại
            </button>
          </div>
        </div>

        <ProgressBar value={progressPercent} size="sm" variant="primary" />
      </div>

      {/* 2-Column Matching Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        {/* Left Column: Question Keywords */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              Từ Khóa Trong Câu Hỏi (Question Keywords)
            </span>
          </div>

          <div className="space-y-2.5">
            {leftItems.map((item) => {
              const isMatched = matchedPairIds.includes(item.pairId);
              const isSelected = selectedLeftId === item.id;
              const isMismatch = mismatchPair?.leftId === item.id;
              const pairObj = pairs.find((p) => p.id === item.pairId);

              return (
                <ParaphraseMatchCard
                  key={item.id}
                  id={item.id}
                  text={item.text}
                  side="left"
                  isSelected={isSelected}
                  isMatched={isMatched}
                  isMismatch={isMismatch}
                  matchedTechniqueLabel={pairObj?.techniqueLabelVi}
                  onClick={() => selectCard("left", item.id)}
                />
              );
            })}
          </div>
        </div>

        {/* Right Column: Shuffled Passage Paraphrases */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-purple-500" />
              Cụm Từ Tương Đương Trong Bài Đọc (Passage Matches)
            </span>
          </div>

          <div className="space-y-2.5">
            {rightItems.map((item) => {
              const isMatched = matchedPairIds.includes(item.pairId);
              const isSelected = selectedRightId === item.id;
              const isMismatch = mismatchPair?.rightId === item.id;
              const pairObj = pairs.find((p) => p.id === item.pairId);

              return (
                <ParaphraseMatchCard
                  key={item.id}
                  id={item.id}
                  text={item.text}
                  side="right"
                  isSelected={isSelected}
                  isMatched={isMatched}
                  isMismatch={isMismatch}
                  matchedTechniqueLabel={pairObj?.techniqueLabelVi}
                  onClick={() => selectCard("right", item.id)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Mismatch Alert Box */}
      {mismatchPair && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2 animate-in fade-in duration-150">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>Hai cụm từ bạn chọn không đồng nghĩa trong văn cảnh học thuật. Hãy thử lại!</span>
        </div>
      )}

      {/* Last Matched Pair In-Depth Analysis */}
      {lastMatchedPair && (
        <div className="p-5 sm:p-6 rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-card to-emerald-500/[0.03] space-y-3 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> {lastMatchedPair.techniqueLabelVi}
            </span>

            <button
              type="button"
              onClick={() => handleSaveToFSRS(lastMatchedPair)}
              disabled={savedVocabIds[lastMatchedPair.id]}
              className={cn(
                "px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer",
                savedVocabIds[lastMatchedPair.id]
                  ? "bg-emerald-600 text-white"
                  : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
              )}
            >
              {savedVocabIds[lastMatchedPair.id] ? (
                <>
                  <Check className="h-3 w-3" />
                  <span>Đã lưu vào FSRS</span>
                </>
              ) : (
                <>
                  <Plus className="h-3 w-3" />
                  <span>Lưu cặp từ vào Sổ FSRS</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-foreground">
              <span className="text-indigo-600 dark:text-indigo-400">
                "{lastMatchedPair.questionKeyword}"
              </span>
              <span>↔</span>
              <span className="text-purple-600 dark:text-purple-400">
                "{lastMatchedPair.passageMatch}"
              </span>
            </div>
            <p className="text-muted-foreground">
              Nghĩa: <strong>{lastMatchedPair.vietnameseMeaning}</strong>
            </p>
            <p className="text-muted-foreground leading-relaxed pt-1">
              💡 {lastMatchedPair.explanation}
            </p>
          </div>
        </div>
      )}

      {/* Completion Banner */}
      {isCompleted && (
        <div className="p-6 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-card via-indigo-500/[0.05] to-card text-center space-y-3 shadow-md animate-in fade-in duration-300">
          <Award className="h-10 w-10 text-indigo-500 mx-auto" />
          <h3 className="text-lg font-extrabold text-foreground">
            Chúc mừng! Bạn đã hoàn thành xuất sắc bản đồ Paraphrase!
          </h3>
          <p className="text-xs text-muted-foreground">
            Đã làm chủ toàn bộ 4 cơ chế bẫy từ đồng nghĩa của giám khảo Cambridge.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              type="button"
              onClick={resetBoard}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              Luyện tập lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
