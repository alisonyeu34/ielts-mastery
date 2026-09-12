"use client";

import React from "react";
import {
  X,
  Volume2,
  Sparkles,
  CheckCircle2,
  BookmarkPlus,
  Layers,
  BookOpen,
} from "lucide-react";
import { IPAPhoneme } from "@/data/mockIPAData";
import { VocalTractVisualizer } from "./VocalTractVisualizer";
import { cn } from "@/lib/utils";

interface PhonemeDetailModalProps {
  phoneme: IPAPhoneme | null;
  isMastered: boolean;
  onClose: () => void;
  onSpeak: (symbol: string, exampleWord: string) => void;
  onToggleMastered: (symbol: string) => void;
  className?: string;
}

export function PhonemeDetailModal({
  phoneme,
  isMastered,
  onClose,
  onSpeak,
  onToggleMastered,
  className,
}: PhonemeDetailModalProps) {
  if (!phoneme) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/70 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white font-serif font-black text-2xl shadow-md">
              /{phoneme.symbol}/
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-foreground">
                  Phát Âm /{phoneme.symbol}/
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-secondary text-primary font-bold uppercase">
                  {phoneme.type}
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-sans">
                Từ ví dụ: <strong className="text-foreground">{phoneme.exampleWord}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSpeak(phoneme.symbol, phoneme.exampleWord)}
              className="p-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs transition-transform hover:scale-105 cursor-pointer"
              title="Phát âm thanh chuẩn"
            >
              <Volume2 className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl border border-border bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Anatomical SVG Visualizer */}
        <VocalTractVisualizer phoneme={phoneme} />

        {/* Articulation Instructions in Vietnamese */}
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-primary text-[11px] font-mono uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Hướng Dẫn Khẩu Hình & Cách Đặt Lưỡi Chi Tiết:</span>
          </div>
          <p className="text-foreground leading-relaxed font-sans text-xs sm:text-sm">
            {phoneme.vietnameseGuide}
          </p>
        </div>

        {/* Common Spelling Patterns */}
        <div className="space-y-2 text-xs">
          <span className="font-mono font-bold text-[10px] text-muted-foreground uppercase block">
            Các Dấu Hiệu Chính Tả Thường Gặp (Spelling Patterns):
          </span>
          <div className="flex flex-wrap gap-2">
            {phoneme.commonSpellings.map((sp, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-card border border-border font-mono text-xs text-foreground font-semibold"
              >
                {sp}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-border flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onToggleMastered(phoneme.symbol)}
            className={cn(
              "px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs",
              isMastered
                ? "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30"
                : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
            )}
          >
            {isMastered ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Đã Làm Chủ Âm Này</span>
              </>
            ) : (
              <>
                <BookmarkPlus className="h-4 w-4 text-primary" />
                <span>Đánh Dấu Đã Làm Chủ</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl bg-primary text-primary-foreground font-bold text-xs shadow-xs transition-all hover:scale-105 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
