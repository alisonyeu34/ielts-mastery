"use client";

import React from "react";
import {
  Volume2,
  Sparkles,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { IPAPhonemeData } from "@/data/mockIPA44Data";

interface IPAAnatomyDrawerProps {
  phoneme: IPAPhonemeData;
  onPlaySound: (text: string) => void;
}

export function IPAAnatomyDrawer({ phoneme, onPlaySound }: IPAAnatomyDrawerProps) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div>
          <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">
            {phoneme.nameEn}
          </span>
          <h3 className="text-base font-black text-foreground">
            {phoneme.nameVi}
          </h3>
        </div>

        <button
          type="button"
          onClick={() => onPlaySound(phoneme.exampleWords[0]?.word || phoneme.symbol)}
          className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform hover:scale-105 cursor-pointer"
        >
          <Volume2 className="h-4 w-4" />
          <span>Nghe Phát Âm</span>
        </button>
      </div>

      {/* 1. Vietnamese Articulatory Steps */}
      <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 space-y-2">
        <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5" /> Hướng Dẫn Đặt Khẩu Hình Chuẩn:
        </span>
        <p className="text-xs sm:text-sm text-foreground leading-relaxed font-medium">
          {phoneme.anatomyGuideVi}
        </p>
      </div>

      {/* 2. Common Vietnamese Pitfalls */}
      <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
        <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5" /> Lỗi Người Việt Hay Mắc & Bẫy Khảo Thí:
        </span>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {phoneme.vietnamesePitfalls}
        </p>
      </div>

      {/* 3. 3 Example Words Table */}
      <div className="space-y-2 pt-1">
        <span className="text-xs font-bold text-foreground">
          Từ Vựng Minh Họa Điển Hình:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {phoneme.exampleWords.map((ex, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onPlaySound(ex.word)}
              className="p-3 rounded-2xl border border-border bg-card hover:border-primary/50 text-left space-y-1 transition-all hover:scale-[1.02] cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                  {ex.word}
                </span>
                <Volume2 className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="font-mono text-[11px] text-muted-foreground">{ex.ipa}</p>
              <p className="text-[10px] text-muted-foreground/80 truncate">{ex.meaning}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
