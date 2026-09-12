"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Bookmark,
  BookmarkCheck,
  Trash2,
  ExternalLink,
  Search,
  Filter,
  Sparkles,
  BookOpen,
  Headphones,
  GraduationCap,
  AlertTriangle,
  Award,
  CheckCircle2,
  Copy,
  Check,
  Layers,
  ArrowLeft,
} from "lucide-react";
import { useTheoryBookmarks } from "@/lib/theoryBookmarks";
import { MethodologyTabSwitcher } from "@/components/theory/methodology/MethodologyTabSwitcher";
import { ExcerptVocabularyCard } from "@/components/theory/ExcerptVocabularyCard";
import { TheorySpeakerButton } from "@/components/theory/TheorySpeakerButton";
import { cn } from "@/lib/utils";

export default function SavedTheoryNotesPage() {
  const { bookmarks, removeBookmark, count, isLoaded } = useTheoryBookmarks();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filtered bookmarks
  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter((bm) => {
      // Skill filter
      if (selectedSkill !== "all" && bm.skill !== selectedSkill) {
        return false;
      }
      // Category filter
      if (selectedCategory !== "all" && bm.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = bm.title.toLowerCase().includes(q);
        const matchContent = bm.content.toLowerCase().includes(q);
        const matchExcerpt = bm.excerptText?.toLowerCase().includes(q);
        const matchTrans = bm.translationVi?.toLowerCase().includes(q);
        const matchLesson = bm.lessonTitle.toLowerCase().includes(q);
        if (!matchTitle && !matchContent && !matchExcerpt && !matchTrans && !matchLesson) {
          return false;
        }
      }
      return true;
    });
  }, [bookmarks, selectedSkill, selectedCategory, searchQuery]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const skillCounts = useMemo(() => {
    return {
      all: bookmarks.length,
      reading: bookmarks.filter((b) => b.skill === "reading").length,
      listening: bookmarks.filter((b) => b.skill === "listening").length,
      writing: bookmarks.filter((b) => b.skill === "writing").length,
      speaking: bookmarks.filter((b) => b.skill === "speaking").length,
      grammar: bookmarks.filter((b) => b.skill === "grammar").length,
    };
  }, [bookmarks]);

  const categoryCounts = useMemo(() => {
    return {
      all: bookmarks.length,
      trap: bookmarks.filter((b) => b.category === "trap").length,
      rule: bookmarks.filter((b) => b.category === "rule").length,
      model: bookmarks.filter((b) => b.category === "model").length,
      tip: bookmarks.filter((b) => b.category === "tip").length,
    };
  }, [bookmarks]);

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto select-none">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            <BookmarkCheck className="h-4 w-4" /> Sổ Tay Cá Nhân Cần Nhớ
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Lý Thuyết, Bẫy Khảo Thí & Câu Mẫu Đã Lưu
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl leading-relaxed">
            Nơi tập hợp toàn bộ các <strong>Bẫy đề thi, Quy tắc vàng, Trích đoạn có dịch nghĩa</strong> và kỹ năng làm bài mà bạn đã đánh dấu riêng biệt trong từng bài học để ôn tập tập trung.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 shadow-sm flex items-center gap-2">
            <Bookmark className="h-5 w-5 fill-current" />
            <div>
              <span className="text-[10px] uppercase font-bold block leading-none">Tổng Đã Lưu</span>
              <span className="text-xs font-black font-mono">{count} Mục Cần Nhớ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <MethodologyTabSwitcher activeTab="saved_notes" />

      {/* 2. Controls & Search Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-card border border-border shadow-sm space-y-4 text-xs">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo từ khóa trong quy tắc, bẫy khảo thí, trích đoạn bài đọc, bản dịch..."
            className="w-full rounded-2xl border border-border bg-secondary/30 pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-amber-500/40 font-medium"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1 border-t border-border/70">
          {/* Skill Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-muted-foreground mr-1">Kỹ năng:</span>
            {[
              { id: "all", label: `Tất cả (${skillCounts.all})` },
              { id: "reading", label: `Reading (${skillCounts.reading})` },
              { id: "listening", label: `Listening (${skillCounts.listening})` },
              { id: "writing", label: `Writing (${skillCounts.writing})` },
              { id: "speaking", label: `Speaking (${skillCounts.speaking})` },
              { id: "grammar", label: `Ngữ pháp (${skillCounts.grammar})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedSkill(tab.id)}
                className={cn(
                  "px-3 py-1.5 rounded-xl font-bold text-[11px] cursor-pointer transition-all",
                  selectedSkill === tab.id
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-muted-foreground mr-1">Loại:</span>
            {[
              { id: "all", label: "Tất cả" },
              { id: "trap", label: `Bẫy đề (${categoryCounts.trap})` },
              { id: "rule", label: `Quy tắc (${categoryCounts.rule})` },
              { id: "model", label: `Mổ xẻ (${categoryCounts.model})` },
              { id: "tip", label: `Bí kíp (${categoryCounts.tip})` },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-2.5 py-1 rounded-xl font-bold text-[10px] cursor-pointer transition-all",
                  selectedCategory === cat.id
                    ? "bg-amber-500 text-slate-950 font-black shadow-xs"
                    : "bg-secondary/40 hover:bg-secondary text-muted-foreground border border-border/80"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Bookmarks List */}
      <div className="space-y-5">
        {filteredBookmarks.length === 0 ? (
          <div className="p-12 text-center rounded-3xl border border-dashed border-border bg-card/40 space-y-4">
            <div className="h-16 w-16 mx-auto rounded-3xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Bookmark className="h-8 w-8" />
            </div>
            <div className="space-y-1.5 max-w-md mx-auto">
              <h3 className="text-base font-extrabold text-foreground">
                {bookmarks.length === 0
                  ? "Chưa có phần lý thuyết nào được lưu"
                  : "Không tìm thấy ghi nhớ nào khớp với bộ lọc"}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {bookmarks.length === 0
                  ? "Trong bất kỳ bài học Reading hay Listening nào, bạn chỉ cần bấm nút '☆ Lưu Bẫy Này / Lưu Quy Tắc Này' để lưu riêng phần đó vào sổ tay này!"
                  : "Thử xóa ô tìm kiếm hoặc chọn bộ lọc 'Tất cả' để hiển thị toàn bộ."}
              </p>
            </div>

            {bookmarks.length === 0 && (
              <div className="pt-2 flex items-center justify-center gap-3">
                <Link
                  href="/theory/reading-methods"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Học Chiến Thuật Reading</span>
                </Link>
                <Link
                  href="/theory/listening-methods"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Headphones className="h-3.5 w-3.5" />
                  <span>Học Chiến Thuật Listening</span>
                </Link>
              </div>
            )}
          </div>
        ) : (
          filteredBookmarks.map((bm) => {
            const isCopied = copiedId === bm.id;
            return (
              <div
                key={bm.id}
                className="p-5 sm:p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4 text-xs select-none transition-all hover:border-amber-500/40"
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-border/70 pb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={cn(
                        "text-[10px] font-mono font-extrabold px-2 py-0.5 rounded uppercase tracking-wider",
                        bm.skill === "reading"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : bm.skill === "listening"
                          ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                          : bm.skill === "writing"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : bm.skill === "speaking"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                      )}
                    >
                      {bm.skill.toUpperCase()}
                    </span>

                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300 uppercase">
                      {bm.categoryLabelVi}
                    </span>

                    <span className="text-[11px] font-mono text-muted-foreground">
                      Lưu lúc: {new Date(bm.savedAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    {/* Speaker button to listen in saved notes */}
                    <TheorySpeakerButton
                      text={`${bm.title}. ${bm.content}`}
                      title="Nghe đọc mục này"
                      size="icon-only"
                    />

                    {/* Copy button */}
                    <button
                      type="button"
                      onClick={() => handleCopy(bm.id, `${bm.title}\n\n${bm.content}\n\n${bm.excerptText || ""}`)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer transition-all"
                      title="Sao chép nội dung"
                    >
                      {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>

                    {/* Source Link */}
                    <Link
                      href={bm.lessonHref}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 flex items-center gap-1 cursor-pointer transition-all"
                      title="Xem lại vị trí trong bài học gốc"
                    >
                      <span>Xem bài học</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => removeBookmark(bm.id)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-600 hover:bg-rose-500/10 cursor-pointer transition-all"
                      title="Xóa khỏi sổ cần nhớ"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Title & Source */}
                <div>
                  <h3 className="text-sm sm:text-base font-black text-foreground">
                    {bm.title}
                  </h3>
                  <span className="text-[11px] text-muted-foreground font-medium">
                    Từ bài học: <strong>{bm.lessonTitle}</strong>
                  </span>
                </div>

                {/* Main Content */}
                <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 text-foreground/90 font-medium leading-relaxed whitespace-pre-line text-xs">
                  {bm.content}
                </div>

                {/* Excerpt with bilingual translation and word breakdown if present */}
                {bm.excerptText && (
                  <ExcerptVocabularyCard
                    label="Trích đoạn bài đọc / Audio liên quan:"
                    englishText={bm.excerptText}
                    translationVi={bm.translationVi}
                    wordBreakdown={bm.wordBreakdown}
                    sourceLessonTitle={bm.lessonTitle}
                    sourceModule={bm.skill}
                    skill={bm.skill}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
