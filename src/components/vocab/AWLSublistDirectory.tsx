"use client";

import React, { useState } from "react";
import {
  Layers,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  Plus,
  ArrowRight,
  Filter,
  BookOpen,
} from "lucide-react";
import { VocabCard } from "@/types/database";
import { MOCK_AWL_570_ENTRIES, AWLWordEntry } from "@/data/mockAWL570Data";
import { cn } from "@/lib/utils";

interface AWLSublistDirectoryProps {
  allCards: VocabCard[];
  onSelectWord: (card: VocabCard) => void;
  onEnqueueSublist: (sublist: number) => void;
  onOpenHarvestDrawer: () => void;
}

export function AWLSublistDirectory({
  allCards,
  onSelectWord,
  onEnqueueSublist,
  onOpenHarvestDrawer,
}: AWLSublistDirectoryProps) {
  const [selectedSublist, setSelectedSublist] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Total AWL statistics (optimized single-pass O(N) lookup)
  const sublistCounts = React.useMemo(() => {
    const cardMap = new Map<string, VocabCard>();
    for (let i = 0; i < allCards.length; i++) {
      const c = allCards[i];
      cardMap.set(c.word.toLowerCase(), c);
    }

    const counts: Record<number, { total: number; mastered: number; learning: number; newWords: number }> = {};
    for (let s = 1; s <= 10; s++) {
      counts[s] = { total: 0, mastered: 0, learning: 0, newWords: 0 };
    }

    for (let i = 0; i < MOCK_AWL_570_ENTRIES.length; i++) {
      const w = MOCK_AWL_570_ENTRIES[i];
      const s = w.sublist;
      if (!counts[s]) counts[s] = { total: 0, mastered: 0, learning: 0, newWords: 0 };
      counts[s].total++;
      const card = cardMap.get(w.term.toLowerCase());
      if (card) {
        if (card.status === "mastered" || (card.stability && card.stability >= 21)) {
          counts[s].mastered++;
        } else if (card.status === "learning" || card.status === "review") {
          counts[s].learning++;
        } else {
          counts[s].newWords++;
        }
      } else {
        counts[s].newWords++;
      }
    }
    return counts;
  }, [allCards]);

  const wordsForCurrentSublist = React.useMemo(() => {
    return MOCK_AWL_570_ENTRIES.filter((w) => {
      const matchSub = w.sublist === selectedSublist;
      const matchQuery =
        !searchTerm ||
        w.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.vietnameseMeaning.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSub && matchQuery;
    });
  }, [selectedSublist, searchTerm]);

  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-4">
        <div className="space-y-0.5">
          <h3 className="text-base sm:text-lg font-black text-foreground flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            Ma Trận 570 Từ Học Thuật AWL (10 Sublists)
          </h3>
          <p className="text-xs text-muted-foreground">
            Lộ trình từ vựng học thuật cốt lõi phân tầng từ Sublist 1 (tần suất cao nhất) đến Sublist 10
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenHarvestDrawer}
            className="px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            Thu Hoạch Từ Mới
          </button>
        </div>
      </div>

      {/* 2-Tier Architecture Callout for Reading 8.5 */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 via-card to-blue-500/10 border border-purple-500/20 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-black text-foreground flex items-center gap-1.5">
            <span>🛡️</span> Chiến Lược Từ Vựng 2 Tầng Phục Vụ Reading 8.5 (37–38/40 Câu):
          </span>
          <span className="font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-500/15 border border-purple-500/30 px-2.5 py-0.5 rounded-lg">
            Mục Tiêu: 2.500+ Từ
          </span>
        </div>
        <div className="text-muted-foreground leading-relaxed space-y-1">
          <div>
            • <strong>Tầng 1 (570 từ AWL qua 10 Sublists):</strong> Nền tảng học thuật học thuộc lòng cho mức <strong>Band 5.5 – 6.0</strong>.
          </div>
          <div>
            • <strong>Tầng 2 (2.000 – 2.500 từ chuyên ngành Passage 3):</strong> Môi trường & Khí hậu, Khảo cổ & Lịch sử, Tâm lý học, Công nghệ AI, Y sinh... Đọc đến đâu nạp đến đó để tự tin xử lý trọn vẹn mọi bài đọc khó nhất.
          </div>
        </div>
      </div>

      {/* Sublist Navigation Grid (1 -> 10) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((s) => {
          const stats = sublistCounts[s] || { total: 60, mastered: 0, learning: 0, newWords: 60 };
          const percent = Math.round((stats.mastered / stats.total) * 100);

          return (
            <button
              key={s}
              type="button"
              onClick={() => setSelectedSublist(s)}
              className={cn(
                "p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1.5",
                selectedSublist === s
                  ? "border-primary bg-primary/10 shadow-sm"
                  : "border-border bg-secondary/30 hover:bg-secondary"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black text-foreground">
                  Sublist {s}
                </span>
                <span className="text-[10px] font-mono font-bold text-primary">
                  {percent}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <span className="text-[10px] text-muted-foreground font-medium">
                {stats.mastered}/{stats.total} từ
              </span>
            </button>
          );
        })}
      </div>

      {/* Sublist Action Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-secondary/30 border border-border">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">
            S{selectedSublist}
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground">
              Đang xem: Sublist {selectedSublist} ({wordsForCurrentSublist.length} từ hiển thị)
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Bao gồm các từ học thuật tần suất cao nhất trong kỳ thi IELTS Academic
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Lọc từ vựng..."
              className="pl-8 pr-3 py-1.5 rounded-xl border border-border bg-card text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary w-36 sm:w-48"
            />
          </div>

          <button
            type="button"
            onClick={() => onEnqueueSublist(selectedSublist)}
            className="px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-secondary text-xs font-bold text-foreground flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            Nạp Sublist vào Ôn Tập
          </button>
        </div>
      </div>

      {/* Word Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {wordsForCurrentSublist.map((entry) => {
          const cardInDb = allCards.find((c) => c.word.toLowerCase() === entry.term.toLowerCase());
          const isMastered = cardInDb && (cardInDb.status === "mastered" || (cardInDb.stability && cardInDb.stability >= 21));
          const isLearning = cardInDb && (cardInDb.status === "learning" || cardInDb.status === "review");

          return (
            <div
              key={entry.id}
              onClick={() => {
                if (cardInDb) onSelectWord(cardInDb);
                else {
                  onSelectWord({
                    id: entry.id,
                    word: entry.term,
                    ipa: entry.phonetic,
                    meaning: entry.vietnameseMeaning,
                    definitionEn: entry.definitionEn,
                    collocations: entry.collocations,
                    originalContext: entry.contextSentence.replace(/<[^>]+>/g, ""),
                    category: "awl_570",
                    status: "new",
                    stepInterval: 1,
                    nextReviewDate: new Date().toISOString().split("T")[0],
                    repetitionCount: 0,
                    lapsesCount: 0,
                    stability: entry.stabilityInitial,
                    difficulty: entry.difficultyInitial,
                    createdAt: new Date().toISOString(),
                  });
                }
              }}
              className="p-4 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <strong className="text-sm font-black text-foreground font-serif group-hover:text-primary transition-colors">
                    {entry.term}
                  </strong>
                  <span className="text-[11px] font-mono text-muted-foreground">{entry.phonetic}</span>
                </div>

                {isMastered ? (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-bold border border-emerald-500/20">
                    Thuộc
                  </span>
                ) : isLearning ? (
                  <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 text-[10px] font-bold border border-blue-500/20">
                    Đang Ôn
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-secondary text-muted-foreground text-[10px] font-bold">
                    Mới
                  </span>
                )}
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {entry.vietnameseMeaning}
              </p>

              {/* Collocations badges */}
              <div className="flex flex-wrap gap-1 pt-1">
                {entry.collocations.slice(0, 2).map((colloc, cIdx) => (
                  <span
                    key={cIdx}
                    className="px-1.5 py-0.5 rounded bg-secondary text-[10px] font-mono text-muted-foreground"
                  >
                    {colloc}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
