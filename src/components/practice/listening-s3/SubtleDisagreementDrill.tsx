"use client";

import React, { useState } from "react";
import {
  SubtleDisagreementItem,
} from "@/data/mockSection3ConsensusData";
import {
  AlertTriangle,
  Sparkles,
  BookOpen,
  X,
  CheckCircle2,
  BookmarkPlus,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SubtleDisagreementDrillProps {
  isOpen: boolean;
  drillItems: SubtleDisagreementItem[];
  onSaveToFSRS: () => void;
  onClose: () => void;
  className?: string;
}

export function SubtleDisagreementDrill({
  isOpen,
  drillItems,
  onSaveToFSRS,
  onClose,
  className,
}: SubtleDisagreementDrillProps) {
  const [isSaved, setIsSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveToFSRS();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl rounded-3xl border border-primary/40 bg-card p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
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
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase">
                Section 3 Negotiation Traps
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-foreground">
              Bộ Tín Hiệu "Bất Đồng Ngầm & Lật Kèo" Học Thuật
            </h3>
          </div>
        </div>

        {/* Phrases List Cards */}
        <div className="space-y-3">
          {drillItems.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-mono font-black text-sm text-foreground">
                  "{item.phrase}"
                </h4>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  Cực Nguy Hiểm ⚠️
                </span>
              </div>

              <p className="text-xs font-semibold text-primary">
                Nghĩa: {item.meaningVi}
              </p>

              <div className="p-2.5 rounded-xl bg-card border border-border/70 text-xs space-y-1">
                <div className="font-bold text-foreground flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                  <span>Cách Cambridge giăng bẫy:</span>
                </div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  {item.dangerPatternVi}
                </p>
              </div>

              <div className="pt-1 text-[11px] font-serif italic text-muted-foreground">
                💡 Ngữ cảnh: "{item.exampleContext}"
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
                <span>Lưu Cụm Từ Lật Kèo Vào Sổ Từ Vựng (FSRS)</span>
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
