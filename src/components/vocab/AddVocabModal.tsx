"use client";

import React, { useState } from "react";
import { X, Plus, Sparkles, BookOpen, Layers, Check } from "lucide-react";
import { VocabCategory, VocabCard } from "@/types/database";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";

interface AddVocabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AddVocabModal({ isOpen, onClose, onSuccess }: AddVocabModalProps) {
  const [word, setWord] = useState("");
  const [ipa, setIpa] = useState("");
  const [meaning, setMeaning] = useState("");
  const [category, setCategory] = useState<VocabCategory>("custom");
  const [collocationsInput, setCollocationsInput] = useState("");
  const [originalContext, setOriginalContext] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) {
      setErrorMsg("Vui lòng nhập từ vựng tiếng Anh.");
      return;
    }
    if (!meaning.trim()) {
      setErrorMsg("Vui lòng nhập định nghĩa tiếng Việt.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const today = new Date().toISOString().split("T")[0];
      const collocations = collocationsInput
        .split(/[,;\n]/)
        .map((c) => c.trim())
        .filter(Boolean);

      const cleanedWord = word.trim();
      const newCard: VocabCard = {
        id: `vocab_${cleanedWord.toLowerCase().replace(/\s+/g, "_")}_${Date.now()}`,
        word: cleanedWord.charAt(0).toUpperCase() + cleanedWord.slice(1),
        ipa: ipa.trim(),
        meaning: meaning.trim(),
        collocations,
        originalContext: originalContext.trim() || `Ví dụ câu học thuật sử dụng từ ${cleanedWord}.`,
        category,
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

      // Reset form
      setWord("");
      setIpa("");
      setMeaning("");
      setCollocationsInput("");
      setOriginalContext("");
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to add vocab:", err);
      setErrorMsg("Đã xảy ra lỗi khi lưu vào cơ sở dữ liệu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div
        className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-3.5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                Thêm Từ Vựng Vào Sổ FSRS
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Lưu từ theo cụm Collocation và câu ngữ cảnh gốc
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Error alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-400 font-medium">
            {errorMsg}
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Word & IPA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-foreground">
                Từ vựng Tiếng Anh <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="VD: Mitigate, Detrimental..."
                className="w-full rounded-xl border border-border bg-secondary/30 px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-foreground">Phiên âm IPA (Tùy chọn)</label>
              <input
                type="text"
                value={ipa}
                onChange={(e) => setIpa(e.target.value)}
                placeholder="VD: /ˈmɪt.ɪ.ɡeɪt/"
                className="w-full rounded-xl border border-border bg-secondary/30 px-3 py-2 font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/40"
              />
            </div>
          </div>

          {/* Meaning & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-foreground">
                Định nghĩa Tiếng Việt <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                placeholder="VD: Làm dịu bớt, giảm nhẹ mức độ..."
                className="w-full rounded-xl border border-border bg-secondary/30 px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-foreground">Danh mục Phân loại</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as VocabCategory)}
                className="w-full rounded-xl border border-border bg-secondary/30 px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/40"
              >
                <option value="custom">Từ vựng Tự tạo (Custom)</option>
                <option value="awl_570">AWL 570 Academic</option>
                <option value="core_3000">Oxford Core 3000</option>
                <option value="c1_academic">C1/C2 Academic</option>
              </select>
            </div>
          </div>

          {/* Collocations */}
          <div className="space-y-1.5">
            <label className="font-bold text-foreground flex items-center justify-between">
              <span>Cụm Collocations Bắt Buộc</span>
              <span className="text-[10px] text-muted-foreground font-normal">Cách nhau bằng dấu phẩy</span>
            </label>
            <input
              type="text"
              value={collocationsInput}
              onChange={(e) => setCollocationsInput(e.target.value)}
              placeholder="VD: mitigate the risk, mitigate environmental damage, mitigate impact"
              className="w-full rounded-xl border border-border bg-secondary/30 px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            />
          </div>

          {/* Original Context */}
          <div className="space-y-1.5">
            <label className="font-bold text-foreground flex items-center justify-between">
              <span>Câu Ngữ Cảnh Gốc (Từ bài Đọc/Nghe)</span>
              <span className="text-[10px] text-muted-foreground font-normal">Giúp kích hoạt Active Recall</span>
            </label>
            <textarea
              value={originalContext}
              onChange={(e) => setOriginalContext(e.target.value)}
              placeholder="VD: Sustainable urban planning can mitigate the adverse effects of global warming."
              rows={3}
              className="w-full rounded-xl border border-border bg-secondary/30 px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/40 leading-relaxed resize-none"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-border text-muted-foreground hover:text-foreground font-semibold transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-md shadow-purple-600/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>{isSubmitting ? "Đang lưu..." : "Lưu vào Sổ FSRS"}</span>
              <Check className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
