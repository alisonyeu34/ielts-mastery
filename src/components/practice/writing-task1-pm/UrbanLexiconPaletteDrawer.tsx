"use client";

import React, { useState } from "react";
import { SpatialLexiconItem } from "@/data/mockProcessMapData";
import {
  BookOpen,
  X,
  Search,
  Copy,
  Check,
  PlusCircle,
  BookmarkPlus,
  Layers,
  Sparkles,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UrbanLexiconPaletteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lexicon: SpatialLexiconItem[];
  onInsertTerm?: (term: string) => void;
  onSaveToDb?: (items: Array<{ word: string; meaningVi: string }>) => void;
}

export function UrbanLexiconPaletteDrawer({
  isOpen,
  onClose,
  lexicon,
  onInsertTerm,
  onSaveToDb,
}: UrbanLexiconPaletteDrawerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const categories = [
    { id: "all", label: "Tất cả" },
    { id: "demolition", label: "Phá bỏ / Giải tỏa" },
    { id: "construction", label: "Xây mới / Mọc lên" },
    { id: "conversion", label: "Chuyển đổi công năng" },
    { id: "expansion", label: "Mở rộng diện tích" },
    { id: "unaltered", label: "Giữ nguyên trạng" },
  ];

  const filteredLexicon = lexicon.filter((item) => {
    const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchSearch =
      searchQuery.trim() === "" ||
      item.verb.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.noun.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaningVi.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSaveAllToVocab = async () => {
    if (onSaveToDb) {
      const itemsToSave = lexicon.map((l) => ({
        word: `${l.verb} (${l.noun})`,
        meaningVi: l.meaningVi,
      }));
      await onSaveToDb(itemsToSave);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-3xl rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-foreground">
                Cẩm Nang Từ Vựng Biến Đổi Đô Thị & Không Gian
              </h3>
              <span className="text-xs text-muted-foreground">
                Bộ động từ & danh từ chuyển dịch không gian đạt Band 8.0+ Task 1 Map
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-muted-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Controls: Search & Category Filter */}
        <div className="space-y-3 shrink-0">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm động từ, danh từ hoặc ý nghĩa tiếng Việt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-secondary/40 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer",
                  selectedCategory === cat.id
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-secondary/60 text-muted-foreground border-border hover:text-foreground"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lexicon Items List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filteredLexicon.length === 0 ? (
            <div className="py-12 text-center text-xs text-muted-foreground">
              Không tìm thấy từ vựng phù hợp với tiêu chí tìm kiếm.
            </div>
          ) : (
            filteredLexicon.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-2 hover:border-emerald-500/40 transition-all text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <strong className="text-sm font-extrabold text-foreground font-mono">
                      {item.verb}
                    </strong>
                    <span className="text-muted-foreground">⇄</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      {item.noun}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {onInsertTerm && (
                      <button
                        type="button"
                        onClick={() => onInsertTerm(item.verb)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-[11px] flex items-center gap-1 border border-emerald-500/20 cursor-pointer"
                        title="Chèn động từ vào bài viết"
                      >
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span>Chèn</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleCopy(item.example, idx)}
                      className="px-2.5 py-1 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground font-bold text-[11px] flex items-center gap-1 border border-border cursor-pointer"
                      title="Sao chép câu ví dụ"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                          <span className="text-emerald-500">Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>Sao chép</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-foreground/90 font-medium">🇻🇳 {item.meaningVi}</p>

                <div className="p-2.5 rounded-xl bg-card border border-border/60 text-[11px] font-serif italic text-muted-foreground">
                  💡 Ví dụ: "{item.example}"
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-border/80 shrink-0">
          <button
            type="button"
            onClick={handleSaveAllToVocab}
            disabled={savedSuccess}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer",
              savedSuccess
                ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40"
                : "bg-secondary text-foreground border-border hover:bg-secondary/80"
            )}
          >
            {savedSuccess ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span>Đã lưu vào Sổ Từ Vựng (FSRS)</span>
              </>
            ) : (
              <>
                <BookmarkPlus className="h-3.5 w-3.5 text-emerald-500" />
                <span>Lưu toàn bộ vào Sổ Từ Vựng</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer"
          >
            Đóng bảng tra cứu
          </button>
        </div>
      </div>
    </div>
  );
}
