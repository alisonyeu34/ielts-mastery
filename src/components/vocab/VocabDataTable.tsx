"use client";

import React, { useState } from "react";
import {
  Search,
  Volume2,
  Trash2,
  RotateCcw,
  Sparkles,
  Filter,
  CheckCircle2,
  Clock,
  Layers,
  BookOpen,
} from "lucide-react";
import { VocabCard, VocabCategory, VocabStatus } from "@/types/database";
import { isCardDue, formatIntervalLabel } from "@/lib/spacedRepetition";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";

interface VocabDataTableProps {
  cards: VocabCard[];
  onOpenAddModal?: () => void;
  className?: string;
}

const CATEGORY_NAMES: Record<VocabCategory, string> = {
  awl_570: "AWL 570",
  "570_awl": "AWL 570",
  core_3000: "Core 3000",
  "3000_core": "Core 3000",
  c1_academic: "C1/C2 Academic",
  topic_specific: "Chủ Đề & Kỹ Năng",
  custom: "Tự Tạo",
};

const STATUS_BADGES: Record<VocabStatus, { label: string; color: string }> = {
  new: { label: "Mới tạo", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  learning: { label: "Đang học (1-3d)", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  review: { label: "Ôn tập (7-14d)", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
  mastered: { label: "Thành thạo (30d+)", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
};

export function VocabDataTable({ cards, onOpenAddModal, className }: VocabDataTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<VocabCategory | "all">("all");
  const [statusFilter, setStatusFilter] = useState<VocabStatus | "due" | "all">("all");

  const speakWord = (word: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-GB";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa từ vựng này khỏi kho?")) {
      await db.vocab_matrix.delete(id);
    }
  };

  const handleResetInterval = async (id: string) => {
    const today = new Date().toISOString().split("T")[0];
    await db.vocab_matrix.update(id, {
      status: "learning",
      stepInterval: 1,
      nextReviewDate: today,
    });
  };

  // Filter logic
  const filteredCards = cards.filter((card) => {
    // Category filter
    if (categoryFilter !== "all" && card.category !== categoryFilter) {
      return false;
    }
    // Status filter
    if (statusFilter === "due") {
      if (!isCardDue(card)) return false;
    } else if (statusFilter !== "all" && card.status !== statusFilter) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchWord = card.word.toLowerCase().includes(q);
      const matchMeaning = card.meaning.toLowerCase().includes(q);
      const matchColloc = card.collocations?.some((c) => c.toLowerCase().includes(q));
      if (!matchWord && !matchMeaning && !matchColloc) return false;
    }
    return true;
  });

  return (
    <div className={cn("space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm", className)}>
      {/* Header & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-border/80 pb-4">
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-purple-500" />
            Ma Trận Quản Lý Từ Vựng ({filteredCards.length} / {cards.length} từ)
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Theo dõi chu kỳ Spaced Repetition, collocations bắt buộc và ngày ôn tập tiếp theo.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tra cứu từ vựng, collocation, nghĩa..."
            className="w-full rounded-xl border border-border bg-secondary/30 pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
          />
        </div>
      </div>

      {/* Filter Tabs Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Status filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={cn(
              "px-3 py-1.5 rounded-lg border font-medium transition-all",
              statusFilter === "all"
                ? "bg-primary text-primary-foreground border-primary font-bold shadow-sm"
                : "bg-secondary text-muted-foreground border-border hover:text-foreground"
            )}
          >
            Tất cả ({cards.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("due")}
            className={cn(
              "px-3 py-1.5 rounded-lg border font-medium transition-all",
              statusFilter === "due"
                ? "bg-purple-600 text-white border-purple-600 font-bold shadow-sm"
                : "bg-secondary text-muted-foreground border-border hover:text-foreground"
            )}
          >
            🔥 Cần ôn hôm nay ({cards.filter((c) => isCardDue(c)).length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("learning")}
            className={cn(
              "px-3 py-1.5 rounded-lg border font-medium transition-all",
              statusFilter === "learning"
                ? "bg-amber-600 text-white border-amber-600 font-bold shadow-sm"
                : "bg-secondary text-muted-foreground border-border hover:text-foreground"
            )}
          >
            Đang học ({cards.filter((c) => c.status === "learning" || c.status === "new").length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("mastered")}
            className={cn(
              "px-3 py-1.5 rounded-lg border font-medium transition-all",
              statusFilter === "mastered"
                ? "bg-emerald-600 text-white border-emerald-600 font-bold shadow-sm"
                : "bg-secondary text-muted-foreground border-border hover:text-foreground"
            )}
          >
            Đã thuộc ({cards.filter((c) => c.status === "mastered").length})
          </button>
        </div>

        {/* Category selector */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-muted-foreground font-semibold">Phân loại:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">Tất cả danh mục</option>
            <option value="awl_570">AWL 570</option>
            <option value="core_3000">Oxford Core 3000</option>
            <option value="c1_academic">C1/C2 Academic</option>
            <option value="custom">Tự tạo</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-border/80">
        <table className="w-full text-left text-xs">
          <thead className="bg-secondary/60 text-muted-foreground uppercase text-[10px] font-bold tracking-wider border-b border-border/80">
            <tr>
              <th className="py-3 px-4">Từ Vựng & IPA</th>
              <th className="py-3 px-4">Định Nghĩa Tiếng Việt</th>
              <th className="py-3 px-4">Collocations Học Thuật</th>
              <th className="py-3 px-4">Chu Kỳ FSRS</th>
              <th className="py-3 px-4">Trạng Thái</th>
              <th className="py-3 px-4 text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {filteredCards.length > 0 ? (
              filteredCards.map((card) => {
                const badge = STATUS_BADGES[card.status] || STATUS_BADGES.learning;
                const isDue = isCardDue(card);

                return (
                  <tr key={card.id} className="hover:bg-secondary/30 transition-colors">
                    {/* Word & IPA */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => speakWord(card.word)}
                          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                          title="Phát âm"
                        >
                          <Volume2 className="h-3.5 w-3.5 text-indigo-500" />
                        </button>
                        <div>
                          <div className="font-bold text-foreground text-sm">{card.word}</div>
                          {card.ipa && (
                            <div className="font-mono text-[11px] text-muted-foreground">
                              {card.ipa}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Meaning */}
                    <td className="py-3 px-4 max-w-xs font-medium text-foreground/90">
                      {card.meaning}
                    </td>

                    {/* Collocations */}
                    <td className="py-3 px-4 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {card.collocations?.slice(0, 3).map((colloc, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 rounded bg-secondary/80 border border-border/60 text-[10px] font-medium text-muted-foreground"
                          >
                            {colloc}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Spaced Repetition Interval */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-indigo-500" />
                        <span className="font-bold text-foreground">
                          {formatIntervalLabel(card.stepInterval)}
                        </span>
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">
                        Ngày ôn: {card.nextReviewDate}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border", badge.color)}>
                          {badge.label}
                        </span>
                        {isDue && (
                          <span className="inline-flex items-center text-[10px] font-bold text-purple-600 dark:text-purple-400">
                            ● Cần ôn ngay
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleResetInterval(card.id)}
                          className="p-1.5 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
                          title="Đặt lại chu kỳ về 1 ngày"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(card.id)}
                          className="p-1.5 rounded-lg border border-border bg-secondary hover:bg-rose-500/10 text-muted-foreground hover:text-rose-600 transition-colors"
                          title="Xóa từ này"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-8 text-muted-foreground">
                  Không tìm thấy từ vựng nào phù hợp với bộ lọc hiện tại.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
