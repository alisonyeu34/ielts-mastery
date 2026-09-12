"use client";

import React from "react";
import { BookOpen, X, Sparkles, Layers, Wand2, Compass, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface SyntaxCheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function SyntaxCheatSheetModal({
  isOpen,
  onClose,
  className,
}: SyntaxCheatSheetModalProps) {
  if (!isOpen) return null;

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
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
              Cẩm Nang Cú Pháp Band 8.0+ GRA & LR
            </span>
            <h3 className="text-lg sm:text-xl font-black text-foreground">
              Bộ 3 Vũ Khí Cú Pháp Học Thuật C1/C2
            </h3>
          </div>
        </div>

        {/* 3 Formula Sections */}
        <div className="space-y-4 text-xs">
          {/* Section 1: Nominalization */}
          <div className="p-4 rounded-2xl border border-blue-500/30 bg-blue-500/[0.02] space-y-2">
            <div className="flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400 text-xs sm:text-sm">
              <Wand2 className="h-4 w-4" />
              <span>1. Danh Từ Hóa (Nominalization)</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Biến động từ và liên từ chỉ nguyên nhân/hệ quả thành cụm danh từ nén (Syntactic Compression).
            </p>
            <div className="p-3 rounded-xl bg-card border border-border/70 font-mono text-[11px] space-y-1">
              <div className="text-muted-foreground">
                ❌ Band 6.0: Because cities rapidly expanded, prices escalated dramatically.
              </div>
              <div className="text-blue-600 dark:text-blue-400 font-bold">
                ✅ Band 8.5+: The rapid expansion of cities precipitated a dramatic escalation in prices.
              </div>
            </div>
          </div>

          {/* Section 2: Inversion */}
          <div className="p-4 rounded-2xl border border-purple-500/30 bg-purple-500/[0.02] space-y-2">
            <div className="flex items-center gap-2 font-bold text-purple-600 dark:text-purple-400 text-xs sm:text-sm">
              <Compass className="h-4 w-4" />
              <span>2. Đảo Ngữ Học Thuật (Academic Inversion)</span>
            </div>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="p-2 rounded-lg bg-card border border-border/70">
                <span className="text-purple-600 font-bold">Not only + Aux + S + V, but S also V</span>
                <p className="text-[10px] text-muted-foreground">Not only does art cultivate creativity, but it also fosters resilience.</p>
              </div>
              <div className="p-2 rounded-lg bg-card border border-border/70">
                <span className="text-purple-600 font-bold">Under no circumstances + should + S + V</span>
                <p className="text-[10px] text-muted-foreground">Under no circumstances should governments compromise conservation.</p>
              </div>
              <div className="p-2 rounded-lg bg-card border border-border/70">
                <span className="text-purple-600 font-bold">Had it not been for [Noun Phrase], S could/would have V3</span>
                <p className="text-[10px] text-muted-foreground">Had it not been for international cooperation, containment would have failed.</p>
              </div>
              <div className="p-2 rounded-lg bg-card border border-border/70">
                <span className="text-purple-600 font-bold">Were S to [Verb bare], S would [Verb bare]</span>
                <p className="text-[10px] text-muted-foreground">Were policymakers to subsidize tuition, social mobility would surge.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Cleft Sentences */}
          <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.02] space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm">
              <Zap className="h-4 w-4" />
              <span>3. Câu Chẻ Nhấn Mạnh (Cleft Sentences)</span>
            </div>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="p-2 rounded-lg bg-card border border-border/70">
                <span className="text-emerald-600 font-bold">It is precisely [Focal Element] that [Relative Clause]</span>
                <p className="text-[10px] text-muted-foreground">It is precisely the lack of vocational training that drives unemployment.</p>
              </div>
              <div className="p-2 rounded-lg bg-card border border-border/70">
                <span className="text-emerald-600 font-bold">What [Clause] is/was [Focal Element]</span>
                <p className="text-[10px] text-muted-foreground">What urban planners urgently require is establishing high-frequency transit.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-border/70 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs border border-border transition-colors cursor-pointer"
          >
            Đóng Cẩm Nang
          </button>
        </div>
      </div>
    </div>
  );
}
