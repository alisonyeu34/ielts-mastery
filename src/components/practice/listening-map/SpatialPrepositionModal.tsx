"use client";

import React, { useState } from "react";
import {
  Compass,
  Sparkles,
  BookOpen,
  X,
  AlertTriangle,
  CheckCircle2,
  BookmarkPlus,
  Layers,
} from "lucide-react";
import { SpatialPrepositionItem } from "@/data/mockListeningMapData";
import { cn } from "@/lib/utils";

interface SpatialPrepositionModalProps {
  isOpen: boolean;
  lexicon: SpatialPrepositionItem[];
  onSaveToFSRS: () => void;
  onClose: () => void;
  className?: string;
}

export function SpatialPrepositionModal({
  isOpen,
  lexicon,
  onSaveToFSRS,
  onClose,
  className,
}: SpatialPrepositionModalProps) {
  const [activeCategory, setActiveCategory] = useState<
    "all" | "compass" | "proximity" | "junctions" | "redirection"
  >("all");
  const [isSaved, setIsSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const filteredLexicon =
    activeCategory === "all"
      ? lexicon
      : lexicon.filter((item) => item.category === activeCategory);

  const handleSave = () => {
    onSaveToFSRS();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const getDangerBadge = (level: string) => {
    switch (level) {
      case "extreme":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30";
      case "high":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30";
      default:
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-3xl rounded-3xl border border-primary/40 bg-card p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-secondary transition-colors cursor-pointer text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border/70 pb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-md shadow-primary/20">
            <Compass className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
                Section 2 Spatial Toolkit
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-foreground">
              Cẩm Nang Từ Vựng Không Gian & Bắt Bẫy Chuyển Hướng
            </h3>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-secondary/50 border border-border text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={cn(
              "px-3 py-1.5 rounded-xl transition-all cursor-pointer",
              activeCategory === "all"
                ? "bg-card text-foreground shadow-2xs border border-border"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Tất Cả
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("compass")}
            className={cn(
              "px-3 py-1.5 rounded-xl transition-all cursor-pointer",
              activeCategory === "compass"
                ? "bg-card text-foreground shadow-2xs border border-border"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            1. Hướng Địa Lý
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("proximity")}
            className={cn(
              "px-3 py-1.5 rounded-xl transition-all cursor-pointer",
              activeCategory === "proximity"
                ? "bg-card text-foreground shadow-2xs border border-border"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            2. Vị Trí Tương Quan
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("junctions")}
            className={cn(
              "px-3 py-1.5 rounded-xl transition-all cursor-pointer",
              activeCategory === "junctions"
                ? "bg-card text-foreground shadow-2xs border border-border"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            3. Ngã Rẽ & Cây Cầu
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory("redirection")}
            className={cn(
              "px-3 py-1.5 rounded-xl transition-all cursor-pointer",
              activeCategory === "redirection"
                ? "bg-card text-foreground shadow-2xs border border-border"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            4. Bẫy Chuyển Hướng ⚠️
          </button>
        </div>

        {/* Phrases List Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredLexicon.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-primary">
                    {item.categoryVi}
                  </span>
                  <span
                    className={cn(
                      "text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border uppercase",
                      getDangerBadge(item.dangerLevel)
                    )}
                  >
                    Độ bẫy: {item.dangerLevel}
                  </span>
                </div>

                <h4 className="font-mono font-bold text-sm text-foreground">
                  "{item.phrase}"
                </h4>

                <p className="text-xs text-muted-foreground font-medium">
                  {item.meaningVi}
                </p>
              </div>

              <div className="pt-2 border-t border-border/50 text-[11px] font-serif italic text-foreground/80">
                💡 "{item.exampleInMap}"
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border/70">
          <button
            type="button"
            onClick={handleSave}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Đã lưu vào Sổ Từ Vựng FSRS!</span>
              </>
            ) : (
              <>
                <BookmarkPlus className="h-4 w-4" />
                <span>Lưu Tất Cả Cụm Từ Vào Sổ Từ Vựng (FSRS)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs border border-border transition-colors cursor-pointer"
          >
            Đóng Cẩm Nang
          </button>
        </div>
      </div>
    </div>
  );
}
