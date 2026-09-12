"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Brain,
  Sparkles,
  Play,
  RotateCcw,
  Zap,
  CheckCircle2,
  Clock,
  Layers,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Volume2,
  BookmarkPlus,
  ArrowRight,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import { useVocabMatrixSession } from "@/hooks/useVocabMatrixSession";
import { FSRSFlashcardDeck } from "@/components/vocab/FSRSFlashcardDeck";
import { FSRSActionButtons } from "@/components/vocab/FSRSActionButtons";
import { AWLSublistDirectory } from "@/components/vocab/AWLSublistDirectory";
import { VocabRetentionStats } from "@/components/vocab/VocabRetentionStats";
import { VocabCardDetailsModal } from "@/components/vocab/VocabCardDetailsModal";
import { VocabHarvestDrawer } from "@/components/vocab/VocabHarvestDrawer";
import { VocabCard, VocabCategory } from "@/types/database";
import { cn } from "@/lib/utils";

export default function VocabMatrixPage() {
  const {
    allCards,
    dueCards,
    newCards,
    learningCards,
    masteredCards,
    filteredCards,
    activeReviewCard,
    currentQueueIndex,
    totalQueueCount,
    isSessionActive,
    setIsSessionActive,
    isFlipped,
    setIsFlipped,
    isSessionFinished,
    sessionRatings,
    errorBankLoggedCount,
    // Filters
    selectedSublist,
    setSelectedSublist,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    // Modals
    selectedCardForDetails,
    setSelectedCardForDetails,
    isHarvestDrawerOpen,
    setIsHarvestDrawerOpen,
    isDetailsModalOpen,
    setIsDetailsModalOpen,
    // Actions
    handleStartSession,
    handleRateCard,
    handleEnqueueSublist,
    handleHarvestWord,
    handleSpeakWord,
  } = useVocabMatrixSession();

  const [activeTab, setActiveTab] = useState<"review" | "directory">("review");

  // Global Space Key to flip card
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSessionActive || isSessionFinished) return;
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      if (e.code === "Space") {
        e.preventDefault();
        setIsFlipped((p) => !p);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSessionActive, isSessionFinished, setIsFlipped]);

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto select-none">
      {/* Top Header Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
            <Brain className="h-4 w-4" /> Sổ Từ Vựng Thông Minh
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Sổ Từ Vựng Phân Tầng IELTS (570 AWL Nền Tảng & 2.500 Từ Chuyên Ngành Passage 3)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Kết hợp 570 từ AWL (nền móng Band 5.5 - 6.0) cùng 2.000 – 2.500 thuật ngữ Passage 3 (Mục tiêu Reading 8.5) theo thuật toán lặp lại ngắt quãng FSRS v4.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setIsHarvestDrawerOpen(true)}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          >
            <BookmarkPlus className="h-3.5 w-3.5" />
            <span>Thêm Từ Vựng Mới</span>
          </button>
        </div>
      </div>

      {/* Active Vocab vs Passive Vocab Scientific Strategy Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-primary/[0.08] via-purple-500/[0.05] to-secondary/40 border border-primary/20 space-y-3">
        <div className="flex items-center gap-2 font-bold text-sm text-foreground">
          <Sparkles className="h-4 w-4 text-primary" />
          Chiến Lược Nạp Từ Khoa Học: Phân Tách Active Vocab (10-15 từ) vs Passive Vocab (30-40 từ)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-card border border-border/80 space-y-1.5">
            <span className="font-bold text-primary flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Từ Vựng Chủ Động (Active Vocab - Dùng Cho Writing & Speaking):
            </span>
            <p className="text-muted-foreground leading-relaxed">
              Duy trì <strong>10 – 15 từ/ngày</strong>. Yêu cầu nạp thật sâu: nhớ chính tả, nghe audio chuẩn từ điển và nhại lại trực tiếp (không học vẹt ký hiệu IPA), học trọn bộ <strong>collocations tự nhiên</strong> và đặt câu thực hành để tránh lỗi gượng từ / Vietlish.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-card border border-border/80 space-y-1.5">
            <span className="font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-purple-500" />
              Từ Vựng Thụ Động (Passive Vocab - Dùng Cho Reading 8.5 & Listening):
            </span>
            <p className="text-muted-foreground leading-relaxed">
              Nạp <strong>30 – 40 từ/ngày</strong> trực tiếp từ bài đọc Cambridge. Đọc hiểu không cần nhớ chính tả, chỉ cần <strong>nhìn mặt chữ hiểu nghĩa đại cương</strong> để không bị khựng lại khi xử lý Passage 3.
            </p>
          </div>
        </div>
      </div>

      {/* Retention Statistics 4-Grid */}
      <VocabRetentionStats
        allCards={allCards}
        dueCards={dueCards}
        masteredCards={masteredCards}
        learningCards={learningCards}
      />

      {/* Main Tab Navigation */}
      <div className="flex items-center justify-between p-1.5 rounded-2xl bg-secondary/50 border border-border">
        <div className="grid grid-cols-2 gap-1.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              setActiveTab("review");
            }}
            className={cn(
              "px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer",
              activeTab === "review"
                ? "bg-card text-foreground shadow-sm border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Zap className="h-4 w-4 text-amber-500" />
            <span>Ôn Tập Từ Vựng ({dueCards.length} từ cần ôn)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("directory");
              setIsSessionActive(false);
            }}
            className={cn(
              "px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer",
              activeTab === "directory"
                ? "bg-card text-foreground shadow-sm border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Layers className="h-4 w-4 text-primary" />
            <span>Ma Trận 10 Sublists AWL & Chủ Đề Passage 3 ({allCards.length} Thẻ)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: DAILY FSRS REVIEW ARENA */}
      {activeTab === "review" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {!isSessionActive ? (
            /* Queue Preview Banner */
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 text-center space-y-5 shadow-sm">
              <div className="h-16 w-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-inner">
                <Sparkles className="h-8 w-8" />
              </div>

              <div className="space-y-1.5 max-w-md mx-auto">
                <h3 className="text-xl font-black text-foreground">
                  {dueCards.length > 0 ? "Hàng Đợi Ôn Tập Hôm Nay" : "Sổ Từ Vựng Sẵn Sàng"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {dueCards.length > 0
                    ? "Hệ thống đã lọc sẵn các từ vựng đến hạn ôn tập hôm nay."
                    : "Hiện tại chưa có từ vựng nào đến hạn ôn. Bạn có thể nạp các từ mới từ danh mục 570 AWL hoặc kho từ chuyên ngành Passage 3!"}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {dueCards.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => handleStartSession("due")}
                    className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-black text-xs sm:text-sm flex items-center gap-2 hover:opacity-90 transition-all hover:scale-102 cursor-pointer shadow-md"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    <span>Bắt Đầu Phiên Ôn Tập ({dueCards.length} Thẻ)</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleStartSession("new")}
                    className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-black text-xs sm:text-sm flex items-center gap-2 hover:opacity-90 transition-all hover:scale-102 cursor-pointer shadow-md"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    <span>Học Từ Vựng Mới ({newCards.length} Thẻ AWL)</span>
                  </button>
                )}

                {dueCards.length > 0 && (
                  <button
                    type="button"
                    onClick={() => handleStartSession("new")}
                    className="px-5 py-3 rounded-2xl border border-border bg-secondary hover:bg-secondary/80 font-bold text-xs text-foreground transition-colors cursor-pointer"
                  >
                    Học Thêm Thẻ Mới ({newCards.length})
                  </button>
                )}
              </div>
            </div>
          ) : !isSessionFinished && activeReviewCard ? (
            /* Active Review Session Deck */
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Progress Bar & Header */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-secondary/40 border border-border text-xs max-w-2xl mx-auto">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold px-2.5 py-1 rounded-lg bg-primary text-primary-foreground">
                    Thẻ {currentQueueIndex + 1} / {totalQueueCount}
                  </span>
                  <span className="font-bold text-foreground">Đang Ôn Tập FSRS</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSessionActive(false)}
                  className="px-3 py-1 rounded-xl border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-foreground font-semibold text-xs cursor-pointer"
                >
                  Tạm Dừng & Lưu
                </button>
              </div>

              {/* 1. 3D Contextual Flip Card Deck */}
              <FSRSFlashcardDeck
                card={activeReviewCard}
                isFlipped={isFlipped}
                onToggleFlip={() => setIsFlipped((p) => !p)}
                onSpeak={handleSpeakWord}
              />

              {/* 2. 4 FSRS Action Reflex Buttons */}
              <FSRSActionButtons
                onRate={handleRateCard}
                disabled={false}
              />
            </div>
          ) : (
            /* Session Completed Screen */
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-9 text-center space-y-6 shadow-sm max-w-2xl mx-auto animate-in fade-in duration-200">
              <div className="h-16 w-16 rounded-3xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
                <ShieldCheck className="h-8 w-8" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-black text-foreground">
                  Hoàn Tất Phiên Ôn Tập Hôm Nay!
                </h3>
                <p className="text-xs text-muted-foreground">
                  Tuyệt vời! Toàn bộ thẻ từ vựng đã được thuật toán FSRS v4 tính toán lại chu kỳ $S$ và lên lịch lặp lại ngắt quãng tiếp theo.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2 text-left">
                <div className="p-3 rounded-xl bg-secondary/40 border border-border text-center">
                  <span className="text-[10px] text-rose-500 font-bold block">Again</span>
                  <strong className="text-base font-black text-foreground font-mono">
                    {sessionRatings.filter((r) => r === 1).length}
                  </strong>
                </div>
                <div className="p-3 rounded-xl bg-secondary/40 border border-border text-center">
                  <span className="text-[10px] text-amber-500 font-bold block">Hard</span>
                  <strong className="text-base font-black text-foreground font-mono">
                    {sessionRatings.filter((r) => r === 2).length}
                  </strong>
                </div>
                <div className="p-3 rounded-xl bg-secondary/40 border border-border text-center">
                  <span className="text-[10px] text-blue-500 font-bold block">Good</span>
                  <strong className="text-base font-black text-foreground font-mono">
                    {sessionRatings.filter((r) => r === 3).length}
                  </strong>
                </div>
                <div className="p-3 rounded-xl bg-secondary/40 border border-border text-center">
                  <span className="text-[10px] text-emerald-500 font-bold block">Easy</span>
                  <strong className="text-base font-black text-foreground font-mono">
                    {sessionRatings.filter((r) => r === 4).length}
                  </strong>
                </div>
              </div>

              {errorBankLoggedCount > 0 && (
                <div className="p-3.5 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-400 text-left">
                  Đã tự động đẩy <strong>{errorBankLoggedCount} từ vựng hay quên (Lapses &gt;= 3)</strong> vào `error_bank` để phục vụ vòng lặp rèn luyện sâu.
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleStartSession("all")}
                  className="px-5 py-2.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 font-bold text-xs text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  Ôn Lại Toàn Bộ Kho
                </button>
                <button
                  type="button"
                  onClick={() => setIsSessionActive(false)}
                  className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                >
                  Quay Về Danh Mục
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: AWL 10-SUBLISTS DIRECTORY */}
      {activeTab === "directory" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <AWLSublistDirectory
            allCards={allCards}
            onSelectWord={(card) => {
              setSelectedCardForDetails(card);
              setIsDetailsModalOpen(true);
            }}
            onEnqueueSublist={handleEnqueueSublist}
            onOpenHarvestDrawer={() => setIsHarvestDrawerOpen(true)}
          />
        </div>
      )}

      {/* Modals & Drawers */}
      <VocabCardDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedCardForDetails(null);
        }}
        card={selectedCardForDetails}
        onSpeak={handleSpeakWord}
      />

      <VocabHarvestDrawer
        isOpen={isHarvestDrawerOpen}
        onClose={() => setIsHarvestDrawerOpen(false)}
        onHarvest={handleHarvestWord}
      />
    </div>
  );
}
