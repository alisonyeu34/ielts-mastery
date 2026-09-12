"use client";

import React, { useState } from "react";
import {
  Plus,
  X,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { db } from "@/lib/db";
import { VocabCard, VocabCategory } from "@/types/database";
import { cn } from "@/lib/utils";

interface VocabAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  className?: string;
}

export function VocabAddModal({
  isOpen,
  onClose,
  onSuccess,
  className,
}: VocabAddModalProps) {
  const [word, setWord] = useState("");
  const [ipa, setIpa] = useState("");
  const [meaning, setMeaning] = useState("");
  const [definitionEn, setDefinitionEn] = useState("");
  const [originalContext, setOriginalContext] = useState("");
  const [collocationsStr, setCollocationsStr] = useState("");
  const [category, setCategory] = useState<VocabCategory>("570_awl");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim() || !meaning.trim() || !originalContext.trim()) return;

    setIsSubmitting(true);
    try {
      const collocations = collocationsStr
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);

      const newCard: VocabCard = {
        id: `vocab_user_${Date.now()}_${word.toLowerCase()}`,
        word: word.trim(),
        ipa: ipa.trim() || `/${word.trim()}/`,
        meaning: meaning.trim(),
        definitionEn: definitionEn.trim() || undefined,
        collocations: collocations.length > 0 ? collocations : [`${word.trim()} in context`],
        originalContext: originalContext.trim(),
        category,
        status: "new",
        stepInterval: 1,
        repetitionCount: 0,
        lapsesCount: 0,
        stability: 1.0,
        difficulty: 5.0,
        bandLevel: "Band 7.0+",
        sourceModule: "manual",
        nextReviewDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      await db.vocab_matrix.put(newCard);

      // Reset form
      setWord("");
      setIpa("");
      setMeaning("");
      setDefinitionEn("");
      setOriginalContext("");
      setCollocationsStr("");

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to add vocab card:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/70 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-foreground">
                Thêm Thẻ Từ Vựng Vào Sổ FSRS
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Bắt buộc gắn kèm câu văn ngữ cảnh gốc để ghi nhớ sâu bản chất
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            {/* Word */}
            <div className="space-y-1">
              <label className="font-bold text-foreground text-[11px]">
                Từ vựng mục tiêu <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="e.g. substantiate"
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-secondary/30 text-foreground font-serif font-bold focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* IPA */}
            <div className="space-y-1">
              <label className="font-bold text-foreground text-[11px]">
                Phiên âm IPA
              </label>
              <input
                type="text"
                value={ipa}
                onChange={(e) => setIpa(e.target.value)}
                placeholder="e.g. /səbˈstænʃieɪt/"
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-secondary/30 text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Meaning VN */}
          <div className="space-y-1">
            <label className="font-bold text-foreground text-[11px]">
              Nghĩa tiếng Việt <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              placeholder="e.g. Chứng minh, đưa ra bằng chứng xác thực"
              className="w-full px-3.5 py-2 rounded-xl border border-border bg-secondary/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Context Sentence */}
          <div className="space-y-1">
            <label className="font-bold text-foreground text-[11px]">
              Câu văn ngữ cảnh gốc <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              required
              value={originalContext}
              onChange={(e) => setOriginalContext(e.target.value)}
              placeholder="e.g. Empirical scientific data is indispensable to substantiate the hypothesis."
              className="w-full px-3.5 py-2 rounded-xl border border-border bg-secondary/30 text-foreground font-serif leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Collocations */}
          <div className="space-y-1">
            <label className="font-bold text-foreground text-[11px]">
              Cụm Collocations (cách nhau bởi dấu phẩy)
            </label>
            <input
              type="text"
              value={collocationsStr}
              onChange={(e) => setCollocationsStr(e.target.value)}
              placeholder="e.g. substantiate a claim, substantiate findings"
              className="w-full px-3.5 py-2 rounded-xl border border-border bg-secondary/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Category Selector */}
          <div className="space-y-1">
            <label className="font-bold text-foreground text-[11px]">
              Phân loại danh mục
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "3000_core", label: "3.000 Core" },
                { id: "570_awl", label: "570 AWL" },
                { id: "c1_academic", label: "C1 Academic" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id as VocabCategory)}
                  className={cn(
                    "py-2 rounded-xl border font-bold text-[11px] transition-all cursor-pointer",
                    category === cat.id
                      ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                      : "bg-secondary/30 border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-3 border-t border-border/70 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-border bg-secondary text-muted-foreground font-bold text-xs cursor-pointer"
            >
              Hủy Bỏ
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-xs transition-all hover:scale-105 cursor-pointer"
            >
              {isSubmitting ? "Đang lưu..." : "Thêm Vào Sổ FSRS"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
