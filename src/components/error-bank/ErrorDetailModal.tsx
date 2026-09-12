"use client";

import React from "react";
import Link from "next/link";
import {
  X,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Volume2,
  Trash2,
  Plus,
  ArrowRight,
} from "lucide-react";
import { ErrorItem } from "@/types/database";
import { ERROR_CATEGORY_CONFIG } from "@/components/error-bank/ErrorCategoryBreakdown";
import { db } from "@/lib/db";
import { VocabCard } from "@/types/database";
import { cleanWord } from "@/lib/diffEngine";
import { cn } from "@/lib/utils";

interface ErrorDetailModalProps {
  errorItem: ErrorItem | null;
  onClose: () => void;
  onToggleMastered?: (errorId: string, mastered: boolean) => void;
  onDelete?: (errorId: string) => void;
}

export function ErrorDetailModal({
  errorItem,
  onClose,
  onToggleMastered,
  onDelete,
}: ErrorDetailModalProps) {
  if (!errorItem) return null;

  const config = ERROR_CATEGORY_CONFIG[errorItem.errorType] || ERROR_CATEGORY_CONFIG.grammar;

  const handleAddWordToVocab = async (word: string) => {
    const cleaned = cleanWord(word);
    if (!cleaned) return;
    try {
      const today = new Date().toISOString().split("T")[0];
      const newCard: VocabCard = {
        id: `vocab_${cleaned}_${Date.now()}`,
        word: cleaned.charAt(0).toUpperCase() + cleaned.slice(1),
        ipa: "",
        meaning: `Từ vựng từ lỗi sai: ${errorItem.questionContext}`,
        collocations: [],
        originalContext: errorItem.correctAnswer,
        category: "custom",
        status: "new",
        stepInterval: 1,
        nextReviewDate: today,
        repetitionCount: 0,
        lapsesCount: 0,
        stability: 1.0,
        difficulty: 4.0,
        createdAt: new Date().toISOString(),
      };
      await db.vocab_matrix.put(newCard);
      alert(`Đã thêm từ '${cleaned}' vào Sổ Từ Vựng FSRS!`);
    } catch (err) {
      console.error("Failed to add vocab:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div
        className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border/80 pb-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={cn("text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider", config.color, config.bg, config.border)}>
                {config.label}
              </span>
              <span className="text-[10px] font-semibold text-muted-foreground bg-secondary px-2 py-0.5 rounded-md uppercase">
                Nguồn: {errorItem.sourceModule}
              </span>
              <span className="text-[11px] text-muted-foreground">
                • Đã làm lại: <strong>{errorItem.retryCount} lần</strong>
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-foreground pt-1">
              Mổ Xẻ Chi Tiết Lỗi Sai & Chiến Lược Tránh Bẫy
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1.5 rounded-xl hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Context info */}
        <div className="p-3.5 rounded-2xl bg-secondary/40 border border-border/60 text-xs leading-relaxed text-foreground">
          <span className="font-bold text-muted-foreground uppercase text-[10px] block mb-1">
            Ngữ Cảnh Câu Hỏi / Bài Tập:
          </span>
          <p className="font-medium text-foreground">{errorItem.questionContext}</p>
        </div>

        {/* 2-Column Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          {/* Wrong answer */}
          <div className="p-4 rounded-2xl border border-rose-500/30 bg-rose-500/[0.04] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase">
              <AlertTriangle className="h-4 w-4 text-rose-500" />
              <span>Câu / Lựa chọn của bạn (Sai):</span>
            </div>
            <p className="font-medium text-rose-950 dark:text-rose-200 leading-relaxed italic">
              "{errorItem.userWrongAnswer}"
            </p>
          </div>

          {/* Correct answer */}
          <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Chuẩn Xác Band 7.5+:</span>
            </div>
            <p className="font-bold text-emerald-950 dark:text-emerald-200 leading-relaxed">
              "{errorItem.correctAnswer}"
            </p>
          </div>
        </div>

        {/* Deep Explanation & Trap Deconstruction */}
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-500/[0.05] border border-indigo-500/20 space-y-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-bold text-indigo-700 dark:text-indigo-300">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>Phân Tích Nguyên Nhân & Vạch Trần Bẫy Khảo Thí:</span>
          </div>
          <p className="text-foreground/90 leading-relaxed font-medium">
            {errorItem.deepExplanation}
          </p>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border/80">
          <div className="flex items-center gap-2">
            {onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (confirm("Xóa lỗi này khỏi Ngân hàng lỗi sai?")) {
                    onDelete(errorItem.id);
                    onClose();
                  }
                }}
                className="px-3 py-2 rounded-xl border border-border hover:bg-rose-500/10 text-muted-foreground hover:text-rose-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Xóa</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => handleAddWordToVocab(errorItem.correctAnswer)}
              className="px-3 py-2 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5 text-purple-500" />
              <span>Lưu vào FSRS</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onToggleMastered && (
              <button
                type="button"
                onClick={() => {
                  onToggleMastered(errorItem.id, !errorItem.mastered);
                  onClose();
                }}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer",
                  errorItem.mastered
                    ? "border border-border bg-secondary text-muted-foreground hover:text-foreground"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20"
                )}
              >
                {errorItem.mastered ? "Đánh dấu chưa hiểu" : "Đã hiểu & Khắc phục ✓"}
              </button>
            )}

            <Link
              href="/error-bank/drill"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
            >
              <span>Vào phòng Luyện tập</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
